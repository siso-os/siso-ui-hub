#!/usr/bin/env node
//
// The v2 block-manifest validator. ONE validator that reads EVERY block.
//
// Usage:  node packages/ui/blocks/_schema/validate-block.mjs <block-directory> [...more]
// Exit:   0 = every block valid   1 = at least one violation   2 = could not run
//
// Design rules this file obeys, because each was already broken once:
//
//   R8 - in a deny-by-default gate, a silent skip is an allow. There is no
//        "cannot classify this, move on" branch anywhere below. Every input this
//        validator does not understand is a LOUD violation. Notably:
//          - an unknown manifest key is a violation (additionalProperties: false)
//          - a records/ file present on disk but absent from the manifest is a
//            violation (an orphan record would otherwise be invisible)
//          - a path that resolves to a symlink is a violation, not a skip
//            (readdirSync/statSync report symlinks as neither file nor directory,
//             which is exactly how the publish-gate hole opened)
//
//   R5 - re-derive, do not trust. Every count reported at the end is computed
//        here from the files, not read from a field that claims it.
//
//   D-3 - bare `node` on this machine is node@22 and broken. This file does not
//         invoke node; the harness that does resolves a working one explicitly.

import { readFileSync, readdirSync, existsSync, lstatSync } from 'node:fs';
import { resolve, relative, join, dirname, basename, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = join(HERE, 'actionist-block.v2.schema.json');
// blocks/ is the parent of _schema/, resolved from THIS FILE rather than from the
// caller's cwd - so a bare block name means the same thing from anywhere.
const BLOCKS_ROOT = resolve(HERE, '..');

// ---------------------------------------------------------------------------
// A small, explicit JSON Schema subset checker.
//
// Deliberately hand-written rather than pulled from a dependency: this gate must
// run with zero install steps, and - more importantly - R5 says a verifier that
// shares code with its generator verifies nothing. Nothing here is generated
// from the schema; it reads the schema as data at runtime.
//
// Every keyword it does not implement is a LOUD failure (see `unknownKeyword`),
// so the schema can never quietly grow a constraint this checker ignores.
// ---------------------------------------------------------------------------

const SUPPORTED = new Set([
  '$schema', '$id', 'title', 'description', '$defs', '$ref',
  'type', 'const', 'enum', 'pattern', 'minLength', 'minItems', 'uniqueItems',
  'required', 'properties', 'additionalProperties', 'items',
  'allOf', 'if', 'then', 'not', 'propertyNames',
]);

function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}

function resolveRef(root, ref) {
  if (!ref.startsWith('#/')) throw new Error(`unsupported $ref form: ${ref}`);
  let node = root;
  for (const raw of ref.slice(2).split('/')) {
    const key = raw.replace(/~1/g, '/').replace(/~0/g, '~');
    node = node?.[key];
    if (node === undefined) throw new Error(`$ref does not resolve: ${ref}`);
  }
  return node;
}

