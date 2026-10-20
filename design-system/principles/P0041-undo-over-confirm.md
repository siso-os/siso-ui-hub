---
id: P0041
title: Prefer undo to are-you-sure; confirm only what cannot be undone
rule: Make actions reversible and offer Undo after them; ask for confirmation only for destructive, financial or irreversible actions, naming exactly what will happen.
layer: state
applies_to: [dialog, toast, button, row]
nodes: [component/dialog, component/toast, atom/button]
strength: should
status: draft
shaan: [hub-0012]
papers: []
clusters: [C0081, C0058]
sources:
  - jakob-nielsen-10-usability-heuristics | Support Undo and Redo to give users control and confidence. | https://www.nngroup.com/articles/ten-usability-heuristics/
  - apple-wwdc26-250-principles-great-design | Make undo easy and freely available so users can recover confidently from their mistakes. | https://developer.apple.com/videos/play/wwdc2026/250
  - cline-vscode-agent-ui | Track all agent changes with checkpoints so users can easily undo the agent's work. | https://github.com/cline/cline
  - wcag-error-prevention-legal | For high-consequence transactions, allow users to review, confirm, and correct information before finalizing. | https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data
  - nhs-component-summary-list | Display a summary list at the end of a form to let users review and edit their responses before submission. | https://service-manual.nhs.uk/design-system/components/summary-list
  - figma-multiplayer-editing-real-time-collaboration | Implement undo by preserving the principle: copy-undo-redo should not change the document if others edited in between. | https://www.figma.com/blog/multiplayer-editing-in-figma/
corpus:
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | atom/button: 13,214 parts (mean 2.3): illustrated rates 3.2 vs monochrome 2; interactive motion 3.23 vs none 1.91 (model-rated) | 2026-10-11
check: List destructive actions: each either offers undo or opens a confirm dialog that names the object; non-destructive actions show no confirm dialog.
updated: 2026-10-11
---

## Why

Routine confirmations get clicked through by habit, so they protect nothing; undo protects every action without slowing the common case.

## Do / Don't

- **Do:** Archive a row at once with an Undo toast, and confirm Delete workspace by naming it and the item count.
- **Don't:** Ask Are you sure? before every archive or status change.

## Evidence

Backing: 6 independent organisations across 8 quoted claims (6 guideline, 2 expert). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0081, C0058.

- **Nielsen Norman Group** (guideline, [jakob-nielsen-10-usability-heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)): Support Undo and Redo to give users control and confidence.
- **Apple** (guideline, [apple-wwdc26-250-principles-great-design](https://developer.apple.com/videos/play/wwdc2026/250)): Make undo easy and freely available so users can recover confidently from their mistakes.
- **Independent** (guideline, [cline-vscode-agent-ui](https://github.com/cline/cline)): Track all agent changes with checkpoints so users can easily undo the agent's work.
- **W3C** (guideline, [wcag-error-prevention-legal](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data)): For high-consequence transactions, allow users to review, confirm, and correct information before finalizing.
- **NHS** (guideline, [nhs-component-summary-list](https://service-manual.nhs.uk/design-system/components/summary-list)): Display a summary list at the end of a form to let users review and edit their responses before submission.
- **Figma** (expert, [figma-multiplayer-editing-real-time-collaboration](https://www.figma.com/blog/multiplayer-editing-in-figma/)): Implement undo by preserving the principle: copy-undo-redo should not change the document if others edited in between.

## Check

List destructive actions: each either offers undo or opens a confirm dialog that names the object; non-destructive actions show no confirm dialog.
