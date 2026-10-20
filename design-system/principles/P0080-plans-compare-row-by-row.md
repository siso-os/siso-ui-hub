---
id: P0080
title: Plans compare row by row
rule: Lay plan features out in aligned rows, the same feature on the same line in every plan, with ticks for yes and the monthly equivalent for every billing period.
layer: page
applies_to: [landing:pricing, landing:comparison]
nodes: [section/comparison, section/pricing]
strength: should
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0404, C1704, C2102, C2363, C2471]
sources:
  - goodui-pattern-115 | Align pricing plan features horizontally with separated labels and values for easier comparison. | https://goodui.org/patterns/115/
  - goodui-pattern-115 | Use comparison tables with checkmarks to make feature differences between plans clearer. | https://goodui.org/patterns/115/
  - goodui-pattern-112 | Frame subscription prices in monthly equivalents to aid comparison across billing periods. | https://goodui.org/patterns/112/
  - goodui-leak-airbnb-discovers-a-better-way-to-display-customer-ratings-in-this-a-b-test | Display rating averages with decimal places instead of whole-star visualizations for easier comparison. (measured: Decimal rating display was implemented over full-star visual representation) | https://goodui.org/leaks/airbnb-discovers-a-better-way-to-display-customer-ratings-in-this-a-b-test/
  - nngroup-content-dispersion | Avoid accordions on desktop; they fragment content and increase interaction cost compared to expanded layouts. | https://www.nngroup.com/articles/content-dispersion/
corpus:
  - siso-ui-code/types.jsonl | section/comparison: 137 parts (mean 2.89): minimal rates 3.41 vs clean 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/pricing: 948 parts (mean 3.06): gradient rates 3.57 vs minimal 2.74; interactive motion 3.73 vs none 2.82 (model-rated) | 2026-10-11
check: In the comparison, each feature is one row across all plans; every yearly price also shows its per-month figure.
updated: 2026-10-12
---

## Why

Comparison is reading across; if rows do not line up, the reader has to do the table's work. Monthly equivalents let a yearly price be compared with a monthly one.

## Do / Don't

- **Do:** Use a comparison table with feature names down the left and a tick, dash or number in each plan column; "£12/month, billed £144 yearly".
- **Don't:** Use three cards with differently ordered bullet lists, or features hidden in accordions on desktop.

## Evidence

Backing: 2 independent organisations across 5 quoted claims (5 experiment). Clusters: C0404, C1704, C2102, C2363, C2471.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **GoodUI** (experiment, [goodui-pattern-115](https://goodui.org/patterns/115/)): Align pricing plan features horizontally with separated labels and values for easier comparison.
- **GoodUI** (experiment, [goodui-pattern-115](https://goodui.org/patterns/115/)): Use comparison tables with checkmarks to make feature differences between plans clearer.
- **GoodUI** (experiment, [goodui-pattern-112](https://goodui.org/patterns/112/)): Frame subscription prices in monthly equivalents to aid comparison across billing periods.
- **GoodUI** (experiment, [goodui-leak-airbnb-discovers-a-better-way-to-display-customer-ratings-in-this-a-b-test](https://goodui.org/leaks/airbnb-discovers-a-better-way-to-display-customer-ratings-in-this-a-b-test/)): Display rating averages with decimal places instead of whole-star visualizations for easier comparison. Measured: Decimal rating display was implemented over full-star visual representation.
- **Nielsen Norman Group** (experiment, [nngroup-content-dispersion](https://www.nngroup.com/articles/content-dispersion/)): Avoid accordions on desktop; they fragment content and increase interaction cost compared to expanded layouts.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/comparison: 137 parts (mean 2.89): minimal rates 3.41 vs clean 2.71 (model-rated)
- section/pricing: 948 parts (mean 3.06): gradient rates 3.57 vs minimal 2.74; interactive motion 3.73 vs none 2.82 (model-rated)

## Check

In the comparison, each feature is one row across all plans; every yearly price also shows its per-month figure.
