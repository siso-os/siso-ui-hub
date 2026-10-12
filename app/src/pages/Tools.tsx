// uihub: siso:page-tools
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { itemHref, useIndex, useItem, type Row } from "@/lib/data"
import { CodeLine, KindIcon, PageHeader, SourceBadge } from "@/components/bits"

function ToolCard({ row }: { row: Row }) {
  const full = useItem(row.id)
  return (
    <div className="siso-glow-card flex flex-col gap-3 p-4" data-verify-tool={row.id}>
      <div className="flex items-start gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-md border bg-muted/40">
          <KindIcon kind={row.k} className="size-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <Link to={itemHref(row.id)} className="font-medium hover:underline">
            {row.t}
          </Link>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <SourceBadge source={row.s} />
            <span className="font-mono">{row.id}</span>
          </div>
        </div>
      </div>
      {row.d && <p className="text-sm text-muted-foreground">{row.d}</p>}
      {full?.install && <CodeLine text={full.install} className="mt-auto" />}
      {full?.where && <p className="text-xs text-muted-foreground">{full.where}</p>}
    </div>
  )
}

export default function Tools() {
  const idx = useIndex()!
  const rows = useMemo(() => idx.items.filter((r) => r.k === "tool"), [idx])
  return (
    <div>
      <PageHeader title="Tools" count={rows.length} sub="Tools that make UI: image generation, checks, pickers. Run them from the repo." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((r) => (
          <ToolCard key={r.id} row={r} />
        ))}
      </div>
    </div>
  )
}
