import { cpSync, existsSync, mkdirSync, readdirSync, realpathSync, statSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildBinding, packageRoot, parseArgs, readJson, writeBinding } from "./bind.mjs";
import { validatePackage } from "./validate.mjs";

function isMain() {
  return process.argv[1] && existsSync(process.argv[1]) && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
}

function copyPackage(sourceRoot, destinationRoot) {
  const entries = [
    "README.md",
    "package.json",
    "actionist-block.json",
    "records",
    "schemas",
    "config",
    "fixture",
    "host-binding",
    "scripts",
  ];
  mkdirSync(destinationRoot, { recursive: true });
  for (const entry of entries) {
    const source = resolve(sourceRoot, entry);
    if (!existsSync(source)) throw new Error(`INSTALL_REFUSED: missing_package_entry:${entry}`);
    cpSync(source, resolve(destinationRoot, entry), { recursive: true });
  }
}

export function installPackage({ hostPath, outDir, force = false }) {
  const sourceRoot = packageRoot;
  const destinationRoot = resolve(outDir);
  if (destinationRoot === sourceRoot) throw new Error("INSTALL_REFUSED: output_is_package_root");
  if (existsSync(destinationRoot) && readdirSync(destinationRoot).length > 0 && !force) {
    throw new Error("INSTALL_REFUSED: output_not_empty_use_force");
  }
  validatePackage({ root: sourceRoot });
  const manifest = readJson(resolve(sourceRoot, "actionist-block.json"));
  const host = readJson(resolve(hostPath));
  const binding = buildBinding(manifest, host);
  copyPackage(sourceRoot, destinationRoot);
  const bindingPath = writeBinding(binding, destinationRoot);
  const installReceipt = {
    schema_version: "actionist.affine.install.v1",
    block_id: manifest.block_id,
    capability_id: manifest.capability_id,
    installed_from: "package-relative",
    source_boundary: {
      source_copied: false,
      donor_repository_vendored: false,
      secrets_embedded: false,
      absolute_client_paths_embedded: false,
      deployment_performed: false,
    },
    generated_binding: "binding.generated.json",
  };
  writeFileSync(resolve(destinationRoot, ".actionist-install.json"), `${JSON.stringify(installReceipt, null, 2)}\n`, "utf8");
  return { destinationRoot, bindingPath, files: readdirSync(destinationRoot).sort() };
}

if (isMain()) {
  try {
    const args = parseArgs(process.argv.slice(2));
    if (args.help) {
      console.log("Usage: node scripts/install.mjs --host <host.json> --out <directory> [--force]");
      process.exit(0);
    }
    if (!args.host) throw new Error("--host is required");
    if (!args.out) throw new Error("--out is required");
    const hostPath = resolve(args.host);
    if (!existsSync(hostPath) || !statSync(hostPath).isFile()) throw new Error(`Host fixture not found: ${hostPath}`);
    const result = installPackage({ hostPath, outDir: args.out, force: args.force });
    console.log(JSON.stringify({ status: "PASS", output: result.destinationRoot, binding: result.bindingPath }, null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
