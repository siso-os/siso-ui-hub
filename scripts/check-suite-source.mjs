// Verify the extraction records and preserve an executable release receipt.
import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = process.env.SISO_UI_OUTPUT || path.join(os.homedir(), 'SISO_Workspace/_data/ui-hub/package-suite')
const read = async file => JSON.parse(await fs.readFile(path.join(root, file), 'utf8'))
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const packageVersion = (await read('packages/siso-ui/package.json')).version
try {
  const outputRelease = JSON.parse(await fs.readFile(path.join(out, 'release.json'), 'utf8'))
  if (outputRelease.version !== packageVersion) throw new Error(`Refusing to overwrite ${path.join(out, 'source-proof.json')}: output release version ${outputRelease.version ?? '(missing)'} does not match packages/siso-ui/package.json version ${packageVersion}`)
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
let files = 0, unchangedStyles = 0, freeFamilies = 0, freeTargets = 0, historicalSources = 0
async function verify(file, expected) {
  const bytes = await fs.readFile(path.resolve(root, file))
  if (hash(bytes) !== expected) throw new Error(`Source manifest mismatch: ${file}`)
  files++
  return bytes
}
// Historical inputs are held byte snapshots, never the relocated product wrappers.
// Repository/ref/path records identify where the snapshot was read; source hashes
// remain the immutable extraction hashes. No network or floating-ref fallback.
async function verifyHistorical(file, expected) {
  const source = file.sourceProof
  if (!source) throw new Error(`Historical source unavailable: ${file.source}; expected SHA-256 ${expected}; ${file.sourceProofGap || 'missing sourceProof'}`)
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(source.repository) || !/^[a-f0-9]{40}$/.test(source.ref) ||
      !source.path || path.isAbsolute(source.path) || source.path.split('/').includes('..') ||
      source.snapshot !== `scripts/fixtures/source-proof/${expected}.txt`) {
    throw new Error(`Invalid immutable source proof: ${file.source}`)
  }
  await verify(source.snapshot, expected)
  historicalSources++
}
const items = new Map((await fs.readFile(path.join(root, 'sources/items.jsonl'), 'utf8')).trim().split('\n').map(line => { const item = JSON.parse(line); return [item.id, item] }))
for (const name of ['atoms', 'blocks']) {
  const proof = await read(`packages/siso-${name}/source-provenance.json`)
  freeTargets += proof.families.length
  freeFamilies += new Set(proof.families.map(f => f.entry || f.id)).size
  for (const adapter of proof.adapters || []) await verify(`packages/siso-${name}/${adapter.file}`, adapter.sha256)
  for (const family of proof.families) if (family.tier !== 'free' || items.get(family.id)?.tier !== 'free') throw new Error(`Unverified Arc licence: ${family.id}`)
  const entries = Array.isArray(proof.files) ? proof.files.map(f => [f.target, f.adaptedSha256, f.source, f.sourceSha256]) : Object.entries(proof.files).map(([file, f]) => [`src/source/${file}`, f.packagedSha256, f.upstreamPath, f.sha256])
  for (const [file, expected, source, original] of entries) {
    await verify(`packages/siso-${name}/${file}`, expected)
    await verify(source, original)
    if (file.endsWith('.module.css')) {
      if (expected !== original) throw new Error(`Original Arc CSS changed: ${file}`)
      unchangedStyles++
    }
  }
}
const arc = await read('packages/siso-charts/source-provenance.json')
const echarts = await read('packages/siso-charts/echarts-provenance.json')
if (echarts.files.length !== 149 || echarts.echartsDependency.version !== '6.1.0' || echarts.echartsDependency.license !== 'Apache-2.0') throw new Error('Unexpected ECharts source manifest, dependency version, or license')
await verify(echarts.echartsDependency.licenseFile, echarts.echartsDependency.licenseFileSha256)
for (const file of echarts.files) {
  await verify(file.sourcePath, file.sourceSha256)
  await verify(file.targetPath, file.adaptedSha256)
}
const presets = await read('packages/siso-charts/preset-provenance.json')
if (presets.license !== 'MIT' || presets.count !== presets.files.length) throw new Error('Unverified chart preset source')
for (const file of presets.files) { await verify(file.source,file.sourceSha256); await verify(file.target,file.adaptedSha256) }
for (const component of arc.components) if (component.tier !== 'free' || items.get(`arc:${component.name}`)?.tier !== 'free') throw new Error(`Unverified Arc chart: ${component.name}`)
for (const [file, expected] of Object.entries(arc.files)) await verify(`packages/siso-charts/${file}`, expected)
for (const name of ['shells', 'navigation']) {
  const proof = await read(`packages/siso-${name}/source-provenance.json`)
  for (const file of proof.files) {
    await verify(file.file, file.packageSha256)
    await verifyHistorical(file, file.sourceSha256)
  }
}
const agentShell = await read('packages/siso-shells/agent-base-provenance.json')
for (const file of agentShell.files) {
  await verify(file.source, file.sourceSha256)
  await verify(file.target, file.targetSha256)
}
const site = await read('packages/siso-site/source-manifest.json')
for (const file of site.entries) await verify(`packages/siso-site/${file.target}`, file.adaptedSha256)
for (const file of site.applicationEffects) await verify(file.applicationTarget, file.applicationSha256)
const assets = await read('packages/siso-site/assets.json')
const coverage = await read('catalogue/arc-suite-coverage.json')
if (coverage.targets !== freeTargets + arc.components.length) throw new Error('Arc suite coverage differs from source manifests')
for (const source of (await read('packages/siso-blocks/curated-provenance.json')).sources) {
  if (source.license !== 'MIT') throw new Error(`Unverified curated licence: ${source.id}`)
  for (const file of source.files) await verify(file.target, file.adaptedSha256)
}
for (const manifest of ['packages/siso-atoms/hub-provenance.json', 'packages/siso-site/landing-provenance.json']) {
  const promotion = await read(manifest)
  for (const file of promotion.files) {
    const original = spawnSync('git', ['show', `${promotion.sourceCommit}:${file.source}`], { cwd: root })
    if (original.status !== 0 || hash(original.stdout) !== (file.sourceSha256 || file.sha256)) throw new Error(`Promoted source pin differs: ${file.source}`)
    await verify(file.target.replace(/^packages\/ui\//, ''), file.adaptedSha256 || file.sha256)
  }
}
const tokenProof = await read('packages/siso-tokens/source-provenance.json')
// Verify available token inputs before reporting every unresolved historical input.
const tokenGaps = []
for (const file of tokenProof.sourceFiles) {
  try { await verifyHistorical(file, file.sha256) } catch (error) { tokenGaps.push(error.message) }
}
if (tokenGaps.length) throw new Error(`${historicalSources} historical source inputs verified; ${tokenGaps.length} token source failure(s):\n${tokenGaps.join('\n')}`)
const proof = {
  historicalSourceChecks: historicalSources,
  checkedAt: new Date().toISOString(), manifestFileChecks: files,
  sourceCommit: JSON.parse(await fs.readFile(path.join(out,"release.json"),"utf8")).sourceCommit,
  unchangedArcCssModules: unchangedStyles,
  echartsSourceFiles: echarts.files.length,
  echartsVersion: echarts.echartsDependency.version,
  echartsLicense: echarts.echartsDependency.license,
  freeArcFamilies: freeFamilies, freeArcCharts: arc.components.length,
  freeArcInstallTargets: coverage.targets, sourceExamples: coverage.entries.length,
  originalEvilRechartsPresets: presets.count,
  originalSiteAssets: assets.files.length,
  tokenSets: tokenProof.sets.length, frameSchemes: tokenProof.frameSchemes,
  productPalettes: tokenProof.productPalettes.length,
  restrictedShader: 'application only; excluded by package build graph gate',
  scope: 'Recorded source bytes and licence tiers. Browser observations are recorded separately.',
}
await fs.mkdir(out, { recursive: true })
await fs.writeFile(path.join(out, 'source-proof.json'), JSON.stringify(proof, null, 2) + '\n')
console.log(JSON.stringify(proof, null, 2))
