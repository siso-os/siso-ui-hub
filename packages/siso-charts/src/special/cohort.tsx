// uihub: siso:charts
import { SpecialFrame, type SisoSpecialChartProps } from './frame'
export interface SisoCohortDatum { id: string; label: string; size: number; retained: readonly (number | null)[] }
export interface SisoCohortHeatmapProps extends SisoSpecialChartProps { data: readonly SisoCohortDatum[]; periodLabel?: string; color?: string }
/** Cohort counts normalize against each cohort's starting population; null means unobserved. */
export function SisoCohortHeatmap({ data, periodLabel = 'Period', color = '#38bdf8', ...props }: SisoCohortHeatmapProps) {
  const rows = data.filter(d => Number.isFinite(d.size) && d.size > 0)
  const cols = Math.max(0,...rows.map(d => d.retained.length))
  const w = 440 / Math.max(1, cols), h = 250 / Math.max(1, rows.length)
  const value = (d: SisoCohortDatum, i: number) => { const n = d.retained[i]; return typeof n === 'number' && Number.isFinite(n) && n >= 0 && n <= d.size ? n / d.size : null }
  return <SpecialFrame title="Cohort retention" {...props} empty={!rows.length || !cols} summary={rows.map(d => `${d.label}, population ${d.size}: ${Array.from({length:cols},(_,i) => `${periodLabel} ${i}: ${value(d,i) === null ? 'unobserved or invalid' : `${Math.round(value(d,i)!*100)}%`}`).join(', ')}`).join('; ')}>
    {Array.from({length:cols},(_,i) => <text key={i} x={150+(i+.5)*w} y="16" textAnchor="middle" fill="currentColor" fontSize="11">{i}</text>)}
    {rows.map((d,r) => <g key={`${d.id}-${r}`}><text x="0" y={30+(r+.5)*h} fill="currentColor" fontSize="12">{d.label.slice(0,21)}</text>{Array.from({length:cols},(_,i) => { const v = value(d,i); return <g key={i}><title>{`${d.label}, ${periodLabel} ${i}: ${v === null ? 'No observed valid data' : `${d.retained[i]} of ${d.size}, ${Math.round(v*100)}%`}`}</title><rect x={150+i*w+1} y={25+r*h+1} width={Math.max(0,w-2)} height={Math.max(0,h-2)} fill={v === null ? 'currentColor' : color} opacity={v === null ? .05 : .12+v*.88} />{w>28 && h>20 && <text x={150+(i+.5)*w} y={30+(r+.5)*h} textAnchor="middle" fill="currentColor" fontSize="11">{v === null ? '–' : `${Math.round(v*100)}%`}</text>}</g> })}</g>)}
  </SpecialFrame>
}
