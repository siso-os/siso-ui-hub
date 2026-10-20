---
id: P0028
title: Pick the control that fits the choice
rule: Use radios for one choice from up to six options, checkboxes for several, a select or typeahead combobox for long lists (typeahead past ten items), and a toggle only for a setting that takes effect at once.
layer: atom
applies_to: [radio, checkbox, select, toggle, combobox]
nodes: [atom/choice, component/select, component/search, atom/switch]
strength: must
status: draft
shaan: []
papers: []
clusters: [C0008, C0112]
sources:
  - goodui-leak-booking-a-b-tested-and-rolled-out-an-expanded-calendar-control | Auto-expand menu options instead of requiring an extra click to reveal important actions with lower interaction cost and greater visibility. (measured: 0.5 Repeatability assigned to Exposed Menu Options pattern) | https://goodui.org/leaks/booking-a-b-tested-and-rolled-out-an-expanded-calendar-control/
  - nngroup-dropdown-list | Use radio buttons instead of dropdowns for 6 or fewer options to expose all choices immediately with single-click selection. (figure: USWDS threshold: 7 items; M3 threshold: 6 items; IBM Carbon: 3 items) | https://www.nngroup.com/articles/dropdown-list/
  - patternfly-filters-design-guidelines | Use typeahead for single selects with more than ten items. | https://www.patternfly.org/patterns/filters/design-guidelines
  - carbon-input | Avoid free-form text input when users can only select from predefined options; use dropdown, select, or radio buttons instead. | https://carbondesignsystem.com/components/text-input/usage/
  - apple-wwdc2026-315 | Go beyond text in select options by using the ::selectedcontent element for rich content display. | https://developer.apple.com/videos/play/wwdc2026/315/
  - antdesign-radio | Use radio buttons when users must select exactly one option from mutually exclusive choices. | https://ant.design/components/radio
check: For each choice input, count options: radios or a segmented control for 2 to 6, typeahead above 10; no toggle sits in a form that needs a submit button.
updated: 2026-10-11
---

## Why

Each control promises a behaviour; the right one shows all options when there are few and saves scanning when there are many.

## Do / Don't

- **Do:** Use a segmented control for a 3-option time range and a typeahead for choosing one of 200 customers.
- **Don't:** Use a toggle that needs a Save button, or a dropdown for two options.

## Evidence

Backing: 7 independent organisations across 25 quoted claims (21 guideline, 2 experiment, 1 study, 1 expert). Clusters: C0008, C0112.

- **GoodUI** (experiment, [goodui-leak-booking-a-b-tested-and-rolled-out-an-expanded-calendar-control](https://goodui.org/leaks/booking-a-b-tested-and-rolled-out-an-expanded-calendar-control/)): Auto-expand menu options instead of requiring an extra click to reveal important actions with lower interaction cost and greater visibility. Measured: 0.5 Repeatability assigned to Exposed Menu Options pattern.
- **Nielsen Norman Group** (guideline, [nngroup-dropdown-list](https://www.nngroup.com/articles/dropdown-list/)): Use radio buttons instead of dropdowns for 6 or fewer options to expose all choices immediately with single-click selection. Figure: USWDS threshold: 7 items; M3 threshold: 6 items; IBM Carbon: 3 items.
- **Red Hat (PatternFly)** (guideline, [patternfly-filters-design-guidelines](https://www.patternfly.org/patterns/filters/design-guidelines)): Use typeahead for single selects with more than ten items.
- **IBM** (guideline, [carbon-input](https://carbondesignsystem.com/components/text-input/usage/)): Avoid free-form text input when users can only select from predefined options; use dropdown, select, or radio buttons instead.
- **Apple** (guideline, [apple-wwdc2026-315](https://developer.apple.com/videos/play/wwdc2026/315/)): Go beyond text in select options by using the ::selectedcontent element for rich content display.
- **Ant Design** (guideline, [antdesign-radio](https://ant.design/components/radio)): Use radio buttons when users must select exactly one option from mutually exclusive choices.

## Check

For each choice input, count options: radios or a segmented control for 2 to 6, typeahead above 10; no toggle sits in a form that needs a submit button.
