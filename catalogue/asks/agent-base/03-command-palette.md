# Agent Base: Command palette → arc:command-palette (keep WorkspaceCommandPalette's actions)

**Project:** Agent Base · **Owner:** AGENT-BASE · **At:** 2026-10-07 01:43 +0700 · **From:** UI-HUB, `siso-ui-hub/catalogue/swaps.json` (agent-base, swap 3 of 6; judged at origin/main (db6f8069e1))

## His words (verbatim)
> every comp comes from this list and if we make a new custom comp it gets noted down as a custom comp on this inventory list… make the ui clean instead of just doing a bunch of iteration rounds
— Shaan, 7 Oct ~00:40 (relayed by A0, A0-NOTE-2)

> pretty much all of these are useful, have useful comps that can be used in different scenarios that if we just rob out of the box will be way better
— Shaan, 6 Oct 23:00 (rule 11: Take before you build)

## What it means (UI-HUB)
- Swap `components/WorkspaceCommandPalette.tsx`, `components/browser/CommandBar.tsx` for **arc:command-palette (keep WorkspaceCommandPalette's actions)**. One ⌘K; the browser's command bar folds into it. Archive the dead CommandBar and CommandCrumbs.
- Across the apps: Built three times (Agent Base, Operator, model app). One frame, each app's actions as data. Keyboard first, reduced motion.
- Install: `npx shadcn@latest add @uiarc/command-palette` (map it to your tokens; keep your data and actions)
- Effort: M. Brief for your project: `~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub/bin/uihub brief agent-base`.

## Done when
- The files above render through arc:command-palette (keep WorkspaceCommandPalette's actions), installed from the catalogue, and each new or changed component file carries a line `// uihub: <id>`.
- `uihub check agent-base --ref <your branch>` exits 0, and `uihub check <page URL> --surface dashboard` shows no new failures on the pages it appears on.
- He can open one URL and see it (before/after shots).
