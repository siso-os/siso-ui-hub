---
id: P0089
title: Badges only for what changes a decision
rule: Use a badge only for information that changes what someone does (status, bestseller, new, live), keep one or two per item, and say it in words.
layer: atom
applies_to: [any:feedback]
nodes: [atom/badge, atom/status-dot, component/list]
strength: should
status: draft
shaan: [hub-0006, hub-0008]
papers: []
clusters: [C0384, C0885, C0916, C1089, C1135, C1363]
sources:
  - baymard-badge-ui | Reserve badges for information that genuinely influences purchase decisions; omit universal, obvious, or low-value attributes. | https://baymard.com/blog/badge-ui
  - baymard-badge-ui | Limit badges per product to retain their highlight function; overuse dilutes value and causes users to ignore them. | https://baymard.com/blog/badge-ui
  - baymard-badge-ui | Avoid using badges for universal, obvious, vague, or low-value information to prevent visual clutter and preserve signal value. | https://baymard.com/blog/badge-ui
  - goodui-pattern-78 | Use social proof badges like bestseller status on products to increase purchase intent. | https://goodui.org/patterns/78/
  - goodui-pattern-24 | Show online status badges or recent activity timestamps beside listings to build trust. (measured: +10.9% leads) | https://goodui.org/patterns/24/
  - goodui-leak-walmart-a-b-tests-popular-product-tags | Add popular picks or best seller badges above the buy box to signal social proof. | https://goodui.org/leaks/walmart-a-b-tests-popular-product-tags/
  - decisionlab-authority-bias | Use symbols of authority (titles, badges, certificates) cautiously; subtle authority cues influence trust disproportionately to actual credibility. | https://thedecisionlab.com/biases/authority-bias
corpus:
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: No item shows more than 2 badges; each badge has a text label (not colour alone, P0022).
updated: 2026-10-12
---

## Why

A badge is a highlight; when everything has one, nothing stands out and people learn to ignore them.

## Do / Don't

- **Do:** Show "Online now" beside a seller, or "Failed" on the one run that failed.
- **Don't:** Stack "Free shipping", "Quality", "Secure" and "New" on every card.

## Evidence

Backing: 3 independent organisations across 7 quoted claims (3 experiment, 4 study). Clusters: C0384, C0885, C0916, C1089, C1135, C1363.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **Baymard Institute** (study, [baymard-badge-ui](https://baymard.com/blog/badge-ui)): Reserve badges for information that genuinely influences purchase decisions; omit universal, obvious, or low-value attributes.
- **Baymard Institute** (study, [baymard-badge-ui](https://baymard.com/blog/badge-ui)): Limit badges per product to retain their highlight function; overuse dilutes value and causes users to ignore them.
- **Baymard Institute** (study, [baymard-badge-ui](https://baymard.com/blog/badge-ui)): Avoid using badges for universal, obvious, vague, or low-value information to prevent visual clutter and preserve signal value.
- **GoodUI** (experiment, [goodui-pattern-78](https://goodui.org/patterns/78/)): Use social proof badges like bestseller status on products to increase purchase intent.
- **GoodUI** (experiment, [goodui-pattern-24](https://goodui.org/patterns/24/)): Show online status badges or recent activity timestamps beside listings to build trust. Measured: +10.9% leads.
- **GoodUI** (experiment, [goodui-leak-walmart-a-b-tests-popular-product-tags](https://goodui.org/leaks/walmart-a-b-tests-popular-product-tags/)): Add popular picks or best seller badges above the buy box to signal social proof.
- **The Decision Lab** (study, [decisionlab-authority-bias](https://thedecisionlab.com/biases/authority-bias)): Use symbols of authority (titles, badges, certificates) cautiously; subtle authority cues influence trust disproportionately to actual credibility.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated)

## Check

No item shows more than 2 badges; each badge has a text label (not colour alone, P0022).
