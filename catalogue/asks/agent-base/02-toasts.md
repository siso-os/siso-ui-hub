# Agent Base: Toasts → arc:toast-stack

**Project:** Agent Base · **Owner:** AGENT-BASE · **At:** 2026-10-07 01:43 +0700 · **From:** UI-HUB, `siso-ui-hub/catalogue/swaps.json` (agent-base, swap 2 of 6; judged at origin/main (db6f8069e1))

## His words (verbatim)
> every comp comes from this list and if we make a new custom comp it gets noted down as a custom comp on this inventory list… make the ui clean instead of just doing a bunch of iteration rounds
— Shaan, 7 Oct ~00:40 (relayed by A0, A0-NOTE-2)

> pretty much all of these are useful, have useful comps that can be used in different scenarios that if we just rob out of the box will be way better
— Shaan, 6 Oct 23:00 (rule 11: Take before you build)

## What it means (UI-HUB)
- Swap `components/OwnerLinkToast.tsx`, `components/UpdateToast.tsx`, `components/browser/DownloadToast.tsx` for **arc:toast-stack**. Three different pop-ups become one stack in one place; two clickable divs go.
- Across the apps: Six toasts across three apps. One toaster per app, one look: a short confirmation that stacks at the edge.
- Install: `npx shadcn@latest add @uiarc/toast-stack` · `npx shadcn@latest add @uiarc/toast` (map it to your tokens; keep your data and actions)
- Overlaps t-0443 (Ship the Agent Zero panel round 1 (Team owners, phone-width Tasks, Pages, Activity words, pop-ups)): it touches the same files; take them in one run.
- Effort: S. Brief for your project: `~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub/bin/uihub brief agent-base`.

## Done when
- The files above render through arc:toast-stack, installed from the catalogue, and each new or changed component file carries a line `// uihub: <id>`.
- `uihub check agent-base --ref <your branch>` exits 0, and `uihub check <page URL> --surface dashboard` shows no new failures on the pages it appears on.
- He can open one URL and see it (before/after shots).
