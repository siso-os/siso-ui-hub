---
id: P0072
title: AI answers show their sources and say they are AI
rule: Attach sources to AI-generated claims, next to the claim they support, and label generated content as AI-generated.
layer: content
applies_to: [chat, assistant, summary, agent]
nodes: [component/agent-parts, component/message, page/chat-screen]
strength: must
status: draft
shaan: [hub-0009]
papers: []
clusters: []
sources:
  - nngroup-explainable-ai | Do not rely on source citations alone to build user trust; users rarely click links to verify information. | https://www.nngroup.com/articles/explainable-ai/
  - fogg-2002-stanford-web-credibility | Provide citations and links to third-party sources to prove information accuracy. | https://credibility.stanford.edu/guidelines
  - elicit-ai-research-interface | Support all AI-generated claims with sentence-level citations from underlying sources for transparency. | https://elicit.org/
  - decisionlab-source-confusion | Display source attribution directly on search results and information widgets; do not hide citations behind clicks. | https://thedecisionlab.com/biases/source-confusion
corpus:
  - siso-ui-code/types.jsonl | component/agent-parts: 620 parts (mean 2.87): 3d rates 4 vs minimal 2.76; interactive motion 3.96 vs none 2.45 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/message: 1,054 parts (mean 2.75): playful rates 3.17 vs minimal 2.51; interactive motion 3.63 vs none 2.12 (model-rated) | 2026-10-11
check: Each AI answer that states facts has inline citations that resolve to real records, and generated content carries an AI label.
updated: 2026-10-11
---

## Why

Citations let people check instead of trusting blindly, which ties trust to how good the answer actually is; a label tells them when checking matters.

## Do / Don't

- **Do:** Put a numbered citation after each sentence of a summary, linking to the record it came from.
- **Don't:** Present a generated summary as fact with no sources or AI label.

## Evidence

Backing: 4 independent organisations across 7 quoted claims (1 guideline, 2 study, 4 expert).

- **Nielsen Norman Group** (study, [nngroup-explainable-ai](https://www.nngroup.com/articles/explainable-ai/)): Do not rely on source citations alone to build user trust; users rarely click links to verify information.
- **Stanford Behavior Design Lab** (study, [fogg-2002-stanford-web-credibility](https://credibility.stanford.edu/guidelines)): Provide citations and links to third-party sources to prove information accuracy.
- **Ought/Elicit** (guideline, [elicit-ai-research-interface](https://elicit.org/)): Support all AI-generated claims with sentence-level citations from underlying sources for transparency.
- **The Decision Lab** (expert, [decisionlab-source-confusion](https://thedecisionlab.com/biases/source-confusion)): Display source attribution directly on search results and information widgets; do not hide citations behind clicks.

Nielsen Norman Group found that people rarely click citations to verify, so sources are needed but do not by themselves earn trust.

## Check

Each AI answer that states facts has inline citations that resolve to real records, and generated content carries an AI label.
