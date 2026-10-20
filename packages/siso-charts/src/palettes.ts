// uihub: siso:charts
// Colour sets as options. A chart's colours are a ChartConfig entry per series ({ label, colors: { light, dark } }); one
// colour is a flat series, several make a gradient across the series (that is the "rainbow"). Pick a set by name, or pass
// your own list to makeConfig.
import type { ChartConfig } from "./ui/chart"

export type SeriesColor = { light: string[]; dark: string[] }

export const palettes = {
  // red/green pair: first series up, second down
  "green-red": [{ light: ["#047857"], dark: ["#10b981"] }, { light: ["#be123c"], dark: ["#f43f5e"] }],
  violet: [{ light: ["#6d28d9"], dark: ["#8b5cf6"] }, { light: ["#a21caf"], dark: ["#d946ef"] }, { light: ["#4338ca"], dark: ["#6366f1"] }],
  ocean: [{ light: ["#0369a1"], dark: ["#38bdf8"] }, { light: ["#0f766e"], dark: ["#2dd4bf"] }, { light: ["#1d4ed8"], dark: ["#60a5fa"] }],
  sunset: [{ light: ["#c2410c"], dark: ["#fb923c"] }, { light: ["#be123c"], dark: ["#fb7185"] }, { light: ["#a16207"], dark: ["#facc15"] }],
  // one gradient per series, across the whole spectrum
  rainbow: [
    { light: ["#e11d48", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"], dark: ["#fb7185", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"] },
    { light: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#e11d48"], dark: ["#a78bfa", "#60a5fa", "#34d399", "#fbbf24", "#fb7185"] },
  ],
  aurora: [
    { light: ["#0d9488", "#2563eb", "#7c3aed"], dark: ["#2dd4bf", "#60a5fa", "#a78bfa"] },
    { light: ["#db2777", "#ea580c", "#ca8a04"], dark: ["#f472b6", "#fb923c", "#facc15"] },
  ],
  mono: [{ light: ["#18181b"], dark: ["#fafafa"] }, { light: ["#71717a"], dark: ["#a1a1aa"] }, { light: ["#d4d4d8"], dark: ["#52525b"] }],
} satisfies Record<string, SeriesColor[]>

export type PaletteName = keyof typeof palettes

const title = (k: string) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/^./, (c) => c.toUpperCase())

/** Build the ChartConfig for the given series keys: a palette name (cycled over the keys) or your own list of colours. */
export function makeConfig(keys: string[], palette: PaletteName | SeriesColor[] = "ocean", labels: Record<string, string> = {}): ChartConfig {
  const set = typeof palette === "string" ? palettes[palette] : palette
  return Object.fromEntries(keys.map((k, i) => [k, { label: labels[k] ?? title(k), colors: set[i % set.length] }])) as ChartConfig
}
