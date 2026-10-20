import fs from "node:fs/promises"
import path from "node:path"
import { createRequire } from "node:module"
import { fileURLToPath } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const req = createRequire(path.join(process.env.SISO_UI_TOOLCHAIN || ROOT, "package.json"))
const ts = req("typescript")
const names = ["tokens", "atoms", "blocks", "navigation", "shells", "widgets", "charts", "site", "agent", "ui"]
const descriptions = {
  tokens: "Actual Hub, landing and docs token layers, eight frame schemes and seven product palettes.",
  atoms: "Everyday controls: actions, fields, selections, feedback and typography.",
  blocks: "Dialogs, search, notifications, tables, timelines, uploads and threads.",
  navigation: "Grouped side navigation, collapsed rails, mobile menus, tabs and switchers.",
  shells: "The UI Hub frame, app sidebar and rail-plus-panel layouts, with resize and mobile behavior.",
  widgets: "Dashboard frames, glance/work/detail bands, fitting, layout controls and in-place details.",
  charts: "Parameterized chart behaviors, including comparison, distribution, forecasting, flows and geometry.",
  site: "The accepted landing footer, blog parts, docs skin and living product glyphs, with their original source assets.",
  agent: "The Agent Base parts: composer (model picker, context meter, usage ring), voice, agent faces and living glyphs, the product icon set and the OS module bus.",
  ui: "One umbrella with namespaces and subpath imports for all eight focused packages.",
}
const rechartsPresets = JSON.parse(await fs.readFile(path.join(ROOT,"examples/package-suite/presets.json"),"utf8"))
const echartsPresets = JSON.parse(await fs.readFile(path.join(ROOT,"examples/package-suite/echarts-presets.json"),"utf8"))
const presets = [...rechartsPresets.map(entry=>({...entry,engine:"recharts"})),...echartsPresets.map(entry=>({...entry,engine:"echarts"}))]
const chartFamilies = [
  ["streamgraph", ["Streamgraph"], ["stacked flowing series", "source hover and motion"]],
  ["brush-chart", ["BrushChart"], ["range brushing", "source selection and keyboard"]],
  ["ridgeline", ["Ridgeline"], ["multiple distributions", "source focus and motion"]],
  ["area", ["SisoArea", "SisoAreaChart"], ["five curves", "gradient/solid/pattern", "stacked/expanded", "seven palettes"]],
  ["bars", ["SisoBars", "SisoBarChart", "SisoCompactBars", "SisoInteractiveBars", "ArcBars"], ["vertical/horizontal", "grouped/stacked", "slim", "six fills"]],
  ["line", ["SisoLine", "SisoLineChart", "SisoMultiLine", "SisoInteractiveLine", "ArcLine"], ["five curves", "solid/dashed", "comparison", "missing points"]],
  ["pie-donut", ["SisoDonut", "SisoPieChart", "SisoDonutChart", "SisoRadialSlices", "SisoInteractiveDonut", "ArcDonut"], ["pie/donut", "hole ratio", "custom colors"]],
  ["radial", ["SisoRadial", "SisoRadialChart", "SisoGoalRing"], ["progress", "goal/actual", "multiple rings"]],
  ["radar", ["SisoRadar", "SisoRadarChart"], ["multiple series", "fill/pattern"]],
  ["composed", ["SisoComposedChart"], ["bar/line/area combination"]],
  ["sankey", ["SisoSankeyChart"], ["weighted nodes and links"]],
  ["scatter-bubble", ["SisoScatter"], ["scatter/bubble", "quadrant lines", "controlled point selection"]],
  ["waterfall", ["SisoWaterfall"], ["signed deltas", "explicit total checkpoints"]],
  ["candlestick-ohlc", ["SisoCandlestick"], ["filled", "hollow", "OHLC ticks"]],
  ["box-plot", ["SisoBoxPlot"], ["quartiles", "caller-supplied whiskers", "outliers"]],
  ["treemap", ["SisoTreemap", "SisoInteractiveTreemap"], ["source hierarchy drill/zoom", "morphing tiles", "flat data adapter"]],
  ["cohort", ["SisoCohortHeatmap"], ["retention by cohort age", "missing observations"]],
  ["bullet", ["SisoBulletChart"], ["target", "qualitative ranges", "explicit clipping"]],
  ["waffle", ["SisoWaffleChart", "SisoInteractiveWaffle"], ["configurable cells/columns", "exact allocation"]],
  ["slope", ["SisoSlopeChart", "SisoInteractiveSlope"], ["before/after", "signed values"]],
  ["calendar-heatmap", ["SisoContributionHeatmap", "SisoInteractiveHeatmap", "ArcHeatmap"], ["UTC date range", "missing-date gaps"]],
  ["matrix-heatmap", ["SisoMatrixHeatmap"], ["red/amber/blue", "row/column data", "keyboard cells"]],
  ["funnel", ["SisoFunnel"], ["stage proportions", "drop-off", "keyboard detail"]],
  ["range", ["SisoRangeArea"], ["low/high interval", "optional midpoint"]],
  ["trend", ["SisoTrendCard"], ["current/baseline", "up/down/neutral"]],
  ["sparkline", ["SisoSparkline", "SisoInteractiveSparkline", "ArcSparkline"], ["compact signed series"]],
  ["gauge", ["SisoGauge", "SisoInteractiveGauge", "ArcGauge"], ["bounded value and target"]],
].map(([family, exports, variants]) => ({ family, exports, variants }))
await fs.writeFile(path.join(ROOT, "packages/siso-charts/inventory.json"), JSON.stringify({
  package: "@siso/charts", version: JSON.parse(await fs.readFile(path.join(ROOT,"packages/siso-charts/package.json"),"utf8")).version, familyCount: chartFamilies.length, components: chartFamilies, presets, presetCount: presets.length, rechartsPresetCount: rechartsPresets.length, echartsPresetCount: echartsPresets.length,
  provenance: "Selected MIT Arc and Evil Charts source preserved with original styles, motion and interactions; additional SISO chart behaviors remain available. Free tier and source hashes are recorded in source-provenance.json.",
  decisions: ["charts/ownership-series.json", "charts/ownership-special.json"],
  deferred: ["interactive maps", "physics/3D effects", "rich trading overlays", "streaming data transports"],
  compatibility: "Arc-prefixed exports again point at the actual MIT/free source, including motion, scrubbing, focus/keyboard and imperative APIs. The source subpath exports their complete original contracts.",
}, null, 2) + "\n")

