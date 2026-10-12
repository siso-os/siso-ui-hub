// uihub: siso:search-deck
// The search bar at the top of most pages. Shaan, 11 Oct: "a search 3d bar that gets used in the dashboard at the top of
// most pages ... deterministically you can search through all the categories ... you can also see previews ... even
// before you search it shows you all the categories and stuff like that and how it fits together".
// Open and empty, it is the map: every place by tab (Components, Sites, Apps, Looks, Assets), the surfaces to build, and
// the commonest types. Typed into, it answers in the same order: places, types, slots, libraries, then parts, best first.
// Whatever the pointer is on shows on the right as a small deck of its best pictures, tilted in 3D, with what is inside.
// Plain matching, no guessing: every word must appear. "/" focuses it; arrows and Enter work; Escape closes.
import { useDeferredValue, useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Blocks, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { catLink, catName, fmtInt, fmtNum, itemHref, navHref, navRows, useIndex, type Index, type NavItem, type Row } from "@/lib/data"
import { SURFACES, type Slot, type Surface } from "@/lib/surfaces"
import { TOP_TABS, tabOfGroup } from "@/lib/tab"
import { Stars } from "./ItemCard"

type Hot =
  | { kind: "place"; it: NavItem }
  | { kind: "type"; pat: string; c: string }
  | { kind: "slot"; sf: Surface; s: Slot }
  | { kind: "lib"; s: string }
  | { kind: "part"; row: Row }
type Hit = { key: string; to: string; label: ReactNode; meta?: ReactNode; hot: Hot; group: string }

// a deck's order: parts with a picture, then the reader's rating, then the hub's own rank
const best = (a: Row, b: Row) => Number(!!b.p) - Number(!!a.p) || (b.rt || 0) - (a.rt || 0) || b._r - a._r

function rowsOf(idx: Index, h: Hot): Row[] {
  if (h.kind === "place") return navRows(idx, h.it)
  if (h.kind === "type") return (idx.byCategory.get(h.c) || []).filter((r) => r.pat === h.pat)
  if (h.kind === "slot") return idx.items.filter((r) => r.slots?.includes(`${h.sf.id}:${h.s.id}`))
  if (h.kind === "lib") return idx.items.filter((r) => r.s === h.s)
  return [h.row]
}

/** the right-hand preview: three best pictures fanned in depth, then what is inside */
function Deck({ idx, hot }: { idx: Index; hot: Hot | null }) {
  // nothing pointed at yet: the deck is the whole hub, its best three, how much is typed and how it rates
  const rows = useMemo(() => (hot ? rowsOf(idx, hot) : idx.items).filter((r) => !r.cp), [idx, hot])
  const top = useMemo(() => rows.slice().sort(best).slice(0, 3), [rows])
  const types = useMemo(() => {
    if (hot?.kind === "part" || hot?.kind === "type") return []
    const m = new Map<string, number>()
    for (const r of rows) if (r.pat) m.set(r.pat, (m.get(r.pat) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, hot ? 6 : 4)
  }, [rows, hot])
  const rated = useMemo(() => rows.filter((r) => r.rt), [rows])
  const stars = useMemo(() => [5, 4, 3, 2, 1].map((n) => [n, rated.filter((r) => Math.round(r.rt || 0) === n).length] as const), [rated])
  const title = !hot
    ? "The whole hub"
    : hot.kind === "place" ? hot.it.label : hot.kind === "type" ? hot.pat : hot.kind === "slot" ? `${hot.sf.label}: ${hot.s.label}` : hot.kind === "lib" ? hot.s : hot.row.t
  const avg = rated.length ? rated.reduce((n, r) => n + (r.rt || 0), 0) / rated.length : 0
  return (
    <div className="flex h-full flex-col gap-3 p-1" data-verify-deck={hot?.kind || "hub"}>
      <div className="relative h-36 [perspective:900px]" aria-hidden>
        <div className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(8deg)_rotateY(-14deg)]">
          {top.length ? (
            top.map((r, i) => (
              <div
                key={r.id}
                className="absolute top-2 left-2 h-28 w-40 overflow-hidden rounded-xl border bg-secondary shadow-lift transition-transform duration-500 ease-out"
                style={{ transform: `translate3d(${i * 34}px, ${i * 6}px, ${-i * 46}px) rotate(${i * 3}deg)`, zIndex: 3 - i }}
              >
                {r.p ? <img src={r.p} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top" /> : <div className="size-full bg-foreground/[0.04]" />}
              </div>
            ))
          ) : (
            <div className="absolute inset-4 grid place-items-center rounded-xl border border-dashed text-xs text-muted-foreground">No pictures yet</div>
          )}
        </div>
      </div>
      <div className="min-w-0 space-y-1.5">
        <p className="truncate text-sm font-medium first-letter:uppercase" title={title}>
          {title}
        </p>
        {hot?.kind === "part" ? (
          <>
            <p className="line-clamp-3 text-[12px] leading-relaxed text-muted-foreground">{hot.row.d}</p>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
              {hot.row.rt ? <Stars n={hot.row.rt} /> : null}
              {hot.row.pat && <span className="rounded-md bg-foreground/[0.06] px-1.5 py-0.5">{hot.row.pat}</span>}
              {(hot.row.slots || []).slice(0, 2).map((s) => (
                <span key={s} className="rounded-md bg-foreground/[0.06] px-1.5 py-0.5">
                  {s.replace(":", " · ")}
                </span>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-[12px] text-muted-foreground">
              {fmtInt(rows.length)} parts{rated.length ? ` · ${fmtInt(rated.length)} rated, ${avg.toFixed(1)} on average` : ""}
            </p>
            {!hot && rated.length > 0 && (
              <div className="flex items-end gap-1.5" title="How the rated parts score, 5 stars to 1" data-verify-deck-stars>
                {stars.map(([n, c]) => (
                  <div key={n} className="flex flex-1 flex-col items-center gap-0.5">
                    <span className="flex h-8 w-full items-end overflow-hidden rounded-sm bg-foreground/[0.06]">
                      <span className="block w-full rounded-sm bg-neon" style={{ height: `${Math.max(6, (c / Math.max(...stars.map((s) => s[1]))) * 100)}%` }} />
                    </span>
                    <span className="font-mono text-[9.5px] text-muted-foreground">{n}★</span>
                  </div>
                ))}
              </div>
            )}
            {types.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">Types inside</p>
                {types.map(([t, n]) => (
                  <div key={t} className="flex items-center gap-2 text-[12px]">
                    <span className="min-w-0 flex-1 truncate first-letter:uppercase">{t}</span>
                    <span className="h-1 w-16 overflow-hidden rounded-full bg-foreground/10">
                      <span className="block h-full rounded-full bg-neon" style={{ width: `${Math.max(8, (n / types[0][1]) * 100)}%` }} />
                    </span>
                    <span className="w-8 text-right font-mono text-[10.5px] text-muted-foreground tabular-nums">{fmtNum(n)}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/** narrow: no preview column and a two-column map (inside Home's 3D band); onQuery: what is typed, for the band's towers */
export function SearchDeck({ className, narrow, onQuery }: { className?: string; narrow?: boolean; onQuery?: (q: string) => void }) {
  const idx = useIndex()
  const go = useNavigate()
  const [q, setQ] = useState("")
  const dq = useDeferredValue(q)
  const [open, setOpen] = useState(false)
  const [hot, setHot] = useState<Hot | null>(null)
  const [act, setAct] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const box = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault()
        input.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", key)
    return () => window.removeEventListener("keydown", key)
  }, [])
  useEffect(() => {
    if (!open) return
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener("pointerdown", away)
    return () => window.removeEventListener("pointerdown", away)
  }, [open])

  // every type with its count and the category most of its parts are in
  const types = useMemo(() => {
    const m = new Map<string, { n: number; cats: Map<string, number> }>()
    for (const r of idx?.items || []) {
      if (!r.pat || !r.c || r.cp) continue
      const k = `${r.c}|${r.pat}`
      const e = m.get(k) || { n: 0, cats: new Map() }
      e.n++
      m.set(k, e)
    }
    return [...m.entries()].map(([k, v]) => ({ c: k.slice(0, k.indexOf("|")), pat: k.slice(k.indexOf("|") + 1), n: v.n })).sort((a, b) => b.n - a.n)
  }, [idx])
  const places = useMemo(() => (idx?.nav || []).flatMap((s) => s.items), [idx])
  const libs = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of idx?.items || []) m.set(r.s, (m.get(r.s) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1])
  }, [idx])

  const hits: Hit[] = useMemo(() => {
    if (!idx) return []
    const words = dq.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return []
    const has = (s: string) => {
      const l = s.toLowerCase()
      return words.every((w) => l.includes(w))
    }
    const out: Hit[] = []
    for (const it of places.filter((it) => has(`${it.label} ${it.categories.join(" ")}`)).slice(0, 5))
      out.push({ key: `p:${it.slug}`, to: navHref(it), label: it.label, meta: fmtNum(it.n), hot: { kind: "place", it }, group: "Places" })
    for (const t of types.filter((t) => has(`${t.pat} ${catName(idx, t.c)}`)).slice(0, 6))
      out.push({ key: `t:${t.c}|${t.pat}`, to: `${catLink(idx, t.c)}?type=${encodeURIComponent(t.pat)}`, label: <span className="first-letter:uppercase">{t.pat}</span>, meta: `${catName(idx, t.c)} · ${fmtNum(t.n)}`, hot: { kind: "type", pat: t.pat, c: t.c }, group: "Types" })
    for (const sf of SURFACES)
      for (const s of sf.slots)
        if (has(`${s.label} ${s.id} ${sf.label}`) && out.filter((h) => h.group === "Slots").length < 5)
          out.push({ key: `s:${sf.id}:${s.id}`, to: `/build/${sf.id}/${s.id}`, label: `${sf.label}: ${s.label}`, meta: s.does, hot: { kind: "slot", sf, s }, group: "Slots" })
    for (const [s, n] of libs.filter(([s]) => has(s)).slice(0, 3))
      out.push({ key: `l:${s}`, to: `/libraries/${encodeURIComponent(s)}`, label: s, meta: fmtNum(n), hot: { kind: "lib", s }, group: "Libraries" })
    const parts = idx.items.filter((r) => !r.cp && words.every((w) => r._q.includes(w))).sort(best).slice(0, 10)
    for (const r of parts)
      out.push({ key: `r:${r.id}`, to: itemHref(r.id), label: r.t, meta: r.rt ? <Stars n={r.rt} /> : r.pat, hot: { kind: "part", row: r }, group: "Parts" })
    return out
  }, [idx, dq, places, types, libs])

  useEffect(() => {
    setAct(0)
    setHot(hits[0]?.hot || null)
  }, [hits])
  useEffect(() => onQuery?.(dq), [dq, onQuery])

  if (!idx) return null
  const pick = (h: Hit) => {
    setOpen(false)
    setQ("")
    go(h.to)
  }
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false)
      input.current?.blur()
    } else if (hits.length && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault()
      const n = (act + (e.key === "ArrowDown" ? 1 : hits.length - 1)) % hits.length
      setAct(n)
      setHot(hits[n].hot)
    } else if (e.key === "Enter" && hits[act]) pick(hits[act])
  }
  const lean = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 3, y: -((e.clientY - r.top) / r.height - 0.5) * 3 })
  }
  const groups = [...new Set(hits.map((h) => h.group))]

  return (
    <div ref={box} className={cn("relative z-30 [perspective:1800px]", className)} data-verify-search-deck>
      <label
        className={cn(
          "siso-well group flex h-11 items-center gap-2.5 px-3.5 transition-[box-shadow,transform] duration-300",
          open && "shadow-[0_0_0_1px_color-mix(in_srgb,var(--neon)_70%,transparent),0_10px_40px_-12px_color-mix(in_srgb,var(--neon)_60%,transparent)]",
        )}
      >
        <Search className={cn("size-4 shrink-0 transition-colors", open ? "text-neon-ink" : "text-muted-foreground")} />
        <input
          ref={input}
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={`Search ${fmtNum(idx.items.length)} parts by place, type, slot or library…`}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Search the hub"
          aria-expanded={open}
          role="combobox"
          data-verify-search-input
        />
        <kbd className="hidden rounded-md border bg-background/60 px-1.5 font-mono text-[11px] text-muted-foreground sm:inline">/</kbd>
      </label>

      {open && (
        <div className="absolute inset-x-0 top-full pt-2" onPointerMove={lean} onPointerLeave={() => setTilt({ x: 0, y: 0 })}>
          <div className="transition-transform duration-300 ease-out [transform-style:preserve-3d] motion-reduce:!transform-none" style={{ transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}>
            <div className="siso-rim is-idle siso-deck-in rounded-[18px] p-1.5 shadow-lift">
              <div className={cn("grid max-h-[min(70vh,620px)] gap-3 overflow-hidden rounded-[14px] bg-card/95 p-3 backdrop-blur-xl", !narrow && "md:grid-cols-[minmax(0,1fr)_260px]")}>
                <div className="min-h-0 overflow-y-auto pr-1" role="listbox" aria-label="Results">
                  {q.trim() ? (
                    hits.length ? (
                      groups.map((g) => (
                        <div key={g} className="mb-3">
                          <p className="mb-1 px-2 text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">{g}</p>
                          {hits.map((h, i) =>
                            h.group !== g ? null : (
                              <button
                                key={h.key}
                                type="button"
                                role="option"
                                aria-selected={i === act}
                                onPointerEnter={() => {
                                  setAct(i)
                                  setHot(h.hot)
                                }}
                                onClick={() => pick(h)}
                                className={cn("flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left text-[13px]", i === act ? "bg-neon/10 text-foreground" : "text-foreground/85")}
                              >
                                {h.hot.kind === "part" && (
                                  <span className="size-8 shrink-0 overflow-hidden rounded-md border bg-secondary">
                                    {h.hot.row.p && <img src={h.hot.row.p} alt="" loading="lazy" className="size-full object-cover object-top" />}
                                  </span>
                                )}
                                <span className="min-w-0 flex-1 truncate">{h.label}</span>
                                {h.meta && <span className="shrink-0 truncate text-[11px] text-muted-foreground">{h.meta}</span>}
                                {i === act && <ArrowRight className="size-3.5 shrink-0 text-neon-ink" />}
                              </button>
                            ),
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="p-4 text-sm text-muted-foreground">Nothing has every one of those words.</p>
                    )
                  ) : (
                    // the map, before you type: every place by tab, what you can build, the commonest types
                    <div className="space-y-4">
                      {/* one column per tab, its biggest places first: how the hub fits together at a glance */}
                      <div className={cn("grid grid-cols-2 gap-x-4 gap-y-4", !narrow && "lg:grid-cols-3")}>
                        {TOP_TABS.filter((t) => t.id !== "projects").map((t) => {
                          const items = places.filter((it) => tabOfGroup(it.categories[0]?.split("/")[0] || "") === t.id).sort((a, b) => b.n - a.n)
                          if (!items.length) return null
                          return (
                            <div key={t.id} className="min-w-0">
                              <button type="button" onClick={() => pick({ key: t.id, to: t.to, label: t.label, hot: { kind: "place", it: items[0] }, group: "" })} className="mb-1 flex w-full items-center gap-1.5 px-1.5 text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase hover:text-foreground">
                                <t.icon className="size-3.5" /> {t.label}
                                <span className="ml-auto font-mono normal-case tabular-nums">{fmtNum(items.reduce((n, it) => n + it.n, 0))}</span>
                              </button>
                              {items.slice(0, 8).map((it) => (
                                <button
                                  key={it.slug}
                                  type="button"
                                  onPointerEnter={() => setHot({ kind: "place", it })}
                                  onClick={() => pick({ key: it.slug, to: navHref(it), label: it.label, hot: { kind: "place", it }, group: "" })}
                                  className="flex w-full items-center gap-2 rounded-md px-1.5 py-[3px] text-left text-[12.5px] text-foreground/85 hover:bg-neon/10 hover:text-foreground"
                                >
                                  <span className="min-w-0 flex-1 truncate">{it.label}</span>
                                  <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{fmtNum(it.n)}</span>
                                </button>
                              ))}
                              {items.length > 8 && (
                                <button type="button" onClick={() => pick({ key: t.id, to: t.to, label: t.label, hot: { kind: "place", it: items[0] }, group: "" })} className="px-1.5 pt-0.5 text-[11.5px] text-muted-foreground hover:text-foreground">
                                  and {items.length - 8} more places →
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                      <div>
                        <p className="mb-1.5 flex items-center gap-1.5 text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">
                          <Blocks className="size-3.5" /> Build
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {SURFACES.map((sf) => (
                            <button key={sf.id} type="button" onClick={() => pick({ key: sf.id, to: `/build/${sf.id}`, label: sf.label, hot: { kind: "slot", sf, s: sf.slots[0] }, group: "" })} onPointerEnter={() => setHot({ kind: "slot", sf, s: sf.slots[Math.min(2, sf.slots.length - 1)] })} className="siso-chip inline-flex h-6 items-center rounded-md px-2 text-[11.5px]">
                              {sf.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      {types.length > 0 && (
                        <div>
                          <p className="mb-1.5 text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">Commonest types</p>
                          <div className="flex flex-wrap gap-1">
                            {types.slice(0, 14).map((t) => (
                              <button
                                key={`${t.c}|${t.pat}`}
                                type="button"
                                onPointerEnter={() => setHot({ kind: "type", pat: t.pat, c: t.c })}
                                onClick={() => pick({ key: t.pat, to: `${catLink(idx, t.c)}?type=${encodeURIComponent(t.pat)}`, label: t.pat, hot: { kind: "type", pat: t.pat, c: t.c }, group: "" })}
                                className="siso-chip inline-flex h-6 items-center gap-1 rounded-md px-2 text-[11.5px]"
                              >
                                <span className="first-letter:uppercase">{t.pat}</span>
                                <span className="text-[10px] text-muted-foreground">{catName(idx, t.c)}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {!narrow && (
                  <div className="hidden min-h-0 border-l pl-3 md:block">
                    <Deck idx={idx} hot={hot} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
