---
id: P0015
title: Layouts reflow to small screens without losing anything
rule: Let layouts reflow from wide to narrow without horizontal scrolling of the page or loss of content or function, keeping regions in the same order.
layer: page
applies_to: [page, app-shell, table, dashboard]
nodes: [page/dashboard, page/index, page/record, section/shell, page/home]
strength: must
status: draft
shaan: []
papers: []
clusters: [C0036, C0173, C0281]
sources:
  - wcag-reflow | 1.4.10 Reflow, AA: content reflows at 320 CSS px wide without scrolling in two directions | https://www.w3.org/WAI/WCAG22/Understanding/reflow
  - checkout-simplified-flow | Improve mobile responsiveness for checkout to work seamlessly across all device sizes. (measured: +5.8% orders) | https://cleancommit.io/ab-tests/simplified-checkout-process-3
  - nngroup-foldable-smartphones | Design for two viewport sizes on fold-out phones: smartphone screen when closed and tablet-sized screen when unfolded. | https://www.nngroup.com/articles/foldable-smartphones/
  - primer-responsive | Support minimum viewport width of 320px and height of 256px for maximum device compatibility. | https://primer.style/foundations/responsive
  - wcag-reflow | Stack content into single columns on narrow viewports to avoid multi-directional scrolling. | https://www.w3.org/WAI/WCAG22/Understanding/reflow
  - tailwind-design-system | Support responsive design by allowing breakpoint prefixes on any utility class. | https://tailwindcss.com/
  - microsoft-four-principles-future-design | Design layouts that adapt to different screen sizes and are aware of the platform to make experiences feel natural. | https://microsoft.design/articles/four-principles-for-the-future-of-design/
corpus:
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
check: At 320 CSS px wide (or 400% zoom) the page has no horizontal page scroll and every control from the desktop view is still reachable.
updated: 2026-10-11
---

## Why

People use the same app on a laptop, a tablet and a phone, and many zoom text; a layout that breaks forces a second, worse experience.

## Do / Don't

- **Do:** Collapse a three-column dashboard to one column at narrow widths and let wide tables scroll inside their own container.
- **Don't:** Fix the page at 1280 px wide or hide features on mobile.

## Evidence

Backing: 7 independent organisations across 10 quoted claims (7 guideline, 1 expert, 1 experiment, 1 study). WCAG 2.2 AA 1.4.10 Reflow requires it. Clusters: C0036, C0173, C0281.

- **W3C** (standard, [wcag-reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)): 1.4.10 Reflow, AA: content reflows at 320 CSS px wide without scrolling in two directions.
- **Clean Commit** (experiment, [checkout-simplified-flow](https://cleancommit.io/ab-tests/simplified-checkout-process-3)): Improve mobile responsiveness for checkout to work seamlessly across all device sizes. Measured: +5.8% orders.
- **Nielsen Norman Group** (study, [nngroup-foldable-smartphones](https://www.nngroup.com/articles/foldable-smartphones/)): Design for two viewport sizes on fold-out phones: smartphone screen when closed and tablet-sized screen when unfolded.
- **GitHub** (guideline, [primer-responsive](https://primer.style/foundations/responsive)): Support minimum viewport width of 320px and height of 256px for maximum device compatibility.
- **W3C** (guideline, [wcag-reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow)): Stack content into single columns on narrow viewports to avoid multi-directional scrolling.
- **Tailwind Labs** (guideline, [tailwind-design-system](https://tailwindcss.com/)): Support responsive design by allowing breakpoint prefixes on any utility class.
- **Microsoft** (guideline, [microsoft-four-principles-future-design](https://microsoft.design/articles/four-principles-for-the-future-of-design/)): Design layouts that adapt to different screen sizes and are aware of the platform to make experiences feel natural.

## Check

At 320 CSS px wide (or 400% zoom) the page has no horizontal page scroll and every control from the desktop view is still reachable.
