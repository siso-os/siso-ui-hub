---
id: P0008
title: Links go somewhere; buttons do something
rule: Use a link (an a element with href) for anything that navigates and a button for anything that acts, and style links so they read as links.
layer: nav
applies_to: [link, button, nav-item]
nodes: [atom/link, atom/button, component/menu]
strength: should
status: draft
shaan: []
papers: []
clusters: [C0223, C0093]
sources:
  - goodui-pattern-2 | Add text labels beside or below icons to increase clarity, navigation clicks, and conversion rates. (measured: 8 tests; progression and sales gains measured; 37.2% of 90% cumulative power target at 2% MDE) | https://goodui.org/patterns/2/
  - carbon-button | Use links, not buttons, when the action navigates to a new page. | https://carbondesignsystem.com/components/button/usage/
  - laws-ux-similarity | Differentiate links and navigation visually from normal text to avoid ambiguity. | https://lawsofux.com/law-of-similarity/
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/menu: 2,614 parts (mean 2.53): glass rates 3.24 vs minimal 2.3; interactive motion 3.36 vs none 2.2 (model-rated) | 2026-10-11
check: Every element that changes the URL is an a with href; every element with a click handler that does not navigate is a button.
updated: 2026-10-11
---

## Why

People and assistive tech predict behaviour from the element: links open, can be middle-clicked and bookmarked; buttons change something. Mixing them breaks both.

## Do / Don't

- **Do:** Make a row's name a link to its detail page and its Archive control a button.
- **Don't:** Navigate with a div or button onClick, or style an action as plain body text.

## Evidence

Backing: 3 independent organisations across 6 quoted claims (2 guideline, 4 experiment). Clusters: C0223, C0093.

- **GoodUI** (experiment, [goodui-pattern-2](https://goodui.org/patterns/2/)): Add text labels beside or below icons to increase clarity, navigation clicks, and conversion rates. Measured: 8 tests; progression and sales gains measured; 37.2% of 90% cumulative power target at 2% MDE.
- **IBM** (guideline, [carbon-button](https://carbondesignsystem.com/components/button/usage/)): Use links, not buttons, when the action navigates to a new page.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-similarity](https://lawsofux.com/law-of-similarity/)): Differentiate links and navigation visually from normal text to avoid ambiguity.

## Check

Every element that changes the URL is an a with href; every element with a click handler that does not navigate is a button.
