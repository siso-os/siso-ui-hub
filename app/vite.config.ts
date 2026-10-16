import fs from "node:fs"
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import type { Plugin } from "vite"

// A kit part that imports something the hub does not have (a paid package, a Next-only module, a file its library never
// published) gets a stub that throws when used, so that one part shows a failure card and the build still passes.
function kitStub(): Plugin {
  const P = "\0kit-stub:"
  return {
    name: "kit-stub",
    enforce: "pre",
    async resolveId(source, importer) {
      if (!importer || !/\/src\/kit\/|\/node_modules\//.test(importer) || source.startsWith("\0")) return null
      const hit = await this.resolve(source, importer, { skipSelf: true }).catch(() => null)
      if (hit) return null
      // shadcn registry paths (@/registry/new-york-v4/hooks/use-mobile) point at the hub's own copy when it has one
      const reg = source.match(/(?:^@|\/src)\/registry\/[^/]+\/hooks\/([^/]+)$/)
      if (reg) { const alt = await this.resolve(`@/hooks/${reg[1]}`, importer, { skipSelf: true }).catch(() => null); if (alt) return alt }
      return P + JSON.stringify([source, importer])
    },
    load(id) {
      if (!id.startsWith(P)) return null
      const [source, importer] = JSON.parse(id.slice(P.length)) as [string, string]
      // export exactly the names the importer asks for, each one throwing when used
      const names = new Set<string>()
      const esc = source.split("/").pop()!.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      const code = fs.readFileSync(importer.split("?")[0], "utf8")
      for (const m of code.matchAll(new RegExp(`(?:import|export)\\s+(?:type\\s+)?([^;]*?)\\s+from\\s*["'][^"']*${esc}["']`, "g"))) {
        const braces = m[1].match(/\{([^}]*)\}/)
        for (const part of braces ? braces[1].split(",") : []) {
          const name = part.trim().replace(/^type\s+/, "").split(/\s+as\s+/)[0].trim()
          if (/^[A-Za-z_$][\w$]*$/.test(name) && name !== "default") names.add(name)
        }
      }
      return [
        // used while a module loads (createContext(), styled.div`...`, cva(...)) it hands back itself; rendered as a component
        // (called with a props object) it throws, so only that part shows a failure card
        `const msg = ${JSON.stringify("needs " + source.replace(/^.*?\/(src|node_modules)\//, "$1/") + ", which the hub does not have")}`,
        `function f(...a) { const p = a[0]; if (p && typeof p === "object" && !Array.isArray(p) && Object.getPrototypeOf(p) === Object.prototype) throw new Error(msg); return stub }`,
        `const stub = new Proxy(f, { get: (_t, k) => (k === Symbol.toPrimitive ? () => "" : k === "then" ? undefined : k === "prototype" ? {} : stub), construct: () => stub })`,
        `export default stub`,
        ...[...names].map((n) => `export const ${n} = stub`),
      ].join("\n")
    },
  }
}

// HUB_SCRUBBED: the hosted hub's copies of the catalogue files the kit pages import, private names emptied
// (scripts/scrub-packages.py, run by deploy-pages.sh); a catalogue import is pointed at its copy when one exists
function hubScrubbed(): Plugin {
  const dir = process.env.HUB_SCRUBBED
  const cat = path.resolve(__dirname, "../catalogue")
  return {
    name: "hub-scrubbed",
    enforce: "pre",
    async resolveId(source, importer, opts) {
      if (!dir || !source.includes("catalogue/")) return null
      const [file, query] = source.split("?")
      const r = await this.resolve(file, importer, { ...opts, skipSelf: true })
      if (!r || !r.id.startsWith(cat + path.sep)) return null
      const copy = path.join(dir, path.relative(cat, r.id))
      return fs.existsSync(copy) ? copy + (query ? `?${query}` : "") : null
    },
  }
}

export default defineConfig({
  // UIHUB_PUBLIC_DIR=public-pub builds the public site from the publicised export (npm run build:public)
  publicDir: process.env.UIHUB_PUBLIC_DIR || "public",
  plugins: [hubScrubbed(), kitStub(), react(), tailwindcss()],
  // HUB_PACKAGES: the hosted hub's copy of src/data/siso-packages.json with private names taken out
  // (scripts/scrub-packages.py, run by deploy-pages.sh), because its bundle is downloadable before sign-in
  resolve: {
    alias: [
      ...(process.env.HUB_PACKAGES ? [{ find: "@/data/siso-packages.json", replacement: process.env.HUB_PACKAGES }] : []),
      { find: "next/image", replacement: path.resolve(__dirname, "./src/arc-shims/next-image.tsx") },
      { find: "next/link", replacement: path.resolve(__dirname, "./src/arc-shims/next-link.tsx") },
      { find: /^next\/font\/.*/, replacement: path.resolve(__dirname, "./src/arc-shims/next-font.ts") },
      { find: "next/navigation", replacement: path.resolve(__dirname, "./src/arc-shims/next-navigation.ts") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
  // a kit part that asks a package for a name its installed version lacks gets undefined (and a failure card), not a failed build
  build: { chunkSizeWarningLimit: 1200, rolldownOptions: { shimMissingExports: true } },
})
