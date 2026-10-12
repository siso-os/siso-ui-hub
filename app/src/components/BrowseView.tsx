// uihub: siso:browse-view
import { useMemo, useState, type ReactNode } from "react"
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

const STATUS_CHIPS: { key: string; label: string; test: (r: Row) => boolean }[] = [
  { key: "all", label: "All", test: () => true },
  { key: "curated", label: "His picks", test: (r) => r.st === "curated" },
  { key: "picked", label: "Picked", test: (r) => r.st === "picked" },
  { key: "ours", label: "Ours", test: (r) => r.st === "ours" },
  { key: "rated", label: "Rated", test: (r) => r.st === "rated" },
  { key: "reviewed", label: "Reviewed", test: (r) => r.st === "reviewed" },
  { key: "indexed", label: "Unreviewed", test: (r) => r.st === "indexed" },
]

/** 21st's browse: title + count, filter row (kind tabs, status chips, source, sort), grid. Filters live in the URL. */
// ordered: base already comes in its best order (a Build slot: its own kind first), which "Best first" keeps
export function BrowseView({ title, sub, base, hideKinds, actions, ordered }: { title: string; sub?: ReactNode; base: Row[]; hideKinds?: boolean; actions?: ReactNode; ordered?: boolean }) {
  const idx = useIndex()
  const [sp, setSp] = useSearchParams()
  // long chip rows (a slot spans many categories: 100+ types) show the biggest first, the rest behind "more"
  const [allChips, setAllChips] = useState(false)
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
    return [...m.entries()].filter(([w, n]) => n > 2 && w !== "minimal" && w !== "clean").sort((a, b) => b[1] - a[1]).slice(0, 12)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const looks = useMemo(() => facet("looks"), [textRows, showCopies, showDemos])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fits = useMemo(() => facet("fits"), [textRows, showCopies, showDemos])
  const typed = useMemo(() => textRows.reduce((n, r) => n + (r.ty ? 1 : 0), 0), [textRows])

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

  const CHIPS = 14
  const clip = (list: [string, number][], on: string) => (allChips || list.length <= CHIPS + 2 ? list : list.slice(0, CHIPS).concat(list.slice(CHIPS).filter(([id]) => id === on)))
  const more = (list: [string, number][]) =>
    list.length > CHIPS + 2 && (
      <button onClick={() => setAllChips((v) => !v)} className="inline-flex h-7 items-center rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground" data-verify-more-chips>
        {allChips ? "fewer" : `${(list.length - CHIPS).toLocaleString("en-GB")} more`}
      </button>
    )
  return (
    <div>
      <PageHeader title={title} count={rows.length} sub={sub}>
        {actions}
      </PageHeader>

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

      {subs.length > 1 && patterns.length <= 1 && (
        <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label="Subcategories" data-verify-subs>
          {[["all", showCopies ? textRows.length : textRows.length - copyCount] as [string, number], ...clip(subs, subcat)].map(([id, n]) => (
            <button key={id} onClick={() => upd("sub", id)} aria-pressed={subcat === id} className="siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs" data-on={subcat === id || undefined}>
              {id === "all" ? "All kinds" : id}
              <span className="text-muted-foreground tabular-nums">{n.toLocaleString("en-GB")}</span>
            </button>
          ))}
          {more(subs)}
        </div>
      )}

      {patterns.length > 1 && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Types" data-verify-types={patterns.length}>
          <span className="mr-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase" title={`${typed.toLocaleString("en-GB")} of these have been read and typed`}>Types</span>
          {[["all", 0] as [string, number], ...clip(patterns, pattern)].map(([id, n]) => (
            <button key={id} onClick={() => upd("type", id)} aria-pressed={pattern === id} className="siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs" data-on={pattern === id || undefined}>
              {id === "all" ? "Every type" : id}
              {n > 0 && <span className="text-muted-foreground tabular-nums">{n.toLocaleString("en-GB")}</span>}
            </button>
          ))}
          {more(patterns)}
        </div>
      )}

      {(looks.length > 1 || fits.length > 1) && (
        <div className="mb-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Look and fit" data-verify-facets>
          {(
            [
              ["look", "Look", looks, look],
              ["fit", "Fits", fits, fit],
            ] as const
          ).map(([key, label, list, on]) =>
            list.length > 1 ? (
              <span key={key} className="mr-3 inline-flex flex-wrap items-center gap-1.5">
                <span className="mr-1 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{label}</span>
                {list.map(([w, n]) => (
                  <button key={w} onClick={() => upd(key, on === w ? "all" : w)} aria-pressed={on === w} className="siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs" data-on={on === w || undefined}>
                    {w}
                    <span className="text-muted-foreground tabular-nums">{n.toLocaleString("en-GB")}</span>
                  </button>
                ))}
              </span>
            ) : null,
          )}
        </div>
      )}

      {demoCount > 0 && (
        <button onClick={() => upd("demos", showDemos ? "" : "show", "")} className="mb-3 mr-4 inline-block text-xs text-muted-foreground hover:text-foreground" data-verify-demos={demoCount}>
          {showDemos ? `Showing ${demoCount.toLocaleString("en-GB")} demos and code snippets · hide` : `${demoCount.toLocaleString("en-GB")} demos and code snippets hidden (a disabled input, a hook) · show`}
        </button>
      )}

      {copyCount > 0 && (
        <button onClick={() => upd("copies", showCopies ? "" : "show", "")} className="mb-3 inline-block text-xs text-muted-foreground hover:text-foreground" data-verify-copies={copyCount}>
          {(() => {
            const what = `${copyCount.toLocaleString("en-GB")} ${nearCount ? "" : "exact "}${copyCount === 1 ? "copy" : "copies"} of other libraries' parts`
            const split = nearCount && nearCount < copyCount ? ` (${(copyCount - nearCount).toLocaleString("en-GB")} exact, ${nearCount.toLocaleString("en-GB")} nearly)` : nearCount ? " (nearly the same code)" : ""
            return showCopies ? `Showing ${what}${split} · hide` : `${what} hidden${split} · show`
          })()}
        </button>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_CHIPS.filter((c) => !(idx?.public && c.key === "curated")).map((c) => (
            <button
              key={c.key}
              onClick={() => upd("status", c.key)}
              aria-pressed={status === c.key}
              className={cn(
                "siso-chip h-7 rounded-full px-3 text-xs",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
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
