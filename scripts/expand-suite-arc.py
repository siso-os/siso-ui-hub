#!/usr/bin/env python3
"""Extract every recorded MIT/free Arc target, preserving the source graph and demos."""
import hashlib
import json
import os
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
ARC = ROOT / 'app/src/arc'
def read(path): return json.loads(path.read_text())
def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    content=json.dumps(data, indent=2, ensure_ascii=False) + '\n'
    if not path.exists() or path.read_text()!=content:path.write_text(content)
def digest(data): return hashlib.sha256(data).hexdigest()
items = {x['id']: x for x in map(json.loads, (ROOT/'sources/items.jsonl').read_text().splitlines()) if x.get('lib') == 'arc'}
manifest = [x for x in read(ARC/'manifest.json') if items.get('arc:'+x['name'], {}).get('tier') == 'free']
old = {name: read(ROOT/f'packages/siso-{name}/source-provenance.json') for name in ['atoms','blocks','charts']}
owners = {f['id'].removeprefix('arc:'): name for name in ['atoms','blocks'] for f in old[name]['families']}
owners.update({x['name']: 'charts' for x in old['charts']['components']})
atoms = set('floating-button-group expanding-button-group theme-switch theme-switch-eclipse theme-switch-split theme-switch-rise animated-counter text-reveal in-view-title text-morph text-shimmer chip-group stepper countdown phone-input money-input shortcut-recorder billing-toggle slot-text'.split())
charts = {'streamgraph','brush-chart','ridgeline'}
for x in manifest: owners.setdefault(x['name'], 'atoms' if x['name'] in atoms else 'charts' if x['name'] in charts else 'blocks')
by_file = {f: x for x in manifest for f in x['files']}
imports = re.compile(r'(?:import|export)\s+(?:(?:[^;\n]*?)\s+from\s+)?[\"\x27]([^\"\x27]+)[\"\x27]')
records = {}
for name in ['atoms','blocks']:
    fs = old[name]['files']
    records[name] = {f['target']:f for f in fs} if isinstance(fs,list) else {'src/source/'+k: {'source':v['upstreamPath'],'target':'src/source/'+k,'sourceSha256':v['sha256'],'adaptedSha256':v['packagedSha256'],'changes':v.get('modifications',[])} for k,v in fs.items()}
records['charts'] = dict(old['charts']['files'])
visited = set()
media_path = ROOT/'catalogue/arc-suite-media.json'
# This checked-in list is the approved media set, including its licence and
# credit provenance. Keep it authoritative: Arc's older docs demos contain
# uncredited aliases that must not silently enter the package manifest.
approved_media = read(media_path)
approved_media_by_url = {x['url'].lstrip('/'): x for x in approved_media}
media = {url: dict(record) for url, record in approved_media_by_url.items()}
framework = '''// uihub: siso:blocks
import { ArcImage, ArcLink, type ArcImageProps } from "./arc-provider";
export type StaticImageData = {src:string;width:number;height:number;blurDataURL?:string};
export function Image({src, ...props}: Omit<ArcImageProps,"src"> & {src:string|StaticImageData;quality?:number;unoptimized?:boolean;placeholder?:string;blurDataURL?:string}) {
 const {quality,unoptimized,placeholder,blurDataURL,...rest}=props;
 return <ArcImage {...rest} src={typeof src === "string" ? src : src.src}/>;
}
export { ArcLink as Link };
'''
def resolve(source, spec):
    p = (source.parent/spec).resolve()
    return next((q for q in [p,p.with_suffix('.tsx'),p.with_suffix('.ts'),p/'index.tsx',p/'index.ts'] if q.is_file()), None)
def target_root(name): return ROOT/f'packages/siso-{name}/src'/('arc' if name=='charts' else 'source')
def source_family(entry):
    # Several registry targets are presentation aliases of the same source
    # component (the three named theme-switch variants are one example).
    # The first source file, not the registry slug, defines family identity.
    return Path(entry['files'][0]).parent.name
def expected_adapted_sha(name, target):
    record=records[name].get(target)
    if name=='charts': return record if isinstance(record,str) else None
    return record.get('adaptedSha256') if isinstance(record,dict) else None
def verify_source_record(name, target, source, original):
    record=records[name].get(target)
    if name=='charts' or record is None: return
    actual_source=str(source.relative_to(ROOT))
    if record.get('source')!=actual_source:
        raise RuntimeError(f'{target}: provenance source changed: {record.get("source")} != {actual_source}')
    actual_sha=digest(original)
    if record.get('sourceSha256')!=actual_sha:
        raise RuntimeError(f'{target}: sourceSha256 drift: {record.get("sourceSha256")} != {actual_sha}')
