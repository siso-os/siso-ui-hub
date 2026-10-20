import assert from "node:assert/strict";
import { cpSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { installRelease } from "../scripts/install-release.mjs";
import { rollbackRelease } from "../scripts/rollback-release.mjs";
import { verifyInstalled } from "../scripts/verify-installed.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const fixture = resolve(root, "fixture/host.json");

function run(script, args = [], cwd = root) {
  return spawnSync(process.execPath, [resolve(root, script), ...args], { cwd, encoding: "utf8" });
}

function pass(result) {
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  return JSON.parse(result.stdout);
}

test("immutable release and every payload digest verify", () => {
  const summary = pass(run("scripts/verify-release.mjs"));
  assert.match(summary.release_id, /^actionist\/affine-workspace@0\.2\.0\+sha256\.[0-9a-f]{64}$/);
  assert.equal(summary.qualification, "NOT_QUALIFIED");
  assert.equal(summary.admission, "NOT_ADMITTED");
  assert.ok(summary.files > 20);
});

test("verifier follows aliased and symlinked CLI paths and emits a result", () => {
  const temp = mkdtempSync(join(tmpdir(), "actionist-affine-cli-alias-"));
  const link = join(temp, "verify-release.mjs");
  symlinkSync(resolve(root, "scripts/verify-release.mjs"), link);
  const result = run(link, [], temp);
  const summary = pass(result);
  assert.equal(summary.status, "PASS");
  assert.match(summary.release_id, /^actionist\/affine-workspace@/);
});

test("CLI imports safely when argv[1] is a non-path stdin marker", () => {
  const result = spawnSync(process.execPath, ["--input-type=module", "-"], {
    cwd: root,
    input: 'import "./scripts/verify-release.mjs";\n',
    encoding: "utf8",
  });
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.equal(result.stdout, "");
});

test("upgrade preserves unrelated host registry rows", () => {
  const app = mkdtempSync(join(tmpdir(), "actionist-affine-registry-"));
  mkdirSync(join(app, ".actionist"), { recursive: true });
  const other = { block_id: "actionist/other", release_id: "other@1", current: "blocks/other/current.json", metadata: { owner: "host" } };
  writeFileSync(join(app, ".actionist/blocks.json"), JSON.stringify({
    schema_version: "actionist.host-block-registry.v1", application_id: "fixture-portal", extra: "preserve", blocks: [other]
  }));
  pass(run("scripts/install-release.mjs", ["--app", app, "--host", fixture]));
  const registry = JSON.parse(readFileSync(join(app, ".actionist/blocks.json"), "utf8"));
  assert.equal(registry.extra, "preserve");
  assert.deepEqual(registry.blocks[0], other);
  assert.equal(registry.blocks.length, 2);
  assert.equal(pass(run("scripts/verify-installed.mjs", ["--app", app], tmpdir())).registration, "PASS");
});

test("two-version upgrade rolls back and reopens the original verified binding", () => {
  const app = mkdtempSync(join(tmpdir(), "actionist-affine-upgrade-"));
  const first = pass(run("scripts/install-release.mjs", ["--app", app, "--host", fixture]));
  const source = mkdtempSync(join(tmpdir(), "actionist-affine-release-v2-"));
  cpSync(root, source, { recursive: true });
  writeFileSync(join(source, "README.md"), `${readFileSync(join(source, "README.md"), "utf8")}v2\n`);
  const specPath = join(source, "release/release-spec.json");
  const spec = JSON.parse(readFileSync(specPath, "utf8"));
  spec.version = "0.2.1";
  writeFileSync(specPath, `${JSON.stringify(spec, null, 2)}\n`);
  const made = run(join(source, "scripts/make-release.mjs"), ["--write"], source);
  assert.equal(made.status, 0, `${made.stdout}\n${made.stderr}`);
  const second = installRelease({ appPath: app, hostPath: fixture, sourceRoot: source });
  assert.notEqual(second.manifest.release_id, first.release_id);
  const rolled = rollbackRelease({ appPath: app, targetReleaseId: first.release_id });
  assert.equal(rolled.release_id, first.release_id);
  assert.equal(verifyInstalled(app).release_id, first.release_id);
});

test("deterministic installer registers into a genuinely empty app and survives reopen", () => {
  const app = mkdtempSync(join(tmpdir(), "actionist-affine-empty-app-"));
  assert.deepEqual(readdirSync(app), []);
  const first = pass(run("scripts/install-release.mjs", ["--app", app, "--host", fixture]));
  const receipt = JSON.parse(readFileSync(join(app, ".actionist/install-receipt.json"), "utf8"));
  assert.equal(receipt.initial_app_state, "EMPTY");
  assert.equal(receipt.source_boundary.network_required, false);
  assert.equal(receipt.source_boundary.credential_value_persisted, false);
  assert.equal(receipt.qualification, "NOT_QUALIFIED");
  assert.equal(receipt.admission, "NOT_ADMITTED");
  const reopened = pass(run("scripts/verify-installed.mjs", ["--app", app], tmpdir()));
  assert.equal(reopened.release_id, first.release_id);
  const second = pass(run("scripts/install-release.mjs", ["--app", app, "--host", fixture]));
  assert.equal(second.release_id, first.release_id);
  assert.deepEqual(JSON.parse(readFileSync(join(app, ".actionist/blocks.json"), "utf8")).blocks.map(row => row.release_id), [first.release_id]);
});

test("an installed copy installs a second app from an unrelated cwd without the source checkout", t => {
  const temp = mkdtempSync(join(tmpdir(), "actionist-affine-portable-"));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const source = join(temp, "source");
  cpSync(root, source, { recursive: true });
  const firstApp = join(temp, "first-app");
  const first = installRelease({ appPath: firstApp, hostPath: fixture, sourceRoot: source });
  rmSync(source, { recursive: true });
  const firstBinding = readFileSync(first.bindingPath);
  const host = JSON.parse(readFileSync(fixture, "utf8"));
  host.application_id = "second-app";
  host.expected_client_id = host.identity.client_id = "second-client";
  host.identity.user_id = "second-user";
  host.identity.workspace_id = host.workspace.workspace_id = "second-workspace";
  host.host_origin = "http://127.0.0.1:4200";
  host.routes.base_path = "/w/second-workspace/knowledge";
  const hostPath = join(temp, "second-host.json");
  writeFileSync(hostPath, JSON.stringify(host));
  const secondApp = join(temp, "second-app");
  const second = pass(run(join(first.releaseRoot, "scripts/install-release.mjs"), ["--app", secondApp, "--host", hostPath], temp));
  assert.equal(second.release_id, first.manifest.release_id);
  const pointer = JSON.parse(readFileSync(join(secondApp, ".actionist/blocks/affine-workspace/current.json")));
  const installedRoot = join(secondApp, ".actionist/blocks/affine-workspace", pointer.release_directory);
  const binding = JSON.parse(readFileSync(join(installedRoot, "binding.generated.json")));
  const block = JSON.parse(readFileSync(join(installedRoot, "actionist-block.json")));
  assert.match(block.commands.install, /^node scripts\/install-release\.mjs /);
  assert.equal(binding.application_id, "second-app");
  assert.equal(binding.identity_binding.client_id, "second-client");
  assert.equal(binding.identity_binding.user_id, "second-user");
  assert.equal(binding.workspace_binding.workspace_id, "second-workspace");
  assert.equal(binding.routes.workspace_url, "http://127.0.0.1:4200/w/second-workspace/knowledge");
  assert.equal(binding.observability.release_id, second.release_id);
  assert.equal(pass(run(join(installedRoot, "scripts/verify-installed.mjs"), ["--app", secondApp], temp)).status, "PASS");
  assert.deepEqual(readFileSync(first.bindingPath), firstBinding);
});

test("host-owned routes cannot resolve to an external origin", t => {
  const temp = mkdtempSync(join(tmpdir(), "actionist-affine-route-boundary-"));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  for (const field of ["base_path", "settings_path", "internal_path", "health_path"]) {
    for (const route of ["//outside.invalid/escape", "/\\outside.invalid/escape", "/\t/outside.invalid/escape"]) {
      const host = JSON.parse(readFileSync(fixture, "utf8"));
      (field === "health_path" ? host.runtime : host.routes)[field] = route;
      const hostPath = join(temp, "host.json");
      writeFileSync(hostPath, JSON.stringify(host));
      assert.throws(() => installRelease({ appPath: join(temp, "app"), hostPath }), /HOST_IDENTITY_REFUSED: invalid_(route|health_path)/, `${field}: ${JSON.stringify(route)}`);
    }
  }
});

test("release verification refuses tampered bytes", () => {
  const copy = mkdtempSync(join(tmpdir(), "actionist-affine-release-copy-"));
  cpSync(root, copy, { recursive: true });
  writeFileSync(resolve(copy, "README.md"), "tampered\n");
  const result = run(resolve(copy, "scripts/verify-release.mjs"), [], copy);
  assert.notEqual(result.status, 0);
  assert.match(`${result.stdout}\n${result.stderr}`, /payload_digest_mismatch:README\.md/);
});

test("installer refuses non-empty uninitialized apps and rollback to unknown release", () => {
  const app = mkdtempSync(join(tmpdir(), "actionist-affine-nonempty-"));
  writeFileSync(join(app, "unowned.txt"), "preserve\n");
  const refusal = run("scripts/install-release.mjs", ["--app", app, "--host", fixture]);
  assert.notEqual(refusal.status, 0);
  assert.match(`${refusal.stdout}\n${refusal.stderr}`, /nonempty_app_not_initialized/);

  const empty = mkdtempSync(join(tmpdir(), "actionist-affine-rollback-"));
  pass(run("scripts/install-release.mjs", ["--app", empty, "--host", fixture]));
  const rollback = run("scripts/rollback-release.mjs", ["--app", empty, "--to", "actionist/affine-workspace@0.1.0+sha256.missing"]);
  assert.notEqual(rollback.status, 0);
  assert.match(`${rollback.stdout}\n${rollback.stderr}`, /target_not_installed/);
});

test("clean installer fails closed on wrong workspace and missing session contracts", () => {
  const host = JSON.parse(readFileSync(fixture, "utf8"));
  const temp = mkdtempSync(join(tmpdir(), "actionist-affine-negative-hosts-"));
  const cases = [
    ["wrong-workspace", { ...host, workspace: { ...host.workspace, workspace_id: "wrong-workspace" } }, "workspace_mismatch"],
    ["missing-session", { ...host, session: null }, "missing_session"]
  ];
  for (const [name, invalidHost, refusal] of cases) {
    const hostPath = join(temp, `${name}.json`);
    const appPath = join(temp, `${name}-app`);
    writeFileSync(hostPath, JSON.stringify(invalidHost));
    const result = run("scripts/install-release.mjs", ["--app", appPath, "--host", hostPath]);
    assert.notEqual(result.status, 0, name);
    assert.match(`${result.stdout}\n${result.stderr}`, new RegExp(refusal));
  }
});

test("nested state and receipt symlinks cannot redirect installer writes", t => {
  const temp = mkdtempSync(join(tmpdir(), "actionist-affine-contained-"));
  t.after(() => rmSync(temp, { recursive: true, force: true }));
  const outside = join(temp, "outside");
  mkdirSync(outside);
  for (const entry of ["blocks", "install-receipt.json"]) {
    const app = join(temp, entry.replaceAll(".", "-"));
    mkdirSync(join(app, ".actionist"), { recursive: true });
    const target = entry === "blocks" ? outside : join(outside, "preserve.json");
    if (entry !== "blocks") writeFileSync(target, "preserve\n");
    symlinkSync(target, join(app, ".actionist", entry));
    const result = run("scripts/install-release.mjs", ["--app", app, "--host", fixture]);
    assert.notEqual(result.status, 0, entry);
    assert.match(result.stderr, /symlink_escape/, result.stderr);
  }
  assert.deepEqual(readdirSync(outside), ["preserve.json"]);
  assert.equal(readFileSync(join(outside, "preserve.json"), "utf8"), "preserve\n");
});

test("binding tampering fails verification and cannot be erased by reinstall", t => {
  const app = mkdtempSync(join(tmpdir(), "actionist-affine-binding-integrity-"));
  t.after(() => rmSync(app, { recursive: true, force: true }));
  pass(run("scripts/install-release.mjs", ["--app", app, "--host", fixture]));
  const currentPath = join(app, ".actionist/blocks/affine-workspace/current.json");
  const registryPath = join(app, ".actionist/blocks.json");
  const currentBytes = readFileSync(currentPath);
  const registryBytes = readFileSync(registryPath);
  const pointer = JSON.parse(currentBytes);
  const bindingPath = join(app, ".actionist/blocks/affine-workspace", pointer.binding);
  const binding = JSON.parse(readFileSync(bindingPath));
  binding.routes.workspace_url = "https://wrong-binding.invalid/";
  writeFileSync(bindingPath, JSON.stringify(binding));
  const tamperedBytes = readFileSync(bindingPath);
  assert.throws(() => verifyInstalled(app), /binding_digest_mismatch/);
  assert.throws(() => installRelease({ appPath: app, hostPath: fixture }), /binding_digest_mismatch/);
  assert.deepEqual(readFileSync(currentPath), currentBytes);
  assert.deepEqual(readFileSync(registryPath), registryBytes);
  assert.deepEqual(readFileSync(bindingPath), tamperedBytes);
});

test("a traversal pointer is refused before reading another application", t => {
  const app = mkdtempSync(join(tmpdir(), "actionist-affine-pointer-integrity-"));
  t.after(() => rmSync(app, { recursive: true, force: true }));
  pass(run("scripts/install-release.mjs", ["--app", app, "--host", fixture]));
  const currentPath = join(app, ".actionist/blocks/affine-workspace/current.json");
  const pointer = JSON.parse(readFileSync(currentPath));
  pointer.release_directory = "../../../../outside";
  writeFileSync(currentPath, JSON.stringify(pointer));
  assert.throws(() => verifyInstalled(app), /release_escapes_root/);
  assert.throws(() => installRelease({ appPath: app, hostPath: fixture }), /current_release_escapes_root/);
});
