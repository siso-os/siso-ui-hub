---
id: P0051
title: Pick the chart by the question; encode with position and length
rule: Use a line for change over time, a bar for comparing categories, and a table for exact lookup; prefer position and length over angle, area and colour; avoid 3D and avoid pies beyond a few parts.
layer: data
applies_to: [chart, dashboard]
nodes: [component/chart, page/dashboard]
strength: should
status: draft
shaan: []
papers: []
clusters: [C0162]
sources:
  - carbon-axes-labels | Always start numerical axes at zero for part-to-whole and comparison charts like bar and area charts. | https://carbondesignsystem.com/building-blocks/data-visualization/axes-and-labels
  - elastic-eui-metric-chart | Use line charts for precise time-series analysis; use metric charts only for contextual trend information. | https://eui.elastic.co/docs/dataviz/types/metric-chart/
  - datashool-data-ink-ratio | Incorporate labels directly into visualizations instead of using separate legends when possible. | https://www.thedataschool.co.uk/calvin-gao/what-is-the-data-ink-ratio/
  - apple-wwdc2022-110342 | Use bar charts for comparing values across categories to enable easier relative size comparison. | https://developer.apple.com/videos/play/wwdc2022/110342/
  - odown-monitoring-dashboard | Use line charts for trends over time, bar charts to compare quantities, and heat maps to show patterns across dimensions. | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: For each chart, the chart type matches the question in its title (time to line, comparison to bar); no 3D charts; no pie or donut with more than five segments.
updated: 2026-10-11
---

## Why

People judge position along a common scale most accurately, then length; angle, area and colour shade are read with much larger error.

## Do / Don't

- **Do:** Show monthly signups as a line and signups by channel as a sorted horizontal bar chart.
- **Don't:** Use a 3D pie with nine slices to compare channels.

## Evidence

Backing: 5 independent organisations across 10 quoted claims (2 expert, 8 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0162.

- **IBM** (guideline, [carbon-axes-labels](https://carbondesignsystem.com/building-blocks/data-visualization/axes-and-labels)): Always start numerical axes at zero for part-to-whole and comparison charts like bar and area charts.
- **Elastic** (guideline, [elastic-eui-metric-chart](https://eui.elastic.co/docs/dataviz/types/metric-chart/)): Use line charts for precise time-series analysis; use metric charts only for contextual trend information.
- **The Data School** (guideline, [datashool-data-ink-ratio](https://www.thedataschool.co.uk/calvin-gao/what-is-the-data-ink-ratio/)): Incorporate labels directly into visualizations instead of using separate legends when possible.
- **Apple** (expert, [apple-wwdc2022-110342](https://developer.apple.com/videos/play/wwdc2022/110342/)): Use bar charts for comparing values across categories to enable easier relative size comparison.
- **Odown** (expert, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Use line charts for trends over time, bar charts to compare quantities, and heat maps to show patterns across dimensions.

## Check

For each chart, the chart type matches the question in its title (time to line, comparison to bar); no 3D charts; no pie or donut with more than five segments.
