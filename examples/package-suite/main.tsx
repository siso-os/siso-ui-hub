// uihub: siso:package-workbench
import { lazy, Suspense, useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import { SisoHubShell, SisoAppShell, SisoHubSourceShell } from "@siso/ui/shells"
import { SisoSideNav, SisoHubSideNav, SisoHubPillSwitch, type SisoNavGroup, type SisoHubNavGroup } from "@siso/ui/navigation"
import { SisoWidgetBoard, defaultWidgetLayout, exportWidgetLayout, type WidgetDefinition, type WidgetRegistry, type WidgetData } from "@siso/ui/widgets"
import { Button, Field, Input, PasswordField, Checkbox, Switch, Badge, Tabs, TabsList, TabsTrigger, TabsContent, ConfirmButton, CopyButton } from "@siso/ui/atoms"
import { SisoDataTable, SisoDialog, SisoCommandPalette, SisoPopover, type SisoTableColumn } from "@siso/ui/blocks"
import { ArcBars } from "@siso/ui/charts"
import { setSisoTheme, setSisoTokenSet } from "@siso/ui/tokens"
import "@siso/ui/styles.css"
import "./styles.css"
import { Atom, Blocks, ChartColumnIncreasing, LayoutGrid, Package as PackageIcon, Palette, PanelsTopLeft, Route, Sparkles, Sun, Moon, BookOpen, Code2 } from "lucide-react"
import index from "./inventory.json"
import arcCatalogue from "./arc-catalogue.json"
import presetEntries from "./presets.json"
import echartsPresetEntries from "./echarts-presets.json"

setSisoTokenSet(document.documentElement, "hub", "dark")
document.documentElement.dataset.suiteErrors = "0"
const recordError = () => { document.documentElement.dataset.suiteErrors = String(Number(document.documentElement.dataset.suiteErrors || 0) + 1) }
addEventListener("error", recordError)
addEventListener("unhandledrejection", recordError)

const ChartPage = lazy(() => import("./charts"))
const SourceShells = lazy(() => import("./source-shells"))
const SourceAtoms = lazy(() => import("./source-atoms"))
const SourceBlocks = lazy(() => import("./source-blocks"))
const HubNavigation = lazy(() => import("./hub-navigation"))
const TokenPage = lazy(() => import("./tokens"))
const SitePage = lazy(() => import("./site"))
const ComponentBrowser = lazy(() => import("./component-browser"))
const Notifications = lazy(() => import("./notifications"))
const AssetLibrary = lazy(() => import("./assets"))
const WidgetPlayground = lazy(() => import("./widgets"))
const FooterPage = lazy(() => import("./site").then(m => ({default:m.FooterExample})))
const VisualIndex = lazy(() => import("./visual-index"))

type Family = { name: string; exports: string[]; variants: string[] }
type Package = { id: string; name: string; version: string; about: string; familyCount: number; runtimeExports: string[]; families: Family[]; deferred: {name: string; reason: string}[] }
const packages = index.packages as Package[]
const componentTargets = arcCatalogue
const presetTargets = presetEntries
const targetCount = (scale: string) => new Set(componentTargets.filter(entry => entry.scale === scale).map(entry=>entry.family)).size
const get = (id: string) => packages.find(p => p.id === id)!
const pages = ["overview", ...packages.filter(p => p.id !== "ui").map(p => p.id), "components", "sections", "assets", "footer", "notifications", "use"]
const pageOf = () => pages.includes(location.hash.slice(1)) ? location.hash.slice(1) : "overview"
const columnData = packages.filter(p => p.id !== "ui").map(p => ({ key: p.id, label: p.name, axisLabel: p.id, value: p.runtimeExports.length }))
const counts = { atoms: get("atoms").familyCount, charts: get("charts").familyCount, blocks: get("blocks").familyCount }
const titles: Record<string, string> = { components:"Composed components", sections:"Page blocks and sections", assets:"The asset library", footer:"The accepted SISO footer", notifications:"Notification treatments", overview: "The SISO package", use: "Build with it", site: "The landing, blog, docs and assets", tokens: "The themes we already use", shells: "The actual SISO app frames", widgets: "Build a dashboard with widgets", charts: "The original chart collection", atoms: "The everyday controls", blocks: "Page blocks and sections", navigation: "Find your way around" }

function ExportList({ p }: { p: Package }) {
  return <div className="exports" aria-label={`${p.name} exports`}>{p.runtimeExports.map(name => <code key={name}>{name}</code>)}</div>
}
function PackageInventory({ p }: { p: Package }) {
  const [query, setQuery] = useState("")
  const rows = p.families.filter(f => [f.name, ...f.exports, ...f.variants].join(" ").toLowerCase().includes(query.toLowerCase()))
  return <section className="inventory"><div className="section-head"><h2>What’s inside</h2><Input type="search" aria-label="Filter included components" placeholder="Find a component or variation" value={query} onChange={e => setQuery(e.target.value)} /></div>
    {rows.length ? <div className="family-list">{rows.map(f => <div key={f.name} className="family"><strong>{f.name}</strong><div>{f.exports.map(n => <code key={n}>{n}</code>)}</div><small>{f.variants.join(" · ") || "Composable public API"}</small></div>)}</div> : <p className="quiet">No matching family.</p>}
    {!p.families.length && <ExportList p={p} />}
    {p.deferred.length > 0 && <details className="deferred"><summary>{p.deferred.length} references handled elsewhere or deferred</summary><ul>{p.deferred.map((d, i) => <li key={i}><strong>{d.name}</strong> — {d.reason}</li>)}</ul></details>}
  </section>
}
const defs: WidgetDefinition[] = [
  { id: "summary", type: "summary", title: "A real package release", band: "glance", span: 12, locked: true, fill: "natural" },
  { id: "coverage", type: "coverage", title: "The code we ship", description: "Public runtime exports, from the release inventory", band: "work", span: 7, sizes: ["M", "L", "XL"], minWidth: 360, fill: "natural" },
  { id: "ready", type: "ready", title: "Ready to compose", band: "work", span: 5, sizes: ["M", "L", "XL"], minWidth: 300, fill: "natural" },
  { id: "rules", type: "rules", title: "A place for every widget", band: "detail", span: 12, sizes: ["M", "L", "XL"], fill: "natural" },
]
const registry: WidgetRegistry = {
  summary: { label: "Release summary", render: () => <div className="stats"><div><b>{packages.length}</b><span>installable packages</span></div><div><b>{counts.atoms}</b><span>atom families</span></div><div><b>{counts.charts}</b><span>chart behaviors</span></div><div><b>{counts.blocks}</b><span>interaction blocks</span></div></div>, detail: () => <p>The umbrella is <code>@siso/ui</code>. Eight focused packages sit underneath it. Counts come from the compiled release inventory; exported functions and component families are counted separately.</p> },
  coverage: { label: "Package exports", render: () => <ArcBars label="Runtime exports" period="Installed package inventory" data={columnData} showAverage={false} />, detail: () => <ExportList p={get("charts")} /> },
  ready: { label: "Composition", render: () => <div className="composition"><p><span>01</span> Choose the hub or app shell.</p><p><span>02</span> Supply your navigation and data.</p><p><span>03</span> Fit widgets into glance, work and detail.</p><p><span>04</span> Reuse charts, controls and interactions.</p></div>, detail: () => <p>Routes, permissions, storage and APIs belong to the consuming product. The packages supply presentation and controlled behavior, so a new app brings only its data and decisions.</p> },
  rules: { label: "Fit rules", render: () => <div className="rule-strip"><span>12-column grid</span><span>16px gutters</span><span>Reading order preserved</span><span>Stack below 600px</span><span>Details open in place</span></div>, detail: () => <p>Allowed sizes are S=3, S-wide=4, M=6, L=8 and XL=12 columns. Widgets grow to satisfy their minimum width, wrap without filling artificial gaps, and stack when the actual container is narrow. Layouts validate and round-trip as versioned JSON.</p> },
}
function Dashboard({ controls = false }: {controls?: boolean}) {
  const [layout, setLayout] = useState(() => defaultWidgetLayout(defs))
  const [state, setState] = useState<WidgetData["state"]>("ready")
  const [saved, setSaved] = useState("")
  const status: WidgetData = state === "ready" ? {state, data: null} : state === "stale" ? {state, data: null, age: "Example: 5 minutes"} : state === "empty" ? {state, reason: "Example: no observations in this period"} : state === "error" ? {state, message: "Example: data source unavailable"} : {state}
  return <><div className="demo-label">This is a separate app using the installed packages.</div>
    {controls && <div className="toolbar"><label>Preview data state <select aria-label="Widget data state" value={state} onChange={e => setState(e.target.value as WidgetData["state"])}>{["ready","loading","empty","error","stale"].map(s => <option key={s}>{s}</option>)}</select></label><Button variant="outline" onClick={() => setSaved(exportWidgetLayout(layout, defs))}>Export this layout</Button>{saved && <output aria-label="Exported widget layout"><code>{saved}</code></output>}</div>}
    <SisoWidgetBoard widgets={defs} registry={registry} layout={layout} onLayoutChange={setLayout} onRetry={() => setState("ready")} data={{ summary: {state:"ready",data:null}, coverage: status, ready: {state:"ready",data:null}, rules: {state:"ready",data:null} }} />
  </>
}
function AtomPage() {
  const [text, setText] = useState("Your next product"), [enabled, setEnabled] = useState(true), [confirmed, setConfirmed] = useState(0)
  return <section className="demo-surface"><div className="demo-label">Real controls from the installed @siso/atoms package</div><div className="atom-grid"><div className="stack"><Field label="Project name" hint="Controlled by this consuming app">{props => <Input {...props} value={text} onChange={e=>setText(e.target.value)} />}</Field><PasswordField aria-label="Example password" placeholder="Example password" /><label className="inline"><Checkbox defaultChecked /> Include the shared shell</label><label className="inline"><Switch checked={enabled} onChange={e=>setEnabled(e.target.checked)} /> Live previews {enabled?"on":"off"}</label></div><div className="stack"><div className="inline"><Button>Primary action</Button><Button variant="outline">Secondary</Button><Button loading>Loading</Button></div><div className="inline"><Badge tone="success">Ready</Badge><Badge tone="warning">Needs input</Badge><Badge tone="danger">Unavailable</Badge></div><ConfirmButton onConfirm={()=>setConfirmed(n=>n+1)}>Confirm example action</ConfirmButton><output aria-label="Confirmed actions">Confirmed {confirmed} times</output><CopyButton value={'import { Button } from "@siso/atoms"'}>Copy the import</CopyButton></div></div><Tabs defaultValue="preview"><TabsList aria-label="Atom details"><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="contract">Contract</TabsTrigger></TabsList><TabsContent value="preview"><p>{text} · form state stays with the host app.</p></TabsContent><TabsContent value="contract"><code>value + onChange · native forms · React 19 refs · no router</code></TabsContent></Tabs></section>
}
const tableColumns: SisoTableColumn<Package>[] = [{key:"name",label:"Package",value:r=>r.name,sortable:true},{key:"families",label:"Families",value:r=>r.familyCount,sortable:true,numeric:true},{key:"exports",label:"Exports",value:r=>r.runtimeExports.length,sortable:true,numeric:true}]
function BlockPage() {
  const [open,setOpen] = useState(false)
  return <section className="demo-surface"><div className="section-head"><h2>A sortable release inventory</h2><SisoDialog open={open} onOpenChange={setOpen} title="A real dialog" description="Focus, Escape and trigger restoration are supplied by the package." trigger={<Button>Open dialog</Button>}><Field label="Dialog input">{p=><Input {...p} placeholder="Try keyboard focus" />}</Field></SisoDialog></div><SisoDataTable rows={packages.filter(p=>p.id!=="ui")} columns={tableColumns} rowKey={p=>p.id} caption="Installed SISO packages" /><SisoPopover label="Data ownership" trigger={<Button variant="outline">Who owns the data?</Button>}><p>The app supplies rows, permissions and persistence. The package supplies controlled UI behavior.</p></SisoPopover></section>
}
function LayoutPage() {
  const [preset,setPreset] = useState<"hub"|"sidebar"|"rail-panel">("hub"), [collapsed,setCollapsed] = useState(false)
  const slots = { brand: <strong>Example product</strong>, navigation: ({closeMobile}: {closeMobile:()=>void}) => <SisoSideNav groups={[{id:"main",items:[{id:"home",label:"Overview",count:8},{id:"work",label:"Work",count:12},{id:"reports",label:"Reports"}]}]} activeId="home" onNavigate={closeMobile} collapsed={collapsed} />, profile: <span>Profile stays at the bottom</span>, topbar: <strong>Your product, your data</strong>, collapsed, onCollapsedChange:setCollapsed, style:{height:460}, children:<div className="embedded-content"><h2>A shell you can take whole.</h2><p>Drag its edge. Collapse it. Resize the viewport. The package handles the frame; the product owns the page.</p></div> }
  return <><div className="toolbar" role="group" aria-label="Shell presets">{(["hub","sidebar","rail-panel"] as const).map(p=><Button key={p} variant={preset===p?"primary":"outline"} onClick={()=>{setPreset(p);setCollapsed(false)}}>{p==="hub"?"UI Hub":p==="sidebar"?"App sidebar":"Rail + panel"}</Button>)}</div><div className="embedded-shell">{preset==="hub"?<SisoHubShell key={preset} {...slots}/>:<SisoAppShell key={preset} {...slots} preset={preset} rail={<div className="rail-items"><strong>S</strong><span>01</span><span>02</span></div>}/>}</div></>
}
function UsePage() { return <><section className="demo-surface prose"><h2>One package to start. Focused packages when you need them.</h2><p>The nine private tarballs contain compiled JavaScript, TypeScript declarations, CSS and notices. This workbench uses those installed tarballs with ordinary package imports.</p><pre>{`import { SisoHubShell } from "@siso/ui/shells"\nimport { SisoSideNav } from "@siso/ui/navigation"\nimport { SisoWidgetBoard } from "@siso/ui/widgets"\nimport "@siso/ui/styles.css"\n\n<SisoHubShell navigation={yourNavigation}>\n  <SisoWidgetBoard widgets={definitions}\n    registry={renderers} data={yourData} />\n</SisoHubShell>`}</pre><p><a href="/NOTICE.txt">Source and licence notices</a> accompany the release. Internal release assets and the install recipe live in the private <a href="https://github.com/sisodias/siso-ui-hub" target="_blank" rel="noreferrer">siso-ui-hub repository</a>. React 19 is the common runtime. Charts also use the declared Recharts and motion peers. The packages do not bring the hub’s router, authentication, catalogue or API into your product.</p><h3>Where things fit</h3><p>Use atoms for a single control, blocks for an interaction, widgets for a dashboard question, and a shell for the page frame. Glance gives the answer, work gives the next action, and detail holds the evidence.</p></section><div className="package-table">{packages.map(p=><a href={`#${p.id==="ui"?"overview":p.id}`} key={p.id}><code>{p.name}</code><span>{p.about}</span><small>{p.runtimeExports.length} exports · {p.version}</small></a>)}</div></> }
function App() {
  const [page,setPage]=useState(pageOf),[theme,setTheme]=useState<"dark"|"light">("dark"),[command,setCommand]=useState(false),[,setRouteVersion]=useState(0)
  useEffect(()=>{const update=()=>{const nextPage=pageOf();if(nextPage!=="charts"&&new URLSearchParams(location.search).has("epreset")){const url=new URL(location.href);url.searchParams.delete("epreset");history.replaceState(null,"",url)}setPage(nextPage);setRouteVersion(n=>n+1);window.dispatchEvent(new Event("suite-route-change"))};addEventListener("hashchange",update);addEventListener("popstate",update);return()=>{removeEventListener("hashchange",update);removeEventListener("popstate",update)}},[])
  useEffect(()=>{window.scrollTo(0,0)},[page])
  const p=get(page), groups:SisoNavGroup[]=[
    {id:"start",items:[{id:"overview",label:"The kit",href:"#overview"}]},
    {id:"parts",label:"Build from parts",items:[{id:"atoms",label:"Atoms",href:"#atoms",count:targetCount("atom")},{id:"components",label:"Components",href:"#components",count:targetCount("component")},{id:"blocks",label:"Blocks + sections",href:"#blocks",count:targetCount("section")},{id:"charts",label:"Charts",href:"#charts",count:counts.charts},{id:"notifications",label:"Notifications",href:"#notifications"}]},
    {id:"frames",label:"Compose the app",items:[{id:"navigation",label:"Navigation",href:"#navigation"},{id:"shells",label:"Shells",href:"#shells"},{id:"widgets",label:"Widgets",href:"#widgets"},{id:"tokens",label:"Themes",href:"#tokens"}]},
    {id:"site",label:"Site + assets",items:[{id:"site",label:"Blog + docs",href:"#site"},{id:"footer",label:"Footer",href:"#footer"},{id:"assets",label:"Assets",href:"#assets"}]},
    {id:"use",items:[{id:"use",label:"Build with it",href:"#use"}]}
  ]
  const navigate=(id:string)=>{const url=new URL(location.href);url.searchParams.delete("part");url.searchParams.delete("preset");url.searchParams.delete("epreset");url.hash=id;history.pushState(null,"",url);setPage(id);setRouteVersion(n=>n+1);window.dispatchEvent(new Event("suite-route-change"))}
  const navigateToTarget=(id:string,param:"part"|"preset"|"epreset",pageId:string)=>{const url=new URL(location.href);url.searchParams.delete("part");url.searchParams.delete("preset");url.searchParams.delete("epreset");url.searchParams.set(param,id);url.hash=pageId;history.pushState(null,"",url);setPage(pageId);setRouteVersion(n=>n+1);window.dispatchEvent(new Event("suite-route-change"))}
  const content=page==="overview"?<><Dashboard/><Suspense fallback={null}><VisualIndex/></Suspense></>:page==="use"?<UsePage/>:<><p className="lead">{p?.about}</p><Suspense fallback={<p role="status">Loading source examples…</p>}>{page==="charts"?(componentTargets.some(e=>e.id===new URLSearchParams(location.search).get("part")&&e.scale==="chart")?<ComponentBrowser key={`chart-${new URLSearchParams(location.search).get("part")}`} view="chart"/>:<ChartPage key={`charts-${new URLSearchParams(location.search).get("epreset")||new URLSearchParams(location.search).get("preset")||"collection"}`}/>):page==="atoms"?<ComponentBrowser key={`${page}-${new URLSearchParams(location.search).get("part")||""}`} view="atom"/>:page==="components"?<ComponentBrowser key={`${page}-${new URLSearchParams(location.search).get("part")||""}`} view="component"/>:page==="blocks"||page==="sections"?<ComponentBrowser key={`${page}-${new URLSearchParams(location.search).get("part")||""}`} view="section"/>:page==="assets"?<AssetLibrary/>:page==="widgets"?<WidgetPlayground/>:page==="shells"?<SourceShells/>:page==="navigation"?<HubNavigation/>:page==="tokens"?<TokenPage/>:page==="notifications"?<Notifications/>:page==="site"||page==="footer"?<section className="site-source-preview"><a className="source-full-page" href={`./?canvas=${page}`} target="_blank" rel="noreferrer">Open the source components at full width ↗</a><iframe title={page==="footer"?"Accepted SISO footer":"SISO blog and docs"} src={`./?canvas=${page}`} loading="lazy"/></section>:null}</Suspense>{p&&<details className="package-contract-details"><summary>Package exports and contracts</summary><PackageInventory key={p.id} p={p}/></details>}</>
  const icons: Record<string, typeof PackageIcon> = {tokens:Palette,charts:ChartColumnIncreasing,atoms:Atom,blocks:Blocks,shells:PanelsTopLeft,navigation:Route,widgets:LayoutGrid,site:Sparkles,components:Blocks,assets:Sparkles,footer:PanelsTopLeft,notifications:Blocks}
  const sourceGroups:SisoHubNavGroup[]=groups.map(g=>({id:g.id,label:g.label,items:g.items.map(i=>({id:i.id,label:i.label,href:i.href,count:i.count,icon:icons[i.id]??PackageIcon}))}))
  const options=groups.flatMap(g=>g.items).filter(i=>i.id!=="overview"&&i.id!=="use").map(i=>({id:i.id,label:i.label,icon:icons[i.id]??PackageIcon,to:i.href}))
  const searchItems=[...pages.filter(id=>id!=="overview"&&id!=="use").map(id=>({id:`page:${id}`,label:titles[id]||id,description:`Open ${id} in @siso/ui`,group:"Kit pages",keywords:[id]})),...componentTargets.map(e=>({id:`part:${e.id}`,label:e.title,description:`${e.package} · ${e.family} · ${e.scale} · ${e.exports.join(", ")} · ${e.categories.join(", ")} · ${e.description}`,group:"129 source components",keywords:[e.id,e.variant,e.package,...e.exports,...e.categories,...e.use]})),...presetTargets.map(e=>({id:`preset:${e.id}`,label:e.title,description:`Charts preset · ${e.family} · ${e.export}`,group:"117 chart presets",keywords:[e.id,e.export,e.family]})),...echartsPresetEntries.map(e=>({id:`echart:${e.id}`,label:e.title,description:`ECharts preset · ${e.family} · ${e.export} · ${e.source}`,group:"135 ECharts presets",keywords:[e.id,e.export,e.family,e.source]}))]
  const pills=<SisoHubPillSwitch label="Packages" options={options} value={page} onChange={navigate}/>
  const selectSearchItem=(item:{id:string})=>{const [kind,...parts]=item.id.split(":");const id=parts.join(":");if(kind==="part"){const entry=componentTargets.find(e=>e.id===id)!;const targetPage=entry.scale==="atom"?"atoms":entry.scale==="chart"?"charts":entry.scale==="section"?"sections":"components";navigateToTarget(id,"part",targetPage)}else if(kind==="preset")navigateToTarget(id,"preset","charts");else if(kind==="echart")navigateToTarget(id,"epreset","charts");else navigate(id.replace(/^page:/,""))}
  return <><SisoHubSourceShell theme={theme} storageKey="siso.source-workbench" onSearch={()=>setCommand(true)} leading={pills} mobileTabs={pills} navigation={ctx=><SisoHubSideNav groups={sourceGroups} activeId={page} brand="SISO Kit" coreLabel={`UI / ${index.version}`} coreId={page} coreGroups={sourceGroups} onCoreChange={item=>navigate(item.id)} onSearch={ctx.onSearch} onFold={ctx.onFold} onNavigate={(item,event)=>{event.preventDefault();navigate(item.id);ctx.onNavigate()}} homeHref="#overview" searchLabel="Find a component…" places={[{id:"overview",label:"The package",href:"#overview",icon:PackageIcon},{id:"use",label:"Build with it",href:"#use",icon:Code2}]} foot={{version:"0.4.0",subtitle:"The actual source, packaged",docsHref:"https://github.com/sisodias/siso-ui-hub/blob/main/PACKAGES.md",changelogHref:"https://github.com/sisodias/siso-ui-hub/releases",packagesHref:"#use",shortcuts:[["⌘K","Find a component or preset"],["⌘B","Collapse navigation"]]}}/>} topbar={<span className="breadcrumb"><b>{p?.name||"SISO source kit"}</b></span>} topbarActions={<div className="siso-well flex items-center gap-0.5 p-[3px]"><button className="siso-press grid size-7 place-items-center rounded-[7px] text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground" aria-label="Toggle theme" aria-pressed={theme==="dark"} onClick={()=>{const next=theme==="dark"?"light":"dark";setTheme(next);setSisoTokenSet(document.documentElement,"hub",next)}}>{theme==="dark"?<Sun size={15}/>:<Moon size={15}/>}</button></div>}><div className="page"><header className="page-heading"><p className="eyebrow">THE ACTUAL SOURCE. READY TO REUSE.</p><h1>{titles[page]||page}</h1>{page==="overview"&&<p className="lead">The same components we use in our apps, with their original styling, motion and assets.</p>}</header>{content}</div></SisoHubSourceShell><SisoCommandPalette open={command} onOpenChange={setCommand} title="Find a component" placeholder="Search pages, components, exports or presets" description="Find any source family or chart preset and open its exact example." items={searchItems} onSelect={selectSearchItem}/></>
}
function Canvas() {
 const id = new URLSearchParams(location.search).get("canvas")
 document.body.classList.add("workbench-canvas")
 return <Suspense fallback={<p role="status">Loading original source…</p>}>{id==="footer"?<FooterPage/>:id==="assets"?<AssetLibrary/>:id==="site"?<SitePage/>:id==="charts"?<ChartPage/>:id==="atoms"?<ComponentBrowser view="atom"/>:id==="shells"?<SourceShells/>:id==="navigation"?<HubNavigation/>:id==="tokens"?<TokenPage/>:id==="widgets"?<WidgetPlayground/>:id==="blocks"?<ComponentBrowser view="section"/>:<App/>}</Suspense>
}
createRoot(document.getElementById("root")!).render(new URLSearchParams(location.search).has("canvas")?<Canvas/>:<App/>)
