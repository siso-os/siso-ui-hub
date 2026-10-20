---
id: P0010
title: Everything works from the keyboard, with shortcuts shown where they apply
rule: Make every action reachable by keyboard in a focus order that follows the layout, and show each shortcut next to its command.
layer: nav
applies_to: [command-palette, menu, table, form]
nodes: [component/command, component/menu, component/form, component/tabs]
strength: must
status: draft
shaan: []
papers: []
clusters: [C0152, C0215, C0110]
sources:
  - wcag-focus-order | 2.4.3 Focus Order, A: focus moves in an order that preserves meaning and operation | https://www.w3.org/WAI/WCAG22/Understanding/focus-order
  - wcag-focus-order | Arrange focusable elements in an order that matches the logical meaning and operation of the page. | https://www.w3.org/WAI/WCAG22/Understanding/focus-order
  - uswds-form | Display form controls in HTML order matching screen order, not rearranged by CSS. | https://designsystem.digital.gov/components/form/
  - govuk-password-input | Hide passwords by default; only show on user request via toggle button. | https://design-system.service.gov.uk/components/password-input/
  - raycast-productivity-ui-design-philosophy | Display keyboard shortcuts inline in results, not hidden in tooltips or documentation. | https://blakecrosley.com/guides/design/raycast
corpus:
  - siso-ui-code/types.jsonl | component/command: 229 parts (mean 2.98): dark rates 3.08 vs minimal 2.87; micro motion 2.94 vs none 2.49 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/menu: 2,614 parts (mean 2.53): glass rates 3.24 vs minimal 2.3; interactive motion 3.36 vs none 2.2 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Tab through the page: focus moves in reading order and reaches every control; no element has tabindex greater than 0; menus show shortcut hints.
updated: 2026-10-11
---

## Why

Experts get faster with shortcuts, but only learn the ones they see. A logical tab order keeps keyboard and screen-reader users from getting lost.

## Do / Don't

- **Do:** Show the shortcut beside each menu item and in the command palette results.
- **Don't:** Keep shortcuts only in a help page, or use positive tabindex values that scramble the order.

## Evidence

Backing: 4 independent organisations across 7 quoted claims (6 guideline, 1 expert). No experiment or study among them: this rests on published guidelines and expert opinion. WCAG 2.2 2.4.3 Focus Order (Level A, part of AA conformance) requires a meaningful focus order. Clusters: C0152, C0215, C0110.

- **W3C** (standard, [wcag-focus-order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)): 2.4.3 Focus Order, A: focus moves in an order that preserves meaning and operation.
- **W3C** (guideline, [wcag-focus-order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order)): Arrange focusable elements in an order that matches the logical meaning and operation of the page.
- **USWDS** (guideline, [uswds-form](https://designsystem.digital.gov/components/form/)): Display form controls in HTML order matching screen order, not rearranged by CSS.
- **GOV.UK** (guideline, [govuk-password-input](https://design-system.service.gov.uk/components/password-input/)): Hide passwords by default; only show on user request via toggle button.
- **Raycast** (expert, [raycast-productivity-ui-design-philosophy](https://blakecrosley.com/guides/design/raycast)): Display keyboard shortcuts inline in results, not hidden in tooltips or documentation.

## Check

Tab through the page: focus moves in reading order and reaches every control; no element has tabindex greater than 0; menus show shortcut hints.
