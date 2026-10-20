---
id: P0014
title: One primary action per view
rule: Give each view, dialog or form at most one primary (filled) button; every other action is secondary or tertiary.
layer: page
applies_to: [button, toolbar, dialog, form]
nodes: [atom/button, component/dialog, component/form, section/hero, section/cta]
strength: must
status: draft
shaan: [hub-0015]
papers: []
clusters: [C0282, C0019]
sources:
  - mobile-design-patterns | Make secondary actions recede visually to prevent accidental errors, even if users must search slightly longer to find them. (measured: Option A (link-style Cancel) achieved 100% success with zero errors; users valued preventing accidental cancellation over speed.) | https://www.lukew.com/ff/entry.asp?571
  - goodui-pattern-57 | Avoid offering a "Maybe Later" postponement option; remove it to increase signups and engagement. (measured: Maybe Later reduced signups 14.4% and engagement 27.8%) | https://goodui.org/patterns/57/
  - nhs-component-buttons | Use only one primary button per page to avoid reducing its impact and user clarity. | https://service-manual.nhs.uk/design-system/components/buttons
  - elastic-eui-empty-prompt | Stack primary actions first, then secondary actions as empty buttons in the actions array. | https://eui.elastic.co/docs/components/display/empty-prompt/
  - govuk-button | Use only one default button per page for the main call to action. | https://design-system.service.gov.uk/components/button/
  - deceptive-design-forced-action | Make rejection or skip options visually equal or more prominent than accept options; position them prominently, not hidden. | https://www.deceptive.design/types/forced-action
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Count elements styled as primary buttons per view or dialog: there is at most one.
updated: 2026-10-11
---

## Why

A single strong button tells people what to do next; two equal buttons make them stop and compare.

## Do / Don't

- **Do:** Make Save the only filled button and put Cancel and Export as quiet buttons; group extra actions in a split button (hub-0015).
- **Don't:** Show three filled buttons side by side in one toolbar.

## Evidence

Backing: 6 independent organisations across 10 quoted claims (2 expert, 6 experiment, 2 guideline). Clusters: C0282, C0019.

- **Luke Wroblewski** (experiment, [mobile-design-patterns](https://www.lukew.com/ff/entry.asp?571)): Make secondary actions recede visually to prevent accidental errors, even if users must search slightly longer to find them. Measured: Option A (link-style Cancel) achieved 100% success with zero errors; users valued preventing accidental cancellation over speed..
- **GoodUI** (experiment, [goodui-pattern-57](https://goodui.org/patterns/57/)): Avoid offering a "Maybe Later" postponement option; remove it to increase signups and engagement. Measured: Maybe Later reduced signups 14.4% and engagement 27.8%.
- **NHS** (guideline, [nhs-component-buttons](https://service-manual.nhs.uk/design-system/components/buttons)): Use only one primary button per page to avoid reducing its impact and user clarity.
- **Elastic** (guideline, [elastic-eui-empty-prompt](https://eui.elastic.co/docs/components/display/empty-prompt/)): Stack primary actions first, then secondary actions as empty buttons in the actions array.
- **GOV.UK** (expert, [govuk-button](https://design-system.service.gov.uk/components/button/)): Use only one default button per page for the main call to action.
- **deceptive.design** (expert, [deceptive-design-forced-action](https://www.deceptive.design/types/forced-action)): Make rejection or skip options visually equal or more prominent than accept options; position them prominently, not hidden.

## Check

Count elements styled as primary buttons per view or dialog: there is at most one.
