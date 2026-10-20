// uihub: siso:nav-glyph
// The side nav's icons move (looks v7, Agent Base's @siso/icons): a row's icon plays when you hover the row or it is
// the page you're on. An icon without a moving version stays still. Agent Base's set covers the cores; the rest come
// from the kit's lucide-animated (Shaan, 15 Oct: "animated icons" in the nav), wrapped to the same handle.
import { forwardRef } from "react"
import {
  AlignLeft, CircleDot, FormInput, Tag, TextCursorInput, Type,
  AlertTriangle, Atom, BarChart3, Bell, Blocks, Bookmark, Bot, Boxes, Brush, Building2, Calendar, ChartColumnIncreasing, Check, CheckSquare, CircleUser, ClipboardCheck, Clock, Code2, Command, Compass, Copy, Cpu, CreditCard, Crown, Cuboid, Diff, FileCode2, FileText, FileUp, Flame, FolderKanban, FolderTree, Gauge, Gavel, GitCompareArrows, Globe, Grid2x2, Hand, House, Image, Images, Inbox, Kanban, Keyboard, Layers, LayoutDashboard, LayoutGrid, LayoutTemplate, Library, Link2, Loader, Map as MapIcon, MapPinned, Megaphone, Menu, MessageSquare, MessagesSquare, MonitorCheck, MonitorCog, MousePointerClick, Navigation, Package, Palette, PanelBottom, PanelLeft, PanelTop, PanelsTopLeft, Play, Quote, Route, Rows3, Scale, ScrollText, Search, SlidersHorizontal, Sparkles, SquareStack, SquareTerminal, Star, Store, SwatchBook, Upload, Users, Video, Wand2, Wrench, Zap, type LucideIcon,
} from "lucide-react"
import { AnimatedNavIcon, ICONS, staticGlyph, type AnimatedIcon } from "./icons"
import type { AnimatedIconProps } from "./icons/types"
import { cn } from "./icons/cn"
import { AlignLeftIcon } from "./animated/align-left"
import { BookmarkIcon } from "./animated/bookmark"
import { BoxesIcon } from "./animated/boxes"
import { CalendarDaysIcon } from "./animated/calendar-days"
import { ChartColumnIncreasingIcon } from "./animated/chart-column-increasing"
import { CheckIcon } from "./animated/check"
import { ClockIcon } from "./animated/clock"
import { CopyIcon } from "./animated/copy"
import { CreditCardIcon } from "./animated/credit-card"
import { CursorClickIcon } from "./animated/cursor-click"
import { EarthIcon } from "./animated/earth"
import { FileTextIcon } from "./animated/file-text"
import { FlameIcon } from "./animated/flame"
import { FolderKanbanIcon } from "./animated/folder-kanban"
import { FolderTreeIcon } from "./animated/folder-tree"
import { GalleryThumbnailsIcon } from "./animated/gallery-thumbnails"
import { GitCompareIcon } from "./animated/git-compare"
import { GitCompareArrowsIcon } from "./animated/git-compare-arrows"
import { HandIcon } from "./animated/hand"
import { KeyboardIcon } from "./animated/keyboard"
import { Link2Icon } from "./animated/link-2"
import { LoaderCircleIcon } from "./animated/loader-circle"
import { MailboxIcon } from "./animated/mailbox"
import { MenuIcon } from "./animated/menu"
import { MessageCircleIcon } from "./animated/message-circle"
import { MessageSquareIcon } from "./animated/message-square"
import { PanelLeftOpenIcon } from "./animated/panel-left-open"
import { PenToolIcon } from "./animated/pen-tool"
import { PlayIcon } from "./animated/play"
import { SlidersHorizontalIcon } from "./animated/sliders-horizontal"
import { SquarePenIcon } from "./animated/square-pen"
import { SquareStackIcon } from "./animated/square-stack"
import { TicketIcon } from "./animated/ticket"
import { UploadIcon } from "./animated/upload"
import { UserIcon } from "./animated/user"
import { WaypointsIcon } from "./animated/waypoints"
import { WrenchIcon } from "./animated/wrench"

type KitIcon = React.ForwardRefExoticComponent<Omit<AnimatedIconProps, "strokeWidth"> & React.RefAttributes<{ startAnimation: () => void; stopAnimation: () => void }>>
/** a kit icon on the bank's handle: it draws at stroke 2, so the stroke is set from CSS to match the row */
const kit = (K: KitIcon): AnimatedIcon => {
  const G = forwardRef<{ startAnimation: () => void; stopAnimation: () => void }, AnimatedIconProps>(({ strokeWidth = 2, style, className, ...p }, ref) => (
    <K ref={ref} {...p} className={cn(className, "[&_svg]:[stroke-width:var(--sw)]")} style={{ ...style, "--sw": strokeWidth } as React.CSSProperties} />
  ))
  G.displayName = `Kit(${K.displayName ?? "icon"})`
  return G
}

