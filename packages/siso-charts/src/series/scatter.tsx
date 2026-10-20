// uihub: siso:charts
"use client"
import { Axes, colors, fmt, Frame, number, PLOT, scale, type SeriesFrameProps } from "./frame"

export interface SisoScatterPoint { id: string; label: string; x: number; y: number; /** Bubble area, not radius; nonnegative. */ size?: number; group?: string }
export interface SisoScatterProps extends SeriesFrameProps {
  data: readonly SisoScatterPoint[]
  bubble?: boolean
  xLabel?: string
  yLabel?: string
  groupColors?: Readonly<Record<string, string>>
  /** Explicit quadrant reference values. No statistical cutoffs are invented. */
  reference?: { x?: number; y?: number }
  selectedId?: string | null
  onSelect?: (id: string) => void
}
/** Numeric XY scatter; bubble mode maps the supplied size to circle area. */
export function SisoScatter({ data, bubble = false, xLabel = "X", yLabel = "Y", groupColors, reference, selectedId, onSelect, formatValue = fmt, ...frame }: SisoScatterProps) {
  const ids = new Set<string>()
  const rows = data.filter(p => {
    if (!p.id || ids.has(p.id) || !number(p.x) || !number(p.y) || (bubble && (!number(p.size) || p.size < 0))) return false
    ids.add(p.id); return true
  })
  const sx = scale(rows.map(p => p.x), PLOT.left + 18, PLOT.right - 18)
  const sy = scale(rows.map(p => p.y), PLOT.bottom - 18, PLOT.top + 18)
  const maxSize = rows.reduce((max, p) => Math.max(max, p.size ?? 0), 0)
  const groups = [...new Set(rows.map(p => p.group).filter((g): g is string => g !== undefined))]
  const palette = [colors.accent, "#0891b2", "#a16207", "#db2777", "#0d9488", "#7c3aed"]
  const colorFor = (group?: string) => groupColors?.[group ?? ""] ?? palette[Math.max(0, groups.indexOf(group ?? "")) % palette.length]
  return <><Frame interactive={Boolean(onSelect)} {...frame} invalid={data.length - rows.length} empty={!rows.length ? "No valid scatter data" : undefined}
    columns={["Point", xLabel, yLabel, ...(bubble ? ["Size"] : []), "Group"]}
    rows={rows.map(p => [p.label, formatValue(p.x), formatValue(p.y), ...(bubble ? [formatValue(p.size!)] : []), p.group ?? ""])}>
    <Axes axis={sy} format={formatValue} />
    <g fontSize={12} fill="currentColor">{(sx.low === sx.high ? [sx.low] : [sx.low, sx.high]).map((n, i) => <text key={i} x={sx.at(n)} y={258} textAnchor="middle">{formatValue(n)}</text>)}
      <text x={344} y={278} textAnchor="middle">{xLabel}</text><text x={PLOT.left} y={12}>{yLabel}</text></g>
    {number(reference?.x) && reference.x >= sx.low && reference.x <= sx.high && <line x1={sx.at(reference.x)} x2={sx.at(reference.x)} y1={PLOT.top} y2={PLOT.bottom} stroke="currentColor" strokeDasharray="4 4" opacity={.4} />}
    {number(reference?.y) && reference.y >= sy.low && reference.y <= sy.high && <line x1={PLOT.left} x2={PLOT.right} y1={sy.at(reference.y)} y2={sy.at(reference.y)} stroke="currentColor" strokeDasharray="4 4" opacity={.4} />}
    {rows.map(p => {
      const label = `${p.label}: ${xLabel} ${formatValue(p.x)}, ${yLabel} ${formatValue(p.y)}${bubble ? `, size ${formatValue(p.size!)}` : ""}${p.group ? `, ${p.group}` : ""}`
      return <circle key={p.id} cx={sx.at(p.x)} cy={sy.at(p.y)} r={bubble ? (maxSize ? 16 * Math.sqrt(p.size! / maxSize) : 0) : 5}
        fill={colorFor(p.group)} fillOpacity={.65} stroke="currentColor" strokeWidth={selectedId === p.id ? 3 : .75}
        role={onSelect ? "button" : undefined} tabIndex={onSelect ? 0 : undefined} aria-label={label} aria-pressed={onSelect ? selectedId === p.id : undefined}
        onClick={onSelect ? () => onSelect(p.id) : undefined} onKeyDown={onSelect ? e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(p.id) } } : undefined}><title>{label}</title></circle>
    })}
  </Frame>{groups.length > 0 && <ul aria-label="Series legend" style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingLeft: 20, fontSize: 12 }}>{groups.map(group => <li key={group} style={{ color: colorFor(group) }}>{group}</li>)}</ul>}</>
}
