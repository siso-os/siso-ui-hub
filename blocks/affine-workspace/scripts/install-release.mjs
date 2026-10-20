import { existsSync, lstatSync, mkdirSync, readFileSync, readdirSync, realpathSync, writeFileSync } from "node:fs";
import { parse, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildBinding, readJson as readHostJson, writeBinding } from "./bind.mjs";
import { blockRoot, copyReleasePayload, readJson, resolveContained, sha256, verifyRelease, writeJson } from "./release-lib.mjs";
import { verifyInstalled } from "./verify-installed.mjs";

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!["--app", "--host"].includes(key)) throw new Error(`INSTALL_REFUSED: unknown_argument:${key}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw new Error(`INSTALL_REFUSED: missing_value:${key}`);
    args[key.slice(2)] = value;
    index += 1;
  }
  return args;
}

function safeReleaseDirectoryName(releaseId) {
  return releaseId.replaceAll("/", "--").replaceAll("@", "--at--").replaceAll("+", "--plus--");
}

export function installRelease({ appPath, hostPath, sourceRoot = blockRoot }) {
  const appRoot = resolve(appPath);
  if (appRoot === parse(appRoot).root) throw new Error("INSTALL_REFUSED: app_is_filesystem_root");
  if (appRoot === resolve(sourceRoot)) throw new Error("INSTALL_REFUSED: app_is_release_source");
  if (!existsSync(appRoot)) mkdirSync(appRoot, { recursive: true });
  if (!lstatSync(appRoot).isDirectory()) throw new Error("INSTALL_REFUSED: app_not_directory");
  const appEntries = readdirSync(appRoot);
  const actionistRoot = resolve(appRoot, ".actionist");
  if (existsSync(actionistRoot) && lstatSync(actionistRoot).isSymbolicLink()) throw new Error("INSTALL_REFUSED: actionist_root_symlink");
  if (appEntries.length > 0 && !existsSync(actionistRoot)) throw new Error("INSTALL_REFUSED: nonempty_app_not_initialized");

  const verified = verifyRelease(sourceRoot);
  const host = readHostJson(resolve(hostPath));
  const blockManifest = readJson(resolve(sourceRoot, "actionist-block.json"));
  const binding = buildBinding(blockManifest, {
    ...host,
    observability: {
      ...host.observability,
      capability_id: verified.manifest.block_id,
      release_id: verified.manifest.release_id
    }
  });
  const blockStateRoot = resolveContained(appRoot, ".actionist/blocks/affine-workspace", "block_state");
  const releasesRoot = resolve(blockStateRoot, "releases");
  const releaseRoot = resolve(releasesRoot, safeReleaseDirectoryName(verified.manifest.release_id));
  const currentPath = resolveContained(appRoot, ".actionist/blocks/affine-workspace/current.json", "current_pointer");
  if (existsSync(currentPath) && lstatSync(currentPath).isSymbolicLink()) throw new Error("INSTALL_REFUSED: current_pointer_symlink");
  const previous = existsSync(currentPath) ? readJson(currentPath) : null;
  if (previous) {
    if (previous.block_id !== verified.manifest.block_id || typeof previous.release_id !== "string" || typeof previous.release_directory !== "string") {
      throw new Error("INSTALL_REFUSED: corrupt_current_pointer");
    }
    resolveContained(blockStateRoot, previous.release_directory, "current_release");
  }
  const registryPath = resolveContained(appRoot, ".actionist/blocks.json", "registry");
  if (existsSync(registryPath) && lstatSync(registryPath).isSymbolicLink()) throw new Error("INSTALL_REFUSED: registry_symlink");
  const registry = existsSync(registryPath) ? readJson(registryPath) : {
    schema_version: "actionist.host-block-registry.v1",
    application_id: host.application_id,
    blocks: []
  };
  if (registry.schema_version !== "actionist.host-block-registry.v1" || !Array.isArray(registry.blocks) || registry.application_id !== host.application_id) throw new Error("INSTALL_REFUSED: registry_identity_mismatch");
  const affineRows = registry.blocks.filter(row => row?.block_id === verified.manifest.block_id);
  if (affineRows.length > 1) throw new Error("INSTALL_REFUSED: duplicate_block_registration");
  if (affineRows.length !== Number(previous !== null)) throw new Error("INSTALL_REFUSED: registry_pointer_mismatch");
  if (previous) verifyInstalled(appRoot);
  resolveContained(appRoot, `.actionist/blocks/affine-workspace/releases/${safeReleaseDirectoryName(verified.manifest.release_id)}`, "release");
  const receiptPath = resolveContained(appRoot, ".actionist/install-receipt.json", "install_receipt");
  const digestPath = resolveContained(appRoot, `.actionist/blocks/affine-workspace/releases/${safeReleaseDirectoryName(verified.manifest.release_id)}/binding.generated.sha256`, "binding_digest");
  resolveContained(appRoot, `.actionist/blocks/affine-workspace/releases/${safeReleaseDirectoryName(verified.manifest.release_id)}/binding.generated.json`, "binding");

  if (!existsSync(releaseRoot)) copyReleasePayload(sourceRoot, releaseRoot, verified.manifest);
  verifyRelease(releaseRoot);
  const bindingPath = writeBinding(binding, releaseRoot);
  const bindingDigest = sha256(readFileSync(bindingPath));
  writeFileSync(digestPath, `${bindingDigest}\n`);
  const pointer = {
    schema_version: "actionist.block-current.v1",
    block_id: verified.manifest.block_id,
    release_id: verified.manifest.release_id,
    release_directory: `releases/${safeReleaseDirectoryName(verified.manifest.release_id)}`,
    binding: `releases/${safeReleaseDirectoryName(verified.manifest.release_id)}/binding.generated.json`,
    binding_sha256: bindingDigest,
    previous_release_id: previous?.release_id && previous.release_id !== verified.manifest.release_id ? previous.release_id : previous?.previous_release_id ?? null
  };
  writeJson(currentPath, pointer);
  const nextRegistry = { ...registry, application_id: host.application_id, blocks: registry.blocks.map(row => row?.block_id === verified.manifest.block_id
    ? { ...row, release_id: verified.manifest.release_id, current: "blocks/affine-workspace/current.json" }
    : row) };
  if (affineRows.length === 0) nextRegistry.blocks.push({ block_id: verified.manifest.block_id, release_id: verified.manifest.release_id, current: "blocks/affine-workspace/current.json" });
  writeJson(registryPath, nextRegistry);
  writeJson(receiptPath, {
    schema_version: "actionist.affine.clean-install.v1",
    status: "PASS",
    initial_app_state: appEntries.length === 0 ? "EMPTY" : "ACTIONIST_INITIALIZED",
    release_id: verified.manifest.release_id,
    manifest_sha256: verified.manifestDigest,
    payload_sha256: verified.payloadSha256,
    host_registration: ".actionist/blocks.json",
    current_pointer: ".actionist/blocks/affine-workspace/current.json",
    generated_binding: pointer.binding,
    source_boundary: {
      hidden_laptop_path: false,
      donor_login_required: false,
      dependency_install_required: false,
      network_required: false,
      credential_value_persisted: false,
      donor_runtime_started: false,
      deployment_performed: false
    },
    qualification: "NOT_QUALIFIED",
    admission: "NOT_ADMITTED"
  });
  return { appRoot, releaseRoot, bindingPath, pointer, manifest: verified.manifest };
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (!args.app || !args.host) throw new Error("INSTALL_REFUSED: --app and --host are required");
    const result = installRelease({ appPath: args.app, hostPath: args.host });
    console.log(JSON.stringify({ status: "PASS", release_id: result.manifest.release_id, registration: ".actionist/blocks.json" }, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