/** Validate `value` against `schema`. Pushes human-readable violations onto `out`. */
function check(value, schema, root, path, out) {
  if (schema === true) return;
  if (schema === false) { out.push(`${path}: schema forbids any value here`); return; }

  for (const kw of Object.keys(schema)) {
    if (!SUPPORTED.has(kw)) {
      // A schema keyword this checker does not implement would silently pass.
      // That is the R8 hole. Refuse instead.
      out.push(`${path}: SCHEMA USES UNIMPLEMENTED KEYWORD "${kw}" - this validator would silently ignore it`);
    }
  }

  if (schema.$ref) {
    check(value, resolveRef(root, schema.$ref), root, path, out);
    // $ref siblings other than annotations are not used by our schema; if they
    // appear, the loop above has already flagged anything unimplemented.
  }

  if (schema.type) {
    const want = Array.isArray(schema.type) ? schema.type : [schema.type];
    const got = typeOf(value);
    const ok = want.some((t) => (t === 'integer' ? Number.isInteger(value) : t === got));
    if (!ok) { out.push(`${path}: expected type ${want.join('|')}, got ${got}`); return; }
  }

  if ('const' in schema && JSON.stringify(value) !== JSON.stringify(schema.const)) {
    out.push(`${path}: must be ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}`);
  }

  if (schema.enum && !schema.enum.some((e) => JSON.stringify(e) === JSON.stringify(value))) {
    out.push(`${path}: ${JSON.stringify(value)} is not one of ${schema.enum.join(', ')}`);
  }

  if (schema.pattern !== undefined) {
    if (typeof value !== 'string') out.push(`${path}: pattern applies to strings, got ${typeOf(value)}`);
    else if (!new RegExp(schema.pattern, 'u').test(value)) {
      out.push(`${path}: ${JSON.stringify(value)} does not match /${schema.pattern}/`);
    }
  }

  if (schema.minLength !== undefined && typeof value === 'string' && value.length < schema.minLength) {
    out.push(`${path}: shorter than minLength ${schema.minLength}`);
  }

  if (schema.minItems !== undefined && Array.isArray(value) && value.length < schema.minItems) {
    out.push(`${path}: needs at least ${schema.minItems} item(s), has ${value.length}`);
  }

  if (schema.uniqueItems && Array.isArray(value)) {
    const seen = new Set();
    for (const item of value) {
      const k = JSON.stringify(item);
      if (seen.has(k)) out.push(`${path}: duplicate item ${k}`);
      seen.add(k);
    }
  }

  if (schema.required && typeOf(value) === 'object') {
    for (const key of schema.required) {
      if (!Object.hasOwn(value, key)) out.push(`${path}.${key}: required field is missing`);
    }
  }

  if (typeOf(value) === 'object') {
    const known = new Set(Object.keys(schema.properties ?? {}));
    if (schema.properties) {
      for (const [key, sub] of Object.entries(schema.properties)) {
        if (Object.hasOwn(value, key)) check(value[key], sub, root, `${path}.${key}`, out);
      }
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!known.has(key)) out.push(`${path}.${key}: unknown field (this grammar does not permit it)`);
      }
    } else if (typeOf(schema.additionalProperties) === 'object') {
      for (const key of Object.keys(value)) {
        if (!known.has(key)) check(value[key], schema.additionalProperties, root, `${path}.${key}`, out);
      }
    }
    if (schema.propertyNames) {
      for (const key of Object.keys(value)) check(key, schema.propertyNames, root, `${path}.<key:${key}>`, out);
    }
  }

  if (schema.items && Array.isArray(value)) {
    value.forEach((item, i) => check(item, schema.items, root, `${path}[${i}]`, out));
  }

  if (schema.allOf) {
    for (const sub of schema.allOf) check(value, sub, root, path, out);
  }

  if (schema.not) {
    const probe = [];
    check(value, schema.not, root, path, probe);
    if (probe.length === 0) {
      out.push(`${path}: ${schema.description ?? 'value matches a forbidden shape'}`);
    }
  }

  if (schema.if) {
    const probe = [];
    check(value, schema.if, root, path, probe);
    if (probe.length === 0 && schema.then) {
      const sub = [];
      check(value, schema.then, root, path, sub);
      for (const v of sub) out.push(schema.description ? `${v}  [rule: ${schema.description}]` : v);
    }
  }
}

// ---------------------------------------------------------------------------
// Block-level checks: things a JSON Schema cannot express, because they are
// about the filesystem and about agreement BETWEEN files.
// ---------------------------------------------------------------------------

const RECORD_TYPE_FOR = {
  capability: 'CapabilityContract',
  packaging: 'PackagingProfile',
  host_requirements: 'HostContract',
  binding_plan: 'BindingPlan',
  qualification: 'QualificationDossier',
  registry: 'RegistryRecord',
  release: 'ReleaseManifest',
};

