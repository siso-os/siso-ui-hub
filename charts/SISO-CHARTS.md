# SISO charts: the package and the curated list

Current package workbench: https://siso-ui-suite.siso-show.pages.dev/#charts. The wider reference gallery remains at https://charts-curated.siso-show.pages.dev. Use [PACKAGES.md](../PACKAGES.md) for the complete SISO suite and its private release channel. The curation lists below record the earlier gallery review; they are not the shipped API inventory.

## Where the package lives

- Code: `packages/siso-charts/` in this repo (`@siso/charts` 0.1.0, private). Entry `src/index.ts`.
- Build and pack: `scripts/build-suite.mjs`; verify installation with `scripts/build-consumer.mjs`. `bin/charts-package` is the earlier gallery/source generator, not the suite release builder.
- Licence: independently authored SISO APIs plus attributed MIT Evil Charts compounds. Existing Arc/Tweenly implementations remain reference material and are excluded from the release graph. Keep LICENSE and NOTICE.

## How a project installs it

Needs React 19, recharts ^3.8.0, framer-motion ^12, clsx and tailwind-merge. The compiled stylesheet supplies the chart utilities; a consumer does not need Tailwind or a CSS-module build.

1. Install the private release tarballs as described in `PACKAGES.md`; the umbrella needs all seven sibling tarballs installed together.
2. Import `@siso/charts/styles.css` and optionally `@siso/tokens/styles.css`, or use the umbrella's single stylesheet.
3. Use `@siso/charts/basic`, `/series` or `/special` for focused imports. The root also exposes compound Recharts APIs.
4. Mark consuming chart components `// uihub: siso:charts` and supply the product's own data.

```tsx
import { SisoArea, SisoBars, SisoLine, SisoDonut, SisoRadial, SisoRadar } from "@siso/charts"

<SisoArea data={rows} xKey="month" keys={["desktop", "mobile"]} palette="rainbow" curve="monotone" fill="gradient" stroke="dashed" stack="stacked" />
```

Options on the one-line wrappers: `palette` (green-red, violet, ocean, sunset, rainbow, aurora, mono), `curve` (monotone, natural, step, bump, linear), `fill` (gradient, gradient-reverse, solid, dotted, lines, hatched), `stroke` (solid, dashed, animated-dashed), `stack` (default, stacked, expanded), `tooltip` (default, frosted-glass), `horizontal` for bars. For anything else use the compound charts (`SisoAreaChart` and the rest) with `.Grid .XAxis .YAxis .Brush .Legend .Tooltip .Area`; a new variant is a new set of props.

The hover card: it is `w-max min-w-40 max-w-72`, rows do not wrap and values do not break, so the width follows the content (the Evil original was a fixed min-width that clipped long labels).

## HALO M4: slot to component (Shaan's picks, 16 Oct)

These are available package choices, not a claim that HALO has been migrated or its adapters verified. Slot ids come from OPERATOR's `M4-chart-picks.md`. Exact input contracts are exported by each package.

| Slot | Component | Notes |
|---|---|---|
| H1 Earnings over time | `SisoArea` (gradient, one area per site) | Evil base |
| H2 Nights | `SisoCompactBars` | per-series colour |
| H3 Where it came from / O4 site split | `SisoDonutChart` | independent static slices |
| H4 Tonight's goal ring | `SisoGoalRing value goal` | independent SVG; actual against goal |
| H5 Her pace | `SisoMultiLine` | host supplies series and observations |
| H6 Headline tile | `SisoTrendCard` | current value and baseline series |
| H7 Nights calendar | `SisoContributionHeatmap` | UTC calendar; legacy rich hover parity is not promised |
| O1 Money: days and pace | `SisoComposedChart` | compound API |
| O2 Hours live by site | `SisoBars stack="stacked" slim` | thin bars |
| O3 Leaderboard | `SisoBars horizontal` | |
| O5 Money flow | `SisoSankeyChart` | |
| O6 Compare two creators | `SisoRadar` | |
| O7 When the tips come | `SisoMatrixHeatmap tone="amber"` | weekday by hour matrix |
| O8 Incidents | `SisoMatrixHeatmap tone="red"` | service by period matrix |
| O9 Health | `SisoGauge` | bounded value and optional target |
| O10 Money tiles | `SisoSparkline` | signed compact series |
| Conversion funnel (not an M4 slot) | `SisoFunnel` | stage counts and drop-off |
| Range area | `SisoRangeArea` | low/high band and optional midpoint |
| X2 treemap, X3 slope, X5 waffle, X7 progress | `SisoTreemap`, `SisoSlopeChart`, `SisoWaffleChart`, `SisoGoalRing` | independent SISO APIs |
| X1 streamgraph, rich X4 brushing, X6 decorative dots | deferred | see the ownership decision files; do not copy reference-only source |

