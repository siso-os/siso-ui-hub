/*
<oracle-context id="oracle-operator.sidebar" layer="operator-board" status="active">
  <purpose>Workspace sidebar: primary work navigation, contextual admin/help, and model shortcuts. All navigation goes through the URL spine (lib/urlState).</purpose>
  <contract>This is the SISOCRM "GroupedRail" ported as-is (SISOCRM product-app/src/components/GroupedRail.tsx + styles/GroupedRail.css). Markup structure, class names, collapse behaviour, compact tooltips, group headings, and active state are the CRM's. Only the navigation model is Operator's: the CRM's react-router NavLink is replaced by lib/urlState nav(), because Operator has no router. The rail is identical on every screen — there is no per-screen collapse.</contract>
</oracle-context>
*/
import * as React from 'react'
import { QueryClientContext } from '@tanstack/react-query'
import {
  Bell,
  Crown,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { BoardPayload, ModelBoard } from '@/lib/types'
import { OracleAreaMenu, DevHubContextNavigation, type OracleArea } from '@/components/devhub/OracleAreaMenu'
import { WorkspaceNotifications } from '@/components/board/WorkspaceNotifications'
import { nav, patchUrl, useWorkspaceUrl, type UrlPatch } from '@/lib/urlState'
import { fleetLivePosture } from '@/components/screens/liveFleetModel'
import '@/styles/GroupedRail.css'
import { staticGlyph, HomeIcon, RadioIcon, UsersIcon, UserPlusIcon, HandCoinsIcon, BadgeAlertIcon, SettingsIcon, SearchIcon, PanelLeftCloseIcon, PanelLeftOpenIcon, type RailIcon, type RailIconHandle } from '@/components/board/icons/railIcons'
import { EyeToggleIcon } from '@/components/board/icons/StateIcons'
import { Popover, Segmented, toast } from '@/ui'
import { AdminHelpPopover, adminHelpRows } from '@/components/board/AdminHelpPopover'
import { ACCENTS, setTheme, setAccent, DEFAULT_THEME, type Theme, type Accent } from '@/styles/theme'

const ADMIN_HELP_SCREENS = new Set(['readiness', 'changes', 'diagnostics', 'needs-you'])
// Glyphs with no animated twin in the bank keep their lucide shape behind the same handle.
const CROWN_GLYPH = staticGlyph(Crown)
const USER_GLYPH = staticGlyph(User)

export type SidebarDestination =
  | 'home'
  | 'streams'
  | 'models'
  | 'onboarding'
  | 'performance'
  | 'leaderboard'
  | 'cases'
  | 'notifications'
  | 'admin-help'
  | 'model'

/**
 * Keep sidebar highlighting tied to the canonical URL screen. In particular,
 * contextual destinations must never fall back to Today, and a session detail
 * remains under its model when that model is present in the URL.
 */
export function sidebarDestinationIsActive(destination: SidebarDestination, screen: string, modelId: string | null, destinationModelId?: string) {
  if (destination === 'admin-help') return ADMIN_HELP_SCREENS.has(screen)
  if (destination === 'model') return (screen === 'model' || screen === 'session' || screen === 'account') && Boolean(destinationModelId) && modelId === destinationModelId
  return screen === destination
}

type RailGroupId = 'primary' | 'context' | 'models'

interface RailDest {
  id: string
  label: string
  icon: RailIcon
  destination: SidebarDestination
  patch: UrlPatch
  destinationModelId?: string
  ariaLabel?: string
  trailing?: React.ReactNode
  attrs?: Record<string, string>
}

interface RailGroup {
  id: RailGroupId
  label: string
  meta?: React.ReactNode
  destinations: RailDest[]
}

/** The fixed part of the IA contract. Models are appended per payload. */
export const PRIMARY_DESTINATIONS: RailDest[] = [
  { id: 'home', label: 'Dashboard', icon: HomeIcon, destination: 'home', patch: { screen: 'home' } },
  { id: 'streams', label: 'Streams', icon: RadioIcon, destination: 'streams', patch: { screen: 'streams' } },
  { id: 'models', label: 'Models', icon: UsersIcon, destination: 'models', patch: { screen: 'models' } },
  { id: 'onboarding', label: 'Onboarding', icon: UserPlusIcon, destination: 'onboarding', patch: { screen: 'onboarding', model: null } },
  { id: 'performance', label: 'Performance', icon: HandCoinsIcon, destination: 'performance', patch: { screen: 'performance', model: null, platform: null, day: null } },
  { id: 'leaderboard', label: 'Leaderboard', icon: CROWN_GLYPH, destination: 'leaderboard', patch: { screen: 'leaderboard', model: null, period: '7d' } },
  { id: 'cases', label: 'Issues', icon: BadgeAlertIcon, destination: 'cases', patch: { screen: 'cases' } },
  // DECISIONS.md: Notifications is NOT a page in the nav — the badged utility bell is the only
  // entry to screen=notifications (review round 1, item 5).
]

export const CONTEXT_DESTINATIONS: RailDest[] = [
  {
    id: 'admin-help',
    label: 'Admin & Help',
    icon: SettingsIcon,
    destination: 'admin-help',
    patch: { screen: 'readiness' },
    ariaLabel: 'Open Admin and Help',
    attrs: { 'data-verify': 'admin-help-trigger', 'data-help-destinations': 'readiness changes diagnostics cases needs-you' },
  },
]

/** Contextual destinations reached from the dock menu, never promoted to primary navigation.
 *  Shaan, 6 Sep: the popover "would just pop a bit more" with animated icons — the rows and their
 *  live second lines now live in AdminHelpPopover, which reads them from the payload. */
export const DOCK_DESTINATIONS = adminHelpRows(null).map((row) => ({ id: row.id, label: row.label, patch: row.patch, verify: row.verify }))

/** Refresh the board without requiring a provider: outside one, the popover simply has no Refresh. */
function useOptionalBoardRefresh(): (() => void) | undefined {
  const client = React.useContext(QueryClientContext)
  return client ? () => { void client.invalidateQueries({ queryKey: ['board'] }) } : undefined
}

function openShellSearch() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'k',
    metaKey: true,
    bubbles: true,
  }))
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
      <SearchIcon className="siso-sidebar__search-icon" size={17} aria-hidden="true" />
      {!collapsed && <span className="siso-sidebar__search-label">Search…</span>}
      {!collapsed && <kbd className="siso-sidebar__search-shortcut">⌘K</kbd>}
    </button>
  )
}