// A *_ref field must name an INDIRECTION, never carry a value. Two schemes are
// legitimate and both appear on disk:
//   secret-ref:NAME   - resolved at runtime from the host secret manager
//   fixture://path    - a synthetic fixture handle that resolves to nothing
// The rule is "no inlined value", not "one blessed spelling": mandating a single
// scheme would have flagged teable's honest synthetic fixtures as violations.
const SECRET_REF = /^(?:secret-ref:[A-Z0-9_]+|fixture:\/\/[A-Za-z0-9._\/-]+|env:[A-Z0-9_]+)$/;

/** Resolve a package-relative path, refusing escapes and symlinks LOUDLY. */
function safeResolve(root, rel, label, out) {
  const target = resolve(root, rel);
  const fromRoot = relative(root, target);
  if (fromRoot.startsWith('..') || fromRoot.startsWith(`..${sep}`)) {
    out.push(`${label}: path escapes the block directory: ${rel}`);
    return null;
  }
  if (!existsSync(target)) { out.push(`${label}: does not resolve: ${rel}`); return null; }
  const st = lstatSync(target);
  if (st.isSymbolicLink()) {
    // Not a skip. A symlink is how content sneaks past a directory walker.
    out.push(`${label}: is a symlink, which this grammar refuses: ${rel}`);
    return null;
  }
  if (!st.isFile()) { out.push(`${label}: is not a regular file: ${rel}`); return null; }
  return target;
}

function readJson(file, label, out) {
  try { return JSON.parse(readFileSync(file, 'utf8')); }
  catch (e) { out.push(`${label}: invalid JSON (${e.message})`); return null; }
}

/** Walk every file under the block, refusing anything unclassifiable. */
function walkBlock(root, out, dir = root, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', 'out', 'dist'].includes(entry.name)) continue;
    const abs = join(dir, entry.name);
    if (entry.isSymbolicLink()) { out.push(`${relative(root, abs)}: symlink inside a block is refused`); continue; }
    if (entry.isDirectory()) { walkBlock(root, out, abs, acc); continue; }
    if (entry.isFile()) { acc.push(abs); continue; }
    // Neither file, directory, nor symlink: fifo, socket, device. Never silent.
    out.push(`${relative(root, abs)}: unclassifiable directory entry, refused`);
  }
  return acc;
}

/**
 * Resolve a target to a block directory.
 *
 * A BARE NAME ("affine-workspace") is a block name, and blocks live in a known
 * place relative to THIS script - so resolve it there, not against the caller's
 * cwd. A path with a separator ("./x", "blocks/x", "/abs/x") is a path and stays
 * cwd-relative, which is what someone typing a path means.
 *
 * Why this is not merely a nicer error: this validator is invoked by the estate
 * gate runner, which has whatever cwd it happens to have. A cwd-dependent lookup
 * there would report "no actionist-block.json" - a confident claim about the
 * BLOCK - when the truth is a claim about the INVOCATION. That is R8's shape:
 * a mechanism that did not understand its input answering about the wrong subject.
 */
function resolveTarget(target) {
  const looksLikePath = target.includes('/') || target.includes('\\') || target === '.' || target === '..';
  if (looksLikePath) return { root: resolve(target), how: 'cwd-relative path' };

  const underBlocks = join(BLOCKS_ROOT, target);
  const underCwd = resolve(target);
  const inBlocks = existsSync(join(underBlocks, 'actionist-block.json'));
  const inCwd = existsSync(join(underCwd, 'actionist-block.json'));

  // AMBIGUOUS: a bare name that names a block in BOTH places. Picking either one
  // silently is how a gate validates a different directory than the caller meant
  // and still prints PASS. Verified reachable: a corrupted copy in the cwd named
  // after a real block reported PASS against the real block. Refuse instead.
  //
  // FAILURE DIRECTION, MEASURED (do not assume it - INTENT R5: you cannot predict
  // which way a condition fails open until you test it). Each branch in this
  // function was inverted and observed:
  //   !looksLikePath  -> caught by prove.mjs (2 cases)
  //   this condition  -> **fails open toward PASS**: an INVALID block reports
  //                      PASS, and validating the two real blocks stays green, so
  //                      no other check notices. The dangerous direction.
  //   !inBlocks       -> caught by prove.mjs (1 case)
  // All three are covered by prove.mjs, each with its sabotage asserted applied.
  if (inBlocks && inCwd && underBlocks !== underCwd) {
    return { root: null, ambiguous: [underBlocks, underCwd] };
  }
  if (inBlocks) return { root: underBlocks, how: `block name resolved under ${BLOCKS_ROOT}` };
  // Fall back to cwd so a bare name still behaves when someone is standing in
  // blocks/ - but remember both candidates so the error can name them.
  return { root: underCwd, how: 'cwd-relative', alsoTried: underBlocks };
}

