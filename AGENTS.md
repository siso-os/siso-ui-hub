# siso-ui-hub

**In one line:** SISO's one UI hub: the rules (ADRs), the catalogue every project takes its components from, the three kinds of surface, the verticals, and an inventory of every component in every project. Owner: UI-HUB (Opus). District: `Great_Library_of_SISO` (`~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub`).

## Before you build any UI (in any SISO project)

0. Run `bin/uihub brief <project|surface|vertical>`: the rules, what fits your surface, the picks with install lines and the swaps already decided, in one screen. `bin/uihub find <words>` and `bin/uihub show <id>` look things up.
1. Read `principles/README.md`: 15 rules, each with Shaan's words, the rule and a check.
2. Find your surface kind in `surfaces/` (dashboard, native app, landing site) and your vertical in `verticals/`.
3. Take components from the catalogue only: `catalogue/picks.json` (library picks, with install lines) and `catalogue/custom.json` (our own, with reasons). `catalogue/taxonomy.json` maps a need to its category and pick.
4. If nothing fits, build it, and register it with `bin/uihub add siso:<id> --from <path> --reason "…"` **before it ships**. That is the rule: every UI component comes from the catalogue. Mark each component file with a line `// uihub: <id>` (a pick or one of ours); `bin/uihub check <project>` fails on new component files without one.
5. Swaps already decided for your project: `catalogue/swaps.json` (also as one file per reader in `~/SISO_Workspace/_data/ui-hub/handoff/`).

## What is where

| Path | What |
|---|---|
| `principles/` | ADRs 0001–0015 + `quotes.jsonl` (Shaan's words, dated) |
| `catalogue/` | `picks.json` · `custom.json` · `swaps.json` · `taxonomy.json` · `curated/` (Shaan's 138 picks with notes, board, presets; copied in from siso-ui-base, where they were never committed) |
| `surfaces/` · `verticals/` | the three surface kinds, `fit.json` (which catalogue items suit which surface, and why); one JSON per vertical (stubs until their owners fill them) |
| `inventory/` | `<project>.jsonl`: every component with file, pages, source, grade, swap target; `summary.json`; census JSON per project (HALO CRM stays out of git) |
| `sources/` | the 11 libraries: `libraries.json`, `items.jsonl` (1,182 items), `items.cat.jsonl`, `code-facts.jsonl`; raw fetches stay on disk (ignored) |
| `round1/` | the round-1 page: chapter HTML, `build-page --post`, `make-projects-chapter` |
| `legacy/siso-ui-base/` | siso-ui-base's committed files, with history (subtree) |
| `_reference/shadcn/` | shadcn's ui/charts/blocks snapshot (MIT), used by `bin/fingerprint` |

## Tools (`bin/`, no model, no network unless noted)

- `bin/uihub brief|find|show|check|add`: the hub from a shell (see step 0 and 4 above; `bin/uihub --help`). `check` also takes `--repo DIR --base SHA --ref REF --prefix src/` for a project with no inventory yet. `uihub check <url> [--surface dashboard|native-app|landing-site|doc] [--width 390] [--wait 8]` checks a rendered page against the rules a script can see (`bin/pagecheck.js` in a camofox tab, one screenshot; exit 1 on a failure).
- `bin/census <project> <repo> <ref> <prefix> [--alias @=dir] [--pages RX] [--names-only]`: every component at a git ref, read from git without a checkout; imports followed by name through index files. Command lines per project: `inventory/README.md`.
- `bin/fingerprint <project>...`: where each component came from (MinHash against 5,940 references).
- `bin/inventory`: joins census, fingerprints, AB-MAP grades and picks into `inventory/*.jsonl` and `summary.json`.
- `bin/peek <project> <Name>... [--lines N]`: facts and a trimmed look at components.
- `bin/handoff`: writes the per-reader swap files from `catalogue/swaps.json`.
- `bin/build-items`, `bin/categorise`, `bin/code-facts`: library items, taxonomy, code facts. `bin/shoot`, `bin/sheet`: headless screenshots through camofox (network; one tab, closes it).

## Rules for this repo

- HALO CRM is Cam's: record names and usage only, never read its code, and keep its census out of git.
- Respect licences: install only what a licence allows (Arc Pro, Kobra, Kinetics are reference only).
- Nothing is deleted: move it under `_archive/`.
