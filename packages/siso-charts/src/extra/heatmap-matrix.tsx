// uihub: siso:charts
// Recoded from LiveDocs heatmap-chart
"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"
import { cn } from "../lib/utils"

export interface SisoMatrixHeatmapProps {
  rows: string[]
  cols: string[]
  /** Non-negative values, indexed by row then column. Missing/invalid cells show No data. */
  values: number[][]
  tone: "red" | "amber" | "blue"
  caption: string
  valueLabel: string
}

const palettes = {
  red: ["#29181e", "#682730", "#a33742", "#d64b55", "#fb7180"],
  amber: ["#2c2319", "#70441d", "#a66422", "#dc922e", "#fbbf58"],
  blue: ["#172534", "#244d72", "#2d75a6", "#399fd1", "#7dd3fc"],
} as const
const format = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: 2 })

export function SisoMatrixHeatmap({ rows, cols, values, tone, caption, valueLabel }: SisoMatrixHeatmapProps) {
  const id = useId()
  const host = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const [cursor, setCursor] = useState(0)
  const [dismissed, setDismissed] = useState(false)
  const [point, setPoint] = useState({ left: 0, top: 0 })
  const cells = rows.flatMap((row, r) => cols.map((col, c) => {
    const raw = values[r]?.[c]
    return { row, col, value: typeof raw === "number" && Number.isFinite(raw) && raw >= 0 ? raw : null }
  }))
  const max = cells.reduce((peak, cell) => Math.max(peak, cell.value ?? 0), 0)
  const share = (value: number) => max > 0 ? value / max : 0
  const percent = (value: number) => `${format(share(value) * 100)}%`
  const activeIndex = dismissed ? null : hovered ?? focused
  const active = activeIndex === null ? undefined : cells[activeIndex]
  const colors = palettes[tone]
  const template = `minmax(7rem, 1.5fr) repeat(${cols.length}, minmax(3.5rem, 1fr))`

  function place(element: HTMLButtonElement) {
    const bounds = element.getBoundingClientRect()
    const box = host.current?.getBoundingClientRect()
    if (box) setPoint({ left: Math.max(0, Math.min(bounds.left - box.left, box.width - 224)), top: bounds.bottom - box.top + 8 })
    setDismissed(false)
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const col = index % cols.length
    let next = index
    if (event.key === "ArrowRight") next = col < cols.length - 1 ? index + 1 : index
    else if (event.key === "ArrowLeft") next = col > 0 ? index - 1 : index
    else if (event.key === "ArrowDown") next = index + cols.length < cells.length ? index + cols.length : index
    else if (event.key === "ArrowUp") next = index >= cols.length ? index - cols.length : index
    else if (event.key === "Home") next = event.ctrlKey ? 0 : index - col
    else if (event.key === "End") next = event.ctrlKey ? cells.length - 1 : index - col + cols.length - 1
    else if (event.key === "Escape") { setDismissed(true); return }
    else return
    event.preventDefault()
    setCursor(next)
    host.current?.querySelector<HTMLButtonElement>(`[data-cell="${next}"]`)?.focus()
  }

  return (
    <section aria-labelledby={`${id}-caption`} className="w-full min-w-0 rounded-2xl border border-white/10 bg-[#111318] p-5 text-zinc-100">
      <h3 id={`${id}-caption`} className="mb-5 text-sm font-medium">{caption}</h3>
      {!cells.length ? <p className="text-sm text-zinc-400">No matrix data available.</p> : (
        <>
          <p id={`${id}-help`} className="sr-only">Use arrow keys to explore cells, Home and End to move within a row, and Escape to dismiss details.</p>
          <div ref={host} className="relative">
            <div className="overflow-x-auto p-1" onScroll={() => setDismissed(true)}>
              <div role="grid" aria-label={caption} aria-describedby={`${id}-help`} aria-rowcount={rows.length + 1} aria-colcount={cols.length + 1} className="space-y-1.5" style={{ minWidth: 112 + cols.length * 62 }}>
                <div role="row" className="grid items-end gap-1.5" style={{ gridTemplateColumns: template }}>
                  <span role="columnheader"><span className="sr-only">Row</span></span>
                  {cols.map((col, c) => <span key={c} role="columnheader" className="pb-2 text-center text-xs text-zinc-400">{col}</span>)}
                </div>
                {rows.map((row, r) => (
                  <div key={r} role="row" className="grid items-center gap-1.5" style={{ gridTemplateColumns: template }}>
                    <span role="rowheader" className="pr-2 text-xs text-zinc-300">{row}</span>
                    {cols.map((_, c) => {
                      const index = r * cols.length + c
                      const cell = cells[index]!
                      const value = cell.value
                      const level = value === null || value === 0 ? 0 : Math.min(4, Math.max(1, Math.ceil(share(value) * 4)))
                      const detail = value === null ? "No data; share of max unavailable" : `${format(value)}; ${percent(value)} of max`
                      return (
                        <div key={c} role="gridcell">
                          <button type="button" data-cell={index}
                            tabIndex={index === Math.min(cursor, cells.length - 1) ? 0 : -1}
                            aria-label={`${cell.row}, ${cell.col}: ${valueLabel}: ${detail}`}
                            aria-describedby={activeIndex === index ? `${id}-tooltip` : undefined}
                            className={cn("h-9 w-full rounded-md text-xs font-medium tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111318]", activeIndex === index && "ring-2 ring-white/80")}
                            style={{ backgroundColor: value === null ? "#27272a" : colors[level], color: level >= 3 ? "#111318" : "#fafafa" }}
                            onMouseEnter={(event) => { setHovered(index); place(event.currentTarget) }}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={(event) => { setFocused(index); setCursor(index); place(event.currentTarget) }}
                            onBlur={() => setFocused(null)}
                            onClick={(event) => { event.currentTarget.focus(); place(event.currentTarget) }}
                            onKeyDown={(event) => navigate(event, index)}>
                            {value === null ? "–" : format(value)}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
            {active && (
              <div id={`${id}-tooltip`} role="tooltip" className="pointer-events-none absolute z-50 w-56 max-w-full rounded-xl border border-white/15 bg-[#1b1e25] p-3 text-xs shadow-xl" style={point}>
                <div className="mb-2 font-medium break-words">{active.row} · {active.col}</div>
                <div className="flex justify-between gap-4"><span className="text-zinc-400">{valueLabel}</span><span className="tabular-nums">{active.value === null ? "No data" : format(active.value)}</span></div>
                <div className="mt-1 flex justify-between gap-4"><span className="text-zinc-400">Share of max</span><span className="tabular-nums">{active.value === null ? "Unavailable" : percent(active.value)}</span></div>
                <div className="mt-2 text-zinc-400">Matrix maximum: {format(max)}</div>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <span>Hover or focus a cell for details</span>
            <div className="flex items-center gap-1" aria-label={`Intensity from zero to ${format(max)}`}>
              <span className="mr-1">0</span>
              {colors.map((color) => <span key={color} aria-hidden="true" className="size-3 rounded-sm" style={{ backgroundColor: color }} />)}
              <span className="ml-1">{format(max)}</span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}
