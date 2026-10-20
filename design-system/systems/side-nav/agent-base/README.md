# agent-base Side Nav

**Source:** `siso-internal-labs-agent-base/packages/siso-side-nav/` and `apps/web/src/components/Sidebar.tsx`
**Commit:** `825a1239`
**Framework:** React 19 + TypeScript, Lucide icons, @siso/shell utilities
**Dependencies:** @siso/side-nav package exports (SideNav, SideSection, ThreadRow, etc.), @siso/shell (MenuButton, save/load)

## What it does
- Hierarchical organization by domains and teams (lead + crew)
- Each team row shows work status: working, needs attention, failed, done, quiet
- Pinned agents at top; collapsible domain folders; crew members nested under leads
- Drag-reorder within lists (leads and all crew)
- Full-width menu on agent hover (Pin, Move to domain, Settle actions)
- Org chart integration with three-level hierarchy (groups → projects → owners)

## Distinctive features
- **Status marks on every row** — loud states (needs, failed) bubble up from crew to team lead
- **Flexible layout modes** — org view hides pinned agents not in the org structure
- **Workspace-aware** — domain switching and per-domain reordering
- **CSS rail animations** — grouped-rail.css and rail-extras.css for smooth transitions
- **Works without org** — shows all agents if org tree is absent
