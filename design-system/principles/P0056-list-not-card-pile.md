---
id: P0056
title: Repeated items are a list or table, not a pile of cards
rule: Show many items of the same kind as a list or table; use cards only for a few different things that each stand on their own.
layer: data
applies_to: [list, table, card]
nodes: [component/list, component/table, component/card]
strength: should
status: draft
shaan: [hub-0008, hub-0007]
papers: [W03]
clusters: []
sources:
  - patternfly-card-design-guidelines | Use cards only for entry-level information; avoid cards for dense, repetitive, related content—use tables or data lists instead. | https://www.patternfly.org/components/card/design-guidelines
  - apple-wwdc2025-359 | Use lists over grids for structured information; lists take less vertical space and scan faster. | https://developer.apple.com/videos/play/wwdc2025/359/
corpus:
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: Any repeated collection of more than about six items of one type renders as a list or table, not as cards.
updated: 2026-10-11
---

## Why

Lists and tables let the eye compare the same field down a column; a grid of cards scatters those fields and makes comparison slow.

## Do / Don't

- **Do:** Show 40 deployments as a table with status, branch and time columns, most recent on top (hub-0008).
- **Don't:** Show the same 40 deployments as a wall of identical cards.

## Evidence

Backing: 2 independent organisations across 2 quoted claims (1 guideline, 1 expert). No experiment or study among them: this rests on published guidelines and expert opinion.

- **Red Hat (PatternFly)** (guideline, [patternfly-card-design-guidelines](https://www.patternfly.org/components/card/design-guidelines)): Use cards only for entry-level information; avoid cards for dense, repetitive, related content—use tables or data lists instead.
- **Apple** (expert, [apple-wwdc2025-359](https://developer.apple.com/videos/play/wwdc2025/359/)): Use lists over grids for structured information; lists take less vertical space and scan faster.

Rests mainly on house rules hub-0007 and hub-0008; the published evidence (PatternFly, Apple) is guideline-level.

## Check

Any repeated collection of more than about six items of one type renders as a list or table, not as cards.
