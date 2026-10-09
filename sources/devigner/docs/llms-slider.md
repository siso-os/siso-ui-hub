# Slider

> A slider whose fill heats from yellow to red as it grows, with a glass thumb that opens to show the value while you drag.

- Page: https://ui.devigner.cc/components/slider
- Category: Forms
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add slider` (writes components/ui/slider.tsx)
- Packages it needs: cn, motion, devignerui

## What the demo shows

The live demo is a horizontal slider at 40 with a mark every 10. Press it and the glass thumb opens to show the value; drag right and the fill grows from yellow through orange to red, the digits sliding up as they change, then let go and the thumb closes back to a circle.

## When to use it

- One value where how much matters more than the exact number: heat, volume, brightness, intensity, a 0 to 100 level.
- Controls panels and thermostat-style screens where a tall, touchable slider fits.

## When to reach for something else

- Picking a min and max. It has one thumb; use a two-thumb range slider.
- Entering an exact figure, like a price. Use a number input.
- A few named choices (Low, Medium, High). Use a segmented control.

## Usage

```tsx
import { Slider } from "@/components/ui/slider";

<Slider aria-label="Heat" defaultValue={40} />
```

Custom composition:

```tsx
<Slider value={temp} onValueChange={setTemp} min={10} max={30} step={1} format={(v) => `${v}°`} orientation="vertical" aria-label="Temperature" />
```

### Thermostat

Whole degrees from 10 to 30, shown with a degree sign.

```tsx
import { useState } from "react";
import { Slider } from "@/components/ui/slider";

export function Thermostat() {
  const [temp, setTemp] = useState(21);
  return (
    <Slider
      value={temp}
      onValueChange={setTemp}
      min={10}
      max={30}
      step={1}
      format={(v) => `${v}°`}
      orientation="vertical"
      size="lg"
      className="h-72"
      aria-label="Temperature"
    />
  );
}
```

### Volume in a form

Submits the level under volume.

```tsx
import { Slider } from "@/components/ui/slider";

export function VolumeForm() {
  return (
    <form action="/api/settings" className="flex items-center gap-4">
      <span id="volume-label" className="text-sm">Volume</span>
      <Slider
        name="volume"
        defaultValue={60}
        size="sm"
        aria-labelledby="volume-label"
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | - | Controlled value. |
| defaultValue | `number` | 0 | Initial value. |
| onValueChange | `function` | - | Fires with the new value while dragging and on each key press. |
| onValueCommit | `function` | - | Fires once when the thumb is let go, and on each key press that changes the value. |
| min | `number` | 0 | Lowest value. |
| max | `number` | 100 | Highest value. |
| step | `number` | 10 | The arrow key step, the gap between marks, and the snap grid. |
| snap | `boolean` | false | Snaps to multiples of step from min, the thumb jumping stop to stop. Off, the value is continuous (rounded to the step's decimals) and the thumb glides after the pointer. |
| orientation | `"vertical" \| "horizontal"` | horizontal | Vertical fills bottom to top, horizontal left to right. |
| inverted | `boolean` | false | Fills from the other end: top to bottom, or right to left for right-to-left layouts. |
| size | `"sm" \| "md" \| "lg" \| number` | md | Track thickness: 32, 44 or 56px, or a number of px. Set the length with an h-* or w-* class. |
| marks | `boolean` | true | Shows marks along the track, one per step, spread evenly end to end. |
| format | `(value: number) => string` | String | Text shown in the thumb and read out by screen readers, e.g. v => `${v}°`. |
| disabled | `boolean` | false | Disables interaction. |
| name | `string` | - | Form field name; submits the value. |
| classNames | `SliderClassNames` | - | Slot classes: root, track, fill, mark, thumb, value. |

## Keyboard

| Keys | Action |
| --- | --- |
| Arrow Up / Arrow Right | Raises the value by one step (the arrow along the axis lowers it when inverted). |
| Arrow Down / Arrow Left | Lowers the value by one step (the arrow along the axis raises it when inverted). |
| Page Up / Page Down | Moves a tenth of the range (at least one step). |
| Home / End | Jumps to min or max. |

## Accessibility

- The thumb has role="slider" with aria-valuemin, aria-valuemax, aria-valuenow, aria-orientation and aria-valuetext from format, so screen readers read "72°" rather than "72".
- Pass aria-label or aria-labelledby; both go on the thumb, which is the focus target.
- Keyboard focus opens the thumb, so the value is visible to keyboard users too. The focus ring uses var(--ring).
- Pressing the track moves focus to the thumb, so the arrow keys work right after a drag.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- The fill uses Tailwind's red-600, orange-500 and yellow-400 as a gradient. Pass your own gradient stops through classNames.fill, e.g. "from-sky-600 via-sky-400 to-cyan-300".
- The track is var(--foreground) at 15% and the thumb is var(--background) frosted glass, so both follow dark mode. Marks are hairlines that fade out at both ends, white at 45% in the middle.
- size picks a 32, 44 or 56px track, or takes a number of px; the length is h-56 vertical or w-72 horizontal, and an h-* or w-* class in className overrides it.
- classNames targets root, track, fill, mark, thumb and value.

## Edge cases

- The gradient is tied to the fill's end: a short fill shows only yellow, and red comes in as it nears full.
- Pressing the thumb keeps the grab point, so it never jumps; pressing the track glides the thumb there. While dragging it glides after the pointer on a soft follow spring, or moves stop to stop with snap.
- Marks count the steps (step={10} over 0 to 100 draws 9) and are spread evenly across the whole track, with or without snap. The thumb can't reach the very ends, so it lands on a mark exactly mid-track and up to half a thumb off near the ends. Past 40 marks none are drawn.
- Only one pointer drags at a time; a second finger on the slider is ignored until the first lets go.
- onValueChange fires on every move; save or fetch in onValueCommit, which fires once per release.
- With snap, when step doesn't divide the range, max is a stop too: step={3} over 0 to 100 snaps to 99, then 100, by pointer and by the arrow keys.
- Values are rounded to the step's decimals, so step={0.1} gives 0.3, not 0.30000000000000004.
- A controlled value outside min and max is shown clamped. The pointer is captured while pressed, so a drag keeps working outside the slider.
- With name set, a hidden input submits the value; a form reset returns it to defaultValue.

## Troubleshooting

**The fill has no colors.**
The gradient is made of Tailwind classes in the component file. Make sure Tailwind scans the folder the component was installed into (an @source line in Tailwind v4 if it lives outside your app).

**Dragging the slider scrolls the page on a phone.**
The slider sets touch-action: none on itself. If a parent handles the gesture first (a carousel or a sheet), stop propagation of pointerdown on the slider.

**The thumb doesn't look frosted.**
The blur comes from backdrop-filter. An ancestor with opacity, filter or mask limits what it can blur, so keep those off the slider's parents.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
