# Actionist AFFiNE workspace block v0.2

This is a reusable, contract-first compound block: an assimilated same-document AFFiNE browser package plus its donor-native backend/data runtime. The host owns identity, tenant/workspace selection, URL space, global navigation and tokens; AFFiNE owns its contextual navigation, editor UI, workspace data, files, realtime state and migrations.

The package contains no vendored AFFiNE tree, client data or credentials. It records immutable donor pins and an adaptation patch; checkout/dependency/patch preparation is separate. Its build command requires an explicit disposable prepared donor checkout and a new output directory, runs the donor build once, rewrites asset/fetch/worker seams, and emits a host-mounted module. The backend remains a donor-native sidecar under the `knowledge` Postgres, Redis, Yjs and blob namespaces. See `build/BLOCK-BUILD.md`; the synthetic build-interface checks are not donor-build replay.

The August 29 local acceptance topology was:

```text
Actionist host session cookie
  → loopback issuer (`/api/siso/knowledge-context`, `/api/siso/revoke`)
  → same-document compiled AFFiNE module
  → donor page + nbstore worker through `/knowledge-backend`
```

The host establishes the non-secret embed contract in sessionStorage before donor assets are
evaluated. The signed context remains a runtime header/binding value; it is not in the host
URL or compiled artifact. An iframe or standalone donor service is a different shape and is
not interchangeable with this package.

## Portable package runbook

Use the existing Node runtime (verified with Node 22.22.3). No dependency installation is
needed for package operations. From this directory, or an installed release's directory:

```sh
node scripts/verify-release.mjs
node scripts/install-release.mjs --app /path/to/empty-actionist-app --host /path/to/host.json
node scripts/verify-installed.mjs --app /path/to/actionist-app
node scripts/rollback-release.mjs --app /path/to/actionist-app --to <previous-release-id>
npm test
```

For a disposable local demonstration, `fixture/host.json` is the non-secret host input; it
does not grant access to a running backend. Supply the receiving app's identity, workspace,
origins and routes for another host. Release installation stamps observability with the
verified release identity instead of retaining fixture metadata.

Release verification checks the recorded manifest digest and every payload byte. The
installer refuses an uninitialized non-empty app, preserves unrelated registry rows and
metadata, and registers the verified release under `.actionist`. It persists no credential
values or donor runtime. The installed payload can install another app from an unrelated
working directory; `tests/release.test.mjs` exercises that path after removing its disposable
source copy. `npm test` runs only the portable release suite, not source-evidence qualification.

The binding is app-specific and has a separate SHA-256 seal carried by the current pointer.
Verification and rollback check both payload and binding bytes. Older **unsealed** installs
are refused; they are not silently blessed or migrated. Preserve them and create/verify a
new disposable installation from the intended release and host input before any cutover.
These digests detect drift; they are not signatures, publisher authentication or proof of
rights. Run one installer/rollback at a time: registry and pointer updates are separate
filesystem writes, not a crash-atomic multi-file transaction.

Release-spec version denotes the package release; `actionist-block.json` denotes the
capability-contract version. Packaging-only revisions may differ without changing the
capability interface. Neither version nor a passing install grants admission.

## Source-checkout checks (not shipped as qualification machinery)

Only in the canonical source checkout, with its linked evidence available:

```sh
node scripts/validate.mjs
node scripts/bind.mjs --host fixture/host.json --out ./out
node scripts/validate.mjs --binding ./out/binding.generated.json
node scripts/install.mjs --host fixture/host.json --out ./installed
npm run test:source
```

`validate` checks the seven linked records, configuration shape, static source boundary,
evidence hashes, deterministic fixture route and admission hold. Two archived receipts were
recovered on September 5 with their original hashes, and this source check now passes. Their
historical blocked verdicts remain unchanged; availability is not admission. `bind`
refuses missing/expired/foreign/under-capable identity and origin-escaping routes. The legacy
`install.mjs` materializes contract files and a binding only; use `install-release.mjs` for
portable versioned installation. Its `--force` applies only to an explicitly disposable
output directory. npm aliases `validate:source`, `install:source` and `test:source` are
source-checkout-only; their scripts/evidence are intentionally absent from installed copies.
The old npm `install` alias was renamed to avoid an implicit installation lifecycle action.

For the browser acceptance receipt, start the real donor backend and disposable issuer, serve
the compiled module under the host's nested path, and open a fresh context at
`/w/knowledge-local-workspace/knowledge`. Prove create/edit/reload, backend restart/reload,
wrong-workspace denial, missing/revoked session denial, and donor-login absence. A static
HTTP 200 or a green package smoke is not a browser acceptance result.

## Host binding contract

The host supplies a complete identity containing `user_id`, `client_id`, `workspace_id`, expiry, and capabilities. The binding requires `view` and `edit`, requires host workspace selection authority, and rejects a second donor login route. The session assertion is represented only by a `secret-ref:...` reference in configuration. In the local same-document fixture, a disposable host cookie establishes the issuer session and the issuer returns a short-lived signed context; production use still requires an audience-bound, single-use handoff. It must never appear in a URL, iframe query, committed fixture, generated binding, or receipt.

Both the factory binding and typed host seam keep workspace/settings URLs in the host's
assigned URL space. For example:

```text
fixture: http://127.0.0.1:4100/documents
Base:    /w/<host-selected-workspace>/knowledge
donor mount option, not browser URL: /workspace/<host-selected-workspace>/all
```

Embed state is retained in sessionStorage so donor queryless memory-router navigation does
not reintroduce donor chrome. The host contributes a navigation intent, label, icon and route
reference, not a donor-owned position field. Its settings entry remains host-owned; Base
currently exposes a minimal revoke action. Base health checks issuer identity, backend
principal and GraphQL workspace read-back, not just HTTP 200. Page and nbstore worker paths
are rewritten to the nested backend prefix. Files remain donor-owned. The typed event helper
compares the host origin and expected source; this is not proof of a production message
broker. Observability carries capability, release and `traceparent` metadata.

## Evidence and holds

The historical same-document acceptance receipts are in the source workspace at
`../../actionist-base/evidence/affine-acceptance/`.
They include screenshots, DOM snapshots, browser summaries, direct missing/revoked status
probes, backend restart identity and artifact digests. The older evidence index and current
interpretation remain in `../../../../agency/industries/software/clients/actionmodel/research/workstreams/2026-08-28-affine-block/run/`; historical
receipts are referenced by relative path and SHA-256 and are not rewritten. The positive local
browser gates cover create/edit, reload/find/reopen, backend restart persistence, semantic
health, wrong-workspace host denial, revoked/missing-session denial, no donor login/chrome,
and ordered same-document cleanup. These remain historical receipts, not today's replay.

September 5 real-Chromium host-boundary receipts are separately held in the source workspace
at `../../actionist-base/evidence/host-boundary-b3q539/`. Twelve cases cover desktop/mobile/theme,
foreign identities, malformed/expired identity, missing edit, revoked issuer, wrong route and
backend-principal mismatch. **Issuer, module and backend were intercepted fixtures**; these
are host failure-boundary checks, not a current donor-native workflow or production identity.

The September 5 isolated native replay at `../../actionist-base/evidence/native-affine-slBdN0/`
adds actual editor title/body readback in a context with empty IndexedDB, then another fresh
context after all earlier contexts close and the backend restarts. Ten top-level checks pass.
Three nbstore SharedWorkers and 193 HTTP-200 responses are directly observed, with no recorded
page/console errors or external requests. Base uses a namespaced `data-actionist-theme` and a
donor text-palette root; navigation/title/body each measure 18.73:1 contrast in this light-donor,
dark-host case. It is not complete theme parity. The global “Syncing…” label is not a save receipt
or proof of a failed save. Missing context headers were not established as its cause.

That replay uses copied backend source, dedicated disposable DB/Redis/blob storage, an existing
compiled artifact whose 1,007 hashes match, and a fixture host issuer. A subsequent source→build→
native-browser replay is in `../../actionist-base/evidence/affine-build-ob0wXW/receipt.json` and
`../../actionist-base/evidence/native-affine-4Ss5nS/receipt.json`. The recorded patch applied to
copied source; bundled Yarn compiled it with existing dependencies, no external network and
scratch-only writes. All ten native checks pass on the resulting 1,007-file artifact, including
empty-IndexedDB/restart editor persistence and text contrast. No global Corepack cache, donor
checkout or historical accepted artifact was changed. The new artifact is retained only in an
ignored local cache, not this portable package. See Base's `docs/LOCAL-AFFINE.md` for the command.

September 6 current acceptance is `../../actionist-base/evidence/native-affine-PKcRTg/receipt.json`:
21 native checks pass with the packaged backend patch and repacked frontend glue. Two fixture
principals retain separate private workspaces/blobs before and after restart. Expired host
sessions are anonymous, a different host ID with the same email is refused, and revoking one
token leaves the other principal active. The unpatched failing receipt is preserved separately.
The real browser can leave AFFiNE, make a host API request with no retained signed context,
then remount and read the saved document. Base waits for prior cleanup and reruns workspace
checks when only the URL's workspace changes; its current intercepted suite has 15 cases.
The wrapper's generated consumer checks also cover async cleanup, later host fetch wrappers,
remount context and origin/path boundaries. `--reuse-dist` makes these glue changes without
recompiling or changing the recorded frontend output. The repack receipt is
`../../actionist-base/evidence/affine-repack-alHWEo/receipt.json`.

Current native-runtime holds include cross-client tenancy, realtime session switching, wrong-client/expired/
missing-capability donor-browser probes, full theme/token/settings parity, donor build/upgrade
replay from freshly installed dependencies, donor upgrade, native mobile/tenant-switcher
measurements and official CE web/service file-level provenance. Browser remount proof uses
the primary principal; the two-principal checks operate through the native API and blob routes.
Historical qualification records still say `LOCAL_SYNTHETIC_ONLY`; the newer native receipt
extends evidence without rewriting that old dossier. Qualification/admission remain
`NOT_QUALIFIED` / `NOT_ADMITTED`; no publication or client delivery is authorized by these checks.

The local donor fixture required two proven support edits outside this package: issuer session
gating/revocation in `siso/issuer.mjs`, and nested page/worker/font path rewriting plus portable
artifact normalization in `siso/package-build.mjs`. The adaptation patch also removes the
donor-local standalone bootstrap that embedded a disposable cookie literal in compiled code.
These changes are not vendored here; the current working tree carries the operator-owned
runtime edits and they must be reviewed as part of any future donor pin/rebuild.
