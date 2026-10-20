import { existsSync, realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readJson, resolveContained, verifyBinding, verifyRelease, writeJson } from "./release-lib.mjs";
import { verifyInstalled } from "./verify-installed.mjs";

function directoryName(releaseId) {
  return releaseId.replaceAll("/", "--").replaceAll("@", "--at--").replaceAll("+", "--plus--");
}

export function rollbackRelease({ appPath, targetReleaseId }) {
  verifyInstalled(appPath);
  const blockRoot = resolveContained(resolve(appPath), ".actionist/blocks/affine-workspace", "block_state");
  const currentPath = resolveContained(blockRoot, "current.json", "current_pointer");
  const current = readJson(currentPath);
  if (current.block_id !== "actionist/affine-workspace" || typeof current.release_id !== "string") throw new Error("ROLLBACK_REFUSED: corrupt_current_pointer");
  if (current.release_id === targetReleaseId) throw new Error("ROLLBACK_REFUSED: target_is_current");
  const targetDirectory = `releases/${directoryName(targetReleaseId)}`;
  const targetRoot = resolveContained(blockRoot, targetDirectory, "target_release");
  if (!existsSync(targetRoot)) throw new Error("ROLLBACK_REFUSED: target_not_installed");
  const target = verifyRelease(targetRoot);
  if (target.manifest.release_id !== targetReleaseId) throw new Error("ROLLBACK_REFUSED: target_identity_mismatch");
  const registryPath = resolveContained(resolve(appPath), ".actionist/blocks.json", "registry");
  const registry = readJson(registryPath);
  if (!Array.isArray(registry.blocks)) throw new Error("ROLLBACK_REFUSED: corrupt_registry");
  const rows = registry.blocks.filter(row => row?.block_id === target.manifest.block_id);
  if (rows.length !== 1) throw new Error("ROLLBACK_REFUSED: registry_pointer_mismatch");
  const { binding, digest } = verifyBinding(targetRoot);
  if (binding.application_id !== registry.application_id || binding.capability_id !== target.manifest.block_id || binding.status !== "BOUND") throw new Error("ROLLBACK_REFUSED: target_binding_mismatch");
  writeJson(currentPath, {
    schema_version: "actionist.block-current.v1",
    block_id: target.manifest.block_id,
    release_id: targetReleaseId,
    release_directory: targetDirectory,
    binding: `${targetDirectory}/binding.generated.json`,
    binding_sha256: digest,
    previous_release_id: current.release_id
  });
  registry.blocks = registry.blocks.map(row => row?.block_id === target.manifest.block_id ? { ...row, release_id: targetReleaseId } : row);
  writeJson(registryPath, registry);
  return { status: "PASS", release_id: targetReleaseId, previous_release_id: current.release_id };
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const appIndex = process.argv.indexOf("--app");
    const toIndex = process.argv.indexOf("--to");
    if (appIndex < 0 || toIndex < 0 || !process.argv[appIndex + 1] || !process.argv[toIndex + 1]) throw new Error("ROLLBACK_REFUSED: --app and --to are required");
    console.log(JSON.stringify(rollbackRelease({ appPath: process.argv[appIndex + 1], targetReleaseId: process.argv[toIndex + 1] }), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
