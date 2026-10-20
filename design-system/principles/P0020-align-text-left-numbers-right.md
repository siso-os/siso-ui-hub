---
id: P0020
title: Left-align text; right-align numbers in tabular figures
rule: Left-align text, right-align numbers (and their column headers), and set numbers in tabular figures so digits line up.
layer: type
applies_to: [table, kpi, list]
nodes: [component/table, component/stat, component/list]
strength: should
status: draft
shaan: []
papers: []
clusters: []
sources:
  - govuk-table | Right-align numbers in table cells to make comparison easier. | https://design-system.service.gov.uk/components/table/
  - primer-typography | Left-align text with ragged right edges rather than justifying, centering, or right-aligning. | https://primer.style/foundations/typography
  - ibm-carbon-empty-states-pattern | Use centered images in small tiles to draw attention; left-align text and actions as a block. | https://carbondesignsystem.com/patterns/empty-states-pattern/
corpus:
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: For each numeric table column, cells and header compute text-align right and font-variant-numeric includes tabular-nums.
updated: 2026-10-11
---

## Why

Aligned place values let the eye compare magnitudes down a column without reading each number.

## Do / Don't

- **Do:** Use font-variant-numeric: tabular-nums and right alignment on every numeric column and KPI.
- **Don't:** Centre numbers in a table or justify paragraph text.

## Evidence

Backing: 3 independent organisations across 3 quoted claims (3 guideline). No experiment or study among them: this rests on published guidelines and expert opinion.

- **GOV.UK** (guideline, [govuk-table](https://design-system.service.gov.uk/components/table/)): Right-align numbers in table cells to make comparison easier.
- **GitHub** (guideline, [primer-typography](https://primer.style/foundations/typography)): Left-align text with ragged right edges rather than justifying, centering, or right-aligning.
- **IBM** (guideline, [ibm-carbon-empty-states-pattern](https://carbondesignsystem.com/patterns/empty-states-pattern/)): Use centered images in small tiles to draw attention; left-align text and actions as a block.

## Check

For each numeric table column, cells and header compute text-align right and font-variant-numeric includes tabular-nums.
