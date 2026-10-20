// uihub: siso:nav-icons
import {
  Aperture, Binary, Blend, SwatchBook,
  AlertTriangle, AppWindow, Award, BarChart3, Bell, Bot, Box, Brush, Calendar, CalendarRange, CheckSquare, ChevronDown, CircleDot,
  CircleUser, Clock, Code2, Columns3, Command, Compass, Copy, CreditCard, Cuboid, Diff, Dock, FileJson, FileUp, FolderTree, FormInput,
  Gauge, Globe, Grid2x2, Hand, Heading, HelpCircle, Image, Images, Inbox, Kanban, Layers, LayoutDashboard, LayoutGrid, LayoutTemplate,
  Link2, List, ListOrdered, Loader, Map, Megaphone, Menu, MessageSquare, MessagesSquare, MousePointer2, MousePointerClick, Navigation,
  Palette, PanelBottom, PanelLeft, PanelTop, Quote, RectangleHorizontal, ScrollText, Search, Shapes, SlidersHorizontal, Sparkles, Square,
  SquareStack, Star, Table, Tag, Tags, Text, TextCursorInput, ToggleLeft, Trophy, Type, Upload, Users, Video, Wand2, Wrench,
  type LucideIcon,
} from "lucide-react"

const BY_NAME: [RegExp, LucideIcon][] = [
  [/pages\/templates|^templates/, LayoutTemplate], [/themes\/|themes/, SwatchBook], [/shader/, Aperture], [/gradient/, Blend], [/ascii/, Binary],
  [/announce/, Megaphone], [/background/, Palette], [/border/, Square], [/cta|call/, MousePointerClick], [/logos|client/, Award],
  [/comparison|compare/, Columns3], [/dock/, Dock], [/faq/, HelpCircle], [/feature/, Sparkles], [/footer/, PanelBottom],
  [/gallery|lightbox/, Images], [/hero/, LayoutTemplate], [/hook/, Code2], [/map/, Map], [/marquee/, ScrollText],
  [/top-nav/, PanelTop], [/pricing/, CreditCard], [/scroll/, ScrollText], [/\/stat\b|kpi/, BarChart3], [/wizard|step/, ListOrdered],
  [/team/, Users], [/testimonial/, Quote], [/text-effect|texts/, Type], [/timeline/, Clock], [/player|video/, Video], [/accordion/, ChevronDown],
  [/alert/, AlertTriangle], [/avatar|profile/, CircleUser], [/badge/, Tag], [/breadcrumb/, Navigation], [/copy/, Copy],
  [/button/, RectangleHorizontal], [/date-range/, CalendarRange], [/calendar|date/, Calendar], [/card-stack|stack/, SquareStack],
  [/card/, CreditCard], [/carousel/, Images], [/chart|viz/, BarChart3], [/checkbox/, CheckSquare], [/code/, Code2],
  [/color/, Palette], [/combobox|select/, ChevronDown], [/command/, Command], [/context/, MousePointer2], [/cursor/, MousePointer2],
  [/dashboard/, LayoutDashboard], [/dialog|modal/, AppWindow], [/diff/, Diff], [/menu|dropdown/, Menu], [/empty/, Inbox],
  [/tree/, FolderTree], [/upload|file/, FileUp], [/form/, FormInput], [/gauge/, Gauge], [/globe/, Globe], [/bento|grid/, Grid2x2],
  [/hover/, Hand], [/icon/, Shapes], [/json/, FileJson], [/kanban/, Kanban], [/leader|gamif|reward/, Trophy], [/link/, Link2],
  [/list/, List], [/loader|spinner/, Loader], [/notification|bell|toast/, Bell], [/search/, Search], [/sidebar/, PanelLeft],
  [/slider/, SlidersHorizontal], [/switch|toggle/, ToggleLeft], [/table/, Table], [/tabs/, Tags], [/input|textarea/, TextCursorInput],
  [/tooltip|popover/, MessageSquare], [/chat|thread|composer/, MessagesSquare], [/agent|ai/, Bot], [/tilt|3d/, Cuboid],
  [/rating|star/, Star], [/heading/, Heading], [/image/, Image], [/upload/, Upload], [/tool|check|compose|picker/, Wrench],
  [/ours/, Wand2], [/layout|shell/, Layers], [/motion/, Sparkles], [/discover/, Compass], [/brush|paint/, Brush], [/radio/, CircleDot],
  [/paragraph/, Text],
]

export function navIcon(label: string, categories: string[] = []): LucideIcon {
  const hay = `${categories.join(" ")} ${label}`.toLowerCase()
  for (const [re, I] of BY_NAME) if (re.test(hay)) return I
  return Box
}
export { LayoutGrid }
