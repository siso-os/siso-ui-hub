import { createHash } from "node:crypto";
import { cpSync, existsSync, lstatSync, mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const blockRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
export const releaseManifestPath = resolve(blockRoot, "release/immutable-release.json");
export const releaseDigestPath = resolve(blockRoot, "release/immutable-release.sha256");

export function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

export function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export function assertRelativeFile(root, path, label = "file") {
  if (typeof path !== "string" || !path || path.startsWith("/") || /^[A-Za-z]:[\\/]/.test(path)) {
    throw new Error(`RELEASE_REFUSED: ${label}_not_relative:${path}`);
  }
  const target = resolveContained(root, path, label);
  const fromRoot = relative(root, target);
  if (fromRoot === ".." || fromRoot.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)) {
    throw new Error(`RELEASE_REFUSED: ${label}_escapes_root:${path}`);
  }
  if (!existsSync(target) || !lstatSync(target).isFile()) {
    throw new Error(`RELEASE_REFUSED: ${label}_missing:${path}`);
  }
  return target;
}

export function resolveContained(root, path, label = "path") {
  if (typeof path !== "string" || !path || path.startsWith("/") || /^[A-Za-z]:[\\/]/.test(path)) {
    throw new Error(`INSTALL_INVALID: ${label}_not_relative`);
  }
  const rootReal = resolve(root);
  const target = resolve(root, path);
  const fromRoot = relative(rootReal, target);
  if (fromRoot === ".." || fromRoot.startsWith(`..${process.platform === "win32" ? "\\" : "/"}`)) {
    throw new Error(`INSTALL_INVALID: ${label}_escapes_root`);
  }
  let existing = target;
  while (!existsSync(existing) && existing !== rootReal) existing = dirname(existing);
  const canonicalRoot = existsSync(rootReal) ? realpathSync(rootReal) : rootReal;
  if (existsSync(existing) && !realpathSync(existing).startsWith(`${canonicalRoot}/`) && realpathSync(existing) !== canonicalRoot) {
    throw new Error(`INSTALL_INVALID: ${label}_symlink_escape`);
  }
  return target;
}

export function verifyBinding(root) {
  const bytes = readFileSync(assertRelativeFile(root, "binding.generated.json", "binding"));
  const expected = readFileSync(assertRelativeFile(root, "binding.generated.sha256", "binding_digest"), "utf8").trim();
  const digest = sha256(bytes);
  if (digest !== expected) throw new Error("INSTALL_INVALID: binding_digest_mismatch");
  return { binding: JSON.parse(bytes), digest };
}

export function createReleaseManifest(root = blockRoot) {
  const spec = readJson(resolve(root, "release/release-spec.json"));
  const payloadPaths = [...new Set(spec.payload_paths)].sort();
  if (payloadPaths.length !== spec.payload_paths.length) throw new Error("RELEASE_REFUSED: duplicate_payload_path");
  const files = payloadPaths.map(path => {
    const bytes = readFileSync(assertRelativeFile(root, path, "payload"));
    return { path, bytes: bytes.byteLength, sha256: sha256(bytes) };
  });
  const payloadSha256 = sha256(Buffer.from(stableJson(files)));
  return {
    schema_version: "actionist.affine.immutable-release.v1",
    block_id: spec.block_id,
    version: spec.version,
    release_id: `${spec.block_id}@${spec.version}+sha256.${payloadSha256}`,
    payload_sha256: payloadSha256,
    source: spec.source,
    accepted_artifact: spec.accepted_artifact,
    adaptation: spec.adaptation,
    runtime: spec.runtime,
    configuration_schema: spec.configuration_schema,
    rights_provenance: spec.rights_provenance,
    installer: {
      command: "node scripts/install-release.mjs --app <empty-or-actionist-app> --host <host.json>",
      verify_command: "node scripts/verify-installed.mjs --app <actionist-app>",
      rollback_command: "node scripts/rollback-release.mjs --app <actionist-app> --to <release-id>",
      network_required: false,
      dependency_install_required: false
    },
    evidence: spec.evidence,
    gates: spec.gates,
    files
  };
}

export function verifyRelease(root = blockRoot, manifestPath = resolve(root, "release/immutable-release.json"), digestPath = resolve(root, "release/immutable-release.sha256")) {
  const manifestBytes = readFileSync(manifestPath);
  const recordedManifestDigest = readFileSync(digestPath, "utf8").trim();
  const manifestDigest = sha256(manifestBytes);
  if (recordedManifestDigest !== manifestDigest) throw new Error("RELEASE_REFUSED: manifest_digest_mismatch");
  const manifest = JSON.parse(manifestBytes);
  const observedFiles = manifest.files.map(file => {
    const bytes = readFileSync(assertRelativeFile(root, file.path, "payload"));
    const digest = sha256(bytes);
    if (digest !== file.sha256 || bytes.byteLength !== file.bytes) throw new Error(`RELEASE_REFUSED: payload_digest_mismatch:${file.path}`);
    return { path: file.path, bytes: bytes.byteLength, sha256: digest };
  });
  const payloadSha256 = sha256(Buffer.from(stableJson(observedFiles)));
  if (payloadSha256 !== manifest.payload_sha256) throw new Error("RELEASE_REFUSED: payload_identity_mismatch");
  const expectedReleaseId = `${manifest.block_id}@${manifest.version}+sha256.${payloadSha256}`;
  if (manifest.release_id !== expectedReleaseId) throw new Error("RELEASE_REFUSED: release_id_mismatch");
  return { manifest, manifestDigest, payloadSha256 };
}

export function copyReleasePayload(sourceRoot, destinationRoot, manifest) {
  for (const file of manifest.files) {
    const source = assertRelativeFile(sourceRoot, file.path, "payload");
    const destination = resolve(destinationRoot, file.path);
    mkdirSync(dirname(destination), { recursive: true });
    cpSync(source, destination);
  }
  mkdirSync(resolve(destinationRoot, "release"), { recursive: true });
  cpSync(resolve(sourceRoot, "release/immutable-release.json"), resolve(destinationRoot, "release/immutable-release.json"));
  cpSync(resolve(sourceRoot, "release/immutable-release.sha256"), resolve(destinationRoot, "release/immutable-release.sha256"));
}

export function writeJson(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}
