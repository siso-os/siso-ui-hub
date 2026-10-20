#!/usr/bin/env node
/** Offline evidence-integrity companion to FR-04; never a runtime/admission gate. */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { constants, openSync, fstatSync, readSync, closeSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { evaluateDecision, SCHEMA } from './reuse-decision.mjs';

const SHA = /^[a-f0-9]{40}$/;
const REPO = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const CLASSES = new Set(['observed', 'inferred', 'hypothesis', 'unknown', 'rejected']);
const MAX_BYTES = 2 * 1024 * 1024;
const object = v => v !== null && typeof v === 'object' && !Array.isArray(v);
const text = v => typeof v === 'string' && v.trim().length > 0;
const meaningful = v => text(v) && !/^(TODO|TBD|UNKNOWN)\b/i.test(v.trim());
const canonical = v => Array.isArray(v) ? v.map(canonical) : object(v)
  ? Object.fromEntries(Object.keys(v).sort().map(k => [k, canonical(v[k])])) : v;
const digest = v => createHash('sha256').update(JSON.stringify(canonical(v))).digest('hex');
const blobHash = bytes => createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
const issue = (code, ref, reason) => ({ code, ref, reason });
const order = (a, b) => Buffer.compare(Buffer.from(JSON.stringify(canonical(a))), Buffer.from(JSON.stringify(canonical(b))));
const invalid = reason => { throw new Error(`SOURCE_LOCK_INVALID: ${reason}`); };

function readInput(path) {
  const fd = openSync(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK);
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile() || stat.size > MAX_BYTES) throw new Error('INPUT_NOT_BOUNDED_REGULAR_FILE');
    const bytes = Buffer.alloc(stat.size + 1);
    const count = readSync(fd, bytes, 0, bytes.length, 0);
    if (count !== stat.size) throw new Error('INPUT_CHANGED_OR_SHORT_READ');
    return bytes.subarray(0, count);
  } finally { closeSync(fd); }
}

function sourceIndex(lock) {
  if (!object(lock) || lock.schema_version !== 'actionist.source-lock.v1' || !Array.isArray(lock.sources)) invalid('expected source-lock.v1 sources array');
  if (Object.keys(lock).some(k => !['schema_version', 'sources'].includes(k))) invalid('unexpected root field');
  const entries = new Map();
  for (const s of lock.sources) {
    if (!object(s) || Object.keys(s).sort().join(',') !== 'blob_sha,evidence_class,id,path,repository,revision') invalid('unexpected or missing source field');
    if (!text(s.id) || s.id !== s.id.trim() || entries.has(s.id)) invalid('empty, noncanonical or duplicate source ID');
    if (!REPO.test(s.repository) || s.repository.split('/').some(p => p === '.' || p === '..')) invalid('repository must be owner/name');
    if (!SHA.test(s.revision) || !SHA.test(s.blob_sha)) invalid('immutable 40-character commit and blob SHA required');
    if (!text(s.path) || /[\\\x00-\x1f\x7f]/.test(s.path) || s.path.split('/').some(p => !p || p === '.' || p === '..')) invalid('normalized relative file path required');
    if (!CLASSES.has(s.evidence_class)) invalid('unsupported evidence class');
    entries.set(s.id, s);
  }
  return entries;
}