/** One rail row. The glyph animates when the ROW is hovered and once when it becomes the page. */
function NavLink({ dest, active, compact = false, onNavigate }: { dest: RailDest; active: boolean; compact?: boolean; onNavigate: (patch: UrlPatch) => void }) {
  const { label, icon: Icon, patch, ariaLabel, trailing, attrs } = dest
  const glyph = React.useRef<RailIconHandle>(null)
  React.useEffect(() => { if (active) glyph.current?.startAnimation() }, [active])
  return (
    <button
      type="button"
      className={cn(compact ? 'siso-sidebar__compact-link' : 'siso-sidebar__nav-link', active && 'is-active')}
      onClick={() => onNavigate(patch)}
      onMouseEnter={() => glyph.current?.startAnimation()}
      onMouseLeave={() => { if (!active) glyph.current?.stopAnimation() }}
      aria-current={active ? 'page' : undefined}
      aria-label={compact ? ariaLabel ?? label : ariaLabel}
      title={label}
      {...attrs}
    >
      <Icon ref={glyph} className="siso-sidebar__glyph" size={17} aria-hidden="true" />
      {!compact && <span className="siso-sidebar__nav-label">{label}</span>}
      {!compact && trailing}
    </button>
  )
}

function LabeledNavigation({ groups, isActive, onNavigate, payload, onRefresh }: { groups: RailGroup[]; isActive: (dest: RailDest) => boolean; onNavigate: (patch: UrlPatch) => void; payload: BoardPayload | null; onRefresh?: () => void }) {
  return (
    <div className="siso-sidebar__navigation" data-verify-nav-groups={groups.length}>
      {groups.map((group) => (
        <section
          className="siso-sidebar__nav-group"
          id={`siso-nav-section-${group.id}`}
          key={group.id}
          aria-labelledby={`siso-nav-group-${group.id}`}
        >
          <h2 className="siso-sidebar__group-heading" id={`siso-nav-group-${group.id}`}>
            {group.label}
            {group.meta}
          </h2>
          <div className="siso-sidebar__nav-items">
            {group.destinations.map((dest) => dest.destination === 'admin-help'
              ? <AdminHelpPopover key={dest.id} payload={payload} onNavigate={onNavigate} onRefresh={onRefresh} />
              : <NavLink key={dest.id} dest={dest} active={isActive(dest)} onNavigate={onNavigate} />)}
          </div>
        </section>
      ))}
    </div>
  )
}

