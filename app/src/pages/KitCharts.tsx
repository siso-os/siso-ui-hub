// uihub: siso:page-kit-charts
// The SISO kit's charts, live from their own source (app/src/kit/<lib>, written by bin/kit-build). Shaan, 14 Oct: "it's a
// shame we don't have all of the graphs ... more charts from like other components libraries ... that we need to own".
// evilcharts first (MIT, 252 chart blocks on ECharts and Recharts); more chart libraries join as sections of this page.
import { Suspense, lazy, useMemo, useState, type ComponentType } from "react"
import { Code2 } from "lucide-react"
import evil from "@/kit/evilcharts/manifest.json"
import { Boundary, Rendered, WhenNear, pickExport, type Status } from "@/components/kit/live"

type Chart = { name: string; title: string; description: string; family: string; engine: string; file: string; install: string }
const charts = evil as Chart[]
const mods = import.meta.glob("../kit/evilcharts/**/*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
const raw = import.meta.glob("../kit/evilcharts/**/*.tsx", { query: "?raw", import: "default" }) as Record<string, () => Promise<string>>

const FAMILIES = ["line", "area", "bar", "composed", "pie", "radial", "radar", "sankey", "other"]
const NAMES: Record<string, string> = { line: "Line", area: "Area", bar: "Bar", composed: "Composed", pie: "Pie and donut", radial: "Radial", radar: "Radar", sankey: "Sankey and flow", other: "Other" }

const cache = new Map<string, ComponentType>()
function live(c: Chart) {
  let C = cache.get(c.name)
  if (!C) {
    const load = mods[`../kit/evilcharts/${c.file}`]
    C = lazy(async () => {
      if (!load) throw new Error("its file was not copied into the kit")
      const E = pickExport(await load())
      if (!E) throw new Error("its file exports no component")
      return { default: E }
    })
    cache.set(c.name, C)
  }
  return C
}

function ChartCard({ c, onStatus }: { c: Chart; onStatus: (n: string, s: Status) => void }) {
  const [code, setCode] = useState<string | null>(null)
  const C = live(c)
  return (
    <article id={c.name} className="overflow-hidden rounded-2xl border border-border/70 bg-card/40">
      <div className="arc-stage relative overflow-hidden bg-background">
        <WhenNear minH={340} className="w-full p-4">
          <Boundary onError={() => onStatus(c.name, "failed")}>
            <Suspense fallback={<span className="text-xs text-muted-foreground">loading {c.title}…</span>}>
              <Rendered onShown={() => onStatus(c.name, "rendered")}>
                <C />
              </Rendered>
            </Suspense>
          </Boundary>
        </WhenNear>
      </div>
      <div className="flex items-start gap-3 border-t border-border/60 px-4 py-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium">{c.title}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{c.description}</p>
          <p className="mt-1 font-mono text-[10.5px] text-muted-foreground/70">evilcharts · {c.engine}</p>
        </div>
        <button
          onClick={() => (code === null ? raw[`../kit/evilcharts/${c.file}`]?.().then(setCode) : setCode(null))}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${code !== null ? "border-white/30 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
        >
          <Code2 className="size-3.5" /> Code
        </button>
      </div>
      {code !== null && (
        <div className="border-t border-border/60 bg-black/30">
          <p className="px-3 pt-2 font-mono text-[11px] text-muted-foreground">{c.install}</p>
          <pre className="max-h-[420px] overflow-auto p-3 font-mono text-[11.5px] leading-relaxed text-foreground/90">{code}</pre>
        </div>
      )}
    </article>
  )
}

export default function KitCharts() {
  const [engine, setEngine] = useState<"all" | "echarts" | "recharts">("all")
  const [status, setStatus] = useState<Record<string, Status>>({})
  const onStatus = useMemo(() => (n: string, s: Status) => setStatus((x) => (x[n] === "failed" ? x : { ...x, [n]: s })), [])
  const shown = charts.filter((c) => engine === "all" || c.engine === engine)
  const groups = FAMILIES.map((f) => [f, shown.filter((c) => c.family === f)] as const).filter(([, cs]) => cs.length)
  const rendered = Object.values(status).filter((s) => s === "rendered").length
  const failed = Object.values(status).filter((s) => s === "failed").length
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-6">
      <header className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">SISO kit</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Charts, live from their code</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{charts.length} charts from evilcharts (MIT), each running from its own source with its sample data, grouped by what they show. More chart libraries join below as they are brought in.</p>
      </header>
      <div className="sticky top-0 z-20 -mx-6 mb-6 flex flex-wrap items-center gap-3 border-b border-border/60 bg-background/90 px-6 py-2.5 backdrop-blur">
        <nav className="flex flex-wrap gap-1 text-xs">
          {groups.map(([f, cs]) => (
            <a key={f} href={`#charts-${f}`} className="rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground">
              {NAMES[f]} <span className="opacity-60">{cs.length}</span>
            </a>
          ))}
        </nav>
        <span className="font-mono text-[11px] text-muted-foreground" data-arc-counts>
          {rendered} rendered · {failed} failed · {shown.length - rendered - failed} below
        </span>
        <div className="ml-auto flex gap-1 text-xs">
          {(["all", "echarts", "recharts"] as const).map((e) => (
            <button key={e} onClick={() => setEngine(e)} className={`rounded-full border px-2.5 py-1 ${engine === e ? "border-white/40 text-foreground" : "border-border text-muted-foreground"}`}>
              {e === "all" ? "Both engines" : e === "echarts" ? "ECharts" : "Recharts"}
            </button>
          ))}
        </div>
      </div>
      {groups.map(([f, cs]) => (
        <section key={f} id={`charts-${f}`} className="mb-12 scroll-mt-20">
          <h2 className="mb-4 text-lg font-medium">
            {NAMES[f]} <span className="text-sm text-muted-foreground">{cs.length}</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {cs.map((c) => (
              <ChartCard key={c.name} c={c} onStatus={onStatus} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
