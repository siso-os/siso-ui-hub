---
id: P0016
title: Open detail in place
rule: Show detail next to where it was asked for (expanding row, side sheet, popover) and keep the list or chart visible, rather than sending people to a new page.
layer: page
applies_to: [row-detail, sheet, popover, table, chart]
nodes: [component/sheet, component/popover, component/table, component/card]
strength: must
status: draft
shaan: [hub-0005, hub-0001]
papers: [W03]
clusters: [C0083, C0276]
sources:
  - aah-kaiser-permanente-visual | Add interactive filters to dashboards so users instantly customize views to match evolving analysis needs. | https://institutionalrepository.aah.org/jpcrr/vol3/iss3/77
  - slack-ai-bolt-integration | Surface customer insights and CRM data alongside conversations so work progresses without context switching. | https://slack.com/
  - tableau-dashboards-best-practices | Enable highlighting between views so selections in one view highlight related data in other views. | https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm
  - odown-monitoring-dashboard | Provide drill-down capabilities to allow viewers to access detail without cluttering the main dashboard view. | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
  - figma-ai-collaborative-design | Keep AI agents and teammates in the same workspace with shared context to align on ideas and refine together. | https://www.figma.com/
corpus:
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: Click a row or chart point: detail opens without a full page navigation, the source list stays visible, and the URL changes.
updated: 2026-10-11
---

## Why

Keeping the context visible spares working memory: people compare the detail with the overview instead of remembering it across pages.

## Do / Don't

- **Do:** Open a clicked table row in a side sheet with its own URL, leaving the table and its filters in view.
- **Don't:** Navigate to a separate detail page and lose the user's place in a filtered list.

## Evidence

Backing: 5 independent organisations across 5 quoted claims (2 expert, 2 guideline, 1 study). Clusters: C0083, C0276.

- **American Association for Health Advancement** (study, [aah-kaiser-permanente-visual](https://institutionalrepository.aah.org/jpcrr/vol3/iss3/77)): Add interactive filters to dashboards so users instantly customize views to match evolving analysis needs.
- **Slack** (guideline, [slack-ai-bolt-integration](https://slack.com/)): Surface customer insights and CRM data alongside conversations so work progresses without context switching.
- **Tableau** (guideline, [tableau-dashboards-best-practices](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)): Enable highlighting between views so selections in one view highlight related data in other views.
- **Odown** (expert, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Provide drill-down capabilities to allow viewers to access detail without cluttering the main dashboard view.
- **Figma** (expert, [figma-ai-collaborative-design](https://www.figma.com/)): Keep AI agents and teammates in the same workspace with shared context to align on ideas and refine together.

## Check

Click a row or chart point: detail opens without a full page navigation, the source list stays visible, and the URL changes.
