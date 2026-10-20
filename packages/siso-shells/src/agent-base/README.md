# Existing Agent Base generic shell package

Byte-for-byte copy of the existing private `@siso/shell` source. No redesign,
application stores, account records, screenshots or fixture data are included.
The parent package exports this index under `@siso/shells/agent-base`.

Exports are preserved: AppFrame/RailButton/RailDivider/TopButton,
Rail/RailSpace, PillTabs/PillTab, TopTabs/TopTab and drag MIME constants,
LayoutSwitch/nextLayout/LayoutOption, MenuButton/MenuList/MenuItem,
SummaryCard/CardSection/CardRow/SidePanel, ResizeHandle/useResizable,
load/save/setPersistPrefix/usePersisted, useOutsideClose, cn,
and HaloRim/HaloRimState.

Load `agent-base.css` for the original shell materials. HaloRim imports its
original local `halo-rim.css`; a consumer build must process CSS imports.
The styling expects the original `--crm-*` tokens plus its Tailwind utility
mappings. No new fallback palette or replacement design has been invented.

External dependencies: react, react-dom, lucide-react, clsx, tailwind-merge.
No source implementation changes were necessary: all imports were already local.
See `agent-base-provenance.json` at the package root for source/target SHA-256,
licence status, exact omitted artifacts and retained behavior limitations.

This is SISO-owned private source with no declared public redistribution licence.
It remains covered by the parent package's proprietary SISO terms; external
peer dependencies retain their respective licences.
