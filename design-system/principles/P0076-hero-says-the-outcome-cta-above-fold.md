---
id: P0076
title: The hero says the outcome, and its one action is above the fold
rule: The hero headline names what the reader gets, in their words, and the primary action sits beside it above the fold; no full-height image pushes it down.
layer: page
applies_to: [landing:hero, any:action]
nodes: [section/hero, section/cta, atom/button, page/home]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0020, C0026, C0141, C0543, C0549, C0996, C1061, C2367]
sources:
  - shopify-conversion-optimization-baseline | Test different headline variations to improve conversion rates on homepage and landing pages. (measured: 45% increase in orders from headline A/B testing) | https://www.optimonk.com/shopify-a-b-testing-guide
  - goodui-pattern-22 | Focus headlines on user end-goals rather than generic feature descriptions. | https://goodui.org/patterns/22/
  - goodui-pattern-127 | Use specific, benefit-oriented headlines and supporting copy instead of vague statements. | https://goodui.org/patterns/127/
  - goodui-pattern-49 | Place primary call-to-action buttons above the fold to increase visibility and reduce scrolling friction. | https://goodui.org/patterns/49/
  - goodui-leak-airbnb-a-b-tests-and-discovers-that-a-higher-button-position-is-better | Position primary call-to-action buttons above the fold to increase visibility and conversion. | https://goodui.org/leaks/airbnb-a-b-tests-and-discovers-that-a-higher-button-position-is-better/
  - goodui-leak-airbnb-a-b-tests-and-rejects-full-height-photos-on-their-landing-page | Avoid full-height hero images that obscure page content and create false bottoms. (measured: Full-height header photo experiment was rejected) | https://goodui.org/leaks/airbnb-a-b-tests-and-rejects-full-height-photos-on-their-landing-page/
  - nngroup-scrolling-attention | Expect sharp attention drop below the fold; users spend 57% of time above it, 17% in second screenful. (measured: 57% above fold; 17% in second screenful; 26% spread below) | https://www.nngroup.com/articles/scrolling-and-attention/
  - apple-wwdc2025-404 | Place the benefit or reason first in instructional copy, then the required action, to maximize message impact and clarity. | https://developer.apple.com/videos/play/wwdc2025/404/
  - intuit-quickbooks-form-order | Present only the appropriate amount of information; overwhelming visitors with tabs, FAQs, or excessive detail reduces conversion performance. | https://marketingsherpa.com/article/case-study/how-intuit-grew-revenue-per
corpus:
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
check: At 1280x800 and 390x844, the H1 and the primary button are both inside the first viewport; the hero is shorter than the viewport.
updated: 2026-10-12
---

## Why

People spend most of their time on the first screen, so that is where the promise and the way in must be. A headline about the reader's goal beats one about the product; a hero photo that fills the screen hides both.

## Do / Don't

- **Do:** Write "Close your books in a day" with Start free trial beside it, on a hero that ends before the first screen does.
- **Don't:** Open with a full-height photo and the product name, with the button below the fold.

## Evidence

Backing: 5 independent organisations across 9 quoted claims (7 experiment, 1 expert, 1 study). Clusters: C0020, C0026, C0141, C0543, C0549, C0996, C1061, C2367.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **OptiMonk** (experiment, [shopify-conversion-optimization-baseline](https://www.optimonk.com/shopify-a-b-testing-guide)): Test different headline variations to improve conversion rates on homepage and landing pages. Measured: 45% increase in orders from headline A/B testing.
- **GoodUI** (experiment, [goodui-pattern-22](https://goodui.org/patterns/22/)): Focus headlines on user end-goals rather than generic feature descriptions.
- **GoodUI** (experiment, [goodui-pattern-127](https://goodui.org/patterns/127/)): Use specific, benefit-oriented headlines and supporting copy instead of vague statements.
- **GoodUI** (experiment, [goodui-pattern-49](https://goodui.org/patterns/49/)): Place primary call-to-action buttons above the fold to increase visibility and reduce scrolling friction.
- **GoodUI** (experiment, [goodui-leak-airbnb-a-b-tests-and-discovers-that-a-higher-button-position-is-better](https://goodui.org/leaks/airbnb-a-b-tests-and-discovers-that-a-higher-button-position-is-better/)): Position primary call-to-action buttons above the fold to increase visibility and conversion.
- **GoodUI** (experiment, [goodui-leak-airbnb-a-b-tests-and-rejects-full-height-photos-on-their-landing-page](https://goodui.org/leaks/airbnb-a-b-tests-and-rejects-full-height-photos-on-their-landing-page/)): Avoid full-height hero images that obscure page content and create false bottoms. Measured: Full-height header photo experiment was rejected.
- **Nielsen Norman Group** (study, [nngroup-scrolling-attention](https://www.nngroup.com/articles/scrolling-and-attention/)): Expect sharp attention drop below the fold; users spend 57% of time above it, 17% in second screenful. Measured: 57% above fold; 17% in second screenful; 26% spread below.
- **Apple** (expert, [apple-wwdc2025-404](https://developer.apple.com/videos/play/wwdc2025/404/)): Place the benefit or reason first in instructional copy, then the required action, to maximize message impact and clarity.
- **Intuit** (experiment, [intuit-quickbooks-form-order](https://marketingsherpa.com/article/case-study/how-intuit-grew-revenue-per)): Present only the appropriate amount of information; overwhelming visitors with tabs, FAQs, or excessive detail reduces conversion performance.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated)
- section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated)
- atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated)

## Check

At 1280x800 and 390x844, the H1 and the primary button are both inside the first viewport; the hero is shorter than the viewport.
