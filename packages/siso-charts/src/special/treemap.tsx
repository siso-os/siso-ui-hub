// uihub: siso:charts
import { SpecialFrame, specialColors, type SisoSpecialChartProps } from './frame'
export interface SisoTreemapDatum { id: string; label: string; value: number; color?: string }
export interface SisoTreemapProps extends SisoSpecialChartProps { data: readonly SisoTreemapDatum[]; formatValue?: (value: number) => string }
/** Balanced binary treemap. Values are area weights; nonpositive/nonfinite rows are omitted. */
export function SisoTreemap({ data, formatValue = String, ...props }: SisoTreemapProps) {
  const rows = data.filter(d => Number.isFinite(d.value) && d.value > 0)
  const maximum = Math.max(0, ...rows.map(d => d.value))
  const weighted = rows.map((row, index) => ({ ...row, weight: row.value / maximum, index })).filter(row => row.weight > 0).sort((a, b) => b.weight - a.weight)
  const tiles: { row: typeof weighted[number]; x: number; y: number; w: number; h: number }[] = []
  function split(items: typeof weighted, x: number, y: number, w: number, h: number) {
    if (!items.length) return
    if (items.length === 1) { tiles.push({ row: items[0]!, x, y, w, h }); return }
    const total = items.reduce((sum, d) => sum + d.weight, 0)
    let at = 1, first = items[0]!.weight
    while (at < items.length - 1 && first + items[at]!.weight <= total / 2) first += items[at++]!.weight
    const ratio = first / total
    if (w >= h) { split(items.slice(0, at), x, y, w * ratio, h); split(items.slice(at), x + w * ratio, y, w * (1 - ratio), h) }
    else { split(items.slice(0, at), x, y, w, h * ratio); split(items.slice(at), x, y + h * ratio, w, h * (1 - ratio)) }
  }
  split(weighted, 0, 0, 600, 300)
  return <SpecialFrame title="Treemap" {...props} empty={!rows.length} summary={rows.map(d => `${d.label}: ${formatValue(d.value)}`).join('; ')}>
    {tiles.map(({ row, x, y, w, h }) => <g key={`${row.id}-${row.index}`}><title>{`${row.label}: ${formatValue(row.value)}`}</title><rect x={x + 1} y={y + 1} width={Math.max(0, w - 2)} height={Math.max(0, h - 2)} fill={row.color || specialColors[row.index % specialColors.length]} />{w > 75 && h > 42 && <text x={x + 9} y={y + 23} fill="#111827" fontSize="13">{row.label.slice(0, Math.max(1, Math.floor(w / 8) - 2))}<tspan x={x + 9} dy="18">{formatValue(row.value)}</tspan></text>}</g>)}
  </SpecialFrame>
}
