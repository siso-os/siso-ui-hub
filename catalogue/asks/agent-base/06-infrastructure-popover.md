# Agent Base: Infrastructure popover → arc:popover, one line per server

**Project:** Agent Base · **Owner:** AGENT-BASE · **At:** 2026-10-07 01:43 +0700 · **From:** UI-HUB, `siso-ui-hub/catalogue/swaps.json` (agent-base, swap 6 of 6; judged at origin/main (db6f8069e1))

## His words (verbatim)
> every comp comes from this list and if we make a new custom comp it gets noted down as a custom comp on this inventory list… make the ui clean instead of just doing a bunch of iteration rounds
— Shaan, 7 Oct ~00:40 (relayed by A0, A0-NOTE-2)

> pretty much all of these are useful, have useful comps that can be used in different scenarios that if we just rob out of the box will be way better
— Shaan, 6 Oct 23:00 (rule 11: Take before you build)

> there's a lot of dead space there… you don't need to announce everything it's just multiple times
— Shaan, 5 Oct (rule 6: Say it once, in fewer words)

## What it means (UI-HUB)
- Swap `components/InfrastructurePopover.tsx` for **arc:popover, one line per server**. AB-MAP: 'the Agent Infrastructure card in place is a text wall'.
- Install: `npx shadcn@latest add @uiarc/popover` (map it to your tokens; keep your data and actions)
- Effort: S. Brief for your project: `~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub/bin/uihub brief agent-base`.

## Done when
- The files above render through arc:popover, one line per server, installed from the catalogue, and each new or changed component file carries a line `// uihub: <id>`.
- `uihub check agent-base --ref <your branch>` exits 0, and `uihub check <page URL> --surface dashboard` shows no new failures on the pages it appears on.
- He can open one URL and see it (before/after shots).
