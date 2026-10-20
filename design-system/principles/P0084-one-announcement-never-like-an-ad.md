---
id: P0084
title: At most one announcement, and it never looks like an ad
rule: Show at most one announcement bar, only for news unrelated to the task at hand, styled like the product rather than a banner ad, and never on checkout.
layer: page
applies_to: [landing:announcement]
nodes: [section/announcement]
strength: must
status: draft
shaan: [hub-0015]
papers: []
clusters: [C1122, C1332, C1333, C2223, C2433, C2474]
sources:
  - govuk-notification-banner | Show at most one notification banner per page; combine messages or show only the highest priority banner. | https://design-system.service.gov.uk/components/notification-banner/
  - govuk-notification-banner | Use notification banners only for information not directly relevant to the current page task; put task-relevant info in main content. | https://design-system.service.gov.uk/components/notification-banner/
  - nngroup-banner-blindness-new | Avoid placing legitimate content in traditional ad locations (top banner, right rail) where users habitually ignore ads. | https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/
  - laws-ux-selective-attention | Avoid styling content to resemble ads or placing it near ads, as users consciously ignore banner-like information. | https://lawsofux.com/selective-attention/
  - growthdesign-psychology | Avoid banner placement for important messages; users learn to ignore repeatedly exposed elements. | https://growth.design/psychology
  - checkout-card-logos | Remove distracting promotional banners from the cart page to focus visitors on the transaction. (measured: +$5.5M incremental revenue) | https://www.optimizely.com/field-notes/articles/experimentation-use-cases-retail-checkout-pages
corpus:
  - siso-ui-code/types.jsonl | section/announcement: 390 parts (mean 3.01): dark rates 3.24 vs minimal 2.82; loop motion 3.23 vs none 2.88 (model-rated) | 2026-10-11
check: At most one announcement element per page; none on checkout routes; it can be dismissed and stays dismissed.
updated: 2026-10-12
---

## Why

People have learned to skip anything shaped like an ad, so banner styling hides real news. A promotion on the cart pulls attention from paying.

## Do / Don't

- **Do:** Show one slim bar, "New: invoices in 30 currencies. See what changed", dismissible, gone on checkout.
- **Don't:** Stack two banners and a flashing discount strip above the payment form.

## Evidence

Backing: 5 independent organisations across 6 quoted claims (1 experiment, 3 guideline, 2 study). Clusters: C1122, C1332, C1333, C2223, C2433, C2474.


- **GOV.UK** (guideline, [govuk-notification-banner](https://design-system.service.gov.uk/components/notification-banner/)): Show at most one notification banner per page; combine messages or show only the highest priority banner.
- **GOV.UK** (guideline, [govuk-notification-banner](https://design-system.service.gov.uk/components/notification-banner/)): Use notification banners only for information not directly relevant to the current page task; put task-relevant info in main content.
- **Nielsen Norman Group** (study, [nngroup-banner-blindness-new](https://www.nngroup.com/articles/banner-blindness-old-and-new-findings/)): Avoid placing legitimate content in traditional ad locations (top banner, right rail) where users habitually ignore ads.
- **Laws of UX (Jon Yablonski)** (study, [laws-ux-selective-attention](https://lawsofux.com/selective-attention/)): Avoid styling content to resemble ads or placing it near ads, as users consciously ignore banner-like information.
- **growth.design** (guideline, [growthdesign-psychology](https://growth.design/psychology)): Avoid banner placement for important messages; users learn to ignore repeatedly exposed elements.
- **Optimizely** (experiment, [checkout-card-logos](https://www.optimizely.com/field-notes/articles/experimentation-use-cases-retail-checkout-pages)): Remove distracting promotional banners from the cart page to focus visitors on the transaction. Measured: +$5.5M incremental revenue.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/announcement: 390 parts (mean 3.01): dark rates 3.24 vs minimal 2.82; loop motion 3.23 vs none 2.88 (model-rated)

## Check

At most one announcement element per page; none on checkout routes; it can be dismissed and stays dismissed.
