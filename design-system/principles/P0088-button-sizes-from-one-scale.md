---
id: P0088
title: Buttons come in three sizes, and the main action is the largest
rule: Draw every button from one small size scale; give the main call to action the largest size that fits its context, make the whole button clickable, and stop before it dominates the page.
layer: atom
applies_to: [any:action]
nodes: [atom/button, section/cta, section/hero]
strength: must
status: draft
shaan: [hub-0014, hub-0015]
papers: []
clusters: [C0405, C0892, C0893, C0904, C0937, C1756]
sources:
  - facebook-ab-testing-at-scale | Increase primary call-to-action button size to nearly double for visibility in signup flows. | https://goodui.org/blog/reverse-engineering-facebook-coms-homepage-design-optimizations/
  - goodui-leak-zalando-rejects-a-b-tested-company-logos-and-a-smaller-add-to-cart-button | Make add-to-cart buttons larger, not smaller, to improve conversions. (measured: Smaller add-to-cart button was rejected) | https://goodui.org/leaks/zalando-rejects-a-b-tested-company-logos-and-a-smaller-add-to-cart-button/
  - goodui-leak-netflix-designs-their-button-a-little-too-big | Avoid making buttons so large they dominate the page; optimize button size for the specific context. | https://goodui.org/leaks/netflix-designs-their-button-a-little-too-big/
  - goodui-leak-89 | Avoid making add-to-cart buttons excessively wide; test reveals diminishing returns and possible secondary metric losses. | https://goodui.org/leaks/89/
  - goodui-pattern-97 | Expand clickable areas to the full size of interactive elements, not just portions, to improve progression and conversions. | https://goodui.org/patterns/97/
  - design-monks-perfect-mobile-button-size | Set minimum button size to 42 pixels (9x9 mm) for accessibility and comfortable button size around 50 pixels (10x10 mm). | https://www.designmonks.co/blog/perfect-mobile-button-size
  - uswds-button | Use buttons to draw attention to important actions with a large selectable surface area. | https://designsystem.digital.gov/components/button/
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
check: Every button height on a page is one of the scale's three values; the hit area equals the drawn button.
updated: 2026-10-12
---

## Why

A bigger main button is found and pressed more, up to a point; past it, the button crowds out what it acts on. One scale keeps every screen consistent (P0026 sets the minimum target).

## Do / Don't

- **Do:** Use small 32 px for table rows, medium 40 px for forms, large 48 px for the hero; the full padded area responds to the click.
- **Don't:** Mix six button heights on one page, or ship a full-width 80 px button on desktop.

## Evidence

Backing: 4 independent organisations across 7 quoted claims (5 experiment, 1 guideline, 1 study). Clusters: C0405, C0892, C0893, C0904, C0937, C1756.


- **Meta** (experiment, [facebook-ab-testing-at-scale](https://goodui.org/blog/reverse-engineering-facebook-coms-homepage-design-optimizations/)): Increase primary call-to-action button size to nearly double for visibility in signup flows.
- **GoodUI** (experiment, [goodui-leak-zalando-rejects-a-b-tested-company-logos-and-a-smaller-add-to-cart-button](https://goodui.org/leaks/zalando-rejects-a-b-tested-company-logos-and-a-smaller-add-to-cart-button/)): Make add-to-cart buttons larger, not smaller, to improve conversions. Measured: Smaller add-to-cart button was rejected.
- **GoodUI** (experiment, [goodui-leak-netflix-designs-their-button-a-little-too-big](https://goodui.org/leaks/netflix-designs-their-button-a-little-too-big/)): Avoid making buttons so large they dominate the page; optimize button size for the specific context.
- **GoodUI** (experiment, [goodui-leak-89](https://goodui.org/leaks/89/)): Avoid making add-to-cart buttons excessively wide; test reveals diminishing returns and possible secondary metric losses.
- **GoodUI** (experiment, [goodui-pattern-97](https://goodui.org/patterns/97/)): Expand clickable areas to the full size of interactive elements, not just portions, to improve progression and conversions.
- **Design Monks** (study, [design-monks-perfect-mobile-button-size](https://www.designmonks.co/blog/perfect-mobile-button-size)): Set minimum button size to 42 pixels (9x9 mm) for accessibility and comfortable button size around 50 pixels (10x10 mm).
- **USWDS** (guideline, [uswds-button](https://designsystem.digital.gov/components/button/)): Use buttons to draw attention to important actions with a large selectable surface area.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated)
- section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated)
- section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated)

## Check

Every button height on a page is one of the scale's three values; the hit area equals the drawn button.
