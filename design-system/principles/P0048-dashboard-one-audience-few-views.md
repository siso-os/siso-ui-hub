---
id: P0048
title: A dashboard has one audience, one purpose and few views
rule: Build each dashboard for one named audience and question, with two or three main views; split it when it grows beyond that.
layer: data
applies_to: [dashboard, widget]
nodes: [page/dashboard, component/widget]
strength: must
status: draft
shaan: [hub-0002, hub-0003]
papers: [W03]
clusters: [C0060, C0271]
sources:
  - linear-dashboards-best-practices | Create fewer dashboards with clear purposes and owners; adoption drops when too many dashboards are created. (measured: adoption drops quickly beyond two dashboards; most dashboards go stale when created in high numbers) | https://linear.app/blog/dashboards-best-practices
  - bach-et-al-dashboard-design-patterns | Design dashboards for a specific audience and context; align design with user needs, not all possible data. | https://ar5iv.labs.arxiv.org/html/2205.00757
  - tableau-dashboards-best-practices | Limit dashboards to two or three views to maintain visual clarity; create additional dashboards if scope grows beyond this. | https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm
  - odown-monitoring-dashboard | Design executive dashboards to emphasize business metrics and trends rather than technical details. | https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams
check: The dashboard spec names one audience and one question; the work band has three or fewer primary views.
updated: 2026-10-11
---

## Why

A dashboard is read at a glance; every extra chart dilutes attention, and dashboards built for everyone end up used by no one.

## Do / Don't

- **Do:** Write the audience and the question at the top of the spec (Ops lead: is anything on fire right now?) and pick views that answer it.
- **Don't:** Put every available metric on one page because the data exists.

## Evidence

Backing: 4 independent organisations across 6 quoted claims (2 study, 3 expert, 1 guideline). Clusters: C0060, C0271.

- **Linear** (study, [linear-dashboards-best-practices](https://linear.app/blog/dashboards-best-practices)): Create fewer dashboards with clear purposes and owners; adoption drops when too many dashboards are created. Measured: adoption drops quickly beyond two dashboards; most dashboards go stale when created in high numbers.
- **Benjamin Bach et al.** (study, [bach-et-al-dashboard-design-patterns](https://ar5iv.labs.arxiv.org/html/2205.00757)): Design dashboards for a specific audience and context; align design with user needs, not all possible data.
- **Tableau** (guideline, [tableau-dashboards-best-practices](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)): Limit dashboards to two or three views to maintain visual clarity; create additional dashboards if scope grows beyond this.
- **Odown** (expert, [odown-monitoring-dashboard](https://odown.com/blog/monitoring-dashboard-design-effective-visualizations-operations-teams)): Design executive dashboards to emphasize business metrics and trends rather than technical details.

## Check

The dashboard spec names one audience and one question; the work band has three or fewer primary views.
