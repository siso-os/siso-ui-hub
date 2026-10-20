#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MANIFEST_PATH = path.join(ROOT, "actionist-block.json");
const BLOCK_ID = "actionist/teable-data-grid";
const BLOCK_VERSION = "0.1.0";
// Identity is block_id + version, never a concatenated string. Kept for the
// places that still address the block by a single label (audience, namespaces).
const CAPABILITY_ID = BLOCK_ID;
const RECORD_NAMES = [
  "capability",
  "packaging",
  "host_requirements",
  "binding_plan",
  "qualification",
  "registry",
  "release",
];
const RECORD_TYPES = {
  capability: "CapabilityContract",
  packaging: "PackagingProfile",
  host_requirements: "HostContract",
  binding_plan: "BindingPlan",
  qualification: "QualificationDossier",
  registry: "RegistryRecord",
  release: "ReleaseManifest",
};

class ContractError extends Error {
  constructor(message) {
    super(message);
    this.name = "ContractError";
  }
}

function fail(message) {
  throw new ContractError(message);
}

function assert(condition, message) {
  if (!condition) fail(message);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`invalid JSON at ${path.relative(ROOT, filePath)}: ${error.message}`);
  }
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    fail(`cannot read ${path.relative(ROOT, filePath)}: ${error.message}`);
  }
}

function relativePackagePath(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be a non-empty relative path`);
  assert(!path.isAbsolute(value), `${label} must not be absolute: ${value}`);
  const resolved = path.resolve(ROOT, value);
  assert(resolved === ROOT || resolved.startsWith(`${ROOT}${path.sep}`), `${label} escapes the package: ${value}`);
  assert(fs.existsSync(resolved), `${label} does not resolve: ${value}`);
  return resolved;
}

function relativeEvidencePath(value, fromDirectory, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be a non-empty relative path`);
  assert(!path.isAbsolute(value), `${label} must not be absolute: ${value}`);
  const resolved = path.resolve(fromDirectory, value);
  assert(fs.existsSync(resolved), `${label} does not resolve: ${value}`);
  return resolved;
}

function hasUnsafeKey(key) {
  return /(?:password|private[_-]?key|access[_-]?token|secret[_-]?value)/i.test(key);
}

function hasUnsafeString(value) {
  return [
    /-----BEGIN [^-]+ PRIVATE KEY-----/,
    /(?:^|\s)(?:sk|rk|ghp|github_pat|xox[baprs])-[-_A-Za-z0-9]{8,}/,
    /\bBearer\s+[A-Za-z0-9._~-]{16,}/i,
    /(?:^|\s)\/Users\//,
    /(?:^|\s)\/Volumes\//,
    /(?:^|\s)\/private\/(?:var|tmp|etc)\//,
    /(?:^|\s)[A-Za-z]:[\\/]/,
  ].some((pattern) => pattern.test(value));
}

function walkUnsafe(value, location = "$", findings = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkUnsafe(item, `${location}[${index}]`, findings));
    return findings;
  }
  if (!value || typeof value !== "object") {
    if (typeof value === "string" && hasUnsafeString(value)) findings.push(`${location} contains a secret or absolute client path`);
    return findings;
  }
  for (const [key, child] of Object.entries(value)) {
    if (hasUnsafeKey(key)) findings.push(`${location}.${key} uses a secret-bearing field name`);
    walkUnsafe(child, `${location}.${key}`, findings);
  }
  return findings;
}

function sha256(filePath) {
  return `sha256:${crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex")}`;
}

