// uihub: siso:page-projects
// Projects, a top tab of UI (Shaan, 10 Oct: "Project should be there"): what each of his projects is built from, from
// the UI Hub's nightly census (factory/bin/build-data). Its to-do is "to pick": a part we built where the library holds
// a better one, shown as the library's own card to swap in. His build only: project names never reach the public build.
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { cn } from "@/lib/utils"
import { fmtInt, useIndex } from "@/lib/data"
import { useProjects, type Project } from "@/lib/factory"
import { ItemCard } from "@/components/ItemCard"

type Status = "needs-pick" | "picked" | "ours" | "dead"
type Part = { name: string; file: string; status: Status; grade?: string | null; swapTo?: string | null; why?: string[]; loc?: number; kind?: string }
type PageRow = { name: string; file: string; loc?: number; components: Part[] }
type Detail = { id: string; name: string; pages: PageRow[]; components: Part[] }

const STATUSES: { id: Status; label: string; about: string }[] = [
  { id: "needs-pick", label: "To pick", about: "We built these; the library holds a better one. Its card is the one to swap in." },
  { id: "picked", label: "From the library", about: "Already a library part." },
  { id: "ours", label: "Ours", about: "Built for this project and kept." },
  { id: "dead", label: "Dead", about: "Nothing uses these any more." },
]
// the bar's colours: to pick in the app's hue, library parts in its second, ours neutral, dead faint
const TONE: Record<Status, string> = { "needs-pick": "bg-[rgb(var(--app-rgb))]", picked: "bg-[var(--app-second)]", ours: "bg-foreground/35", dead: "bg-foreground/12" }

const details = new Map<string, Promise<Detail | null>>()
function useDetail(id: string | undefined) {
  const [d, setD] = useState<Detail | null | undefined>(undefined)
  useEffect(() => {
    if (!id) return
    if (!details.has(id))
      details.set(
        id,
        fetch(`/data/factory/projects/${encodeURIComponent(id)}.json`)
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      )
    let live = true
    details.get(id)!.then((x) => live && setD(x))
    return () => {
      live = false
    }
  }, [id])
  return d
}

/** the census's first reason, without its list dash */
const why = (x: Part) => x.why?.[0]?.replace(/^-\s*/, "") || ""

const counts = (p: Project): Record<Status, number> => ({ "needs-pick": p.needsPick, picked: p.picked, ours: p.ours, dead: p.dead })

/** one bar, split by what the parts are */
function Bar({ n, className }: { n: Record<Status, number>; className?: string }) {
  const total = Object.values(n).reduce((a, b) => a + b, 0) || 1
  return (
    <div className={cn("flex h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]", className)}>
      {STATUSES.map((s) => (n[s.id] ? <span key={s.id} className={TONE[s.id]} style={{ width: `${(n[s.id] / total) * 100}%` }} title={`${s.label}: ${n[s.id]}`} /> : null))}
    </div>
  )
}

const Key = () => (
  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
    {STATUSES.map((s) => (
      <span key={s.id} className="inline-flex items-center gap-1.5">
        <span className={cn("size-2 rounded-full", TONE[s.id])} />
        {s.label}
      </span>
    ))}
  </div>
)

