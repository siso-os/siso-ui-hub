// uihub: siso:side-nav
// The App Factory's side nav, on the UI Hub's own (looks v8.2). The name at the top switches cores (Shaan, 10 Oct: "you
// got the UI hub … and then all the other stuff like the industries … anything inside of the app factory"). Each core
// is its own list. UI's list follows its top tab (Shaan, 10 Oct: "what pages go what … from first principles … use case
// wise"): Components by the job a piece does, drilling into its kinds; Sites by section; Apps by screen and layout;
// Looks by what moves and what sits behind; Projects by what each still needs picked.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { ArrowUpRight, Atom, Blocks, CheckSquare, CircleDot, CircleUser, FileText, FormInput, Link2, Loader, MessageSquare, MousePointerClick, SlidersHorizontal, Table, Tag, TextCursorInput, ToggleLeft, Type, Bookmark, GitCompareArrows, Bell, BookOpen, Bot, Boxes, Building2, ChartColumnIncreasing, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Code2, Compass, Cpu, Crown, Flame, FolderKanban, Gauge, House, Image as ImageIcon, Keyboard, Layers, LayoutGrid, LayoutTemplate, Library, Map as MapIcon, MapPinned, Package, Palette, PanelLeftClose, PanelsTopLeft, Route, ScrollText, Search, Shapes, Sparkles, Star, Store, Users, Wrench, Zap, type LucideIcon } from "lucide-react"
import { surfaceOf } from "@/lib/surfaces"
import { useBookmarks } from "@/lib/bookmarks"
import { cn } from "@/lib/utils"
import { catLink, catName, groupLabel, shortIndustry, useIndex, useMeta, type Index } from "@/lib/data"
import { navIcon } from "./navIcons"
import { NavGlyph } from "./NavGlyph"
import { TOP_TABS, groupOf, topTabs, useTopTab, type TopTab } from "@/lib/tab"
import { nodeCount, type ONode } from "@/lib/ontology"
import { familiesOf, familyById, homeOf, kitState } from "@/lib/families"
import { KitDot } from "./KitDot"
import { matchRows, useKnowledge } from "@/lib/knowledge"
import { GROUPS, KITS, coreById, coreOf, useProjects } from "@/lib/factory"
import { PKGS, releases } from "@/lib/packages"
import { short } from "@/lib/short"
import appPkg from "../../package.json"
import sisoMark from "@/assets/siso-mark.png"
import kitV1 from "../../../catalogue/kit-v1.json"

