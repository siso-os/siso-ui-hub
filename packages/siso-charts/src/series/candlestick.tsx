// uihub: siso:charts
import { Axes, CategoryLabels, colors, fmt, Frame, number, PLOT, scale, type SeriesFrameProps } from "./frame"
export interface SisoCandle { label: string; open: number; high: number; low: number; close: number }
export interface SisoCandlestickProps extends SeriesFrameProps { data: readonly SisoCandle[]; variant?: "filled" | "hollow" | "ohlc" }
/** Ordered categorical OHLC observations; the caller supplies interval labels and aggregation. */
export function SisoCandlestick({ data, variant = "filled", formatValue = fmt, ...frame }: SisoCandlestickProps) {
  const rows = data.filter(p => [p.open, p.high, p.low, p.close].every(number) && p.low <= Math.min(p.open, p.close) && p.high >= Math.max(p.open, p.close))
  const sy = scale(rows.flatMap(p => [p.low, p.high]), PLOT.bottom, PLOT.top)
  const step = PLOT.width / Math.max(1, rows.length), width = Math.min(26, step * .6)
  return <Frame {...frame} invalid={data.length - rows.length} empty={!rows.length ? "No valid OHLC data" : undefined}
    columns={["Interval", "Open", "High", "Low", "Close"]} rows={rows.map(p => [p.label, ...[p.open, p.high, p.low, p.close].map(formatValue)])}>
    <Axes axis={sy} format={formatValue} /><CategoryLabels labels={rows.map(p => p.label)} />
    {rows.map((p, i) => {
      const x = PLOT.left + (i + .5) * step, up = p.close >= p.open
      const color = up ? colors.up : colors.down
      return <g key={i} stroke={color} strokeWidth={1.5}><title>{`${p.label}: open ${formatValue(p.open)}, high ${formatValue(p.high)}, low ${formatValue(p.low)}, close ${formatValue(p.close)}`}</title>
        <line x1={x} x2={x} y1={sy.at(p.high)} y2={sy.at(p.low)} />
        {variant === "ohlc" ? <><line x1={x - width / 2} x2={x} y1={sy.at(p.open)} y2={sy.at(p.open)} /><line x1={x} x2={x + width / 2} y1={sy.at(p.close)} y2={sy.at(p.close)} /></>
          : <rect x={x - width / 2} y={Math.min(sy.at(p.open), sy.at(p.close))} width={width} height={Math.max(1, Math.abs(sy.at(p.open) - sy.at(p.close)))} fill={variant === "hollow" && up ? "none" : color} />}
      </g>
    })}
  </Frame>
}
