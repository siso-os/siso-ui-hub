# Notes for AGENT-BASE: mounting UI Hub as a SISO OS module

UI Hub (sisodias/siso-ui-hub) stays its own repo; Agent Base takes it in as a module (ADR 0007 point 6). UI-HUB builds
it; AGENT-BASE integrates it. Nothing here asks you to change UI Hub's files: if something doesn't fit, write it in
`.agents/HANDOFF.md` on UI Hub's branch or in your own handoff, and UI-HUB changes it.

## What the module is

- **The site** (`app/`): our own 21st.dev. Home dashboard of draggable stat widgets; browse with 21st's side nav; a
  component page with live preview, code and install line; bookmarks (his 138 picks plus new ones); industries; shells
  and pages; tools; discover (RESEARCH's map); authors; libraries; agents.
- **The data** (`bin/hubindex.py`): one index over everything: the 21st.dev corpus (7,988) and its
  templates, themes, shaders, gradients, ASCII art and libraries (1,514), the 11 libraries (1,182),
  his picks, the best-in-category picks, ours, siso-shell's 24 page families, tools, and RESEARCH's UI records and
  frontier (read live from the foundry checkout). The CLI, the MCP and the site all read it, so the numbers agree.
- **The CLI** (`bin/uihub`): `find`, `show`, `stats`, `bookmark`, `sync`, `export`, plus the older `brief`, `check`, `add`.
- **The MCP** (`bin/uihub-mcp`, stdio, no dependencies): `find_items`, `show_item`, `take_item`, `list_bookmarks`,
  `bookmark_item`, `hub_stats`, `brief`.
- **The skill** (`skills/uihub/SKILL.md`): how an agent picks, installs and registers UI. Project it like any other.

## How it mounts

1. Submodule: `git submodule add git@github.com:sisodias/siso-ui-hub.git modules/ui-hub` (or wherever Agent Base keeps
   modules). Pin a commit on `main` once PR "ui-hub/own-21st" is merged.
2. Local server (the Mac mini or the laptop): `cd modules/ui-hub/app && npm ci && ../bin/uihub export --out public && npm run build && node serve.mjs --port 8790 --host 127.0.0.1`.
   It serves the site on that port with SPA routes and `/api/bookmarks` backed by `catalogue/bookmarks.json` (the file
   every agent reads). Mount it in Agent Base as an iframe or a reverse-proxied route; it uses absolute paths from `/`,
   so give it its own origin or port rather than a sub-path.
3. Hosted, three ways (exact URLs in `.agents/HANDOFF.md`):
   - private: Worker `siso-ui-hub` behind Basic Auth (user `shaan`, the estate world's password). Bookmarks made there
     live in KV until `uihub sync` pulls them into the file. Deploy: `app/deploy.sh`.
   - public: Worker `siso-ui-hub-public`, no password, noindex. Built with `uihub export --public` (no HALO or other
     private item, none of his notes or bookmarks, no hosted 21st code; previews from 21st's CDN). The privacy gate
     (`uihub privacy-check`) must pass or the deploy stops. Deploy: `app/deploy.sh --public`.
   - Tailscale, no password: `http://100.66.34.21:8767`, the private build served from the Mac mini by launchd
     `com.siso.ui-hub-serve` (`serve.mjs` over a snapshot in `~/SISO_Workspace/_data/ui-hub/serve/dist`).
4. MCP for agents: `claude mcp add uihub -- python3 <path>/modules/ui-hub/bin/uihub-mcp`, or in an MCP config
   `{"mcpServers": {"uihub": {"command": "python3", "args": ["<path>/modules/ui-hub/bin/uihub-mcp"]}}}`.

## Environment

| Variable | Default | What |
|---|---|---|
| `UIHUB_ASSETS` | `~/SISO_Workspace/_data/ui-hub/21st` | previews (`harvest/<id>/preview.webp`), live bundles, demo and source TSX for the 21st corpus. Not in git (291 MB). On a new machine copy it from the Mac mini, or rebuild it from siso-ui-base `registry/21st/harvest` on the laptop. Without it the site still works; cards show no image and live previews fall back to 21st's CDN. |
| `UIHUB_FOUNDRY` | `~/SISO_Workspace/Great_Library_of_SISO/foundry` | RESEARCH's map (`research/ui/records.jsonl`, `frontier.jsonl`), read only. Absent: the Discover page and the frontier widget are empty. |
| `PORT`, `HOST` | `8790`, `127.0.0.1` | `app/serve.mjs` |
| `UIHUB_DIST` | `app/dist` | what `serve.mjs` serves |
| `UIHUB_URL`, `UIHUB_PASSWORD` | none | for `uihub sync` (pull hosted bookmarks). The password is never printed or committed. |
| `UIHUB_BY` | `cli` / `mcp` | who a bookmark is recorded as |

## Contract you can rely on

- `GET /data/index.json`, `/data/item/<0-63>.json`, `/data/meta.json` (shapes in `app/SPEC.md`), `GET/POST /api/bookmarks`.
- `bin/uihub stats --json` is the same object as `index.json`'s `stats`.
- Item ids are stable: `21st:<author>__<slug>`, `<lib>:<name>`, `siso:<name>`, `shell:U<n>`, `tool:<name>`, `res:<id>`.
