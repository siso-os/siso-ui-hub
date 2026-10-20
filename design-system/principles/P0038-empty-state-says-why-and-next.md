---
id: P0038
title: An empty state says why it is empty and offers the next step
rule: When there is nothing to show, say why in a short title (five words or fewer), explain in one sentence, and offer one primary action that fills it.
layer: state
applies_to: [empty-state, table, list, widget, search-results]
nodes: [component/empty, component/table, component/list]
strength: should
status: draft
shaan: [hub-0004, hub-0006]
papers: [W03]
clusters: []
sources:
  - gitlab-pajamas-empty-states | Limit empty state titles to five words to maintain clarity and focus. | https://design.gitlab.com/regions/empty-states
  - ibm-carbon-empty-states-pattern | Minimize content in empty states; more content carries a cognitive cost. | https://carbondesignsystem.com/patterns/empty-states-pattern/
  - salesforce-lightning-empty-state | Make call-to-action text specific and answer what users should do next. | http://v1.lightningdesignsystem.com/guidelines/empty-state/
  - patternfly-empty-state-design-guidelines | Empower users by stating what they can do, not what the product enables them to do. | https://www.patternfly.org/components/empty-state/design-guidelines
  - elastic-eui-empty-prompt | Stack primary actions first, then secondary actions as empty buttons in the actions array. | https://eui.elastic.co/docs/components/display/empty-prompt/
  - nngroup-empty-states | Display a system-status message when no content exists to clarify whether loading is occurring, an error happened, or results are genuinely absent. | https://nngroup.com/articles/empty-state-interface-design
corpus:
  - siso-ui-code/types.jsonl | component/empty: 425 parts (mean 2.51): clean rates 3.07 vs minimal 2.11; micro motion 3.65 vs none 2.35 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: Load each list and widget with zero records: a title, one sentence and at most one primary action appear; for search, the query text is shown.
updated: 2026-10-11
---

## Why

A blank area looks broken. Saying why and what to do next turns a dead end into the first step of the task.

## Do / Don't

- **Do:** Write No invoices yet with a Create invoice button, and for a search with no results show the query and a way to clear filters.
- **Don't:** Show an empty table with only column headers, or a full-page illustration with no action.

## Evidence

Backing: 7 independent organisations across 13 quoted claims (9 guideline, 4 expert). No experiment or study among them: this rests on published guidelines and expert opinion.

- **GitLab** (guideline, [gitlab-pajamas-empty-states](https://design.gitlab.com/regions/empty-states)): Limit empty state titles to five words to maintain clarity and focus.
- **IBM** (guideline, [ibm-carbon-empty-states-pattern](https://carbondesignsystem.com/patterns/empty-states-pattern/)): Minimize content in empty states; more content carries a cognitive cost.
- **Salesforce** (guideline, [salesforce-lightning-empty-state](http://v1.lightningdesignsystem.com/guidelines/empty-state/)): Make call-to-action text specific and answer what users should do next.
- **Red Hat (PatternFly)** (guideline, [patternfly-empty-state-design-guidelines](https://www.patternfly.org/components/empty-state/design-guidelines)): Empower users by stating what they can do, not what the product enables them to do.
- **Elastic** (guideline, [elastic-eui-empty-prompt](https://eui.elastic.co/docs/components/display/empty-prompt/)): Stack primary actions first, then secondary actions as empty buttons in the actions array.
- **Nielsen Norman Group** (expert, [nngroup-empty-states](https://nngroup.com/articles/empty-state-interface-design)): Display a system-status message when no content exists to clarify whether loading is occurring, an error happened, or results are genuinely absent.

## Check

Load each list and widget with zero records: a title, one sentence and at most one primary action appear; for search, the query text is shown.
