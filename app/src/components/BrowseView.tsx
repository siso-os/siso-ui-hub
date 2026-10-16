// uihub: siso:browse-view
import { useMemo, type ReactNode } from "react"
import { useSearchParams } from "react-router-dom"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { sortRows, useIndex, type Row, type SortKey } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ICON_GRID_CLS, ItemGrid, WIDE_GRID_CLS } from "./ItemGrid"
import { ICON_CATS, isDrawn, isWide } from "./ItemCard"
import { PageHeader } from "./bits"
import { FacetMenu } from "./FacetMenu"

const STATUS_CHIPS: { key: string; label: string; test: (r: Row) => boolean }[] = [
  { key: "all", label: "All", test: () => true },
  { key: "curated", label: "His picks", test: (r) => r.st === "curated" },
  { key: "picked", label: "Picked", test: (r) => r.st === "picked" },
  { key: "ours", label: "Ours", test: (r) => r.st === "ours" },
  { key: "rated", label: "Rated", test: (r) => r.st === "rated" },
  { key: "reviewed", label: "Reviewed", test: (r) => r.st === "reviewed" },
  { key: "indexed", label: "Unreviewed", test: (r) => r.st === "indexed" },
]

/** 21st's browse: title + count, kind tabs, one toolbar (each filter a menu, then text, source, sort), grid. Filters
 *  live in the URL. The filters were rows of chips that pushed the parts off the first screen (Shaan, 15 Oct: "fix the
 *  bare pills at the tops of pages"); each is one button now, and the parts start on the first screen. */