/** No shell, network, hooks, replacement objects or implicit partial-clone fetch. */
function git(root, args, limit = MAX_BYTES) {
  const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => !k.startsWith('GIT_')));
  Object.assign(env, { GIT_TERMINAL_PROMPT: '0', GIT_NO_REPLACE_OBJECTS: '1', GIT_NO_LAZY_FETCH: '1', GIT_OPTIONAL_LOCKS: '0' });
  return execFileSync('git', ['--no-replace-objects', '--literal-pathspecs', '-c', 'protocol.allow=never', '-c', 'core.fsmonitor=false', '-C', root, ...args], {
    env, timeout: 10000, maxBuffer: limit, stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function checkSource(s, roots) {
  const root = roots[s.repository];
  if (!text(root)) return issue('SOURCE_REPOSITORY_UNAVAILABLE', s.id, 'Explicit local repository mapping is missing; no network fetch attempted.');
  try {
    if (git(root, ['cat-file', '-t', s.revision], 128).toString().trim() !== 'commit') return issue('SOURCE_REVISION_NOT_COMMIT', s.id, 'Pinned revision is not a commit.');
    const entry = git(root, ['ls-tree', '-z', s.revision, '--', s.path], 16384).toString();
    const match = /^(100644|100755) blob ([a-f0-9]{40})\t([^\0]+)\0$/.exec(entry);
    if (!match || match[3] !== s.path) return issue('SOURCE_NOT_REGULAR_FILE', s.id, 'Exact pinned path is absent or not a regular file; symlinks and submodules are not followed.');
    if (match[2] !== s.blob_sha) return issue('SOURCE_BLOB_MISMATCH', s.id, 'Commit path does not bind the expected blob.');
    const size = Number(git(root, ['cat-file', '-s', s.blob_sha], 128).toString().trim());
    if (!Number.isSafeInteger(size) || size < 0 || size > MAX_BYTES) return issue('SOURCE_SIZE_LIMIT', s.id, 'Evidence exceeds the bounded two-MiB read limit.');
    const bytes = git(root, ['cat-file', 'blob', s.blob_sha]);
    if (bytes.length !== size || blobHash(bytes) !== s.blob_sha) return issue('SOURCE_BYTES_MISMATCH', s.id, 'Read bytes do not match the pinned Git blob.');
    return null;
  } catch {
    return issue('SOURCE_OBJECT_UNAVAILABLE', s.id, 'Required local Git object could not be read; no fetch or source execution attempted.');
  }
}

export function verifySourcedDecision(document, lock, roots = {}) {
  const structural = evaluateDecision(document);
  const packet = document?.record_type === 'PackagingProfile' ? document.shape_decision : document;
  const entries = sourceIndex(lock);
  const problems = [];
  const refs = new Set();
  for (const name of SCHEMA.$defs.decisionInputs.required) {
    const state = packet.inputs?.[name];
    if (!state) continue; // The recovered structural gate already records this HOLD.
    if (!meaningful(state.summary)) problems.push(issue('SOURCE_RATIONALE_MISSING', name, 'A substantive summary is required, including for not-applicable decisions.'));
    if (['known', 'not_applicable'].includes(state.status) && !state.evidence_refs?.length) problems.push(issue('SOURCE_REFERENCE_REQUIRED', name, 'Known and not-applicable decisions require an auditable reference.'));
    for (const ref of state.evidence_refs ?? []) refs.add(ref);
  }
  for (const alternative of packet.rejected_alternatives ?? []) {
    for (const ref of alternative.evidence_refs ?? []) refs.add(ref);
  }
  if (refs.size === 0) problems.push(issue('SOURCE_REFERENCES_EMPTY', 'packet', 'No decision evidence can be verified.'));
  if (document?.record_type === 'PackagingProfile' && document.capability_id !== structural.capability_id) {
    problems.push(issue('SOURCE_CAPABILITY_MISMATCH', 'capability_id', 'PackagingProfile and decision must identify the same capability.'));
  }
  const verified = [];
  for (const ref of [...refs].sort()) {
    const source = entries.get(ref);
    if (!source) {
      problems.push(issue('SOURCE_REFERENCE_UNBOUND', ref, 'Reference has no immutable source-lock entry.'));
      continue;
    }
    if (!['observed', 'inferred'].includes(source.evidence_class)) {
      problems.push(issue('SOURCE_EVIDENCE_UNSETTLED', ref, 'Unknown, hypothetical or rejected evidence cannot clear the sourced-planning gate.'));
      continue;
    }
    const error = checkSource(source, roots);
    if (error) problems.push(error);
    else verified.push({ ...source });
  }
  problems.sort(order);
  verified.sort((a, b) => Buffer.compare(Buffer.from(a.id), Buffer.from(b.id)));
  const decisionStatus = structural.decision_status === 'REJECT' ? 'REJECT'
    : structural.decision_status === 'HOLD' || problems.length ? 'HOLD' : 'SELECTED_FOR_PLANNING';
  const body = {
    schema_version: 'actionist.sourced-reuse-decision-receipt.v1',
    decision_id: structural.decision_id,
    capability_id: structural.capability_id,
    structural_input_digest: structural.input_digest,
    source_lock_digest: `sha256:${digest({ schema_version: lock.schema_version, sources: [...entries.values()].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0) })}`,
    decision_status: decisionStatus,
    structural_decision: structural,
    source_problems: problems,
    verified_sources: verified,
    claims: {
      planning_selection_only: decisionStatus === 'SELECTED_FOR_PLANNING',
      source_integrity: problems.length === 0 && refs.size > 0 ? 'VERIFIED_LOCAL_GIT_OBJECTS' : 'NOT_VERIFIED',
      semantic_review: 'REQUIRED',
      remote_access: 'NOT_TESTED',
      qualification: 'NOT_QUALIFIED',
      admission: 'NOT_ADMITTED',
      release: 'NOT_RELEASED',
      implementation_authorized: false,
    },
  };
  return { receipt_id: `sourced-reuse.${digest(body)}`, ...body };
}

const USAGE = 'usage: verify-sourced-decision.mjs --input packet.json --sources source-lock.json --repo owner/name=/local/checkout [--repo owner/other=/local/other] [--expect-input-sha256 SHA256 --expect-sources-sha256 SHA256]';
function main() {
  try {
    const argv = process.argv.slice(2);
    if (argv.length === 1 && argv[0] === '--help') { console.log(USAGE); return; }
    const options = {}; const roots = Object.create(null);
    for (let i = 0; i < argv.length; i += 2) {
      const key = argv[i]; const value = argv[i + 1];
      if (!['--input', '--sources', '--repo', '--expect-input-sha256', '--expect-sources-sha256'].includes(key) || !value || value.startsWith('--')) throw new Error(USAGE);
      if (key === '--repo') {
        const at = value.indexOf('='); const name = value.slice(0, at);
        if (at < 1 || !REPO.test(name) || !value.slice(at + 1) || Object.hasOwn(roots, name)) throw new Error(USAGE);
        roots[name] = resolve(value.slice(at + 1));
      } else {
        if (options[key]) throw new Error(USAGE);
        options[key] = value;
      }
    }
    if (!options['--input'] || !options['--sources'] || !Object.keys(roots).length) throw new Error(USAGE);
    const expected = ['--expect-input-sha256', '--expect-sources-sha256'];
    if (expected.some(key => options[key]) && !expected.every(key => /^[a-f0-9]{64}$/.test(options[key] ?? ''))) throw new Error('INPUT_HASH_PAIR_INVALID');
    const inputBytes = readInput(options['--input']);
    const sourceBytes = readInput(options['--sources']);
    for (const [key, bytes] of [[expected[0], inputBytes], [expected[1], sourceBytes]]) {
      if (options[key] && createHash('sha256').update(bytes).digest('hex') !== options[key]) throw new Error(`INPUT_HASH_MISMATCH: ${key}`);
    }
    const result = verifySourcedDecision(JSON.parse(inputBytes), JSON.parse(sourceBytes), roots);
    console.log(JSON.stringify(result, null, 2));
    if (result.decision_status !== 'SELECTED_FOR_PLANNING') process.exitCode = 1;
  } catch (error) {
    console.error(JSON.stringify({ status: 'REJECT', code: 'SOURCED_DECISION_INVALID', message: error.message }));
    process.exitCode = 2;
  }
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
