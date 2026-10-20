# Numeric series additions

Original MIT React/SVG implementations; no extra runtime dependency. Import from `@siso/charts` after root export integration. These fill geometry/behavior gaps beside the existing Recharts compound APIs; use their existing `.Brush` for line/area index-range zoom.

```tsx
import { SisoScatter, SisoWaterfall, SisoCandlestick, SisoBoxPlot } from "@siso/charts"

<SisoScatter title="Usage and revenue" bubble xLabel="Usage" yLabel="Revenue"
  data={[{ id: "a", label: "Account A", x: 10, y: 20, size: 4, group: "Team" }]}
  reference={{ x: 12, y: 25 }} selectedId={selectedId} onSelect={setSelectedId} />
<SisoWaterfall title="Balance bridge" initialValue={100}
  data={[{ label: "Growth", value: 30 }, { label: "Costs", value: -20 }, { label: "Closing", kind: "total", value: 110 }]} />
<SisoCandlestick title="Price intervals" variant="hollow"
  data={[{ label: "Monday", open: 10, high: 15, low: 8, close: 13 }]} />
<SisoBoxPlot title="Latency distribution"
  data={[{ label: "Service A", low: 10, q1: 20, median: 30, q3: 40, high: 50, outliers: [70] }]} />
```

All charts require a `title`, accept `description`, `height`, `className`, and `formatValue`, fit their container width, and expose exact full values in an expandable semantic table. Colors inherit CSS custom properties `--siso-chart-accent`, `--siso-chart-positive`, `--siso-chart-negative`, and `--siso-chart-text`; scatter accepts `groupColors`. There is no animation or fabricated demo data in components.

- Scatter uses numeric linear axes. Bubble **area** is proportional to supplied nonnegative `size`; zero has no visible area. Duplicate/empty IDs and nonfinite coordinates are excluded with a count. Selection is controlled; circles support Enter and Space when `onSelect` is supplied.
- Waterfall adds deltas to `initialValue`; `kind="total"` is an absolute checkpoint drawn from zero and sets the next step's balance. Any invalid value or overflowing running balance rejects the entire bridge, because skipping it would falsify subsequent balances. Totals are supplied, never inferred.
- Candlesticks use caller-ordered categorical interval labels and validated finite OHLC values. Variants are `filled`, `hollow` (hollow rising candles), and `ohlc` ticks. Invalid observations are excluded with a count. No date resampling, trading transport or volume pane is included.
- Box plots accept caller-computed quartiles and whisker bounds, require `low <= q1 <= median <= q3 <= high`, and optionally render supplied outliers. An invalid summary or nonfinite outlier excludes that row; no statistical convention is invented.

SVG category labels are thinned and truncated for fit; the table retains every label. Financial pane overlays, histogram binning, regression, log axes, brush selection of scatter points, collision layouts and streaming transports are explicitly deferred in `charts/ownership-series.json`.
