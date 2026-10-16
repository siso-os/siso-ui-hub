// uihub: siso:page-arc-browser
// The Arc browser (Shaan, 14 Oct: "show me all of these arc components in real code ... so I can actually see them visually
// and see the animations kind of like how the arc component browser works"). Every Arc part renders live from its real
// source (app/src/arc, written by bin/arc-browser-build from the code bank), using the usage example on Arc's own docs page.
// A part mounts when it nears the screen, so the laptop only runs what you can see; one that throws shows a failure card.
import "@/arc/foundation.scoped.css"
import { Suspense, lazy, useEffect, useMemo, useState, type ComponentType } from "react"
import { Check, Code2, Copy, Moon, Sun } from "lucide-react"
import { Boundary, Rendered, WhenNear, pickExport, type Status } from "@/components/kit/live"
import manifest from "@/arc/manifest.json"

type Part = { name: string; title: string; description: string; kind: string | null; categories: string[]; tags: string[]; files: string[]; demo: string | null; use: string[]; avoid: string[]; install: string }

const parts = (manifest as Part[]).filter((p) => p.kind === "component" || p.kind === "block")
const demos = import.meta.glob("../arc/demos/*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
const sources = import.meta.glob(["../arc/**/*.{tsx,ts,css}", "!../arc/foundation*.css"], { query: "?raw", import: "default" }) as Record<string, () => Promise<string>>

// Arc's own category order, blocks last (they are whole sections)
const ORDER = ["actions", "inputs", "data", "disclosure", "feedback", "text", "ai", "special", "blocks"]
const NAMES: Record<string, string> = { actions: "Actions", inputs: "Inputs", data: "Data and charts", disclosure: "Disclosure", feedback: "Feedback", text: "Text", ai: "AI", special: "Special", blocks: "Blocks" }
const ACCENTS = ["default", "orange", "amber", "violet", "blue", "green", "coral", "rose", "neutral"] as const


const lazyDemo = new Map<string, ComponentType>()
function demoFor(p: Part): ComponentType {
  let C = lazyDemo.get(p.name)
  if (!C) {
    const load = demos[`../arc/${p.demo}`]
    C = lazy(async () => {
      if (!load) throw new Error("Arc's docs page has no usage example for this part, so there is nothing to render it with")
      const m = await load()
      const E = pickExport(m)
      if (!E) throw new Error("its usage example exports no component")
      return { default: E }
    })
    lazyDemo.set(p.name, C)
  }
  return C
}



function CodePanel({ p }: { p: Part }) {
  const files = useMemo(() => [...(p.demo ? [p.demo] : []), ...p.files.filter((f) => !f.endsWith(".json"))], [p])
  const [tab, setTab] = useState(files[0])
  const [code, setCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    const load = sources[`../arc/${tab}`]
    setCode("")
    if (load) load().then(setCode)
    else setCode("// not in the copied source")
  }, [tab])
  return (
    <div className="border-t border-border/60 bg-black/30">
      <div className="flex flex-wrap items-center gap-1 px-3 pt-2">
        {files.map((f) => (
          <button key={f} onClick={() => setTab(f)} className={`rounded-md px-2 py-1 font-mono text-[11px] ${f === tab ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {f === p.demo ? "usage" : f.split("/").pop()}
          </button>
        ))}
        <button
          className="ml-auto inline-flex items-center gap-1 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
          onClick={() => navigator.clipboard.writeText(p.install).then(() => (setCopied(true), setTimeout(() => setCopied(false), 1200)))}
          title={p.install}
        >
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />} install line
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto p-3 font-mono text-[11.5px] leading-relaxed text-foreground/90">{code || "loading…"}</pre>
    </div>
  )
}

function PartCard({ p, onStatus }: { p: Part; onStatus: (name: string, s: Status) => void }) {
  const [open, setOpen] = useState(false)
  const Demo = demoFor(p)
  const block = p.kind === "block"
  return (
    <article className={`overflow-hidden rounded-2xl border border-border/70 bg-card/40 ${block ? "lg:col-span-2" : ""}`} id={p.name}>
      <div className="arc-stage relative flex items-center justify-center overflow-hidden" style={{ background: "var(--background)", color: "var(--foreground)" }}>
        <WhenNear minH={block ? 460 : 240}>
          <Boundary onError={() => onStatus(p.name, "failed")}>
            <Suspense fallback={<span className="text-xs" style={{ color: "var(--text-muted)" }}>loading {p.title}…</span>}>
              <Rendered onShown={() => onStatus(p.name, "rendered")}>
                <div className={`w-full ${block ? "p-6" : "flex justify-center p-8"}`}>
                  <Demo />
                </div>
              </Rendered>
            </Suspense>
          </Boundary>
        </WhenNear>
      </div>
      <div className="flex items-start gap-3 border-t border-border/60 px-4 py-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium">{p.title}</h3>
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{p.description}</p>
        </div>
        <button onClick={() => setOpen((o) => !o)} className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs ${open ? "border-white/30 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
          <Code2 className="size-3.5" /> Code
        </button>
      </div>
      {(p.use.length > 0 || p.avoid.length > 0) && (
        <details className="group border-t border-border/60 px-4 py-2 text-xs">
          <summary className="cursor-pointer list-none text-muted-foreground hover:text-foreground">When to use it <span className="opacity-60 group-open:hidden">· {p.use.length + p.avoid.length} notes</span></summary>
          <div className="mt-2 grid gap-3 pb-1 sm:grid-cols-2">
            {p.use.length > 0 && (
              <ul className="space-y-1">
                {p.use.map((u) => (
                  <li key={u} className="flex gap-1.5"><Check className="mt-0.5 size-3 shrink-0 text-emerald-400" />{u}</li>
                ))}
              </ul>
            )}
            {p.avoid.length > 0 && (
              <ul className="space-y-1 text-muted-foreground">
                {p.avoid.map((u) => (
                  <li key={u} className="flex gap-1.5"><span className="mt-[1px] shrink-0 text-rose-400">×</span>{u}</li>
                ))}
              </ul>
            )}
          </div>
        </details>
      )}
      {open && <CodePanel p={p} />}
    </article>
  )
}


export default function Arc() {
  const [theme, setTheme] = useState<"dark" | "light">(() => (localStorage.getItem("arc:theme") as "dark" | "light") || "dark")
  const [accent, setAccent] = useState<string>(() => localStorage.getItem("arc:accent") || "orange")
  const [status, setStatus] = useState<Record<string, Status>>({})
  const onStatus = useMemo(() => (name: string, s: Status) => setStatus((x) => (x[name] === "failed" ? x : { ...x, [name]: s })), [])
  useEffect(() => localStorage.setItem("arc:theme", theme), [theme])
  useEffect(() => localStorage.setItem("arc:accent", accent), [accent])
  const groups = useMemo(() => {
    const g = new Map<string, Part[]>()
    for (const p of parts) {
      const c = p.kind === "block" ? "blocks" : p.categories[0] || "special"
      g.set(c, [...(g.get(c) ?? []), p])
    }
    return [...g].sort((a, b) => ORDER.indexOf(a[0]) - ORDER.indexOf(b[0]))
  }, [])
  const rendered = Object.values(status).filter((s) => s === "rendered").length
  const failed = Object.values(status).filter((s) => s === "failed").length
  return (
    <div className="arc-scope mx-auto w-full max-w-[1400px] px-6 pb-24 pt-6" data-theme={theme} data-accent={accent === "default" ? undefined : accent} style={{ background: "transparent" }}>
      <header className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Start here</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Arc, live from its code</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Every Arc part, running from its own source with the example on Arc's docs page. Scroll to see them move; Code shows the files and the install line.</p>
      </header>
      <div className="sticky top-0 z-20 -mx-6 mb-6 flex flex-wrap items-center gap-3 border-b border-border/60 bg-background/90 px-6 py-2.5 backdrop-blur">
        <nav className="flex flex-wrap gap-1 text-xs">
          {groups.map(([c, ps]) => (
            <a key={c} href={`#arc-${c}`} className="rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground">
              {NAMES[c] ?? c} <span className="opacity-60">{ps.length}</span>
            </a>
          ))}
        </nav>
        <span className="font-mono text-[11px] text-muted-foreground" data-arc-counts>
          {rendered} rendered · {failed} failed · {parts.length - rendered - failed} below
        </span>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex gap-1">
            {ACCENTS.map((a) => (
              <button key={a} title={a} onClick={() => setAccent(a)} className={`size-4 rounded-full border ${accent === a ? "border-white" : "border-transparent"}`} style={{ background: a === "default" ? "conic-gradient(#ffad5e,#a78bff,#6ba3ff,#53dca6,#ffad5e)" : { orange: "#ffad5e", amber: "#ffcb62", violet: "#a78bff", blue: "#6ba3ff", green: "#53dca6", coral: "#ff9386", rose: "#ff8bc5", neutral: "#ccc" }[a] }} />
            ))}
          </div>
          <button onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className="rounded-full border border-border p-1.5 text-muted-foreground hover:text-foreground" title="Light or dark">
            {theme === "dark" ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </div>
      </div>
      {groups.map(([c, ps]) => (
        <section key={c} id={`arc-${c}`} className="mb-12 scroll-mt-32">
          <h2 className="mb-4 text-lg font-medium">
            {NAMES[c] ?? c} <span className="text-sm text-muted-foreground">{ps.length}</span>
          </h2>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {ps.map((p) => (
              <PartCard key={p.name} p={p} onStatus={onStatus} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
