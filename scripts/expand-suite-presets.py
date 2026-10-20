#!/usr/bin/env python3
"""Install the held Evil Charts Recharts presets through the actual SISO implementations."""
import hashlib
import json
from pathlib import Path
import re

root=Path(__file__).resolve().parents[1]
source=root/'app/src/kit/evilcharts'
dest=root/'packages/siso-charts/src/presets'
dest.mkdir(exist_ok=True)
meta=json.loads((source/'manifest.json').read_text())
exports=[];records=[];entries=[]
modules={'../../ui/recharts-chart':'../ui/chart','../../ui/recharts-background':'../ui/background','../../ui/recharts-tooltip':'../ui/tooltip'}
for family in ['area','bar','line','pie','radar','radial','composed','sankey']:
    modules['../../charts/recharts-'+family+'-chart']='../charts/'+family+'-chart'
for file in sorted([*source.glob('examples/recharts/*.tsx'),*source.glob('blocks/recharts/*.tsx')]):
    original=file.read_text();text=original
    def adapt(match):
        clause,spec=match[1],match[2]
        if not spec.startswith('.'):return match[0]
        assert spec in modules,(file,spec)
        if spec.startswith('../../charts/'):
            parts=[]
            for item in clause.strip().strip('{}').split(','):
                item=item.strip();kind='type ' if item.startswith('type ') else '';item=item.removeprefix('type ')
                imported,*alias=item.split(' as ');local=alias[0] if alias else imported
                renamed=imported.replace('Evil','Siso',1) if imported.startswith('Evil') else imported
                parts.append(kind+renamed+(' as '+local if renamed!=local else ''))
            clause='{ '+', '.join(parts)+' }'
        return 'import '+clause+' from '+json.dumps(modules[spec])+';'
    text=re.sub(r'import\s+([^;\n]+?)\s+from\s+[\"\x27]([^\"\x27]+)[\"\x27];?',adapt,text)
    names=re.findall(r'export function (\w+)',text)
    assert len(names)==1,(file,names)
    slug=file.stem.removeprefix('ex-').removeprefix('b-')
    alias='Preset'+''.join(x.capitalize() for x in slug.split('-'))
    out=dest/(file.stem+'.tsx');out.write_text('// uihub: siso:charts\n'+text)
    exports.append('export { '+names[0]+' as '+alias+' } from "./'+file.stem+'";')
    match=next((x for x in meta if x['name'].replace('-echarts','')==slug),None)
    family=next((s for s in ['sankey','composed','radial','radar','pie','bar','line','area'] if s in slug),'chart')
    entries.append({'id':slug,'export':alias,'family':family,'title':match['title'] if match else slug.replace('-',' ').capitalize(),'source':'app/src/kit/evilcharts/'+str(file.relative_to(source))})
    records.append({'source':str(file.relative_to(root)),'target':str(out.relative_to(root)),'sourceSha256':hashlib.sha256(original.encode()).hexdigest(),'adaptedSha256':hashlib.sha256(out.read_bytes()).hexdigest(),'changes':['catalogue marker','relative imports point at the actual packaged implementations; component identifiers retain aliases']})
(dest/'index.ts').write_text('// uihub: siso:charts\n'+'\n'.join(exports)+'\n')
proof={'license':'MIT','copyright':'Evil Charts contributors; original licence retained in packages/siso-charts/licenses','engine':'recharts','count':len(entries),'files':records}
(root/'packages/siso-charts/preset-provenance.json').write_text(json.dumps(proof,indent=2)+'\n')
(root/'examples/package-suite/presets.json').write_text(json.dumps(entries,indent=2)+'\n')
print(json.dumps({'originalRechartsPresets':len(entries),'families':sorted({e['family'] for e in entries})}))
