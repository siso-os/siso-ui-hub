# Side Nav Collection Manifest

Collected on 2026-10-11. Total: 8 main variants, 45 files.

## Variants

1. **agent-base** (825a1239) — siso-side-nav package + Sidebar.tsx integration
   - Files: 12 (7 src components + 2 CSS + 1 package.json + 1 Sidebar.tsx + 1 README)
   - Notable: Status marks, drag-reorder, org-aware layout

2. **ui-hub** (751ab2e) — UI library browser side nav
   - Files: 5 (SideNav, NavGlyph, navIcons, main, README)
   - Notable: Slide transitions, job-based organization, multi-core switcher

3. **halo-crm** (2ec675d) — shadcn/ui based sidebar
   - Files: 7 (Sidebar + 4 components + CSS + README)
   - Notable: Role-based filtering, mobile-hidden, composable sections

4. **halo-oracle** (2ec675d) — Ported GroupedRail with urlState nav
   - Files: 2 (GroupedRail.tsx + README)
   - Notable: Custom router, admin help, model shortcuts, theme selector

5. **halo-inspiration** (2ec675d) — ISSO dashboard sidebar
   - Files: 2 (IssoSidebarShell.tsx + README)
   - Notable: Customer-facing, responsive design, ISSO-branded

6. **siso-internal** (a1bf3c21) — Composable sidebar components
   - Files: 7 (Sidebar + 5 components + README)
   - Notable: Section-based grouping, modular architecture, footer support

7. **siso-crm** (b44c4e2) — Next.js app router sidebar
   - Files: 5 (sidebar variants + README)
   - Notable: Workspace-scoped, dynamic routing, URL-driven state

8. **siso-crm-additional** (b44c4e2) — GroupedRail variant
   - Files: 2 (GroupedRail.tsx + README)
   - Notable: Icon-based rail, also basis for oracle's implementation

## Key Patterns Found

- **shadcn Sidebar**: halo-crm, siso-internal, siso-crm use shadcn primitives
- **Status Indicators**: agent-base marks every row with work state
- **Workspace Awareness**: siso-crm, agent-base scope by workspace/domain
- **Composable Architecture**: siso-internal splits into Logo, Nav, Footer, Section, Item
- **URL-Driven State**: siso-crm (Next.js routes), halo-oracle (custom urlState)
- **Transitions**: ui-hub uses direction-aware enter/leave animations
- **Role-Based Visibility**: halo-crm, siso-internal support conditional rendering

## File Organization

```
side-nav/
├── INDEX.md (comparison table + best practices)
├── MANIFEST.md (this file)
├── agent-base/
│   ├── README.md
│   ├── Sidebar.tsx (main integration)
│   ├── src/ (7 component files)
│   ├── grouped-rail.css
│   ├── rail-extras.css
│   └── package.json
├── ui-hub/
│   ├── README.md
│   ├── SideNav.tsx
│   ├── NavGlyph.tsx
│   ├── navIcons.tsx
│   └── main.tsx
├── halo-crm/
│   ├── README.md
│   ├── Sidebar.tsx
│   ├── SidebarNav.tsx
│   ├── SidebarUserSection.tsx
│   ├── SidebarLogo.tsx
│   ├── ui-sidebar.tsx
│   └── navigation.module.css
├── halo-oracle/
│   ├── README.md
│   └── halo-oracle-GroupedRail.tsx
├── halo-inspiration/
│   ├── README.md
│   └── halo-inspiration-IssoSidebarShell.tsx
├── siso-internal/
│   ├── README.md
│   ├── Sidebar.tsx
│   ├── SidebarNavigation.tsx
│   ├── SidebarSection.tsx
│   ├── SidebarMenuItem.tsx
│   ├── SidebarLogo.tsx
│   └── ui-sidebar.tsx
├── siso-crm/
│   ├── README.md
│   ├── sidebar.tsx
│   ├── extended-sidebar.tsx
│   ├── extended-sidebar-wrapper.tsx
│   └── _sidebar.tsx
└── siso-crm-additional/
    ├── README.md
    └── siso-crm-GroupedRail.tsx
```

## Next Steps for SISO Design System

1. **Unify on one base**: Combine best features from all 8 variants into a single Sidebar primitive
2. **Status marks**: Import agent-base's work-state indicator system
3. **Composable sections**: Use siso-internal's modular Section/Item pattern
4. **Transitions**: Add ui-hub's slide animations for drill-down lists
5. **URL state**: Standardize on either Next.js routing or custom urlState pattern
6. **Accessibility**: All variants need ARIA review (not in scope of this collection)
