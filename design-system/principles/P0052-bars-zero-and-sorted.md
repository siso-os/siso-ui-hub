---
id: P0052
title: Bars start at zero and are sorted
rule: Start every bar and column axis at zero, and sort bars by value unless the categories have a natural order.
layer: data
applies_to: [bar-chart, column-chart]
nodes: [component/chart]
strength: should
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0243, C0248]
sources:
  - carbon-axes-labels | Always start numerical axes at zero for part-to-whole and comparison charts like bar and area charts. | https://carbondesignsystem.com/building-blocks/data-visualization/axes-and-labels
  - apple-wwdc2022-110340 | Fix the lower axis bound to zero for bar charts to keep bar heights proportional to their values. | https://developer.apple.com/videos/play/wwdc2022/110340/
  - ft-visual-vocabulary | Use ordered bars or columns to show ranks more easily than unsorted charts. | https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md
  - gestalt-principles-visualization | Sort and order chart elements for continuity: bars largest to smallest, time series past to future. | https://nastengraph.substack.com/p/gestalt-principles-in-data-visualization
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: For every bar or column chart, the value axis minimum is 0; categorical bars without natural order are in descending value.
updated: 2026-10-11
---

## Why

A bar's length is its value; a cut axis exaggerates differences. Sorting turns comparison into reading a ranked list.

## Do / Don't

- **Do:** Sort the revenue-by-region bars from largest to smallest with the axis at zero.
- **Don't:** Start the axis at 90 to make a 2% difference look like a doubling.

## Evidence

Backing: 4 independent organisations across 4 quoted claims (3 expert, 1 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0243, C0248.

- **IBM** (guideline, [carbon-axes-labels](https://carbondesignsystem.com/building-blocks/data-visualization/axes-and-labels)): Always start numerical axes at zero for part-to-whole and comparison charts like bar and area charts.
- **Apple** (expert, [apple-wwdc2022-110340](https://developer.apple.com/videos/play/wwdc2022/110340/)): Fix the lower axis bound to zero for bar charts to keep bar heights proportional to their values.
- **Financial Times** (expert, [ft-visual-vocabulary](https://github.com/Financial-Times/chart-doctor/blob/main/visual-vocabulary/README.md)): Use ordered bars or columns to show ranks more easily than unsorted charts.
- **Nasten Graph** (expert, [gestalt-principles-visualization](https://nastengraph.substack.com/p/gestalt-principles-in-data-visualization)): Sort and order chart elements for continuity: bars largest to smallest, time series past to future.

## Check

For every bar or column chart, the value axis minimum is 0; categorical bars without natural order are in descending value.
