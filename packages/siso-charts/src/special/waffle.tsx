// uihub: siso:charts
import { SpecialFrame, specialColors, type SisoSpecialChartProps } from './frame'
export interface SisoWaffleDatum { id: string; label: string; value: number; color?: string }
export interface SisoWaffleChartProps extends SisoSpecialChartProps { data: readonly SisoWaffleDatum[]; columns?: number; cells?: number }
/** Largest-remainder allocation fills exactly the requested number of cells. */
export function SisoWaffleChart({ data, columns = 20, cells = 100, ...props }: SisoWaffleChartProps) {
  const rows = data.filter(d => Number.isFinite(d.value) && d.value > 0)
  const count = Number.isFinite(cells) ? Math.max(1, Math.min(1000, Math.floor(cells))) : 100
  const cols = Number.isFinite(columns) ? Math.max(1, Math.min(count, Math.floor(columns))) : 20
  const maximum = Math.max(0, ...rows.map(d => d.value))
  const total = rows.reduce((s,d) => s + d.value / maximum, 0)
  const allocations = rows.map((d,i) => { const exact = d.value / maximum / total * count; return { d, i, n: Math.floor(exact), remainder: exact % 1 } })
  const ranked = [...allocations].sort((a,b) => b.remainder - a.remainder || a.i-b.i)
  const left = rows.length ? count - allocations.reduce((s,a) => s+a.n, 0) : 0
  for (let i=0; i<left; i++) ranked[i]!.n++
  const units = allocations.flatMap(a => Array.from({ length: a.n }, () => a))
  const h = 260 / Math.max(1, Math.ceil(count / cols)), w = 600 / cols
  return <SpecialFrame title="Proportional waffle chart" {...props} empty={!rows.length} summary={allocations.map(a => `${a.d.label}: ${a.d.value}, ${a.n} of ${count} cells`).join('; ')}>
    {units.map((a,i) => <rect key={i} x={i % cols * w + 1} y={Math.floor(i / cols) * h + 1} width={Math.max(0,w-2)} height={Math.max(0,h-2)} rx="2" fill={a.d.color || specialColors[a.i % specialColors.length]}><title>{`${a.d.label}: ${a.d.value}`}</title></rect>)}
  </SpecialFrame>
}
