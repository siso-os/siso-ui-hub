// uihub: siso:charts
import { useId, type ReactNode } from "react"

export interface SeriesFrameProps {
  title: string
  description?: string
  height?: number
  className?: string
  /** Accessible full values are also available in the expandable data table. */
  formatValue?: (value: number) => string
}
export const number = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value)
export const fmt = (value: number) => new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)
export const PLOT = { left: 72, right: 616, top: 20, bottom: 236, width: 544, height: 216 }
export const colors = { up: "var(--siso-chart-positive, #16a34a)", down: "var(--siso-chart-negative, #dc2626)", accent: "var(--siso-chart-accent, #6366f1)" }
/** Normalized before subtraction so finite extremes do not overflow the scale. */
export function scale(values: readonly number[], start: number, end: number, zero = false) {
  let low = zero ? 0 : Infinity, high = zero ? 0 : -Infinity
  for (const value of values) { low = Math.min(low, value); high = Math.max(high, value) }
  if (!Number.isFinite(low)) { low = 0; high = 1 }
  const magnitude = Math.max(Math.abs(low), Math.abs(high), 1)
  const a = low / magnitude, b = high / magnitude
  return { low, high, at: (value: number) => a === b ? (start + end) / 2 : start + ((value / magnitude - a) / (b - a)) * (end - start) }
}
export function Axes({ axis, format = fmt }: { axis: ReturnType<typeof scale>; format?: (n: number) => string }) {
  const ticks = axis.low === axis.high ? [axis.low] : [axis.low, axis.low / 2 + axis.high / 2, axis.high]
  return <g fontSize={12} fill="currentColor">{ticks.map((v, i) => <g key={i}>
    <line x1={PLOT.left} x2={PLOT.right} y1={axis.at(v)} y2={axis.at(v)} stroke="currentColor" opacity={0.13} />
    <text x={PLOT.left - 8} y={axis.at(v) + 4} textAnchor="end">{format(v)}</text>
  </g>)}</g>
}
export function CategoryLabels({ labels }: { labels: readonly string[] }) {
  const stride = Math.max(1, Math.ceil(labels.length / 7))
  return <g fontSize={12} fill="currentColor">{labels.map((label, i) => i % stride === 0 && <text key={i}
    x={PLOT.left + (i + .5) * PLOT.width / labels.length} y={260} textAnchor="middle"><title>{label}</title>{label.length > 12 ? `${label.slice(0, 11)}…` : label}</text>)}</g>
}
export function Frame({ title, description, height = 280, className, children, columns, rows, empty, invalid = 0, interactive = false }: SeriesFrameProps & {
  children: ReactNode; columns: string[]; rows: (string | number)[][]; empty?: string; invalid?: number; interactive?: boolean
}) {
  const id = useId()
  return <figure className={className} style={{ margin: 0, minWidth: 0, color: "var(--siso-chart-text, inherit)" }}>
    <figcaption id={id} style={{ fontWeight: 600 }}>{title}</figcaption>
    {description && <p style={{ fontSize: 13, margin: "4px 0 8px" }}>{description}</p>}
    {empty ? <p role="status">{empty}</p> : <svg viewBox="0 0 640 280" width="100%" height={number(height) && height > 0 ? height : 280}
      role={interactive ? "group" : "img"} aria-labelledby={id} style={{ display: "block", maxWidth: "100%" }}>{children}</svg>}
    {invalid > 0 && <p role="status" style={{ fontSize: 12 }}>{invalid} invalid {invalid === 1 ? "row" : "rows"} excluded.</p>}
    {rows.length > 0 && <details style={{ fontSize: 13 }}><summary>View data ({rows.length} rows)</summary>
      <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <caption style={{ textAlign: "left" }}>{title}</caption><thead><tr>{columns.map((v, i) => <th scope="col" key={i} style={{ padding: 6 }}>{v}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((value, j) => j === 0 ? <th scope="row" key={j} style={{ padding: 6 }}>{value}</th> : <td key={j} style={{ padding: 6 }}>{value}</td>)}</tr>)}</tbody>
      </table></div></details>}
  </figure>
}
