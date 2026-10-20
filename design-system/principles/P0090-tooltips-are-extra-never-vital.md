---
id: P0090
title: Tooltips add detail; they never hold what you need
rule: Use a tooltip for a short definition or detail, never for required information; open it on keyboard focus as well as hover, close it on Escape, and keep focus on its trigger.
layer: atom
applies_to: [any:overlay]
nodes: [atom/tooltip, component/field, component/chart]
strength: must
status: draft
shaan: [hub-0001]
papers: []
clusters: [C0005, C0007, C0187, C0205, C0740, C1329, C1788, C1823]
sources:
  - tooltip-help-text-best-practices | Don't put vital task information in tooltips; use persistent labels for field requirements. | https://www.nngroup.com/articles/tooltip-guidelines/
  - tooltip-help-text-best-practices | Write brief, helpful tooltip text that adds value; omit tooltips with obvious or redundant content. | https://www.nngroup.com/articles/tooltip-guidelines/
  - tooltip-help-text-best-practices | Support tooltip activation via keyboard focus as well as mouse hover. | https://www.nngroup.com/articles/tooltip-guidelines/
  - aria-tooltip | Dismiss tooltips when Escape is pressed or cursor leaves the trigger element and tooltip. | https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
  - aria-tooltip | Keep focus on the triggering element while the tooltip displays. | https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
  - baymard-product-spec-sheet | Define jargon and technical terms with tooltips or inline microcopy to help all users, not just domain experts. | https://baymard.com/blog/product-spec-sheet-ux-design
  - goodui-pattern-111 | Add explanatory tooltips or field descriptions to clarify form inputs and reduce friction. | https://goodui.org/patterns/111/
  - uswds-template-forms | Avoid disabled form states; use helper text, tooltips and inline validation instead. | https://designsystem.digital.gov/templates/form-templates/
corpus:
  - siso-ui-code/types.jsonl | component/field: 13,676 parts (mean 2.3): 3d rates 3.56 vs light 2.08; entrance motion 3.24 vs none 2.04 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated) | 2026-10-11
check: Every tooltip trigger is focusable and shows the tooltip on focus; Escape closes it; no required-field rule appears only in a tooltip.
updated: 2026-10-12
---

## Why

A tooltip is invisible until someone thinks to look for it, and touch users may never see it; anything needed to finish the task must sit on the page.

## Do / Don't

- **Do:** Put a dotted underline on "APR" that explains it on hover or focus, with the password rules shown under the field.
- **Don't:** Put "Password must be 12 characters" only in a tooltip on an info icon.

## Evidence

Backing: 5 independent organisations across 8 quoted claims (1 experiment, 6 guideline, 1 study). Clusters: C0005, C0007, C0187, C0205, C0740, C1329, C1788, C1823.

GoodUI publishes its effect sizes behind a paywall, so the GoodUI lines here give the direction of the result without a number.

- **Nielsen Norman Group** (guideline, [tooltip-help-text-best-practices](https://www.nngroup.com/articles/tooltip-guidelines/)): Don't put vital task information in tooltips; use persistent labels for field requirements.
- **Nielsen Norman Group** (guideline, [tooltip-help-text-best-practices](https://www.nngroup.com/articles/tooltip-guidelines/)): Write brief, helpful tooltip text that adds value; omit tooltips with obvious or redundant content.
- **Nielsen Norman Group** (guideline, [tooltip-help-text-best-practices](https://www.nngroup.com/articles/tooltip-guidelines/)): Support tooltip activation via keyboard focus as well as mouse hover.
- **W3C** (guideline, [aria-tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)): Dismiss tooltips when Escape is pressed or cursor leaves the trigger element and tooltip.
- **W3C** (guideline, [aria-tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)): Keep focus on the triggering element while the tooltip displays.
- **Baymard Institute** (study, [baymard-product-spec-sheet](https://baymard.com/blog/product-spec-sheet-ux-design)): Define jargon and technical terms with tooltips or inline microcopy to help all users, not just domain experts.
- **GoodUI** (experiment, [goodui-pattern-111](https://goodui.org/patterns/111/)): Add explanatory tooltips or field descriptions to clarify form inputs and reduce friction.
- **USWDS** (guideline, [uswds-template-forms](https://designsystem.digital.gov/templates/form-templates/)): Avoid disabled form states; use helper text, tooltips and inline validation instead.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- component/field: 13,676 parts (mean 2.3): 3d rates 3.56 vs light 2.08; entrance motion 3.24 vs none 2.04 (model-rated)
- component/chart: 3,107 parts (mean 2.79): monochrome rates 3.68 vs minimal 2.63; interactive motion 3.33 vs none 2.62 (model-rated)

## Check

Every tooltip trigger is focusable and shows the tooltip on focus; Escape closes it; no required-field rule appears only in a tooltip.
