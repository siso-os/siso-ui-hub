---
id: P0046
title: Write for scanning: say it once, most important words first
rule: Start headings, labels and messages with the words that matter, cut every word that does not change the meaning, and say each thing once.
layer: content
applies_to: [heading, text, card, toast, empty-state]
nodes: [atom/text, component/card, component/toast, component/empty]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0003, C0005, C0104]
sources:
  - nngroup-f-shaped-pattern | Place the most important points in the first two paragraphs to align with users' natural scanning focus. (measured: First lines receive more gazes than subsequent lines; first few words on left receive more fixations than words to the right) | https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
  - goodui-pattern-15 | Use bulleted lists to present reassurance copy and product benefits. | https://goodui.org/patterns/15/
  - decisionlab-primacy-effect | Present the most important information first in any sequence to maximize recall and decision influence. | https://thedecisionlab.com/biases/primacy-effect
  - laws-ux-chunking | Group content into visually distinct chunks with clear hierarchy so users scan and process faster. | https://lawsofux.com/chunking/
  - apple-wwdc2017-819 | Help users understand content and locate key information by using clear headings and titles. | https://developer.apple.com/videos/play/wwdc2017/819/
  - openai-chatgpt-plugin-ui-guidelines | Keep carousels to 3–8 items for optimal readability and scannability. | https://developers.openai.com/plugins/concepts/ui-guidelines
corpus:
  - siso-ui-code/types.jsonl | component/toast: 391 parts (mean 2.92): dark rates 3.14 vs minimal 2.83; entrance motion 3.06 vs none 2.71 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/empty: 425 parts (mean 2.51): clean rates 3.07 vs minimal 2.11; micro motion 3.65 vs none 2.35 (model-rated) | 2026-10-11
check: No heading or label exceeds 8 words; no string appears twice on the same screen; paragraphs are 3 lines or fewer in app UI.
updated: 2026-10-11
---

## Why

People scan rather than read on screens, picking up the first words of lines and headings; front-loaded, short text survives scanning.

## Do / Don't

- **Do:** Write Payment failed: card expired, not We are sorry, but there seems to have been a problem processing your payment.
- **Don't:** Repeat the page title in the card title and again in the description.

## Evidence

Backing: 13 independent organisations across 25 quoted claims (14 guideline, 6 expert, 1 experiment, 4 study). Clusters: C0003, C0005, C0104.

- **Nielsen Norman Group** (study, [nngroup-f-shaped-pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)): Place the most important points in the first two paragraphs to align with users' natural scanning focus. Measured: First lines receive more gazes than subsequent lines; first few words on left receive more fixations than words to the right.
- **GoodUI** (experiment, [goodui-pattern-15](https://goodui.org/patterns/15/)): Use bulleted lists to present reassurance copy and product benefits.
- **The Decision Lab** (study, [decisionlab-primacy-effect](https://thedecisionlab.com/biases/primacy-effect)): Present the most important information first in any sequence to maximize recall and decision influence.
- **Laws of UX (Jon Yablonski)** (guideline, [laws-ux-chunking](https://lawsofux.com/chunking/)): Group content into visually distinct chunks with clear hierarchy so users scan and process faster.
- **Apple** (guideline, [apple-wwdc2017-819](https://developer.apple.com/videos/play/wwdc2017/819/)): Help users understand content and locate key information by using clear headings and titles.
- **OpenAI** (guideline, [openai-chatgpt-plugin-ui-guidelines](https://developers.openai.com/plugins/concepts/ui-guidelines)): Keep carousels to 3–8 items for optimal readability and scannability.

## Check

No heading or label exceeds 8 words; no string appears twice on the same screen; paragraphs are 3 lines or fewer in app UI.
