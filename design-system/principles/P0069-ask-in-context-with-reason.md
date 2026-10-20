---
id: P0069
title: Ask for data and permissions in context, after value, with a reason
rule: Ask for personal data or a permission only when the feature needs it, after the user has seen value, and say why in one sentence; start with small asks.
layer: behaviour
applies_to: [permission, consent, form, onboarding]
nodes: [section/onboarding, component/form, component/dialog]
strength: must
status: draft
shaan: [hub-0009]
papers: [W04]
clusters: [C0088, C0241, C0051]
sources:
  - growthdesign-mine-trial-conversion | Build momentum by asking users to agree to small, easy tasks before making larger asks. | https://growth.design/case-studies/mine-trial-conversion
  - apple-wwdc26-250-principles-great-design | Ask for personal data only at the right moment with context, not on app launch before users understand the app. | https://developer.apple.com/videos/play/wwdc2026/250
  - nngroup-eas-framework-simplify-forms | Justify form questions to users, especially unexpected or sensitive ones, to build trust. | https://www.nngroup.com/articles/eas-framework-simplify-forms/
  - fogg-behavior-model | Ensure motivation, ability, and a prompt converge simultaneously for users to perform desired behaviors. | https://behaviormodel.org/
corpus:
  - siso-ui-code/types.jsonl | section/onboarding: 515 parts (mean 2.87): clean rates 3.26 vs dark 2.62; entrance motion 3.42 vs none 2.52 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
check: Each permission or sensitive-data prompt fires from a user action that needs it and includes a one-line reason.
updated: 2026-10-11
---

## Why

A request makes sense when its purpose is visible; people grant more after they get something, and a small yes makes the next one easier.

## Do / Don't

- **Do:** Ask for notification permission when the user turns on alerts, with one line on what they will get.
- **Don't:** Ask for location, contacts and notifications on first launch.

## Evidence

Backing: 4 independent organisations across 13 quoted claims (6 guideline, 6 expert, 1 study). Clusters: C0088, C0241, C0051.

- **growth.design** (study, [growthdesign-mine-trial-conversion](https://growth.design/case-studies/mine-trial-conversion)): Build momentum by asking users to agree to small, easy tasks before making larger asks.
- **Apple** (guideline, [apple-wwdc26-250-principles-great-design](https://developer.apple.com/videos/play/wwdc2026/250)): Ask for personal data only at the right moment with context, not on app launch before users understand the app.
- **Nielsen Norman Group** (guideline, [nngroup-eas-framework-simplify-forms](https://www.nngroup.com/articles/eas-framework-simplify-forms/)): Justify form questions to users, especially unexpected or sensitive ones, to build trust.
- **Stanford Behavior Design Lab** (guideline, [fogg-behavior-model](https://behaviormodel.org/)): Ensure motivation, ability, and a prompt converge simultaneously for users to perform desired behaviors.

## Check

Each permission or sensitive-data prompt fires from a user action that needs it and includes a one-line reason.
