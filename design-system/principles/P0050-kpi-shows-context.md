---
id: P0050
title: A KPI shows its comparison, trend and timeframe
rule: Show every KPI with its label, value, unit and timeframe, plus a comparison (target, previous period or normal range) and, where useful, a sparkline; never hide the label or value to save space.
layer: data
applies_to: [kpi, metric-card, sparkline]
nodes: [component/stat, section/kpis, component/widget]
strength: should
status: draft
shaan: [hub-0004, hub-0009]
papers: [W03]
clusters: []
sources:
  - elastic-eui-metric-chart | Never hide title and value in metric charts; hide secondary elements like subtitles first when space is constrained. | https://eui.elastic.co/docs/dataviz/types/metric-chart/
  - cdc-sparkline-cove | Ensure grouped sparklines have comparable start and end points and the same number of data points. | https://www.cdc.gov/cove/data-visualization-types/sparkline.html
  - linear-dashboards-best-practices | Pair key metrics with context charts showing current, recent, and historical data to help users interpret performance instantly. | https://linear.app/blog/dashboards-best-practices
  - odown-monitoring-dashboard | Provide baseline comparisons to help viewers understand whether current metric values are normal or problematic. | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
corpus:
  - siso-ui-code/types.jsonl | section/kpis: 1,434 parts (mean 2.82): gradient rates 3.26 vs minimal 2.55; interactive motion 3.63 vs none 2.61 (model-rated) | 2026-10-11
check: Each KPI component renders label, value, timeframe and a comparison; at the smallest width, label and value are still visible.
updated: 2026-10-11
---

## Why

A number alone cannot be judged; good or bad only appears against a reference, and the trend shows whether it is getting better.

## Do / Don't

- **Do:** Show Revenue, last 30 days, 42.1k, up 8% vs previous 30 days, with a small sparkline.
- **Don't:** Show a lone 42,103 with no label of period or comparison.

## Evidence

Backing: 4 independent organisations across 5 quoted claims (2 expert, 3 guideline). No experiment or study among them: this rests on published guidelines and expert opinion.

- **Elastic** (guideline, [elastic-eui-metric-chart](https://eui.elastic.co/docs/dataviz/types/metric-chart/)): Never hide title and value in metric charts; hide secondary elements like subtitles first when space is constrained.
- **CDC** (guideline, [cdc-sparkline-cove](https://www.cdc.gov/cove/data-visualization-types/sparkline.html)): Ensure grouped sparklines have comparable start and end points and the same number of data points.
- **Linear** (expert, [linear-dashboards-best-practices](https://linear.app/blog/dashboards-best-practices)): Pair key metrics with context charts showing current, recent, and historical data to help users interpret performance instantly.
- **Odown** (expert, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Provide baseline comparisons to help viewers understand whether current metric values are normal or problematic.

## Check

Each KPI component renders label, value, timeframe and a comparison; at the smallest width, label and value are still visible.
