# @siso/blocks

## Actual free Arc source — 0.2.0

```tsx
import { SourceBlockScope, Dialog, DialogTrigger, DialogContent, Button } from '@siso/blocks/source';
import '@siso/blocks/source.css';

<SourceBlockScope theme="dark" accent="orange">
  <Dialog>
    <DialogTrigger asChild><Button>Rename</Button></DialogTrigger>
    <DialogContent title="Rename project" description="Update the display name.">
      <input aria-label="Project name" defaultValue="Example" />
    </DialogContent>
  </Dialog>
</SourceBlockScope>
```

This entry preserves the **actual MIT/free Arc code, CSS modules and motion** for
15 families: dialog, drawer, popover, hover card, command palette, toast,
notification center, sortable data table, file dropzone, timeline, empty state,
pagination, chat thread, comment thread and filter toolbar. Supporting original
Button/Avatar/provider and motion helpers are local copies, with no sibling API
dependency. Every family and support component was checked `tier: free` in the
source registry; MIT is verified at https://uiarc.dev/license. No Pro source is
included. Exact source/adapted hashes and adaptations are in source-provenance.json.

Use a bundler supporting CSS Modules (the suite build compiles them for consumers).
`SourceBlockScope` applies only this package's foundation and propagates its theme
and accent into owned Radix portal hosts, which are removed on unmount. A drawer's
explicit container still takes precedence. Original CSS modules and physics are
retained; no global Tailwind or app aliases are needed by this source entry.
Standalone use outside a scope needs equivalent source tokens for correct styling.
The root also exports this API as `sourceBlocks`; the `Siso*` compatibility API below
continues unchanged. Runtime dependencies include Motion, Lucide and Radix.

Complete original documentation demos run in the workbench family picker. The two
portrait references use the owned `/brand/siso-mark.png`; no Arc demo images are
copied. The source docs' undefined notification/upload callbacks are completed with
local demo state and a clearly labelled simulated upload; files never leave the
browser. Actual file transfer remains the consumer's `onUpload` callback.

## Compatibility Siso API

15 reusable interaction families for React 19: dialog, drawer, popover, hover preview,
command palette, notification center, toast stack, sortable table, filter toolbar,
timeline, empty state, file dropzone, chat thread, comment thread and pagination.

```tsx
import { SisoDataTable, SisoFilterToolbar, SisoDialog } from '@siso/blocks';
import '@siso/blocks/styles.css';

const rows = [{ id: 'a', name: 'Example', total: 4 }];
const columns = [
  { key: 'name', label: 'Name', value: (row: typeof rows[number]) => row.name, sortable: true },
  { key: 'total', label: 'Total', value: (row: typeof rows[number]) => row.total, sortable: true, numeric: true },
];
export function Example() {
  return <SisoDataTable rows={rows} columns={columns} rowKey={row => row.id} caption="Examples" />;
}
```

All exported `Siso*Props` and model types are available from the root. Source exports
are intended for bundlers with TypeScript/TSX support until the suite build replaces
them with compiled outputs. No consumer Tailwind, router, auth, data store, icon/font
service or sibling package is required. React/ReactDOM are peers; Radix dialog,
popover and hover-card are runtime dependencies.

## State and behavior

- Dialog/drawer require `open` and `onOpenChange`; give `trigger` a focusable element
  (Radix `asChild` contract). Radix handles modal focus, Escape and dismissal. When
  opening without `trigger`, the consumer must restore focus to its launcher.
  Drawer sides: left/right/bottom. Footer and body accept arbitrary children.
- Popover/hover-card accept controlled or internal open state and child slots.
  Hover-card is supplementary information; essential interactions belong in popovers
  or dialogs. Command palette uses native search/buttons with Arrow keys, Home/End,
  Enter and Tab; the consumer owns its global keyboard shortcut and item grouping.
- Tables locally sort when `sort` is omitted, or accept controlled `sort`/`null` and
  `onSortChange`. Use `manualSort` for server sorting. Comparators support numbers,
  dates, natural text and nulls last; `sisoSortRows` is separately exported. Optional
  controlled checkboxes select visible rows while preserving off-page selections.
  Caption is required. No virtualization; paginate large collections externally.
- Filters emit query/filter changes; consumers apply filtering. Pagination is 1-based,
  clamps invalid bounds, and keeps a bounded number of page buttons.
- Notification read/dismiss actions emit IDs; the caller updates the collection.
  Toasts also use caller-owned items. Auto-dismiss is opt-in via `durationMs`, paused
  on focus/hover and restarted with the full duration afterwards. No global singleton.
- Dropzone validates MIME wildcards, extensions, count and bytes equally for dropped
  and selected files. `onFiles` receives accepted files; `onReject` receives reasons.
  Limits apply to one selection/drop, not cumulative external upload state. This is
  client validation only: enforce file safety on the server. No upload/network claim.
- Chat/comment data is caller-owned and plain text (React escapes content). Async
  send/reply callbacks retain drafts on failure and show the error; they never
  fabricate delivered state. Consumer controls status, retries, moderation, resolve,
  delete permission and persistence. No auto-scroll or optimistic insertion. Supply
  trusted/sanitized attachment URLs; no HTML rendering or third-party avatar assets.

## Styling and accessibility

Import `styles.css` once. Classes are prefixed `siso-blocks-`; no global reset is
included. Override `--siso-blocks-background`, `--siso-blocks-foreground`,
`--siso-blocks-muted`, `--siso-blocks-border`, `--siso-blocks-accent`,
`--siso-blocks-soft`, `--siso-blocks-danger` and `--siso-blocks-font` on `:root` or an
ancestor. Portal content renders under document.body, so per-subtree tokens must also
be available there. Light defaults are built in; consumers supply dark colors.
No animation is applied, including when reduced motion is requested. Native table,
form, list, time, navigation and button semantics are preserved. Notifications use
explicit read state and action labels; toast text is a live status/alert. Consumers
must provide informative titles, descriptions and meaningful icon/attachment labels.

## Provenance and limits

The compatibility Siso* API contains original SISO implementations, with Radix composition informed by the local MIT
shadcn dialog/popover/hover-card wrappers. Arc source was inspected as family/API
reference only: item-by-item free-tier redistribution provenance was not established,
so that initial compatibility API copied no Arc code. The separately verified source entry above now ships the actual MIT/free Arc implementation; no unlicensed media is included. See NOTICE and machine-readable
inventory.json for references, explicit omissions and behavior limits. The source
entry retains the original motion effects. Arc marketing, Pro, unlicensed media and
full-app compositions are outside this package.
