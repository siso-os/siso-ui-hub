// uihub: siso:page-kit-everything
// Everything we own, filed by job (Shaan, 14 Oct: "bring them all in ... tell me how many comps we have and how it's
// organized ... so I can actually see what we have"). Every part of every library copied in by bin/kit-import renders
// live from its own source; jobs and categories come from siso-ui-code's classifier. Pick a job on the left, then a
// category; parts mount only when they near the screen, and one that throws shows a failure card.
import { LayerBand } from "@/components/LayerBand"
import { Suspense, lazy, useEffect, useMemo, useState, type ComponentType, type ReactNode } from "react"
import { useSearchParams } from "react-router-dom"
import { Check, Code2, Copy, Search } from "lucide-react"
import { Boundary, Rendered, WhenNear, pickExport, type Status } from "@/components/kit/live"

type Lib = { lib: string; homepage: string | null; description: string | null; items: number; parts: number }
type Row = [id: string, title: string, cat: string, type: string, file: string, web: number, player: string, description: string]
type Index = { libs: Lib[]; parts: Row[] }
type Detail = { id: string; files: string[]; install: string; deps: string[] }

const modules = import.meta.glob(["../kit/**/*.tsx", "../kit/**/*.jsx"]) as Record<string, () => Promise<Record<string, unknown>>>
const loadIndex = () => import("../kit/index.json").then((m) => m.default as unknown as Index)
const partsFiles = import.meta.glob("../kit/*/parts.json", { import: "default" }) as Record<string, () => Promise<{ parts: Detail[] }>>
const codeFiles = import.meta.glob("../kit/*/code.json", { import: "default" }) as Record<string, () => Promise<Record<string, string>>>

// the jobs, in the order you reach for them when building a screen; icons and the unfiled last
const GROUPS: [string, string][] = [
  ["actions", "Actions"], ["inputs", "Inputs"], ["data-display", "Data display"], ["data-viz", "Charts and data"],
  ["overlays", "Overlays"], ["navigation", "Navigation"], ["status", "Status and loading"], ["layout", "Layout"],
  ["flows", "Flows"], ["pages", "Pages"], ["ai-agent", "AI"], ["media", "Media"], ["motion", "Motion"],
  ["marketing", "Marketing sections"], ["assets", "Icons"], ["other", "Not filed yet"], ["lib", "Helpers"],
]
const PAGE = 48
const label = (s: string) => s.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase())
const wide = (r: Row) => r[3] === "block" || r[3] === "page" || /marketing|flows|pages|layout\/page-shell/.test(r[2])

const lazyCache = new Map<string, ComponentType>()
function demoFor(r: Row): ComponentType {
  let C = lazyCache.get(r[0])
  if (!C) {
    const lib = r[0].split("/")[0]
    const load = modules[`../kit/${lib}/${r[4]}`]
    C = lazy(async () => {
      if (!load) throw new Error("its file was not copied in")
      const E = pickExport(await load())
      if (!E) throw new Error("its file exports no component")
      if (r[6] !== "remotion") return { default: E }
      // a Remotion part is a video composition: it plays in Remotion's player
      const { Player } = await import("@remotion/player")
      return { default: () => <Player component={E} durationInFrames={150} fps={30} compositionWidth={1280} compositionHeight={720} autoPlay loop style={{ width: "100%" }} /> }
    })
    lazyCache.set(r[0], C)
  }
  return C
}

