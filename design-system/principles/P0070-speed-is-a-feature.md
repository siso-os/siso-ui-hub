---
id: P0070
title: Speed is a feature: meet Core Web Vitals and reserve space
rule: Track Core Web Vitals (largest paint, interaction response, layout shift) on every page, treat a regression as a bug, and reserve space for everything that loads late.
layer: base
applies_to: [page, app-shell, image, widget]
nodes: [page/dashboard, section/shell, atom/image, page/home, section/hero]
strength: must
status: draft
shaan: [hub-0010]
papers: [W04]
clusters: [C0032, C0072, C0236]
sources:
  - amazon-100ms-latency-revenue | Every 100 milliseconds of latency costs 1% in sales; optimize for speed as a revenue metric. (measured: 100ms latency = 1% sales loss) | https://www.graphiant.com/resources/part-1-the-100-millisecond-problem-how-amazons-internal-crisis-sparked-a-revolution
  - web.dev-rakuten-vitals-homepage | Optimize Largest Contentful Paint (LCP) to improve conversion rates; good LCP increases conversions by up to 61.13%. (measured: 61.13% conversion rate increase with good LCP) | https://web.dev/case-studies/rakuten
  - t-mobile-case-study | A 42% improvement in Largest Contentful Paint (LCP) reduces slow-loading complaints by 34% and improves conversion 60%. (measured: 42% LCP improvement = 60% conversion increase and 34% reduction in slow-load complaints) | https://web.dev/case-studies/t-mobile-case-study
  - wpostats-quintoandar-perf | Reduce paint metrics (LCP, FID) to increase engagement, session depth, and conversion. (measured: 26% LCP + 72% FID reduction led to 46% bounce reduction, 87% pages/session increase, 5% conversion gain) | https://wpostats.com/quintoandar
  - wpostats-carpe-perf | Eliminate layout shifts and improve paint performance to drive traffic growth and revenue. (measured: 52% LCP + 41% CLS improvement produced 10% traffic gain, 5% conversion increase, 15% revenue rise) | https://wpostats.com/carpe
  - wpostats-sunday-citizen-perf | Stabilize layout and speed up content paint to reduce bounce and lift conversion rates. (measured: 25% LCP + 61% CLS improvement at p75 caused 4% bounce decrease and 6% conversion increase) | https://wpostats.com/sunday-citizen
corpus:
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/image: 1,395 parts (mean 2.78): glass rates 3.5 vs minimal 2.49; interactive motion 3.27 vs none 2.28 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/hero: 3,443 parts (mean 3.07): glass rates 3.71 vs minimal 2.59; interactive motion 3.42 vs none 2.88 (model-rated) | 2026-10-11
check: Lighthouse or field data at p75 rates LCP, INP and CLS as good; images, charts and late banners have reserved dimensions.
updated: 2026-10-11
---

## Why

Slower pages lose people: Amazon measured each 100 ms of latency costing 1% of sales, and case studies tie better paint and stability scores to higher conversion. Layout shifts cause misclicks.

## Do / Don't

- **Do:** Set width and height on images and charts and render the shell before data.
- **Don't:** Let a late banner push the table down as the user clicks.

## Evidence

Backing: 11 independent organisations across 13 quoted claims (9 experiment, 2 study, 2 guideline). Clusters: C0032, C0072, C0236.

- **Amazon** (experiment, [amazon-100ms-latency-revenue](https://www.graphiant.com/resources/part-1-the-100-millisecond-problem-how-amazons-internal-crisis-sparked-a-revolution)): Every 100 milliseconds of latency costs 1% in sales; optimize for speed as a revenue metric. Measured: 100ms latency = 1% sales loss.
- **Rakuten** (experiment, [web.dev-rakuten-vitals-homepage](https://web.dev/case-studies/rakuten)): Optimize Largest Contentful Paint (LCP) to improve conversion rates; good LCP increases conversions by up to 61.13%. Measured: 61.13% conversion rate increase with good LCP.
- **T-Mobile** (experiment, [t-mobile-case-study](https://web.dev/case-studies/t-mobile-case-study)): A 42% improvement in Largest Contentful Paint (LCP) reduces slow-loading complaints by 34% and improves conversion 60%. Measured: 42% LCP improvement = 60% conversion increase and 34% reduction in slow-load complaints.
- **QuintoAndar** (experiment, [wpostats-quintoandar-perf](https://wpostats.com/quintoandar)): Reduce paint metrics (LCP, FID) to increase engagement, session depth, and conversion. Measured: 26% LCP + 72% FID reduction led to 46% bounce reduction, 87% pages/session increase, 5% conversion gain.
- **Carpe** (experiment, [wpostats-carpe-perf](https://wpostats.com/carpe)): Eliminate layout shifts and improve paint performance to drive traffic growth and revenue. Measured: 52% LCP + 41% CLS improvement produced 10% traffic gain, 5% conversion increase, 15% revenue rise.
- **Sunday Citizen** (experiment, [wpostats-sunday-citizen-perf](https://wpostats.com/sunday-citizen)): Stabilize layout and speed up content paint to reduce bounce and lift conversion rates. Measured: 25% LCP + 61% CLS improvement at p75 caused 4% bounce decrease and 6% conversion increase.

## Check

Lighthouse or field data at p75 rates LCP, INP and CLS as good; images, charts and late banners have reserved dimensions.
