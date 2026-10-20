---
id: P0081
title: The FAQ answers the last objections, near the action
rule: Near the bottom of the page and beside long forms, answer the five to eight questions that stop people signing up, in their words, with short answers.
layer: page
applies_to: [landing:faq]
nodes: [section/faq, page/pricing-page]
strength: should
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0020, C0025, C0208, C1069, C1224]
sources:
  - goodui-pattern-108 | Add a frequently asked questions section near the bottom of lead gen forms and product pages. | https://goodui.org/patterns/108/
  - goodui-leak-etsy-a-b-tests-3-footer-variations-with-their-story-and-customer-support-links | Condense footer content into concise, expandable questions rather than lengthy paragraphs. | https://goodui.org/leaks/etsy-a-b-tests-3-footer-variations-with-their-story-and-customer-support-links/
  - goodui-leak-amazon-a-b-tests-and-rolls-out-product-reassurances | Place reassurances about security, returns, and delivery below price with expandable tooltips for common purchase objections. (measured: Variation implemented; +0.5 repeatability for Benefit Bar pattern) | https://goodui.org/leaks/amazon-a-b-tests-and-rolls-out-product-reassurances/
  - intuit-quickbooks-form-order | Present only the appropriate amount of information; overwhelming visitors with tabs, FAQs, or excessive detail reduces conversion performance. | https://marketingsherpa.com/article/case-study/how-intuit-grew-revenue-per
  - goodui-pattern-128 | Add reassuring copy near prices clarifying what is and is not included in the displayed amount. | https://goodui.org/patterns/128/
corpus:
  - siso-ui-code/types.jsonl | section/faq: 946 parts (mean 2.72): editorial rates 3.2 vs minimal 2.45; interactive motion 3.43 vs none 2.48 (model-rated) | 2026-10-11
check: The FAQ has 3 to 10 questions, each answer under about 60 words, and a primary action follows it.
updated: 2026-10-12
---

## Why

Late in a page, the reader has one or two doubts left; answering them there keeps them from leaving to find out. Too many questions turn into the overload the page was avoiding.

## Do / Don't

- **Do:** Answer "Can I cancel any time?" in one sentence, above the closing call to action.
- **Don't:** Put forty questions in tabs, written as the company would phrase them.

## Evidence

Backing: 2 independent organisations across 5 quoted claims (5 experiment). Clusters: C0020, C0025, C0208, C1069, C1224.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **GoodUI** (experiment, [goodui-pattern-108](https://goodui.org/patterns/108/)): Add a frequently asked questions section near the bottom of lead gen forms and product pages.
- **GoodUI** (experiment, [goodui-leak-etsy-a-b-tests-3-footer-variations-with-their-story-and-customer-support-links](https://goodui.org/leaks/etsy-a-b-tests-3-footer-variations-with-their-story-and-customer-support-links/)): Condense footer content into concise, expandable questions rather than lengthy paragraphs.
- **GoodUI** (experiment, [goodui-leak-amazon-a-b-tests-and-rolls-out-product-reassurances](https://goodui.org/leaks/amazon-a-b-tests-and-rolls-out-product-reassurances/)): Place reassurances about security, returns, and delivery below price with expandable tooltips for common purchase objections. Measured: Variation implemented; +0.5 repeatability for Benefit Bar pattern.
- **Intuit** (experiment, [intuit-quickbooks-form-order](https://marketingsherpa.com/article/case-study/how-intuit-grew-revenue-per)): Present only the appropriate amount of information; overwhelming visitors with tabs, FAQs, or excessive detail reduces conversion performance.
- **GoodUI** (experiment, [goodui-pattern-128](https://goodui.org/patterns/128/)): Add reassuring copy near prices clarifying what is and is not included in the displayed amount.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/faq: 946 parts (mean 2.72): editorial rates 3.2 vs minimal 2.45; interactive motion 3.43 vs none 2.48 (model-rated)

## Check

The FAQ has 3 to 10 questions, each answer under about 60 words, and a primary action follows it.
