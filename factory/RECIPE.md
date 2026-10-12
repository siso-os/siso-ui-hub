# RECIPE: how the App Factory is built, step by step

Written as the work happens (spec `siso-os-release/ecosystem/specs/app-factory.md` §16). Each step: what, the
command, the skill or tool, and why. After two cores this becomes the "make a core" skill. Shaan's words for each step
are in `../.agents/source/`.

## 0. Read before building (10 Oct 2026, APP-FACTORY)
- **What:** the spec, V1 §4a, ideas 16-22, `research/atoms-audit.md`, this repo's `AGENTS.md`, the options page.
- **Tool:** reading, plus two Haiku Explore agents to map the parts (Agent Base packages and HALO widgets; the landing's
  pieces). Each returned paths and how self-contained each part is, in under 600 words.
- **Why:** most parts exist. The map tells you what to render, and from where, before anything is built.

## 1. A render service that shows any component from its own source (10 Oct)
- **What:** `factory/render/server.mjs`. TSX is transpiled server-side with vendored Sucrase; bare imports go to esm.sh
  on one pinned React 19; local imports (relative, `@/`, workspace packages like `@siso/shell`) are served read-only
  from the source repos named in `factory/render/roots.json`. Demos live in `factory/render/demos/<id>.tsx`, with
  `/* @css root:path */`, `/* @js root:path */` and `/* @root lp */` headers for stylesheets, plain scripts and which
  repo `@/` means. `/bundle/<id>` serves 21st's own built preview from the bank (7,984 on disk).
- **Command:** `node factory/render/server.mjs` (port 8850); vendor Sucrase once with
  `npm i sucrase esbuild && npx esbuild <entry> --bundle --format=esm --platform=neutral --outfile=factory/render/vendor/sucrase.mjs`.
- **Skill:** design-lab (the renderer recipe: Sucrase server-side, one React, rewrite both alias and relative imports).
- **Why:** spec §7 (every component visible from its code) and the pick page both need it; it is the same piece.
- **Gotchas met:** module-load failures do not fire `window.onerror`, so the harness imports the demo with
  `import().catch(fail)`; JSON imports are served as `export default <json>`; Tailwind v4 runs in the browser
  (`@tailwindcss/browser@4`).

## 2. SISO UI v0.1: candidates side by side, he says take or skip (10 Oct)
- **What:** `factory/siso-ui/v01.json` lists the candidates by decision (side nav, page tabs, ⌘K, bell and toast, cards,
  charts, inputs, our own pieces, colour and glow). `factory/siso-ui/build-v01.py` writes the page with his verbatim words
  from `catalogue/curated/picks.jsonl` and real counts from `inventory/summary.json`. Take/Skip buttons append to
  `factory/siso-ui/picks.jsonl` (`/api/pick`).
- **Command:** `python3 factory/siso-ui/build-v01.py`, then open http://127.0.0.1:8850/.
- **Skill:** design-lab (group by decision, his words on the page, honest cards for what can't render), ui-bank (his
  picks with notes), `bin/shoot` (camofox screenshots to verify every frame).
- **Why:** spec §5: the factory is built from the UI he likes, chosen by looking.
- **Findings on the way:** the bank's saved source for his three ReUI chart picks is not the chart (one is 21st's
  placeholder counter, two are shadcn's chart wrapper); the real chart is each one's `demo.tsx`. Card 05, his standard
  card, has nothing on disk.

## 3. The shell and the Projects home, on real data (10 Oct)
- **What:** `factory/app/App.tsx` renders through the same service at `/app`, so it needs no build while we iterate.
  The shell is Agent Base's own packages: `GroupedRail` and `RailDock` (`@siso/side-nav`) with the cores in V1 §4a's
  groups (`app/cores.ts`; one line per core sets its colour), `PillTabs` (`@siso/shell`) where every page you open
  becomes a tab and Projects and UI stay pinned, then a bell, light/dark and ⌘K buttons. Routes: `#/projects`,
  `#/p/<project>`, `#/p/<project>/c/<file>`, `#/<core>`.
- **Data:** `factory/bin/build-data` reads `inventory/summary.json`, `<project>.jsonl` and `<project>.census.json` and
  writes `factory/data/`. Status per spec §6: dead (grade dead), needs a pick (a swap is proposed), picked (from a
  library or our catalogue), ours (our own code). HALO CRM shows counts only.
