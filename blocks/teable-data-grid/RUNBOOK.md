# Teable data-grid block runbook

This runbook installs a binding seam for another host project. It does not
clone, execute, deploy or admit Teable. The host operator supplies the donor
runtime separately and keeps the donor runtime/source owner explicit.

## 1. Copy the package and validate it

Place `blocks/teable-data-grid/` in the host’s block registry, preserving its
relative paths. Run:

```bash
node tools/teable-block.mjs validate
```

The command must report valid JSON for the manifest, all seven records, the
configuration schema, port schemas, host-binding schema, fixture and theme
scope. A failed link, absolute filesystem path, secret-looking field/value,
global `:root` donor-variable write or admission claim is a hard failure.

## 2. Register the donor runtime without copying it

Configure the host to reference a separately managed Teable runtime at the
immutable revision in `actionist-block.json`:

```text
ACTIONIST_TEABLE_BASE_URL=<host-provided Teable sidecar URL>
```

The reference runtime shape is a Teable backend serving its Next UI and API,
with PostgreSQL, Redis and attachment storage owned by the donor runtime. In
development, keep HTTP and WebSocket listeners distinct (`3042` and `3043` in
the existing precedent). In production, use the donor’s documented single
listener behavior. Do not set the development socket port equal to the HTTP
port.

Do not add Teable source under the host project. Do not apply client-specific
patches to the donor as part of this package install. If a future host needs a
different reuse shape, create a new packaging/binding decision and restart
qualification.

## 3. Configure the host-owned boundary

Copy `config/example.config.json` into the host’s configuration system and
provide references, never values, for:

```text
ACTIONIST_TEABLE_BASE_URL
ACTIONIST_DATABASE_URL
ACTIONIST_REDIS_URL
ACTIONIST_ATTACHMENT_STORE_URL
```

The config must retain these invariants:

- identity source is `host_verified_context`;
- the handoff is signed, audience-bound, single-use and no longer than 120s;
- browser-supplied tenant/identity headers are untrusted;
- tenant and base selection are required and host-bound;
- Teable metadata remains in `public` for this pinned V2 source;
- host-owned tables use a separate non-public schema;
- Teable metadata and per-base data have separate donor migration owners;
- cross-owner reads are event-fed and cross-owner writes are forbidden;
- Redis is explicitly required and namespaced;
- attachments are namespaced by tenant and base and require host authorization
  before a donor signed URL is issued.

The connecting donor role needs the privileges required by Teable’s supported
database path, including database `CONNECT` and `CREATE`/DDL rights for its
runtime-created schemas. Granting those rights does not make the host migration
role a donor-resource owner.

## 4. Implement the typed host binding

Implement [`interfaces/host-binding.ts`](interfaces/host-binding.ts) in the
host. The implementation must provide:

1. `identity.issueShortLivedAssertion` and a server-side exchange at
   `/internal/teable/session`; donor login routes stay denied.
2. `tenantAndBase.resolveTenant` and `selectBase`; requested base IDs are
   checked against verified tenant policy.
3. `navigation.contribute`; the host owns the outer URL and visibility is the
   intersection of role and entitlement.
4. `settings.donorSettings`; v0.1 keeps donor settings behind a host navigation
   entry and uses the host fallback only for health/support messaging.
5. `health.check`; include donor `/health`, database, Redis/realtime, proxy and
   attachment authorization checks.
6. `attachments.namespaceFor`, `authorizeRead` and `authorizeUpload`; do not
   treat a donor signed URL as host authorization.
7. `events.emit`/`consumeTenantDisabled` with the stable capability and tenant
   fields in `actionist.capability-event.v1`.
8. `observability.trace`/`correlateRelease` with per-capability release
   correlation and ownership metadata.

Generate and inspect the binding before allowing tenant traffic:

```bash
node tools/teable-block.mjs bind \
  --config config/example.config.json \
  --host fixtures/synthetic-host.json \
  --out /tmp/actionist-teable-bind
```

The generated binding is a planned synthetic object. It is not a session token,
not a client binding and not a release manifest.

## 5. Mount and navigate

Mount the donor service at the host path configured by the binding. The host
owns the outer URL space; the donor owns its internal router behind the proxy.
Use contextual workflow entry points where the product needs a grid. Do not
create a second global Tables silo unless a separate product decision approves
it.

Keep donor settings rendered behind the host navigation entry for v0.1. Do not
claim host-chrome settings absorption: the precedent has no direct successful
example for that surgery.

## 6. Theme safely

Load [`theme/teable-theme-bridge.css`](theme/teable-theme-bridge.css) only under
`.actionist-teable-surface`. Supply converted HSL triplets from the host’s
semantic token layer. Do not alias RGB triplets into Teable HSL variables. The
bridge’s neutral fallbacks are not pixel-parity evidence; a future host must
capture and verify the pinned donor values before making that claim.

## 7. Qualification gate before any release decision

The historical evidence in `records/qualification.json` is a partial local
candidate, not a production baseline. A new host must add an append-only dossier
covering at least:

- authenticated desktop CRUD with the host session;
- authenticated mobile CRUD where the surface is applicable;
- reload and backend-restart persistence without silently losing identity;
- two-client negative isolation;
- dedicated role/schema and independent backup/restore;
- attachment upload/read namespace and denial;
- direct denial of donor login routes;
- event and trace attribution;
- corresponding-source and Teable Section 7 review.

Any missing family keeps the block held. Do not average the passing database
proof against the blocked authenticated UI or attachment proof.

## 8. Disable and roll back

Before enabling a tenant, retain the exact donor artifact by digest and record
the host configuration, route, secrets references, donor revision, database
schema/data and attachment credential state as separate rollback objects. The
composition recovery horizon is the minimum horizon across those objects. If
any required horizon is unknown or zero, do not release.

To disable safely, remove the route entitlement and stop the donor runtime using
the donor owner’s lifecycle procedure. Do not delete donor data, alter donor
migrations, or reset a shared database to make a smoke pass.
