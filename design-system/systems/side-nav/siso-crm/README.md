# siso-crm Side Nav

**Source:** `SISOCRM/platform/apps/web/app/(all)/[workspaceSlug]/(projects)/`
**Commit:** `b44c4e2`
**Framework:** Next.js app router (React 18+), TypeScript
**Dependencies:** Next.js dynamic routing, workspace/project context

## What it does
- Workspace and project-aware sidebar routing via Next.js dynamic segments
- Extended sidebar for project-level navigation (extended-sidebar, extended-project-sidebar)
- Sidebar wrapper component for layout composition
- Multiple sidebar variants for different contexts
- Project filtering and selection
- Full dynamic routing with [workspaceSlug] and [projectId] patterns

## Distinctive features
- **Next.js app router patterns** — parenthesized route groups `(projects)`, dynamic segments `[workspaceSlug]`
- **Extended sidebar variants** — separate components for base, project, and wrapper layouts
- **Workspace scoping** — all nav scoped under workspace slug for multi-tenant UI
- **Dynamic routing integration** — sidebar state tied to URL segments (not local state)
- **File-based structure** — sidebar.tsx, extended-sidebar.tsx, wrapper—semantic naming tied to Next.js routing
