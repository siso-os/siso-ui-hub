import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const fixturePath = resolve(root, "fixture/host.json");

function run(script, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: root,
    encoding: "utf8",
  });
}

function jsonOutput(result) {
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return JSON.parse(result.stdout);
}

function temporaryDirectory() {
  return mkdtempSync(join(tmpdir(), "actionist-affine-smoke-"));
}

test("package validator passes seven records and the evidence index", () => {
  const result = run("scripts/validate.mjs");
  const summary = jsonOutput(result);
  assert.equal(summary.status, "PASS");
  assert.equal(summary.records, 7);
  assert.equal(summary.evidence_sources, 13);
  assert.equal(summary.source_copied, false);
  assert.equal(summary.admission_status, "NOT_ADMITTED");
});

test("valid binding has deterministic route, ownership and no runtime assertion", () => {
  const outDir = temporaryDirectory();
  const result = run("scripts/bind.mjs", ["--host", fixturePath, "--out", outDir]);
  const summary = jsonOutput(result);
  assert.equal(summary.binding_id, "fixture-portal::affine-workspace");
  const binding = JSON.parse(readFileSync(join(outDir, "binding.generated.json"), "utf8"));
  assert.equal(binding.status, "BOUND");
  assert.equal(
    binding.routes.workspace_url,
    "http://127.0.0.1:4100/documents",
  );
  assert.equal(binding.routes.settings_url, "/settings?tab=documents");
  assert.equal(binding.routes.internal_router, "donor");
  assert.equal(binding.routes.host_owns_url_space, true);
  assert.equal(Object.hasOwn(binding, "assertion"), false);
  assert.equal(Object.hasOwn(binding.navigation_contribution, "position"), false);
  const query = new URL(binding.routes.workspace_url).searchParams;
  for (const forbidden of ["token", "access_token", "assertion", "password", "secret"]) {
    assert.equal(query.has(forbidden), false, `${forbidden} was placed in the route`);
  }
  const postWriteValidation = run("scripts/validate.mjs", ["--binding", join(outDir, "binding.generated.json")]);
  assert.equal(postWriteValidation.status, 0, `${postWriteValidation.stdout}\n${postWriteValidation.stderr}`);
});

test("wrong, expired, incomplete and missing identities fail closed", () => {
  const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
  const temp = temporaryDirectory();
  const cases = [
    ["wrong-client", { identity: { ...fixture.identity, client_id: "other-client" } }, "client_mismatch"],
    ["expired", { identity: { ...fixture.identity, expires_at: 1 } }, "expired"],
    ["missing-edit", { identity: { ...fixture.identity, capabilities: ["view"] } }, "capability_denied"],
    ["missing-identity", { identity: null }, "missing_identity"],
  ];
  for (const [name, change, refusal] of cases) {
    const hostPath = join(temp, `${name}.json`);
    writeFileSync(hostPath, JSON.stringify({ ...fixture, ...change }));
    const result = run("scripts/bind.mjs", ["--host", hostPath, "--out", join(temp, name)]);
    assert.notEqual(result.status, 0, name);
    assert.match(`${result.stdout}\n${result.stderr}`, new RegExp(`HOST_IDENTITY_REFUSED: ${refusal}`));
  }
});

test("install is bounded, materializes the binding and does not vendor donor source", () => {
  const destination = temporaryDirectory();
  const result = run("scripts/install.mjs", ["--host", fixturePath, "--out", destination]);
  const summary = jsonOutput(result);
  assert.equal(summary.status, "PASS");
  const receipt = JSON.parse(readFileSync(join(destination, ".actionist-install.json"), "utf8"));
  const binding = JSON.parse(readFileSync(join(destination, "binding.generated.json"), "utf8"));
  assert.equal(receipt.source_boundary.source_copied, false);
  assert.equal(receipt.source_boundary.donor_repository_vendored, false);
  assert.equal(receipt.source_boundary.deployment_performed, false);
  assert.equal(binding.application_id, "fixture-portal");
  assert.equal(binding.identity_binding.query_parameter_assertion, false);
  assert.equal(readFileSync(join(destination, "package.json"), "utf8").includes("toeverything/AFFiNE"), false);
});

test("configuration and typed host seam expose references, not credentials or absolute client paths", () => {
  const config = JSON.parse(readFileSync(resolve(root, "config/example.json"), "utf8"));
  assert.match(config.sessionAssertionRef, /^secret-ref:[A-Z0-9_]+$/);
  assert.equal(Object.hasOwn(config, "sessionAssertion"), false);
  const interfaceText = readFileSync(resolve(root, "host-binding/affine-workspace-host-binding.ts"), "utf8");
  for (const symbol of ["AffineWorkspaceIdentity", "buildWorkspaceUrl", "buildSessionMessage", "isTrustedAffineMessage"]) {
    assert.match(interfaceText, new RegExp(`\\b${symbol}\\b`));
  }
  assert.doesNotMatch(interfaceText, /(?:^|[\s"'(])\/(?:Users|home)\//);
  assert.doesNotMatch(interfaceText, /(?:sk-|gh[pousr]_)[A-Za-z0-9]{20,}/);
});
