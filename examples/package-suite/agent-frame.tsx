// uihub: siso:package-workbench
import { useState } from 'react'
import { Boxes, House, BookOpen, PanelLeft, Settings } from 'lucide-react'
import { AppFrame, RailButton, RailDivider, PillTabs, TopButton, SummaryCard, CardSection, CardRow, SidePanel } from '@siso/shells/agent-base'
import { GroupedRail, RailGroup, RailRow, RailDock } from '@siso/navigation/agent-base'
import '@siso/shells/agent-base.css'
import '@siso/navigation/agent-base.css'

/** Source desktop chrome with explicitly neutral, consumer-owned fixture data. */
export default function AgentFrame() {
  const [page, setPage] = useState('overview')
  const [tab, setTab] = useState('source')
  const [folded, setFolded] = useState(false)
  const [panel, setPanel] = useState(false)
  return <section style={{display:'grid',gap:16}} aria-label="Original Agent Base desktop shell">
    <div><h2>The existing Agent Base desktop frame</h2><p>The original AppFrame, rail buttons, glass pill tabs, grouped sidebar and summary panel. Page labels below are demonstration fixtures.</p></div>
    <div style={{height:700,position:'relative',overflow:'hidden',border:'1px solid var(--crm-color-line-subtle)',borderRadius:16}}>
      <AppFrame top={<><TopButton label="Toggle fixture sidebar" Icon={PanelLeft} onClick={()=>setFolded(!folded)} pressed={!folded}/><PillTabs tabs={[{id:'source',label:'Source example'},{id:'details',label:'Component details'}]} activeId={tab} onActivate={setTab}/></>}
        rail={<><RailButton label="Fixture overview" Icon={House} active={page==='overview'} onClick={()=>setPage('overview')}/><RailButton label="Fixture library" Icon={Boxes} active={page==='library'} onClick={()=>setPage('library')}/><RailDivider/><RailButton label="Fixture docs" Icon={BookOpen} active={page==='docs'} onClick={()=>setPage('docs')}/></>}
        railFooter={<RailButton label="Fixture details" Icon={Settings} onClick={()=>setPanel(!panel)}/>}>
        <div style={{height:'100%',display:'flex',minWidth:0}}>
          {!folded&&<GroupedRail className="siso-sidebar--inline" name="Demo workspace" brand={<Boxes/>} collapsed={false} onToggle={()=>setFolded(true)} dock={<RailDock orb={<House size={16}/>} name="Demo operator" status="Fixture · local" collapsed={false}/>}>
            <RailGroup label="Pages" id="source-demo-pages">{['overview','library','docs'].map(id=><RailRow key={id} id={id} name={id} active={page===id} onOpen={()=>setPage(id)}/>)}</RailGroup>
          </GroupedRail>}
          <div style={{padding:24,flex:1,minWidth:0,overflow:'auto'}}><p style={{opacity:.6}}>NEUTRAL PACKAGE EXAMPLE</p><h3>{page} / {tab}</h3><p>The consumer owns this page. All surrounding shell controls come from the existing package source.</p><SummaryCard label="Source shell parts"><CardSection title="Installed components"><CardRow Icon={PanelLeft} label="Grouped sidebar" detail={folded?'Hidden':'Visible'} onClick={()=>setFolded(!folded)}/><CardRow Icon={BookOpen} label="Source details" detail="Open" onClick={()=>setPanel(true)}/></CardSection></SummaryCard></div>
          {panel&&<SidePanel title="Source details" storeKey="source-workbench-panel" onClose={()=>setPanel(false)}><p>The original summary card opens the original resizable side panel. This example supplies its content and state.</p></SidePanel>}
        </div>
      </AppFrame>
    </div>
  </section>
}
