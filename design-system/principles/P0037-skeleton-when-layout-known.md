---
id: P0037
title: Skeletons when the layout is known; spinners when it is not
rule: Show a skeleton shaped like the final content when the layout is known, a spinner only when it is not, and wait about 200 ms before showing either so fast loads do not flicker.
layer: state
applies_to: [skeleton, spinner, table, card, widget]
nodes: [atom/loader, component/table, component/card, component/widget]
strength: must
status: draft
shaan: [hub-0004, hub-0010]
papers: [W03]
clusters: [C0015, C0264]
sources:
  - steve-kinney-skeleton-screens | Show skeleton screens instead of spinners to reduce perceived loading time by 30% and bounce rate by 32%. (measured: 32% bounce rate reduction with skeletons vs spinners; 47% more likely to wait for content) | https://stevekinney.com/courses/react-performance/skeleton-screens-perceived-performance
  - nngroup-skeleton-video | Choose skeleton screens for full-page loads where content structure is predictable and helps set user expectations. | https://www.nngroup.com/videos/skeleton-screens-vs-progress-bars-vs-spinners/
  - skeleton-loading-perceived-performance | Use skeleton screens for content loading to improve perceived performance over blank screens. | https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/
  - skeleton-vs-spinners-loading | Use skeleton screens when fetching content and layout context matters, like feeds or dashboards. | https://www.onething.design/post/skeleton-screens-vs-loading-spinners
  - patternfly-skeleton-design-guidelines | Match skeleton structure exactly to the element being loaded. | https://www.patternfly.org/components/skeleton/design-guidelines
  - ibm-carbon-data-table-usage | Use skeleton states instead of spinners for tables with expected load time. | https://carbondesignsystem.com/components/data-table/usage/
corpus:
  - siso-ui-code/types.jsonl | atom/loader: 1,835 parts (mean 2.74): dark rates 3.01 vs clean 2.15; loop motion 2.87 vs none 1.98 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: With the network throttled, each widget shows a skeleton of the same dimensions as its loaded content (no layout shift when it fills); on a fast response no loader appears.
updated: 2026-10-11
---

## Why

A skeleton sets expectations about what is coming and where, which makes the wait feel shorter; a flash of loader on a fast response feels slower than nothing.

## Do / Don't

- **Do:** Render table rows and KPI tiles as grey blocks of the same size as the real content.
- **Don't:** Put a centred spinner in every widget, or flash a loader for 50 ms.

## Evidence

Backing: 6 independent organisations across 11 quoted claims (1 experiment, 1 expert, 9 guideline). Clusters: C0015, C0264.

- **Steve Kinney** (experiment, [steve-kinney-skeleton-screens](https://stevekinney.com/courses/react-performance/skeleton-screens-perceived-performance)): Show skeleton screens instead of spinners to reduce perceived loading time by 30% and bounce rate by 32%. Measured: 32% bounce rate reduction with skeletons vs spinners; 47% more likely to wait for content.
- **Nielsen Norman Group** (guideline, [nngroup-skeleton-video](https://www.nngroup.com/videos/skeleton-screens-vs-progress-bars-vs-spinners/)): Choose skeleton screens for full-page loads where content structure is predictable and helps set user expectations.
- **LogRocket** (guideline, [skeleton-loading-perceived-performance](https://blog.logrocket.com/ux-design/skeleton-loading-screen-design/)): Use skeleton screens for content loading to improve perceived performance over blank screens.
- **One Thing** (guideline, [skeleton-vs-spinners-loading](https://www.onething.design/post/skeleton-screens-vs-loading-spinners)): Use skeleton screens when fetching content and layout context matters, like feeds or dashboards.
- **Red Hat (PatternFly)** (guideline, [patternfly-skeleton-design-guidelines](https://www.patternfly.org/components/skeleton/design-guidelines)): Match skeleton structure exactly to the element being loaded.
- **IBM** (guideline, [ibm-carbon-data-table-usage](https://carbondesignsystem.com/components/data-table/usage/)): Use skeleton states instead of spinners for tables with expected load time.

The 200 ms delay before showing a loader is one practitioner's advice (Steve Kinney), not a measured result. The 30% perceived-time figure in his piece is reported, not from a study we can inspect.

## Check

With the network throttled, each widget shows a skeleton of the same dimensions as its loaded content (no layout shift when it fills); on a fast response no loader appears.
