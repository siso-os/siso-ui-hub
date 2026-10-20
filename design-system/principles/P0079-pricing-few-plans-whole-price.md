---
id: P0079
title: Pricing: a few plans side by side, each with its whole price
rule: Show two to four plans side by side, each with its full price and what it includes; never hide fees until checkout.
layer: page
applies_to: [landing:pricing]
nodes: [section/pricing, page/pricing-page]
strength: should
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0025, C0054, C1443, C2352, C2374]
sources:
  - goodui-leak-netflix-a-b-tests-a-single-plan-recommendation-and-it-becomes-rejected | Show multiple pricing options side-by-side rather than recommending a single plan selection. (measured: Three-plan control outperformed single-plan recommendation variant in A/B test) | https://goodui.org/leaks/netflix-a-b-tests-a-single-plan-recommendation-and-it-becomes-rejected/
  - deceptive-design-hidden-costs | Show all fees and total price before the user commits time or effort; reveal costs upfront, not at checkout. (measured: Users shown fees upfront spent 21% less and were 14.1% less likely to complete purchase) | https://www.deceptive.design/types/hidden-costs
  - goodui-pattern-128 | Add reassuring copy near prices clarifying what is and is not included in the displayed amount. | https://goodui.org/patterns/128/
  - goodui-pattern-114 | Make prices more visible through larger font size and higher contrast color. | https://goodui.org/patterns/114/
  - atticus-how-decoy-effect-pricing-changes-choice- | Anchor pricing page by showing premium plan first to increase revenue per visitor. (measured: showing premium plan first: 18% revenue increase per visitor; support tickets dropped 12%) | https://www.atticusli.com/blog/posts/how-decoy-effect-pricing-changes-choice-on-pricing-pages/
  - goodui-pattern-17 | Display pricing plans ordered by most expensive first to influence plan selection. | https://goodui.org/patterns/17/
corpus:
  - siso-ui-code/types.jsonl | section/pricing: 948 parts (mean 3.06): gradient rates 3.57 vs minimal 2.74; interactive motion 3.73 vs none 2.82 (model-rated) | 2026-10-11
check: The pricing section shows 2 to 4 plans; every plan has a price with its billing period; the checkout total equals the plan price plus only fees named on the pricing page.
updated: 2026-10-12
---

## Why

People choose by comparing, so a single recommended plan gives them nothing to compare against. A price that grows at checkout destroys trust, and the dark-pattern line (P0064) forbids it.

## Do / Don't

- **Do:** Show three plans with the monthly price large, "billed yearly, VAT included" under it, and five included features each.
- **Don't:** Show one "recommended" plan and add a setup fee on the payment step.

## Evidence

Backing: 3 independent organisations across 6 quoted claims (6 experiment). Clusters: C0025, C0054, C1443, C2352, C2374.


- **GoodUI** (experiment, [goodui-leak-netflix-a-b-tests-a-single-plan-recommendation-and-it-becomes-rejected](https://goodui.org/leaks/netflix-a-b-tests-a-single-plan-recommendation-and-it-becomes-rejected/)): Show multiple pricing options side-by-side rather than recommending a single plan selection. Measured: Three-plan control outperformed single-plan recommendation variant in A/B test.
- **deceptive.design** (experiment, [deceptive-design-hidden-costs](https://www.deceptive.design/types/hidden-costs)): Show all fees and total price before the user commits time or effort; reveal costs upfront, not at checkout. Measured: Users shown fees upfront spent 21% less and were 14.1% less likely to complete purchase.
- **GoodUI** (experiment, [goodui-pattern-128](https://goodui.org/patterns/128/)): Add reassuring copy near prices clarifying what is and is not included in the displayed amount.
- **GoodUI** (experiment, [goodui-pattern-114](https://goodui.org/patterns/114/)): Make prices more visible through larger font size and higher contrast color.
- **Atticus** (experiment, [atticus-how-decoy-effect-pricing-changes-choice-](https://www.atticusli.com/blog/posts/how-decoy-effect-pricing-changes-choice-on-pricing-pages/)): Anchor pricing page by showing premium plan first to increase revenue per visitor. Measured: showing premium plan first: 18% revenue increase per visitor; support tickets dropped 12%.
- **GoodUI** (experiment, [goodui-pattern-17](https://goodui.org/patterns/17/)): Display pricing plans ordered by most expensive first to influence plan selection.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/pricing: 948 parts (mean 3.06): gradient rates 3.57 vs minimal 2.74; interactive motion 3.73 vs none 2.82 (model-rated)

## Check

The pricing section shows 2 to 4 plans; every plan has a price with its billing period; the checkout total equals the plan price plus only fees named on the pricing page.
