// uihub: siso:app-frame
// The SISO app frame: the dashboard shell, one frame with a few real choices instead of 87 sidebars and app shells.
// Shaan, 15 Oct: "from first principles we might have just over complicated the fuck out of this ... you should always
// have a collapse button up top ... the search palette should lowkey always be on ... always have counts on items ...
// project list doesn't really make sense". So search with ⌘K, counts and the collapse button up top are always there;
// what is left to choose changes the shell itself, two ways where two will do. Matched to our apps' code (14 Oct):
// sidebar (HALO CRM, SISO CRM) or rail plus panel (Agent Base); HALO's top is a view switcher and its four icons across
// are tools, each with its own nav ("the side nav should flow through ... you click on things and it changes the side
// nav"). Menus open inside the frame, not as pop-ups, so they show in every preview. Built on shadcn's sidebar (MIT).
import * as React from "react"
import { ArrowLeft, ArrowRight, Bell, Check, ChevronRight, ChevronsUpDown, Plus, Search, Sparkles, X } from "lucide-react"
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarTrigger, useSidebar,
} from "../../kit/shadcn/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../kit/shadcn/ui/collapsible"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../kit/shadcn/ui/command"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../kit/shadcn/ui/tooltip"
import { useIsMobile } from "../../hooks/use-mobile"
import { LayoutGridIcon } from "../../kit/lucide-animated/icons/layout-grid"
import { FileTextIcon } from "../../kit/lucide-animated/icons/file-text"
import { LayoutPanelTopIcon } from "../../kit/lucide-animated/icons/layout-panel-top"
import { MessageSquareIcon } from "../../kit/lucide-animated/icons/message-square"
import { CalendarDaysIcon } from "../../kit/lucide-animated/icons/calendar-days"
import { UsersIcon } from "../../kit/lucide-animated/icons/users"
import { ActivityIcon } from "../../kit/lucide-animated/icons/activity"
import { ChartColumnIncreasingIcon } from "../../kit/lucide-animated/icons/chart-column-increasing"
import { ClipboardCheckIcon } from "../../kit/lucide-animated/icons/clipboard-check"
import { RocketIcon } from "../../kit/lucide-animated/icons/rocket"
import { MailboxIcon } from "../../kit/lucide-animated/icons/mailbox"
import { MailCheckIcon } from "../../kit/lucide-animated/icons/mail-check"
import { AtSignIcon } from "../../kit/lucide-animated/icons/at-sign"
import { SendIcon } from "../../kit/lucide-animated/icons/send"
import { MessageCircleIcon } from "../../kit/lucide-animated/icons/message-circle"
import { UsersRoundIcon } from "../../kit/lucide-animated/icons/users-round"
import { CalendarCheckIcon } from "../../kit/lucide-animated/icons/calendar-check"
import { ClockIcon } from "../../kit/lucide-animated/icons/clock"
import { HistoryIcon } from "../../kit/lucide-animated/icons/history"
import { LinkIcon } from "../../kit/lucide-animated/icons/link"
import { FolderOpenIcon } from "../../kit/lucide-animated/icons/folder-open"
import { FolderKeyIcon } from "../../kit/lucide-animated/icons/folder-key"
import { FileStackIcon } from "../../kit/lucide-animated/icons/file-stack"
import { WalletIcon } from "../../kit/lucide-animated/icons/wallet"
import { TrendingUpIcon } from "../../kit/lucide-animated/icons/trending-up"
import { PoundSterlingIcon } from "../../kit/lucide-animated/icons/pound-sterling"
import { UserIcon } from "../../kit/lucide-animated/icons/user"
import { UserPlusIcon } from "../../kit/lucide-animated/icons/user-plus"
import { HomeIcon } from "../../kit/lucide-animated/icons/home"
import { SettingsIcon } from "../../kit/lucide-animated/icons/settings"
import { SearchIcon } from "../../kit/lucide-animated/icons/search"
import { BellIcon } from "../../kit/lucide-animated/icons/bell"

export type FrameCfg = {
  layout: "sidebar" | "rail-panel"
  look: "plain" | "inset" | "floating"
  collapse: "icon" | "offcanvas"
  header: "workspace" | "views"
  tools: number
  nav: "grouped" | "dropdowns"
  footer: "user" | "upgrade"
  topbar: boolean
}
export const SISO_FRAME: FrameCfg = { layout: "sidebar", look: "inset", collapse: "icon", header: "workspace", tools: 4, nav: "dropdowns", footer: "user", topbar: true }

