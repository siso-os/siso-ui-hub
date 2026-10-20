---
id: P0043
title: Motion is short and eased, scaled to distance
rule: Animate with ease-out for entrances and ease-in for exits, at the durations of hub-0013 (entrances 150 to 250 ms, exits 100 to 150 ms, hover under 100 ms), longer only for larger or further moves.
layer: motion
applies_to: [transition, sheet, popover, toast, hover]
nodes: [component/sheet, component/popover, component/toast, component/dialog]
strength: should
status: draft
shaan: [hub-0013]
papers: []
clusters: [C0040, C0097, C0182]
sources:
  - carbon-motion-choreography | Stagger entrance animations by 20ms increments; keep total animation time under 500ms to reduce cognitive load. (figure: 20ms stagger reduces cognitive load; total time must stay under 500ms) | https://carbondesignsystem.com/elements/motion/choreography/
  - nngroup-button-states-communicate-interaction | Display focus state within 100–150ms using a stroke or outline, never color alone, to meet accessibility standards. (figure: 100–150ms response time prevents users from tabbing repeatedly and missing buttons) | https://www.nngroup.com/articles/button-states-communicate-interaction/
  - fluent-motion | Use staggered animation with short offsets to soften entry of large item sets and guide visual attention. | https://fluent2.microsoft.design/motion
  - apple-wwdc2025-337 | Design symbol paths with draw direction intention: left-to-right for motion, right-to-left for Arabic, center for symmetry. | https://developer.apple.com/videos/play/wwdc2025/337/
  - emil-kowalski-design-philosophy | Choose ease-out easing for enter animations, not ease-in. | https://github.com/emilkowalski/skills
  - cubic-bezier-easing-guide | Use ease-out for elements entering the screen; they arrive fast and settle gently, feeling responsive. | https://flaviocopes.com/css-easing-cubic-bezier/
corpus:
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
check: List transitions and animations in computed styles: durations fall in the hub-0013 ranges and none use linear easing for movement.
updated: 2026-10-11
---

## Why

Easing mimics physical acceleration so motion reads as natural; short durations keep the interface feeling responsive.

## Do / Don't

- **Do:** Slide a side sheet in over 200 ms ease-out and out over 120 ms ease-in.
- **Don't:** Use linear 600 ms transitions on menus.

## Evidence

Backing: 6 independent organisations across 20 quoted claims (6 expert, 14 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0040, C0097, C0182.

- **IBM** (guideline, [carbon-motion-choreography](https://carbondesignsystem.com/elements/motion/choreography/)): Stagger entrance animations by 20ms increments; keep total animation time under 500ms to reduce cognitive load. Figure: 20ms stagger reduces cognitive load; total time must stay under 500ms.
- **Nielsen Norman Group** (guideline, [nngroup-button-states-communicate-interaction](https://www.nngroup.com/articles/button-states-communicate-interaction/)): Display focus state within 100–150ms using a stroke or outline, never color alone, to meet accessibility standards. Figure: 100–150ms response time prevents users from tabbing repeatedly and missing buttons.
- **Microsoft** (guideline, [fluent-motion](https://fluent2.microsoft.design/motion)): Use staggered animation with short offsets to soften entry of large item sets and guide visual attention.
- **Apple** (guideline, [apple-wwdc2025-337](https://developer.apple.com/videos/play/wwdc2025/337/)): Design symbol paths with draw direction intention: left-to-right for motion, right-to-left for Arabic, center for symmetry.
- **Emil Kowalski** (expert, [emil-kowalski-design-philosophy](https://github.com/emilkowalski/skills)): Choose ease-out easing for enter animations, not ease-in.
- **Flavio Copes** (expert, [cubic-bezier-easing-guide](https://flaviocopes.com/css-easing-cubic-bezier/)): Use ease-out for elements entering the screen; they arrive fast and settle gently, feeling responsive.

House rule: the exact durations are Shaan's (hub-0013) and win. The research agrees on the shape (ease-out to enter, IBM keeps total motion under 500 ms) but no source in the library measures the best duration.

## Check

List transitions and animations in computed styles: durations fall in the hub-0013 ranges and none use linear easing for movement.
