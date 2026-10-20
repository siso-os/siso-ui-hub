// bin/render's bundler: run inside the render sandbox (node render-bundle.mjs jobs.json results.json), where node_modules
// holds esbuild and the parts' packages. Each job is one part written to its own folder by bin/render, with entry.tsx.
// "@/..." imports resolve to the part's own files (by path, then by the path's tail), then to the sandbox's shadcn ui,
// lib and hooks; next/* resolves to small shims. An "@/" file nobody holds becomes an empty stand-in (recorded); a
// package the sandbox lacks fails the part, and its name is recorded so the next pass can install the commonest.
import * as esbuild from "esbuild"
import fs from "node:fs"
import path from "node:path"

const SB = process.cwd()
const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"))
const EXTS = ["", ".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts", "/index.jsx", "/index.js"]
const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile()
const find = (base) => EXTS.map((e) => base + e).find(isFile)
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]))
const strip = (p) => p.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/\/index$/, "")

const results = []
for (const j of jobs) {
  const own = walk(j.dir).filter((f) => /\.(tsx|ts|jsx|js|css)$/.test(f) && !/\/(entry\.tsx|out\.js)$/.test(f))
  const stubs = new Set()
  const plugin = {
    name: "siso",
    setup(b) {
      b.onResolve({ filter: /^(@\/|~\/|@workspace\/ui\/|@ui\/)/ }, (a) => {
        const rest = a.path.replace(/^@workspace\/ui\//, "").replace(/^(@|~)\//, "").replace(/^@ui\//, "components/ui/")
        const tail = rest.split("/")
        const ui = rest.match(/(?:^|\/)ui\/([^/]+)$/)
        const hook = rest.match(/(?:^|\/)hooks\/([^/]+)$/)
        const tries = [path.join(j.dir, rest)]
        if (ui) tries.push(path.join(SB, "src/components/ui", ui[1]))
        if (hook) tries.push(path.join(SB, "src/hooks", hook[1]))
        if (/(^|\/)utils?$/.test(rest)) tries.push(path.join(SB, "src/lib/utils"))
        tries.push(path.join(SB, "src", rest))
        for (const t of tries) {
          const f = find(t)
          if (f) return { path: f }
        }
        // the part's own file by the import's last two segments, then its last one (registry/default/x/y -> .../x/y.tsx)
        for (const n of [2, 1]) {
          const want = "/" + tail.slice(-n).join("/")
          const f = own.find((p) => strip(p).endsWith(want))
          if (f) return { path: f }
        }
        if (/\.css$/.test(rest)) return { path: a.path, namespace: "empty" }
        stubs.add(a.path)
        return { path: a.path, namespace: "stub" }
      })
      // shadcn's registry (new-york-v4) and many others now write `from "cn"`, which their CLI rewrites on install
      b.onResolve({ filter: /^cn$/ }, () => ({ path: path.join(SB, "src/lib/utils.ts") }))
      // a part's own relative import of a file its registry did not ship (a shared hooks file): an empty stand-in
      b.onResolve({ filter: /^\.\.?\// }, (a) => {
        if (!a.importer.startsWith(j.dir)) return undefined
        const base = path.resolve(a.resolveDir, a.path)
        const f = find(base) || find(base.replace(/\.js$/, ""))
        if (f) return { path: f }
        if (/\.(css|scss|sass)$/.test(a.path)) return { path: a.path, namespace: "empty" }
        stubs.add(a.path)
        return { path: a.path, namespace: "stub" }
      })
      // lucide dropped its brand icons (Github, Twitter ...): an icon it no longer has is drawn as a plain circle-help
      b.onResolve({ filter: /^lucide-react$/ }, () => ({ path: "lucide-react", namespace: "lucide" }))
      b.onLoad({ filter: /.*/, namespace: "lucide" }, () => ({
        // esbuild copies a CommonJS module's own names, so the stand-in answers from the prototype: any capitalised name it lacks
        contents: `const L = require(${JSON.stringify(path.join(SB, "node_modules/lucide-react/dist/cjs/lucide-react.js"))})
const icon = L.CircleHelp || L.Circle
module.exports = Object.setPrototypeOf({ ...L }, new Proxy({}, { get: (t, k) => (typeof k === "string" && /^[A-Z]/.test(k) ? icon : undefined) }))`,
        loader: "js", resolveDir: SB,
      }))
      // the old name of Base UI's package
      b.onResolve({ filter: /^@base-ui-components\/react/ }, async (a) => {
        const r = await b.resolve(a.path.replace("@base-ui-components/react", "@base-ui/react"), { resolveDir: SB, kind: a.kind })
        return r.errors.length ? undefined : { path: r.path }
      })
      // a part's stylesheet is bundled (out.css); Tailwind's own imports in it are left out (the batch's CSS has them)
      b.onResolve({ filter: /^(tailwindcss|tw-animate-css|shadcn)(\/|$)/ }, (a) => (a.kind === "import-rule" ? { path: a.path, namespace: "empty" } : undefined))
      b.onResolve({ filter: /^next(\/|$)/ }, (a) => {
        const f = find(path.join(SB, "src/shims", a.path.replace(/\//g, "-")))
        return f ? { path: f } : { path: a.path, namespace: "stub" }
      })
      b.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
        // an "@/" module nobody holds: a capitalised name is a component that draws nothing, a use* name a hook that
        // returns [] (both destructurings work), any other name a function that returns "". esbuild copies a CommonJS
        // module's own names only, so the stand-in answers from its prototype; React's own lookups get undefined.
        contents: `function Stub() { return null }
const SKIP = new Set(["prototype", "isReactComponent", "$$typeof", "then", "defaultProps", "propTypes", "contextTypes", "childContextTypes",
  "contextType", "getDerivedStateFromProps", "getDerivedStateFromError", "displayName", "render", "compare", "type", "_payload", "_init",
  "constructor", "toJSON", "valueOf", "toString", "__esModule", "default"])
const pick = (k) => (typeof k !== "string" || SKIP.has(k) ? undefined : /^use[A-Z0-9]/.test(k) ? () => [] : /^[A-Z]/.test(k) ? Stub : () => "")
module.exports = Object.setPrototypeOf({ __esModule: true, default: Stub }, new Proxy({}, { get: (t, k) => pick(k) }))`,
        loader: "js",
      }))
      b.onLoad({ filter: /.*/, namespace: "empty" }, () => ({ contents: "", loader: "js" }))
    },
  }
  // entries in order (shadcn's demo around the part, then the part alone): the first that bundles is drawn
  let res = null
  for (const entry of j.entries || [j.entry]) {
    stubs.clear()
    try {
      await esbuild.build({
        entryPoints: [entry], bundle: true, outfile: path.join(j.dir, "out.js"), format: "iife", platform: "browser", target: "es2022",
        jsx: "automatic", minify: true, legalComments: "none", logLevel: "silent", plugins: [plugin], nodePaths: [path.join(SB, "node_modules")],
        loader: { ".css": "css", ".svg": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".jpeg": "dataurl", ".webp": "dataurl", ".gif": "dataurl",
                  ".glsl": "text", ".frag": "text", ".vert": "text", ".woff": "file", ".woff2": "file", ".ttf": "file", ".otf": "file", ".mp3": "empty", ".mp4": "empty" },
        define: { "process.env.NODE_ENV": '"production"', "process.env": "{}" },
      })
      res = { key: j.key, ok: true, used: entry, stubs: [...stubs] }
      break
    } catch (e) {
      const missing = (e.errors || []).map((x) => (x.text.match(/Could not resolve "([^"]+)"/) || [])[1]).filter(Boolean)
      res = { key: j.key, ok: false, missing, error: String(e.errors?.[0]?.text || e).slice(0, 240) }
    }
  }
  results.push(res)
}
fs.writeFileSync(process.argv[3], JSON.stringify(results))
