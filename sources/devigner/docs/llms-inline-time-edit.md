# Inline Time Edit

> A 2:30 that splits into hour and minute fields when you edit it, then folds back.

- Page: https://ui.devigner.cc/components/inline-time-edit
- Category: Forms
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add inline-time-edit` (writes components/ui/inline-time-edit.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo reads 2:30. Press the pencil and the pill splits into an hours field and a minutes field with their units, and a save button; change a number and press the tick, and the fields fold back into one pill with the new time.

## When to use it

- Durations shown inline in a row or card (estimates, timers, meeting lengths) that people occasionally correct in place.
- Anywhere a full form or dialog would be too heavy for changing two numbers.

## When to reach for something else

- Clock times or dates. The value is a duration in minutes, not a time of day.
- Durations longer than 99 hours or finer than a minute.

## Usage

```tsx
import { InlineTimeEdit } from "@/components/ui/inline-time-edit";

<InlineTimeEdit defaultValue={150} />
```

Custom composition:

```tsx
<InlineTimeEdit value={minutes} onValueChange={setMinutes} hourUnit="h" minuteUnit="m" />
```

### Controlled duration

Keep the minutes in state and show them elsewhere.

```tsx
import { useState } from "react";
import { InlineTimeEdit } from "@/components/ui/inline-time-edit";

export function Estimate() {
  const [minutes, setMinutes] = useState(90);
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Estimate</span>
      <InlineTimeEdit value={minutes} onValueChange={setMinutes} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `number` | - | Controlled duration in minutes. |
| defaultValue | `number` | 150 | Initial duration in minutes. |
| onValueChange | `function` | - | Fires with the saved total in minutes, only when it changed. |
| open | `boolean` | - | Controlled edit state. |
| defaultOpen | `boolean` | false | Initial edit state. |
| onOpenChange | `function` | - | Fires when the edit opens, saves or is discarded. |
| maxHours | `number` | 99 | Largest hour value accepted. |
| shortTime | `boolean` | true | Closed, shows 2:30 instead of 2 Hr. 30 Min. |
| hourUnit | `string` | Hr. | Unit after the hours while editing. |
| minuteUnit | `string` | Min. | Unit after the minutes while editing. |
| hoursLabel | `string` | Hours | Hours field accessible name. |
| minutesLabel | `string` | Minutes | Minutes field accessible name. |
| editLabel | `string` | Edit time | Button name while closed. |
| saveLabel | `string` | Save time | Button name while editing. |
| disabled | `boolean` | false | Disables interaction. |
| classNames | `InlineTimeEditClassNames` | - | Slot classes. |

## Keyboard

| Keys | Action |
| --- | --- |
| Enter / Space | On the pencil, opens the edit. On the tick, saves. |
| Tab | Moves between the hours field, the minutes field and the button while editing. |
| Enter | In either field, saves. |
| Up / Down arrows | In either field, adds or removes 1, clamped to 0 to maxHours for hours and 0 to 59 for minutes. |
| Shift + Up / Down | Steps by 10 instead. |
| Escape | Anywhere in the control, discards the edit and returns focus to the button. |

## Accessibility

- The fields are labelled with hoursLabel and minutesLabel, and are out of the tab order until the edit opens.
- The button keeps focus across the swap and is renamed from editLabel to saveLabel, so screen readers hear what it will do.
- Fields are role="spinbutton" with aria-valuemin, aria-valuemax and aria-valuenow, and use inputMode="numeric", so phones show a number pad.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- classNames targets root, tile, input, unit and button.
- hourUnit and minuteUnit change the units shown while editing ("h", "m", or a translation). Closed, the time reads as a clock (2:05) with no units; pass shortTime={false} to keep the units there too.
- Tiles use bg-background. The shadow is smooth-shadow-ring-sm, a shadow utility from shadow-plugin, drawn once around the closed pill and per tile when open; replace it with shadow-sm if you don't use shadow-plugin. Values use text-foreground and units text-muted-foreground.

## Edge cases

- Each field takes up to two digits. Hours above maxHours and minutes above 59 are clamped on save; empty fields save as 0.
- onValueChange only fires on save, with the total in minutes, and only when the total changed. Typing does not change the value.
- Clicking outside or tabbing out of the control discards the edit, the same as Escape.
- If a controlled value changes while the edit is open, the fields show the new value and anything typed is dropped.
- open, defaultOpen and onOpenChange control the edit state, for example to open it from a row action.
- Setting disabled while the edit is open discards it.

## Troubleshooting

**Typing a number does not update my state.**
onValueChange fires when the edit is saved (tick or Enter), not on every keystroke.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
