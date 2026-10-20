// uihub: siso:charts
// Independently authored SISO chart theme/formatting contract. No registry implementation.
export type ChartSurface = "dark" | "light"
export type ValueFormat = "number" | "compact" | "percent" | "currency" | ((value: number) => string)
export function chartTheme(surface: ChartSurface = "dark", accent = "var(--siso-accent, #ffa726)") {
  const light = surface === "light"
  return { accent,
    bg: light ? "#fbfaf7" : "var(--siso-panel, #202020)",
    fg: light ? "#171715" : "var(--siso-foreground, #e0e0e0)",
    muted: light ? "#66635c" : "var(--siso-muted, #9e9e9e)",
    border: light ? "#d8d5cc" : "var(--siso-line, #3a3a3a)",
    grid: light ? "#dedbd3" : "#343431", tooltipBg: light ? "#ffffff" : "#2a2a2a",
  }
}
export function createFormatter(mode: ValueFormat = "number"): (value: number) => string {
  if (typeof mode === "function") return mode
  const options: Intl.NumberFormatOptions = mode === "currency" ? { style: "currency", currency: "USD", maximumFractionDigits: 2 }
    : mode === "percent" ? { style: "percent", maximumFractionDigits: 1 }
    : mode === "compact" ? { notation: "compact", maximumFractionDigits: 1 } : { maximumFractionDigits: 2 }
  const format = new Intl.NumberFormat("en-US", options)
  return (value) => Number.isFinite(value) ? format.format(value) : "—"
}
