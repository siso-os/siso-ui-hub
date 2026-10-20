# SISO Side Navigation Comparison

## Variants Overview

| Variant | App | Files | Collapsible | Nested Groups | Badges/Counts | Search | User Section | Workspace Switcher | Mobile | Distinctive |
|---------|-----|-------|-------------|---------------|---------------|--------|--------------|-------------------|--------|-------------|
| agent-base | Agent Base | 7 (src + Sidebar) | Yes (domains) | Yes (domain→team→crew) | Status marks on every row | No | No | Yes (space switcher) | Implicit (drag) | Team status bubbling, drag-reorder, org-aware |
| ui-hub | UI Hub | 4 (SideNav, NavGlyph, navIcons, main) | Yes (categories/groups) | Yes (core→group→category) | Count badges on groups | No | No | Yes (core switcher) | No | Slide transitions between levels, job-based grouping |
| halo-crm | Halo CRM | 6 (Sidebar + components) | No (flat nav) | No (flat list) | No | No | Yes (bottom section) | No | Hidden (null on mobile) | shadcn primitives, role-based filtering, mobile hides |
| halo-oracle | Halo Oracle | 1 (GroupedRail) | Yes (compact) | Yes (groups→items) | No | No | Yes (via menu) | No | Hidden (responsive) | urlState navigation, admin help, model shortcuts |
| halo-inspiration | Halo Inspiration | 1 (IssoSidebarShell) | Yes | Yes | No | No | Yes | No | Responsive | Customer dashboard variant, ISSO-branded |
| siso-internal | SISO Internal | 6 (sidebar components) | Yes (sections) | Yes (section→menuitem) | No | No | Yes (SidebarFooter) | No | No | Composable components, section-based grouping |
| siso-crm | SISO CRM | 4 (sidebar variants) | Yes (implicit via next.js) | Yes (workspace→project→nav) | No | No | Implicit (in app layout) | Yes (workspace slug) | Implicit (via responsive routes) | Next.js app router, dynamic segments, workspace scoped |
| siso-crm (GroupedRail) | SISO CRM | 1 (GroupedRail) | Yes (compact) | Yes | No | No | No | No | No | Icon-based grouped rail, also ported to oracle |

## Best Ideas to Combine

1. **Status/Activity Indicators** (from agent-base) — Use on every row to show work state; bubble loudest state upward from children to parents
2. **Composable Section Architecture** (from siso-internal) — Split into Sidebar, Section, MenuItem, Footer components for flexibility across products
3. **Job/Functional Grouping** (from ui-hub) — Organize by what pieces do, not what they look like; pair with nested categories for drill-down
4. **Role-Based Filtering** (from halo-crm) — Conditionally show nav items based on user role or permissions
5. **Slide Transitions** (from ui-hub) — Use direction-aware enter/leave animations when list content changes (especially multi-level drill-down)
6. **Next.js URL-Scoped State** (from siso-crm) — Tie nav state to URL segments for bookmarkability, deep linking, and multi-tab consistency
