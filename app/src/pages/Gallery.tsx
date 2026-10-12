// uihub: siso:page-gallery
// /templates and /themes: 21st's top-nav galleries. Wide cards, a text filter and an author filter;
// his picks and bookmarks first, then A–Z.
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { X } from "lucide-react"
import { navRows, useIndex, type Row } from "@/lib/data"
import { isMarked, useBookmarks } from "@/lib/bookmarks"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ItemGrid, WIDE_GRID_CLS } from "@/components/ItemGrid"
import { PageHeader } from "@/components/bits"

const CONF = {
  templates: { label: "Templates", title: "Templates", category: "pages/templates", sub: "Full-page templates from 21st.dev. Open original previews on 21st. Local thumbnails appear where permitted." },
  themes: { label: "Themes", title: "Themes", category: "themes/shadcn", sub: "shadcn/ui themes from 21st.dev: tokens and previews. Each opens on 21st." },
} as const

export default function Gallery({ kind }: { kind: keyof typeof CONF }) {
  const conf = CONF[kind]
  const idx = useIndex()!
  const { items: marks } = useBookmarks()
  const [sp, setSp] = useSearchParams()
  const q = sp.get("q") || ""
  const author = sp.get("author") || "all"
  const upd = (k: string, v: string, dflt: string) => {
    const n = new URLSearchParams(sp)
    if (!v || v === dflt) n.delete(k)
    else n.set(k, v)
    setSp(n, { replace: true })
  }

  const base = useMemo(() => {
    const nav = idx.nav.flatMap((s) => s.items).find((i) => i.label === conf.label)
    return nav ? navRows(idx, nav) : idx.byCategory.get(conf.category) || []
  }, [idx, conf])

  const authors = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of base) if (r.a) m.set(r.a, (m.get(r.a) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  }, [base])

  const rows = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    const top = (r: Row) => (r.st === "curated" ? 2 : 0) + (isMarked(r, marks) ? 1 : 0)
    return base
      .filter((r) => (author === "all" || r.a === author) && words.every((w) => r._q.includes(w)))
      .sort((a, b) => top(b) - top(a) || a.t.localeCompare(b.t))
  }, [base, q, author, marks])

  return (
    <div data-verify-gallery={kind}>
      <PageHeader title={conf.title} count={rows.length} sub={conf.sub} />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Input value={q} onChange={(e) => upd("q", e.target.value, "")} placeholder={`Filter ${conf.label.toLowerCase()}…`} className="h-8 w-full pr-7 text-sm" aria-label="Filter by text" />
          {q && (
            <Button variant="ghost" size="icon" className="absolute top-0.5 right-0.5 size-7" onClick={() => upd("q", "", "")} aria-label="Clear filter">
              <X className="size-3.5" />
            </Button>
          )}
        </div>
        <Select value={author} onValueChange={(v) => upd("author", v, "all")}>
          <SelectTrigger size="sm" className="h-8 w-44 max-w-full text-xs" aria-label="Author">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-80">
            <SelectItem value="all">All authors ({authors.length})</SelectItem>
            {authors.map(([a, n]) => (
              <SelectItem key={a} value={a}>
                {a} <span className="text-muted-foreground tabular-nums">{n}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ItemGrid rows={rows} className={WIDE_GRID_CLS} />
    </div>
  )
}
