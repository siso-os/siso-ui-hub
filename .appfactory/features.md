# SISO App Factory: features

Each feature serves a line of `app.md`. Ids never change; a dropped feature stays with `Status: cut`.

## F01 · Projects home
Every project he's building, with real counts: pages, components, and how many are picked, need a pick, ours or dead.
Why: "I'd want to see the projects I'm working on" (app.md, For; Done 1).
Status: built

## F02 · A project's line
A project opens to its purpose, features, widgets, pages and components, read from its `.appfactory/`, each component
glowing its status.
Why: the line is the project's spine (app.md, idea 24; Done 2).
Status: built

## F03 · The component page
One standard page per component: what it is, why, status and grade, the proposed swap, where it's used; then the live
render, props, install line, licence, his note and the rules it passes.
Why: Done 3; spec §6.3.
Status: built

## F04 · Variations side by side
For one component, 2-3 variations an agent made from the real component, or swaps from the index, rendered next to the
current one.
Why: Done 4; step 6 of the line.
Status: planned

## F05 · Pick and write back
He says take or skip, with his words; the pick is written to the project's `.appfactory/`.
Why: Done 4; "he picks by looking".
Status: built

## F06 · Live render from source
Any component renders from its own code, read-only from its repo, with no install and no build.
Why: Done 3; idea 20 ("they've actually got the code used and rendered").
Status: built

## F07 · SISO UI
The set he likes, chosen by looking, as a registry: one install line per part, a page that lists the set.
Why: Done 5; spec §5.
Status: planned

## F08 · The cores
Every hub is a core with its own colour and page; the factory gives SISO OS one manifest listing them, so they appear
in the OS rail grouped as Know who, Build with, Judge, Moulds, the Line, Ship.
Why: app.md, For ("every hub he owns is a core inside it").
Status: built

## F09 · Industries
The all-industries table that searches, and each industry's research packs.
Why: Done 6; spec §9.
Status: planned

## F10 · Read and check every `.appfactory/`
The factory finds each project's `.appfactory/` on disk, reads it, and runs `appfactory check` on it.
Why: app.md, It is not ("it reads each project's `.appfactory/` from disk").
Status: built

## F11 · Rules
The 15 UI principles with his words, and his dashboard rules as he gives them; a component page shows which it passes.
Why: Done 3 ("the rules it passes"); spec §6.7.
Status: planned

## F12 · The agents' door
One MCP with each core's verbs (`projects.list`, `ui.search`, `ui.show`, `ui.variants`, `ui.pick`, `ui.check`) and
`/llms.txt`, so his agents use the factory the way he does.
Why: app.md, It is not ("agents do steps 1-7").
Status: planned
