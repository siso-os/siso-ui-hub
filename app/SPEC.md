# UI Hub site: our own 21st.dev (spec, 8 Oct 2026)

Source of truth for the direction: ADR 0007 in siso-agent-zero and Shaan's words in the brief (`SISO_Agents/agent-zero/siso-agent-zero/jobs/ui-hub-21st/BRIEF.md`). 21st.dev's page map as read on 8 Oct: `~/SISO_Workspace/_data/ui-hub/21st/PAGE-MAP.md`.

## Stack

- `app/` is its own package (never `npm install` in the repo root): Vite + React + TypeScript + Tailwind v4 + shadcn/ui
  (new-york style, neutral/zinc base), lucide-react icons, react-router, `react-grid-layout` (MIT) for the widget board,
  cmdk (through shadcn's Command) for the K search.
- Static SPA. Production is served by `app/worker/` (Cloudflare Worker, static assets, Basic Auth, bookmarks in KV) and
  locally by `app/serve.mjs` (same routes, bookmarks written to `catalogue/bookmarks.json`).
- The data comes only from `bin/uihub export --out app/public` (written by `bin/hubindex.py`): never hand-written, never
  a second catalogue. `app/public/data` and `app/public/a` are build output and git-ignored.

## Data contract (read-only for the app)

- `GET /data/index.json`: `{generated, stats, kinds[], kind_labels{}, statuses[], groups{group:{category:count}}, items[]}`.
  Each item row: `id` (e.g. `21st:author__slug`, `arc:button`, `siso:stat-tile`, `shell:U4`, `tool:gen-image`, `res:f-…`),
  `t` title, `d` desc, `k` kind, `s` source, `c` category (`group/name`), `g` group, `a` author, `st` status
  (curated > picked > ours > rated > reviewed > indexed), `u` uses (21st installs), `p` preview image URL, `b` 1 if
  bookmarked, `sig` his signal (love, star, good, maybe, meh) on his picks, `tg` tags, `lv` 1 if a live preview exists.
  Missing keys mean empty.
- `GET /data/item/<shard>.json`: full rows keyed by id; shard = FNV-1a 32-bit of the id's UTF-8 bytes, mod 64
  (offset 0x811C9DC5, prime 0x01000193). Full row adds: `url` (origin page), `install`, `licence`, `tier`, `deps`,
  `curated{n,signal,note,targets,type,form,session}`, `pick{category,why,main}`, `score{bank,lane,why}`, `bookmark{}`,
  `docs{whenToUse,whenNotToUse,accessibility,motion,…}` (library items), `files[{file,code}]` (21st items: real
  component source for his picks, demo for all), `live` (iframe URL: our own `/a/b/<id>.html` bundle, 21st's CDN bundle,
  a library's docs page, or a siso-shell example), `video`, `preview`, `sections`, `from`, `reason`, `res_kind`.
- `GET /data/meta.json`: `{frontier[{area,lead,rank,status,why}], libraries[11], registries[425 shadcn registries],
  verticals[], fit[], surfaces[], authors[{name,items}]}`.
- `GET /api/bookmarks` → `{items:{id:{by,at,note,signal}}}`; `POST /api/bookmarks` `{id, on, note?, signal?}`. If the API
  is absent (404), keep bookmarks in localStorage and say so in the UI once. His 138 picks are bookmarks already (`b:1`).

## Look

- 21st.dev's clean shadcn look as it is: neutral zinc surfaces, 1px borders, radius 0.625rem, Inter/Geist-like sans,
  generous whitespace, cards with a 4:3-ish preview on top and a quiet footer row. Dark by default, light toggle.
- Our neon is the accent, not the base: one accent variable (`--neon`, cyan `#2de2e6`) for the active nav item, focus
  rings, the love signal and stat numbers on the home board, with a soft glow (`box-shadow: 0 0 0 1px var(--neon),
  0 0 24px -8px var(--neon)`) used sparingly. No gradients on surfaces, no emoji.
- `prefers-reduced-motion` respected.

## Side nav (21st's, flowing through and changing the whole page)

Fixed left sidebar, collapsible:
1. Brand "SISO UI Hub", then a search button showing ⌘K.
2. Primary: Home, Browse all, Bookmarks, Industries, Shells & pages, Tools, Discover, Authors, Libraries, Agents (MCP + CLI).
3. "Kinds": one row per kind with its count (Components, Sections, Motion & backgrounds, Layouts & dashboards, Pages &
   templates, Shells, Interactions, Primitives, Hooks & libs, Toys, Tools).
4. "Categories": each group as a heading (data-display, inputs, motion, marketing, navigation, …) with its categories
   and counts under it; groups fold. Clicking any row changes the main page to that filtered grid
   (`/browse/<group>/<category>`), the row highlights, the page title and counts follow.

## Pages (routes)

| Route | Page |
|---|---|
| `/` | **Home dashboard**: the draggable widget board (react-grid-layout; drag, resize, add, remove, reset; layout saved in localStorage). Widgets, each a shadcn Card reading `stats` and `meta`: total indexed (and UI items vs resources); by kind; by source (21st, the 11 libraries, siso, siso-shell, research); the funnel indexed → reviewed → rated → picked → curated ("gone through" vs "left in corpus"); top categories (bar list); his picks by signal; recent bookmarks (preview thumbs); RESEARCH's frontier (open leads by area, top leads with links); "left to find" (categories with few or no curated items). A "Widgets" sheet lists all widgets to add back. |
| `/browse`, `/browse/:group`, `/browse/:group/:category` | 21st's browse: page title + count, filter row (kind tabs; status chips All / His picks / Picked / Ours / Rated / Reviewed / Unreviewed; source select; sort: best first (status then uses), most used, A–Z), then a responsive card grid with infinite scroll (60 at a time). `?q=` filters by text. |
| `/c/:id` | **Component page**: breadcrumb (group / category); title, author (link), source badge, kind, status, licence; his note as a quote with the signal badge when he picked it; the pick's "why"; bookmark button. **Preview** panel: live iframe (`live`) with a toolbar: Preview / Image / Video, desktop / tablet / phone width, reload, open in new tab; falls back to the image when there is no live URL. Tabs: **Code** (each file with copy; library items show "installed with its line, not copied here" plus file names), **Install** (the install line with copy; `uihub show <id>` and the MCP call `take_item` with copy), **Details** (description, docs sections, deps, tags, scores, licence, origin link), then **Related** (same category, best first). |
| `/bookmarks` | His picks grouped by signal (love, star, good, maybe, meh) with his note on each card, then bookmarks made since. |
| `/industries` | One card per vertical (name, surface, projects, owner, status), the three surfaces with what fits each (`fit`). |
| `/shells` | Kinds shell, page, layout: siso-shell families with live iframes, then 21st dashboards/layouts. |
| `/tools` | Kind tool. |
| `/discover` | RESEARCH's records (kind resource) by area: awards, 3d-motion, assets, videos, image-gen, people, shells, components; each a card linking out, with its kind, licence and why. Plus the open frontier. |
| `/authors`, `/authors/:name` | Author list with counts (21st authors and the libraries); an author's page is a browse grid of their items. |
| `/libraries` | Our 11 libraries (licence, role, verdict, item counts) and the 425 shadcn registries (searchable table). |
| `/agents` | How agents use the hub: CLI (`bin/uihub find|show|stats|bookmark|export`), the MCP config snippet and its tools, the skill. Copy buttons. |

⌘K opens a Command dialog searching all items by title, category, author and tags (top 30), Enter opens the item.

## Card (grid)

Preview image (lazy; aspect 4:3; object-cover; a quiet placeholder with the kind icon when none), then title, author
(small), and a footer row: source badge, status dot or signal badge (neon for love), uses (e.g. 6.3k), bookmark toggle.
Hover lifts the border, never the layout.

## Checks before done

- `npm run build` clean; no TypeScript errors.
- `node serve.mjs` then a Playwright script (`app/scripts/smoke.mjs`, headless chromium) loads `/`, `/browse/marketing/marketing%2Fhero`
  (or the real category route), `/c/21st:jatin-yadav05__sign-in-card-2`, `/bookmarks`, `/industries`, `/agents`, and
  asserts: the home board shows the total from `stats.total`; the browse grid shows cards; the component page iframe
  loads; dragging a widget changes the saved layout; screenshots at 1440 and 390 into `app/scripts/shots/`.

## Templates, themes, shaders, gradients, ASCII art (round 5, 8 Oct)

- New data: `21st-template:*` (kind page, `pages/templates`), `21st-theme:*` (kind **theme**, `themes/shadcn`),
  `21st-shader:*` / `21st-gradient:*` / `21st-ascii:*` (kind motion, `motion/shader|gradient|ascii`) and `21st-library:*`
  (kind resource, `discover/21st-libraries`). Each has a preview `p` (`/a/x/<kind>-<id>.<ext>` locally, 21st's CDN in the
  public build), no live view, no code, no install line; `url` is the page on 21st.
- Wide cards (aspect 1.9, object-cover, lazy) for kinds page and theme and the three motion categories; a browse page
  whose rows are all wide uses a 3-column grid.
- `/templates` and `/themes`: galleries like 21st's top nav (links in the top bar next to Browse): text and author filters,
  his picks and bookmarks first, then A–Z.
- Item page for anything held only as a picture (no live, no files, no install): the image at full width where the
  iframe would be, primary action "Open on 21st" (or "Open origin"), Save, Copy prompt, the licence line; only the
  Details tab.
- Discover: the 21st-libraries area leads, its cards show their preview image.

## Round 6 (8 Oct)

- Public Agents page is read-only: no `bookmark_item` / `list_bookmarks` tools, no `uihub bookmark` / `sync` commands,
  and one line saying the public build writes nothing. The private page is unchanged.
- Phones (<1024px): Browse, Templates and Themes sit in a scrollable row under the top bar; no horizontal page scroll at 390.
- Picture-only item pages: Details inline (no tab bar), then "More like this": up to 12 wide cards from the same
  category, same author first, remixes after originals.
- Shells: `21st-template:*` rows are left out of "others"; one line links "<n> templates from 21st →" to `/templates`.