// older links carry retired switches (an icon rail, tools on or off, a fixed sidebar): read them as their nearest
export function normalise(cfg: Partial<FrameCfg> & Record<string, unknown>): FrameCfg {
  const c = { ...SISO_FRAME, ...cfg } as FrameCfg & Record<string, unknown>
  if ((c.layout as string) === "rail") c.layout = "rail-panel"
  if ((c.collapse as string) === "none") c.collapse = "icon"
  if ((c.header as string) === "logo") c.header = "workspace"
  if ((c.nav as string) === "flat") c.nav = "grouped"
  if ((c.footer as string) === "links") c.footer = "user"
  if (typeof c.tools === "boolean") c.tools = c.tools ? 4 : 0
  if (c.tools === 3) c.tools = 4
  return c
}

// Shaan, 15 Oct: "some of the options shouldn't even be available together because they're just bad". In rail plus
// panel the rail already is the switcher, the tools and the profile: a tools strip under it is a second rail, icons
// collapsing beside it are two icon columns, and a brand or a profile in the panel repeats the rail. So there the panel
// only slides away, and the switcher, tools, collapse and bottom choices do not apply.
export function applies(c: FrameCfg): (keyof FrameCfg)[] {
  return c.layout === "rail-panel" ? ["layout", "look", "nav", "topbar"] : ["layout", "look", "collapse", "header", "tools", "nav", "footer", "topbar"]
}
export function fit(c: FrameCfg): FrameCfg {
  return c.layout === "rail-panel" ? { ...c, collapse: "offcanvas", tools: 0, header: SISO_FRAME.header, footer: SISO_FRAME.footer } : c
}

// the animated icons (lucide-animated): every icon in the frame moves when you hover its row
type Handle = { startAnimation: () => void; stopAnimation: () => void }
export type AIcon = React.ForwardRefExoticComponent<{ size?: number; className?: string } & React.RefAttributes<Handle>>
function useAnim() {
  const ref = React.useRef<Handle>(null)
  return [ref, { onMouseEnter: () => ref.current?.startAnimation(), onMouseLeave: () => ref.current?.stopAnimation() }] as const
}
const ICON: Record<string, AIcon> = {
  Dashboard: LayoutGridIcon, Activity: ActivityIcon, Reports: ChartColumnIncreasingIcon, Tasks: ClipboardCheckIcon, Goals: RocketIcon,
  All: MailboxIcon, Unread: MailCheckIcon, Mentions: AtSignIcon, Email: SendIcon, Chat: MessageCircleIcon,
  Contacts: UsersIcon, Teams: UsersRoundIcon, Month: CalendarDaysIcon, Week: CalendarCheckIcon, Agenda: ClockIcon, Today: ClockIcon,
  "All docs": FileTextIcon, Recent: HistoryIcon, "Shared with me": LinkIcon, Clients: FolderOpenIcon, Internal: FolderKeyIcon,
  "All sheets": LayoutPanelTopIcon, Templates: FileStackIcon, Payroll: WalletIcon, Pipeline: TrendingUpIcon, Budgets: PoundSterlingIcon,
  General: MessageSquareIcon, Team: UsersRoundIcon, Sam: UserIcon, Priya: UserIcon, Mine: UserIcon, Everyone: UsersIcon, Invites: UserPlusIcon,
}
const ic = (t: string): AIcon => ICON[t] ?? FolderOpenIcon
const I16 = "flex size-4 shrink-0 items-center justify-center"

