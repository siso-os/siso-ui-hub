# ui-hub Side Nav

**Source:** `siso-ui-hub/eco-shell-20261010/app/src/components/`
**Commit:** `751ab2e`
**Framework:** React Router v7, TypeScript, Lucide icons
**Dependencies:** React Router (Link, useLocation), local lib modules (surfaces, data, factory, packages, tab)

## What it does
- Multi-core UI library browser (Components, Sites, Apps, Looks, Projects)
- Core switcher at top (Shaan mark) for switching between contexts
- Nested category browsing: Components by job (actions, inputs, navigation, overlays, data-display, data-viz, status, media, AI, lib, other)
- Sliding transitions between nav levels (enter/leave animations on list change)
- Per-core custom item lists (Library links, App screens/layouts, Motion backdrops)
- Collapsible groups with counts and category drill-down

## Distinctive features
- **Slide transitions** — old list exits with direction-aware animation as new list enters
- **Job-based organization** — components grouped by function, not visual type
- **Multi-tab awareness** — nav list updates with UI top tab (Components/Sites/Apps/Looks/Projects)
- **Release tracking** — PKGS and releases data integrated into project list
- **Factory pattern** — coreById, coreOf, useProjects for dynamic content

