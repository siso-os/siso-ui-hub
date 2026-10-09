# Copy Button

> Copies text in one click, then turns green and retypes its label to Copied.

- Page: https://ui.devigner.cc/components/copy-button
- Category: Primitives
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add copy-button` (writes components/ui/copy-button.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is a black Copy pill. Click it and the text goes to your clipboard, the pill turns green, the icon blurs into a check and the label retypes itself to Copied, then it settles back after a second.

## When to use it

- Copying a command, token, link or code snippet where the user needs to know the copy landed.
- Any spot that already has a primary action style and needs a single compact copy control.

## When to reach for something else

- Icon-only copy affordances inside dense code blocks. A plain icon button takes less room.
- Copying data that needs a format choice (CSV or JSON). Use a menu for that.

## Usage

```tsx
import { CopyButton } from "@/components/ui/copy-button";

<CopyButton value="npx devignerui add copy-button" />
```

Custom composition:

```tsx
<CopyButton value={() => editor.getText()} label="Copy code" copiedLabel="Copied!" />
```

### Copy an install command

Pass the text and log the result.

```tsx
import { CopyButton } from "@/components/ui/copy-button";

export function InstallCommand() {
  return (
    <CopyButton
      value="pnpm add devignerui"
      onCopy={(text) => console.log("copied", text)}
      onError={(error) => console.error(error)}
    />
  );
}
```

### Copy a link created on the server

Return a promise from value and the button waits on it with a spinner.

```tsx
import { CopyButton } from "@/components/ui/copy-button";

export function ShareLink({ id }: { id: string }) {
  return (
    <CopyButton
      label="Copy link"
      copiedLabel="Link copied"
      value={() => fetch(`/api/share/${id}`).then((r) => r.text())}
    />
  );
}
```

### Icon-only button in a code block

Small and square, with the label kept for screen readers.

```tsx
import { CopyButton } from "@/components/ui/copy-button";

export function CodeCopy({ code }: { code: string }) {
  return <CopyButton value={code} iconOnly size="sm" label="Copy code" />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string \| function` | - | Text to copy. A function is read at click time and may return a promise. |
| copy | `function` | navigator.clipboard.writeText | Writes the text. Swap it for rich content or a fallback. |
| status | `"idle" \| "pending" \| "copied" \| "error"` | - | Controlled state. |
| defaultStatus | `"idle" \| "pending" \| "copied" \| "error"` | "idle" | Initial state when uncontrolled. |
| onStatusChange | `function` | - | Fires whenever the state changes. |
| onCopy | `function` | - | Fires after the text is on the clipboard. |
| onError | `function` | - | Fires when reading or writing fails. |
| label | `string` | Copy | Label at rest. |
| copiedLabel | `string` | Copied | Label after a copy. |
| pendingLabel | `string` | Copying | Label while an async value resolves. |
| errorLabel | `string` | Failed | Label after a failed copy. |
| resetAfter | `number` | 1000 | ms the copied or error state holds. 0 keeps it. |
| size | `"sm" \| "md" \| "lg"` | "md" | Height: 36, 44 or 52px. |
| iconOnly | `boolean` | false | Hides the text; the label stays as the accessible name. |
| disabled | `boolean` | false | Disables interaction. |

## Keyboard

| Keys | Action |
| --- | --- |
| Enter / Space | Copies the value. Ignored while an async value is still resolving. |

## Accessibility

- A real button element with visible focus.
- Its accessible name follows the state (label, pendingLabel, copiedLabel, errorLabel), and a polite live region announces every state but idle.
- aria-busy is set while an async value resolves, and data-status mirrors the state for styling.
- With iconOnly the text is hidden but label stays the accessible name.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- Rests on bg-foreground with text-background, so it inverts with the theme. Copied uses bg-green-700 and error bg-red-600, both with white text.
- data-status (idle, pending, copied, error) is on the button, so className can target a state, for example data-[status=copied]:bg-emerald-600.
- size sets the height, padding, text and icon size: sm 36px, md 44px, lg 52px.
- label, copiedLabel, pendingLabel and errorLabel set both the visible text and the accessible name, for translation.

## Edge cases

- The default copy uses navigator.clipboard, which needs a secure context (https or localhost). Any failure, in value or in copy, shows the error state and calls onError.
- If value returns a promise, the button shows a spinner until it resolves. Clicks during that time are ignored.
- Letters the two labels share stay put; only the differing ones swap, so similar labels animate best.
- Clicking again while Copied copies again and restarts the resetAfter hold. resetAfter 0 keeps the copied or error state until status changes.
- Pass status to drive the look yourself, for example to show Copied after a keyboard shortcut copies.

## Troubleshooting

**Nothing is copied and I get an error.**
navigator.clipboard only works on https or localhost and after a user gesture. Serve the page securely and pass onError to show a message.
