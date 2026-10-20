---
id: P0027
title: Icons carry a text label
rule: Pair icons with a visible text label; icon-only is allowed only for universally known icons (close, search, menu) and then needs an accessible name and a tooltip.
layer: atom
applies_to: [icon, icon-button, nav-item, toolbar]
nodes: [atom/icon, atom/button, component/tabs, component/menu]
strength: must
status: draft
shaan: [hub-0014]
papers: []
clusters: [C0127, C0129, C0128]
sources:
  - goodui-pattern-2 | Add text labels beside icons to improve clarity and increase clicks and conversions. (measured: +X.X% combined effect across progression and sales from 8 tests) | https://goodui.org/patterns/2/
  - spectrum-iconography | Use 1.5 px stroke weight for icons to render balanced on mobile retina screens. (measured: 1.5 px stroke weight proven effective on mobile retina screens) | https://spectrum.adobe.com/page/iconography
  - etsy-search-bar-test | Pair icons with visible text labels rather than icons alone for form controls. | https://goodui.org/leaks/etsy-discovers-a-better-padded-and-wider-search-bar-in-this-a-b-c-test/
  - apple-wwdc2021-10349 | Use Label views to pair icons with text, as they adapt their layout to context automatically. | https://developer.apple.com/videos/play/wwdc2021/10349/
  - atlassian-iconography | Always pair icons with text labels to aid comprehension and avoid visual clutter. | https://atlassian.design/foundations/iconography
  - accessibility-heuristics-principles | Add text labels or alternatives for icon-only buttons so all users understand their function. | https://abstracta.us/blog/accessibility-testing/accessibility-heuristic
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/menu: 2,614 parts (mean 2.53): glass rates 3.24 vs minimal 2.3; interactive motion 3.36 vs none 2.2 (model-rated) | 2026-10-11
check: Every icon-only control has an aria-label and a tooltip; nav items show visible text at full width.
updated: 2026-10-11
---

## Why

Few icons mean the same thing to everyone; a label removes the guess, and the icon then speeds recognition on later visits.

## Do / Don't

- **Do:** Show icon plus label in the side nav and collapse to icons only with tooltips and aria-labels.
- **Don't:** Fill a toolbar with eight unlabelled icons, or use emoji as icons (hub-0014).

## Evidence

Backing: 8 independent organisations across 17 quoted claims (6 guideline, 5 expert, 6 experiment). Clusters: C0127, C0129, C0128.

- **GoodUI** (experiment, [goodui-pattern-2](https://goodui.org/patterns/2/)): Add text labels beside icons to improve clarity and increase clicks and conversions. Measured: +X.X% combined effect across progression and sales from 8 tests.
- **Adobe** (experiment, [spectrum-iconography](https://spectrum.adobe.com/page/iconography)): Use 1.5 px stroke weight for icons to render balanced on mobile retina screens. Measured: 1.5 px stroke weight proven effective on mobile retina screens.
- **Etsy** (experiment, [etsy-search-bar-test](https://goodui.org/leaks/etsy-discovers-a-better-padded-and-wider-search-bar-in-this-a-b-c-test/)): Pair icons with visible text labels rather than icons alone for form controls.
- **Apple** (guideline, [apple-wwdc2021-10349](https://developer.apple.com/videos/play/wwdc2021/10349/)): Use Label views to pair icons with text, as they adapt their layout to context automatically.
- **Atlassian** (guideline, [atlassian-iconography](https://atlassian.design/foundations/iconography)): Always pair icons with text labels to aid comprehension and avoid visual clutter.
- **Abstracta** (guideline, [accessibility-heuristics-principles](https://abstracta.us/blog/accessibility-testing/accessibility-heuristic)): Add text labels or alternatives for icon-only buttons so all users understand their function.

## Check

Every icon-only control has an aria-label and a tooltip; nav items show visible text at full width.
