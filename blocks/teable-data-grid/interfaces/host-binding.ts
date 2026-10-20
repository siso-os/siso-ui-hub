/**
 * Typed seam required from an Actionist host for the Teable intact-service
 * shape. This file contains contracts only; it never stores or emits a real
 * credential. Implementations belong to the host project.
 */

export type TeableCapabilityId = "actionist/teable-data-grid";
export type TeableBindingEnvironment = "synthetic" | "development" | "staging" | "production";

export interface SecretReference {
  /** A host-secret-manager key, never the secret value. */
  readonly name: string;
}

export interface VerifiedIdentityContext {
  readonly source: "host_verified_context";
  readonly verified: true;
  readonly subjectId: string;
  readonly tenantId: string;
  readonly roles: readonly string[];
  readonly entitlements: readonly string[];
}

export interface SessionHandoffRequest {
  readonly identity: VerifiedIdentityContext;
  readonly audience: "actionist-module:teable-data-grid";
  readonly traceId: string;
}

export interface SessionAssertion {
  /** Opaque value consumed once at the donor auth seam. Do not persist/log. */
  readonly value: string;
  readonly audience: "actionist-module:teable-data-grid";
  readonly expiresAt: string;
  readonly jti: string;
  readonly singleUse: true;
}

export interface IdentitySessionHandoff {
  readonly issueShortLivedAssertion: (
    request: SessionHandoffRequest,
  ) => Promise<SessionAssertion>;
  readonly exchangeAt: "/internal/teable/session";
  readonly longLivedCredential: SecretReference;
  readonly donorLoginRoutes: "deny";
  readonly maxLifetimeSeconds: 120;
}

export interface TenantContext {
  readonly tenantId: string;
  readonly verified: true;
  readonly source: "verified_host_claim";
}

export interface BaseSelectionRequest {
  readonly tenant: TenantContext;
  readonly requestedBaseId: string;
  readonly requestedTableId?: string;
  readonly requestedViewId?: string;
}

export interface TeableBaseSelection {
  readonly tenantId: string;
  readonly baseId: string;
  readonly allowed: true;
  readonly policy: "host_bound_allowlist";
}

export interface TenantAndBaseBinding {
  readonly resolveTenant: (identity: VerifiedIdentityContext) => Promise<TenantContext>;
  readonly selectBase: (request: BaseSelectionRequest) => Promise<TeableBaseSelection>;
  readonly denyCrossTenantAccess: (tenantId: string, baseId: string) => Promise<never>;
}

export interface NavigationContribution {
  readonly id: "teable-data-grid";
  readonly label: "Data grid";
  readonly hostPath: string;
  readonly visibility: "role_and_tenant_entitlement";
  readonly cascadingEmptiness: true;
}

export interface NavigationBinding {
  readonly contribute: (context: VerifiedIdentityContext) => NavigationContribution | null;
  readonly hostOwnsOuterUrl: true;
  readonly donorOwnsInternalRouter: true;
}

export interface SettingsFallback {
  readonly hostEntryPath: string;
  readonly donorPolicy: "donor_rendered_behind_host_nav";
  readonly render: (reason: "donor_unavailable" | "health_degraded") => {
    readonly title: string;
    readonly supportAction: string;
  };
}

export interface SettingsBinding {
  readonly donorSettings: SettingsFallback;
}

export interface HealthSnapshot {
  readonly capabilityId: TeableCapabilityId;
  readonly status: "healthy" | "degraded" | "unavailable";
  readonly donorHealthPath: "/health";
  readonly checks: Readonly<Record<string, "pass" | "fail" | "not_run">>;
  readonly observedAt: string;
}

export interface HealthBinding {
  readonly check: (traceId: string) => Promise<HealthSnapshot>;
}

export interface AttachmentReadRequest {
  readonly tenant: TenantContext;
  readonly baseId: string;
  readonly attachmentId: string;
  readonly purpose: "preview" | "download";
}

export interface AttachmentAuthorization {
  readonly allowed: boolean;
  readonly namespace: string;
  /** Donor signed URL is returned only after the host authorization decision. */
  readonly signedUrl?: string;
  readonly expiresAt?: string;
}

export interface AttachmentBinding {
  readonly namespaceFor: (tenant: TenantContext, baseId: string) => string;
  readonly authorizeRead: (request: AttachmentReadRequest) => Promise<AttachmentAuthorization>;
  readonly authorizeUpload: (request: AttachmentReadRequest) => Promise<AttachmentAuthorization>;
  readonly hostAuthorizationRequired: true;
  readonly proofStatus: "blocked_until_authenticated_attachment_proof";
}

export interface CapabilityEvent<TPayload extends object = Record<string, unknown>> {
  readonly eventId: string;
  readonly capabilityId: TeableCapabilityId;
  readonly tenantId: string;
  readonly subject: string;
  readonly occurredAt: string;
  readonly traceId: string;
  readonly payload: TPayload;
}

export interface EventBinding {
  readonly emit: (event: CapabilityEvent) => Promise<void>;
  readonly consumeTenantDisabled: (handler: (event: CapabilityEvent) => Promise<void>) => () => void;
  readonly envelope: "actionist.capability-event.v1";
}

export interface ObservabilityBinding {
  readonly capabilityId: TeableCapabilityId;
  readonly trace: (traceId: string) => { readonly traceId: string; readonly capabilityId: TeableCapabilityId };
  readonly correlateRelease: (releaseId: string) => void;
  readonly owner: "actionist-block-teable";
}

export interface TeableHostBinding {
  readonly contractVersion: "actionist.host/v0.1.0";
  readonly environment: TeableBindingEnvironment;
  readonly identity: IdentitySessionHandoff;
  readonly tenantAndBase: TenantAndBaseBinding;
  readonly navigation: NavigationBinding;
  readonly settings: SettingsBinding;
  readonly health: HealthBinding;
  readonly attachments: AttachmentBinding;
  readonly events: EventBinding;
  readonly observability: ObservabilityBinding;
}
