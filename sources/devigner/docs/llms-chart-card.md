# Chart Card

> A stats card whose bars show their value as you move across them.

- Page: https://ui.devigner.cc/components/chart-card
- Category: Data Display
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add chart-card` (writes components/ui/chart-card.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is a Total sales card with seven months of bars. The June bar starts open with a hatched fill and a tooltip. Click or tap another bar and the tooltip travels to it.

## When to use it

- A dashboard tile with one headline number and a short series behind it, such as monthly sales or weekly signups.
- Small series of about 4 to 12 points, where each bar is wide enough to press.

## When to reach for something else

- Long or dense series, multiple series or axes with scales. Use a charting library for those.
- Data where negative values matter: bar heights assume values of 0 and up.

## Usage

```tsx
import { ChartCard } from "@/components/ui/chart-card";

<ChartCard data={sales} />
```

Custom composition:

```tsx
<ChartCard data={sales} renderTooltip={({ point }) => <strong>{point.value}</strong>} />
```

### Controlled selection

Keep the open bar in your state, for example to show details for that month elsewhere on the page.

```tsx
import { useState } from "react";
import { ChartCard, type ChartCardActiveId } from "@/components/ui/chart-card";

const sales = [
  { id: "jan", label: "Jan", value: 4200 },
  { id: "feb", label: "Feb", value: 6100 },
  { id: "mar", label: "Mar", value: 5300 },
];

export function SalesCard() {
  const [active, setActive] = useState<ChartCardActiveId>("feb");
  return (
    <ChartCard
      title="Revenue"
      caption="this quarter"
      data={sales}
      activeId={active}
      onActiveChange={setActive}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| data | `ChartCardPoint[]` | - | Chart data: { id?, label, value }. |
| title | `ReactNode` | Total sales | Card title. |
| caption | `string` | for all time | Line above the headline figure. |
| total | `number` | sum of data | Headline figure. |
| activeId | `ChartCardActiveId` | - | Controlled point. |
| defaultActiveId | `ChartCardActiveId` | - | Initial point. |
| onActiveChange | `function` | - | Active point callback. |
| actions | `ChartCardAction[]` | - | Actionable header actions. |
| renderPoint | `function` | - | Point slot. |
| renderTooltip | `function` | - | Tooltip slot. |
| renderActions | `function` | - | Actions slot. |
| classNames | `ChartCardClassNames` | - | Slot classes. |
| slotProps | `ChartCardSlotProps` | - | Slot attributes. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Moves through the header actions, then each bar. Every bar is a button. |
| Enter / Space | Opens the focused bar and moves the tooltip to it. |

## Accessibility

- Each bar is a <button> named "label: value" (for example "Jun: 16,520") with aria-pressed on the open one.
- Header actions are icon buttons with aria-label taken from each action's label. Actions without onSelect are not rendered, so there are no dead buttons.
- The labels row under the chart is aria-hidden because each bar already names itself.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- classNames targets the root, header, actions, chart, point, tooltip and labels slots, and slotProps passes attributes to them.
- The open bar, its dot and the tooltip use primary; idle bars use bg-accent with a border-input top edge.
- renderTooltip replaces the tooltip content but keeps its position and motion; renderPoint adds content inside each bar.

## Edge cases

- total defaults to the sum of data. Pass it when the headline is not a sum, such as an average or a figure from another source.
- Numbers are formatted with en-US grouping (16,520). Format them yourself in renderTooltip for another locale.
- Give each point a stable id when the data can reorder or change. If activeId points at an id that no longer exists, the tooltip closes rather than jumping to another bar.
- Bars have a minimum height so a near-zero value still shows as a bar.
- Two cards on one page keep separate tooltips.

## Troubleshooting

**My header action buttons do not show up.**
Only actions with an onSelect function are rendered. Add onSelect to each action.

**The wrong bar is open after the data updates.**
Without ids, bars are matched by index. Give each point a stable id and select by that id.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
