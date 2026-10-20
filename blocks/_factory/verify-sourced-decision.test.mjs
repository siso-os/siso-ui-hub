import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { after } from 'node:test';
import { evaluateDecision, SCHEMA, CROSSWALK } from './reuse-decision.mjs';
import { verifySourcedDecision } from './verify-sourced-decision.mjs';

const original = JSON.parse(readFileSync(new URL('./fixtures/reuse-decision/accepted-intact-service.json', import.meta.url), 'utf8'));
const root = mkdtempSync(join(tmpdir(), 'actionist-sourced-decision-'));
after(() => rmSync(root, { recursive: true, force: true }));
const localGit = args => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8', env: { ...process.env, GIT_CONFIG_NOSYSTEM: '1', GIT_CONFIG_GLOBAL: '/dev/null' } }).trim();
localGit(['init', '-q']);
localGit(['config', 'user.name', 'Actionist synthetic verifier']);
localGit(['config', 'user.email', 'fixture@example.invalid']);
mkdirSync(join(root, 'evidence'));
const refs = [...new Set([...Object.values(original.inputs).flatMap(s => s.evidence_refs), ...original.rejected_alternatives.flatMap(a => a.evidence_refs)])];
for (let i = 0; i < refs.length; i++) writeFileSync(join(root, 'evidence', `${i}.txt`), `Synthetic planning assertion ${i}. Not client or runtime evidence.\n`);
symlinkSync('0.txt', join(root, 'evidence/link.txt'));
localGit(['add', '.']); localGit(['commit', '-qm', 'synthetic evidence fixture']);
const revision = localGit(['rev-parse', 'HEAD']);
const lock = { schema_version: 'actionist.source-lock.v1', sources: refs.map((id, i) => ({
  id, repository: 'fixture/evidence', revision, path: `evidence/${i}.txt`,
  blob_sha: localGit(['rev-parse', `${revision}:evidence/${i}.txt`]), evidence_class: 'observed',
})) };
const roots = { 'fixture/evidence': root };
const packet = () => structuredClone(original);
const sourceLock = () => structuredClone(lock);
const result = (p = packet(), l = sourceLock(), r = roots) => verifySourcedDecision(p, l, r);
const codes = receipt => receipt.source_problems.map(p => p.code);

function ceiling(receipt) {
  assert.equal(receipt.claims.qualification, 'NOT_QUALIFIED');
  assert.equal(receipt.claims.admission, 'NOT_ADMITTED');
  assert.equal(receipt.claims.release, 'NOT_RELEASED');
  assert.equal(receipt.claims.implementation_authorized, false);
  assert.equal(receipt.claims.semantic_review, 'REQUIRED');
  assert.equal(receipt.claims.remote_access, 'NOT_TESTED');
}

test('recovered synthetic gate selects planning only, without source integrity proof', () => {
  const r = evaluateDecision(packet());
  assert.equal(r.decision_status, 'SELECTED_FOR_PLANNING');
  assert.equal(r.claims.admission, 'NOT_ADMITTED');
  assert.equal(r.claims.source_integrity, undefined);
});

test('pinned regular-file Git objects pass integrity, never qualification', () => {
  const r = result();
  assert.equal(r.decision_status, 'SELECTED_FOR_PLANNING');
  assert.equal(r.verified_sources.length, 8);
  assert.equal(r.claims.source_integrity, 'VERIFIED_LOCAL_GIT_OBJECTS');
  ceiling(r);
});

test('repeat runs and reordered source-lock entries yield identical receipts', () => {
  const l = sourceLock(); l.sources.reverse();
  assert.deepEqual(result(), result());
  assert.deepEqual(result(), result(packet(), l));
});

test('historical fixture reference strings cannot pass without bindings', () => {
  const r = result(packet(), { schema_version: lock.schema_version, sources: [] });
  assert.equal(r.decision_status, 'HOLD');
  assert.equal(r.verified_sources.length, 0);
  assert.ok(codes(r).includes('SOURCE_REFERENCE_UNBOUND')); ceiling(r);
});

