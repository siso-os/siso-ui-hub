---
id: P0055
title: Tables: numbers right, headers fixed, rows that respond
rule: Right-align numeric columns, keep headers visible when scrolling, highlight the row under the pointer, keep column titles to one or two words, let people sort, and default to medium rows (about 40 px) with a denser option.
layer: data
applies_to: [table, data-grid]
nodes: [component/table, component/list]
strength: must
status: draft
shaan: [hub-0008]
papers: []
clusters: [C0080, C0049]
sources:
  - baymard-product-spec-sheet | Use row styling with alternating backgrounds or subtle borders to help users match labels to values easily. | https://baymard.com/blog/product-spec-sheet-ux-design
  - ibm-carbon-data-table-usage | Use medium (40px) row height as default; adjust for density or readability needs. | https://carbondesignsystem.com/components/data-table/usage/
  - nngroup-mobile-tables | Lock column headers in place when tables scroll vertically beyond one screen. | https://www.nngroup.com/articles/mobile-tables/
  - govuk-table | Right-align numbers in table cells to make comparison easier. | https://design-system.service.gov.uk/components/table/
  - uswds-table | Use striped table rows with alternating background colors to improve readability. | https://designsystem.digital.gov/components/table/
  - wai-tables | Mark header cells with th and data cells with td elements. | https://www.w3.org/WAI/tutorials/tables/
corpus:
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: Scroll a long table: the header stays visible; hovering a row highlights it; numeric columns are right-aligned; columns are sortable; row height is about 40 px by default.
updated: 2026-10-11
---

## Why

Data tables are read by scanning rows and comparing columns; fixed headers, row highlight and alignment keep the eye in the right row and column.

## Do / Don't

- **Do:** Use the bank's data table with a sticky header, sortable columns, row hover and a density toggle.
- **Don't:** Build a grid of divs with centred numbers and headers that scroll away.

## Evidence

Backing: 7 independent organisations across 13 quoted claims (10 guideline, 1 study, 2 expert). Clusters: C0080, C0049.

- **Baymard Institute** (study, [baymard-product-spec-sheet](https://baymard.com/blog/product-spec-sheet-ux-design)): Use row styling with alternating backgrounds or subtle borders to help users match labels to values easily.
- **IBM** (guideline, [ibm-carbon-data-table-usage](https://carbondesignsystem.com/components/data-table/usage/)): Use medium (40px) row height as default; adjust for density or readability needs.
- **Nielsen Norman Group** (guideline, [nngroup-mobile-tables](https://www.nngroup.com/articles/mobile-tables/)): Lock column headers in place when tables scroll vertically beyond one screen.
- **GOV.UK** (guideline, [govuk-table](https://design-system.service.gov.uk/components/table/)): Right-align numbers in table cells to make comparison easier.
- **USWDS** (guideline, [uswds-table](https://designsystem.digital.gov/components/table/)): Use striped table rows with alternating background colors to improve readability.
- **W3C** (guideline, [wai-tables](https://www.w3.org/WAI/tutorials/tables/)): Mark header cells with th and data cells with td elements.

## Check

Scroll a long table: the header stays visible; hovering a row highlights it; numeric columns are right-aligned; columns are sortable; row height is about 40 px by default.
