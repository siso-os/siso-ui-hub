// uihub: siso:hub-data
// The data contract (SPEC "Data contract"): index.json once, item shards on demand, meta.json once. Read-only.
import { useEffect, useState } from "react"
import { buildOnto, type Onto, type OntologyRaw } from "@/lib/ontology"

// The hosted hub keeps the code bank's pictures (/a/t/<2 hex>/<hash>.webp, or .svg for icons drawn from their code) on
// four Pages projects of their own (20,000 files a project): 0-3 on the first, 4-7, 8-b, c-f on the others.
// VITE_THUMBS_BASE is "https://siso-ui-thumbs-{n}.pages.dev".
const THUMBS = import.meta.env.VITE_THUMBS_BASE as string | undefined
// eight projects by the first hex digit: even digits stay where four projects put them (1-4), odd ones went to 5-8
const shard = (d: number) => 1 + (d >> 2) + 4 * (d & 1)
export const pic = (p: string) => (THUMBS && p.startsWith("/a/t/") ? THUMBS.replace("{n}", String(shard(parseInt(p[5], 16)))) + p : p)

export type Signal = "love" | "star" | "good" | "maybe" | "meh"
export const SIGNALS: Signal[] = ["love", "star", "good", "maybe", "meh"]
export const STATUSES = ["curated", "picked", "ours", "rated", "reviewed", "indexed"] as const
export type Status = (typeof STATUSES)[number]

export interface Row {
  id: string
  t: string
  d?: string
  k: string
  s: string
  c?: string
  g?: string
  a?: string
  st: Status
  u?: number
  p?: string
  /** Credited upstream preview when a local thumbnail is unavailable. */
  pl?: string
  pc?: string
  b?: 1
  sig?: Signal
  tg?: string[]
  lv?: 1
  /** its picture is a photo of its page (docs chrome around it), not drawn from the part itself */
  ph?: 1
  /** its picture was drawn again with sample text (it drew nothing alone): often only the text shows */
  ps?: 1
  /** his note (his picks) */
  nt?: string
  /** scout score out of 25 */
  sc?: number
  /** the code bank's finer place: subcategory (bin/classify) */
  sb?: string
  /** framework when not React (Vue, Svelte, ReScript…) */
  fw?: string
  /** style tags: animated, webgl, 3d, glass, neon… */
  sy?: string[]
  /** how many variants and examples ride on this part */
  vn?: number
  /** its code is in the code bank */
  hc?: 1
  /** an exact copy of another library's part (siso-ui-code bin/dupes) */
  cp?: 1 | 2
  /** a sound's own recording on this site (/a/s/…), its length in seconds and its waveform as 40 digits 0-9 */
  au?: string
  du?: number
  w?: string
  /** its detailed type as numbers into index.json "types" (the bank's types/): rating, level, pattern, motion */
  ty?: [number, number, number, number]
  /** the slots it fills (landing:hero, dashboard:sidebar), as numbers into types.slots */
  sl?: number[]
  /** its looks (dark, glass, 3d…) and the industries it fits (saas, ai…), as numbers into types.looks / types.fits */
  lk?: number[]
  ft?: number[]
  /** filled in by loadIndex from ty and sl */
  rt?: number
  lvl?: string
  pat?: string
  mo?: string
  slots?: string[]
  looks?: string[]
  fits?: string[]
  /** filled in by loadIndex (lib/ontology.ts): its scale and its node ("component/card"); none for demos and code */
  scl?: string
  nd?: string
  /** derived: lower-cased haystack for search */
  _q: string
  /** derived: rank for "best first" */
  _r: number
  _al?: number  // look-alikes folded under this card on a kind page
}

export interface Stats {
  total: number
  ui_items: number
  resources: number
  /** icons, logos, sounds, flags, fonts (the Assets tab) */
  assets?: number
  by_kind: Record<string, number>
  by_source: Record<string, number>
  by_status: Record<string, number>
  by_group: Record<string, number>
  by_signal: Record<string, number>
  bookmarked: number
  gone_through: number
  left_in_corpus: number
  with_live_preview: number
  frontier_open: number
  frontier_by_area: Record<string, number>
  categories: number
  /** parts a reader has typed and rated (the bank's types/), and how many at each rating */
  typed?: number
  by_rating?: Record<string, number>
  authors: number
  coverage?: Coverage[]
  good_not_curated?: string[]
  left_to_find?: string[]
}

