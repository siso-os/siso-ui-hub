// uihub: siso:page-papers
// White papers (Shaan, 12 Oct: "absorb all of its knowledge ... make a page which is called white papers with the links of
// all of this useful data"): what UI-PRINCIPLES built in siso-design-system, inside the hub. The papers SISO will publish,
// the measured findings worth knowing, and the research library by family with its strongest sources. Content:
// catalogue/schema/papers.json (drafted from papers/INDEX.md, research/CONSENSUS.md and research/library.json).
import { ArrowUpRight } from "lucide-react"
import { useKnowledge, useRules } from "@/lib/knowledge"
import { PageHeader } from "@/components/bits"

const STATUS: Record<string, string> = { proposed: "text-neon-ink", drafting: "text-amber-500", published: "text-emerald-500", backlog: "text-muted-foreground" }

export default function Papers() {
  const k = useKnowledge()
  const rules = useRules()
  const p = k?.papers
  const house = (rules || []).filter((r) => r.id.startsWith("hub-"))
  if (!k) return <p className="text-sm text-muted-foreground">Loading…</p>
  if (!p) return <p className="text-sm text-muted-foreground">No papers in this build yet (catalogue/schema/papers.json).</p>
  const sources = p.families.reduce((n, f) => n + f.sources.length, 0)
  return (
    <div className="space-y-10" data-verify-papers={p.papers.length}>
      <PageHeader title="White papers" count={p.papers.length} sub={p.intro} />

      {house.length > 0 && (
        // what we learned, in one screen: the 15 house rules every SISO page is checked against (principles/)
        <section data-verify-papers-house={house.length}>
          <h2 className="text-[18px] font-semibold">The house rules</h2>
          <p className="mb-2 text-sm text-muted-foreground">What we learned, in {house.length} lines. Each part's page shows the ones that apply to it, with the research rules under them.</p>
          <ol className="grid gap-x-8 gap-y-1.5 md:grid-cols-2">
            {house.map((r) => (
              <li key={r.id} className="flex gap-2 text-[13.5px]">
                <span className="w-16 shrink-0 font-mono text-[11px] leading-5 text-muted-foreground">{r.id}</span>
                {r.title}
              </li>
            ))}
          </ol>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-[18px] font-semibold">The papers</h2>
        <ul className="divide-y divide-border/60 rounded-xl border">
          {p.papers.map((x) => (
            <li key={x.id} className="grid gap-1 p-4 md:grid-cols-[72px_minmax(0,1fr)]" data-verify-paper={x.id}>
              <span className="font-mono text-[12px] text-muted-foreground">{x.id}</span>
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[15px] font-medium">{x.title}</span>
                  <span className={`text-[11px] font-medium ${STATUS[x.status] || "text-muted-foreground"}`}>{x.status}</span>
                </p>
                <p className="mt-1 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{x.abstract}</p>
                {(x.rules?.length || x.consensus?.length) && (
                  <p className="mt-1.5 font-mono text-[10.5px] text-muted-foreground/80">{[...(x.rules || []), ...(x.consensus || [])].join(" · ")}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[18px] font-semibold">What was measured</h2>
        <p className="mb-2 text-sm text-muted-foreground">Findings with a number behind them, from experiments and studies in the research library.</p>
        <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
          {p.findings.map((f, i) => (
            <li key={i} className="text-[13px]">
              <p className="font-medium">{f.title}</p>
              <p className="text-muted-foreground">
                {f.finding} <span className="font-mono text-[10.5px] text-muted-foreground/70">{[f.consensus, ...(f.rules || [])].filter(Boolean).join(" ")}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-[18px] font-semibold">The research library</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          {sources} of the strongest sources, by family. Every rule on a part's page cites these; the full library (about 2,000 sources and 3,600 quoted claims) lives in siso-design-system research/.
        </p>
        <div className="grid gap-8 lg:grid-cols-2">
          {p.families.map((f) => (
            <div key={f.id} data-verify-family={f.id}>
              <p className="text-[14px] font-medium">{f.name}</p>
              <p className="mb-2 text-[12.5px] text-muted-foreground">{f.about}</p>
              <ul className="space-y-1.5">
                {f.sources.map((s) => (
                  <li key={s.url} className="text-[12.5px]">
                    <a href={s.url} target="_blank" rel="noreferrer" className="group inline-flex items-baseline gap-1 font-medium hover:underline">
                      {s.title}
                      <ArrowUpRight className="size-3 shrink-0 self-center text-muted-foreground group-hover:text-foreground" />
                    </a>
                    <span className="text-muted-foreground">
                      {" "}
                      · {[s.org, s.year].filter(Boolean).join(", ")}
                      {s.why ? ` · ${s.why}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
