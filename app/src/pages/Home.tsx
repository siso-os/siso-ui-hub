// uihub: siso:page-home-board
import { useCallback, useMemo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { ResponsiveGridLayout, useContainerWidth, type Layout, type LayoutItem, type ResponsiveLayouts } from "react-grid-layout"
import { Check, ExternalLink, GripVertical, LayoutGrid, Plus, RotateCcw, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { catHref, catLabel, catLink, catName, fmtInt, itemHref, SIGNALS, useIndex, useMeta, type Index, type Meta, type Row } from "@/lib/data"
import { isMarked, useBookmarks, type Mark } from "@/lib/bookmarks"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { KindIcon } from "@/components/bits"
import { TypeCity } from "@/components/TypeCity"
import { StartHere } from "@/components/StartHere"

const BOARD_KEY = "uihub.board.v2"
type Saved = { layouts?: ResponsiveLayouts; hidden?: string[] }

interface Ctx { idx: Index; meta: Meta | null; marks: Record<string, Mark> }
interface Widget { id: string; title: string; hint: string; lg: Omit<LayoutItem, "i">; render: (c: Ctx) => ReactNode }

function Big({ n, children }: { n: number; children?: ReactNode }) {
  return (
    <div>
      <div className="neon-text text-4xl font-semibold tracking-tight tabular-nums" data-verify-stat={n}>
        {fmtInt(n)}
      </div>
      {children && <div className="mt-1 text-xs text-muted-foreground">{children}</div>}
    </div>
  )
}

function Bars({ rows, max, unit }: { rows: { key: string; label: ReactNode; n: number; to?: string; accent?: boolean }[]; max?: number; unit?: string }) {
  const m = max ?? Math.max(1, ...rows.map((r) => r.n))
  return (
    <ul className="space-y-1">
      {rows.map((r) => {
        const inner = (
          <>
            <span
              className={cn("absolute inset-y-0 left-0 rounded-[5px]", r.accent ? "bg-neon/20" : "bg-foreground/[0.07]")}
              style={{ width: `${Math.max(2, (r.n / m) * 100)}%` }}
            />
            <span className="relative min-w-0 flex-1 truncate">{r.label}</span>
            <span className={cn("relative tabular-nums", r.accent ? "neon-text" : "text-muted-foreground")}>
              {fmtInt(r.n)}
              {unit}
            </span>
          </>
        )
        const cls = "relative flex h-7 items-center gap-2 overflow-hidden rounded-[5px] px-2 text-[13px]"
        return (
          <li key={r.key}>
            {r.to ? (
              <Link to={r.to} className={cn(cls, "hover:bg-accent/50")}>
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function CoverageTable({ idx }: { idx: Index }) {
  const [all, setAll] = useState(false)
  const rows = idx.stats.coverage || []
  const shown = all ? rows : rows.slice(0, 20)
  return (
    <div data-verify-coverage={rows.length}>
      <table className="w-full text-[13px]">
        <thead className="text-left text-[11px] text-muted-foreground">
          <tr>
            <th className="pb-1.5 font-normal">Category</th>
            <th className="pb-1.5 text-right font-normal">Total</th>
            <th className="w-[34%] pb-1.5 pl-3 font-normal">Gone through</th>
            {!idx.public && <th className="pb-1.5 pl-2 text-right font-normal">His</th>}
            <th className="w-10 pb-1.5 pl-2 text-center font-normal">Pick</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((c) => {
            const pct = c.total ? c.gone / c.total : 0
            return (
              <tr key={c.category} className="border-t border-border/60">
                <td className="max-w-0 py-1 pr-2">
                  <Link to={catLink(idx, c.category)} className="block truncate hover:underline" title={`${c.section} · ${c.category}`}>
                    {c.label}
                  </Link>
                </td>
                <td className="py-1 text-right text-muted-foreground tabular-nums">{fmtInt(c.total)}</td>
                <td className="py-1 pl-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/[0.08]">
                      <div className="h-full rounded-full bg-foreground/45" style={{ width: `${Math.max(1, pct * 100)}%` }} />
                    </div>
                    <span className="w-8 text-right text-[11px] text-muted-foreground tabular-nums">{Math.round(pct * 100)}%</span>
                  </div>
                </td>
                {!idx.public && <td className={cn("py-1 text-right tabular-nums", c.curated ? "neon-text" : "text-muted-foreground/50")}>{c.curated}</td>}
                <td className="py-1 text-center">{c.picked > 0 ? <Check className="mx-auto size-3.5" aria-label="has a pick" /> : <span className="text-muted-foreground/30">·</span>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {rows.length > 20 && (
        <button onClick={() => setAll(!all)} className="mt-2 text-xs text-muted-foreground hover:text-foreground">
          {all ? "Show top 20" : `Show all ${rows.length}`}
        </button>
      )}
    </div>
  )
}


const WIDGETS: Widget[] = [
  {
    id: "total",
    title: "Total indexed",
    hint: "Everything the hub holds",
    lg: { x: 0, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
    render: ({ idx }) => (
      <div className="space-y-4">
        <Big n={idx.stats.total}>items across {fmtInt(idx.stats.categories)} categories and {fmtInt(idx.stats.authors)} authors</Big>
        <dl className="grid grid-cols-4 gap-2 text-xs">
          {[
            ["UI items", idx.stats.ui_items],
            ["Assets", idx.stats.assets ?? 0],
            ["Resources", idx.stats.resources],
            ["Live preview", idx.stats.with_live_preview],
          ].map(([l, n]) => (
            <div key={l as string}>
              <dt className="text-muted-foreground">{l}</dt>
              <dd className="mt-0.5 text-sm font-medium tabular-nums">{fmtInt(n as number)}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    id: "signals",
    title: "His picks by signal",
    hint: "The 138 curated picks",
    lg: { x: 9, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
    render: ({ idx }) => (
      <div className="space-y-3">
        <Big n={idx.stats.bookmarked}>bookmarked picks</Big>
        <Bars rows={SIGNALS.map((s) => ({ key: s, label: <span className="capitalize">{s}</span>, n: idx.stats.by_signal[s] || 0, to: `/bookmarks#${s}`, accent: s === "love" }))} />
      </div>
    ),
  },
  {
    id: "funnel",
    title: "The funnel",
    hint: "Indexed → reviewed → rated → picked → curated",
    lg: { x: 3, y: 0, w: 6, h: 6, minW: 3, minH: 4 },
    render: ({ idx }) => {
      const steps = (idx.public ? ["indexed", "reviewed", "rated", "picked"] : ["indexed", "reviewed", "rated", "picked", "curated"]) as string[]
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-8">
            <Big n={idx.stats.gone_through}>gone through</Big>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-muted-foreground tabular-nums">{fmtInt(idx.stats.left_in_corpus)}</div>
              <div className="mt-1 text-xs text-muted-foreground">left in corpus</div>
            </div>
          </div>
          <div className="flex items-stretch gap-1">
            {steps.map((s, i) => (
              <Link
                key={s}
                to={`/browse?status=${s}`}
                className="flex-1 rounded-md border px-2 py-1.5 transition-colors hover:border-foreground/30"
                style={{ opacity: 1 - (steps.length - 1 - i) * 0.08 }}
              >
                <div className="text-[11px] text-muted-foreground capitalize">{s}</div>
                <div className={cn("text-sm font-medium tabular-nums", s === "curated" && "neon-text")}>{fmtInt(idx.stats.by_status[s])}</div>
              </Link>
            ))}
          </div>
        </div>
      )
    },
  },
  {
    id: "kinds",
    title: "By kind",
    hint: "Components, sections, motion…",
    lg: { x: 0, y: 20, w: 4, h: 9, minW: 3, minH: 5 },
    render: ({ idx }) => (
      <Bars
        rows={Object.entries(idx.stats.by_kind)
          .sort((a, b) => b[1] - a[1])
          .map(([k, n]) => ({
            key: k,
            n,
            to: k === "resource" ? "/discover" : k === "asset" ? "/browse/assets" : `/browse?kind=${k}`,
            label: (
              <span className="flex items-center gap-2">
                <KindIcon kind={k} className="size-3.5 text-muted-foreground" />
                {idx.kind_labels[k] || k}
              </span>
            ),
          }))}
      />
    ),
  },
  {
    id: "sources",
    title: "By source",
    hint: "21st, the 11 libraries, siso, siso-shell, research",
    lg: { x: 4, y: 20, w: 4, h: 9, minW: 3, minH: 5 },
    render: ({ idx }) => (
      <Bars
        rows={Object.entries(idx.stats.by_source)
          .sort((a, b) => b[1] - a[1])
          .map(([s, n]) => ({ key: s, n, label: <span className="font-mono text-xs">{s}</span>, to: s === "research" ? "/discover" : `/browse?source=${s}` }))}
      />
    ),
  },
  {
    id: "categories",
    title: "Top categories",
    hint: "Largest categories in the corpus",
    lg: { x: 8, y: 20, w: 4, h: 9, minW: 3, minH: 5 },
    render: ({ idx }) => (
      <Bars
        rows={[...idx.byCategory.entries()]
          .filter(([c]) => !c.startsWith("discover/"))
          .map(([c, l]) => ({ c, n: l.length }))
          .sort((a, b) => b.n - a.n)
          .slice(0, 12)
          .map(({ c, n }) => ({ key: c, n, to: catHref(c), label: <span className="first-letter:uppercase">{catLabel(c)} <span className="text-muted-foreground">· {c.split("/")[0]}</span></span> }))}
      />
    ),
  },
  {
    id: "recent",
    title: "Recent bookmarks",
    hint: "Made on the site, then his loves",
    lg: { x: 0, y: 29, w: 6, h: 8, minW: 3, minH: 5 },
    render: ({ idx, marks }) => {
      const made = Object.entries(marks)
        .filter(([, m]) => !m.off && m.at)
        .sort((a, b) => (b[1].at! > a[1].at! ? 1 : -1))
        .map(([id]) => idx.byId.get(id))
        .filter(Boolean) as Row[]
      const seen = new Set(made.map((r) => r.id))
      const fill = idx.items.filter((r) => r.sig === "love" && r.p && !seen.has(r.id) && isMarked(r, marks))
      const rows = [...made, ...fill].slice(0, 12)
      return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {rows.map((r) => (
            <Link key={r.id} to={itemHref(r.id)} className="group space-y-1" title={r.t}>
              <div className="aspect-[4/3] overflow-hidden rounded-md border bg-muted/40">
                {r.p ? <img src={r.p} alt="" loading="lazy" className="size-full object-cover object-top" /> : <KindIcon kind={r.k} className="m-auto mt-[30%] size-4 text-muted-foreground" />}
              </div>
              <div className="truncate text-[11px] text-muted-foreground group-hover:text-foreground">{r.t}</div>
            </Link>
          ))}
        </div>
      )
    },
  },
  {
    id: "frontier",
    title: "RESEARCH's frontier",
    hint: "Open leads by area",
    lg: { x: 6, y: 29, w: 6, h: 9, minW: 3, minH: 5 },
    render: ({ idx, meta }) => {
      const open = (meta?.frontier || []).filter((f) => f.status === "open").sort((a, b) => b.rank - a.rank)
      return (
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <Big n={idx.stats.frontier_open} />
            <span className="text-xs text-muted-foreground">open leads</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(idx.stats.frontier_by_area)
              .sort((a, b) => b[1] - a[1])
              .map(([a, n]) => (
                <Link key={a} to={`/discover#${a}`} className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground">
                  {a} <span className="tabular-nums">{n}</span>
                </Link>
              ))}
          </div>
          <ul className="space-y-1.5">
            {open.slice(0, 8).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px]">
                <span className="mt-0.5 w-6 shrink-0 font-mono text-[10px] text-muted-foreground">r{f.rank}</span>
                <div className="min-w-0">
                  {f.lead.startsWith("http") ? (
                    <a href={f.lead} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 hover:underline">
                      <span className="truncate">{f.lead.replace(/^https?:\/\/(www\.)?/, "")}</span>
                      <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
                    </a>
                  ) : (
                    <span className="block truncate">{f.lead}</span>
                  )}
                  <div className="truncate text-xs text-muted-foreground">
                    {f.area} · {f.why}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    },
  },
  {
    id: "coverage",
    title: "Coverage by category",
    hint: "How far each category has been gone through, and his picks in it",
    lg: { x: 0, y: 6, w: 6, h: 13, minW: 4, minH: 6 },
    render: ({ idx }) => <CoverageTable idx={idx} />,
  },
  {
    id: "worth",
    title: "Worth a look",
    hint: "Rated well by the scout, not picked yet",
    lg: { x: 6, y: 6, w: 3, h: 13, minW: 2, minH: 6 },
    render: ({ idx }) => {
      const rows = (idx.stats.good_not_curated || []).map((id) => idx.byId.get(id)).filter((r) => !!r)
      return (
        <div className="grid grid-cols-2 gap-x-3 gap-y-3">
          {rows.map((r) => (
            <Link key={r.id} to={itemHref(r.id)} className="group min-w-0 space-y-1" title={r.t} data-verify-worth={r.id}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border bg-muted/40">
                {r.p ? <img src={r.p} alt="" loading="lazy" className="size-full object-cover object-top" /> : <KindIcon kind={r.k} className="m-auto mt-[30%] size-4 text-muted-foreground" />}
                {r.sc !== undefined && (
                  <span className="absolute right-1 bottom-1 rounded bg-background/85 px-1 font-mono text-[10px] tabular-nums backdrop-blur">
                    <span className="neon-text">{r.sc}</span>/25
                  </span>
                )}
              </div>
              <div className="truncate text-[11px] text-muted-foreground group-hover:text-foreground">{r.t}</div>
            </Link>
          ))}
        </div>
      )
    },
  },
  {
    id: "left",
    title: "Left to find",
    hint: "Categories with nothing picked yet; RESEARCH's open frontier",
    lg: { x: 9, y: 6, w: 3, h: 13, minW: 2, minH: 6 },
    render: ({ idx }) => {
      const cats = idx.stats.left_to_find || []
      return (
        <div className="space-y-4">
          <Big n={cats.length}>categories with nothing picked yet</Big>
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <Link key={c} to={catLink(idx, c)} className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground" data-verify-left={c}>
                {catName(idx, c)}
              </Link>
            ))}
          </div>
          <div className="space-y-2 border-t pt-3">
            <div className="text-xs text-muted-foreground">
              RESEARCH's open frontier <span className="neon-text tabular-nums">{idx.stats.frontier_open}</span>
            </div>
            <Bars rows={Object.entries(idx.stats.frontier_by_area).sort((a, b) => b[1] - a[1]).map(([a, n]) => ({ key: a, n, to: `/discover#${a}`, label: a }))} />
          </div>
        </div>
      )
    },
  },
]

const DEFAULT_LG: Layout = WIDGETS.map((w) => ({ i: w.id, ...w.lg }))
const SM_H: Record<string, number> = { total: 5, signals: 8, funnel: 8, coverage: 14, worth: 13, left: 15, recent: 9, frontier: 12 }
const DEFAULT_HIDDEN = ["recent", "frontier"]
/** widgets about his picks and bookmarks: never in the public build */
const PRIVATE_WIDGETS = new Set(["signals", "recent"])
const COLS = { lg: 12, md: 6, sm: 1 }
const BREAKS = { lg: 1000, md: 640, sm: 0 }
// HALO's widget sizes (looks v7): S, M, L and XL set a widget's width and the least height it needs
type Size = "S" | "M" | "L" | "XL"
const SIZES: Record<Size, [number, number]> = { S: [3, 6], M: [4, 9], L: [6, 9], XL: [12, 9] }

function loadSaved(): Saved {
  try {
    return JSON.parse(localStorage.getItem(BOARD_KEY) || "{}")
  } catch {
    return {}
  }
}

function defaults(pub = false): ResponsiveLayouts {
  const order = [...WIDGETS].sort((a, b) => a.lg.y - b.lg.y || a.lg.x - b.lg.x)
  let y = 0
  const sm = order.map((w) => {
    const h = SM_H[w.id] ?? w.lg.h
    const it = { i: w.id, x: 0, y, w: 1, h }
    y += h
    return it
  })
  const md = order.map((w, i) => ({ i: w.id, x: (i % 2) * 3, y: Math.floor(i / 2) * 13, w: 3, h: Math.max(w.lg.h, 9), minW: 2 }))
  // the public build has no "His picks by signal", so the funnel takes its place in the top row
  return { lg: pub ? DEFAULT_LG.map((it) => (it.i === "funnel" ? { ...it, w: 9 } : it)) : DEFAULT_LG, md, sm }
}

export default function Home() {
  const idx = useIndex()!
  const meta = useMeta()
  const { items: marks } = useBookmarks()
  const [saved, setSaved] = useState<Saved>(loadSaved)
  const { width, containerRef, mounted } = useContainerWidth()
  const hidden = useMemo(() => new Set(saved.hidden || DEFAULT_HIDDEN), [saved.hidden])
  const layouts = saved.layouts || defaults(!!idx.public)
  const visible = WIDGETS.filter((w) => !hidden.has(w.id) && !(idx.public && PRIVATE_WIDGETS.has(w.id)))

  const persist = useCallback((next: Saved) => {
    setSaved(next)
    localStorage.setItem(BOARD_KEY, JSON.stringify(next))
  }, [])

  const onLayoutChange = useCallback(
    (_l: Layout, all: ResponsiveLayouts) => {
      setSaved((cur) => {
        const merged = { ...(cur.layouts || defaults(!!idx.public)), ...all }
        const next = { ...cur, layouts: merged }
        if (JSON.stringify(next.layouts) !== JSON.stringify(cur.layouts)) localStorage.setItem(BOARD_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const remove = (id: string) => persist({ ...saved, hidden: [...hidden, id] })
  const add = (id: string) => {
    const w = WIDGETS.find((x) => x.id === id)!
    const lay = { ...layouts }
    for (const bp of Object.keys(lay) as (keyof typeof COLS)[]) {
      const l = (lay[bp] || []).filter((it) => it.i !== id)
      const bottom = l.reduce((m, it) => Math.max(m, it.y + it.h), 0)
      lay[bp] = [...l, { i: id, x: 0, y: bottom, w: Math.min(bp === "lg" ? w.lg.w : COLS[bp] === 1 ? 1 : 3, COLS[bp]), h: w.lg.h }]
    }
    persist({ layouts: lay, hidden: [...hidden].filter((h) => h !== id) })
  }
  const reset = () => {
    localStorage.removeItem(BOARD_KEY)
    setSaved({})
  }

  const wide = width >= BREAKS.lg
  const lgAt = new Map((layouts.lg || []).map((it) => [it.i, it]))
  const sizeOf = (id: string): Size => {
    const w = lgAt.get(id)?.w ?? 4
    return w <= 3 ? "S" : w <= 5 ? "M" : w <= 8 ? "L" : "XL"
  }
  const setSize = (id: string, z: Size) =>
    persist({ ...saved, layouts: { ...layouts, lg: (layouts.lg || []).map((it) => (it.i === id ? { ...it, w: Math.max(SIZES[z][0], it.minW ?? 0), h: Math.max(it.h, SIZES[z][1]) } : it)) } })

  const ctx: Ctx = { idx, meta, marks }

  return (
    <div>
      <TypeCity />
      <StartHere />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[22px] leading-[1.1] font-semibold lg:text-[24px]">The board</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            The hub at a glance. Drag a widget by its top, resize it from the corner or pick S, M, L or XL; the board is saved in this browser. Data from {idx.generated.slice(0, 10)}.
          </p>
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <LayoutGrid className="size-3.5" /> Widgets
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80">
              <SheetHeader>
                <SheetTitle>Widgets</SheetTitle>
                <SheetDescription>Everything the board can show. Add back the ones you removed.</SheetDescription>
              </SheetHeader>
              <ul className="space-y-1 px-4">
                {WIDGETS.filter((w) => !(idx.public && PRIVATE_WIDGETS.has(w.id))).map((w) => {
                  const on = !hidden.has(w.id)
                  return (
                    <li key={w.id} className="flex items-center gap-3 rounded-md border px-3 py-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{w.title}</div>
                        <div className="truncate text-xs text-muted-foreground">{w.hint}</div>
                      </div>
                      <Button variant={on ? "ghost" : "outline"} size="sm" className="h-7 gap-1 text-xs" onClick={() => (on ? remove(w.id) : add(w.id))}>
                        {on ? (
                          <>
                            <X className="size-3" /> Remove
                          </>
                        ) : (
                          <>
                            <Plus className="size-3" /> Add
                          </>
                        )}
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" size="sm" className="h-8 gap-1.5" onClick={reset}>
            <RotateCcw className="size-3.5" /> Reset
          </Button>
        </div>
      </div>

      <div ref={containerRef} className="-mx-2" data-verify-board>
        {mounted && (
          <ResponsiveGridLayout
            width={width}
            layouts={layouts}
            breakpoints={BREAKS}
            cols={COLS}
            rowHeight={36}
            margin={[16, 16]}
            containerPadding={[8, 0]}
            dragConfig={{ handle: ".widget-handle", cancel: "button, a, input, select" }}
            resizeConfig={{ handles: ["se"] }}
            onLayoutChange={onLayoutChange}
          >
            {visible.map((w) => (
              <div key={w.id} data-widget={w.id}>
                <Card className="flex h-full flex-col gap-0 overflow-hidden py-0 shadow-none">
                  <div className="widget-handle flex h-10 shrink-0 cursor-grab items-center gap-1.5 border-b pr-1.5 pl-1 active:cursor-grabbing" title={`Drag ${w.title}`}>
                    <span className="grid size-7 place-items-center text-muted-foreground/60" aria-hidden>
                      <GripVertical className="size-3.5" />
                    </span>
                    <h2 className="truncate text-sm font-medium">{w.title}</h2>
                    <div className="widget-tools ml-auto flex items-center gap-1">
                      {wide && (
                        <div className="siso-well flex items-center gap-px p-[2px]" role="group" aria-label={`${w.title} size`}>
                          {(Object.keys(SIZES) as Size[]).map((z) => {
                            const on = z === sizeOf(w.id)
                            return (
                              <button key={z} onClick={() => setSize(w.id, z)} aria-pressed={on} title={`Size ${z}`} className={cn("siso-press rounded-[6px] px-1.5 py-px font-mono text-[10px] font-semibold", on ? "siso-raised text-neon-ink" : "text-muted-foreground hover:text-foreground")}>
                                {z}
                              </button>
                            )
                          })}
                        </div>
                      )}
                      <Button variant="ghost" size="icon" className="size-6 text-muted-foreground" onClick={() => remove(w.id)} aria-label={`Remove ${w.title}`}>
                        <X className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto p-4">{w.render(ctx)}</div>
                </Card>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </div>
    </div>
  )
}
