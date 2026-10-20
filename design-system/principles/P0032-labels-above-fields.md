---
id: P0032
title: Labels sit above fields and never vanish
rule: Put a short visible label above every field, tied to it in code, and never use placeholder text as the only label.
layer: atom
applies_to: [input, select, textarea, form]
nodes: [atom/text-input, component/select, component/field, component/form]
strength: must
status: draft
shaan: []
papers: []
clusters: [C0007]
sources:
  - goodui-pattern-5 | Position form labels above fields rather than inside or floating within them. (measured: 3 tests on signup and checkout across desktop/mobile) | https://goodui.org/patterns/5/
  - nngroup-required-fields | Use an asterisk before or at the beginning of field labels in red to aid visual scanning on longer forms. | https://www.nngroup.com/articles/required-fields/
  - carbon-dropdown | Do not remove label text from dropdowns in favor of placeholder text; labels are always strongly encouraged. | https://carbondesignsystem.com/components/dropdown/usage/
  - govuk-text-input | Always provide visible labels above text inputs, not placeholder text. | https://design-system.service.gov.uk/components/text-input/
  - wai-forms | Label every form control using the label element. | https://www.w3.org/WAI/tutorials/forms/
corpus:
  - siso-ui-code/types.jsonl | component/field: 13,676 parts (mean 2.3): 3d rates 3.56 vs light 2.08; entrance motion 3.24 vs none 2.04 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Every input, select and textarea has an associated label element (for/id or aria-labelledby) that stays visible while the field has a value.
updated: 2026-10-11
---

## Why

A placeholder disappears the moment typing starts, so people forget what the field was for and cannot check their answers.

## Do / Don't

- **Do:** Use a 1 to 3 word label above the input and put format hints in helper text below the label.
- **Don't:** Rely on a grey placeholder such as Email address inside an unlabelled field.

## Evidence

Backing: 5 independent organisations across 24 quoted claims (16 guideline, 6 experiment, 1 study, 1 expert). Clusters: C0007.

- **GoodUI** (experiment, [goodui-pattern-5](https://goodui.org/patterns/5/)): Position form labels above fields rather than inside or floating within them. Measured: 3 tests on signup and checkout across desktop/mobile.
- **Nielsen Norman Group** (study, [nngroup-required-fields](https://www.nngroup.com/articles/required-fields/)): Use an asterisk before or at the beginning of field labels in red to aid visual scanning on longer forms.
- **IBM** (guideline, [carbon-dropdown](https://carbondesignsystem.com/components/dropdown/usage/)): Do not remove label text from dropdowns in favor of placeholder text; labels are always strongly encouraged.
- **GOV.UK** (guideline, [govuk-text-input](https://design-system.service.gov.uk/components/text-input/)): Always provide visible labels above text inputs, not placeholder text.
- **W3C** (guideline, [wai-forms](https://www.w3.org/WAI/tutorials/forms/)): Label every form control using the label element.

## Check

Every input, select and textarea has an associated label element (for/id or aria-labelledby) that stays visible while the field has a value.
