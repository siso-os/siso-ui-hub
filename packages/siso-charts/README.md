# `@siso/charts`

The v0.3 chart source combines SISO chart APIs, 12 free Arc chart targets and 117 original Evil Charts Recharts presets. The free Arc set totals 129 install targets across 126 source families: 54 atom targets (51 families), 42 composed components, 21 sections and 12 charts. The Evil Charts presets retain their MIT attribution and are a separate source collection, not 117 additional independent chart families. Arc Pro and unverified Tweenly registry implementations are excluded from this package.

```tsx
import { SisoScatter } from "@siso/charts"
import "@siso/tokens/styles.css"
import "@siso/charts/styles.css"

<SisoScatter title="Correlation" data={[{id:"one",label:"Example",x:10,y:20}]} />
```

Use the basic, series, special and source entries for the chart APIs. The original preset collection is exposed in the canonical kit at `@siso/ui/charts/presets` and in the focused package as `@siso/charts/presets` when emitted by the suite build. Check generated package metadata and inventory for exact names and types. React 19, Recharts, Framer Motion, clsx and tailwind-merge are peer requirements; the package declares its additional runtime dependency separately.

Release receipts record strict declaration checks, source hashes, installed-artifact identity, external consumer checks and separate browser observations. Match a receipt to the exact artifact before claiming adoption. Consumers own real data, labels, permissions and persistence. Workbench values are illustrative fixtures or explicitly computed release inventory totals. Charts fit their parent width; filter or paginate dense categories.
