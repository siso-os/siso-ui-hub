---
id: P0082
title: Signup and checkout drop the site nav and footer
rule: On signup, checkout and upgrade pages, remove the site navigation, footer links and promotions; leave the logo, help and the one way forward.
layer: page
applies_to: [landing:nav, landing:footer, dashboard:auth]
nodes: [section/nav, section/footer, section/auth, page/auth-page]
strength: should
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0220, C1122, C2356]
sources:
  - growthdesign-zapier-upgrade | Remove header and footer navigation from critical conversion pages (signup, checkout); fewer links reduce abandonment. (measured: 28% lift) | https://growth.design/case-studies/zapier-upgrade
  - goodui-pattern-64 | Simplify checkout footers by removing secondary links and extra calls-to-action to reduce abandonment. | https://goodui.org/patterns/64/
  - checkout-card-logos | Remove distracting promotional banners from the cart page to focus visitors on the transaction. (measured: +$5.5M incremental revenue) | https://www.optimizely.com/field-notes/articles/experimentation-use-cases-retail-checkout-pages
corpus:
  - siso-ui-code/types.jsonl | section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/footer: 732 parts (mean 2.75): dark rates 3.13 vs minimal 2.38; micro motion 3.09 vs none 2.68 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/auth: 1,456 parts (mean 2.51): gradient rates 3.38 vs minimal 2.44; entrance motion 3.3 vs none 2.37 (model-rated) | 2026-10-11
check: On signup, checkout and upgrade routes, the page has no primary site nav and no footer link list.
updated: 2026-10-12
---

## Why

Every link out of a conversion page is an exit. The measured lifts come from removing them, not from adding anything.

## Do / Don't

- **Do:** Show checkout with only the logo, a help link, the order summary and Pay.
- **Don't:** Wrap the card form in the full mega-menu and a four-column footer.

## Evidence

Backing: 3 independent organisations across 3 quoted claims (3 experiment). Clusters: C0220, C1122, C2356.


- **growth.design** (experiment, [growthdesign-zapier-upgrade](https://growth.design/case-studies/zapier-upgrade)): Remove header and footer navigation from critical conversion pages (signup, checkout); fewer links reduce abandonment. Measured: 28% lift.
- **GoodUI** (experiment, [goodui-pattern-64](https://goodui.org/patterns/64/)): Simplify checkout footers by removing secondary links and extra calls-to-action to reduce abandonment.
- **Optimizely** (experiment, [checkout-card-logos](https://www.optimizely.com/field-notes/articles/experimentation-use-cases-retail-checkout-pages)): Remove distracting promotional banners from the cart page to focus visitors on the transaction. Measured: +$5.5M incremental revenue.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated)
- section/footer: 732 parts (mean 2.75): dark rates 3.13 vs minimal 2.38; micro motion 3.09 vs none 2.68 (model-rated)
- section/auth: 1,456 parts (mean 2.51): gradient rates 3.38 vs minimal 2.44; entrance motion 3.3 vs none 2.37 (model-rated)

## Check

On signup, checkout and upgrade routes, the page has no primary site nav and no footer link list.
