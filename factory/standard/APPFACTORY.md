# The `.appfactory/` standard, v0.1 (10 Oct 2026)

Every SISO project carries one folder, `.appfactory/`, at the root of its own repo, next to its code. It holds what
the app is for and everything its UI is made of, written down one step of the line at a time. The agent building the
project reads it first; git versions it; the App Factory reads it from disk to draw the project's page. Nothing is
copied anywhere else.

Shaan, 10 Oct: "Why don't we make our own folder, we'll call it for each project, .appfactory And then you can have UI
in there". The line it follows is his (spec `app-factory.md` §12): "what is the app for that dictates the features,
features dictate the widgets, the widgets and a bit of reasoning figures out what pages and sub pages there are and
then you put them together and then you see if there's any better comps for the job and then you make sure it's just
clean as fuck and works for different sizes and then you can iterate with human in the loop".

## The shape

```
.appfactory/
  appfactory.json        who this project is, and where it stands on the line (steps 1-8)
  app.md                 step 1: what the app is for
  features.md            step 2: the features that purpose needs   (F01, F02, ...)
  ui/
    widgets.json         step 3: the widgets each feature needs     (W-<slug>)
    pages.json           step 4: pages and sub-pages, and the widgets on each (P-<slug>)
    flows/<slug>.md      step 4: journeys across pages
    components.json      steps 5-6: every component, where it came from and why (C-<slug>)
    reasoning/<date>-<slug>.md   every decision, with his words verbatim
    shots/<P-id>@390.jpg, <P-id>@1440.jpg   step 7: every built page at both sizes
```

Later, other cores add their own folders beside `ui/` (the skills a project uses, the industry it serves). A core only
adds a folder; it never changes the files above.

## The chain (what makes it checkable)

Each step names the step before it by id, so every pixel traces back to the purpose:

`app.md` → feature `F01` → widget `W-…` (`features: ["F01"]`) → page `P-…` (`widgets: [...]`) → component `C-…`
(`widgets: [...]`).

`factory/bin/appfactory check <repo>` fails on a broken link, a file that doesn't match its schema, or a built page
without both shots.

## The files

### `appfactory.json` (schema `schema/appfactory.schema.json`)
- `standard`: `"appfactory/0.1"`.
- `id`, `name`, `repo` (`owner/name`), `root` (where the app's code is, relative to the repo root).
- `surface`: `dashboard`, `native-app`, `landing-site` or `doc` (the UI Hub's surface kinds; `uihub brief` reads it).
- `space`: which SISO OS space it lives in (`agent-base`, `app-factory`, `agency`), or `null`.
- `colour`: its colour, one hex.
- `inventory`: the UI Hub inventory id (`inventory/<id>.jsonl`), when the nightly census covers it.
- `run`: `{ "dev": "<command>", "url": "<where it runs>" }`.
- `line`: eight entries, one per step: `{ "step", "name", "status": "todo|doing|done", "at", "by", "note" }`.
  Agents do steps 1-7; Shaan comes in at step 8.

### `app.md`
Four headings, in this order: `## For` (who, and the job they hire it for), `## His words` (quoted verbatim, dated),
`## It is not` (what it deliberately doesn't do), `## Done looks like` (how we'd know it works for him).

### `features.md`
One heading per feature: `## F01 · <name>`. Under it: one line on what it does, `Why:` (which part of `app.md` needs
it), `Status:` `planned`, `built` or `cut`.

### `ui/widgets.json` (schema `schema/widgets.schema.json`)
A widget is a self-contained block of UI that does one job on real data (a stat strip, a project card grid, the rail).
Each: `id` (`W-<slug>`), `name`, `features` (ids), `shows` (what's on it), `data` (where its data comes from),
`states` (at least `ready`; usually `loading`, `empty`, `error` too), `status` (`planned` or `built`).

### `ui/pages.json` (schema `schema/pages.schema.json`)
Each page or sub-page: `id` (`P-<slug>`), `name`, `route`, `parent` (a page id, or `null` for a top page), `purpose`,
`widgets` (ids, in order), `status` (`planned` or `built`).

### `ui/flows/<slug>.md`
One journey: a title, `Pages:` the page ids in order (`P-home → P-project → P-component`), then numbered steps.

### `ui/components.json` (schema `schema/components.schema.json`)
Every component the UI is built from. Each: `id` (`C-<slug>`), `name`, `file` (repo-relative, or a package path),
`source` (one of `siso:<id>`, `pick:<url>`, `shadcn:<name>`, `library:<lib>/<name>`, `custom`), `uihub` (the catalogue
id it's registered under, which the file's `// uihub: <id>` line repeats), `why`, `widgets` (ids), `status` (`picked`,
`needs-pick`, `ours`, `dead`; the same four colours the factory draws), and `swapTo` when a better part is proposed.
Search order for a part (step 6): ours first (SISO UI), then his picks, then the index.

### `ui/reasoning/<YYYY-MM-DD>-<slug>.md`
One decision per file: `## Decision`, `## His words` (a `>` quote, verbatim, dated), `## Why`, `## Instead of`.

### `ui/shots/`
`<page-id>@390.jpg` and `<page-id>@1440.jpg` for every page with `status: built`. Taken with the UI Hub's `bin/shoot`
(`SHOOT_WIDTH=390` for the phone size).

## Rules
1. **One folder, in the project's own repo.** The factory reads it from disk; nothing is copied and no project needs
   its own hosting.
2. **His words are verbatim and dated,** in `app.md` and in `reasoning/`. Agents paraphrase nowhere else.
3. **Ids never change.** Rename the `name`, keep the `id`. A cut feature stays with `Status: cut`.
4. **A part two projects use moves into SISO UI,** and both projects' `components.json` point at its `siso:` id.
5. **Every step updates `line`** in `appfactory.json`, and the project's `RECIPE.md` if it keeps one.
6. **It must pass `appfactory check`** before a step is marked `done`.

## The test (GQ-001, The Agent Workspace)
A cold agent given a project with `.appfactory/` should orient and build a page faster, with fewer errors, than one
given the same project without it. Run it once per standard version: same task, two cold Haiku agents, count turns and
defects.

## Tools
- `factory/bin/appfactory init <repo> --id <id> --name <name>`: writes the skeleton (it refuses if `.appfactory/` exists).
- `factory/bin/appfactory check <repo>`: schemas, links, shots; exit 1 on a failure.
- `factory/bin/appfactory show <repo>`: the chain on one screen (features → widgets → pages → components).
- `factory/bin/appfactory shots <repo> --base <url>`: every built page at 390 and 1440 into `ui/shots/`.
