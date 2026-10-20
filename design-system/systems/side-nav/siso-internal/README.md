# siso-internal Side Nav

**Source:** `siso-internal/codebase/src/components/sidebar/`
**Commit:** `a1bf3c21`
**Framework:** React + TypeScript, shadcn/ui Sidebar, Lucide icons
**Dependencies:** shadcn sidebar UI primitives, custom hooks

## What it does
- Modular sidebar with composable sections and menu items
- Section headers with collapsible support
- Individual menu item rows with icons and labels
- Footer section for account/user controls
- Logo branding at top
- Nested SidebarSection and SidebarMenuItem for flexible hierarchies

## Distinctive features
- **Composable architecture** — SidebarSection, MenuItem, Header, Footer as separate components
- **Section-based grouping** — semantic grouping rather than flat lists
- **Icon-first design** — each menu item leads with icon (from Lucide)
- **Header components** — dedicated SidebarSectionHeader for group titles
- **Footer integration** — separate SidebarFooter for user/account section placement

