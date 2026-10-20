---
id: P0071
title: Say what the AI can do, and help people start
rule: Tell people what the AI can and cannot do and how often it may be wrong, and replace the blank prompt with suggested tasks, templates or examples.
layer: content
applies_to: [chat, assistant, prompt-input, agent]
nodes: [component/agent-parts, component/composer, page/chat-screen]
strength: must
status: draft
shaan: [hub-0009]
papers: []
clusters: [C0120, C0096, C0240]
sources:
  - microsoft-18-guidelines | Validate AI interaction guidelines through user testing with design practitioners. (measured: 49 design practitioners tested guidelines on 20 AI products) | https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/
  - arxiv-explanation-user-interfaces-review | Integrate explanation design early in the system, not as a secondary afterthought. | https://arxiv.org/html/2505.20085v1
  - shape-of-ai-patterns | Solve the blank canvas problem by providing prompt suggestions or templates. | https://shapeof.ai/
  - nngroup-designing-ai-study-guide | Support users in writing effective prompts through hybrid interfaces combining text input with graphical controls. | https://www.nngroup.com/articles/designing-ai-study-guide/
  - decisionlab-fundamental-attribution-error | Provide clear prompt guidance and examples to help users supply sufficient context, preventing them from blaming AI tools for poor outputs due to vague inputs. | https://thedecisionlab.com/biases/fundamental-attribution-error
corpus:
  - siso-ui-code/types.jsonl | component/agent-parts: 620 parts (mean 2.87): 3d rates 4 vs minimal 2.76; interactive motion 3.96 vs none 2.45 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/composer: 603 parts (mean 2.96): dark rates 3.27 vs minimal 2.54; interactive motion 3.61 vs none 2.4 (model-rated) | 2026-10-11
check: The AI entry point shows example prompts and a capability or limits note before the first message.
updated: 2026-10-11
---

## Why

People set expectations from the first exchange; overclaiming breaks trust at the first mistake, and an empty box gives no clue what to ask.

## Do / Don't

- **Do:** Show three example prompts tied to the user's own data and a one-line note on limits under the input.
- **Don't:** Open on an empty chat box with only Ask me anything.

## Evidence

Backing: 5 independent organisations across 9 quoted claims (7 guideline, 2 study). Clusters: C0120, C0096, C0240.

- **Microsoft** (study, [microsoft-18-guidelines](https://www.microsoft.com/en-us/research/publication/guidelines-for-human-ai-interaction/)): Validate AI interaction guidelines through user testing with design practitioners. Measured: 49 design practitioners tested guidelines on 20 AI products.
- **CHI Research Community** (study, [arxiv-explanation-user-interfaces-review](https://arxiv.org/html/2505.20085v1)): Integrate explanation design early in the system, not as a secondary afterthought.
- **Independent** (guideline, [shape-of-ai-patterns](https://shapeof.ai/)): Solve the blank canvas problem by providing prompt suggestions or templates.
- **Nielsen Norman Group** (guideline, [nngroup-designing-ai-study-guide](https://www.nngroup.com/articles/designing-ai-study-guide/)): Support users in writing effective prompts through hybrid interfaces combining text input with graphical controls.
- **The Decision Lab** (guideline, [decisionlab-fundamental-attribution-error](https://thedecisionlab.com/biases/fundamental-attribution-error)): Provide clear prompt guidance and examples to help users supply sufficient context, preventing them from blaming AI tools for poor outputs due to vague inputs.

## Check

The AI entry point shows example prompts and a capability or limits note before the first message.
