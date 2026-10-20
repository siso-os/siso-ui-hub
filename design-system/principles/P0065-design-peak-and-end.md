---
id: P0065
title: Design the peak and the ending
rule: Make the best moment and the last moment of a flow clear and good: confirm success with what happened and what comes next.
layer: behaviour
applies_to: [success-state, onboarding, checkout, toast]
nodes: [page/onboarding-flow, component/toast, section/cta]
strength: should
status: draft
shaan: [hub-0013]
papers: [W04]
clusters: [C0155]
sources:
  - laws-ux-peak-end-rule | Design the most intense moments and the final moments of a user journey to create lasting positive impressions. | https://lawsofux.com/peak-end-rule/
  - decisionlab-peak-end-rule | End product interactions on a high note, ensuring the final moment leaves a strong positive emotional impression. | https://thedecisionlab.com/biases/peak-end-rule
corpus:
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated) | 2026-10-11
check: Each key flow ends on a screen or message that confirms the outcome and offers a next step.
updated: 2026-10-11
---

## Why

People remember an experience by its peak and its end more than by its average (peak-end rule).

## Do / Don't

- **Do:** End onboarding on a success screen that shows the first result and the next useful action.
- **Don't:** End a long flow on a bare redirect or a survey.

## Evidence

Backing: 2 independent organisations across 3 quoted claims (1 study, 1 guideline, 1 expert). Clusters: C0155.

- **Laws of UX (Jon Yablonski)** (study, [laws-ux-peak-end-rule](https://lawsofux.com/peak-end-rule/)): Design the most intense moments and the final moments of a user journey to create lasting positive impressions.
- **The Decision Lab** (expert, [decisionlab-peak-end-rule](https://thedecisionlab.com/biases/peak-end-rule)): End product interactions on a high note, ensuring the final moment leaves a strong positive emotional impression.

Peak-end is a well-replicated finding in psychology, but the library holds it only through two secondary sources (Laws of UX, The Decision Lab).

## Check

Each key flow ends on a screen or message that confirms the outcome and offers a next step.
