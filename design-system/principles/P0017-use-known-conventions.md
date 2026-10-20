---
id: P0017
title: Use the conventions people already know
rule: Use the platform's and the industry's standard patterns, words and positions unless a tested alternative is clearly better.
layer: page
applies_to: [page, form, nav, icon]
nodes: [page/dashboard, component/form, section/nav]
strength: must
status: draft
shaan: [hub-0011]
papers: [W01]
clusters: [C0021, C0035, C0048, C0023]
sources:
  - goodui-leak-amazon-a-b-tests-and-rolls-out-extra-product-information-on-book-pages | Show structured product information with labels and icons in a horizontal format. | https://goodui.org/leaks/amazon-a-b-tests-and-rolls-out-extra-product-information-on-book-pages/
  - growthdesign-balance-psychology | Use familiar layouts and patterns to capture attention and prepare the brain for familiar cognitive states. | https://growth.design/case-studies/balance-psychology
  - laws-of-ux | Maintain consistency with familiar patterns users encounter on other established sites. | https://lawsofux.com/
  - jakob-nielsen-10-usability-heuristics | Follow platform and industry conventions to meet user expectations. | https://www.nngroup.com/articles/ten-usability-heuristics/
  - wcag-consistent-navigation | Repeat navigation in the same relative order across all pages. | https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation
  - apple-wwdc2022-10001 | Use familiar navigation patterns so users focus on content rather than learning how to navigate. | https://developer.apple.com/videos/play/wwdc2022/10001/
corpus:
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated) | 2026-10-11
check: Each component on the page maps to a bank or design-system component; any custom pattern has a written reason in the spec.
updated: 2026-10-11
---

## Why

People spend most of their time in other products and bring those habits with them; a familiar pattern costs nothing to learn.

## Do / Don't

- **Do:** Use a standard table, date picker and settings layout taken from the component bank (hub-0011).
- **Don't:** Invent a custom scroll gesture or rename Settings to something clever.

## Evidence

Backing: 8 independent organisations across 22 quoted claims (8 guideline, 12 expert, 1 experiment, 1 study). Clusters: C0021, C0035, C0048, C0023.

- **GoodUI** (experiment, [goodui-leak-amazon-a-b-tests-and-rolls-out-extra-product-information-on-book-pages](https://goodui.org/leaks/amazon-a-b-tests-and-rolls-out-extra-product-information-on-book-pages/)): Show structured product information with labels and icons in a horizontal format.
- **growth.design** (study, [growthdesign-balance-psychology](https://growth.design/case-studies/balance-psychology)): Use familiar layouts and patterns to capture attention and prepare the brain for familiar cognitive states.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-of-ux](https://lawsofux.com/)): Maintain consistency with familiar patterns users encounter on other established sites.
- **Nielsen Norman Group** (guideline, [jakob-nielsen-10-usability-heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)): Follow platform and industry conventions to meet user expectations.
- **W3C** (guideline, [wcag-consistent-navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation)): Repeat navigation in the same relative order across all pages.
- **Apple** (expert, [apple-wwdc2022-10001](https://developer.apple.com/videos/play/wwdc2022/10001/)): Use familiar navigation patterns so users focus on content rather than learning how to navigate.

## Check

Each component on the page maps to a bank or design-system component; any custom pattern has a written reason in the spec.
