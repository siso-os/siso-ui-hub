# Who reads a block manifest — the fields other programs depend on

Owner: SOL-SCHEMA · Last verified: 2026-08-29

INTENT R5: *"write down the fields a program depends on in one place, rather than guarding only
the ones that happened to break."* This is that place. It exists because the v1→v2 migration
renamed manifest fields and **other lanes discovered it by breaking**, rather than being told.

**If you change any field listed below, update every consumer in the same change, and say so in
your callback.** A rename is not a local edit — the manifest is a contract at a seam.

---

## Consumers, measured

Found by searching for programs that open `actionist-block.json` or walk `blocks/`, then reading
each one. Not by filename, and not by grep alone — a match on `capabilityId` in an unrelated
script is not a consumer.

| Consumer | Reads | Status after v2 |
|---|---|---|
| `platform/ui/blocks/_schema/validate-block.mjs` | the whole grammar | mine; authoritative |
| `platform/ui/blocks/affine-workspace/scripts/{validate,bind}.mjs` | `schema_version`, `block_id`, `version`, `capability_id`, `reuse.*`, `authorization.*`, `lifecycle.*`, `interfaces.*`, `fixture.host`, `records.*` | migrated |
| `platform/ui/blocks/teable-data-grid/tools/teable-block.mjs` | same set plus `theme.*`, `runbook`, `verification.negative_fixtures` | migrated |
| `site/system-map/scripts/derive-state.mjs` | `block_id`, `display_name`, `reuse.shape`, `lifecycle.admission_status`, `lifecycle.admission_scope`, `lifecycle.proof_status`, `reuse.donor.immutable_revision`, donor identity | **repaired by another lane; re-verified here** |
| `research/workstreams/2026-08-29-qualify/verify-finding.mjs` | opens `blocks/teable-data-grid` | reads records, not manifest field names |

`site/system-map/scripts/{verify-state,generate-state-page}.mjs` consume `state.json`, not the
manifests directly. They inherit correctness from `derive-state.mjs`.

## Fields with more than one independent reader

R5's honest claim is that *"a consumer catches a producer's bug only where the consumer
independently derives the same fact, and that overlap is currently tiny and unplanned."* Here is
the actual overlap, so nobody overclaims it:

Counts below were **measured** by matching each field against the five consumer programs, not
estimated. My first draft of this table guessed 3/4/3/2/2 and three of the five were wrong; the
measured numbers are:

| Field | Independent readers | Cross-check exists? |
|---|---:|---|
| `lifecycle.admission_status` | 4 | **yes** — scar tissue from the round it burned us |
| `block_id` | 4 | yes |
| `lifecycle.proof_status` | 4 | yes |
| `version` | 4 | yes (validator cross-checks manifest against all 7 records) |
| `reuse.donor.immutable_revision` | 2 | partial — teable tooling + `derive-state.mjs` only |
| everything else | **1** | **no** |

Reproduce with the field/consumer match in this file's git history, or re-derive directly:
`grep -l '<field>' blocks/_schema/validate-block.mjs blocks/*/scripts/*.mjs blocks/*/tools/*.mjs site/system-map/scripts/derive-state.mjs`

**Most fields have exactly one reader.** A future migration that moves `qualification_status`,
`reuse.shape`, or `theme.scope_selector` would not be caught by any cross-check. That is a known
gap, stated rather than papered over.

## What the v2 grammar does to reduce the blast radius

- `additionalProperties: false` on the manifest root. A renamed field does not silently become an
  unknown extra field that readers ignore — it is a loud violation. The v1 schemas allowed extras
  at the root, which is part of why the rename was survivable-but-invisible.
- **The validator cross-checks the manifest against all seven records** on `block_id`, `version`
  and `capability_id`. A partial rename that updates the manifest but not the records fails.
- `schema_version` is `const` and is the **only** compatibility switch. A consumer that wants to
  support both shapes should dispatch on it rather than probing for field presence.

## Invoking `validate-block.mjs` — the argument contract

```bash
node platform/ui/blocks/_schema/validate-block.mjs affine-workspace          # bare NAME  -> resolved under platform/ui/blocks/, from any cwd
node platform/ui/blocks/_schema/validate-block.mjs ./some/dir                # PATH       -> cwd-relative, as typed
node platform/ui/blocks/_schema/validate-block.mjs platform/ui/blocks/teable-data-grid   # PATH       -> cwd-relative
```

A **bare name** is a block name and resolves against `blocks/` computed from the script's own
location, so it means the same thing whether you run it from the repo root, from `platform/ui/blocks/`, or
from `/tmp`. Anything containing a separator is a **path** and stays cwd-relative.

**Both behaviours are proven** in `research/workstreams/2026-08-29-schema/prove.mjs`
(`cwd-independence`, `ambiguity-refused`), because both were live defects:

1. **The original bug.** Bare names were cwd-relative only, so running from the repo root printed
   `no actionist-block.json` — *a confident claim about the block* — when the real fact was about
   the caller's working directory. CENA hit it and checked `ls` and `git status` before suspecting
   cwd. R8's shape: a mechanism that did not understand its input answering about the wrong subject.
   The error now names every path it looked at, the cwd, and how it resolved.

2. **The bug the fix introduced.** With bare names resolving under `blocks/`, an *invalid copy*
   sitting in the caller's cwd under a real block's name resolved to the **real block** and printed
   `PASS` — validating a different directory than the caller meant. Verified reachable before
   fixing. A bare name matching a block in both places is now **refused as AMBIGUOUS**, naming both
   candidates; pass an explicit path to disambiguate.

The second is the more dangerous of the two: the first produces a wrong *error*, the second
produces a wrong *success*.

## If you are writing a new consumer

Read `schema_version` first and dispatch on it. Derive **positively** — an allowlist of the
values that mean *yes*, never `!== 'SOME_SENTINEL'`, which fails open the moment a field moves.
Make the unmatched case loud **where you read it**, not where you total it up.
