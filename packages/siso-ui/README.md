# @siso/ui

The umbrella for SISO's reusable UI packages. The release includes private installable tarballs, not a public npm registry release.

```tsx
import { SisoHubShell } from "@siso/ui/shells"
import { SisoSideNav } from "@siso/ui/navigation"
import "@siso/ui/styles.css"
```

Use individual packages to keep a smaller dependency set. The umbrella's root exports seven namespaces (`tokens`, `atoms`, `blocks`, `navigation`, `shells`, `widgets`, `charts`), so overlapping component names remain unambiguous. Subpaths forward to their respective packages and work with ordinary ESM bundlers. Consumer routes, data, permissions, storage and server APIs remain in the host app. See `PACKAGES.md` and the external consumer example for installation and tested behavior.
