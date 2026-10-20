---
id: P0062
title: Show progress toward a goal
rule: Show progress for any multi-step task or goal, start people with credit for steps already done, and keep the next step visible; progress shown must be true.
layer: behaviour
applies_to: [progress-bar, checklist, onboarding, stepper]
nodes: [component/steps, page/onboarding-flow, atom/progress]
strength: must
status: draft
shaan: [hub-0009]
papers: [W04]
clusters: [C0070, C0094]
sources:
  - duolingo-streak-retention | Use streak mechanics to drive daily habit formation; users reaching 7-day streaks show significantly higher retention. (measured: 2.4x higher Day-1 retention for users with 7+ day streaks) | https://blog.duolingo.com/improving-the-streak/
  - skinner-ferster-variable-ratio | Reinforce behavior continuously during early learning; switch to partial reinforcement once the habit is established. | https://simplypsychology.org/schedules-of-reinforcement.html
  - laws-ux-zeigarnik-effect | Provide artificial progress toward a goal to motivate users to complete tasks. | https://lawsofux.com/zeigarnik-effect/
  - growthdesign-duolingo-user-retention | Use progress bars and streaks to leverage the Zeigarnik Effect; uncompleted tasks stay top-of-mind and guide user behavior. | https://growth.design/case-studies/duolingo-user-retention
check: Every multi-step flow shows step n of N or a checklist; the shown progress matches completed steps in the data.
updated: 2026-10-11
---

## Why

Effort rises as a goal gets closer (goal-gradient), and unfinished tasks stay on the mind (Zeigarnik); visible progress uses both.

## Do / Don't

- **Do:** Show a setup checklist at 2 of 5 with the account already counted as done.
- **Don't:** Show a fake progress bar that jumps to 90% and stalls.

## Evidence

Backing: 4 independent organisations across 8 quoted claims (2 guideline, 1 experiment, 3 study, 2 expert). Clusters: C0070, C0094.

- **Duolingo** (experiment, [duolingo-streak-retention](https://blog.duolingo.com/improving-the-streak/)): Use streak mechanics to drive daily habit formation; users reaching 7-day streaks show significantly higher retention. Measured: 2.4x higher Day-1 retention for users with 7+ day streaks.
- **Operant Conditioning** (study, [skinner-ferster-variable-ratio](https://simplypsychology.org/schedules-of-reinforcement.html)): Reinforce behavior continuously during early learning; switch to partial reinforcement once the habit is established.
- **Laws of UX (Jon Yablonski)** (study, [laws-ux-zeigarnik-effect](https://lawsofux.com/zeigarnik-effect/)): Provide artificial progress toward a goal to motivate users to complete tasks.
- **growth.design** (guideline, [growthdesign-duolingo-user-retention](https://growth.design/case-studies/duolingo-user-retention)): Use progress bars and streaks to leverage the Zeigarnik Effect; uncompleted tasks stay top-of-mind and guide user behavior.

## Check

Every multi-step flow shows step n of N or a checklist; the shown progress matches completed steps in the data.
