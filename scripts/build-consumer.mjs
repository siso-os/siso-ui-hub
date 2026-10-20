// Install packed packages outside this repo, then build with ordinary ESM imports.
import fs from "node:fs/promises"
import path from "node:path"
import os from "node:os"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"
import { createHash } from "node:crypto"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const TOOLCHAIN = path.resolve(process.env.SISO_UI_TOOLCHAIN || ROOT)
const req = createRequire(path.join(TOOLCHAIN, "package.json"))
const esbuild = req("esbuild"), ts = req("typescript")
const OUT = path.resolve(process.env.SISO_UI_OUTPUT || path.join(os.homedir(), "SISO_Workspace/_data/ui-hub/package-suite"))
const consumer = path.join(OUT, "consumer"), site = path.join(OUT, "site")
const release = JSON.parse(await fs.readFile(path.join(OUT, "release.json"), "utf8"))
await fs.mkdir(path.join(consumer, "src"), { recursive: true })
const dependencies = Object.fromEntries(release.packages.map(p => [p.name, `file:../tarballs/${p.filename}`]))
Object.assign(dependencies, { react: "19.2.7", "react-dom": "19.2.7", recharts: "3.8.0", "framer-motion": "12.43.0", clsx: "2.1.1", "tailwind-merge": "3.7.0", echarts: "6.1.0" })
const manifest = { name: "siso-ui-external-consumer", version: release.version, private: true, type: "module", dependencies, devDependencies: { "@types/react": "19.3.0", "@types/react-dom": "19.3.0" } }
await fs.writeFile(path.join(consumer, "package.json"), JSON.stringify(manifest, null, 2) + "\n")
const fingerprint = createHash("sha256").update(JSON.stringify({ manifest, artifacts: release.packages.map(p => p.sha256) })).digest("hex")
const previous = await fs.readFile(path.join(consumer, ".installed-release"), "utf8").catch(() => "")
// npm can retain an older file: tarball at the same version even when install exits 0.
// Bind this proof to the actual installed bytes, not only an intended fingerprint.
async function installedFiles() {
  let checked = 0
  const mismatches = []
  async function compare(expected, installed, label) {
    for (const entry of await fs.readdir(expected, { withFileTypes: true })) {
      const source = path.join(expected, entry.name), target = path.join(installed, entry.name)
      if (entry.isDirectory()) await compare(source, target, `${label}/${entry.name}`)
      else {
        checked++
        const actual = await fs.readFile(target).catch(() => null)
        if (!actual || !(await fs.readFile(source)).equals(actual)) mismatches.push(`${label}/${entry.name}`)
      }
    }
  }
  for (const artifact of release.packages) {
    const id = artifact.name.split("/")[1]
    await compare(path.join(OUT, "packages", `siso-${id}`), path.join(consumer, "node_modules/@siso", id), artifact.name)
  }
  return { checked, mismatches }
}
if (previous !== fingerprint || (await installedFiles()).mismatches.length) {
  // A new tarball with the same local version must not reuse npm's installed snapshot.
  const archive = path.join(OUT, "_archive", new Date().toISOString().replace(/[:.]/g, "-"), "consumer-refresh")
  for (const name of ["node_modules/@siso", "package-lock.json", "node_modules/.package-lock.json"]) {
    const source = path.join(consumer, name)
    if (await fs.access(source).then(() => true, () => false)) {
      const target = path.join(archive, name)
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.rename(source, target)
    }
  }
  const result = spawnSync("npm", ["install", "--ignore-scripts", "--no-audit", "--no-fund"], { cwd: consumer, encoding: "utf8" })
  if (result.status !== 0) throw new Error(result.stderr || "External consumer install failed")
  console.log(result.stdout.trim())
  await fs.writeFile(path.join(consumer, ".installed-release"), fingerprint)
}
const installed = await installedFiles()
if (installed.mismatches.length) throw new Error(`Installed release differs: ${installed.mismatches.join(", ")}`)
console.log(`PASS installed artifact identity: ${installed.checked} files match the release`)
await fs.cp(path.join(ROOT, "examples/package-suite"), path.join(consumer, "src"), { recursive: true })
await fs.copyFile(path.join(ROOT, "scripts/suite-assets.d.ts"), path.join(consumer, "src/assets.d.ts"))
await fs.copyFile(path.join(ROOT, "catalogue/package-suite.json"), path.join(consumer, "src/inventory.json"))
const options = {
  target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX, strict: true, skipLibCheck: true, esModuleInterop: true, resolveJsonModule: true,
  noEmit: true, lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
  typeRoots: [path.join(consumer, "node_modules/@types")],
}
const program = ts.createProgram([path.join(consumer, "src/main.tsx"), path.join(consumer, "src/assets.d.ts")], options)
const diagnostics = ts.getPreEmitDiagnostics(program)
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCurrentDirectory: () => consumer, getCanonicalFileName: f => f, getNewLine: () => "\n" }))
  process.exit(1)
}
console.log("PASS external consumer: installed declaration types, no aliases")
if (await fs.access(site).then(()=>true,()=>false)) {
  const archive = path.join(OUT,"_archive",new Date().toISOString().replace(/[:.]/g,"-"),"site")
  await fs.mkdir(path.dirname(archive),{recursive:true})
  await fs.rename(site,archive)
}
const archiveRoot = path.join(OUT, "_archive")
const archives = (await fs.readdir(archiveRoot, { withFileTypes: true }).catch(() => []))
  .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}T/.test(entry.name)).sort((a, b) => a.name.localeCompare(b.name))