function CompactNavigation({ groups, isActive, onNavigate, payload, onRefresh }: { groups: RailGroup[]; isActive: (dest: RailDest) => boolean; onNavigate: (patch: UrlPatch) => void; payload: BoardPayload | null; onRefresh?: () => void }) {
  const destinations = groups.flatMap((group) => group.destinations)

  return (
    <div
      className="siso-sidebar__compact-navigation"
      aria-label="Page navigation"
      data-verify-compact-destinations={destinations.length}
    >
      {destinations.map((dest) => dest.destination === 'admin-help'
        ? <AdminHelpPopover key={dest.id} compact payload={payload} onNavigate={onNavigate} onRefresh={onRefresh} />
        : <NavLink key={dest.id} dest={dest} active={isActive(dest)} compact onNavigate={onNavigate} />)}
    </div>
  )
}

function GlobalUtilities({ collapsed, showEmpty, hiddenCount, needsYouActive, payload, onNavigate }: {
  collapsed: boolean
  showEmpty: boolean
  hiddenCount: number
  needsYouActive: boolean
  payload: BoardPayload | null
  onNavigate: (patch: UrlPatch) => void
}) {
  if (collapsed) return null

  return (
    <div
      className="siso-sidebar__global-row"
      aria-label="Global actions"
      data-verify-global-utilities={2}
    >
      {/* Shaan, 3 Sep: this bell IS the Notifications button — it carries the count and the top
          bar is gone. Needs You moved into the dock menu with the other contextual destinations. */}
      {payload
        ? <WorkspaceNotifications payload={payload} className="siso-sidebar__utility-link" />
        : (
          <button
            type="button"
            className={cn('siso-sidebar__utility-link', needsYouActive && 'is-active')}
            onClick={() => onNavigate({ screen: 'needs-you' })}
            aria-label="Needs You"
            aria-current={needsYouActive ? 'page' : undefined}
            title="Needs You"
          >
            <Bell aria-hidden="true" />
          </button>
        )}
      <button
        type="button"
        className={cn('siso-sidebar__utility-link', showEmpty && 'is-active')}
        onClick={() => patchUrl({ empty: !showEmpty })}
        aria-label="Show empty models"
        aria-pressed={showEmpty}
        title={`Show empty models${hiddenCount > 0 ? ` (${hiddenCount})` : ''}`}
      >
        <EyeToggleIcon hidden={!showEmpty} size={18} />
      </button>
    </div>
  )
}

