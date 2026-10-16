// uihub: siso:page-kit-dashboard
// Every chart, stat and data part the hub holds, live, one row per kind, each with Keep and Skip. Shaan, 15 Oct: "get all
// of the components ready ... all of the Arc components and all the really cool graphs and stuff and charts ... so I could
// at least tick some shit off ... a more curated SISO kit ... that we could actually use for the other agents".
// A keep is a bookmark (siso/kit/dashboard/<part>, its row in the note), so `uihub sync` brings it home and `uihub kit`
// lists it for any agent; a skip is the decks' own skip (siso/skip/<lib>:<name>), so it leaves the decks too.
import "@/arc/foundation.scoped.css"
import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ComponentType } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight, Code2, Heart, X } from "lucide-react"
import arcManifest from "@/arc/manifest.json"
import { Boundary, Rendered, WhenNear, pickExport, type Status } from "@/components/kit/live"
import { setBookmark, useBookmarks, type Mark } from "@/lib/bookmarks"
import { cn } from "@/lib/utils"

type KitRow = [id: string, title: string, cat: string, type: string, file: string, web: number, player: string, description: string]
type ArcPart = { name: string; title: string; description: string; categories?: string[]; demo?: string }
type Part = { id: string; title: string; lib: string; cat: string; desc: string; type: string; load?: () => Promise<Record<string, unknown>>; arc?: boolean; web: boolean; player?: string }
type Row = { id: string; name: string; parts: Part[]; more?: string }

