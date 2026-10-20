---
id: P0007
title: Search is a visible field, with recent and suggested queries
rule: Show search as an open text field in the header, offer recent and suggested queries on focus, give it a clear button, and scope or filter results on the results view.
layer: nav
applies_to: [search, command-palette, header]
nodes: [component/search, section/top-bar, component/command]
strength: must
status: draft
shaan: [hub-0015]
papers: []
clusters: [C0037, C0169, C0229, C0267, C0079]
sources:
  - measuringu-ux-news | Include an obvious search bar on news homepages; absent search reduces task completion and frustrates users seeking specific articles. (measured: The Guardian and Huffington Post had lowest task completion rates due to missing visible search functionality) | https://measuringu.com/ux-news/
  - nngroup-compensatory-decisions | Implement multiword search that filters results to items matching every word in the query, not items matching any word separately. (measured: In-site searches contain an average of 2.3 words per query, including color, size, and brand) | https://www.nngroup.com/articles/compensatory-noncompensatory-decisions/
  - goodui-pattern-94 | Display a search bar prominently on the page to enable faster user navigation. | https://goodui.org/patterns/94/
  - baymard-search-bar-ui | Make the search field prominent and always visible in the header to signal that search-led browsing is supported. | https://baymard.com/blog/search-bar-ui
  - apple-wwdc2026-292 | Show recent searches inline when search field gains focus; let users remove individual or all searches. | https://developer.apple.com/videos/play/wwdc2026/292/
  - nhs-component-header | Include a search function in the header to help users find content quickly. | https://service-manual.nhs.uk/design-system/components/header
corpus:
  - siso-ui-code/types.jsonl | section/top-bar: 318 parts (mean 2.77): clean rates 3.28 vs minimal 2.44; micro motion 2.94 vs none 2.48 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | component/command: 229 parts (mean 2.98): dark rates 3.08 vs minimal 2.87; micro motion 2.94 vs none 2.49 (model-rated) | 2026-10-11
check: The header contains a visible input of type search; focusing it lists recent or suggested queries; a clear control empties it.
updated: 2026-10-11
---

## Why

A visible field invites search; an icon must first be noticed and recalled. Suggestions cut typing and spelling errors and teach the words the system uses.

## Do / Don't

- **Do:** Put a search field in the header with a placeholder naming what it searches, a clear (X) button and a keyboard shortcut hint.
- **Don't:** Hide search behind a magnifying-glass icon that opens a blank overlay.

## Evidence

Backing: 8 independent organisations across 14 quoted claims (2 experiment, 9 guideline, 3 study). Clusters: C0037, C0169, C0229, C0267, C0079.

- **MeasuringU** (study, [measuringu-ux-news](https://measuringu.com/ux-news/)): Include an obvious search bar on news homepages; absent search reduces task completion and frustrates users seeking specific articles. Measured: The Guardian and Huffington Post had lowest task completion rates due to missing visible search functionality.
- **Nielsen Norman Group** (study, [nngroup-compensatory-decisions](https://www.nngroup.com/articles/compensatory-noncompensatory-decisions/)): Implement multiword search that filters results to items matching every word in the query, not items matching any word separately. Measured: In-site searches contain an average of 2.3 words per query, including color, size, and brand.
- **GoodUI** (experiment, [goodui-pattern-94](https://goodui.org/patterns/94/)): Display a search bar prominently on the page to enable faster user navigation.
- **Baymard Institute** (guideline, [baymard-search-bar-ui](https://baymard.com/blog/search-bar-ui)): Make the search field prominent and always visible in the header to signal that search-led browsing is supported.
- **Apple** (guideline, [apple-wwdc2026-292](https://developer.apple.com/videos/play/wwdc2026/292/)): Show recent searches inline when search field gains focus; let users remove individual or all searches.
- **NHS** (guideline, [nhs-component-header](https://service-manual.nhs.uk/design-system/components/header)): Include a search function in the header to help users find content quickly.

## Check

The header contains a visible input of type search; focusing it lists recent or suggested queries; a clear control empties it.
