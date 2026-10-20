/**
 * GroupedRail — Zone-1 global rail (UI-FRAMEWORK-CONSTITUTION §7.1).
 *
 * The route groups are the canonical IA contract. Expanded mode presents the
 * grouped labels directly; compact mode preserves the same destination map as
 * icons so collapsing the rail never changes what the navigation means.
 */
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  ContactRound,
  FileText,
  Handshake,
  LayoutDashboard,
  ListTodo,
  Megaphone,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Table2,
  UserRound,
  UsersRound,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { HostUser } from '../auth';
import '../styles/GroupedRail.css';

type RailGroupId = 'overview' | 'brokerage' | 'operations' | 'company';

interface RailDest { id: string; label: string; icon: LucideIcon; to: string }
interface RailGroup { id: RailGroupId; label: string; destinations: RailDest[] }

/** mirrors contract v2 navigation.desktop.groups + domain routes */
export const RAIL_GROUPS: RailGroup[] = [
  { id: 'overview', label: 'Overview', destinations: [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { id: 'calendar', label: 'Calendar', icon: CalendarDays, to: '/calendar' },
  ]},
  { id: 'brokerage', label: 'Brokerage', destinations: [
    { id: 'deals', label: 'Deals', icon: Handshake, to: '/deals' },
    { id: 'buyers', label: 'Buyers', icon: UsersRound, to: '/buyers' },
    { id: 'sellers', label: 'Sellers', icon: Building2, to: '/sellers' },
  ]},
  { id: 'operations', label: 'Operations', destinations: [
    { id: 'tasks', label: 'Tasks', icon: ListTodo, to: '/tasks' },
    { id: 'documents', label: 'Documents', icon: FileText, to: '/documents' },
    { id: 'tables', label: 'Tables', icon: Table2, to: '/tables' },
    { id: 'ai', label: 'AI', icon: Sparkles, to: '/ai' },
    { id: 'reports', label: 'Reports', icon: BarChart3, to: '/reports' },
  ]},
  { id: 'company', label: 'Company', destinations: [
    { id: 'marketing', label: 'Marketing', icon: Megaphone, to: '/marketing' },
    { id: 'team', label: 'Team', icon: ContactRound, to: '/team' },
    { id: 'settings', label: 'Settings', icon: Settings, to: '/settings' },
  ]},
];

const GLOBAL_UTILITIES = [
  { id: 'attention', label: 'Needs you', icon: Bell, to: '/attention' },
  { id: 'new-deal', label: 'New deal', icon: Plus, to: '/deals/new' },
] satisfies RailDest[];

export interface GroupedRailProps {
  collapsed: boolean;
  onToggle: () => void;
  onOpenNotifications: () => void;
  user: HostUser | null;
  isAdmin: boolean;
}

function openShellSearch() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    metaKey: true,
    bubbles: true,
  }));
}

function SidebarSearch({ collapsed }: { collapsed: boolean }) {
  return (
    <button
      type="button"
      className="siso-sidebar__search"
      onClick={openShellSearch}
      aria-label="Open search"
      title="Jump to anything (⌘K)"
      data-shell-search="rail-trigger"
    >
      <Search className="siso-sidebar__search-icon" aria-hidden="true" />
      {!collapsed && <span className="siso-sidebar__search-label">Search…</span>}
      {!collapsed && <kbd className="siso-sidebar__search-shortcut">⌘K</kbd>}
    </button>
  );
}

