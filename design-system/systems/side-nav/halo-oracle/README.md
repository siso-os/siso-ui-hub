# halo-oracle Side Nav

**Source:** `halo/oracle/operator-app/src/components/board/`
**Commit:** `2ec675d`
**Framework:** React + TypeScript, Lucide icons, custom urlState router
**Dependencies:** @tanstack/react-query, custom URL state management (lib/urlState), rail glyph system

## What it does
- Ported from SISOCRM's GroupedRail component
- Workspace sidebar with grouped navigation items (primary, context, models)
- Model shortcuts with icons, labels, active state detection
- Workspace notifications, admin help contextual menu
- Theme/accent selector in sidebar
- Collapse support for nested items
- URL-driven navigation (no React Router dependency)

## Distinctive features
- **urlState navigation** — navigates via custom URL state, not React Router
- **Admin help context** — contextual help popover tied to screen name
- **Model shortcuts** — dynamic model list with active state logic per model ID
- **Theme customization** — theme and accent selector in sidebar (ACCENTS, setTheme)
- **Ported from CRM** — maintains GroupedRail structure but replaces nav mechanism
