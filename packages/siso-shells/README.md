# Original UI Hub AppFrame source

`SisoAppFrame` is the actual `app/src/kitv1/siso/app-frame.tsx`, including all
32 real animated lucide icons, the original shadcn primitives, role/workspace
switchers, sliding tool selection, grouped/dropdown navigation, user/upgrade
footer, rail, command palette, and phone states. This is separate from the
previous convenience shell APIs below, which remain compatible.

```tsx
import { SisoAppFrame, SISO_FRAME, SISO_TOKENS, tokenVars } from '@siso/shells'
import '@siso/shells/styles.css'

<div className="siso-source-frame dark" data-surface="matte"
  style={tokenVars(SISO_TOKENS, 'dark')}>
  <SisoAppFrame cfg={{ ...SISO_FRAME, tools: 4 }}>
    <YourPage />
  </SisoAppFrame>
</div>
```

The package-suite build generates Tailwind v4 utilities from the copied source.
When consuming raw source directly, scan `packages/siso-shells/src/source/**`
and provide the shared shadcn theme mapping (or consume the suite's compiled CSS).
The original Tailwind classes are preserved, rather than approximated in plain CSS.
Install declared peers: React/React DOM 19, radix-ui, motion, lucide-react, cmdk,
class-variance-authority, clsx and tailwind-merge. No app aliases, router, auth,
data stores or asset paths remain.

`cfg` retains layout, look, collapse, header, tools, nav, footer and topbar.
`normalise`, `fit`, `applies`, `SISO_FRAME_SPEC` (including every source variation),
`SCHEMES`, `SURFACES`, `FONTS`, `SISO_TOKENS` and `tokenVars` are exported.
`FrameCfg`, `FrameView`, `SisoAppFrameProps` and data/icon types are exported.

`children` replaces only the page area; `navigation` optionally replaces the
current groups using `{ label, items: [{ title, badge?, sub? }] }`. Existing
source navigation/tool interaction remains intact. Omitting children deliberately
renders the **original demonstration fixture**, exported as `SISO_FRAME_FIXTURE`
and `SisoFrameFixturePage`; its names, metrics and status rows are sample data,
not live business facts. Consumer slots can pass `null` to suppress that fixture.
`still`, `only`, `state`, and `peek` retain the source preview behaviors.

The source sidebar writes its `sidebar_state` cookie and listens globally for
Cmd/Ctrl+B; the frame listens globally for Cmd/Ctrl+K unless `still`. Mount one
interactive source frame per page. `state="expanded"|"collapsed"` deliberately
pins state for inspection. Embedded previews must contain the source's fixed
sidebar using `transform: translateZ(0)`, as the original KitAppFrame does.
The source fixture has decorative controls (New, Back/Forward, account actions)
without application handlers; consumers own product actions. The copied source
retains its original fixed sidebar sizing; drag resize belongs to legacy shells.

SHA-256 provenance and exact adaptations are in `source-provenance.json`.
MIT shadcn and lucide-animated notices are preserved; SISO source remains proprietary.

---

# @siso/shells

The UI Hub's own shell and app-frame choices, reusable without its router,
catalogue, authentication, icon library or Tailwind. React 19 is the only runtime
dependency. Import the stylesheet once; source exports require a TSX-capable build.

```tsx
import { SisoHubShell, SisoAppShell } from '@siso/shells'
import '@siso/shells/styles.css'

<SisoHubShell
  brand={<strong>Workspace</strong>}
  navigation={({ closeMobile }) => <nav aria-label="Pages">
    <a href="/overview" onClick={closeMobile}>Overview</a>
  </nav>}
  profile={<button type="button">Your account</button>}
  onSearch={() => setSearchOpen(true)}
  topbar={<span>Overview</span>}
  topbarActions={<button type="button">Notifications</button>}
>
  <h1>Overview</h1>
</SisoHubShell>
```

`SisoHubShell` keeps the hub's sidebar/topbar/content frame, 256px sidebar,
216–400px resize bounds, full offcanvas collapse, and sidebar search. The app
shell has `preset="sidebar"` (icon collapse) or `preset="rail-panel"` (separate
64px workspace rail with offcanvas panel). Pass workspace controls to `rail`.
`look` is `plain`, `inset` or `floating`. Rail-panel always uses offcanvas so
collapsing does not produce two adjacent icon rails. `SISO_SHELL_PRESETS`
documents these combinations. The optional site shell is deferred: the source
app-frame supplies dashboard layouts rather than a site header/footer contract.

All slots accept nodes; `brand`, `navigation`, `search`, `profile`,
`sidebarFooter` and `rail` can also be render functions receiving
`{ collapsed, mobile, closeMobile }`. Render functions should adapt labels for
icon collapse and invoke `closeMobile` on navigation. Navigation can use
`@siso/navigation`'s `SisoSideNav` without making this package depend on it.
Desktop and mobile navigation render separately: use unique IDs or `useId`
inside your slot component. Keep route/active state in the consumer.

Pass `collapsed`/`onCollapsedChange`, `mobileOpen`/`onMobileOpenChange` and
`sidebarWidth`/`onSidebarWidthChange` to control state. Omit each controlled value
to use local state. `defaultCollapsed` and `defaultSidebarWidth` initialize local
state. Width values and changes are clamped; bounds have a 160px floor.
Persistence belongs to the consumer. Double-click the edge to reset to the
default width. Focus the separator and use Left/Right (8px), Shift+Left/Right
(32px), Home/End (bounds). Pointer capture releases on up/cancel/unmount.

Below 1024px, the navigation opens as a native modal dialog with focus trapping,
Escape/backdrop dismissal, and return to the menu trigger. At desktop width it
closes. Put phone-only tabs in `mobileTabs`. Search stays in the sidebar;
`onSearch` optionally handles Cmd/Ctrl+K. Cmd/Ctrl+B collapses the desktop panel.
Shortcuts are scoped to focus inside the shell, skip editable controls, and can
be disabled with `shortcuts={false}`. Own your search dialog in the consumer.

The shell defaults to viewport height; set `style={{ height: '100%' }}` inside a
parent with a definite height for embedded usage. Content and navigation scroll
independently; brand, search, profile and topbar remain anchored. Slots must
respect their available width. Background, foreground, sidebar, border, primary
and radius use shared CSS tokens with standalone fallbacks. Override
`--siso-shell-bg`, `--siso-shell-frame`, `--siso-shell-fg`,
`--siso-shell-line`, `--siso-shell-accent`, `--siso-shell-radius` or
`--siso-font-sans` on the shell as needed. There is no full-screen blur, pointer
spotlight, continuous rim animation or oversized glow layer; this deliberately
avoids the hub's expensive scrolling effects.

Public source redistribution licensing is unresolved; see NOTICE and LICENSE.
