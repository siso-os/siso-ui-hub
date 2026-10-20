---
id: P0013
title: One spacing scale; proximity shows what belongs together
rule: Take every gap from one 4 px based scale and put related items closer together than unrelated ones, with no box drawn inside another box.
layer: page
applies_to: [page, card, form, list]
nodes: [atom/layout, component/form, component/card, component/list]
strength: should
status: draft
shaan: [hub-0003]
papers: [W01]
clusters: [C0033, C0084, C0170, C0085, C0272]
sources:
  - carbon-spacing | Use the spacing scale with multiples of two, four, and eight; apply spacing tokens to margin and padding properties. | https://carbondesignsystem.com/building-blocks/foundations/spacing
  - fluent2-layout | Use a 4-pixel base unit spacing system consistently across all platforms for coherence and easy implementation. | https://fluent2.microsoft.design/layout
  - atlassian-spacing | Place related objects closer together and unrelated objects farther apart to signal semantic meaning. | https://atlassian.design/foundations/spacing
  - spectrum-spacing | Use proximity to signal which elements belong together and which are separate within a layout. | https://spectrum.adobe.com/page/spacing
  - measuringu-research-report-design-fixes | Use generous whitespace in margins and between components to prevent visual clutter and focus attention. | https://measuringu.com/nine-design-fixes-for-your-ux-research-reports/
corpus:
  - siso-ui-code/types.jsonl | atom/layout: 3,544 parts (mean 1.91): brutalist rates 2.66 vs minimal 1.83; interactive motion 2.79 vs none 1.68 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: All computed margin, padding and gap values are multiples of 4 px from the token set; no bordered container is a direct child of another bordered container.
updated: 2026-10-11
---

## Why

The eye groups by distance before it reads borders. A consistent scale makes groups predictable; extra boxes add lines without adding meaning.

## Do / Don't

- **Do:** Use the space tokens (4, 8, 12, 16, 24, 32) with the 16 px gutter of hub-0003, and separate sections with space instead of borders.
- **Don't:** Hand-tune 13 px and 22 px gaps, or wrap a card in a panel in a card.

## Evidence

Backing: 5 independent organisations across 16 quoted claims (7 expert, 9 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0033, C0084, C0170, C0085, C0272.

- **IBM** (guideline, [carbon-spacing](https://carbondesignsystem.com/building-blocks/foundations/spacing)): Use the spacing scale with multiples of two, four, and eight; apply spacing tokens to margin and padding properties.
- **Microsoft** (guideline, [fluent2-layout](https://fluent2.microsoft.design/layout)): Use a 4-pixel base unit spacing system consistently across all platforms for coherence and easy implementation.
- **Atlassian** (guideline, [atlassian-spacing](https://atlassian.design/foundations/spacing)): Place related objects closer together and unrelated objects farther apart to signal semantic meaning.
- **Adobe** (expert, [spectrum-spacing](https://spectrum.adobe.com/page/spacing)): Use proximity to signal which elements belong together and which are separate within a layout.
- **MeasuringU** (expert, [measuringu-research-report-design-fixes](https://measuringu.com/nine-design-fixes-for-your-ux-research-reports/)): Use generous whitespace in margins and between components to prevent visual clutter and focus attention.

House rule: the single 16 px gutter and "no box in a box" come from hub-0003. The research gives the 4 px base and proximity; it does not fix a gutter size.

## Check

All computed margin, padding and gap values are multiples of 4 px from the token set; no bordered container is a direct child of another bordered container.
