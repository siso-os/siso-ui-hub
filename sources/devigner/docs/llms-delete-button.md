# Delete Button

> Asks before it deletes, waits for your API call, then shows a tick.

- Page: https://ui.devigner.cc/components/delete-button
- Category: Primitives
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add delete-button` (writes components/ui/delete-button.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is a trash tile. Press it and the lid swings open while Confirm and Keep buttons slide out. Confirm starts a short fake request, so you see the spinner and then a tick before it resets.

## When to use it

- Deleting a single row, file or card inline, where a full confirmation dialog would be too heavy.
- Deletes that call an API: return the promise from onConfirm and the tile shows pending, then done, or goes back to idle if it fails.

## When to reach for something else

- Bulk or irreversible deletes that need the user to read consequences or type a name. Use a dialog for those.

## Usage

```tsx
import { DeleteButton } from "@/components/ui/delete-button";

<DeleteButton onConfirm={remove} />
```

Custom composition:

```tsx
<DeleteButton onConfirm={remove} renderConfirmation={({ status }) => <span>{status}</span>} />
```

### Delete through an API with error handling

Return the request's promise so the tile waits on it, and handle failures yourself.

```tsx
import { DeleteButton } from "@/components/ui/delete-button";

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <DeleteButton
      label="Delete invoice"
      onConfirm={() => fetch(`/api/invoices/${id}`, { method: "DELETE" }).then((r) => {
        if (!r.ok) throw new Error("Delete failed");
      })}
      onError={(error) => console.error(error)}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| onConfirm | `function` | - | Confirmation handler. |
| status | `DeleteButtonStatus` | - | Controlled status. |
| defaultStatus | `DeleteButtonStatus` | idle | Initial status. |
| onStatusChange | `function` | - | Status callback. |
| renderConfirmation | `function` | - | Confirmation slot. |
| classNames | `DeleteButtonClassNames` | - | Slot classes. |
| slotProps | `DeleteButtonSlotProps` | - | Slot attributes. |
| onCancel | `function` | - | Fires on Keep, Escape or a second press. |
| onError | `function` | - | Handles a rejected onConfirm. |
| label | `string` | Delete | Tile accessible name. |
| confirmLabel | `string` | Confirm delete | Confirm button name. |
| cancelLabel | `string` | Keep | Cancel button name. |
| pendingLabel | `string` | Deleting | Announced while pending. |
| doneLabel | `string` | Deleted | Announced when done. |
| resetAfter | `number` | 1400 | ms before the tick resets. 0 keeps it. |
| left | `boolean` | false | Puts the confirmation on the left. |
| disabled | `boolean` | false | Disables interaction. |

## Keyboard

| Keys | Action |
| --- | --- |
| Enter / Space | On the trash tile, opens the confirmation. Pressed again while open, it cancels. |
| Tab | Moves between the tile, Confirm and Keep. |
| Escape | Cancels while the confirmation is open and returns focus to the tile. |

## Accessibility

- A real button element with visible focus.
- Its accessible name follows the state (label, pendingLabel, copiedLabel, errorLabel), and a polite live region announces every state but idle.
- aria-busy is set while an async value resolves, and data-status mirrors the state for styling.
- With iconOnly the text is hidden but label stays the accessible name.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- classNames targets the root, the tile and the confirmation pill.
- Uses bg-background for the shell and bg-secondary for the confirmation. The shell's shadow-elevated utility is a Devigner shadow token: define --shadow-elevated in your @theme or swap in shadow-lg.
- label, confirmLabel, cancelLabel, pendingLabel and doneLabel set every accessible name, for translation or more specific wording ("Delete invoice").
- left puts the confirmation on the left of the tile, and the lid opens toward it.

## Edge cases

- If onConfirm returns nothing, the tile goes straight to done. If it returns a promise, the spinner only appears after a short grace period, so fast requests do not flash it.
- A rejected promise returns the tile to idle and calls onError. Without onError the error is re-thrown, so pass onError to show your own message.
- resetAfter (1400 ms by default) is how long the tick stays. Set 0 to keep the done state, for example when the row is about to unmount.
- Setting disabled while the confirmation is open closes it.

## Troubleshooting

**The spinner never shows.**
onConfirm must return the promise. An async function works; a function that starts a fetch without returning it goes straight to done.

**I get an uncaught error when the request fails.**
Pass onError. Without it, a rejected onConfirm is re-thrown after the tile resets.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
