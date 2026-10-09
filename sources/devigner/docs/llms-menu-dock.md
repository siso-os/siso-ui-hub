# Menu Dock

> A dock that grows into its own menus, nested as deep as you need.

- Page: https://ui.devigner.cc/components/menu-dock
- Category: Navigation
- Requirements: React 18 or 19, Tailwind CSS v4
- Install: `npx devignerui add menu-dock` (writes components/ui/menu-dock.tsx)
- Packages it needs: cn, motion, @devigner-ui/icons, devignerui

## What the demo shows

The live demo is a dock with Home, Search, Saved and Account. Open Account and the dock grows upward into a menu with Profile, Appearance and Sign out; the arrow keys move between rows and Escape goes back.

## When to use it

- App-level navigation that should stay small until needed, like a mobile-style bottom bar on the web.
- Nested menus (account, settings, libraries) that open in place instead of in a separate dropdown.
- A search field or other custom panel that opens from a dock icon, through an item's content.

## When to reach for something else

- Primary navigation with many top-level items. The closed dock is icon-only, so more than about six icons gets hard to scan.
- Menus that must stay open next to the content they affect: an outside click closes the dock.

## Usage

```tsx
import { MenuDock } from "@/components/ui/menu-dock";

<MenuDock items={items} />
```

Custom composition:

```tsx
<MenuDock items={items} renderIcon={({ defaultIcon }) => <span>{defaultIcon}</span>} />
```

### Close the dock after a choice

Control path so a selection, or a route change, returns to the closed dock.

```tsx
import { useState } from "react";
import { MenuDock, type MenuDockItem } from "@/components/ui/menu-dock";

export function AppDock({ signOut }: { signOut: () => void }) {
  const [path, setPath] = useState<number[]>([]);
  const items: MenuDockItem[] = [
    { id: "home", label: "Home", href: "/" },
    {
      id: "account",
      label: "Account",
      items: [
        { label: "Profile", href: "/profile" },
        { label: "Sign out", destructive: true, onSelect: () => { signOut(); setPath([]); } },
      ],
    },
  ];
  return <MenuDock items={items} active="home" path={path} onNavigate={setPath} />;
}
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| items | `MenuDockItem[]` | - | Dock items. |
| active | `string` | - | Active item ID. |
| path | `number[]` | - | Controlled path. |
| onNavigate | `function` | - | Path callback. |
| floating | `boolean` | false | Pins the dock to the bottom center of the viewport. |
| label | `string` | Menu | Accessible name for the dock. |
| renderIcon | `function` | - | Icon slot. |
| classNames | `MenuDockClassNames` | - | Slot classes. |
| slotProps | `MenuDockSlotProps` | - | Slot attributes. |
| layoutId | `string` | - | Shared-layout ID: a remounted dock glides from the old one's size. |

## Keyboard

| Keys | Action |
| --- | --- |
| Tab | The dock is one tab stop; the last focused row keeps it. |
| Left / Right arrows | Move between icons in the closed dock. |
| Up / Down arrows | Move between rows in an open menu. |
| Home / End | Jump to the first or last row. |
| Enter / Space | Opens an item's submenu or panel, or runs its onSelect or link. |
| Escape | Goes back one level, and closes a content panel. |

## Accessibility

- Each level is role="menu" with menuitem rows, labelled with the level's title (or the dock's label, "Menu" by default). Content panels are role="dialog".
- Rows with children have aria-haspopup, and the item matching active has aria-current="page".
- Icon-only dock buttons get the item's label as aria-label and a title tooltip.
- Opening a level moves focus to its first row, and going back returns focus to the row that opened it.
- Honors prefers-reduced-motion and an ancestor <MotionConfig reducedMotion="always">, so an in-app motion switch works too.

## Theming

- className goes on the footprint wrapper that holds the dock's place in the layout; position the dock there. classNames.shell styles the surface that grows, whose shadow-elevated utility is a Devigner shadow token (define --shadow-elevated in your @theme or swap in shadow-lg).
- floating pins the dock to the bottom center of the viewport.
- destructive rows (such as Sign out) use the destructive color.
- Pass activeIcon next to icon to swap in a filled glyph for the active item, and renderIcon to wrap or replace any icon.

## Edge cases

- The closed dock reserves its own size, so the menu grows upward over the page instead of pushing content.
- An item with both items and onSelect opens its submenu; onSelect is ignored. content wins over items.
- Choosing a leaf row calls onSelect or follows href but leaves the menu open. Control path and set it to [] to close after a choice.
- If items change under an open level so that the level no longer exists, the dock steps back to the nearest valid level and reports it through onNavigate.
- Items are matched to active by id, falling back to label, so give items ids when two share a label.

## Troubleshooting

**The menu stays open after I pick an item.**
That is the default. Pass path and onNavigate, then set the path to [] in onSelect or on route change.

**The dock jumps or pushes the page when it opens.**
Put positioning on className (the footprint wrapper), not on a parent that clips overflow. The open panel extends above the footprint, so an overflow-hidden ancestor cuts it off.

**The component renders with no background or the wrong colors.**
Colors use the standard shadcn/ui tokens only (background, foreground, primary, secondary, muted, accent, border, input, ring, destructive), so a project set up with shadcn/ui needs nothing extra and the component follows its theme, dark mode included. Without shadcn/ui, define those CSS variables for :root and .dark and map them in your Tailwind v4 @theme, or run npx shadcn init.