const kitMods = import.meta.glob(["../kit/**/*.tsx", "../kit/**/*.jsx"]) as Record<string, () => Promise<Record<string, unknown>>>
const arcDemos = import.meta.glob("../arc/demos/*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
const BOARD = "dashboard"
// parts the headless check found broken or blank on their own (/kit/dashboard?check=<from>: 60 parts at a time, all mounted,
// in a fresh page each so the browser holds only those); they stay off
const BAD = new Set(Object.values(import.meta.glob("../../../catalogue/kit-dashboard-render.json", { eager: true, import: "bad" }))[0] as string[] | undefined ?? [])
// libraries whose charts are finished pieces lead each row; the rest follow in the kit's order
const LEAD = ["arc", "evilcharts", "shadcn-chart", "reui", "shadcn-dashboard", "diceui", "taki", "zaidan", "uix", "intentui", "bklit", "plotcn", "mariocharts", "visx", "shadcn-ui-blocks", "shadcnuikit", "shadcnblocks"]
const lead = (lib: string) => { const i = LEAD.indexOf(lib); return i < 0 ? LEAD.length : i }
const keepKey = (p: Part) => `siso/kit/${BOARD}/${p.id}`
const skipKey = (p: Part) => `siso/skip/${p.id.replace("/", ":")}`
const on = (m?: Mark) => !!m && !m.off
const n = (x: number) => x.toLocaleString("en-GB")

// the kinds, in the order a dashboard is read: the numbers first, then the charts, then the tables and feeds around them
const CHART = /^data-viz\/chart/
const KINDS: { id: string; name: string; test: (p: Part, t: string) => boolean; more?: string }[] = [
  { id: "kpi", name: "KPI and stat cards", test: (p, t) => p.cat === "data-display/stat" || (CHART.test(p.cat) && /\b(kpi|stat|metric|scorecard)s?\b/.test(t)), more: "/browse/data-display/stat" },
  { id: "spark", name: "Sparklines and mini charts", test: (p, t) => CHART.test(p.cat) && /spark|mini|tiny|micro/.test(t) },
  { id: "line", name: "Line", test: (p, t) => CHART.test(p.cat) && /\bline|trend/.test(t) && !/area|bar/.test(t) },
  { id: "area", name: "Area", test: (p, t) => CHART.test(p.cat) && /area|stream/.test(t) },
  { id: "bar", name: "Bar and column", test: (p, t) => CHART.test(p.cat) && /\bbar|column|histogram/.test(t) },
  { id: "pie", name: "Pie and donut", test: (p, t) => CHART.test(p.cat) && /pie|donut|doughnut/.test(t) },
  { id: "radial", name: "Radial and gauges", test: (p, t) => p.cat === "data-viz/gauge" || (CHART.test(p.cat) && /radial|gauge|meter|dial|ring|speedo/.test(t)) },
  { id: "radar", name: "Radar and polar", test: (p, t) => CHART.test(p.cat) && /radar|spider|polar/.test(t) },
  { id: "heat", name: "Heatmaps and calendars", test: (p, t) => CHART.test(p.cat) && /heat|calendar|contribution|punch/.test(t) },
  { id: "flow", name: "Funnels, flows and trees", test: (p, t) => CHART.test(p.cat) && /funnel|sankey|flow|alluvial|chord|treemap|sunburst|tree|network|graph/.test(t) },
  { id: "scatter", name: "Scatter, candles and distribution", test: (p, t) => CHART.test(p.cat) && /scatter|bubble|distribution|box ?plot|violin|candle|ohlc|stock/.test(t) },
  { id: "chart", name: "More charts", test: (p) => CHART.test(p.cat), more: "/browse/data-viz/chart" },
  { id: "progress", name: "Progress and meters", test: (p) => p.cat === "data-viz/progress-bar" },
  { id: "table", name: "Tables and leaderboards", test: (p) => p.cat === "data-display/table", more: "/browse/data-display/table" },
  { id: "timeline", name: "Timelines and activity", test: (p) => p.cat === "data-display/timeline" },
  { id: "map", name: "Maps", test: (p) => p.cat === "data-viz/map", more: "/browse/data-viz/map" },
  { id: "dash", name: "Whole dashboards", test: (p) => p.cat === "layout/dashboard", more: "/browse/layout/dashboard" },
]
const KIT_CATS = /^(data-viz\/(chart|gauge|map|progress-bar)|data-display\/(stat|table|timeline)|layout\/dashboard)/

const ARC: Part[] = (arcManifest as ArcPart[])
  .filter((a) => a.demo && arcDemos[`../arc/${a.demo}`])
  .map((a) => ({ id: `arc/${a.name}`, title: a.title, lib: "arc", cat: a.categories?.[0] || "other", desc: a.description, type: "arc", load: arcDemos[`../arc/${a.demo}`], arc: true, web: true }))
const ARC_ROWS: Row[] = [
  { id: "arc-data", name: "Arc · data", parts: ARC.filter((p) => p.cat === "data"), more: "/arc" },
  { id: "arc-blocks", name: "Arc · blocks", parts: ARC.filter((p) => p.cat === "blocks"), more: "/arc" },
  { id: "arc-rest", name: "Arc · everything else", parts: ARC.filter((p) => p.cat !== "data" && p.cat !== "blocks"), more: "/arc" },
]

const cache = new Map<string, ComponentType>()
function demo(p: Part): ComponentType {
  let C = cache.get(p.id)
  if (!C) {
    C = lazy(async () => {
      if (!p.load) throw new Error("its file was not copied in")
      const E = pickExport(await p.load())
      if (!E) throw new Error("its file exports no component")
      if (p.player !== "remotion") return { default: E }
      const { Player } = await import("@remotion/player")
      return { default: () => <Player component={E} durationInFrames={150} fps={30} compositionWidth={1280} compositionHeight={720} autoPlay loop style={{ width: "100%" }} /> }
    })
    cache.set(p.id, C)
  }
  return C
}

function Card({ p, row, marks, can, onStatus, status }: { p: Part; row: string; marks: Record<string, Mark>; can: boolean; onStatus: (id: string, s: Status) => void; status?: Status }) {
  const failed = status === "failed"
  const kept = on(marks[keepKey(p)])
  const skipped = on(marks[skipKey(p)])
  const wide = p.type === "block" || p.type === "page" || p.cat === "layout/dashboard"
  const C = demo(p)
  const stage = (
    <WhenNear minH={236} className="flex h-full w-full items-center justify-center">
      <Boundary onError={() => onStatus(p.id, "failed")}>
        <Suspense fallback={<span className="text-xs text-muted-foreground">loading…</span>}>
          <Rendered onShown={() => onStatus(p.id, "rendered")}>
            <C />
          </Rendered>
        </Suspense>
      </Boundary>
    </WhenNear>
  )
  return (
    <article
      data-verify-kit-card={p.id}
      data-status={status}
      className={cn(
        "group/card flex shrink-0 snap-start flex-col overflow-hidden rounded-2xl border bg-card/40 transition-[border-color,opacity] duration-150",
        wide ? "w-[560px]" : "w-[340px]",
        kept ? "border-emerald-400/60 ring-1 ring-emerald-400/25" : "border-border/70",
        (skipped || failed) && !kept && "opacity-45 hover:opacity-100",
      )}
    >
      <div className="relative h-[244px] overflow-auto bg-background" style={{ transform: "translateZ(0)" }}>
        {p.arc ? (
          <div className="arc-scope h-full w-full" data-theme="dark" style={{ background: "transparent" }}>
            <div className="flex h-full w-full items-center justify-center p-4" style={{ color: "var(--foreground)" }}>{stage}</div>
          </div>
        ) : (
          <div className="h-full w-full p-3">{stage}</div>
        )}
        {kept && <span className="pointer-events-none absolute top-2 left-2 rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10.5px] font-medium text-white">Kept</span>}
      </div>
      <div className="flex items-center gap-2 border-t border-border/60 px-3 py-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[13px] font-medium" title={p.desc || p.title}>{p.title}</h3>
          <p className="truncate font-mono text-[10.5px] text-muted-foreground">{p.lib}{failed ? " · did not render" : ""}</p>
        </div>
        <Link to={p.arc ? `/arc#${p.id.slice(4)}` : `/kit?lib=${encodeURIComponent(p.lib)}&q=${encodeURIComponent(p.title)}`} title="Code and install line" className="grid size-7 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
          <Code2 className="size-3.5" />
        </Link>
        {can && (
          <>
            <button
              onClick={() => setBookmark(skipKey(p), !skipped)}
              aria-pressed={skipped}
              title={skipped ? "Skipped: click to undo" : "Skip"}
              className={cn("grid size-7 shrink-0 place-items-center rounded-lg hover:bg-foreground/10", skipped ? "text-rose-300" : "text-muted-foreground hover:text-foreground")}
            >
              <X className="size-3.5" />
            </button>
            <button
              onClick={() => {
                setBookmark(keepKey(p), !kept, kept ? {} : { signal: "love", note: row })
                if (!kept && skipped) setBookmark(skipKey(p), false)
              }}
              aria-pressed={kept}
              data-verify-kit-keep
              className={cn(
                "inline-flex h-7 shrink-0 items-center gap-1 rounded-lg px-2.5 text-xs font-medium transition-colors",
                kept ? "bg-emerald-500/90 text-white hover:bg-emerald-500" : "bg-foreground/[.07] text-foreground hover:bg-foreground/15",
              )}
            >
              <Heart className={cn("size-3.5", kept && "fill-current")} /> {kept ? "Kept" : "Keep"}
            </button>
          </>
        )}
      </div>
    </article>
  )
}

function Strip({ row, marks, can, show, status, onStatus, check }: { row: Row; marks: Record<string, Mark>; can: boolean; show: "all" | "kept" | "todo"; status: Record<string, Status>; onStatus: (id: string, s: Status) => void; check: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const kept = row.parts.filter((p) => on(marks[keepKey(p)])).length
  // kept first, then the ones to decide, then the skipped; the order is fixed when the page opens so cards do not jump
  const [order] = useState(() => [...row.parts].sort((a, b) => rank(b, marks) - rank(a, marks) || lead(a.lib) - lead(b.lib)))
  // a part that fails here, after the check, leaves the row too (unless it is kept)
  const parts = order.filter((p) => check || status[p.id] !== "failed" || on(marks[keepKey(p)])).filter((p) => (show === "kept" ? on(marks[keepKey(p)]) : show === "todo" ? !on(marks[keepKey(p)]) && !on(marks[skipKey(p)]) : true))
  const by = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth - 120), behavior: "smooth" })
  return (
    <section id={`row-${row.id}`} className="scroll-mt-28" data-verify-kit-row={row.id}>
      <div className="mb-2 flex items-center gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight">{row.name}</h2>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{kept > 0 && <span className="text-emerald-300">{kept} kept · </span>}{n(row.parts.length)} live</span>
        {row.more && <Link to={row.more} className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">more in the library</Link>}
        <span className="ml-auto flex gap-1">
          <button onClick={() => by(-1)} aria-label="Back" className="grid size-7 place-items-center rounded-lg border border-border/70 text-muted-foreground hover:text-foreground"><ChevronLeft className="size-4" /></button>
          <button onClick={() => by(1)} aria-label="Next" className="grid size-7 place-items-center rounded-lg border border-border/70 text-muted-foreground hover:text-foreground"><ChevronRight className="size-4" /></button>
        </span>
      </div>
      {parts.length ? (
        <div ref={ref} className={cn("flex gap-3 pb-3", check ? "flex-wrap" : "snap-x overflow-x-auto [scrollbar-width:thin]")}>
          {parts.map((p) => <Card key={p.id} p={p} row={row.id} marks={marks} can={can} onStatus={onStatus} status={status[p.id]} />)}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border/70 px-4 py-6 text-center text-xs text-muted-foreground">{show === "kept" ? "Nothing kept in this row yet" : "All decided in this row"}</p>
      )}
    </section>
  )
}
const rank = (p: Part, marks: Record<string, Mark>) => (on(marks[keepKey(p)]) ? 2 : on(marks[skipKey(p)]) ? 0 : 1)

