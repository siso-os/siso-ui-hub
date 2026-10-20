#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = resolve(HERE, '../_schema/reuse-decision.v1.schema.json');
const CROSSWALK_PATH = resolve(HERE, '../_schema/reuse-shape-crosswalk.v1.json');
const SCHEMA = JSON.parse(readFileSync(SCHEMA_PATH, 'utf8'));
const CROSSWALK_BYTES = readFileSync(CROSSWALK_PATH);
const CROSSWALK = JSON.parse(CROSSWALK_BYTES.toString('utf8'));

const SHAPES = new Set(SCHEMA.$defs.reuseShape.enum);
const RIGHTS_EXPOSURES = new Set(SCHEMA.properties.rights_exposure.enum.filter(Boolean));
const MAINTENANCE_MODELS = new Set(SCHEMA.properties.maintenance_model.enum.filter(Boolean));
const INPUT_NAMES = SCHEMA.$defs.decisionInputs.required;
const INPUT_STATUSES = new Set(SCHEMA.$defs.inputState.properties.status.enum);
const ROOT_KEYS = new Set(SCHEMA.required);
const SHAPE_CROSSWALK = new Map(CROSSWALK.architecture_shapes.map((entry) => [entry.p04_shape, entry]));
const RIGHTS_CROSSWALK = new Map(CROSSWALK.rights_exposures.map((entry) => [entry.p04_rights_exposure, entry]));
const CROSSWALK_SHA256 = `sha256:${createHash('sha256').update(CROSSWALK_BYTES).digest('hex')}`;

class GateError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const fail = (code, message) => { throw new GateError(code, message); };
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const isPlaceholder = (value) => typeof value === 'string' && /^TODO\b/.test(value.trim());

function stableValue(value) {
  if (Array.isArray(value)) return value.map(stableValue);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stableValue(value[key])]));
}

function stableDigest(value) {
  return `sha256:${createHash('sha256').update(JSON.stringify(stableValue(value))).digest('hex')}`;
}

function sortedStrings(value, field) {
  if (!Array.isArray(value)) fail('DECISION_INPUT_INVALID', `${field} must be an array`);
  const result = [];
  for (const item of value) {
    if (!isNonEmptyString(item)) fail('DECISION_INPUT_INVALID', `${field} must contain only non-empty strings`);
    result.push(item.trim());
  }
  return result.sort((left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right)));
}

function assertKnownKeys(value, allowed, field) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) fail('DECISION_INPUT_INVALID', `${field}.${key} is not part of the decision grammar`);
  }
}

function issue(code, field, reason) {
  return { code, field, reason };
}

function normalizeBoundary(value, holds, rejects) {
  if (!isObject(value)) {
    holds.push(issue('CAPABILITY_BOUNDARY_MISSING', 'capability_boundary', 'A bounded capability must be supplied before shape selection.'));
    return {
      outcome_statement: '',
      included_responsibilities: [],
      excluded_responsibilities: [],
      authoritative_state_owner: '',
    };
  }
  assertKnownKeys(value, new Set(Object.keys(SCHEMA.$defs.capabilityBoundary.properties)), 'capability_boundary');
  const outcome = isNonEmptyString(value.outcome_statement) && !isPlaceholder(value.outcome_statement) ? value.outcome_statement.trim() : '';
  const included = sortedStrings(value.included_responsibilities ?? [], 'capability_boundary.included_responsibilities')
    .filter((item) => !isPlaceholder(item));
  const excluded = sortedStrings(value.excluded_responsibilities ?? [], 'capability_boundary.excluded_responsibilities')
    .filter((item) => !isPlaceholder(item));
  const owner = isNonEmptyString(value.authoritative_state_owner) && !isPlaceholder(value.authoritative_state_owner)
    ? value.authoritative_state_owner.trim()
    : '';
  if (!outcome) holds.push(issue('CAPABILITY_OUTCOME_MISSING', 'capability_boundary.outcome_statement', 'The user-visible outcome is not bounded.'));
  if (included.length === 0) holds.push(issue('CAPABILITY_INCLUDED_SCOPE_MISSING', 'capability_boundary.included_responsibilities', 'At least one included responsibility is required.'));
  if (excluded.length === 0) holds.push(issue('CAPABILITY_EXCLUDED_SCOPE_MISSING', 'capability_boundary.excluded_responsibilities', 'At least one excluded responsibility is required.'));
  if (!owner) holds.push(issue('CAPABILITY_STATE_OWNER_MISSING', 'capability_boundary.authoritative_state_owner', 'The authoritative state owner is not named.'));
  const overlap = included.filter((item) => excluded.includes(item));
  if (overlap.length > 0) {
    rejects.push(issue('CAPABILITY_BOUNDARY_OVERLAP', 'capability_boundary', `Included and excluded responsibilities overlap: ${overlap.join(', ')}`));
  }
  return {
    outcome_statement: outcome,
    included_responsibilities: included,
    excluded_responsibilities: excluded,
    authoritative_state_owner: owner,
  };
}

