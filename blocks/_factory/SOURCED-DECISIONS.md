# Sourced reuse decisions — bounded worker runbook

This is a private implementation companion to `FW-REUSE-SHAPE-SELECTION` and evidence
qualification. It does not create a second framework registry or an autonomous launcher.
The existing registry remains authoritative; its maturity is unchanged by this contribution.

## Inputs

Read `.agents/PAGE.md`, `.agents/repos.json`, `knowledge/frameworks/README.md`, the selected
framework record, and the current owner handoff. Use an explicit v1 reuse-decision packet (or a
PackagingProfile containing `shape_decision`), a source lock and explicit local repository mappings.
No provider credentials, network calls or dependency installation are required.

Each source-lock entry binds an exact evidence-reference string to a Git file:

```json
{
  "schema_version": "actionist.source-lock.v1",
  "sources": [{
    "id": "evidence:host-contract",
    "repository": "OWNER/REPOSITORY",
    "revision": "REPLACE_WITH_VERIFIED_40_CHARACTER_COMMIT",
    "path": "path/to/evidence.json",
    "blob_sha": "REPLACE_WITH_VERIFIED_40_CHARACTER_GIT_BLOB_SHA",
    "evidence_class": "observed"
  }]
}
```

This example is deliberately invalid until real immutable values are supplied. Do not replace
placeholders with invented hashes or assert that a file's existence establishes its claim.
`evidence_class` is the classification of the assertion carried by the evidence, not a label
inferred from file extension. `observed` and `inferred` can support planning; unknown, hypothetical
or rejected evidence cannot clear this gate. Inference remains inference in the receipt.

All seven input dimensions need a substantive summary. Known and not-applicable decisions need
references, as do rejected alternatives. `not_applicable` is not a shortcut around evidence.
A source lock is an input evidence manifest, not a trusted signer or an admission record.

## Commands and effects

```sh
# Structural-only historical compatibility check; reference strings are NOT resolved here.
node blocks/_factory/reuse-decision.mjs --input /path/to/decision.json

# Offline source-integrity check in addition to the structural gate.
node blocks/_factory/verify-sourced-decision.mjs \
  --input /path/to/decision.json \
  --sources /path/to/source-lock.json \
  --repo OWNER/REPOSITORY=/path/to/complete/local/checkout

# Synthetic regression fixtures create and remove their own temporary Git repository.
node --test blocks/_factory/verify-sourced-decision.test.mjs blocks/_scaffold/new-block.reramp.test.mjs
```

The first two commands are read-only and print a receipt. The tests write only temporary
fixtures. The scaffold is a separate write command: use it only with an authorized destination;
its new output is incomplete and held, not a working block.

## Prepare a worker packet from actual project evidence

The existing framework route now seals a supplied decision and source lock:

```sh
node knowledge/scripts/framework-task.mjs \
  --framework FW-REUSE-SHAPE-SELECTION \
  --method verify-sourced-reuse-decision \
  --block actionist/teable-data-grid \
  --input repo_root="$PWD" \
  --input decision_file=knowledge/frameworks/examples/teable-held-decision.json \
  --input source_lock_file=knowledge/frameworks/examples/teable-source-lock.json
```

Run this from the Action Model root. Preparation prints the packet and **does not
execute its command or decide whether the proposal passes**. Inspect its read hashes,
identity, exact argv, effects and stop contract before an authorized execution. The
command includes `--expect-input-sha256` and `--expect-sources-sha256`; changed input
bytes fail before parsing/evaluation. Both flags must be supplied together. Omitting
both preserves the direct CLI's unsealed, caller-selected-input compatibility mode.

The example uses five real, immutable project records, with their interpretation
labelled `inferred`. Its expected result is source integrity verified but **HOLD**
for rights, tenancy and lifecycle ambiguity. That is a successful reproduction of
missing evidence, not a qualified Teable block, newly selected client workflow or
permission to run the donor. The source lock binds package records, not donor bytes.
The synthetic support-inbox fixture in the regression suite separately exercises a
planning-only positive result; it is not a second accepted product.

The packet method accepts a valid namespace/name matching the supplied decision.
It no longer borrows AFFiNE's identity or release. Inputs must be regular JSON files
inside this project (no symlinks, traversal or inputs over two MiB); arbitrary extra
inputs are refused. This first method maps only `sisodias/actionmodel-private` to
the current checkout. Other repositories or missing objects remain explicit gaps;
the direct CLI supports separately authorized explicit mappings. Neither route
authenticates repository ownership from an alias.

The checker accepts repeated `--repo` mappings for different repositories. It never guesses
missing mappings or fetches missing objects. Only regular Git files at full commit IDs are read;
symlinks/submodules are refused, paths must be normalized, reads are bounded to two MiB, and Git
replacement objects, shell execution and lazy fetch are disabled. Source working trees are not
read as evidence. Explicit aliases do not authenticate a remote: the receipt says NOT_TESTED.

## Return and stop conditions

Exit 0 means **selected for planning with source integrity verified against local Git objects**.
Exit 1 means HOLD or REJECT; inspect structural holds and `source_problems`. Exit 2 means invalid
arguments, source-lock grammar or unreadable input. Every result retains NOT_QUALIFIED,
NOT_ADMITTED, NOT_RELEASED and implementation_authorized=false. Semantic review remains REQUIRED.
Neither the packet's named decision-authority string nor a content hash proves human authorization.

Return the deterministic receipt, exact source bindings, failed gates, next bounded check and
remaining semantic questions. Do not return source file contents, client messages or credentials.
Stop on missing evidence, conflicting capability identity, unsupported reuse/rights crosswalk,
unknown authority, or any requested operation outside the packet. Do not weaken a HOLD merely
to obtain a green result. Fixture-only source locks and historical receipts must remain labelled.

## Recovery provenance and scope

The structural gate, its schema/crosswalk, accepted synthetic fixture and held scaffold are exact
blobs from private branch `am/framework-sol-b930c54-20260830` at
`52d77fc1e55e11dc400f9dd68c5d689285cb236f`. Their checksums are in the test receipt.
This contribution adds an offline verification wrapper and independent focused regressions; it
does not claim the original whole-branch test suite, FR-03 intake, semantic-validator changes,
three-candidate runtime composition or production admission are integrated. The extracted-package
counterexample deliberately stays held at the rights vocabulary seam; it is not a qualified second shape.