function LabeledNavigation() {
  return (
    <div className="siso-sidebar__navigation" data-verify-nav-groups={RAIL_GROUPS.length}>
      {RAIL_GROUPS.map((group) => (
        <section
          className="siso-sidebar__nav-group"
          id={`siso-nav-section-${group.id}`}
          key={group.id}
          aria-labelledby={`siso-nav-group-${group.id}`}
        >
          <h2 className="siso-sidebar__group-heading" id={`siso-nav-group-${group.id}`}>
            {group.label}
          </h2>
          <div className="siso-sidebar__nav-items">
            {group.destinations.map(({ id, label, icon: Icon, to }) => (
              <NavLink
                key={id}
                to={to}
                className={({ isActive }) => cn('siso-sidebar__nav-link', isActive && 'is-active')}
              >
                <Icon aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CompactNavigation() {
  const destinations = RAIL_GROUPS.flatMap((group) => group.destinations);

  return (
    <div
      className="siso-sidebar__compact-navigation"
      aria-label="Page navigation"
      data-verify-compact-destinations={destinations.length}
    >
      {destinations.map(({ id, label, icon: Icon, to }) => (
        <NavLink
          key={id}
          to={to}
          className={({ isActive }) => cn('siso-sidebar__compact-link', isActive && 'is-active')}
          aria-label={label}
          title={label}
        >
          <Icon aria-hidden="true" />
        </NavLink>
      ))}
    </div>
  );
}

function GlobalUtilities({ collapsed, onOpenNotifications }: { collapsed: boolean; onOpenNotifications: () => void }) {
  if (collapsed) return null;

  return (
    <div
      className="siso-sidebar__global-row"
      aria-label="Global actions"
      data-verify-global-utilities={GLOBAL_UTILITIES.length}
    >
      {GLOBAL_UTILITIES.map(({ id, label, icon: Icon, to }) => id === 'attention' ? (
        <button
          key={id}
          type="button"
          className="siso-sidebar__utility-link"
          onClick={onOpenNotifications}
          aria-label={label}
          title={label}
        >
          <Icon aria-hidden="true" />
        </button>
      ) : (
        <NavLink
          key={id}
          to={to}
          className={({ isActive }) => cn('siso-sidebar__utility-link', isActive && 'is-active')}
          aria-label={label}
          title={label}
        >
          <Icon aria-hidden="true" />
        </NavLink>
      ))}
    </div>
  );
}

function OperatorDock({ collapsed, user, isAdmin }: { collapsed: boolean; user: HostUser | null; isAdmin: boolean }) {
  const [open, setOpen] = React.useState(false);

  if (collapsed) {
    return (
      <NavLink
        to="/settings?tab=profile"
        className="siso-sidebar__profile is-profile-link"
        title={`${user?.name ?? 'Profile'} · Settings`}
        aria-label="Open profile and settings"
      >
        <div className="siso-sidebar__profile-orb" aria-hidden="true">
          <img src="/icons/icon-96x96.png" alt="" />
        </div>
      </NavLink>
    );
  }

  return (
    <div className="siso-sidebar__operator">
      {open && (
        <div className="siso-sidebar__operator-menu" role="menu" aria-label="Profile and settings">
          <NavLink to="/settings?tab=profile" role="menuitem" onClick={() => setOpen(false)}>
            <UserRound aria-hidden="true" /><span>Profile</span>
          </NavLink>
          <NavLink to="/settings" role="menuitem" onClick={() => setOpen(false)}>
            <Settings aria-hidden="true" /><span>Settings</span>
          </NavLink>
          {isAdmin && (
            <NavLink to="/settings?tab=admin" role="menuitem" onClick={() => setOpen(false)}>
              <ShieldCheck aria-hidden="true" /><span>System administration</span>
            </NavLink>
          )}
        </div>
      )}
      <div
        className="siso-sidebar__profile"
        data-verify-profile-state="authenticated"
      >
        <NavLink to="/settings?tab=profile" className="siso-sidebar__profile-orb" aria-label="Open profile">
          <img src="/icons/icon-96x96.png" alt="" />
        </NavLink>
        <div className="siso-sidebar__profile-copy">
          <span className="siso-sidebar__profile-label">{user?.name ?? 'SISO user'}</span>
          <span className="siso-sidebar__profile-status">{user?.email ?? 'Authenticated'}</span>
        </div>
        <button
          type="button"
          className="siso-sidebar__profile-menu"
          aria-label="Open profile and settings menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function GroupedRail({ collapsed, onToggle, onOpenNotifications, user, isAdmin }: GroupedRailProps) {
  return (
    <nav
      className={cn('siso-sidebar', collapsed ? 'is-collapsed' : 'is-expanded')}
      aria-label="Global navigation"
      data-verify-unit="GroupedRail"
      data-verify-direction="B"
      data-verify-material="champagne-glass-v2"
      data-verify-expanded-width="232"
      data-verify-collapsed-width="52"
      data-verify-utility-width="44"
      data-verify-no-active-space="true"
      data-verify-search-owner="AppShell"
      data-verify-collapsed={String(collapsed)}
    >
      <div className="siso-sidebar__bloom" aria-hidden="true" />
      <div className="siso-sidebar__noise" aria-hidden="true" />

      <header className="siso-sidebar__header">
        <NavLink to="/dashboard" className="siso-sidebar__brand" aria-label="SISO CRM home">
          <img src="/icons/icon-96x96.png" alt="" />
        </NavLink>
        {!collapsed && (
          <div className="siso-sidebar__identity">
            <span className="siso-sidebar__product-name">SISO CRM</span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="siso-sidebar__toggle"
          aria-label={collapsed ? 'Expand rail' : 'Collapse rail'}
          title={collapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {collapsed ? <PanelLeftOpen aria-hidden="true" /> : <PanelLeftClose aria-hidden="true" />}
        </button>
      </header>

      <SidebarSearch collapsed={collapsed} />

      <div className="siso-sidebar__body">
        {collapsed ? <CompactNavigation /> : <LabeledNavigation />}
      </div>

      <GlobalUtilities collapsed={collapsed} onOpenNotifications={onOpenNotifications} />
      <OperatorDock collapsed={collapsed} user={user} isAdmin={isAdmin} />
    </nav>
  );
}
