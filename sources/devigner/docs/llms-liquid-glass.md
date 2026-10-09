# Liquid Glass

> An iOS 27 style glass menu whose rim bends the page behind it: a pill that swells into a squircle panel of rows and melts back once you pick one.

- Page: https://ui.devigner.cc/components/liquid-glass
- Category: Primitives
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add liquid-glass` (writes components/ui/liquid-glass.tsx)
- Packages it needs: cn, motion, devignerui

## What the demo shows

The live demo is a GlassMenu over a dot field: a Menu pill that swells out from its center into a squircle glass panel of four rows, its text zooming out of the way while the rows zoom in from a little larger and blurred. Pick a row, press Escape or press outside and it melts back into the pill. Pressing the pill swells it slightly and it wobbles back when let go. In Chrome and Edge the rim bends whatever sits behind it.

## When to use it

- A small set of actions or destinations that should stay out of the way until asked for, such as a view switcher or a shape picker.
- Floating controls over media, maps or artwork, where the Liquid Glass look matches the surroundings.

## When to reach for something else

- Long lists or anything that needs search or scrolling. The panel grows to fit every row; use a combobox or a command menu.
- Dense toolbars with many menus side by side: each one is its own glass surface with a backdrop filter, which costs GPU time.

## Usage

```tsx
import { GlassMenu } from "@/components/ui/liquid-glass";

<GlassMenu items={items} onSelect={go} />
```

Custom composition:

```tsx
<GlassMenu label="Shapes" items={items} open={open} onOpenChange={setOpen} onSelect={pick} transparency={0.6} />
```

### Shape picker

onSelect gets the row's id, then the panel melts back.

```tsx
import { GlassMenu } from "@/components/ui/liquid-glass";
import { IconDiamond, IconRecord, IconStop } from "@devigner-ui/icons";

export function ShapeMenu({ pick }: { pick: (id: string) => void }) {
  return (
    <GlassMenu
      label="Shapes"
      onSelect={pick}
      items={[
        { id: "circle", label: "Circle", icon: <IconRecord className="size-6" /> },
        { id: "square", label: "Square", icon: <IconStop className="size-6" /> },
        { id: "diamond", label: "Diamond", icon: <IconDiamond className="size-6" /> },
      ]}
    />
  );
}
```

### Controlled

Keep the open state in React, for example to close the menu from elsewhere.

```tsx
import { useState } from "react";
import { GlassMenu } from "@/components/ui/liquid-glass";

export function ViewMenu({ items, show }: {
  items: { id: string; label: string }[];
  show: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <GlassMenu
      label="View"
      items={items}
      open={open}
      onOpenChange={setOpen}
      onSelect={show}
      transparency={0.6}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `{ id, label, icon?, disabled? }[]` | - | Rows of the panel, in order. |
| onSelect | `(id: string) => void` | - | Fires with the picked row's id, then the panel melts back. |
| open | `boolean` | - | Controlled open state. |
| defaultOpen | `boolean` | false | Initial open state. |
| onOpenChange | `function` | - | Fires when the panel opens or closes. |
| label | `string` | Menu | Text on the closed pill, and the menu's accessible name. |
| transparency | `number` | 0.05 | Glass tint from 0 (ultra clear) to 1 (fully tinted). |
| disabled | `boolean` | false | Disables interaction. |

## Keyboard

| Keys | Action |
| --- | --- |
| Enter / Space | On the pill, opens the panel and moves focus to the first row. On a row, picks it and closes the panel. |
| Arrow Down / Arrow Up | Moves between rows, wrapping at the ends. |
| Home / End | Jumps to the first or last row. |
| Escape | Closes the panel and returns focus to the pill. |
| Tab | Closes the panel. |

## Accessibility

- The pill is a button with aria-haspopup="menu" and aria-expanded; the panel is role="menu" named by label, each row a role="menuitem" button.
- Focus moves to the first enabled row on open and back to the pill on close, so it never drops to the page body.
- The closed panel is inert, so its rows are never tabbed to. Disabled rows are skipped by the arrow keys.
- Under prefers-reduced-transparency the glass turns fully tinted and the lens is switched off, the way iOS handles Reduce Transparency.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- The glass tint mixes var(--background) in by transparency, from 0 (ultra clear, 3%) to 1 (fully tinted, 85%). Even clear glass softens the backdrop slightly; the blur builds up toward the tinted end.
- Rows use text-foreground, with a var(--foreground) wash on hover and focus. Hovering the closed pill lights it faintly from inside and pressing lights it brightly, in white light, in both themes.
- The rim has a crisp specular line and a soft inner glow, brightest at the top left and bottom right, plus a faint var(--foreground) line at 8% just outside. The specular light and the drop shadow are white and black light, the same in both themes. In Chromium the rim also splits a thin rainbow, like real glass.
- The closed pill has gently squircle ends and the open panel firms up into squircle corners as it grows. Browsers with CSS corner-shape draw the focus rings and row highlights with the same curve; others keep them round.
- Pass className to place the wrapper.

## Edge cases

- The panel grows out of the pill's center, as far each way, and floats over its surroundings without moving them. Over the clear glass anything underneath shows through the rows, so leave it free space all around or raise transparency.
- The pill fits its label and the panel fits its widest row; both are re-measured when fonts load or the content changes.
- The lens that bends the page behind the rim only renders in Chromium browsers (Chrome, Edge, Arc, Opera). Safari and Firefox show the same frosted glass without the bend.
- The lens needs something behind it. On a flat background the glass looks frosted either way; place it over images, stripes or text to see it.
- An ancestor with filter, opacity below 1 or a mask cuts the glass off from the page behind it, so the lens and blur only see content inside that ancestor.
- Setting disabled while open closes the panel.

## Troubleshooting

**The rim does not bend anything.**
The lens only renders in Chromium browsers, and only when there is visible detail behind the glass. Also check that no ancestor has filter, opacity below 1 or a mask, which cuts the glass off from the page behind it.

**The glass looks solid.**
Lower transparency. If it stays solid, the system Reduce Transparency setting is on, which forces the tinted look.

**The open panel covers content I need.**
The panel floats and grows from the pill's center in every direction. Place the pill where there is room around it, or raise transparency so what is underneath doesn't show through.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
