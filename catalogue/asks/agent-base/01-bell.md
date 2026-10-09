# Agent Base: Bell → arc:notification-center frame with the AgentNotificationStack row

**Project:** Agent Base · **Owner:** AGENT-BASE · **At:** 2026-10-07 01:43 +0700 · **From:** UI-HUB, `siso-ui-hub/catalogue/swaps.json` (agent-base, swap 1 of 6; judged at origin/main (db6f8069e1))

## His words (verbatim)
> every comp comes from this list and if we make a new custom comp it gets noted down as a custom comp on this inventory list… make the ui clean instead of just doing a bunch of iteration rounds
— Shaan, 7 Oct ~00:40 (relayed by A0, A0-NOTE-2)

> pretty much all of these are useful, have useful comps that can be used in different scenarios that if we just rob out of the box will be way better
— Shaan, 6 Oct 23:00 (rule 11: Take before you build)

> just a notifications icon which has a little pop up… it pings when a new one comes through. But they're not always showing up top
— Shaan, 6 Oct 23:35 (rule 15: Fixed anchors, split buttons, one bell)

## What it means (UI-HUB)
- Swap `components/NotificationsBell.tsx`, `components/AgentNotificationStack.tsx` for **arc:notification-center frame with the AgentNotificationStack row**. Shaan's 6 Oct 23:35 ask: one bell, every page, his owner pop-ups as the rows.
- Across the apps: Built three times. One bell in the header of every app (ADR 15): unread count, All/Unread, mark all read, rows that open in place. The rows are our approved AgentNotificationStack row; each app's kinds and icons are data.
- Install: `npx shadcn@latest add @uiarc/notification-center` (map it to your tokens; keep your data and actions)
- Keep: `siso:agent-notification-row` (ours, registered: He asked for these owner pop-ups; approved bank 'good'. Face, title, the ask, react, reply in one row. No library row does this.)
- Effort: M. Brief for your project: `~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub/bin/uihub brief agent-base`.

## Done when
- The files above render through arc:notification-center frame with the AgentNotificationStack row, installed from the catalogue, and each new or changed component file carries a line `// uihub: <id>`.
- `uihub check agent-base --ref <your branch>` exits 0, and `uihub check <page URL> --surface dashboard` shows no new failures on the pages it appears on.
- He can open one URL and see it (before/after shots).
