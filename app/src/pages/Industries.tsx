// uihub: siso:page-industries
import { Link, useParams } from "react-router-dom"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { catLink, itemHref, useIndex, useMeta, type Industry, type UiBlock } from "@/lib/data"
import { ItemCard } from "@/components/ItemCard"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageHeader } from "@/components/bits"

const nProcesses = (v: Industry) => (Array.isArray(v.processes) ? v.processes.length : v.processes || 0)

const FIT_TONE: Record<string, string> = { yes: "text-foreground", careful: "text-muted-foreground", no: "text-muted-foreground/50 line-through" }

export default function Industries() {
  const meta = useMeta()
  const idx = useIndex()!
  if (!meta) return <div className="h-40 animate-pulse rounded-lg bg-muted" />
  const industries = meta.industries || []
  const ix = meta.industry_index

  return (
    <div className="space-y-12">
      <PageHeader title="Industries" count={industries.length} sub={<span data-verify-industries-line>{industries.length} researched industries, each with the screens its work needs and the best components for them{meta.verticals.length ? "; then our verticals and what fits each surface" : ""}.</span>} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {industries.map((v) => (
          <Link key={v.id} to={`/industries/${encodeURIComponent(v.id)}`} className="siso-glow-card group flex flex-col gap-2 p-4" data-verify-industry={v.id}>
            <div className="flex items-start gap-2">
              <h3 className="flex-1 font-medium">{v.name}</h3>
              <ArrowRight className="mt-0.5 size-4 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
            </div>
            {v.summary && <p className="line-clamp-3 text-sm text-muted-foreground">{v.summary}</p>}
            <div className="mt-auto pt-1 text-xs text-muted-foreground">{nProcesses(v)} processes</div>
          </Link>
        ))}
        {ix && (
          <a href={ix.url} target="_blank" rel="noreferrer" className="group flex flex-col justify-between gap-3 rounded-[14px] border border-dashed p-4 transition-colors hover:border-neon/50" data-verify-industry-index>
            <div className="neon-text text-3xl font-semibold tracking-tight tabular-nums">{ix.count.toLocaleString("en-GB")}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex-1">industries indexed by {ix.by}</span>
              <ExternalLink className="size-3.5 text-muted-foreground group-hover:text-foreground" />
            </div>
          </a>
        )}
      </section>

      {meta.verticals.length > 0 && (
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Verticals</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {meta.verticals.map((v) => (
            <Card key={v.id} className="gap-3 shadow-none" data-verify-vertical={v.id}>
              <CardHeader>
                <CardTitle className="text-base">{v.name}</CardTitle>
                <CardDescription className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="font-normal">{v.surface}</Badge>
                  <Badge variant="secondary" className="font-normal">owner {v.owner}</Badge>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Projects: </span>
                  {v.projects.join(", ") || "none yet"}
                </div>
                <p className="text-xs text-muted-foreground">{v.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      )}

      {meta.fit.length > 0 && (
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">Surfaces and what fits each</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {meta.surfaces.map((s) => {
            const yes = meta.fit.filter((f) => (f as unknown as Record<string, string>)[s] === "yes")
            return (
              <Card key={s} className="gap-3 shadow-none">
                <CardHeader>
                  <CardTitle className="text-base capitalize">{s.replace("-", " ")}</CardTitle>
                  <CardDescription>{yes.length} of {meta.fit.length} fit</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {yes.map((f) => (
                      <li key={f.item} className="truncate">
                        {f.ids[0] && idx.byId.has(f.ids[0]) ? <Link to={itemHref(f.ids[0])} className="hover:underline">{f.item}</Link> : f.item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-muted/30 text-left text-xs text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Item</th>
                {meta.surfaces.map((s) => (
                  <th key={s} className="px-3 py-2 font-medium capitalize">{s.replace("-", " ")}</th>
                ))}
                <th className="px-3 py-2 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {meta.fit.map((f) => (
                <tr key={f.item} className="border-t align-top">
                  <td className="px-3 py-2 font-medium">{f.item}</td>
                  {meta.surfaces.map((s) => {
                    const v = (f as unknown as Record<string, string>)[s]
                    return <td key={s} className={cn("px-3 py-2", FIT_TONE[v])}>{v}</td>
                  })}
                  <td className="px-3 py-2 text-muted-foreground">{f.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      )}

    </div>
  )
}

function Screens({ blocks }: { blocks: UiBlock[] }) {
  const idx = useIndex()!
  return (
    <div className="space-y-6">
      {blocks.map((u) => {
        const rows = u.best.map((id) => idx.byId.get(id)).filter((r) => !!r)
        return (
          <div key={u.category} className="space-y-3" data-verify-screen={u.category}>
            <div className="flex items-baseline gap-2">
              <Link to={catLink(idx, u.category)} className="text-sm font-medium hover:underline">
                {u.label}
              </Link>
              <span className="text-xs text-muted-foreground">best {rows.length}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
              {rows.map((r) => (
                <ItemCard key={r.id} row={r} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/** a process name cut to about six words */
function shortProcess(name = ""): string {
  const w = name.split(/\s+/)
  return w.length > 6 ? w.slice(0, 6).join(" ").replace(/[,;:]$/, "") + "…" : name
}

export function IndustryPage() {
  const meta = useMeta()
  const idx = useIndex()!
  const id = decodeURIComponent(useParams().id || "")
  if (!meta) return <div className="h-40 animate-pulse rounded-lg bg-muted" />
  const v = meta.industries?.find((x) => x.id === id)
  if (!v)
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">No industry “{id}”</h1>
        <Link to="/industries" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">All industries</Link>
      </div>
    )
  const processes = Array.isArray(v.processes) ? v.processes : []
  const screens = v.screens || []
  return (
    <div className="mx-auto max-w-[1100px] space-y-10" data-verify-industry-page={v.id}>
      <header className="space-y-4">
        <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">{v.name}</h1>
        {v.summary && <p className="max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{v.summary}</p>}
        <div className="flex flex-wrap items-center gap-1.5">
          {(v.software || []).map((s) => (
            <Badge key={s} variant="secondary" className="font-normal">{s}</Badge>
          ))}
          {(v.modules || []).map((m) => (
            <a key={m} href={`https://github.com/${m}`} target="_blank" rel="noreferrer">
              <Badge variant="outline" className="gap-1 font-mono text-[11px] font-normal hover:border-foreground/40">
                {m} <ExternalLink className="size-2.5" />
              </Badge>
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {processes.length} processes{v.status ? ` · ${v.status.replace(/_/g, " ")}` : ""}{v.as_of ? ` · as of ${v.as_of}` : ""}
        </p>
      </header>

      {screens.length > 0 && (
        <section className="space-y-8" data-verify-screens>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Screens this industry needs</h2>
            <p className="mt-1 text-sm text-muted-foreground">Each screen once, most-needed first, with the best components we hold for it.</p>
          </div>
          {screens.map((sc) => {
            const rows = sc.best.map((id) => idx.byId.get(id)).filter((r) => !!r)
            return (
              <div key={sc.category} className="space-y-3 border-t pt-6" data-verify-screen={sc.category}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <Link to={catLink(idx, sc.category)} className="font-medium hover:underline">
                    {sc.label}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {sc.processes.length} of {processes.length} processes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sc.processes.map((pi) => (
                      <a key={pi} href={`#process-${pi + 1}`} className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground" title={processes[pi]?.name}>
                        <span className="font-mono">{pi + 1}</span> {shortProcess(processes[pi]?.name)}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-6 min-[480px]:grid-cols-2 lg:grid-cols-3">
                  {rows.map((r) => (
                    <ItemCard key={r.id} row={r} />
                  ))}
                </div>
              </div>
            )
          })}
        </section>
      )}

      {processes.length > 0 && (
        <section className="space-y-4 border-t pt-8" data-verify-processes>
          <h2 className="text-lg font-semibold tracking-tight">Processes</h2>
          <ol className="divide-y rounded-lg border">
            {processes.map((p, i) => (
              <li key={i} id={`process-${i + 1}`} className="flex scroll-mt-20 gap-3 p-4" data-verify-process>
                <span className="w-6 shrink-0 pt-0.5 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="text-sm font-medium">{p.name}</div>
                  {p.boundary && <p className="line-clamp-2 text-sm text-muted-foreground" title={p.boundary}>{p.boundary}</p>}
                  {p.ui?.length ? (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {p.ui.map((u) => (
                        <Link key={u.category} to={catLink(idx, u.category)}>
                          <Badge variant="secondary" className="font-normal hover:bg-accent">{u.label}</Badge>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {v.shell?.length ? (
        <section className="space-y-4 border-t pt-8" data-verify-industry-shell>
          <h2 className="text-lg font-semibold tracking-tight">Shell</h2>
          <p className="text-sm text-muted-foreground">The frame every screen above sits in.</p>
          <Screens blocks={v.shell} />
        </section>
      ) : null}
    </div>
  )
}
