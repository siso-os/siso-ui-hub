---
id: P0086
title: Features lead with the outcome, then the feature
rule: Title each feature by what it does for the reader, with the feature name second, and make the headline, copy, image and button tell the same benefit.
layer: content
applies_to: [landing:features, landing:hero]
nodes: [section/features, section/hero, section/showcase]
strength: should
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0026, C0158, C0997, C1128, C1593, C1720]
sources:
  - growthdesign-trial-paywall-challenge | Address users' primary pain point, not product features; address forgotten subscriptions in trial paywalls to increase signups by 23%. (measured: 23% increase in trial signups) | https://growth.design/case-studies/trial-paywall-challenge
  - goodui-pattern-43 | Extend product titles with descriptive, benefit-focused copy beyond the product name. | https://goodui.org/patterns/43/
  - goodui-pattern-127 | Reinforce key benefits consistently across multiple elements: headline, copy, imagery, and button text. | https://goodui.org/patterns/127/
  - apple-wwdc2025-404 | Place the benefit or reason first in instructional copy, then the required action, to maximize message impact and clarity. | https://developer.apple.com/videos/play/wwdc2025/404/
  - apple-wwdc2017-816 | Lead with content first to demonstrate app value; show features and benefits before asking for commitments or permissions. | https://developer.apple.com/videos/play/wwdc2017/816/
  - growthdesign-5-product-onboarding-mistakes-to-avoid | Remind users of the core benefit they sought during first use. | https://growth.design/case-studies/5-product-onboarding-mistakes-to-avoid
corpus:
  - siso-ui-code/types.jsonl | section/features: 2,162 parts (mean 2.99): editorial rates 3.55 vs minimal 2.43; scroll motion 3.65 vs entrance 2.48 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/showcase: 1,438 parts (mean 3.08): gradient rates 3.88 vs retro-hud 2.7; interactive motion 3.41 vs none 2.8 (model-rated) | 2026-10-11
check: Each feature title states a result for the user (a verb or outcome) before or instead of the feature name.
updated: 2026-10-12
---

## Why

Readers scan for their own problem, not for the product's nouns. Matching every element to one benefit makes the page say one thing.

## Do / Don't

- **Do:** Title it "Never miss a renewal: Smart reminders" and show the reminder.
- **Don't:** Title a grid "AI Engine", "Workflows", "Integrations" with stock icons.

## Evidence

Backing: 3 independent organisations across 6 quoted claims (3 experiment, 3 expert). Clusters: C0026, C0158, C0997, C1128, C1593, C1720.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **growth.design** (experiment, [growthdesign-trial-paywall-challenge](https://growth.design/case-studies/trial-paywall-challenge)): Address users' primary pain point, not product features; address forgotten subscriptions in trial paywalls to increase signups by 23%. Measured: 23% increase in trial signups.
- **GoodUI** (experiment, [goodui-pattern-43](https://goodui.org/patterns/43/)): Extend product titles with descriptive, benefit-focused copy beyond the product name.
- **GoodUI** (experiment, [goodui-pattern-127](https://goodui.org/patterns/127/)): Reinforce key benefits consistently across multiple elements: headline, copy, imagery, and button text.
- **Apple** (expert, [apple-wwdc2025-404](https://developer.apple.com/videos/play/wwdc2025/404/)): Place the benefit or reason first in instructional copy, then the required action, to maximize message impact and clarity.
- **Apple** (expert, [apple-wwdc2017-816](https://developer.apple.com/videos/play/wwdc2017/816/)): Lead with content first to demonstrate app value; show features and benefits before asking for commitments or permissions.
- **growth.design** (expert, [growthdesign-5-product-onboarding-mistakes-to-avoid](https://growth.design/case-studies/5-product-onboarding-mistakes-to-avoid)): Remind users of the core benefit they sought during first use.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/features: 2,162 parts (mean 2.99): editorial rates 3.55 vs minimal 2.43; scroll motion 3.65 vs entrance 2.48 (model-rated)
- section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated)
- section/showcase: 1,438 parts (mean 3.08): gradient rates 3.88 vs retro-hud 2.7; interactive motion 3.41 vs none 2.8 (model-rated)

## Check

Each feature title states a result for the user (a verb or outcome) before or instead of the feature name.