export default function KitDashboard() {
  const [kit, setKit] = useState<KitRow[] | null>(null)
  const checkFrom = new URLSearchParams(location.search).get("check")
  const check = checkFrom !== null
  const { items: marks, store } = useBookmarks()
  const [show, setShow] = useState<"all" | "kept" | "todo">("all")
  const [status, setStatus] = useState<Record<string, Status>>({})
  const onStatus = useMemo(() => (id: string, s: Status) => setStatus((m) => (m[id] === s ? m : { ...m, [id]: s })), [])
  useEffect(() => {
    import("../kit/index.json").then((m) => setKit((m.default as unknown as { parts: KitRow[] }).parts))
  }, [])

  const rows = useMemo<Row[]>(() => {
    if (!kit) return []
    const parts: Part[] = kit
      .filter((r) => KIT_CATS.test(r[2]) && r[5] && (check || !BAD.has(r[0])))
      .map((r) => {
        const lib = r[0].split("/")[0]
        return { id: r[0], title: r[1], lib, cat: r[2], desc: r[7], type: r[3], load: kitMods[`../kit/${lib}/${r[4]}`], web: !!r[5], player: r[6] }
      })
    const taken = new Set<string>()
    const out = KINDS.map((k) => {
      const ps = parts.filter((p) => !taken.has(p.id) && k.test(p, `${p.title} ${p.id}`.toLowerCase()))
      ps.forEach((p) => taken.add(p.id))
      return { id: k.id, name: k.name, parts: ps, more: k.more }
    })
    const arc = ARC_ROWS.map((r) => ({ ...r, parts: r.parts.filter((p) => check || !BAD.has(p.id)) }))
    const all = [...out.slice(0, 1), ...arc.slice(0, 1), ...out.slice(1), ...arc.slice(1)]
    if (check) {
      let i = 0
      const from = Number(checkFrom) || 0
      return all.map((r) => ({ ...r, parts: r.parts.filter(() => { const k = i++; return k >= from && k < from + 60 }) })).filter((r) => r.parts.length)
    }
    return all.filter((r) => r.parts.length)
  }, [kit, check, checkFrom])

  const all = rows.flatMap((r) => r.parts)
  const kept = all.filter((p) => on(marks[keepKey(p)])).length
  const skipped = all.filter((p) => !on(marks[keepKey(p)]) && on(marks[skipKey(p)])).length
  const can = store !== "off" && store !== "loading"

  return (
    <div className="mx-auto w-full max-w-[1500px] px-6 pt-5 pb-24" data-verify-kit-dashboard>
      <header className="flex flex-wrap items-end gap-x-6 gap-y-2">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard parts</h1>
          <p className="mt-1 text-sm text-muted-foreground">Every chart, stat and data part we hold, live. Keep the ones you like: agents build the streaming and ops screens from what you keep.</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="w-56">
            <div className="flex justify-between font-mono text-[11px] text-muted-foreground tabular-nums">
              <span><span className="text-emerald-300">{n(kept)} kept</span> · {n(skipped)} skipped</span>
              <span>{n(Math.max(0, all.length - kept - skipped))} to go</span>
            </div>
            <div className="mt-1 flex h-1.5 overflow-hidden rounded-full bg-foreground/10">
              <span className="bg-emerald-400" style={{ width: `${all.length ? (kept / all.length) * 100 : 0}%` }} />
              <span className="bg-rose-400/50" style={{ width: `${all.length ? (skipped / all.length) * 100 : 0}%` }} />
            </div>
          </div>
          <div role="tablist" className="flex gap-3 text-sm">
            {(["all", "todo", "kept"] as const).map((s) => (
              <button key={s} role="tab" aria-selected={show === s} onClick={() => setShow(s)} className="siso-tab pb-1">
                {s === "all" ? "All" : s === "todo" ? "To decide" : "Kept"}
              </button>
            ))}
          </div>
        </div>
      </header>
      {store === "off" && <p className="mt-3 text-xs text-muted-foreground">Keep and Skip are on Shaan's build; this one shows the parts only.</p>}
      {store === "local" && <p className="mt-3 text-xs text-amber-300/90">Saving in this browser only: the bookmarks store did not answer.</p>}

      <nav className="sticky top-0 z-20 -mx-6 mt-4 mb-5 flex gap-1.5 overflow-x-auto border-b border-border/60 bg-background/85 px-6 py-2.5 backdrop-blur-xl [scrollbar-width:none]" aria-label="Rows">
        {rows.map((r) => {
          const k = r.parts.filter((p) => on(marks[keepKey(p)])).length
          return (
            <a key={r.id} href={`#row-${r.id}`} data-on={k > 0 || undefined} className="siso-chip inline-flex h-7 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs">
              {r.name}
              <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{k > 0 ? `${k}/` : ""}{r.parts.length}</span>
            </a>
          )
        })}
        {!kit && <span className="text-xs text-muted-foreground">loading the kit…</span>}
      </nav>

      <div className="flex flex-col gap-8">
        {rows.map((r) => <Strip key={r.id} row={r} marks={marks} can={can} show={show} status={status} onStatus={onStatus} check={check} />)}
      </div>
      {kit && (
        <p className="mt-10 text-xs text-muted-foreground">
          {n(all.length)} live parts from {new Set(all.map((p) => p.lib)).size} libraries. Agents read what you keep with <code className="font-mono">uihub kit</code>. The library holds more as pictures: <Link to="/browse/data-viz/chart" className="underline hover:text-foreground">charts</Link>, <Link to="/browse/data-display/stat" className="underline hover:text-foreground">stat cards</Link>, <Link to="/browse/layout/dashboard" className="underline hover:text-foreground">dashboards</Link>.
        </p>
      )}
    </div>
  )
}