function All({ projects }: { projects: Project[] }) {
  const parts = projects.reduce((n, p) => n + p.components, 0)
  const toPick = projects.reduce((n, p) => n + p.needsPick, 0)
  return (
    <div data-verify-projects-home>
      <div className="mb-6">
        <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">Projects</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          What each of your projects is built from, from last night's census: {projects.length} projects, {fmtInt(parts)} parts, and {fmtInt(toPick)} where the library has a better one to pick.
        </p>
        <Key />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} className="siso-glow-card flex flex-col gap-1.5 p-4" data-verify-project={p.id}>
            <div className="flex items-baseline gap-2">
              <span className="min-w-0 flex-1 truncate font-semibold">{p.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                <b className="font-semibold text-foreground tabular-nums">{p.needsPick}</b> to pick
              </span>
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">{p.about}</div>
            <Bar n={counts(p)} className="mt-auto" />
            <div className="flex gap-3 pt-1 text-xs text-muted-foreground">
              <span>
                <b className="font-semibold text-foreground tabular-nums">{fmtInt(p.components)}</b> parts
              </span>
              <span>
                <b className="font-semibold text-foreground tabular-nums">{p.pages}</b> pages
              </span>
              <span>
                <b className="font-semibold text-foreground tabular-nums">{p.picked}</b> from the library
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function PartRow({ x }: { x: Part }) {
  return (
    <li className="flex items-baseline gap-3 px-3 py-2 text-sm">
      <span className="font-medium">{x.name}</span>
      {x.kind && <span className="siso-chip rounded-full px-2 py-px text-[11px]">{x.kind}</span>}
      <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">{x.file}</span>
      {why(x) && <span className="hidden max-w-[40%] truncate text-xs text-muted-foreground lg:inline">{why(x)}</span>}
    </li>
  )
}


// ---- the maps (Shaan, 10 Oct: "the page map component map feature map components and pages so I can view them all") ----
type View = "parts" | "pages" | "components" | "features"
const VIEWS: { id: View; label: string }[] = [
  { id: "parts", label: "Parts to pick" },
  { id: "pages", label: "Page map" },
  { id: "components", label: "Component map" },
  { id: "features", label: "Feature map" },
]
const CHIP_TONE: Record<Status, string> = {
  "needs-pick": "border-[rgb(var(--app-rgb)/0.55)] bg-[rgb(var(--app-rgb)/0.12)]",
  picked: "border-[color-mix(in_srgb,var(--app-second)_55%,transparent)] bg-[color-mix(in_srgb,var(--app-second)_14%,transparent)]",
  ours: "border-foreground/20 bg-foreground/[0.04]",
  dead: "border-foreground/10 text-muted-foreground line-through",
}
const GENERIC = new Set(["apps", "web", "src", "app", "components", "component", "pages", "page", "routes", "route", "ui", "lib", "hooks", "features", "feature", "views", "screens", "shared", "common", "modules", "packages"])
/** a file's feature: the first folder under src that names something ("src/components/agents/X.tsx" is agents) */
const featureOf = (file: string) => {
  const segs = file.split("/").slice(0, -1).filter((x) => !GENERIC.has(x.toLowerCase()) && !x.startsWith("("))
  return segs[0] || "core"
}
const nOf = (n: number, w: string) => `${fmtInt(n)} ${w}${n === 1 ? "" : "s"}`
const folderOf = (file: string) => file.split("/").slice(0, -1).slice(-2).join("/") || "/"
const tally = (parts: Part[]) => {
  const m = { "needs-pick": 0, picked: 0, ours: 0, dead: 0 } as Record<Status, number>
  for (const c of parts) m[c.status] = (m[c.status] || 0) + 1
  return m
}

function Chip({ x }: { x: Part }) {
  const idx = useIndex()!
  const swap = x.swapTo && idx.byId.has(x.swapTo) ? x.swapTo : null
  const cls = cn("inline-flex h-6 max-w-full items-center truncate rounded-md border px-1.5 text-[11.5px]", CHIP_TONE[x.status])
  return swap ? (
    <Link to={`/c/${encodeURIComponent(swap)}`} className={cn(cls, "hover:brightness-125")} title={`${x.name}: swap for ${swap}`}>
      {x.name}
    </Link>
  ) : (
    <span className={cls} title={`${x.name} · ${STATUSES.find((s) => s.id === x.status)?.label}${why(x) ? " · " + why(x) : ""}`}>
      {x.name}
    </span>
  )
}

/** every page as a card with the parts on it, grouped by folder: its own parts first (what makes it that page), then
 * the ones other pages use too */
function PageMap({ d }: { d: Detail }) {
  const uses = new Map<string, number>()
  for (const pg of d.pages) for (const c of pg.components) uses.set(c.file, (uses.get(c.file) || 0) + 1)
  const groups = new Map<string, PageRow[]>()
  for (const pg of d.pages) groups.set(folderOf(pg.file), [...(groups.get(folderOf(pg.file)) || []), pg])
  return (
    <div className="space-y-8" data-verify-page-map>
      {[...groups.entries()].sort((a, b) => b[1].length - a[1].length).map(([f, pages]) => (
        <section key={f}>
          <h2 className="siso-kicker mb-3 font-mono normal-case">{f} · {pages.length}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {pages.map((pg) => {
              const own = pg.components.filter((c) => (uses.get(c.file) || 0) < 2)
              const shared = pg.components.filter((c) => (uses.get(c.file) || 0) >= 2)
              return (
                <div key={pg.file} className="siso-glow-card space-y-2.5 rounded-[14px] p-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-medium">{pg.name}</span>
                    <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">{nOf(pg.components.length, "part")}{pg.loc ? ` · ${nOf(pg.loc, "line")}` : ""}</span>
                  </div>
                  <Bar n={tally(pg.components)} />
                  {own.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[11px] text-muted-foreground">Its own · {own.length}</div>
                      <div className="flex flex-wrap gap-1">{own.map((c) => <Chip key={c.file + c.name} x={c} />)}</div>
                    </div>
                  )}
                  {shared.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[11px] text-muted-foreground">Shared with other pages · {shared.length}</div>
                      <div className="flex flex-wrap gap-1 opacity-80">
                        {shared.slice(0, 30).map((c) => <Chip key={c.file + c.name} x={c} />)}
                        {shared.length > 30 && <span className="text-[11px] text-muted-foreground">+{shared.length - 30}</span>}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

/** every component with the pages that use it, the most used first */
function ComponentMap({ d }: { d: Detail }) {
  const [open, setOpen] = useState<string | null>(null)
  const used = new Map<string, string[]>()
  for (const pg of d.pages) for (const c of pg.components) used.set(c.file, [...(used.get(c.file) || []), pg.name])
  const rows = [...d.components].map((c) => ({ c, on: used.get(c.file) || [] })).sort((a, b) => b.on.length - a.on.length || a.c.name.localeCompare(b.c.name))
  const max = Math.max(1, ...rows.map((r) => r.on.length))
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-xl border bg-card" data-verify-component-map>
      {rows.map(({ c, on }) => (
        <li key={c.file + c.name}>
          <button onClick={() => setOpen(open === c.file ? null : c.file)} className="grid w-full grid-cols-[minmax(0,14rem)_minmax(0,1fr)_6rem] items-center gap-3 px-3 py-2 text-left text-sm hover:bg-foreground/[0.03]">
            <span className="flex min-w-0 items-center gap-2">
              <span className={cn("size-2 shrink-0 rounded-full", TONE[c.status])} />
              <span className="truncate font-medium">{c.name}</span>
            </span>
            <span className="h-1.5 overflow-hidden rounded-full bg-foreground/[0.06]">
              <span className={cn("block h-full rounded-full", TONE[c.status])} style={{ width: `${Math.max(3, (on.length / max) * 100)}%` }} />
            </span>
            <span className="text-right text-xs text-muted-foreground tabular-nums">{on.length} page{on.length === 1 ? "" : "s"}</span>
          </button>
          {open === c.file && (
            <div className="space-y-1.5 px-3 pb-3 text-xs text-muted-foreground">
              <div className="font-mono text-[11px]">{c.file}</div>
              {why(c) && <div>{why(c)}</div>}
              <div className="flex flex-wrap gap-1">{on.map((n, i) => <span key={n + i} className="rounded-md border px-1.5 py-0.5">{n}</span>)}</div>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

// a name's words that can name a feature ("RecordedSessionReplay" is recorded, session, replay; "Tasks" is task)
const SHAPE_WORDS = new Set("page view card panel widget row button bar list item sheet menu toast pill dock rail stack shelf popover tab header footer board modal dialog drawer icon badge chip toggle field input form section layout provider context hook wrapper container box grid table divider scene overlay tooltip link preview space shell frame fold group home".split(" "))
const VOICE = new Set(["mic", "speak", "talk", "voice", "audio", "orb"])
const wordsOf = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[\s_.-]+/)
    .map((w) => w.toLowerCase())
    .map((w) => (w.length > 4 && /[^su]s$/.test(w) ? w.slice(0, -1) : w))
    .map((w) => (VOICE.has(w) ? "voice" : w))
    .filter((w) => w.length > 2 && !SHAPE_WORDS.has(w))

/** the project by feature: a folder that names one ("widgets/"), else the word its parts share most ("Chat", "Task",
 * "Session"), else Shared. Each feature lists its own pages and parts, and how much is ours or the library's. */
function FeatureMap({ d }: { d: Detail }) {
  const freq = new Map<string, number>()
  for (const x of [...d.components, ...d.pages]) for (const w of new Set(wordsOf(x.name))) freq.set(w, (freq.get(w) || 0) + 1)
  const featureFor = (name: string, file: string) => {
    const folder = featureOf(file)
    if (folder !== "core") return folder
    const best = wordsOf(name).filter((w) => (freq.get(w) || 0) >= 3).sort((a, b) => (freq.get(b) || 0) - (freq.get(a) || 0))[0]
    return best || "shared"
  }
  const f = new Map<string, { pages: PageRow[]; parts: Part[] }>()
  const at = (k: string) => f.get(k) || (f.set(k, { pages: [], parts: [] }), f.get(k)!)
  for (const pg of d.pages) at(featureFor(pg.name, pg.file)).pages.push(pg)
  for (const c of d.components) at(featureFor(c.name, c.file)).parts.push(c)
  const size = (x: { pages: PageRow[]; parts: Part[] }) => x.parts.length + x.pages.length
  const rows = [...f.entries()].sort((a, b) => Number(a[0] === "shared") - Number(b[0] === "shared") || size(b[1]) - size(a[1]))
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" data-verify-feature-map>
      {rows.map(([name, x]) => (
        <div key={name} className="siso-glow-card space-y-2.5 rounded-[14px] p-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[15px] font-semibold capitalize">{name.replace(/[-_]/g, " ")}</span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{nOf(x.pages.length, "page")} · {nOf(x.parts.length, "part")}</span>
          </div>
          <Bar n={tally(x.parts)} className="h-2" />
          {x.pages.length > 0 && <p className="line-clamp-2 text-xs text-muted-foreground">{x.pages.map((p) => p.name).join(" · ")}</p>}
          <div className="flex flex-wrap gap-1">
            {x.parts.slice(0, 18).map((c) => <Chip key={c.file + c.name} x={c} />)}
            {x.parts.length > 18 && <span className="text-[11px] text-muted-foreground">+{x.parts.length - 18}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

function One({ p }: { p: Project }) {
  const idx = useIndex()!
  const d = useDetail(p.id)
  const n = counts(p)
  const [st, setSt] = useState<Status>(p.needsPick ? "needs-pick" : "picked")
  const [view, setView] = useState<View>("parts")
  const rows = (d?.components || []).filter((x) => x.status === st)
  const swaps = st === "needs-pick" ? rows.filter((x) => x.swapTo && idx.byId.has(x.swapTo)) : []
  const rest = st === "needs-pick" ? rows.filter((x) => !swaps.includes(x)) : rows
  const about = STATUSES.find((s) => s.id === st)!.about
  return (
    <div data-verify-project-page={p.id}>
      <div className="mb-5">
        <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">{p.name}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{p.about}</p>
      </div>
      <div className="mb-5 flex flex-wrap gap-1" role="tablist" aria-label="Views" data-verify-project-views>
        {VIEWS.map((v) => (
          <button key={v.id} role="tab" aria-selected={view === v.id} onClick={() => setView(v.id)} className={cn("siso-chip siso-press h-8 rounded-lg px-3 text-[13px]", view === v.id && "text-foreground")} data-on={view === v.id || undefined}>
            {v.label}
          </button>
        ))}
      </div>
      {view !== "parts" ? (
        d === undefined ? (
          <p className="text-sm text-muted-foreground">Loading the census…</p>
        ) : d === null ? (
          <p className="text-sm text-muted-foreground">This project's census has names only; its maps arrive with the next nightly run.</p>
        ) : view === "pages" ? (
          <PageMap d={d} />
        ) : view === "components" ? (
          <ComponentMap d={d} />
        ) : (
          <FeatureMap d={d} />
        )
      ) : (
      <>
      <div className="mb-6 max-w-3xl">
        <Bar n={n} className="h-2" />
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Parts by what they are">
          {STATUSES.map((s) => (
            <button key={s.id} role="tab" aria-selected={st === s.id} onClick={() => setSt(s.id)} className="siso-chip siso-press inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px]" data-on={st === s.id || undefined} data-verify-status={s.id}>
              <span className={cn("size-2 rounded-full", TONE[s.id])} />
              {s.label}
              <b className="font-semibold tabular-nums">{n[s.id]}</b>
            </button>
          ))}
          <span className="self-center pl-1 text-xs text-muted-foreground">
            {fmtInt(p.components)} parts on {p.pages} pages
          </span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{about}</p>
      </div>
      {d === undefined ? (
        <p className="text-sm text-muted-foreground">Loading the census…</p>
      ) : d === null ? (
        <p className="text-sm text-muted-foreground">This project's census has names only; its parts arrive with the next nightly run.</p>
      ) : (
        <>
          {swaps.length > 0 && (
            <section className="mb-8" data-verify-swaps>
              <h2 className="siso-kicker mb-3">The library's pick for each · {swaps.length}</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {swaps.map((x) => (
                  <ItemCard
                    key={x.file + x.name}
                    row={idx.byId.get(x.swapTo!)!}
                    note={
                      <span className="text-[13px] leading-snug text-muted-foreground">
                        In place of <b className="font-semibold text-foreground">{x.name}</b>
                        {why(x) && ` · ${why(x)}`}
                      </span>
                    }
                  />
                ))}
              </div>
            </section>
          )}
          {rest.length > 0 && (
            <section className="mb-8">
              {swaps.length > 0 && <h2 className="siso-kicker mb-3">No pick yet · {rest.length}</h2>}
              <ul className="divide-y divide-border overflow-hidden rounded-xl border bg-card">
                {rest.map((x) => (
                  <PartRow key={x.file + x.name} x={x} />
                ))}
              </ul>
            </section>
          )}
          <section className="mb-4" data-verify-project-pages>
            <h2 className="siso-kicker mb-3">Pages · {d.pages.length}</h2>
            <ul className="divide-y divide-border overflow-hidden rounded-xl border bg-card">
              {d.pages.map((pg) => {
                const m = { "needs-pick": 0, picked: 0, ours: 0, dead: 0 } as Record<Status, number>
                for (const c of pg.components) m[c.status] = (m[c.status] || 0) + 1
                return (
                  <li key={pg.file} className="flex items-center gap-3 px-3 py-2 text-sm">
                    <span className="w-48 shrink-0 truncate font-medium">{pg.name}</span>
                    <Bar n={m} className="w-32 shrink-0" />
                    <span className="w-24 shrink-0 text-xs text-muted-foreground tabular-nums">
                      {pg.components.length} parts{m["needs-pick"] ? ` · ${m["needs-pick"]} to pick` : ""}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">{pg.file}</span>
                  </li>
                )
              })}
            </ul>
          </section>
        </>
      )}
      </>
      )}
    </div>
  )
}

export default function Projects() {
  const { id } = useParams()
  const idx = useIndex()!
  const projects = useProjects()
  if (idx.public) return <p className="text-sm text-muted-foreground">Projects are in his build only.</p>
  if (!projects) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!id) return <All projects={projects} />
  const p = projects.find((x) => x.id === id)
  if (!p) return <p className="text-sm text-muted-foreground">No project “{id}”.</p>
  return <One key={p.id} p={p} />
}