const indexes = names.map((n) => path.join(ROOT, `packages/siso-${n}/src/index.ts`))
const program = ts.createProgram(indexes, { target: ts.ScriptTarget.ES2022, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX, skipLibCheck: true })
const checker = program.getTypeChecker()
const packages = []
for (let i = 0; i < names.length; i++) {
  const name = names[i], dir = path.join(ROOT, `packages/siso-${name}`)
  const manifest = JSON.parse(await fs.readFile(path.join(dir, "package.json"), "utf8"))
  const inventory = JSON.parse(await fs.readFile(path.join(dir, "inventory.json"), "utf8"))
  const file = program.getSourceFile(indexes[i]), symbol = file && checker.getSymbolAtLocation(file)
  const all = symbol ? checker.getExportsOfModule(symbol) : []
  const runtime = all.filter((s) => {
    const target = s.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(s) : s
    return target.flags & ts.SymbolFlags.Value
  }).map((s) => s.name).sort()
  const included = inventory.sourceEntry?.exports ?? (Array.isArray(inventory.exports) && inventory.exports[0]?.family ? inventory.exports : inventory.components || [])
  const families = included.map((c) => ({
    name: c.family || c.export || c.name || c.id,
    exports: c.exports || (c.export ? [c.export] : c.name ? [c.name] : []),
    variants: c.variants || c.variations || [],
  }))
  packages.push({ id: name, name: manifest.name, version: manifest.version, about: descriptions[name],
    familyCount: inventory.familyCount || families.length, presetCount: inventory.presetCount || 0, runtimeExports: runtime, families,
    deferred: (inventory.deferred || inventory.omittedFamilies || inventory.omitted || []).map((d) => typeof d === "string" ? { name: d, reason: "Outside this package's shipped behavior set." } : { name: d.family || d.export || d.name || d.id || d.reference, reason: d.reason }),
  })
}
const index = { version: packages.find(p => p.id === "ui").version, packages, totals: {
  packages: packages.length,
  functionalPackages: packages.length - 1,
  runtimeExports: packages.filter((p) => p.id !== "ui").reduce((n, p) => n + p.runtimeExports.length, 0),
  chartFamilies: chartFamilies.length, chartPresets: presets.length,
}, distribution: "Private npm tarballs, compiled ESM and TypeScript declarations; not published to the public npm registry." }
await fs.writeFile(path.join(ROOT, "catalogue/package-suite.json"), JSON.stringify(index, null, 2) + "\n")
console.log(JSON.stringify(index.totals))
