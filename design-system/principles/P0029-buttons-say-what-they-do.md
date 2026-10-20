---
id: P0029
title: Buttons say what they do
rule: Label buttons with a specific verb and object (Export CSV, Invite member), style buttons with the same function the same way, and end the label with an ellipsis when it opens a dialog that asks for more.
layer: atom
applies_to: [button, link, menu-item]
nodes: [atom/button, atom/link, component/menu, section/cta]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0068, C0197, C0105]
sources:
  - goodui-pattern-88 | Prefix link labels with action verbs to encourage interaction; 'Play factory video' outperforms 'factory video'. | https://goodui.org/patterns/88/
  - carbon-button | Use the verb-plus-noun content formula for button labels except common actions like Done, Close, Cancel, Add, or Delete. | https://carbondesignsystem.com/components/button/usage/
  - primer-button | Add leading visuals like icons to provide context for button actions, such as a search icon for a search submit. | https://primer.style/components/button
  - govuk-pattern-start-page | Use action-focused button text like Start now or Sign in rather than generic labels. | https://design-system.service.gov.uk/patterns/start-using-a-service/
  - gestalt-design-guide | Use consistent visual styling for buttons and links with the same function to signal they behave identically. | https://www.eleken.co/blog-posts/gestalt-principles
  - aria-button | Append ellipsis to button labels that launch dialogs to signal additional interface. | https://www.w3.org/WAI/ARIA/apg/patterns/button/
corpus:
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/menu: 2,614 parts (mean 2.53): glass rates 3.24 vs minimal 2.3; interactive motion 3.36 vs none 2.2 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/cta: 1,134 parts (mean 2.88): playful rates 3.23 vs minimal 2.56; interactive motion 3.58 vs none 2.69 (model-rated) | 2026-10-11
check: No button text is in the set OK, Yes, No, Submit, Click here; each starts with a verb.
updated: 2026-10-11
---

## Why

A specific verb lets people predict the result before clicking; vague labels like OK or Submit force them to read the context.

## Do / Don't

- **Do:** Write Delete project on the destructive button in a confirm dialog.
- **Don't:** Use Yes / No or Submit as the only labels.

## Evidence

Backing: 9 independent organisations across 18 quoted claims (10 guideline, 5 expert, 3 experiment). Clusters: C0068, C0197, C0105.

- **GoodUI** (experiment, [goodui-pattern-88](https://goodui.org/patterns/88/)): Prefix link labels with action verbs to encourage interaction; 'Play factory video' outperforms 'factory video'.
- **IBM** (guideline, [carbon-button](https://carbondesignsystem.com/components/button/usage/)): Use the verb-plus-noun content formula for button labels except common actions like Done, Close, Cancel, Add, or Delete.
- **GitHub** (guideline, [primer-button](https://primer.style/components/button)): Add leading visuals like icons to provide context for button actions, such as a search icon for a search submit.
- **GOV.UK** (guideline, [govuk-pattern-start-page](https://design-system.service.gov.uk/patterns/start-using-a-service/)): Use action-focused button text like Start now or Sign in rather than generic labels.
- **Eleken** (guideline, [gestalt-design-guide](https://www.eleken.co/blog-posts/gestalt-principles)): Use consistent visual styling for buttons and links with the same function to signal they behave identically.
- **W3C** (guideline, [aria-button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)): Append ellipsis to button labels that launch dialogs to signal additional interface.

## Check

No button text is in the set OK, Yes, No, Submit, Click here; each starts with a verb.
