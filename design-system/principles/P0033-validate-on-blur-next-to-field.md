---
id: P0033
title: Validate on blur, next to the field, and keep what was typed
rule: Validate a field when the user leaves it, show the message next to that field, list all errors in a summary on submit, and never clear what the user typed.
layer: state
applies_to: [input, form, error-summary]
nodes: [atom/text-input, component/form, component/field]
strength: must
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0010, C0078, C0116]
sources:
  - goodui-pattern-5 | Position form labels above fields rather than inside or floating within them. (measured: 3 tests on signup and checkout across desktop/mobile) | https://goodui.org/patterns/5/
  - gestalt-visual-ui-design | Space form fields closer to their labels than to adjacent fields; equidistant gaps cause roughly 50% of users to pair them incorrectly. (measured: 50% error rate with equidistant label spacing) | https://jakobnielsenphd.substack.com/p/gestalt-principles
  - baymard-form-validation-inline | Provide specific error messages to increase form completion rate. (measured: 27% increase in form completion with specific error messages) | https://baymard.com/research-articles/inline-form-validation
  - carbon-pattern-forms | Validate form fields on blur (when focus leaves) using client-side validation to catch errors immediately and show inline error messages. | https://carbondesignsystem.com/patterns/forms-pattern
  - elastic-eui-error-messages | Show error summaries and highlight affected form fields for validation errors without losing user input. | https://eui.elastic.co/docs/patterns/error-messages/
  - wcag-error-identification | Describe input errors in text so users know what is wrong and how to identify the problematic field. | https://www.w3.org/WAI/WCAG22/Understanding/error-identification
corpus:
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/field: 13,676 parts (mean 2.3): 3d rates 3.56 vs light 2.08; entrance motion 3.24 vs none 2.04 (model-rated) | 2026-10-11
check: Type an invalid value and tab away: an error appears adjacent to the field and is linked with aria-describedby; submit with errors: a summary lists them and all values remain.
updated: 2026-10-11
---

## Why

Errors shown while typing interrupt; errors shown only after submit force a search. Feedback beside the field at the moment it is finished is easiest to act on.

## Do / Don't

- **Do:** Show Enter a date in the past under the date field after it loses focus, and link each summary item to its field.
- **Don't:** Flash red errors on the first keystroke or wipe the form after a failed submit.

## Evidence

Backing: 9 independent organisations across 18 quoted claims (14 guideline, 2 study, 1 experiment, 1 expert). Clusters: C0010, C0078, C0116.

- **GoodUI** (experiment, [goodui-pattern-5](https://goodui.org/patterns/5/)): Position form labels above fields rather than inside or floating within them. Measured: 3 tests on signup and checkout across desktop/mobile.
- **Nielsen Norman Group** (study, [gestalt-visual-ui-design](https://jakobnielsenphd.substack.com/p/gestalt-principles)): Space form fields closer to their labels than to adjacent fields; equidistant gaps cause roughly 50% of users to pair them incorrectly. Measured: 50% error rate with equidistant label spacing.
- **Baymard Institute** (study, [baymard-form-validation-inline](https://baymard.com/research-articles/inline-form-validation)): Provide specific error messages to increase form completion rate. Measured: 27% increase in form completion with specific error messages.
- **IBM** (guideline, [carbon-pattern-forms](https://carbondesignsystem.com/patterns/forms-pattern)): Validate form fields on blur (when focus leaves) using client-side validation to catch errors immediately and show inline error messages.
- **Elastic** (guideline, [elastic-eui-error-messages](https://eui.elastic.co/docs/patterns/error-messages/)): Show error summaries and highlight affected form fields for validation errors without losing user input.
- **W3C** (guideline, [wcag-error-identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification)): Describe input errors in text so users know what is wrong and how to identify the problematic field.

## Check

Type an invalid value and tab away: an error appears adjacent to the field and is linked with aria-describedby; submit with errors: a summary lists them and all values remain.
