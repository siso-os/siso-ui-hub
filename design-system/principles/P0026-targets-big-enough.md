---
id: P0026
title: Targets are big enough to hit
rule: Make every pointer target at least 24x24 CSS px (WCAG 2.2 AA) and every touch target at least 44x44 pt, with space between neighbours.
layer: atom
applies_to: [button, icon-button, link, checkbox, nav-item]
nodes: [atom/button, atom/icon, atom/link, atom/choice, component/tabs]
strength: must
status: draft
shaan: []
papers: []
clusters: [C0064, C0254, C0195]
sources:
  - wcag-target-size | 2.5.5 Target Size (Enhanced), AAA: targets at least 44 by 44 CSS px | https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced
  - microinteractions-accessibility | Ensure touch targets meet a minimum size of 44×44 pixels to accommodate users with limited dexterity across mobile and touchscreen devices. (figure: 44 pixels by 44 pixels minimum touch target size) | https://www.accessibilitychecker.org/blog/microinteractions/
  - wcag-target-size | Make interactive targets at least 44 by 44 CSS pixels to help users with limited dexterity. | https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced
  - apple-wwdc2024-10086 | Use at least 60 points of tap target space for interactive elements to prevent user frustration. | https://developer.apple.com/videos/play/wwdc2024/10086/
  - primer-responsive | Ensure touch targets are at least 24px for AA accessibility, preferably 44px for AAA. | https://primer.style/foundations/responsive
  - nngroup-checkboxes-design-guidelines | Make checkbox labels and surrounding area clickable with a minimum 1 cm × 1 cm touch target. | https://www.nngroup.com/articles/checkboxes-design-guidelines/
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
check: For every interactive element, the bounding box is at least 24x24 px on desktop and at least 44x44 px at mobile widths.
updated: 2026-10-11
---

## Why

Time to hit a target grows as it gets smaller and further away (Fitts's law); small targets cause misses, especially on touch and for people with tremor.

## Do / Don't

- **Do:** Give 16 px icon buttons a 32 px hit area on desktop and 44 px on touch.
- **Don't:** Ship a 16 px close icon with no padding.

## Evidence

Backing: 5 independent organisations across 7 quoted claims (7 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. WCAG 2.2 2.5.8 Target Size (Minimum, AA) sets 24x24 CSS px; 2.5.5 (AAA) sets 44x44. Clusters: C0064, C0254, C0195.

- **W3C** (standard, [wcag-target-size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)): 2.5.5 Target Size (Enhanced), AAA: targets at least 44 by 44 CSS px.
- **Accessibility Resources** (guideline, [microinteractions-accessibility](https://www.accessibilitychecker.org/blog/microinteractions/)): Ensure touch targets meet a minimum size of 44×44 pixels to accommodate users with limited dexterity across mobile and touchscreen devices. Figure: 44 pixels by 44 pixels minimum touch target size.
- **W3C** (guideline, [wcag-target-size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced)): Make interactive targets at least 44 by 44 CSS pixels to help users with limited dexterity.
- **Apple** (guideline, [apple-wwdc2024-10086](https://developer.apple.com/videos/play/wwdc2024/10086/)): Use at least 60 points of tap target space for interactive elements to prevent user frustration.
- **GitHub** (guideline, [primer-responsive](https://primer.style/foundations/responsive)): Ensure touch targets are at least 24px for AA accessibility, preferably 44px for AAA.
- **Nielsen Norman Group** (guideline, [nngroup-checkboxes-design-guidelines](https://www.nngroup.com/articles/checkboxes-design-guidelines/)): Make checkbox labels and surrounding area clickable with a minimum 1 cm × 1 cm touch target.

One Apple talk advises 60 pt targets for some contexts; the Human Interface Guidelines figure of 44 x 44 pt is the one used here.

## Check

For every interactive element, the bounding box is at least 24x24 px on desktop and at least 44x44 px at mobile widths.
