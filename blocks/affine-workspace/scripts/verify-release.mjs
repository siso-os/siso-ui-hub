import { existsSync, realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { blockRoot, verifyRelease } from "./release-lib.mjs";

export function verify(root = blockRoot) {
  const result = verifyRelease(root);
  return {
    status: "PASS",
    release_id: result.manifest.release_id,
    manifest_sha256: result.manifestDigest,
    payload_sha256: result.payloadSha256,
    files: result.manifest.files.length,
    qualification: result.manifest.gates.qualification,
    admission: result.manifest.gates.admission
  };
}

if (process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try {
    console.log(JSON.stringify(verify(), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
