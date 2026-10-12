// uihub: siso:code-bank
// The code bank (sisodias/siso-ui-code): every free registry's parts, each with its own preview page on its library's
// site and the line that installs it (Shaan, 10 Oct: "leverage these guys for the preview urls and just take the code
// and own the code so the agents can interact with that"). hubindex exports it into data/lib/.
import { useEffect, useState } from "react"
import { dataUrl } from "@/lib/data"

/** one part: name, title, kind, description, its page on their site, code held, why not, install url, npm deps, parts it builds on */
export type LibPart = { n: string; t?: string; k?: string; d?: string; p?: string; h?: 1; s?: string; i?: string; dp?: string[]; u?: number; c?: string[] }
export type Lib = { id: string; home?: string; d?: string; parts: number; held: number; pages: number; frame?: boolean | null; kinds: Record<string, number> }
export type LibIndex = { libraries: Lib[]; parts: number; held: number; pages: number }
export type LibDetail = { reg: string; home?: string; frame?: boolean | null; parts: LibPart[] }

const cache = new Map<string, Promise<unknown>>()
function useJson<T>(url: string | null): T | null | undefined {
  const [v, setV] = useState<{ url: string; v: T | null } | undefined>(undefined)
  useEffect(() => {
    if (!url) return
    if (!cache.has(url))
      cache.set(
        url,
        // the build's hashed name when it has one (lib/data.ts dataUrl): the browser keeps it a year
        dataUrl(decodeURIComponent(url))
          .then((u) => fetch(u === decodeURIComponent(url) ? url : u))
          .then((r) => (r.ok ? r.json() : null))
          .catch(() => null),
      )
    let live = true
    cache.get(url)!.then((x) => live && setV({ url, v: x as T | null }))
    return () => {
      live = false
    }
  }, [url])
  return v && v.url === url ? v.v : undefined
}

export const useLibs = () => useJson<LibIndex>("/data/lib/index.json")
// libraries are packed into 64 files by an FNV-1a hash of the name (bin/hubindex.py lib_shard)
const LIB_SHARDS = 64
export function libShard(id: string) {
  let h = 0x811c9dc5
  for (const b of new TextEncoder().encode(id)) h = Math.imul(h ^ b, 0x01000193) >>> 0
  return h % LIB_SHARDS
}
export const useLib = (id: string | undefined): LibDetail | null | undefined => {
  const shard = useJson<Record<string, LibDetail>>(id ? `/data/lib/shard-${libShard(id)}.json` : null)
  return shard === undefined || shard === null ? shard : shard[id!] || null
}

const KIND: Record<string, string> = {
  ui: "Primitive", component: "Component", block: "Block", page: "Page", example: "Example", hook: "Hook", lib: "Code",
  theme: "Theme", style: "Style", font: "Font", item: "Item", file: "File", base: "Base",
}
export const kindLabel = (k?: string) => (k ? KIND[k] || k : "Part")
export const hostOf = (u?: string) => (u ? u.replace(/^https?:\/\//, "").replace(/\/$/, "") : "")
