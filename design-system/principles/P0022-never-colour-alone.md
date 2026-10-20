---
id: P0022
title: Never use colour alone to carry meaning
rule: Pair every colour that carries meaning with a second cue: text, an icon, a shape, a pattern or position.
layer: colour
applies_to: [status, chart, form, badge, link]
nodes: [atom/badge, atom/status-dot, component/chart, component/form]
strength: must
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0012, C0022, C0163]
sources:
  - wcag-use-of-color | 1.4.1 Use of Color, A: colour is not the only visual means of conveying information | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
  - carbon-accessibility-guidelines | Remember that 8% of men and 0.4% of women are color-blind; never use color alone to convey information. (measured: 8% of men, 0.4% of women affected) | https://carbondesignsystem.com/guidelines/accessibility
  - spectrum-color | Never use color alone to communicate meaning; always pair it with text labels or icons for clarity. | https://spectrum.adobe.com/page/color
  - wcag-use-of-color | Never use color alone to convey information; add shape, text, or pattern. | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color
  - laws-ux-von-restorff | Do not rely exclusively on color to communicate contrast to users with color vision deficiency. | https://lawsofux.com/von-restorff-effect/
  - apple-wwdc2019-244 | Do not use color alone to convey meaning; add additional visual indicators like shapes, symbols, or text for users with color-vision deficiency. | https://developer.apple.com/videos/play/wwdc2019/244/
  - lightning-accessibility | Never use color as the sole means to provide information or request an action. | https://spring-21.lightningdesignsystem.com/accessibility/overview
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: View the page in a greyscale filter: every status, error and chart series can still be told apart.
updated: 2026-10-11
---

## Why

About 1 in 12 men has a colour vision deficiency, and colour is lost in greyscale and glare; a second cue keeps the meaning.

## Do / Don't

- **Do:** Show a status as an icon plus a word (Failed) in red, and label chart series directly.
- **Don't:** Mark an error only by turning a border red, or tell series apart only by hue.

## Evidence

Backing: 11 independent organisations across 16 quoted claims (2 expert, 13 guideline, 1 study). WCAG 2.2 AA 1.4.1 Use of Color requires it. Clusters: C0012, C0022, C0163.

- **W3C** (standard, [wcag-use-of-color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)): 1.4.1 Use of Color, A: colour is not the only visual means of conveying information.
- **IBM** (study, [carbon-accessibility-guidelines](https://carbondesignsystem.com/guidelines/accessibility)): Remember that 8% of men and 0.4% of women are color-blind; never use color alone to convey information. Measured: 8% of men, 0.4% of women affected.
- **Adobe** (guideline, [spectrum-color](https://spectrum.adobe.com/page/color)): Never use color alone to communicate meaning; always pair it with text labels or icons for clarity.
- **W3C** (guideline, [wcag-use-of-color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color)): Never use color alone to convey information; add shape, text, or pattern.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-von-restorff](https://lawsofux.com/von-restorff-effect/)): Do not rely exclusively on color to communicate contrast to users with color vision deficiency.
- **Apple** (guideline, [apple-wwdc2019-244](https://developer.apple.com/videos/play/wwdc2019/244/)): Do not use color alone to convey meaning; add additional visual indicators like shapes, symbols, or text for users with color-vision deficiency.
- **Salesforce** (guideline, [lightning-accessibility](https://spring-21.lightningdesignsystem.com/accessibility/overview)): Never use color as the sole means to provide information or request an action.

## Check

View the page in a greyscale filter: every status, error and chart series can still be told apart.