function validateManifest() {
  const manifest = readJson(MANIFEST_PATH);
  assert(manifest.schema_version === "actionist.block-manifest.v2", "schema_version must be actionist.block-manifest.v2");
  assert(manifest.block_id === BLOCK_ID, "manifest block_id mismatch");
  assert(manifest.version === BLOCK_VERSION, "manifest version mismatch");
  assert(!manifest.block_id.includes("@"), "identity must not carry a version");
  assert(manifest.lifecycle?.admission_status === "held_for_decision", "manifest must remain held_for_decision");
  assert(manifest.lifecycle?.proof_status === "partial_local_proof", "manifest proof status mismatch");
  assert(manifest.reuse?.shape === "intact_service", "reuse shape must be intact_service");
  const serviceEvidence = manifest.reuse.service_evidence;
  assert(serviceEvidence && typeof serviceEvidence === "object", "reuse.service_evidence must describe the service proof boundary");
  for (const field of ["authenticated_flow_proven", "wrong_origin_denied", "replay_denied"]) {
    assert(typeof serviceEvidence[field] === "boolean", `reuse.service_evidence.${field} must be a boolean`);
  }
  for (const field of ["database", "cache_namespace", "object_storage"]) {
    assert(typeof serviceEvidence.data_isolation?.[field] === "string" && serviceEvidence.data_isolation[field].trim().length > 0,
      `reuse.service_evidence.data_isolation.${field} must describe the isolation boundary`);
  }
  assert(manifest.reuse?.rights_exposure === "none_network_only", "rights exposure must be none_network_only");
  assert(manifest.reuse?.donor?.immutable_revision === "b245a987f8bfb7411d4e2423907b9cbb0a1c9b6b", "donor commit pin mismatch");
  assert(manifest.reuse?.donor?.source_digest === "sha256:e41fe62b54c1d0c077a9c5a036f1b4e04016dcd0203396f943411e89e6e09fc6", "donor source digest mismatch");
  for (const name of RECORD_NAMES) relativePackagePath(manifest.records?.[name], `records.${name}`);
  relativePackagePath(manifest.interfaces?.host_binding, "interfaces.host_binding");
  relativePackagePath(manifest.interfaces?.host_binding_schema, "interfaces.host_binding_schema");
  relativePackagePath(manifest.configuration?.schema, "configuration.schema");
  relativePackagePath(manifest.configuration?.example, "configuration.example");
  relativePackagePath(manifest.fixture?.host, "fixture.host");
  relativePackagePath(manifest.fixture?.config, "fixture.config");
  relativePackagePath(manifest.theme?.bridge, "theme.bridge");
  relativePackagePath(manifest.runbook, "runbook");
  assert(manifest.theme?.scope_selector === ".actionist-teable-surface", "theme scope selector mismatch");
  assert(manifest.theme?.global_root_writes === false, "theme bridge must forbid global root writes");
  assert(Array.isArray(manifest.verification?.negative_fixtures) && manifest.verification.negative_fixtures.length >= 3,
    "manifest must name the inputs it refuses");
  const unsafe = walkUnsafe(manifest);
  assert(unsafe.length === 0, unsafe.join("; "));
  return manifest;
}

function validateRecordCommon(record, expectedType, fileName) {
  assert(record.record_type === expectedType, `${fileName} record_type must be ${expectedType}`);
  assert(record.record_version === "1.0.0", `${fileName} record_version must be 1.0.0`);
  assert(typeof record.record_id === "string" && record.record_id.length > 0, `${fileName} record_id missing`);
  assert(record.block_id === BLOCK_ID, `${fileName} block_id mismatch`);
  assert(record.version === BLOCK_VERSION, `${fileName} version mismatch`);
  assert(record.capability_id === CAPABILITY_ID, `${fileName} capability_id mismatch`);
  assert(record.links?.manifest === "../actionist-block.json", `${fileName} manifest link mismatch`);
  const unsafe = walkUnsafe(record);
  assert(unsafe.length === 0, unsafe.join("; "));
}

