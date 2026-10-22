# Faces design research

The two standalone Faces repositories were Agent Base design studies, not a separately shipped product. The original briefs say research only; the later Agent Base review kit retains the approved face, logo and state contracts. The canonical product modules remain `siso.products.agent-base` and `siso.packages.ui`. No product source was replaced.

Unique authored variants, galleries, design briefs and build tooling are preserved at `_archive/2026-10-21-faces/lab` and `mini` under ADR 0025. Exact duplicate blobs, including copies within each repository, are recorded rather than imported again. The split manifest lists every original path, Git mode, blob, disposition and canonical location. Historical canonical blobs remain reachable from its pinned monorepo revision. The archive is a deduplicated source collection, not an executable checkout: reconstruct omitted dependencies from the recorded blobs or exact encrypted original bundle before running old tooling.

Render media, JSON probe/config records, logs, public-site captures and packaged kits remain in the two pinned, encrypted original-history blocks. Their ciphertext was downloaded, decrypted and checked for identical bundle bytes, all refs and commit counts. This is verified preservation; the older `bin/get` submodule/storage-organization transport is not provisioned for these history bundles. No automatic download or runtime/UI acceptance is claimed.

Ownership: `source-receipt.json` identifies Agent Base's `packages/halo-face`; `logos/sources.json` identifies SISO's geometry and the public HALO website mark. The `halo-face` spelling does not establish Cam CRM provenance. The brief and handoff prohibit Cam CRM source. Independent content review found no unique production implementation requiring promotion.

Proof: `.siso/sanitized-imports/faces-20261021/`, `ops/data/manifests/faces-{lab,mini}.json`. Original import trees remain pinned in `.agents/migration-20261016.json`; descriptors and receipts were added after the exact tree proofs.
