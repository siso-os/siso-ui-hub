// uihub: siso:package-workbench
import { useEffect, useState, lazy, Suspense, type ReactNode } from "react"
import { ArcScope } from "@siso/ui/charts/source"
import { demoLoaders } from "./expanded-loaders"
const MoreStreamgraph=lazy(demoLoaders["streamgraph--default"])
const MoreBrush=lazy(demoLoaders["brush-chart--default"])
const MoreRidgeline=lazy(demoLoaders["ridgeline--default"])
const StreamgraphExample=()=> <ArcScope><MoreStreamgraph/></ArcScope>
const BrushExample=()=> <ArcScope><MoreBrush/></ArcScope>
const RidgelineExample=()=> <ArcScope><MoreRidgeline/></ArcScope>
import { Button } from "@siso/ui/atoms"
import { SisoScatter, SisoWaterfall, SisoCandlestick, SisoBoxPlot } from "@siso/ui/charts/series"
import { SisoTreemap, SisoWaffleChart, SisoBulletChart, SisoCohortHeatmap, SisoSlopeChart } from "@siso/ui/charts/special"
import { SisoGoalRing } from "@siso/ui/charts/basic"
import { SisoRangeArea, SisoFunnel, SisoMatrixHeatmap, SisoTrendCard } from "@siso/ui/charts"
import Original0 from "./chart-demos/arc--slope-chart"
import Original1 from "./chart-demos/arc--treemap"
import Original2 from "./chart-demos/arc--waffle-chart"
import Original3 from "./chart-demos/siso--arc-bars"
import Original4 from "./chart-demos/siso--arc-donut"
import Original5 from "./chart-demos/siso--arc-gauge"
import Original6 from "./chart-demos/siso--arc-heatmap"
import Original7 from "./chart-demos/siso--arc-line"
import Original8 from "./chart-demos/siso--arc-sparkline"
import Original9 from "./chart-demos/siso--area-green-red"
import Original10 from "./chart-demos/siso--area-rainbow"
import Original11 from "./chart-demos/siso--area-spiky"
import Original12 from "./chart-demos/siso--bars-horizontal"
import Original13 from "./chart-demos/siso--bars-stacked"
import Original14 from "./chart-demos/siso--donut"
import Original15 from "./chart-demos/siso--funnel"
import Original16 from "./chart-demos/siso--heatmap-matrix-incidents"
import Original17 from "./chart-demos/siso--heatmap-matrix-tips"
import Original18 from "./chart-demos/siso--line-dashed"
import Original19 from "./chart-demos/siso--radar"
import Original20 from "./chart-demos/siso--radial-semi"
import Original21 from "./chart-demos/siso--range-area"
import Original22 from "./chart-demos/siso--trend-card"
import OriginalComposed from "./chart-demos/siso--composed"
import OriginalSankey from "./chart-demos/siso--sankey"
const FullPresets=lazy(()=>import("./presets"))
const EChartsPresets=lazy(()=>import("./echarts"))
const fixture = [{label:"Mon",low:80,high:140,value:110},{label:"Tue",low:95,high:160,value:128},{label:"Wed",low:90,high:150,value:122},{label:"Thu",low:115,high:185,value:145},{label:"Fri",low:135,high:215,value:178}]
const additionalDemos: Record<string, () => ReactNode> = {
  "Scatter / bubble": () => <SisoScatter title="Example: effort and impact" data={[{id:"a",label:"A",x:12,y:25,size:10},{id:"b",label:"B",x:34,y:65,size:30},{id:"c",label:"C",x:58,y:48,size:18},{id:"d",label:"D",x:75,y:82,size:42}]} bubble reference={{x:45,y:50}} />,
  "Waterfall": () => <SisoWaterfall title="Example: a balance bridge" data={[{label:"Start",value:120,kind:"total"},{label:"Added",value:45},{label:"Used",value:-28},{label:"Added",value:30},{label:"End",value:167,kind:"total"}]} />,
  "Candlestick / OHLC": () => <SisoCandlestick title="Example: interval summaries" data={[{label:"Mon",open:80,high:110,low:60,close:98},{label:"Tue",open:98,high:120,low:83,close:89},{label:"Wed",open:89,high:125,low:85,close:114}]} />,
  "Box plot": () => <SisoBoxPlot title="Example: latency distribution" data={[{label:"A",low:10,q1:25,median:38,q3:55,high:78,outliers:[92]},{label:"B",low:20,q1:35,median:48,q3:65,high:90,outliers:[115]}]} />,
  "Treemap": () => <SisoTreemap title="Example: work by category" data={[{id:"a",label:"Design",value:35},{id:"b",label:"Build",value:50},{id:"c",label:"Verify",value:25},{id:"d",label:"Ship",value:15}]} />,
  "Waffle": () => <SisoWaffleChart title="Example: work distribution" data={[{id:"a",label:"Ready",value:55},{id:"b",label:"In progress",value:30},{id:"c",label:"Queued",value:15}]} />,
  "Bullet / target": () => <SisoBulletChart title="Example: target and actual" data={[{id:"a",label:"Delivery",value:72,target:80,max:100,ranges:[50,80]},{id:"b",label:"Coverage",value:91,target:90,max:100,ranges:[50,80]}]} />,
  "Cohort retention": () => <SisoCohortHeatmap title="Example: cohort retention" data={[{id:"a",label:"Week 1",size:100,retained:[100,76,62,54]},{id:"b",label:"Week 2",size:120,retained:[120,96,72,null]},{id:"c",label:"Week 3",size:80,retained:[80,56,null,null]}]} />,
  "Slope": () => <SisoSlopeChart title="Example: before and after" data={[{id:"a",label:"A",before:45,after:68},{id:"b",label:"B",before:72,after:60},{id:"c",label:"C",before:30,after:52}]} />,
  "Range area": () => <SisoRangeArea title="Example: forecast range" data={fixture} xDataKey="label" midLabel="Mid estimate" />,
  "Funnel": () => <SisoFunnel stages={[{name:"Visitors",value:12000},{name:"Views",value:7800},{name:"Cart",value:3120},{name:"Checkout",value:1872},{name:"Purchased",value:1248}]} />,
  "Matrix heatmap": () => <SisoMatrixHeatmap rows={["Service A","Service B","Service C"]} cols={["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]} values={[[1,4,2,7,3,4,8],[3,6,5,1,4,2,7],[6,4,1,8,4,9,3]]} tone="red" caption="Example: observations by service and day" valueLabel="Observations" />,
  "Trend": () => <SisoTrendCard title="Example: current against baseline" value={178} delta="+14%" tone="up" data={fixture.map((r,i)=>({day:r.label,current:r.value,previous:r.low+i*2}))} />,
  "Goal ring": () => <SisoGoalRing value={1240} goal={2000} />,
}
const originals = [
 {name:"Streamgraph · flowing series",Demo:StreamgraphExample,source:"app/src/arc/streamgraph/streamgraph.tsx"},
 {name:"Brush chart · select a range",Demo:BrushExample,source:"app/src/arc/brush-chart/brush-chart.tsx"},
 {name:"Ridgeline · distributions",Demo:RidgelineExample,source:"app/src/arc/ridgeline/ridgeline.tsx"},
 {name:"Composed · bars and line",Demo:OriginalComposed,source:"packages/siso-charts/src/charts/composed-chart.tsx"},
 {name:"Sankey · gradient flows",Demo:OriginalSankey,source:"packages/siso-charts/src/charts/sankey-chart.tsx"},
  {name:"Slope \u00b7 ranks and focus", Demo:Original0, source:"charts/demos/arc--slope-chart.tsx"},
  {name:"Treemap \u00b7 drill and zoom", Demo:Original1, source:"charts/demos/arc--treemap.tsx"},
  {name:"Waffle \u00b7 animated allocation", Demo:Original2, source:"charts/demos/arc--waffle-chart.tsx"},
  {name:"Bars \u00b7 animated scrubber", Demo:Original3, source:"charts/demos/siso--arc-bars.tsx"},
  {name:"Donut \u00b7 interactive", Demo:Original4, source:"charts/demos/siso--arc-donut.tsx"},
  {name:"Gauge \u00b7 animated thresholds", Demo:Original5, source:"charts/demos/siso--arc-gauge.tsx"},
  {name:"Contribution calendar \u00b7 interactive", Demo:Original6, source:"charts/demos/siso--arc-heatmap.tsx"},
  {name:"Lines \u00b7 animated scrubber", Demo:Original7, source:"charts/demos/siso--arc-line.tsx"},
  {name:"Sparkline \u00b7 rolling readout", Demo:Original8, source:"charts/demos/siso--arc-sparkline.tsx"},
  {name:"Area \u00b7 hatched comparison", Demo:Original9, source:"charts/demos/siso--area-green-red.tsx"},
  {name:"Area \u00b7 rainbow layers", Demo:Original10, source:"charts/demos/siso--area-rainbow.tsx"},
  {name:"Area \u00b7 spiky trend", Demo:Original11, source:"charts/demos/siso--area-spiky.tsx"},
  {name:"Bars \u00b7 horizontal", Demo:Original12, source:"charts/demos/siso--bars-horizontal.tsx"},
  {name:"Bars \u00b7 slim stacked", Demo:Original13, source:"charts/demos/siso--bars-stacked.tsx"},
  {name:"Donut \u00b7 full colour", Demo:Original14, source:"charts/demos/siso--donut.tsx"},
  {name:"Funnel \u00b7 conversion", Demo:Original15, source:"charts/demos/siso--funnel.tsx"},
  {name:"Heatmap \u00b7 incidents", Demo:Original16, source:"charts/demos/siso--heatmap-matrix-incidents.tsx"},
  {name:"Heatmap \u00b7 tips", Demo:Original17, source:"charts/demos/siso--heatmap-matrix-tips.tsx"},
  {name:"Line \u00b7 stepped / dashed", Demo:Original18, source:"charts/demos/siso--line-dashed.tsx"},
  {name:"Radar \u00b7 filled", Demo:Original19, source:"charts/demos/siso--radar.tsx"},
  {name:"Radial \u00b7 semi circle", Demo:Original20, source:"charts/demos/siso--radial-semi.tsx"},
  {name:"Range area \u00b7 forecast", Demo:Original21, source:"charts/demos/siso--range-area.tsx"},
  {name:"Trend \u00b7 comparison card", Demo:Original22, source:"charts/demos/siso--trend-card.tsx"},
]
export default function ChartPage() {
 const [collection,setCollection]=useState(()=>{const params=new URLSearchParams(location.search);return params.has("epreset")?"echarts":params.has("preset")?"presets":"source"})
 const [selected,setSelected] = useState("Area · rainbow layers")
 const [query,setQuery]=useState("")
 useEffect(()=>{const sync=()=>{const params=new URLSearchParams(location.search);if(params.has("epreset"))setCollection("echarts");else if(params.has("preset"))setCollection("presets")};window.addEventListener('popstate',sync);window.addEventListener('suite-route-change',sync);return()=>{window.removeEventListener('popstate',sync);window.removeEventListener('suite-route-change',sync)}},[])
 const original = originals.find(d=>d.name===selected)
 const Demo = original?.Demo
 const showCollection=(next:"source"|"presets"|"echarts")=>{setCollection(next);const url=new URL(location.href);url.searchParams.delete("epreset");url.searchParams.delete("preset");history.replaceState(null,"",url)}
 return <section className="source-gallery"><div className="library-categories" role="group" aria-label="Chart collections"><button aria-pressed={collection==="source"} onClick={()=>showCollection("source")}>Source + custom examples · 42</button><button aria-pressed={collection==="presets"} onClick={()=>showCollection("presets")}>Full Recharts presets · 117</button><button aria-pressed={collection==="echarts"} onClick={()=>showCollection("echarts")}>ECharts presets · 135</button></div>{collection==="presets"?<Suspense fallback={<p role="status">Loading preset bank…</p>}><FullPresets/></Suspense>:collection==="echarts"?<Suspense fallback={<p role="status">Loading ECharts preset bank…</p>}><EChartsPresets/></Suspense>:<>
  <div className="source-gallery-head"><div><h2>{originals.length + Object.keys(additionalDemos).length} chart examples and API adapters</h2><p>Original layouts, tooltips, motion, scrubbing and keyboard controls. Data below is illustrative.</p></div><a href="https://charts-curated.siso-show.pages.dev/" target="_blank" rel="noreferrer">Original chart collection ↗</a></div>
  <label className="library-search">Find a chart<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search chart types or interactions…"/></label><div className="source-gallery-layout"><nav className="source-picker" aria-label="Chart examples"><p className="picker-label">Selected implementations · {originals.length}</p>{originals.filter(d=>d.name.toLowerCase().includes(query.toLowerCase())).map(d=><button type="button" key={d.name} aria-pressed={selected===d.name} onClick={()=>setSelected(d.name)}>{d.name}<span>Source</span></button>)}<p className="picker-label">Additional SISO APIs · {Object.keys(additionalDemos).length}</p>{Object.keys(additionalDemos).filter(name=>name.toLowerCase().includes(query.toLowerCase())).map(name=><button type="button" key={name} aria-pressed={selected===name} onClick={()=>setSelected(name)}>{name}<span>SISO</span></button>)}</nav>
   <div className="source-stage"><div className="source-stage-title"><h3>{selected}</h3><span>{original ? "Original implementation" : "Additional implementation"}</span></div><div className="chart-preview source-chart" key={selected}><Suspense fallback={<p role="status">Loading the original chart…</p>}>{Demo?<Demo/>:additionalDemos[selected]?.()}</Suspense></div>{original&&<p className="source-path"><code>{original.source}</code><span>Imports the installed @siso/charts package</span></p>}</div>
  </div>
 </>}</section>
}
