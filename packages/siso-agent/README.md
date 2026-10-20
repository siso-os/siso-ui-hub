# @siso/agent

The Agent Base surface parts, now part of the one kit: `composer` (frame, model picker, context meter, usage ring, activity pill, artifact shelf), `voice` (history, stats, dictionary, calendar, settings), `face` (agent faces, workspace marks, living glyphs), `icons` (the product icon set) and `os` (module registry and event bus).

```tsx
import { composer, face } from "@siso/agent"
import "@siso/agent/styles.css"
```

Moved, not rewritten: each area keeps its original source. Terminal (needs xterm) stays in Agent Base; side-nav and shell are already in `@siso/navigation` and `@siso/shells`.

## Supported product compatibility subpaths

The export map explicitly supports the 118 promoted Agent Base entries under
`@siso/agent/composer/*`, `os/*`, `icons/*`, `voice/*` and `face/*` (only the
listed keys, not a filesystem wildcard). For example:

```ts
export * from '@siso/agent/composer/compact-dial';
export * from '@siso/agent/icons/pq/search';
import '@siso/agent/face/halo-face.css';
import '@siso/agent/face/halo-face.js';
```

Use precise entries to preserve deep APIs and keep unrelated namespaces out of
the module graph. The legacy face index retains its CSS/controllers; the
controller-free `face/living-assets` entry keeps its independent boundary.
These exports do not change the package's existing UNLICENSED status.