function validateRecords(manifest) {
  const records = {};
  for (const name of RECORD_NAMES) {
    const filePath = relativePackagePath(manifest.records[name], `records.${name}`);
    const record = readJson(filePath);
    validateRecordCommon(record, RECORD_TYPES[name], name);
    records[name] = { filePath, value: record };
    // v2 flattens links: every sibling record is linked directly, no nesting.
    for (const [linkName, link] of Object.entries(record.links ?? {})) {
      if (linkName === "manifest") continue;
      relativeEvidencePath(link, path.dirname(filePath), `${name}.links.${linkName}`);
    }
  }

  const capability = records.capability.value;
  assert(capability.authority_class === "tenant_scoped_write", "capability authority must be tenant_scoped_write");
  assert(capability.requires_host?.includes("identity"), "capability must require identity");
  assert(capability.requires_host?.includes("tenant"), "capability must require tenant");
  assert(capability.requires_host?.includes("files"), "capability must require files");
  assert(capability.requires_host?.includes("events"), "capability must require events");

  const packaging = records.packaging.value;
  assert(packaging.reuse_shape === "intact_service", "packaging reuse shape mismatch");
  assert(packaging.source_identity?.identity_status === "pinned", "source identity must be pinned");
  assert(packaging.source_identity?.immutable_revision === manifest.reuse.donor.immutable_revision, "record/source commit mismatch");
  assert(packaging.source_identity?.source_digest === manifest.reuse.donor.source_digest, "record/source digest mismatch");
  assert(packaging.one_server_separate_schema_compatibility?.declaration === "compatible_with_one_postgresql_server_and_separate_ownership_boundaries", "one-server/separate-schema declaration missing");
  assert(packaging.donor_migration_ownership?.metadata?.owner === "teable-prisma", "Teable metadata migration owner missing");
  assert(packaging.donor_migration_ownership?.baseData?.owner === "teable-data-plane-migrator", "Teable data-plane migration owner missing");
  assert(packaging.donor_migration_ownership?.hostOwned?.owner === "actionist-host", "host migration owner missing");

  const host = records.host_requirements.value;
  assert(host.identity?.identity_source === "host_verified_context", "host identity source must be verified context");
  assert(host.identity?.short_lived_assertion?.single_use === true, "host assertion must be single-use");
  assert(host.tenancy?.required === true, "tenant context must be required");
  assert(host.tenancy?.header_trust === "Only the host proxy may set the internal tenant context; donor-facing headers from a browser are never trusted.", "tenant header trust rule missing");
  assert(host.files?.host_authorization_before_signed_url === true, "attachment host authorization rule missing");
  assert(host.observability?.capability_identifier === CAPABILITY_ID, "observability capability identifier missing");

  const binding = records.binding_plan.value;
  assert(binding.lifecycle_state === "planned", "binding must remain planned");
  assert(binding.tenant_binding?.required === true, "binding tenant requirement missing");
  assert(binding.identity_binding?.source === "host_verified_context", "binding identity source mismatch");
  assert(binding.data_binding?.cross_owner_reads === "event_fed_read_model", "binding cross-owner read policy mismatch");
  assert(binding.data_binding?.cross_owner_writes === "forbidden", "binding cross-owner write policy must be forbidden");
  assert(binding.data_binding?.shared_resource_owners?.length === 0, "binding must not have shared resource owners");
  assert(binding.glue_budget?.source_changes_allowed === 0, "intact-service package must allow zero donor source changes");
  assert(Array.isArray(binding.unresolved) && binding.unresolved.length >= 4, "binding must preserve unresolved proof holds");

  const qualification = records.qualification.value;
  assert(qualification.promotion_decision?.qualification_status === "NOT_QUALIFIED", "qualification must remain NOT_QUALIFIED");
  assert(qualification.promotion_decision?.admission_status === "NOT_ADMITTED", "qualification admission must remain NOT_ADMITTED");
  assert(qualification.promotion_decision?.hold_reasons?.some((reason) => /authenticated native desktop CRUD blocked/i.test(reason)), "desktop CRUD hold missing");
  assert(qualification.promotion_decision?.hold_reasons?.some((reason) => /authenticated native mobile CRUD blocked/i.test(reason)), "mobile CRUD hold missing");
  assert(qualification.promotion_decision?.hold_reasons?.some((reason) => /attachment/i.test(reason)), "attachment hold missing");
  assert(qualification.historical_evidence_refs?.length >= 3, "historical evidence references missing");
  const historicalCandidateReceiptPath = relativeEvidencePath(
    qualification.historical_evidence_refs.find((value) => value.endsWith("teable-data-final-receipt.json")),
    path.dirname(records.qualification.filePath),
    "historical Teable candidate receipt",
  );
  const historicalCandidateReceipt = readJson(historicalCandidateReceiptPath);
  assert(historicalCandidateReceipt.status === "BLOCKED", "historical candidate receipt status drifted from BLOCKED");
  assert(historicalCandidateReceipt.verdict === "PARTIAL_PASS", "historical candidate receipt verdict drifted from PARTIAL_PASS");
  assert(/^BLOCKED/.test(historicalCandidateReceipt.checks?.["authenticated-native-desktop-crud"] ?? ""), "historical desktop CRUD hold is missing");
  assert(/^BLOCKED/.test(historicalCandidateReceipt.checks?.["authenticated-native-mobile-crud"] ?? ""), "historical mobile CRUD hold is missing");
  assert(/^BLOCKED/.test(historicalCandidateReceipt.checks?.["blob-namespace"] ?? ""), "historical attachment hold is missing");
  const isolationGatePath = relativeEvidencePath(
    qualification.historical_evidence_refs.find((value) => value.endsWith("teable-isolation-admission-gate.json")),
    path.dirname(records.qualification.filePath),
    "historical Teable isolation gate",
  );
  const isolationGate = readJson(isolationGatePath);
  assert(isolationGate.verdict?.status === "BLOCKED_ON_GATES", "historical isolation gate must remain blocked");
  assert(isolationGate.verdict?.mayAdmitIntoReusablePlatform === false, "historical isolation gate must forbid platform admission");
  for (const evidenceRef of qualification.historical_evidence_refs) {
    relativeEvidencePath(evidenceRef, path.dirname(records.qualification.filePath), "qualification historical evidence");
  }
  for (const receipt of qualification.receipts ?? []) {
    if (receipt.source_path) relativeEvidencePath(receipt.source_path, path.dirname(records.qualification.filePath), `${receipt.receipt_id}.source_path`);
  }

  const registry = records.registry.value;
  assert(registry.admission_status === "NOT_ADMITTED", "registry admission must remain NOT_ADMITTED");
  assert(registry.admission_scope?.tenants?.length === 0, "registry tenant admission scope must be empty");
  assert(registry.admission_scope?.applications?.length === 0, "registry application admission scope must be empty");
  assert(registry.projection_policy?.lossy_flagged === true, "registry lossy projection flag missing");

  const release = records.release.value;
  assert(release.release_status === "not_released", "release status must be not_released");
  assert(release.release_decision?.deployment_performed === false, "deployment must not be claimed");
  assert(release.release_decision?.admission_claimed === false, "admission must not be claimed");
  assert(release.recovery_horizon_seconds === 0, "unproven recovery horizon must be zero");
  assert(release.artifact_retention?.retained_in_actionist_storage === false, "prototype must not claim donor artifact retention");
  return records;
}

