---
id: P0035
title: One column, in the order people think
rule: Lay out forms in a single column, in the order people think about the task, with related fields grouped under a heading.
layer: page
applies_to: [form, settings]
nodes: [component/form, page/settings]
strength: must
status: draft
shaan: []
papers: []
clusters: [C0002]
sources:
  - goodui-pattern-9 | Break multi-field forms into separate sequential steps rather than showing all fields at once. (measured: 14 tests meta-analyzed, positive effects on progression, leads, signups, sales, and revenue) | https://goodui.org/patterns/9/
  - carbon-pattern-forms | Arrange form fields in logical, predictable order such as first name before last name. | https://carbondesignsystem.com/patterns/forms-pattern
  - wai-forms | Split long forms into logical steps and inform users of progress. | https://www.w3.org/WAI/tutorials/forms/
  - accessibility-heuristics-principles | Organize form fields in a logical order that reflects natural task flow, not arbitrary groupings. | https://abstracta.us/blog/accessibility-testing/accessibility-heuristic
  - uswds-form | Group related form controls in fieldset with legend labels. | https://designsystem.digital.gov/components/form/
  - govuk-radios | Group radios in a fieldset with legend describing the question. | https://design-system.service.gov.uk/components/radios/
corpus:
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: In the form, no two unrelated inputs share a row (short related pairs like first and last name excepted); fields appear in task order.
updated: 2026-10-11
---

## Why

A single column gives one clear path down the page; multi-column forms cause skipped fields and zig-zag reading.

## Do / Don't

- **Do:** Group billing fields together under a heading in one column.
- **Don't:** Place unrelated fields side by side to save height.

## Evidence

Backing: 7 independent organisations across 20 quoted claims (8 experiment, 11 guideline, 1 expert). Clusters: C0002.

- **GoodUI** (experiment, [goodui-pattern-9](https://goodui.org/patterns/9/)): Break multi-field forms into separate sequential steps rather than showing all fields at once. Measured: 14 tests meta-analyzed, positive effects on progression, leads, signups, sales, and revenue.
- **IBM** (guideline, [carbon-pattern-forms](https://carbondesignsystem.com/patterns/forms-pattern)): Arrange form fields in logical, predictable order such as first name before last name.
- **W3C** (guideline, [wai-forms](https://www.w3.org/WAI/tutorials/forms/)): Split long forms into logical steps and inform users of progress.
- **Abstracta** (guideline, [accessibility-heuristics-principles](https://abstracta.us/blog/accessibility-testing/accessibility-heuristic)): Organize form fields in a logical order that reflects natural task flow, not arbitrary groupings.
- **USWDS** (guideline, [uswds-form](https://designsystem.digital.gov/components/form/)): Group related form controls in fieldset with legend labels.
- **GOV.UK** (guideline, [govuk-radios](https://design-system.service.gov.uk/components/radios/)): Group radios in a fieldset with legend describing the question.

GoodUI experiments favour grids over single columns for product listings; that is about browsing products, not about forms, where single columns tested better.

## Check

In the form, no two unrelated inputs share a row (short related pairs like first and last name excepted); fields appear in task order.
