import { existsSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));

export function parseArgs(argv) {
  const args = { force: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--force") {
      args.force = true;
      continue;
    }
    if (value === "--help" || value === "-h") {
      args.help = true;
      continue;
    }
    if (value === "--host" || value === "--out") {
      const next = argv[index + 1];
      if (!next || next.startsWith("--")) throw new Error(`${value} requires a value`);
      args[value.slice(2)] = next;
      index += 1;
      continue;
    }
    throw new Error(`Unknown argument: ${value}`);
  }
  return args;
}

export function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function requireString(value, label) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`HOST_IDENTITY_REFUSED: missing_${label}`);
  }
  return value;
}

function requireOrigin(value, label) {
  requireString(value, label);
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`HOST_IDENTITY_REFUSED: invalid_${label}`);
  }
  if (!/^https?:$/.test(parsed.protocol)) {
    throw new Error(`HOST_IDENTITY_REFUSED: invalid_${label}`);
  }
  return parsed.origin;
}

function requirePath(value, label, origin) {
  requireString(value, label);
  if (!value.startsWith("/") || /[\\\u0000-\u0020]/.test(value) || new URL(value, origin).origin !== origin) {
    throw new Error(`HOST_IDENTITY_REFUSED: invalid_${label}`);
  }
}

export function assertHostIdentity(host, { now = Date.now(), requiredCapabilities = ["view", "edit"] } = {}) {
  if (!host || typeof host !== "object") throw new Error("HOST_IDENTITY_REFUSED: missing_host");
  if (host.host_contract_version !== "actionist.affine.host.v0.1") {
    throw new Error("HOST_IDENTITY_REFUSED: host_contract_mismatch");
  }
  requireString(host.application_id, "application");
  const hostOrigin = requireOrigin(host.host_origin, "host_origin");
  const expectedClientId = requireString(host.expected_client_id, "client_id");
  const identity = host.identity;
  if (!identity || typeof identity !== "object") {
    throw new Error("HOST_IDENTITY_REFUSED: missing_identity");
  }
  requireString(identity.user_id, "user");
  requireString(identity.workspace_id, "workspace");
  requireString(identity.email, "email");
  requireString(identity.display_name, "display_name");
  if (identity.client_id !== expectedClientId) {
    throw new Error("HOST_IDENTITY_REFUSED: client_mismatch");
  }
  if (!Number.isFinite(identity.expires_at) || identity.expires_at <= now) {
    throw new Error("HOST_IDENTITY_REFUSED: expired");
  }
  if (!Array.isArray(identity.capabilities) || requiredCapabilities.some((capability) => !identity.capabilities.includes(capability))) {
    throw new Error("HOST_IDENTITY_REFUSED: capability_denied");
  }
  const workspace = host.workspace;
  if (!workspace || typeof workspace !== "object") {
    throw new Error("HOST_IDENTITY_REFUSED: missing_workspace");
  }
  requireString(workspace.workspace_id, "workspace");
  if (workspace.workspace_id !== identity.workspace_id) {
    throw new Error("HOST_IDENTITY_REFUSED: workspace_mismatch");
  }
  if (workspace.selection_authority !== "host" || workspace.switcher !== "host") {
    throw new Error("HOST_IDENTITY_REFUSED: workspace_authority_mismatch");
  }
  const runtime = host.runtime;
  if (!runtime || typeof runtime !== "object") throw new Error("HOST_IDENTITY_REFUSED: missing_runtime");
  const origins = {
    hostOrigin,
    frameOrigin: requireOrigin(runtime.frame_origin, "frame_origin"),
    serverOrigin: requireOrigin(runtime.server_origin, "server_origin"),
    companionOrigin: requireOrigin(runtime.companion_origin, "companion_origin"),
  };
  requirePath(runtime.health_path, "health_path", origins.serverOrigin);
  const session = host.session;
  if (!session || typeof session !== "object") throw new Error("HOST_IDENTITY_REFUSED: missing_session");
  if (!/^secret-ref:[A-Z0-9_]+$/.test(session.assertion_ref ?? "")) {
    throw new Error("HOST_IDENTITY_REFUSED: invalid_assertion_ref");
  }
  if (session.transport !== "postMessage+header" || session.single_use !== true || session.audience_bound !== true) {
    throw new Error("HOST_IDENTITY_REFUSED: unsafe_session_contract");
  }
  requireString(session.audience, "audience");
  const routes = host.routes;
  if (!routes || typeof routes !== "object") throw new Error("HOST_IDENTITY_REFUSED: missing_routes");
  for (const [key, value] of [["base_path", routes.base_path], ["settings_path", routes.settings_path], ["label", routes.label], ["icon", routes.icon], ["internal_path", routes.internal_path]]) {
    requireString(value, key);
  }
  requirePath(routes.base_path, "route", hostOrigin);
  requirePath(routes.settings_path, "route", hostOrigin);
  requirePath(routes.internal_path, "route", origins.frameOrigin);
  if (!Number.isInteger(routes.workspace_revision) || routes.workspace_revision < 1) {
    throw new Error("HOST_IDENTITY_REFUSED: invalid_workspace_revision");
  }
  const observability = host.observability;
  if (!observability || typeof observability !== "object") throw new Error("HOST_IDENTITY_REFUSED: missing_observability");
  requireString(observability.capability_id, "capability");
  requireString(observability.release_id, "release");
  if (observability.trace_propagation !== "traceparent") throw new Error("HOST_IDENTITY_REFUSED: missing_trace_propagation");
  return { hostOrigin, expectedClientId, origins };
}

