---
id: P0068
title: First run reaches value fast; teach in context, not upfront
rule: Get new users to their first real result in as few steps as possible, skip upfront tutorials, and give guidance at the moment it is needed, introducing features one at a time.
layer: behaviour
applies_to: [onboarding, empty-state, checklist, tooltip]
nodes: [page/onboarding-flow, section/onboarding, component/empty]
strength: must
status: draft
shaan: [hub-0012]
papers: [W04]
clusters: [C0027, C0159, C0237, C0073, C0158]
sources:
  - facebook-7-friends-10-days | Compress time-to-first-value to under 5 minutes for elite products; industry median is 36 hours. (measured: Elite SaaS products deliver first value in under 5 minutes vs. 36-hour industry median) | https://www.koji.so/docs/aha-moment-research
  - growthdesign-brave-browser-onboarding | Deliver value before requesting major commitments; users reciprocate after experiencing benefits. | https://growth.design/case-studies/brave-browser-onboarding
  - wcag-help | Provide context-sensitive help that is obvious and accessible when users need it during a task. | https://www.w3.org/WAI/WCAG22/Understanding/help
  - laws-of-ux | Design without assumption users will read documentation; make interfaces self-explanatory. | https://lawsofux.com/
  - nngroup-recognition-and-recall | Use contextual tips paired to the current page instead of generic tutorials to help users recognize available actions. | https://www.nngroup.com/articles/recognition-and-recall/
  - apple-wwdc2019-802 | Remove obstacles to getting started; focus on effortless entry to core functionality. | https://developer.apple.com/videos/play/wwdc2019/802/
corpus:
  - siso-ui-code/types.jsonl | section/onboarding: 515 parts (mean 2.87): clean rates 3.26 vs dark 2.62; entrance motion 3.42 vs none 2.52 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/empty: 425 parts (mean 2.51): clean rates 3.07 vs minimal 2.11; micro motion 3.65 vs none 2.35 (model-rated) | 2026-10-11
check: Count steps from signup to the first meaningful result: the spec states the number and it is minimal; there is no forced multi-step tour.
updated: 2026-10-11
---

## Why

People want to act, not read; upfront tours are skipped and forgotten, while help at the point of need is remembered because it is used at once.

## Do / Don't

- **Do:** Open a new workspace with sample data and one prompt: Connect your first source.
- **Don't:** Show a ten-slide product tour before the first screen.

## Evidence

Backing: 7 independent organisations across 17 quoted claims (9 expert, 6 guideline, 2 study). Clusters: C0027, C0159, C0237, C0073, C0158.

- **Meta** (study, [facebook-7-friends-10-days](https://www.koji.so/docs/aha-moment-research)): Compress time-to-first-value to under 5 minutes for elite products; industry median is 36 hours. Measured: Elite SaaS products deliver first value in under 5 minutes vs. 36-hour industry median.
- **growth.design** (study, [growthdesign-brave-browser-onboarding](https://growth.design/case-studies/brave-browser-onboarding)): Deliver value before requesting major commitments; users reciprocate after experiencing benefits.
- **W3C** (guideline, [wcag-help](https://www.w3.org/WAI/WCAG22/Understanding/help)): Provide context-sensitive help that is obvious and accessible when users need it during a task.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-of-ux](https://lawsofux.com/)): Design without assumption users will read documentation; make interfaces self-explanatory.
- **Nielsen Norman Group** (expert, [nngroup-recognition-and-recall](https://www.nngroup.com/articles/recognition-and-recall/)): Use contextual tips paired to the current page instead of generic tutorials to help users recognize available actions.
- **Apple** (expert, [apple-wwdc2019-802](https://developer.apple.com/videos/play/wwdc2019/802/)): Remove obstacles to getting started; focus on effortless entry to core functionality.

## Check

Count steps from signup to the first meaningful result: the spec states the number and it is minimal; there is no forced multi-step tour.
