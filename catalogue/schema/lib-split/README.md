# Library split: what kinds of library there are, and how each feeds the SISO base

`libraries.jsonl`: 429 libraries with a site, read from their own landing pitch, contents and part names by Haiku (12 Oct 2026):
`use`, `special`, `edge` (one line), `level`, `paid`. Pitch-based and generous; the sieve against the base (below) is the real judge.
The other ~1,460 sources in the index are GitHub app repos (components inside apps), mined last for edge cases only.

| use | base-kit | gap-fill | specialist | raid | showpiece | clone/skip | role in the SISO base |
|---|---|---|---|---|---|---|---|
| app-parts (181) | 23 | 89 | 29 | 15 | 19 | 6 | the base: atoms and components (Arc, then shadcn, then gap-fill) |
| motion (62) | 1 | 24 | 10 | 9 | 18 | 0 | a layer wired onto base parts, kept separate |
| landing-blocks (36) | 8 | 17 | 2 | 3 | 6 | 0 | section variations for sites (efferd's variation sets are the model) |
| specialist (36) | 0 | 12 | 20 | 0 | 2 | 2 | one domain each: rich text, maps, email, video, slides |
| agent-ui (26) | 4 | 4 | 18 | 0 | 0 | 0 | the agent kit |
| dashboard (24) | 6 | 4 | 11 | 2 | 0 | 1 | data grids, shells, KPI sections |
| themes (20) | 5 | 12 | 3 | 0 | 0 | 0 | input to SISO tokens, not parts |
| icons-assets (15) | 2 | 4 | 8 | 1 | 0 | 0 | the assets layer |
| charts (13) | 0 | 10 | 3 | 0 | 0 | 0 | many chart types is the point |
| hooks-utils (10) | 0 | 7 | 1 | 0 | 0 | 2 | code helpers, no visuals |
| page-templates (4) | 2 | 0 | 2 | 0 | 0 | 0 | whole sites and kits |

## The sieve (Shaan, 12 Oct: "we'll be able to knock out a bunch of duplicates and bullshit once we get a good base")

Base first, then every other part gets one of three verdicts against it, by machine:
1. **copy**: same code as a base part (fingerprint, `cp` in the index) -> dropped.
2. **same job**: lands on a map slot (node + variation) the base already fills -> dropped unless its code is clearly more
   complete (states, keyboard, a11y): only those few are read.
3. **new**: a job or variation the map doesn't have -> an edge case: added to the map as a variation (as the agent kits added
   32 on 12 Oct) and its best version joins the base.

Order: the kept libraries (`catalogue/base-set.json`) build base v0.1 -> their leftovers through the sieve -> the other
~360 libraries -> GitHub repos last. Shaan sees the base page and the edge-case list, nothing else.

## First waterfall (12 Oct, night): what each library adds, in Shaan's order

Parts placed by job onto the map (`catalogue/schema/lib-map/<lib>.jsonl`; Arc, shadcn and the agent kits by hand, the 13 below
by Haiku, validated against the skeleton, ~85-90% right on a spot check). The map has 105 kinds of part and 597 variations.

| step | kinds | variations | adds |
|---|---|---|---|
| Arc free | 63 | 88 | nearly all atoms, most components, a starter set of sections |
| + shadcn | 66 | 114 | app shell, side nav, dashboard page; sign-in layouts |
| + Watermelon | 83 | 205 | +91: agent parts, composer, map, player, onboarding, settings, team, testimonials, 404, top bar |
| + minidev | 103 | 318 | +113: whole pages (pricing, about, blog, article, contact, detail, settings), lightbox, TOC, widgets |
| + Kibo | | 325 | +7: kanban, gantt, link preview, zoom gallery |
| + Dice | | 327 | +2 |
| + reui | | 422 | +95: agent approvals and plans, chat variants, app shell variants, empty states, pagination types |
| + Cubby, coss, React Aria, Intent | | 425 | +3 between them: depth, not range |
| + Evil Charts, bklit | | 426 | chart types the map lacks (edges below) |
| + tailark, efferd | 105 | 444 | +18: section variations (contact, FAQ, footer, team) |

So the range comes from five libraries (Arc, shadcn, Watermelon, minidev, reui) plus efferd/tailark for sites; the rest add
edge cases and depth. 153 variations are still empty. `_edges.json`: 156 jobs the map lacks (charts like sankey, candlestick,
funnel; signature pad, image crop, QR code, product tour, cascader, condition builder, order receipt...), to curate into the map.
