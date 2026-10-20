---
id: P0053
title: Every mark is data: label directly, few gridlines, no chart junk
rule: Remove frames, backgrounds, heavy gridlines and decoration; keep a few light gridlines, label series directly instead of with a legend where possible, and keep detail in tooltips.
layer: data
applies_to: [chart, sparkline, legend]
nodes: [component/chart, component/table]
strength: should
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0245, C0246, C0247]
sources:
  - datashool-data-ink-ratio | Incorporate labels directly into visualizations instead of using separate legends when possible. | https://www.thedataschool.co.uk/calvin-gao/what-is-the-data-ink-ratio/
  - carbon-chart-anatomy | Use labels directly on charts to avoid long legends when possible. | https://carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy
  - edwardtufte-sparklines-history | Design graphics with a data-ink ratio of 1.0, eliminating all non-data elements like frames and tick marks. | https://www.edwardtufte.com/?p=69
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: Charts have no border or background fill, gridlines use a light token, and series with up to five lines are labelled directly.
updated: 2026-10-11
---

## Why

Ink that is not data competes with data for attention; a direct label saves the eye trips between the line and a legend.

## Do / Don't

- **Do:** Label each line at its end in the series colour and use about four light horizontal gridlines.
- **Don't:** Draw a bordered chart with a shaded background, dark gridlines and a legend box in the corner.

## Evidence

Backing: 3 independent organisations across 6 quoted claims (2 expert, 4 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0245, C0246, C0247.

- **The Data School** (guideline, [datashool-data-ink-ratio](https://www.thedataschool.co.uk/calvin-gao/what-is-the-data-ink-ratio/)): Incorporate labels directly into visualizations instead of using separate legends when possible.
- **IBM** (guideline, [carbon-chart-anatomy](https://carbondesignsystem.com/building-blocks/data-visualization/chart-anatomy)): Use labels directly on charts to avoid long legends when possible.
- **Edward Tufte** (expert, [edwardtufte-sparklines-history](https://www.edwardtufte.com/?p=69)): Design graphics with a data-ink ratio of 1.0, eliminating all non-data elements like frames and tick marks.

## Check

Charts have no border or background fill, gridlines use a light token, and series with up to five lines are labelled directly.
