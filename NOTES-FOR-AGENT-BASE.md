# Agent Base and the shared UI kit

The canonical code now lives in this monorepo. The UI kit is
[`platform/ui`](./); the catalog application is
[`hubs/ui`](../../hubs/ui/); Agent Base is
[`apps/agent-base`](../../apps/agent-base/). This supersedes the former
standalone submodule setup. Do not add another UI Hub checkout or copy its
components into Agent Base.

## Consume shared parts

The shared [`@siso/agent`](packages/siso-agent/package.json) package contains
composer, voice, face, icons and OS parts. Its public entry exports these as
namespaces; [`@siso/ui/agent`](packages/siso-ui/src/agent.ts) re-exports that entry.
The kit also exposes the promoted Agent Base shell and navigation through
`@siso/ui/shells/agent-base` and `@siso/ui/navigation/agent-base`.

Use `workspace:*` dependencies for workspace members and the documented public
exports. Include the matching exported styles where the consumer requires them.
The terminal stays product-local because it depends on `@xterm`.

The original promotion is recorded in
[`provenance.json`](packages/siso-agent/provenance.json): it does not prove that
all current product copies remain identical or that their consumers have switched.
Before removing a copy, compare its current implementation and dependencies,
update all callers, and prove the product still builds. Preserve divergences;
archive superseded source with its canonical mapping. Do not replace newer
product behavior with an older kit snapshot.

## Mount the catalog application separately

The UI Hub application remains a product, not a component dependency. Its
[`package.json`](../../hubs/ui/package.json),
[`SPEC.md`](../../hubs/ui/SPEC.md) and
[`serve.mjs`](../../hubs/ui/serve.mjs) define its build, data API and server.
Build the registered `@siso/ui-hub` workspace member from the root workspace.
Its build exports catalog data before rendering and checks `dist/data/index.json`.

For an embedded catalog, preserve the product’s routing and origin requirements;
mount its server rather than importing application internals into the kit.
Bookmarks and other private catalog records keep their existing access boundary.
A public export must use the existing public-data/privacy workflow, never a copy
of a private build.

The CLI and MCP remain in [`bin/`](bin/): `uihub` and `uihub-mcp` use the catalog
contracts. External assets and Foundry inputs remain separate data dependencies;
their absence must not be described as verified full-catalog availability.

## Ownership and acceptance

UI-HUB owns the shared parts and catalog. Agent Base owns its product integration,
routes, services and terminal. Both work in the canonical tree through isolated
branches; [ADR 0022](../../decisions/0022-hubs-are-products-one-workspace.md)
requires shared-code promotion and consumer adoption together.

Verify the affected shared package and product build before landing an adoption.
Use browser evidence when behavior, styles or layout change. Record exactly which
consumers adopted the kit and which still use local implementations in the
[handoff](../../.agents/HANDOFF.md); do not infer adoption from package presence.
