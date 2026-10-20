# SISO UI suite packages

The canonical workspace source is `packages/ui/packages/siso-ui` (`@siso/ui`), backed by nine focused shards in this directory. Version **0.4.1** imports the verified 0.4 kit into the monorepo and connects the rendered hub consumers to it. All sibling dependencies in source use `workspace:*`; the packer converts them to exact release versions for external consumers.

## Monorepo consumers

UI Hub and Bench use the same source shell, navigation and pill switch. UI Hub's existing primitives are promoted into the atoms shard at `@siso/ui/atoms/hub`, with thin compatibility exports in the product. Bench imports its charts from `@siso/ui/charts` and `@siso/ui/charts/source`. Video Hub's SISO-owned landing parts are in the site shard; its restricted beam remains application-only. Software Hub and Industries Hub read the exported token stylesheet in their static builds. Lawbook and Voice currently contain no imported UI runtime.

The products retain their routes, records, searches and content. Existing sidebar storage keys and skip-link targets are preserved. React hubs and the shared runtime use React/ReactDOM 19.2.7 to prevent separate hook runtimes. The workspace lock includes the existing external Teable build metadata required by Business OS; no Teable implementation is imported here. That product's vendor build remains outside Git as its README specifies.

Use the root pnpm workspace and `packages/ui/check.sh` for the package check. `SISO_UI_TOOLCHAIN` still permits a matching preinstalled toolchain for bounded checks. Build artifacts and browser receipts belong in a dedicated `SISO_UI_OUTPUT` data directory. The 0.4 release below is the frozen predecessor; its evidence is not a claim that the new monorepo builds have passed.

## Version 0.4 ECharts expansion

`packages/siso-ui` (`@siso/ui`) is the UI Hub umbrella over eight focused package shards. This frozen predecessor supplied the source pinned at `75964144e29ecc9efa6b7d2b3866a1c2167fdb0e` for the monorepo integration. The existing workbench adds an ECharts preset collection while preserving the Arc examples and Recharts presets.

The ECharts leaf adds 135 original chart configurations: 117 examples and 18 blocks across eight chart families. Together with 117 Recharts presets, the workbench has 252 presets; the chart inventory still has 27 behavior families. ECharts contributes renderer and configuration examples, not new behavior families. Its 149 provenance records cover 148 source files and the adapted utility helper. The package exposes `@siso/ui/charts/echarts` with `echarts@6.1.0` as an optional peer. Source provenance and the Apache-2.0 ECharts notice are recorded in `packages/siso-charts/echarts-provenance.json` and `packages/siso-charts/licenses/`.

ECharts uses Canvas by default. Only examples that explicitly pass the SVG renderer use SVG. A focused import looks like this:

```tsx
import { EChartsExampleExEchartsAreaChart } from "@siso/ui/charts/echarts"
import "@siso/ui/charts/styles.css"

<EChartsExampleExEchartsAreaChart />
```

Package and consumer source `138d542bb53681da3977a94d0530182ba95df621` passed nine declaration builds, 1,384 source-file checks, 137 unchanged Arc CSS modules, and 1,379 installed-file byte matches. The external consumer uses installed declarations without source aliases. All 135 ECharts presets produced painted Canvas or visible SVG output; all eight families also rendered at 390px. Keyboard selection opens exact preset URLs, the legend focuses a series, and the brush changes the plotted date range.

Dense Sankey previews scroll within a minimum-width plot on phones. A scoped Hub page background prevents Agent Base styles from breaking the Hub's light theme. The final dark/light screenshots were inspected separately from the rendering sweep; the 347 installed chart files stayed byte-identical across that CSS repair. Stable public HTML, JS, CSS, three substantial chunks and a raster preview passed HTTP 200 and exact SHA-256 readback. Exact deployment: https://d5dcd80f.siso-show.pages.dev.

| Package | What it contains |
| --- | --- |
| `@siso/ui` | Canonical consumer entry and umbrella namespaces for the nine focused packages. |
| `@siso/tokens` | Source token sets, frame schemes, product palettes, fonts and surface choices. |
| `@siso/atoms` | 54 free Arc install targets across 51 families, plus existing SISO atoms. |
| `@siso/blocks` | Free Arc composed components and page sections, with source styles and motion. |
| `@siso/navigation` | Hub navigation and existing Agent Base navigation modules. |
| `@siso/shells` | Hub and Agent Base shells and frame options. |
| `@siso/widgets` | Dashboard widget frames, board layout, sizes, data states and saved layouts. |
| `@siso/charts` | SISO charts, free Arc charts, the 117-preset Evil Charts Recharts collection and the optional ECharts source leaf. |
| `@siso/site` | Accepted footer and its parts, blog and docs components, product glyphs and source assets. |
| `@siso/agent` | Agent Base parts moved into the kit: the composer, voice surfaces, the agent face and workspace marks, 55 animated icons and the OS shell pieces. |

