---
id: P0059
title: Every chart has a text title and a text alternative
rule: Give every chart a title or caption that says what it shows (and the takeaway when there is one), plus a text alternative or data table for screen readers.
layer: data
applies_to: [chart, dashboard]
nodes: [component/chart, page/dashboard]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0161, C0190, C0041]
sources:
  - wcag-non-text-content | 1.1.1 Non-text Content, A: every non-text element, charts included, has a text alternative | https://www.w3.org/WAI/WCAG22/Understanding/non-text-content
  - apple-wwdc2022-110342 | Accompany every chart with text describing its contents; if isolated, the description should be informative. | https://developer.apple.com/videos/play/wwdc2022/110342/
  - carbon-chart-anatomy | Make chart titles descriptive and qualitative, reflecting the main insight the data reveals. | https://carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy
  - wai-complex-images | Make long descriptions available to everyone, not just screen reader users. | https://www.w3.org/WAI/tutorials/images/complex/
  - nngroup-write-alt-text | Use long descriptions (structured text, lists, or tables) for complex images when page copy cannot be edited. | https://www.nngroup.com/articles/write-alt-text/
  - lightning-accessibility | Provide text-based alternatives for all images, icons, and SVGs. | https://spring-21.lightningdesignsystem.com/accessibility/overview
  - fluent2-accessibility | Provide descriptive alt text for images accessible to screen readers. | https://fluent2.microsoft.design/accessibility
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: Every chart has a visible title and either an accessible description or an adjacent data table.
updated: 2026-10-11
---

## Why

Text tells readers what to look for, and people remember the message of a chart through its title; screen readers cannot read the marks.

## Do / Don't

- **Do:** Title a chart Signups doubled after the March launch and offer View as table.
- **Don't:** Title it Chart 3, or ship an SVG chart with no accessible name.

## Evidence

Backing: 6 independent organisations across 11 quoted claims (10 guideline, 1 expert). No experiment or study among them: this rests on published guidelines and expert opinion. WCAG 2.2 1.1.1 Non-text Content (Level A, part of AA conformance) requires a text alternative. Clusters: C0161, C0190, C0041.

- **W3C** (standard, [wcag-non-text-content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)): 1.1.1 Non-text Content, A: every non-text element, charts included, has a text alternative.
- **Apple** (guideline, [apple-wwdc2022-110342](https://developer.apple.com/videos/play/wwdc2022/110342/)): Accompany every chart with text describing its contents; if isolated, the description should be informative.
- **IBM** (guideline, [carbon-chart-anatomy](https://carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy)): Make chart titles descriptive and qualitative, reflecting the main insight the data reveals.
- **W3C** (guideline, [wai-complex-images](https://www.w3.org/WAI/tutorials/images/complex/)): Make long descriptions available to everyone, not just screen reader users.
- **Nielsen Norman Group** (guideline, [nngroup-write-alt-text](https://www.nngroup.com/articles/write-alt-text/)): Use long descriptions (structured text, lists, or tables) for complex images when page copy cannot be edited.
- **Salesforce** (guideline, [lightning-accessibility](https://spring-21.lightningdesignsystem.com/accessibility/overview)): Provide text-based alternatives for all images, icons, and SVGs.
- **Microsoft** (guideline, [fluent2-accessibility](https://fluent2.microsoft.design/accessibility)): Provide descriptive alt text for images accessible to screen readers.

## Check

Every chart has a visible title and either an accessible description or an adjacent data table.
