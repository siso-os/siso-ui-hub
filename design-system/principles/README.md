# Principles

Short rules an agent follows when it builds SISO UI. Each rule gives its reason, its evidence and a check. White papers (`../papers/`) are written from these rules, never the other way round.

Owner: UI-PRINCIPLES (App Factory). Readers: the UI hub (`banks/siso-ui-hub`), `ab-spec`, `ui-pick`, any builder.

## Two sets, one index

| Set | Where | Whose words | Ids |
|---|---|---|---|
| House rules | `banks/siso-ui-hub/principles/0001–0015` | Shaan's, dated | `hub-0001` … `hub-0015` |
| Evidence rules | this folder | the big systems, plus our own 102k-part corpus | `P0001` … |

The hub's 15 ADRs stay where they are. This folder references them by id and never copies them. When an evidence rule backs a house rule, it lists it under `shaan:`. When the two disagree, the house rule wins and the evidence rule says so in its body.

`node scripts/build-principles-index.mjs` writes `principles/index.json`: every rule from both sets as one flat list. The hub and agents load that file instead of parsing markdown.

`principles/checks.json` lists the 17 rules a script can test on a rendered page (DOM queries, axe-core, layout shift, fixed viewports), one test each, for the hub's page checker (`siso-ui-hub/bin/pagecheck.js`).

## One file per rule

File name: `P0001-short-slug.md`. Front matter is a small YAML subset (`key: value`, `key: [a, b]`, and `key:` followed by `  - item` lines), so the index builder needs no dependencies.

```yaml
---
id: P0001
title: Every control has all its states
rule: One sentence an agent can obey without reading further.
layer: atom          # base | shell | nav | page | atom | state | motion | type | colour | content | data | behaviour
applies_to: [button, link, nav-item]   # slot names, matching siso-ui-code types.jsonl slots where possible
nodes: [atom/button, atom/link]        # UI hub ontology ids (siso-ui-hub catalogue/schema/ontology.json): where the hub shows the rule
strength: must       # must | should | prefer
status: draft        # draft | accepted | retired (Shaan accepts)
shaan: [hub-0013]    # house rules this rests on
papers: [W01]        # papers that argue it
clusters: [C0015]    # research/clusters.json groups the evidence came from
sources:             # source-key | what it says | url
  - wcag-2.2 | 2.4.7 Focus Visible: keyboard focus is visible (AA) | https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
corpus:              # file | finding | date measured
  - siso-ui-code/types.jsonl | motion none 2.25 vs interactive 3.30 | 2026-10-11
check: How an agent proves the rule holds on a live page.
updated: 2026-10-11
---
```

Body, in this order: **Why** (3 lines at most), **Do / Don't** (one pair), **Evidence** (what each source says, in our words), **Check**.

Layers: `base` (speed, accessibility floor, one system), `shell`, `nav`, `page`, `type`, `colour`, `atom` (controls), `state` (loading, empty, error, feedback), `motion`, `content` (words, AI answers), `data` (dashboards, charts, tables, KPIs, filters), `behaviour` (choice, defaults, motivation, trust, onboarding, and the dark-pattern line).

## Strength

Computed from the evidence, not chosen: **must** = 4+ independent organisations (after `research/orgs.json` aliases) with at least one experiment or study among the supporting claims, or a WCAG 2.2 AA requirement; **should** = 2+ organisations; **prefer** = one strong source. Each rule's Evidence section states its counts and says plainly when it rests on guidelines and expert opinion only.

## The one-page version

[`DOS-AND-DONTS.md`](DOS-AND-DONTS.md): one line per rule, grouped by layer. Read it before building a dashboard or app screen.

## Source keys

`apple-hig`, `material-3`, `carbon`, `atlassian`, `polaris`, `fluent`, `govuk`, `geist`, `linear`, `stripe`, `refactoring-ui`, `laws-of-ux`, `nng`, `wcag-2.2`, `siso-corpus`. Add a key here before you use a new one. Rules P0002 onward use the `research/library.json` source id as the key, so every line resolves to one verified URL.

