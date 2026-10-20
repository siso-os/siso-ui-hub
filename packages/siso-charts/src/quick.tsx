// uihub: siso:charts
// One-line charts with the options an agent changes most, built on the compound charts in ./charts. Each takes rows
// ({ month: "Jan", desktop: 342, ... }), the series keys, and options: palette (colour set), curve, fill, stack, tooltip.
// Anything these do not cover: drop to the compound API (SisoAreaChart.Area, .Tooltip, ...) in the same folder.
import type { ChartConfig } from "./ui/chart"
import { makeConfig, type PaletteName, type SeriesColor } from "./palettes"
import { SisoAreaChart } from "./charts/area-chart"
import { SisoBarChart } from "./charts/bar-chart"
import { SisoLineChart } from "./charts/line-chart"
import { SisoPieChart } from "./charts/pie-chart"
import { SisoRadialChart } from "./charts/radial-chart"
import { SisoRadarChart } from "./charts/radar-chart"

export type Row = Record<string, string | number>
export type Curve = "monotone" | "natural" | "bump" | "step" | "linear"
export type Fill = "gradient" | "gradient-reverse" | "solid" | "dotted" | "lines" | "hatched"
export type BarFill = "default" | "hatched" | "duotone" | "duotone-reverse" | "gradient" | "stripped"
export type Stroke = "solid" | "dashed" | "animated-dashed"
export type Tooltip = "default" | "frosted-glass"

type Base = {
  data: Row[]
  /** the series: one key per area, bar or line */
  keys: string[]
  /** the key that names each row (the x axis) */
  xKey: string
  palette?: PaletteName | SeriesColor[]
  labels?: Record<string, string>
  tooltip?: Tooltip
  legend?: boolean
  className?: string
  /** shorten the x tick, e.g. (v) => v.slice(0, 3) */
  formatX?: (v: string) => string
}

const frame = "h-full w-full p-4"
const cfg = (p: Base): ChartConfig => makeConfig(p.keys, p.palette ?? "ocean", p.labels)

export function SisoArea(p: Base & { curve?: Curve; fill?: Fill; stroke?: Stroke; stack?: "default" | "stacked" | "expanded"; dots?: boolean; grid?: boolean }) {
  const C: any = SisoAreaChart
  return (
    <C data={p.data} config={cfg(p)} className={p.className ?? frame} xDataKey={p.xKey} curveType={p.curve ?? "monotone"} stackType={p.stack ?? "default"}>
      {p.grid !== false && <C.Grid />}
      <C.XAxis dataKey={p.xKey} tickFormatter={p.formatX} />
      {p.legend !== false && <C.Legend isClickable />}
      <C.Tooltip variant={p.tooltip} />
      {p.keys.map((k) => (
        <C.Area key={k} dataKey={k} variant={p.fill ?? "gradient"} strokeVariant={p.stroke ?? "solid"} isClickable>
          {p.dots && <C.Dot variant="border" />}
          <C.ActiveDot variant="colored-border" />
        </C.Area>
      ))}
    </C>
  )
}

export function SisoBars(p: Base & { fill?: BarFill; stack?: "default" | "stacked" | "percent"; horizontal?: boolean; grid?: boolean; /** thin bars with wide gaps, like the shadcn dashboard's (Shaan: "I don't really like those big boxes") */ slim?: boolean }) {
  const C: any = SisoBarChart
  const Axis = p.horizontal ? C.YAxis : C.XAxis
  return (
    <C data={p.data} config={cfg(p)} className={p.className ?? frame} xDataKey={p.xKey} stackType={p.stack ?? "default"} layout={p.horizontal ? "horizontal" : "vertical"} barCategoryGap={p.slim ? 34 : undefined} barGap={p.slim ? 2 : undefined} barRadius={p.slim ? 2 : undefined}>
      {p.grid !== false && <C.Grid />}
      <Axis dataKey={p.xKey} tickFormatter={p.formatX} />
      {p.legend !== false && <C.Legend isClickable />}
      <C.Tooltip variant={p.tooltip} />
      {p.keys.map((k) => <C.Bar key={k} dataKey={k} variant={p.fill ?? "default"} isClickable barProps={p.slim ? { barSize: 14 } : undefined} />)}
    </C>
  )
}

export function SisoLine(p: Base & { curve?: Curve; stroke?: Stroke; dots?: boolean }) {
  const C: any = SisoLineChart
  return (
    <C data={p.data} config={cfg(p)} className={p.className ?? frame} xDataKey={p.xKey} curveType={p.curve ?? "monotone"}>
      <C.XAxis dataKey={p.xKey} tickFormatter={p.formatX} />
      {p.legend !== false && <C.Legend isClickable />}
      <C.Tooltip variant={p.tooltip} />
      {p.keys.map((k) => (
        <C.Line key={k} dataKey={k} strokeVariant={p.stroke ?? "solid"} isClickable>
          {p.dots && <C.Dot variant="border" />}
          <C.ActiveDot variant="colored-border" />
        </C.Line>
      ))}
    </C>
  )
}

type Slice = { data: Row[]; nameKey: string; valueKey: string; palette?: PaletteName | SeriesColor[]; tooltip?: Tooltip; legend?: boolean; className?: string }
const sliceCfg = (p: Slice) => makeConfig(p.data.map((r) => String(r[p.nameKey])), p.palette ?? "aurora")

/** Pie and donut are one chart: donut = true leaves a hole. */
export function SisoDonut(p: Slice & { donut?: boolean; hole?: number }) {
  const C: any = SisoPieChart
  return (
    <C className={p.className ?? frame} data={p.data} dataKey={p.valueKey} nameKey={p.nameKey} config={sliceCfg(p)}>
      {p.legend !== false && <C.Legend isClickable />}
      <C.Tooltip variant={p.tooltip} />
      <C.Pie isClickable innerRadius={p.donut === false ? 0 : (p.hole ?? 60)} />
    </C>
  )
}

/** Radial bars; semi = true draws the half circle. Rows are { name, value }. */
export function SisoRadial(p: Slice & { semi?: boolean }) {
  const C: any = SisoRadialChart
  return (
    <C className={p.className ?? frame} data={p.data} nameKey={p.nameKey} config={sliceCfg(p)} variant={p.semi ? "semi" : "full"}>
      {p.legend !== false && <C.Legend isClickable />}
      <C.Tooltip variant={p.tooltip} />
      <C.RadialBar dataKey={p.valueKey} isClickable />
    </C>
  )
}

export function SisoRadar(p: Base & { fill?: "filled" | "lines"; domain?: [number, number] }) {
  const C: any = SisoRadarChart
  return (
    <C data={p.data} config={cfg(p)} className={p.className ?? frame} chartProps={p.domain ? { outerRadius: "64%" } : undefined}>
      <C.PolarGrid />
      {p.domain && <C.PolarRadiusAxis domain={p.domain} />}
      <C.PolarAngleAxis dataKey={p.xKey} />
      {p.legend !== false && <C.Legend isClickable />}
      <C.Tooltip variant={p.tooltip} />
      {p.keys.map((k) => (
        <C.Radar key={k} dataKey={k} variant={p.fill ?? "filled"} isClickable>
          <C.Dot variant="colored-border" />
        </C.Radar>
      ))}
    </C>
  )
}
