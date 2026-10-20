---
id: P0060
title: The default is the choice most people should make
rule: Preselect the option that serves most users best, because most people keep the default; never preselect an option that benefits the business at the user's cost.
layer: behaviour
applies_to: [form, settings, pricing, select]
nodes: [component/form, page/settings, component/select]
strength: must
status: draft
shaan: [hub-0012]
papers: [W04]
clusters: []
sources:
  - decisionlab-choice-overload-bias | Highlight defaults early in multi-step decisions; users deplete decision-making capacity and revert to defaults later. (measured: Default feature selection increases after earlier choices deplete mental resources) | https://thedecisionlab.com/biases/choice-overload-bias
  - goodui-pattern-119 | Preselect a default option in subscription or payment plan choices to increase sales conversions. | https://goodui.org/patterns/119/
  - growthdesign-uber-eats-scarcity | Set defaults that align with user values and product ethics; most users keep the default and avoid friction. | https://growth.design/case-studies/uber-eats-scarcity
  - apple-wwdc2024-10085 | Set sensible defaults automatically based on device hardware to reduce onboarding choices for players. | https://developer.apple.com/videos/play/wwdc2024/10085/
corpus:
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: For each defaulted control, the spec names why it is the best choice for most users; no paid option or marketing consent is preselected.
updated: 2026-10-11
---

## Why

Defaults win through effort, implied endorsement and loss aversion; that power is why they must point at the user's interest.

## Do / Don't

- **Do:** Default notification settings to the important events only and the date range to the last 30 days.
- **Don't:** Pre-tick a paid add-on or a marketing opt-in.

## Evidence

Backing: 4 independent organisations across 5 quoted claims (2 study, 2 experiment, 1 guideline).

- **The Decision Lab** (study, [decisionlab-choice-overload-bias](https://thedecisionlab.com/biases/choice-overload-bias)): Highlight defaults early in multi-step decisions; users deplete decision-making capacity and revert to defaults later. Measured: Default feature selection increases after earlier choices deplete mental resources.
- **GoodUI** (experiment, [goodui-pattern-119](https://goodui.org/patterns/119/)): Preselect a default option in subscription or payment plan choices to increase sales conversions.
- **growth.design** (study, [growthdesign-uber-eats-scarcity](https://growth.design/case-studies/uber-eats-scarcity)): Set defaults that align with user values and product ethics; most users keep the default and avoid friction.
- **Apple** (guideline, [apple-wwdc2024-10085](https://developer.apple.com/videos/play/wwdc2024/10085/)): Set sensible defaults automatically based on device hardware to reduce onboarding choices for players.

Defaults are powerful enough to be abused; the ethical line is P0064.

## Check

For each defaulted control, the spec names why it is the best choice for most users; no paid option or marketing consent is preselected.
