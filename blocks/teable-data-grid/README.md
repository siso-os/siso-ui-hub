# Actionist Teable data-grid block v0.1

This is a reusable prototype package for binding Teable as an intact service
behind an Actionist host. It is deliberately a seam package: it contains no
Teable source, no client data, no credentials and no deployment artifacts.

## Reuse shape

The selected shape is:

```text
Teable pinned service/runtime
  <- host-owned verified identity/session exchange
  <- host-owned tenant/base policy and outer URL
  <- host-owned navigation, settings entry and observability envelope
```

`intact_service` is the bounded v0.1 choice because the proven donor already
owns its grid/view/formula logic, realtime transport, metadata migrations and
per-base data schemas. The host must not fork those concerns merely to make a
grid appear in a product shell.

The donor reference is the SISO-maintained Teable fork at commit
`b245a987f8bfb7411d4e2423907b9cbb0a1c9b6b`, based on upstream commit
`06a4461e2bc53055182d4df0a72dffa26fd99210`. The immutable git-archive digest
recorded for the source commit is
`sha256:e41fe62b54c1d0c077a9c5a036f1b4e04016dcd0203396f943411e89e6e09fc6`.

## Read the records in this order

1. [`records/capability.json`](records/capability.json) — donor-free outcome,
   ports and authority.
2. [`records/packaging.json`](records/packaging.json) — source identity, rights,
   reuse shape, migration owners and one-server/separate-schema declaration.
3. [`records/host-requirements.json`](records/host-requirements.json) — the
   host contract required by the service.
4. [`records/binding-plan.json`](records/binding-plan.json) — one application
   binding and its normalization surgeries.
5. [`records/qualification.json`](records/qualification.json) — evidence and
   falsifiers; this remains partial and held.
6. [`records/registry.json`](records/registry.json) — candidate lifecycle and
   empty admission scope.
7. [`records/release.json`](records/release.json) — unreleased manifest and
   multi-object rollback plan.

The package status is `prototype_not_admitted`. Empty tenant/application
admission scope is intentional. The release record has a zero recovery horizon
because no independent donor artifact retention or restore drill is claimed.

## Required boundary

Teable metadata is `public` at the pinned V2 source because its raw SQL assumes
that schema. Teable creates a separate runtime schema for each base. A host may
use a different non-public schema for host-owned tables in the same PostgreSQL
server/database. Ownership is never shared:

| Resource | Owner |
| --- | --- |
| Teable metadata | `teable-prisma` |
| Teable per-base data schemas | `teable-data-plane-migrator` |
| Host application tables | `actionist-host` |
| Teable attachment objects | `teable-storage-adapter` |

Cross-owner views use an event-fed host read model. Cross-owner mutation is
forbidden. A donor role may receive the DDL rights required by Teable's
supported runtime, but the host migration role must not own donor resources.

## Evidence boundary

The historical receipt is preserved and linked from
[`records/qualification.json`](records/qualification.json). It reports pinned
build/health, database CRUD/reconnect persistence and two-client denial. It also
explicitly leaves authenticated native desktop CRUD, authenticated native
mobile CRUD, attachment namespace/upload proof, host session handoff and
independent restore/admission gates blocked. This package carries those holds
forward. It does not turn a build or a synthetic fixture into qualification.

## Commands

The CLI uses only Node.js built-ins and performs no network access or donor
source execution:

```bash
node tools/teable-block.mjs validate
node tools/teable-block.mjs install --out /tmp/actionist-teable-install
node tools/teable-block.mjs bind --config config/example.config.json --host fixtures/synthetic-host.json --out /tmp/actionist-teable-bind
node tools/teable-block.mjs smoke
```

Use a disposable output directory for `install` and `bind`. The generated files
are plans/bindings, not a Teable checkout and not a release.

See [`RUNBOOK.md`](RUNBOOK.md) for another project’s install/bind sequence and
the gates that must remain closed.