function normalizeInputState(name, value, holds, rejects) {
  if (value === undefined) {
    holds.push(issue(`${name.toUpperCase()}_MISSING`, `inputs.${name}`, `${name} input was not supplied.`));
    return { status: 'missing', summary: 'Not supplied.', evidence_refs: [] };
  }
  if (!isObject(value)) fail('DECISION_INPUT_INVALID', `inputs.${name} must be an object`);
  assertKnownKeys(value, new Set(Object.keys(SCHEMA.$defs.inputState.properties)), `inputs.${name}`);
  const status = value.status;
  if (!INPUT_STATUSES.has(status)) fail('DECISION_INPUT_INVALID', `inputs.${name}.status is unsupported`);
  const summary = typeof value.summary === 'string' ? value.summary.trim() : '';
  const evidenceRefs = sortedStrings(value.evidence_refs ?? [], `inputs.${name}.evidence_refs`)
    .filter((item) => !isPlaceholder(item));
  if (status === 'missing') {
    holds.push(issue(`${name.toUpperCase()}_MISSING`, `inputs.${name}`, summary || `${name} input is missing.`));
  } else if (status === 'ambiguous') {
    holds.push(issue(`${name.toUpperCase()}_AMBIGUOUS`, `inputs.${name}`, summary || `${name} input is ambiguous.`));
  } else if (status === 'incompatible') {
    rejects.push(issue(`${name.toUpperCase()}_INCOMPATIBLE`, `inputs.${name}`, summary || `${name} input is incompatible.`));
  } else if (status === 'known' && evidenceRefs.length === 0) {
    holds.push(issue(`${name.toUpperCase()}_EVIDENCE_MISSING`, `inputs.${name}.evidence_refs`, `Known ${name} input has no evidence reference.`));
  } else if (status === 'not_applicable' && !summary) {
    holds.push(issue(`${name.toUpperCase()}_NOT_APPLICABLE_UNJUSTIFIED`, `inputs.${name}.summary`, `Not-applicable ${name} input needs a justification.`));
  }
  return { status, summary, evidence_refs: evidenceRefs };
}

function normalizeAlternatives(value, selectedShape, holds, rejects) {
  if (!Array.isArray(value)) fail('DECISION_INPUT_INVALID', 'rejected_alternatives must be an array');
  if (value.length === 0) {
    holds.push(issue('REJECTED_ALTERNATIVES_MISSING', 'rejected_alternatives', 'A shape with no recorded alternatives is an unnoticed default, not a decision.'));
  }
  const seen = new Set();
  const alternatives = value.map((entry, index) => {
    if (!isObject(entry)) fail('DECISION_INPUT_INVALID', `rejected_alternatives[${index}] must be an object`);
    assertKnownKeys(entry, new Set(Object.keys(SCHEMA.$defs.rejectedAlternative.properties)), `rejected_alternatives[${index}]`);
    const shape = entry.shape;
    if (!SHAPES.has(shape)) rejects.push(issue('REJECTED_ALTERNATIVE_SHAPE_UNSUPPORTED', `rejected_alternatives[${index}].shape`, `Unsupported alternative ${JSON.stringify(shape)}.`));
    if (seen.has(shape)) rejects.push(issue('REJECTED_ALTERNATIVE_DUPLICATE', `rejected_alternatives[${index}].shape`, `Alternative ${JSON.stringify(shape)} is duplicated.`));
    seen.add(shape);
    const reason = isNonEmptyString(entry.reason) && !isPlaceholder(entry.reason) ? entry.reason.trim() : '';
    const evidenceRefs = sortedStrings(entry.evidence_refs ?? [], `rejected_alternatives[${index}].evidence_refs`)
      .filter((item) => !isPlaceholder(item));
    if (!reason) holds.push(issue('REJECTED_ALTERNATIVE_REASON_MISSING', `rejected_alternatives[${index}].reason`, 'Every rejected alternative needs a reason.'));
    if (evidenceRefs.length === 0) holds.push(issue('REJECTED_ALTERNATIVE_EVIDENCE_MISSING', `rejected_alternatives[${index}].evidence_refs`, 'Every rejected alternative needs evidence.'));
    if (selectedShape && shape === selectedShape) {
      rejects.push(issue('SELECTED_SHAPE_REJECTED', 'selection.selected_shape', `Selected shape ${shape} is also recorded as rejected.`));
    }
    return { shape, reason, evidence_refs: evidenceRefs };
  });
  return alternatives.sort((left, right) => Buffer.compare(Buffer.from(String(left.shape)), Buffer.from(String(right.shape))));
}

