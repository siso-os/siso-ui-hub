// Focused contract check; pass a consumer node_modules directory containing React and TypeScript.
const path = require('node:path'), fs = require('node:fs'), assert = require('node:assert/strict')
const deps = path.resolve(process.argv[2] || 'node_modules')
const ts = require(path.join(deps, 'typescript'))
const files = fs.readdirSync(__dirname).filter(f => /\.tsx?$/.test(f)).map(f => path.join(__dirname, f))
const program = ts.createProgram(files, { noEmit: true, strict: true, skipLibCheck: true, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler, jsx: ts.JsxEmit.ReactJSX, baseUrl: __dirname, paths: { react: [deps + '/@types/react/index.d.ts'], 'react/jsx-runtime': [deps + '/@types/react/jsx-runtime.d.ts'] }, typeRoots: [deps + '/@types'] })
const diagnostics = ts.getPreEmitDiagnostics(program)
assert.equal(diagnostics.length, 0, ts.formatDiagnosticsWithColorAndContext(diagnostics, { getCanonicalFileName: f => f, getCurrentDirectory: () => __dirname, getNewLine: () => '\n' }))
const React = require(path.join(deps, 'react')), render = require(path.join(deps, 'react-dom/server')).renderToStaticMarkup, cache = {}
function load(file) {
  if (cache[file]) return cache[file].exports
  const mod = { exports: {} }; cache[file] = mod
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
  new Function('require', 'module', 'exports', code)(name => name.startsWith('.') ? load([path.resolve(path.dirname(file), name) + '.tsx', path.resolve(path.dirname(file), name) + '.ts'].find(fs.existsSync)) : require(path.join(deps, name)), mod, mod.exports)
  return mod.exports
}
const api = load(path.join(__dirname, 'index.ts')); let tests = 0
const originalError = console.error
console.error = (...args) => { throw new Error(args.join(' ')) }
function check(name, data, extra = {}) {
  const html = render(React.createElement(api[name], { data, ...extra }))
  assert(!/NaN|Infinity|undefined/.test(html), name + ' produced invalid output')
  for (const match of html.matchAll(/(?:width|height)="(-?[\d.]+)"/g)) assert(Number(match[1]) >= 0, 'negative geometry')
  tests++; return html
}
try {
  for (const name of ['SisoTreemap', 'SisoCohortHeatmap', 'SisoBulletChart', 'SisoWaffleChart', 'SisoSlopeChart']) assert(check(name, []).includes('role="status"'))
  const weights = [{ id: 'a', label: 'Alpha', value: 2 }, { id: 'b', label: 'Beta', value: 1 }]
  assert.equal((check('SisoWaffleChart', weights).match(/<rect/g) || []).length, 100)
  assert.equal((check('SisoWaffleChart', weights, { cells: 7, columns: 3 }).match(/<rect/g) || []).length, 7)
  check('SisoWaffleChart', [{ id: 'bad', label: 'Invalid', value: NaN }])
  check('SisoWaffleChart', weights, { cells: NaN, columns: Infinity })
  check('SisoTreemap', weights)
  check('SisoTreemap', [...weights, { id: 'huge', label: 'Huge', value: Number.MAX_VALUE }, { id: 'tiny', label: 'Tiny', value: Number.MIN_VALUE }])
  assert(check('SisoCohortHeatmap', [{ id: 'a', label: 'Cohort', size: 100, retained: [100, 75, null, 101, -1, NaN] }]).includes('75%'))
  assert(check('SisoBulletChart', [{ id: 'a', label: 'Units', value: 120, target: 80, max: 100, ranges: [40, 70] }]).includes('clipped to scale'))
  check('SisoSlopeChart', [{ id: 'a', label: 'Comparison', before: -Number.MAX_VALUE, after: Number.MAX_VALUE }])
  check('SisoSlopeChart', [{ id: 'a', label: 'Zero', before: 0, after: 0 }])
  check('SisoCompactBars', [{key:'a',label:'Negative',value:-4},{key:'b',label:'Positive',value:6}])
  check('SisoMultiLine', [{key:'a',label:'A',values:{one:2}},{key:'b',label:'Missing',values:{}},{key:'c',label:'C',values:{one:4}}], {series:[{key:'one',label:'First',area:true}]})
  check('SisoDonutChart', [{key:'a',label:'First',value:40},{key:'b',label:'Second',value:60}])
  assert(check('SisoSparkline', [1,NaN,3], {formatValue:(n,i)=>`${i}: ${n}`}).includes('2: 3'))
  check('SisoGauge', [], {value:120,min:0,max:100})
  check('SisoGoalRing', [], {value:1240,goal:2000})
  check('SisoRadialSlices', [{name:'First',value:3},{name:'Second',value:2}], {holeRatio:0})
  assert(check('SisoContributionHeatmap', [], {days:[{date:'2026-01-01',count:1},{date:'2026-01-03',count:0}]}).includes('2026-01-02: missing'))
  assert(check('SisoContributionHeatmap', [], {days:[{date:'2026-02-30',count:1}]}).includes('role="status"'))
  assert(check('SisoGauge', [], {value:NaN}).includes('role="status"'))

} finally { console.error = originalError }
console.log(`PASS: strict TypeScript (${files.length} modules); ${tests} SSR geometry/empty/invalid/allocation scenarios; no React warnings`)
