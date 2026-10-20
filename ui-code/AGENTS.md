# siso-ui-code

**In one line:** The code of every UI part we can get for free: each shadcn registry's parts, as the JSON `npx shadcn add` installs, pulled every night on GitHub; the UI Hub reads `catalog.jsonl`. District: `Great_Library_of_SISO` (`~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code`).

| Door | |
|---|---|
| Where it sits | `~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code` · district Great_Library_of_SISO · GitHub sisodias/siso-ui-code (private) |
| Owner | not yet assigned; Agent Zero (SISO_Agents/agent-zero/siso-agent-zero) holds it |
| Run it | `bin/pull` (see its top). It runs on the mini, streaming (`tmux attach -t ui-code-pull`, log `~/ui-code-pull.log`); the `pull` workflow is off until the account's Actions billing is fixed (10 Oct: "recent account payments have failed") |
| Write here | `.agents/memory/MEMORY.md` (durable facts, one file each plus an index line) |
| Worktrees | `~/SISO_Workspace/_data/worktrees/siso-ui-code/<lane>` (never beside or inside the repo) |
| Anything outside this repo | `estate where <words>`; the map is `~/SISO_Workspace/AGENTS.md` |

- The code lives on GitHub, not on a disk (10 Oct: the laptop's and the mini's storage preflights said HOLD). Clone it sparse,
  keeping only the indexes: `git clone --filter=blob:none --sparse <url>`, then
  `git sparse-checkout set --no-cone '/*' '!/r/*/*' '/r/*/_index.json' '/r/*/_status.json'`; add `/r/<registry>/*` for one registry's code.
  `bin/pull --commit --stream` commits each registry and drops its parts from disk; git still knows what it holds.
- `registries.json` is the list of registries (from the UI Hub's meta). `r/<registry>/_index.json` is each registry's own index,
  `_status.json` what it refused (gated: paid or behind a login; missing).
- While a pull runs, read its clone with `git --no-optional-locks …` only: a plain `git status` takes the index lock.
- Private: the parts carry their authors' licences, mostly MIT, some per registry. Nothing here is republished.
- 21st.dev's parts are in sisodias/siso-component-bank; the hub's own libraries' repos are cloned under siso-ui-hub `sources/<lib>/raw/repo`.
