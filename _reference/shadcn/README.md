# shadcn/ui — local registry snapshot

Saved 2026-09-18 17:38 from `https://ui.shadcn.com/r/styles/base-nova/<name>.json`. Shaan 2026-09-18: "save them all locally so we
actually have them ... we need to be using shadcn UI as a base and then anything else gets
improved upon."

| kind | count | style | where |
|---|---|---|---|
| ui primitives | 63 | `base-nova` (Base UI — matches `components.json` in oracle-streaming) | `ui/<name>/ui/<name>.tsx` + `item.json` |
| blocks | 27 | `base-nova` | `blocks/<name>/...` (multi-file) + `item.json` |
| charts | 45 | `new-york-v4` (Recharts + Card only; no Radix — ports as-is) | `charts/<name>/...` + `item.json` |
| block previews | 22 | PNG 2880×1800 | `previews/<name>.png` (signup-01..05 have none published) |

`manifest.json` lists every item with description + registryDependencies.
`item.json` per item carries dependencies (npm), registryDependencies (other shadcn items), and file list.

## What the registry actually is (verified, not assumed)
- **63 primitives, 27 blocks, 51 chart variants.** Blocks are dashboard-01, sidebar-01..16, login-01..05,
  signup-01..05 — that is all. `calendar-01..32`, `products-01`, `chart-01` do not exist (404).
- Chart names scraped from the family pages but NOT in the registry (6): chart-pie-separator, chart-radar-grid, chart-radar-label, chart-radar-lines, chart-tooltip-indicator, chart-tooltip-label.

## Rob path
Copy `ui/<name>/ui/<name>.tsx` into the app's `components/ui/`, install anything in `item.json`
`dependencies`, and make sure `registryDependencies` are already present. This app ships NO Tailwind
preflight — see the oracle-model-ui skill for the `ul/ol/li/button` traps.

## Not yet in oracle-streaming (30 of 63)
accordion, alert-dialog, aspect-ratio, attachment, bubble, button-group, calendar, carousel, combobox, command, context-menu, dialog, direction, drawer, form, hover-card, input-group, input-otp, kbd, marker, menubar, message-scroller, native-select, navigation-menu, pagination, questionnaire, radio-group, sonner, spinner, toast