The free Arc set has 129 install targets from 126 distinct source families: 54 atom targets (51 families), 42 composed components, 21 page sections and 12 charts. Arc Pro is excluded. The suite includes 117 original MIT Evil Charts Recharts presets and 135 ECharts configurations. Preset counts describe examples and configurations, not independent behavior families. Existing chart basics and specialized APIs remain available alongside those presets.

The searchable component browser runs actual source examples and shows usage guidance and install information. The widget playground demonstrates fitting, placement, sizes, hide/add, loading, empty, error and stale states, detail views and layout export using illustrative fixture data. Three notification treatments are available: the free Arc notification centre, an MIT Uiable popover, and the free Arc toast stack. Three saved 21st.dev notification examples remain links to their authors; package redistribution rights have not been verified. The saved references are [Ahmed Mayara's notifications menu](https://21st.dev/@ahmedmayara/components/notifications-menu), [Origin UI's notifications with avatars](https://21st.dev/@originui/components/popover/notifications-with-avatars), and [Anubra's popover notifications](https://21st.dev/@anubra266/components/popover-1/popover-notifications).

Landing, blog and docs examples are distinct from the asset library. Inspect the full accepted footer or its reusable parts, then browse the separately listed 447 SISO assets. Asset records include source and hash metadata; use the recorded path and attribution when copying an asset. The footer beam is an application effect slot; the source effect with restricted redistribution terms is not part of the reusable package artifacts.

## Use the canonical kit

```tsx
import { SisoHubSourceShell } from "@siso/ui/shells"
import { SisoHubSideNav } from "@siso/ui/navigation"
import "@siso/ui/styles.css"

<SisoHubSourceShell
  leading={yourBrand}
  topbar={yourPageTabs}
  onSearch={openYourSearch}
  navigation={({ onNavigate: closeMobile }) => (
    <SisoHubSideNav groups={yourGroups} coreGroups={yourCores}
      activeId={activePage} coreId={activeCore} coreLabel={coreLabel}
      onSearch={openYourSearch}
      onNavigate={(item, event) => {
        event.preventDefault()
        navigate(item.id)
        closeMobile()
      }} />
  )}
>
  {yourPage}
</SisoHubSourceShell>
```

The consuming product supplies routes, permissions, business records, storage, transport, navigation groups and page content. The widget examples and chart values in the workbench are fixtures. They do not connect a product backend or establish product migration.

Use the package source manifests and inventories for exact exports and provenance. Respect each source licence: Arc Pro is reference-only, and the three saved 21st.dev examples are links until redistribution rights are established. The Evil Charts collection retains its MIT attribution.

## Build and evidence

Nine packages remain in the build graph: the `@siso/ui` umbrella and eight focused shards. Pin `SISO_UI_OUTPUT` to a dedicated run directory before `suite:build`, `scripts/check-suite-source.mjs`, or `suite:consumer`; do not reuse a historical release output. The source checker refuses to overwrite a receipt whose release version differs from `packages/siso-ui/package.json`. Use `SISO_SITE_SOURCE` for the verified original asset root, and `SISO_UI_IMAGE_PYTHON` for a Python environment containing the pinned `scripts/image-requirements.txt` packages. Run package/consumer work through `heavy`.

The delivered v0.3 predecessor is [ui-suite-v0.3.0](https://github.com/sisodias/siso-ui-hub/releases/tag/ui-suite-v0.3.0), merged through [PR #108](https://github.com/sisodias/siso-ui-hub/pull/108). Its separate evidence records nine declarations, 1,085 source checks, 1,224 installed-file matches, 129 Arc examples, 117 of 117 Recharts presets, 447 assets and 429 raster thumbnails. Those receipts remain frozen.

## Source styles, assets and existing modules

The build emits the original utility classes into distributable CSS. Import `@siso/ui/styles.css` once, then the source or docs stylesheet for the surface you use. Source scopes retain theme variables and portal hosts. The Agent Base shell and rail keep their existing behavior and persistence keys; the source shell menu is not claimed as a complete accessible menu implementation.

`@siso/ui/site/assets.json` records 447 original paths and SHA-256 hashes. The build verifies those bytes, then packs the originals under the site shard's `assets/`. The consumer copies those contents into its public root without changing paths and derives 429 small raster previews; SVGs remain direct previews. `SISO_SITE_SOURCE` selects the checkout or staged directory containing the verified originals. Fonts retain their notices. Arc sample photography is a separate 43-file credited set, not SISO-generated artwork.

Composer, voice, icons, the agent face and the OS pieces now live in `@siso/agent` (126 files; 116 byte-identical to Agent Base, the rest recorded in its `provenance.json`). Terminal stays in Agent Base because it needs @xterm and owns its transport and rendering; the side nav and shell were already in `@siso/navigation` and `@siso/shells`. Voice owns adapter-backed history, settings, dictionary and calendar surfaces. A preview does not establish backend integration, product migration or full assistive-technology acceptance.
