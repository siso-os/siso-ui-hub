# ADR 0004: Widgets are data, drawn in one frame

Status: accepted, round 1 (7 Oct 2026)

> "Maybe we could just make that a widget system. Some are small widgets, some are bigger widgets"
>
> — Shaan, 5 Oct · HALO, 28 Sep: "if any widgets break or anything like that it's really easy to fix"

- **A page's widgets are a data file, not code.** Each entry has an id, type, title, span and options. The page draws the set, and a registry maps each type to its component. This is widget.v1: it's already in the Operator, the HALO CRM uses it, and AB-MAP is porting it to Agent Base. Each app keeps its own copy of the code.
- **Sizes come from a fixed menu, using your Apple names.** Spans are in tenths of the width:
  - **S** (a number or a ring): 2–3;
  - **M** (a list or a chart): 5;
  - **L** (the work): 7–10;
  - **Full:** opens as a sheet.

  In the 360 px panel, everything spans the full width.
- **One frame draws every widget.**
  - Its parts: a head line (title, one state word, a ⋯ menu), the body, and a hover card.
  - Its states: loading, empty, source down and stale.
  - An error boundary with Retry on each widget, so one broken widget never takes the page down.
- **The gallery lists every widget for the page.**
  - Widgets without data are greyed out, with the reason ("needs Stripe connected").
  - A widget you asked for that nobody has built yet shows as a *requested* row, in your words.
- **Changing shape:** a widget switches shape (chart or list) from its own ⋯ menu instead of a second widget being built.

## Check

the page's widgets come from a set file. Cut one widget's data source and only that widget changes state. The gallery shows every registered type.
