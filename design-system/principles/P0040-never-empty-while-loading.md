---
id: P0040
title: Never say there is nothing while it is still loading
rule: Keep loading, empty, error and stale as four distinct states, and never show an empty message until the data has actually arrived empty.
layer: state
applies_to: [widget, table, list, status]
nodes: [component/widget, component/table, component/list]
strength: should
status: draft
shaan: [hub-0009, hub-0004]
papers: [W03]
clusters: []
sources:
  - nngroup-empty-states | Display a system-status message when no content exists to clarify whether loading is occurring, an error happened, or results are genuinely absent. | https://nngroup.com/articles/empty-state-interface-design
  - apple-wwdc2026-292 | Display a no-results view with search icon, title, and subtitle; show the search text to help catch typos. | https://developer.apple.com/videos/play/wwdc2026/292/
corpus:
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: Throttle the network and watch each widget: no empty-state text appears before the request completes; a failed request shows an error, not empty.
updated: 2026-10-11
---

## Why

A false No results teaches people to distrust every empty state and reload to check; status must tell the truth to be believed.

## Do / Don't

- **Do:** Show a skeleton while fetching, then either the rows or No orders this week.
- **Don't:** Render No data first and replace it with rows a second later.

## Evidence

Backing: 2 independent organisations across 3 quoted claims (3 expert). No experiment or study among them: this rests on published guidelines and expert opinion.

- **Nielsen Norman Group** (expert, [nngroup-empty-states](https://nngroup.com/articles/empty-state-interface-design)): Display a system-status message when no content exists to clarify whether loading is occurring, an error happened, or results are genuinely absent.
- **Apple** (expert, [apple-wwdc2026-292](https://developer.apple.com/videos/play/wwdc2026/292/)): Display a no-results view with search icon, title, and subtitle; show the search text to help catch typos.

## Check

Throttle the network and watch each widget: no empty-state text appears before the request completes; a failed request shows an error, not empty.
