---
id: P0061
title: Fewer choices, faster decisions
rule: Show only the choices that matter at each step, mark the recommended one, and hide the rest behind More.
layer: behaviour
applies_to: [menu, pricing, settings, nav]
nodes: [component/menu, component/tabs, section/nav]
strength: must
status: draft
shaan: [hub-0012]
papers: [W04]
clusters: [C0042, C0131, C0066]
sources:
  - decisionlab-choice-overload-bias | Limit choice sets to 22 or fewer options to maintain purchase intent and reduce decision paralysis. (measured: More than 22 options: 3% jam booth purchase rate vs. 30% with 6 options; shoppers abandonment increases significantly) | https://thedecisionlab.com/biases/choice-overload-bias
  - growthdesign-youtube-user-retention | Use a decoy option (slightly less attractive but relevant alternative) to make the primary choice easier by contrast. | https://growth.design/case-studies/youtube-user-retention
  - laws-ux-choice-overload | Limit visible options to avoid overwhelming users and degrading decision quality. | https://lawsofux.com/choice-overload/
  - google-users-simple-familiar | Avoid designs contradicting user expectations, as they damage first impressions and product satisfaction. | https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/
corpus:
  - siso-ui-code/types.jsonl | component/menu: 2,614 parts (mean 2.53): glass rates 3.24 vs minimal 2.3; interactive motion 3.36 vs none 2.2 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated) | 2026-10-11
check: Each decision point shows no more than about five primary options at once, with one marked as recommended where one exists.
updated: 2026-10-11
---

## Why

Decision time grows with the number of options (Hick's law), and too many options can stop people choosing at all.

## Do / Don't

- **Do:** Offer three plans with one marked Recommended.
- **Don't:** Show twelve equal options with no guidance.

## Evidence

Backing: 4 independent organisations across 12 quoted claims (4 guideline, 5 expert, 1 experiment, 2 study). Clusters: C0042, C0131, C0066.

- **The Decision Lab** (experiment, [decisionlab-choice-overload-bias](https://thedecisionlab.com/biases/choice-overload-bias)): Limit choice sets to 22 or fewer options to maintain purchase intent and reduce decision paralysis. Measured: More than 22 options: 3% jam booth purchase rate vs. 30% with 6 options; shoppers abandonment increases significantly.
- **growth.design** (study, [growthdesign-youtube-user-retention](https://growth.design/case-studies/youtube-user-retention)): Use a decoy option (slightly less attractive but relevant alternative) to make the primary choice easier by contrast.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-choice-overload](https://lawsofux.com/choice-overload/)): Limit visible options to avoid overwhelming users and degrading decision quality.
- **Google** (expert, [google-users-simple-familiar](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)): Avoid designs contradicting user expectations, as they damage first impressions and product satisfaction.

The 22-option figure in the evidence is the classic jam-study set size, not a recommended maximum; we set no hard number beyond "about five primary options", which is our judgement.

## Check

Each decision point shows no more than about five primary options at once, with one marked as recommended where one exists.
