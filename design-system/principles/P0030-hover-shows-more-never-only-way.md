---
id: P0030
title: Hover shows more; it is never the only way in
rule: Use hover for read-only previews that also open on keyboard focus and can be dismissed; anything needed to finish a task must also be reachable by click or tap.
layer: atom
applies_to: [tooltip, hover-card, row, chart]
nodes: [atom/tooltip, component/popover, component/table, component/chart]
strength: must
status: draft
shaan: [hub-0001]
papers: []
clusters: [C0187]
sources:
  - wcag-content-hover-focus | 1.4.13 Content on Hover or Focus, AA: extra content shown on hover or focus is dismissible, hoverable and persistent | https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus
  - apple-wwdc2024-10152 | Use hover effects to provide feedback about which element will trigger when users tap their fingers together. | https://developer.apple.com/videos/play/wwdc2024/10152/
  - tooltip-help-text-best-practices | Support tooltip activation via keyboard focus as well as mouse hover. | https://www.nngroup.com/articles/tooltip-guidelines/
  - inclusive-components-pickering-tooltips | Use aria-labelledby for primary tooltip labels and aria-describedby for supplementary tooltips. | https://inclusive-components.design/tooltips-toggletips/
corpus:
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: Tab to each element with hover content: the same content appears on focus and Escape closes it; on a touch emulator every row action is reachable.
updated: 2026-10-11
---

## Why

Touch screens have no hover and keyboard users never trigger it; hover is a shortcut for mouse users, not a door.

## Do / Don't

- **Do:** Show a hover card after about 300 to 500 ms (hub-0001) that also opens on focus and closes on Escape.
- **Don't:** Hide row actions so they appear only on mouse hover with no keyboard or touch route.

## Evidence

Backing: 3 independent organisations across 6 quoted claims (4 expert, 2 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. WCAG 2.2 AA 1.4.13 Content on Hover or Focus requires it. Clusters: C0187.

- **W3C** (standard, [wcag-content-hover-focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus)): 1.4.13 Content on Hover or Focus, AA: extra content shown on hover or focus is dismissible, hoverable and persistent.
- **Apple** (guideline, [apple-wwdc2024-10152](https://developer.apple.com/videos/play/wwdc2024/10152/)): Use hover effects to provide feedback about which element will trigger when users tap their fingers together.
- **Nielsen Norman Group** (guideline, [tooltip-help-text-best-practices](https://www.nngroup.com/articles/tooltip-guidelines/)): Support tooltip activation via keyboard focus as well as mouse hover.
- **Heydon Pickering** (expert, [inclusive-components-pickering-tooltips](https://inclusive-components.design/tooltips-toggletips/)): Use aria-labelledby for primary tooltip labels and aria-describedby for supplementary tooltips.

House rule: the 300 to 500 ms hover delay is Shaan's (hub-0001); no source in the library measures it. WCAG 1.4.13 sets what hover content must do, not when it opens.

## Check

Tab to each element with hover content: the same content appears on focus and Escape closes it; on a touch emulator every row action is reachable.
