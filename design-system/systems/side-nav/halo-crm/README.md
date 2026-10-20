# halo-crm Side Nav

**Source:** `halo/crm/repo/src/components/sidebar/`
**Commit:** `2ec675d`
**Framework:** React + TypeScript, shadcn/ui Sidebar primitives, Lucide icons
**Dependencies:** shadcn sidebar components, AuthContext, useIsMobile hook, useRouteMemory

## What it does
- Standard sidebar layout with logo, navigation, and user section
- Role-based visibility (Admin flag controls nav items shown)
- Mobile detection — hides sidebar entirely on phones
- Scrollable nav area with custom scrollbar styling
- Composite structure: Logo section → Nav items → User section (bottom)
- Route memory hook preserves last route per view

## Distinctive features
- **shadcn sidebar primitives** — uses Sidebar, SidebarContent, SidebarTrigger from ui/sidebar
- **Mobile-first hiding** — entire sidebar null on mobile, no bottom sheet/drawer
- **Role-based filtering** — isAdmin prop controls which nav items render
- **Scrollbar customization** — Tailwind scrollbar theming (thin width, border color, track transparent)
- **Trigger button placement** — top-right absolute positioning, not built into sidebar
