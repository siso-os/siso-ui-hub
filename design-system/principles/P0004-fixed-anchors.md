---
id: P0004
title: Fixed anchors: the same things in the same place on every page
rule: Keep the logo top-left, search and account top-right, and every page region in the same order on every page and screen size.
layer: shell
applies_to: [header, side-nav, app-shell, search, notifications]
nodes: [section/shell, section/top-bar, section/sidebar]
strength: should
status: draft
shaan: [hub-0015]
papers: [W01]
clusters: [C0279, C0281, C0004]
sources:
  - wai-page-regions | Maintain consistent page region order across different screen sizes. | https://www.w3.org/WAI/tutorials/page-structure/regions/
  - nngroup-horizontal-attention-leans-left | Use conventional top or left navigation formats to maximize alignment with users' established viewing patterns. | https://www.nngroup.com/articles/horizontal-attention-leans-left/
  - shopify-polaris-design-system | Build experiences that feel designed by the same team across all touchpoints and partners. | https://shopify.com/partners/blog/how-to-get-the-most-out-of-polaris-shopify-s-new-design-system
  - apple-wwdc-design-2025 | Ensure custom interface elements harmonize with system design language like instruments playing in the same musical key. | https://developer.apple.com/videos/play/wwdc2025/356/
  - lindgaard-2006-50ms-judgement | Place logo in top-left and search in top-right to match user expectations. | https://www.nature.com/news/2006/060109/full/news060109-13.html
  - playfairdata-gestalt-principles | Maintain consistent button styling across the dashboard so users recognize similar function. | https://playfairdata.com/applying-gestalt-principles-to-dashboard-design/
corpus:
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/top-bar: 318 parts (mean 2.77): clean rates 3.28 vs minimal 2.44; micro motion 2.94 vs none 2.48 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/sidebar: 873 parts (mean 2.91): dark rates 3.36 vs minimal 2.43; interactive motion 3.42 vs none 2.25 (model-rated) | 2026-10-11
check: Screenshot the header on five pages at desktop and mobile widths and overlay them: anchors line up within a few pixels and regions keep their order.
updated: 2026-10-11
---

## Why

People look where they found something last time. Moving an anchor makes them search again, which costs attention on every visit.

## Do / Don't

- **Do:** Place logo, search, the one notification bell and the account menu in fixed header slots shared by every page.
- **Don't:** Move search into the page body on some screens or swap the order of regions at a breakpoint.

## Evidence

Backing: 8 independent organisations across 11 quoted claims (5 expert, 6 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0279, C0281, C0004.

- **W3C** (guideline, [wai-page-regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)): Maintain consistent page region order across different screen sizes.
- **Nielsen Norman Group** (guideline, [nngroup-horizontal-attention-leans-left](https://www.nngroup.com/articles/horizontal-attention-leans-left/)): Use conventional top or left navigation formats to maximize alignment with users' established viewing patterns.
- **Shopify** (guideline, [shopify-polaris-design-system](https://shopify.com/partners/blog/how-to-get-the-most-out-of-polaris-shopify-s-new-design-system)): Build experiences that feel designed by the same team across all touchpoints and partners.
- **Apple** (guideline, [apple-wwdc-design-2025](https://developer.apple.com/videos/play/wwdc2025/356/)): Ensure custom interface elements harmonize with system design language like instruments playing in the same musical key.
- **Carleton University** (expert, [lindgaard-2006-50ms-judgement](https://www.nature.com/news/2006/060109/full/news060109-13.html)): Place logo in top-left and search in top-right to match user expectations.
- **Playfair Data** (expert, [playfairdata-gestalt-principles](https://playfairdata.com/applying-gestalt-principles-to-dashboard-design/)): Maintain consistent button styling across the dashboard so users recognize similar function.

## Check

Screenshot the header on five pages at desktop and mobile widths and overlay them: anchors line up within a few pixels and regions keep their order.
