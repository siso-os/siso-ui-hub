---
id: P0006
title: Primary navigation is visible, not hidden behind a menu
rule: Show primary destinations on screen; never hide them behind a hamburger or a More menu on screens wide enough to show them.
layer: nav
applies_to: [side-nav, tab-bar, header]
nodes: [section/nav, section/sidebar, component/tabs]
strength: should
status: draft
shaan: []
papers: [W01]
clusters: [C0045]
sources:
  - goodui-leak-bol-discovers-something-better-than-classic-pulldown-menus-as-expected | Expose menu options as clickable actions above results instead of hiding them in dropdown menus. (measured: Exposed menu options variant implemented; scored +0.5 repeatability as evidence pattern is getting better) | https://goodui.org/leaks/bol-discovers-something-better-than-classic-pulldown-menus-as-expected/
  - apple-wwdc2021-10126 | Avoid hamburger menus for primary navigation; use visible alternatives like tab bars so users see available sections. | https://developer.apple.com/videos/play/wwdc2021/10126/
  - nngroup-menu-design | Display navigation menus on larger screens; use hamburger menus only when space constraints require it. | https://www.nngroup.com/articles/menu-design/
corpus:
  - siso-ui-code/types.jsonl | section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/sidebar: 873 parts (mean 2.91): dark rates 3.36 vs minimal 2.43; interactive motion 3.42 vs none 2.25 (model-rated) | 2026-10-11
check: At 1280 px wide, every top-level destination is visible without opening a menu.
updated: 2026-10-11
---

## Why

Hidden options are out of sight and out of mind: people use what they can see and rarely open a menu to discover what exists.

## Do / Don't

- **Do:** Show the full side nav on desktop and a bottom tab bar with up to five items on mobile.
- **Don't:** Put all sections behind a hamburger icon on a 1440 px screen.

## Evidence

Backing: 3 independent organisations across 6 quoted claims (1 expert, 2 study, 1 guideline, 2 experiment). Clusters: C0045.

- **GoodUI** (experiment, [goodui-leak-bol-discovers-something-better-than-classic-pulldown-menus-as-expected](https://goodui.org/leaks/bol-discovers-something-better-than-classic-pulldown-menus-as-expected/)): Expose menu options as clickable actions above results instead of hiding them in dropdown menus. Measured: Exposed menu options variant implemented; scored +0.5 repeatability as evidence pattern is getting better.
- **Apple** (study, [apple-wwdc2021-10126](https://developer.apple.com/videos/play/wwdc2021/10126/)): Avoid hamburger menus for primary navigation; use visible alternatives like tab bars so users see available sections.
- **Nielsen Norman Group** (guideline, [nngroup-menu-design](https://www.nngroup.com/articles/menu-design/)): Display navigation menus on larger screens; use hamburger menus only when space constraints require it.

## Check

At 1280 px wide, every top-level destination is visible without opening a menu.