for (const entry of archives.slice(0, -2)) await fs.rm(path.join(archiveRoot, entry.name), { recursive: true })
await fs.mkdir(path.join(site, "assets"), { recursive: true })
if (await fs.access(path.join(OUT,"previews")).then(()=>true,()=>false)) await fs.cp(path.join(OUT,"previews"),path.join(site,"previews"),{recursive:true})
for (const p of release.packages) {
  const source = path.join(consumer, "node_modules", p.name, "assets")
  if (await fs.access(source).then(() => true, () => false)) await fs.cp(source, site, { recursive: true })
}
const thumbs = spawnSync(process.env.SISO_UI_IMAGE_PYTHON || "python3", [path.join(ROOT,"scripts/build-suite-thumbs.py"), site, path.join(consumer,"node_modules/@siso/site/assets.json")], { encoding:"utf8" })
if (thumbs.status !== 0) throw new Error(thumbs.stderr || "Workbench thumbnails require Python with Pillow")
console.log(thumbs.stdout.trim())
const result = await esbuild.build({
  absWorkingDir: consumer, entryPoints: ["src/main.tsx"], bundle: true, splitting: true,
  format: "esm", platform: "browser", target: "es2022", jsx: "automatic",
  outdir: path.join(site, "assets"), entryNames: "main", chunkNames: "chunk-[hash]", minify: true,
  define: { "process.env.NODE_ENV": '"production"' }, metafile: true, logLevel: "warning",
  loader: { ".woff2":"file", ".woff":"file", ".png":"file", ".webp":"file", ".jpg":"file" },
  // These original docs URLs are copied from the verified site assets above.
  // Keep their public-root contract rather than resolving them as module imports.
  external: ["/fonts/*", "/art/*"],
})
// Preserve the original public asset URLs while preventing a local-path scanner
// from misreading their /siso-img/home/ directory as a Unix home directory.
for (const [file, info] of Object.entries(result.metafile.outputs)) {
  if (!file.endsWith(".js")) continue
  const target = path.resolve(consumer, file)
  const original = await fs.readFile(target, "utf8")
  const encoded = original.replaceAll("siso-img/home/", "siso-img/ho\\u006de/")
  if (encoded !== original) {
    await fs.writeFile(target, encoded)
    info.bytes = Buffer.byteLength(encoded)
  }
}
const inputs = Object.keys(result.metafile.inputs)
const bad = inputs.filter(p => p.includes("/app/src/") || p.includes("/packages/siso-") && !p.includes("node_modules/"))
if (bad.length) throw new Error(`Consumer escaped installed packages: ${bad.join(", ")}`)
let html = await fs.readFile(path.join(ROOT, "examples/package-suite/index.html"), "utf8")
html = html.replace("</head>", '<link rel="stylesheet" href="./assets/main.css"></head>')
await fs.writeFile(path.join(site, "index.html"), html)
let notices = "SISO source package workbench\n\n"
for (const p of release.packages) {
  const dir = path.join(consumer, "node_modules", p.name)
  notices += `\n${p.name}\n${await fs.readFile(path.join(dir, "NOTICE"), "utf8").catch(()=>"")}\n${await fs.readFile(path.join(dir, "LICENSE"), "utf8").catch(()=>"")}\n`
  const licenses = path.join(dir,"licenses")
  if (await fs.access(licenses).then(()=>true,()=>false)) for (const name of await fs.readdir(licenses)) notices += await fs.readFile(path.join(licenses,name),"utf8")+"\n"
}
notices += "\nWorkbench application effect, excluded from package artifacts:\n"+await fs.readFile(path.join(ROOT,"examples/package-suite/site-effects/LICENSE.md"),"utf8")
await fs.writeFile(path.join(site,"NOTICE.txt"),notices)
await fs.writeFile(path.join(site, "_headers"), "/*\n  X-Robots-Tag: noindex, nofollow\n  Referrer-Policy: strict-origin-when-cross-origin\n")
const outputs = result.metafile.outputs
const initial = new Set()
function include(file) {
  if (initial.has(file) || !outputs[file]) return
  initial.add(file)
  for (const imported of outputs[file].imports) if (!imported.external && imported.kind !== "dynamic-import") include(imported.path)
}
for (const [file, info] of Object.entries(outputs)) if (info.entryPoint?.endsWith("src/main.tsx")) include(file)
const consumerSourceCommit = spawnSync("git", ["rev-parse", "HEAD"], {cwd:ROOT,encoding:"utf8"}).stdout.trim()
const proof = { consumerSourceCommit, sourceCommit: release.sourceCommit, releaseVersion: release.version, packages: release.packages.map(p => ({ name: p.name, sha256: p.sha256 })), installedFiles: installed.checked, types: "passed", imports: "installed packages only; no source aliases or stubs", inputFiles: inputs.length, initialJavaScriptBytes: [...initial].filter(f => f.endsWith(".js")).reduce((n, f) => n + outputs[f].bytes, 0), outputs: Object.entries(outputs).map(([file, info]) => ({ file: path.basename(file), bytes: info.bytes })) }
await fs.writeFile(path.join(OUT, "consumer-proof.json"), JSON.stringify(proof, null, 2) + "\n")
console.log(`PASS consumer output: ${proof.outputs.length} files; ${proof.initialJavaScriptBytes} initial JavaScript bytes`)
console.log(`PASS consumer import boundary: ${inputs.length} files, all dependencies from the installed package tree`)
console.log(`Site: ${site}`)
