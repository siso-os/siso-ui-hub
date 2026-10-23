# @siso/widgets

React 19 dashboard frames and a controlled, data-driven board. Independent SISO implementation, with no HALO source or business adapters. Import `@siso/widgets/styles.css` once. Source exports require a TypeScript-aware bundler; the suite owner produces distributable builds.

```tsx
import { useState } from 'react';
import { SisoWidgetBoard, defaultWidgetLayout, type WidgetDefinition, type WidgetRegistry } from '@siso/widgets';
import '@siso/widgets/styles.css';
const widgets: WidgetDefinition[] = [
  { id: 'activity', type: 'activity', title: 'Activity', band: 'work', span: 6,
    minWidth: 320, sizes: ['M', 'L', 'XL'] },
];
const registry: WidgetRegistry = {
  activity: { label: 'Activity', render: ({ data }) => <p>{String(data)}</p>,
    detail: ({ data }) => <p>{String(data)}</p> },
};
export function Dashboard() {
  const [layout, setLayout] = useState(() => defaultWidgetLayout(widgets));
  return <SisoWidgetBoard widgets={widgets} registry={registry} layout={layout}
    onLayoutChange={setLayout} data={{ activity: { state: 'ready', data: 'Example activity' } }} />;
}
```

## Contract and fitting

- A definition has a stable id, registry type, title, band, requested span, optional minimum width, allowed sizes, options, footer and fill policy. Data is supplied separately by id. The package fetches nothing and persists nothing automatically.
- Bands always render glance, work, detail. Each band is full width with a 12-column grid and one 16px gap. `S=3`, `S-wide=4`, `M=6`, `L=8`, `XL=12`, `band=12`; raw spans also permit 5 and 7. This reflects the newer HALO grid; the hub ADR's earlier tenths are conceptual size guidance, not the serialization unit here. XL is full width, not a separate navigation action.
- Board width is measured with ResizeObserver, including when nested in a narrow panel. At 600px or below every widget occupies 12 columns. Wider panels honor requested spans, increase to satisfy `minWidth` (default 300px), cap at 12, and wrap whole widgets in reading order. Cards never stretch horizontally to close unused columns. A minimum wider than the container cannot be guaranteed; the body scrolls.
- Grid rows share their tallest cell's height. `fluid` stretches and scrolls overflow; `atomic` and `natural` retain content height; `fixed` and `fit` stretch their frame with the row. A definition's optional `height` sets a fixed pixel footprint with scrolling body. The renderer owns content adaptation: size reaches it as a prop; no CSS scaling is applied. Cross-row spans and chart-specific sizing are not implemented.
- `WidgetFrame` supplies title, description, state word, actions, body, footer and detail slots. Loading has a stable 120px skeleton; set a known definition height for an exact footprint. Empty is one reason line; errors offer retry when supplied; stale preserves data with a required age. Each board cell has its own React error boundary. Error boundaries handle render errors, not asynchronous adapter failures; pass those as error data.

## Editing and detail

Supply both `layout` and `onLayoutChange` to retain edits. Menus allow permitted sizes, earlier/later ordering and hide (except locked widgets). Hidden entries appear in Add widgets; unavailable or requested renderers show their reason and are disabled. Visible unavailable entries remain truthful empty/error states. There is no drag dependency. Band ordering takes precedence over order across bands; move controls reorder within the overall order, and visible changes occur within the same band.

Details expand inside the frame. `detailId` and `onDetailChange` let the application map this state to its URL/router and implement Back; no global history is mutated. Without these props detail is local. `SisoWidgetBand` and `WidgetFrame` can also be used without the board.

`defaultWidgetLayout`, `validateWidgetLayout`, `placeWidgets`, `fitWidgetSpan`, and `moveWidget` are pure. `exportWidgetLayout` / `importWidgetLayout` provide versioned JSON containing only order, visibility and sizes; this is a SISO portability extension to observed persisted-layout behavior, not a HALO wire format. Import rejects unknown ids, duplicate ids, hidden locked widgets, unoffered sizes, invalid shapes and payloads over 100,000 characters. Newly registered ids append in registry order. Removed ids require an explicit host migration. Do not persist private widget data in the layout.

## Behavioral references (read only)

HALO CRM's `project-base` worktree, commit `a31e3b820b51c5eec474f5b74c56a4e4188d01c9`, was consulted at these relative paths:

- `src/widgets/engine/WidgetDef.ts`: requested 12-column spans, allowed sizes, minimum widths, fill policies, locked/hidden and registry definitions.
- `src/widgets/engine/WidgetGrid.tsx`: container measurement, readability fitting and wrapping.
- `src/widgets/engine/WidgetBoard.tsx`: centralized size/order/hide controls, unavailable gallery behavior.
- `src/widgets/engine/WidgetShell.tsx`: one shared frame, head/body/footer and content truth.
- `src/widgets/engine/useWidgetLayout.ts`: pure packing and persisted layout contract.

SISO hub `principles/0003`, `0004`, `0005`, `0009` specify bands, data registries, in-place detail and truthful states. These references informed behavior only; HALO code remains in HALO's repository. `NOTICE` records provenance.

## Verification

`npm test` runs six focused Node tests (Node 22.18+ native TypeScript stripping) covering packing, narrow panels, minimums, invalid layouts, immutable moves, schema roundtrip and evolution. React integration must also pass the suite's strict TypeScript and consumer rendering gates. No backend, drag interactions, URL binding or browser visual acceptance is claimed by the unit tests.
