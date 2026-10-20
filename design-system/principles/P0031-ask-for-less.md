---
id: P0031
title: Ask for less: every field earns its place
rule: Remove every field you can, prefill what you already know, and defer optional questions until after the main task.
layer: behaviour
applies_to: [form, signup, checkout, filter]
nodes: [component/form, section/onboarding, component/field]
strength: must
status: draft
shaan: [hub-0012]
papers: [W04]
clusters: [C0001, C0014]
sources:
  - checkout-simplified-flow | Reduce checkout steps and form fields to only essential information. (measured: +5.9% conversion rate lift) | https://cleancommit.io/ab-tests/simplified-checkout-process-3
  - goodui-pattern-9 | Break multi-field forms into separate sequential steps rather than showing all fields at once. (measured: 14 tests meta-analyzed, positive effects on progression, leads, signups, sales, and revenue) | https://goodui.org/patterns/9/
  - apple-tech-talks-803 | Minimize clicks in subscription flows; three clicks achieves 61% conversion, nine clicks drops to 7%. (measured: 3 clicks = 61% conversion, 4 clicks = 48%, 9 clicks = 7%) | https://developer.apple.com/videos/play/tech-talks/803/
  - growthdesign-nps-surveys | Limit survey response options; 11-point scales (0–10) add complexity without improving accuracy compared to simpler scales. (measured: Research shows 11-point scales do not improve accuracy over simpler options) | https://growth.design/case-studies/nps-surveys
  - form-design-usability-nn-group | Remove unnecessary form fields to increase completion rates and submission accuracy. (measured: Forms following usability guidelines: 78% one-try submissions; violating: 42%) | https://www.nngroup.com/articles/web-form-design/
  - govuk-intro-designing-services | Minimize user actions; reduce steps and data entry to reach goals as seamlessly as possible. | https://www.gov.uk/service-manual/design/introduction-designing-government-services
corpus:
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/onboarding: 515 parts (mean 2.87): clean rates 3.26 vs dark 2.62; entrance motion 3.42 vs none 2.52 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/field: 13,676 parts (mean 2.3): 3d rates 3.56 vs light 2.08; entrance motion 3.24 vs none 2.04 (model-rated) | 2026-10-11
check: Every required field in the form maps to a named downstream use in the spec; known values (name, email, country) are prefilled.
updated: 2026-10-11
---

## Why

Each field adds reading, deciding and typing; completion falls as effort rises, and controlled tests measure the drop.

## Do / Don't

- **Do:** Ask for email and password at signup and collect company size later, inside the product.
- **Don't:** Ask for phone, address and job title before the user has seen any value.

## Evidence

Backing: 9 independent organisations across 35 quoted claims (16 experiment, 11 guideline, 6 study, 2 expert). Clusters: C0001, C0014.

- **Clean Commit** (experiment, [checkout-simplified-flow](https://cleancommit.io/ab-tests/simplified-checkout-process-3)): Reduce checkout steps and form fields to only essential information. Measured: +5.9% conversion rate lift.
- **GoodUI** (experiment, [goodui-pattern-9](https://goodui.org/patterns/9/)): Break multi-field forms into separate sequential steps rather than showing all fields at once. Measured: 14 tests meta-analyzed, positive effects on progression, leads, signups, sales, and revenue.
- **Apple** (experiment, [apple-tech-talks-803](https://developer.apple.com/videos/play/tech-talks/803/)): Minimize clicks in subscription flows; three clicks achieves 61% conversion, nine clicks drops to 7%. Measured: 3 clicks = 61% conversion, 4 clicks = 48%, 9 clicks = 7%.
- **growth.design** (study, [growthdesign-nps-surveys](https://growth.design/case-studies/nps-surveys)): Limit survey response options; 11-point scales (0–10) add complexity without improving accuracy compared to simpler scales. Measured: Research shows 11-point scales do not improve accuracy over simpler options.
- **Nielsen Norman Group** (study, [form-design-usability-nn-group](https://www.nngroup.com/articles/web-form-design/)): Remove unnecessary form fields to increase completion rates and submission accuracy. Measured: Forms following usability guidelines: 78% one-try submissions; violating: 42%.
- **GOV.UK** (guideline, [govuk-intro-designing-services](https://www.gov.uk/service-manual/design/introduction-designing-government-services)): Minimize user actions; reduce steps and data entry to reach goals as seamlessly as possible.

## Check

Every required field in the form maps to a named downstream use in the spec; known values (name, email, country) are prefilled.