def copy(name, rel):
    key = (name,str(rel))
    if key in visited:return
    visited.add(key)
    source = ARC/rel
    assert source.is_file(), source
    # Every component dependency must itself be a free target; lib/ is shared MIT infrastructure.
    family = by_file.get(str(rel))
    if family: assert items['arc:'+family['name']]['tier']=='free'
    original = source.read_bytes()
    dest = target_root(name)/rel
    target=str(dest.relative_to(ROOT/f'packages/siso-{name}'))
    expected=expected_adapted_sha(name,target)
    verify_source_record(name,target,source,original)
    if dest.exists():
        actual=digest(dest.read_bytes())
        if expected is None:
            raise RuntimeError(f'{target}: existing extracted file has no recorded adapted SHA-256')
        if actual!=expected:
            raise RuntimeError(f'{target}: adaptedSha256 drift: {expected} != {actual}')
        text = dest.read_text() if dest.suffix in ['.ts','.tsx','.css'] else ''
    else:
        text = original.decode()
        for module, symbol in [('next/image','Image'),('next/link','Link')]:
            adapter = os.path.relpath(target_root(name)/'lib/framework', dest.parent).replace(os.sep,'/')
            if not adapter.startswith('.'): adapter='./'+adapter
            pattern = r'import\s+'+symbol+r'(?:,\s*\{\s*(?:type\s+)?StaticImageData\s*\})?\s+from\s+[\"\x27]'+re.escape(module)+r'[\"\x27];?'
            text = re.sub(pattern, lambda m: 'import { '+symbol+(', type StaticImageData' if 'StaticImageData' in m.group() else '')+' } from '+json.dumps(adapter)+';', text)
        if str(rel)=='lib/media.ts':
            def url(m):
                q=resolve(source,m[1]); assert q and q.is_relative_to(ARC/'media'),m[1]
                out='arc-media/'+str(q.relative_to(ARC/'media'))
                # Rewrite only approved media. Uncredited legacy media stays
                # out of the package and catalogue.
                if out in approved_media_by_url:
                    media[out]=dict(approved_media_by_url[out])
                return json.dumps('/'+out)
            text=re.sub(r'new URL\("([^"]+)", import.meta.url\)\.href',url,text)
        if dest.suffix in ['.ts','.tsx']:text+='\n// uihub: siso:'+name+'\n'
        adapted=text.encode()
        if expected is not None and digest(adapted)!=expected:
            raise RuntimeError(f'{target}: regenerated adaptedSha256 drift: {expected} != {digest(adapted)}')
        dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(adapted)
        if name=='charts':records[name][target]=digest(dest.read_bytes())
        else:records[name][target]={'source':str(source.relative_to(ROOT)),'target':target,'sourceSha256':digest(original),'adaptedSha256':digest(dest.read_bytes()),'changes':[] if dest.read_bytes()==original else ['catalogue marker; portable framework/media imports where present']}
    # Follow the original imports, even when an earlier extraction already adapted this file.
    for spec in imports.findall(original.decode()):
        if not spec.startswith('.'):continue
        dep=resolve(source,spec)
        if dep and dep.is_relative_to(ARC) and dep.suffix in ['.tsx','.ts','.css']:
            copy(name,dep.relative_to(ARC))
    if 'lib/framework' in text:
        p=target_root(name)/'lib/framework.tsx'
        if p.exists() and p.read_bytes()!=framework.encode():
            raise RuntimeError(f'{p.relative_to(ROOT)}: generated framework adapter drift; refusing to overwrite')
        p.parent.mkdir(parents=True,exist_ok=True)
        if not p.exists():p.write_bytes(framework.encode())
        # The original portable provider is already used by the release.
        copy(name,Path('lib/arc-provider.tsx'))

def default_name(text):
    m=re.search(r'export default (?:function\s+)?(\w+)',text)
    return m[1] if m else None

for entry in manifest:
    name=owners[entry['name']]
    for file in entry['files']:copy(name,Path(file))

