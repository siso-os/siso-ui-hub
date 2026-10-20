---
id: P0057
title: Filters sit next to what they filter and show what is applied
rule: Place filters beside or above the view they control, keep them visible, show every applied filter as a removable chip with a clear-all, and show result counts.
layer: data
applies_to: [filter, table, dashboard, search-results]
nodes: [section/filters, component/table, page/dashboard]
strength: must
status: draft
shaan: [hub-0005]
papers: []
clusters: [C0038, C0107, C0211]
sources:
  - goodui-leak-airbnb-a-b-tests-more-filters-on-their-listing-screens-with-this-outcome | Keep important filter options visible rather than hidden to maintain user control over search results. (measured: Variation eventually rejected; confounded test) | https://goodui.org/leaks/airbnb-a-b-tests-more-filters-on-their-listing-screens-with-this-outcome/
  - baymard-plp-ux-definition | Show result counts next to each filter option so users know if a selection narrows to zero. | https://baymard.com/blog/product-listing-page-plp-ux
  - patternfly-filters-design-guidelines | Show applied filter labels to reveal what conditions are being filtered on. | https://www.patternfly.org/patterns/filters/design-guidelines
  - apple-wwdc2026-292 | Use scope bar for lightweight filtering across locations or categories; show filters contextual to the query. | https://developer.apple.com/videos/play/wwdc2026/292/
  - playfairdata-gestalt-principles | Group filters and navigation elements close together; place view-specific filters near the views they control. | https://playfairdata.com/applying-gestalt-principles-to-dashboard-design/
  - nngroup-keyword-foraging | Deploy faceted filters to help users discover and learn specialized vocabulary in complex domains like car parts, skin care, and home improvement. | https://www.nngroup.com/articles/keyword-foraging/
corpus:
  - siso-ui-code/types.jsonl | section/filters: 786 parts (mean 2.99): dark rates 3.45 vs minimal 2.73; micro motion 3.27 vs none 2.53 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: Apply two filters: each appears as a removable chip near the view, a clear-all control exists, the result count updates, and the URL encodes the filters.
updated: 2026-10-11
---

## Why

People forget which filters they set; hidden filters make the data look wrong, while visible chips explain what they are seeing.

## Do / Don't

- **Do:** Show Status: Failed and Last 7 days as chips above the table, each with an x, and 23 results.
- **Don't:** Hide filters in a drawer with no sign that the view is filtered.

## Evidence

Backing: 6 independent organisations across 12 quoted claims (4 guideline, 2 expert, 5 experiment, 1 study). Clusters: C0038, C0107, C0211.

- **GoodUI** (experiment, [goodui-leak-airbnb-a-b-tests-more-filters-on-their-listing-screens-with-this-outcome](https://goodui.org/leaks/airbnb-a-b-tests-more-filters-on-their-listing-screens-with-this-outcome/)): Keep important filter options visible rather than hidden to maintain user control over search results. Measured: Variation eventually rejected; confounded test.
- **Baymard Institute** (study, [baymard-plp-ux-definition](https://baymard.com/blog/product-listing-page-plp-ux)): Show result counts next to each filter option so users know if a selection narrows to zero.
- **Red Hat (PatternFly)** (guideline, [patternfly-filters-design-guidelines](https://www.patternfly.org/patterns/filters/design-guidelines)): Show applied filter labels to reveal what conditions are being filtered on.
- **Apple** (guideline, [apple-wwdc2026-292](https://developer.apple.com/videos/play/wwdc2026/292/)): Use scope bar for lightweight filtering across locations or categories; show filters contextual to the query.
- **Playfair Data** (expert, [playfairdata-gestalt-principles](https://playfairdata.com/applying-gestalt-principles-to-dashboard-design/)): Group filters and navigation elements close together; place view-specific filters near the views they control.
- **Nielsen Norman Group** (expert, [nngroup-keyword-foraging](https://www.nngroup.com/articles/keyword-foraging/)): Deploy faceted filters to help users discover and learn specialized vocabulary in complex domains like car parts, skin care, and home improvement.

## Check

Apply two filters: each appears as a removable chip near the view, a clear-all control exists, the result count updates, and the URL encodes the filters.
