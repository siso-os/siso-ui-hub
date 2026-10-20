---
id: P0077
title: One call to action, repeated down the page
rule: A landing page asks for one action; repeat that same action after each proof section and at the bottom, and keep it reachable while scrolling on mobile.
layer: page
applies_to: [landing:cta, landing:hero, any:action]
nodes: [section/cta, section/hero, atom/button, page/home]
strength: should
status: draft
shaan: [hub-0015]
papers: []
clusters: [C0220, C0296, C0890, C1071, C1522, C1756, C2354]
sources:
  - goodui-leak-netflix-a-b-tests-and-rejects-secondary-sign-in-and-sign-up-calls-to-action | Use a single primary call to action instead of multiple competing secondary options on signup flows. (measured: Secondary sign-in and sign-up links underperformed control with single CTA) | https://goodui.org/leaks/netflix-a-b-tests-and-rejects-secondary-sign-in-and-sign-up-calls-to-action/
  - goodui-pattern-41 | Keep call-to-action buttons visible as users scroll down long pages. | https://goodui.org/patterns/41/
  - goodui-pattern-60 | Place a call to action at the bottom of long pages to catch readers before they leave. | https://goodui.org/patterns/60/
  - goodui-leak-netflix-finally-succeeds-with-these-3-tested-home-page-patterns | Repeat core message across headline, sections, and calls-to-action for consistency. | https://goodui.org/leaks/netflix-finally-succeeds-with-these-3-tested-home-page-patterns/
  - goodui-leak-zalando-tests-black-add-to-cart-buttons | Use a distinct, reserved color for primary call-to-action buttons rather than achromatic colors used elsewhere on the page. (measured: High-contrast black button was rejected; orange button retained) | https://goodui.org/leaks/zalando-tests-black-add-to-cart-buttons/
  - goodui-pattern-116 | Use higher contrast buttons instead of low-contrast links for call-to-action elements. | https://goodui.org/patterns/116/
  - facebook-ab-testing-at-scale | Increase primary call-to-action button size to nearly double for visibility in signup flows. | https://goodui.org/blog/reverse-engineering-facebook-coms-homepage-design-optimizations/
corpus:
  - siso-ui-code/types.jsonl | section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
check: Collect the labels of every primary-styled button on the page: there is one distinct label, and it appears again in the last screenful.
updated: 2026-10-12
---

## Why

Every extra ask splits attention; the one ask, met again wherever someone decides, catches them when they are ready. P0014 holds per view; this holds per page.

## Do / Don't

- **Do:** Put Start free trial in the hero, after the features, after the testimonials and in the closing band, in the one reserved action colour.
- **Don't:** Offer Book a demo, Watch video, Sign in and Start trial as equal buttons in the hero.

## Evidence

Backing: 2 independent organisations across 7 quoted claims (7 experiment). Clusters: C0220, C0296, C0890, C1071, C1522, C1756, C2354.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **GoodUI** (experiment, [goodui-leak-netflix-a-b-tests-and-rejects-secondary-sign-in-and-sign-up-calls-to-action](https://goodui.org/leaks/netflix-a-b-tests-and-rejects-secondary-sign-in-and-sign-up-calls-to-action/)): Use a single primary call to action instead of multiple competing secondary options on signup flows. Measured: Secondary sign-in and sign-up links underperformed control with single CTA.
- **GoodUI** (experiment, [goodui-pattern-41](https://goodui.org/patterns/41/)): Keep call-to-action buttons visible as users scroll down long pages.
- **GoodUI** (experiment, [goodui-pattern-60](https://goodui.org/patterns/60/)): Place a call to action at the bottom of long pages to catch readers before they leave.
- **GoodUI** (experiment, [goodui-leak-netflix-finally-succeeds-with-these-3-tested-home-page-patterns](https://goodui.org/leaks/netflix-finally-succeeds-with-these-3-tested-home-page-patterns/)): Repeat core message across headline, sections, and calls-to-action for consistency.
- **GoodUI** (experiment, [goodui-leak-zalando-tests-black-add-to-cart-buttons](https://goodui.org/leaks/zalando-tests-black-add-to-cart-buttons/)): Use a distinct, reserved color for primary call-to-action buttons rather than achromatic colors used elsewhere on the page. Measured: High-contrast black button was rejected; orange button retained.
- **GoodUI** (experiment, [goodui-pattern-116](https://goodui.org/patterns/116/)): Use higher contrast buttons instead of low-contrast links for call-to-action elements.
- **Meta** (experiment, [facebook-ab-testing-at-scale](https://goodui.org/blog/reverse-engineering-facebook-coms-homepage-design-optimizations/)): Increase primary call-to-action button size to nearly double for visibility in signup flows.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated)
- section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated)
- atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated)

## Check

Collect the labels of every primary-styled button on the page: there is one distinct label, and it appears again in the last screenful.
