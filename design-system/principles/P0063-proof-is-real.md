---
id: P0063
title: Proof is real: numbers, names and faces you can check
rule: Back claims with verifiable proof: real usage numbers, named customers with role and photo, logos used with permission, and sources for statistics.
layer: behaviour
applies_to: [landing, pricing, testimonial, stats]
nodes: [section/testimonials, section/stats, section/logos, section/hero]
strength: must
status: draft
shaan: [hub-0009]
papers: [W04]
clusters: [C0087, C0017, C0053]
sources:
  - goodui-leak-airbnb-runs-a-successful-leap-redesign-experiment-for-new-hosts | Display multiple testimonials rather than one to increase persuasiveness and social proof. (measured: Variation implemented) | https://goodui.org/leaks/airbnb-runs-a-successful-leap-redesign-experiment-for-new-hosts/
  - growthdesign-social-proof | Leverage word-of-mouth credibility; consumers are more likely to buy on peer recommendation. (measured: 77 percent more likely to buy on friend recommendation) | https://growth.design/case-studies/social-proof
  - decisionlab-messenger-effect | When presenting opposing viewpoints or critical information, attribute them to highly credible sources to increase acceptance likelihood by 3x. (measured: Credible source attribution increased opinion change by 300%.) | https://thedecisionlab.com/biases/messenger-effect
  - fogg-2002-stanford-web-credibility | Provide citations and links to third-party sources to prove information accuracy. | https://credibility.stanford.edu/guidelines
  - cdc-sparkline-cove | Include a data source citation to increase graphic credibility and allow deeper investigation. | https://www.cdc.gov/cove/data-visualization-types/sparkline.html
  - nngroup-handmade-designs | Credit the human artist behind handmade designs; authorship matters now more than ever as a trust signal. | https://www.nngroup.com/articles/handmade-designs/
corpus:
  - siso-ui-code/types.jsonl | section/testimonials: 905 parts (mean 2.99): editorial rates 3.49 vs minimal 2.6; entrance motion 3.47 vs none 2.81 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/stats: 459 parts (mean 3.11): clean rates 3.39 vs minimal 2.79; entrance motion 3.47 vs none 3 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/logos: 393 parts (mean 2.85): clean rates 3.17 vs minimal 2.62; loop motion 2.95 vs none 2.64 (model-rated) | 2026-10-11
check: Every testimonial has a name and organisation; every number shown has a data source in the spec.
updated: 2026-10-11
---

## Why

People copy what others like them do when unsure (social proof), and trust specific, checkable claims more than vague praise.

## Do / Don't

- **Do:** Show 1,240 teams use this with three named customer quotes and their companies.
- **Don't:** Use stock-photo testimonials, invented counts or anonymous five-star quotes.

## Evidence

Backing: 6 independent organisations across 25 quoted claims (4 study, 10 expert, 8 experiment, 3 guideline). Clusters: C0087, C0017, C0053.

- **GoodUI** (experiment, [goodui-leak-airbnb-runs-a-successful-leap-redesign-experiment-for-new-hosts](https://goodui.org/leaks/airbnb-runs-a-successful-leap-redesign-experiment-for-new-hosts/)): Display multiple testimonials rather than one to increase persuasiveness and social proof. Measured: Variation implemented.
- **growth.design** (study, [growthdesign-social-proof](https://growth.design/case-studies/social-proof)): Leverage word-of-mouth credibility; consumers are more likely to buy on peer recommendation. Measured: 77 percent more likely to buy on friend recommendation.
- **The Decision Lab** (study, [decisionlab-messenger-effect](https://thedecisionlab.com/biases/messenger-effect)): When presenting opposing viewpoints or critical information, attribute them to highly credible sources to increase acceptance likelihood by 3x. Measured: Credible source attribution increased opinion change by 300%..
- **Stanford Behavior Design Lab** (study, [fogg-2002-stanford-web-credibility](https://credibility.stanford.edu/guidelines)): Provide citations and links to third-party sources to prove information accuracy.
- **CDC** (guideline, [cdc-sparkline-cove](https://www.cdc.gov/cove/data-visualization-types/sparkline.html)): Include a data source citation to increase graphic credibility and allow deeper investigation.
- **Nielsen Norman Group** (expert, [nngroup-handmade-designs](https://www.nngroup.com/articles/handmade-designs/)): Credit the human artist behind handmade designs; authorship matters now more than ever as a trust signal.

## Check

Every testimonial has a name and organisation; every number shown has a data source in the spec.
