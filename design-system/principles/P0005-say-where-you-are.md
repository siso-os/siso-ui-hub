---
id: P0005
title: Every screen says where you are and how to leave
rule: Give every page a unique descriptive title, mark the current nav item, and add breadcrumbs only when the hierarchy is deeper than two levels.
layer: nav
applies_to: [page-title, side-nav, breadcrumb, tab]
nodes: [section/page-header, atom/text, component/breadcrumb]
strength: must
status: draft
shaan: [hub-0014]
papers: [W01]
clusters: [C0108, C0231, C0225, C0150, C0016]
sources:
  - goodui-leak-booking-sticks-to-a-traditional-breadcrumb-after-rejecting-a-multi-dimensional-one | Keep breadcrumb navigation simple and single-dimensional; avoid adding secondary menus to each level. | https://goodui.org/leaks/booking-sticks-to-a-traditional-breadcrumb-after-rejecting-a-multi-dimensional-one/
  - gray-dark-patterns-taxonomy | Avoid artificially difficult processes; do not obstruct users from completing their task or accessing information. | https://deceptive.design/articles/the-dark-patterns-side-of-ux-design
  - carbon-breadcrumb | Reserve breadcrumbs for hierarchies with more than two levels; do not use them as a replacement for primary navigation. | https://carbondesignsystem.com/components/breadcrumb/usage/
  - govuk-breadcrumbs | Start breadcrumbs with home and end with the parent section of the current page. | https://design-system.service.gov.uk/components/breadcrumbs/
  - wcag-page-titled | In single-page applications, change the page title dynamically to match each distinct view or state. | https://www.w3.org/WAI/WCAG22/Understanding/page-titled
  - uswds-sidenav | Indicate the current page in navigation using an active state to show user location. | https://designsystem.digital.gov/components/side-navigation/
corpus:
  - siso-ui-code/types.jsonl | section/page-header: 365 parts (mean 2.52): clean rates 3.23 vs minimal 2.29; micro motion 3.12 vs none 2.39 (model-rated) | 2026-10-11
check: For each route, document.title is unique and matches the H1, and exactly one nav item has aria-current=page.
updated: 2026-10-11
---

## Why

Orientation is the first question on any screen. A title and a marked nav item answer it without effort; breadcrumbs answer the way back in deep trees.

## Do / Don't

- **Do:** Set the document title and H1 to the page name and tint the active nav item (a tint, not a solid fill, per hub-0014).
- **Don't:** Use the same title on every page or show breadcrumbs for a flat two-level app.

## Evidence

Backing: 10 independent organisations across 18 quoted claims (14 guideline, 1 experiment, 2 expert, 1 study). Clusters: C0108, C0231, C0225, C0150, C0016.

- **GoodUI** (experiment, [goodui-leak-booking-sticks-to-a-traditional-breadcrumb-after-rejecting-a-multi-dimensional-one](https://goodui.org/leaks/booking-sticks-to-a-traditional-breadcrumb-after-rejecting-a-multi-dimensional-one/)): Keep breadcrumb navigation simple and single-dimensional; avoid adding secondary menus to each level.
- **Indiana University** (study, [gray-dark-patterns-taxonomy](https://deceptive.design/articles/the-dark-patterns-side-of-ux-design)): Avoid artificially difficult processes; do not obstruct users from completing their task or accessing information.
- **IBM** (guideline, [carbon-breadcrumb](https://carbondesignsystem.com/components/breadcrumb/usage/)): Reserve breadcrumbs for hierarchies with more than two levels; do not use them as a replacement for primary navigation.
- **GOV.UK** (guideline, [govuk-breadcrumbs](https://design-system.service.gov.uk/components/breadcrumbs/)): Start breadcrumbs with home and end with the parent section of the current page.
- **W3C** (guideline, [wcag-page-titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled)): In single-page applications, change the page title dynamically to match each distinct view or state.
- **USWDS** (guideline, [uswds-sidenav](https://designsystem.digital.gov/components/side-navigation/)): Indicate the current page in navigation using an active state to show user location.

## Check

For each route, document.title is unique and matches the H1, and exactly one nav item has aria-current=page.
