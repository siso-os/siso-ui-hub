// uihub: siso:package-workbench
import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { SourceBlockScope } from '@siso/ui/blocks/source';
import { SourceAtomScope } from '@siso/ui/atoms/source';
import '@siso/ui/atoms/source.css';
import '@siso/ui/blocks/source.css';
import { demoLoaders } from './expanded-loaders';
import catalogue from './arc-catalogue.json';

type View = 'atom' | 'component' | 'section' | 'all' | 'chart';
const demos = Object.fromEntries(Object.entries(demoLoaders).map(([id, load]) => [id, lazy(load)]));
class DemoBoundary extends Component<{children:ReactNode}, {error:string}> {
  state={error:''};
  static getDerivedStateFromError(error:Error){return {error:error.message};}
  render(){return this.state.error ? <p role="alert">This source example could not render: {this.state.error}</p> : this.props.children;}
}
const human = (value:string) => value==='default' ? 'Original example' : value.replace(/([a-z])([A-Z])/g,'$1 $2');
export default function ComponentBrowser({view='all'}:{view?:View}) {
  const [query,setQuery]=useState(''),[category,setCategory]=useState('all'),[theme,setTheme]=useState<'dark'|'light'>('dark');
  const [action,setAction]=useState('');
  useEffect(()=>{const receive=(event:Event)=>setAction((event as CustomEvent<string>).detail);window.addEventListener('suite-demo-action',receive);return()=>window.removeEventListener('suite-demo-action',receive);},[]);
  const all=catalogue.filter(entry=>view==='all'||entry.scale===view);
  const [selected,setSelected]=useState(()=>all.find(e=>e.id===new URLSearchParams(location.search).get('part'))?.id??all[0]?.id);
  useEffect(()=>{const sync=()=>{const id=new URLSearchParams(location.search).get('part');if(id&&all.some(e=>e.id===id)){setSelected(id);setQuery('');setCategory('all');}};window.addEventListener('popstate',sync);window.addEventListener('suite-route-change',sync);return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('suite-route-change',sync)}},[all]);
  const rows=all.filter(e=>[e.title,e.family,e.description,...e.exports,...e.categories].join(' ').toLowerCase().includes(query.toLowerCase())&&(category==='all'||e.categories.includes(category)));
  const families=[...new Map(rows.map(e=>[e.family,e])).values()];
  const entry=rows.find(e=>e.id===selected)??rows[0];
  const variants=entry ? all.filter(e=>e.family===entry.family) : [];
  const categories=[...new Set(all.flatMap(e=>e.categories))].sort();
  const Demo=entry ? demos[entry.id] : undefined;
  function choose(id:string){setSelected(id);const url=new URL(location.href);url.searchParams.set('part',id);history.replaceState(null,'',url);}
  const totalFamilies=new Set(all.map(e=>e.family)).size;
  return <section className="component-library" aria-label="Source component browser">
    <div className="library-toolbar"><div><strong>{totalFamilies} source families</strong><span>{all.length} runnable examples and variants</span></div><label className="library-search">Find a component<input type="search" placeholder="Search names, exports or jobs…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div>
    <div className="library-categories" role="group" aria-label="Component categories"><button aria-pressed={category==='all'} onClick={()=>setCategory('all')}>All</button>{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
    <div className="library-layout"><nav className="library-families" aria-label="Included source families"><p>{families.length} matching families</p>{families.map(e=><button key={e.family} aria-current={entry?.family===e.family?'true':undefined} onClick={()=>choose(e.id)}><strong>{e.title}</strong><small>{all.filter(v=>v.family===e.family).length} examples · {e.scale}</small></button>)}</nav>
      <div className="library-detail">{entry&&Demo?<><div className="library-detail-heading"><div><p className="eyebrow">ORIGINAL ARC SOURCE · MIT</p><h2>{entry.title}</h2><p>{entry.description}</p></div><label>Preview theme<select value={theme} onChange={e=>setTheme(e.target.value as 'dark'|'light')}><option value="dark">Dark</option><option value="light">Light</option></select></label></div>
        {variants.length>1&&<div className="library-categories" role="group" aria-label="Source variants">{variants.map(v=><button key={v.id} aria-pressed={v.id===entry.id} onClick={()=>choose(v.id)}>{human(v.variant)}</button>)}</div>}
        <SourceAtomScope theme={theme} accent="orange"><SourceBlockScope theme={theme} accent="orange"><div className="library-stage" onClickCapture={event=>{const link=(event.target as Element).closest('a[href]');const href=link?.getAttribute('href');if(link&&!link.hasAttribute('download')&&href&&(href.startsWith('/')||href.startsWith('#'))){event.preventDefault();setAction(`Example navigation requested: ${href}`);}}}><DemoBoundary key={entry.id+'-'+theme}><Suspense fallback={<p role="status">Loading the original example…</p>}><Demo/></Suspense></DemoBoundary></div></SourceBlockScope></SourceAtomScope>
        <p className="quiet" role="status">{action||'Interactive source example. Data and app callbacks belong to the consuming product.'}</p>
        <div className="library-contract"><div><h3>Take the source</h3><pre>{`import { ${entry.exports.filter(n=>/^[A-Z]/.test(n)&&!/(Props|Item|Data|Options|Variant|Size|Entry|Series|Datum)$/.test(n)).slice(0,2).join(', ')} } from "@siso/ui/${entry.package}/source"\nimport "@siso/ui/${entry.package}/${entry.package==='charts'?'styles':'source'}.css"`}</pre><a href={entry.source} target="_blank" rel="noreferrer">Original documentation ↗</a></div><div><h3>Use it for</h3><ul>{entry.use.map(line=><li key={line}>{line}</li>)}</ul>{entry.avoid.length>0&&<details><summary>When another part fits better</summary><ul>{entry.avoid.map(line=><li key={line}>{line}</li>)}</ul></details>}</div></div>
      </>:<p className="quiet">No source examples match this search.</p>}</div></div>
  </section>;
}
