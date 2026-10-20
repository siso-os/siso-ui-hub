# AFFiNE block — the transform

```
adaptation base 837a5c285 (frontend-upstream/pinned; historical source tree)
build checkout d1dca9fcfaf4395900aa0f37fc3cdd4435bf8ee9 (the verified package tree has `frontend/`)
  → apply patches/0001-embed-guards.patch     (21 files: chrome/bridge set + bootstrap removal + leaf helper)
  → prepare existing dependencies in a disposable donor checkout
  → node /path/to/block/build/package-build.mjs --donor /path/to/disposable-donor --out /path/to/new-artifact
       (runs donor build once, then rewrites chunk/fetch/worker/mount seams)
  → /path/to/new-artifact/siso-knowledge-module.js (module + per-file sha manifest)
```

Run the patch from the donor's `frontend/` subproject root (or pass
`--directory=frontend` from the donor repository root). The build command accepts explicit
donor/output paths and works from an unrelated cwd; it no longer guesses a `frontend/` inside
the block package. Use a disposable prepared checkout, never the shared donor/client launcher.
Existing donor `web/dist`, existing output (including dangling symlinks), escaping frontend
symlinks, and output inside the donor are refused before compilation. The output parent must
already exist. Corepack network acquisition is disabled; dependency preparation is separate.
When the prepared donor includes its pinned Yarn file, append
`--yarn /path/to/disposable-donor/frontend/.yarn/releases/yarn-4.13.0.cjs` to execute that
contained file directly. This avoids Corepack cache acquisition; no shared/global cache write
is required. Paths outside the donor frontend (including escaping symlinks) are refused.
The command preserves the compiler's original output and never deletes an old artifact.
Failed output is retained for inspection; use a new disposable checkout/output for another run.
For changes confined to the packaging glue, `--reuse-dist` copies and transforms an existing
recorded `web/dist` into a new output. It does not invoke the compiler or modify the source
dist; the generated manifest records `compilerExecuted: false`. Preserve the source build
receipt and use its original build root so source-map path normalization remains valid.
The patch must apply to a clean checkout at the pin, including the added
leaf embed helper. The build must prove all observed seams: nested asset/font paths, page
fetch, worker API/GraphQL/socket paths, and the host mount/unmount wrapper. A static build
success without a browser receipt is incomplete.

The local fixture also requires the donor issuer to gate `/api/auth/session` and
`/api/siso/knowledge-context` on the host session cookie and expose `POST /api/siso/revoke`.
Missing and revoked cookies must return 401. Do not copy the disposable cookie or signed
context into this package.

Host mounts with: `mount(targetDiv, {identity, database, tokens})`. The `database` value is a runtime binding to the donor-owned `knowledge` Postgres/Redis/blob resources; it is not a generic table adapter. No iframe.

The returned cleanup is asynchronous and idempotent. Await it before another mount; a failed
donor cleanup requires a page reload. The generated bridge clears its signed context and
restores host fetch ownership, while the function captured by AFFiNE can use a new context on
remount. Overlapping active mounts are refused. Context headers match the configured backend's
exact origin and path boundary; adjacent paths and lookalike domains do not receive them.

The native backend also requires `patches/0002-host-session-isolation.patch`: reject expired
host-session payloads and refuse a different host user ID that collides with an existing email.
Apply it to a disposable backend copy. From a donor Git root, use `git apply --check
--directory=backend /path/to/block/patches/0002-host-session-isolation.patch`, then the same
command without `--check`. Base's native verifier applies it only to its own copy through
`--backend-patch`; the shared donor checkout remains unchanged.

Status: patch-apply PROVEN on a clean donor checkout (2026-08-29). Build + render, create/edit,
reload/find/reopen, backend restart persistence, wrong-workspace denial, revoke denial and
ordered cleanup are proven in `actionist-base/evidence/affine-acceptance/`. September 5 native
replay additionally traces SharedWorker polling and verifies fresh-context editor persistence.
The nine `tests/build.test.mjs` cases prove this build command's path/preservation interface,
generated bridge consumers, failure cleanup and remount behavior
with a synthetic compiler, not donor-build success. The subsequent real build receipt is
`actionist-base/evidence/affine-build-ob0wXW/receipt.json`: copied donor HEAD
`a4a069626c9fd1fa0d2a88cd3fd12fb2b408ec1c`, recorded patch, existing dependencies and bundled Yarn,
network-denied/scratch-only execution. Its new artifact passes the ten-check native browser
workflow in `actionist-base/evidence/native-affine-4Ss5nS/receipt.json`. This is not a fresh
dependency/bootstrap installation, donor upgrade, release/admission or replacement of the
historical accepted-artifact pin. Compiler asset-size warnings remain recorded.

September 6 packaging reuses that compiler output. `actionist-base/evidence/affine-repack-alHWEo/receipt.json`
records the repack and `actionist-base/evidence/native-affine-PKcRTg/receipt.json` passes 21
checks with the backend patch: two-principal workspace/blob isolation, expiry/collision
refusal, per-token revocation, restart persistence and a real primary-user browser remount.
The old unpatched failures are retained at `actionist-base/evidence/native-affine-lQPCBy/`.