export interface Coverage { category: string; section: string; label: string; total: number; gone: number; curated: number; picked: number }
export interface NavItem { label: string; categories: string[]; n: number; his: number; slug: string }
export interface NavSection { section: string; items: NavItem[] }

export interface Index {
  generated: string
  /** the public build: no his picks, notes, signals or bookmarks */
  public?: boolean
  /** where the hub lives on this machine (private build only), for the MCP config */
  hub_path?: string | null
  stats: Stats
  kinds: string[]
  kind_labels: Record<string, string>
  statuses: string[]
  groups: Record<string, Record<string, number>>
  nav: NavSection[]
  /** the word tables a row's ty and sl point into */
  types?: { levels: string[]; patterns: string[]; motions: string[]; slots: string[]; looks?: string[]; fits?: string[] }
  items: Row[]
  /** catalogue/schema/ontology.json: the scales and their nodes */
  ontology?: OntologyRaw
  /** derived: every node, and each part placed on one */
  onto: Onto
  /** derived: nav item by slug, and the nav item a category belongs to */
  navBySlug: Map<string, NavItem>
  navByCategory: Map<string, NavItem>
  byId: Map<string, Row>
  byCategory: Map<string, Row[]>
}

export interface Frontier { area: string; lead: string; rank: number; status: string; why: string; from?: string[] }
export interface Library { id: string; name: string; site: string; licence: string; items: number; free?: number; role: string; verdict: string }
export interface Registry { name: string; homepage?: string; url?: string; description?: string }
export interface Vertical { id: string; name: string; surface: string; projects: string[]; owner: string; status: string; pages?: unknown[] }
export interface Fit { item: string; ids: string[]; dashboard: string; "native-app": string; "landing-site": string; why: string }
export interface UiBlock { category: string; label: string; best: string[] }
export interface Process { name: string; boundary?: string; software?: string[]; modules?: string[]; ui?: UiBlock[] }
export interface Screen { category: string; label: string; best: string[]; processes: number[] }
export interface Industry { id: string; name: string; summary?: string; software?: string[]; modules?: string[]; processes?: Process[] | number; status?: string; as_of?: string; shell?: UiBlock[]; screens?: Screen[] }

/** "US small hotels and lodging operators" -> "Hotels and lodging operators" */
export function shortIndustry(name: string): string {
  const s = name.replace(/^US\s+/, "").replace(/^small\s+/i, "")
  return s.charAt(0).toUpperCase() + s.slice(1)
}
export interface Meta {
  industries?: Industry[]
  industry_index?: { count: number; url: string; by: string }
  frontier: Frontier[]
  libraries: Library[]
  registries: Registry[]
  verticals: Vertical[]
  fit: Fit[]
  surfaces: string[]
  authors: { name: string; items: number }[]
}

export interface FullRow {
  id: string
  // a code-bank part (sisodias/siso-ui-code): its registry, place, facets, its own page and where its code is held
  reg?: string
  sub?: string
  fw?: string
  style?: string[]
  domain?: string[]
  page?: string
  frame?: boolean
  held?: boolean
  code_path?: string
  refused?: string
  variants?: string[]
  registry_uses?: string[]
  /** the part this one is an exact copy of, and the parts that copy this one (hub ids) */
  copy_of?: string | null
  copies?: string[] | null
  copy_sim?: number | null
  near_copies?: string[] | null
  /** how a code-bank part's picture was made: a photo of its page, or drawn from its SVG or its own code */
  picture_from?: string | null
  /** a reader's detailed type (the bank's types/); from: the base or original it was read on */
  type?: { what?: string; level?: string; pattern?: string; slots?: string[]; look?: string[]; motion?: string; fits?: string[]; rating?: number; why?: string; from?: string } | null
  /** a sound part's recording (his build): where it is, its length, licence and who made it */
  audio?: string | null
  audio_len?: number | null
  audio_licence?: string | null
  audio_author?: string | null
  name?: string
  title?: string
  desc?: string
  kind?: string
  source?: string
  category?: string
  author?: string
  url?: string
  install?: string
  licence?: string
  tier?: string
  deps?: string[]
  tags?: string[]
  uses?: number
  status?: string
  curated?: { n?: number; signal?: Signal; note?: string; targets?: string[]; type?: string; form?: string; session?: string }
  pick?: { category?: string; why?: string; main?: boolean }
  score?: { bank?: number; lane?: string; why?: string }
  bookmark?: Record<string, unknown>
  docs?: Record<string, string[] | string>
  files?: { file: string; code?: string }[]
  live?: string | null
  video?: string | null
  preview?: string | null
  preview_link?: string | null
  preview_credit?: string | null
  preview_status?: string
  sections?: string[]
  from?: string
  reason?: string
  res_kind?: string
  where?: string
  [k: string]: unknown
}

