# ADR 0001: Hover shows more; click commits

Status: accepted, round 1 (7 Oct 2026)

> "when you hover over stuff You should usually show more information Like that's a good way about having to click on shit"
>
> — Shaan, 6 Oct 22:35 · also 5 Oct: "I can hover over to see these cards you know rather than scrolling all the way down to the bottom" · 23:00: "if you hover over something it should probably show like a preview card of information"

- **What gets a card:** any object with more to say, such as an agent, owner, page, link, task, machine or number. The row shows a name and one state word; the card shows the rest.
- **Timing:**
  - opens after the pointer rests for 300–500 ms, so passing over things doesn't flicker;
  - closes about 140 ms after the pointer leaves;
  - while one card is open, or one has just closed, the next opens in 80 ms, so you can scrub along a row of faces.
- **Contents, in order:**
  1.  who or what it is;
  2.  its state now;
  3.  3–5 facts;
  4.  its last activity.

  At most 320 px wide, with no scrolling inside.
- **Read only.** The pointer can move into the card without it closing, but the card has no buttons; clicking the object itself goes there. If you need actions, use a popover opened by a click, which can be pinned (InfrastructurePopover already works this way).
- **Keyboard and touch:** keyboard focus opens the same card and Esc closes it. On touch, a tap toggles the card.
- **Click always commits.** Nothing important lives only in a hover card; the page still works without it.
- **One card per kind of object**, used everywhere (AB-MAP: "the one hover detail for any agent, everywhere").
- **Pick:** Arc's hover-card (MIT). It already does all of the above, including touch, Escape and reduced motion (chapter 6).

## Check

hover over each kind of object on the page. Within half a second a card should show what it is and its state. Tab to the object and the same card should open. A script confirms every preview trigger can take focus.
