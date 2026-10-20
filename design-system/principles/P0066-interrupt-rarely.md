---
id: P0066
title: Interrupt rarely: notify only when it matters to the user
rule: Send a notification only when it is urgent or clearly valuable to the user, let them choose what they get, and collect the rest in one bell (hub-0015).
layer: behaviour
applies_to: [notification, toast, bell, email]
nodes: [component/inbox, component/toast, section/top-bar]
strength: must
status: draft
shaan: [hub-0015]
papers: [W04]
clusters: [C0156, C0232, C0138, C0255]
sources:
  - push-notification-timing | Avoid delivering notifications with hyper-precise timing as excessive precision can reduce user receptivity and feel intrusive. (measured: Inverted-U relationship between temporal precision and user responsiveness) | https://english.phbs.pku.edu.cn/info/3882/48902.htm
  - growthdesign-clubhouse-user-retention | Avoid sending notifications unrelated to user interests or follows; this triggers reactance and prompts users to disable all notifications permanently. (figure: 20+ notifications daily unrelated to user interests caused users to disable notifications entirely) | https://growth.design/case-studies/clubhouse-user-retention
  - decisionlab-decision-fatigue | Schedule critical decisions and important meetings early in the day, before cognitive resources deplete. | https://thedecisionlab.com/biases/decision-fatigue
  - nngroup-smartwatch-interactions | Time smartwatch suggestions precisely to context; poorly timed suggestions are useless even if contextually relevant. | https://www.nngroup.com/articles/smartwatch-interactions/
  - apple-wwdc2017-817 | Send notifications only when your app has important information, never to boost traffic or engagement. | https://developer.apple.com/videos/play/wwdc2017/817/
  - uber-design-principles | Respect the user's primary task and never demand attention at moments when they cannot focus. | https://principles.design/examples/uber-design-principles
corpus:
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/top-bar: 318 parts (mean 2.77): clean rates 3.28 vs minimal 2.44; micro motion 2.94 vs none 2.48 (model-rated) | 2026-10-11
check: List notification types: each has a stated user value, an off switch in settings, and only urgent types interrupt; the rest land in the bell.
updated: 2026-10-11
---

## Why

Every interruption costs attention and focus to recover; frequent low-value alerts teach people to ignore or disable all of them.

## Do / Don't

- **Do:** Notify on a failed payment; batch comments into a daily digest by default.
- **Don't:** Push a notification for every new feature or every like.

## Evidence

Backing: 8 independent organisations across 9 quoted claims (4 expert, 2 guideline, 3 study). Clusters: C0156, C0232, C0138, C0255.

- **University of Copenhagen / MIT Media Lab** (study, [push-notification-timing](https://english.phbs.pku.edu.cn/info/3882/48902.htm)): Avoid delivering notifications with hyper-precise timing as excessive precision can reduce user receptivity and feel intrusive. Measured: Inverted-U relationship between temporal precision and user responsiveness.
- **growth.design** (expert, [growthdesign-clubhouse-user-retention](https://growth.design/case-studies/clubhouse-user-retention)): Avoid sending notifications unrelated to user interests or follows; this triggers reactance and prompts users to disable all notifications permanently. Figure: 20+ notifications daily unrelated to user interests caused users to disable notifications entirely.
- **The Decision Lab** (study, [decisionlab-decision-fatigue](https://thedecisionlab.com/biases/decision-fatigue)): Schedule critical decisions and important meetings early in the day, before cognitive resources deplete.
- **Nielsen Norman Group** (study, [nngroup-smartwatch-interactions](https://www.nngroup.com/articles/smartwatch-interactions/)): Time smartwatch suggestions precisely to context; poorly timed suggestions are useless even if contextually relevant.
- **Apple** (guideline, [apple-wwdc2017-817](https://developer.apple.com/videos/play/wwdc2017/817/)): Send notifications only when your app has important information, never to boost traffic or engagement.
- **Uber** (guideline, [uber-design-principles](https://principles.design/examples/uber-design-principles)): Respect the user's primary task and never demand attention at moments when they cannot focus.

## Check

List notification types: each has a stated user value, an off switch in settings, and only urgent types interrupt; the rest land in the bell.
