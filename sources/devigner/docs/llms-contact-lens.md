# Contact Lens

> A dim contact line with an icon row: hover an icon and its part of the line lifts and lights up under a label, click to copy it.

- Page: https://ui.devigner.cc/components/contact-lens
- Category: Animation
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add contact-lens` (writes components/ui/contact-lens.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is hello@devigner.cc in dim text over a mail, a globe and a user icon. Hover the mail icon and the whole address lifts and lights with an Email pill under it; the globe lights devigner.cc under a Website pill, the user icon lights hello under a Name pill. Click an icon to copy that part.

## When to use it

- A contact block on a portfolio or studio site where one line carries the name, the domain and the email.
- Any short string made of parts people might want to copy one at a time.

## When to reach for something else

- Contact details people need to read at a glance. The line rests dimmed; use plain text.
- Long or multi-line text. The parts are lit inside one line.

## Usage

```tsx
import { ContactLens } from "@/components/ui/contact-lens";

<ContactLens value="hello@devigner.cc" items={items} />
```

Custom composition:

```tsx
<ContactLens value="hello@devigner.cc" items={items} copiedLabel="On your clipboard" className="text-2xl" />
```

### Studio contact

Email, website and name from one address.

```tsx
import { IconGlobal, IconSms, IconUser } from "@devigner-ui/icons";
import { ContactLens } from "@/components/ui/contact-lens";

const items = [
  { label: "Email", icon: <IconSms /> },
  { label: "Website", icon: <IconGlobal />, text: "devigner.cc", copy: "https://devigner.cc" },
  { label: "Name", icon: <IconUser />, text: "hello" },
];

export function Contact() {
  return <ContactLens value="hello@devigner.cc" items={items} />;
}
```

### Links instead of copy

Email opens the mail app, the website opens in a tab.

```tsx
import { IconGlobal, IconSms } from "@devigner-ui/icons";
import { ContactLens } from "@/components/ui/contact-lens";

const items = [
  { label: "Email", icon: <IconSms />, href: "mailto:hello@devigner.cc" },
  { label: "Website", icon: <IconGlobal />, text: "devigner.cc", href: "https://devigner.cc" },
];

export function ContactLinks() {
  return <ContactLens value="hello@devigner.cc" items={items} />;
}
```

### Light a part from outside

Control the lit item, for example from a button elsewhere on the page.

```tsx
import { useState } from "react";
import { IconSms, IconUser } from "@devigner-ui/icons";
import { ContactLens } from "@/components/ui/contact-lens";

const items = [
  { label: "Email", icon: <IconSms /> },
  { label: "Name", icon: <IconUser />, text: "hello" },
];

export function Highlighted() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <button type="button" onClick={() => setActive("Email")}>Show email</button>
      <ContactLens value="hello@devigner.cc" items={items} active={active} onActiveChange={setActive} />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| value | `string` | - | The full line, for example an email address. |
| items | `{ label, icon, id?, text?, copy?, href?, pill? }[]` | - | One icon each. text is the part of value it lights (the whole value when left out); copy is what a click copies; href makes the icon a link instead; pill is "above" or "below". |
| active | `string \| null` | - | Controlled id (or label) of the lit item. |
| defaultActive | `string \| null` | null | Item lit at first when uncontrolled. |
| onActiveChange | `function` | - | Fires as hover and focus light or clear an item. |
| onSelect | `function` | - | Fires with the item on every click. |
| onCopy | `function` | - | Fires with the copied text and item after a copy. |
| onError | `function` | - | Fires when the clipboard write fails. |
| copiedLabel | `string` | Copied | Pill text after a copy. |
| resetAfter | `number` | 1200 | ms the Copied pill holds. |
| classNames | `{ text?, lit?, pill?, icon? }` | - | Slot classes: every piece of the line, lit pieces, the pill, each icon. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | Moves between the icons; the focused icon lights its part like a hover. |
| Enter / Space | Copies the focused icon's part, or follows its link. |

## Accessibility

- Each icon is a real button named Copy <label>: <text>, or a link named <label>: <text> when it has href, with a visible focus ring.
- A polite live region announces each copy.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">: parts and pills fade without lifting or blurring.

## Theming

- Text and icons are text-foreground at 35% opacity at rest and full when lit; the pill is bg-foreground with text-background, so it flips with the theme.
- Everything is sized in em from the root's text-4xl. Pass a text size in className to scale the whole thing.
- classNames targets text (every piece), lit (pieces while lit), pill and icon.

## Edge cases

- text must appear in value; the first match is lit. Leave it out to light the whole line. The pill sits below the whole line and above a part unless the item sets pill.
- An item with href is a link: a click follows it and calls onSelect, with no copy.
- copy falls back to text, then to value.
- Copying uses navigator.clipboard, which needs https or localhost. A failed copy calls onError and leaves the pill unchanged.
- With active passed, hover and focus only call onActiveChange; the lit item changes when you update active.

## Troubleshooting

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
