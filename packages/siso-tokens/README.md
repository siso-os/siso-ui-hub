# @siso/tokens

Shared SISO values, seeded from Agent Base's existing token package. Import once before the other packages:

```tsx
import "@siso/tokens/styles.css"
import { setSisoTheme } from "@siso/tokens"
setSisoTheme(document.documentElement, "dark")
```

`./siso.css` is a byte-preserved snapshot of the existing SISO tokens. Its source hash is in `inventory.json`. `./tokens.css` adds semantic light/dark aliases and has no body reset or overflow behavior. The standalone theme helper changes only the supplied element, setting its theme attribute and matching `dark`/`light` classes for chart and shadcn compatibility. React and Tailwind are not required.

## Source token sets
`setSisoTokenSet(element, "hub" | "landing" | "docs", "dark" | "light")` applies actual source values and semantic aliases. `sisoTokenVars` scopes them to a React wrapper. The Hub frame exports eight `SCHEMES`, matte/glass `SURFACES`, font/radius controls and the original `tokenVars` function. `sisoProductPalettes` preserves all seven landing product colour sets, including their dark glass top, accent and tint. See `source-provenance.json` for the originating files and digests.
