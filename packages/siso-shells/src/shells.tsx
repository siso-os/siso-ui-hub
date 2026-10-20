// uihub: siso:shells
import { useEffect, useId, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export const SISO_SHELL_PRESETS = {
  hub: { layout: 'sidebar', collapseMode: 'offcanvas', look: 'inset' },
  sidebar: { layout: 'sidebar', collapseMode: 'icon', look: 'inset' },
  'rail-panel': { layout: 'rail-panel', collapseMode: 'offcanvas', look: 'inset' },
} as const

export interface SisoShellSlotContext {
  collapsed: boolean
  mobile: boolean
  closeMobile: () => void
}
type Slot = ReactNode | ((context: SisoShellSlotContext) => ReactNode)
export interface SisoShellProps {
  children: ReactNode
  brand?: Slot
  navigation?: Slot
  /** Pinned below the scrolling navigation; use for profile/account controls. */
  profile?: Slot
  sidebarFooter?: Slot
  topbar?: ReactNode
  topbarActions?: ReactNode
  mobileTabs?: ReactNode
  footer?: ReactNode
  /** Supply a button/palette trigger, or use onSearch for the built-in trigger. */
  search?: Slot
  onSearch?: () => void
  searchLabel?: string
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  sidebarWidth?: number
  defaultSidebarWidth?: number
  onSidebarWidthChange?: (width: number) => void
  minSidebarWidth?: number
  maxSidebarWidth?: number
  resizable?: boolean
  /** Enables scoped Cmd/Ctrl+K and Cmd/Ctrl+B while focus is inside this shell. */
  shortcuts?: boolean
  navigationLabel?: string
  contentLabel?: string
  className?: string
  style?: CSSProperties
}
export interface SisoAppShellProps extends SisoShellProps {
  preset?: 'sidebar' | 'rail-panel'
  rail?: Slot
  look?: 'plain' | 'inset' | 'floating'
  collapseMode?: 'icon' | 'offcanvas'
}

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n))
const finite = (n: number | undefined, fallback: number) => Number.isFinite(n) ? n! : fallback
function useValue<T>(controlled: T | undefined, initial: T, onChange?: (value: T) => void) {
  const [local, setLocal] = useState(initial)
  return [controlled ?? local, (value: T) => { if (controlled === undefined) setLocal(value); onChange?.(value) }] as const
}
const slot = (value: Slot | undefined, context: SisoShellSlotContext) => typeof value === 'function' ? value(context) : value

/** The UI Hub's sidebar/topbar/content frame, with application state replaced by slots. */
export function SisoHubShell(props: SisoShellProps) {
  return <Shell {...props} layout="sidebar" collapseMode="offcanvas" look="inset" />
}

/** The real app-frame choices: one sidebar, or a workspace rail plus its navigation panel. */
export function SisoAppShell({ preset = 'sidebar', rail, look = 'inset', collapseMode, ...props }: SisoAppShellProps) {
  return <Shell {...props} rail={rail} layout={preset} look={look}
    collapseMode={preset === 'rail-panel' ? 'offcanvas' : collapseMode ?? 'icon'} />
}