for (const field of SCHEMA.$defs.decisionInputs.required) {
  test(`missing ${field} remains a structural HOLD`, () => {
    const p = packet(); delete p.inputs[field];
    const r = result(p); assert.equal(r.decision_status, 'HOLD'); ceiling(r);
  });
}

for (const field of ['source', 'rights', 'tenancy']) {
  test(`not-applicable ${field} cannot bypass reference requirement`, () => {
    const p = packet(); p.inputs[field] = { status: 'not_applicable', summary: 'Not needed for this bounded shape.', evidence_refs: [] };
    assert.equal(evaluateDecision(p).decision_status, 'SELECTED_FOR_PLANNING');
    const r = result(p); assert.equal(r.decision_status, 'HOLD');
    assert.ok(codes(r).includes('SOURCE_REFERENCE_REQUIRED'));
  });
}

for (const summary of ['', 'TODO: justify', 'TBD later', 'UNKNOWN']) {
  test(`placeholder summary ${JSON.stringify(summary)} cannot support planning`, () => {
    const p = packet(); p.inputs.source.summary = summary;
    const r = result(p); assert.equal(r.decision_status, 'HOLD');
    assert.ok(codes(r).includes('SOURCE_RATIONALE_MISSING'));
  });
}

for (const klass of ['unknown', 'hypothesis', 'rejected']) {
  test(`${klass} evidence does not clear the source gate`, () => {
    const l = sourceLock(); l.sources[0].evidence_class = klass;
    const r = result(packet(), l); assert.equal(r.decision_status, 'HOLD');
    assert.ok(codes(r).includes('SOURCE_EVIDENCE_UNSETTLED'));
  });
}

test('inference keeps its evidence class and still requires semantic review', () => {
  const l = sourceLock(); l.sources[0].evidence_class = 'inferred';
  const r = result(packet(), l); assert.equal(r.decision_status, 'SELECTED_FOR_PLANNING');
  assert.ok(r.verified_sources.some(s => s.evidence_class === 'inferred')); ceiling(r);
});

for (const badPath of ['../secret', '/etc/passwd', 'evidence/../0.txt', 'evidence//0.txt', 'evidence\\0.txt', 'evidence/\u00000.txt']) {
  test(`unsafe evidence path ${JSON.stringify(badPath)} is refused`, () => {
    const l = sourceLock(); l.sources[0].path = badPath;
    assert.throws(() => result(packet(), l), /SOURCE_LOCK_INVALID/);
  });
}

for (const ref of ['main', 'v1', '1234567', 'a'.repeat(39), 'A'.repeat(40)]) {
  test(`non-immutable revision ${ref} is refused`, () => {
    const l = sourceLock(); l.sources[0].revision = ref;
    assert.throws(() => result(packet(), l), /SOURCE_LOCK_INVALID/);
  });
}

test('duplicate source identity is refused, not last-write-wins', () => {
  const l = sourceLock(); l.sources.push({ ...l.sources[0] });
  assert.throws(() => result(packet(), l), /SOURCE_LOCK_INVALID/);
});

test('unknown lock fields are refused', () => {
  const l = sourceLock(); l.sources[0].approved = true;
  assert.throws(() => result(packet(), l), /SOURCE_LOCK_INVALID/);
});

test('wrong commit-to-blob binding holds', () => {
  const l = sourceLock(); l.sources[0].blob_sha = l.sources[1].blob_sha;
  const r = result(packet(), l); assert.ok(codes(r).includes('SOURCE_BLOB_MISMATCH'));
  assert.equal(r.decision_status, 'HOLD');
});

test('missing repository mapping holds without fetching', () => {
  const r = result(packet(), sourceLock(), {});
  assert.equal(r.decision_status, 'HOLD');
  assert.ok(codes(r).includes('SOURCE_REPOSITORY_UNAVAILABLE'));
});

