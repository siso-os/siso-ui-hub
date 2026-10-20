// uihub: siso:charts
// Recoded from LiveDocs funnel-chart
"use client"

import { useId, useState } from "react"
import { cn } from "../lib/utils"

interface SisoFunnelProps {
  stages: { name: string; value: number }[]
  palette?: string[]
  className?: string
}

const COLORS = ["#818cf8", "#38bdf8", "#2dd4bf", "#a3e635", "#fbbf24"]
const valid = (value: number) => Number.isFinite(value) && value >= 0
const count = (value: number) => valid(value) ? value.toLocaleString("en-US") : "—"
const percent = (value: number, baseline: number) => {
  const result = value / baseline * 100
  return valid(value) && valid(baseline) && baseline > 0 && Number.isFinite(result)
    ? `${Number(result.toFixed(1))}%` : "—"
}

export function SisoFunnel({ stages, palette, className }: SisoFunnelProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const [dismissed, setDismissed] = useState(false)
  const active = dismissed ? null : hovered ?? focused
  const first = stages[0]?.value ?? 0
  const max = stages.reduce((highest, stage) => valid(stage.value) ? Math.max(highest, stage.value) : highest, 0)
  const colors = palette?.length ? palette : COLORS
  const step = 1000 / Math.max(1, stages.length)
  const proportions = [...stages.map((stage) => stage.value), stages.at(-1)?.value ?? 0]
    .map((value) => valid(value) && max > 0 ? value / max : 0)
  const rows = stages.map((stage, index) => {
    const previous = stages[index - 1]?.value
    const difference = previous !== undefined && valid(previous) && valid(stage.value) ? previous - stage.value : null
    const change = difference === null ? (index === 0 ? "First stage" : "Unavailable")
      : `${count(Math.abs(difference))} (${percent(Math.abs(difference), previous!)}) ${difference < 0 ? "increase" : "drop-off"}`
    return { ...stage, share: percent(stage.value, first), change }
  })

  // The LiveDocs flow uses matching cubic curves above and below its centre.
  const flow = (halo: number) => {
    const top = (index: number) => 112 - proportions[index] * (86 + halo)
    const bottom = (index: number) => 112 + proportions[index] * (86 + halo)
    let path = `M0 ${top(0)}`
    for (let index = 0; index < stages.length; index++) {
      path += `C${(index + 1 / 3) * step} ${top(index)} ${(index + 2 / 3) * step} ${top(index + 1)} ${(index + 1) * step} ${top(index + 1)}`
    }
    path += `L1000 ${bottom(stages.length)}`
    for (let index = stages.length - 1; index >= 0; index--) {
      path += `C${(index + 2 / 3) * step} ${bottom(index + 1)} ${(index + 1 / 3) * step} ${bottom(index)} ${index * step} ${bottom(index)}`
    }
    return `${path}Z`
  }
  const paths = [flow(16), flow(8), flow(0)]
  const selected = active === null ? undefined : rows[active]

  return (
    <section aria-label="Conversion funnel" className={cn("w-full min-w-0 text-foreground", className)}>
      {!stages.length ? <p role="status" className="py-12 text-center text-sm text-muted-foreground">No funnel data available</p> : (
        <>
          <div className="overflow-x-auto p-1">
            <div className="relative" style={{ minWidth: Math.max(360, stages.length * 140) }}>
              <svg viewBox="0 0 1000 224" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none absolute top-12 h-56 w-full">
                <defs>
                  {stages.map((_, index) => (
                    <clipPath id={`${id}-${index}`} key={index}><rect x={index * step} width={step} height={224} /></clipPath>
                  ))}
                </defs>
                {stages.map((_, index) => (
                  <g key={index} clipPath={`url(#${id}-${index})`} fill={colors[index % colors.length]} opacity={active !== null && active !== index ? 0.45 : 1}>
                    {paths.map((path, layer) => <path key={layer} d={path} fillOpacity={[0.08, 0.16, 0.8][layer]} />)}
                  </g>
                ))}
              </svg>
              <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
                {rows.map((stage, index) => (
                  <li key={index} className="min-w-0">
                    <button type="button"
                      className="grid w-full grid-rows-[48px_224px_auto] rounded-lg text-center outline-none hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`${stage.name}: ${count(stage.value)}, ${stage.share} of first stage, ${stage.change}`}
                      aria-describedby={active === index ? `${id}-tooltip` : undefined}
                      onMouseEnter={() => { setHovered(index); setDismissed(false) }}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => { setFocused(index); setDismissed(false) }}
                      onBlur={() => setFocused(null)}
                      onClick={() => { setFocused(index); setDismissed(false) }}
                      onKeyDown={(event) => { if (event.key === "Escape") setDismissed(true) }}>
                      <span className="self-center px-2 text-lg font-semibold tabular-nums">{count(stage.value)}</span>
                      <span className="flex items-center justify-center"><span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold tabular-nums">{stage.share}</span></span>
                      <span className="px-2 py-3 text-sm">
                        <span className="block break-words font-medium">{stage.name}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{stage.change}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-3 min-h-28">
            {selected ? (
              <div id={`${id}-tooltip`} role="tooltip" className="rounded-lg border border-border bg-popover p-3 text-sm text-popover-foreground shadow-sm">
                <p className="mb-2 font-medium">{selected.name}</p>
                <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 tabular-nums">
                  <dt className="text-muted-foreground">Count</dt><dd className="text-right">{count(selected.value)}</dd>
                  <dt className="text-muted-foreground">Of first stage</dt><dd className="text-right">{selected.share}</dd>
                  <dt className="text-muted-foreground">From previous stage</dt><dd className="text-right">{selected.change}</dd>
                </dl>
              </div>
            ) : <p className="text-xs text-muted-foreground">Percentages compare with the first stage. Hover or focus a stage for details.</p>}
          </div>
        </>
      )}
    </section>
  )
}
