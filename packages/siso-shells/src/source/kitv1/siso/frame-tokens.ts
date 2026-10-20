// The app frame's tokens: colour schemes, surface (matte or glass), font and radius, as CSS variables on one box.
// Shaan, 15 Oct: "tokenise everything, the fonts, the text, the colours ... preset colour schemes, so you've got like
// background colours, secondary colours, primary colours, accent colours, glassy feel, matte feel ... so it's proper
// tweakable". A scheme is a primary, a second colour and a tint for the surfaces; the surfaces are worked out from the
// tint for dark and light, so every scheme works in both.
import type { CSSProperties } from "react"

export type Scheme = { id: string; name: string; primary: string; second: string; hue: number; tint: number; ink?: string }
export const SCHEMES: Scheme[] = [
  { id: "siso", name: "SISO", primary: "#f97316", second: "#ef4444", hue: 70, tint: 0.006 },
  { id: "halo", name: "Violet", primary: "#a855f7", second: "#ec4899", hue: 300, tint: 0.02 },
  { id: "ocean", name: "Ocean", primary: "#3b82f6", second: "#06b6d4", hue: 250, tint: 0.022 },
  { id: "midnight", name: "Midnight", primary: "#6366f1", second: "#22d3ee", hue: 275, tint: 0.04 },
  { id: "forest", name: "Forest", primary: "#22c55e", second: "#84cc16", hue: 150, tint: 0.02 },
  { id: "rose", name: "Rose", primary: "#f43f5e", second: "#fb923c", hue: 15, tint: 0.02 },
  { id: "sand", name: "Sand", primary: "#d97706", second: "#a16207", hue: 80, tint: 0.025 },
  { id: "mono", name: "Mono", primary: "#e4e4e7", second: "#71717a", hue: 0, tint: 0, ink: "#09090b" },
]
export const SURFACES: [string, string][] = [["matte", "Matte"], ["glass", "Glass"]]
export const FONTS: [string, string, string][] = [
  ["geist", "Geist", `"Geist Sans", "Geist", ui-sans-serif, system-ui, sans-serif`],
  ["system", "System", `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`],
  ["serif", "Serif", `ui-serif, "New York", Georgia, serif`],
  ["mono", "Mono", `"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace`],
]
export type Tokens = { scheme: string; primary?: string; second?: string; surface: string; font: string; radius: string }
export const SISO_TOKENS: Tokens = { scheme: "siso", surface: "matte", font: "geist", radius: "0.625" }

const ok = (l: number, c: number, h: number) => `oklch(${l} ${c} ${h})`

// the variables for one box in one theme
export function tokenVars(t: Tokens, theme: "dark" | "light"): CSSProperties {
  const s = SCHEMES.find((x) => x.id === t.scheme) ?? SCHEMES[0]
  const primary = t.primary ? `#${t.primary}` : s.primary
  const second = t.second ? `#${t.second}` : s.second
  const ink = !t.primary && s.ink && theme === "dark" ? s.ink : "#ffffff"
  const { hue: h, tint: c } = s
  const dark = theme === "dark"
  const v: Record<string, string> = {
    "--primary": primary, "--primary-foreground": ink, "--ring": primary,
    "--sidebar-primary": primary, "--sidebar-primary-foreground": ink, "--sidebar-ring": primary,
    "--sidebar-accent-foreground": primary, "--siso-second": second, "--radius": `${t.radius}rem`,
    "--background": dark ? ok(0.2, c, h) : ok(0.985, c * 0.4, h),
    "--sidebar": dark ? ok(0.16, c, h) : ok(0.965, c * 0.8, h),
    "--card": dark ? ok(0.235, c, h) : "#ffffff",
    "--muted": dark ? ok(0.235, c, h) : ok(0.945, c, h),
    "--secondary": dark ? ok(0.27, c, h) : ok(0.93, c, h),
    "--accent": `color-mix(in oklab, ${primary} ${dark ? 10 : 8}%, transparent)`,
    "--sidebar-accent": `color-mix(in oklab, ${primary} ${dark ? 9 : 7}%, transparent)`,
    "--popover": dark ? ok(0.24, c, h) : "#ffffff",
  }
  const out: Record<string, string> = { ...v, fontFamily: (FONTS.find(([id]) => id === t.font) ?? FONTS[0])[2] }
  // glass: the surfaces go see-through over a wash of the scheme's two colours (index.css blurs what is behind them)
  if (t.surface === "glass") {
    const see = (k: string, pct: number) => { out[k] = `color-mix(in oklab, ${v[k]} ${pct}%, transparent)` }
    see("--background", dark ? 55 : 60); see("--sidebar", dark ? 45 : 50); see("--card", 60); see("--muted", 55); see("--popover", 88)
    out.background = `radial-gradient(60% 70% at 15% 20%, color-mix(in oklab, ${primary} ${dark ? 45 : 35}%, transparent), transparent 70%), radial-gradient(55% 65% at 85% 85%, color-mix(in oklab, ${second} ${dark ? 40 : 30}%, transparent), transparent 70%), ${dark ? ok(0.16, c, h) : ok(0.97, c, h)}`
  }
  return out as CSSProperties
}

// uihub: siso:shells
