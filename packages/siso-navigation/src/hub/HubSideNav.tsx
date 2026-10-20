// uihub: siso:hub-side-nav
// Source extraction: app/src/components/SideNav.tsx. Presentation preserved; caller supplies data and routing.
import * as React from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, ChevronDown, ChevronLeft, ChevronRight, Keyboard, PanelLeftClose, Search, ScrollText, Sparkles, type LucideIcon } from 'lucide-react';
import { NavGlyph } from './NavGlyph';
import { cn } from './icons/cn';
import sisoMark from '../../assets/siso-mark.png';
function Link({to, ...props}: Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {to: string}) { return <a href={to} {...props} /> }
export interface SisoHubNavFootProps { name: string; pub?: boolean; version: string; subtitle?: string; docsHref?: string; changelogHref?: string; packagesHref?: string; releases?: {id:string;v:string;name:string;when:string;note:string}[]; shortcuts?: [string,string][] }

export function SisoHubNavSlide({ k, dir, children }: { k: string; dir: 1 | -1; children: React.ReactNode }) {
  const prev = useRef<{ k: string; node: React.ReactNode } | null>(null)
  const [leaving, setLeaving] = useState<{ k: string; node: React.ReactNode; dir: 1 | -1 } | null>(null)
  useLayoutEffect(() => {
    if (prev.current && prev.current.k !== k) setLeaving({ k, node: prev.current.node, dir })
    prev.current = { k, node: children }
  })
  useEffect(() => { if (!leaving) return; const timer = setTimeout(() => setLeaving(null), 450); return () => clearTimeout(timer) }, [leaving])
  return (
    <div className="relative min-h-0 flex-1 overflow-hidden [contain:paint]">
      {leaving && (
        <div inert key={`leave:${leaving.k}`} className={cn("pointer-events-none absolute inset-0 overflow-hidden px-3 pt-1", leaving.dir > 0 ? "siso-leave-in" : "siso-leave-out")} onAnimationEnd={(e) => e.target === e.currentTarget && setLeaving(null)}>
          {leaving.node}
        </div>
      )}
      <div key={k} className={cn("h-full overflow-y-auto px-3 pt-1 pb-6 [scrollbar-width:thin] [mask-image:linear-gradient(to_bottom,#000_calc(100%-28px),transparent)]", leaving && (leaving.dir > 0 ? "siso-enter-in" : "siso-enter-out"))}>
        {children}
      </div>
    </div>
  )
}

