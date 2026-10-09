# Timeline

> The active step slides off the rail, and the line bends to follow it.

- Page: https://ui.devigner.cc/components/timeline
- Category: Data Display
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add timeline` (writes components/ui/timeline.tsx)
- Packages it needs: cn, motion, devignerui

## What the demo shows

The live demo is a four-step project timeline: Kickoff, Prototype, Polish and Ship. Hover a step, or tab to something inside it, and that row slides off the rail while the line bends around it.

## When to use it

- Roadmaps, onboarding steps, changelogs and process explainers with a handful of steps.
- Showing the current step of a flow with activeId, while hovering still previews the others.

## When to reach for something else

- An interactive stepper that users click to move through a form. Timeline highlights steps but does not navigate between them.
- Very long histories. Each step takes a full row plus spacing.

## Usage

```tsx
import { Timeline } from "@/components/ui/timeline";

<Timeline steps={steps} />
```

Custom composition:

```tsx
<Timeline steps={steps} renderStep={({ step }) => <strong>{step.title}</strong>} />
```

### Mark the current step

Rest on the current step and use your own labels.

```tsx
import { Timeline } from "@/components/ui/timeline";

const steps = [
  { id: "plan", label: "Q1", title: "Plan", description: "Scope the release." },
  { id: "build", label: "Q2", title: "Build", description: "Ship the beta." },
  { id: "launch", label: "Q3", title: "Launch", description: "Open to everyone." },
];

export function Roadmap() {
  return <Timeline steps={steps} defaultActiveId="build" />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| steps | `TimelineStep[]` | - | Timeline steps. |
| activeId | `TimelineActiveId` | - | Controlled step. |
| defaultActiveId | `TimelineActiveId` | - | Initial step. |
| onActiveChange | `function` | - | Step callback. |
| renderStep | `function` | - | Step slot. |
| classNames | `TimelineClassNames` | - | Slot classes. |
| slotProps | `TimelineSlotProps` | - | Slot attributes. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Steps are not focusable on their own. Focusable content you render inside a step (a link or button) highlights that step while it has focus. |

## Accessibility

- Renders an ordered list (<ol>), and each title is an <h3>, so the step order and titles are in the document outline.
- The highlighted step gets aria-current="step".
- The rail and dots are decorative and hidden from assistive technology.
- Under reduced motion nothing slides and the rail stays straight; only the dot color marks the step.

## Theming

- classNames targets the root list, each item and each content block.
- The active dot uses primary, idle dots and the rail use border, titles use text-foreground and descriptions text-muted-foreground.
- renderStep adds your own content above the badge, such as a date, icon or link.

## Edge cases

- label defaults to "Step n". Pass label on each step for dates or version numbers.
- Without defaultActiveId no step is highlighted at rest and the rail is straight until someone hovers.
- When the pointer leaves, the highlight returns to the resting step (defaultActiveId), not to the last hovered one.
- Long titles and descriptions wrap without breaking the rail: its bend is proportional, not measured.
- Give steps stable ids when the list can change.

## Troubleshooting

**The highlight jumps back when I move the pointer away.**
That is by design: it returns to the resting step. Set defaultActiveId to the step that should stay highlighted, or control activeId yourself.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