const BANK = new Map<LucideIcon, keyof typeof ICONS>([
  [House, "home"], [LayoutGrid, "layout-grid"], [Building2, "map-pin-house"], [Compass, "compass"], [Users, "users"],
  [Library, "book-text"], [Bot, "bot"], [Palette, "palette"], [SwatchBook, "palette"], [Sparkles, "sparkles"], [Wand2, "sparkles"], [Package, "box"], [Cuboid, "box"], [Blocks, "blocks"],
  [LayoutTemplate, "layout-panel-top"], [PanelTop, "layout-panel-top"], [PanelBottom, "layout-panel-top"], [LayoutDashboard, "gauge"], [Rows3, "layers"],
  [Star, "stamp"], [Check, "circle-check"], [Search, "search"], [Scale, "gavel"], [Gavel, "gavel"], [Code2, "terminal"],
  [MonitorCog, "cpu"], [MapPinned, "map-pin"], [FileCode2, "book-text"], [ScrollText, "history"], [Store, "cart"],
  [Layers, "layers"], [Gauge, "gauge"], [Zap, "zap"], [Route, "route"], [Navigation, "route"], [Cpu, "cpu"], [Bell, "bell"], [SquareTerminal, "terminal"],
  [MonitorCheck, "monitor-check"], [ClipboardCheck, "clipboard-check"], [Atom, "atom"], [Crown, "chess-king"], [Grid2x2, "layout-grid"],
  [AlertTriangle, "badge-alert"], [Megaphone, "radio-tower"], [MessagesSquare, "message-circle-more"], [CircleDot, "activity"],
])
const KIT = new Map<LucideIcon, AnimatedIcon>(
  ([
    [Bookmark, BookmarkIcon], [Boxes, BoxesIcon], [Calendar, CalendarDaysIcon], [ChartColumnIncreasing, ChartColumnIncreasingIcon], [BarChart3, ChartColumnIncreasingIcon],
    [CheckSquare, CheckIcon], [Clock, ClockIcon], [Copy, CopyIcon], [CreditCard, CreditCardIcon], [MousePointerClick, CursorClickIcon], [Globe, EarthIcon],
    [FileText, FileTextIcon], [Flame, FlameIcon], [FolderKanban, FolderKanbanIcon], [Kanban, FolderKanbanIcon], [FolderTree, FolderTreeIcon],
    [Image, GalleryThumbnailsIcon], [Images, GalleryThumbnailsIcon], [Diff, GitCompareIcon], [GitCompareArrows, GitCompareArrowsIcon], [Hand, HandIcon],
    [Keyboard, KeyboardIcon], [Command, KeyboardIcon], [Link2, Link2Icon], [Loader, LoaderCircleIcon], [Inbox, MailboxIcon], [Menu, MenuIcon],
    [Quote, MessageCircleIcon], [MessageSquare, MessageSquareIcon], [PanelsTopLeft, PanelLeftOpenIcon], [PanelLeft, PanelLeftOpenIcon], [Brush, PenToolIcon],
    [Play, PlayIcon], [Video, PlayIcon], [SlidersHorizontal, SlidersHorizontalIcon], [SquareStack, SquareStackIcon], [Upload, UploadIcon], [FileUp, UploadIcon],
    [CircleUser, UserIcon], [Type, AlignLeftIcon], [AlignLeft, AlignLeftIcon], [FormInput, SquarePenIcon], [TextCursorInput, KeyboardIcon], [Tag, TicketIcon], [MapIcon, WaypointsIcon], [Wrench, WrenchIcon],
  ] as [LucideIcon, KitIcon][]).map(([l, k]) => [l, kit(k)]),
)
const still = new Map<LucideIcon, AnimatedIcon>()
function glyphFor(icon: LucideIcon): AnimatedIcon {
  const bank = BANK.get(icon)
  if (bank) return ICONS[bank]
  const moving = KIT.get(icon)
  if (moving) return moving
  if (!still.has(icon)) still.set(icon, staticGlyph(icon))
  return still.get(icon)!
}

export function NavGlyph({ icon, active, size = 16 }: { icon: LucideIcon; active?: boolean; size?: number }) {
  return <AnimatedNavIcon icon={glyphFor(icon)} active={active} size={size} strokeWidth={1.75} />
}
