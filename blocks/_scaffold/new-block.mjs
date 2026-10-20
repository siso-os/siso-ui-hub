#!/usr/bin/env node
//
// Scaffold a new Actionist block in the v2 grammar.
//
// This exists so block #3 cannot invent a third convention. Blocks #1 and #2 were
// authored independently and produced two disjoint manifest schemas, two id field
// names and two admission vocabularies - which is what blocked a catalog. The fix
// is not a document telling the next author to be careful; it is a generator that
// emits the only shape the validator accepts.
//
// What it emits is deliberately INCOMPLETE and deliberately HONEST:
//   - lifecycle starts at discovered/unplanned/unexecuted/not_considered, the
//     floor of every axis. A new block has proven nothing, and its manifest says so.
//   - every prose field is a TODO marker that the validator's minLength rejects
//     if left as an empty string, and that a human must replace with something true.
//   - it will NOT pass validation until the author fills it in. That is the point:
//     a scaffold that validates while still empty teaches the author that the gate
//     is decorative.
//
// Usage: new-block.mjs <namespace/name> [--dir <blocks-dir>] [--display "Name"]

import { mkdirSync, writeFileSync, existsSync, cpSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const BLOCKS_DEFAULT = resolve(HERE, '..');

const TODO = (what) => `TODO: ${what}`;

const P04_REUSE_SHAPES = [
  'intact_service',
  'intact_fork',
  'embedded_module',
  'transplant',
  'extracted_package',
  'adapter',
  'generated_from_pattern',
  'template',
  'custom_delta',
  'reference_only',
];

const DECISION_INPUTS = ['source', 'rights', 'host', 'tenancy', 'data', 'lifecycle', 'evidence'];
const UNDECIDED_SHAPE = TODO('select one P04 architecture shape through shape_decision; there is no default');
const UNDECIDED_RIGHTS = TODO('project the separately selected P04 rights exposure only through an exact crosswalk');
const UNDECIDED_MOUNT = TODO('select a mount topology after the architecture and host inputs are known');

const RECORD_FILES = {
  capability: 'records/capability.json',
  packaging: 'records/packaging.json',
  host_requirements: 'records/host-requirements.json',
  binding_plan: 'records/binding-plan.json',
  qualification: 'records/qualification.json',
  registry: 'records/registry.json',
  release: 'records/release.json',
};

const RECORD_TYPES = {
  capability: 'CapabilityContract',
  packaging: 'PackagingProfile',
  host_requirements: 'HostContract',
  binding_plan: 'BindingPlan',
  qualification: 'QualificationDossier',
  registry: 'RegistryRecord',
  release: 'ReleaseManifest',
};

function manifestFor(blockId, version, displayName) {
  return {
    $schema: '../_schema/actionist-block.v2.schema.json',
    schema_version: 'actionist.block-manifest.v2',
    block_id: blockId,
    version,
    capability_id: blockId,
    display_name: displayName,
    outcome_statement: TODO('what a host user can DO once this block is bound. An outcome, not a feature list.'),
    authorization: {
      prototype: true,
      implementation_authorized: false,
    },
    lifecycle: {
      // The floor of every axis. A new block has proven nothing yet, and R3 says
      // breadth is not progress - a row on the shelf with no evidence is not an
      // advancement. Raise each axis only when a receipt supports it.
      source_reusability: 'discovered',
      adaptation_status: 'unplanned',
      proof_status: 'unexecuted',
      admission_status: 'not_considered',
      admission_scope: { tenants: [], applications: [], environments: [] },
    },
    reuse: {
      // FR-04: shape is an explicit decision, never a scaffold default. The
      // PackagingProfile carries the bounded capability, P04 architecture
      // shape, separate rights axis, maintenance model and rejected options.
      // Until the dedicated gate selects an exact v2 projection these TODOs
      // deliberately keep the scaffold invalid and every lifecycle axis low.
      shape: UNDECIDED_SHAPE,
      rights_exposure: UNDECIDED_RIGHTS,
      mount_topology: UNDECIDED_MOUNT,
      decision_packet: 'records/packaging.json',
      donor: {
        repository: TODO('donor repository URL'),
        immutable_revision: TODO('pinned commit sha or tag - never a floating branch'),
        source_digest: TODO('sha256:... of the pinned source'),
        source_digest_basis: TODO('how the digest was computed, e.g. git archive tar stream'),
        // R1: licence is metadata with ZERO selection weight. It is recorded
        // because rights matter at ADMISSION. Nothing may score on this field.
        license: TODO('licence as READ FROM THE LICENSE FILE, not from a badge'),
      },
      ownership: {
        donor_runtime: TODO('what the donor owns'),
        host_binding: TODO('what the host owns'),
      },
    },
    records: { ...RECORD_FILES },
    interfaces: {
      host_binding: 'interfaces/host-binding.ts',
      host_binding_schema: 'schemas/host-binding.schema.json',
    },
    configuration: {
      schema: 'schemas/config.schema.json',
      example: 'config/example.config.json',
      secret_policy: 'Only references are persisted; no credential value is written into this package.',
    },
    fixture: {
      host: 'fixtures/synthetic-host.json',
      purpose: 'Synthetic validation and binding generation only; no client data, no network, no donor-source action.',
    },
    commands: {
      validate: 'node tools/block.mjs validate',
      smoke: 'node tools/block.mjs smoke',
    },
    verification: {
      command: 'node tools/block.mjs smoke',
      required_evidence: ['manifest_parse', 'record_links', 'config_shape'],
      // R8: name at least one input this block REFUSES, with a stable refusal
      // code. A block that only lists positive checks is not verified - its
      // silence on bad input is indistinguishable from success.
      negative_fixtures: [
        { name: TODO('a bad input this block must refuse'), refusal_code: 'todo_refusal_code' },
      ],
    },
    holds: [
      {
        id: 'H-TODO',
        status: 'OPEN',
        statement: TODO('what is NOT proven about this block. Silence reads as proof; say it out loud.'),
        owner: TODO('who closes this'),
        next_gate: TODO('what would close it'),
      },
    ],
    source_boundary: {
      // Every one of these is pinned const:false in the schema. A block that
      // copied donor source, embedded a secret, hard-coded a client path or
      // performed a deployment CANNOT be spelled in this grammar.
      source_copied: false,
      donor_repository_vendored: false,
      secrets_embedded: false,
      absolute_client_paths_embedded: false,
      deployment_performed: false,
    },
  };
}

function shapeDecisionFor(blockId, version) {
  return {
    schema_version: 'actionist.reuse-decision.v1',
    decision_id: `reuse.${blockId.split('/')[1]}.v${version}`,
    capability_id: blockId,
    requested_disposition: 'HOLD',
    capability_boundary: {
      outcome_statement: TODO('bounded user outcome for this capability'),
      included_responsibilities: [TODO('one responsibility this capability owns')],
      excluded_responsibilities: [TODO('one adjacent responsibility this capability does not own')],
      authoritative_state_owner: TODO('host, donor, external system, or none'),
    },
    selection: {
      selected_shape: null,
      candidate_shapes: [...P04_REUSE_SHAPES],
      decision_authority: TODO('named authority who selects the reuse shape'),
    },
    rights_exposure: null,
    maintenance_model: null,
    inputs: Object.fromEntries(DECISION_INPUTS.map((name) => [name, {
      status: 'missing',
      summary: `${name} input has not been supplied.`,
      evidence_refs: [],
    }])),
    rejected_alternatives: [],
  };
}

function recordFor(key, blockId, version) {
  const links = { manifest: '../actionist-block.json' };
  for (const sibling of Object.keys(RECORD_FILES)) {
    if (sibling === key) continue;
    links[sibling] = RECORD_FILES[sibling].replace('records/', '');
  }
  const record = {
    record_type: RECORD_TYPES[key],
    record_version: '1.0.0',
    record_id: `${key}.${blockId.split('/')[1]}.v${version}`,
    block_id: blockId,
    version,
    capability_id: blockId,
    links,
    mutability_rule: TODO('when this record may change, and what a change forces to restart'),
  };
  if (key === 'packaging') {
    Object.assign(record, {
      reuse_shape: UNDECIDED_SHAPE,
      rights_exposure: UNDECIDED_RIGHTS,
      source_identity: {
        purl: TODO('source package URL bound to the immutable revision'),
        immutable_revision: TODO('40-character source commit'),
        source_digest: TODO('sha256:... content digest'),
        identity_status: 'NOT_CAPTURED',
      },
      rights_state: 'unknown',
      dependency_closure_state: 'unresolved',
      normalization_applied: [],
      upstream_sync_model: TODO('maintenance model selected by the decision packet'),
      mount_topology: UNDECIDED_MOUNT,
      shape_decision: shapeDecisionFor(blockId, version),
    });
  }
  return record;
}

function main() {
  const args = process.argv.slice(2);
  const blockId = args[0];
  const flag = (n) => { const i = args.indexOf(`--${n}`); return i === -1 ? null : args[i + 1]; };
  const blocksDir = resolve(flag('dir') ?? BLOCKS_DEFAULT);
  const version = flag('version') ?? '0.1.0';

  if (!blockId || !/^[a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9-]*$/.test(blockId)) {
    console.error('usage: new-block.mjs <namespace/name> [--dir <blocks-dir>] [--display "Name"] [--version 0.1.0]');
    console.error('  <namespace/name> must match ^[a-z0-9][a-z0-9-]*/[a-z0-9][a-z0-9-]*$ and carry NO @version.');
    console.error('  The namespace is open: "actionist" is the default, but a fork may carry its donor\'s namespace.');
    process.exit(2);
  }

  const name = blockId.split('/')[1];
  const display = flag('display') ?? name;
  const dir = join(blocksDir, name);
  if (existsSync(dir)) { console.error(`REFUSED: ${dir} already exists`); process.exit(1); }

  mkdirSync(join(dir, 'records'), { recursive: true });
  for (const sub of ['config', 'fixtures', 'schemas', 'interfaces', 'tools', 'tests']) {
    mkdirSync(join(dir, sub), { recursive: true });
  }

  writeFileSync(join(dir, 'actionist-block.json'), `${JSON.stringify(manifestFor(blockId, version, display), null, 2)}\n`);
  for (const [key, rel] of Object.entries(RECORD_FILES)) {
    writeFileSync(join(dir, rel), `${JSON.stringify(recordFor(key, blockId, version), null, 2)}\n`);
  }

  console.log(`Scaffolded ${blockId} at ${dir}`);
  console.log('');
  console.log('This block does NOT validate yet, on purpose. Fill in every TODO, then:');
  console.log('  Prepare the source-backed worker packet described in packages/ui/blocks/_factory/SOURCED-DECISIONS.md.');
  console.log('  Direct check: node packages/ui/blocks/_factory/verify-sourced-decision.mjs --input <packaging.json> --sources <source-lock.json> --repo <owner/name>=<checkout>');
  console.log('  The historical reuse-decision.mjs command checks structure only, not source bytes.');
  console.log(`  node packages/ui/blocks/_schema/validate-block.mjs ${dir}`);
  console.log('');
  console.log('A reuse decision may select planning only. It never qualifies, admits or releases the block.');
  console.log('Before raising any lifecycle axis above its floor, have a receipt for it (R3, R5).');
}

main();