test('missing local commit holds without fetching', () => {
  const l = sourceLock(); l.sources[0].revision = 'a'.repeat(40);
  const r = result(packet(), l); assert.equal(r.decision_status, 'HOLD');
  assert.ok(codes(r).includes('SOURCE_OBJECT_UNAVAILABLE'));
});

test('blob masquerading as a commit is refused', () => {
  const l = sourceLock(); l.sources[0].revision = l.sources[0].blob_sha;
  const r = result(packet(), l); assert.ok(codes(r).includes('SOURCE_REVISION_NOT_COMMIT'));
});

test('symlink evidence is not followed', () => {
  const l = sourceLock(); l.sources[0].path = 'evidence/link.txt';
  l.sources[0].blob_sha = localGit(['rev-parse', `${revision}:evidence/link.txt`]);
  const r = result(packet(), l); assert.ok(codes(r).includes('SOURCE_NOT_REGULAR_FILE'));
});

test('working-tree tampering does not alter immutable evidence readback', () => {
  const before = result(); writeFileSync(join(root, 'evidence/0.txt'), 'uncommitted tamper');
  assert.deepEqual(result(), before);
});

test('matching PackagingProfile identity is required', () => {
  const p = { record_type: 'PackagingProfile', capability_id: 'actionist/wrong', reuse_shape: 'intact_service', rights_exposure: 'none_network_only', upstream_sync_model: 'downstream_service', shape_decision: packet() };
  const r = result(p); assert.equal(r.decision_status, 'HOLD');
  assert.ok(codes(r).includes('SOURCE_CAPABILITY_MISMATCH'));
  p.capability_id = original.capability_id;
  assert.equal(result(p).decision_status, 'SELECTED_FOR_PLANNING');
});

test('second reuse-shape counterexample stays held instead of inventing a rights mapping', () => {
  const p = packet(); p.selection.selected_shape = 'extracted_package';
  p.selection.candidate_shapes = ['extracted_package', 'embedded_module'];
  p.rights_exposure = 'source_copied'; p.maintenance_model = 'vendored_no_upstream';
  const r = result(p); assert.equal(r.decision_status, 'HOLD');
  assert.ok(r.structural_decision.holds.some(h => h.code === 'MANIFEST_RIGHTS_UNMAPPED')); ceiling(r);
});

test('incompatibility rejects and operator HOLD survives integrity success', () => {
  const p = packet(); p.inputs.rights.status = 'incompatible';
  assert.equal(result(p).decision_status, 'REJECT');
  const q = packet(); q.requested_disposition = 'HOLD';
  assert.equal(result(q).decision_status, 'HOLD');
});

test('crosswalk does not silently widen the architecture vocabulary', () => {
  assert.deepEqual([...SCHEMA.$defs.reuseShape.enum].sort(), CROSSWALK.architecture_shapes.map(s => s.p04_shape).sort());
  assert.equal(CROSSWALK.architecture_shapes.filter(s => s.manifest_v2_shape !== null).length, 2);
});

test('CLI emits a deterministic planning-only receipt and refuses duplicate/unknown arguments', () => {
  const input = join(root, 'packet.json'); const sources = join(root, 'sources.json');
  writeFileSync(input, JSON.stringify(packet())); writeFileSync(sources, JSON.stringify(sourceLock()));
  const command = fileURLToPath(new URL('./verify-sourced-decision.mjs', import.meta.url));
  const argv = [command, '--input', input, '--sources', sources, '--repo', `fixture/evidence=${root}`];
  const r = spawnSync(process.execPath, argv, { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr); ceiling(JSON.parse(r.stdout));
  for (const extra of [['--deploy', 'true'], ['--input', input], ['--repo', `fixture/evidence=${root}`],
    ['--expect-input-sha256', '0'.repeat(64)],
    ['--expect-input-sha256', 'invalid', '--expect-sources-sha256', '0'.repeat(64)]]) {
    const failure = spawnSync(process.execPath, [...argv, ...extra], { encoding: 'utf8' });
    assert.equal(failure.status, 2); assert.equal(failure.stdout, '');
  }
});
