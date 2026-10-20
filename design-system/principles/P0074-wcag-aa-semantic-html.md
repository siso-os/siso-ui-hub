---
id: P0074
title: Meet WCAG 2.2 AA, with semantic HTML first
rule: Build every screen to WCAG 2.2 AA using native semantic elements first (headings, landmarks, button, table with th and scope, label) and ARIA only to fill gaps.
layer: base
applies_to: [page, table, form, nav, dialog]
nodes: [page/dashboard, component/table, component/form, section/nav, component/dialog, page/home]
strength: must
status: draft
shaan: []
papers: [W01]
clusters: [C0055, C0049, C0098, C0188]
sources:
  - wcag-focus-visible | 2.4.7 Focus Visible, AA: keyboard focus is always visible | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
  - apple-wwdc2021-10308 | Provide voice output alongside visual features so blind or low-vision users access content equivalent to sighted users. | https://developer.apple.com/videos/play/wwdc2021/10308/
  - uswds-header | Use list elements for navigation links to assist screen readers. | https://designsystem.digital.gov/components/header/
  - wai-page-regions | Use nav element with labels to identify navigation menus. | https://www.w3.org/WAI/tutorials/page-structure/regions/
  - govuk-table | Use scope attribute on headers to distinguish row and column headers for assistive tech. | https://design-system.service.gov.uk/components/table/
  - carbon-design-system-ibm-accessibility | Translate all visual information into text; test designs with screen readers for blind users. | https://carbondesignsystem.com/guidelines/accessibility/overview/
  - react-bootstrap-design | Build React components with accessibility as a core feature, not an afterthought. | https://react-bootstrap.github.io/
corpus:
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated) | 2026-10-11
check: axe-core reports no serious or critical violations; data tables use table, th and scope; every page has one main landmark and one H1.
updated: 2026-10-11
---

## Why

Semantic HTML gives keyboard, screen-reader and browser support for free; ARIA added on the wrong element breaks it.

## Do / Don't

- **Do:** Use a real table with th scope=col for data and a real button for actions.
- **Don't:** Build a table from divs with role attributes, or a button from a span.

## Evidence

Backing: 7 independent organisations across 15 quoted claims (4 expert, 10 guideline, 1 study). WCAG 2.2 Level AA is the published floor. Clusters: C0055, C0049, C0098, C0188.

- **W3C** (standard, [wcag-focus-visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)): 2.4.7 Focus Visible, AA: keyboard focus is always visible.
- **Apple** (study, [apple-wwdc2021-10308](https://developer.apple.com/videos/play/wwdc2021/10308/)): Provide voice output alongside visual features so blind or low-vision users access content equivalent to sighted users.
- **USWDS** (guideline, [uswds-header](https://designsystem.digital.gov/components/header/)): Use list elements for navigation links to assist screen readers.
- **W3C** (guideline, [wai-page-regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)): Use nav element with labels to identify navigation menus.
- **GOV.UK** (guideline, [govuk-table](https://design-system.service.gov.uk/components/table/)): Use scope attribute on headers to distinguish row and column headers for assistive tech.
- **IBM** (guideline, [carbon-design-system-ibm-accessibility](https://carbondesignsystem.com/guidelines/accessibility/overview/)): Translate all visual information into text; test designs with screen readers for blind users.
- **Bootstrap** (guideline, [react-bootstrap-design](https://react-bootstrap.github.io/)): Build React components with accessibility as a core feature, not an afterthought.

## Check

axe-core reports no serious or critical violations; data tables use table, th and scope; every page has one main landmark and one H1.
