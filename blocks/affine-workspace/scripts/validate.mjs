import { createHash } from "node:crypto";
import { existsSync, lstatSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildBinding, packageRoot, readJson } from "./bind.mjs";
import {
  resolveEvidenceSource,
  PIN_OK,
  PIN_DIGEST_DRIFT,
  PIN_MISSING_ROW,
  PIN_AMBIGUOUS,
} from "../../_schema/evidence-pin.mjs";

export class ValidationError extends Error {
  constructor(message) {
    super(`VALIDATION_FAILED: ${message}`);
    this.name = "ValidationError";
  }
}

function fail(message) {
  throw new ValidationError(message);
}

function requireCondition(condition, message) {
  if (!condition) fail(message);
}

function packageFile(root, relativePath, label) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, `${label}:missing_ref`);
  requireCondition(!relativePath.startsWith("/") && !/^[A-Za-z]:[\\/]/.test(relativePath), `${label}:absolute_ref`);
  const target = resolve(root, relativePath);
  const fromRoot = relative(root, target);
  requireCondition(fromRoot !== ".." && !fromRoot.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`), `${label}:escapes_package`);
  requireCondition(existsSync(target) && lstatSync(target).isFile(), `${label}:missing_file:${relativePath}`);
  return target;
}

function referencedFile(root, relativePath, label) {
  requireCondition(typeof relativePath === "string" && relativePath.length > 0, `${label}:missing_ref`);
  requireCondition(!relativePath.startsWith("/") && !/^[A-Za-z]:[\\/]/.test(relativePath), `${label}:absolute_ref`);
  const target = resolve(root, relativePath);
  requireCondition(existsSync(target) && lstatSync(target).isFile(), `${label}:missing_file:${relativePath}`);
  return target;
}

function sha256File(filePath) {
  return createHash("sha256").update(readFileSync(filePath)).digest("hex");
}

function readPackageJson(root, relativePath, label) {
  return JSON.parse(readFileSync(packageFile(root, relativePath, label), "utf8"));
}

function assertHexDigest(value, label) {
  requireCondition(typeof value === "string" && /^sha256:[0-9a-f]{64}$/.test(value), `${label}:invalid_sha256`);
}

function assertOrigin(value, label) {
  requireCondition(typeof value === "string", `${label}:missing`);
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    fail(`${label}:invalid_url`);
  }
  requireCondition(/^https?:$/.test(parsed.protocol), `${label}:invalid_protocol`);
}

function validateConfig(root) {
  const schema = readPackageJson(root, "config/environment.schema.json", "config_schema");
  const example = readPackageJson(root, "config/example.json", "config_example");
  requireCondition(Array.isArray(schema.required), "config_schema:required_missing");
  for (const key of schema.required) requireCondition(Object.hasOwn(example, key), `config_example:missing:${key}`);
  const allowed = new Set(Object.keys(schema.properties));
  for (const key of Object.keys(example)) requireCondition(allowed.has(key), `config_example:unknown:${key}`);
  for (const key of ["hostOrigin", "frameOrigin", "serverOrigin", "companionOrigin"]) assertOrigin(example[key], `config_example:${key}`);
  requireCondition(/^secret-ref:[A-Z0-9_]+$/.test(example.sessionAssertionRef), "config_example:invalid_secret_ref");
  requireCondition(Number.isInteger(example.workspaceRevision) && example.workspaceRevision >= 1, "config_example:invalid_workspace_revision");
  requireCondition(typeof example.healthPath === "string" && example.healthPath.startsWith("/"), "config_example:invalid_health_path");
  return { schema, example };
}

function walkFiles(root, current = root, output = []) {
  for (const entry of readdirSync(current, { withFileTypes: true })) {
    if ([".git", "node_modules", "out"].includes(entry.name)) continue;
    const filePath = resolve(current, entry.name);
    if (entry.isDirectory()) walkFiles(root, filePath, output);
    else if (entry.isFile()) output.push(filePath);
  }
  return output;
}

function validateStaticBoundary(root, manifest) {
  const files = walkFiles(root);
  const absolutePathPattern = /(?:^|[\s"'(])\/(?:Users|home|private\/var)\/|(?:^|[\s"'(])[A-Za-z]:[\\/]/;
  const secretPattern = /(?:sk-[A-Za-z0-9]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|eyJ[A-Za-z0-9_-]{20,}\.)/;
  const forbiddenExtensions = new Set([".dmg", ".app", ".zip", ".tgz", ".tar", ".gz", ".exe", ".bin"]);
  for (const filePath of files) {
    requireCondition(!forbiddenExtensions.has(extname(filePath).toLowerCase()), `source_boundary:forbidden_artifact:${relative(root, filePath)}`);
    const bytes = readFileSync(filePath);
    if (bytes.includes(0)) continue;
    const text = bytes.toString("utf8");
    requireCondition(!absolutePathPattern.test(text), `source_boundary:absolute_path:${relative(root, filePath)}`);
    requireCondition(!secretPattern.test(text), `source_boundary:secret_pattern:${relative(root, filePath)}`);
  }
  for (const [key, value] of Object.entries(manifest.source_boundary ?? {})) {
    requireCondition(value === false, `source_boundary:${key}:must_be_false`);
  }
  return files.length;
}

function validateRecords(root, manifest) {
  const expected = {
    capability: "CapabilityContract",
    packaging: "PackagingProfile",
    host_requirements: "HostContract",
    binding_plan: "BindingPlan",
    qualification: "QualificationDossier",
    registry: "RegistryRecord",
    release: "ReleaseManifest",
  };
  const records = {};
  for (const [key, recordPath] of Object.entries(manifest.records ?? {})) {
    requireCondition(Object.hasOwn(expected, key), `records:unknown_key:${key}`);
    records[key] = readPackageJson(root, recordPath, `record:${key}`);
    requireCondition(records[key].record_type === expected[key], `record:${key}:wrong_type`);
    requireCondition(records[key].capability_id === manifest.capability_id, `record:${key}:capability_mismatch`);
    requireCondition(records[key].block_id === manifest.block_id, `record:${key}:block_mismatch`);
    requireCondition(records[key].version === manifest.version, `record:${key}:version_mismatch`);
  }
  requireCondition(Object.keys(records).length === 7, "records:seven_linked_records_required");
  requireCondition(records.qualification.evidence_tier === "T0", "record:qualification:unexpected_evidence_tier");
  assertHexDigest(records.qualification.artifact_digest, "record:qualification:artifact_digest");
  assertHexDigest(records.qualification.environment_digest, "record:qualification:environment_digest");
  requireCondition(records.registry.admission_status === "NOT_ADMITTED", "record:registry:admission_must_remain_not_admitted");
  requireCondition(records.release.status === "DRAFT", "record:release:release_must_remain_draft");
  return records;
}

function validateGeneratedBinding(binding, manifest, host) {
  requireCondition(binding && typeof binding === "object", "binding:missing_object");
  for (const key of ["schema_version", "binding_id", "capability_id", "application_id", "host_contract_version", "status", "ownership", "identity_binding", "workspace_binding", "routes", "navigation_contribution", "settings", "health", "files", "events", "observability"]) {
    requireCondition(Object.hasOwn(binding, key), `binding:missing:${key}`);
  }
  requireCondition(binding.schema_version === "actionist.affine.binding.v1", "binding:schema_version");
  requireCondition(binding.capability_id === manifest.capability_id, "binding:capability_mismatch");
  requireCondition(binding.application_id === host.application_id, "binding:application_mismatch");
  requireCondition(binding.status === "BOUND", "binding:status");
  requireCondition(binding.identity_binding.client_id === host.expected_client_id, "binding:identity_client");
  requireCondition(binding.identity_binding.user_id === host.identity.user_id, "binding:identity_user");
  requireCondition(binding.identity_binding.workspace_id === host.workspace.workspace_id, "binding:identity_workspace");
  requireCondition(binding.identity_binding.query_parameter_assertion === false, "binding:query_assertion_forbidden");
  requireCondition(binding.identity_binding.donor_login_route === "forbidden", "binding:donor_login_forbidden");
  const session = binding.identity_binding.session;
  requireCondition(/^secret-ref:[A-Z0-9_]+$/.test(session.assertion_ref), "binding:secret_ref");
  requireCondition(session.audience_bound === true && session.single_use === true, "binding:session_replay_contract");
  requireCondition(!Object.hasOwn(binding, "assertion"), "binding:runtime_assertion_must_not_be_persisted");
  requireCondition(!Object.hasOwn(binding.navigation_contribution, "position"), "binding:host_owns_nav_position");
  requireCondition(binding.routes.internal_router === "donor" && binding.routes.host_owns_url_space === true, "binding:url_ownership");
  requireCondition(binding.settings.policy === "REQUIRE_PARENTAL_CONSENT_FOR_ALLOWS", "binding:settings_policy");
  requireCondition(binding.settings.fallback === "donor-rendered-behind-host-nav", "binding:settings_fallback");
  requireCondition(binding.health.expected_status === 200 && binding.health.requires_session === true, "binding:health_contract");
  requireCondition(binding.files.owner === "donor" && binding.files.host_migration_owner === false, "binding:file_ownership");
  requireCondition(binding.events.exact_origin === host.host_origin, "binding:event_origin");
  requireCondition(binding.observability.capability_id === manifest.capability_id, "binding:observability_identity");
  let workspaceUrl;
  try {
    workspaceUrl = new URL(binding.routes.workspace_url);
  } catch {
    fail("binding:workspace_url_invalid");
  }
  requireCondition(workspaceUrl.origin === new URL(host.host_origin).origin, "binding:workspace_origin");
  requireCondition(workspaceUrl.pathname === host.routes.base_path, "binding:workspace_path");
  for (const forbidden of ["token", "access_token", "assertion", "password", "secret"]) {
    requireCondition(!workspaceUrl.searchParams.has(forbidden), `binding:workspace_query:${forbidden}_forbidden`);
  }
  const expected = buildBinding(manifest, host);
  requireCondition(binding.routes.workspace_url === expected.routes.workspace_url, "binding:workspace_route_not_deterministic");
  requireCondition(binding.routes.settings_url === expected.routes.settings_url, "binding:settings_route_not_deterministic");
  return true;
}

function validateEvidence(root, manifest, records) {
  const indexPath = referencedFile(root, manifest.evidence.index, "evidence_index");
  const currentInterpretationPath = referencedFile(root, manifest.evidence.current_interpretation, "current_interpretation");
  const index = JSON.parse(readFileSync(indexPath, "utf8"));
  requireCondition(index.schema_version === "actionist.affine.evidence-index.v2", "evidence_index:schema_version");
  requireCondition(index.path_basis === "repository-root-relative", "evidence_index:path_basis");
  requireCondition(Array.isArray(index.sources) && index.sources.length > 0, "evidence_index:sources_missing");
  const sourceIds = new Set();
  const repoRoot = resolve(root, manifest.evidence.repository_root ?? "../..");
  for (const source of index.sources) {
    requireCondition(!sourceIds.has(source.evidence_id), `evidence_index:duplicate:${source.evidence_id}`);
    sourceIds.add(source.evidence_id);
    requireCondition(typeof source.relative_path === "string" && !source.relative_path.startsWith("/"), `evidence_index:absolute_path:${source.evidence_id}`);
    const evidencePath = resolve(repoRoot, source.relative_path);
    requireCondition(existsSync(evidencePath) && lstatSync(evidencePath).isFile(), `evidence_index:missing:${source.evidence_id}`);

    // Dispatch on pin shape. A whole-file digest is still correct for artifacts
    // that do not grow; an append-only ledger needs a row selector, or every
    // unrelated append turns this block red. Each failure state is reported
    // DISTINCTLY: "the evidence is gone" and "the evidence changed" are
    // different facts, and collapsing them loses the one that matters.
    const pin = resolveEvidenceSource(evidencePath, source);
    switch (pin.state) {
      case PIN_OK:
        break;
      case PIN_DIGEST_DRIFT:
        fail(`evidence_index:hash_mismatch:${source.evidence_id}: ${pin.message}`);
        break;
      case PIN_MISSING_ROW:
        fail(`evidence_index:row_missing:${source.evidence_id}: ${pin.message}`);
        break;
      case PIN_AMBIGUOUS:
        fail(`evidence_index:row_ambiguous:${source.evidence_id}: ${pin.message}`);
        break;
      default:
        // No "unknown state -> continue" branch. An unclassifiable pin is loud.
        fail(`evidence_index:unresolvable:${source.evidence_id}: ${pin.message}`);
    }
  }
  for (const receipt of records.qualification.receipts ?? []) {
    requireCondition(sourceIds.has(receipt.evidence_ref), `qualification:missing_evidence_ref:${receipt.evidence_ref}`);
  }
  requireCondition(currentInterpretationPath, "current_interpretation:missing");
  return { index, currentInterpretationPath };
}

export function validatePackage({ root = packageRoot, bindingPath = null } = {}) {
  const manifest = readPackageJson(root, "actionist-block.json", "manifest");
  requireCondition(manifest.schema_version === "actionist.block-manifest.v2", "manifest:schema_version");
  requireCondition(manifest.block_id === manifest.capability_id, "manifest:block_capability_mismatch");
  requireCondition(!manifest.block_id.includes("@"), "manifest:identity_must_not_carry_version");
  requireCondition(typeof manifest.version === "string" && manifest.version.length > 0, "manifest:version_missing");
  requireCondition(manifest.reuse?.shape === "assimilated_package", "manifest:shape");
  requireCondition(manifest.reuse?.mount_profile === "host_mounted_assimilated", "manifest:mount_profile");
  requireCondition(manifest.reuse?.mount_topology === "same_document", "manifest:mount_topology");
  requireCondition(manifest.reuse?.binding_class === "B4", "manifest:binding_class");
  requireCondition(manifest.authorization?.prototype === true && manifest.authorization?.implementation_authorized === true, "manifest:prototype_authorization");
  requireCondition(manifest.lifecycle?.proof_status === "partial_local_proof", "manifest:execution_scope");
  requireCondition(manifest.lifecycle?.admission_status === "held_for_decision", "manifest:admission_scope");
  requireCondition(manifest.reuse?.data_authority?.postgres_schema === "knowledge", "manifest:data_authority");
  packageFile(root, manifest.interfaces.host_binding, "host_binding_interface");
  packageFile(root, manifest.interfaces.host_binding_schema, "host_binding_schema");
  packageFile(root, manifest.fixture.host, "fixture");
  validateConfig(root);
  const fixture = readPackageJson(root, manifest.fixture.host, "fixture");
  const records = validateRecords(root, manifest);
  const evidence = validateEvidence(root, manifest, records);
  const generated = buildBinding(manifest, fixture);
  validateGeneratedBinding(generated, manifest, fixture);
  if (bindingPath) {
    const persisted = JSON.parse(readFileSync(resolve(bindingPath), "utf8"));
    validateGeneratedBinding(persisted, manifest, fixture);
  } else if (existsSync(resolve(root, "binding.generated.json"))) {
    const persisted = JSON.parse(readFileSync(resolve(root, "binding.generated.json"), "utf8"));
    validateGeneratedBinding(persisted, manifest, fixture);
  }
  const fileCount = validateStaticBoundary(root, manifest);
  return {
    status: "PASS",
    block_id: manifest.block_id,
    records: Object.keys(records).length,
    evidence_sources: evidence.index.sources.length,
    package_files_checked: fileCount,
    source_copied: false,
    donor_repository_vendored: false,
    admission_status: "NOT_ADMITTED",
  };
}

function isMain() {
  return process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
}

if (isMain()) {
  try {
    const args = process.argv.slice(2);
    let bindingPath = null;
    for (let index = 0; index < args.length; index += 1) {
      if (args[index] === "--binding") {
        bindingPath = args[index + 1];
        index += 1;
      } else if (args[index] === "--help" || args[index] === "-h") {
        console.log("Usage: node scripts/validate.mjs [--binding <binding.generated.json>]");
        process.exit(0);
      } else {
        throw new Error(`Unknown argument: ${args[index]}`);
      }
    }
    console.log(JSON.stringify(validatePackage({ bindingPath }), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
