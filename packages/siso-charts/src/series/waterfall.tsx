// uihub: siso:charts
import { Axes, CategoryLabels, colors, fmt, Frame, number, PLOT, scale, type SeriesFrameProps } from "./frame"
export interface SisoWaterfallDatum { label: string; /** delta adds to the running total; total sets an explicit absolute checkpoint. */ kind?: "delta" | "total"; value: number }
export interface SisoWaterfallProps extends SeriesFrameProps { data: readonly SisoWaterfallDatum[]; initialValue?: number; connectors?: boolean }
export function SisoWaterfall({ data, initialValue = 0, connectors = true, formatValue = fmt, ...frame }: SisoWaterfallProps) {
  let balance = initialValue
  let invalid = !number(initialValue)
  const rows = data.map(p => {
    const start = p.kind === "total" ? 0 : balance
    const end = p.kind === "total" ? p.value : balance + p.value
    if (!number(p.value) || !number(end) || (p.kind !== undefined && p.kind !== "delta" && p.kind !== "total")) invalid = true
    balance = end
    return { ...p, start, end }
  })
  // Excluding a change would make every following balance false: reject the entire bridge.
  const valid = invalid ? [] : rows
  const sy = scale(valid.flatMap(p => [p.start, p.end]), PLOT.bottom, PLOT.top, true)
  const step = PLOT.width / Math.max(1, valid.length), width = step * .66
  return <Frame {...frame} empty={invalid ? "Invalid waterfall data: all changes and the initial balance must be finite." : !rows.length ? "No waterfall data" : undefined}
    columns={["Step", "Kind", "Value", "Start", "End"]} rows={valid.map(p => [p.label, p.kind ?? "delta", formatValue(p.value), formatValue(p.start), formatValue(p.end)])}>
    <Axes axis={sy} format={formatValue} /><CategoryLabels labels={valid.map(p => p.label)} />
    {valid.map((p, i) => {
      const x = PLOT.left + i * step + (step - width) / 2
      const label = `${p.label}: ${p.kind === "total" ? "total" : "change"} ${formatValue(p.value)}, balance ${formatValue(p.end)}`
      return <g key={i}><title>{label}</title>
        {connectors && i < valid.length - 1 && <line x1={x + width} x2={x + step} y1={sy.at(p.end)} y2={sy.at(p.end)} stroke="currentColor" strokeDasharray="3 3" opacity={.4} />}
        <rect x={x} y={Math.min(sy.at(p.start), sy.at(p.end))} width={width} height={Math.max(1, Math.abs(sy.at(p.start) - sy.at(p.end)))}
          fill={p.kind === "total" ? colors.accent : p.value < 0 ? colors.down : colors.up} />
      </g>
    })}
  </Frame>
}
