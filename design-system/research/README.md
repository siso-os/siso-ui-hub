# Research library

Every important published source on UI principles we could find, from the big design systems, research labs, standards bodies and design writers. It's the raw evidence our principles (`../principles/`) and white papers (`../papers/`) are distilled from.

Owner: UI-PRINCIPLES. Started 11 Oct 2026.

## Pipeline

1. **Harvest** (`sources/<family>.jsonl`): one line per source document, with its link and the facts about it. No reading yet.
2. **Distil** (`claims/<family>.jsonl`): read each source and pull out its rules, 1 to 10 per source, each in one sentence with a quote and a link.
3. **Cluster** (`clusters.json`): group claims that say the same thing across sources. A cluster backed by many independent orgs is a consensus rule.
4. **Promote**: a strong cluster becomes a `principles/P####` rule, citing its sources.
5. **Release**: the library (links, our summaries, our claims) and the SISO white papers are published together. We link to every source; we only mirror text whose licence allows it (`licence` field).

## Source line (sources/*.jsonl)

```json
{"id": "material3-states-overview", "title": "States – Material Design 3", "org": "Google", "family": "design-systems",
 "kind": "guideline", "url": "https://m3.material.io/foundations/interaction/states/overview", "year": 2023,
 "topics": ["states", "interaction"], "access": "open", "licence": "CC-BY-4.0",
 "why": "Defines hover/focus/pressed/dragged state layers used across all Material components.", "found_via": "m3.material.io nav"}
```

| Field | Values |
|---|---|
| `id` | kebab-case, unique across the library: `<org-or-site>-<slug>` |
| `kind` | `guideline` · `paper` · `article` · `book` · `standard` · `talk` · `dataset` |
| `family` | the harvest file it came from |
| `year` | publication or last-updated year; `null` if unknown |
| `topics` | from: `layout` `navigation` `shell` `typography` `color` `spacing` `states` `forms` `feedback` `motion` `accessibility` `content` `data-viz` `dashboards` `tables` `search` `onboarding` `errors` `loading` `performance` `mobile` `dark-mode` `tokens` `components` `aesthetics` `cognition` `ai-ux` `ecommerce` `research-methods` `heuristics` |
| `access` | `open` (free to read) · `paywalled` · `book` |
| `licence` | an SPDX id or `CC-BY-4.0`, `OGL-3.0`, `public-domain`; `unknown` if not stated (treat as link-only) |
| `why` | one line: what it settles |
| `found_via` | the index page or search that surfaced it |
| `finding` | optional: the measured result, with numbers ("each 100 ms of latency cost 1% of sales"), for experiments and studies |
| `tier` | optional: `core` (what the best products are built on: psychology, experiments, craft) or `floor` (accessibility and public-sector rules every product must meet) |

A URL goes in only if it was seen in a search result or fetched; nothing is guessed.

## Claim line (claims/*.jsonl)

```json
{"id": "material3-states-overview#1", "source": "material3-states-overview",
 "rule": "Show every interactive state as a translucent layer of the content colour over the rest colour.",
 "quote": "States are visual representations used to communicate the status of a component or interactive element.",
 "topics": ["states"], "strength": "must"}
```

`rule` is in our words, one sentence an agent could obey. `quote` is copied exactly from the source, 30 words at most, so a reader can find it. `strength` is how hard the source states it: `must` · `should` · `may`.

## Commands

- `node scripts/research-fetch.mjs`: fetches every open source once as trimmed text into `research/_text/` (not in git). Pages that need JavaScript are listed in `_text/_thin.txt` for a browser pass.
- `node scripts/build-research-library.mjs`: writes `research/library.json` (the file the UI hub loads): every source deduped by URL, with its claims and counts by family, kind, org, topic and access.

## Quarantine

`sources/_unverified/` holds lines whose URL or title could not be confirmed (a harvester's guess, or a page behind a bot wall). The library builder ignores them. They come back only after a browser pass (camofox) confirms the page exists and says what the line claims.
- `node scripts/research-distil.mjs`: one headless Haiku call per 6 sources (Shaan's Max login, plan usage, no API bill); keeps a claim only if its quote is in the source word for word and states the rule. Resumes from `claims/_done.txt`.
- `node scripts/research-deepen.mjs`: the second, deeper read (11 Oct 2026). Re-fetches the main content (up to 20,000 characters) of core sources the first pass cut at 6,000, gives Haiku the claims already taken, and keeps only new claims whose quote is in the page word for word. New ids end `#d1`, `#d2` …; finished sources go in `claims/_done-deep.txt`. First run: 592 sources, 1,206 claims.
- `sources/dashboards.jsonl` (family `dashboards`, 11 Oct 2026): 44 sources on dashboards, KPI and metric display, tables, filters and empty, loading and error states in data apps (Few, Tufte, Bach et al., NN/g, Carbon, PatternFly, Elastic, GitLab, Salesforce, Tableau, Grafana, Linear, Stripe), fetched at 20,000 characters and distilled into `claims/dashboards.jsonl`.
- `node scripts/research-cluster.mjs`: groups claims that say the same thing per topic, then counts independent orgs (after `orgs.json` aliases), families and evidence kinds; writes `clusters.json` and `CONSENSUS.md`. `--recount` recomputes counts with no model calls.
