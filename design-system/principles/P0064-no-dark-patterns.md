---
id: P0064
title: No dark patterns: decline is as easy as accept, prices are whole, urgency is true
rule: Make declining as easy and as visible as accepting, show the full price before commitment, use only true urgency and scarcity, never shame a choice, and make leaving as easy as joining.
layer: behaviour
applies_to: [dialog, pricing, checkout, consent, cancel-flow]
nodes: [component/dialog, component/form, page/pricing-page, section/pricing]
strength: must
status: draft
shaan: [hub-0009]
papers: [W04]
clusters: [C0164, C0139, C0091, C0025, C0054, C0143, C0204]
sources:
  - deceptive-design-hidden-costs | Show all fees and total price before the user commits time or effort; reveal costs upfront, not at checkout. (measured: Users shown fees upfront spent 21% less and were 14.1% less likely to complete purchase) | https://www.deceptive.design/types/hidden-costs
  - goodui-pattern-128 | Add reassuring copy near prices clarifying what is and is not included in the displayed amount. | https://goodui.org/patterns/128/
  - nngroup-explicit-differences | Explicitly state all key differences and costs on the page where users make the decision; don't force them to navigate elsewhere. | https://www.nngroup.com/articles/explicit-differences/
  - fogg-2002-stanford-web-credibility | Limit ads and distinguish sponsored content clearly; avoid pop-ups. | https://credibility.stanford.edu/guidelines
  - growthdesign-godaddy-checkout-ux | Avoid pre-selected options and fear-based language in upsells; they erode trust long-term. | https://growth.design/case-studies/godaddy-checkout-ux
  - apple-wwdc2020-10162 | Use clear writing at critical decision points to explain what data your app requests and what value it provides to users. | https://developer.apple.com/videos/play/wwdc2020/10162/
corpus:
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/pricing: 948 parts (mean 3.06): gradient rates 3.57 vs minimal 2.74; interactive motion 3.73 vs none 2.82 (model-rated) | 2026-10-11
check: In each consent, upsell and cancel flow: decline has the same prominence as accept, the price shown first equals the price charged, no countdown is fake, and cancel takes no more steps than signup.
updated: 2026-10-11
---

## Why

Dark patterns win a click and lose the customer: once people notice the trick, trust falls across the whole product, and several are now illegal.

## Do / Don't

- **Do:** Give Accept and Decline equal-weight buttons and show tax and fees in the first price.
- **Don't:** Write No thanks, I hate saving money, add a fake countdown, or bury cancel behind a phone call.

## Evidence

Backing: 8 independent organisations across 25 quoted claims (8 guideline, 9 expert, 6 experiment, 2 study). Clusters: C0164, C0139, C0091, C0025, C0054, C0143, C0204.

- **deceptive.design** (experiment, [deceptive-design-hidden-costs](https://www.deceptive.design/types/hidden-costs)): Show all fees and total price before the user commits time or effort; reveal costs upfront, not at checkout. Measured: Users shown fees upfront spent 21% less and were 14.1% less likely to complete purchase.
- **GoodUI** (experiment, [goodui-pattern-128](https://goodui.org/patterns/128/)): Add reassuring copy near prices clarifying what is and is not included in the displayed amount.
- **Nielsen Norman Group** (study, [nngroup-explicit-differences](https://www.nngroup.com/articles/explicit-differences/)): Explicitly state all key differences and costs on the page where users make the decision; don't force them to navigate elsewhere.
- **Stanford Behavior Design Lab** (study, [fogg-2002-stanford-web-credibility](https://credibility.stanford.edu/guidelines)): Limit ads and distinguish sponsored content clearly; avoid pop-ups.
- **growth.design** (guideline, [growthdesign-godaddy-checkout-ux](https://growth.design/case-studies/godaddy-checkout-ux)): Avoid pre-selected options and fear-based language in upsells; they erode trust long-term.
- **Apple** (guideline, [apple-wwdc2020-10162](https://developer.apple.com/videos/play/wwdc2020/10162/)): Use clear writing at critical decision points to explain what data your app requests and what value it provides to users.

## Check

In each consent, upsell and cancel flow: decline has the same prominence as accept, the price shown first equals the price charged, no countdown is fake, and cancel takes no more steps than signup.