function validateBlock(blockDir, schema) {
  const out = [];
  const { root, how, alsoTried, ambiguous } = resolveTarget(blockDir);

  if (ambiguous) {
    return {
      block: blockDir,
      violations: [
        `${blockDir}: AMBIGUOUS - this bare name is a block in two places, so I refuse to guess\n` +
        ambiguous.map((a) => `          candidate: ${a}`).join('\n') + '\n' +
        `          cwd:       ${process.cwd()}\n` +
        `          pass an explicit path (e.g. ./${blockDir}) to say which one you mean`,
      ],
      counts: null,
    };
  }

  const name = basename(root);

  const manifestPath = join(root, 'actionist-block.json');
  if (!existsSync(manifestPath)) {
    // Say WHERE it looked and from WHERE it was invoked. Without the resolved
    // absolute path, this message accuses the block of missing a file that is
    // sitting right there, and the reader checks `ls` and `git status` before
    // suspecting their own working directory.
    const tried = [manifestPath, alsoTried ? join(alsoTried, 'actionist-block.json') : null].filter(Boolean);
    return {
      block: name,
      violations: [
        `${name}: no actionist-block.json found\n` +
        tried.map((t) => `          looked at: ${t}`).join('\n') + '\n' +
        `          cwd:       ${process.cwd()}\n` +
        `          resolution: ${how}\n` +
        `          if the block exists elsewhere, pass its path rather than a bare name`,
      ],
      counts: null,
    };
  }
  const manifest = readJson(manifestPath, 'actionist-block.json', out);
  if (!manifest) return { block: name, violations: out, counts: null };

  // 1. The grammar itself.
  check(manifest, schema, schema, 'manifest', out);

  // 2. Records: every declared record resolves, is the right type, and agrees
  //    with the manifest on identity.
  const records = {};
  for (const [key, rel] of Object.entries(manifest.records ?? {})) {
    const file = safeResolve(root, rel, `records.${key}`, out);
    if (!file) continue;
    const rec = readJson(file, `records.${key}`, out);
    if (!rec) continue;
    records[key] = { rel, value: rec };

    const wantType = RECORD_TYPE_FOR[key];
    if (!wantType) { out.push(`records.${key}: not one of the seven records`); continue; }
    if (rec.record_type !== wantType) {
      out.push(`records.${key}: record_type must be ${wantType}, got ${JSON.stringify(rec.record_type)}`);
    }
    if (rec.block_id !== manifest.block_id) {
      out.push(`records.${key}: block_id ${JSON.stringify(rec.block_id)} disagrees with the manifest`);
    }
    if (rec.version !== manifest.version) {
      out.push(`records.${key}: version ${JSON.stringify(rec.version)} disagrees with the manifest`);
    }
    if (rec.capability_id !== manifest.capability_id) {
      out.push(`records.${key}: capability_id disagrees with the manifest`);
    }
  }

  // 3. No orphan records. A record file on disk that the manifest does not link
  //    is invisible to every consumer - the classic silent-skip shape.
  const recordsDir = join(root, 'records');
  if (existsSync(recordsDir)) {
    const declared = new Set(Object.values(manifest.records ?? {}).map((p) => basename(p)));
    for (const entry of readdirSync(recordsDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith('.json') && !declared.has(entry.name)) {
        out.push(`records/${entry.name}: present on disk but not linked from the manifest (orphan record)`);
      }
    }
  }

  // 4. The links object makes record integrity checkable. Every record must
  //    point back at the manifest and at its six siblings, by a path that
  //    actually resolves. This is what the pair proved and v2 keeps.
  for (const [key, { rel, value }] of Object.entries(records)) {
    const links = value.links;
    if (typeOf(links) !== 'object') { out.push(`records.${key}.links: missing`); continue; }
    if (links.manifest !== '../actionist-block.json') {
      out.push(`records.${key}.links.manifest: must be "../actionist-block.json"`);
    }
    const recDir = dirname(resolve(root, rel));
    for (const sibling of Object.keys(RECORD_TYPE_FOR)) {
      if (sibling === key) continue;
      const link = links[sibling];
      if (typeof link !== 'string') {
        out.push(`records.${key}.links.${sibling}: missing link to sibling record`);
        continue;
      }
      const target = resolve(recDir, link);
      if (!existsSync(target) || !lstatSync(target).isFile()) {
        out.push(`records.${key}.links.${sibling}: does not resolve: ${link}`);
      }
    }
  }

  // 5. Referenced files exist (interfaces, config, fixture, theme, runbook).
  for (const [label, rel] of [
    ['interfaces.host_binding', manifest.interfaces?.host_binding],
    ['interfaces.host_binding_schema', manifest.interfaces?.host_binding_schema],
    ['configuration.schema', manifest.configuration?.schema],
    ['configuration.example', manifest.configuration?.example],
    ['fixture.host', manifest.fixture?.host],
    ['fixture.config', manifest.fixture?.config],
    ['theme.bridge', manifest.theme?.bridge],
    ['runbook', manifest.runbook],
  ]) {
    if (typeof rel === 'string') safeResolve(root, rel, label, out);
  }

  // 6. Secrets are references only, never values. Scan the whole block, not
  //    just the manifest: a secret in a fixture is still a secret in the repo.
  const files = walkBlock(root, out);
  const ABS_PATH = /(?:^|[\s"'(])\/(?:Users|home|Volumes|private\/(?:var|tmp|etc))\//;
  // The character classes here allow hyphens and underscores INSIDE the token
  // body. An earlier form used [A-Za-z0-9]{20,}, which failed to match
  // "sk-live-AKIA..." because the hyphen at offset 8 ended the run - a real
  // secret walked past the scanner. Caught by prove.mjs, not by reading.
  const SECRET_LITERAL = /(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9_-]{20,}|github_pat_[A-Za-z0-9_-]{20,}|xox[baprs]-[A-Za-z0-9_-]{10,}|AKIA[A-Z0-9]{16}|eyJ[A-Za-z0-9_-]{20,}\.|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
  for (const file of files) {
    const relPath = relative(root, file);
    const bytes = readFileSync(file);
    if (bytes.includes(0)) { out.push(`${relPath}: binary file inside a block is refused`); continue; }
    const text = bytes.toString('utf8');
    if (ABS_PATH.test(text)) out.push(`${relPath}: contains an absolute client path`);
    if (SECRET_LITERAL.test(text)) out.push(`${relPath}: contains a secret-shaped literal`);
  }

  // 7. Any field whose NAME says it carries a secret must hold a secret-ref.
  const walkSecretRefs = (node, path) => {
    if (Array.isArray(node)) { node.forEach((v, i) => walkSecretRefs(v, `${path}[${i}]`)); return; }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walkSecretRefs(v, `${path}.${k}`);
      return;
    }
    const key = path.split('.').pop() ?? '';
    if (/(?:secret|credential|assertion|token|password)_?ref$/i.test(key)) {
      if (typeof node !== 'string' || !SECRET_REF.test(node)) {
        out.push(`${path}: a *_ref field must hold ^secret-ref:[A-Z0-9_]+$, got ${JSON.stringify(node)}`);
      }
    }
    if (/^(?:secret|password|private_key|access_token)$/i.test(key)) {
      out.push(`${path}: a bare secret-valued field name is refused; use a *_ref`);
    }
  };
  walkSecretRefs(manifest, 'manifest');
  for (const [key, { value }] of Object.entries(records)) walkSecretRefs(value, `records.${key}`);

  // Config and fixture files carry *_ref fields too, and a credential inlined
  // there is just as published as one in the manifest. Scanning only the
  // manifest and records left exactly that gap, which prove.mjs found.
  for (const [label, rel] of [
    ['configuration.example', manifest.configuration?.example],
    ['configuration.schema', manifest.configuration?.schema],
    ['fixture.host', manifest.fixture?.host],
    ['fixture.config', manifest.fixture?.config],
  ]) {
    if (typeof rel !== 'string') continue;
    const file = resolve(root, rel);
    if (!existsSync(file) || !lstatSync(file).isFile()) continue; // already reported above
    const parsed = readJson(file, label, out);
    if (parsed) walkSecretRefs(parsed, label);
  }

  // 8. Unfilled scaffold markers. `minLength: 1` is satisfied by the string
  //    "TODO: ...", so a scaffolded block would otherwise validate while every
  //    prose field is still a placeholder - a gate passing an empty block is
  //    exactly the silent allow R8 names.
  const walkTodos = (node, path) => {
    if (Array.isArray(node)) { node.forEach((v, i) => walkTodos(v, `${path}[${i}]`)); return; }
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walkTodos(v, `${path}.${k}`);
      return;
    }
    if (typeof node === 'string' && /^TODO\b/.test(node.trim())) {
      out.push(`${path}: still an unfilled scaffold placeholder (${JSON.stringify(node)})`);
    }
  };
  walkTodos(manifest, 'manifest');
  for (const [key, { value }] of Object.entries(records)) walkTodos(value, `records.${key}`);

  // 9. Lifecycle agreement. The manifest may not claim a state its own registry
  //    record contradicts - the manifest is a projection, not a second opinion.
  const registry = records.registry?.value;
  if (registry && manifest.lifecycle) {
    for (const axis of ['admission_status', 'proof_status', 'source_reusability', 'adaptation_status']) {
      const inRecord = registry.lifecycle?.[axis];
      if (inRecord !== undefined && inRecord !== manifest.lifecycle[axis]) {
        out.push(`lifecycle.${axis}: manifest says ${JSON.stringify(manifest.lifecycle[axis])} but records/registry says ${JSON.stringify(inRecord)}`);
      }
    }
  }

  return {
    block: name,
    violations: out,
    counts: {
      // Re-derived here, never read from a field that claims them (R5).
      records: Object.keys(records).length,
      files_scanned: files.length,
      negative_fixtures: manifest.verification?.negative_fixtures?.length ?? 0,
      holds_open: (manifest.holds ?? []).filter((h) => h.status === 'OPEN').length,
    },
  };
}

// ---------------------------------------------------------------------------

function main() {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error('usage: validate-block.mjs <block-directory> [...]');
    process.exit(2);
  }
  if (!existsSync(SCHEMA_PATH)) {
    console.error(`BLOCKED: meta-schema missing at ${SCHEMA_PATH}`);
    process.exit(2);
  }
  const schema = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));

  let failed = 0;
  for (const target of targets) {
    const { block, violations, counts } = validateBlock(target, schema);
    if (violations.length === 0) {
      console.log(`PASS  ${block}  records=${counts.records} files=${counts.files_scanned} negative_fixtures=${counts.negative_fixtures} open_holds=${counts.holds_open}`);
    } else {
      failed++;
      console.log(`FAIL  ${block}  ${violations.length} violation(s)`);
      for (const v of violations) console.log(`        ${v}`);
    }
  }
  process.exit(failed === 0 ? 0 : 1);
}

main();
