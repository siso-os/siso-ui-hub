# ADR 0003: A page is bands: glance, then work, then detail

Status: accepted, round 1 (7 Oct 2026)

> "space allocated it not the cleanest"
>
> — Shaan, 6 Oct 22:35 · the Operator's fit rules were written from your Today and Streams rounds in September

- **Width and height:** every band spans the full width, and everything inside a band shares one height. Things that don't fill a band together don't share one.
- **One gutter** (16 px) everywhere, with left edges lined up.
- **No box in a box.** A band is either a strip (a hairline, no fill) or a row of cards. A card never holds a card.
- **Band order follows the questions you ask:**
  1.  the glance band;
  2.  the work band, which grows downward;
  3.  the detail band, which can collapse.
- **Controls sit on the line they control.**
- **Type:** at most three sizes per band (heading, body, small label).

## Check

the Operator's 8-line self-check. `uihub check` measures the bands, gutters, nested cards and type sizes on the live page.
