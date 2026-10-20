---
id: P0054
title: Highlight one thing in colour and grey the rest
rule: Use few colours in charts: grey for context and one highlight colour for what matters, a colour-blind-safe categorical palette when categories need hues, and the same colour for the same thing on every chart.
layer: data
applies_to: [chart, table, kpi]
nodes: [component/chart, component/table, component/stat]
strength: must
status: draft
shaan: [hub-0014]
papers: []
clusters: []
sources:
  - odown-monitoring-dashboard | Use color-blind friendly palettes so status indicators remain distinguishable for people with color blindness. (measured: Approximately 8% of men and 0.5% of women have some form of color blindness) | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
  - carbon-accessibility-guidelines | Remember that 8% of men and 0.4% of women are color-blind; never use color alone to convey information. (measured: 8% of men, 0.4% of women affected) | https://carbondesignsystem.com/guidelines/accessibility
  - atlassian-dataviz-color | Limit categorical data visualization colors to 5-6 maximum; group additional categories together. | https://atlassian.design/foundations/color/data-visualization-color
  - laws-ux-von-restorff | Do not rely exclusively on color to communicate contrast to users with color vision deficiency. | https://lawsofux.com/von-restorff-effect/
  - form-error-guidelines-nn-group | Use color plus iconography to mark errors, not color alone, to support colorblind users. | https://www.nngroup.com/articles/errors-forms-design-guidelines/
corpus:
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: Count distinct hues per chart: at most one highlight plus greys, or a palette from the categorical data-viz tokens; a series keeps its colour across charts.
updated: 2026-10-11
---

## Why

Colour pops out pre-attentively only when it is rare; many hues force a legend lookup and fail for colour-blind readers.

## Do / Don't

- **Do:** Show all regions in grey and the selected region in the accent.
- **Don't:** Give twelve categories twelve saturated colours.

## Evidence

Backing: 5 independent organisations across 7 quoted claims (5 guideline, 2 study).

- **Odown** (study, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Use color-blind friendly palettes so status indicators remain distinguishable for people with color blindness. Measured: Approximately 8% of men and 0.5% of women have some form of color blindness.
- **IBM** (study, [carbon-accessibility-guidelines](https://carbondesignsystem.com/guidelines/accessibility)): Remember that 8% of men and 0.4% of women are color-blind; never use color alone to convey information. Measured: 8% of men, 0.4% of women affected.
- **Atlassian** (guideline, [atlassian-dataviz-color](https://atlassian.design/foundations/color/data-visualization-color)): Limit categorical data visualization colors to 5-6 maximum; group additional categories together.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-von-restorff](https://lawsofux.com/von-restorff-effect/)): Do not rely exclusively on color to communicate contrast to users with color vision deficiency.
- **Nielsen Norman Group** (guideline, [form-error-guidelines-nn-group](https://www.nngroup.com/articles/errors-forms-design-guidelines/)): Use color plus iconography to mark errors, not color alone, to support colorblind users.

## Check

Count distinct hues per chart: at most one highlight plus greys, or a palette from the categorical data-viz tokens; a series keeps its colour across charts.
