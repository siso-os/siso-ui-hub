---
id: P0085
title: How it works shows the few steps, and what happens after the click
rule: Explain the product as three or four numbered steps from signup to first result, and after any form, say what happens next.
layer: page
applies_to: [landing:how-it-works]
nodes: [section/how, section/onboarding]
strength: should
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0052, C0233, C1652, C1767]
sources:
  - goodui-pattern-52 | Include "How It Works" explanatory sections on product and landing pages to build confidence and clarify value propositions. | https://goodui.org/patterns/52/
  - goodui-pattern-71 | Surface the next step of a process after form submission, especially for returning visitors. | https://goodui.org/patterns/71/
  - growthdesign-beehiiv-newsletter-subscription-ux | Reorder workflow steps to place valued interactions earlier, increasing overall satisfaction. | https://growth.design/case-studies/beehiiv-newsletter-subscription-ux
  - checkout-simplified-flow | Make checkout progression intuitive with clearer step indicators and progress cues. (measured: +5.2% revenue per visitor) | https://cleancommit.io/ab-tests/simplified-checkout-process-3
corpus:
  - siso-ui-code/types.jsonl | section/onboarding: 515 parts (mean 2.87): clean rates 3.26 vs dark 2.62; entrance motion 3.42 vs none 2.52 (model-rated) | 2026-10-11
check: The how-it-works section has 3 to 4 numbered steps; every form's success state names the next step.
updated: 2026-10-12
---

## Why

Uncertainty about what comes next is a reason to wait. A short, numbered path makes the commitment look small and known.

## Do / Don't

- **Do:** Write "1. Connect your bank. 2. We sort the transactions. 3. You approve the return." After the form: "Check your inbox; the link expires in 30 minutes."
- **Don't:** Write a paragraph about the platform's architecture, or end a form on a blank "Thanks".

## Evidence

Backing: 3 independent organisations across 4 quoted claims (3 experiment, 1 guideline). Clusters: C0052, C0233, C1652, C1767.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **GoodUI** (experiment, [goodui-pattern-52](https://goodui.org/patterns/52/)): Include "How It Works" explanatory sections on product and landing pages to build confidence and clarify value propositions.
- **GoodUI** (experiment, [goodui-pattern-71](https://goodui.org/patterns/71/)): Surface the next step of a process after form submission, especially for returning visitors.
- **growth.design** (guideline, [growthdesign-beehiiv-newsletter-subscription-ux](https://growth.design/case-studies/beehiiv-newsletter-subscription-ux)): Reorder workflow steps to place valued interactions earlier, increasing overall satisfaction.
- **Clean Commit** (experiment, [checkout-simplified-flow](https://cleancommit.io/ab-tests/simplified-checkout-process-3)): Make checkout progression intuitive with clearer step indicators and progress cues. Measured: +5.2% revenue per visitor.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/onboarding: 515 parts (mean 2.87): clean rates 3.26 vs dark 2.62; entrance motion 3.42 vs none 2.52 (model-rated)

## Check

The how-it-works section has 3 to 4 numbered steps; every form's success state names the next step.