// ordered: base already comes in its best order (a Build slot: its own kind first), which "Best first" keeps
// extra sits under the header (a node's About); tabs replace the kind tabs (a node's variations)
export function BrowseView({ title, sub, base, hideKinds, actions, ordered, extra, tabs }: { title: string; sub?: ReactNode; base: Row[]; hideKinds?: boolean; actions?: ReactNode; ordered?: boolean; extra?: ReactNode; tabs?: ReactNode }) {
  const idx = useIndex()
  const [sp, setSp] = useSearchParams()
  const kind = sp.get("kind") || "all"
  const status = sp.get("status") || "all"
  const source = sp.get("source") || "all"
  const sort = (sp.get("sort") as SortKey) || "best"
  const q = sp.get("q") || ""

  const upd = (k: string, v: string, dflt = "all") => {
    const n = new URLSearchParams(sp)
    if (!v || v === dflt) n.delete(k)
    else n.set(k, v)
    setSp(n, { replace: true })
  }

  const textRows = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    return words.length ? base.filter((r) => words.every((w) => r._q.includes(w))) : base
  }, [base, q])

  const kindCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of textRows) m.set(r.k, (m.get(r.k) || 0) + 1)
    return m
  }, [textRows])

  const sources = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of base) m.set(r.s, (m.get(r.s) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [base])

  // exact copies of another library's part (bin/dupes) stay out unless asked for: the original stands for them
  const showCopies = sp.get("copies") === "show"
  // a crowded category's finer places (Shaan, 10 Oct: "maybe they should be broken up and subcategories more")
  const subcat = sp.get("sub") || "all"
  const subs = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of textRows) if (r.sb && (showCopies || !r.cp)) m.set(r.sb, (m.get(r.sb) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [textRows, showCopies])

  // the kinds within a category, from each part's reader (the bank's types/: "tier cards with billing toggle"), and the
  // demos (a state of a basic part, "a disabled input") left out unless asked for (Shaan, 11 Oct: "a more detailed spec")
  const pattern = sp.get("type") || "all"
  const showDemos = sp.get("demos") === "show"
  // demos (a state of a basic part) and code (hooks, utilities: level logic) are for agents, not for browsing (11 Oct)
  const tucked = (r: Row) => r.lvl === "demo" || r.lvl === "logic"
  // how it looks and which industry it suits (the reader's look and fits), as filters on the page (11 Oct: first principles)
  const look = sp.get("look") || "all"
  const fit = sp.get("fit") || "all"
  const patterns = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of textRows) if (r.pat && (showCopies || !r.cp) && (showDemos || !tucked(r))) m.set(r.pat, (m.get(r.pat) || 0) + 1)
    return [...m.entries()].filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1])
  }, [textRows, showCopies, showDemos])
  const demoCount = useMemo(() => textRows.reduce((n, r) => n + (tucked(r) && (showCopies || !r.cp) ? 1 : 0), 0), [textRows, showCopies])
  const facet = (key: "looks" | "fits") => {
    const m = new Map<string, number>()
    for (const r of textRows) if ((showCopies || !r.cp) && (showDemos || !tucked(r))) for (const w of r[key] || []) m.set(w, (m.get(w) || 0) + 1)
    return [...m.entries()].filter(([w, n]) => n > 2 && w !== "minimal" && w !== "clean").sort((a, b) => b[1] - a[1])
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const looks = useMemo(() => facet("looks"), [textRows, showCopies, showDemos])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fits = useMemo(() => facet("fits"), [textRows, showCopies, showDemos])

  const copyCount = useMemo(() => textRows.reduce((n, r) => n + (r.cp ? 1 : 0), 0), [textRows])
  const nearCount = useMemo(() => textRows.reduce((n, r) => n + (r.cp === 2 ? 1 : 0), 0), [textRows])
  const rows = useMemo(() => {
    const chip = STATUS_CHIPS.find((c) => c.key === status) || STATUS_CHIPS[0]
    const out = textRows.filter(
      (r) =>
        (showCopies || !r.cp) && (showDemos || !tucked(r)) && (kind === "all" || r.k === kind) && (source === "all" || r.s === source) &&
        (subcat === "all" || r.sb === subcat) && (pattern === "all" || r.pat === pattern) && (look === "all" || !!r.looks?.includes(look)) && (fit === "all" || !!r.fits?.includes(fit)) && chip.test(r),
    )
    return ordered && sort === "best" ? out : sortRows(out, sort)
  }, [textRows, kind, source, status, sort, subcat, showCopies, showDemos, pattern, look, fit, ordered])

  const kinds = (idx?.kinds || []).filter((k) => kindCounts.get(k))
  // each status with how many of these carry it (the other filters held), so an empty one is not offered
  const statuses = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of textRows) if ((showCopies || !r.cp) && (showDemos || !tucked(r))) m.set(r.st, (m.get(r.st) || 0) + 1)
    return STATUS_CHIPS.filter((c) => c.key !== "all" && !(idx?.public && c.key === "curated") && (m.get(c.key) || c.key === status)).map((c) => [c.key, m.get(c.key) || 0, c.label] as [string, number, string])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textRows, showCopies, showDemos, status, idx?.public])
  const shown = showCopies ? textRows.length : textRows.length - copyCount

  return (
    <div>
      <PageHeader title={title} count={rows.length} sub={sub}>
        {actions}
      </PageHeader>
      {extra}
      {tabs}

      {!hideKinds && kinds.length > 1 && (
        <div className="-mx-1 mb-3 flex gap-1 overflow-x-auto border-b px-1 pb-px" role="tablist" aria-label="Kinds">
          {[["all", textRows.length] as const, ...kinds.map((k) => [k, kindCounts.get(k) || 0] as const)].map(([k, n]) => (
            <button
              key={k}
              role="tab"
              aria-selected={kind === k}
              onClick={() => upd("kind", k)}
              className={cn(
                "siso-tab -mb-px shrink-0 px-2.5 py-2 text-sm whitespace-nowrap transition-colors",
                kind === k ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {k === "all" ? "All" : idx?.kind_labels[k] || k}
              <span className="ml-1.5 text-xs text-muted-foreground tabular-nums">{n.toLocaleString("en-GB")}</span>
            </button>
          ))}
        </div>
      )}

      <div className="mb-2 flex flex-wrap items-center gap-2" data-verify-toolbar>
        {subs.length > 1 && patterns.length <= 1 && <FacetMenu label="Kind" all="All kinds" items={subs} value={subcat} onChange={(v) => upd("sub", v)} total={shown} />}
        {patterns.length > 1 && <FacetMenu label="Type" all="Every type" items={patterns} value={pattern} onChange={(v) => upd("type", v)} total={shown} />}
        {looks.length > 1 && <FacetMenu label="Look" all="Any look" items={looks} value={look} onChange={(v) => upd("look", v)} />}
        {fits.length > 1 && <FacetMenu label="Fits" all="Any industry" items={fits} value={fit} onChange={(v) => upd("fit", v)} />}
        {(statuses.length > 1 || status !== "all") && <FacetMenu label="Status" all="Any status" items={statuses} value={status} onChange={(v) => upd("status", v)} />}
        <div className="flex w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto">
          <div className="relative min-w-0 flex-1 sm:flex-none">
            <Input value={q} onChange={(e) => upd("q", e.target.value, "")} placeholder="Filter…" className="h-8 w-full pr-7 text-xs sm:w-40" aria-label="Filter by text" />
            {q && (
              <Button variant="ghost" size="icon" className="absolute top-0.5 right-0.5 size-7" onClick={() => upd("q", "", "")} aria-label="Clear filter">
                <X className="size-3.5" />
              </Button>
            )}
          </div>
          {sources.length > 1 && (
            <Select value={source} onValueChange={(v) => upd("source", v)}>
              <SelectTrigger size="sm" className="h-8 w-36 text-xs" aria-label="Source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                {sources.map(([s, n]) => (
                  <SelectItem key={s} value={s}>
                    {s} <span className="text-muted-foreground tabular-nums">{n}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <Select value={sort} onValueChange={(v) => upd("sort", v, "best")}>
            <SelectTrigger size="sm" className="h-8 w-32 text-xs" aria-label="Sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best">Best first</SelectItem>
              <SelectItem value="rated">Highest rated</SelectItem>
              <SelectItem value="uses">Most used</SelectItem>
              <SelectItem value="az">A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {(demoCount > 0 || copyCount > 0) && (
        <p className="mb-4 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-muted-foreground">
          {demoCount > 0 && (
            <button onClick={() => upd("demos", showDemos ? "" : "show", "")} className="hover:text-foreground" data-verify-demos={demoCount}>
              {showDemos ? `Showing ${demoCount.toLocaleString("en-GB")} demos and code snippets · hide` : `${demoCount.toLocaleString("en-GB")} demos and code snippets hidden · show`}
            </button>
          )}
          {copyCount > 0 && (
            <button onClick={() => upd("copies", showCopies ? "" : "show", "")} className="hover:text-foreground" data-verify-copies={copyCount}>
              {(() => {
                const what = `${copyCount.toLocaleString("en-GB")} ${nearCount ? "" : "exact "}${copyCount === 1 ? "copy" : "copies"} of other libraries' parts`
                const split = nearCount && nearCount < copyCount ? ` (${(copyCount - nearCount).toLocaleString("en-GB")} exact, ${nearCount.toLocaleString("en-GB")} nearly)` : nearCount ? " (nearly the same code)" : ""
                return showCopies ? `Showing ${what}${split} · hide` : `${what} hidden${split} · show`
              })()}
            </button>
          )}
        </p>
      )}
      {demoCount === 0 && copyCount === 0 && <div className="mb-3" />}

      <ItemGrid
        rows={rows}
        className={
          base.length && base.every(isWide)
            ? WIDE_GRID_CLS
            : base.length && base.filter((r) => ICON_CATS.has(r.c || "") || isDrawn(r)).length > base.length * 0.6
              ? ICON_GRID_CLS
              : undefined
        }
      />
    </div>
  )
}
