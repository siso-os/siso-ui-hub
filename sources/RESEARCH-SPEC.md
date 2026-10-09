# UI-HUB library research spec (one agent per library)

You research ONE open-source UI library for UI-HUB, the owner of SISO's one UI system. UI-HUB judges and decides; you collect complete, honest evidence it can trust without re-checking. Shaan wants every component mapped, its code understood, and its licence recorded, so the best ones can be "robbed out of the box" into SISO's functional UI (dashboards, operator tools, a CRM, agent apps).

## Where you write
- Research output: `~/SISO_Workspace/_data/ui-hub/sources/<slug>/` (only here).
- Source clone: `~/SISO_Workspace/_reference/ui-libs/<slug>/` (other people's code: read it, never edit it).
- Keep `~/SISO_Workspace/_data/ui-hub/sources/<slug>/STATUS` as one line, rewritten at each step (e.g. `3/6 code reading 40 of 110`).

## Steps
1. **Sitemap.** Fetch `/sitemap.xml` and `/robots.txt` with `curl -sL -A "Mozilla/5.0"`. Cross-check against the site's own navigation (read the HTML nav, or a camofox snapshot; see Tools). Every page goes in `pages.jsonl`: components, blocks, templates, docs, landing, pricing, blog. Note Free vs Pro/paid per item.
2. **Screenshots of every page.** Build a TSV of `URL<TAB>name` (name = the URL path slugified, e.g. `components-timeline`; homepage = `home`) and run it through the shared shooter:
   `~/SISO_Workspace/_data/ui-hub/bin/shoot ~/SISO_Workspace/_data/ui-hub/sources/<slug>/shots < pages.tsv`
   It prints `ok|skip|fail<TAB>name<TAB>url` per page, rate-limits itself across all agents (max 3 pages rendering at once), closes its tabs, and skips names already shot, so re-running is safe. Run it in batches of about 40 in the background if you like. If a component's demo sits below the fold, add a third column with a scroll offset in px and a distinct name (e.g. `components-timeline--demo`). Look at a sample of shots yourself (Read the .jpg) to judge craft; at minimum every component you mark `standout`.
3. **Source and licence.** Find the repo (site header/footer, GitHub search with `gh search repos`, npm). Record the LICENSE (SPDX), who holds it, and what it permits. Check for a shadcn registry (`/r/registry.json`, `/registry.json`, `/r/<name>.json`, a namespace like `@uiarc`), an npm package, `/llms.txt`, `/llms-full.txt`, "View as Markdown", an MCP server. Free vs Pro matters: never record a Pro/paid component as robbable.
   - No repo and no licence = all rights reserved: `permits_copy: "no"`, reference only. Still map and describe it from the public page and its shipped JS/CSS if readable.
4. **Clone shallow, never fat.** Check size first: `gh api repos/OWNER/REPO --jq .size` (KB). Under 300000 KB: `git clone --depth 1 --single-branch <url> ~/SISO_Workspace/_reference/ui-libs/<slug>`. Larger: `git clone --depth 1 --filter=blob:none --sparse <url> <dir>` then `git -C <dir> sparse-checkout set <component dirs>`. Never `npm install`, never build, never pull node_modules. Your whole footprint (clone + shots) stays under 300 MB; the disk has ~7 GB free.
5. **Read the code of every component.** From the clone, or the registry JSON (`curl` the `/r/<name>.json` item: its `files[].content` is the source). For each one record deps, size, the mechanism (how it actually works), its API, motion and accessibility. If the library is huge (over 120 items): every component still gets a row with name, url, category, access, install and summary, and you deep-read at least the 25 most useful for functional UI plus everything AI/agent/loading/status-related.
6. **Report.** Write `library.json`, `components.jsonl` and `REPORT.md` (formats below). Then reply to UI-HUB in 15 lines or fewer: counts, licence verdict, top 5 standouts with one reason each, anything blocked, and your paths.

## Categories (use these slugs; `other:<slug>` only when nothing fits)
- `actions`: button, icon-button, button-group, toggle, switch, segmented-control, copy-button
- `inputs`: text-field, textarea, search, select, combobox, tag-input, checkbox, radio, slider, number-input, date-picker, time-picker, date-range, color-picker, file-upload, otp-input, rating, form-field, rich-editor
- `navigation`: breadcrumb, tabs, sidebar, top-nav, menu, command-palette, pagination, wizard-steps, dock, table-of-contents
- `overlays`: dialog, sheet, popover, tooltip, hover-card, context-menu, toast, alert-banner, lightbox
- `data-display`: table, list, card, stat, badge, avatar, timeline, tree, accordion, calendar, kanban, code-block, json-viewer, diff, comment-thread, chat-thread, property-list, empty-state
- `data-viz`: chart, sparkline, progress-bar, gauge, meter, heatmap, map
- `status`: spinner, skeleton, loader, status-dot, notification-center, error-state, success-state
- `ai-agent`: chat-message, prompt-composer, thinking, tool-call, agent-card, streaming-text, model-picker, voice-visualizer
- `motion`: text-effect, number-ticker, reveal, marquee, background, cursor, hover-effect, transition, tilt-3d
- `layout`: page-shell, dashboard-layout, bento-grid, split-pane, settings-page, section, masonry, scroll-area
- `media`: image-compare, carousel, gallery, card-stack, video-player, audio-player
- `flows`: auth, onboarding, checkout, settings-transfer, multi-step-form, share-invite, file-manager
- `marketing`: hero, features, pricing, testimonials, logos, faq, cta, footer
- `toys`: novelty widgets (still record them; some are delightful)

## Scores (1 to 5, honest; 3 = fine, 5 = best you have seen)
- `craft`: feel and polish (spring physics, layout animation, timing, detail).
- `function_fit`: use in SISO's functional UI. 5 = a dashboard/operator/CRM/agent app would use it weekly.
- `code`: dependency weight, accessibility (roles, aria, keyboard), typed API, controlled/uncontrolled support.
- `adapt`: how easily it takes our tokens (CSS variables or Tailwind theme tokens = easy; hard-coded hex = hard).

`verdict`: `rob` (take as-is; best in class), `adapt` (take and restyle), `reference` (learn from it, don't take), `skip`. Only `rob` or `adapt` if the licence permits copying and it is free.

## File formats
`library.json`:
```json
{"slug":"","name":"","url":"","tagline":"","author":"","author_x":"","source":{"type":"github|registry|npm|none","repo":"","stars":0,"last_commit":"","install":"","registry":"","llms_txt":""},
 "licence":{"spdx":"","holder":"","file":"","permits_copy":"yes|attribution|no|unclear","notes":""},
 "stack":{"framework":"","styling":"","motion":"","primitives":"","icons":""},
 "counts":{"pages":0,"components":0,"blocks":0,"free":0,"pro":0},
 "doc_sections":["the headings each component page has, in order"],
 "ai_facing":"llms.txt / Notes for AI / markdown export / MCP, or none",
 "clone":{"path":"","mb":0},"shots":{"ok":0,"fail":0},"crawled_at":"ISO time","notes":""}
```
`pages.jsonl`, one line per page:
```json
{"url":"","path":"","title":"","kind":"component|block|template|doc|landing|pricing|blog|other","group":"","category":"","access":"free|pro|unknown","shot":"shots/<name>.jpg","shot_status":"ok|fail"}
```
`components.jsonl`, one line per component or block:
```json
{"id":"<slug>:<name>","name":"","url":"","group":"","category":"","access":"free|pro|unknown","summary":"one line","what_for":"","when_to_use":"","when_not":"",
 "install":"exact command or copy path","registry_url":"","source_path":"path in clone","deps":[],"loc":0,
 "how_it_works":"the mechanism in 1-3 sentences","api":["prop: type, meaning"],"motion":"what animates and how","reduced_motion":true,
 "a11y":"","tokenisable":"css-vars|tailwind-tokens|hard-coded|mixed",
 "scores":{"craft":0,"function_fit":0,"code":0,"adapt":0},"verdict":"rob|adapt|reference|skip","why":"one line","standout":false,"shot":"shots/<name>.jpg"}
```
`REPORT.md` (one page): what the library is and its stack; licence verdict and Free/Pro split; what it is best at; top standouts (10 or fewer, each with a reason and its shot file); the categories where it probably overlaps other libraries; how its docs are structured (UI-HUB will design SISO's component docs from the best structure); red flags.

## Tools and hard lines
- Fetch with `curl`. For anything needing a browser use camofox (headless, `http://localhost:9377`, see `~/.claude/skills/camofox/SKILL.md`): `userId` `uihub-<slug>`, any `sessionKey`, ONE tab at a time, closed when done. Prefer the `shoot` script for screenshots.
- Never: Playwright, `open`, or anything that shows a window on Shaan's screen; signing in, buying, or any account action; `rm -rf`, `--force`, symlinks, `git checkout --`; `npm install`; editing a clone; printing secrets; reading Claude or Codex session transcripts; writing outside your two folders (temp files in /tmp are fine).
- Respect the site: sequential requests, no hammering, no paywall bypass.
- Be truthful: an unknown is `""` or `null` with a note, never a guess. A field you did not verify is marked unverified in `notes`.
