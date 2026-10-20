// uihub: siso:charts
// Goal ring: Tweenly's radial with the figure in the hole as "1,240 of 2,000" (M4 H4), drawn as an overlay so it is exact whatever the slices are.
"use client"
import { ChartRadial } from "./radial"

export function SisoGoalRing({ value, goal, label = "of", size = 220, surface = "dark", className }: { value: number; goal: number; label?: string; size?: number; surface?: "dark" | "light"; className?: string }) {
  const n = (v: number) => v.toLocaleString("en-US")
  const data = [{ name: "Done", value }, { name: "Left", value: Math.max(0, goal - value) }]
  return (
    <div className={className} style={{ position: "relative", width: size, margin: "0 auto" }}>
      <ChartRadial data={data} nameKey="name" valueKey="value" center="none" showLabels="none" showLegend={false} innerRadius={0.74} size={size} surface={surface} bare />
      <div style={{ position: "absolute", inset: 0, height: size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ fontSize: size * 0.17, fontWeight: 700, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{n(value)}</div>
        <div style={{ fontSize: size * 0.07, opacity: 0.6, marginTop: 4 }}>{label} {n(goal)}</div>
      </div>
    </div>
  )
}
