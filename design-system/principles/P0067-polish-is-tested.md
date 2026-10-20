---
id: P0067
title: Polish matters, and it is tested
rule: Invest in visual polish because people judge quality and usability by it within moments, but check that each visual change does not cost speed or task success.
layer: behaviour
applies_to: [page, landing, app-shell]
nodes: [page/home, section/nav, section/shell, page/dashboard]
strength: must
status: draft
shaan: [hub-0014]
papers: [W02, W04]
clusters: [C0059, C0077]
sources:
  - google-users-simple-familiar | Design websites with low visual complexity and high prototypicality to maximize initial beauty perception. (measured: Users form aesthetic judgments in 17–50 milliseconds; negative first impressions reduce satisfaction) | https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/
  - laws-ux-aesthetic-usability | Apply aesthetically pleasing design; it creates positive perception and increases perceived usability. (measured: Users with aesthetically pleasing design showed stronger correlation between aesthetic appeal and perceived ease of use than actual ease of use (Kurosu & Kashimura, 1995, n=252).) | https://lawsofux.com/aesthetic-usability-effect/
  - nngroup-powers-of-10 | Deliver visual impressions in under 50 milliseconds; users form rough design judgments in this window. (measured: 50 ms (0.05 seconds) is sufficient for users to distinguish attractive from unattractive designs) | https://www.nngroup.com/articles/powers-of-10-time-scales-in-ux/
  - tognazzini-first-principles | Ensure visual design improvements do not harm productivity, learnability, or satisfaction through user testing. | https://asktog.com/atc/principles-of-interaction-design/
corpus:
  - siso-ui-code/types.jsonl | section/nav: 1,164 parts (mean 2.92): editorial rates 3.76 vs minimal 2.55; interactive motion 3.74 vs none 2.47 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/shell: 996 parts (mean 2.69): light rates 3.03 vs minimal 2.52; micro motion 2.83 vs interactive 2.6 (model-rated) | 2026-10-11
check: The page uses only token values (no ad-hoc colours or sizes); a visual redesign has a before and after task test.
updated: 2026-10-11
---

## Why

People form an aesthetic judgement of a screen in about 50 ms, and attractive interfaces are perceived as easier to use (aesthetic-usability effect); the same effect can hide real usability faults.

## Do / Don't

- **Do:** Use real type, real icons and consistent spacing from tokens, then run the task test after a visual refresh.
- **Don't:** Ship a redesign because it looks better without checking task completion.

## Evidence

Backing: 4 independent organisations across 7 quoted claims (2 experiment, 4 study, 1 guideline). Clusters: C0059, C0077.

- **Google** (experiment, [google-users-simple-familiar](https://research.google/blog/users-love-simple-and-familiar-designs-why-websites-need-to-make-a-great-first-impression/)): Design websites with low visual complexity and high prototypicality to maximize initial beauty perception. Measured: Users form aesthetic judgments in 17–50 milliseconds; negative first impressions reduce satisfaction.
- **Laws of UX (Jon Yablonski)** (study, [laws-ux-aesthetic-usability](https://lawsofux.com/aesthetic-usability-effect/)): Apply aesthetically pleasing design; it creates positive perception and increases perceived usability. Measured: Users with aesthetically pleasing design showed stronger correlation between aesthetic appeal and perceived ease of use than actual ease of use (Kurosu & Kashimura, 1995, n=252)..
- **Nielsen Norman Group** (study, [nngroup-powers-of-10](https://www.nngroup.com/articles/powers-of-10-time-scales-in-ux/)): Deliver visual impressions in under 50 milliseconds; users form rough design judgments in this window. Measured: 50 ms (0.05 seconds) is sufficient for users to distinguish attractive from unattractive designs.
- **Bruce Tognazzini** (guideline, [tognazzini-first-principles](https://asktog.com/atc/principles-of-interaction-design/)): Ensure visual design improvements do not harm productivity, learnability, or satisfaction through user testing.

## Check

The page uses only token values (no ad-hoc colours or sizes); a visual redesign has a before and after task test.