const STATUS_RANK: Record<string, number> = { curated: 5, picked: 4, ours: 3, rated: 2, reviewed: 1, indexed: 0 }
export const statusRank = (s: string) => STATUS_RANK[s] ?? 0

let indexP: Promise<Index> | null = null
let metaP: Promise<Meta> | null = null
let indexV: Index | null = null
let metaV: Meta | null = null

// the build's manifest (scripts/hash-data.py): plain name -> a hashed name the browser keeps a year. Fetched once, small;
// without one (local dev, an old build) the plain names are used
let manifestP: Promise<Record<string, string>> | null = null
export function dataUrl(path: string): Promise<string> {
  manifestP ??= fetch("/data/manifest.json")
    .then((r) => (r.ok ? r.json() : {}))
    .catch(() => ({}))
  return manifestP.then((m) => m[path] || path)
}

export function loadIndex(): Promise<Index> {
  if (!indexP)
    indexP = dataUrl("/data/index.json")
      .then((u) => fetch(u))
      .then((r) => {
        if (!r.ok) throw new Error(`index.json ${r.status}`)
        return r.json()
      })
      // the rows come in chunks beside it (bin/hubindex.py INDEX_CHUNK), fetched side by side
      .then((raw) =>
        raw.chunks
          ? Promise.all(
              Array.from({ length: raw.chunks }, (_, k) =>
                dataUrl(`/data/index-${k + 1}.json`)
                  .then((u) => fetch(u))
                  .then((r) => {
                    if (!r.ok) throw new Error(`index-${k + 1}.json ${r.status}`)
                    return r.json()
                  }),
              ),
            ).then((parts) => ({ ...raw, items: parts.flat() }))
          : raw,
      )
      .then((raw) => {
        const byId = new Map<string, Row>()
        const byCategory = new Map<string, Row[]>()
        const W = raw.types || { levels: [], patterns: [], motions: [], slots: [], looks: [], fits: [] }
        for (const it of raw.items as Row[]) {
          // left out of the file when usual (bin/hubindex.py): the group is the category's first word
          it.g ??= it.c ? it.c.split("/")[0] : "other"
          it.st ??= "indexed"
          it.k ??= "component"
          if (it.p) it.p = pic(it.p)
          if (it.ty) {
            it.rt = it.ty[0] || undefined
            it.lvl = W.levels[it.ty[1]]
            it.pat = W.patterns[it.ty[2]]
            it.mo = W.motions[it.ty[3]]
          }
          if (it.sl) it.slots = it.sl.map((n) => W.slots[n]).filter(Boolean)
          if (it.lk) it.looks = it.lk.map((n) => W.looks?.[n]).filter(Boolean)
          if (it.ft) it.fits = it.ft.map((n) => W.fits?.[n]).filter(Boolean)
          it._q = [it.t, it.c, it.a, it.s, it.k, it.sb, it.fw, it.pat, it.lvl, ...(it.slots || []), ...(it.looks || []), ...(it.fits || []), ...(it.tg || []), ...(it.sy || [])].join(" ").toLowerCase()
          // within a status, the better rated come first (a reader's 1-5, unread counts as 2.5), then parts you can see:
          // a picture drawn from the part itself, then a photo of its page (docs chrome around it), then a live page
          // (10 Oct: the code bank's 40k parts)
          it._r = statusRank(it.st) * 1e8 + (it.rt ?? 2.5) * 1e7 + (it.p ? (it.ps ? 1.2e6 : it.ph ? 1.5e6 : 2e6) : it.lv ? 1e6 : 0) + Math.min(it.vn || 0, 50) * 1e3 + (it.u || 0)
          byId.set(it.id, it)
          if (it.c) {
            const l = byCategory.get(it.c)
            if (l) l.push(it)
            else byCategory.set(it.c, [it])
          }
        }
        const navBySlug = new Map<string, NavItem>()
        const navByCategory = new Map<string, NavItem>()
        for (const sec of (raw.nav || []) as NavSection[])
          for (const it of sec.items) {
            it.slug = slug(it.label)
            navBySlug.set(it.slug, it)
            for (const c of it.categories) if (!navByCategory.has(c)) navByCategory.set(c, it)
          }
        const onto = buildOnto(raw.ontology, raw.items, raw.groups || {}, (c) => {
          const it = navByCategory.get(c)
          return it && it.categories.length === 1 ? it.label : catLabel(c)
        })
        const v: Index = { ...raw, nav: raw.nav || [], byId, byCategory, navBySlug, navByCategory, onto }
        indexV = v
        return v
      })
  return indexP
}

