---
id: P0091
title: A switch acts at once, and its label names the setting
rule: A switch changes the setting the moment it is flipped, with no Save; its label names the setting and stays the same in both states, and the label is clickable too.
layer: atom
applies_to: [any:field]
nodes: [atom/switch, section/settings-panel]
strength: should
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0082, C1098, C1737, C1738, C1833]
sources:
  - checkbox-radio-design | Make toggle switches deliver results immediately without requiring users to click Save or Submit. | https://www.nngroup.com/articles/toggle-switch-guidelines/
  - aria-switch | Never change the switch label text when its state changes; label describes the switch purpose, not its state. | https://www.w3.org/WAI/ARIA/apg/patterns/switch/
  - aria-button | Keep toggle button labels constant; do not change text when state changes. | https://www.w3.org/WAI/ARIA/apg/patterns/button/
  - carbon-toggle | Make both the toggle switch and its label clickable to change state for improved usability. | https://carbondesignsystem.com/components/toggle/usage/
  - carbon-toggle | Limit toggle state text to three words or less for clarity. | https://carbondesignsystem.com/components/toggle/usage/
corpus:
  - siso-ui-code/types.jsonl | section/settings-panel: 1,314 parts (mean 2.73): clean rates 3.06 vs minimal 2.51; interactive motion 3.69 vs none 2.58 (model-rated) | 2026-10-11
check: Toggling a switch fires its save without another click; the label text is identical in both states; clicking the label toggles it.
updated: 2026-10-12
---

## Why

A switch looks like a light switch, so people expect it to work like one; a label that changes with the state leaves them unsure which state they are in.

## Do / Don't

- **Do:** Label it "Email alerts" and save the moment it flips, with a brief "Saved".
- **Don't:** Flip the label between "Turn on" and "Turn off", or put the switch in a form with a Save button.

## Evidence

Backing: 3 independent organisations across 5 quoted claims (5 guideline). Clusters: C0082, C1098, C1737, C1738, C1833.

This rests on guidelines and expert opinion only; no experiment or study among the claims.

- **Nielsen Norman Group** (guideline, [checkbox-radio-design](https://www.nngroup.com/articles/toggle-switch-guidelines/)): Make toggle switches deliver results immediately without requiring users to click Save or Submit.
- **W3C** (guideline, [aria-switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)): Never change the switch label text when its state changes; label describes the switch purpose, not its state.
- **W3C** (guideline, [aria-button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)): Keep toggle button labels constant; do not change text when state changes.
- **IBM** (guideline, [carbon-toggle](https://carbondesignsystem.com/components/toggle/usage/)): Make both the toggle switch and its label clickable to change state for improved usability.
- **IBM** (guideline, [carbon-toggle](https://carbondesignsystem.com/components/toggle/usage/)): Limit toggle state text to three words or less for clarity.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/settings-panel: 1,314 parts (mean 2.73): clean rates 3.06 vs minimal 2.51; interactive motion 3.69 vs none 2.58 (model-rated)

## Check

Toggling a switch fires its save without another click; the label text is identical in both states; clicking the label toggles it.