for name in ['atoms','blocks','charts']:
    families=[x for x in manifest if owners[x['name']]==name]
    index=target_root(name)/('index.tsx' if name=='charts' else 'index.ts')
    text=index.read_text()
    seen=set()
    for x in families:
        entry=next((f for f in x['files'] if f.endswith('.tsx')),None)
        if not entry:continue
        module='./'+entry[:-4]
        if module in seen:continue
        seen.add(module)
        if not re.search(r'export\s+\*\s+from\s+'+re.escape(json.dumps(module)),text):text+='export * from '+json.dumps(module)+';\n'
        src=(ARC/entry).read_text();default=default_name(src)
        if default and not re.search(r'export (?:function|const|class) '+default+r'\b',src) and not re.search(r'as '+default+r'\b',text):
            text+='export { default as '+default+' } from '+json.dumps(module)+';\n'
    if index.read_text()!=text:index.write_text(text)
    if name == 'charts': records[name]['src/arc/index.tsx'] = digest(index.read_bytes())
    proof=old[name]
    if name=='charts':
        proof['components']=[{'name':x['name'],'tier':'free','url':items['arc:'+x['name']]['url'],'install':x['install']} for x in families]
        proof['files']=records[name]
    else:
        known={f['id']:f for f in proof['families']}
        proof['families']=[known.get('arc:'+x['name'],{'id':'arc:'+x['name'],'tier':'free','source':items['arc:'+x['name']]['url'],'entry':'src/source/'+x['files'][0],'exports':re.findall(r'export (?:function|const|class|type|interface) (\w+)',(ARC/x['files'][0]).read_text())}) for x in families]
        proof['familyCount']=len(families);proof['files']=list(records[name].values())
    write(ROOT/f'packages/siso-{name}/source-provenance.json',proof)
    p=ROOT/f'packages/siso-{name}/package.json';package=read(p)
    for file in target_root(name).rglob('*.tsx'):
        for spec in imports.findall(file.read_text()):
            if spec.startswith('@radix-ui/'):
                installed=read(ROOT/'node_modules'/spec/'package.json')
                package.setdefault('dependencies',{})[spec]='^'+installed['version']
    write(p,package)

# Original documentation examples become separate browsable variants, never synthetic stand-ins.
demo_root=ROOT/'examples/package-suite/expanded-demos';demo_root.mkdir(exist_ok=True)
entries=[];loaders=[]
covered_targets=set()
for x in manifest:
    demo=x.get('demo')
    if not demo or not (ARC/demo).exists():continue
    source=ARC/demo
    # Keep the existing checked, stateful host adapters from the source-fidelity release.
    adapted=ROOT/'examples/package-suite'/('atom-demos' if owners[x['name']]=='atoms' else 'block-demos')/(x['name']+'.tsx')
    if adapted.exists():source=adapted
    text=source.read_text()
    def adapt(m):
        clause,spec=m[1],m[2]
        if spec=='@/arc-shims/theme-stage':return 'import '+clause+' from "./theme-stage";'
        if not spec.startswith('.'):return m[0]
        dep=resolve(source,spec)
        if not dep:return m[0]
        f=by_file.get(str(dep.relative_to(ARC)))
        owner=owners[f['name']] if f else owners[x['name']]
        if not clause.strip().startswith(('{','*','type ')):
            first,*tail=clause.split(',',1);actual=default_name(dep.read_text()) or first.strip()
            clause='{ '+actual+' as '+first.strip()+(', '+tail[0].strip().removeprefix('{').removesuffix('}').strip() if tail else '')+' }'
        return 'import '+clause+' from "@siso/ui/'+owner+'/source";'
    text=re.sub(r'import\s+([^;\n]+?)\s+from\s+[\"\x27]([^\"\x27]+)[\"\x27];?',adapt,text)
    text='// uihub: siso:package-workbench\n'+text.replace('"next/navigation"','"./preview-host"')
    helpers=['track','save','verify','submit','subscribe','openSearch','openSite','markRead','dismiss','api','router','uploadWithProgress','uploadFile']
    needed=[name for name in helpers if re.search(r'\b'+name+r'\b',text) and not re.search(r'(?:function|const|let|import)\s+[^;\n]*\b'+name+r'\b',text)]
    if needed:text='import { '+', '.join(needed)+' } from "./preview-host";\n'+text
    for spec in re.findall(r'new URL\("([^"]+)", import.meta.url\)\.href',text):
        original=(ARC/demo).parent/spec
        if original.is_file():
            original=original.resolve();url='arc-media/'+str(original.relative_to((ARC/'media').resolve()))
            if url in approved_media_by_url:
                media[url]=dict(approved_media_by_url[url])
            text=text.replace('new URL('+json.dumps(spec)+', import.meta.url).href',json.dumps('/'+url))
    # Arc's docs include five legacy aliases with no approved credit record.
    # Use the owned fixture and describe it as a preview image instead of
    # implying the replacement depicts the original subject.
    def normalize_image(match):
        tag=match.group(0)
        refs=re.findall(r'(["\'])/arc-media/([^"\']+)\1',tag)
        unapproved=[path for _,path in refs if 'arc-media/'+path not in approved_media_by_url]
        if not unapproved:return tag
        for quote,path in refs:
            if 'arc-media/'+path not in approved_media_by_url:
                tag=tag.replace(quote+'/arc-media/'+path+quote,quote+'/art/bg/agency.webp'+quote)
        if re.search(r'\balt=\{?["\'][^"\']*["\']\}?',tag):
            tag=re.sub(r'\balt=\{?["\'][^"\']*["\']\}?','alt="SISO-owned preview fixture"',tag)
        else:
            tag=tag.replace('/>', 'alt="SISO-owned preview fixture" />')
        return tag
    text=re.sub(r'<img\b[^>]*>',normalize_image,text)
    def normalize_media_ref(match):
        path=match.group(2)
        if 'arc-media/'+path in approved_media_by_url:return match.group(0)
        return match.group(1)+'/art/bg/agency.webp'+match.group(1)
    text=re.sub(r'(["\'])/arc-media/([^"\']+)\1',normalize_media_ref,text)
    if x['name']=='countdown':text=text.replace('target="2026-10-06T10:00:00"','target={new Date(Date.now()+7*86400000).toISOString()}')

    if x['name'] in ['signup-form','login-centered']:
        component='SignupForm' if x['name']=='signup-form' else 'LoginCentered'
        text='// uihub: siso:package-workbench\nimport { '+component+' } from "@siso/ui/blocks/source";\nexport default function CorrectSourceExample(){return <'+component+'/>;}\n'
    (demo_root/(x['name']+'.tsx')).write_text(text)
    variants=re.findall(r'export function ([A-Z]\w*)\s*\(\s*\)',text)
    variants+=re.findall(r'export const ([A-Z]\w*)\s*=\s*\(\s*\)\s*=>',text)
    if 'export default' in text:variants=['default']+[v for v in variants if v!=default_name(text)]
    for variant in variants:
        key=x['name']+'--'+variant
        loaders.append(json.dumps(key)+': () => import("./expanded-demos/'+x['name']+'").then(m => ({default: m.'+variant+' as ComponentType})),')
        owner=owners[x['name']]
        scale='atom' if owner=='atoms' else 'chart' if owner=='charts' else 'section' if x['kind']=='block' else 'component'
        variant_label=x['title'] if source_family(x)=='theme-switch' and x['name']!='theme-switch' else variant
        entries.append({'id':key,'family':source_family(x),'title':x['title'],'variant':variant_label,'package':owner,'scale':scale,'description':x['description'],'categories':x['categories'],'source':items['arc:'+x['name']]['url'],'exports':list(dict.fromkeys(re.findall(r'export (?:function|const|class) (\w+)',(ARC/x['files'][0]).read_text())+([default_name((ARC/x['files'][0]).read_text())] if default_name((ARC/x['files'][0]).read_text()) else []))),'use':x.get('use',[]),'avoid':x.get('avoid',[])})
        covered_targets.add(x['name'])
