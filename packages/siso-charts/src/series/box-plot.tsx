// uihub: siso:charts
import { Axes, CategoryLabels, colors, fmt, Frame, number, PLOT, scale, type SeriesFrameProps } from "./frame"
export interface SisoBoxDatum { label: string; low: number; q1: number; median: number; q3: number; high: number; outliers?: readonly number[] }
export interface SisoBoxPlotProps extends SeriesFrameProps { /** Precomputed five-number summaries; no quartile algorithm is silently chosen. */ data: readonly SisoBoxDatum[]; showOutliers?: boolean }
export function SisoBoxPlot({ data, showOutliers = true, formatValue = fmt, ...frame }: SisoBoxPlotProps) {
  const rows = data.filter(p => [p.low, p.q1, p.median, p.q3, p.high].every(number) && p.low <= p.q1 && p.q1 <= p.median && p.median <= p.q3 && p.q3 <= p.high && (p.outliers ?? []).every(number))
  const sy = scale(rows.flatMap(p => [p.low, p.high, ...(showOutliers ? p.outliers ?? [] : [])]), PLOT.bottom, PLOT.top)
  const step = PLOT.width / Math.max(1, rows.length), width = Math.min(52, step * .55)
  return <Frame {...frame} invalid={data.length - rows.length} empty={!rows.length ? "No valid distribution data" : undefined}
    columns={["Distribution", "Low whisker", "Q1", "Median", "Q3", "High whisker", "Outliers"]}
    rows={rows.map(p => [p.label, ...[p.low, p.q1, p.median, p.q3, p.high].map(formatValue), (p.outliers ?? []).map(formatValue).join(", ")])}>
    <Axes axis={sy} format={formatValue} /><CategoryLabels labels={rows.map(p => p.label)} />
    {rows.map((p, i) => {
      const x = PLOT.left + (i + .5) * step
      return <g key={i} stroke={colors.accent} strokeWidth={1.5}><title>{`${p.label}: low ${formatValue(p.low)}, Q1 ${formatValue(p.q1)}, median ${formatValue(p.median)}, Q3 ${formatValue(p.q3)}, high ${formatValue(p.high)}`}</title>
        <line x1={x} x2={x} y1={sy.at(p.low)} y2={sy.at(p.high)} />
        {[p.low, p.high].map((n, j) => <line key={j} x1={x - width / 4} x2={x + width / 4} y1={sy.at(n)} y2={sy.at(n)} />)}
        <rect x={x - width / 2} y={sy.at(p.q3)} width={width} height={Math.max(1, sy.at(p.q1) - sy.at(p.q3))} fill={colors.accent} fillOpacity={.25} />
        <line x1={x - width / 2} x2={x + width / 2} y1={sy.at(p.median)} y2={sy.at(p.median)} strokeWidth={3} />
        {showOutliers && p.outliers?.map((n, j) => <circle key={j} cx={x} cy={sy.at(n)} r={3} fill="none"><title>{`Outlier: ${formatValue(n)}`}</title></circle>)}
      </g>
    })}
  </Frame>
}
