// uihub: siso:charts
// Recoded from LiveDocs range-chart
"use client"

import { useId } from "react"
import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "../lib/utils"
import { chartTheme, createFormatter, type ChartSurface, type ValueFormat } from "../foundation"

export interface SisoRangeAreaProps {
  data: Record<string, unknown>[]
  title?: string
  description?: string
  xDataKey?: string
  lowKey?: string
  highKey?: string
  /** Set to null to omit the mid line. Missing values leave gaps. */
  midKey?: string | null
  midLabel?: string
  surface?: ChartSurface
  accent?: string
  valueFormat?: ValueFormat
  height?: number
  className?: string
}

export function SisoRangeArea({
  data, title = "Forecast range", description, xDataKey = "month",
  lowKey = "low", highKey = "high", midKey = "value", midLabel = "Actual",
  surface = "dark", accent, valueFormat = "number", height = 240, className,
}: SisoRangeAreaProps) {
  const id = useId().replace(/:/g, "")
  const theme = chartTheme(surface, accent)
  const format = createFormatter(valueFormat)
  const rows = data.map((row) => {
    const low = row[lowKey]
    const high = row[highKey]
    const mid = midKey ? row[midKey] : undefined
    const valid = typeof low === "number" && Number.isFinite(low)
      && typeof high === "number" && Number.isFinite(high) && low <= high
    return {
      label: String(row[xDataKey] ?? ""),
      range: valid ? [low, high] : null,
      mid: typeof mid === "number" && Number.isFinite(mid) ? mid : null,
    }
  })
  const hasRange = rows.some((row) => row.range !== null)

  return (
    <section className={cn("min-w-0 rounded-2xl border p-5", className)}
      style={{ background: theme.bg, color: theme.fg, borderColor: theme.border }} aria-label={title}>
      <h3 className="break-words text-sm font-medium">{title}</h3>
      {description && <p className="mt-1 break-words text-xs" style={{ color: theme.muted }}>{description}</p>}
      <div className="mt-4 min-w-0" style={{ height }}>
        {!hasRange ? <p className="flex h-full items-center justify-center text-sm" style={{ color: theme.muted }}>No range data</p> : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <ComposedChart data={rows} margin={{ top: 10, right: 12, bottom: 0, left: 0 }} accessibilityLayer>
              <defs>
                <linearGradient id={`${id}-range`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.accent} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={theme.accent} stopOpacity={0.08} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke={theme.grid} strokeDasharray="3 3" />
              <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} tick={{ fill: theme.muted, fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} width={52} tickFormatter={format} tick={{ fill: theme.muted, fontSize: 11 }} domain={["auto", "auto"]} />
              <Tooltip cursor={{ stroke: theme.muted, strokeDasharray: "3 3" }} content={({ active, payload }) => {
                const row = payload?.[0]?.payload as (typeof rows)[number] | undefined
                if (!active || !row?.range) return null
                const [low, high] = row.range
                return (
                  <div className="rounded-xl border px-3 py-2 text-xs shadow-lg" style={{ background: theme.tooltipBg, color: theme.fg, borderColor: theme.border }}>
                    <p className="mb-2 font-medium">{row.label}</p>
                    <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 tabular-nums">
                      <dt>Low</dt><dd className="text-right">{format(low)}</dd>
                      <dt>High</dt><dd className="text-right">{format(high)}</dd>
                      <dt>Spread</dt><dd className="text-right">{format(high - low)}</dd>
                      {midKey && row.mid !== null && <><dt>{midLabel}</dt><dd className="text-right">{format(row.mid)}</dd></>}
                    </dl>
                  </div>
                )
              }} />
              {/* A tuple draws the actual interval, including ranges below zero. */}
              <Area dataKey="range" name="Range" type="monotone" stroke={theme.accent} strokeOpacity={0.5}
                fill={`url(#${id}-range)`} fillOpacity={1} activeDot={false} connectNulls={false} isAnimationActive={false} />
              {midKey && <Line dataKey="mid" name={midLabel} type="monotone" stroke={theme.accent} strokeWidth={2.25}
                dot={false} activeDot={{ r: 4 }} connectNulls={false} isAnimationActive={false} />}
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: theme.muted }}>
        <span className="inline-flex items-center gap-2"><span className="h-2 w-4 rounded-sm" style={{ background: theme.accent, opacity: 0.4 }} aria-hidden />Low–high range</span>
        {midKey && <span className="inline-flex items-center gap-2"><span className="h-0.5 w-4" style={{ background: theme.accent }} aria-hidden />{midLabel}</span>}
      </div>
    </section>
  )
}
