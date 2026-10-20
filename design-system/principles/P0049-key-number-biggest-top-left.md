---
id: P0049
title: The key number is biggest and top-left
rule: Put the dashboard's most important metric in the top-left of the glance band and give it the most visual weight; secondary metrics are smaller and follow.
layer: data
applies_to: [dashboard, kpi, kpi-row]
nodes: [page/dashboard, component/stat, section/kpis]
strength: should
status: draft
shaan: [hub-0003]
papers: [W03]
clusters: [C0270]
sources:
  - tableau-dashboards-best-practices | Place the dashboard's most important view in the upper-left corner where users' eyes scan first. | https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm
  - apple-wwdc2022-110340 | Use chart titles as headings to provide context; omit axis labels if title clarifies meaning. | https://developer.apple.com/videos/play/wwdc2022/110340/
  - odown-monitoring-dashboard | Prioritize primary metrics with most prominent visual treatment because they directly impact user experience or business outcomes. | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
corpus:
  - siso-ui-code/types.jsonl | section/kpis: 1,434 parts (mean 2.82): gradient rates 3.26 vs minimal 2.55; interactive motion 3.63 vs none 2.61 (model-rated) | 2026-10-11
check: The first KPI in DOM and visual order is the one named as primary in the spec, and its value has the largest font size in the glance band.
updated: 2026-10-11
---

## Why

Eyes land top-left first and are drawn to the largest element; the two together guarantee the key metric is read first.

## Do / Don't

- **Do:** Lead the KPI row with Revenue this month in the largest type, followed by three smaller supporting KPIs.
- **Don't:** Give eight KPI tiles equal size and weight.

## Evidence

Backing: 3 independent organisations across 3 quoted claims (1 guideline, 2 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0270.

- **Tableau** (guideline, [tableau-dashboards-best-practices](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)): Place the dashboard's most important view in the upper-left corner where users' eyes scan first.
- **Apple** (expert, [apple-wwdc2022-110340](https://developer.apple.com/videos/play/wwdc2022/110340/)): Use chart titles as headings to provide context; omit axis labels if title clarifies meaning.
- **Odown** (expert, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Prioritize primary metrics with most prominent visual treatment because they directly impact user experience or business outcomes.

Evidence is guideline and expert level from three organisations; it agrees with P0011.

## Check

The first KPI in DOM and visual order is the one named as primary in the spec, and its value has the largest font size in the glance band.
