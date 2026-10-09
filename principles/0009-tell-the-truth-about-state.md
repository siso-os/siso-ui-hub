# ADR 0009: Tell the truth about state

Status: accepted, round 1 (7 Oct 2026)

> The model app's call (21 Sep): an empty state names what unlocks it. "A safety STOP that clears without verification is not a gate."
>
> — Shaan, model app decisions · Operator fit rule 6: "a line, not a hole" · operator-pack GOOD.md: incomplete data is shown honestly

- **Every widget and list has four designed states:**
  - **Loading:** a skeleton at the real size.
  - **Empty:** one line that says what unlocks it ("Connect Stripe to see revenue").
  - **Error:** this widget says so and offers Retry, while the rest of the page renders.
  - **Stale:** one word and the age ("3 h old").
- **Never fake data, never fill in zeros.** Unknown is a dash, with the reason on hover.
- **One truth.** When two sources disagree (the runtime says idle, the card says building), show the measured one and the other as a secondary word.
- **Warnings sit beside the work, never on top of it.**

## Check

cut the data source. Every widget shows its empty or error line, and nothing shows 0 when the value is actually unknown.
