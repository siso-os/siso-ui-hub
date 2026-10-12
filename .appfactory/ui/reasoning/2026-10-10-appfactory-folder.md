# One `.appfactory/` folder per project, read from disk

## Decision
Each project keeps `.appfactory/` at its repo root (standard: `factory/standard/APPFACTORY.md`). Its files follow
the line, linked by ids (feature → widget → page → component) so `appfactory check` can prove the chain. The factory
reads them from disk and copies nothing.

## His words
> "Something cooler than just UI, maybe like CISO UI or I don't know, like something cooler than just a random UI folder
> that might clash with a lot of stuff. A folder, not a separate repo" (idea 25, 10 Oct 2026 05:06)

> "Why don't we make our own folder, we'll call it for each project, .appfactory And then you can have UI in there"
> (idea 25, 10 Oct 2026 05:06)

## Why
The agent building a project reads one folder and knows the purpose, the features and every part with its reason.
Ids make it checkable, and git keeps the history. That is GQ-001's test: a cold agent should build a page faster with
it than without.

## Instead of
- A separate UI repo per project (two repos to keep in step).
- `projects/<project>/spec.json` inside the UI Hub (the spec's first idea): it lived away from the code it described.
