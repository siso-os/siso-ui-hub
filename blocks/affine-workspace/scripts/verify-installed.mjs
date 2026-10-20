import { existsSync, lstatSync, realpathSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readJson, resolveContained, verifyBinding, verifyRelease } from "./release-lib.mjs";

export function verifyInstalled(appPath) {
  const appRoot = resolve(appPath);
  const actionistRoot = resolveContained(appRoot, ".actionist", "actionist_root");
  if (!existsSync(actionistRoot)) throw new Error("INSTALL_INVALID: actionist_root_missing");
  if (lstatSync(actionistRoot).isSymbolicLink()) throw new Error("INSTALL_INVALID: actionist_root_symlink");
  const registry = readJson(resolveContained(appRoot, ".actionist/blocks.json", "registry"));
  if (registry.schema_version !== "actionist.host-block-registry.v1" || !Array.isArray(registry.blocks) || typeof registry.application_id !== "string" || !registry.application_id) throw new Error("INSTALL_INVALID: registry_invalid");
  const pointer = readJson(resolveContained(appRoot, ".actionist/blocks/affine-workspace/current.json", "current_pointer"));
  if (pointer.block_id !== "actionist/affine-workspace" || typeof pointer.release_directory !== "string" || typeof pointer.binding !== "string") throw new Error("INSTALL_INVALID: pointer_invalid");
  const blockStateRoot = resolveContained(actionistRoot, "blocks/affine-workspace", "block_state");
  const releaseRoot = resolveContained(blockStateRoot, pointer.release_directory, "release");
  const verified = verifyRelease(releaseRoot);
  const rows = registry.blocks.filter(row => row?.block_id === pointer.block_id);
  if (rows.length !== 1 || rows[0].release_id !== pointer.release_id) throw new Error("INSTALL_INVALID: registry_pointer_mismatch");
  if (verified.manifest.release_id !== pointer.release_id) throw new Error("INSTALL_INVALID: release_pointer_mismatch");
  if (pointer.binding !== `${pointer.release_directory}/binding.generated.json`) throw new Error("INSTALL_INVALID: binding_pointer_mismatch");
  const { binding, digest } = verifyBinding(releaseRoot);
  if (digest !== pointer.binding_sha256) throw new Error("INSTALL_INVALID: binding_pointer_digest_mismatch");
  if (binding.capability_id !== verified.manifest.block_id || binding.status !== "BOUND" || binding.application_id !== registry.application_id) throw new Error("INSTALL_INVALID: binding_mismatch");
  return { status: "PASS", release_id: pointer.release_id, manifest_sha256: verified.manifestDigest, registration: "PASS", binding: "PASS" };
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const index = process.argv.indexOf("--app");
    if (index < 0 || !process.argv[index + 1]) throw new Error("INSTALL_INVALID: --app is required");
    console.log(JSON.stringify(verifyInstalled(process.argv[index + 1]), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
