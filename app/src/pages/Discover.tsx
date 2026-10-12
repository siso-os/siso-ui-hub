// uihub: siso:page-discover
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { itemHref, sortRows, useIndex, useItem, useMeta, type Row } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageHeader, useInView } from "@/components/bits"

const AREAS = ["21st-libraries", "awards", "3d-motion", "assets", "videos", "image-gen", "people", "shells", "components"]
const STEP = 24

export function ResourceCard({ row }: { row: Row }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  const full = useItem(row.id, seen)
  const url = full?.url
  return (
    <div ref={ref} className="siso-glow-card group relative flex flex-col gap-2 overflow-hidden p-4" data-verify-resource={row.id}>
      {row.p && (
        <div className="-mx-4 -mt-4 mb-1 aspect-[1.9/1] overflow-hidden border-b bg-muted/40">
          <img src={row.p} alt="" loading="lazy" decoding="async" className="size-full object-cover" data-verify-resource-image />
        </div>
      )}
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          {url ? (
            <a href={url} target="_blank" rel="noreferrer" className="font-medium after:absolute after:inset-0">
              {row.t}
            </a>
          ) : (
            <Link to={itemHref(row.id)} className="font-medium after:absolute after:inset-0">
              {row.t}
            </Link>
          )}
          {row.a && <div className="truncate text-xs text-muted-foreground">{row.a}</div>}
        </div>
        <ExternalLink className="size-3.5 shrink-0 text-muted-foreground/50 group-hover:text-foreground" />
      </div>
      {row.d && <p className="line-clamp-3 text-sm text-muted-foreground">{row.d}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1">
        {full?.stars ? <span className="text-[11px] text-muted-foreground tabular-nums">★ {String(full.stars)}</span> : null}
        {full?.res_kind && <Badge variant="secondary" className="h-5 rounded-md px-1.5 text-[10px] font-normal">{full.res_kind}</Badge>}
        {full?.licence && <Badge variant="outline" className="h-5 max-w-[60%] truncate rounded-md px-1.5 text-[10px] font-normal text-muted-foreground">{full.licence}</Badge>}
        {url && <span className="ml-auto truncate text-[11px] text-muted-foreground">{url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]}</span>}
      </div>
    </div>
  )
}

function AreaSection({ area, rows }: { area: string; rows: Row[] }) {
  const [n, setN] = useState(STEP)
  return (
    <section id={area} className="scroll-mt-20 space-y-4">
      <h2 className="text-lg font-semibold tracking-tight capitalize">
        {area.replace("-", " ")} <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{rows.length}</span>
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {rows.slice(0, n).map((r) => (
          <ResourceCard key={r.id} row={r} />
        ))}
      </div>
      {n < rows.length && (
        <Button variant="outline" size="sm" onClick={() => setN(n + STEP * 2)}>
          Show more ({rows.length - n} left)
        </Button>
      )}
    </section>
  )
}

export default function Discover() {
  const idx = useIndex()!
  const meta = useMeta()
  const [area, setArea] = useState<string>("all")
  const byArea = useMemo(() => {
    const m = new Map<string, Row[]>()
    for (const r of idx.items) {
      if (r.k !== "resource") continue
      const a = (r.c || "discover/other").split("/")[1] || "other"
      const l = m.get(a) || []
      l.push(r)
      m.set(a, l)
    }
    for (const [k, l] of m) m.set(k, sortRows(l, "best"))
    return m
  }, [idx])
  const areas = [...AREAS.filter((a) => byArea.has(a)), ...[...byArea.keys()].filter((a) => !AREAS.includes(a))]
  const total = [...byArea.values()].reduce((a, l) => a + l.length, 0)
  const open = (meta?.frontier || []).filter((f) => f.status === "open").sort((a, b) => b.rank - a.rank)

  return (
    <div className="space-y-10">
      <PageHeader title="Discover" count={total} sub="RESEARCH's map of sites, assets, videos, people and libraries, by area. Each card links out." />
      <div className="-mt-4 flex flex-wrap gap-1.5">
        {["all", ...areas].map((a) => (
          <button
            key={a}
            onClick={() => setArea(a)}
            aria-pressed={area === a}
            className={cn("h-7 rounded-full border px-3 text-xs capitalize transition-colors", area === a ? "border-foreground/40 bg-accent text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {a.replace("-", " ")} <span className="tabular-nums">{a === "all" ? total : byArea.get(a)?.length}</span>
          </button>
        ))}
      </div>
      {areas
        .filter((a) => area === "all" || a === area)
        .map((a) => (
          <AreaSection key={a} area={a} rows={byArea.get(a) || []} />
        ))}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          The open frontier <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{open.length}</span>
        </h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-muted/30 text-left text-xs text-muted-foreground">
              <tr>
                <th className="w-12 px-3 py-2 font-medium">Rank</th>
                <th className="w-28 px-3 py-2 font-medium">Area</th>
                <th className="px-3 py-2 font-medium">Lead</th>
                <th className="px-3 py-2 font-medium">Why</th>
              </tr>
            </thead>
            <tbody>
              {open.map((f, i) => (
                <tr key={i} className="border-t align-top">
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{f.rank}</td>
                  <td className="px-3 py-2 text-muted-foreground">{f.area}</td>
                  <td className="max-w-[360px] px-3 py-2 break-words">
                    {f.lead.startsWith("http") ? (
                      <a href={f.lead} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
                        {f.lead.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ) : (
                      f.lead
                    )}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{f.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
