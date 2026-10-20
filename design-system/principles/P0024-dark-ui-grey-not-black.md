---
id: P0024
title: Dark UI uses dark grey surfaces and softened colours
rule: In dark themes use dark grey surfaces rather than pure black, show elevation with lighter surfaces, and desaturate accent and status colours while keeping contrast minimums.
layer: colour
applies_to: [theme, surface, text, chart]
nodes: [atom/text, atom/layout, component/chart, section/sidebar]
strength: should
status: draft
shaan: [hub-0014]
papers: []
clusters: []
sources:
  - apple-wwdc2019-808 | All apps should support Dark Mode; users expect it when device is set to Dark Mode. | https://developer.apple.com/videos/play/wwdc2019/808/
  - ixdf-dark-mode-design | Use dark gray or navy backgrounds instead of pure black to reduce eye strain while maintaining contrast. | https://ixdf.org/literature/topics/dark-mode
corpus:
  - siso-ui-code/types.jsonl | atom/layout: 3,544 parts (mean 1.91): brutalist rates 2.66 vs minimal 1.83; interactive motion 2.79 vs none 1.68 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/sidebar: 873 parts (mean 2.91): dark rates 3.36 vs minimal 2.43; interactive motion 3.42 vs none 2.25 (model-rated) | 2026-10-11
check: In the dark theme no surface token is no. 000000; raised surfaces are lighter than the base; text and controls still pass P0021.
updated: 2026-10-11
---

## Why

Pure white on pure black glares and smears for many readers, and saturated colours vibrate on dark grounds; lighter surfaces replace shadows that dark UI cannot show.

## Do / Don't

- **Do:** Use a near-black base surface, step raised surfaces lighter, and use softened tints of the accent.
- **Don't:** Invert the light theme to #000 and #fff with the same saturated brand colours.

## Evidence

Backing: 2 independent organisations across 4 quoted claims (4 guideline). No experiment or study among them: this rests on published guidelines and expert opinion.

- **Apple** (guideline, [apple-wwdc2019-808](https://developer.apple.com/videos/play/wwdc2019/808/)): All apps should support Dark Mode; users expect it when device is set to Dark Mode.
- **IxDF** (guideline, [ixdf-dark-mode-design](https://ixdf.org/literature/topics/dark-mode)): Use dark gray or navy backgrounds instead of pure black to reduce eye strain while maintaining contrast.

Thin evidence: two organisations, guideline and expert level only. Kept because dark UI is the default for SISO operator screens.

## Check

In the dark theme no surface token is #000000; raised surfaces are lighter than the base; text and controls still pass P0021.
