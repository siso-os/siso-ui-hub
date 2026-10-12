// uihub: siso:page-shells
import { useMemo, useState } from "react"
import { ResourceCard } from "./Discover"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { itemHref, sortRows, useIndex, useItem, type Row } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ItemGrid } from "@/components/ItemGrid"
import { KindIcon, PageHeader, SourceBadge, StatusDot, useInView } from "@/components/bits"

/** A live, scaled-down iframe of a siso-shell family example, loaded when near the screen. */
function ShellCard({ row }: { row: Row }) {
  const [ref, seen] = useInView<HTMLDivElement>("200px")
  const full = useItem(row.id, seen)
  const live = full?.live || undefined
  return (
    <div ref={ref} className="siso-glow-card flex flex-col overflow-hidden" data-verify-shell={row.id}>
      <div className="relative aspect-[16/10] overflow-hidden border-b bg-muted/30">
        {seen && live ? (
          <iframe
            src={live}
            title={row.t}
            loading="lazy"
            tabIndex={-1}
            sandbox="allow-scripts allow-same-origin"
            className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
            style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}
          />
        ) : (
          <div className="grid size-full place-items-center text-muted-foreground/50">
            <KindIcon kind={row.k} className="size-6" strokeWidth={1.5} />
          </div>
        )}
        <Link to={itemHref(row.id)} className="absolute inset-0" aria-label={`Open ${row.t}`} />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3 pt-2.5 pb-2">
        <Link to={itemHref(row.id)} className="line-clamp-2 text-sm font-medium hover:underline">
          {row.t}
        </Link>
        {row.d && <p className="line-clamp-2 text-xs text-muted-foreground">{row.d}</p>}
        <div className="mt-auto flex items-center gap-1.5 pt-1.5">
          <SourceBadge source={row.s} />
          <StatusDot status={row.st} withLabel />
          <span className="font-mono text-[11px] text-muted-foreground">{row.id.split(":")[1]}</span>
          {live && (
            <Button variant="ghost" size="icon" className="ml-auto size-7" asChild aria-label="Open live example">
              <a href={live} target="_blank" rel="noreferrer">
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Shells() {
  const idx = useIndex()!
  const { ours, others, research, templates } = useMemo(() => {
    const ours = idx.items.filter((r) => r.s === "siso-shell").sort((a, b) => (a.k === b.k ? a.id.localeCompare(b.id, undefined, { numeric: true }) : a.k === "shell" ? -1 : 1))
    const others = sortRows(
      idx.items.filter((r) => r.s !== "siso-shell" && !r.id.startsWith("21st-template:") && (r.k === "shell" || r.k === "page" || r.k === "layout")),
      "best",
    )
    const templates = idx.items.filter((r) => r.id.startsWith("21st-template:")).length
    const research = sortRows(idx.items.filter((r) => r.s === "research" && r.c === "discover/shells"), "best")
    return { ours, others, research, templates }
  }, [idx])
  const [n, setN] = useState(24)

  return (
    <div className="space-y-12">
      <PageHeader title="Shells & pages" count={ours.length + others.length + research.length} sub="siso-shell's families, live; the dashboards, layouts and page templates from the corpus; then the open-source shells RESEARCH found." />
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          siso-shell families <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{ours.length}</span>
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ours.map((r) => (
            <ShellCard key={r.id} row={r} />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Dashboards, layouts and pages <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{others.length}</span>
        </h2>
        {templates > 0 && (
          <p className="text-sm" data-verify-templates-link>
            <Link to="/templates" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              {templates.toLocaleString("en-GB")} templates from 21st →
            </Link>
          </p>
        )}
        <ItemGrid rows={others} />
      </section>
      <section className="space-y-4" data-verify-research-shells={research.length}>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Open-source shells and templates <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{research.length}</span>
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">Found by RESEARCH. Each links out; check the licence before taking anything.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {research.slice(0, n).map((r) => (
            <ResourceCard key={r.id} row={r} />
          ))}
        </div>
        {n < research.length && (
          <Button variant="outline" size="sm" onClick={() => setN(n + 48)}>
            Show more ({research.length - n} left)
          </Button>
        )}
      </section>
    </div>
  )
}
