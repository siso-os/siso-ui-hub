---
id: P0092
title: Avatars come from one size scale and are named for screen readers
rule: Draw avatars from one size scale, give each alt text (the person's name) when no name is shown beside it, and use neutral defaults.
layer: atom
applies_to: [any:media]
nodes: [atom/avatar, component/list, component/message]
strength: should
status: draft
shaan: [hub-0008, hub-0014]
papers: []
clusters: [C0030, C0103, C0177, C0822, C0880]
sources:
  - primer-avatar | Scale avatars at 16px base increments to 32px, then 8px increments to 64px maximum. | https://primer.style/components/avatar
  - primer-avatar | Provide alt text for avatars displayed without an adjacent name. | https://primer.style/components/avatar
  - apple-wwdc2021-10275 | Use gender-neutral language and pronouns; avoid binary gender references in copy and default avatars. | https://developer.apple.com/videos/play/wwdc2021/10275/
  - apple-wwdc2021-10275 | Let people customize names, avatars, and profile details to represent themselves authentically in your app. | https://developer.apple.com/videos/play/wwdc2021/10275/
  - shape-of-ai-patterns | Use a distinct visual avatar to help users recognize and remember the AI. | https://shapeof.ai/
corpus:
  - siso-ui-code/types.jsonl | component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/message: 1,054 parts (mean 2.75): playful rates 3.17 vs minimal 2.51; interactive motion 3.63 vs none 2.12 (model-rated) | 2026-10-11
check: Avatar sizes on a page come from the scale; every avatar without an adjacent visible name has alt text or an aria-label.
updated: 2026-10-12
---

## Why

A face is the quickest way to tell people apart in a list (hub-0008), but only if sizes stay consistent and screen readers hear the name.

## Do / Don't

- **Do:** Use 24 px avatars in lists and 40 px in headers, alt="Priya Shah" when the name is not printed next to it, initials on a neutral tint when there is no photo.
- **Don't:** Mix 27, 30 and 35 px avatars on one screen, or stack faces with no names for screen readers.

## Evidence

Backing: 3 independent organisations across 5 quoted claims (1 expert, 4 guideline). Clusters: C0030, C0103, C0177, C0822, C0880.

This rests on guidelines and expert opinion only; no experiment or study among the claims.

- **GitHub** (guideline, [primer-avatar](https://primer.style/components/avatar)): Scale avatars at 16px base increments to 32px, then 8px increments to 64px maximum.
- **GitHub** (guideline, [primer-avatar](https://primer.style/components/avatar)): Provide alt text for avatars displayed without an adjacent name.
- **Apple** (guideline, [apple-wwdc2021-10275](https://developer.apple.com/videos/play/wwdc2021/10275/)): Use gender-neutral language and pronouns; avoid binary gender references in copy and default avatars.
- **Apple** (expert, [apple-wwdc2021-10275](https://developer.apple.com/videos/play/wwdc2021/10275/)): Let people customize names, avatars, and profile details to represent themselves authentically in your app.
- **Independent** (guideline, [shape-of-ai-patterns](https://shapeof.ai/)): Use a distinct visual avatar to help users recognize and remember the AI.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- component/list: 1,463 parts (mean 2.86): dark rates 3.13 vs minimal 2.69; interactive motion 3.55 vs none 2.45 (model-rated)
- component/message: 1,054 parts (mean 2.75): playful rates 3.17 vs minimal 2.51; interactive motion 3.63 vs none 2.12 (model-rated)

## Check

Avatar sizes on a page come from the scale; every avatar without an adjacent visible name has alt text or an aria-label.
