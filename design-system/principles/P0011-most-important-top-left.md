---
id: P0011
title: Most important first: top-left, then down
rule: Order every page by importance: the one thing the page is for goes top-left, then the work, then detail.
layer: page
applies_to: [page, dashboard, kpi-row]
nodes: [page/dashboard, section/kpis, section/data-view, section/hero]
strength: must
status: draft
shaan: [hub-0003, hub-0002]
papers: [W03]
clusters: [C0174, C0270]
sources:
  - goodui-leak-googles-recommended-questions-are-better-off-below-search-results | Position primary content above secondary content; show main results before alternative questions. | https://goodui.org/leaks/googles-recommended-questions-are-better-off-below-search-results/
  - tableau-dashboards-best-practices | Place the dashboard's most important view in the upper-left corner where users' eyes scan first. | https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm
  - apple-wwdc2022-10037 | Order screen information by importance; place the most critical message at the top. | https://developer.apple.com/videos/play/wwdc2022/10037/
  - odown-monitoring-dashboard | Prioritize primary metrics with most prominent visual treatment because they directly impact user experience or business outcomes. | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
corpus:
  - siso-ui-code/types.jsonl | section/kpis: 1,434 parts (mean 2.82): gradient rates 3.26 vs minimal 2.55; interactive motion 3.63 vs none 2.61 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
check: In a screenshot, the element tagged as the page's primary item has the smallest top and left offsets of the page's content blocks.
updated: 2026-10-11
---

## Why

Readers of left-to-right languages scan from the top-left and spend most viewing time on the left; what sits there is seen first and remembered best.

## Do / Don't

- **Do:** Put the page's key status or KPI in the top-left band, the main work area below it, and supporting detail last.
- **Don't:** Lead with a decorative banner or put the key number bottom-right.

## Evidence

Backing: 4 independent organisations across 5 quoted claims (3 expert, 1 guideline, 1 experiment). Clusters: C0174, C0270.

- **GoodUI** (experiment, [goodui-leak-googles-recommended-questions-are-better-off-below-search-results](https://goodui.org/leaks/googles-recommended-questions-are-better-off-below-search-results/)): Position primary content above secondary content; show main results before alternative questions.
- **Tableau** (guideline, [tableau-dashboards-best-practices](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)): Place the dashboard's most important view in the upper-left corner where users' eyes scan first.
- **Apple** (expert, [apple-wwdc2022-10037](https://developer.apple.com/videos/play/wwdc2022/10037/)): Order screen information by importance; place the most critical message at the top.
- **Odown** (expert, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Prioritize primary metrics with most prominent visual treatment because they directly impact user experience or business outcomes.

## Check

In a screenshot, the element tagged as the page's primary item has the smallest top and left offsets of the page's content blocks.