export function loadMeta(): Promise<Meta> {
  if (!metaP)
    metaP = dataUrl("/data/meta.json")
      .then((u) => fetch(u))
      .then((r) => {
        if (!r.ok) throw new Error(`meta.json ${r.status}`)
        return r.json()
      })
      .then((m: Meta) => {
        metaV = m
        return m
      })
  return metaP
}

export function useIndex(): Index | null {
  const [v, setV] = useState<Index | null>(indexV)
  useEffect(() => {
    if (!v) loadIndex().then(setV)
  }, [v])
  return v
}

/** true in the public build (index.json `public: true`). */
export function usePublic(): boolean {
  return !!useIndex()?.public
}

export function useMeta(): Meta | null {
  const [v, setV] = useState<Meta | null>(metaV)
  useEffect(() => {
    if (!v) loadMeta().then(setV)
  }, [v])
  return v
}

/** FNV-1a 32-bit over UTF-8 bytes, mod 64 (SPEC). */
export function shardOf(id: string): number {
  let h = 0x811c9dc5
  for (const b of new TextEncoder().encode(id)) {
    h ^= b
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h % 64
}

const shardP = new Map<number, Promise<Record<string, FullRow>>>()
const shardV = new Map<number, Record<string, FullRow>>()

export function loadItem(id: string): Promise<FullRow | null> {
  const n = shardOf(id)
  let p = shardP.get(n)
  if (!p) {
    p = dataUrl(`/data/item/${n}.json`)
      .then((u) => fetch(u))
      .then((r) => (r.ok ? r.json() : {}))
      .then((d) => {
        shardV.set(n, d)
        return d
      })
      .catch(() => ({}))
    shardP.set(n, p)
  }
  return p.then((d) => d[id] ?? null)
}

/** Full row for an id; `enabled` lets cards wait until they are on screen. */
export function useItem(id: string | undefined, enabled = true): FullRow | null | undefined {
  const cached = id ? shardV.get(shardOf(id))?.[id] : undefined
  const [state, setState] = useState<{ id?: string; row: FullRow | null | undefined }>({ id, row: cached })
  useEffect(() => {
    if (!id || !enabled) return
    let live = true
    loadItem(id).then((row) => live && setState({ id, row }))
    return () => {
      live = false
    }
  }, [id, enabled])
  if (state.id !== id) return cached
  return state.row ?? cached
}

export type SortKey = "best" | "rated" | "uses" | "az"
export function sortRows(rows: Row[], key: SortKey): Row[] {
  const out = rows.slice()
  if (key === "best") out.sort((a, b) => Number(b.st === "curated") - Number(a.st === "curated") || Number(!!b.p) - Number(!!a.p) || b._r - a._r)
  else if (key === "rated") out.sort((a, b) => (b.rt || 0) - (a.rt || 0) || Number(!!b.p) - Number(!!a.p) || b._r - a._r)
  else if (key === "uses") out.sort((a, b) => (b.u || 0) - (a.u || 0))
  else out.sort((a, b) => a.t.localeCompare(b.t))
  return out
}

export function fmtNum(n: number | undefined): string {
  if (!n) return "0"
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "m"
  if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "k"
  return String(n)
}

export function fmtInt(n: number | undefined): string {
  return (n ?? 0).toLocaleString("en-GB")
}

/** "marketing/hero?" -> "hero (unsure)" */
// the code bank's categories the nav has no entry for (siso-ui-code bin/classify, bin/icons, bin/sites)
const BANK_LABELS: Record<string, string> = {
  "assets/icon": "Icons", "assets/logo": "Logos", "assets/sound": "Sounds", "assets/flag": "Flags", "assets/illustration": "Illustrations",
  "assets/og-image": "OG images", "assets/font": "Fonts", "assets/shape": "Shapes", "assets/avatar": "Avatar art", "data-viz/flow": "Flow diagrams",
  "ai-agent/ai-agent": "AI agents", "marketing/marketing": "Other sections", "other/other": "Other", "media/mockup": "Mockups", "marketing/about": "About sections",
}

export function catLabel(c: string | undefined): string {
  if (!c) return "uncategorised"
  if (BANK_LABELS[c]) return BANK_LABELS[c]
  const name = c.includes("/") ? c.slice(c.indexOf("/") + 1) : c
  const unsure = name.endsWith("?")
  return (unsure ? name.slice(0, -1) : name).replace(/-/g, " ") + (unsure ? " (unsure)" : "")
}

/** the index's groups, named the way UI's side nav names them (a component by the job it does) */
export const GROUP_NAMES: Record<string, string> = {
  actions: "Actions", inputs: "Inputs & forms", navigation: "Navigation", overlays: "Overlays", "data-display": "Data display",
  "data-viz": "Charts & data", status: "Status & loading", media: "Media", "ai-agent": "AI & chat", lib: "Hooks", other: "Other",
  marketing: "Sections", pages: "Templates", layout: "Layouts", flows: "Screens & flows", motion: "Motion", themes: "Themes",
  ours: "Ours", tools: "Tools", discover: "Discover", unsorted: "Unsorted", assets: "Assets",
}

export function groupLabel(g: string): string {
  if (GROUP_NAMES[g]) return GROUP_NAMES[g]
  const unsure = g.endsWith("?")
  return (unsure ? g.slice(0, -1) : g).replace(/-/g, " ") + (unsure ? " (unsure)" : "")
}

export function catHref(c: string): string {
  const i = c.indexOf("/")
  if (i < 0) return `/browse/${encodeURIComponent(c)}`
  return `/browse/${encodeURIComponent(c.slice(0, i))}/${encodeURIComponent(c.slice(i + 1))}`
}

export const itemHref = (id: string) => `/c/${encodeURIComponent(id)}`
export const authorHref = (a: string) => `/authors/${encodeURIComponent(a)}`

export function slug(s: string): string {
  return s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}
export const navHref = (it: { label: string }) => `/browse/s/${slug(it.label)}`

/** Rows of a nav item: the union of its categories (a bare group name means that group's uncategorised rows). */
export function navRows(idx: Index, it: NavItem): Row[] {
  const seen = new Set<string>()
  const out: Row[] = []
  for (const c of it.categories) {
    const l = idx.byCategory.get(c) || (c.includes("/") ? [] : idx.items.filter((r) => r.g === c && (!r.c || r.c === c)))
    for (const r of l) if (!seen.has(r.id)) (seen.add(r.id), out.push(r))
  }
  return out
}

/** The best link for a category: its nav row when it has one, else the old category route. */
export function catLink(idx: Index, c: string): string {
  const it = idx.navByCategory.get(c)
  return it && it.categories.length === 1 ? navHref(it) : catHref(c)
}
export function catName(idx: Index, c: string): string {
  const it = idx.navByCategory.get(c)
  return it && it.categories.length === 1 ? it.label : catLabel(c)
}