export type Item = { title: string; badge?: number; sub?: string[] }
export type Space = { id: string; title: string; icon: AIcon; groups: { label: string; items: Item[] }[] }
const SPACES: Space[] = [
  { id: "home", title: "Home", icon: HomeIcon, groups: [{ label: "Overview", items: [{ title: "Dashboard" }, { title: "Activity", badge: 3 }, { title: "Reports", sub: ["Weekly", "Monthly", "Custom"] }] }, { label: "Work", items: [{ title: "Tasks", badge: 12, sub: ["Mine", "Team", "Done"] }, { title: "Goals" }] }] },
  { id: "inbox", title: "Inbox", icon: MailboxIcon, groups: [{ label: "Messages", items: [{ title: "All", badge: 24 }, { title: "Unread", badge: 5 }, { title: "Mentions", badge: 2 }] }, { label: "Channels", items: [{ title: "Email" }, { title: "Chat", sub: ["Support", "Sales"] }] }] },
  { id: "people", title: "People", icon: UsersIcon, groups: [{ label: "Directory", items: [{ title: "Contacts", badge: 8, sub: ["Clients", "Leads", "Partners"] }, { title: "Teams" }] }] },
  { id: "calendar", title: "Calendar", icon: CalendarDaysIcon, groups: [{ label: "Views", items: [{ title: "Month" }, { title: "Week" }, { title: "Agenda", badge: 4 }] }] },
]
// HALO's role views: each person sees the view their role gives them, and the nav below is that view's pages
const VIEWS: [string, string][] = [["Admin", "home"], ["Manager", "people"], ["Chatter", "inbox"], ["HR", "calendar"]]
// the tools across, each with its own nav (the first is the current view's own pages)
export type Tool = { title: string; icon: AIcon; dot?: boolean; groups?: Space["groups"] }
const TOOLS: Tool[] = [
  { title: "Dashboard", icon: LayoutGridIcon },
  { title: "Docs", icon: FileTextIcon, groups: [{ label: "Docs", items: [{ title: "All docs", badge: 42 }, { title: "Recent" }, { title: "Shared with me", badge: 3 }] }, { label: "Folders", items: [{ title: "Clients", sub: ["Northwind", "Lumen Studio"] }, { title: "Internal", sub: ["Playbooks", "Hiring"] }] }] },
  { title: "Sheets", icon: LayoutPanelTopIcon, groups: [{ label: "Sheets", items: [{ title: "All sheets", badge: 17 }, { title: "Templates" }] }, { label: "Pinned", items: [{ title: "Payroll" }, { title: "Pipeline", badge: 6 }, { title: "Budgets", sub: ["2026", "2027"] }] }] },
  { title: "Chat", icon: MessageSquareIcon, dot: true, groups: [{ label: "Channels", items: [{ title: "General", badge: 9 }, { title: "Team" }, { title: "Clients", badge: 2 }] }, { label: "Direct", items: [{ title: "Sam", badge: 1 }, { title: "Priya" }] }] },
  { title: "Calendar", icon: CalendarDaysIcon, groups: [{ label: "Calendar", items: [{ title: "Today", badge: 4 }, { title: "Week" }, { title: "Month" }] }, { label: "Calendars", items: [{ title: "Mine" }, { title: "Team", sub: ["Sales", "Ops"] }] }] },
  { title: "People", icon: UsersIcon, groups: [{ label: "People", items: [{ title: "Everyone", badge: 28 }, { title: "Teams", sub: ["Ops", "Sales", "Design"] }, { title: "Invites", badge: 2 }] }] },
]

// a menu that opens inside the frame (not a pop-up), so it shows wherever the frame is drawn; peek opens it at once
function InlineMenu({ trigger, title, items, onPick, up, open: openAtStart }: { trigger: React.ReactNode; title?: string; items: [string, boolean][]; onPick?: (i: number) => void; up?: boolean; open?: boolean }) {
  const [open, setOpen] = React.useState(!!openAtStart)
  React.useEffect(() => setOpen(!!openAtStart), [openAtStart])
  return (
    <div className="relative">
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div className={`absolute inset-x-0 z-50 ${up ? "bottom-full mb-1" : "top-full mt-1"} animate-in fade-in zoom-in-95 rounded-md border border-sidebar-border bg-popover p-1 text-sm text-popover-foreground shadow-lg group-data-[collapsible=icon]:hidden`}>
          {title && <p className="px-2 py-1 text-xs text-muted-foreground">{title}</p>}
          {items.map(([t, on], i) => <button key={t} onClick={() => { onPick?.(i); setOpen(false) }} className={`flex w-full items-center rounded-sm px-2 py-1.5 text-left hover:bg-accent ${on ? "bg-accent" : ""}`}>{t}{on && <Check className="ml-auto size-3.5 text-primary" />}</button>)}
        </div>
      )}
    </div>
  )
}

const MARK = <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Sparkles className="size-4" /></div>

