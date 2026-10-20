// Curated charts build (UI-HUB, 16 Oct): OPERATOR's charts-desk build, plus uiarc, tweenly and the SISO chart package drawn live.
// Run in the sandbox: cd ~/SISO_Workspace/_data/charts-curate/sb && heavy -- node <this file>
import * as esbuild from "esbuild"
import fs from "node:fs"
import path from "node:path"
import { createRequire } from "node:module"

const SB = process.cwd()
const HUB_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
const HOME = process.env.HOME
const BANKS = `${HOME}/SISO_Workspace/Great_Library_of_SISO/banks`
const R = `${BANKS}/siso-ui-code/r`
const SHAD = `${BANKS}/siso-ui-hub/_reference/shadcn`
const U21 = `${HOME}/SISO_Workspace/_data/ui-hub/21st`
const INV = JSON.parse(fs.readFileSync(`${SB}/../inventory.json`, "utf8"))
const OUT = `${SB}/../site/d`
const w = (p, s) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, s) }
const jr = (p) => JSON.parse(fs.readFileSync(p, "utf8"))
const SRC = `${SB}/src`
fs.rmSync(`${SB}/src/stage`, { recursive: true, force: true })

// shadcn ui (new-york-v4) and utils
for (const f of fs.readdirSync(`${SHAD}/new-york-v4`)) {
  if (!f.endsWith(".json")) continue
  const d = jr(`${SHAD}/new-york-v4/${f}`)
  for (const x of d.files || []) {
    if (!x.content) continue
    const sub = /\/hooks\//.test(x.path) ? "hooks" : /\/lib\//.test(x.path) ? "lib" : "components/ui"
    if (/\/ui\//.test(x.path) || sub !== "components/ui") w(`${SRC}/${sub}/${path.basename(x.path)}`, x.content)
  }
}
w(`${SRC}/lib/utils.ts`, `import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\nexport function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }\n`)
w(`${SRC}/shims/icon-placeholder.tsx`, `import * as L from "lucide-react"\nexport function IconPlaceholder({ lucide, ...p }: any) { const I = (L as any)[lucide] || L.Circle; return <I {...p} /> }\n`)
w(`${SRC}/shims/next-image.tsx`, `export default function Image({ src, alt, fill, priority, ...p }: any) { return <img src={typeof src === "string" ? src : src?.src} alt={alt} {...p} /> }\n`)
w(`${SRC}/shims/next-link.tsx`, `export default function Link({ href, children, ...p }: any) { return <a href={href} {...p}>{children}</a> }\n`)
w(`${SRC}/shims/next-misc.tsx`, `export const useRouter = () => ({ push() {}, replace() {}, back() {} })\nexport const usePathname = () => "/"\nexport const useSearchParams = () => new URLSearchParams()\nexport default {}\n`)

const demos = [] // {key, group, lib, name, entry, kind, ctx}
const exportName = (code) => {
  if (/export\s+default\s+(async\s+)?function\s+\w+|export\s+default\s+\w+|export\s+default\s*\(/.test(code)) return "default"
  const m = [...code.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+([A-Z]\w*)/g)].map((x) => x[1])
  return m[0] || null
}
const entryFor = (key, abs, code) => {
  const ex = exportName(code)
  if (!ex) return null
  const p = `${SRC}/stage/entries/${key}.tsx`
  w(p, ex === "default" ? `export { default } from ${JSON.stringify(abs)}\n` : `import { ${ex} as C } from ${JSON.stringify(abs)}\nexport default C\n`)
  return p
}

// 1. evilcharts: the base parts, then every example
{
  const dir = `${R}/evilcharts`
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  for (const f of files) for (const x of jr(`${dir}/${f}`).files || []) if (x.content) w(`${SB}/${x.path}`, x.content)
  for (const f of files.filter((f) => f.startsWith("ex-"))) {
    const d = jr(`${dir}/${f}`); const x = d.files?.[0]; if (!x) continue
    const key = "evilcharts--" + d.name
    const e = entryFor(key, `${SB}/${x.path}`, x.content)
    if (e) demos.push({ key, lib: "evilcharts", name: d.name, ctx: "evil" })
  }
}
// 2. reui: its non-chart parts, then c-chart-N
{
  const dir = `${R}/reui`
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith(".json") || f.startsWith("_") || /^c-/.test(f)) continue
    for (const x of jr(`${dir}/${f}`).files || []) if (x.content) w(`${SRC}/components/reui/${path.basename(x.path)}`, x.content)
  }
  for (const f of fs.readdirSync(dir).filter((f) => /^c-chart-\d+\.json$/.test(f))) {
    const d = jr(`${dir}/${f}`); const x = d.files?.[0]; if (!x) continue
    const key = "reui--" + d.name
    w(`${SRC}/stage/reui/${d.name}.tsx`, x.content)
    if (entryFor(key, `${SRC}/stage/reui/${d.name}.tsx`, x.content)) demos.push({ key, lib: "reui", name: d.name, title: d.title, ctx: "reui" })
  }
}
// 3. shadcn charts
for (const n of fs.readdirSync(`${SHAD}/charts`)) {
  const p = `${SHAD}/charts/${n}/charts/${n}.tsx`
  if (!fs.existsSync(p)) continue
  const code = fs.readFileSync(p, "utf8"); const key = "shadcn--" + n
  w(`${SRC}/stage/shadcn/${n}.tsx`, code)
  if (entryFor(key, `${SRC}/stage/shadcn/${n}.tsx`, code)) demos.push({ key, lib: "shadcn", name: n, ctx: "shadcn" })
}
// 4. 21st bank charts: demo.tsx + code.tsx
for (const o of INV.filter((o) => o.src === "21st" && o.code)) {
  const demo = `${U21}/harvest/${o.id}/demo.tsx`
  const code21 = fs.existsSync(o.code) ? o.code : `${U21}/source/${o.id}/code.tsx`
  if (!fs.existsSync(demo) || !fs.existsSync(code21)) continue
  const dd = `${SRC}/stage/p21/${o.id}`
  const dc = fs.readFileSync(demo, "utf8")
  w(`${dd}/demo.tsx`, dc); w(`${dd}/code.tsx`, fs.readFileSync(code21, "utf8"))
  const key = "p21--" + o.id
  if (entryFor(key, `${dd}/demo.tsx`, dc)) demos.push({ key, lib: "21st.dev", name: o.name, id: o.id, ctx: "p21", dir: dd })
}
// 5. uiarc, tweenly (shadcn registry items) and the SISO package, each with a demo from charts/demos
{
  const HUB = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..")
  const DEMOS = `${HUB}/charts/demos`
  for (const f of fs.readdirSync(DEMOS)) w(`${SRC}/stage/demos/${f}`, fs.readFileSync(`${DEMOS}/${f}`, "utf8"))
  for (const lib of ["uiarc", "tweenly"]) {
    for (const f of fs.readdirSync(`${R}/${lib}`)) {
      if (!f.endsWith(".json") || f.startsWith("_")) continue
      for (const x of jr(`${R}/${lib}/${f}`).files || []) {
        if (!x.content) continue
        const rel = lib === "uiarc" ? (x.target || "").replace(/^@components\/arc\//, "") : x.path.replace(/^registry\/new-york\//, "")
        if (rel) w(lib === "tweenly" ? `${SRC}/registry/new-york/${rel}` : `${SRC}/stage/uiarc/${rel}`, x.content)
      }
    }
  }
  for (const f of fs.readdirSync(DEMOS).filter((f) => /^(uiarc|tweenly|siso)--.*\.tsx$/.test(f))) {
    const n = f.replace(/\.tsx$/, ""), key = n, lib = n.split("--")[0]
    if (entryFor(key, `${SRC}/stage/demos/${f}`, fs.readFileSync(`${DEMOS}/${f}`, "utf8"))) demos.push({ key, lib: lib === "siso" ? "siso-charts" : lib, name: n.split("--")[1], ctx: lib })
  }
  // the SISO landing's contribution city (3D heatmap), copied with its own files
  {
    const L = `${HUB}/app/src/kit/siso-landing`
    const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`])
    for (const f of walk(`${L}/eco`).filter((f) => /\.(tsx?|css)$/.test(f))) w(`${SRC}/stage/landing/eco/${f.slice(`${L}/eco/`.length)}`, fs.readFileSync(f, "utf8"))
    const dc = fs.readFileSync(`${L}/demos/contribution-city.tsx`, "utf8")
    w(`${SRC}/stage/landing/demos/contribution-city.tsx`, dc)
    if (entryFor("landing--contribution-city", `${SRC}/stage/landing/demos/contribution-city.tsx`, dc)) demos.push({ key: "landing--contribution-city", lib: "siso-landing", name: "contribution-city", ctx: "landing" })
  }
  // 6. the other libraries (registry items with no demo): every file staged under stage/L/<lib>/, one entry per chart-like item
  {
    const LIBS = ["livedocs", "shadcn-dashboard", "shadcn-ui-blocks", "plotcn", "reactframe", "ns-ui", "bklit", "8starlabs-ui", "minidev", "dashboardcn", "spectrumui", "bjork-ui", "beui"]
    const all = jr(`${process.env.HOME}/SISO_Workspace/_data/charts-curate/all.json`)
    const want = new Set(all.filter((r) => LIBS.includes(r.lib)).map((r) => r.lib + "/" + r.name))
    for (const lib of LIBS) {
      if (!fs.existsSync(`${R}/${lib}`)) continue
      for (const f of fs.readdirSync(`${R}/${lib}`)) {
        if (!f.endsWith(".json") || f.startsWith("_")) continue
        const item = jr(`${R}/${lib}/${f}`), name = f.replace(/\.json$/, "")
        let main = null
        for (const x of item.files || []) {
          if (!x.content) continue
          const rel = (x.target || x.path || "").replace(/^(src|app)\//, "")
          if (!rel) continue
          w(`${SRC}/stage/L/${lib}/${rel}`, x.content)
          if (!main && /\.tsx$/.test(rel) && path.basename(rel).replace(/\.tsx$/, "") === name) main = `${SRC}/stage/L/${lib}/${rel}`
        }
        if (main && want.has(`${lib}/${name}`) && entryFor(`${lib}--${name}`, main, fs.readFileSync(main, "utf8"))) demos.push({ key: `${lib}--${name}`, lib, name, ctx: "L" })
      }
    }
  }
}
console.log("staged", demos.length)

const req = createRequire(`${SB}/package.json`)
const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile()
const EXTS = ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts"]
const find = (b) => EXTS.map((e) => b + e).find(isFile)
const SHIM = { "next/image": "next-image", "next/link": "next-link", "next/navigation": "next-misc", "next/router": "next-misc", "next/dynamic": "next-misc", "next/font/google": "next-misc" }

const plugin = (mode, ctxOf) => ({
  name: "desk",
  setup(b) {
    b.onResolve({ filter: /.*/ }, async (a) => {
      if (a.pluginData?.skip) return
      const p = a.path
      if (a.kind === "entry-point") return
      if (/^\.{1,2}\//.test(p) || p.startsWith("/")) return
      if (p === "cn") return { path: `${SRC}/lib/utils.ts` }
      { const m = p.match(/^@(uiarc|tweenly)\/(.+)$/); if (m) { const base = m[1] === "uiarc" ? `${SRC}/stage/uiarc/${m[2]}/${m[2]}` : `${SRC}/registry/new-york/${m[2]}/${m[2]}`; const f = find(base); if (f) return { path: f } } }
      if (p === "recharts" && /\/stage\/L\/livedocs\//.test(a.importer)) return { path: `${HUB_ROOT}/app/node_modules/recharts/es6/index.js` }
      if (a.importer.startsWith(`${HUB_ROOT}/app/node_modules/`) && /^react(-dom)?(\/|$)/.test(p)) { const r = await b.resolve(p, { kind: a.kind, resolveDir: SB, pluginData: { skip: true } }); if (!r.errors.length) return { path: r.path } }
      if (p === "@siso/charts") return { path: `${HUB_ROOT}/packages/siso-charts/src/index.ts` }
      if (SHIM[p]) return { path: `${SRC}/shims/${SHIM[p]}.tsx` }
      if (/^@\/app\/.*icon-placeholder/.test(p)) return { path: `${SRC}/shims/icon-placeholder.tsx` }
      if (/^(@|~)\//.test(p)) {
        const rest = p.replace(/^(@|~)\//, "").replace(/^registry\/(new-york-v4|default)\/ui\//, "components/ui/")
        const importerDir = path.dirname(a.importer)
        const own = /\/stage\/p21\//.test(a.importer) ? a.importer.replace(/(\/stage\/p21\/[^/]+)\/.*/, "$1") : null
        const ownL = /\/stage\/L\//.test(a.importer) ? a.importer.replace(/(\/stage\/L\/[^/]+)\/.*/, "$1") : null
        const tries = []
        if (/^registry\//.test(rest)) tries.push(`${SB}/src/${rest}`)
        if (ownL) tries.unshift(`${ownL}/${rest}`, `${ownL}/src/${rest}`)
        tries.push(`${SRC}/${rest}`)
        if (own) { const t = rest.split("/").pop(); tries.push(`${own}/${t}`) }
        for (const t of tries) { const f = find(t); if (f) return { path: f } }
        { const bare = rest.replace(/-\d+$/, ""); if (bare !== rest) for (const t of [`${SRC}/${bare}`]) { const f = find(t); if (f) return { path: f } } }
        if (own && isFile(`${own}/code.tsx`)) return { path: `${own}/code.tsx` }
        return { errors: [{ text: `missing local file ${p}` }] }
      }
      // bare package
      const r0 = await b.resolve(p, { kind: a.kind, resolveDir: a.resolveDir, pluginData: { skip: true } })
      const viaSb = r0.errors.length ? await b.resolve(p, { kind: a.kind, resolveDir: SB, pluginData: { skip: true } }) : null
      const r = viaSb && !viaSb.errors.length ? viaSb : r0
      if (r.errors.length) return { errors: [{ text: `needs package ${p.startsWith("@") ? p.split("/").slice(0, 2).join("/") : p.split("/")[0]}` }] }
      return mode === "precheck" ? { path: p, external: true } : viaSb && !viaSb.errors.length ? { path: r.path } : undefined
    })
    b.onLoad({ filter: /\.module\.css$/ }, async (a) => {
      const stub = `import s from ${JSON.stringify(a.path)}\nexport default s\n`
      const r = await esbuild.build({ stdin: { contents: stub, resolveDir: path.dirname(a.path) }, bundle: true, write: false, outdir: "x", format: "esm", loader: { ".css": "local-css" }, logLevel: "silent" })
      const js = r.outputFiles.find((f) => f.path.endsWith(".js"))?.text || "export default {}"
      const css = r.outputFiles.find((f) => f.path.endsWith(".css"))?.text || ""
      return { contents: `${js}\n;(()=>{const s=document.createElement("style");s.textContent=${JSON.stringify(css)};document.head.appendChild(s)})()`, loader: "js" }
    })
    b.onLoad({ filter: /\.css$/ }, () => ({ contents: "", loader: "js" }))
  },
})

const failed = {}
const good = []
for (const d of demos) {
  const entry = `${SRC}/stage/entries/${d.key}.tsx`
  try {
    await esbuild.build({ entryPoints: [entry], bundle: true, write: false, format: "esm", jsx: "automatic", logLevel: "silent", plugins: [plugin("precheck")], loader: { ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".webp": "dataurl" } })
    good.push(d)
  } catch (e) {
    failed[d.key] = (e.errors?.[0]?.text || String(e)).slice(0, 160)
  }
}
console.log("precheck ok", good.length, "failed", Object.keys(failed).length)

const hostSrc = (list) => `import { createRoot } from "react-dom/client"\nimport { Component, createElement } from "react"\n` +
`class Boundary extends Component<any, any> { state = { e: null as any }; static getDerivedStateFromError(e: any) { return { e } } render() { return this.state.e ? createElement("div", { className: "desk-err" }, "Render failed: " + String(this.state.e?.message || this.state.e).slice(0, 220)) : this.props.children } }\n` +
`const loaders: Record<string, () => Promise<any>> = {\n${list.map((d) => `  ${JSON.stringify(d.key)}: () => import(${JSON.stringify(`${SRC}/stage/entries/${d.key}.tsx`)}),`).join("\n")}\n}\n` +
`export async function mount(key: string, el: HTMLElement) {\n  try { const m = await loaders[key](); const C = m.default; const root = createRoot(el); root.render(createElement(Boundary, null, createElement(C))); return root } catch (e: any) { el.innerHTML = '<div class="desk-err">Render failed: ' + String(e?.message || e).slice(0, 220) + '</div>'; return null }\n}\n`
let list = good.slice()
for (let round = 0; round < 8; round++) {
  w(`${SRC}/stage/host.tsx`, hostSrc(list))
  fs.rmSync(OUT, { recursive: true, force: true })
  try {
    await esbuild.build({ entryPoints: { host: `${SRC}/stage/host.tsx` }, bundle: true, splitting: true, format: "esm", outdir: OUT, minify: true, jsx: "automatic", plugins: [plugin("build")],
      define: { "process.env.NODE_ENV": '"production"' }, loader: { ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".webp": "dataurl" }, logLevel: "silent", chunkNames: "c-[hash]" })
    break
  } catch (e) {
    const bad = new Set()
    for (const er of e.errors || []) {
      const f = er.location?.file || ""
      const m = f.match(/stage\/p21\/([^/]+)\//) || f.match(/stage\/(reui|shadcn)\/([^/.]+)/) || f.match(/registry\/examples\/\w+\/(ex-[^/.]+)/)
      const ml = f.match(/stage\/L\/([^/]+)\/(?:.*\/)?([^/]+)\.tsx?$/)
      const key = ml ? `${ml[1]}--${ml[2]}` : m ? (m[2] && m[1] ? m[1] + "--" + m[2] : f.includes("p21") ? "p21--" + m[1] : "evilcharts--" + m[1]) : null
      const d = key && list.find((x) => x.key === key)
      if (d) { bad.add(d.key); failed[d.key] = failed[d.key] || (er.text || "").slice(0, 160) }
    }
    if (!bad.size) { console.log(e.errors?.slice(0, 5).map((x) => x.location?.file + ": " + x.text).join("\n")); throw e }
    list = list.filter((d) => !bad.has(d.key)); console.log("round", round, "dropped", bad.size)
  }
}
good.length = 0; good.push(...list)
w(`${OUT}/../manifest.json`, JSON.stringify({ good: good.map((d) => d.key), failed, demos }, null, 0))
console.log("built", good.length)
