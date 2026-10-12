// uihub: siso:page-compare
// Look-alikes side by side, rated. Shaan, 10 Oct: "which ones are duplicates and need to have my rating to tell you which
// ones are the same types I like more than the others". A type is one kind of part within a category ("spotlight card")
// made by two or more libraries; each card takes his rating (love to meh), or "This or that" walks the type two at a
// time and the one left standing is marked love.
import { useMemo, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { GitCompareArrows, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"
import { SIGNALS, catName, fmtNum, groupLabel, itemHref, useIndex, type Row, type Signal } from "@/lib/data"
import { setBookmark, useBookmarks } from "@/lib/bookmarks"
import { alikeGroups, type AlikeGroup } from "@/lib/alike"
import { ItemCard } from "@/components/ItemCard"
import { PageHeader } from "@/components/bits"

const RANK: Record<string, number> = { love: 5, star: 4, good: 3, maybe: 2, meh: 1 }

function Rate({ row, sig }: { row: Row; sig?: Signal }) {
  return (
    <div className="grid grid-cols-5 gap-1" role="group" aria-label={`Rate ${row.t}`}>
      {SIGNALS.map((s) => (
        <button
          key={s}
          onClick={() => setBookmark(row.id, true, { signal: s })}
          aria-pressed={sig === s}
          className={cn("siso-press h-7 rounded-md border text-[10.5px] capitalize", sig === s ? "border-neon/60 bg-neon/10 text-neon-ink" : "text-muted-foreground hover:text-foreground")}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

function Duel({ g, onDone }: { g: AlikeGroup; onDone: () => void }) {
  const order = useMemo(() => [...g.rows].sort((a, b) => Number(!!b.p) - Number(!!a.p) || b._r - a._r), [g])
  const [champ, setChamp] = useState(0)
  const [next, setNext] = useState(1)
  const done = next >= order.length
  const pick = (i: number) => {
    setChamp(i)
    setNext((n) => n + 1)
  }
  if (done)
    return (
      <div className="space-y-4 rounded-[18px] border p-6 text-center" data-verify-duel-done>
        <Trophy className="mx-auto size-6 text-neon-ink" />
        <p className="text-sm">
          <span className="font-medium">{order[champ].t}</span> from {order[champ].s} is left standing.
        </p>
        <div className="flex justify-center gap-2">
          <button className="siso-press h-8 rounded-md bg-primary px-3 text-sm text-primary-foreground" onClick={() => (setBookmark(order[champ].id, true, { signal: "love" }), onDone())}>
            Mark it love
          </button>
          <button className="siso-press h-8 rounded-md border px-3 text-sm" onClick={onDone}>
            Back to the grid
          </button>
        </div>
      </div>
    )
  const pair = [champ, next]
  return (
    <div className="space-y-3" data-verify-duel>
      <p className="text-sm text-muted-foreground">
        This or that: {next} of {order.length - 1}. Click the one you like more; it stays and meets the next.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {pair.map((i) => (
          <button key={order[i].id} onClick={() => pick(i)} className="group siso-glow-card overflow-hidden rounded-[16px] text-left">
            <div className="aspect-[4/3] bg-foreground/[0.03]">
              {order[i].p ? <img src={order[i].p} alt="" className={order[i].p!.endsWith(".svg") ? "size-full object-contain p-[18%]" : "size-full object-cover object-top"} /> : <div className="grid size-full place-items-center p-6 text-sm text-muted-foreground">{order[i].d || "No picture yet"}</div>}
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5">
              <span className="truncate text-sm font-medium">{order[i].t}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{order[i].s}</span>
            </div>
          </button>
        ))}
      </div>
      <button className="text-xs text-muted-foreground hover:text-foreground" onClick={onDone}>
        Stop and go back to the grid
      </button>
    </div>
  )
}

export default function Compare() {
  const idx = useIndex()!
  const { group, category } = useParams()
  const [sp, setSp] = useSearchParams()
  const { items: marks } = useBookmarks()
  const c = group && category ? `${group}/${category}` : null

  // every category's look-alike types (the landing), or one category's
  const all = useMemo(() => {
    if (c) return []
    return [...idx.byCategory.keys()]
      .map((cat) => ({ cat, groups: alikeGroups(idx, cat) }))
      .filter((x) => x.groups.length)
      .sort((a, b) => b.groups.length - a.groups.length)
  }, [idx, c])
  const groups = useMemo(() => (c ? alikeGroups(idx, c, sp.get("sub") || undefined) : []), [idx, c, sp])
  const [q, setQ] = useState("")
  const [duel, setDuel] = useState(false)
  const sel = groups.find((g) => g.key === sp.get("k")) || groups[0]
  const sigOf = (r: Row) => marks[r.id]?.signal || r.sig
  const rows = useMemo(
    () => (sel ? [...sel.rows].sort((a, b) => (RANK[sigOf(b) || ""] || 0) - (RANK[sigOf(a) || ""] || 0) || Number(!!b.p) - Number(!!a.p) || b._r - a._r) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sel, marks],
  )

  if (!c)
    return (
      <div data-verify-compare-home>
        <PageHeader title="Compare" count={all.reduce((n, x) => n + x.groups.length, 0)} sub="One kind of part from different libraries, side by side. Rate them, or pick between two at a time, so the hub learns which of each type you like." />
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {all.map(({ cat, groups: gs }) => (
            <Link key={cat} to={`/compare/${cat}`} className="siso-glow-card block rounded-[14px] p-4 hover:bg-foreground/[0.02]" data-verify-compare-cat={cat}>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-medium">{catName(idx, cat)}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{fmtNum(gs.length)} types</span>
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">{groupLabel(cat.split("/")[0])}</div>
              <p className="mt-2 line-clamp-2 text-[12.5px] text-muted-foreground">{gs.slice(0, 4).map((g) => `${g.name} (${g.libs})`).join(" · ")}</p>
            </Link>
          ))}
        </div>
      </div>
    )

  const shown = q ? groups.filter((g) => g.name.includes(q.toLowerCase())) : groups
  return (
    <div data-verify-compare={c}>
      <PageHeader
        title={`Compare ${catName(idx, c)}`}
        count={groups.length}
        sub={<>Types made by two or more libraries. <Link to="/compare" className="underline-offset-4 hover:underline">All categories</Link></>}
      />
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-2 lg:sticky lg:top-20 lg:h-[calc(100svh-7rem)] lg:overflow-y-auto">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a type…" className="h-8 w-full rounded-md border bg-transparent px-2.5 text-sm" />
          <ul className="space-y-0.5">
            {shown.slice(0, 300).map((g) => (
              <li key={g.key}>
                <button
                  onClick={() => (setDuel(false), setSp((p) => (p.set("k", g.key), p)))}
                  aria-current={g.key === sel?.key}
                  className={cn("flex w-full items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left text-[13px] capitalize hover:bg-foreground/[0.04]", g.key === sel?.key && "bg-foreground/[0.06] text-foreground")}
                >
                  <span className="truncate">{g.name}</span>
                  <span className="shrink-0 text-[11px] text-muted-foreground tabular-nums">
                    {g.libs} · {g.rows.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <section className="min-w-0 space-y-4">
          {sel ? (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold capitalize">
                  {sel.name} <span className="text-sm font-normal text-muted-foreground normal-case">· {sel.rows.length} versions from {sel.libs} libraries</span>
                </h2>
                {!idx.public && (
                  <button onClick={() => setDuel((d) => !d)} className="siso-press inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-sm" data-verify-duel-toggle>
                    <GitCompareArrows className="size-4" /> {duel ? "Back to the grid" : "This or that"}
                  </button>
                )}
              </div>
              {duel ? (
                <Duel key={sel.key} g={sel} onDone={() => setDuel(false)} />
              ) : (
                <div className="grid grid-cols-1 gap-x-5 gap-y-7 min-[520px]:grid-cols-2 xl:grid-cols-3">
                  {rows.slice(0, 120).map((r) => (
                    <ItemCard key={r.id} row={r} note={idx.public ? null : <Rate row={r} sig={sigOf(r)} />} />
                  ))}
                </div>
              )}
              {rows.length > 120 && !duel && (
                <p className="text-xs text-muted-foreground">
                  The first 120 of {fmtNum(rows.length)}. <Link to={itemHref(rows[0].id)}>Open one</Link> or narrow the category.
                </p>
              )}
            </>
          ) : (
            <p className="rounded-[14px] border border-dashed p-8 text-center text-sm text-muted-foreground">No type here is made by two libraries yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}