function CodePanel({ r }: { r: Row }) {
  const lib = r[0].split("/")[0]
  const [d, setD] = useState<Detail | null>(null)
  const [code, setCode] = useState<Record<string, string> | null>(null)
  const [tab, setTab] = useState(r[4])
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    partsFiles[`../kit/${lib}/parts.json`]?.().then((m) => setD(m.parts.find((p) => p.id === r[0]) ?? null))
    codeFiles[`../kit/${lib}/code.json`]?.().then(setCode)
  }, [lib, r])
  const files = d?.files.filter((f) => !f.endsWith(".json")) ?? [r[4]]
  return (
    <div className="border-t border-border/60 bg-black/30">
      <div className="flex flex-wrap items-center gap-1 px-3 pt-2">
        {files.map((f) => (
          <button key={f} onClick={() => setTab(f)} className={`rounded-md px-2 py-1 font-mono text-[11px] ${f === tab ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {f.split("/").pop()}
          </button>
        ))}
        {d && (
          <button className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground" title={d.install}
            onClick={() => navigator.clipboard.writeText(d.install).then(() => (setCopied(true), setTimeout(() => setCopied(false), 1200)))}>
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />} install line
          </button>
        )}
      </div>
      {d && d.deps.length > 0 && <p className="px-3 pt-1 font-mono text-[10.5px] text-muted-foreground">needs {d.deps.join(", ")}</p>}
      <pre className="max-h-[420px] overflow-auto p-3 font-mono text-[11.5px] leading-relaxed text-foreground/90">{code ? code[tab] ?? "// not in the copied source" : "loading…"}</pre>
    </div>
  )
}

function Stage({ r, minH, onStatus, children }: { r: Row; minH: number; onStatus: (id: string, s: Status) => void; children?: ReactNode }) {
  const Demo = demoFor(r)
  if (!r[5])
    return (
      <div className="flex items-center justify-center p-6 text-center text-xs text-muted-foreground" style={{ minHeight: minH }}>
        Built for React Native or Solid, not the web: code only
      </div>
    )
  return (
    <WhenNear minH={minH}>
      <Boundary onError={() => onStatus(r[0], "failed")}>
        <Suspense fallback={<span className="text-xs text-muted-foreground">loading…</span>}>
          <Rendered onShown={() => onStatus(r[0], "rendered")}>
            {children}
            <Demo />
          </Rendered>
        </Suspense>
      </Boundary>
    </WhenNear>
  )
}

function Card({ r, onStatus }: { r: Row; onStatus: (id: string, s: Status) => void }) {
  const [open, setOpen] = useState(false)
  const big = wide(r)
  const lib = r[0].split("/")[0]
  return (
    <article className={`overflow-hidden rounded-2xl border border-border/70 bg-card/40 ${big ? "lg:col-span-2" : ""}`} id={r[0]}>
      {/* translateZ makes the card the box for a part's fixed elements, so a block's sticky header stays in its card */}
      <div className={`relative overflow-auto bg-background ${big ? "max-h-[640px]" : "max-h-[420px]"}`} style={{ transform: "translateZ(0)" }}>
        <div className={big ? "w-full" : "flex w-full justify-center p-6"}>
          <Stage r={r} minH={big ? 420 : 200} onStatus={onStatus} />
        </div>
      </div>
      <div className="flex items-start gap-3 border-t border-border/60 px-4 py-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium">{r[1]}</h3>
          <p className="mt-0.5 font-mono text-[10.5px] text-muted-foreground">{lib} · {r[3]}</p>
          {r[7] && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r[7]}</p>}
        </div>
        <button onClick={() => setOpen((o) => !o)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${open ? "border-white/30 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
          <Code2 className="size-3.5" /> Code
        </button>
      </div>
      {open && <CodePanel r={r} />}
    </article>
  )
}

function IconTile({ r, onStatus }: { r: Row; onStatus: (id: string, s: Status) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`rounded-xl border border-border/60 bg-card/30 ${open ? "col-span-full" : ""}`}>
      <button onClick={() => setOpen((o) => !o)} className="flex w-full flex-col items-center gap-1.5 p-3" title={`${r[0]}: click for code`}>
        <div className="flex h-10 items-center justify-center [&_svg]:size-7">
          <Stage r={r} minH={40} onStatus={onStatus} />
        </div>
        <span className="w-full truncate text-center font-mono text-[10px] text-muted-foreground">{r[1]}</span>
      </button>
      {open && <CodePanel r={r} />}
    </div>
  )
}

export default function Kit() {
  const [index, setIndex] = useState<Index | null>(null)
  const [sp, setSp] = useSearchParams()
  const [status, setStatus] = useState<Record<string, Status>>({})
  const [shown, setShown] = useState(PAGE)
  const onStatus = useMemo(() => (id: string, s: Status) => setStatus((x) => (x[id] === "failed" ? x : { ...x, [id]: s })), [])
  useEffect(() => void loadIndex().then(setIndex), [])
  const g = sp.get("g") || "actions", c = sp.get("c") || "", lib = sp.get("lib") || "", q = (sp.get("q") || "").toLowerCase()
  const set = (k: Record<string, string>) => { setShown(PAGE); setSp((p) => { const n = new URLSearchParams(p); for (const [a, b] of Object.entries(k)) b ? n.set(a, b) : n.delete(a); return n }) }

  const view = useMemo(() => {
    if (!index) return null
    const pool = index.parts.filter((r) => (!lib || r[0].startsWith(lib + "/")) && (!q || (r[0] + " " + r[1] + " " + r[7]).toLowerCase().includes(q)))
    const groups = new Map<string, number>(), cats = new Map<string, Row[]>()
    for (const r of pool) {
      const gr = r[2].split("/")[0]
      groups.set(gr, (groups.get(gr) ?? 0) + 1)
      if (q || gr === g) cats.set(r[2], [...(cats.get(r[2]) ?? []), r])
    }
    return { pool, groups, cats: [...cats].sort((a, b) => b[1].length - a[1].length) }
  }, [index, g, lib, q])

  if (!index || !view) return <div className="p-10 text-sm text-muted-foreground">Loading the kit…</div>
  const rendered = Object.values(status).filter((s) => s === "rendered").length
  const failed = Object.values(status).filter((s) => s === "failed").length
  const one = c ? view.cats.filter(([k]) => k === c) : view.cats

  return (
    <div className="mx-auto flex w-full max-w-[1600px] gap-6 px-6 pb-24 pt-6">
      <aside className="sticky top-4 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-auto md:block">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">By job</p>
        <nav className="mt-2 space-y-0.5 text-sm">
          {GROUPS.filter(([k]) => view.groups.get(k)).map(([k, name]) => (
            <div key={k}>
              <button onClick={() => set({ g: k, c: "" })} className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left ${k === g && !q ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {name} <span className="font-mono text-[11px] opacity-70">{view.groups.get(k)?.toLocaleString()}</span>
              </button>
              {k === g && !q && (
                <div className="mb-1 ml-3 border-l border-border/60 pl-2">
                  {view.cats.map(([ck, rs]) => (
                    <button key={ck} onClick={() => set({ c: ck === c ? "" : ck })} className={`flex w-full justify-between rounded-md px-2 py-1 text-left text-xs ${ck === c ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                      {label(ck.split("/")[1] || ck)} <span className="font-mono opacity-60">{rs.length}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <LayerBand />
        <header className="mb-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">SISO kit</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{index.parts.length.toLocaleString()} parts from {index.libs.length} libraries, live</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Every part we own, running from its own code and filed by the job it does. Pick a job on the left; Code shows the files and the install line. Arc's 130 are on Start here.</p>
        </header>
        <div className="sticky top-0 z-20 -mx-6 mb-6 flex flex-wrap items-center gap-3 border-b border-border/60 bg-background/90 px-6 py-2.5 backdrop-blur">
          <label className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm">
            <Search className="size-3.5 text-muted-foreground" />
            <input value={sp.get("q") || ""} onChange={(e) => set({ q: e.target.value })} placeholder="Search every part" className="w-56 bg-transparent outline-none placeholder:text-muted-foreground" />
          </label>
          <select value={lib} onChange={(e) => set({ lib: e.target.value })} className="rounded-full border border-border bg-background px-3 py-1.5 text-sm">
            <option value="">All {index.libs.length} libraries</option>
            {[...index.libs].sort((a, b) => b.parts - a.parts).map((l) => <option key={l.lib} value={l.lib}>{l.lib} ({l.parts})</option>)}
          </select>
          <span className="font-mono text-[11px] text-muted-foreground" data-kit-counts>{rendered} rendered · {failed} failed</span>
        </div>

        {one.map(([ck, rs]) => {
          const icons = ck === "assets/icon"
          const n = c || one.length === 1 ? shown : icons ? 60 : 8
          return (
            <section key={ck} className="mb-12">
              <h2 className="mb-4 flex items-baseline gap-3 text-lg font-medium">
                {label(ck.split("/")[1] || ck)} <span className="text-sm text-muted-foreground">{rs.length}</span>
                {!c && rs.length > n && <button onClick={() => set({ c: ck })} className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">see all {rs.length}</button>}
              </h2>
              <div className={icons ? "grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-10" : "grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3"}>
                {rs.slice(0, n).map((r) => (icons ? <IconTile key={r[0]} r={r} onStatus={onStatus} /> : <Card key={r[0]} r={r} onStatus={onStatus} />))}
              </div>
              {(c || one.length === 1) && rs.length > shown && (
                <button onClick={() => setShown((s) => s + PAGE)} className="mt-4 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:text-foreground">
                  Show {Math.min(PAGE, rs.length - shown)} more of {rs.length - shown}
                </button>
              )}
            </section>
          )
        })}
      </main>
    </div>
  )
}
