---
id: P0025
title: Colours come from tokens, and selection is a tint
rule: Take every colour from named semantic tokens, never raw hex in components, and show selected and hover states as a translucent tint rather than a solid fill or heavy border.
layer: colour
applies_to: [theme, button, nav-item, row, chip]
nodes: [atom/button, component/tabs, component/form, atom/badge]
strength: should
status: draft
shaan: [hub-0014]
papers: [W01]
clusters: [C0157, C0086, C0275, C0057]
sources:
  - carbon-color | Use token-based color names—not hex codes—so themes can scale and change without rewriting values. | https://carbondesignsystem.com/building-blocks/foundations/color
  - chakra-ui-design-system | Use semantic design tokens to streamline and centralize design decisions across your system. | https://chakra-ui.com/
  - arc-browser-design-system | Prefer tinted background washes over borders to delineate surfaces and reduce visual noise. | https://open-design.ai/plugins/design-system-arc/
  - fluent2-color | Use color tokens to guarantee consistent color usage across experiences and products without hunting hex codes. | https://fluent2.microsoft.design/color
  - figma-design-tokens | Use design variables to enable switching between contexts like light and dark mode. | https://www.figma.com/design-systems/
  - apple-wwdc2025-219 | Use lensing to provide visual separation and communicate layering while letting content show through. | https://developer.apple.com/videos/play/wwdc2025/219/
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Search component styles for hex and rgb literals: none outside the token files; selected states resolve to a tint token.
updated: 2026-10-11
---

## Why

Tokens let one change re-theme every screen and keep light and dark in step; a tint shows state while keeping the content legible.

## Do / Don't

- **Do:** Style a selected nav item with the accent at low opacity over the surface, from a token.
- **Don't:** Hard-code #3B82F6 in a component, or fill the selected row with solid brand blue.

## Evidence

Backing: 7 independent organisations across 12 quoted claims (11 guideline, 1 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0157, C0086, C0275, C0057.

- **IBM** (guideline, [carbon-color](https://carbondesignsystem.com/building-blocks/foundations/color)): Use token-based color names—not hex codes—so themes can scale and change without rewriting values.
- **Chakra** (guideline, [chakra-ui-design-system](https://chakra-ui.com/)): Use semantic design tokens to streamline and centralize design decisions across your system.
- **The Browser Company** (guideline, [arc-browser-design-system](https://open-design.ai/plugins/design-system-arc/)): Prefer tinted background washes over borders to delineate surfaces and reduce visual noise.
- **Microsoft** (guideline, [fluent2-color](https://fluent2.microsoft.design/color)): Use color tokens to guarantee consistent color usage across experiences and products without hunting hex codes.
- **Figma** (guideline, [figma-design-tokens](https://www.figma.com/design-systems/)): Use design variables to enable switching between contexts like light and dark mode.
- **Apple** (guideline, [apple-wwdc2025-219](https://developer.apple.com/videos/play/wwdc2025/219/)): Use lensing to provide visual separation and communicate layering while letting content show through.

## Check

Search component styles for hex and rgb literals: none outside the token files; selected states resolve to a tint token.