## Corpus caveat

`siso-ui-code` ratings (1–5) were given by a model classifier, not by people. They show what the classifier judged well made across 102,533 parts; a rule that leans on them also needs a published source or a house rule.

## Rules

| Id | Rule | Layer | Strength | Status |
|---|---|---|---|---|
| [P0001](P0001-every-control-has-all-its-states.md) | Every control has all its states | atom | must | draft |
| [P0002](P0002-shell-loads-once-content-streams.md) | The shell loads once; each region fills on its own | shell | should | draft |
| [P0003](P0003-one-persistent-side-nav.md) | One persistent side nav for an app with five or more sections | shell | should | draft |
| [P0004](P0004-fixed-anchors.md) | Fixed anchors: the same things in the same place on every page | shell | should | draft |
| [P0005](P0005-say-where-you-are.md) | Every screen says where you are and how to leave | nav | must | draft |
| [P0006](P0006-primary-nav-visible.md) | Primary navigation is visible, not hidden behind a menu | nav | should | draft |
| [P0007](P0007-search-is-a-visible-field.md) | Search is a visible field, with recent and suggested queries | nav | must | draft |
| [P0008](P0008-links-go-buttons-do.md) | Links go somewhere; buttons do something | nav | should | draft |
| [P0009](P0009-back-and-url-restore-state.md) | Back and the URL restore exactly what was open | nav | must | draft |
| [P0010](P0010-keyboard-first-shortcuts-shown.md) | Everything works from the keyboard, with shortcuts shown where they apply | nav | must | draft |
| [P0011](P0011-most-important-top-left.md) | Most important first: top-left, then down | page | must | draft |
| [P0012](P0012-show-only-what-the-task-needs.md) | Show only what this task needs | page | must | draft |
| [P0013](P0013-one-spacing-scale-proximity.md) | One spacing scale; proximity shows what belongs together | page | should | draft |
| [P0014](P0014-one-primary-action-per-view.md) | One primary action per view | page | must | draft |
| [P0015](P0015-layouts-reflow.md) | Layouts reflow to small screens without losing anything | page | must | draft |
| [P0016](P0016-open-detail-in-place.md) | Open detail in place | page | must | draft |
| [P0017](P0017-use-known-conventions.md) | Use the conventions people already know | page | must | draft |
| [P0018](P0018-hierarchy-from-few-sizes.md) | Hierarchy from size, weight and order, with few sizes | type | should | draft |
| [P0019](P0019-readable-text.md) | Text is readable: line length and size | type | should | draft |
| [P0020](P0020-align-text-left-numbers-right.md) | Left-align text; right-align numbers in tabular figures | type | should | draft |
| [P0021](P0021-contrast-minimums.md) | Text and controls meet contrast minimums | colour | must | draft |
| [P0022](P0022-never-colour-alone.md) | Never use colour alone to carry meaning | colour | must | draft |
| [P0023](P0023-colour-has-a-job.md) | Colour has a job: one accent for action, reserved colours for status | colour | should | draft |
| [P0024](P0024-dark-ui-grey-not-black.md) | Dark UI uses dark grey surfaces and softened colours | colour | should | draft |
| [P0025](P0025-colours-from-tokens-selection-tint.md) | Colours come from tokens, and selection is a tint | colour | should | draft |
| [P0026](P0026-targets-big-enough.md) | Targets are big enough to hit | atom | must | draft |
| [P0027](P0027-icons-carry-labels.md) | Icons carry a text label | atom | must | draft |
| [P0028](P0028-pick-the-right-control.md) | Pick the control that fits the choice | atom | must | draft |
| [P0029](P0029-buttons-say-what-they-do.md) | Buttons say what they do | atom | must | draft |
| [P0030](P0030-hover-shows-more-never-only-way.md) | Hover shows more; it is never the only way in | atom | must | draft |
| [P0031](P0031-ask-for-less.md) | Ask for less: every field earns its place | behaviour | must | draft |
| [P0032](P0032-labels-above-fields.md) | Labels sit above fields and never vanish | atom | must | draft |
| [P0033](P0033-validate-on-blur-next-to-field.md) | Validate on blur, next to the field, and keep what was typed | state | must | draft |
| [P0034](P0034-good-defaults-forgiving-input.md) | Good defaults and forgiving input | atom | must | draft |
| [P0035](P0035-one-column-task-order.md) | One column, in the order people think | page | must | draft |
| [P0036](P0036-response-time-limits.md) | Respond in 0.1 s; show progress past 1 s; show percent and cancel past 10 s | state | should | draft |
| [P0037](P0037-skeleton-when-layout-known.md) | Skeletons when the layout is known; spinners when it is not | state | must | draft |
| [P0038](P0038-empty-state-says-why-and-next.md) | An empty state says why it is empty and offers the next step | state | should | draft |
| [P0039](P0039-errors-plain-and-fixable.md) | Errors say what happened and how to fix it, in plain words | state | should | draft |
| [P0040](P0040-never-empty-while-loading.md) | Never say there is nothing while it is still loading | state | should | draft |
| [P0041](P0041-undo-over-confirm.md) | Prefer undo to are-you-sure; confirm only what cannot be undone | state | should | draft |
| [P0042](P0042-every-action-gets-feedback.md) | Every action gets feedback, sized to what happened | state | should | draft |
| [P0043](P0043-motion-short-and-eased.md) | Motion is short and eased, scaled to distance | motion | should | draft |
| [P0044](P0044-reduced-motion-no-flashing.md) | Respect reduced motion; never flash | motion | must | draft |
| [P0045](P0045-motion-explains-change.md) | Motion explains a change; it never competes for attention | motion | should | draft |
| [P0046](P0046-write-for-scanning.md) | Write for scanning: say it once, most important words first | content | must | draft |
| [P0047](P0047-users-words-not-systems.md) | Use the user's words, not the system's | content | must | draft |
| [P0048](P0048-dashboard-one-audience-few-views.md) | A dashboard has one audience, one purpose and few views | data | must | draft |
| [P0049](P0049-key-number-biggest-top-left.md) | The key number is biggest and top-left | data | should | draft |
| [P0050](P0050-kpi-shows-context.md) | A KPI shows its comparison, trend and timeframe | data | should | draft |
| [P0051](P0051-pick-chart-by-question.md) | Pick the chart by the question; encode with position and length | data | should | draft |
| [P0052](P0052-bars-zero-and-sorted.md) | Bars start at zero and are sorted | data | should | draft |
| [P0053](P0053-every-mark-is-data.md) | Every mark is data: label directly, few gridlines, no chart junk | data | should | draft |
| [P0054](P0054-highlight-one-grey-rest.md) | Highlight one thing in colour and grey the rest | data | must | draft |
| [P0055](P0055-tables-built-for-scanning.md) | Tables: numbers right, headers fixed, rows that respond | data | must | draft |
| [P0056](P0056-list-not-card-pile.md) | Repeated items are a list or table, not a pile of cards | data | should | draft |
| [P0057](P0057-filters-near-and-visible.md) | Filters sit next to what they filter and show what is applied | data | must | draft |
| [P0058](P0058-show-source-and-freshness.md) | Every number shows its source and how fresh it is | data | must | draft |
| [P0059](P0059-chart-title-states-finding.md) | Every chart has a text title and a text alternative | data | must | draft |
| [P0060](P0060-default-is-the-good-choice.md) | The default is the choice most people should make | behaviour | must | draft |
| [P0061](P0061-fewer-choices.md) | Fewer choices, faster decisions | behaviour | must | draft |
| [P0062](P0062-show-progress-to-goal.md) | Show progress toward a goal | behaviour | must | draft |
| [P0063](P0063-proof-is-real.md) | Proof is real: numbers, names and faces you can check | behaviour | must | draft |
| [P0064](P0064-no-dark-patterns.md) | No dark patterns: decline is as easy as accept, prices are whole, urgency is true | behaviour | must | draft |
| [P0065](P0065-design-peak-and-end.md) | Design the peak and the ending | behaviour | should | draft |
| [P0066](P0066-interrupt-rarely.md) | Interrupt rarely: notify only when it matters to the user | behaviour | must | draft |
| [P0067](P0067-polish-is-tested.md) | Polish matters, and it is tested | behaviour | must | draft |
| [P0068](P0068-first-run-to-value.md) | First run reaches value fast; teach in context, not upfront | behaviour | must | draft |
| [P0069](P0069-ask-in-context-with-reason.md) | Ask for data and permissions in context, after value, with a reason | behaviour | must | draft |
| [P0070](P0070-speed-is-a-feature.md) | Speed is a feature: meet Core Web Vitals and reserve space | base | must | draft |
| [P0071](P0071-ai-says-what-it-can-do.md) | Say what the AI can do, and help people start | content | must | draft |
| [P0072](P0072-ai-shows-sources.md) | AI answers show their sources and say they are AI | content | must | draft |
| [P0073](P0073-agent-previews-and-asks.md) | An agent previews, asks before consequential acts, and can be undone | state | should | draft |
| [P0074](P0074-wcag-aa-semantic-html.md) | Meet WCAG 2.2 AA, with semantic HTML first | base | must | draft |
| [P0075](P0075-one-system-take-before-build.md) | One system: take an existing component before building a new one | base | should | draft |
| [P0076](P0076-hero-says-the-outcome-cta-above-fold.md) | The hero says the outcome, and its one action is above the fold | page | must | draft |
| [P0077](P0077-one-cta-repeated-down-the-page.md) | One call to action, repeated down the page | page | should | draft |
| [P0078](P0078-proof-sits-beside-the-ask.md) | Proof sits beside the ask | page | should | draft |
| [P0079](P0079-pricing-few-plans-whole-price.md) | Pricing: a few plans side by side, each with its whole price | page | should | draft |
| [P0080](P0080-plans-compare-row-by-row.md) | Plans compare row by row | page | should | draft |
| [P0081](P0081-faq-answers-the-last-objections.md) | The FAQ answers the last objections, near the action | page | should | draft |
| [P0082](P0082-conversion-pages-drop-nav-and-footer.md) | Signup and checkout drop the site nav and footer | page | should | draft |
| [P0083](P0083-footer-is-the-site-map.md) | The footer is the site map and the contact desk | page | must | draft |
| [P0084](P0084-one-announcement-never-like-an-ad.md) | At most one announcement, and it never looks like an ad | page | must | draft |
| [P0085](P0085-how-it-works-says-what-happens-next.md) | How it works shows the few steps, and what happens after the click | page | should | draft |
| [P0086](P0086-features-lead-with-the-outcome.md) | Features lead with the outcome, then the feature | content | should | draft |
| [P0087](P0087-contact-is-short-and-real.md) | Contact is a short form and a real address | page | must | draft |
| [P0088](P0088-button-sizes-from-one-scale.md) | Buttons come in three sizes, and the main action is the largest | atom | must | draft |
| [P0089](P0089-badges-only-for-what-changes-a-decision.md) | Badges only for what changes a decision | atom | should | draft |
| [P0090](P0090-tooltips-are-extra-never-vital.md) | Tooltips add detail; they never hold what you need | atom | must | draft |
| [P0091](P0091-switches-act-at-once.md) | A switch acts at once, and its label names the setting | atom | should | draft |
| [P0092](P0092-avatars-sized-and-named.md) | Avatars come from one size scale and are named for screen readers | atom | should | draft |
