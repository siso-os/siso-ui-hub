---
id: P0019
title: Text is readable: line length and size
rule: Keep reading text to about 60 to 80 characters per line, take body sizes from the type scale, and never shrink body text to fit more in.
layer: type
applies_to: [text, paragraph, table, form]
nodes: [atom/text, component/form, component/table, component/list]
strength: should
status: draft
shaan: [hub-0014]
papers: []
clusters: []
sources:
  - atlassian-typography | Limit line length to 60–80 characters per line for comfortable reading of body text. (figure: 60–80 characters or 10–12 words per line) | https://atlassian.design/foundations/typography/applying-typography
  - salesforce-lightning-empty-state | Keep message line length under 66 characters per line in empty states. | http://v1.lightningdesignsystem.com/guidelines/empty-state/
  - apple-wwdc2017-812 | Apply readability margins on larger screens to restrict line length; allow text size to adjust based on Dynamic Type settings without compromising layout. | https://developer.apple.com/videos/play/wwdc2017/812/
  - wcag-text-spacing | Ensure content adapts without loss when line height is set to 1.5×, paragraphs to 2×, letter spacing to 0.12×, and word spacing to 0.16× font size. | https://www.w3.org/WAI/WCAG22/Understanding/text-spacing
corpus:
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/table: 2,017 parts (mean 3.04): dark rates 3.35 vs minimal 2.94; micro motion 3.59 vs none 2.63 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
check: Paragraph containers have a computed max-width of 80ch or less; body text font sizes come from the type tokens.
updated: 2026-10-11
---

## Why

Small text and long lines slow reading and make the eye lose its place on the return sweep; generous leading eases it.

## Do / Don't

- **Do:** Cap descriptive text at a max-width of about 70ch inside wide panels.
- **Don't:** Run paragraph text the full width of a 1440 px screen, or drop body text to 11 px to fit a card.

## Evidence

Backing: 4 independent organisations across 4 quoted claims (4 guideline). No experiment or study among them: this rests on published guidelines and expert opinion.

- **Atlassian** (guideline, [atlassian-typography](https://atlassian.design/foundations/typography/applying-typography)): Limit line length to 60–80 characters per line for comfortable reading of body text. Figure: 60–80 characters or 10–12 words per line.
- **Salesforce** (guideline, [salesforce-lightning-empty-state](http://v1.lightningdesignsystem.com/guidelines/empty-state/)): Keep message line length under 66 characters per line in empty states.
- **Apple** (guideline, [apple-wwdc2017-812](https://developer.apple.com/videos/play/wwdc2017/812/)): Apply readability margins on larger screens to restrict line length; allow text size to adjust based on Dynamic Type settings without compromising layout.
- **W3C** (guideline, [wcag-text-spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing)): Ensure content adapts without loss when line height is set to 1.5×, paragraphs to 2×, letter spacing to 0.12×, and word spacing to 0.16× font size.

## Check

Paragraph containers have a computed max-width of 80ch or less; body text font sizes come from the type tokens.
