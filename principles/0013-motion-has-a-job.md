# ADR 0013: Motion has a job

Status: accepted, round 1 (7 Oct 2026)

> You liked all the animations: the pulsing orb, the slide-up chips, the glow, the breathing dot.
>
> — Shaan, model app notes, 8 Jun

- **Motion shows** that something arrived, opened, changed or is working. It never decorates content that isn't changing.
- **Timings:**
  - entrances take 150–250 ms, easing out;
  - exits are shorter (100–150 ms);
  - hover feedback comes in under 100 ms;
  - a pressed button shrinks to about 98%.
- **Alive and still:** an agent at work looks alive (an orb, a breathing dot, a streaming line). A finished one is still.
- **Reduced motion:** everything respects the system setting, fading instead of moving.

## Check

a script confirms the durations fall in these ranges, that a reduced-motion style exists, and that nothing idle animates forever.
