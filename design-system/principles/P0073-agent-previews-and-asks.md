---
id: P0073
title: An agent previews, asks before consequential acts, and can be undone
rule: Show what an agent will change before it acts, require approval for consequential or irreversible actions, let people edit its context, and keep a log with undo.
layer: state
applies_to: [agent, assistant, diff, approval]
nodes: [component/agent-parts, component/dialog, component/code]
strength: should
status: draft
shaan: [hub-0012, hub-0009]
papers: []
clusters: [C0181, C0119, C0178, C0180]
sources:
  - carbon-ai | Allow users to manually override AI-suggested content and revert to AI-generated content when needed. | https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai
  - elicit-ai-research-interface | Allow deep customization of AI outputs so users control which sources and information appear in reports. | https://elicit.org/
  - sourcegraph-cody-editor-context | Let users add specific context with @ mentions to increase AI accuracy on focused questions. | https://sourcegraph.com/cody
  - nngroup-designing-ai-study-guide | Narrow the scope of AI features to increase user understanding and adoption. | https://www.nngroup.com/articles/designing-ai-study-guide/
  - apple-wwdc2025-247 | Show code changes incrementally and let users undo them by preserving snapshots before each AI-generated modification. | https://developer.apple.com/videos/play/wwdc2025/247/
  - linear-styling-with-stylex | Give coding agents narrow scopes, codemods, examples, validation scripts, and checklists to succeed in large migrations. | https://linear.app/now/styling-linear-for-the-future-stylex
corpus:
  - siso-ui-code/types.jsonl | component/agent-parts: 620 parts (mean 2.87): 3d rates 4 vs minimal 2.76; interactive motion 3.96 vs none 2.45 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/dialog: 3,012 parts (mean 2.42): glass rates 2.95 vs minimal 2.2; interactive motion 3.13 vs none 2.03 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/code: 496 parts (mean 2.41): clean rates 2.96 vs minimal 2.17; micro motion 2.97 vs none 2.12 (model-rated) | 2026-10-11
check: Trigger each agent action type: consequential ones stop for approval with a preview; every action appears in a log with an undo or revert.
updated: 2026-10-11
---

## Why

People stay in control only if they can see and reverse what is done for them; previews and undo make it safe to delegate.

## Do / Don't

- **Do:** Show the agent's planned edits as a diff with Apply and Discard, and an activity log with Revert.
- **Don't:** Let an agent send emails or delete records without a preview or a record.

## Evidence

Backing: 6 independent organisations across 9 quoted claims (4 expert, 5 guideline). No experiment or study among them: this rests on published guidelines and expert opinion. Clusters: C0181, C0119, C0178, C0180.

- **IBM** (guideline, [carbon-ai](https://carbondesignsystem.com/building-blocks/foundations/carbon-for-ai)): Allow users to manually override AI-suggested content and revert to AI-generated content when needed.
- **Ought/Elicit** (guideline, [elicit-ai-research-interface](https://elicit.org/)): Allow deep customization of AI outputs so users control which sources and information appear in reports.
- **Sourcegraph** (guideline, [sourcegraph-cody-editor-context](https://sourcegraph.com/cody)): Let users add specific context with @ mentions to increase AI accuracy on focused questions.
- **Nielsen Norman Group** (guideline, [nngroup-designing-ai-study-guide](https://www.nngroup.com/articles/designing-ai-study-guide/)): Narrow the scope of AI features to increase user understanding and adoption.
- **Apple** (expert, [apple-wwdc2025-247](https://developer.apple.com/videos/play/wwdc2025/247/)): Show code changes incrementally and let users undo them by preserving snapshots before each AI-generated modification.
- **Linear** (expert, [linear-styling-with-stylex](https://linear.app/now/styling-linear-for-the-future-stylex)): Give coding agents narrow scopes, codemods, examples, validation scripts, and checklists to succeed in large migrations.

## Check

Trigger each agent action type: consequential ones stop for approval with a preview; every action appears in a log with an undo or revert.
