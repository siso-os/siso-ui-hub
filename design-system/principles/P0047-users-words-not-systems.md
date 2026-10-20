---
id: P0047
title: Use the user's words, not the system's
rule: Name things with the words your users use, in plain language, the same word for the same thing everywhere, and describe features by what they do for the user.
layer: content
applies_to: [label, heading, error, nav-item]
nodes: [atom/text, component/menu, component/form]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0018, C0023, C0141, C0044]
sources:
  - goodui-pattern-22 | Focus headlines on user end-goals rather than generic feature descriptions. | https://goodui.org/patterns/22/
  - jakob-nielsen-10-usability-heuristics | Use words and concepts familiar to users rather than internal jargon. | https://www.nngroup.com/articles/ten-usability-heuristics/
  - growthdesign-mental-models | Design interfaces to match users' existing mental models based on real-world experiences and past interactions. | https://growth.design/case-studies/mental-models
  - meta-writing-metaverse | Maintain consistent terminology and content standards across all products so users understand how to navigate your entire ecosystem. | https://www.meta.com/design-at-meta/blog/writing-the-metaverse/
  - apple-wwdc2025-404 | Create and maintain a word list to ensure consistency across your app's writing. | https://developer.apple.com/videos/play/wwdc2025/404/
  - lazarev-ai-transparency-explainability-guide | Match explanation type to audience: engineers need debugging logs, users need domain language, auditors need system documentation. | https://www.lazarev.agency/articles/ai-transparency-and-explainability
corpus:
  - siso-ui-code/types.jsonl | component/menu: 2,614 parts (mean 2.53): glass rates 3.24 vs minimal 2.3; interactive motion 3.36 vs none 2.2 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/form: 1,504 parts (mean 2.71): dark rates 3.03 vs minimal 2.58; interactive motion 3.59 vs none 2.43 (model-rated) | 2026-10-11
check: Compare nav labels, headings and button text against the glossary: one term per concept, no internal identifiers visible.
updated: 2026-10-11
---

## Why

Matching people's own vocabulary and mental model lets them recognise instead of translate; inconsistent terms make them think two things differ.

## Do / Don't

- **Do:** Call it Invoices everywhere if customers say invoices, and write Get paid faster, not Accounts receivable automation.
- **Don't:** Show internal names (sync_job_v2), or call the same thing Projects on one page and Workspaces on another.

## Evidence

Backing: 8 independent organisations across 26 quoted claims (16 expert, 9 guideline, 1 experiment). Clusters: C0018, C0023, C0141, C0044.

- **GoodUI** (experiment, [goodui-pattern-22](https://goodui.org/patterns/22/)): Focus headlines on user end-goals rather than generic feature descriptions.
- **Nielsen Norman Group** (guideline, [jakob-nielsen-10-usability-heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)): Use words and concepts familiar to users rather than internal jargon.
- **growth.design** (guideline, [growthdesign-mental-models](https://growth.design/case-studies/mental-models)): Design interfaces to match users' existing mental models based on real-world experiences and past interactions.
- **Meta** (guideline, [meta-writing-metaverse](https://www.meta.com/design-at-meta/blog/writing-the-metaverse/)): Maintain consistent terminology and content standards across all products so users understand how to navigate your entire ecosystem.
- **Apple** (guideline, [apple-wwdc2025-404](https://developer.apple.com/videos/play/wwdc2025/404/)): Create and maintain a word list to ensure consistency across your app's writing.
- **Lazarev** (expert, [lazarev-ai-transparency-explainability-guide](https://www.lazarev.agency/articles/ai-transparency-and-explainability)): Match explanation type to audience: engineers need debugging logs, users need domain language, auditors need system documentation.

## Check

Compare nav labels, headings and button text against the glossary: one term per concept, no internal identifiers visible.
