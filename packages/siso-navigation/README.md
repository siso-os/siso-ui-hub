# @siso/navigation

SISO's generic grouped side navigation, disclosure lists, rail, mobile menu, workspace switcher, tool strip, breadcrumbs and page links, plus the current Hub's original side navigation source. Generic controls require React 19 and standalone CSS; the source Hub export retains its motion/icon peers and original Tailwind utilities. Source ESM exports require a TSX-aware build (the package-suite build supplies compiled distribution).

```tsx
import { SisoSideNav, SisoMobileNav, SisoNavSwitcher, SisoPageTabs, SisoBreadcrumbs } from '@siso/navigation';
import type { SisoNavGroup } from '@siso/navigation';
import '@siso/navigation/styles.css';

const groups: SisoNavGroup[] = [{ id: 'work', label: 'Work', items: [
  { id: 'overview', label: 'Overview', href: '/overview', count: 0 },
  { id: 'reports', label: 'Reports', children: [
    { id: 'weekly', label: 'Weekly', href: '/reports/weekly' }
  ] }
] }];

<SisoSideNav groups={groups} activeId="weekly" />
<SisoMobileNav groups={groups} activeId="weekly" trigger="Open menu" />
```

`SisoSideNav` accepts the shared shell contract: `groups`, `activeId`, `onNavigate(id)`, `collapsed`, `onCollapsedChange(collapsed)`. Optional `header` and `footer` accept any React content. `aria-label` names each navigation region. Supply `onCollapsedChange` to display its collapse control; otherwise the shell owns that control. The consumer controls when to show desktop navigation or the separate mobile trigger, preventing competing mobile breakpoints in shells.

`SisoNavItem` has `id`, `label`, optional `href`, `icon: ReactNode`, `count: number | string`, `children`, and `disabled`. IDs must be unique within a navigation instance. Counts include zero. Icons can be animated components supplied by the consumer; this package imports no icon library. Wrap animation behavior in your icon or row adapter; hidden decorative icons are not the accessible name.

Items with `href` use real anchors. `onNavigate` is a notification for unmodified primary clicks; it does not cancel browser navigation, and modifier clicks retain browser behavior. Items without `href` use buttons and call `onNavigate`. A branch without a destination or navigation handler becomes a disclosure button. Branches with destinations use a separate expand button. `expandedIds`/`onExpandedChange` control expansion; `defaultExpandedIds` initializes uncontrolled state. Uncontrolled navigation opens ancestors when `activeId` changes; controlled consumers must supply the desired ancestor IDs. Native lists, links and buttons preserve Tab, Enter and Space behavior without claiming an ARIA tree role.

For a router, forward **all** supplied link props (including `onClick`, `children`, `className`, `aria-current`, and `title`) to your router link, translating `href` to its destination prop:

```tsx
<SisoSideNav groups={groups} activeId="overview"
  renderLink={({ href, ...props }) => <YourRouterLink to={href} {...props} />} />
```

`SisoMobileNav` accepts side-nav props, `open`/`onOpenChange` for optional controlled visibility, `trigger` content and `closeLabel`. It uses `HTMLDialogElement.showModal()` (modern browser required), Escape, outside click and a close button. Navigation closes it. Native modal focus containment and restoration avoid a custom global keyboard handler. Place it outside any ancestor dialog.

`SisoNavSwitcher`: `items: {id,label,disabled?}[]`, `value`, `onValueChange`, optional `label` and `className`. A native select lets a caller choose spaces, roles, tools or workspaces without importing the caller's data store.

`SisoToolNav`: leaf `items`, optional `orientation="horizontal" | "vertical"`, shared `activeId`/`onNavigate`/`renderLink` and `aria-label`. It renders icon rails/strips with accessible text and hover titles. `SisoPageTabs` accepts the same navigation props and leaf `items`; these are page links styled as tabs, not tab panels. `SisoBreadcrumbs` accepts `items`, `onNavigate`, `renderLink`, and `aria-label`; its final item is plain text with `aria-current="page"`.

All six exports accept `className`. Import CSS once. All selectors use `siso-nav`, `siso-tool-nav`, `siso-page-tabs`, `siso-breadcrumbs` or `siso-nav-switcher` prefixes. Optional @siso/tokens hooks: `--siso-panel`, `--siso-foreground`, `--siso-muted`, `--siso-line`, `--siso-raised`, `--siso-accent`, `--siso-font`, `--siso-font-mono` (legacy surface/text aliases also work); every hook has a standalone fallback. No package code changes document theme, location, localStorage, or auth state.

Provenance: owned UI Hub SideNav/AppShell/app-frame behaviors; rewritten with native HTML rather than copying their router, catalogue, ontology, preview data, shadcn, Lucide, or auth dependencies. See NOTICE and inventory.json. No HALO source or reference-only commercial library source is included.

## Source-faithful UI Hub navigation

`SisoHubSideNav` is the **current Hub's source presentation** (looks v8–v11), extracted beside the generic exports. Import `@siso/navigation/hub.css` and generate Tailwind utilities from this package's `src/hub` directory using the Hub token theme. This source component intentionally retains its real utility classes, JSX, animated NavGlyph bank, active warm well/glow, slide motion, source foldouts, header/core switcher, search, drill/back, places strip and help/version footer. It does not inherit the generic navigation styles. Root theme variables and utility theme are supplied by `@siso/tokens` in the package-suite consumer.