function Brand({ cfg, space, setSpace, peek }: { cfg: FrameCfg; space: Space; setSpace: (s: Space) => void; peek?: boolean }) {
  const [ws, setWs] = React.useState(0)
  const views = cfg.header === "views"
  const view = VIEWS.find(([, id]) => id === space.id)?.[0] ?? "Admin"
  const names = ["SISO Agency", "Client work", "Personal"]
  const button = (
    <SidebarMenuButton size="lg">{MARK}<div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-semibold">{views ? "SISO" : names[ws]}</span><span className="truncate text-xs text-muted-foreground">{views ? `${view} view` : "Pro workspace"}</span></div><ChevronsUpDown className="ml-auto size-4" /></SidebarMenuButton>
  )
  return (
    <SidebarMenu><SidebarMenuItem>
      {views
        ? <InlineMenu trigger={button} title="Switch view" open={peek} items={VIEWS.map(([v]) => [v, v === view])} onPick={(i) => setSpace(SPACES.find((x) => x.id === VIEWS[i][1]) ?? SPACES[0])} />
        : <InlineMenu trigger={button} title="Workspaces" open={peek} items={[...names.map((n, i) => [n, i === ws] as [string, boolean]), ["+ New workspace", false]]} onPick={(i) => i < names.length && setWs(i)} />}
    </SidebarMenuItem></SidebarMenu>
  )
}

