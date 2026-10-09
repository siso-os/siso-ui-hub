# ADR 0007: Cards are for things, not for wrapping text

Status: accepted, round 1 (7 Oct 2026)

> "rather than this ai generated kind of left hand side line that codex likes to put there"
>
> — Shaan, 5 Oct · 6 Oct 20:35: "the thinking blocks… they're cool but they don't need to be wrapped in this purple card" · 22:10: "the chat still wraps in a big command card… It should be cleaner"

- **A card is an object you can act on:** an agent, task, page or machine. Text, thinking, commands and logs sit on the page, not in a box.
- **No coloured accent line on the left** of any card or block, ever. Emphasis comes from type: a title, subtext, a tag, a link ("I kind of like it when it's like some things have titles and subtext", 6 Oct 21:15).
- **Agent output reads like a good document:** titles, subtext, tags and linked text. Each tool call folds to one line. No drop-downs inside answers ("all these drop-down bullshits. It's just illegible", 6 Oct 21:10).

## Check

a script finds no coloured left border wider than 1 px, no card inside a card, and no filled box around thinking or commands.
