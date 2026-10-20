---
id: P0003
title: One persistent side nav for an app with five or more sections
rule: Give an app with five or more top-level sections one persistent left side nav, grouped and labelled, that stays in place on every page; fewer sections can use a top or tab bar.
layer: shell
applies_to: [side-nav, app-shell]
nodes: [section/sidebar, section/shell]
strength: should
status: draft
shaan: [hub-0015]
papers: [W01]
clusters: [C0214, C0218, C0089]
sources:
  - apple-wwdc2021-10126 | Limit tab bar buttons to avoid reducing tappable area and increasing visual complexity that obscures features. | https://developer.apple.com/videos/play/wwdc2021/10126/
  - uswds-header | Structure navigation by user tasks, not by organizational hierarchy. | https://designsystem.digital.gov/components/header/
  - notion-cohesion-design-philosophy | Use progressive disclosure in sidebars to scale from simple to deeply nested structures. | https://www.925studios.co/blog/notion-design-breakdown
corpus:
  - siso-ui-code/types.jsonl | section/sidebar: 873 parts (mean 2.91): dark rates 3.36 vs minimal 2.43; interactive motion 3.42 vs none 2.25 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
check: Visit three different pages: the side nav is in the same place with the same items in the same order; count top-level items to confirm the side nav is used only when there are five or more.
updated: 2026-10-11
---

## Why

Visible options are recognised rather than recalled, and a fixed list builds spatial memory, so returning users find a section by position without reading.

## Do / Don't

- **Do:** Show all top-level sections in a left rail with group headings, collapse deeper levels under their parent, and keep the rail the same on every page.
- **Don't:** Change the order or contents of the nav between pages, or nest a second sidebar inside the first.

## Evidence

Backing: 3 independent organisations across 11 quoted claims (6 expert, 4 guideline, 1 study). Clusters: C0214, C0218, C0089.

- **Apple** (study, [apple-wwdc2021-10126](https://developer.apple.com/videos/play/wwdc2021/10126/)): Limit tab bar buttons to avoid reducing tappable area and increasing visual complexity that obscures features.
- **USWDS** (guideline, [uswds-header](https://designsystem.digital.gov/components/header/)): Structure navigation by user tasks, not by organizational hierarchy.
- **Notion** (expert, [notion-cohesion-design-philosophy](https://www.925studios.co/blog/notion-design-breakdown)): Use progressive disclosure in sidebars to scale from simple to deeply nested structures.

## Check

Visit three different pages: the side nav is in the same place with the same items in the same order; count top-level items to confirm the side nav is used only when there are five or more.
