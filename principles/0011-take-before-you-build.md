# ADR 0011: Take before you build

Status: accepted, round 1 (7 Oct 2026)

> "pretty much all of these are useful, have useful comps that can be used in different scenarios that if we just rob out of the box will be way better"
>
> — Shaan, 6 Oct 23:00 · "certain things should just pretty much always use these components"

- **Before building any component, run `uihub find`.**
  - If the catalogue has a pick, use it.
  - If a library has one under a licence we can use, take it and fit it to our tokens.
  - Build by hand only when neither exists, and say why.
- **Every component records where it came from:** `pick:<n>`, `ui:<lib>/<name>`, `app:<Component>` or `hand`.
- **The licence decides:**
  - MIT or Apache: take it, with the notice;
  - no licence: reference only;
  - paid tier: no.
- **Track the share built from picks for each app.** The model app is at 88%.

## Check

every component file has a provenance tag, and `uihub check` lists hand-built components that have no reason.