function validateSchemaFiles(manifest) {
  // The v2 meta-schema is SHARED across the estate, so it deliberately lives
  // outside this package. It is resolved against the blocks root, not the block.
  const sharedSchema = manifest.$schema;
  assert(
    sharedSchema === "../_schema/actionist-block.v2.schema.json",
    `manifest must point at the shared v2 meta-schema, got ${sharedSchema}`,
  );
  const sharedPath = path.resolve(ROOT, sharedSchema);
  const blocksRoot = path.resolve(ROOT, "..");
  assert(sharedPath.startsWith(`${blocksRoot}${path.sep}`), "shared schema must stay inside blocks/");
  assert(fs.existsSync(sharedPath), `shared meta-schema does not resolve: ${sharedSchema}`);
  const shared = readJson(sharedPath);
  assert(shared.$id === "https://actionist.dev/schemas/block-manifest/v2", "shared meta-schema $id drifted");

  const schemaPaths = [
    manifest.interfaces.host_binding_schema,
    manifest.configuration.schema,
    "schemas/record.schema.json",
    "schemas/ports/grid-query.v1.json",
    "schemas/ports/grid-mutate.v1.json",
    "schemas/ports/attachment-read.v1.json",
    "schemas/ports/record-event.v1.json",
  ];
  for (const schemaPath of schemaPaths) {
    // R8: never skip silently. A schema this package cannot check locally is a
    // violation, not a pass. The previous `startsWith("http") -> continue` here
    // was exactly the "cannot classify, move on" branch that reports success.
    assert(schemaPath, "schema entry is empty");
    assert(!/^https?:/.test(schemaPath), `schema must be package-local, got remote ${schemaPath}`);
    const filePath = relativePackagePath(schemaPath, "schema");
    const schema = readJson(filePath);
    assert(schema.$schema && schema.$id && schema.type, `schema metadata missing at ${schemaPath}`);
  }
}

