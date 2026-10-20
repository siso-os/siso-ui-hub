---
id: P0039
title: Errors say what happened and how to fix it, in plain words
rule: Write every error in plain language: what happened, why if known, and what to do next; never show a raw code alone, never blame the user.
layer: state
applies_to: [error, toast, form, widget, page]
nodes: [component/alert, component/toast, component/form]
strength: should
status: draft
shaan: [hub-0009, hub-0006]
papers: [W03]
clusters: [C0006, C0167, C0168, C0205]
sources:
  - elastic-eui-error-messages | Translate error codes into plain language for users; avoid showing raw codes like '504' without explanation. | https://eui.elastic.co/docs/patterns/error-messages/
  - ibm-carbon-empty-states-pattern | Use plain language in error empty states to help users diagnose and recover. | https://carbondesignsystem.com/patterns/empty-states-pattern/
  - accessibility-heuristics-principles | Write error messages in plain language that tells users exactly what is wrong and how to fix it. | https://abstracta.us/blog/accessibility-testing/accessibility-heuristic
  - govuk-error-message | Explain what went wrong and how to fix it in every error message. | https://design-system.service.gov.uk/components/error-message/
  - nhs-component-error-message | Explain what went wrong and how to fix it in every error message. | https://service-manual.nhs.uk/design-system/components/error-message
  - nngroup-error-message-communication | Use human-readable language in error messages to communicate effectively. | https://www.nngroup.com/videos/error-message-communication-guidelines/
corpus:
  - siso-ui-code/types.jsonl | component/alert: 6,269 parts (mean 2.37): neon-glow rates 3.09 vs minimal 2.19; interactive motion 3.33 vs none 2 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Trigger each error path: the message names the problem in words, offers a next action, and no message consists only of a code.
updated: 2026-10-11
---

## Why

An error is the moment trust is most at risk; a clear cause and a next step let people recover, while codes and blame leave them stuck.

## Do / Don't

- **Do:** Write Could not load revenue: the billing service is not responding. Retry, with the code in a details line.
- **Don't:** Show Error 504 or Invalid input with no next step.

## Evidence

Backing: 8 independent organisations across 17 quoted claims (12 guideline, 5 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0006, C0167, C0168, C0205.

- **Elastic** (guideline, [elastic-eui-error-messages](https://eui.elastic.co/docs/patterns/error-messages/)): Translate error codes into plain language for users; avoid showing raw codes like '504' without explanation.
- **IBM** (guideline, [ibm-carbon-empty-states-pattern](https://carbondesignsystem.com/patterns/empty-states-pattern/)): Use plain language in error empty states to help users diagnose and recover.
- **Abstracta** (guideline, [accessibility-heuristics-principles](https://abstracta.us/blog/accessibility-testing/accessibility-heuristic)): Write error messages in plain language that tells users exactly what is wrong and how to fix it.
- **GOV.UK** (guideline, [govuk-error-message](https://design-system.service.gov.uk/components/error-message/)): Explain what went wrong and how to fix it in every error message.
- **NHS** (guideline, [nhs-component-error-message](https://service-manual.nhs.uk/design-system/components/error-message)): Explain what went wrong and how to fix it in every error message.
- **Nielsen Norman Group** (guideline, [nngroup-error-message-communication](https://www.nngroup.com/videos/error-message-communication-guidelines/)): Use human-readable language in error messages to communicate effectively.

## Check

Trigger each error path: the message names the problem in words, offers a next action, and no message consists only of a code.
