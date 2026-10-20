---
id: P0001
title: Every control has all its states
rule: Anything you can click or type into draws rest, hover, keyboard focus, pressed and disabled as five visibly different looks, all from tokens.
layer: atom
applies_to: [button, link, nav-item, row, input, toggle, tab, chip]
nodes: [atom/button, atom/link, atom/choice, atom/switch, atom/slider, atom/text-input, component/select, component/picker]
strength: must
status: draft
shaan: [hub-0013, hub-0014]
papers: [W01]
sources:
  - material-3 | every interactive element shows state as a tinted layer over its rest colour (hover, focus, pressed, dragged) | https://m3.material.io/foundations/interaction/states/overview
  - wcag-2.2 | 2.4.7 Focus Visible (AA): any keyboard-operable control shows where focus is | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
  - nng | 0.1 s is the limit for a response to feel instant | https://www.nngroup.com/articles/response-times-3-important-limits/
corpus:
  - siso-ui-code/types.jsonl | parts with no motion rate 2.25 (n=54,913); parts that respond to interaction rate 3.30 (n=9,139) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
check: Tab through the page and hover each control; each shows a visible change. A script finds every interactive element and confirms it has hover, focus-visible, active and disabled styles drawn from tokens.
updated: 2026-10-11
---

## Why

A control that doesn't change under the pointer looks broken or dead. Focus that can't be seen locks out keyboard users. Per hub-0013, feedback lands in under 100 ms; this rule says which states must exist.

## Do / Don't

- **Do:** tint the rest colour for hover (per hub-0014: a tint, not a solid fill), draw a focus ring only for keyboard focus, and shrink pressed controls to about 98% (hub-0013).
- **Don't:** use `outline: none` without a replacement, rely on hover alone for anything a touch user needs, or hard-code a state colour.

## Evidence

- **Material 3** draws every state as a translucent layer of the content colour over the rest colour, so one token set covers hover, focus and pressed for every control.
- **WCAG 2.2, 2.4.7** makes visible keyboard focus a Level AA requirement.
- **NN/g** puts the threshold for "instant" at 0.1 s; past that, the click feels uncertain.
- **Our corpus:** among 102,533 typed parts, those that respond to interaction rate about one point higher than static ones (3.30 vs 2.25). The ratings are the classifier's, so read this as support, not proof.

## Check

Tab through and hover every control on the page. Each shows a change. `uihub check` (once wired) counts interactive elements missing `:hover`, `:focus-visible`, `:active` or `[disabled]` styles.
