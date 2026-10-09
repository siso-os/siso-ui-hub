# ADR 0005: Open detail in place

Status: accepted, round 1 (7 Oct 2026)

> "It's not like a new page where it fucking moves like that. It just opens up"
>
> — Shaan, 28 Jun, model app (marked binding) · 5 Oct: "i like how it like drops down everything's dropped down so it can fit into a clean view"

- **Detail opens where you are:** a row expands, a sheet slides in from the right, or a popover opens. The page underneath doesn't move or reload.
- **Full navigation** is only for a different subject (another agent, another project), and even then the shell stays (rule 10).
- **Every open state has a URL** (`?id=&tab=&section=`), so Back works and a link reopens exactly that view.
- **What's live shows without a click.** Drop-downs hold detail, never the main content ("I just don't like how top level to see what agents are working inside I got to click on the drop down", 6 Oct).

## Check

open any detail. The page behind it stays put and the URL changes. Paste that URL into a new tab and you get the same view.