export function SisoHubNavRow({ to, active, icon, children, count, dot, onNavigate, className, title, iconNode, disabled }: { to: string; active: boolean; icon?: LucideIcon; children: React.ReactNode; count?: number | string; dot?: boolean; onNavigate?: (event: React.MouseEvent<HTMLAnchorElement>) => void; className?: string; title?: string; iconNode?: React.ReactNode; disabled?: boolean }) {
  return (
    <Link
      to={to}
      onClick={(event) => { if (disabled) { event.preventDefault(); return }; onNavigate?.(event) }}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      aria-current={active ? "page" : undefined}
      data-active={active || undefined}
      title={title}
      className={cn("siso-nav-row relative flex h-8 items-center gap-2.5 rounded-lg px-2 text-[13.5px] text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground", active && "font-medium", className)}
    >
      {iconNode ?? (icon && <NavGlyph icon={icon} active={active} />)}
      {children}
      {dot && <span className="size-1.5 shrink-0 rounded-full bg-neon" aria-label="has his picks" />}
      {count !== undefined && <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">{typeof count === "number" ? count.toLocaleString("en-GB") : count}</span>}
    </Link>
  )
}

export function SisoHubSearchButton({ onSearch, label, commandShortcut = true }: { onSearch: () => void; label: string; commandShortcut?: boolean }) {
  const open = useRef(onSearch)
  open.current = onSearch
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if ((e.key === "/" || (commandShortcut && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) && !/input|textarea|select/i.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault()
        open.current()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [commandShortcut])
  return (
    <button type="button" onClick={onSearch} data-verify-sidebar-search className="siso-field siso-press flex h-9 w-full items-center gap-2 bg-foreground/[0.04] pr-2 pl-2.5 text-left text-sm text-muted-foreground shadow-[inset_0_0_0_1px_var(--border)] hover:text-foreground">
      <NavGlyph icon={Search} size={15} />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <kbd className="rounded-[5px] border bg-foreground/[0.04] px-1.5 py-px font-mono text-[10px]">⌘K</kbd>
    </button>
  )
}

export function SisoHubNavFoot({ name, pub = false, version, subtitle, docsHref, changelogHref, packagesHref, releases = [], shortcuts = [] }: SisoHubNavFootProps) {
  const [open, setOpen] = useState<"" | "menu" | "news" | "keys">("")
  const ref = useRef<HTMLDivElement>(null)
  const news = releases.slice(0, 14)
  useEffect(() => {
    if (!open) return
    const out = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen("")
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen("")
    window.addEventListener("pointerdown", out)
    window.addEventListener("keydown", esc)
    return () => {
      window.removeEventListener("pointerdown", out)
      window.removeEventListener("keydown", esc)
    }
  }, [open])
  const row = "siso-press flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13px] text-foreground/85 hover:bg-sidebar-accent hover:text-foreground"
  return (
    <div ref={ref} className="relative flex shrink-0 justify-center px-3 pt-1 pb-3" data-verify-foot {...(pub ? { "data-verify-public": "" } : {})}>
      {open && (
        <div role="dialog" aria-label={name} className="siso-rise absolute bottom-full left-1/2 z-40 mb-1 w-[252px] -translate-x-1/2 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg backdrop-blur-xl">
          {open === "menu" ? (
            <>
              <div className="flex items-center gap-2.5 px-2 pt-1 pb-2">
                <img src={sisoMark} alt="" width={24} height={24} className="siso-mark size-6" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13.5px] font-semibold">
                    {name} {version}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{subtitle}</div>
                </div>
              </div>
              <div className="mx-2 mb-1 h-px bg-border" />
              <button className={row} onClick={() => setOpen("news")}>
                <Sparkles className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">What's new</span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
              </button>
              <a className={row} href={docsHref} target="_blank" rel="noreferrer">
                <BookOpen className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">Docs</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </a>
              <a className={row} href={changelogHref} target="_blank" rel="noreferrer">
                <ScrollText className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">Changelog</span>
                <ArrowUpRight className="size-3.5 text-muted-foreground" />
              </a>
              <button className={row} onClick={() => setOpen("keys")}>
                <Keyboard className="size-4 text-muted-foreground" strokeWidth={1.75} />
                <span className="flex-1">Keyboard shortcuts</span>
                <ChevronRight className="size-3.5 text-muted-foreground" />
              </button>
            </>
          ) : (
            <>
              <button className={cn(row, "gap-1 font-medium")} onClick={() => setOpen("menu")}>
                <ChevronLeft className="size-4 text-muted-foreground" />
                {open === "news" ? "What's new" : "Keyboard shortcuts"}
              </button>
              {open === "news" ? (
                <ol className="max-h-[380px] overflow-y-auto px-1 pb-1" data-verify-releases>
                  {news.map((v, i) => (
                    <li key={`${v.id}:${v.v}`} className="relative py-2 pr-1 pl-5">
                      <span className={cn("absolute top-[13px] left-[6px] size-2 rounded-full", i === 0 ? "siso-dot" : "bg-muted-foreground/40")} />
                      <div className="flex items-baseline gap-2">
                        <span className="text-[13px] font-semibold">
                          {v.name} {v.v}
                        </span>
                        <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">{v.when}</span>
                      </div>
                      <p className="mt-0.5 line-clamp-3 text-xs leading-snug text-muted-foreground">{v.note}</p>
                    </li>
                  ))}
                  <li className="px-1 pt-1">
                    <Link to={packagesHref ?? "#packages"} onClick={() => setOpen("")} className="text-xs font-medium text-foreground/80 hover:underline">
                      Every package and version →
                    </Link>
                  </li>
                </ol>
              ) : (
                <ul className="px-1 pb-1">
                  {shortcuts.map(([k, what]) => (
                    <li key={k} className="flex items-center gap-2 px-1 py-1.5 text-[13px]">
                      <span className="flex-1 text-foreground/85">{what}</span>
                      <kbd className="rounded-[5px] border bg-foreground/[0.04] px-1.5 py-px font-mono text-[10.5px] text-muted-foreground">{k}</kbd>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
      <button onClick={() => setOpen(open ? "" : "menu")} aria-expanded={!!open} className="siso-press flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] text-muted-foreground hover:text-foreground" title="What's new, the docs and the changelog">
        <span className="siso-dot size-1.5 rounded-full" />
        {name} {version}
      </button>
    </div>
  )
}


export interface SisoHubNavItem {
  id: string; label: string; href?: string; icon?: LucideIcon; iconNode?: React.ReactNode;
  count?: number | string; dot?: boolean; disabled?: boolean; title?: string;
  children?: SisoHubNavItem[]; behavior?: 'fold' | 'drill';
}
export interface SisoHubNavGroup { id: string; label?: string; items: SisoHubNavItem[]; description?: string }
export interface SisoHubSideNavProps {
  groups: SisoHubNavGroup[]; coreGroups?: SisoHubNavGroup[]; places?: SisoHubNavItem[];
  activeId?: string; coreId?: string; coreLabel?: string; brand?: string; homeHref?: string;
  factory?: boolean; onSearch: () => void; onNavigate?: (item: SisoHubNavItem, event: React.MouseEvent<HTMLAnchorElement>) => void;
  onCoreChange?: (item: SisoHubNavItem) => void; onFold?: () => void;
  searchLabel?: string; viewKey?: string; defaultExpandedIds?: string[];
  foot?: Omit<SisoHubNavFootProps, 'name'> & { name?: string }; className?: string;
}

/** The source Places strip: caller-provided destinations replace its hardcoded UI Hub routes. */
export function SisoHubNavPlaces({ items, activeId, onNavigate }: {items: SisoHubNavItem[]; activeId?: string; onNavigate?: SisoHubSideNavProps['onNavigate']}) {
  return <div className="mx-3 flex shrink-0 items-center justify-between border-t border-border/60 px-1 pt-2" data-verify-places>
    {items.map(item => <Link key={item.id} to={item.href ?? '#'} onClick={event => { if (item.disabled) event.preventDefault(); else onNavigate?.(item, event) }} title={item.label} aria-label={item.label} aria-disabled={item.disabled || undefined} tabIndex={item.disabled ? -1 : undefined} aria-current={activeId === item.id ? 'page' : undefined} className={cn('siso-press grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-foreground', activeId === item.id && 'bg-sidebar-accent text-foreground')}>
      {item.iconNode ?? (item.icon && <NavGlyph icon={item.icon} active={activeId === item.id} />)}
    </Link>)}
  </div>
}

/** UI Hub SideNav (looks v8–v11): original presentation with consumer-driven groups instead of app stores. */
export function SisoHubSideNav({ groups, coreGroups = [], places = [], activeId, coreId, coreLabel = 'UI', brand, homeHref = '/', factory = true, onSearch, onNavigate, onCoreChange, onFold, searchLabel, viewKey = 'root', defaultExpandedIds = [], foot, className }: SisoHubSideNavProps) {
  const [hubs, setHubs] = useState(false);
  const [stack, setStack] = useState<SisoHubNavItem[]>([]);
  const [expanded, setExpanded] = useState(() => new Set(defaultExpandedIds));
  const direction = useRef<1 | -1>(1);
  useEffect(() => { setStack([]); setHubs(false) }, [viewKey, coreId]);
  useEffect(() => {
    const find = (items: SisoHubNavItem[]): string[] => items.flatMap(item => { const ids = find(item.children ?? []); return item.children?.some(child => child.id === activeId) || ids.length ? [item.id, ...ids] : [] });
    const ids = find(groups.flatMap(group => group.items));
    if (ids.length) setExpanded(current => new Set([...current, ...ids]));
  }, [activeId, groups]);
  const name = brand ?? (factory ? 'App Factory' : 'SISO UI Hub');
  const current = stack.at(-1);
  const level = hubs ? 'factory' : current ? `fam:${current.id}` : 'root';
  const flip = (id: string) => setExpanded(previous => { const next = new Set(previous); if (next.has(id)) next.delete(id); else next.add(id); return next });
  const row = (item: SisoHubNavItem, pickingCore = false): React.ReactNode => {
    const open = expanded.has(item.id);
    if (item.children?.length) return <div key={item.id}>
      <button type="button" disabled={item.disabled} onClick={() => { if (item.behavior === 'drill') { direction.current = 1; setStack(previous => [...previous, item]) } else flip(item.id) }} aria-expanded={item.behavior === 'drill' ? undefined : open} className="siso-nav-row flex h-8 w-full items-center gap-2.5 rounded-lg px-2 text-left text-[13.5px] text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground">
        {item.iconNode ?? (item.icon && <NavGlyph icon={item.icon} />)}
        <span className={cn('truncate', activeId === item.id && 'font-medium text-sidebar-foreground')}>{item.label}</span>
        {item.count !== undefined && <span className="ml-auto font-mono text-xs text-muted-foreground tabular-nums">{typeof item.count === 'number' ? item.count.toLocaleString('en-GB') : item.count}</span>}
        <ChevronRight className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform duration-150', item.count === undefined && 'ml-auto', item.behavior !== 'drill' && open && 'rotate-90')} />
      </button>
      {item.behavior !== 'drill' && open && <div className="mb-1 ml-[15px] space-y-0.5 border-l border-border/60 pl-2">{item.children.map(child => row(child))}</div>}
    </div>;
    return <SisoHubNavRow key={item.id} to={item.href ?? '#'} active={(pickingCore ? coreId : activeId) === item.id} icon={item.icon} iconNode={item.iconNode} count={item.count} dot={item.dot} title={item.title} disabled={item.disabled} onNavigate={event => {
      if (pickingCore) { direction.current = 1; setHubs(false); setStack([]); onCoreChange?.(item) }
      onNavigate?.(item, event);
    }}><span className="truncate">{item.label}</span></SisoHubNavRow>;
  };
  const section = (group: SisoHubNavGroup, pickingCore = false) => <div key={group.id} data-verify-nav-section={group.label ?? group.id}>
    {group.label && <div className="siso-nav-label px-2 pt-5 pb-1 text-muted-foreground">{group.label}</div>}
    {group.description && <div className="px-2 pb-1 text-[12px] leading-snug text-muted-foreground">{group.description}</div>}
    <div className="space-y-0.5">{group.items.map(item => row(item, pickingCore))}</div>
  </div>;
  return <nav className={cn('siso-hub-nav flex h-full flex-col', className)} aria-label="Main" data-verify-nav-level={level}>
    <div className="flex h-14 shrink-0 items-center gap-1 pr-2 pl-3">
      {factory ? <button type="button" onClick={() => { direction.current = hubs ? 1 : -1; setHubs(!hubs) }} aria-expanded={hubs} title={hubs ? 'Back' : 'Every core in the App Factory'} className="siso-press flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-1 py-1 text-left hover:bg-sidebar-accent" data-verify-switcher>
        <img src={sisoMark} alt="" width={28} height={28} className="siso-mark size-7 shrink-0" />
        <span className="min-w-0 flex-1 leading-tight"><span className="flex items-center gap-1 font-semibold tracking-tight">{name}<ChevronDown className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform duration-200', hubs && 'rotate-180')} /></span><span key={hubs ? 'pick' : coreLabel} className="siso-title block truncate text-xs text-muted-foreground">{hubs ? 'Pick a core' : coreLabel}</span></span>
      </button> : <Link to={homeHref} className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md px-1 font-semibold tracking-tight"><img src={sisoMark} alt="" width={28} height={28} className="siso-mark size-7 shrink-0" />{name}</Link>}
      {onFold && <button type="button" onClick={onFold} aria-label="Fold the side nav away" title="Fold the side nav away (⌘B)" className="siso-press grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"><PanelLeftClose className="size-4" /></button>}
    </div>
    <div className="px-3 pb-2">
      {!hubs && current && <button type="button" onClick={() => { direction.current = -1; setStack(previous => previous.slice(0, -1)) }} className="siso-press mb-2 flex h-8 w-full items-center gap-2 rounded-md px-1 text-sm font-medium hover:bg-sidebar-accent" aria-label="Back to previous navigation" data-verify-nav-back={level}><ChevronLeft className="size-4 text-muted-foreground" /><span key={level} className="siso-title flex-1 truncate pr-6 text-center">{current.label}</span></button>}
      <SisoHubSearchButton onSearch={onSearch} label={searchLabel ?? (hubs ? 'Search the App Factory' : `Search ${coreLabel}`)} />
    </div>
    <SisoHubNavSlide k={hubs ? 'factory' : `${viewKey}:${level}`} dir={direction.current}>
      {hubs ? <div data-verify-hubs>{coreGroups.map(group => section(group, true))}</div> : current ? <div data-verify-nav-family-open={current.id} className="space-y-0.5 pt-1">{current.children?.map(child => row(child))}</div> : groups.map(group => section(group))}
    </SisoHubNavSlide>
    {!hubs && places.length > 0 && <SisoHubNavPlaces items={places} activeId={activeId} onNavigate={onNavigate} />}
    {foot && <SisoHubNavFoot {...foot} name={foot.name ?? name} pub={!factory} />}
  </nav>;
}
export { NavGlyph as SisoHubNavGlyph } from './NavGlyph';
export { navIcon as sisoHubNavIcon } from './navIcons';
