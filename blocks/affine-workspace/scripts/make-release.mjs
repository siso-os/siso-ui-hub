import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { createReleaseManifest, releaseDigestPath, releaseManifestPath, sha256 } from "./release-lib.mjs";

const manifest = createReleaseManifest();
const bytes = Buffer.from(`${JSON.stringify(manifest, null, 2)}\n`);
if (process.argv.includes("--write")) {
  writeFileSync(releaseManifestPath, bytes);
  writeFileSync(releaseDigestPath, `${sha256(bytes)}\n`);
  console.log(JSON.stringify({ status: "PASS", release_id: manifest.release_id, manifest: resolve(releaseManifestPath), manifest_sha256: sha256(bytes) }, null, 2));
} else {
  process.stdout.write(bytes);
}
