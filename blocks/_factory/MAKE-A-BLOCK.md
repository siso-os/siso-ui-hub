# MAKE-A-BLOCK — the factory procedure

This is the whole-workspace adaptation procedure developed through AFFiNE, not a
universal converter or permission to execute an arbitrary donor. Its same-document
mount is one supported shape; an intact service or extracted component has different
obligations. Native AFFiNE evidence remains scoped to its recorded host and fixtures.

## Step 0 — Decide the bounded capability and reuse shape

Start with `FW-REUSE-SHAPE-SELECTION` and the [sourced-decision runbook](SOURCED-DECISIONS.md).
Record the outcome, state owner, candidate shapes, rejected alternatives, maintenance
model and exact source evidence before adaptation. The scaffold deliberately starts
held; it must not choose native absorption on the worker's behalf. Structural checks
alone do not resolve evidence references. Use the source-backed worker packet for a
sealed, read-only check; preserve its HOLDs and separate semantic review/authority.
Do not apply the workspace-specific steps below to a different shape by default.

## Step 1 — Pin

Resolve and record the immutable source SHA. Reuse an existing owned source first.
Fork or clone only when the selected shape needs it and the current task authorizes
that action; preparing a planning packet does not. All adaptation addresses the pin.

```
CHECK: git rev-parse HEAD matches the recorded pin.
```

## Step 2 — Find the engine/app boundary

Read every `package.json` license field (never a badge). Donors split permissive-engine /
protected-app (Teable: packages MIT vs apps AGPL; AFFiNE: BlockSuite MIT vs app). Decide the
cut from the explicit outcome and source boundaries: whole-app assimilation or an
engine/component extraction are alternatives, not a scaffold default.

```
CHECK: per-package licence table written into the block dir.
```

## Step 2b — Establish the auth topology (mandatory)

Before adapting donor UI, draw and name the complete path:

```text
host session → host issuer → donor session/context → donor page API
                                             └── donor worker/realtime API
```

Record which side owns the browser session cookie, which endpoint establishes the donor
session, how the adapter reads back principal/workspace/expiry/capabilities, and how the
host revokes it. A context token is a runtime value only: it is never put in a URL, query,
fixture, generated binding, screenshot, or committed artifact. Same-document packages need
an explicit pre-evaluation establishment seam (for example, sessionStorage plus a host
request bridge); an iframe may use a frame handoff; a service block must use its own API
session. Do not collapse these shapes into one URL recipe.

Required negative probes are missing session, revoked session, expired context, wrong client,
wrong workspace, and missing capability. The donor login route must be unreachable from the
host in every terminal state. The read-back must be semantic, not merely `HTTP 200`: compare
the returned principal and workspace to the host context and require the requested capability.

```
CHECK: an auth-topology/session-establishment record exists; valid read-back and every
negative probe have repeatable receipts before browser acceptance is called PASS.
```

## Step 3 — The bridge module (donor-side, minimal and explicit)

Create the smallest donor-side bridge needed to expose one authoritative embed contract:

```ts
export function getSisoEmbedConfig(): { embedded: boolean; hostOrigin: string | null; ... }
```

Read explicit URL state once, persist only non-secret embed configuration in sessionStorage,
and make queryless same-document navigation retain that state. Everything host-related imports
from this bridge. If package boundaries prevent a shared import, add a tiny leaf helper and
record the exception; do not copy the full host adapter into donor components. Iframe and
service shapes keep their own handoff/API bridge and must not inherit this same-document
storage rule without proof.

## Step 4 — Guard the chrome (never delete)

For each piece of donor chrome the host replaces — login, settings dialog, workspace switcher,
download nags, open-in-app pages, share menus, branding:

```ts
import { getSisoEmbedConfig } from '../siso-bridge';
if (getSisoEmbedConfig().embedded) return null;   // in render
if (embedded) return;                              // in effects that open dialogs
```