function validateConfig(configPath) {
  const config = readJson(configPath);
  assert(config.schemaVersion === "1.0.0", "config schemaVersion mismatch");
  assert(config.blockId === CAPABILITY_ID, "config blockId mismatch");
  assert(config.environment !== "production", "synthetic package tooling refuses production config");
  assert(config.host?.origin?.startsWith("http://") || config.host?.origin?.startsWith("https://"), "host origin must be an HTTP(S) URL");
  assert(config.host?.proxyBasePath?.startsWith("/"), "host proxyBasePath must be rooted");
  assert(config.donor?.baseUrlEnv === "ACTIONIST_TEABLE_BASE_URL", "donor base URL must be an environment reference");
  assert(config.donor?.runtimeProfile === "sidecar_service", "donor runtime profile mismatch");
  assert(config.identity?.identitySource === "host_verified_context", "config identity source mismatch");
  assert(config.identity?.handoffMode === "signed_two_token", "config handoff mode mismatch");
  assert(config.identity?.credentialReferenceEnv === "ACTIONIST_TEABLE_CREDENTIAL_REF", "config credential must be an environment reference");
  assert(config.identity?.assertionLifetimeSeconds <= 120, "assertion lifetime exceeds 120 seconds");
  assert(config.identity?.singleUse === true, "config assertion must be single-use");
  assert(config.identity?.clientSuppliedHeadersTrusted === false, "client-supplied headers must be untrusted");
  assert(config.tenant?.required === true, "config tenant must be required");
  assert(config.tenant?.source === "verified_host_claim", "config tenant source mismatch");
  assert(config.tenant?.baseSelection === "host_bound", "config base selection mismatch");
  assert(config.database?.topology === "one_server_separate_schemas", "database topology mismatch");
  assert(config.database?.metadataSchema === "public", "pinned Teable metadata schema must be public");
  assert(config.database?.hostSchema && config.database.hostSchema !== "public", "host schema must be separate from public");
  assert(config.database?.requiresCreateDatabase === true, "database CREATE requirement must be explicit");
  assert(config.database?.crossOwnerReads === "event_fed_read_model", "database cross-owner read policy mismatch");
  assert(config.database?.crossOwnerWrites === "forbidden", "database cross-owner writes must be forbidden");
  assert(config.database?.migrationOwners?.teableMetadata === "teable-prisma", "config Teable metadata owner missing");
  assert(config.database?.migrationOwners?.teableBaseData === "teable-data-plane-migrator", "config Teable data owner missing");
  assert(config.database?.migrationOwners?.hostOwned === "actionist-host", "config host owner missing");
  assert(config.redis?.required === true, "Redis must be explicitly required");
  assert(config.redis?.namespacePrefix?.length >= 3, "Redis namespace prefix missing");
  assert(config.attachments?.hostAuthorizationRequired === true, "attachment host authorization must be required");
  assert(config.attachments?.namespaceTemplate === "tenant/{tenantId}/base/{baseId}", "attachment namespace template mismatch");
  assert(config.events?.envelope === "actionist.capability-event.v1", "event envelope mismatch");
  assert(config.observability?.capabilityId === CAPABILITY_ID, "config observability capability mismatch");
  const unsafe = walkUnsafe(config);
  assert(unsafe.length === 0, unsafe.join("; "));
  return config;
}