```tsx
import { SisoHubSideNav } from '@siso/navigation';
import type { SisoHubNavGroup } from '@siso/navigation';
import '@siso/navigation/hub.css';
// groups, coreGroups, places and counts belong to the consumer.
<SisoHubSideNav groups={groups} activeId={activeId}
  coreGroups={coreGroups} coreLabel="UI" coreId="ui" factory
  onSearch={openSearch} onFold={foldSidebar}
  onNavigate={(item, event) => { event.preventDefault(); navigate(item.href); }} />
```

`SisoHubNavItem` takes `id`, `label`, `href?`, `icon?: LucideIcon` (source animation mapping), `iconNode?: ReactNode` (consumer-owned icons), `count?`, `dot?`, `title?`, `disabled?`, `children?`, `behavior?: 'fold' | 'drill'`. `SisoHubNavGroup` takes `id`, `label?`, `description?`, `items`. `SisoHubSideNav` additionally accepts `coreGroups`, `coreId`, `coreLabel`, `brand`, `homeHref`, `factory`, `places`, `onCoreChange`, `onFold`, `searchLabel`, `viewKey`, `defaultExpandedIds`, `foot`, `className`. `viewKey` changes reset the drill stack for a new top tab; core changes reset it too. Consumers own core-to-group mapping. `factory={false}` uses the source public-Hub brand link. The source app folds its sidebar off-canvas; it does not replace this nav with a newly invented rail.

`foot` accepts `version`, `name?`, `subtitle?`, `docsHref?`, `changelogHref?`, `packagesHref?`, `releases?`, `shortcuts?`. Provide actual destinations when showing help links. No catalogue, account, auth, workspace or release records are bundled as defaults. The external example `examples/package-suite/hub-navigation.tsx` labels its data as a fixture and exposes original header, drill/fold, core, top-tab and width states.

Useful source subcomponents are also exported: `SisoHubNavRow`, `SisoHubNavSlide`, `SisoHubSearchButton`, `SisoHubNavFoot`, `SisoHubNavPlaces`, `SisoHubNavGlyph`; `sisoHubNavIcon` retains the source semantic icon mapping. Use the `.siso-hub-nav` wrapper to scope source CSS around standalone subcomponents. Native links work without a router. Search uses `/` and Cmd/Ctrl+K; the callback owns the palette. Animations preserve the source motion and honor reduced motion. The leaving slide is additionally inert and expires after its animation so it cannot remain keyboard-focusable.

The source Hub export uses shared peers `lucide-react`, `framer-motion` and `motion`, retaining MIT animated icon notices. `source-provenance.json` records copied source paths and hashes plus the data/import adaptations. Generic exports and their standalone CSS remain compatible.

## Existing Agent Base / SISO CRM navigation

`@siso/navigation/agent-base` is the existing `@siso/side-nav` package source copied intact; the only TypeScript adaptation renames `@siso/shell` imports to `@siso/shells/agent-base`. Import `@siso/navigation/agent-base.css`; its two imported CSS files are byte-identical originals. The CSS needs existing SISO CRM token variables (from `@siso/tokens`) and original utility generation for status/shelf helpers. No separate generic design was substituted.

```tsx
import { GroupedRail, RailGroup, RailIcon, RailCapsule, RailDock,
  RailRow, SortableRail } from '@siso/navigation/agent-base';
import '@siso/navigation/agent-base.css';
```

`GroupedRail` retains `name`, `brand`, controlled `collapsed`/`onToggle`, optional `onSearch`/`searchLabel`, `top`, `children`, `compact`, `utilities`, `dock`, `label`, `className`. Pass `className="siso-sidebar--inline"` for the source's in-layout variant. The default remains the fixed glass rail. Groups, content, account names, statuses and actions are all supplied by the caller.

`RailGroup`, `RailIcon`, `RailCapsule`, `RailDock`, `RailRow`, `SortableItem`, `SortableRail` retain their original props. `SortableRail` takes `ids`, `onReorder`, `children`: it preserves the original pointer sensor with a 5px activation threshold, `closestCenter`, vertical sorting strategy and `arrayMove`; the consumer owns the reordered IDs. `SortableOn` is the original provider/context. Original keyboard semantics preserve Enter/Space to open rows; this source intentionally uses pointer-only drag, and does not claim keyboard sorting.

Also exported intact: `SideNav` (resizable), `SideSection`, `Shelf` (persisted fold), `NavHeading`, `StatusRow`, `StatusWord`, `Duration`, `RowAction`, `ThreadRow`, `ProjectGroup`, `StatusSlot`, `formatAge`, `formatDuration`, plus source status types. Shelf/project expansion and width retain the original shell persistence helpers. Use application-specific storage prefixes through `@siso/shells/agent-base` when needed.

Source provenance is recorded per file. Shared `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` and `@siso/shells` dependencies are required by this subpath. T3 Code attribution for the existing StatusRow is retained with its MIT licence. No agent ontology/store/backend or private account records are included.
