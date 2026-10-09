# Goo Switch

> A switch whose thumb is a drop of liquid: it trails a tail when it moves and stretches over the edge when you pull it too far.

- Page: https://ui.devigner.cc/components/goo-switch
- Category: Forms
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add goo-switch` (writes components/ui/goo-switch.tsx)
- Packages it needs: cn, motion, devignerui

## What the demo shows

The live demo is a switch that is on. Click it and the thumb shrinks to a drop, runs to the other end with a tail behind it and settles back into a pill; drag it past either end and it spreads over the edge, and letting go there slings it to the opposite side.

## When to use it

- A single on/off setting that applies right away, where the switch itself is part of the product's personality.
- Settings screens and toolbars with only a few toggles, so the motion stays a treat.

## When to reach for something else

- Choices that only apply after a Save button. Use a checkbox.
- Dense tables or long settings lists, where every row moving like liquid gets tiring.

## Usage

```tsx
import { GooSwitch } from "@/components/ui/goo-switch";

<GooSwitch aria-label="Wi-Fi" />
```

Custom composition:

```tsx
<GooSwitch checked={on} onCheckedChange={setOn} aria-label="Wi-Fi" size="lg" inset={2} sling={false} />
```

### In a form

Submits "yes" under newsletter while on, and must be on to submit.

```tsx
import { GooSwitch } from "@/components/ui/goo-switch";

export function Signup() {
  return (
    <form action="/api/signup" className="flex items-center gap-3">
      <span id="newsletter-label" className="text-sm">Send me the newsletter</span>
      <GooSwitch name="newsletter" value="yes" required aria-labelledby="newsletter-label" />
      <button type="submit">Sign up</button>
    </form>
  );
}
```

### Labelled setting

Keep the state in React and label the switch with the text beside it.

```tsx
import { useState } from "react";
import { GooSwitch } from "@/components/ui/goo-switch";

export function WifiSetting() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between gap-6">
      <span id="wifi-label" className="text-sm font-medium">Wi-Fi</span>
      <GooSwitch checked={on} onCheckedChange={setOn} aria-labelledby="wifi-label" />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| checked | `boolean` | - | Controlled state. |
| defaultChecked | `boolean` | false | Initial state. |
| onCheckedChange | `function` | - | Fires with the new state. |
| disabled | `boolean` | false | Disables interaction. |
| size | `"sm" \| "md" \| "lg"` | md | Track height: 24, 32 or 40px. |
| inset | `number` | 4 | Gap around the thumb, in 32nds of the track height (1 to 10). |
| stretch | `boolean` | true | Dragging past an end spreads the thumb over the edge. |
| sling | `number \| false` | 0.5 | Stretch (0 to 1) past which a release slings to the other side; false never slings. |
| trail | `number` | 3.2 | Droplet tail length on a toggle; 0 hides it. |
| name | `string` | - | Form field name; submitted when on. |
| value | `string` | on | Value submitted under name. |
| required | `boolean` | false | Blocks form submission while off. |
| classNames | `GooSwitchClassNames` | - | Slot classes. |

## Keyboard

| Keys | Action |
| --- | --- |
| Space / Enter | Toggles the switch. |
| Tab | Moves focus to and from the switch. |

## Accessibility

- Renders a native button with role="switch" and aria-checked, so screen readers announce it as a switch and its state.
- It has no visible label of its own. Pass aria-label, or aria-labelledby pointing at the text next to it.
- The form checkbox is hidden from assistive tech and the tab order; when validation lands on it, focus moves to the switch.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- On, the track uses var(--primary); off, a mix of var(--muted-foreground) and var(--background). The thumb is white in both themes.
- Hover and press wash the track toward var(--background), so it follows dark mode.
- size picks a 24, 32 or 40px track; a height class in className overrides it, and the width always follows at 62:32. classNames targets root and svg.
- inset sets the gap around the thumb in 32nds of the track height; the thumb grows into whatever the gap gives up.
- trail sets how long the droplet tail is on a toggle, and 0 turns it off for a plainer switch.

## Edge cases

- A click toggles on release. A drag ends on the side the thumb was let go on.
- A drag pulled past sling (half the stretch by default) slings the thumb to the other side: pulled past the right end it turns off, past the left end it turns on. sling={false} turns this off, and stretch={false} stops the thumb at the ends altogether.
- With name set, a hidden checkbox submits value under name while the switch is on, and nothing while it is off, the same as a checkbox. required blocks submission while off, and a form reset returns it to defaultChecked.
- The pointer is captured while pressed, so the drag keeps working outside the switch.
- Setting checked from outside moves the thumb with the same droplet motion as a click.

## Troubleshooting

**Dragging the switch scrolls the page on a phone.**
The switch sets touch-action: none on itself. If a parent handles the gesture first (a carousel or a sheet), stop propagation of pointerdown on the switch.

**My form does not receive the switch value.**
Pass name. Without it no form field is rendered. Like a checkbox, the field is only sent while the switch is on.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