## Historical gallery imports

The earlier gallery staged code already held in `siso-ui-code`, the 21st bank and the hub kit: uiarc (12), Tweenly (9), the then-current SISO demos (9), and the SISO landing's contribution city. This was reference work. The suite's current included mechanisms, independent implementations and licence exclusions are recorded above and in its inventories; these historical gallery counts are not release counts.

## Compatibility with the earlier Arc names

`ArcBars`, `ArcLine`, `ArcDonut`, `ArcHeatmap`, `ArcSparkline`, `ArcGauge` and `TweenlyRadial` now name independently authored SISO basics. They preserve useful names, not the original implementations or every prop, ref, hover, animation and style behavior. New consumers should use the Siso-prefixed APIs and their exported types. The original registry files are excluded from packed code.

- The release supplies its styles and uses SISO semantic variables with standalone fallbacks.
- `inventory.json` records 24 behavior families and their variations. `charts/ownership-series.json` and `charts/ownership-special.json` record reviewed, covered and deferred mechanisms.

## The curated list

The best at the top of each type, from 5,789 catalogued parts, 3,677 of them charts or visuals (the other 2,112 are not charts and are left out of the page, kept in `charts/not-charts.jsonl`; 3,677 + 2,112 = 5,789), folded to 1,849 distinct charts with our 16 own added (near-identical versions are one chart with variants; Evil Charts' 230 examples are one family). Shaan's libraries lead: UI Arc, Evil Charts, LiveDocs, shadcn UI blocks, shadcn dashboard, Tweenly; then NSUI, PlotCN, ReactFrame, BUI/Bjork, 8starlabs, MiniDev, DashboardCN, Spectrum UI. Pie, donut and radial are one group; sparkline is a line chart; gauges, rings and countdowns are Visuals.

### Area (305 parts, 134 charts)

- `21st/ahmedmayara__conversion-funnel-area-chart` (live), 13 versions folded — conversion funnels (his: "conversion funnels alright")
- `reactframe/range-area-chart` (live) — range area, ReactFrame (his: "range area chart, react frame, okay")
- `evilcharts/ex-dotted-area-variant-area-chart` (live), 50 versions folded
- `siso/area-rainbow` (live)
- `siso/area-green-red` (live)
- `siso/area-spiky` (live)
- `plotcn/area-interactive` (live), 7 versions folded
- `livedocs/area-chart` (live), 2 versions folded
- `uiarc/streamgraph` (live)
- `ns-ui/chart-ridgeline-terrain` (live), 2 versions folded
- `reui/c-chart-15` (live), 4 versions folded
- `livedocs/depth-chart` (live)
- `spectrumui/depth-chart` (live), 2 versions folded
- `plotcn/area-baseline` (live), 2 versions folded

### Bar (485 parts, 227 charts)

- `21st/ahmedmayara__category-bar-chart` (live), 9 versions folded — category bar, 21st.dev (his: "see when there's different variants of it, it's good")
- `21st/reaviz__incident-bar-chart` (live), 4 versions folded — incident report (his: "incident reports are a nice comp")
- `evilcharts/ex-duotone-reverse-variant-bar-chart` (live), 53 versions folded
- `siso/bars-stacked` (live)
- `siso/bars-horizontal` (live)
- `siso/arc-bars` (live)
- `livedocs/waterfall-chart` (live), 8 versions folded
- `spectrumui/histogram-chart` (live), 9 versions folded
- `tweenly/chart-bar` (live)
- `reui/c-chart-10` (live), 3 versions folded
- `ns-ui/chart-bar-dither` (live), 2 versions folded
- `spectrumui/bar-chart` (live), 2 versions folded
- `livedocs/cashflow-chart` (live), 13 versions folded
- `reactframe/bar-chart` (live)

### Line (and sparkline) (472 parts, 231 charts)

- `evilcharts/ex-glowing-desktop-echarts-line-chart` (live), 64 versions folded
- `siso/line-dashed` (live)
- `siso/arc-line` (live)
- `siso/arc-sparkline` (live)
- `uiarc/slope-chart` (live), 3 versions folded
- `livedocs/range-chart` (live), 4 versions folded
- `ns-ui/sparkline-automaton` (live), 9 versions folded
- `uiarc/brush-chart` (live)
- `plotcn/line-milestones` (live), 2 versions folded
- `tweenly/chart-kpi` (live)
- `tweenly/chart-line` (live)
- `livedocs/line-chart` (live)
- `ns-ui/chart-line-dither` (live)
- `plotcn/line-focus` (live)

### Pie, donut and radial (336 parts, 147 charts)

- `evilcharts/ex-glowing-pie-chart` (live), 34 versions folded
- `siso/donut` (live)
- `siso/radial-semi` (live)
- `siso/arc-donut` (live)
- `shadcn-dashboard/pie-chart-03` (live), 5 versions folded
- `shadcn-dashboard/pie-chart-04` (live), 4 versions folded
- `spectrumui/radial-chart` (live), 7 versions folded
- `ns-ui/chart-donut-halftone` (live), 2 versions folded
- `tweenly/chart-radial` (live)
- `tweenly/chart-rings` (live)
- `reui/c-chart-20` (live), 3 versions folded
- `21st/kokonutd__apple-activity-ring` (live), 4 versions folded
- `livedocs/radial-chart` (live), 10 versions folded
- `reactframe/pie-chart` (live)

### Radar (171 parts, 61 charts)

- `siso/radar` (live)
- `evilcharts/ex-glowing-radar-chart` (live), 14 versions folded
- `shadcn-dashboard/radar-chart-05` (live), 6 versions folded
- `tweenly/chart-radar` (live)
- `ns-ui/chart-radar-dither` (live)
- `reui/c-chart-23` (live), 2 versions folded
- `livedocs/radar-chart` (live)
- `bklit/radar-chart` (live), 2 versions folded
- `reactframe/radar-chart` (live)
- `spectrumui/radar-chart` (live)
- `glint-ui/radar`, 13 versions folded
- `21st/LegionWebDev__radar-chart` (live), 3 versions folded
- `sf-fleet-hud/radar`, 3 versions folded
- `shadcnblocks/chart-chart-radar-grid-circle-fill`, 3 versions folded

### Heatmaps (207 parts, 133 charts)

- `21st/bankkroll__contribution-graph` (live), 9 versions folded — contribution heatmap (his: "the contribution heat maps always a nice one")
- `xevrion/contribution-heatmap` — contribution heatmap
- `landing--contribution-city` (live) — the 3D heatmap on our landing (his: "a 3D one that we have on one of our landing pages")
- `siso/arc-heatmap` (live)
- `spectrumui/cohort-chart` (live), 6 versions folded
- `tweenly/chart-heatmap` (live)
- `ns-ui/heatmap-year-stipple` (live)
- `spectrumui/calendar-heatmap` (live)
- `shadcn-ui-blocks/portfolio-pro-developer-portfolio-contributions-grid`, 12 versions folded
- `uiarc/activity-heatmap` (live)
- `livedocs/heatmap-chart` (live)
- `21st/designali-in__git-hub-calendar` (live), 3 versions folded
- `shadcnblocks/contribution-graph-contribution-graph-standard-1`, 4 versions folded
- `shadcn-ui-blocks/application-pro-activity-activity-heatmap`, 6 versions folded

### Funnel, sankey and flow (132 parts, 52 charts)

- `21st/bklitai__funnel-chart` (live), 5 versions folded — the 21st.dev funnel (his: "Funnel chart from 21st.dev is good")
- `shadcn-ui-blocks/application-pro-charts-conversion-funnel-bars`, 4 versions folded — conversion funnel
- `evilcharts/ex-labeled-nodes-echarts-sankey-chart` (live), 21 versions folded
- `spectrumui/market-heatmap` (live), 3 versions folded
- `livedocs/funnel-chart` (live)
- `ns-ui/chart-funnel-stage-drop` (live), 2 versions folded
- `bklit/funnel-chart` (live), 10 versions folded
- `bklit/sunburst-chart` (live), 5 versions folded
- `uiarc/treemap` (live)
- `livedocs/sankey-chart` (live)
- `beui/treemap`, 14 versions folded
- `hirael/chart-04`, 4 versions folded
- `ssych/sankey-flow`
- `uitripled/cash-flow-chart`

### Composed (100 parts, 37 charts)

- `evilcharts/ex-duotone-variant-composed-chart` (live), 29 versions folded
- `spectrumui/composed-chart` (live), 12 versions folded
- `livedocs/live-price-chart` (live)
- `livedocs/candlestick-chart` (live)
- `spectrumui/candlestick-chart` (live), 2 versions folded
- `bklit/candlestick-chart` (live), 10 versions folded
- `bklit/composed-chart` (live), 3 versions folded
- `shadcn-ui-blocks/application-pro-charts-pareto-error-chart`
- `tile-ui/liveline`
- `voraui/trading-chart`
- `gh-aadiexii-rithm-ui/candlestick-chart`
- `gh-devclub-nstru-component-library/candlestick-chart`
- `ssych/candlestick`
- `gh-aadiexii-rithm-ui/composed-chart`, 4 versions folded

### Scatter and bubble (48 parts, 17 charts)

- `livedocs/scatter-chart` (live), 15 versions folded
- `ns-ui/chart-scatter-ascii-bin` (live)
- `shadcn-ui-blocks/application-pro-charts-bubble-chart`, 3 versions folded
- `21st/trophyso__points-chart` (live), 3 versions folded
- `dashboardcn/scatter-chart`, 7 versions folded
- `bjork-ui/beeswarm`
- `gh-timbal-ai-blueprint-ui-simple-chat/tokens-chart-card`, 5 versions folded
- `21st/charlesinwald__quadrant-chart`
- `bjork-ui/calibration-plot`
- `gaia/scatter-chart`

### Visuals (gauges, rings, countdowns) (1127 parts, 642 charts)

- `siso/arc-gauge` (live)
- `ns-ui/braze-capillary-fill` (live), 8 versions folded
- `ns-ui/meter-latency-capillary` (live), 5 versions folded
- `uiarc/gauge` (live)
- `tweenly/chart-dots` (live)
- `tweenly/chart-progress` (live)
- `uiarc/usage-meter` (live), 15 versions folded
- `reactframe/progress-circle-bars` (live)
- `shadcn-dashboard/radial-chart-05` (live), 6 versions folded
- `21st/admin_a46d2fee__gauge` (live), 3 versions folded
- `21st/daiwiikharihar__analogue-gauge` (live), 2 versions folded
- `shadcn-dashboard/progress-01` (live), 3 versions folded
- `spectrumui/usage-meter` (live), 6 versions folded
- `livedocs/usage-meter` (live)

### Maps (51 parts, 22 charts)

- `plotcn/google-geochart` (live), 9 versions folded
- `gh-betatrident-perceptus/tron-map`, 14 versions folded
- `flightcn/flight`, 3 versions folded
- `akoder/dotted-world-map`, 2 versions folded
- `21st/shuding__cobe-globe-pulse`
- `bklit/choropleth-chart`, 5 versions folded
- `aceternity/world-map`
- `catalogs/anmolsaini16/heatmap`
- `gh-eduardez-warren-ui/world-map`
- `mapcn/heatmap`
- `velora/world-map`
- `21st/appvibed01__shopify-3d-globe`
- `blockforge/coverage-map`
- `tool-ui/geo-map`

### Other charts (259 parts, 146 charts)

- `uiarc/waffle-chart` (live), 3 versions folded
- `ns-ui/stem-and-leaf-live` (live)
- `21st/sean0205__chart` (live), 7 versions folded
- `21st/badtzx0__animated-card-chart` (live), 3 versions folded
- `shadcn-ui-blocks/application-pro-charts-dumbbell-latency-chart`
- `shadcn-dashboard/total-orders-chart` (live), 5 versions folded
- `shadcn-ui-blocks/application-pro-charts-bullet-kpi-rows`, 3 versions folded
- `bklit/chart-context` (live), 3 versions folded
- `kibo-ui/gantt`, 10 versions folded
- `dashboardblocks/chart-panel`, 7 versions folded
- `bjork-ui/violin-plot`, 2 versions folded
- `gh-dedevsclub-dedevs-ui/defi-orderbook`, 2 versions folded
- `gh-driveintelligenceai-bluenord-healthcare-dashboard-registry/knowledge-graph-demo`, 2 versions folded
- `devigner/chart-card`, 2 versions folded

## Not charts

2,112 parts left the list: heroes 104, feature sections 114, inputs 78, loaders 206, cards 191, tables 38, forms 33, the image cropper 1, other 1,347. The list with where each belongs: `charts/not-charts.jsonl`.

## Files

`charts/curate.py` (sorting to `curated.json`), `charts/build.mjs` (stages and bundles every part that draws), `charts/page.mjs` + `template.html` (the page), `charts/demos/` (the uiarc, Tweenly and SISO demos). The sorting data (5,789 rows by Haiku scouts) is in `~/SISO_Workspace/_data/charts-curate/`.

## Slim bars and the goal ring (16 Oct, 15:40)
- `SisoBars slim` gives thin 14 px bars with wide gaps, like the shadcn dashboard's (M4 O2). The `siso--bars-stacked` demo uses it.
- The earlier gallery showed a Tweenly-derived goal ring and Arc heatmap hover. The 0.1.0 suite replaces those registry implementations with independent SISO basics; the gallery's historical hover/animation fixes do not establish parity for those new APIs.
