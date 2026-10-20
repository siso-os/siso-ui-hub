// uihub: siso:charts
import { SpecialFrame, specialColors, type SisoSpecialChartProps } from './frame'
export interface SisoSlopeDatum { id: string; label: string; before: number; after: number; color?: string }
export interface SisoSlopeChartProps extends SisoSpecialChartProps { data: readonly SisoSlopeDatum[]; beforeLabel?: string; afterLabel?: string; formatValue?: (value: number) => string }
export function SisoSlopeChart({ data, beforeLabel = 'Before', afterLabel = 'After', formatValue = String, ...props }: SisoSlopeChartProps) {
  const rows = data.filter(d => Number.isFinite(d.before) && Number.isFinite(d.after))
  // Normalize first so large finite magnitudes cannot overflow the shared domain span.
  const magnitude = Math.max(1, ...rows.flatMap(d => [Math.abs(d.before), Math.abs(d.after)]))
  const values = rows.flatMap(d => [d.before / magnitude, d.after / magnitude])
  const min = Math.min(0,...values), max = Math.max(0,...values)
  const y = (n: number) => max === min ? 150 : 265 - (n / magnitude - min) / (max-min) * 220
  return <SpecialFrame title="Slope comparison" {...props} empty={!rows.length} summary={rows.map(d => `${d.label}: ${beforeLabel} ${formatValue(d.before)}, ${afterLabel} ${formatValue(d.after)}`).join('; ')}>
    <text x="160" y="20" textAnchor="middle" fill="currentColor" fontSize="13">{beforeLabel}</text><text x="440" y="20" textAnchor="middle" fill="currentColor" fontSize="13">{afterLabel}</text>
    {[160,440].map(x => <line key={x} x1={x} x2={x} y1="35" y2="280" stroke="currentColor" opacity=".2" />)}
    {rows.map((d,i) => <g key={`${d.id}-${i}`}><title>{`${d.label}: ${formatValue(d.before)} → ${formatValue(d.after)}`}</title><line x1="160" y1={y(d.before)} x2="440" y2={y(d.after)} stroke={d.color || specialColors[i % specialColors.length]} strokeWidth="3" />{[d.before,d.after].map((n,j) => <circle key={j} cx={j ? 440 : 160} cy={y(n)} r="4" fill={d.color || specialColors[i % specialColors.length]} />)}<text x="152" y={y(d.before)-7} textAnchor="end" fill="currentColor" fontSize="11">{d.label.slice(0,14)} {formatValue(d.before).slice(0,8)}</text><text x="448" y={y(d.after)+4} fill="currentColor" fontSize="11">{formatValue(d.after).slice(0,14)}</text></g>)}
  </SpecialFrame>
}
