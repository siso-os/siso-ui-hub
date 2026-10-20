// uihub: siso:charts
// UI Arc's charts, ready for any host: each is wrapped in ArcScope, which brings Arc's own tokens (type, space, motion, neutrals) and lets the
// host's colour through, so bars and rings take the site colour instead of Arc's grey, and the headline text sits where Arc meant it to.
import type { CSSProperties, ComponentProps, ReactNode } from "react"
import { arcTokensCss } from "./tokens"
import { BarChart } from "./bar-chart/bar-chart"
import { LineChart } from "./line-chart/line-chart"
import { DonutChart } from "./donut-chart/donut-chart"
import { ActivityHeatmap } from "./activity-heatmap/activity-heatmap"
import { Sparkline } from "./sparkline/sparkline"
import { Gauge } from "./gauge/gauge"

export type ArcColorProps = {
  /** The series colour: any CSS colour or a var(--chart-1). Arc draws bars, lines, rings and heat in it. Defaults to the host's --chart-1. */
  color?: string
  className?: string
}

export function ArcScope({ color, className, children }: ArcColorProps & { children: ReactNode }) {
  const c = color ?? "var(--chart-1, oklch(60% .19 250))"
  const style = { "--accent": c, "--accent-strong": `color-mix(in oklab, ${c} 80%, black)`, "--accent-subtle": `color-mix(in oklab, ${c} 12%, transparent)`,
    "--accent-foreground": "white", "--siso-arc-color": c, "--series-1": chartVar(0), "--series-2": chartVar(1), "--series-3": chartVar(2), "--series-4": chartVar(3) } as CSSProperties
  return <div className={["siso-arc", className].filter(Boolean).join(" ")} style={style}>
    {/* React 19 hoists and de-duplicates a style with href + precedence */}
    <style href="siso-arc-tokens" precedence="default">{arcTokensCss}</style>
    {children}
  </div>
}
const wrap = <P extends object>(C: (p: P) => ReactNode) => (props: P & ArcColorProps) => {
  const { color, className, ...rest } = props as any
  return <ArcScope color={color} className={className}>{C(rest as P)}</ArcScope>
}
export const ArcBars = wrap(BarChart as (p: ComponentProps<typeof BarChart>) => ReactNode)
// Arc draws slices and lines it was not given a colour for in grey: here each takes the host's --chart-1..5 in turn
const chartVar = (i: number) => `var(--chart-${(i % 5) + 1}, oklch(${60 + (i % 3) * 8}% .19 ${(250 + i * 70) % 360}))`
const LineP = (p: ComponentProps<typeof LineChart>) => <LineChart {...p} series={p.series.map((x, i) => ({ ...x, color: x.color ?? chartVar(i) }))} />
const DonutP = (p: ComponentProps<typeof DonutChart>) => <DonutChart {...p} data={p.data.map((x, i) => ({ ...x, color: x.color ?? chartVar(i) }))} />
export const ArcLine = wrap(LineP)
export const ArcDonut = wrap(DonutP)
export const ArcHeatmap = wrap(ActivityHeatmap as (p: ComponentProps<typeof ActivityHeatmap>) => ReactNode)
export const ArcSparkline = wrap(Sparkline as (p: ComponentProps<typeof Sparkline>) => ReactNode)
export const ArcGauge = wrap(Gauge as (p: ComponentProps<typeof Gauge>) => ReactNode)

// The free Arc implementations, preserved with their own layout and motion.
import { Treemap } from "./treemap/treemap"
import { WaffleChart } from "./waffle-chart/waffle-chart"
import { SlopeChart } from "./slope-chart/slope-chart"
export const SisoInteractiveTreemap = wrap(Treemap)
export const SisoInteractiveWaffle = wrap(WaffleChart)
export const SisoInteractiveSlope = wrap(SlopeChart)
export { ArcBars as SisoInteractiveBars, ArcLine as SisoInteractiveLine, ArcDonut as SisoInteractiveDonut, ArcHeatmap as SisoInteractiveHeatmap, ArcSparkline as SisoInteractiveSparkline, ArcGauge as SisoInteractiveGauge }
export * from "./brush-chart/brush-chart";
export * from "./ridgeline/ridgeline";
export * from "./streamgraph/streamgraph";
export * from "./activity-heatmap/activity-heatmap";
export * from "./bar-chart/bar-chart";
export * from "./donut-chart/donut-chart";
export * from "./gauge/gauge";
export * from "./line-chart/line-chart";
export * from "./slope-chart/slope-chart";
export * from "./sparkline/sparkline";
export * from "./treemap/treemap";
export * from "./waffle-chart/waffle-chart";
