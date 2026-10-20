---
id: P0009
title: Back and the URL restore exactly what was open
rule: Give every open state (tab, filter, sheet, expanded row) its own URL, and make Back return to the previous screen in the state it was left.
layer: nav
applies_to: [router, sheet, tab, filter, row-detail]
nodes: [component/tabs, component/sheet, component/dialog]
strength: must
status: draft
shaan: [hub-0005]
papers: [W03]
clusters: [C0031]
sources:
  - goodui-pattern-106 | Add a back button to checkout and signup flows to reduce abandonment. (measured: +X.X% combined effect across 2 tests) | https://goodui.org/patterns/106/
  - pagination-vs-infinite-scroll | Use history.pushState() to manage back-button behavior when implementing Load More; over 90% of sites get this wrong. (measured: 90%+ of Load More implementations fail back-button behavior) | https://smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons
  - govuk-pattern-question-pages | Include a back link at the top of question pages so users can change previous answers without trusting the browser back button. | https://design-system.service.gov.uk/patterns/question-pages/
  - mental-models-design | Make the Back button return to the previous screen, not up the hierarchy, so it matches user expectations. | https://www.nngroup.com/articles/mental-models/
corpus:
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
check: Open a filter, a tab and a sheet, reload: the same view returns. Press Back: the previous state returns.
updated: 2026-10-11
---

## Why

Back is the most used navigation control; people expect it to undo their last move, not jump up the hierarchy or lose their filters.

## Do / Don't

- **Do:** Write the open sheet and active filters into the query string so a reload or shared link lands in the same view.
- **Don't:** Reset filters and scroll position when the user comes back from a detail page.

## Evidence

Backing: 4 independent organisations across 5 quoted claims (1 expert, 1 experiment, 1 guideline, 2 study). Clusters: C0031.

- **GoodUI** (experiment, [goodui-pattern-106](https://goodui.org/patterns/106/)): Add a back button to checkout and signup flows to reduce abandonment. Measured: +X.X% combined effect across 2 tests.
- **Multiple** (study, [pagination-vs-infinite-scroll](https://smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons)): Use history.pushState() to manage back-button behavior when implementing Load More; over 90% of sites get this wrong. Measured: 90%+ of Load More implementations fail back-button behavior.
- **GOV.UK** (study, [govuk-pattern-question-pages](https://design-system.service.gov.uk/patterns/question-pages/)): Include a back link at the top of question pages so users can change previous answers without trusting the browser back button.
- **Don Norman** (expert, [mental-models-design](https://www.nngroup.com/articles/mental-models/)): Make the Back button return to the previous screen, not up the hierarchy, so it matches user expectations.

## Check

Open a filter, a tab and a sheet, reload: the same view returns. Press Back: the previous state returns.
