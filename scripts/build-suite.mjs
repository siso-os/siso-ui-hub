// Build real, independently installable packages; no Vite aliases or hub stubs.
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
const esbuild = req("esbuild")
const ts = req("typescript")
const OUT = path.resolve(process.env.SISO_UI_OUTPUT || path.join(os.homedir(), "SISO_Workspace/_data/ui-hub/package-suite"))
const NAMES = ["tokens", "atoms", "blocks", "navigation", "shells", "widgets", "charts", "site", "agent", "ui"]
const readJson = async (p) => JSON.parse(await fs.readFile(p, "utf8"))
const exists = async (p) => fs.access(p).then(() => true, () => false)

const packages = await Promise.all(NAMES.map(async (name) => {
  const dir = path.join(ROOT, "packages", `siso-${name}`)
  const manifest = await readJson(path.join(dir, "package.json"))
  if (manifest.name !== `@siso/${name}`) throw new Error(`Unexpected package name in ${name}`)
  return { name, dir, manifest }
}))
const uiPackage = packages.find(p => p.name === "ui")
for (const [subpath, target] of Object.entries(uiPackage.manifest.exports)) {
  if (typeof target === "string" && !await exists(path.join(uiPackage.dir, target))) throw new Error(`Missing @siso/ui source route ${subpath}: ${target}`)
}
const sourceAssets = await fs.readFile(path.join(ROOT, "packages/siso-site/assets.json"))
const uiAssets = await fs.readFile(path.join(uiPackage.dir, "site-assets.json"))
if (!uiAssets.equals(sourceAssets)) throw new Error("@siso/ui/site/assets.json must stay byte-identical to @siso/site/assets.json")
const echartsProof = await readJson(path.join(ROOT, "packages/siso-charts/echarts-provenance.json"))
const chartsPackage = packages.find(p => p.name === "charts")
const rootManifest = await readJson(path.join(ROOT, "package.json"))
if (echartsProof.files.length !== 149 || echartsProof.echartsDependency.version !== "6.1.0" || echartsProof.echartsDependency.license !== "Apache-2.0") throw new Error("Unexpected ECharts source manifest, dependency version, or license")
if (rootManifest.devDependencies.echarts !== "6.1.0" || chartsPackage.manifest.peerDependencies.echarts !== "6.1.0" || chartsPackage.manifest.peerDependenciesMeta.echarts?.optional !== true) throw new Error("ECharts must remain a pinned toolchain dependency and optional chart peer")
const echartsLicense = await fs.readFile(path.join(ROOT, echartsProof.echartsDependency.licenseFile))
if (createHash("sha256").update(echartsLicense).digest("hex") !== echartsProof.echartsDependency.licenseFileSha256) throw new Error("ECharts Apache-2.0 notice changed")
for (const file of echartsProof.files) {
  for (const [field, expected] of [["sourcePath", file.sourceSha256], ["targetPath", file.adaptedSha256]]) {
    const bytes = await fs.readFile(path.join(ROOT, file[field]))
    if (createHash("sha256").update(bytes).digest("hex") !== expected) throw new Error(`ECharts source manifest mismatch: ${file[field]}`)
  }
}
const paths = Object.fromEntries(packages.map((p) => [`@siso/${p.name}`, [path.join(p.dir, "src/index.ts")]]))
for (const p of packages) paths[`@siso/${p.name}/*`] = [path.join(p.dir, "src/*")]
paths["@siso/charts/source"] = [path.join(ROOT, "packages/siso-charts/src/arc/index.tsx")]
paths["@siso/charts/echarts"] = [path.join(ROOT, "packages/siso-charts/src/echarts/index.ts")]
paths.react = [path.join(TOOLCHAIN, "node_modules/@types/react/index.d.ts")]
paths["react/*"] = [path.join(TOOLCHAIN, "node_modules/@types/react/*")]
paths["react-dom"] = [path.join(TOOLCHAIN, "node_modules/@types/react-dom/index.d.ts")]
paths["react-dom/*"] = [path.join(TOOLCHAIN, "node_modules/@types/react-dom/*")]
paths["*"] = [path.join(TOOLCHAIN, "node_modules/*")]
const assetTypes = path.join(ROOT, "scripts/suite-assets.d.ts")
const options = {
  target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX,
  strict: true, skipLibCheck: true, esModuleInterop: true, resolveJsonModule: true,
  declaration: true, emitDeclarationOnly: true, rootDir: path.join(ROOT, "packages"),
  outDir: path.join(OUT, "types"), baseUrl: ROOT, paths,
  typeRoots: [path.join(TOOLCHAIN, "node_modules/@types")],
  lib: ["lib.es2022.d.ts", "lib.dom.d.ts", "lib.dom.iterable.d.ts"],
}
const uiAliases = ["atoms-source", "atoms-hub", "blocks-source", "charts-source", "charts-presets", "charts-echarts", "shells-agent-base", "navigation-agent-base", "site"].map(name => path.join(ROOT, "packages/siso-ui/src", `${name}.ts`))
const program = ts.createProgram([...packages.map((p) => path.join(p.dir, "src/index.ts")), ...uiAliases, path.join(ROOT,"packages/siso-charts/src/presets/index.ts"), assetTypes], options)
// Free Arc code is MIT. Keep the original implementations and prove that every
// shipped Arc file belongs to the reviewed free-tier source manifest.
const arcProof = await readJson(path.join(ROOT, "packages/siso-charts/source-provenance.json"))
if (arcProof.components.some(c => c.tier !== "free")) throw new Error("Only MIT/free Arc sources may ship")
for (const file of program.getSourceFiles()) {
  const name = file.fileName.replaceAll("\\", "/")
  if (name.startsWith((path.join(ROOT, "_reference") + path.sep).replaceAll("\\", "/"))) throw new Error("Provenance snapshots cannot enter the kit's executable graph")
  if (/\/siso-charts\/src\/tweenly\//.test(name)) throw new Error("Unverified Tweenly registry source cannot ship")
  if (/\/siso-site\/.*\/(LaserBeam|Beam)\.tsx$/.test(name)) throw new Error("The application shader must not enter reusable package artifacts")
  if (!/\/siso-charts\/src\/arc\//.test(name)) continue
  const relative = path.relative(path.join(ROOT, "packages/siso-charts"), file.fileName)
  const digest = createHash("sha256").update(await fs.readFile(file.fileName)).digest("hex")
  if (arcProof.files[relative] !== digest) throw new Error(`Unreviewed Arc source: ${relative}`)
}
const diagnostics = ts.getPreEmitDiagnostics(program)
if (diagnostics.length) {
  console.error(ts.formatDiagnosticsWithColorAndContext(diagnostics, {
    getCurrentDirectory: () => ROOT, getCanonicalFileName: (f) => f, getNewLine: () => "\n",
  }))
  process.exit(1)
}
console.log(`PASS declarations/typecheck: ${packages.length} packages`)
if (process.argv.includes("--check")) process.exit(0)
await fs.mkdir(OUT, { recursive: true })
const archive = path.join(OUT, "_archive", new Date().toISOString().replace(/[:.]/g, "-"))
for (const name of ["packages", "types", "tarballs", "release.json"]) {
  if (await exists(path.join(OUT, name))) {
    await fs.mkdir(archive, { recursive: true })
    await fs.rename(path.join(OUT, name), path.join(archive, name))
  }
}
const archives = (await fs.readdir(path.join(OUT, "_archive"), { withFileTypes: true }).catch(() => []))
  .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}T/.test(entry.name)).sort((a, b) => a.name.localeCompare(b.name))
