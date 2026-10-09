# Magnetic Button

> Leans toward your cursor before you reach it, then lets go with a wobble.

- Page: https://ui.devigner.cc/components/magnetic-button
- Category: Animation
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add magnetic-button` (writes components/ui/magnetic-button.tsx)
- Packages it needs: cn, gsap, motion, devignerui

## What the demo shows

The live demo is a gradient Get started button. Move the pointer near it and the pill leans toward the cursor while the label drifts and tilts a little further, then both spring back with a wobble when the pointer leaves the field.

## When to use it

- One primary call to action per view, such as a hero or pricing button, where a bit of playful physics earns attention.
- A link that should feel like a button, via href, including external links (target="_blank" gets rel="noopener noreferrer" added for you).

## When to reach for something else

- Dense toolbars, forms or lists of buttons: several magnetic fields next to each other compete for the cursor.
- Destructive actions. Use Delete Button, which asks for confirmation.

## Usage

```tsx
import { MagneticButton } from "@/components/ui/magnetic-button";

<MagneticButton>Continue</MagneticButton>
```

Custom composition:

```tsx
<MagneticButton className="rounded-none">Continue</MagneticButton>
```

### External link with a softer pull

Lower strength for a subtle lean, and pass href to render a link.

```tsx
import { MagneticButton } from "@/components/ui/magnetic-button";

export function DocsLink() {
  return (
    <MagneticButton href="https://github.com" target="_blank" strength={2} labelStrength={3}>
      View on GitHub
    </MagneticButton>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| children | `ReactNode` | - | Button content. |
| href | `string` | - | Renders a link. |
| strength | `number` | 3 | Cursor pull strength. |
| labelStrength | `number` | 4 | Label parallax strength. |
| field | `number` | 40 | Magnetic field radius. |
| tilt | `number` | 15 | Label tilt. |
| className | `string` | - | Button classes. |
| disabled | `boolean` | false | Disables interaction. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Focuses the button or link. A focus ring is drawn on the visible pill. |
| Enter / Space | Activates it, like any native button (Enter only for the link form). |

## Accessibility

- Renders a real <button type="button"> or <a>, so screen readers announce the right role and the label is the children you pass.
- The magnetic field is invisible padding cancelled by a negative margin: the hit area grows without moving the layout.
- Disabled links get aria-disabled, lose their href and are removed from the tab order.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- className styles the visible pill, not the invisible field, so backgrounds, rounding and padding go there.
- Defaults use bg-secondary and text-foreground, and the focus ring uses ring-ring.
- strength and labelStrength are 0 to 10 dials. A different value for each gives the parallax between pill and label.

## Edge cases

- The pull only runs on devices with a fine pointer that can hover, so touch screens get a plain button.
- field is the radius in px of the attraction zone. Set it to 0 to turn the magnet off while keeping the button.
- The field's negative margin can overlap nearby elements. Give the button enough room, or lower field, when it sits inside a tight container.

## Troubleshooting

**The button does not move toward the cursor.**
Check that reduced motion is off in the OS and in any MotionConfig above it, that the device has a mouse or trackpad, that disabled is not set, and that field is above 0. GSAP must be installed (npm i gsap).

**Clicks near the button hit it instead of the element next to it.**
That is the magnetic field, which extends field px (40 by default) around the pill. Lower field or add spacing around the button.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
