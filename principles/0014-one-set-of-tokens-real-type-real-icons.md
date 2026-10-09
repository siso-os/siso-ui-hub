# ADR 0014: One set of tokens, real type, real icons

Status: accepted, round 1 (7 Oct 2026)

> "NO EMOJIS — icons"
>
> — Shaan, 8 Jun, model app (global rule) · HALO, 28 Sep: "find a way to tokenize everything so that like i could come up with some color schemes" and "too solid of a yellow"

- **Tokens only.** Colour, type, radius, spacing and motion all come from tokens, and a theme is just a token file (your five colour boards). No hard-coded colours in components.
- **Colour carries meaning** (state, domain). Selected and hovered items get a tint, not a solid fill.
- **Type:** real fonts with two weights, and tabular numbers for anything that changes.
- **Icons** come from one icon set, with no emoji anywhere. Sites and apps show their real favicon or logo, never a fake one (6 Oct 22:10).

## Check

a script confirms there are no colour literals outside the token files, no emoji in rendered text, and only one icon library in the bundle.
