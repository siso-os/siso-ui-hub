import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test, { after } from 'node:test';
import { evaluateDecision } from '../_factory/reuse-decision.mjs';
const root = mkdtempSync(join(tmpdir(), 'actionist-scaffold-reramp-'));
after(() => rmSync(root, { recursive: true, force: true }));
const cli = fileURLToPath(new URL('./new-block.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });
const load = path => JSON.parse(readFileSync(join(root, 'example', path), 'utf8'));

test('fresh scaffold requires explicit shape and starts held', () => {
 const r = run('fixture/example', '--dir', root); assert.equal(r.status, 0, r.stderr);
 const m = load('actionist-block.json'); const p = load('records/packaging.json');
 assert.match(m.reuse.shape, /^TODO:/); assert.notEqual(m.reuse.shape, 'absorbed_native');
 assert.match(m.reuse.rights_exposure, /^TODO:/); assert.match(m.reuse.mount_topology, /^TODO:/);
 assert.equal(m.reuse.decision_packet, 'records/packaging.json');
 assert.equal(p.shape_decision.selection.selected_shape, null);
 assert.equal(evaluateDecision(p).decision_status, 'HOLD');
 assert.equal(m.authorization.implementation_authorized, false);
 assert.equal(m.lifecycle.admission_status, 'not_considered');
 assert.equal(m.lifecycle.proof_status, 'unexecuted');
 for (const s of Object.values(p.shape_decision.inputs)) assert.equal(s.status, 'missing');
});
test('scaffold keeps all seven record identities aligned', () => {
 const m = load('actionist-block.json'); assert.equal(Object.keys(m.records).length, 7);
 for (const path of Object.values(m.records)) {
  const r = load(path); assert.equal(r.block_id, 'fixture/example'); assert.equal(r.capability_id, m.capability_id);
 }
});
test('existing scaffold is not overwritten', () => {
 const before = readFileSync(join(root, 'example/actionist-block.json'));
 assert.equal(run('fixture/example', '--dir', root).status, 1);
 assert.deepEqual(readFileSync(join(root, 'example/actionist-block.json')), before);
});
test('invalid namespace is refused without creating a block', () => {
 assert.equal(run('../escape', '--dir', root).status, 2);
 assert.equal(existsSync(join(root, 'escape')), false);
});