function buildWorkspaceUrl(host, mode = "workspace") {
  const url = new URL(mode === "settings" ? host.routes.settings_path : host.routes.base_path, host.host_origin);
  return url.toString();
}

function hostPath(host, input) {
  const parsed = new URL(input, host.host_origin);
  return `${parsed.pathname}${parsed.search}`;
}

export function buildBinding(manifest, host) {
  const identityContext = assertHostIdentity(host);
  if (manifest?.capability_id !== "actionist/affine-workspace" || manifest?.version !== "0.2.0") {
    throw new Error("BIND_REFUSED: capability_mismatch");
  }
  const capabilityId = manifest.capability_id;
  const workspaceUrl = buildWorkspaceUrl(host);
  const settingsUrl = buildWorkspaceUrl(host, "settings");
  const originList = [
    identityContext.hostOrigin,
    identityContext.origins.frameOrigin,
    identityContext.origins.serverOrigin,
    identityContext.origins.companionOrigin,
  ];
  return {
    schema_version: "actionist.affine.binding.v1",
    binding_id: `${host.application_id}::affine-workspace`,
    capability_id: capabilityId,
    version: manifest.version,
    application_id: host.application_id,
    host_contract_version: host.host_contract_version,
    status: "BOUND",
    ownership: {
      identity: "host",
      tenant_and_workspace_selection: "host",
      host_url_space: "host",
      donor_runtime: "donor",
      donor_workspace_data: "donor",
      donor_files: "donor",
      host_event_envelope: "shared-contract",
    },
    identity_binding: {
      client_id: host.identity.client_id,
      user_id: host.identity.user_id,
      workspace_id: host.identity.workspace_id,
      session: {
        transport: host.session.transport,
        assertion_ref: host.session.assertion_ref,
        audience: host.session.audience,
        audience_bound: host.session.audience_bound,
        single_use: host.session.single_use,
        expires_at: host.identity.expires_at,
      },
      donor_login_route: "forbidden",
      query_parameter_assertion: false,
    },
    workspace_binding: {
      workspace_id: host.workspace.workspace_id,
      selection_authority: host.workspace.selection_authority,
      switcher: host.workspace.switcher,
      route_segment: true,
    },
    routes: {
      assigned_base_path: host.routes.base_path,
      workspace_url: workspaceUrl,
      settings_url: hostPath(host, host.routes.settings_path),
      donor_settings_url: settingsUrl,
      donor_internal_path: host.routes.internal_path,
      workspace_revision: host.routes.workspace_revision,
      internal_router: "donor",
      host_owns_url_space: true,
    },
    navigation_contribution: {
      intent: "open-affine-workspace",
      label: host.routes.label,
      icon: host.routes.icon,
      route_ref: host.routes.base_path,
      visibility_predicate: "identity.capabilities includes edit",
    },
    settings: {
      host_entry: hostPath(host, host.routes.settings_path),
      donor_mode_query: "siso_mode=settings",
      policy: "REQUIRE_PARENTAL_CONSENT_FOR_ALLOWS",
      fallback: "donor-rendered-behind-host-nav",
    },
    health: {
      method: "GET",
      endpoint: new URL(host.runtime.health_path, host.runtime.server_origin).toString(),
      expected_status: 200,
      requires_session: true,
    },
    files: {
      owner: "donor",
      scope: "selected donor workspace",
      operations: ["read", "write", "delete"],
      host_migration_owner: false,
    },
    events: {
      envelope_version: "actionist.host-event.v1",
      channel: "postMessage",
      inbound: ["siso:ready", "siso:search", "siso:route"],
      outbound: ["siso:session", "siso:settings"],
      exact_origin: identityContext.hostOrigin,
      allowed_origins: originList,
    },
    observability: {
      capability_id: host.observability.capability_id,
      release_id: host.observability.release_id,
      trace_propagation: host.observability.trace_propagation,
      ownership_metadata: "host-application-and-donor-runtime",
    },
  };
}

export function writeBinding(binding, outDir) {
  const outputDirectory = resolve(outDir);
  mkdirSync(outputDirectory, { recursive: true });
  const outputPath = resolve(outputDirectory, "binding.generated.json");
  writeFileSync(outputPath, `${JSON.stringify(binding, null, 2)}\n`, "utf8");
  return outputPath;
}

function printHelp() {
  console.log("Usage: node scripts/bind.mjs --host <host.json> --out <directory>");
}

function isMain() {
  return process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
}

if (isMain()) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      printHelp();
      process.exit(0);
    }
    if (!args.host) throw new Error("--host is required");
    if (!args.out) throw new Error("--out is required");
    const hostPath = resolve(args.host);
    if (!existsSync(hostPath)) throw new Error(`Host fixture not found: ${hostPath}`);
    const manifest = readJson(resolve(packageRoot, "actionist-block.json"));
    const host = readJson(hostPath);
    const binding = buildBinding(manifest, host);
    const outputPath = writeBinding(binding, args.out);
    console.log(JSON.stringify({ status: "PASS", binding_id: binding.binding_id, output: outputPath }, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
