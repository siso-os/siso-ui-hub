# White papers

The long, published argument for a set of principles. A paper is written from rules in `../principles/` and cites them by id; a claim with no rule behind it doesn't go in.

Owner: UI-PRINCIPLES. Shaan picks what gets written next. Posting goes to the blog on the SISO landing (`_data/siso-landing`, owner SISO-LANDING) by a PR there, only when Shaan says post it.

File name: `W01-short-slug.md`. Status runs: proposed → drafting → review (Shaan reads) → published (with the URL).

## Proposed (11 Oct 2026)

| Id | Paper | What it argues | Built from | Status |
|---|---|---|---|---|
| W01 | **The UI base** | What every SISO app rests on: one shell that loads once, one side nav, and a small set of atoms with all their states. Drawn from the 8 side navs we built (`systems/side-nav/`), the ~1,200 pattern types that 5+ libraries all make (siso-ui-code types.jsonl, 11 Oct: 1,205 by exact name, 1,022 after the hub's name normalising), and Carbon, Material 3, Fluent and Geist. | hub-0010, hub-0014, hub-0015, P0001, the side-nav comparison | proposed (first) |
| W02 | **Taste, measured** | What 102,533 rated UI parts say looks good: editorial and 3D beat minimal (3.48 vs 2.30), parts that respond to you beat static ones (3.30 vs 2.25), and each slot may have a winner (heroes editorial or 3D, sidebars dark, charts monochrome; to be measured before drafting). The ratings are a model's, which the paper says up front. Nobody else has this dataset. | siso-ui-code corpus, Refactoring UI, Laws of UX | proposed |
| W04 | **Built for the mind** | Why people act, decide and come back: first impressions in 50 ms, choice and defaults, goal-gradient and endowed progress, reward and habit loops, and what large A/B tests measured (speed, forms, search cues). Where the line sits: the dark-pattern research. Shaan, 11 Oct: "how dopamine works … human psychology experiments with UI for consumers, for businesses". | research/ psychology, experiments, engagement (~540 sources) | proposed |
| W03 | **Pages that tell the truth** | How a SISO page is laid out and how it reports state: bands (glance, work, detail), widgets as data, detail opening in place, and honest loading, empty, stale and broken states. | hub-0002 to hub-0005, hub-0009, GOV.UK, Polaris, Atlassian, NN/g | proposed |

## The research library (11 Oct 2026, Shaan)

Every paper is built on `../research/`: a sweep of the published UI-principles sources from Google, Apple, Microsoft, IBM, Shopify, Atlassian, GOV.UK, W3C, NN/g, research labs and the canonical books. Each source is distilled into claims, claims are clustered into consensus rules, and strong rules become `principles/P####`. The library is released alongside our papers: links and our distillation for every source, full text only where its licence allows.

## Backlog (ask Shaan)

- Built by agents: a design system an AI can follow (principles as data, take before you build, ui-pick).
- Words on screens: say it once, in fewer words (hub-0006, GOV.UK content design, Stripe).
- Motion with a job (hub-0013, Material 3 motion, Apple HIG).
- Tokens and themes: one set, many looks (hub-0014, Geist, Polaris, Carbon).
