// uihub: siso:hub-side-nav
import { useMemo, useState } from 'react';
import { Atom, Blocks, BookOpen, Boxes, Building2, Code2, House, Layers, LayoutGrid, MapPinned, Palette, ScrollText, Search, Sparkles } from 'lucide-react';
import { SisoHubSideNav, type SisoHubNavGroup, type SisoHubNavItem } from '@siso/ui/navigation';
import '@siso/ui/navigation/hub.css';
import { GroupedRail, RailGroup, RailIcon, RailCapsule, RailDock, RailRow, SortableRail } from '@siso/ui/navigation/agent-base';
import '@siso/ui/navigation/agent-base.css';

/** Explicit demonstration fixture. No live catalogue, account, auth or backend records. */
function OriginalHubNavigation() {
  const [factory, setFactory] = useState(true);
  const [behavior, setBehavior] = useState<'fold' | 'drill'>('drill');
  const [tab, setTab] = useState('components');
  const [core, setCore] = useState('ui');
  const [active, setActive] = useState('buttons');
  const [folded, setFolded] = useState(false);
  const [search, setSearch] = useState(false);
  const [width, setWidth] = useState(256);
  const cores: SisoHubNavGroup[] = [{id:'make',label:'Make',items:[{id:'ui',label:'UI',href:'#ui',icon:Blocks,count:128},{id:'sites',label:'Sites',href:'#sites',icon:LayoutGrid,count:12}]},{id:'know',label:'Know',items:[{id:'industries',label:'Industries',href:'#industries',icon:Building2,count:8}]}];
  const groups = useMemo<SisoHubNavGroup[]>(() => core !== 'ui' ? [{id:'overview',items:[{id:`${core}-home`,label:'Overview',href:`#${core}`,icon:House,count:12}]},{id:'parts',label:'Parts',items:[{id:'templates',label:'Templates',href:'#templates',icon:LayoutGrid,count:6},{id:'guides',label:'Guides',href:'#guides',icon:BookOpen,count:3}]}] : [{id:'kit',label:'In the SISO kit',items:[{id:'all',label:`All ${tab}`,href:`#${tab}`,icon:tab === 'atoms' ? Atom : Boxes,count:128},{id:'actions',label:'Actions',icon:Sparkles,count:16,behavior,children:[{id:'buttons',label:'Buttons',href:'#buttons',icon:Blocks,count:8,dot:true},{id:'menus',label:'Menus',href:'#menus',icon:Layers,count:8}]},{id:'inputs',label:'Inputs',icon:Code2,count:12,behavior,children:[{id:'text',label:'Text inputs',href:'#text',count:6},{id:'choices',label:'Choices',href:'#choices',count:6}]}]},{id:'library',label:'From the library',description:'Demonstration fixture · consumer-owned counts',items:[{id:'layouts',label:'Layouts',href:'#layouts',icon:LayoutGrid,count:24},{id:'looks',label:'Looks',href:'#looks',icon:Palette,count:32}]}], [core,tab,behavior]);
  const places:SisoHubNavItem[]=[{id:'start',label:'Start here',href:'#start',icon:Sparkles},{id:'home',label:'Home',href:'#home',icon:House},{id:'map',label:'The map',href:'#map',icon:MapPinned},{id:'papers',label:'White papers',href:'#papers',icon:ScrollText}];
  return <section aria-label="Original Hub side navigation" className="space-y-4">
    <div><h2 className="text-2xl font-semibold">The current Hub side nav</h2><p className="text-sm text-muted-foreground">Source presentation from looks v8–v11. The groups and counts below are a neutral fixture supplied by this consumer.</p></div>
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <label>Header <select value={factory?'factory':'public'} onChange={event=>setFactory(event.target.value==='factory')}><option value="factory">App Factory / core switcher</option><option value="public">Public Hub / brand link</option></select></label>
      <label>Nested rows <select value={behavior} onChange={event=>setBehavior(event.target.value as 'fold'|'drill')}><option value="drill">Drill + back</option><option value="fold">Inline foldouts</option></select></label>
      <label>Top tab <select value={tab} onChange={event=>setTab(event.target.value)}><option value="components">Components</option><option value="atoms">Atoms</option><option value="looks">Looks</option></select></label>
      <label>Width <input aria-label="Navigation width" type="range" min={216} max={400} value={width} onChange={event=>setWidth(Number(event.target.value))}/><span className="font-mono">{width}px</span></label>
    </div>
    <div className="relative flex h-[640px] overflow-hidden rounded-xl border bg-frame text-foreground">
      {!folded && <aside className="h-full shrink-0 border-r bg-sidebar" style={{width,maxWidth:'85vw'}}><SisoHubSideNav groups={groups} coreGroups={cores} coreId={core} coreLabel={core==='ui'?'UI':core==='sites'?'Sites':'Industries'} activeId={active} factory={factory} places={places} viewKey={`${tab}:${behavior}`} defaultExpandedIds={['actions']} onSearch={()=>setSearch(true)} onFold={()=>setFolded(true)} onCoreChange={item=>setCore(item.id)} onNavigate={(item,event)=>{event.preventDefault();setActive(item.id)}} foot={{version:'v0.2',subtitle:'Demonstration fixture',docsHref:'#fixture-docs',changelogHref:'#fixture-changelog',packagesHref:'#fixture-packages',releases:[{id:'fixture',name:'Navigation fixture',v:'0.2',when:'Demo',note:'Original Hub rows, moving glyphs and navigation chrome extracted into the installed package.'}],shortcuts:[['⌘K','Search'],['/','Search']]}} /></aside>}
      <div className="min-w-0 flex-1 p-6"><button type="button" className="siso-press rounded-md border px-3 py-1.5 text-sm" onClick={()=>setFolded(!folded)}>{folded?'Open navigation':'Fold navigation'}</button><h3 className="mt-6 text-lg font-semibold">{active}</h3><p className="mt-2 text-sm text-muted-foreground">Switch cores in the header, drill into Actions or Inputs, use Back, change top tabs, hover a glyph, or open the version/help footer.</p></div>
      {search && <div className="absolute inset-0 z-50 flex items-start justify-center bg-black/40 p-6 pt-20" onClick={()=>setSearch(false)}><div role="dialog" aria-label="Fixture search" className="w-full max-w-md rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg" onClick={event=>event.stopPropagation()}><div className="flex items-center gap-2"><Search size={16}/><input autoFocus aria-label="Search fixture navigation" placeholder="Search fixture navigation…" className="min-w-0 flex-1 bg-transparent outline-none" onKeyDown={event=>{if(event.key==='Escape')setSearch(false)}}/><button type="button" onClick={()=>setSearch(false)} aria-label="Close search">×</button></div><p className="mt-4 text-sm text-muted-foreground">Search UI is this consumer's callback demonstration; package navigation imports no search backend.</p></div></div>}
    </div>
  </section>;
}
export { HubNavigation };


function AgentBaseRailDemo() {
  const [collapsed, setCollapsed] = useState(false);
  const [ids, setIds] = useState(['fixture-one', 'fixture-two', 'fixture-three']);
  const [active, setActive] = useState('fixture-one');
  const [searched, setSearched] = useState(false);
  return <section className="space-y-4" aria-label="Existing Agent Base grouped rail">
    <div><h2 className="text-2xl font-semibold">The existing GroupedRail</h2><p className="text-sm text-muted-foreground">Original @siso/side-nav source and byte-identical CSS. All rows, operator details and counts below are demonstration fixtures.</p></div>
    <div className="flex h-[640px] overflow-hidden rounded-xl border bg-frame text-foreground">
      <GroupedRail className="siso-sidebar--inline" name="Demo workspace" brand={<House />} collapsed={collapsed} onToggle={()=>setCollapsed(!collapsed)} onSearch={()=>setSearched(!searched)} searchLabel="Search fixture…"
        compact={<div><RailIcon label="Fixture overview" Icon={House} onClick={()=>setActive('overview')} active={active==='overview'}/><RailIcon label="Fixture library" Icon={Boxes} onClick={()=>setActive('library')} active={active==='library'}/></div>}
        top={<RailCapsule label="Fixture spaces"><RailIcon label="Overview" Icon={House} active={active==='overview'} onClick={()=>setActive('overview')}/><RailIcon label="Library" Icon={Boxes} active={active==='library'} onClick={()=>setActive('library')}/></RailCapsule>}
        utilities={<RailCapsule label="Fixture utilities"><RailIcon label="Fixture search" Icon={Search} onClick={()=>setSearched(!searched)}/><RailIcon label="Fixture docs" Icon={BookOpen}/></RailCapsule>}
        dock={<RailDock collapsed={collapsed} orb={<Sparkles size={18}/>} name="Demo operator" status="Fixture · local" />}>
        <RailGroup id="fixture-projects" label="Demo records" note={ids.length}>
          <SortableRail ids={ids} onReorder={setIds}>{ids.map((id,index)=><RailRow key={id} id={id} name={id.replace('fixture-','Record ')} sub="Consumer-owned fixture" quiet="Demo" active={active===id} mark={<Blocks size={15}/>} meta={index+1} onOpen={()=>setActive(id)}/>)}</SortableRail>
        </RailGroup>
      </GroupedRail>
      <div className="min-w-0 flex-1 p-6"><h3 className="text-lg font-semibold">{active}</h3><p className="mt-2 text-sm text-muted-foreground">Drag the three fixture rows to reorder. Click or press Enter/Space to open. Collapse using the source header control.</p><p className="mt-4 font-mono text-xs">Order: {ids.join(', ')}</p>{searched && <p role="status" className="mt-4 text-sm">The source search callback fired. The consumer owns its palette.</p>}</div>
    </div>
  </section>;
}

export default function HubNavigation() {
  const [source, setSource] = useState('hub');
  return <div className="space-y-5"><label className="flex items-center gap-3 text-sm">Existing navigation source<select value={source} onChange={event=>setSource(event.target.value)}><option value="hub">Current UI Hub · source v8–v11</option><option value="agent-base">Agent Base / SISO CRM · GroupedRail</option></select></label>{source==='hub'?<OriginalHubNavigation/>:<AgentBaseRailDemo/>}</div>;
}
