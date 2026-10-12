// uihub: siso:pick-deck
// The pick deck (Shaan, 12 Oct: "how do we do that 3D top thing to help like go through it easier ... so I can start
// picking them as SISO bases"): one slot of the SISO skeleton (a node and one of its types) at a time, its candidates in a
// 3D row, the one in front large. ← → flip, Enter takes it as the SISO base, X skips it for good, Esc closes. Decisions are
// bookmarks: siso/base/<scale>/<node>/<type> (note = the part's id) and siso/skip/<part id>.
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { itemHref, type Row } from "@/lib/data"
import { setBookmark, useBookmarks, type Mark } from "@/lib/bookmarks"
import { Stars, glassy } from "./ItemCard"

export interface Slot {
  /** the bookmark that holds his pick */
  key: string
  /** "Input / Form field", "glass" … */
  title: string
  sub?: string
  rows: Row[]
  /** a variation nothing in the library matches yet: its rows are the whole node, to pick the closest */
  gap?: boolean
  /** structure, state, platform, edge or job (catalogue/schema/variations.json) */
  kind?: string
  why?: string
}

const on = (m?: Mark) => !!m && !m.off
/** a clean type as a bookmark segment: "icon and text" -> "icon-and-text" */
export const typeId = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
/** a type's slot: the node most of its parts sit on, then the type (a tower on Home is one) */
export function typeSlot(pat: string, rows: Row[], name?: (key: string) => string | undefined): Slot {
  const n = new Map<string, number>()
  for (const r of rows) if (r.nd) n.set(r.nd, (n.get(r.nd) || 0) + 1)
  const node = [...n.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
  return { key: node ? `siso/base/${node}/${typeId(pat)}` : `siso/base/type/${typeId(pat)}`, title: `${(node && name?.(node)) || ""}${node ? " · " : ""}${pat}`, sub: pat, rows }
}
// parts you can see first: our own apps' parts (already through his taste), a picture drawn from the part, then a photo of
// its page, then the rest; within each, the hub's rank
const seen = (r: Row) => (r.id.startsWith("ours:") ? 3 : r.p ? (r.ps ? 0.5 : r.ph ? 1 : 2) : 0)
/** a slot's candidates: no exact copies, not skipped, the ones you can see first */
export const deckRows = (rows: Row[], marks: Record<string, Mark>) =>
  rows.filter((r) => !r.cp && r.lvl !== "demo" && r.lvl !== "logic" && !on(marks[`siso/skip/${r.id}`])).sort((a, b) => seen(b) - seen(a) || b._r - a._r)

export function PickDeck({ slots, start, onClose }: { slots: Slot[]; start: number; onClose: () => void }) {
  const { items: marks } = useBookmarks()
  const [si, setSi] = useState(start)
  const [i, setI] = useState(0)
  const slot = slots[si]
  const rows = useMemo(() => deckRows(slot?.rows || [], marks).slice(0, 80), [slot, marks])
  const pick = slot && on(marks[slot.key]) ? marks[slot.key].note : undefined
  const cur = rows[Math.min(i, rows.length - 1)]
  useEffect(() => setI(0), [si])

  const take = (r?: Row) => {
    if (!slot || !r) return
    setBookmark(slot.key, pick !== r.id, pick === r.id ? {} : { note: r.id })
  }
  const skip = (r?: Row) => r && setBookmark(`siso/skip/${r.id}`, true)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") setI((x) => Math.min(x + 1, rows.length - 1))
      else if (e.key === "ArrowLeft") setI((x) => Math.max(x - 1, 0))
      else if (e.key === "ArrowDown" || e.key === "Tab") setSi((x) => Math.min(x + 1, slots.length - 1))
      else if (e.key === "ArrowUp") setSi((x) => Math.max(x - 1, 0))
      else if (e.key === "Enter") take(cur)
      else if (e.key === "x" || e.key === "X") skip(cur)
      else return
      e.preventDefault()
    }
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  })
  if (!slot) return null
  const at = Math.min(i, rows.length - 1)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/92 backdrop-blur-md" role="dialog" aria-label={`Pick a SISO base: ${slot.title}`} data-verify-deck={slot.key}>
      <div className="flex items-center gap-3 px-6 pt-5">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            Slot {si + 1} of {slots.length}
            {slot.sub ? ` · ${slot.sub}` : ""}
          </p>
          <h2 className="truncate text-[22px] font-semibold tracking-[-0.02em]">
            {slot.title}
            {pick && <span className="ml-2 align-middle text-[12px] font-medium text-emerald-500">base taken</span>}
          </h2>
          {(slot.why || slot.gap) && (
            <p className="text-[12.5px] text-muted-foreground">
              {slot.why}
              {slot.gap ? `${slot.why ? " · " : ""}a gap: nothing is typed this way yet, so every part of the kind is shown; take the closest` : ""}
            </p>
          )}
        </div>
        <p className="ml-auto hidden text-[12px] text-muted-foreground md:block">← → flip · Enter take · X skip · ↑ ↓ slot · Esc close</p>
        <button onClick={onClose} aria-label="Close" className="siso-press grid size-9 place-items-center rounded-lg hover:bg-foreground/[0.06]">
          <X className="size-5" />
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="grid flex-1 place-items-center text-sm text-muted-foreground">Nothing left to see in this slot.</div>
      ) : (
        <div className="relative flex-1 overflow-hidden [perspective:1600px]">
          {rows.map((r, k) => {
            const d = k - at
            if (Math.abs(d) > 4) return null
            const mine = pick === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => (d === 0 ? take(r) : setI(k))}
                className={cn(
                  "absolute top-1/2 left-1/2 w-[min(640px,78vw)] overflow-hidden rounded-2xl border bg-card text-left shadow-2xl transition-[transform,opacity,filter] duration-300 ease-out",
                  mine && "border-emerald-500/80 ring-2 ring-emerald-500/40",
                )}
                style={{
                  transform: `translate(-50%, -50%) translateX(${d * 46}%) translateZ(${-Math.abs(d) * 160}px) rotateY(${d === 0 ? 0 : d > 0 ? -38 : 38}deg)`,
                  zIndex: 20 - Math.abs(d),
                  opacity: d === 0 ? 1 : 0.75 - Math.abs(d) * 0.12,
                  filter: d === 0 ? undefined : "saturate(.7) brightness(.8)",
                }}
                data-verify-deck-card={d === 0 ? r.id : undefined}
              >
                <div className={cn("aspect-[4/3] bg-muted/40", glassy(r) && "siso-glass-stage")}>
                  {r.p ? (
                    <img src={r.p} alt="" decoding="async" className="size-full object-contain" />
                  ) : (
                    <div className="grid size-full place-items-center p-8 text-center text-sm text-muted-foreground">{r.d || "No picture yet: open it at its source"}</div>
                  )}
                </div>
                <div className="flex items-center gap-2 border-t px-4 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-[14px] font-medium">{r.t}</p>
                    <p className="flex items-center gap-1.5 truncate text-[11.5px] text-muted-foreground">
                      {r.rt ? <Stars n={r.rt} /> : null} {r.s}
                      {r.looks?.length ? ` · ${r.looks.slice(0, 3).join(", ")}` : ""}
                    </p>
                  </div>
                  {mine && <Check className="ml-auto size-5 shrink-0 text-emerald-500" />}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {cur && (
        <div className="flex flex-wrap items-center justify-center gap-2 px-6 pb-6">
          <button onClick={() => setI(Math.max(at - 1, 0))} aria-label="Previous" className="siso-press grid size-10 place-items-center rounded-xl border hover:bg-foreground/[0.05]">
            <ArrowLeft className="size-4" />
          </button>
          <button onClick={() => skip(cur)} className="siso-press h-10 rounded-xl border px-4 text-[13px] text-muted-foreground hover:text-foreground" data-verify-deck-skip>
            Skip <kbd className="ml-1 font-mono text-[11px] opacity-60">X</kbd>
          </button>
          <button
            onClick={() => take(cur)}
            className={cn("siso-press h-10 rounded-xl px-5 text-[13px] font-medium", pick === cur.id ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" : "siso-neon text-white")}
            data-verify-deck-take
          >
            {pick === cur.id ? "SISO base ✓" : "Take as SISO base"} <kbd className="ml-1 font-mono text-[11px] opacity-70">Enter</kbd>
          </button>
          <Link to={itemHref(cur.id)} onClick={onClose} className="siso-press inline-flex h-10 items-center gap-1.5 rounded-xl border px-4 text-[13px] text-muted-foreground hover:text-foreground">
            Open <ExternalLink className="size-3.5" />
          </Link>
          <button onClick={() => setI(Math.min(at + 1, rows.length - 1))} aria-label="Next" className="siso-press grid size-10 place-items-center rounded-xl border hover:bg-foreground/[0.05]">
            <ArrowRight className="size-4" />
          </button>
          <span className="w-full text-center font-mono text-[11px] text-muted-foreground tabular-nums">
            {at + 1} / {rows.length}
          </span>
        </div>
      )}
    </div>
  )
}
