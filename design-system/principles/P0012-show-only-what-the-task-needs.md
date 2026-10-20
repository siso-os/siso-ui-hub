---
id: P0012
title: Show only what this task needs
rule: Remove anything the current task does not use; move the rest behind progressive disclosure, so the work area gets at least 55% of the first screen (hub-0002).
layer: page
applies_to: [page, dashboard, list, card]
nodes: [page/dashboard, section/data-view, component/card]
strength: must
status: draft
shaan: [hub-0002, hub-0012]
papers: [W03]
clusters: [C0277, C0117, C0278, C0020]
sources:
  - laws-ux-working-memory | Display only necessary and relevant information since working memory holds 4-7 chunks for 20-30 seconds. (measured: 4-7 chunks; 20-30 seconds) | https://lawsofux.com/working-memory/
  - goodui-pattern-32 | Remove extraneous metadata like dates, locations, and product descriptions from list items to increase item density. | https://goodui.org/patterns/32/
  - intuit-quickbooks-form-order | Present only the appropriate amount of information; overwhelming visitors with tabs, FAQs, or excessive detail reduces conversion performance. | https://marketingsherpa.com/article/case-study/how-intuit-grew-revenue-per
  - apple-wwdc2021-10126 | Visually separate content categories with header titles and spacing; grouping reduces overwhelm and clarifies existing divisions. | https://developer.apple.com/videos/play/wwdc2021/10126/
  - uber-design-principles | Show only information relevant to the current moment; display and hide it based on need. | https://principles.design/examples/uber-design-principles
  - decisionlab-serial-position-effect | Limit visible items per screen to reduce cognitive load; let users filter to view fewer options at once. | https://thedecisionlab.com/biases/serial-position-effect
check: At 1440x900, the main work region covers at least 55% of the viewport; every visible element maps to a named task in the page spec.
updated: 2026-10-11
---

## Why

Working memory holds a handful of items; every extra element competes for attention and slows the search for the one that matters.

## Do / Don't

- **Do:** Show five columns that answer the task and let users add the other twelve.
- **Don't:** Fill the first screen with welcome text, tips and secondary widgets.

## Evidence

Backing: 8 independent organisations across 15 quoted claims (2 study, 6 guideline, 5 expert, 2 experiment). Clusters: C0277, C0117, C0278, C0020.

- **Laws of UX (Jon Yablonski)** (study, [laws-ux-working-memory](https://lawsofux.com/working-memory/)): Display only necessary and relevant information since working memory holds 4-7 chunks for 20-30 seconds. Measured: 4-7 chunks; 20-30 seconds.
- **GoodUI** (experiment, [goodui-pattern-32](https://goodui.org/patterns/32/)): Remove extraneous metadata like dates, locations, and product descriptions from list items to increase item density.
- **Intuit** (experiment, [intuit-quickbooks-form-order](https://marketingsherpa.com/article/case-study/how-intuit-grew-revenue-per)): Present only the appropriate amount of information; overwhelming visitors with tabs, FAQs, or excessive detail reduces conversion performance.
- **Apple** (study, [apple-wwdc2021-10126](https://developer.apple.com/videos/play/wwdc2021/10126/)): Visually separate content categories with header titles and spacing; grouping reduces overwhelm and clarifies existing divisions.
- **Uber** (guideline, [uber-design-principles](https://principles.design/examples/uber-design-principles)): Show only information relevant to the current moment; display and hide it based on need.
- **The Decision Lab** (guideline, [decisionlab-serial-position-effect](https://thedecisionlab.com/biases/serial-position-effect)): Limit visible items per screen to reduce cognitive load; let users filter to view fewer options at once.

House rule and research: the 55% figure is Shaan's (hub-0002). The research supports showing only what the task needs (working memory holds about 4 to 7 chunks) but gives no percentage, so the number rests on the house rule.

## Check

At 1440x900, the main work region covers at least 55% of the viewport; every visible element maps to a named task in the page spec.
