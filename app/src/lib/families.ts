// uihub: siso:families
// Taxonomy v2 (15 Oct, .agents/plan/2026-10-15-sitemap-and-specs.md): Layer (the top pill) > Family (the side nav) >
// Kind (a page) > Variation (a slot). catalogue/schema/families.json groups the ontology's nodes into families per layer;
// a kind is a node's key, so every part placed on a node and every pick (siso/base/<key>) keeps its home. Kinds the
// library has no category for yet are the kit's own stubs, filled by the sisolabs landing harvest and our apps. A node
// no family names lands in "More", so nothing is ever hidden.
import raw from "../../../catalogue/schema/families.json"
import type { ONode, Onto, Scale } from "@/lib/ontology"
import type { TopTab } from "@/lib/tab"
import { sortRows, type Index, type Row } from "@/lib/data"

type RawKind = string | { key: string; name: string; job?: string }
interface RawFamily { id: string; name: string; job?: string; kinds: RawKind[] }
interface RawLayer { id: string; name: string; scale: string; families: RawFamily[] }
const LAYERS = (raw as unknown as { layers: RawLayer[] }).layers

export interface Family { id: string; name: string; job?: string; tab: TopTab; kinds: ONode[] }

/** a layer's id in families.json -> its top pill */
const TAB_OF_LAYER: Record<string, TopTab> = { atoms: "atoms", components: "components", sections: "sections", pages: "pages", shells: "shells", style: "looks", assets: "assets" }
const keyOf = (k: RawKind) => (typeof k === "string" ? k : k.key)

// where each kind sits: its pill and family (a kind sits in one family)
const HOME = new Map<string, { tab: TopTab; fam: string }>()
for (const l of LAYERS) for (const f of l.families) for (const k of f.kinds) HOME.set(keyOf(k), { tab: TAB_OF_LAYER[l.id], fam: f.id })

/** the pill and family a kind sits in, from its key ("section/sidebar" sits under Shells > App frame) */
export const homeOf = (key: string) => HOME.get(key)

/** a stub kind: the kit's own, with no library parts yet */
export function stubOf(key: string): ONode | undefined {
  for (const l of LAYERS)
    for (const f of l.families)
      for (const k of f.kinds) if (typeof k !== "string" && k.key === key) return { id: key.split("/")[1], name: k.name, job: k.job, scale: key.split("/")[0] as Scale, key, group: f.name }
  return undefined
}

/** a pill's families, each with its kinds resolved against the index; then "More" for its scale's unplaced nodes */
export function familiesOf(o: Onto | undefined, tab: TopTab): Family[] {
  const l = LAYERS.find((x) => TAB_OF_LAYER[x.id] === tab)
  if (!l || !o) return []
  const out: Family[] = l.families.map((f) => ({
    id: f.id,
    name: f.name,
    job: f.job,
    tab,
    kinds: f.kinds.map((k) => (typeof k === "string" ? o.byKey.get(k) : stubOf(k.key))).filter((n): n is ONode => !!n),
  }))
  const more = (o.scales[l.scale as Scale] || []).filter((n) => !HOME.has(n.key))
  if (more.length) out.push({ id: "more", name: "More", job: "parts no family names yet", tab, kinds: more })
  return out.filter((f) => f.kinds.length)
}

export const familyById = (o: Onto | undefined, tab: TopTab, id: string) => familiesOf(o, tab).find((f) => f.id === id)

type Marks = Record<string, { off?: boolean; note?: string } | undefined>
const on = (m: Marks, k: string) => !!m[k] && !m[k]!.off

/** how full a kind is in the kit: "full" (its base and every variation), "base" (the base, not every variation), "gap" */
export function kitState(n: ONode, marks: Marks, variations: { id: string }[] = []): "full" | "base" | "gap" {
  const base = on(marks, `siso/base/${n.key}`) || (n.cats || []).some((c) => on(marks, `siso/base/${c}`))
  if (!base) return "gap"
  return variations.every((v) => on(marks, `siso/base/${n.key}/${v.id}`)) ? "full" : "base"
}

/** a kind's tile on a layer page or the kit home: its kit state, a real screen, its part count, and whether it is picked */
export interface Tile { n: ONode; state: "full" | "base" | "gap"; row?: Row; names: string[]; count: number; picked: boolean }
export interface LayerFamily extends Family { tiles: Tile[]; got: number }

const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7) >>> 0

/** a pill's families with a tile per kind. The picture is the kit's pick; while a kind is a gap, a strong library part:
 *  the best one at seed 0, another of the best eight for each Shuffle (quick: the first with a picture, for the kit home) */
export function layerView(idx: Index, tab: TopTab, marks: Marks, variationsOf: (key: string) => { id: string }[], seed = 0, quick = false): LayerFamily[] {
  const o = idx.onto
  const live = (k: string) => (marks[k] && !marks[k]!.off ? marks[k]!.note : undefined)
  return familiesOf(o, tab).map((f) => {
    const tiles = f.kinds.map((n): Tile => {
      const rows = (o.rows.get(n.key) || []).filter((r) => !on(marks, `siso/skip/${n.key}/${r.id}`))
      const pickId = live(`siso/base/${n.key}`) ?? (n.cats || []).map((c) => live(`siso/base/${c}`)).find(Boolean)
      let row = pickId ? idx.byId.get(pickId) : undefined
      if (!row) {
        const pool = quick ? rows.filter((r) => r.p && !r.cp).slice(0, 1) : sortRows(rows.filter((r) => r.p && !r.cp), "best").slice(0, 8)
        row = pool.length ? pool[seed ? (hash(n.key) + seed) % pool.length : 0] : undefined
      }
      // no picture held for any of its parts: name its strongest few instead of an empty box
      const names = row ? [] : (quick ? rows.slice(0, 4) : sortRows(rows, "best").slice(0, 4)).map((r) => r.t)
      return { n, state: kitState(n, marks, variationsOf(n.key)), row, names, count: rows.length, picked: !!pickId }
    })
    return { ...f, tiles, got: tiles.filter((t) => t.state !== "gap").length }
  })
}