// HALO's tool switcher: icons across in a capsule; the pill slides to the one you pick and the nav below becomes its own.
// Collapsed to icons, the tools stand in a column so they are still one click away.
function ToolBtn({ t, on, onPick }: { t: Tool; on: boolean; onPick: () => void }) {
  const [ref, hover] = useAnim()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={onPick} aria-label={t.title} {...hover} className={`relative z-10 flex h-8 flex-1 items-center justify-center rounded-lg ${on ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
          <t.icon ref={ref} size={16} className={I16} />{t.dot && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />}
        </button>
      </TooltipTrigger>
      <TooltipContent>{t.title}</TooltipContent>
    </Tooltip>
  )
}
function ToolRow({ t, on, onPick }: { t: Tool; on: boolean; onPick: () => void }) {
  const [ref, hover] = useAnim()
  return <SidebarMenuItem><SidebarMenuButton tooltip={t.title} isActive={on} onClick={onPick} {...hover}><t.icon ref={ref} size={16} className={I16} /><span>{t.title}</span></SidebarMenuButton></SidebarMenuItem>
}
function Tools({ count, tool, setTool }: { count: number; tool: number; setTool: (i: number) => void }) {
  const list = TOOLS.slice(0, count)
  return (
    <SidebarGroup data-mark="tools" className="py-0">
      <div className="relative flex gap-1 rounded-xl bg-sidebar-accent p-1 group-data-[collapsible=icon]:hidden">
        <span aria-hidden className="absolute inset-y-1 left-1 rounded-lg bg-background shadow-sm ring-1 ring-sidebar-border transition-transform duration-300 ease-out" style={{ width: `calc((100% - 0.5rem - ${count - 1} * 0.25rem) / ${count})`, transform: `translateX(calc(${tool} * (100% + 0.25rem)))` }} />
        {list.map((t, i) => <ToolBtn key={t.title} t={t} on={i === tool} onPick={() => setTool(i)} />)}
      </div>
      <SidebarMenu className="hidden border-b border-sidebar-border pb-2 group-data-[collapsible=icon]:flex">{list.map((t, i) => <ToolRow key={t.title} t={t} on={i === tool} onPick={() => setTool(i)} />)}</SidebarMenu>
    </SidebarGroup>
  )
}

function NavItem({ cfg, item, active, open }: { cfg: FrameCfg; item: Item; active: boolean; open: boolean }) {
  const [ref, hover] = useAnim()
  const Icon = ic(item.title)
  const icon = <Icon ref={ref} size={16} className={I16} />
  const badge = item.badge ? <SidebarMenuBadge className="rounded-full bg-primary/15 px-1.5 text-primary">{item.badge}</SidebarMenuBadge> : null
  if (cfg.nav === "dropdowns" && item.sub)
    return (
      <Collapsible asChild defaultOpen={open} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} {...hover}>{icon}<span>{item.title}</span><ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" /></SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>{item.sub.map((s) => <SidebarMenuSubItem key={s}><SidebarMenuSubButton href="#">{s}</SidebarMenuSubButton></SidebarMenuSubItem>)}</SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  return <SidebarMenuItem><SidebarMenuButton tooltip={item.title} isActive={active} {...hover}>{icon}<span>{item.title}</span></SidebarMenuButton>{badge}</SidebarMenuItem>
}

function SearchBox({ onSearch }: { onSearch: () => void }) {
  const [ref, hover] = useAnim()
  return (
    <SidebarGroup className="py-0">
      <button onClick={onSearch} {...hover} className="flex h-8 w-full items-center gap-2 rounded-md border border-sidebar-border bg-background/50 px-2 text-sm text-muted-foreground hover:bg-sidebar-accent group-data-[collapsible=icon]:hidden">
        <SearchIcon ref={ref} size={16} className={I16} /> Search<kbd className="ml-auto rounded border border-sidebar-border px-1 font-mono text-[10px]">⌘K</kbd>
      </button>
      <SidebarMenu className="hidden group-data-[collapsible=icon]:flex"><SidebarMenuItem><SidebarMenuButton tooltip="Search ⌘K" onClick={onSearch}><Search /></SidebarMenuButton></SidebarMenuItem></SidebarMenu>
    </SidebarGroup>
  )
}

function Nav({ cfg, groups, id, onSearch, tools, tool, setTool }: { cfg: FrameCfg; groups: Space["groups"]; id: string; onSearch: () => void; tools: number; tool: number; setTool: (i: number) => void }) {
  let firstSub = true
  return (
    <>
      {/* search with ⌘K is always there: a field when open, an icon when collapsed to icons */}
      <SearchBox onSearch={onSearch} />
      {tools > 0 && <Tools count={tools} tool={tool} setTool={setTool} />}
      {/* the nav for the chosen view or tool; it slides in when that changes */}
      <div key={id} data-mark="nav" className="flex animate-in flex-col fade-in slide-in-from-left-2 duration-300">
        {groups.map((g, gi) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarMenu>{g.items.map((it, ii) => { const open = !!it.sub && firstSub; if (it.sub) firstSub = false; return <NavItem key={it.title} cfg={cfg} item={it} active={gi === 0 && ii === 0} open={open} /> })}</SidebarMenu>
          </SidebarGroup>
        ))}
      </div>
    </>
  )
}

function Foot({ cfg, peek }: { cfg: FrameCfg; peek?: boolean }) {
  const user = (
    <SidebarMenu><SidebarMenuItem>
      <InlineMenu up open={peek} items={[["Settings", false], ["Notifications", false], ["Sign out", false]]}
        trigger={<SidebarMenuButton size="lg"><span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-medium">AL</span><div className="grid flex-1 text-left text-sm leading-tight"><span className="truncate font-medium">Alex Lee</span><span className="truncate text-xs text-muted-foreground">alex@siso.agency</span></div><ChevronsUpDown className="ml-auto size-4" /></SidebarMenuButton>} />
    </SidebarMenuItem></SidebarMenu>
  )
  if (cfg.footer === "user") return user
  return (
    <>
      <div data-mark="upgrade" className="rounded-lg border border-sidebar-border bg-background/50 px-3 py-2 text-xs group-data-[collapsible=icon]:hidden">
        <div className="flex items-center"><p className="font-medium">Pro plan</p><button className="ml-auto rounded-md bg-primary px-2 py-0.5 text-[11px] font-medium text-primary-foreground">Upgrade</button></div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full w-[70%] rounded-full bg-primary" /></div>
        <p className="mt-1 text-muted-foreground">7 of 10 seats used</p>
      </div>
      {user}
    </>
  )
}

// Agent Base's panel header: the space's name, which opens a list of spaces
function SpaceSwitch({ space, setSpace, peek }: { space: Space; setSpace: (s: Space) => void; peek?: boolean }) {
  return <InlineMenu open={peek} title="Spaces" items={SPACES.map((s) => [s.title, s.id === space.id])} onPick={(i) => setSpace(SPACES[i])}
    trigger={<button className="flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm font-semibold hover:bg-sidebar-accent">{space.title}<ChevronsUpDown className="size-3.5 text-muted-foreground" /></button>} />
}

// the rail: Agent Base's 64px column of spaces, with settings and the profile at its foot; on a phone it becomes a tab
// bar along the bottom
function RailBtn({ s, on, onPick, side }: { s: { id: string; title: string; icon: AIcon }; on: boolean; onPick?: () => void; side: "top" | "right" }) {
  const [ref, hover] = useAnim()
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button onClick={onPick} aria-label={s.title} {...hover} className={`flex size-10 items-center justify-center rounded-xl transition-colors ${on ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><s.icon ref={ref} size={20} className="flex size-5 items-center justify-center" /></button>
      </TooltipTrigger>
      <TooltipContent side={side}>{s.title}</TooltipContent>
    </Tooltip>
  )
}
function Rail({ space, setSpace, bottom }: { space: Space; setSpace: (s: Space) => void; bottom?: boolean }) {
  const mobile = useIsMobile() || bottom
  const btns = SPACES.map((s) => <RailBtn key={s.id} s={s} on={s.id === space.id} onPick={() => setSpace(s)} side={mobile ? "top" : "right"} />)
  if (mobile) return <nav className={`${bottom ? "absolute" : "fixed"} inset-x-0 bottom-0 z-20 flex justify-around border-t bg-background/95 py-2 backdrop-blur`}>{btns}</nav>
  return (
    <nav data-mark="rail" className="sticky top-0 flex max-h-svh w-16 shrink-0 flex-col items-center gap-2 self-stretch border-r bg-sidebar py-3">
      <div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sparkles className="size-5" /></div>
      {btns}
      <div className="mt-auto flex flex-col items-center gap-2"><RailBtn s={{ id: "settings", title: "Settings", icon: SettingsIcon }} on={false} side="right" /><span className="flex size-9 items-center justify-center rounded-full bg-muted text-xs font-medium">AL</span></div>
    </nav>
  )
}

// the page inside the frame: a real dashboard, so the frame is judged around real content, not grey blocks
const STATS: [string, string, string][] = [["Revenue", "£48.2k", "+12%"], ["Active clients", "128", "+4"], ["Open tasks", "12", "-3"]]
const BARS = [42, 58, 35, 72, 64, 80, 55, 90, 68, 76, 61, 84]
const ROWS: [string, string, string, string][] = [["Q4 brand refresh", "Priya", "Active", "Oct 28"], ["Onboard new client", "Sam", "Late", "Oct 14"], ["Payroll run", "Alex", "Done", "Oct 10"], ["Website launch", "Priya", "Active", "Nov 3"], ["Hiring plan 2027", "Sam", "Active", "Nov 12"], ["Budget review", "Alex", "Done", "Oct 2"]]
export function SisoFrameFixturePage({ title, page, groups }: { title: string; page: string; groups: Space["groups"] }) {
  const rows = groups.flatMap((g) => g.items).slice(0, 5)
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden p-5">
      <div className="flex items-end">
        <div><p className="text-xs text-muted-foreground">{title}</p><h1 className="text-xl font-semibold tracking-tight">{page}</h1></div>
        <button className="ml-auto flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"><Plus className="size-3.5" />New</button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {STATS.map(([k, v, d]) => (
          <div key={k} className="rounded-xl border bg-card p-3">
            <p className="text-xs text-muted-foreground">{k}</p>
            <p className="mt-1 flex items-baseline gap-2 text-xl font-semibold tabular-nums">{v}<span className={`text-xs font-medium ${d.startsWith("-") ? "text-muted-foreground" : "text-emerald-500"}`}>{d}</span></p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3">
        <div className="col-span-3 flex flex-col rounded-xl border bg-card p-3">
          <p className="text-xs font-medium">This year</p>
          <div className="mt-3 flex h-28 items-end gap-1.5">{BARS.map((v, i) => <div key={i} className={`flex-1 rounded-t-sm ${i === BARS.length - 1 ? "bg-primary" : "bg-primary/25"}`} style={{ height: `${v}%` }} />)}</div>
        </div>
        <div className="col-span-2 overflow-hidden rounded-xl border bg-card p-3">
          <p className="text-xs font-medium">Recent</p>
          <ul className="mt-1.5">{rows.slice(0, 4).map((r) => { const Icon = ic(r.title); return <li key={r.title} className="flex items-center gap-2 rounded-md px-1.5 py-1 text-sm hover:bg-muted"><Icon size={14} className="flex size-3.5 items-center justify-center text-muted-foreground" /><span className="truncate">{r.title}</span>{r.badge ? <span className="ml-auto text-xs tabular-nums text-muted-foreground">{r.badge}</span> : null}</li> })}</ul>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-xl border bg-card">
        <div className="grid grid-cols-[1fr_7rem_6rem_5rem] border-b px-3 py-2 text-xs text-muted-foreground"><span>Name</span><span>Owner</span><span>Status</span><span className="text-right">Due</span></div>
        {ROWS.map(([n, o, st, d]) => (
          <div key={n} className="grid grid-cols-[1fr_7rem_6rem_5rem] items-center border-b px-3 py-2 text-sm last:border-0">
            <span className="truncate">{n}</span><span className="truncate text-muted-foreground">{o}</span>
            <span><span className={`rounded-full px-2 py-0.5 text-[11px] ${st === "Done" ? "bg-emerald-500/15 text-emerald-500" : st === "Late" ? "bg-red-500/15 text-red-500" : "bg-primary/15 text-primary"}`}>{st}</span></span>
            <span className="text-right text-xs tabular-nums text-muted-foreground">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Main({ cfg, title, page, groups, onSearch, children }: { cfg: FrameCfg; title: string; page: string; groups: Space["groups"]; onSearch: () => void; children?: React.ReactNode }) {
  const { open } = useSidebar()
  const [bell, bellHover] = useAnim()
  // the collapse button lives up top in the sidebar; once a sidebar has slid away, the way back sits at the page's left
  const reopen = cfg.collapse === "offcanvas" && !open
  return (
    <>
      {cfg.topbar && (
        <header data-mark="topbar" className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          {reopen && <SidebarTrigger className="-ml-1" />}
          {cfg.layout === "rail-panel" ? (
            <div className="flex min-w-0 items-center gap-1">
              <button aria-label="Back" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><ArrowLeft className="size-4" /></button>
              <button aria-label="Forward" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><ArrowRight className="size-4" /></button>
              <span className="ml-1 flex items-center gap-2 rounded-md bg-muted px-3 py-1 text-sm">{page}<X className="size-3 opacity-60" /></span>
              <button aria-label="New tab" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><Plus className="size-4" /></button>
            </div>
          ) : (
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground"><span>{title}</span><ChevronRight className="size-3.5" /><span className="text-foreground">{page}</span></nav>
          )}
          <div className="ml-auto flex items-center gap-1">
            <button onClick={onSearch} aria-label="Search" className="rounded-md p-2 text-muted-foreground hover:bg-muted"><Search className="size-4" /></button>
            <button aria-label="Notifications" {...bellHover} className="relative rounded-md p-2 text-muted-foreground hover:bg-muted"><BellIcon ref={bell} size={16} className={I16} /><span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary" /></button>
          </div>
        </header>
      )}
      {(!cfg.topbar && reopen) && <SidebarTrigger className="absolute left-2 top-2 z-10" />}
      {children !== undefined ? <main className="min-h-0 flex-1 overflow-auto">{children}</main> : <SisoFrameFixturePage title={title} page={page} groups={groups} />}
    </>
  )
}

// opens the phone sheet on mount, for the "phone, menu open" state of the real phone window
function OpenOnPhone() {
  const { setOpenMobile } = useSidebar()
  React.useEffect(() => { setOpenMobile(true) }, [setOpenMobile])
  return null
}

export type FrameView = { only?: "sidebar"; state?: "expanded" | "collapsed" | "phone-open" | "phone" }

// a phone drawn in the page, not a real phone window: the page dimmed behind and the menu open as the sheet a phone
// shows (shadcn draws it 18rem wide). In rail plus panel the rail is the tab bar along the bottom.
function DrawnPhone({ c, space, setSpace, inner, page, children }: { c: FrameCfg; space: Space; setSpace: (s: Space) => void; inner: React.ReactNode; page: string; children?: React.ReactNode }) {
  return (
    <SidebarProvider open onOpenChange={() => {}} className="!min-h-0 h-full">
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4"><SidebarTrigger className="-ml-1" /><span className="text-sm font-medium">{page}</span><Bell className="ml-auto size-4 text-muted-foreground" /></header>
        {children !== undefined ? <main className="min-h-0 flex-1 overflow-auto">{children}</main> : <div className="grid auto-rows-min gap-3 p-4">{STATS.map(([k, v]) => <div key={k} className="rounded-xl border bg-card p-3"><p className="text-xs text-muted-foreground">{k}</p><p className="text-xl font-semibold">{v}</p></div>)}</div>}
        {c.layout === "rail-panel" && <Rail space={space} setSpace={setSpace} bottom />}
        <div className="absolute inset-0 z-30 bg-black/50" />
        <Sidebar collapsible="none" className="absolute inset-y-0 left-0 z-40 h-full w-72 border-r border-sidebar-border shadow-xl">{inner}</Sidebar>
      </div>
    </SidebarProvider>
  )
}

// still: a preview; no ⌘K listener, so a page of previews does not open a palette per frame.
// state pins the sidebar open or collapsed, or draws the phone, so states sit side by side instead of behind a click.
// peek: open the top or bottom menu at once, for compares. only="sidebar": the nav alone, no page.
export type SisoAppFrameProps = {
  cfg?: Partial<FrameCfg>
  still?: boolean
  peek?: "header" | "footer"
  /** Replaces the source dashboard fixture with consumer page content. */
  children?: React.ReactNode
  /** Optional navigation groups; omit to inspect the original source fixture. */
  navigation?: Space["groups"]
} & FrameView

export default function SisoAppFrame({ cfg = SISO_FRAME, still = false, only, state, peek, children, navigation }: SisoAppFrameProps) {
  const c = fit(normalise(cfg))
  const [space, setSpaceRaw] = React.useState(SPACES[0])
  const [tool, setTool] = React.useState(0)
  const setSpace = (s: Space) => { setSpaceRaw(s); setTool(0) }
  const [cmd, setCmd] = React.useState(false)
  React.useEffect(() => {
    if (still) return
    const k = (e: KeyboardEvent) => { if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setCmd((o) => !o) } }
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [still])
  const t = c.tools > 0 && tool > 0 && tool < c.tools ? TOOLS[tool] : null
  const groups = navigation ?? t?.groups ?? space.groups
  const title = t?.title ?? space.title
  const page = groups[0]?.items[0]?.title ?? title
  const onSearch = () => setCmd(true)
  const palette = !still && (
    <CommandDialog open={cmd} onOpenChange={setCmd}>
      <CommandInput placeholder="Search or jump to…" />
      <CommandList><CommandEmpty>Nothing found.</CommandEmpty>
        <CommandGroup heading="Spaces">{SPACES.map((s) => <CommandItem key={s.id} onSelect={() => { setSpace(s); setCmd(false) }}><s.icon size={16} className={I16} /> {s.title}</CommandItem>)}</CommandGroup>
        {c.tools > 0 && <CommandGroup heading="Tools">{TOOLS.slice(0, c.tools).map((x, i) => <CommandItem key={x.title} onSelect={() => { setTool(i); setCmd(false) }}>{x.title}</CommandItem>)}</CommandGroup>}
      </CommandList>
    </CommandDialog>
  )
  const pinned = state === "expanded" || state === "collapsed" ? { open: state === "expanded", onOpenChange: () => {} } : {}
  const inner = (
    <>
      <SidebarHeader>
        {/* the collapse button is always up top, beside the brand */}
        <div className="flex items-center gap-1 group-data-[collapsible=icon]:flex-col">
          <div className="min-w-0 flex-1">{c.layout === "rail-panel" ? <SpaceSwitch space={space} setSpace={setSpace} peek={peek === "header"} /> : <Brand cfg={c} space={space} setSpace={setSpace} peek={peek === "header"} />}</div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent><Nav cfg={c} groups={groups} id={`${space.id}-${t?.title ?? ""}`} onSearch={onSearch} tools={c.tools} tool={tool} setTool={setTool} /></SidebarContent>
      <SidebarFooter>{c.layout === "rail-panel" ? <p className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden"><span className="size-2 rounded-full bg-emerald-500" />All systems healthy</p> : <Foot cfg={c} peek={peek === "footer"} />}</SidebarFooter>
    </>
  )
  if (state === "phone") return <DrawnPhone c={c} space={space} setSpace={setSpace} inner={inner} page={page}>{children}</DrawnPhone>
  return (
    <SidebarProvider {...pinned} className={only ? "!min-h-0 h-svh" : undefined}>
      {state === "phone-open" && <OpenOnPhone />}
      {c.layout === "rail-panel" && <Rail space={space} setSpace={setSpace} />}
      <Sidebar variant={c.look === "plain" ? "sidebar" : c.look} collapsible={c.collapse} className={c.layout === "rail-panel" ? "md:left-16" : undefined}>{inner}</Sidebar>
      {!only && <SidebarInset className="min-h-0 overflow-hidden"><Main cfg={c} title={title} page={page} groups={groups} onSearch={onSearch}>{children}</Main></SidebarInset>}
      {palette}
    </SidebarProvider>
  )
}

/** Original demonstration data from app-frame.tsx, deliberately labelled as a fixture. */
export const SISO_FRAME_FIXTURE = { spaces: SPACES, tools: TOOLS, stats: STATS, rows: ROWS }
