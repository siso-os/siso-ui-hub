/**
 * Host-side seam for the preserved, identity-erased AFFiNE workspace block.
 * Runtime assertions are supplied by the host and are intentionally never
 * serialized into a route or committed to a package.
 */

export type AffineWorkspaceCapability = "view" | "edit" | "share";

export interface AffineWorkspaceIdentity {
  user_id: string;
  email: string;
  display_name: string;
  client_id: string;
  workspace_id: string;
  expires_at: number;
  capabilities: AffineWorkspaceCapability[];
}

export interface AffineWorkspaceRuntime {
  frame_origin: string;
  server_origin: string;
  companion_origin: string;
  health_path: string;
}

export interface AffineWorkspaceHostBinding {
  host_contract_version: "actionist.affine.host.v0.1";
  application_id: string;
  host_origin: string;
  expected_client_id: string;
  identity: AffineWorkspaceIdentity;
  workspace: {
    workspace_id: string;
    selection_authority: "host";
    switcher: "host";
  };
  runtime: AffineWorkspaceRuntime;
  session: {
    assertion_ref: string;
    audience: string;
    transport: "postMessage+header";
    single_use: true;
    audience_bound: true;
  };
  routes: {
    base_path: string;
    settings_path: string;
    label: string;
    icon: string;
    internal_path: string;
    workspace_revision: number;
  };
  observability: {
    capability_id: string;
    release_id: string;
    trace_propagation: "traceparent";
  };
}

export interface AffineSessionMessage {
  type: "siso:session";
  user: AffineWorkspaceIdentity;
  assertion: string;
  audience: string;
  expires_at: number;
}

export function assertAffineWorkspaceIdentity(
  identity: AffineWorkspaceIdentity,
  expectedClientId: string,
  expectedWorkspaceId: string,
  now = Date.now(),
): void {
  if (!identity || !identity.user_id || !identity.workspace_id) {
    throw new Error("HOST_IDENTITY_REFUSED: missing_identity");
  }
  if (identity.client_id !== expectedClientId) {
    throw new Error("HOST_IDENTITY_REFUSED: client_mismatch");
  }
  if (identity.workspace_id !== expectedWorkspaceId) {
    throw new Error("HOST_IDENTITY_REFUSED: workspace_mismatch");
  }
  if (!Number.isFinite(identity.expires_at) || identity.expires_at <= now) {
    throw new Error("HOST_IDENTITY_REFUSED: expired");
  }
  if (!identity.capabilities.includes("view") || !identity.capabilities.includes("edit")) {
    throw new Error("HOST_IDENTITY_REFUSED: capability_denied");
  }
}

export function buildWorkspaceUrl(
  binding: AffineWorkspaceHostBinding,
  mode: "workspace" | "settings" = "workspace",
): string {
  assertAffineWorkspaceIdentity(
    binding.identity,
    binding.expected_client_id,
    binding.workspace.workspace_id,
  );
  return ownedUrl(mode === "settings" ? binding.routes.settings_path : binding.routes.base_path, binding.host_origin, "route");
}

function ownedUrl(path: string, origin: string, label: string): string {
  const base = new URL(origin);
  if (typeof path !== "string" || !path.startsWith("/") || /[\\\u0000-\u0020]/.test(path) || !/^https?:$/.test(base.protocol)) {
    throw new Error(`HOST_IDENTITY_REFUSED: invalid_${label}`);
  }
  const url = new URL(path, base);
  if (url.origin !== base.origin) throw new Error(`HOST_IDENTITY_REFUSED: invalid_${label}`);
  return url.toString();
}

export function buildSessionMessage(
  binding: AffineWorkspaceHostBinding,
  runtimeAssertion: string,
): AffineSessionMessage {
  assertAffineWorkspaceIdentity(
    binding.identity,
    binding.expected_client_id,
    binding.workspace.workspace_id,
  );
  if (!runtimeAssertion.trim()) {
    throw new Error("HOST_IDENTITY_REFUSED: missing_runtime_assertion");
  }
  return {
    type: "siso:session",
    user: binding.identity,
    assertion: runtimeAssertion,
    audience: binding.session.audience,
    expires_at: binding.identity.expires_at,
  };
}

export function buildNavigationContribution(binding: AffineWorkspaceHostBinding) {
  return {
    intent: "open-affine-workspace",
    label: binding.routes.label,
    icon: binding.routes.icon,
    route_ref: binding.routes.base_path,
    visibility_predicate: "identity.capabilities includes edit",
  } as const;
}

export function isTrustedAffineMessage(
  event: Pick<MessageEvent, "origin" | "source">,
  binding: AffineWorkspaceHostBinding,
  expectedSource: unknown,
): boolean {
  return event.origin === binding.host_origin && event.source === expectedSource;
}

export function buildHealthRequest(binding: AffineWorkspaceHostBinding) {
  const url = ownedUrl(binding.runtime.health_path, binding.runtime.server_origin, "health_path");
  return {
    method: "GET" as const,
    url,
    headers: {
      Accept: "application/json",
      "X-Actionist-Client": binding.expected_client_id,
    },
  };
}
