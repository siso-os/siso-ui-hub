# Special charts

Independently authored SVG components, MIT; no reference library code copied. Only chart names/descriptions from the local curated indexes informed behavior selection. No runtime dependencies beyond React. Parent package exports these through `./special`.

- `SisoTreemap`: `data: {id,label,value,color?}[]`, optional `formatValue`. Balanced binary partition, flat categories, proportional area; positive finite weights only.
- `SisoCohortHeatmap`: `data: {id,label,size,retained:(number|null)[]}[]`, optional `periodLabel`, `color`. Values are retained counts; each cohort normalizes against its own starting size. Null, absent, negative, nonfinite or above-population values show as missing, never as zero retention. Array index is age since cohort start, not calendar date.
- `SisoBulletChart`: `data: {id,label,value,target,max,ranges?,color?}[]`, optional `formatValue`. Explicit per-row nonnegative domains, qualitative range bands, actual bars, target markers. Values above max clip visually and are described as clipped in the accessible summary.
- `SisoWaffleChart`: `data: {id,label,value,color?}[]`, optional `columns` (20), `cells` (100, bounded to 1–1000). Largest-remainder allocation, stable input-order ties, exactly the requested cells for a positive total.
- `SisoSlopeChart`: `data: {id,label,before,after,color?}[]`, optional `beforeLabel`, `afterLabel`, `formatValue`. Shared numeric domain includes zero; accepts negative values and extreme finite magnitudes.

All accept `title`, `description`, `className`, `style`, `height`, `emptyLabel`. Responsive 600×300 SVG viewBox; no fixed minimum width. SVG title/description expose complete values without relying on color or hover, shape titles provide pointer detail. Empty/invalid collections produce a status message. Dense slope labels may overlap: filter rows for readable visual comparison; summaries retain all valid values. No animation, click, selection or keyboard action is implied by these static charts.

```tsx
import { SisoBulletChart } from '@siso/charts'
<SisoBulletChart title="Fulfilment" data={[
  { id: 'shipped', label: 'Shipped', value: 72, target: 80, max: 100, ranges: [50, 80] },
]} />
```

Decisions and reference IDs are in `charts/ownership-special.json`. Existing Arc activity calendar, matrix heatmap, goal ring, funnel, pie/radial/radar and Sankey remain existing coverage. Maps, nested trees/sunburst, physics effects and editing/timeline engines are deferred rather than represented as implemented.

## Independently authored basic charts

`owned-basics.tsx` exports `SisoCompactBars`, `SisoMultiLine`, `SisoDonutChart`, `SisoSparkline`, `SisoGauge`, `SisoContributionHeatmap`, `SisoGoalRing` and generic `SisoRadialSlices`. All types are exported. These implementations import only the SISO frame and React transitively. No Arc/Tweenly source is bundled or reused.

Basic data compatibility: bars use `{key,label,axisLabel?,value}`; lines use `{key,label,axisLabel?,values}` plus `{key,label,color?,dashed?,area?}` series; donut uses `{key,label,value,color?}`; sparkline uses number arrays; heatmap uses `{date,count}` days; gauge uses `value,min?,max?`; goal uses `value,goal`; radial uses arbitrary objects with `nameKey,valueKey,innerRadius` or `holeRatio` (0 means pie). Labels and `color,className,height` are supported where applicable. Controlled hidden keys/series filter donut and lines.

Compatibility limits: static SVG only, no active/hover callbacks, selection, uncontrolled legend toggling, ref handles, curve smoothing, automatic grouping, threshold tones, actions slots, locale formatting, headline animation or Arc token stylesheet. `tone`, `interactive` and radial decoration props are accepted for basic demo compatibility but do not implement the old behavior. Use the SISO APIs rather than assuming full legacy prop compatibility. Donut `unit`/`legend` and bars summary label props have no visual effect. Sparkline `width` is intentionally replaced by responsive width. Contribution heatmap aligns real UTC dates into weeks; missing dates remain missing rather than being invented as zero; duplicate dates use the last valid input; ranges over 3660 days produce empty state. It does not render month labels. Gauge/ring visual fills clamp at the supplied range but retain the actual numeric value in the accessible summary. Radial charts omit nonpositive values; all-zero radial inputs are empty. Charts show supplied exact values in accessible descriptions; no animations or inferred data.