// ravikatiyar162/user-profile-dropdown port: identity header, grouped quick
// appearance controls, then profile footer. Opens only on request, not the source
// demo's default-open. Real auth actions are intentionally absent.
function OperatorDock({ collapsed, headline, status }: {
  collapsed: boolean; headline: string; status: string; onNavigate: (patch: UrlPatch) => void
}) {
  const [theme, setLocalTheme] = React.useState<Theme>(() => (document.documentElement.dataset.theme as Theme) || DEFAULT_THEME)
  const [accent, setLocalAccent] = React.useState<Accent | null>(() => (document.documentElement.dataset.accent as Accent) || null)
  const [notice, setNotice] = React.useState('')
  // Shaan, 6 Sep: the menu opens when you CLICK the profile, not from a second icon beside it.
  return <div className="siso-sidebar__operator">
    <Popover side="top" align="start" width={300} triggerClassName={cn('siso-sidebar__profile', collapsed && 'is-collapsed')} triggerProps={{ 'aria-label': 'Open operator menu', title: 'Operator menu', 'data-verify': 'profile-menu-trigger', 'data-verify-profile-state': 'authenticated' }}
      trigger={<>
        <span className="siso-sidebar__profile-orb" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}halo-mark.svg`} alt="" /></span>
        {!collapsed && <span className="siso-sidebar__profile-copy"><span className="siso-sidebar__profile-label">{headline}</span><span className="siso-sidebar__profile-status">{status}</span></span>}
      </>}>
      <section className="ok-profile-menu" data-bank-source="ravikatiyar162__user-profile-dropdown" data-verify="profile-menu">
        <header><User size={30} aria-hidden="true" /><div><b>{headline}</b><small>{status}</small></div></header>
        <hr /><h3>Appearance</h3>
        <Segmented ariaLabel="Theme set" options={[{ value: 'internal', label: 'Neutral black' }, { value: 'halo', label: 'Halo' }]} value={theme} onChange={value => { setTheme(value as Theme); setLocalTheme(value as Theme); setNotice('Theme saved on this device'); toast({ title: 'Theme saved', detail: 'On this device only' }) }} />
        <div className="ok-accent-options" role="group" aria-label="Accent colour">{ACCENTS.map(value => <button type="button" key={value} aria-pressed={accent === value} onClick={() => { setAccent(value); setLocalAccent(value); setNotice('Accent saved on this device'); toast({ title: 'Accent saved', detail: `${value} · on this device only` }) }}>{value}</button>)}</div>
        <p role="status">{notice}</p><hr /><small>Local appearance only. Account and sign-out are managed by the workspace.</small>
      </section>
    </Popover>
  </div>
}

export interface GroupedRailProps {
  models: ModelBoard[]
  /** The board payload, when it has arrived: the utility bell reads its people-needing-you count. */
  payload?: BoardPayload | null
  modelSourceKnown?: boolean
  collapsed: boolean
  onToggle: () => void
  mobile?: boolean
}

export function GroupedRail({ models, payload = null, modelSourceKnown = true, collapsed, onToggle, mobile = false }: GroupedRailProps) {
  const url = useWorkspaceUrl()
  const area: OracleArea = url.screen === 'dev' || url.screen === 'docs' ? url.screen : 'operator'
  const areaAccess = payload?.capabilities?.adminAreas
  const selectArea = (next: OracleArea) => {
    if (next !== 'operator' && areaAccess?.[next]?.allowed !== true) return
    nav({ screen: next === 'operator' ? 'home' : next, model: null, account: null, view: null })
  }
  const navigate = (destination: UrlPatch) => nav(destination)
  const refreshBoard = useOptionalBoardRefresh()

  const visible = models.filter((m) => url.showEmpty || (!m.isPlaceholder && m.isInternal !== true))
  const hiddenCount = models.length - visible.length
  const postureByModel = new Map(visible.map((model) => [model.modelId, fleetLivePosture(model).key]))
  const liveCount = visible.filter((model) => postureByModel.get(model.modelId) === 'live').length

  const modelDestinations: RailDest[] = visible.map((m) => {
    const posture = m.live.isLive ? 'live' : postureByModel.get(m.modelId) ?? 'unknown'
    const postureClass = posture === 'live' ? 'is-live' : posture === 'degraded' ? 'is-degraded' : 'is-unknown'
    const postureWord = posture === 'live' ? 'live' : posture === 'degraded' ? 'needs review' : null
    return {
      id: `model:${m.modelId}`,
      label: m.displayName,
      icon: USER_GLYPH,
      destination: 'model' as const,
      destinationModelId: m.modelId,
      patch: { screen: 'model', model: m.modelId, tab: 'overview' },
      ariaLabel: `${m.displayName}, ${posture}${m.isPlaceholder ? ', empty model' : ''}`,
      trailing: (
        <>
          {postureWord && (
            <span className={cn('siso-sidebar__nav-posture', postureClass)}>
              <span className="siso-sidebar__nav-dot" aria-hidden="true" />
              {postureWord}
            </span>
          )}
          {m.isPlaceholder && <span className="siso-sidebar__nav-note">(empty)</span>}
        </>
      ),
    }
  })

  // Shaan, 3 Sep: "the models should be a dropdown thing or not shown unless you click Models".
  // The rail names the LIVE ones only; everyone else is one click away behind Primary → Models.
  const liveModelIds = new Set(visible.filter((m) => m.live.isLive || postureByModel.get(m.modelId) === 'live').map((m) => m.modelId))
  const liveDestinations = modelDestinations.filter((dest) => liveModelIds.has(dest.destinationModelId ?? ''))
  const groups: RailGroup[] = [
    { id: 'primary', label: 'Primary', destinations: PRIMARY_DESTINATIONS },
    { id: 'context', label: 'Context', destinations: CONTEXT_DESTINATIONS },
    ...(liveDestinations.length > 0
      ? [{
          id: 'models' as const,
          label: 'Live now',
          meta: <span className="siso-sidebar__group-count">{modelSourceKnown ? liveDestinations.length : '—'}</span>,
          destinations: liveDestinations,
        }]
      : []),
  ]

  const isActive = (dest: RailDest) => sidebarDestinationIsActive(dest.destination, url.screen, url.modelId, dest.destinationModelId)

  return (
    <nav
      className={cn('siso-sidebar', collapsed ? 'is-collapsed' : 'is-expanded')}
      aria-label="Global navigation"
      data-verify-unit="GroupedRail"
      data-verify-direction="B"
      data-verify-material="champagne-glass-v2"
      data-verify-expanded-width="232"
      data-verify-collapsed-width="66"
      data-verify-utility-width="44"
      data-verify-no-active-space="true"
      data-verify-search-owner="AppShell"
      data-verify-collapsed={String(collapsed)}
      data-atlas-slots="shell.sidebar"
      data-current-screen={url.screen}
    >
      <div className="siso-sidebar__bloom" aria-hidden="true" />
      <div className="siso-sidebar__noise" aria-hidden="true" />

      <header className="siso-sidebar__header">
        <OracleAreaMenu area={area} access={areaAccess} onSelectArea={selectArea} compact />
        {!collapsed && (
          <div className="siso-sidebar__identity">
            <span className="siso-sidebar__product-name">Oracle</span>
            <span className="siso-sidebar__product-meta">
              {area !== 'operator' ? area === 'dev' ? 'Development' : 'Docs' : modelSourceKnown ? `${visible.length} ${visible.length === 1 ? 'model' : 'models'} in view` : 'Model source unknown'}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className="siso-sidebar__toggle"
          aria-label={mobile ? 'Close navigation' : collapsed ? 'Expand rail' : 'Collapse rail'}
          title={mobile ? 'Close navigation' : collapsed ? 'Expand navigation' : 'Collapse navigation'}
          data-verify="rail-toggle"
        >
          {collapsed ? <PanelLeftOpenIcon className="siso-sidebar__glyph" size={17} aria-hidden="true" /> : <PanelLeftCloseIcon className="siso-sidebar__glyph" size={17} aria-hidden="true" />}
        </button>
      </header>

      <SidebarSearch collapsed={collapsed} />

      <div className="siso-sidebar__body">
        {area !== 'operator' ? <DevHubContextNavigation area={area} compact={collapsed} selectedId={area === 'dev' ? 'work' : url.view === 'reports' ? 'reports' : 'pages'} items={area === 'dev' ? [
          { id: 'work', label: 'Development', onSelect: () => selectArea('dev') },
          { id: 'operator', label: 'Back to Operator', onSelect: () => selectArea('operator') },
        ] : [
          { id: 'pages', label: 'Knowledge', onSelect: () => nav({ screen: 'docs', view: 'pages' }) },
          { id: 'reports', label: 'Reports', onSelect: () => nav({ screen: 'docs', view: 'reports' }) },
          { id: 'operator', label: 'Back to Operator', onSelect: () => selectArea('operator') },
        ]} /> : collapsed
          ? <CompactNavigation groups={groups} isActive={isActive} onNavigate={navigate} payload={payload} onRefresh={refreshBoard} />
          : <LabeledNavigation groups={groups} isActive={isActive} onNavigate={navigate} payload={payload} onRefresh={refreshBoard} />}
        {area === 'operator' && !collapsed && visible.length === 0 && (
          <p className="siso-sidebar__empty-note">
            {modelSourceKnown ? 'No model records in the current board payload.' : 'Waiting for model evidence from the board source.'}
          </p>
        )}
      </div>

      <GlobalUtilities
        collapsed={collapsed}
        payload={payload}
        showEmpty={url.showEmpty}
        hiddenCount={hiddenCount}
        needsYouActive={url.screen === 'needs-you'}
        onNavigate={navigate}
      />
      <OperatorDock
        collapsed={collapsed}
        headline="Operator"
        status={`${liveCount} live`}
        onNavigate={navigate}
      />
    </nav>
  )
}