type AtomRow = { node: string; kind: string; variations?: unknown[] }
const ATOMS = (kitV1 as unknown as { atoms: AtomRow[] }).atoms
const ASSET_KINDS = (kitV1 as unknown as { assets?: AtomRow[] }).assets ?? []
// the library's nodes the kit already has a part for: the library list marks them, so you see what is brought in
const ATOM_GROUPS = [...ATOMS.reduce((g, k) => g.set(k.node, [...(g.get(k.node) ?? []), k]), new Map<string, AtomRow[]>())]
const nice = (s: string) => s.replace(/^\w+\//, "").replace(/-/g, " ").replace(/^ui /, "UI ")
// each atom group's icon (catalogue/kit-v1.json's nodes)
const ATOM_ICON: Record<string, LucideIcon> = {
  "atom/layout": Layers, "atom/text": Type, "atom/field": FormInput, "atom/link": Link2, "atom/button": MousePointerClick, "atom/avatar": CircleUser,
  "atom/badge": Tag, "atom/status-dot": CircleDot, "atom/text-input": TextCursorInput, "atom/choice": CheckSquare, "atom/switch": ToggleLeft,
  "atom/slider": SlidersHorizontal, "atom/loader": Loader, "atom/progress": Gauge, "atom/data": Table, "atom/tooltip": MessageSquare, "atom/effect": Sparkles,
}

/** SISO's own assets, at the top of the Assets list (Shaan, 15 Oct: "why do we have assets here when they're supposed to
 *  be in an assets icon"): the kit's asset kinds, then every animated icon live */
function SisoAssets({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  return (
    <>
      {ASSET_KINDS.map((k) => (
        <NavRow key={k.kind} to={`/kit/atoms/${k.kind}`} icon={k.kind === "animated-icons" ? Sparkles : k.kind === "image" ? ImageIcon : k.kind === "file-icons" ? FileText : navIcon(nice(k.kind), [k.kind])} active={path === `/kit/atoms/${k.kind}`} count={k.variations?.length ? `+${k.variations.length}` : undefined} onNavigate={onNavigate}>
          <span className="truncate first-letter:uppercase">{nice(k.kind)}</span>
        </NavRow>
      ))}
      <NavRow to="/kit/icons" icon={Sparkles} active={path === "/kit/icons"} onNavigate={onNavigate} title="Every animated icon we hold, live">
        Every animated icon
      </NavRow>
    </>
  )
}

/** what the SISO kit holds at one scale, at the head of that scale's list (Shaan, 15 Oct: "slowly we're taking all of the
 *  stuff we like from the larger library and we're bringing it into our SISO kit"): the kit first, the library under it.
 *  Atom groups fold, and the group of the page you are on opens by itself. */
function KitRows({ scale, path, search, factory, onNavigate, scaleN, doneN }: {
  scale: "atom" | "component" | "section" | "page" | "shell" | "look" | "asset"
  path: string
  search: URLSearchParams
  factory: boolean
  onNavigate?: () => void
  scaleN: (scale: string) => number | undefined
  doneN: (scale: string) => number | undefined
}) {
  const here = path.startsWith("/kit/atoms/") ? path.slice(11) : ""
  const hereNode = ATOMS.find((k) => k.kind === here)?.node
  const [open, setOpen] = useState<Set<string>>(() => new Set(hereNode ? [hereNode] : []))
  useEffect(() => {
    if (hereNode) setOpen((o) => (o.has(hereNode) ? o : new Set(o).add(hereNode)))
  }, [hereNode])
  const flip = (n: string) => setOpen((o) => { const x = new Set(o); if (x.has(n)) x.delete(n); else x.add(n); return x })
  const picking = path === "/siso" ? search.get("scale") : null
  const pick = (label: string) =>
    factory && (
      <NavRow to={`/siso?scale=${scale}`} icon={ClipboardCheck} active={picking === scale && !search.get("uc")} count={`${doneN(scale) ?? 0}/${scaleN(scale) ?? 0}`} onNavigate={onNavigate} title={`Pick the base for each ${label} kind: ${doneN(scale) ?? 0} of ${scaleN(scale) ?? 0} picked`}>
        Pick {label}
      </NavRow>
    )
  if (scale === "asset") return <SisoAssets path={path} onNavigate={onNavigate} />
  if (scale === "atom")
    return (
      <>
        <NavRow to="/kit/v1" icon={Atom} active={path === "/kit/v1"} count={ATOMS.length} onNavigate={onNavigate} title="Every atom kind, live">
          All atoms
        </NavRow>
        {/* the groups drop down on the kit's atom pages; on a library page the library stays in view */}
        {(path === "/kit/v1" || !!hereNode) && ATOM_GROUPS.map(([n, ks]) => {
          const on = open.has(n)
          return (
            <div key={n}>
              <button onClick={() => flip(n)} aria-expanded={on} className="siso-nav-row flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-left text-[13.5px] text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground">
                <NavGlyph icon={ATOM_ICON[n] ?? navIcon(nice(n), [n])} />
                <span className={cn("truncate capitalize", n === hereNode && "font-medium text-sidebar-foreground")}>{nice(n)}</span>
                <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">{ks.length}</span>
                <ChevronRight className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform duration-150", on && "rotate-90")} />
              </button>
              {on && (
                <div className="mb-1 ml-[15px] space-y-0.5 border-l border-border/60 pl-2">
                  {ks.map((k) => (
                    <NavRow key={k.kind} to={`/kit/atoms/${k.kind}`} active={here === k.kind} count={k.variations?.length ? `+${k.variations.length}` : undefined} onNavigate={onNavigate} className="h-7 text-[13px]">
                      <span className="truncate capitalize">{nice(k.kind)}</span>
                    </NavRow>
                  ))}
                </div>
              )}
            </div>
          )
        })}
        {pick("atoms")}
      </>
    )
  if (scale === "component")
    return (
      <>
        <NavRow to="/kit/dashboard" icon={Gauge} active={path === "/kit/dashboard"} onNavigate={onNavigate} title="Every chart, stat and data part, live: keep or skip each one">
          Dashboard parts
        </NavRow>
        <NavRow to="/kit/charts" icon={ChartColumnIncreasing} active={path === "/kit/charts"} onNavigate={onNavigate} title="Charts from every library we own, live">
          Charts
        </NavRow>
        {pick("components")}
      </>
    )
  if (scale === "section") return pick("sections") || null
  if (scale === "shell")
    return (
      <>
        <NavRow to="/kit/app-frame" icon={PanelsTopLeft} active={path === "/kit/app-frame" || path.startsWith("/kit/shells/")} onNavigate={onNavigate} title="The SISO app frame: sidebar, rail, top bar, a switch per part">
          App frame
        </NavRow>
        {factory && (
          <NavRow to="/cores/hub-kit" icon={Boxes} active={path === "/cores/hub-kit"} onNavigate={onNavigate} title="SISO's own: the shell and the five screens every hub is made from">
            Hub Kit
          </NavRow>
        )}
        <NavRow to="/shells" icon={PanelsTopLeft} active={path === "/shells" || path.startsWith("/shells/")} onNavigate={onNavigate} title="Shells from the library, side by side">
          Library shells
        </NavRow>
        <NavRow to="/packages" icon={Package} active={path === "/packages" || path.startsWith("/packages/")} count={PKGS.packages.length} onNavigate={onNavigate} title="The shell's pieces, each with its versions">
          Packages
        </NavRow>
      </>
    )
  if (scale === "page")
    return (
      <>
        <NavRow to="/kit/pages" icon={LayoutTemplate} active={path === "/kit/pages" || path.startsWith("/kit/pages/")} onNavigate={onNavigate} title="Page types, worked back from the pages we run">
          Page types
        </NavRow>
        {factory && (
          <NavRow to="/cores/site-kit" icon={Store} active={path === "/cores/site-kit"} count={KITS.find((k) => k.id === "site-kit")?.n} onNavigate={onNavigate} title="SISO's own: the blocks and sections our sites are made from">
            Site Kit
          </NavRow>
        )}
        {pick("pages")}
      </>
    )
  return pick("looks") || null
}

/** the places every list shares, as one strip at the foot instead of eleven rows at the top of every list (Shaan, 15 Oct:
 *  "the side nav is just showing a lot of the same stuff ... arc start here for every single one of them") */
function Places({ path, factory, onNavigate }: { path: string; factory: boolean; onNavigate?: () => void }) {
  const places: [string, LucideIcon, string][] = [
    ["/", Sparkles, "Start here: Arc"],
    ["/home", House, "Home"],
    ["/map", MapPinned, "The map: every part SISO needs, by scale"],
    ["/vs", GitCompareArrows, "Head to head: two libraries like for like"],
    ["/papers", ScrollText, "White papers"],
    ...(factory ? ([["/bookmarks", Bookmark, "Saved"]] as [string, LucideIcon, string][]) : []),
  ]
  return (
    <div className="mx-3 flex shrink-0 items-center justify-between border-t border-border/60 px-1 pt-2" data-verify-places>
      {places.map(([to, icon, label]) => {
        const on = to === "/" ? path === "/" || path === "/arc" : path === to || path.startsWith(to + "/")
        return (
          <Link key={to} to={to} onClick={onNavigate} title={label} aria-label={label} aria-current={on ? "page" : undefined} className={cn("siso-press grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground", on && "bg-sidebar-accent text-foreground")}>
            <NavGlyph icon={icon} active={on} />
          </Link>
        )
      })}
    </div>
  )
}

type Row = { to: string; label: string; icon: LucideIcon }

// Components, by the job a piece does: the index's own groups, in the order you build with them
const JOBS: [string, LucideIcon][] = [
  ["actions", Zap],
  ["inputs", ClipboardCheck],
  ["navigation", Route],
  ["overlays", Layers],
  ["data-display", Boxes],
  ["data-viz", Gauge],
  ["status", Bell],
  ["media", ImageIcon],
  ["ai-agent", Bot],
  ["lib", Code2],
  ["other", Shapes],
]
const JOB = new Map(JOBS.map(([g, icon]) => [g, { label: groupLabel(g), icon }]))
// where the library comes from, and how agents use it
const LIBRARY: Row[] = [
  { to: "/libraries", label: "Libraries", icon: Library },
  { to: "/coverage", label: "Coverage", icon: Gauge },
  { to: "/compare", label: "Compare and rate", icon: GitCompareArrows },
  { to: "/authors", label: "Authors", icon: Users },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/tools", label: "Tools", icon: Wrench },
  { to: "/agents", label: "For agents", icon: Cpu },
]

const groupCats = (idx: Index, g: string) =>
  Object.entries(idx.groups[g] || {})
    .sort((a, b) => b[1] - a[1])
    .map(([c]) => c)
const groupN = (idx: Index, g: string) => Object.values(idx.groups[g] || {}).reduce((n, x) => n + x, 0)
/** a kind's link: /browse/<group>/<kind> keeps the group in the address (so the tab follows); a bare one uses its row */
const catTo = (idx: Index, c: string) => (c.includes("/") ? `/browse/${c}` : catLink(idx, c))

/** The side nav's list slides across when the level, tab or core changes: the old list leaves as the new one comes in. */
function Slide({ k, dir, children }: { k: string; dir: 1 | -1; children: React.ReactNode }) {
  const prev = useRef<{ k: string; node: React.ReactNode } | null>(null)
  const [leaving, setLeaving] = useState<{ k: string; node: React.ReactNode; dir: 1 | -1 } | null>(null)
  useLayoutEffect(() => {
    if (prev.current && prev.current.k !== k) setLeaving({ k, node: prev.current.node, dir })
    prev.current = { k, node: children }
  })
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden [contain:paint]">
      {leaving && (
        <div key={`leave:${leaving.k}`} className={cn("pointer-events-none absolute inset-0 overflow-hidden px-3 pt-1", leaving.dir > 0 ? "siso-leave-in" : "siso-leave-out")} onAnimationEnd={(e) => e.target === e.currentTarget && setLeaving(null)}>
          {leaving.node}
        </div>
      )}
      <div key={k} className={cn("h-full overflow-y-auto px-3 pt-1 pb-6 [scrollbar-width:thin] [mask-image:linear-gradient(to_bottom,#000_calc(100%-28px),transparent)]", leaving && (leaving.dir > 0 ? "siso-enter-in" : "siso-enter-out"))}>
        {children}
      </div>
    </div>
  )
}

function NavRow({ to, active, icon, children, count, dot, onNavigate, className, title }: { to: string; active: boolean; icon?: LucideIcon; children: React.ReactNode; count?: number | string; dot?: boolean; onNavigate?: () => void; className?: string; title?: string }) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      title={title}
      className={cn("siso-nav-row relative flex h-8 items-center gap-2.5 rounded-lg px-2 text-[13.5px] text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground", active && "font-medium", className)}
    >
      {icon && <NavGlyph icon={icon} active={active} />}
      {children}
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-neon" aria-label="has his picks" />}
      {count !== undefined && <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">{typeof count === "number" ? count.toLocaleString("en-GB") : count}</span>}
    </Link>
  )
}

