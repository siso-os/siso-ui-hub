// uihub: siso:nav-glyph
// The side nav's icons move (looks v7, Agent Base's @siso/icons): a row's icon plays when you hover the row or it is
// the page you're on. An icon without a moving version stays still.
import { Bell, Bot, Boxes, Building2, Check, ClipboardCheck, Code2, Compass, Cpu, FileCode2, FileText, Flame, FolderKanban, Gauge, Gavel, House, Layers, LayoutDashboard, LayoutGrid, LayoutTemplate, Library, MapPinned, MonitorCheck, MonitorCog, Package, Palette, PanelsTopLeft, Route, Rows3, Scale, ScrollText, Search, Sparkles, SquareTerminal, Star, Store, Users, Wrench, Zap, type LucideIcon } from "lucide-react"
import { AnimatedNavIcon, ICONS, staticGlyph, type AnimatedIcon } from "@/icons"

const MOVES = new Map<LucideIcon, keyof typeof ICONS>([
  [House, "home"], [LayoutGrid, "layout-grid"], [Building2, "map-pin-house"], [Wrench, "hammer"], [Compass, "compass"], [Users, "users"],
  [Library, "book-text"], [Bot, "bot"], [Palette, "palette"], [Sparkles, "sparkles"], [Package, "box"], [Boxes, "blocks"],
  [LayoutTemplate, "layout-panel-top"], [PanelsTopLeft, "layout-panel-top"], [LayoutDashboard, "gauge"], [Rows3, "layers"], [FileText, "book-text"],
  [Star, "stamp"], [Check, "circle-check"], [Flame, "zap"], [Search, "search"], [Scale, "gavel"], [Gavel, "gavel"], [Code2, "terminal"],
  [FolderKanban, "briefcase-business"], [MonitorCog, "cpu"], [MapPinned, "map-pin"], [FileCode2, "book-text"], [ScrollText, "history"], [Store, "cart"],
  [Layers, "layers"], [Gauge, "gauge"], [Zap, "zap"], [Route, "route"], [Cpu, "cpu"], [Bell, "bell"], [SquareTerminal, "terminal"],
  [MonitorCheck, "monitor-check"], [ClipboardCheck, "clipboard-check"],
])
const still = new Map<LucideIcon, AnimatedIcon>()
function glyphFor(icon: LucideIcon): AnimatedIcon {
  const moving = MOVES.get(icon)
  if (moving) return ICONS[moving]
  if (!still.has(icon)) still.set(icon, staticGlyph(icon))
  return still.get(icon)!
}

export function NavGlyph({ icon, active, size = 16 }: { icon: LucideIcon; active?: boolean; size?: number }) {
  return <AnimatedNavIcon icon={glyphFor(icon)} active={active} size={size} strokeWidth={1.75} />
}
