---
id: P0034
title: Good defaults and forgiving input
rule: Prefill the most likely value, accept every reasonable format (spaces, dashes, case) and normalise it yourself, and size each input to the length of its expected answer.
layer: atom
applies_to: [input, date-picker, select, form]
nodes: [atom/text-input, component/picker, component/select, component/field]
strength: must
status: draft
shaan: [hub-0012]
papers: []
clusters: [C0009, C0074, C0249]
sources:
  - form-design-usability-nn-group | Size text input fields to match expected input length, empirically: 19 characters fits 99.9% of city names. (measured: 19-character field width accommodates 99.9% of city names) | https://www.nngroup.com/articles/web-form-design/
  - decisionlab-choice-overload-bias | Highlight defaults early in multi-step decisions; users deplete decision-making capacity and revert to defaults later. (measured: Default feature selection increases after earlier choices deplete mental resources) | https://thedecisionlab.com/biases/choice-overload-bias
  - etsy-search-bar-test | Increase search bar width to the maximum allowed space; wider form fields perform better. | https://goodui.org/leaks/etsy-discovers-a-better-padded-and-wider-search-bar-in-this-a-b-c-test/
  - goodui-pattern-119 | Preselect a default option in subscription or payment plan choices to increase sales conversions. | https://goodui.org/patterns/119/
  - growthdesign-uber-eats-scarcity | Set defaults that align with user values and product ethics; most users keep the default and avoid friction. | https://growth.design/case-studies/uber-eats-scarcity
  - carbon-input | Use consistent field heights when pairing form components on the same page. | https://carbondesignsystem.com/components/text-input/usage/
corpus:
  - siso-ui-code/types.jsonl | component/field: 13,676 parts (mean 2.3): 3d rates 3.56 vs light 2.08; entrance motion 3.24 vs none 2.04 (model-rated) | 2026-10-11
check: Enter common variants (spaces, dashes, lowercase) in each formatted field: all are accepted; input widths roughly match expected answer length.
updated: 2026-10-11
---

## Why

Defaults save a decision; forgiving parsing prevents errors that are the system's fault; field width hints at the answer expected.

## Do / Don't

- **Do:** Accept 4242 4242 4242 4242 and 4242424242424242 alike, and make a postcode field short.
- **Don't:** Reject a phone number because it has spaces, or make a 4-digit field full width.

## Evidence

Backing: 9 independent organisations across 21 quoted claims (5 experiment, 11 guideline, 3 study, 2 expert). Clusters: C0009, C0074, C0249.

- **Nielsen Norman Group** (study, [form-design-usability-nn-group](https://www.nngroup.com/articles/web-form-design/)): Size text input fields to match expected input length, empirically: 19 characters fits 99.9% of city names. Measured: 19-character field width accommodates 99.9% of city names.
- **The Decision Lab** (study, [decisionlab-choice-overload-bias](https://thedecisionlab.com/biases/choice-overload-bias)): Highlight defaults early in multi-step decisions; users deplete decision-making capacity and revert to defaults later. Measured: Default feature selection increases after earlier choices deplete mental resources.
- **Etsy** (experiment, [etsy-search-bar-test](https://goodui.org/leaks/etsy-discovers-a-better-padded-and-wider-search-bar-in-this-a-b-c-test/)): Increase search bar width to the maximum allowed space; wider form fields perform better.
- **GoodUI** (experiment, [goodui-pattern-119](https://goodui.org/patterns/119/)): Preselect a default option in subscription or payment plan choices to increase sales conversions.
- **growth.design** (study, [growthdesign-uber-eats-scarcity](https://growth.design/case-studies/uber-eats-scarcity)): Set defaults that align with user values and product ethics; most users keep the default and avoid friction.
- **IBM** (guideline, [carbon-input](https://carbondesignsystem.com/components/text-input/usage/)): Use consistent field heights when pairing form components on the same page.

## Check

Enter common variants (spaces, dashes, lowercase) in each formatted field: all are accepted; input widths roughly match expected answer length.