- **Command:** `factory/bin/build-data`, then open http://127.0.0.1:8850/app.
- **Gotcha:** the rail is `position: fixed` (as in Agent Base), so the shell keeps a spacer the rail's width.

## 4. The `.appfactory/` standard, and the factory's own (10 Oct, after idea 25)
- **What:** `factory/standard/APPFACTORY.md` (the shape, the chain, the rules, the GQ-001 test) and four JSON Schemas;
  `factory/bin/appfactory init|check|show|shots`. Then `.appfactory/` for the factory itself at this repo's root,
  written by running the line on it: app.md → features (F01-F12) → widgets → pages → components → reasoning → shots.
- **Command:** `factory/bin/appfactory init <repo> --id <id> --name <name>`, fill it, then
  `factory/bin/appfactory shots <repo> --base <url>` and `factory/bin/appfactory check <repo>` until 0 failures.
- **Skill:** the line (spec §12), `bin/shoot` (now with `SHOOT_WIDTH=390`), `uihub check` at 390 and 1440.
- **Why:** each project's UI lives in its own repo, and the factory reads it from disk (spec §6a).
- **Gotchas:** at 390 the factory's rail took the whole screen (fixed: the rail collapses on phones, and the spacer
  measures the rail, since its width variables live on the rail element). `uihub check` found clickable divs (fixed:
  buttons); 65 inline colours and one band with too many type sizes wait for SISO UI's tokens.

## 5. A URL module for SISO OS (10 Oct, siso-os.md §4)
- **What:** `?embed=1` draws only the page and posts its title to the shell (`postMessage`, source `siso-module`);
  `factory/os/manifest.ts` is the App Factory as one module in SISO OS's Module shape with a URL entry (step 7).
  The render service runs as launchd `com.siso.app-factory-render` (port 8850, KeepAlive), so the URL is always up.
- **Why:** adding the App Factory to SISO OS is one manifest file with no shell edits (siso-os.md §11.2).

## 6. SISO OS's `.appfactory/` (10 Oct, from siso-os.md)
- **What:** in Agent Base's repo on branch `appfactory/siso-os-20261010` (worktree
  `_data/worktrees/siso-internal-labs-agent-base/appfactory-siso-os`): only the new folder. Features from §1-§10,
  with his five removals kept as `cut`; widgets and pages from §5-§7; components from the UI Hub's agent-base
  inventory (173), each mapped by name to its widget, plus the packages' parts and the planned `packages/siso-os`.
- **Before shots:** today's app at `127.0.0.1:5401`, 1440 and 390, read-only.
- **Gotcha:** `bin/shoot`'s reused camofox session kept 1440×900 for the live app at 390; a fresh session took
  390×844. `appfactory check` now fails a shot of the wrong shape.

## 7. The side nav: one App Factory icon, hubs that open their own side nav (10 Oct 05:49, idea 31)
- **What:** `@siso/side-nav` `HubNav` in Agent Base's repo, branch `app-factory/side-nav-20261010` (worktree
  `_data/worktrees/siso-internal-labs-agent-base/side-nav-hubs`): shadcn's Sidebar vendored from
  `_reference/shadcn/ui/base-nova` (MIT) as the engine, HALO's rail classes and `--crm-*` tokens as the look
  (`hub-nav.css`). The factory's side nav is data (`factory/app/hubs.ts`): root = four tools, search, his hub groups
  (05:57); UI Hub, Industries and Projects are nested levels. `factory/os/manifest.ts` became one module,
  `sidenav: "none"` because it draws its own.
- **Command:** render root `abnav` points at the worktree; `@siso/side-nav` aliases its `src/index.ts`. Before/after:
  `http://127.0.0.1:8850/sidenav.html` (shots in `.appfactory/ui/shots/{before,after}-sidenav/`).
- **Skill:** shadcn's own sidebar block (read before vendoring), camofox REST with a fresh session per width.
- **Gotchas:** `@base-ui/react` beta.4 has no `use-render`; pin 1.9.0. shadcn's phone sheet drops the Sidebar's class,
  so it came up transparent (fixed in the vendored `sidebar.tsx`: it passes class and style on). camofox keeps
  localStorage across sessions; clear `af.*` and reload for a first-visit shot. HALO's four icons could not be read
  (HALO is Cam's; names only), so the four tools are placeholders until Shaan names them.