Additive only. Donor still runs vanilla when not embedded. Every divergence greppable via
one symbol. AFFiNE needed 20 chrome/bridge files in this run; expect 10-25 for a workspace donor.
The reproducible patch is 21 files because it also removes a donor-local standalone bootstrap
and ships the leaf helper required by the component package boundary.

```
CHECK: the guard inventory names every bridge consumer and donor still builds.
```

## Step 4b — Chrome inventory (mechanical, not memorial)

The guard list must come from a SWEEP, never from "what we noticed." The 2026-08-29 miss:
20 guards covered the workspace chrome, but the 404/error path still showed the donor's
marketing nav, download button and sign-in — because BYK always ran with a backend and
nobody ever rendered the error path embedded.

Grep the donor for chrome signatures — every hit is guard-or-justify:

```
downloadUrl | download-app | pricing | upgrade | plan | billing
sign-in | signIn | login | auth/ | onboarding | survey
official website | blog | contact | changelog | what's new
telemetry | analytics | mixpanel | posthog | sentry
BUILD_CONFIG.<marketing fields> | open('https://<donor-domain>
```

Then render EVERY terminal state embedded, not just the happy path:
error/404 page · unauthenticated fallback · empty workspace · offline banner ·
update-available prompt. Chrome hides on the paths you didn't walk.

```
CHECK: sweep hit-list written into the block dir with guard/justify per hit;
embedded screenshots exist for each terminal state, showing zero donor chrome.
```

## Step 5 — Commit guards as a patch series

```
git diff > patches/0001-embed-guards.patch     (in the BLOCK dir, not the donor)
CHECK: patch applies clean to a fresh worktree at the exact build checkout, with the recorded
repo/subproject root layout; every added helper is included in the patch. If an adaptation pin
and the build checkout differ, record both and prove the patch against the build checkout.
A patch that only applies to an already-dirty donor is a FAIL. PROVEN for AFFiNE.
```

## Step 6 — Donor build, then artifact rewrite

Build with the donor's own toolchain. Then post-process `dist/` — never donor source — for
the five page-ownership seams:

| Seam | Rewrite |
|---|---|
| asset base | bundler runtime `publicPath` → `globalThis.__<BLOCK>_ASSET_BASE__` fallback `document.currentScript.src` |
| lazy chunks | chunk/css URL joins re-resolved against that base |
| page fetch | wrap `window.fetch`: donor's `/api` + `/graphql` → host backend prefix + identity header + credentials |
| **workers** | workers have their own global — inject a prelude into each `*.worker.js` rewriting its backend base. A page-only bridge silently kills realtime. |
| root-relative css/html | strip leading `/` |

```
CHECK: rewrite script reports non-zero patches for every seam the donor has, and ZERO
"pattern not found" silent skips — a rewrite that matched nothing is a FAIL, not a pass.
```

After rewriting, exercise semantic health through the actual host binding. Health must prove
the configured donor backend is reachable, the authenticated principal and workspace read
back match the issuer identity, and the page and worker use the configured nested backend
prefix. A successful static asset load is not health. The final artifact scan must also find
zero credential/cookie literals and zero checkout-specific absolute paths (source maps count).

## Step 7 — Emit the module and own cleanup

Wrap dist in an entry exporting `preload(host)` / `mount(target, host)` / `unmount()`,
plus `package-manifest.json` with per-file sha256. Host contract is exactly three injections:

```ts
{ identity: SignedIdentity;  // fail-closed: client/workspace/expiry/capabilities
  database: DataAuthority;   // own postgres schema, own redis namespace, own blobs
  tokens: Record<string,string> }  // host owns theme
```

The host owns the mount target. Cleanup ownership is ordered: call/await the donor unmount,
then clear the host target and only then revoke or discard the donor session. Do not let a
parent remove a React/DOM subtree before the donor unmount runs; this is a real failure mode,
not a style preference. The SDK and adapter must test both successful and throwing unmounts.

## Step 8 — Backend (workspace donors)

