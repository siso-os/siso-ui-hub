// uihub: siso:packages
// SISO's UI packages and the pieces inside them, with every version (ECOSYSTEM keeps src/data/siso-packages.json).
import { Bell, Bot, Compass, Cpu, Gauge, Layers, Package, Palette, PanelTop, Route, Search, Sparkles, SquareTerminal, ToggleLeft, Zap, type LucideIcon } from "lucide-react"
import data from "@/data/siso-packages.json"

export type Ver = { v: string; when: string; note: string; commit?: string; shot?: string }
export type Pkg = {
  id: string
  name: string
  pkg?: string
  parent?: string
  icon: string
  status: string
  about: string
  code?: { version: string; commits: number; first: string; last: string }
  versions?: Ver[]
}
export const PKGS = data as { about: string; packages: Pkg[] }

/** the pictures are local (gitignored, app/public/a/pkg/); a build without them shows the piece's icon */
export const SHOT = "/a/pkg/"

const ICONS: Record<string, LucideIcon> = {
  layers: Layers, home: PanelTop, search: Search, blocks: ToggleLeft, zap: Zap, route: Route, compass: Compass, bell: Bell,
  sparkles: Sparkles, gauge: Gauge, cpu: Cpu, bot: Bot, palette: Palette, terminal: SquareTerminal,
}
export const pkgIcon = (name: string) => ICONS[name] || Package

const MONTHS = "JanFebMarAprMayJunJulAugSepOctNovDec"
/** "10 Oct 08:00" as a time to sort by (every version so far is from 2026) */
export function whenAt(w: string) {
  const m = w.match(/(\d{1,2}) ([A-Z][a-z]{2})(?: (\d{1,2}):(\d{2}))?/)
  return m ? Date.UTC(2026, MONTHS.indexOf(m[2]) / 3, +m[1], +(m[3] || 0), +(m[4] || 0)) : 0
}

/** what's new across SISO's UI: every piece's versions, newest first */
export const releases = () =>
  PKGS.packages
    .flatMap((p) => (p.versions || []).map((v) => ({ ...v, id: p.id, name: p.name })))
    .sort((a, b) => whenAt(b.when) - whenAt(a.when))