function evaluateDecision(document) {
  const packaging = document?.record_type === 'PackagingProfile' ? document : null;
  const packet = packaging?.shape_decision ?? document;
  if (!isObject(packet)) fail('DECISION_INPUT_INVALID', 'input must be a decision packet or PackagingProfile with shape_decision');
  assertKnownKeys(packet, ROOT_KEYS, 'decision');
  if (packet.schema_version !== SCHEMA.properties.schema_version.const) {
    fail('DECISION_INPUT_INVALID', `schema_version must be ${SCHEMA.properties.schema_version.const}`);
  }
  if (!isNonEmptyString(packet.decision_id)) fail('DECISION_INPUT_INVALID', 'decision_id is required');
  if (!isNonEmptyString(packet.capability_id) || !new RegExp(SCHEMA.properties.capability_id.pattern).test(packet.capability_id)) {
    fail('DECISION_INPUT_INVALID', 'capability_id must be namespace/name');
  }

  const holds = [];
  const rejects = [];
  if (packet.requested_disposition === 'HOLD') {
    holds.push(issue('OPERATOR_HOLD', 'requested_disposition', 'The packet explicitly requests HOLD.'));
  } else if (packet.requested_disposition !== 'EVALUATE') {
    fail('DECISION_INPUT_INVALID', 'requested_disposition must be EVALUATE or HOLD');
  }

  const capabilityBoundary = normalizeBoundary(packet.capability_boundary, holds, rejects);
  const selection = isObject(packet.selection) ? packet.selection : {};
  assertKnownKeys(selection, new Set(Object.keys(SCHEMA.$defs.selection.properties)), 'selection');
  const candidateShapes = sortedStrings(selection.candidate_shapes ?? [], 'selection.candidate_shapes');
  const uniqueCandidates = new Set(candidateShapes);
  if (candidateShapes.length === 0) holds.push(issue('CANDIDATE_SHAPES_MISSING', 'selection.candidate_shapes', 'No architecture shape candidates were supplied.'));
  if (uniqueCandidates.size !== candidateShapes.length) rejects.push(issue('CANDIDATE_SHAPE_DUPLICATE', 'selection.candidate_shapes', 'Candidate shapes must be unique.'));
  for (const shape of uniqueCandidates) {
    if (!SHAPES.has(shape)) rejects.push(issue('CANDIDATE_SHAPE_UNSUPPORTED', 'selection.candidate_shapes', `Unsupported candidate ${JSON.stringify(shape)}.`));
  }
  const selectedShape = selection.selected_shape ?? null;
  if (selectedShape !== null && !SHAPES.has(selectedShape)) {
    rejects.push(issue('SHAPE_UNSUPPORTED', 'selection.selected_shape', `Unsupported selected shape ${JSON.stringify(selectedShape)}.`));
  } else if (selectedShape === null) {
    holds.push(issue(candidateShapes.length > 1 ? 'SHAPE_AMBIGUOUS' : 'SHAPE_NOT_SELECTED', 'selection.selected_shape', 'One P04 architecture shape must be explicitly selected by the named authority.'));
  } else if (!uniqueCandidates.has(selectedShape)) {
    rejects.push(issue('SELECTED_SHAPE_NOT_CANDIDATE', 'selection.selected_shape', `Selected shape ${selectedShape} is absent from candidate_shapes.`));
  }
  const decisionAuthority = isNonEmptyString(selection.decision_authority) && !isPlaceholder(selection.decision_authority)
    ? selection.decision_authority.trim()
    : '';
  if (!decisionAuthority) holds.push(issue('DECISION_AUTHORITY_MISSING', 'selection.decision_authority', 'Reuse shape requires a named decision authority.'));

  const rightsExposure = packet.rights_exposure ?? null;
  if (rightsExposure === null) holds.push(issue('RIGHTS_EXPOSURE_MISSING', 'rights_exposure', 'The source-copying axis is not selected.'));
  else if (!RIGHTS_EXPOSURES.has(rightsExposure)) rejects.push(issue('RIGHTS_EXPOSURE_UNSUPPORTED', 'rights_exposure', `Unsupported rights exposure ${JSON.stringify(rightsExposure)}.`));
  const maintenanceModel = packet.maintenance_model ?? null;
  if (maintenanceModel === null) holds.push(issue('MAINTENANCE_MODEL_MISSING', 'maintenance_model', 'The upstream maintenance model is not selected.'));
  else if (!MAINTENANCE_MODELS.has(maintenanceModel)) rejects.push(issue('MAINTENANCE_MODEL_UNSUPPORTED', 'maintenance_model', `Unsupported maintenance model ${JSON.stringify(maintenanceModel)}.`));

  const rawInputs = packet.inputs === undefined ? {} : packet.inputs;
  if (!isObject(rawInputs)) fail('DECISION_INPUT_INVALID', 'inputs must be an object');
  assertKnownKeys(rawInputs, new Set(INPUT_NAMES), 'inputs');
  const inputs = {};
  for (const name of INPUT_NAMES) inputs[name] = normalizeInputState(name, rawInputs[name], holds, rejects);
  const rejectedAlternatives = normalizeAlternatives(packet.rejected_alternatives ?? [], selectedShape, holds, rejects);

  const shapeCrosswalk = selectedShape ? SHAPE_CROSSWALK.get(selectedShape) : null;
  if (selectedShape && !shapeCrosswalk) {
    rejects.push(issue('SHAPE_CROSSWALK_MISSING', 'selection.selected_shape', `No source-backed crosswalk row exists for ${selectedShape}.`));
  } else if (shapeCrosswalk?.manifest_v2_shape === null) {
    holds.push(issue('MANIFEST_SHAPE_UNMAPPED', 'selection.selected_shape', `${selectedShape} has no exact actionist.block-manifest.v2 projection.`));
  }
  const rightsCrosswalk = rightsExposure ? RIGHTS_CROSSWALK.get(rightsExposure) : null;
  if (rightsExposure && !rightsCrosswalk) {
    rejects.push(issue('RIGHTS_CROSSWALK_MISSING', 'rights_exposure', `No source-backed crosswalk row exists for ${rightsExposure}.`));
  } else if (rightsCrosswalk?.manifest_v2_rights_exposure === null) {
    holds.push(issue('MANIFEST_RIGHTS_UNMAPPED', 'rights_exposure', `${rightsExposure} has no exact actionist.block-manifest.v2 projection.`));
  }

  if (packaging && shapeCrosswalk?.manifest_v2_shape && packaging.reuse_shape !== shapeCrosswalk.manifest_v2_shape) {
    rejects.push(issue('PACKAGING_SHAPE_PROJECTION_MISMATCH', 'reuse_shape', `PackagingProfile says ${JSON.stringify(packaging.reuse_shape)}; exact projection is ${shapeCrosswalk.manifest_v2_shape}.`));
  }
  if (packaging && rightsCrosswalk?.manifest_v2_rights_exposure && packaging.rights_exposure !== rightsCrosswalk.manifest_v2_rights_exposure) {
    rejects.push(issue('PACKAGING_RIGHTS_PROJECTION_MISMATCH', 'rights_exposure', `PackagingProfile says ${JSON.stringify(packaging.rights_exposure)}; exact projection is ${rightsCrosswalk.manifest_v2_rights_exposure}.`));
  }
  if (packaging && maintenanceModel && packaging.upstream_sync_model !== maintenanceModel) {
    rejects.push(issue('PACKAGING_MAINTENANCE_MISMATCH', 'upstream_sync_model', `PackagingProfile says ${JSON.stringify(packaging.upstream_sync_model)}; decision says ${maintenanceModel}.`));
  }

  const issueOrder = (left, right) => Buffer.compare(
    Buffer.from(`${left.code}\0${left.field}`),
    Buffer.from(`${right.code}\0${right.field}`),
  );
  holds.sort(issueOrder);
  rejects.sort(issueOrder);
  const normalizedPacket = {
    schema_version: packet.schema_version,
    decision_id: packet.decision_id.trim(),
    capability_id: packet.capability_id.trim(),
    requested_disposition: packet.requested_disposition,
    capability_boundary: capabilityBoundary,
    selection: {
      selected_shape: selectedShape,
      candidate_shapes: candidateShapes,
      decision_authority: decisionAuthority,
    },
    rights_exposure: rightsExposure,
    maintenance_model: maintenanceModel,
    inputs,
    rejected_alternatives: rejectedAlternatives,
  };
  const inputDigest = stableDigest(normalizedPacket);
  const decisionStatus = rejects.length > 0 ? 'REJECT' : holds.length > 0 ? 'HOLD' : 'SELECTED_FOR_PLANNING';
  return {
    schema_version: 'actionist.reuse-decision-receipt.v1',
    receipt_id: `reuse-decision.${inputDigest.slice('sha256:'.length, 'sha256:'.length + 16)}`,
    decision_id: normalizedPacket.decision_id,
    capability_id: normalizedPacket.capability_id,
    input_digest: inputDigest,
    crosswalk: {
      schema_version: CROSSWALK.schema_version,
      sha256: CROSSWALK_SHA256,
      p04_shape: selectedShape,
      canonical_synthesis_shape: shapeCrosswalk?.canonical_synthesis_shape ?? null,
      manifest_v2_shape: shapeCrosswalk?.manifest_v2_shape ?? null,
      manifest_v2_shape_relation: shapeCrosswalk?.manifest_relation ?? null,
      p04_rights_exposure: rightsExposure,
      manifest_v2_rights_exposure: rightsCrosswalk?.manifest_v2_rights_exposure ?? null,
      manifest_v2_rights_relation: rightsCrosswalk?.manifest_relation ?? null,
    },
    decision_status: decisionStatus,
    capability_boundary: capabilityBoundary,
    maintenance_model: maintenanceModel,
    rejected_alternatives: rejectedAlternatives,
    holds,
    rejects,
    claims: {
      planning_selection_only: decisionStatus === 'SELECTED_FOR_PLANNING',
      qualification: 'NOT_QUALIFIED',
      admission: 'NOT_ADMITTED',
      release: 'NOT_RELEASED',
      implementation_authorized: false,
    },
  };
}