Run the donor's own backend under the block's namespace. Do not reimplement it.
The backend must enforce the same session/workspace/capability boundary as the browser adapter;
the host route check is not a substitute for backend denial. Record the exact loopback/service
commands, namespace owner, migration owner, socket/realtime path, and restart procedure.

## Step 9 — Browser acceptance and evidence (mandatory)

Run from a clean browser context against the real host, issuer, donor backend, and persisted
data. Unit tests, an HTTP 200, or a URL that looks right do not satisfy this gate.

1. renders at a non-root host path and mounts into a host-owned div (no iframe/self-mount for
   `same_document`; use the declared topology for other shapes);
2. valid auth establishes/read-backs the expected user, workspace and capabilities;
3. create/edit/save, reload/find/reopen, backend restart, and reload/find/reopen again pass for
   a uniquely named record;
4. page, worker and realtime requests use the declared backend path; zero lazy-chunk/font/API
   failures and zero unhandled console errors in the positive run;
5. no donor login, marketing, download, workspace switcher, or donor settings entry is
   presented from the host route, including error/denied/unavailable states;
6. wrong workspace, missing/revoked session, expired context, wrong client, and missing
   capability fail closed, with no donor fallback login;
7. cleanup/remount has an ordered receipt proving donor unmount completed before host DOM
   clearing and session revocation.

Every gate gets a concise machine-readable receipt plus redacted console/network summary,
DOM snapshot and screenshot where visual state matters. Receipts include exact commands,
browser/context name, service PIDs or restart identity when relevant, artifact file digests,
and the verdict. Never store tokens, cookies, signed assertions, credential files or their
raw headers in evidence. A block is `PASS` only for observed gates; all other gates remain
`NOT_RUN`/`HELD` and keep the block out of admission.

A block ships with these five as recorded pass/fail. Partial is fine if stated.

## Compound assimilation rule

When a donor UI is compiled into the host but its backend, migrations,
realtime and files remain donor-owned, record one compound block rather than
pretending it is either a pure package or a pure service. Use
`reuse.shape: assimilated_package` and `mount_topology: same_document`, and
link immutable frontend and backend pins in `PackagingProfile`. The host owns
the mount, identity, route, tokens and global navigation. The donor-native
backend owns its schema, migrations, realtime namespace and blobs. Ship the
deterministic patch/build/artifact-rewrite recipe without vendoring a second
donor tree.

This rule is reusable for any donor with the same seams, not AFFiNE-specific.
The minimum receipt also proves backend ownership and restart persistence. A
generic `database` input is a runtime binding descriptor; it must not silently
imply host ownership of donor tables.

## Gotchas proven on the 2026-08-29 AFFiNE rebuild (each cost a debug loop)

- **CDN prefix**: a donor's prod build may hardcode an asset CDN (`https://dev.affineassets.com/`
  in html-plugin.ts). Strip it in the artifact pass or every asset 404s. Check `index.html`
  for absolute asset origins FIRST.
- **charset**: serve chunks as `text/javascript; charset=utf-8`. A minified vendor bundle with
  non-ASCII bytes under a charset-less content-type throws `SyntaxError: Invalid or unexpected
  token` at line 2 with no useful trace.
- **multiple webpack runtimes**: `runtime.*.js` AND `index.*.js` each carry their own
  `publicPath`. Patch both, and set BOTH globals in the host page — a single-global rewrite
  produced `/js/js/` double-prefix ChunkLoadErrors.
- **fallback trap**: `document.currentScript.src` fallback resolves to the `js/` subdir, then
  `+ "js/..."` doubles it. The explicit global must win; the fallback is last-resort only.

## Known-donor notes

- webpack/rspack: `h.p=` in `runtime.*.js` — AFFiNE pattern above works verbatim
- vite: `import.meta.url`-relative — seam 1 usually free, check `base` config
- Next.js (Documenso, Chatwoot ui): `assetPrefix` + `basePath` are first-class config — steps 6a/6b may be pure config
- Rails+Vue (Chatwoot): no SPA assimilation — this factory targets SPA donors; service donors keep the BYK service contract
