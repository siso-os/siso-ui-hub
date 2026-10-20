---
id: P0042
title: Every action gets feedback, sized to what happened
rule: Show a visible result for every action, scaled to its weight: an inline change for small edits, a toast for background results, a page message for big outcomes; save automatically where you can.
layer: state
applies_to: [button, toast, inline-status, form]
nodes: [atom/button, component/toast, component/form]
strength: should
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0069, C0082]
sources:
  - laws-ux-doherty-threshold | Use animation to engage users visually during loading or background processing. | https://lawsofux.com/doherty-threshold/
  - shneiderman-eight-rules | Provide interface feedback for every user action, scaled to the significance of that action. | https://www.cs.umd.edu/~ben/goldenrules.html
  - checkbox-radio-design | Make toggle switches deliver results immediately without requiring users to click Save or Submit. | https://www.nngroup.com/articles/toggle-switch-guidelines/
  - govuk-intro-designing-services | Update all views instantly when users change details; consistency across all parts builds trust. | https://www.gov.uk/service-manual/design/introduction-designing-government-services
  - growthdesign-headspace-user-onboarding | Use loading time to add value and help users transition, not just show a spinner. | https://growth.design/case-studies/headspace-user-onboarding
  - apple-wwdc2017-802 | Provide immediate, clear, and understandable feedback for all user actions to build confidence and prevent errors. | https://developer.apple.com/videos/play/wwdc2017/802/
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Perform each action type: a visible change appears within 100 ms near the control, and no routine action opens a modal.
updated: 2026-10-11
---

## Why

Without feedback people repeat the action or doubt it happened; feedback larger than the event is noise.

## Do / Don't

- **Do:** Tick a checkbox and see the row update in place with a quiet Saved marker.
- **Don't:** Pop a modal for a routine save, or save silently with no sign.

## Evidence

Backing: 6 independent organisations across 8 quoted claims (4 guideline, 4 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0069, C0082.

- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-doherty-threshold](https://lawsofux.com/doherty-threshold/)): Use animation to engage users visually during loading or background processing.
- **Ben Shneiderman** (guideline, [shneiderman-eight-rules](https://www.cs.umd.edu/~ben/goldenrules.html)): Provide interface feedback for every user action, scaled to the significance of that action.
- **Nielsen Norman Group** (guideline, [checkbox-radio-design](https://www.nngroup.com/articles/toggle-switch-guidelines/)): Make toggle switches deliver results immediately without requiring users to click Save or Submit.
- **GOV.UK** (guideline, [govuk-intro-designing-services](https://www.gov.uk/service-manual/design/introduction-designing-government-services)): Update all views instantly when users change details; consistency across all parts builds trust.
- **growth.design** (expert, [growthdesign-headspace-user-onboarding](https://growth.design/case-studies/headspace-user-onboarding)): Use loading time to add value and help users transition, not just show a spinner.
- **Apple** (expert, [apple-wwdc2017-802](https://developer.apple.com/videos/play/wwdc2017/802/)): Provide immediate, clear, and understandable feedback for all user actions to build confidence and prevent errors.

## Check

Perform each action type: a visible change appears within 100 ms near the control, and no routine action opens a modal.
