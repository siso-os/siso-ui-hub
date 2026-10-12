// uihub: siso:item-grid
import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import type { Row } from "@/lib/data"
import { ItemCard } from "./ItemCard"


export const GRID_CLS = "grid grid-cols-1 gap-x-5 gap-y-7 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1900px]:grid-cols-5"

export const WIDE_GRID_CLS = "grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 xl:grid-cols-3 min-[1900px]:grid-cols-4"

/** icons, logos and flags (drawn from their code): small square tiles, many to a row, like an icon set's own site */
export const ICON_GRID_CLS = "grid grid-cols-3 gap-x-3 gap-y-4 min-[480px]:grid-cols-4 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 min-[1900px]:grid-cols-10"

export function ItemGrid({ rows, renderNote, empty, className }: { rows: Row[]; renderNote?: (r: Row) => ReactNode; empty?: ReactNode; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const [window, setWindow] = useState({ start: 0, end: 24, step: 0, total: 0, gap: 28, cols: 1 })
  useLayoutEffect(() => {
    const el = host.current, inner = grid.current
    if (!el || !inner) return
    let frame = 0
    const measure = () => {
      const style = getComputedStyle(inner)
      const cols = style.gridTemplateColumns.split(" ").length
      const gap = parseFloat(style.rowGap) || 0
      const cells = [...inner.children].slice(0, cols)
      const height = Math.max(0, ...cells.map(c => c.getBoundingClientRect().height))
      if (!height) return
      const step = height + gap
      const total = Math.ceil(rows.length / cols)
      const offset = Math.max(0, -el.getBoundingClientRect().top)
      const first = Math.min(Math.max(0, total - 1), Math.max(0, Math.floor(offset / step) - 2))
      const last = Math.min(total, Math.ceil((offset + globalThis.innerHeight) / step) + 3)
      const next = { start: first * cols, end: last * cols, step, total, gap, cols }
      setWindow(old => Object.keys(next).every(k => old[k as keyof typeof old] === next[k as keyof typeof next]) ? old : next)
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(measure) }
    const ro = new ResizeObserver(schedule)
    ro.observe(el)
    ro.observe(inner)
    globalThis.addEventListener("scroll", schedule, { passive: true })
    globalThis.addEventListener("resize", schedule)
    measure()
    return () => { ro.disconnect(); cancelAnimationFrame(frame); globalThis.removeEventListener("scroll", schedule); globalThis.removeEventListener("resize", schedule) }
  }, [rows, className])
  if (!rows.length)
    return <div className="rounded-[14px] border border-dashed bg-foreground/[0.015] p-10 text-center text-sm text-muted-foreground">{empty ?? "Nothing matches these filters."}</div>
  // The spacer keeps the full scroll range while only the viewport and two nearby rows mount.
  const columns = window.cols
  const start = Math.min(window.start, Math.max(0, rows.length - 1))
  return (
    <div ref={host} className="relative" style={window.step ? { height: window.total * window.step - window.gap } : undefined} data-verify-grid={rows.length}>
      <div ref={grid} className={className || GRID_CLS} style={window.step ? { position: "absolute", top: Math.floor(start / columns) * window.step, width: "100%" } : undefined}>
        {rows.slice(start, Math.max(start + 1, window.end)).map((r, i) => (
          <ItemCard key={r.id} row={r} note={renderNote?.(r)} priority={start === 0 && i < 12} wide={className === WIDE_GRID_CLS} tile={className === ICON_GRID_CLS} />
        ))}
      </div>
    </div>
  )
}