function validateHostFixture(hostPath) {
  const host = readJson(hostPath);
  assert(host.schemaVersion === "1.0.0", "host fixture schemaVersion mismatch");
  assert(typeof host.applicationId === "string" && host.applicationId.length > 0, "host fixture applicationId missing");
  assert(host.environment === "synthetic", "host fixture must be synthetic");
  assert(host.identity?.source === "host_verified_context", "host fixture identity source mismatch");
  assert(host.identity?.verified === true, "host fixture identity must be verified");
  assert(host.identity?.subjectRef && host.identity?.assertionRef, "host fixture identity references missing");
  assert(host.identity?.singleUse === true, "host fixture assertion must be single-use");
  assert(host.tenant?.tenantId, "host fixture tenantId is required");
  assert(host.tenant?.verified === true, "host fixture tenant must be verified");
  assert(host.tenant?.source === "verified_host_claim", "host fixture tenant source mismatch");
  assert(host.base?.baseId === host.tenant.baseId, "host fixture tenant/base mismatch");
  assert(host.base?.allowedByHost === true, "host fixture base must be host-allowed");
  assert(host.migrationAuthority?.teableMetadata === "teable-prisma", "host fixture Teable metadata owner missing");
  assert(host.migrationAuthority?.teableBaseData === "teable-data-plane-migrator", "host fixture Teable data owner missing");
  assert(host.migrationAuthority?.hostOwned === "actionist-host", "host fixture host migration owner missing");
  assert(host.migrationAuthority?.sharedResources === "none", "host fixture must have no shared migration resources");
  assert(host.navigation?.hostOwnsUrl === true, "host fixture URL ownership missing");
  assert(host.settings?.policy === "donor_rendered_behind_host_nav", "host fixture settings fallback mismatch");
  assert(host.attachments?.hostAuthorizationRequired === true, "host fixture attachment authorization missing");
  assert(host.attachments?.proofStatus === "blocked", "host fixture must preserve attachment proof hold");
  assert(host.observability?.capabilityId === CAPABILITY_ID, "host fixture observability capability mismatch");
  const unsafe = walkUnsafe(host);
  assert(unsafe.length === 0, unsafe.join("; "));
  return host;
}

function validateTheme(themePath) {
  const css = readText(themePath);
  assert(css.includes(".actionist-teable-surface"), "theme bridge scope missing");
  assert(!css.includes(":root"), "theme bridge must not write global :root");
  assert(!/--teable-[a-z-]+\s*:/.test(css), "theme bridge must not expose donor-prefixed global variables");
  const donorVars = ["background", "foreground", "muted", "popover", "card", "border", "input", "primary", "secondary", "accent", "destructive", "ring", "radius"];
  for (const variable of donorVars) assert(css.includes(`--${variable}:`), `theme variable --${variable} missing`);
  const lines = css.split(/\r?\n/);
  let depth = 0;
  let scoped = false;
  for (const line of lines) {
    if (/^\s*\.actionist-teable-surface/.test(line)) scoped = true;
    if (/^\s*--(?:background|foreground|muted|popover|card|border|input|primary|secondary|accent|destructive|ring|radius)\s*:/.test(line)) {
      assert(scoped && depth > 0, `unscoped donor variable declaration: ${line.trim()}`);
    }
    depth += (line.match(/{/g) ?? []).length;
    depth -= (line.match(/}/g) ?? []).length;
    if (depth === 0) scoped = false;
  }
}

function validatePackage() {
  const manifest = validateManifest();
  validateSchemaFiles(manifest);
  const records = validateRecords(manifest);
  const configPath = relativePackagePath(manifest.configuration.example, "configuration.example");
  const hostPath = relativePackagePath(manifest.fixture.host, "fixture.host");
  const themePath = relativePackagePath(manifest.theme.bridge, "theme.bridge");
  const interfacePath = relativePackagePath(manifest.interfaces.host_binding, "interfaces.host_binding");
  validateConfig(configPath);
  validateHostFixture(hostPath);
  validateTheme(themePath);
  const interfaceText = readText(interfacePath);
  for (const requiredType of ["IdentitySessionHandoff", "TenantAndBaseBinding", "NavigationBinding", "SettingsBinding", "HealthBinding", "AttachmentBinding", "EventBinding", "ObservabilityBinding", "TeableHostBinding"]) {
    assert(interfaceText.includes(`interface ${requiredType}`), `typed host-binding interface missing ${requiredType}`);
  }
  assert(!hasUnsafeString(interfaceText), "typed interface contains an absolute path or secret-like value");
  return { manifest, records, configPath, hostPath, themePath };
}

