---
id: P0023
title: Colour has a job: one accent for action, reserved colours for status
rule: Use one accent colour for interactive emphasis and reserve red, amber and green for error, warning and success; everything else is neutral.
layer: colour
applies_to: [button, status, badge, chart, link]
nodes: [atom/button, atom/badge, atom/status-dot, component/chart, atom/link]
strength: should
status: draft
shaan: [hub-0014]
papers: []
clusters: [C0071, C0013]
sources:
  - atlassian-color | Apply color roles to convey semantic meaning: use brand for primary actions, warning for caution, danger for errors, success for favorable outcomes. | https://atlassian.design/foundations/color
  - baymard-badge-ui | Use red for sale and urgency, green for stock and new labels, and grey for neutral information. | https://baymard.com/blog/badge-ui
  - patternfly-empty-state-design-guidelines | Use icons with semantic color: gray for neutral states, red for errors, green for success. | https://www.patternfly.org/components/empty-state/design-guidelines
  - shopify-polaris-design-system | Use consistent color purposefully throughout your interface to guide merchant attention and understanding. | https://shopify.com/partners/blog/how-to-get-the-most-out-of-polaris-shopify-s-new-design-system
  - apple-tech-talks-10884 | Use color strategically for wayfinding, hierarchy, and app identity on watch interfaces. | https://developer.apple.com/videos/play/tech-talks/10884/
  - growthdesign-zapier-upgrade | Use visual anchors to reinforce loss aversion; an overflowing bar alerts better than text alone. | https://growth.design/case-studies/zapier-upgrade
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: List the distinct non-neutral colours on the page: one accent plus the status colours, each from a semantic token.
updated: 2026-10-11
---

## Why

Colour pulls the eye before anything else. When it is scarce and consistent it means something; when it is everywhere it means nothing.

## Do / Don't

- **Do:** Keep the dashboard neutral grey, with the accent only on the primary action and selection, and red only on real failures.
- **Don't:** Colour-code every card, or use red for a brand accent.

## Evidence

Backing: 8 independent organisations across 10 quoted claims (5 guideline, 5 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0071, C0013.

- **Atlassian** (guideline, [atlassian-color](https://atlassian.design/foundations/color)): Apply color roles to convey semantic meaning: use brand for primary actions, warning for caution, danger for errors, success for favorable outcomes.
- **Baymard Institute** (guideline, [baymard-badge-ui](https://baymard.com/blog/badge-ui)): Use red for sale and urgency, green for stock and new labels, and grey for neutral information.
- **Red Hat (PatternFly)** (guideline, [patternfly-empty-state-design-guidelines](https://www.patternfly.org/components/empty-state/design-guidelines)): Use icons with semantic color: gray for neutral states, red for errors, green for success.
- **Shopify** (guideline, [shopify-polaris-design-system](https://shopify.com/partners/blog/how-to-get-the-most-out-of-polaris-shopify-s-new-design-system)): Use consistent color purposefully throughout your interface to guide merchant attention and understanding.
- **Apple** (guideline, [apple-tech-talks-10884](https://developer.apple.com/videos/play/tech-talks/10884/)): Use color strategically for wayfinding, hierarchy, and app identity on watch interfaces.
- **growth.design** (expert, [growthdesign-zapier-upgrade](https://growth.design/case-studies/zapier-upgrade)): Use visual anchors to reinforce loss aversion; an overflowing bar alerts better than text alone.

## Check

List the distinct non-neutral colours on the page: one accent plus the status colours, each from a semantic token.
