# Surface: dashboard / business OS

**Projects:** Agent Base, the Operator, HALO CRM. **Who looks:** Shaan and the operators, for hours a day.

- **Layout:** bands of widgets (widget.v1, `oracle/operator-app/src/widgets/contract.ts`). Band order follows the questions: glance, then work, then detail (ADR 0003). Space comes before components (ADR 0002, SPACE-ALLOCATION.md): work takes at least 55% of the fold, actions at most 20%, glance at most 12%.
- **Fit rules:** the Operator's FIT-RULES.md (full-width bands, one height per band, one 16 px gutter, no box in a box, empty = one line, controls on the line they control, at most three type sizes per band).
- **Density:** high. Keyboard first (command palette). Hover previews (ADR 0001). Detail opens in place (ADR 0005).
- **Data:** the shell loads once and data streams in (ADR 0010). Skeletons at real size; truthful state (ADR 0009).
- **Fits:** hover card, bell, command palette, toast, timeline, sortable and dense tables, stat tile, period filter, agent run, AI answer, chat thread, drawer, skeleton. Big virtual grid only above ~1,000 rows. Toolcraft only for us while designing.
- **Never:** landing-site sections (hero, menu, map, footer).
