// uihub: siso:charts
// Recoded from LiveDocs trend-card
"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { cn } from "../lib/utils"
import { chartTheme, createFormatter, type ChartSurface, type ValueFormat } from "../foundation"

export interface SisoTrendCardProps {
  title: string
  value: string | number
  delta?: string
  baseline?: string
  tone?: "up" | "down" | "neutral"
  data: Record<string, unknown>[]
  xDataKey?: string
  currentKey?: string
  compareKey?: string
  currentLabel?: string
  compareLabel?: string
  surface?: ChartSurface
  accent?: string
  valueFormat?: ValueFormat
  className?: string
}

/** HALO H6 headline: the header grows independently of the compact plot. */
export function SisoTrendCard({
  title, value, delta, baseline, tone = "neutral", data,
  xDataKey = "day", currentKey = "current", compareKey = "previous",
  currentLabel = "This week", compareLabel = "Last week",
  surface = "dark", accent, valueFormat = "number", className,
}: SisoTrendCardProps) {
  const theme = chartTheme(surface, accent)
  const format = createFormatter(valueFormat)
  const rows = data.map((row) => ({
    label: String(row[xDataKey] ?? ""),
    current: typeof row[currentKey] === "number" && Number.isFinite(row[currentKey]) ? row[currentKey] as number : null,
    previous: typeof row[compareKey] === "number" && Number.isFinite(row[compareKey]) ? row[compareKey] as number : null,
  }))
  const hasData = rows.some((row) => row.current !== null || row.previous !== null)
  const changeColor = tone === "up" ? (surface === "dark" ? "#4ade80" : "#15803d")
    : tone === "down" ? (surface === "dark" ? "#f87171" : "#b91c1c") : theme.muted

  return (
    <section className={cn("min-w-0 rounded-2xl border p-5", className)}
      style={{ background: theme.bg, color: theme.fg, borderColor: theme.border }} aria-label={title}>
      <header className="min-w-0 space-y-2">
        <h3 className="break-words text-sm font-medium leading-snug">{title}</h3>
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-2">
          <p className="min-w-0 max-w-full text-4xl font-semibold leading-tight tracking-tight tabular-nums [overflow-wrap:anywhere]">
            {typeof value === "number" ? format(value) : value}
          </p>
          {delta && <p className="max-w-full rounded-full border px-2 py-1 text-xs font-medium leading-normal tabular-nums [overflow-wrap:anywhere]"
            style={{ color: changeColor, borderColor: theme.border }}>{delta}</p>}
        </div>
        {baseline && <p className="break-words text-xs leading-relaxed tabular-nums" style={{ color: theme.muted }}>{baseline}</p>}
      </header>
      <div className="mt-4 h-28 min-w-0">
        {!hasData ? <p className="flex h-full items-center justify-center text-sm" style={{ color: theme.muted }}>No trend data</p> : (
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart data={rows} margin={{ top: 8, right: 8, bottom: 8, left: 8 }} accessibilityLayer>
              <XAxis dataKey="label" hide />
              <Tooltip cursor={{ stroke: theme.grid }} content={({ active, payload }) => {
                const row = payload?.[0]?.payload as (typeof rows)[number] | undefined
                if (!active || !row) return null
                return (
                  <div className="rounded-xl border px-3 py-2 text-xs shadow-lg" style={{ background: theme.tooltipBg, color: theme.fg, borderColor: theme.border }}>
                    <p className="mb-2 font-medium">{row.label}</p>
                    <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 tabular-nums">
                      <dt>{currentLabel}</dt><dd className="text-right">{row.current === null ? "—" : format(row.current)}</dd>
                      <dt>{compareLabel}</dt><dd className="text-right">{row.previous === null ? "—" : format(row.previous)}</dd>
                    </dl>
                  </div>
                )
              }} />
              <Line dataKey="previous" name={compareLabel} type="monotone" stroke={theme.muted} strokeDasharray="4 4"
                strokeWidth={2} dot={false} activeDot={{ r: 3 }} connectNulls={false} isAnimationActive={false} />
              <Line dataKey="current" name={currentLabel} type="monotone" stroke={theme.accent}
                strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} connectNulls={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2 text-xs" style={{ color: theme.muted }}>
        <span className="inline-flex items-center gap-2"><span className="w-4 border-t-2" style={{ borderColor: theme.accent }} aria-hidden />{currentLabel}</span>
        <span className="inline-flex items-center gap-2"><span className="w-4 border-t-2 border-dashed" aria-hidden />{compareLabel}</span>
      </div>
    </section>
  )
}