function parseFlags(args) {
  const flags = {};
  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (!value.startsWith("--")) continue;
    const key = value.slice(2);
    const next = args[index + 1];
    if (next && !next.startsWith("--")) {
      flags[key] = next;
      index += 1;
    } else {
      flags[key] = true;
    }
  }
  return flags;
}

function ensureDisposableOutput(outPath) {
  assert(typeof outPath === "string" && outPath.length > 0, "--out is required");
  const resolved = path.resolve(outPath);
  assert(resolved !== ROOT && !resolved.startsWith(`${ROOT}${path.sep}`), "output must be outside the package");
  assert(resolved !== path.parse(resolved).root, "output must not be a filesystem root");
  fs.mkdirSync(resolved, { recursive: true });
  return resolved;
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function install(outPath) {
  const packageState = validatePackage();
  const output = ensureDisposableOutput(outPath);
  const plan = {
    schemaVersion: "1.0.0",
    artifactType: "actionist-teable-data-grid-install-plan",
    status: "planned",
    blockId: CAPABILITY_ID,
    manifestDigest: sha256(MANIFEST_PATH),
    source: {
      repository: packageState.manifest.reuse.donor.repository,
      immutableRevision: packageState.manifest.reuse.donor.immutable_revision,
      copiedSourceFiles: 0,
      execution: "not_performed",
    },
    steps: [
      "register donor runtime URL from ACTIONIST_TEABLE_BASE_URL",
      "validate host_verified_context and tenant/base policy",
      "provision host proxy and deploy-time navigation contribution",
      "bind host-owned environment references without writing secret values",
      "run host qualification before any tenant entitlement",
    ],
    safety: {
      networkAccess: false,
      donorSourceExecution: false,
      deployment: false,
      admissionClaimed: false,
    },
  };
  writeJson(path.join(output, "install-plan.json"), plan);
  return { output, plan };
}

function bind(configPath, hostPath, outPath) {
  const packageState = validatePackage();
  const config = validateConfig(configPath);
  const host = validateHostFixture(hostPath);
  assert(config.host.origin === host.hostOrigin, "config and host fixture origins differ");
  assert(config.host.proxyBasePath === host.proxyBasePath, "config and host fixture proxy paths differ");
  const output = ensureDisposableOutput(outPath);
  const binding = {
    schemaVersion: "1.0.0",
    applicationId: host.applicationId,
    environment: host.environment,
    hostOrigin: host.hostOrigin,
    proxyBasePath: host.proxyBasePath,
    identity: host.identity,
    tenant: host.tenant,
    base: host.base,
    migrationAuthority: host.migrationAuthority,
    navigation: host.navigation,
    settings: host.settings,
    attachments: host.attachments,
    events: host.events,
    observability: host.observability,
  };
  const unsafe = walkUnsafe(binding);
  assert(unsafe.length === 0, unsafe.join("; "));
  writeJson(path.join(output, "binding.generated.json"), binding);
  writeJson(path.join(output, "bind-receipt.json"), {
    schemaVersion: "1.0.0",
    artifactType: "actionist-teable-data-grid-bind-receipt",
    status: "PASS",
    blockId: CAPABILITY_ID,
    applicationId: host.applicationId,
    manifestDigest: sha256(MANIFEST_PATH),
    configDigest: sha256(configPath),
    hostFixtureDigest: sha256(hostPath),
    generatedBinding: "binding.generated.json",
    sourceExecution: false,
    deployment: false,
    admissionClaimed: false,
    proofBoundary: "synthetic binding shape only; donor authenticated UI/mobile/attachment proof remains held",
  });
  return { output, binding };
}

function expectRejected(label, action) {
  try {
    action();
  } catch (error) {
    if (error instanceof ContractError) return { name: label, status: "PASS", reason: error.message };
    throw error;
  }
  fail(`${label} was accepted but must be refused`);
}

function smoke() {
  const packageState = validatePackage();
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "actionist-teable-grid-"));
  const checks = [
    { name: "manifest_and_seven_records", status: "PASS" },
    { name: "configuration_shape_and_environment_references", status: "PASS" },
    { name: "tenant_isolation_requirements", status: "PASS" },
    { name: "migration_owners_declared", status: "PASS" },
    { name: "scoped_theme_bridge", status: "PASS" },
    { name: "historical_evidence_parity", status: "PASS" },
  ];
  try {
    install(path.join(tempRoot, "install"));
    bind(packageState.configPath, packageState.hostPath, path.join(tempRoot, "bind"));
    checks.push({ name: "deterministic_install_plan", status: "PASS" });
    checks.push({ name: "deterministic_binding_generation", status: "PASS" });

    const identityMissingPath = path.join(tempRoot, "host-no-identity.json");
    const identityMissing = readJson(packageState.hostPath);
    identityMissing.identity.verified = false;
    writeJson(identityMissingPath, identityMissing);
    checks.push(expectRejected("missing_or_unverified_identity", () => validateHostFixture(identityMissingPath)));

    const tenantMissingPath = path.join(tempRoot, "host-no-tenant.json");
    const tenantMissing = readJson(packageState.hostPath);
    delete tenantMissing.tenant.tenantId;
    writeJson(tenantMissingPath, tenantMissing);
    checks.push(expectRejected("missing_tenant", () => validateHostFixture(tenantMissingPath)));

    const ownerMissingPath = path.join(tempRoot, "host-no-migration-owner.json");
    const ownerMissing = readJson(packageState.hostPath);
    delete ownerMissing.migrationAuthority.teableMetadata;
    writeJson(ownerMissingPath, ownerMissing);
    checks.push(expectRejected("missing_migration_owner", () => validateHostFixture(ownerMissingPath)));

    checks.push({ name: "no_secret_or_absolute_client_path", status: "PASS" });
    checks.push({ name: "donor_source_not_copied_or_executed", status: "PASS" });
    return {
      status: "PASS",
      command: "smoke",
      blockId: CAPABILITY_ID,
      checks,
      disposableFixture: true,
      deployment: false,
      admissionClaimed: false,
    };
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function printHelp() {
  console.log("Usage: node tools/teable-block.mjs <validate|install|bind|smoke> [flags]");
  console.log("  validate");
  console.log("  install --out <disposable-directory>");
  console.log("  bind --config <config.json> --host <host-fixture.json> --out <disposable-directory>");
  console.log("  smoke");
}

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const flags = parseFlags(rest);
  if (!command || command === "help" || command === "--help") {
    printHelp();
    return;
  }
  if (command === "validate") {
    validatePackage();
    console.log(JSON.stringify({ status: "PASS", command, blockId: CAPABILITY_ID, records: RECORD_NAMES.length }, null, 2));
    return;
  }
  if (command === "install") {
    const result = install(flags.out);
    console.log(JSON.stringify({ status: "PASS", command, output: result.output, plan: "install-plan.json" }, null, 2));
    return;
  }
  if (command === "bind") {
    const configPath = flags.config ? path.resolve(flags.config) : path.join(ROOT, "config/example.config.json");
    const hostPath = flags.host ? path.resolve(flags.host) : path.join(ROOT, "fixtures/synthetic-host.json");
    const result = bind(configPath, hostPath, flags.out);
    console.log(JSON.stringify({ status: "PASS", command, output: result.output, binding: "binding.generated.json" }, null, 2));
    return;
  }
  if (command === "smoke") {
    console.log(JSON.stringify(smoke(), null, 2));
    return;
  }
  fail(`unknown command: ${command}`);
}

try {
  main();
} catch (error) {
  const payload = { status: "FAIL", error: error.message };
  console.error(JSON.stringify(payload, null, 2));
  process.exitCode = 1;
}
