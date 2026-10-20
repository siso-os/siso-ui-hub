---
id: P0021
title: Text and controls meet contrast minimums
rule: Give text at least 4.5:1 contrast with its background, and large text (24 px, or 19 px bold), icons and control boundaries at least 3:1, in light and dark themes.
layer: colour
applies_to: [text, icon, button, input, chart]
nodes: [atom/text, atom/icon, atom/button, atom/text-input, component/chart, section/hero]
strength: must
status: draft
shaan: [hub-0014]
papers: []
clusters: [C0056, C0191, C0189]
sources:
  - wcag-non-text-contrast | 1.4.11 Non-text Contrast, AA: control boundaries, icons and chart graphics at least 3:1 | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast
  - wcag-contrast-minimum | 1.4.3 Contrast (Minimum), AA: text at least 4.5:1, large text at least 3:1 | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
  - color-contrast-wcag | Large text (18pt or 14pt bold) requires only 3:1 contrast ratio; smaller text requires 4.5:1. (figure: 3:1 for large text, 4.5:1 for regular) | https://webaim.org/articles/contrast/
  - lightning-accessibility | Maintain text-to-background color contrast of at least 4.5:1 for standard text and 3:1 for large text. (figure: WCAG AA: 4.5:1 for standard text, 3:1 for large text) | https://spring-21.lightningdesignsystem.com/accessibility/overview
  - carbon-color | Achieve 4.5:1 contrast for small text and 3:1 for large text (24px+) by stepping through color grades; consult the contrast table for minimum steps required. (figure: 4.5:1 contrast for text <24px; 3:1 for ≥24px) | https://carbondesignsystem.com/building-blocks/foundations/color
  - apple-wwdc2021-10308 | Design high-contrast text on dark backgrounds early, as it benefits low-vision users and the general population. | https://developer.apple.com/videos/play/wwdc2021/10308/
  - stripe-designing-accessible-color-systems | Ensure text contrast meets minimum ratios: 4.5:1 for small text, 3.0:1 for large text. | https://stripe.com/blog/accessible-color-systems
  - fluent2-accessibility | Maintain WCAG AA contrast: 4.5:1 for standard text, 3:1 for large text and interactive components. | https://fluent2.microsoft.design/accessibility
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
check: Run axe or a contrast script over the page in both themes: no text below 4.5:1 (3:1 if large), no control border or icon below 3:1.
updated: 2026-10-11
---

## Why

Low contrast makes text slow or impossible to read for low-vision users and for everyone on a bright screen or in sunlight.

## Do / Don't

- **Do:** Check every text and border token pair in both themes against the ratios before shipping.
- **Don't:** Use light grey placeholder-style text for real content.

## Evidence

Backing: 6 independent organisations across 8 quoted claims (7 guideline, 1 study). WCAG 2.2 AA (1.4.3 Contrast Minimum, 1.4.11 Non-text Contrast) sets these ratios. Clusters: C0056, C0191, C0189.

- **W3C** (standard, [wcag-non-text-contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)): 1.4.11 Non-text Contrast, AA: control boundaries, icons and chart graphics at least 3:1.
- **W3C** (standard, [wcag-contrast-minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)): 1.4.3 Contrast (Minimum), AA: text at least 4.5:1, large text at least 3:1.
- **WebAIM** (guideline, [color-contrast-wcag](https://webaim.org/articles/contrast/)): Large text (18pt or 14pt bold) requires only 3:1 contrast ratio; smaller text requires 4.5:1. Figure: 3:1 for large text, 4.5:1 for regular.
- **Salesforce** (guideline, [lightning-accessibility](https://spring-21.lightningdesignsystem.com/accessibility/overview)): Maintain text-to-background color contrast of at least 4.5:1 for standard text and 3:1 for large text. Figure: WCAG AA: 4.5:1 for standard text, 3:1 for large text.
- **IBM** (guideline, [carbon-color](https://carbondesignsystem.com/building-blocks/foundations/color)): Achieve 4.5:1 contrast for small text and 3:1 for large text (24px+) by stepping through color grades; consult the contrast table for minimum steps required. Figure: 4.5:1 contrast for text <24px; 3:1 for ≥24px.
- **Apple** (study, [apple-wwdc2021-10308](https://developer.apple.com/videos/play/wwdc2021/10308/)): Design high-contrast text on dark backgrounds early, as it benefits low-vision users and the general population.
- **Stripe** (guideline, [stripe-designing-accessible-color-systems](https://stripe.com/blog/accessible-color-systems)): Ensure text contrast meets minimum ratios: 4.5:1 for small text, 3.0:1 for large text.
- **Microsoft** (guideline, [fluent2-accessibility](https://fluent2.microsoft.design/accessibility)): Maintain WCAG AA contrast: 4.5:1 for standard text, 3:1 for large text and interactive components.

## Check

Run axe or a contrast script over the page in both themes: no text below 4.5:1 (3:1 if large), no control border or icon below 3:1.
