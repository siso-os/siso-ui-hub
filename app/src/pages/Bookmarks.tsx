// uihub: siso:page-bookmarks
// Saved. Shaan, 10 Oct: "my save should be organised by maybe category and show what they actually are with like you know
// them 3D like front pager thing which tells me everything I need to know about the data there". A 3D front panel sums
// it up (how many, what kinds, his ratings, the latest three); then the saves by group and category, or by rating.
import { useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import { isMarked, useBookmarks, type Mark } from "@/lib/bookmarks"
import { SIGNALS, catName, fmtNum, groupLabel, sortRows, useIndex, type Row } from "@/lib/data"
import { cn } from "@/lib/utils"
import { ItemCard } from "@/components/ItemCard"
import { GRID_CLS } from "@/components/ItemGrid"
import { PageHeader, SignalBadge } from "@/components/bits"

function NotedCard({ row, siteNote }: { row: Row; siteNote?: string }) {
  const note = siteNote || row.nt
  return (
    <ItemCard
      row={row}
      note={
        note ? (
          <p className="line-clamp-3 border-l-2 border-border pl-2 text-xs leading-relaxed text-muted-foreground italic" data-verify-note>
            “{note}”
          </p>
        ) : null
      }
    />
  )
}

/** the front panel: tilted in 3D, it follows the pointer; the numbers that say what is saved, the latest three behind */
function SavedFront({ rows, marks }: { rows: Row[]; marks: Record<string, Mark> }) {
  const [t, setT] = useState({ x: 0, y: 0 })
  const byGroup = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of rows) m.set(r.g || "other", (m.get(r.g || "other") || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [rows])
  const max = byGroup[0]?.[1] || 1
  const cats = new Set(rows.map((r) => r.c)).size
  const libs = new Set(rows.map((r) => r.s)).size
  const sigs = SIGNALS.map((s) => [s, rows.filter((r) => (marks[r.id]?.signal || r.sig) === s).length] as const).filter(([, n]) => n)
  const latest = useMemo(
    () => rows.filter((r) => r.p).sort((a, b) => ((marks[b.id]?.at || "") > (marks[a.id]?.at || "") ? 1 : -1)).slice(0, 3),
    [rows, marks],
  )
  const last = rows.reduce((m, r) => ((marks[r.id]?.at || "") > m ? marks[r.id]!.at! : m), "")
  return (
    <div
      className="mb-10 [perspective:1400px]"
      onMouseMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect()
        setT({ x: (e.clientX - b.left) / b.width - 0.5, y: (e.clientY - b.top) / b.height - 0.5 })
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      data-verify-saved-front
    >
      <div
        className="relative mx-auto max-w-[1000px] rounded-[22px] border bg-card/90 p-6 shadow-lift transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:!transform-none md:p-8"
        style={{ transform: `rotateX(${7 - t.y * 8}deg) rotateY(${-9 + t.x * 12}deg)` }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(120%_80%_at_0%_0%,color-mix(in_srgb,#3b82f6_14%,transparent),transparent_60%)]" />
        <div className="relative grid gap-8 [transform-style:preserve-3d] md:grid-cols-[1fr_1.15fr]">
          <div style={{ transform: "translateZ(48px)" }}>
            <div className="text-sm text-muted-foreground">Saved</div>
            <div className="text-6xl font-semibold tracking-tight tabular-nums">{fmtNum(rows.length)}</div>
            <p className="mt-1 text-sm text-muted-foreground">
              across {cats} {cats === 1 ? "category" : "categories"} from {libs} {libs === 1 ? "library" : "libraries"}{last ? `, the last on ${last.slice(0, 10)}` : ""}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {sigs.map(([s, n]) => (
                <a key={s} href={`#sig-${s}`} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                  <SignalBadge signal={s} /> <span className="tabular-nums">{n}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-2" style={{ transform: "translateZ(26px)" }}>
            {byGroup.slice(0, 8).map(([g, n]) => (
              <a key={g} href={`#g-${g}`} className="grid grid-cols-[120px_1fr_40px] items-center gap-2 text-xs hover:text-foreground">
                <span className="truncate text-foreground/80">{groupLabel(g)}</span>
                <span className="h-2 overflow-hidden rounded-full bg-foreground/[0.06]">
                  <span className="block h-full rounded-full bg-[image:var(--siso-gradient-brand)]" style={{ width: `${Math.max(4, (n / max) * 100)}%` }} />
                </span>
                <span className="text-right text-muted-foreground tabular-nums">{n}</span>
              </a>
            ))}
          </div>
        </div>
        {latest.length > 0 && (
          <div className="pointer-events-none absolute -top-8 right-10 hidden h-28 w-72 [transform-style:preserve-3d] lg:block" style={{ transform: "translateZ(-36px)" }}>
            {latest.map((r, i) => (
              <img
                key={r.id}
                src={r.p}
                alt=""
                className="absolute top-0 h-24 w-40 rounded-lg border object-cover object-top shadow-lift"
                style={{ right: i * 52, transform: `rotate(${(i - 1) * 6}deg) translateZ(${-i * 22}px)` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Bookmarks() {
  const idx = useIndex()!
  if (idx.public) return <Navigate to="/" replace />
  return <BookmarksInner />
}

function BookmarksInner() {
  const idx = useIndex()!
  const { items: marks, store } = useBookmarks()
  const [view, setView] = useState<"category" | "rating">("category")

  const saved = useMemo(() => idx.items.filter((r) => isMarked(r, marks)), [idx, marks])
  const byGroup = useMemo(() => {
    const m = new Map<string, Map<string, Row[]>>()
    for (const r of saved) {
      const g = r.g || "other", c = r.c || g
      if (!m.has(g)) m.set(g, new Map())
      const cm = m.get(g)!
      cm.set(c, [...(cm.get(c) || []), r])
    }
    return [...m.entries()]
      .map(([g, cm]) => [g, [...cm.entries()].map(([c, l]) => [c, sortRows(l, "best")] as const).sort((a, b) => b[1].length - a[1].length)] as const)
      .sort((a, b) => b[1].reduce((n, [, l]) => n + l.length, 0) - a[1].reduce((n, [, l]) => n + l.length, 0))
  }, [saved])
  const bySignal = useMemo(() => {
    const m = new Map<string, Row[]>()
    const none: Row[] = []
    for (const r of saved) {
      const s = marks[r.id]?.signal || r.sig
      if (s) m.set(s, [...(m.get(s) || []), r])
      else none.push(r)
    }
    return { m, none }
  }, [saved, marks])

  return (
    <div>
      <PageHeader
        title="Saved"
        count={saved.length}
        sub={store === "local" ? "Kept in this browser (no bookmarks API here)." : store === "api" ? "Shared with every agent through catalogue/bookmarks.json." : ""}
      />
      <SavedFront rows={saved} marks={marks} />
      <div className="mb-6 flex gap-1" role="tablist">
        {(["category", "rating"] as const).map((v) => (
          <button key={v} role="tab" aria-selected={view === v} onClick={() => setView(v)} className={cn("siso-chip h-7 rounded-md px-3 text-[12.5px] capitalize", view === v && "text-foreground")}>
            By {v}
          </button>
        ))}
      </div>
      {view === "category" ? (
        <div className="space-y-12">
          {byGroup.map(([g, cats]) => (
            <section key={g} id={`g-${g}`} className="scroll-mt-20 space-y-6" data-verify-saved-group={g}>
              <h2 className="text-xl font-semibold tracking-tight">
                {groupLabel(g)} <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{cats.reduce((n, [, l]) => n + l.length, 0)}</span>
              </h2>
              {cats.map(([c, rows]) => (
                <div key={c} className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {catName(idx, c)} <span className="tabular-nums">· {rows.length}</span>
                  </h3>
                  <div className={GRID_CLS}>
                    {rows.map((r) => (
                      <NotedCard key={r.id} row={r} siteNote={marks[r.id]?.note} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
          {!saved.length && <p className="rounded-[14px] border border-dashed p-8 text-center text-sm text-muted-foreground">Nothing saved yet. Use the bookmark on any card.</p>}
        </div>
      ) : (
        <div className="space-y-10">
          {SIGNALS.map((s) => {
            const rows = bySignal.m.get(s)
            if (!rows?.length) return null
            return (
              <section key={s} id={`sig-${s}`} className="scroll-mt-20 space-y-4" data-verify-signal={s}>
                <div className="flex items-center gap-2">
                  <SignalBadge signal={s} className="h-6 px-2 text-xs" />
                  <span className="text-sm text-muted-foreground tabular-nums">{rows.length}</span>
                </div>
                <div className={GRID_CLS}>
                  {sortRows(rows, "best").map((r) => (
                    <NotedCard key={r.id} row={r} siteNote={marks[r.id]?.note} />
                  ))}
                </div>
              </section>
            )
          })}
          {bySignal.none.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg font-semibold tracking-tight">
                Not rated <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{bySignal.none.length}</span>
              </h2>
              <div className={GRID_CLS}>
                {bySignal.none.map((r) => (
                  <NotedCard key={r.id} row={r} siteNote={marks[r.id]?.note} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
