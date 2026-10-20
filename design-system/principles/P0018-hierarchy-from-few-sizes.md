---
id: P0018
title: Hierarchy from size, weight and order, with few sizes
rule: Build hierarchy with order, size, weight and contrast from the type scale, using no more than three type sizes in one band (hub-0003).
layer: type
applies_to: [heading, text, kpi, card]
nodes: [atom/text, component/card, component/stat, section/kpis]
strength: should
status: draft
shaan: [hub-0003, hub-0014]
papers: []
clusters: []
sources:
  - apple-wwdc2017-812 | Apply readability margins on larger screens to restrict line length; allow text size to adjust based on Dynamic Type settings without compromising layout. | https://developer.apple.com/videos/play/wwdc2017/812/
  - carbon-typography | Balance font weight and size carefully; larger lighter weight can rank higher than smaller bold weight. | https://carbondesignsystem.com/building-blocks/foundations/typography
  - nngroup-good-visual-design | Limit designs to three type sizes to establish strong hierarchy without overwhelming the user. | https://www.nngroup.com/articles/good-visual-design/
corpus:
  - siso-ui-code/types.jsonl | section/kpis: 1,434 parts (mean 2.82): gradient rates 3.26 vs minimal 2.55; interactive motion 3.63 vs none 2.61 (model-rated) | 2026-10-11
check: Within each band, count distinct computed font-size values on text: three or fewer, all from the type tokens.
updated: 2026-10-11
---

## Why

Hierarchy tells the eye where to go first; too many sizes flatten it, because nothing stands out when everything is different.

## Do / Don't

- **Do:** Use one size for the KPI value, one for labels, one for supporting text in the glance band.
- **Don't:** Mix five font sizes and three weights in one card.

## Evidence

Backing: 3 independent organisations across 3 quoted claims (1 expert, 2 guideline). No experiment or study among them: this rests on published guidelines and expert opinion.

- **Apple** (guideline, [apple-wwdc2017-812](https://developer.apple.com/videos/play/wwdc2017/812/)): Apply readability margins on larger screens to restrict line length; allow text size to adjust based on Dynamic Type settings without compromising layout.
- **IBM** (guideline, [carbon-typography](https://carbondesignsystem.com/building-blocks/foundations/typography)): Balance font weight and size carefully; larger lighter weight can rank higher than smaller bold weight.
- **Nielsen Norman Group** (expert, [nngroup-good-visual-design](https://www.nngroup.com/articles/good-visual-design/)): Limit designs to three type sizes to establish strong hierarchy without overwhelming the user.

House rule and research agree: hub-0003 caps a band at three type sizes, and Nielsen Norman Group advises three type sizes for a strong hierarchy.

## Check

Within each band, count distinct computed font-size values on text: three or fewer, all from the type tokens.