stage=(ROOT/'app/src/arc-shims/theme-stage.tsx').read_text().replace('@/arc/theme-switch/theme-switch','@siso/ui/atoms/source')
(demo_root/'theme-stage.tsx').write_text('// uihub: siso:package-workbench\n'+stage)
(ROOT/'examples/package-suite/expanded-loaders.ts').write_text('// uihub: siso:package-workbench\nimport type { ComponentType } from "react";\nexport const demoLoaders = {\n'+'\n'.join(loaders)+'\n};\n')
write(ROOT/'catalogue/arc-suite-coverage.json',{'license':'MIT/free only; source tier gate','targets':len(manifest),'uniqueSourceFamilies':len({x['files'][0] for x in manifest}),'packages':{n:sum(owners[x['name']]==n for x in manifest) for n in ['atoms','blocks','charts']},'entries':entries,'withoutDemo':[x['name'] for x in manifest if x['name'] not in covered_targets]})
write(ROOT/'examples/package-suite/arc-catalogue.json',entries)
for match in re.finditer(r'new URL\("([^"]+)", import.meta.url\)\.href', (ARC/'lib/media.ts').read_text()):
    path=resolve(ARC/'lib/media.ts',match[1])
    if path:
        url='arc-media/'+str(path.relative_to(ARC/'media'))
        if url in approved_media_by_url:
            media[url]=dict(approved_media_by_url[url])
write(ROOT/'catalogue/arc-suite-media.json',list(media.values()))
print(json.dumps({'targets':len(manifest),'demos':len(entries),'packages':{n:sum(owners[x['name']]==n for x in manifest) for n in ['atoms','blocks','charts']},'media':len(media)}))
