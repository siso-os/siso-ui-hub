---
id: P0078
title: Proof sits beside the ask
rule: Put customer logos, user counts, ratings and trust marks next to the action they support, not in a section far from any button.
layer: page
applies_to: [landing:logos, landing:testimonials, landing:cta]
nodes: [section/logos, section/testimonials, section/cta, atom/badge]
strength: should
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0087, C0145, C0283, C0884, C1630]
sources:
  - goodui-pattern-7 | Display social proof counts of recent purchases near call-to-action buttons. (measured: 18 tests, +5.1% combined effect on any primary metric (p=0.0001)) | https://goodui.org/patterns/7/
  - goodui-pattern-117 | Add customer or company logos near primary call-to-action buttons to increase credibility and conversions. | https://goodui.org/patterns/117/
  - goodui-pattern-117 | Place customer logos on homepages to increase registration starts and premium subscription conversions. | https://goodui.org/patterns/117/
  - goodui-pattern-19 | Include social proof citing large customer numbers alongside testimonial displays. | https://goodui.org/patterns/19/
  - goodui-pattern-63 | Add trust badges and security icons near payment buttons to reduce checkout anxiety and boost sales. | https://goodui.org/patterns/63/
  - checkout-card-logos | Prominently display accepted credit card logos at checkout to increase customer trust. (measured: +$2.7M incremental revenue, 5% shift from high-fee payment providers) | https://www.optimizely.com/field-notes/articles/experimentation-use-cases-retail-checkout-pages
  - goodui-pattern-11 | Add reassurance elements like selectable integrations or brand logos to build trust before signup. | https://goodui.org/patterns/11/
corpus:
  - siso-ui-code/types.jsonl | section/logos: 393 parts (mean 2.85): clean rates 3.17 vs minimal 2.62; loop motion 2.95 vs none 2.64 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/testimonials: 905 parts (mean 2.99): editorial rates 3.49 vs minimal 2.6; entrance motion 3.47 vs none 2.81 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated) | 2026-10-11
check: Each primary button on a landing or checkout page has a proof element (count, logo row, rating, trust mark) within 200 px of it.
updated: 2026-10-12
---

## Why

Doubt peaks at the moment of commitment, so reassurance works best where the click happens. P0063 says the proof must be real; this says where it goes.

## Do / Don't

- **Do:** Under the hero button: "Used by 4,200 teams" and a row of five customer logos; card logos beside Pay.
- **Don't:** Keep every logo in a band halfway down the page and leave the signup button bare.

## Evidence

Backing: 2 independent organisations across 7 quoted claims (7 experiment). Clusters: C0087, C0145, C0283, C0884, C1630.


- **GoodUI** (experiment, [goodui-pattern-7](https://goodui.org/patterns/7/)): Display social proof counts of recent purchases near call-to-action buttons. Measured: 18 tests, +5.1% combined effect on any primary metric (p=0.0001).
- **GoodUI** (experiment, [goodui-pattern-117](https://goodui.org/patterns/117/)): Add customer or company logos near primary call-to-action buttons to increase credibility and conversions.
- **GoodUI** (experiment, [goodui-pattern-117](https://goodui.org/patterns/117/)): Place customer logos on homepages to increase registration starts and premium subscription conversions.
- **GoodUI** (experiment, [goodui-pattern-19](https://goodui.org/patterns/19/)): Include social proof citing large customer numbers alongside testimonial displays.
- **GoodUI** (experiment, [goodui-pattern-63](https://goodui.org/patterns/63/)): Add trust badges and security icons near payment buttons to reduce checkout anxiety and boost sales.
- **Optimizely** (experiment, [checkout-card-logos](https://www.optimizely.com/field-notes/articles/experimentation-use-cases-retail-checkout-pages)): Prominently display accepted credit card logos at checkout to increase customer trust. Measured: +$2.7M incremental revenue, 5% shift from high-fee payment providers.
- **GoodUI** (experiment, [goodui-pattern-11](https://goodui.org/patterns/11/)): Add reassurance elements like selectable integrations or brand logos to build trust before signup.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/logos: 393 parts (mean 2.85): clean rates 3.17 vs minimal 2.62; loop motion 2.95 vs none 2.64 (model-rated)
- section/testimonials: 905 parts (mean 2.99): editorial rates 3.49 vs minimal 2.6; entrance motion 3.47 vs none 2.81 (model-rated)
- section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated)

## Check

Each primary button on a landing or checkout page has a proof element (count, logo row, rating, trust mark) within 200 px of it.
