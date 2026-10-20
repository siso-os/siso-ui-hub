---
id: P0002
title: The shell loads once; each region fills on its own
rule: Draw the frame (side nav, header, page title) at once and let each content region load and show its data independently, never one spinner for the whole page.
layer: shell
applies_to: [app-shell, side-nav, header, widget]
nodes: [section/shell, section/sidebar, section/top-bar, section/page-header]
strength: should
status: draft
shaan: [hub-0010]
papers: [W01, W03]
clusters: [C0265]
sources:
  - skeleton-vs-spinners-loading | Implement progressive loading in skeleton screens so placeholders transform into real content, making users perceive the interface as faster. | https://www.onething.design/post/skeleton-screens-vs-loading-spinners
  - steve-kinney-skeleton-screens | Load and display content incrementally as available rather than waiting for all data, revealing sections sequentially. | https://stevekinney.com/courses/react-performance/skeleton-screens-perceived-performance
  - nngroup-need-for-speed | Target subsecond load times as the ideal; prioritize each incremental speed gain over settling for average. | https://www.nngroup.com/articles/the-need-for-speed/
corpus:
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/sidebar: 873 parts (mean 2.91): dark rates 3.36 vs minimal 2.43; interactive motion 3.42 vs none 2.25 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/top-bar: 318 parts (mean 2.77): clean rates 3.28 vs minimal 2.44; micro motion 2.94 vs none 2.48 (model-rated) | 2026-10-11
check: Throttle the network to Slow 3G and reload: the nav and header paint first, and each widget fills in separately; block one data source and the rest still render.
updated: 2026-10-11
---

## Why

People judge speed by when something useful appears, not when the last byte lands. A stable frame tells them where they are while data arrives, and one slow source no longer blocks the rest.

## Do / Don't

- **Do:** Render the side nav and page header from the cache, then stream each widget into its slot with its own skeleton.
- **Don't:** Hold the whole dashboard behind a full-screen spinner until every query returns.

## Evidence

Backing: 3 independent organisations across 3 quoted claims (1 guideline, 1 study, 1 expert). Clusters: C0265.

- **One Thing** (study, [skeleton-vs-spinners-loading](https://www.onething.design/post/skeleton-screens-vs-loading-spinners)): Implement progressive loading in skeleton screens so placeholders transform into real content, making users perceive the interface as faster.
- **Steve Kinney** (guideline, [steve-kinney-skeleton-screens](https://stevekinney.com/courses/react-performance/skeleton-screens-perceived-performance)): Load and display content incrementally as available rather than waiting for all data, revealing sections sequentially.
- **Nielsen Norman Group** (expert, [nngroup-need-for-speed](https://www.nngroup.com/articles/the-need-for-speed/)): Target subsecond load times as the ideal; prioritize each incremental speed gain over settling for average.

## Check

Throttle the network to Slow 3G and reload: the nav and header paint first, and each widget fills in separately; block one data source and the rest still render.
