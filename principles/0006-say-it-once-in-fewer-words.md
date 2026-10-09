# ADR 0006: Say it once, in fewer words

Status: accepted, round 1 (7 Oct 2026)

> "there's a lot of dead space there… you don't need to announce everything it's just multiple times"
>
> — Shaan, 5 Oct · 6 Oct 21:00: "too much words taking up space" · 5 Oct: "what's the best like one sentence way of what we achieved and why and maybe i can click on it to see more"

- **One best sentence, then "more"** (on hover or click). Never show the prompt, the log or raw output by default.
- **Say things once.** A title appears once per page, and widgets don't repeat the page title or announce themselves.
- **Labels and numbers:** labels are one or two words. Numbers carry units, not sentences.
- **Long names** are cut in the middle, with the full name on hover ("long names are 'fucking awful'", 8 Jun).
- **Metadata nobody acts on** (cache rate, internal ids) isn't shown.

## Check

a script flags any string repeated on one screen. Every block of text longer than two lines has a one-sentence summary above it.
