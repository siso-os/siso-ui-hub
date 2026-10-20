// uihub: siso:navigation
// SISO-owned navigation behaviors extracted from SideNav/AppShell/app-frame; see NOTICE.
import { useEffect, useId, useRef, useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';

export interface SisoNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  count?: number | string;
  children?: SisoNavItem[];
  disabled?: boolean;
}
export interface SisoNavGroup { id: string; label?: string; items: SisoNavItem[] }
export type SisoRenderLink = (props: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }, item: SisoNavItem) => ReactNode;
export interface SisoNavigationProps {
  activeId?: string;
  onNavigate?: (id: string) => void;
  renderLink?: SisoRenderLink;
}
export interface SisoSideNavProps extends SisoNavigationProps {
  groups: SisoNavGroup[];
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  expandedIds?: string[];
  defaultExpandedIds?: string[];
  onExpandedChange?: (ids: string[]) => void;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

function normalClick(event: MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}
function ItemControl({ item, activeId, onNavigate, renderLink, collapsed = false }: SisoNavigationProps & { item: SisoNavItem; collapsed?: boolean }) {
  const children = <><span className="siso-nav__icon" aria-hidden="true">{item.icon ?? <span className="siso-nav__dot" />}</span><span className="siso-nav__label">{item.label}</span>{item.count !== undefined && <span className="siso-nav__count">{item.count}</span>}</>;
  const shared = { className: 'siso-nav__item', 'data-active': activeId === item.id || undefined, title: collapsed ? `${item.label}${item.count !== undefined ? ` (${item.count})` : ''}` : undefined, 'aria-current': activeId === item.id ? 'page' as const : undefined };
  if (item.disabled) return <span {...shared} aria-disabled="true">{children}</span>;
  if (item.href) {
    const props = { ...shared, href: item.href, children, onClick: (event: MouseEvent<HTMLAnchorElement>) => { if (normalClick(event)) onNavigate?.(item.id); } };
    return renderLink ? renderLink(props, item) : <a {...props} />;
  }
  return <button {...shared} type="button" onClick={() => onNavigate?.(item.id)}>{children}</button>;
}
function ancestorIds(items: SisoNavItem[], activeId?: string): string[] {
  return items.flatMap(item => {
    const nested = ancestorIds(item.children ?? [], activeId);
    return item.children?.some(child => child.id === activeId) || nested.length ? [item.id, ...nested] : [];
  });
}
function NavBranch({ item, expanded, toggle, ...props }: SisoNavigationProps & { item: SisoNavItem; expanded: string[]; toggle: (id: string) => void; collapsed: boolean }) {
  const regionId = useId();
  const hasChildren = !!item.children?.length;
  const open = expanded.includes(item.id);
  return <li className="siso-nav__branch">
    <div className="siso-nav__row">
      {hasChildren && !item.href && !props.onNavigate ? <button type="button" className="siso-nav__item" disabled={item.disabled} aria-expanded={open} aria-controls={regionId} title={props.collapsed ? item.label : undefined} onClick={() => toggle(item.id)}>
        <span className="siso-nav__icon" aria-hidden="true">{item.icon ?? <span className="siso-nav__dot" />}</span><span className="siso-nav__label">{item.label}</span>{item.count !== undefined && <span className="siso-nav__count">{item.count}</span>}<span className="siso-nav__chevron" aria-hidden="true">{open ? '⌄' : '›'}</span>
      </button> : <><ItemControl {...props} item={item} />{hasChildren && <button type="button" className="siso-nav__fold" disabled={item.disabled} aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`} aria-expanded={open} aria-controls={regionId} onClick={() => toggle(item.id)}><span aria-hidden="true">{open ? '⌄' : '›'}</span></button>}</>}
    </div>
    {hasChildren && <ul id={regionId} hidden={!open} className="siso-nav__children">{item.children!.map(child => <NavBranch key={child.id} {...props} item={child} expanded={expanded} toggle={toggle} />)}</ul>}
  </li>;
}

/** Grouped disclosure navigation. Native list/link semantics intentionally avoid ARIA tree keyboard expectations. */
export function SisoSideNav({ groups, activeId, onNavigate, renderLink, collapsed = false, onCollapsedChange, expandedIds, defaultExpandedIds = [], onExpandedChange, header, footer, className = '', 'aria-label': label = 'Main navigation' }: SisoSideNavProps) {
  const ancestors = ancestorIds(groups.flatMap(group => group.items), activeId);
  const [internalExpanded, setInternalExpanded] = useState(() => [...new Set([...defaultExpandedIds, ...ancestors])]);
  const expanded = expandedIds ?? internalExpanded;
  useEffect(() => {
    if (expandedIds !== undefined) return;
    const required = ancestorIds(groups.flatMap(group => group.items), activeId);
    setInternalExpanded(previous => required.every(id => previous.includes(id)) ? previous : [...new Set([...previous, ...required])]);
  }, [groups, activeId, expandedIds]);
  const toggle = (id: string) => {
    const next = expanded.includes(id) ? expanded.filter(value => value !== id) : [...expanded, id];
    if (expandedIds === undefined) setInternalExpanded(next);
    onExpandedChange?.(next);
  };
  return <nav className={`siso-nav ${className}`} data-collapsed={collapsed || undefined} aria-label={label}>
    {(header || onCollapsedChange) && <div className="siso-nav__header"><div className="siso-nav__header-content">{header}</div>{onCollapsedChange && <button type="button" className="siso-nav__collapse" aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'} aria-expanded={!collapsed} onClick={() => onCollapsedChange(!collapsed)}><span aria-hidden="true">{collapsed ? '»' : '«'}</span></button>}</div>}
    <div className="siso-nav__scroll">{groups.map(group => <section key={group.id} className="siso-nav__group" aria-label={group.label}>{group.label && <div className="siso-nav__group-label">{group.label}</div>}<ul className="siso-nav__list">{group.items.map(item => <NavBranch key={item.id} item={item} activeId={activeId} onNavigate={onNavigate} renderLink={renderLink} collapsed={collapsed} expanded={expanded} toggle={toggle} />)}</ul></section>)}</div>
    {footer && <div className="siso-nav__footer">{footer}</div>}
  </nav>;
}

export interface SisoMobileNavProps extends Omit<SisoSideNavProps, 'collapsed' | 'onCollapsedChange'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  closeLabel?: string;
}
/** Native modal dialog supplies focus containment, Escape and restoration to the trigger. */
export function SisoMobileNav({ open, onOpenChange, trigger = 'Menu', closeLabel = 'Close navigation', onNavigate, ...props }: SisoMobileNavProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const dialog = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const change = (next: boolean) => { if (open === undefined) setInternalOpen(next); onOpenChange?.(next); };
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (isOpen && !element.open) element.showModal();
    if (!isOpen && element.open) element.close();
  }, [isOpen]);
  return <><button type="button" className="siso-nav__mobile-trigger" aria-haspopup="dialog" aria-expanded={isOpen} aria-controls={dialogId} onClick={() => change(true)}>{trigger}</button>
    <dialog id={dialogId} ref={dialog} className="siso-nav__dialog" aria-label={props['aria-label'] ?? 'Main navigation'} onCancel={event => { event.preventDefault(); change(false); }} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) change(false); } }}>
      <button type="button" className="siso-nav__mobile-close" aria-label={closeLabel} onClick={() => change(false)}>×</button>
      <SisoSideNav {...props} onNavigate={id => { onNavigate?.(id); change(false); }} />
    </dialog></>;
}

export interface SisoNavSwitcherProps {
  items: { id: string; label: string; disabled?: boolean }[];
  value: string;
  onValueChange: (id: string) => void;
  label?: string;
  className?: string;
}
/** Native select: keyboard and touch support without popup, router, or workspace-store dependencies. */
export function SisoNavSwitcher({ items, value, onValueChange, label = 'Workspace', className = '' }: SisoNavSwitcherProps) {
  return <label className={`siso-nav-switcher ${className}`}><span className="siso-nav-switcher__label">{label}</span><select value={value} onChange={event => onValueChange(event.target.value)}>{items.map(item => <option key={item.id} value={item.id} disabled={item.disabled}>{item.label}</option>)}</select></label>;
}
export interface SisoToolNavProps extends SisoNavigationProps { items: SisoNavItem[]; orientation?: 'horizontal' | 'vertical'; className?: string; 'aria-label'?: string }
export function SisoToolNav({ items, orientation = 'horizontal', className = '', 'aria-label': label = 'Tools', ...props }: SisoToolNavProps) {
  return <nav aria-label={label} className={`siso-tool-nav ${className}`} data-orientation={orientation}><ul>{items.map(item => <li key={item.id}><ItemControl {...props} item={item} collapsed /></li>)}</ul></nav>;
}
export interface SisoBreadcrumbsProps extends Pick<SisoNavigationProps, 'renderLink' | 'onNavigate'> { items: SisoNavItem[]; className?: string; 'aria-label'?: string }
export function SisoBreadcrumbs({ items, className = '', 'aria-label': label = 'Breadcrumb', ...props }: SisoBreadcrumbsProps) {
  return <nav aria-label={label} className={`siso-breadcrumbs ${className}`}><ol>{items.map((item, index) => <li key={item.id}>{index > 0 && <span className="siso-breadcrumbs__separator" aria-hidden="true">/</span>}{index === items.length - 1 ? <span aria-current="page">{item.label}</span> : <ItemControl item={item} {...props} />}</li>)}</ol></nav>;
}
export interface SisoPageTabsProps extends SisoNavigationProps { items: SisoNavItem[]; className?: string; 'aria-label'?: string }
/** Page links styled as tabs. These navigate pages; they do not implement tab panels. */
export function SisoPageTabs({ items, className = '', 'aria-label': label = 'Page navigation', ...props }: SisoPageTabsProps) {
  return <nav aria-label={label} className={`siso-page-tabs ${className}`}><ul>{items.map(item => <li key={item.id}><ItemControl {...props} item={item} /></li>)}</ul></nav>;
}
