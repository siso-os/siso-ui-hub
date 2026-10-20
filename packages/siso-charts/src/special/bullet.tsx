// uihub: siso:charts
import { SpecialFrame, type SisoSpecialChartProps } from './frame'
export interface SisoBulletDatum { id: string; label: string; value: number; target: number; max: number; ranges?: readonly number[]; color?: string }
export interface SisoBulletChartProps extends SisoSpecialChartProps { data: readonly SisoBulletDatum[]; formatValue?: (value: number) => string }
/** Range bands, actual bar and target marker share each row's explicit nonnegative scale. */
export function SisoBulletChart({ data, formatValue = String, ...props }: SisoBulletChartProps) {
  const rows = data.filter(d => [d.value, d.target, d.max].every(Number.isFinite) && d.value >= 0 && d.target >= 0 && d.max > 0)
  const step = 260 / Math.max(1, rows.length)
  return <SpecialFrame title="Actual versus target" {...props} empty={!rows.length} summary={rows.map(d => `${d.label}: actual ${formatValue(d.value)}, target ${formatValue(d.target)}, scale maximum ${formatValue(d.max)}${d.value > d.max || d.target > d.max ? ', clipped to scale' : ''}`).join('; ')}>
    {rows.map((d, i) => { const y = 20 + i * step; const h = Math.min(34, step * .6); const scale = (v: number) => Math.min(d.max, Math.max(0, v)) / d.max * 400; const ranges = [...new Set([...(d.ranges || []).filter(v => Number.isFinite(v) && v > 0 && v < d.max), d.max])].sort((a,b) => b-a)
      return <g key={`${d.id}-${i}`}><title>{`${d.label}: ${formatValue(d.value)} / target ${formatValue(d.target)}`}</title><text x="0" y={y + h / 2 + 4} fill="currentColor" fontSize="12">{d.label.slice(0, 20)}</text>{ranges.map((r,j) => <rect key={r} x="160" y={y} width={scale(r)} height={h} fill="currentColor" opacity={.08 + j * .08} />)}<rect x="160" y={y + h * .3} width={scale(d.value)} height={h * .4} fill={d.color || '#38bdf8'} /><line x1={160 + scale(d.target)} x2={160 + scale(d.target)} y1={y - 3} y2={y + h + 3} stroke="currentColor" strokeWidth="2" /><text x="565" y={y + h / 2 + 4} fill="currentColor" fontSize="11">{formatValue(d.value).slice(0, 6)}</text></g>
    })}
  </SpecialFrame>
}
