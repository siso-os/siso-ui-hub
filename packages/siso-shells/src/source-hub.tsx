// uihub: siso:shells
// AppShell.tsx's actual fixed navigation, pinned rim, sheet and topbar.
// Product hooks are replaced by slots; the layout, classes and edge behavior stay.
import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent } from "react"
import { Menu, PanelLeftOpen, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTitle } from "./source/kit/shadcn/ui/sheet"

export type SisoHubSourceContext = { onSearch: () => void; onFold: () => void; onNavigate: () => void; mobile: boolean }
export type SisoHubSourceShellProps = {
  children: ReactNode
  navigation: (context: SisoHubSourceContext) => ReactNode
  topbar?: ReactNode
  topbarActions?: ReactNode
  leading?: ReactNode
  mobileTabs?: ReactNode
  onSearch?: () => void
  onSearchCommand?: () => void
  theme?: "dark" | "light"
  storageKey?: string
  widthStorageKey?: string
  mainId?: string
  pageKey?: string
  resizeLabel?: string
  resizeStep?: number
}
const NAV_W = 256, NAV_MIN = 216, NAV_MAX = 400
export function SisoHubSourceShell({children,navigation,topbar,topbarActions,leading,mobileTabs,onSearch,onSearchCommand,theme="dark",storageKey="siso.hub",widthStorageKey,mainId="main-content",pageKey,resizeLabel="Resize navigation",resizeStep=8}:SisoHubSourceShellProps) {
  const read = (key:string) => {try{return typeof window === "undefined" ? null : window.localStorage.getItem(key === "width" && widthStorageKey ? widthStorageKey : `${storageKey}.${key}`)}catch{return null}}
  const [mobileOpen,setMobileOpen] = useState(false)
  const [collapsed,setCollapsed] = useState(()=>read("collapsed")==="1")
  const [navW,setNavW] = useState(()=>Math.min(NAV_MAX,Math.max(NAV_MIN,Number(read("width"))||NAV_W)))
  const frame=useRef<HTMLDivElement>(null), cleanup=useRef<()=>void>(()=>{})
  const mobileTrigger=useRef<HTMLButtonElement>(null), pendingSearch=useRef(false)
  const save=(key:string,value:string)=>{try{localStorage.setItem(key === "width" && widthStorageKey ? widthStorageKey : `${storageKey}.${key}`,value)}catch{}}
  const fold=()=>setCollapsed(c=>{save("collapsed",c?"0":"1");return !c})
  const search=()=>{if(mobileOpen){pendingSearch.current=true;setMobileOpen(false)}else onSearch?.()}
  useEffect(()=>{const key=(e:KeyboardEvent)=>{const target=e.target as HTMLElement;const editing=/input|textarea|select/i.test(target.tagName)||target.isContentEditable;if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="b"&&!editing){e.preventDefault();fold()}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();if(mobileOpen)search();else (onSearchCommand||onSearch)?.()}};window.addEventListener("keydown",key);return()=>{window.removeEventListener("keydown",key);cleanup.current()}},[onSearch,onSearchCommand,storageKey,mobileOpen])
  const resize=(e:PointerEvent<HTMLDivElement>)=>{
    e.preventDefault();cleanup.current();const x=e.clientX,start=navW;let width=navW
    const move=(ev:globalThis.PointerEvent)=>{width=Math.round(Math.max(NAV_MIN,Math.min(NAV_MAX,start+ev.clientX-x)));setNavW(width)}
    const up=()=>{window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",up);document.documentElement.classList.remove("siso-resizing");save("width",String(width))}
    cleanup.current=up;document.documentElement.classList.add("siso-resizing");window.addEventListener("pointermove",move);window.addEventListener("pointerup",up)
  }
  const iconButton="siso-press grid size-8 place-items-center rounded-md border-0 bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
  return <div className={`siso-source-frame siso-hub-source ${theme} min-h-svh`} style={{"--nav-w":`${navW}px`,"--frame-l":collapsed?"8px":`${navW}px`,background:"var(--siso-frame)"} as CSSProperties}>
    <a href={`#${mainId}`} className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-4 focus:z-50 focus:rounded-md focus:bg-popover focus:px-4 focus:py-2 focus:text-sm focus:text-foreground">Skip to content</a>
    <aside aria-label="Main navigation" inert={collapsed || undefined} className={`fixed inset-y-0 left-0 z-30 hidden w-[var(--nav-w)] bg-sidebar transition-transform duration-200 lg:block ${collapsed?"-translate-x-full":""}`}>
      {navigation({onSearch:search,onFold:fold,onNavigate:()=>{},mobile:false})}
      {!collapsed&&<div className="siso-edge" role="separator" aria-label={resizeLabel} aria-orientation="vertical" aria-valuemin={NAV_MIN} aria-valuemax={NAV_MAX} aria-valuenow={navW} tabIndex={0} onPointerDown={resize} onDoubleClick={()=>{setNavW(NAV_W);save("width",String(NAV_W))}} onKeyDown={e=>{if(!["ArrowLeft","ArrowRight","Home"].includes(e.key))return;e.preventDefault();const w=e.key==="Home"?NAV_W:Math.max(NAV_MIN,Math.min(NAV_MAX,navW+(e.key==="ArrowLeft"?-resizeStep:resizeStep)));setNavW(w);save("width",String(w))}} title="Drag to resize · double-click to reset"/>}
    </aside>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent side="left" className={`siso-source-frame ${theme} w-72 bg-sidebar p-0 [&>button]:hidden`} onCloseAutoFocus={event=>{event.preventDefault();mobileTrigger.current?.focus();if(pendingSearch.current){pendingSearch.current=false;onSearch?.()}}}><SheetTitle className="sr-only">Navigation</SheetTitle>{navigation({onSearch:search,onFold:()=>setMobileOpen(false),onNavigate:()=>setMobileOpen(false),mobile:true})}</SheetContent></Sheet>
    <div className={`transition-[padding] duration-200 ${collapsed?"lg:pl-2":"lg:pl-[var(--nav-w)]"}`}>
      <header className="siso-topbar sticky top-0 z-20 grid h-14 grid-cols-[auto_1fr_auto] items-center gap-2 border-b bg-background/85 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 lg:border-b-0 lg:bg-frame lg:px-6 lg:backdrop-blur-none lg:supports-[backdrop-filter]:bg-frame lg:after:hidden">
        <div className="flex items-center gap-1"><button ref={mobileTrigger} className={`${iconButton} lg:hidden`} aria-label="Open navigation" onClick={()=>{pendingSearch.current=false;setMobileOpen(true)}}><Menu className="size-4"/></button>{collapsed&&<button className={`${iconButton} hidden lg:grid`} aria-label="Open the side nav" onClick={fold}><PanelLeftOpen className="size-4"/></button>}<div className="hidden lg:flex">{leading}</div></div>
        {topbar}
        <div className="flex items-center gap-1"><button className={`${iconButton} lg:hidden`} onClick={search} aria-label="Search"><Search className="size-4"/></button>{topbarActions}</div>
      </header>
      {mobileTabs&&<div className="sticky top-14 z-20 flex gap-1 overflow-x-auto border-b bg-background/85 px-3 py-1.5 backdrop-blur lg:hidden">{mobileTabs}</div>}
      <div className="siso-sheet" onMouseMove={e=>{const f=frame.current;if(!f)return;const r=f.getBoundingClientRect();f.style.setProperty("--mx",`${e.clientX-r.left}px`);f.style.setProperty("--my",`${e.clientY-r.top}px`);f.style.setProperty("--spot","1")}} onMouseLeave={()=>frame.current?.style.setProperty("--spot","0")}>
        <main id={mainId} tabIndex={-1} className="mx-auto w-full max-w-[1600px] px-4 py-6 lg:px-8 lg:py-8"><div key={pageKey} className="siso-page">{children}</div></main>
      </div>
      <div ref={frame} className="siso-frame" aria-hidden><div className="siso-frame-spot"/></div>
    </div>
  </div>
}
