// uihub: siso:coverage
// Coverage: every UI library we know of, pulled or not. Shaan, 11 Oct: "the whole point is we're supposed to be that layer
// above everything ... I want to see how many libraries have we not actually like pulled from". Two lists are known:
// shadcn's own index of registries, and every GitHub repository holding a shadcn registry.json (the bank's
// bin/find-registries). data/coverage.json is written by each deploy (bin/hubindex.py library_coverage).
import { useEffect, useMemo, useState } from "react"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { dataUrl, fmtInt } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/bits"

type Cov = {
  generated: string
  pulled: [string, number][]
  index: { n: string; h?: string; d?: string; p: 0 | 1 }[]
  github: { r: string; f: number; u?: string; s: "held" | "new" | "template" }[]
  counts: Record<string, number>
}

const TABS = [
  { id: "index", label: "shadcn's index, not pulled" },
  { id: "new", label: "On GitHub, not pulled" },
  { id: "template", label: "Templates and tests" },
  { id: "pulled", label: "Pulled" },
] as const
type Tab = (typeof TABS)[number]["id"]

function Big({ n, label, sub, hot }: { n: number; label: string; sub?: string; hot?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-4", hot && "border-neon/40 bg-neon/[0.06]")}>
      <p className={cn("text-3xl font-semibold tracking-tight tabular-nums", hot && "neon-text")}>{fmtInt(n)}</p>
      <p className="mt-1 text-sm">{label}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  )
}

export default function Coverage() {
  const [cov, setCov] = useState<Cov | null | undefined>(undefined)
  const [tab, setTab] = useState<Tab>("index")
  const [q, setQ] = useState("")
  useEffect(() => {
    dataUrl("/data/coverage.json")
      .then((u) => fetch(u))
      .then((r) => (r.ok ? r.json() : null))
      .then(setCov)
      .catch(() => setCov(null))
  }, [])
  const rows = useMemo(() => {
    if (!cov) return []
    const w = q.toLowerCase().trim()
    const has = (s: string) => !w || s.toLowerCase().includes(w)
    if (tab === "index") return cov.index.filter((r) => !r.p && has(`${r.n} ${r.d || ""}`)).map((r) => ({ key: r.n, name: r.n, about: r.d, href: r.h }))
    if (tab === "pulled") return cov.pulled.filter(([r]) => has(r)).map(([r, n]) => ({ key: r, name: r, about: `${fmtInt(n)} parts`, href: `/libraries/${encodeURIComponent(r)}` }))
    return cov.github.filter((r) => r.s === tab && has(r.r)).map((r) => ({ key: r.r, name: r.r, about: `${r.f} registry file${r.f > 1 ? "s" : ""}`, href: `https://github.com/${r.r}` }))
  }, [cov, tab, q])

  if (cov === undefined) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!cov) return <p className="text-sm text-muted-foreground">This build has no coverage list yet; the next deploy writes it.</p>
  const c = cov.counts
  const counts: Record<Tab, number> = { index: c.index_missing, new: c.github_new, template: c.github_template, pulled: c.pulled }
  return (
    <div data-verify-coverage>
      <PageHeader
        title="Coverage"
        sub={`Every UI library we know of, and whether its parts are in the hub. Two lists: shadcn's own index of registries, and every GitHub repository holding a shadcn registry file. Counted ${cov.generated.replace("T", " at ")}.`}
      />
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Big n={c.pulled} label="Libraries pulled" sub={`${fmtInt(c.parts)} parts held`} />
        <Big n={c.index_missing} label="In shadcn's index, not pulled" sub={`of ${fmtInt(c.index)} listed there`} hot />
        <Big n={c.github_new} label="On GitHub, not pulled" sub={`of ${fmtInt(c.github)} repositories with a registry`} hot />
        <Big n={c.github_held} label="On GitHub, already held" sub={`and ${fmtInt(c.github_template)} templates or tests set apart`} />
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5" role="tablist">
          {TABS.map((t) => (
            <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className="siso-chip inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px]" data-on={tab === t.id || undefined}>
              {t.label}
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{fmtInt(counts[t.id])}</span>
            </button>
          ))}
        </div>
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter…" className="h-8 w-48 text-xs sm:ml-auto" aria-label="Filter libraries" />
      </div>
      <ul className="divide-y rounded-2xl border" data-verify-coverage-list={rows.length}>
        {rows.slice(0, 600).map((r) => {
          const out = /^https?:/.test(r.href || "")
          return (
            <li key={r.key} className="flex items-center gap-3 px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{r.name}</p>
                {r.about && <p className="truncate text-xs text-muted-foreground">{r.about}</p>}
              </div>
              {r.href && (
                <a href={r.href} target={out ? "_blank" : undefined} rel={out ? "noreferrer" : undefined} className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                  {out ? "Open" : "See parts"} {out && <ExternalLink className="size-3" />}
                </a>
              )}
            </li>
          )
        })}
        {rows.length > 600 && <li className="px-4 py-3 text-xs text-muted-foreground">And {fmtInt(rows.length - 600)} more: filter to find one.</li>}
        {!rows.length && <li className="px-4 py-6 text-center text-sm text-muted-foreground">Nothing here.</li>}
      </ul>
    </div>
  )
}