function parseArgs(argv) {
  if (argv.length === 1 && argv[0] === '--help') {
    process.stdout.write('usage: reuse-decision.mjs --input <decision-packet-or-packaging-profile.json>\n');
    return null;
  }
  if (argv.length !== 2 || argv[0] !== '--input' || !argv[1]) {
    fail('ARGUMENT_INVALID', 'usage: reuse-decision.mjs --input <decision-packet-or-packaging-profile.json>');
  }
  return resolve(argv[1]);
}

function main() {
  try {
    const inputPath = parseArgs(process.argv.slice(2));
    if (inputPath === null) return;
    let document;
    try { document = JSON.parse(readFileSync(inputPath, 'utf8')); }
    catch (error) { fail('DECISION_INPUT_UNREADABLE', error.message); }
    const receipt = evaluateDecision(document);
    process.stdout.write(`${JSON.stringify(receipt, null, 2)}\n`);
    if (receipt.decision_status !== 'SELECTED_FOR_PLANNING') process.exitCode = 1;
  } catch (error) {
    const code = error instanceof GateError ? error.code : 'DECISION_INTERNAL_ERROR';
    process.stderr.write(`${JSON.stringify({ status: 'REJECT', code, message: error.message })}\n`);
    process.exitCode = 2;
  }
}

export { CROSSWALK, SCHEMA, evaluateDecision };

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
