# Nav Notch

> A row of small notches that works as a navigation bar: the one under the pointer opens into a labelled chip and its neighbours swell around it like a lens.

- Page: https://ui.devigner.cc/components/nav-notch
- Category: Navigation
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add nav-notch` (writes components/ui/nav-notch.tsx)
- Packages it needs: cn, motion, devignerui

## What the demo shows

The live demo is a bar of ten notches with Link 5 current. Move the pointer along it and a lens glides with it: the notch underneath opens into a chip with its label and the two notches either side grow taller and brighter. Leave the bar and the lens fades out, leaving the current link as the one bright notch.

## When to use it

- A compact section or page switcher where the labels can stay hidden until someone looks for them, such as a portfolio, a slide deck or a long one-page site.
- A secondary navigation bar with a handful to a dozen links of similar weight.

## When to reach for something else

- Primary navigation people need to scan at a glance. The labels are hidden until hovered or focused; use visible tabs or links.
- Long lists of links. Past fifteen or so notches the bar gets wide and the targets thin; use a menu or a sidebar.

## Usage

```tsx
import { NavNotch } from "@/components/ui/nav-notch";

<NavNotch items={items} defaultValue="Home" />
```

Custom composition:

```tsx
<NavNotch items={items} value={page} onValueChange={setPage} label="Sections" />
```

### Section switcher

Keeps the current section in React state.

```tsx
import { useState } from "react";
import { NavNotch } from "@/components/ui/nav-notch";

const items = ["Intro", "Work", "About", "Contact"].map((label) => ({
  label,
  href: `#${label.toLowerCase()}`,
}));

export function Sections() {
  const [section, setSection] = useState<string | null>("Intro");
  return <NavNotch items={items} value={section} onValueChange={setSection} label="Sections" />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `{ label, href?, id?, onSelect? }[]` | - | The links, one notch each. An item with href renders a link, otherwise a button. |
| value | `string \| null` | - | Controlled id (or label) of the current item, whose notch is drawn brighter. |
| defaultValue | `string \| null` | null | Initial current item; null leaves every notch closed. |
| onValueChange | `function` | - | Fires with the id (or label) of the clicked item. |
| label | `string` | Navigation | Accessible name for the nav landmark. |
| orientation | `"horizontal" \| "vertical"` | horizontal | Lays the notches out in a row or a column. |
| side | `"left" \| "right"` | right | Vertical only: the side the open chip grows out of the track toward. |
| classNames | `NavNotchClassNames` | - | Slot classes for track, notch and label. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Moves focus into the bar, onto the current link, and out again. |
| Arrow Left / Arrow Right | Moves between notches; Arrow Up and Arrow Down do the same. |
| Home / End | Jumps to the first or last notch. |
| Enter | Follows the link, or picks the item when it has no href. |

## Accessibility

- Renders a nav landmark named by label, with a list of real links (or buttons for items without href).
- Labels stay in the DOM while hidden, so screen readers read every link name.
- The current item carries aria-current="page".
- The bar is a single tab stop with the arrow keys moving inside it, and the focused notch opens just like a hovered one, with a visible focus ring.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- The track is var(--foreground) mixed 9% into var(--background) with a lit top rim, a shaded bottom lip and a hairline edge; notches and the chip are var(--foreground) with var(--background) text and a soft bevel. Every shade is a mix of var(--foreground) or var(--background), so it flips with the theme.
- classNames targets track, notch and label. Put placement classes in className.

## Edge cases

- The notch hit areas touch each other, so the pointer is always over exactly one notch and moving across the gaps never flickers.
- With orientation="vertical" the notches stack in a column and the open chip pops out of the track toward side (right by default), overlapping whatever sits beside the bar. Leave room on that side.
- The current item only changes color: its notch is drawn at full strength and never opens into a chip on its own.
- Two items with the same label need an id each, since value falls back to label.
- A click sets the current item before onSelect runs; with value passed, the bar only changes when you update it.

## Troubleshooting

**No notch is highlighted when the page loads.**
Pass defaultValue (or value) with the id or label of the current item. Without it every notch rests at the same strength.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
