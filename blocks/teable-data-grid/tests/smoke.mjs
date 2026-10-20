#!/usr/bin/env node

import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cli = path.join(root, "tools", "teable-block.mjs");
const result = spawnSync(process.execPath, [cli, "smoke"], {
  cwd: root,
  encoding: "utf8",
});

assert.equal(result.status, 0, result.stderr || result.stdout);
const receipt = JSON.parse(result.stdout);
assert.equal(receipt.status, "PASS");
assert.equal(receipt.admissionClaimed, false);
assert.equal(receipt.deployment, false);
for (const check of receipt.checks) assert.equal(check.status, "PASS", check.name);
assert.ok(receipt.checks.some((check) => check.name === "missing_or_unverified_identity"));
assert.ok(receipt.checks.some((check) => check.name === "missing_tenant"));
assert.ok(receipt.checks.some((check) => check.name === "missing_migration_owner"));
const scratch = mkdtempSync(path.join(tmpdir(), "teable-contract-test-"));
try {
  const copy = path.join(scratch, "block");
  cpSync(root, copy, { recursive: true });
  const manifestPath = path.join(copy, "actionist-block.json");
  const original = JSON.parse(readFileSync(manifestPath, "utf8"));
  const cases = [
    ["reuse.service_evidence", manifest => { delete manifest.reuse.service_evidence; }],
    ["reuse.service_evidence.replay_denied", manifest => { manifest.reuse.service_evidence.replay_denied = "false"; }],
    ["reuse.service_evidence.data_isolation.object_storage", manifest => { delete manifest.reuse.service_evidence.data_isolation.object_storage; }],
  ];
  for (const [label, corrupt] of cases) {
    const manifest = structuredClone(original);
    corrupt(manifest);
    writeFileSync(manifestPath, JSON.stringify(manifest));
    const refusal = spawnSync(process.execPath, [path.join(copy, "tools/teable-block.mjs"), "validate"], { encoding: "utf8" });
    assert.notEqual(refusal.status, 0, label);
    assert.ok(refusal.stderr.includes(label), refusal.stderr);
  }
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
console.log(JSON.stringify({ status: "PASS", test: "tests/smoke.mjs", checks: receipt.checks.length }, null, 2));
