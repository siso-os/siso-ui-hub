# Date Range Picker

> A calendar that shows the range before you commit to it, with presets.

- Page: https://ui.devigner.cc/components/date-range-picker
- Category: Forms
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add date-range-picker` (writes components/ui/date-range-picker.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is a Trip Dates calendar where days before today are disabled. Pick a check-in day, then move across the calendar to preview the range before you choose check-out; the badge counts the nights, and presets such as Weekend fill a range in one press.

## When to use it

- Booking and travel flows (check-in and check-out, nights), and any start and end date filter.
- Inline in a page or a popover you provide, when you want the range preview and presets.

## When to reach for something else

- Picking a single date: the picker always produces a start and an end.
- Picking times, or ranges that span many months at once. It shows one month at a time.

## Usage

```tsx
import { DateRangePicker } from "@/components/ui/date-range-picker";

<DateRangePicker onValueChange={setRange} />
```

Custom composition:

```tsx
<DateRangePicker title="Stay" presets={presets} renderBadge={(range) => (range ? "Booked" : "Add dates")} />
```

### Controlled value with booked nights disabled

Keep the range in state, block past days and specific booked dates.

```tsx
import { useState } from "react";
import { DateRangePicker, type DateRange } from "@/components/ui/date-range-picker";

const booked = ["2026-10-10", "2026-10-11"];
const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function StayPicker() {
  const [range, setRange] = useState<DateRange | null>(null);
  return (
    <DateRangePicker
      value={range}
      onValueChange={setRange}
      minDate={new Date()}
      isDateDisabled={(date) => booked.includes(key(date))}
    />
  );
}
```

### A report period without presets

Change the copy and hide the travel presets.

```tsx
import { DateRangePicker } from "@/components/ui/date-range-picker";

export function ReportPeriod() {
  return (
    <DateRangePicker
      title="Report period"
      startLabel="From"
      endLabel="To"
      presets={[]}
      maxDate={new Date()}
      renderBadge={(range) => (range ? "Custom range" : "All time")}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `DateRange \| null` | - | Controlled range. |
| defaultValue | `DateRange \| null` | null | Initial range. |
| onValueChange | `function` | - | Range callback. |
| month | `Date` | - | Controlled visible month. |
| defaultMonth | `Date` | - | Initial visible month. |
| onMonthChange | `function` | - | Month callback. |
| minDate | `Date` | - | Earliest selectable day. |
| maxDate | `Date` | - | Latest selectable day. |
| isDateDisabled | `function` | - | Marks individual days unavailable. |
| title | `ReactNode` | Trip Dates | Card title. |
| presets | `DateRangePreset[]` | Weekend, 3 nights, 1 week, 2 weeks | Quick-select ranges; a preset lights up when the range matches it. |
| startLabel | `string` | Check-in | Start field label. |
| endLabel | `string` | Check-out | End field label. |
| renderBadge | `function` | - | Replaces the badge text. |
| onClear | `function` | - | Fires when Clear is pressed. |
| classNames | `DateRangePickerClassNames` | - | Slot classes. |
| slotProps | `DateRangePickerSlotProps` | - | Slot attributes. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Focuses the calendar on one day (the start of the range, or today), then the presets and Clear. |
| Left / Right arrows | Previous or next day, skipping disabled days. |
| Up / Down arrows | Same weekday in the previous or next week. |
| Home / End | First or last day of the week (Monday to Sunday). |
| Page Up / Page Down | Same day in the previous or next month, or its first available day. |
| Enter / Space | Picks the focused day: first press sets the start, second sets the end. |

## Accessibility

- The calendar is a role="grid" labelled with the month and year, with one tab stop that moves with the arrow keys.
- Days in the range have aria-selected, and disabled days have aria-disabled and cannot be picked.
- Each committed range is announced in a polite live region, for example "Check-in September 26, check-out September 29, 3 nights".
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- classNames targets root, header, badge, label, grid, day, presets, presetButton and clearButton.
- title, startLabel and endLabel change the copy, so it works for things other than trips ("Report period", "From", "To").
- renderBadge replaces the nights badge; it receives the committed range, or the preview range while the end is being picked.
- Pass presets={[]} to hide the presets, or your own list of { id, label, getRange }.
- Colors come from shadcn tokens. The card's smooth-shadow-ring-lg and the header's shadow-subtle are shadow utilities from shadow-plugin and a Devigner shadow token; replace them with shadow-lg and shadow-xs if you don't use those.

## Edge cases

- minDate and maxDate disable everything outside them; isDateDisabled disables single days (weekends, booked nights). All three combine.
- A range never crosses a disabled day: if one sits between the start and the day you pick, the end stops on the last available day before it. Presets are clamped the same way.
- Picking an end before the start swaps them, so value.start is always the earlier day.
- Dates are local midnight Date objects. Serialize them with local getters, not toISOString(), or a user east or west of UTC can see the date shift by one day.
- The first click of a new range clears the previous value, so onValueChange receives null before the new range.
- Weeks start on Monday and month names are in English.

## Troubleshooting

**Controlled value flickers to null when I start a new range.**
The first click of a new range clears the value, then the second click sets the full range. Keep the null in state; the picker shows the pending start day itself.

**The saved dates are one day off.**
Date objects are local midnight. toISOString() converts to UTC and can move the date. Build the string from getFullYear(), getMonth() and getDate() instead.

**My range ends earlier than the day I clicked.**
A disabled day sits between the start and that day, so the range stops before it. Check minDate, maxDate and isDateDisabled.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