function Shell({ children, brand, navigation, profile, sidebarFooter, topbar, topbarActions,
  mobileTabs, footer, search, onSearch, searchLabel = 'Search', collapsed: controlledCollapsed,
  defaultCollapsed = false, onCollapsedChange, mobileOpen: controlledMobile, onMobileOpenChange,
  sidebarWidth: controlledWidth, defaultSidebarWidth = 256, onSidebarWidthChange,
  minSidebarWidth = 216, maxSidebarWidth = 400, resizable = true, shortcuts = true,
  navigationLabel = 'Navigation', contentLabel = 'Main content', className = '', style,
  layout, collapseMode, look, rail,
}: SisoShellProps & { layout: 'sidebar' | 'rail-panel'; collapseMode: 'icon' | 'offcanvas'; look: 'plain' | 'inset' | 'floating'; rail?: Slot }) {
  const [collapsed, setCollapsed] = useValue(controlledCollapsed, defaultCollapsed, onCollapsedChange)
  const [mobileOpen, setMobileOpen] = useValue(controlledMobile, false, onMobileOpenChange)
  const min = Math.max(160, finite(minSidebarWidth, 216))
  const max = Math.max(min, finite(maxSidebarWidth, 400))
  const [rawWidth, setWidth] = useValue(controlledWidth, defaultSidebarWidth, onSidebarWidthChange)
  const width = clamp(finite(rawWidth, 256), min, max)
  const [dragging, setDragging] = useState(false)
  const drag = useRef<{ pointer: number; x: number; width: number } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const id = useId()
  const closeMobile = () => setMobileOpen(false)
  const context = (mobile: boolean): SisoShellSlotContext => ({ collapsed: mobile ? false : collapsed, mobile, closeMobile })

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (mobileOpen && !node.open) node.showModal()
    if (!mobileOpen && node.open) node.close()
  }, [mobileOpen])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const close = () => { if (media.matches) setMobileOpen(false) }
    close()
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [controlledMobile, onMobileOpenChange])

  const panel = (mobile: boolean) => {
    const ctx = context(mobile)
    return <>
      <div className="siso-shell__brand">
        <div className="siso-shell__brand-slot">{slot(brand, ctx)}</div>
        <button type="button" className="siso-shell__button" aria-label={mobile ? 'Close navigation' : collapsed ? 'Expand navigation' : 'Collapse navigation'}
          aria-expanded={mobile ? mobileOpen : !collapsed} onClick={mobile ? closeMobile : () => setCollapsed(!collapsed)}>
          <span aria-hidden="true">{mobile ? '×' : collapsed ? '›' : '‹'}</span>
        </button>
      </div>
      {(search || onSearch) && <div className="siso-shell__search">{search ? slot(search, ctx) :
        <button type="button" className="siso-shell__search-button" aria-label={searchLabel} onClick={() => { if (mobile) closeMobile(); onSearch?.() }}>
          <span aria-hidden="true">⌕</span><span className="siso-shell__search-label">{searchLabel}</span>
          <kbd className="siso-shell__search-label">⌘K</kbd>
        </button>}</div>}
      <div className="siso-shell__nav">{slot(navigation, ctx)}</div>
      {(sidebarFooter || profile) && <div className="siso-shell__profile">{slot(sidebarFooter, ctx)}{slot(profile, ctx)}</div>}
    </>
  }

  return <div className={`siso-shell ${className}`} data-layout={layout} data-look={look}
    data-collapsed={collapsed} data-collapse={collapseMode} data-resizing={dragging}
    style={{ '--siso-shell-panel-width': `${width}px`, ...style } as CSSProperties}
    onKeyDown={event => {
      if (event.defaultPrevented || !shortcuts || !(event.metaKey || event.ctrlKey) || event.altKey || event.repeat) return
      const target = event.target as HTMLElement
      if (target.closest('input,textarea,select,[contenteditable="true"]')) return
      if (event.key.toLowerCase() === 'k' && onSearch) { event.preventDefault(); onSearch() }
      if (event.key.toLowerCase() === 'b') { event.preventDefault(); setCollapsed(!collapsed) }
    }}>
    <a className="siso-shell__skip" href={`#${id}-main`}>Skip to content</a>
    {layout === 'rail-panel' && <aside className="siso-shell__rail" aria-label="Workspaces">{slot(rail, context(false))}</aside>}
    <aside id={`${id}-sidebar`} className="siso-shell__sidebar" aria-label={navigationLabel} inert={collapsed && collapseMode === 'offcanvas'}>
      {panel(false)}
      {resizable && !collapsed && <div role="separator" tabIndex={0} aria-label="Resize navigation" aria-orientation="vertical"
        aria-valuemin={min} aria-valuemax={max} aria-valuenow={width} className="siso-shell__resize"
        title="Drag or use arrow keys to resize; double-click to reset"
        onDoubleClick={() => setWidth(clamp(defaultSidebarWidth, min, max))}
        onKeyDown={event => {
          let next: number | undefined
          if (event.key === 'ArrowLeft') next = width - (event.shiftKey ? 32 : 8)
          if (event.key === 'ArrowRight') next = width + (event.shiftKey ? 32 : 8)
          if (event.key === 'Home') next = min
          if (event.key === 'End') next = max
          if (next !== undefined) { event.preventDefault(); setWidth(clamp(next, min, max)) }
        }}
        onPointerDown={event => {
          if (event.button !== 0) return
          event.preventDefault()
          event.currentTarget.setPointerCapture(event.pointerId)
          drag.current = { pointer: event.pointerId, x: event.clientX, width }
          setDragging(true)
        }}
        onPointerMove={event => { const d = drag.current; if (d && d.pointer === event.pointerId) setWidth(clamp(Math.round(d.width + event.clientX - d.x), min, max)) }}
        onPointerUp={event => { if (drag.current?.pointer === event.pointerId) { drag.current = null; setDragging(false); event.currentTarget.releasePointerCapture(event.pointerId) } }}
        onLostPointerCapture={() => { drag.current = null; setDragging(false) }}
        onPointerCancel={() => { drag.current = null; setDragging(false) }} />}
    </aside>
    <div className="siso-shell__body">
      <header className="siso-shell__topbar">
        <button ref={trigger} type="button" className="siso-shell__button siso-shell__mobile-toggle" aria-label="Open navigation"
          aria-expanded={mobileOpen} aria-controls={`${id}-mobile`} onClick={() => setMobileOpen(true)}>☰</button>
        {collapsed && collapseMode === 'offcanvas' && <button type="button" className="siso-shell__button siso-shell__restore"
          aria-label="Expand navigation" aria-controls={`${id}-sidebar`} onClick={() => setCollapsed(false)}>›</button>}
        <div className="siso-shell__topbar-content">{topbar}</div>
        <div className="siso-shell__actions">{topbarActions}</div>
      </header>
      {mobileTabs && <div className="siso-shell__mobile-tabs">{mobileTabs}</div>}
      <main id={`${id}-main`} tabIndex={-1} aria-label={contentLabel} className="siso-shell__content">{children}</main>
      {footer && <footer className="siso-shell__footer">{footer}</footer>}
    </div>
    <dialog ref={dialog} id={`${id}-mobile`} className="siso-shell__dialog" aria-label={navigationLabel}
      onCancel={event => { event.preventDefault(); closeMobile() }}
      onClose={() => { setMobileOpen(false); trigger.current?.focus() }}
      onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX > rect.right || event.clientY > rect.bottom || event.clientX < rect.left || event.clientY < rect.top) closeMobile() } }}>
      <div className="siso-shell__mobile-panel">{layout === 'rail-panel' && <div className="siso-shell__mobile-rail">{slot(rail, context(true))}</div>}{panel(true)}</div>
    </dialog>
  </div>
}
