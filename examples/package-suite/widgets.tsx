// uihub: siso:package-workbench
import { useState } from 'react';
import { SisoWidgetBoard, defaultWidgetLayout, exportWidgetLayout, type WidgetDefinition, type WidgetRegistry, type WidgetData } from '@siso/ui/widgets';
import { ArcBars } from '@siso/ui/charts';
import { SisoGoalRing } from '@siso/ui/charts/basic';
const widgets:WidgetDefinition[]=[
 {id:'pulse',type:'pulse',title:'Today at a glance',description:'Example operating dashboard',band:'glance',span:12,locked:true,fill:'natural'},
 {id:'activity',type:'activity',title:'Work completed',description:'Example observations over a week',band:'work',span:7,sizes:['M','L','XL'],fill:'natural'},
 {id:'queue',type:'queue',title:'Next actions',description:'A short queue with useful actions',band:'work',span:5,sizes:['M','L','XL'],fill:'natural'},
 {id:'goal',type:'goal',title:'Weekly goal',band:'detail',span:4,sizes:['S-wide','M','XL'],fill:'natural'},
 {id:'feed',type:'feed',title:'Recent activity',band:'detail',span:8,sizes:['M','L','XL'],fill:'natural'},
];
const registry:WidgetRegistry={
 pulse:{label:'Key numbers',render:()=> <div className="stats"><div><b>24</b><span>completed</span></div><div><b>3</b><span>need a decision</span></div><div><b>2</b><span>running</span></div><div><b>96%</b><span>on time</span></div></div>},
 activity:{label:'Trend chart',render:()=> <ArcBars label="Completed tasks" period="Illustrative week" data={[12,18,14,24,20,28,24].map((value,i)=>({key:String(i),label:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i],value}))} showAverage={false}/>,detail:()=> <p>The chart is the widget content. The shared frame supplies its title, loading and failure states, resize controls and this detail area.</p>},
 queue:{label:'Action queue',render:()=> <ul style={{listStyle:'none',padding:0,margin:0}}>{['Review a finished draft','Check a queued release','Reply to a design question'].map((line,i)=><li key={line} style={{padding:'14px 0',borderBottom:'1px solid var(--border)',display:'flex',gap:12}}><span style={{opacity:.45}}>0{i+1}</span>{line}</li>)}</ul>,detail:()=> <p>Supply the consuming product’s real records and action handlers. This preview uses labelled example data.</p>},
 goal:{label:'Progress ring',render:()=> <SisoGoalRing value={24} goal={32}/>},
 feed:{label:'Activity list',render:()=> <div>{['A draft was reviewed','A release finished building','A new item joined the queue'].map((line,i)=><p key={line} style={{display:'flex',justifyContent:'space-between',gap:16,padding:'9px 0'}}><span>{line}</span><small style={{opacity:.5}}>{i+1}h ago</small></p>)}</div>},
};
export default function WidgetPlayground(){
 const [layout,setLayout]=useState(()=>defaultWidgetLayout(widgets)),[state,setState]=useState<WidgetData['state']>('ready'),[saved,setSaved]=useState('');
 const status:WidgetData=state==='ready'?{state,data:null}:state==='stale'?{state,data:null,age:'5 minutes'}:state==='empty'?{state,reason:'No observations in this example period'}:state==='error'?{state,message:'Example data source unavailable'}:{state};
 return <section><p className="lead">A widget is a useful piece of a dashboard: a number, chart, queue or activity feed. The package gives each one a consistent frame and makes the whole board fit.</p><div className="widget-explanation"><article><h3>1. Put your content inside</h3><p>Use a chart, table, task list or your own component. Below are five examples with illustrative data.</p></article><article><h3>2. Arrange the dashboard</h3><p>Use each widget’s size, move and hide controls. Add it back from the board. The same board stacks on a phone.</p></article><article><h3>3. Keep every data state</h3><p>Try loading, empty, error or stale. Open Details, then export the layout to see the saved contract.</p></article></div><div className="toolbar"><label>Example data state <select aria-label="Widget data state" value={state} onChange={e=>setState(e.target.value as WidgetData['state'])}>{['ready','loading','empty','error','stale'].map(s=><option key={s}>{s}</option>)}</select></label><button onClick={()=>setSaved(exportWidgetLayout(layout,widgets))}>Export layout</button><button onClick={()=>{setLayout(defaultWidgetLayout(widgets));setState('ready');setSaved('')}}>Reset board</button></div><SisoWidgetBoard widgets={widgets} registry={registry} layout={layout} onLayoutChange={setLayout} onRetry={()=>setState('ready')} data={Object.fromEntries(widgets.map(w=>[w.id,w.id==='pulse'?{state:'ready',data:null}:status]))}/>{saved&&<details open><summary>Exported layout</summary><pre aria-label="Exported widget layout">{saved}</pre></details>}</section>;
}
