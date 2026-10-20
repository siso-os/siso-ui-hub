---
id: P0075
title: One system: take an existing component before building a new one
rule: Build every screen from the shared component set and tokens, take an existing component before making a new one, and change a component in one place so every screen follows.
layer: base
applies_to: [component, page, token]
nodes: [page/dashboard, page/index, page/record, section/shell]
strength: should
status: draft
shaan: [hub-0011, hub-0014]
papers: [W01]
clusters: [C0004, C0011, C0193, C0125]
sources:
  - shopify-polaris-design-system | Build experiences that feel designed by the same team across all touchpoints and partners. | https://shopify.com/partners/blog/how-to-get-the-most-out-of-polaris-shopify-s-new-design-system
  - apple-wwdc-design-2025 | Ensure custom interface elements harmonize with system design language like instruments playing in the same musical key. | https://developer.apple.com/videos/play/wwdc2025/356/
  - wcag-consistent-identification | Identify components with the same functionality consistently across pages so users recognize them. | https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification
  - shadcn-ui-design | Build composable components with thoughtful defaults that users can customize and extend. | https://ui.shadcn.com/
  - design-system-101 | Create a design system to reduce redundancy and establish visual consistency at scale. | https://www.nngroup.com/articles/design-systems-101/
  - govuk-components | Use pre-built, core components to build consistent services and reduce duplication of effort. | https://design-system.service.gov.uk/components/
corpus:
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
check: Every component import resolves to the shared package or bank; no page-local copies of shared components exist.
updated: 2026-10-11
---

## Why

Consistency lets people transfer what they learned on one screen to the next, and a central component fixes a bug everywhere at once.

## Do / Don't

- **Do:** Pick the table, KPI card and side nav from the bank (ui-pick) and extend them through props.
- **Don't:** Copy a component into the page and edit the copy.

## Evidence

Backing: 11 independent organisations across 19 quoted claims (11 guideline, 8 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0004, C0011, C0193, C0125.

- **Shopify** (guideline, [shopify-polaris-design-system](https://shopify.com/partners/blog/how-to-get-the-most-out-of-polaris-shopify-s-new-design-system)): Build experiences that feel designed by the same team across all touchpoints and partners.
- **Apple** (guideline, [apple-wwdc-design-2025](https://developer.apple.com/videos/play/wwdc2025/356/)): Ensure custom interface elements harmonize with system design language like instruments playing in the same musical key.
- **W3C** (guideline, [wcag-consistent-identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification)): Identify components with the same functionality consistently across pages so users recognize them.
- **shadcn** (guideline, [shadcn-ui-design](https://ui.shadcn.com/)): Build composable components with thoughtful defaults that users can customize and extend.
- **Nielsen Norman Group** (guideline, [design-system-101](https://www.nngroup.com/articles/design-systems-101/)): Create a design system to reduce redundancy and establish visual consistency at scale.
- **GOV.UK** (guideline, [govuk-components](https://design-system.service.gov.uk/components/)): Use pre-built, core components to build consistent services and reduce duplication of effort.

## Check

Every component import resolves to the shared package or bank; no page-local copies of shared components exist.