/** search pops up (looks v7): the bar opens the ⌘K palette, and so does "/" */
function SearchButton({ onSearch, label }: { onSearch: () => void; label: string }) {
  const open = useRef(onSearch)
  open.current = onSearch
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === "/" && !/input|textarea|select/i.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault()
        open.current()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  return (
    <button type="button" onClick={onSearch} data-verify-sidebar-search className="siso-field siso-press flex h-9 w-full items-center gap-2 bg-foreground/[0.04] pr-2 pl-2.5 text-left text-sm text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:text-foreground">
      <NavGlyph icon={Search} size={15} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <kbd className="rounded-[5px] border bg-foreground/[0.04] px-1.5 py-px font-mono text-[10px]">⌘K</kbd>
    </button>
  )
}

const VERSION = `v${appPkg.version.split(".").slice(0, 2).join(".")}`
const KEYS: [string, string][] = [
  ["⌘K", "Search"],
  ["/", "Search"],
  ["⌘B", "Fold the side nav"],
]

/** the foot: the version, clean and centred; it opens what's new, the docs, the changelog and the keys */
function Foot({ name, pub }: { name: string; pub: boolean }) {
  const [open, setOpen] = useState<"" | "menu" | "news" | "keys">("")
  const ref = useRef<HTMLDivElement>(null)
  const news = useMemo(() => releases().slice(0, 14), [])
  useEffect(() => {
    if (!open) return
    const out = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen("")
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen("")
    window.addEventListener("pointerdown", out)
    window.addEventListener("keydown", esc)
    return () => {
      window.removeEventListener("pointerdown", out)
      window.removeEventListener("keydown", esc)
    }
  }, [open])
  const row = "siso-press flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13px] text-foreground/85 hover:bg-sidebar-accent hover:text-foreground"
  return (
    <div ref={ref} className="relative flex shrink-0 justify-center px-3 pt-1 pb-3" data-verify-foot {...(pub ? { "data-verify-public": "" } : {})}>
      {open && (
        <div role="dialog" aria-label={name} className="siso-rise absolute bottom-full left-1/2 z-40 mb-1 w-[252px] -translate-x-1/2 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg backdrop-blur-xl">
          {open === "menu" ? (
            <>
              <div className="flex items-center gap-2.5 px-2 pt-1 pb-2">
                <img src={sisoMark} alt="" width={24} height={24} className="siso-mark size-6" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-semibold">
                    {name} {VERSION}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{pub ? "The public build" : "Make anything, from the parts up"}</div>
                </div>
              </div>
              <div className="mx-2 mb-1 h-px bg-border" />
              <button className={row} onClick={() => setOpen("news")}>
                <Sparkles className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">What's new</span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
              </button>
              <a className={row} href="https://github.com/siso-os/siso-ui-hub#readme" target="_blank" rel="noreferrer">
                <BookOpen className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">Docs</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </a>
              <a className={row} href="https://github.com/siso-os/siso-ui-hub/commits/main" target="_blank" rel="noreferrer">
                <ScrollText className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">Changelog</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </a>
              <button className={row} onClick={() => setOpen("keys")}>
                <Keyboard className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">Keyboard shortcuts</span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
              </button>
            </>
          ) : (
            <>
              <button className={cn(row, "gap-1 font-medium")} onClick={() => setOpen("menu")}>
                <ChevronLeft className="size-4 text-muted-foreground" />
                {open === "news" ? "What's new" : "Keyboard shortcuts"}
              </button>
              {open === "news" ? (
                <ol className="max-h-[380px] overflow-y-auto px-1 pb-1" data-verify-releases>
                  {news.map((v, i) => (
                    <li key={`${v.id}:${v.v}`} className="relative py-2 pr-1 pl-5">
                      <span className={cn("absolute top-[13px] left-[6px] size-2 rounded-full", i === 0 ? "siso-dot" : "bg-muted-foreground/40")} />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-semibold">
                          {v.name} {v.v}
                        </span>
                        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{v.when}</span>
                      </div>
                      <p className="mt-0.5 line-clamp-3 text-xs leading-snug text-muted-foreground">{v.note}</p>
                    </li>
                  ))}
                  <li className="px-1 pt-1">
                    <Link to="/packages" onClick={() => setOpen("")} className="text-xs font-medium text-foreground/80 hover:underline">
                      Every package and version →
                    </Link>
                  </li>
                </ol>
              ) : (
                <ul className="px-1 pb-1">
                  {KEYS.map(([k, what]) => (
                    <li key={k} className="flex items-center gap-2 px-1 py-1.5 text-[13px]">
                      <span className="flex-1 text-foreground/85">{what}</span>
                      <kbd className="rounded-[5px] border bg-foreground/[0.04] px-1.5 py-px font-mono text-[10.5px] text-muted-foreground">{k}</kbd>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
      <button onClick={() => setOpen(open ? "" : "menu")} aria-expanded={!!open} className="siso-press flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground" title="What's new, the docs and the changelog">
        <span className="siso-dot size-1.5 rounded-full" />
        {name} {VERSION}
      </button>
    </div>
  )
}

export function SideNav({ onSearch, onNavigate, onFold }: { onSearch: () => void; onNavigate?: () => void; onFold?: () => void }) {
  const idx = useIndex()
  const loc = useLocation()
  const path = decodeURIComponent(loc.pathname)
  const params = new URLSearchParams(loc.search)
  const meta = useMeta()
  const projects = useProjects()
  const tab = useTopTab()
  const know = useKnowledge()
  const { items: marks } = useBookmarks()
  // his build is the App Factory around UI; the public build is the UI Hub alone
  const factory = !idx?.public
  const cid = factory ? coreOf(path) : "ui"
  const here = cid === null ? "Home" : (coreById(cid)?.name ?? "UI")
  const inInd = path === "/industries" || path.startsWith("/industries/")
  // a list of one job (its group or one of its kinds) opens Components at that job; an item's page keeps the list you
  // came from, so clicking a card doesn't move the side nav
  const lastJob = useRef<string | undefined>(undefined)
  const g = cid === "ui" && tab === "components" && !path.startsWith("/c/") ? groupOf(idx, path) : undefined
  const job = path.startsWith("/c/") ? lastJob.current : g && JOB.has(g) ? g : undefined
  useEffect(() => {
    if (!path.startsWith("/c/")) lastJob.current = job
  })
  // the name at the top opens every core, as a view of the side nav
  const [hubs, setHubs] = useState(false)
  // how many levels you've stepped back from the page's own (the way back over a job, or the public build's industries)
  const [up, setUp] = useState(0)
  // the family the side nav is drilled into (taxonomy v2): the one you clicked, else the one the page's kind sits in
  const [famOpen, setFamOpen] = useState<string | null>(null)
  useEffect(() => {
    setHubs(false)
    setUp(0)
    setFamOpen(null)
  }, [loc.pathname])
  const kindHome = path.startsWith("/x/") ? homeOf(path.split("/").slice(2, 4).join("/")) : undefined
  const fam = famOpen ?? (kindHome && kindHome.tab === tab ? kindHome.fam : null)
  const stack: string[] = cid === "ui" ? ["root", ...(job ? [`group:${job}`] : fam ? [`fam:${fam}`] : !factory && inInd ? ["industries"] : [])] : cid === null ? ["factory"] : [`core:${cid}`]
  const at = Math.max(0, stack.length - 1 - up)
  const level = hubs ? "factory" : stack[at]
  const core = level.startsWith("core:") ? coreById(level.slice(5)) : undefined
  // slide in when going deeper or to a tab on the right, out when coming back or opening the cores
  const tabs = topTabs(idx?.public)
  const depth = hubs ? -1 : at
  const tabAt = tabs.findIndex((x) => x.id === tab)
  const last = useRef({ depth, tabAt })
  const dir: 1 | -1 = depth !== last.current.depth ? (depth > last.current.depth ? 1 : -1) : tabAt >= last.current.tabAt ? 1 : -1
  useEffect(() => {
    last.current = { depth, tabAt }
  })
  const pick = () => {
    setHubs(false)
    setUp(0)
    onNavigate?.()
  }
  const drill = () => {
    setUp(0)
    onNavigate?.()
  }

  // the kind the page is on: /browse/<group>/<kind>, a nav row's slug, or an item's own kind
  let activeCat: string | null = null
  if (idx) {
    const p = path.split("/")
    if (p[1] === "browse" && p[2] === "s" && p[3]) activeCat = idx.navBySlug.get(p[3])?.categories[0] ?? null
    else if (p[1] === "browse" && p[2] && p[3]) activeCat = p[3].includes("/") ? p[3] : `${p[2]}/${p[3]}`
    else if (p[1] === "c") activeCat = idx.byId.get(path.slice(3))?.c ?? null
  }
  const on = (to: string) => path === to || path.startsWith(to + "/")
  // Home and Arc have the shared places as their list; every other page keeps its tab's
  // the home list is also the whole kit's list: its overview pages belong to no one scale
  const homeList = ["/", "/arc", "/home", "/kit", "/kit/map", "/ours", "/bookmarks"].includes(path) || (path === "/siso" && !params.get("scale"))
  const tabLabel = (t: string) => TOP_TABS.find((x) => x.id === t)?.label ?? t

  const section = (title: string, rows: React.ReactNode, head = title) => (
    <div data-verify-nav-section={title}>
      <div className="siso-nav-label px-2 pt-5 pb-1 text-muted-foreground">{head}</div>
      <div className="space-y-0.5">{rows}</div>
    </div>
  )
  // the open kind's finer places, under it (Shaan, 10 Oct: "clean up stuff on the side ... maybe they should be
  // broken up and subcategories more"); the same filter as the page's chips
  const subsOf = (c: string) => {
    const m = new Map<string, number>()
    for (const r of idx?.byCategory.get(c) || []) if (r.sb && !r.cp) m.set(r.sb, (m.get(r.sb) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }
  const cats = (list: string[]) =>
    idx &&
    list
      .filter((c) => idx.byCategory.has(c))
      .map((c) => {
        const name = catName(idx, c)
        const row = (
          <NavRow key={c} to={catTo(idx, c)} icon={navIcon(name, [c])} active={activeCat === c} count={idx.byCategory.get(c)!.length} dot={!idx.public && (idx.navByCategory.get(c)?.his ?? 0) > 0} onNavigate={onNavigate} title={name}>
            <span className="truncate">{short(name)}</span>
          </NavRow>
        )
        const subs = activeCat === c ? subsOf(c) : []
        if (subs.length < 2) return row
        const cur = params.get("sub")
        // the ten biggest, and the open one when it is further down; the category page's chips list them all
        const shown = subs.slice(0, 10)
        const open = cur ? subs.find(([sb]) => sb === cur) : undefined
        if (open && !shown.includes(open)) shown.push(open)
        return (
          <div key={c}>
            {row}
            <div className="my-0.5 ml-[21px] space-y-px border-l border-border/70 pl-2" data-verify-nav-subs={c}>
              {shown.map(([sb, n]) => (
                <Link
                  key={sb}
                  to={`${catTo(idx, c)}?sub=${encodeURIComponent(sb)}`}
                  onClick={onNavigate}
                  aria-current={cur === sb ? "page" : undefined}
                  className={cn("flex items-center gap-2 rounded-md px-2 py-1 text-[12.5px] text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground", cur === sb && "bg-foreground/[0.06] text-foreground")}
                >
                  <span className="truncate">{sb}</span>
                  <span className="ml-auto font-mono text-[11px] tabular-nums">{n.toLocaleString("en-GB")}</span>
                </Link>
              ))}
              {subs.length > shown.length && (
                <Link to={catTo(idx, c)} onClick={onNavigate} className="block rounded-md px-2 py-1 text-[12px] text-muted-foreground/70 hover:text-foreground" data-verify-nav-more>
                  +{subs.length - shown.length} more
                </Link>
              )}
            </div>
          </div>
        )
      })
  // a scale's own SISO entry, first in its list (Shaan, 15 Oct: "surely SISO ... should just come to the top")
  const researched = section(
    "Researched",
    (meta?.industries || []).map((v) => {
      const n = Array.isArray(v.processes) ? v.processes.length : v.processes || 0
      return (
        <NavRow key={v.id} to={`/industries/${encodeURIComponent(v.id)}`} active={path === `/industries/${v.id}`} count={n} onNavigate={onNavigate}>
          <span className="truncate" title={v.name}>
            {shortIndustry(v.name)}
          </span>
        </NavRow>
      )
    }),
    `Researched (${meta?.industries?.length ?? 0})`,
  )

  // one kind's row: its kit dot, its name, its library count; the open kind drops down its variations
  // (catalogue/schema/variations.json), each a filter on its page
  const nodeRow = (n: ONode) => {
    if (!idx) return null
    const vars = know?.variations?.[n.key]?.variations || []
    const libN = nodeCount(idx.onto, n.key)
    const row = (
      <NavRow key={n.key} to={`/x/${n.key}`} active={path === `/x/${n.key}`} count={libN || (n.cats?.length ? 0 : undefined)} onNavigate={onNavigate} title={(n.job || n.name) + (n.sections ? ` · ${n.sections.length} sections` : "") + (n.cats?.length ? "" : " · the kit's own: nothing in the library yet")}>
        <KitDot state={kitState(n, marks, vars)} />
        <span className="truncate">{n.name}</span>
      </NavRow>
    )
    const vs = path === `/x/${n.key}` ? vars : []
    if (!vs.length) return row
    const rows = idx.onto.rows.get(n.key) || []
    const cur = params.get("v")
    return (
      <div key={n.key}>
        {row}
        <div className="my-0.5 ml-[21px] space-y-px border-l border-border/70 pl-2" data-verify-nav-variations={n.key}>
          {vs.map((v) => {
            const c = matchRows(rows, v).length
            const got = !!marks[`siso/base/${n.key}/${v.id}`] && !marks[`siso/base/${n.key}/${v.id}`]!.off
            return (
              <Link
                key={v.id}
                to={`/x/${n.key}?v=${v.id}`}
                onClick={onNavigate}
                title={v.why}
                aria-current={cur === v.id ? "page" : undefined}
                className={cn("flex items-center gap-2 rounded-md px-2 py-1 text-[12.5px] text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground", cur === v.id && "bg-foreground/[0.06] text-foreground")}
              >
                <KitDot state={got ? "full" : "gap"} className="size-[7px]" />
                <span className="truncate">{v.name}</span>
                <span className={cn("ml-auto font-mono text-[11px] tabular-nums", !c && "text-muted-foreground/60")}>{c ? c.toLocaleString("en-GB") : "gap"}</span>
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
  // a layer's families (taxonomy v2, catalogue/schema/families.json): one row each, kinds picked of kinds; a click drills
  // the side nav into the family, and its back row comes out again (Shaan, 15 Oct: "no way to go back ... like 21st.dev")
  const familyRows = (t: TopTab) => {
    if (!idx) return null
    const fs = familiesOf(idx.onto, t)
    if (!fs.length) return null
    return section(
      "Families",
      fs.map((f) => {
        const got = f.kinds.filter((n) => kitState(n, marks) !== "gap").length
        return (
          <button
            key={f.id}
            onClick={() => {
              setFamOpen(f.id)
              setUp(0)
            }}
            title={`${f.job ?? f.name}: ${got} of ${f.kinds.length} kinds in the SISO kit`}
            className="siso-nav-row flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-left text-[13.5px] text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            data-verify-nav-family={f.id}
          >
            <KitDot state={got === 0 ? "gap" : got === f.kinds.length ? "full" : "base"} />
            <span className="truncate">{f.name}</span>
            <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">
              {got}/{f.kinds.length}
            </span>
            <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" />
          </button>
        )
      }),
      `Families · ${fs.length}`,
    )
  }
  // inside a family: its job, then each kind with its dot and library count
  const famList = (id: string) => {
    const f = familyById(idx?.onto, tab, id)
    if (!f) return null
    return (
      <div data-verify-nav-family-open={f.id}>
        {f.job && <div className="px-2 pb-1 text-[12px] leading-snug text-muted-foreground">{f.job}</div>}
        <div className="space-y-0.5 pt-1">{f.kinds.map(nodeRow)}</div>
        <div className="mx-2 mt-4 flex flex-wrap gap-x-3 gap-y-1 border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><KitDot state="full" className="size-[7px]" /> in the kit</span>
          <span className="flex items-center gap-1"><KitDot state="base" className="size-[7px]" /> variations to pick</span>
          <span className="flex items-center gap-1"><KitDot state="gap" className="size-[7px]" /> gap</span>
        </div>
      </div>
    )
  }
  // every scale's list reads the same way down: the SISO kit at this scale, then the library to bring parts in from
  const kit = (sc: "atom" | "component" | "section" | "page" | "shell" | "look" | "asset") => {
    const rows = <KitRows scale={sc} path={path} search={params} factory={factory} onNavigate={onNavigate} scaleN={(x) => idx?.onto.scales[x as keyof typeof idx.onto.scales]?.length} doneN={(x) => idx?.onto.scales[x as keyof typeof idx.onto.scales]?.filter((d) => marks[`siso/base/${d.key}`] && !marks[`siso/base/${d.key}`].off).length} />
    return (
      <div data-verify-nav-section="SISO kit" data-verify-nav-kit={sc}>
        <div className="flex items-center gap-1.5 px-2 pt-1 pb-1 text-[12px] font-semibold text-sidebar-foreground">
          <img src={sisoMark} alt="" width={14} height={14} className="size-3.5" />
          In the SISO kit
        </div>
        <div className="space-y-0.5">{rows}</div>
      </div>
    )
  }
  const libHead = (
    <div className="mx-2 mt-6 mb-0.5 border-t border-border/60 pt-3" data-verify-nav-library>
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-sidebar-foreground">
        <Library className="size-3.5 text-muted-foreground" strokeWidth={1.75} />
        From the library
      </div>
      <div className="mt-0.5 text-[11.5px] leading-snug text-muted-foreground">Everything we found. Pick the best and it joins the kit.</div>
    </div>
  )

  // UI's lists, one per top tab
  const lists: Record<string, () => React.ReactNode> = {
    atoms: () => (
      <>
        {kit("atom")}
        {familyRows("atoms")}
      </>
    ),
    components: () => (
      <>
        {kit("component")}
        {libHead}
        <div className="space-y-0.5 pt-2">
          <NavRow to="/browse" icon={LayoutGrid} active={path === "/browse" && !loc.search} count={idx?.stats.ui_items} onNavigate={onNavigate}>
            Everything
          </NavRow>
          <NavRow to="/build/any" icon={Blocks} active={path.startsWith("/build/any")} onNavigate={onNavigate} title="The best parts for each job, from first principles">
            Build
            <span className="ml-auto text-[11px] text-muted-foreground">by slot</span>
          </NavRow>
          {idx?.public ? (
            <NavRow to="/browse?status=picked" icon={Star} active={path === "/browse" && params.get("status") === "picked"} onNavigate={onNavigate}>
              Picks
              <span className="ml-auto text-[11px] text-muted-foreground">best in kind</span>
            </NavRow>
          ) : (
            <NavRow to="/browse?status=curated" icon={Star} active={path === "/browse" && params.get("status") === "curated"} onNavigate={onNavigate}>
              Featured
              <span className="ml-auto text-[11px] text-muted-foreground">his picks</span>
            </NavRow>
          )}
          <NavRow to="/browse?sort=uses" icon={Flame} active={path === "/browse" && params.get("sort") === "uses" && !params.get("status")} onNavigate={onNavigate}>
            Most used
          </NavRow>
          <NavRow to="/browse?status=ours" icon={Package} active={path === "/browse" && params.get("status") === "ours"} onNavigate={onNavigate}>
            Ours
          </NavRow>
        </div>
        {familyRows("components")}
        {section(
          "The library",
          LIBRARY.map(({ to, label, icon }) => (
            <NavRow key={to} to={to} icon={icon} active={on(to)} onNavigate={onNavigate}>
              {label}
            </NavRow>
          )),
        )}
      </>
    ),
    pages: () => (
      <>
        {kit("page")}
        {libHead}
        <div className="space-y-0.5 pt-2">
          <NavRow to="/templates" icon={LayoutTemplate} active={on("/templates")} count={idx?.byCategory.get("pages/templates")?.length} onNavigate={onNavigate}>
            Templates
          </NavRow>
          {["landing", "portfolio", "store", "content", "dashboard", "mobile", "ai"].map((id) => (
            <NavRow key={id} to={`/build/${id}`} icon={Blocks} active={path.startsWith(`/build/${id}`)} onNavigate={onNavigate} title="Its page map, each slot with the best-rated parts">
              Build: {surfaceOf(id)!.label}
            </NavRow>
          ))}
        </div>
        {familyRows("pages")}
      </>
    ),
    sections: () => (
      <>
        {kit("section")}
        {libHead}
        <div className="space-y-0.5 pt-2">
          {!factory && (
            <NavRow to="/industries" icon={Building2} active={false} onNavigate={drill}>
              By industry
              <ChevronRight className="ml-auto size-3.5 text-muted-foreground" />
            </NavRow>
          )}
        </div>
        {familyRows("sections")}
      </>
    ),
    looks: () => (
      <>
        {factory && kit("look")}
        {factory && libHead}
        <div className="space-y-0.5 pt-2">
          <NavRow to="/themes" icon={Palette} active={on("/themes")} count={idx?.byCategory.get("themes/shadcn")?.length} onNavigate={onNavigate}>
            Themes
          </NavRow>
        </div>
        {familyRows("looks")}
      </>
    ),
    // Assets: the parts that are pictures, sounds and type (icons, logos, flags, shapes, sounds, fonts, social images)
    assets: () => (
      <>
        {kit("asset")}
        {familyRows("assets")}
        {libHead}
        {idx && <div className="space-y-0.5 pt-2">{cats(groupCats(idx, "assets"))}</div>}
      </>
    ),
    // Shells: the frame around a product (taxonomy v2): the app frame, the site frame, the native frame
    shells: () => (
      <>
        {kit("shell")}
        {familyRows("shells")}
      </>
    ),
    projects: () => (
      <>
        <div className="space-y-0.5">
          <NavRow to="/projects" icon={LayoutGrid} active={path === "/projects"} count={projects?.length} onNavigate={onNavigate}>
            All projects
          </NavRow>
        </div>
        {section(
          "Parts to pick",
          (projects || []).map((p) => (
            <NavRow key={p.id} to={`/projects/${p.id}`} icon={FolderKanban} active={on(`/projects/${p.id}`)} count={p.needsPick} onNavigate={onNavigate} title={`${p.about} · ${p.needsPick} parts to pick`}>
              <span className="truncate">{p.name}</span>
            </NavRow>
          )),
        )}
      </>
    ),
  }
  // Home: his places, the library by scale, and where it comes from
  lists.home = () => (
    <>
      <div data-verify-nav-section="SISO kit">
        <div className="flex items-center gap-1.5 px-2 pt-1 pb-1 text-[12px] font-semibold text-sidebar-foreground">
          <img src={sisoMark} alt="" width={14} height={14} className="size-3.5" />
          The SISO kit
        </div>
        <div className="space-y-0.5">
          {factory && (
            <NavRow to="/siso" icon={Crown} active={path === "/siso" && !params.toString()} onNavigate={onNavigate} title="One base for each part, chosen by you">
              The SISO set
            </NavRow>
          )}
          <NavRow to="/kit/map" icon={MapIcon} active={path === "/kit/map"} onNavigate={onNavigate} title="Every kind, by frame and family">
            Kit map
          </NavRow>
          <NavRow to="/kit" icon={Boxes} active={path === "/kit"} onNavigate={onNavigate} title="Every part we own, filed by job, live">
            Everything we own
          </NavRow>
          {factory && (
            <NavRow to="/ours" icon={FolderKanban} active={path === "/ours"} onNavigate={onNavigate} title="Our apps' parts, pictured from their real screens">
              From our apps
            </NavRow>
          )}
          {factory && (
            <NavRow to="/bookmarks" icon={Bookmark} active={on("/bookmarks")} onNavigate={onNavigate}>
              Saved
            </NavRow>
          )}
        </div>
      </div>
      {section(
        "Browse by scale",
        tabs
          .filter((t) => t.id !== "projects")
          .map((t) => (
            <NavRow key={t.id} to={t.to} icon={t.icon} active={false} count={idx ? familiesOf(idx.onto, t.id).reduce((n, f) => n + f.kinds.reduce((m, d) => m + nodeCount(idx.onto, d.key), 0), 0) : undefined} onNavigate={onNavigate}>
              {t.label}
            </NavRow>
          )),
      )}
      {section(
        "About the library",
        [
          <NavRow key="arc" to="/" icon={Sparkles} active={path === "/" || path === "/arc"} onNavigate={onNavigate} title="Every Arc part, live from its code">
            Start here: Arc
          </NavRow>,
          <NavRow key="map" to="/map" icon={MapPinned} active={path === "/map"} onNavigate={onNavigate} title="Every part SISO needs, by scale; pick a library to see what it covers">
            The map
          </NavRow>,
          <NavRow key="vs" to="/vs" icon={GitCompareArrows} active={path === "/vs"} onNavigate={onNavigate} title="Two libraries like for like: only the jobs both do are questions">
            Head to head
          </NavRow>,
          <NavRow key="papers" to="/papers" icon={ScrollText} active={on("/papers")} onNavigate={onNavigate} title="What the research taught us, with the sources">
            White papers
          </NavRow>,
          ...LIBRARY.map(({ to, label, icon }) => (
            <NavRow key={to} to={to} icon={icon} active={on(to)} onNavigate={onNavigate}>
              {label}
            </NavRow>
          )),
        ],
      )}
    </>
  )
  const jobList = (j: string) => {
    const it = JOB.get(j)
    return (
      idx &&
      it && (
        <>
          <div className="space-y-0.5">
            <NavRow to={`/browse/${j}`} icon={it.icon} active={path === `/browse/${j}`} count={groupN(idx, j)} onNavigate={onNavigate}>
              All
            </NavRow>
          </div>
          {section(it.label, cats(groupCats(idx, j)))}
        </>
      )
    )
  }

  return (
    <nav className="flex h-full flex-col" aria-label="Main" data-verify-nav-level={level.startsWith("core:") ? "core" : level.startsWith("group:") ? "group" : level}>
      {/* the name switches cores; the fold sits on the right, as on 21st.dev */}
      <div className="flex h-14 shrink-0 items-center gap-1 pr-2 pl-3">
        {factory ? (
          <button onClick={() => setHubs(!hubs)} aria-expanded={hubs} title={hubs ? "Back" : "Every core in the App Factory"} className="siso-press flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-1 py-1 text-left hover:bg-sidebar-accent" data-verify-switcher>
            <img src={sisoMark} alt="" width={28} height={28} className="siso-mark size-7 shrink-0" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="flex items-center gap-1 font-semibold tracking-tight">
                App Factory
                <ChevronDown className={cn("size-3.5 shrink-0 text-muted-foreground transition-transform duration-200", hubs && "rotate-180")} />
              </span>
              <span key={hubs ? "pick" : here} className="siso-title block truncate text-xs text-muted-foreground">
                {hubs ? "Pick a core" : here}
              </span>
            </span>
          </button>
        ) : (
          <Link to="/" onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md px-1 font-semibold tracking-tight">
            <img src={sisoMark} alt="" width={28} height={28} className="siso-mark size-7 shrink-0" />
            SISO UI Hub
          </Link>
        )}
        {onFold && (
          <button onClick={onFold} aria-label="Fold the side nav away" title="Fold the side nav away (⌘B)" className="siso-press grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground">
            <PanelLeftClose className="size-4" />
          </button>
        )}
      </div>

      <div className="px-3 pb-2">
        {!hubs && at > 0 && (
          <button onClick={() => setUp(up + 1)} className="siso-press mb-2 flex h-8 w-full items-center gap-2 rounded-md px-1 text-sm font-medium hover:bg-sidebar-accent" aria-label={level.startsWith("fam:") ? `Back to ${tabLabel(tab)}` : "Back to UI"} data-verify-nav-back={level}>
            <ChevronLeft className="size-4 text-muted-foreground" />
            <span key={level} className="siso-title flex-1 truncate pr-6 text-center">
              {level === "industries" ? "Industries" : level.startsWith("fam:") ? (familyById(idx?.onto, tab, level.slice(4))?.name ?? tabLabel(tab)) : JOB.get(level.slice(6))?.label}
            </span>
          </button>
        )}
        {!hubs && level === "root" && cid === "ui" && !homeList && tab !== "projects" && (
          <Link to="/kit" onClick={onNavigate} className="siso-press mb-2 flex h-8 w-full items-center gap-2 rounded-md px-1 text-sm font-medium hover:bg-sidebar-accent" data-verify-nav-back="root">
            <ChevronLeft className="size-4 text-muted-foreground" />
            <span className="flex-1 truncate pr-6 text-center">
              The SISO kit <span className="text-muted-foreground">· {tabLabel(tab)}</span>
            </span>
          </Link>
        )}
        <SearchButton onSearch={onSearch} label={level === "factory" ? "Search the App Factory" : cid === "ui" ? "Search UI" : `Search ${here}`} />
      </div>

      <Slide k={level === "root" ? `root:${homeList ? "home" : tab}` : level} dir={dir}>
        {level === "factory" ? (
          <div data-verify-hubs>
            <div className="space-y-0.5">
              <NavRow to="/factory" icon={House} active={cid === null} onNavigate={pick}>
                Home
              </NavRow>
            </div>
            {GROUPS.map((gr) => (
              <div key={gr.label} data-verify-nav-section={gr.label}>
                <div className="siso-nav-label px-2 pt-5 pb-1 text-muted-foreground">{gr.label}</div>
                <div className="space-y-0.5">
                  {gr.cores.map((c) => (
                    <NavRow key={c.id} to={c.to} icon={c.icon} active={cid === c.id} onNavigate={pick} count={c.id === "ui" ? idx?.stats.total : c.id === "projects" ? projects?.length : c.n}>
                      <span className="truncate">{c.name}</span>
                    </NavRow>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : core ? (
          <>
            <div className="space-y-0.5" data-verify-core-nav={core.id}>
              <NavRow to={core.to} icon={House} active={path === core.to && !loc.hash} onNavigate={onNavigate}>
                Overview
              </NavRow>
              {core.id === "projects"
                ? (projects || []).map((p) => (
                    <NavRow key={p.id} to={`${core.to}#${p.id}`} icon={core.icon} active={loc.hash === `#${p.id}`} count={p.components} onNavigate={onNavigate} title={p.about}>
                      <span className="truncate">{p.name}</span>
                    </NavRow>
                  ))
                : core.parts.map((p) => (
                    <NavRow key={p.id} to={p.to ?? `${core.to}#${p.id}`} icon={p.icon ?? core.icon} active={p.to ? on(p.to) : loc.hash === `#${p.id}`} count={p.n} onNavigate={onNavigate} title={p.hint}>
                      <span className="truncate">{p.name}</span>
                    </NavRow>
                  ))}
            </div>
            {core.id === "industries" && inInd && researched}
          </>
        ) : level === "industries" ? (
          <>
            <div className="space-y-0.5">
              <NavRow to="/industries" icon={Building2} active={path === "/industries"} onNavigate={onNavigate}>
                All industries
              </NavRow>
            </div>
            {researched}
          </>
        ) : level.startsWith("group:") ? (
          jobList(level.slice(6))
        ) : level.startsWith("fam:") ? (
          famList(level.slice(4))
        ) : (
          (lists[homeList ? "home" : !factory && tab === "projects" ? "components" : tab] ?? lists.components)()
        )}
      </Slide>
      {!(level === "root" && homeList) && level !== "factory" && <Places path={path} factory={factory} onNavigate={onNavigate} />}
      <Foot name={factory ? "App Factory" : "SISO UI Hub"} pub={!factory} />
    </nav>
  )
}