for (const entry of archives.slice(0, -2)) await fs.rm(path.join(OUT, "_archive", entry.name), { recursive: true })
const emit = program.emit()
if (emit.diagnostics.length) console.error(ts.formatDiagnosticsWithColorAndContext(emit.diagnostics, { getCurrentDirectory: () => ROOT, getCanonicalFileName: f => f, getNewLine: () => "\n" }))
if (emit.diagnostics.some(d => d.category === ts.DiagnosticCategory.Error)) throw new Error("Declaration emit failed")
// TypeScript marks declaration-only emit as skipped for an imported JSON file:
// JSON has no declaration output. Check the actual TS declaration artifacts.
for (const source of program.getSourceFiles().filter(f => !f.isDeclarationFile && /\.[cm]?tsx?$/.test(f.fileName) && f.fileName.startsWith(path.join(ROOT,"packages")+path.sep))) {
  const output = path.join(OUT,"types",path.relative(path.join(ROOT,"packages"),source.fileName).replace(/\.[cm]?tsx?$/, ".d.ts"))
  if (!await exists(output)) throw new Error(`Missing emitted declaration: ${path.relative(ROOT,source.fileName)}`)
}
// Some public declaration types refer to source JSON (the blog art layers).
// Ship those values beside the declarations as well as bundling them in JS.
for (const source of program.getSourceFiles().filter(f => f.fileName.endsWith(".json") && f.fileName.startsWith(path.join(ROOT,"packages")+path.sep))) {
  const output = path.join(OUT,"types",path.relative(path.join(ROOT,"packages"),source.fileName))
  await fs.mkdir(path.dirname(output),{recursive:true})
  await fs.copyFile(source.fileName,output)
}
const sourceCommit = spawnSync("git",["rev-parse","HEAD"],{cwd:ROOT,encoding:"utf8"}).stdout.trim()
const release = { sourceCommit, version: packages.find(p => p.name === "ui").manifest.version, packages: [], builtAt: new Date().toISOString() }
await fs.mkdir(path.join(OUT, "tarballs"), { recursive: true })
for (const p of packages) {
  const dest = path.join(OUT, "packages", `siso-${p.name}`)
  await fs.mkdir(path.join(dest, "dist"), { recursive: true })
  const entries = { index: path.join(p.dir, "src/index.ts") }
  if (p.name === "charts") Object.assign(entries, { basic: path.join(p.dir, "src/basic.ts"), series: path.join(p.dir, "src/series/index.ts"), special: path.join(p.dir, "src/special/index.ts") })
  if (p.name === "charts") entries.source = path.join(p.dir, "src/arc/index.tsx")
  if (p.name === "charts") entries.presets = path.join(p.dir, "src/presets/index.ts")
  if (p.name === "charts") entries.echarts = path.join(p.dir, "src/echarts/index.ts")
  if (p.name === "ui") Object.assign(entries, {
    "atoms-source": path.join(p.dir, "src/atoms-source.ts"), "blocks-source": path.join(p.dir, "src/blocks-source.ts"),
    "charts-source": path.join(p.dir, "src/charts-source.ts"), "charts-presets": path.join(p.dir, "src/charts-presets.ts"), "charts-echarts": path.join(p.dir, "src/charts-echarts.ts"),
    "shells-agent-base": path.join(p.dir, "src/shells-agent-base.ts"), "navigation-agent-base": path.join(p.dir, "src/navigation-agent-base.ts"),
  })
  if (["atoms","blocks"].includes(p.name)) entries.source = path.join(p.dir, "src/source/index.ts")
  if (p.name === "atoms") entries.hub = path.join(p.dir, "src/hub/index.ts")
  if (["shells","navigation"].includes(p.name)) entries["agent-base"] = path.join(p.dir,"src/agent-base/index.ts")
  const compiled = await esbuild.build({
    entryPoints: entries, outdir: path.join(dest, "dist"), splitting: true, chunkNames: "chunk-[hash]",
    bundle: true, packages: "external", format: "esm", platform: "browser", target: "es2022",
    jsx: "automatic", minify: false, sourcemap: false, logLevel: "warning",
    loader: { ".png":"dataurl", ".svg":"dataurl", ".webp":"dataurl" },
    banner: p.name === "tokens" ? undefined : { js: '"use client";' },
    metafile: true,
  })
  if (p.name === "charts" && Object.keys(compiled.metafile.inputs).some(f => /\/src\/tweenly\//.test(f))) throw new Error("Unverified registry implementation entered the chart release")
  await fs.cp(path.join(OUT, "types", `siso-${p.name}`, "src"), path.join(dest, "dist"), { recursive: true })
  let css = ""
  for (const file of ["styles.css", "src/styles.css", "dist/index.css"]) {
    const source = file.startsWith("dist/") ? path.join(dest, file) : path.join(p.dir, file)
    if (await exists(source)) css += await fs.readFile(source, "utf8") + "\n"
  }
  if (p.name === "tokens") {
    for (const file of ["siso.css", "tokens.css", "source-themes.css", "fonts.css"]) await fs.copyFile(path.join(p.dir, file), path.join(dest, "dist", file))
  }
  if (["atoms","blocks"].includes(p.name)) {
    const foundation = await fs.readFile(path.join(p.dir, "src/source/foundation.scoped.css"), "utf8")
    const modules = await fs.readFile(path.join(dest, "dist/source.css"), "utf8").catch(()=>"")
    await fs.writeFile(path.join(dest, "dist/source.css"), foundation + "\n" + modules)
    css += foundation
  }
  if (p.name === "navigation") css += await fs.readFile(path.join(p.dir,"hub.css"),"utf8")
  if (p.name === "site") await fs.copyFile(path.join(p.dir, "docs.css"), path.join(dest, "dist/docs.css"))
  if (["charts", "shells", "atoms", "blocks", "navigation", "site"].includes(p.name)) {
    const input = path.join(OUT, `${p.name}-utilities.input.css`)
    const utilities = path.join(OUT, `${p.name}-utilities.css`)
    const tw = path.join(TOOLCHAIN, "node_modules/tailwindcss")
    const theme = await fs.readFile(path.join(ROOT, "packages/siso-tokens/utility-theme.css"), "utf8")
    const animation = path.join(TOOLCHAIN,"node_modules/tw-animate-css/dist/tw-animate.css")
    const extra = p.name === "shells" ? `@import ${JSON.stringify(path.join(p.dir,"source-hub.css"))};\n` : ""
    // Every package uses the same utility set. Otherwise a later package's base
    // .hidden/.flex rule can override an earlier package's responsive variant.
    await fs.writeFile(input, `@import ${JSON.stringify(path.join(tw, "theme.css"))} layer(theme);\n@import ${JSON.stringify(path.join(tw, "utilities.css"))} layer(utilities) source(none);\n@import ${JSON.stringify(animation)};\n${extra}@source ${JSON.stringify(path.join(ROOT, "packages"))};\n@source ${JSON.stringify(path.join(ROOT, "examples/package-suite"))};\n${theme}\n`)
    const cli = path.join(TOOLCHAIN, "node_modules/@tailwindcss/cli/dist/index.mjs")
    const r = spawnSync(process.execPath, [cli, "-i", input, "-o", utilities, "--minify"], { cwd: TOOLCHAIN, encoding: "utf8" })
    if (r.status !== 0) throw new Error(r.stderr || `${p.name} utility CSS failed`)
    css += await fs.readFile(utilities, "utf8")
  }
  await fs.writeFile(path.join(dest, "dist/styles.css"), css || "/* This package has no component styles. */\n")
  const exports = { ".": { types: "./dist/index.d.ts", import: "./dist/index.js", default: "./dist/index.js" }, "./styles.css": "./dist/styles.css" }
  if (p.name === "charts") {
    for (const name of ["basic", "series", "special"]) {
      await fs.writeFile(path.join(dest, "dist", `${name}.d.ts`), `export * from "./${name === "basic" ? "special/owned-basics" : name + "/index"}";\n`)
      exports[`./${name}`] = { types: `./dist/${name}.d.ts`, import: `./dist/${name}.js`, default: `./dist/${name}.js` }
    }
    exports["./echarts"] = { types: "./dist/echarts/index.d.ts", import: "./dist/echarts.js", default: "./dist/echarts.js" }
  }
  if (["charts","atoms","blocks"].includes(p.name)) exports["./source"] = { types: `./dist/${p.name === "charts" ? "arc/index" : "source/index"}.d.ts`, import: "./dist/source.js", default: "./dist/source.js" }
  if (p.name === "atoms") exports["./hub"] = { types: "./dist/hub/index.d.ts", import: "./dist/hub.js", default: "./dist/hub.js" }
  if (p.name === "charts") exports["./presets"] = {types:"./dist/presets/index.d.ts",import:"./dist/presets.js",default:"./dist/presets.js"}
  if (["shells","navigation"].includes(p.name)) exports["./agent-base"] = { types:"./dist/agent-base/index.d.ts",import:"./dist/agent-base.js",default:"./dist/agent-base.js" }
  if (p.name === "tokens") for (const file of ["siso.css", "tokens.css", "source-themes.css", "fonts.css"]) exports[`./${file}`] = `./dist/${file}`
  if (["atoms","blocks"].includes(p.name)) exports["./source.css"] = "./dist/source.css"
  if (p.name === "navigation") {
    await fs.copyFile(path.join(p.dir,"hub.css"),path.join(dest,"dist/hub.css"))
    exports["./hub.css"]="./dist/hub.css"
  }
  if (["shells","navigation"].includes(p.name)) {
    const emitted = await fs.readFile(path.join(dest,"dist/agent-base.css"),"utf8").catch(()=>"")
    const extra = await esbuild.build({entryPoints:[path.join(p.dir,"agent-base.css")],outfile:path.join(dest,"dist/agent-base.css"),bundle:true,write:false,target:"es2022",logLevel:"warning"})
    await fs.writeFile(path.join(dest,"dist/agent-base.css"),extra.outputFiles.find(f=>f.path.endsWith(".css")).text+"\n"+emitted)
    exports["./agent-base.css"]="./dist/agent-base.css"
  }
  if (p.name === "site") {
    exports["./docs.css"] = "./dist/docs.css"
    exports["./assets.json"] = "./assets.json"
  }
  exports["./inventory.json"] = "./inventory.json"
  if (p.name === "ui") {
    const hub = 'export * from "@siso/atoms/hub";\n'
    for (const ext of ["js", "d.ts"]) await fs.writeFile(path.join(dest, "dist", `atoms-hub.${ext}`), hub)
    exports["./atoms/hub"] = { types: "./dist/atoms-hub.d.ts", import: "./dist/atoms-hub.js", default: "./dist/atoms-hub.js" }
    for (const name of NAMES.filter((n) => n !== "ui")) {
      const source = `export * from "@siso/${name}";\n`
      await fs.writeFile(path.join(dest, "dist", `${name}.js`), source)
      await fs.writeFile(path.join(dest, "dist", `${name}.d.ts`), source)
      exports[`./${name}`] = { types: `./dist/${name}.d.ts`, import: `./dist/${name}.js`, default: `./dist/${name}.js` }
    }
    for (const name of ["basic", "series", "special", "source", "presets", "echarts"]) {
      const source = `export * from "@siso/charts/${name}";\n`
      await fs.writeFile(path.join(dest, "dist", `charts-${name}.js`), source)
      await fs.writeFile(path.join(dest, "dist", `charts-${name}.d.ts`), source)
      exports[`./charts/${name}`] = { types: `./dist/charts-${name}.d.ts`, import: `./dist/charts-${name}.js`, default: `./dist/charts-${name}.js` }
    }
  }
  if (p.name === "ui") {
    for (const name of ["atoms","blocks"]) {
      const source = `export * from "@siso/${name}/source";\n`
      for (const ext of ["js", "d.ts"]) await fs.writeFile(path.join(dest, "dist", `${name}-source.${ext}`), source)
      exports[`./${name}/source`] = { types: `./dist/${name}-source.d.ts`, import: `./dist/${name}-source.js`, default: `./dist/${name}-source.js` }
    }
    for (const name of ["shells","navigation"]) {
      const source = `export * from "@siso/${name}/agent-base";\n`
      for (const ext of ["js", "d.ts"]) await fs.writeFile(path.join(dest,"dist",`${name}-agent-base.${ext}`),source)
      exports[`./${name}/agent-base`] = { types:`./dist/${name}-agent-base.d.ts`,import:`./dist/${name}-agent-base.js`,default:`./dist/${name}-agent-base.js` }
    }
    const cssRoutes = {
      "atoms-source.css": ["atoms", "source.css"], "atoms-styles.css": ["atoms", "styles.css"],
      "blocks-source.css": ["blocks", "source.css"], "blocks-styles.css": ["blocks", "styles.css"],
      "charts-styles.css": ["charts", "styles.css"], "shells-agent-base.css": ["shells", "agent-base.css"], "shells-styles.css": ["shells", "styles.css"],
      "navigation-agent-base.css": ["navigation", "agent-base.css"], "navigation-hub.css": ["navigation", "hub.css"],
      "navigation-styles.css": ["navigation", "styles.css"], "widgets-styles.css": ["widgets", "styles.css"], "agent-styles.css": ["agent", "styles.css"],
      "site-styles.css": ["site", "styles.css"], "site-docs.css": ["site", "docs.css"],
    }
    const cssExports = {
      "./atoms/source.css": "atoms-source.css", "./atoms/styles.css": "atoms-styles.css",
      "./blocks/source.css": "blocks-source.css", "./blocks/styles.css": "blocks-styles.css", "./charts/styles.css": "charts-styles.css",
      "./shells/agent-base.css": "shells-agent-base.css", "./shells/styles.css": "shells-styles.css",
      "./navigation/agent-base.css": "navigation-agent-base.css", "./navigation/hub.css": "navigation-hub.css", "./navigation/styles.css": "navigation-styles.css",
      "./widgets/styles.css": "widgets-styles.css", "./agent/styles.css": "agent-styles.css", "./site/styles.css": "site-styles.css", "./site/docs.css": "site-docs.css",
    }
    for (const [file, [pkg, asset]] of Object.entries(cssRoutes)) {
      await fs.copyFile(path.join(OUT, "packages", `siso-${pkg}`, "dist", asset), path.join(dest, file))
    }
    for (const [subpath, file] of Object.entries(cssExports)) exports[subpath] = `./${file}`
    for (const [name, file] of Object.entries({ "tokens/siso.css": "siso.css", "tokens/tokens.css": "tokens.css", "tokens/source-themes.css": "source-themes.css", "tokens/fonts.css": "fonts.css" })) {
      const target = `tokens-${file}`
      await fs.copyFile(path.join(OUT, "packages/siso-tokens", "dist", file), path.join(dest, target))
      exports[`./${name}`] = `./${target}`
    }
    await fs.copyFile(path.join(OUT, "packages/siso-site", "assets.json"), path.join(dest, "site-assets.json"))
    exports["./site/assets.json"] = "./site-assets.json"
  }
  if (await exists(path.join(p.dir, "assets"))) await fs.cp(path.join(p.dir, "assets"), path.join(dest, "assets"), { recursive: true })
  if (p.name === "blocks") {
    for (const asset of await readJson(path.join(ROOT, "catalogue/arc-suite-media.json"))) {
      const bytes = await fs.readFile(path.join(ROOT, asset.source))
      if (createHash("sha256").update(bytes).digest("hex") !== asset.sha256) throw new Error(`Arc source media changed: ${asset.url}`)
      const target = path.join(dest, "assets", asset.url.replace(/^\//, ""))
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, bytes)
    }
  }
  if (p.name === "site") {
    const assets = await readJson(path.join(p.dir, "assets.json"))
    const source = process.env.SISO_SITE_SOURCE || path.join(os.homedir(), "SISO_Workspace/_data/worktrees/siso-agency-lp/siso-ecosystem")
    for (const asset of assets.files) {
      const bytes = await fs.readFile(path.join(source, asset.source))
      if (createHash("sha256").update(bytes).digest("hex") !== asset.sha256) throw new Error(`Source asset changed: ${asset.url}`)
      const target = path.join(dest, "assets", asset.url.replace(/^\//, ""))
      await fs.mkdir(path.dirname(target), { recursive: true })
      await fs.writeFile(target, bytes)
    }
  }
  if (await exists(path.join(p.dir, "licenses"))) await fs.cp(path.join(p.dir, "licenses"), path.join(dest, "licenses"), { recursive: true })
  const manifest = { ...p.manifest, private: true, main: "./dist/index.js", module: "./dist/index.js", types: "./dist/index.d.ts", exports, files: ["dist", "assets", "licenses", "*.css", "site-assets.json", "README.md", "LICENSE", "NOTICE", "inventory.json", "source-provenance.json", "echarts-provenance.json", "preset-provenance.json", "agent-base-provenance.json", "source-manifest.json", "assets.json"], sideEffects: ["**/*.css"] }
  // Workspace source stays linked; external consumers receive ordinary pinned
  // sibling versions and never need to understand pnpm's workspace protocol.
  for (const group of ["dependencies", "peerDependencies", "optionalDependencies"]) {
    if (!manifest[group]) continue
    manifest[group] = Object.fromEntries(Object.entries(manifest[group]).map(([name, version]) => {
      if (!version.startsWith("workspace:")) return [name, version]
      const sibling = packages.find(pkg => pkg.manifest.name === name)
      if (!sibling) throw new Error(`Unknown workspace dependency in ${p.manifest.name}: ${name}`)
      return [name, sibling.manifest.version]
    }))
  }
  delete manifest.scripts
  await fs.writeFile(path.join(dest, "package.json"), JSON.stringify(manifest, null, 2) + "\n")
  for (const file of ["README.md", "LICENSE", "NOTICE", "inventory.json", "source-provenance.json", "echarts-provenance.json", "preset-provenance.json", "agent-base-provenance.json", "source-manifest.json", "assets.json"]) if (await exists(path.join(p.dir, file))) await fs.copyFile(path.join(p.dir, file), path.join(dest, file))
  for (const target of Object.values(exports).flatMap(v => typeof v === "string" ? [v] : Object.values(v))) {
    if (!await exists(path.join(dest, target))) throw new Error(`Missing export artifact: ${p.manifest.name} ${target}`)
  }
  const pack = spawnSync("npm", ["pack", "--json", "--ignore-scripts", "--pack-destination", path.join(OUT, "tarballs")], { cwd: dest, encoding: "utf8" })
  if (pack.status !== 0) throw new Error(pack.stderr || `npm pack failed for ${p.name}`)
  const packed = JSON.parse(pack.stdout)[0]
  const bytes = await fs.readFile(path.join(OUT, "tarballs", packed.filename))
  release.packages.push({ name: p.manifest.name, filename: packed.filename, bytes: packed.size, unpackedBytes: packed.unpackedSize, sha256: createHash("sha256").update(bytes).digest("hex"), exports: Object.keys(exports), compiledSourceFiles: Object.keys(compiled.metafile.inputs).length })
  console.log(`PACKED ${p.manifest.name}: ${packed.filename} (${packed.size} bytes)`)
}
await fs.writeFile(path.join(OUT, "release.json"), JSON.stringify(release, null, 2) + "\n")
console.log(`Release manifest: ${path.join(OUT, "release.json")}`)
