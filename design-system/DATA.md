# What stays out of this module (data and vendored code)

This module holds the design system's source, tokens, principles, docs and viewer code. These stayed out of the monorepo:

- `library/`: the vendored component library. 17,135 files from `21st-dev`, 173 from `kokonutui`, 137 from `motion-primitives`, and `library/manifest.json` (10 MB, the component index).
- `viewer/public/`: the viewer's thumbnails (preview output).
- `.github/assets/`: README logo and preview media.
- `systems/side-nav/*.png`: screenshots.
- `principles/verify-2026-10-17/`: verification run output.
- `research/**/*.jsonl` and `research/*.json`: research corpus and generated indexes.

All of it stays in the source repo, sisodias/siso-design-system, at commit a3f56cfe (the import baseline, 18 Oct 2026). Fetch it from there when it is needed.
