---
id: P0045
title: Motion explains a change; it never competes for attention
rule: Animate only to show where something came from, went to or changed into; never run several competing animations at once or loop decoration in a work area.
layer: motion
applies_to: [transition, animation, toast, chart]
nodes: [component/toast, component/chart, component/table]
strength: should
status: draft
shaan: [hub-0013]
papers: []
clusters: [C0183, C0029, C0176]
sources:
  - rovo-ui-atlassian-ai-components | Use motion to bring clarity and character to AI experiences, showing users when content is being generated. | https://atlassian.design/rovo-ui
  - laws-ux-doherty-threshold | Use animation to engage users visually during loading or background processing. | https://lawsofux.com/doherty-threshold/
  - fluent-motion | Use motion to identify the next step, inform people of changes, and celebrate accomplishments. | https://fluent2.microsoft.design/motion
  - openai-chatgpt-plugin-ui-guidelines | Use display modes only when visual interaction improves the workflow. | https://developers.openai.com/plugins/concepts/ui-guidelines
  - airbnb-design-language | Use motion to communicate with users in ways that are easily understood and natural. | https://principles.design/examples/airbnb-design-principles
  - apple-wwdc2019-211 | Eliminate latency and remove overstimulation by minimizing animations, icons, images, and text styles that compete for attention. | https://developer.apple.com/videos/play/wwdc2019/211/
corpus:
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
check: Record the page loading and idling for 10 s: after load, nothing moves unless data changed or the user acted.
updated: 2026-10-11
---

## Why

Motion grabs attention involuntarily. Used for change it guides the eye; used for decoration it pulls attention away from the task.

## Do / Don't

- **Do:** Animate a new row sliding into a list so people see where it landed.
- **Don't:** Pulse every KPI tile or animate several widgets at once on load.

## Evidence

Backing: 7 independent organisations across 10 quoted claims (6 guideline, 4 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0183, C0029, C0176.

- **Atlassian** (guideline, [rovo-ui-atlassian-ai-components](https://atlassian.design/rovo-ui)): Use motion to bring clarity and character to AI experiences, showing users when content is being generated.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-doherty-threshold](https://lawsofux.com/doherty-threshold/)): Use animation to engage users visually during loading or background processing.
- **Microsoft** (guideline, [fluent-motion](https://fluent2.microsoft.design/motion)): Use motion to identify the next step, inform people of changes, and celebrate accomplishments.
- **OpenAI** (guideline, [openai-chatgpt-plugin-ui-guidelines](https://developers.openai.com/plugins/concepts/ui-guidelines)): Use display modes only when visual interaction improves the workflow.
- **Airbnb** (expert, [airbnb-design-language](https://principles.design/examples/airbnb-design-principles)): Use motion to communicate with users in ways that are easily understood and natural.
- **Apple** (expert, [apple-wwdc2019-211](https://developer.apple.com/videos/play/wwdc2019/211/)): Eliminate latency and remove overstimulation by minimizing animations, icons, images, and text styles that compete for attention.

## Check

Record the page loading and idling for 10 s: after load, nothing moves unless data changed or the user acted.
