# ADR 0002: Space comes before components

Status: accepted, round 1 (7 Oct 2026)

> "We know what components need to be on the page. It's about how much space these components should take, how they're going to be used… It's not just the components, it's how they fit together."
>
> — Shaan, 3 Sep, Operator · 5 Oct: "some are small widgets, some are bigger widgets but they don't need to take up the whole page"

- **Before drawing anything,** write four facts per component:
  - **use:** glance, read, act or work;
  - **frequency:** every visit, most visits, sometimes or rarely;
  - **volume:** fixed, grows with the fleet, or grows with time;
  - **neighbours:** what it links to and must sit beside.
- **Use decides size.** The work gets at least 55% of the first screen, actions at most 20%, and glance items at most 12%.
- **Frequency decides place.** Things used every visit sit above the fold; rare ones go in a popover or the footer.
- **Volume decides growth.** Fixed content keeps its natural width. Content that grows with the fleet wraps down. Content that grows with time scrolls inside its own box.
- **Draw it at three sizes:** your laptop (1320×820), 1920×1080, and Agent Base's 360 px panel. Note where the next component of each kind would go.

## Check

the screen spec has the four-fact table and the row layout before it names a single component.
