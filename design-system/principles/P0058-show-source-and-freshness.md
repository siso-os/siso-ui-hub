---
id: P0058
title: Every number shows its source and how fresh it is
rule: Show when each widget's data was last updated and where it comes from, and mark it stale or source-down when it is out of date.
layer: data
applies_to: [widget, kpi, chart, table]
nodes: [component/widget, component/stat, component/chart]
strength: must
status: draft
shaan: [hub-0009, hub-0004]
papers: [W03]
clusters: []
sources:
  - linear-dashboards-best-practices | Create fewer dashboards with clear purposes and owners; adoption drops when too many dashboards are created. (measured: adoption drops quickly beyond two dashboards; most dashboards go stale when created in high numbers) | https://linear.app/blog/dashboards-best-practices
  - fogg-2002-stanford-web-credibility | Update content regularly and show recent review dates. | https://credibility.stanford.edu/guidelines
  - cdc-sparkline-cove | Include a data source citation to increase graphic credibility and allow deeper investigation. | https://www.cdc.gov/cove/data-visualization-types/sparkline.html
  - nngroup-top-tasks | Show timestamps or last-update indicators on dynamic crisis information to build trust and confirm data freshness when user decisions depend on accuracy. | https://www.nngroup.com/articles/top-tasks/
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: Each widget renders a last-updated time and source; stop a source and the widget shows a stale or source-down state within its refresh interval.
updated: 2026-10-11
---

## Why

People act on numbers they believe are current; a timestamp and source let them judge trust, and a stale mark stops decisions on old data.

## Do / Don't

- **Do:** Show Updated 2 min ago, Stripe in the widget footer and switch to a Stale label after the refresh window passes.
- **Don't:** Keep showing yesterday's numbers as if they were live when a source fails.

## Evidence

Backing: 4 independent organisations across 5 quoted claims (1 guideline, 2 study, 2 expert).

- **Linear** (study, [linear-dashboards-best-practices](https://linear.app/blog/dashboards-best-practices)): Create fewer dashboards with clear purposes and owners; adoption drops when too many dashboards are created. Measured: adoption drops quickly beyond two dashboards; most dashboards go stale when created in high numbers.
- **Stanford Behavior Design Lab** (study, [fogg-2002-stanford-web-credibility](https://credibility.stanford.edu/guidelines)): Update content regularly and show recent review dates.
- **CDC** (guideline, [cdc-sparkline-cove](https://www.cdc.gov/cove/data-visualization-types/sparkline.html)): Include a data source citation to increase graphic credibility and allow deeper investigation.
- **Nielsen Norman Group** (expert, [nngroup-top-tasks](https://www.nngroup.com/articles/top-tasks/)): Show timestamps or last-update indicators on dynamic crisis information to build trust and confirm data freshness when user decisions depend on accuracy.

## Check

Each widget renders a last-updated time and source; stop a source and the widget shows a stale or source-down state within its refresh interval.
