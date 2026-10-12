// uihub: siso:ontology
// The library by scale (Shaan, 11 Oct: "break down every single atomic type ... so the infinite scales of creativity
// still has a base to come from ... stand the test of time of 10-20 years"). catalogue/schema/ontology.json names the
// nodes at each scale (atoms, components, sections, pages) and what each is made of; the export puts it in index.json.
// Here every part gets its scale and its node, once, when the index loads: the top pill picks a scale, the side nav its
// nodes, and /x/<scale>/<node> shows a node's parts.
import type { Row } from "@/lib/data"

export type Scale = "atom" | "component" | "section" | "page" | "look" | "asset"
export interface ONode {
  id: string
  name: string
  job?: string
  made_of?: string[]
  cats?: string[]
  /** when nodes at a scale share a category, the words in a part's type or slots that pick this one */
  match?: string[]
  /** a page's sections, in order */
  sections?: string[]
  /** the side nav's heading: a component's group (Input, Navigation …), Site or App, Foundations or Effects */
  group?: string
  scale: Scale
  /** "<scale>/<id>": the node's address under /x/ */
  key: string
}
type RawNode = Omit<ONode, "scale" | "key" | "group">
export interface OntologyRaw {
  atoms: RawNode[]
  components: { group: string; items: RawNode[] }[]
  sections: Record<string, RawNode[]>
  pages: Record<string, RawNode[]>
  [k: string]: unknown
}
export interface Onto {
  nodes: ONode[]
  byKey: Map<string, ONode>
  /** a node's parts, by key */
  rows: Map<string, Row[]>
  scales: Record<Scale, ONode[]>
}

export const SCALES: { id: Scale; label: string }[] = [
  { id: "atom", label: "Atoms" },
  { id: "component", label: "Components" },
  { id: "section", label: "Sections" },
  { id: "page", label: "Pages" },
  { id: "look", label: "Looks" },
  { id: "asset", label: "Assets" },
]
const SIDE: Record<string, string> = { site: "Site", app: "App" }

// a reader's level picks the scale to look at first, then the nearest ones (a component read on a hero is a hero);
// demos and code (logic) stay out of browsing
const ORDER: Record<string, Scale[]> = {
  primitive: ["atom", "component", "section", "page", "look"],
  component: ["component", "atom", "section", "page", "look"],
  section: ["section", "component", "page", "atom", "look"],
  page: ["page", "section", "component", "atom", "look"],
  shell: ["page", "section", "component", "atom", "look"],
  effect: ["look", "component", "atom", "section", "page"],
  theme: ["look", "component", "atom", "section", "page"],
  "": ["component", "atom", "section", "page", "look"],
}

const ASSET_ORDER: Scale[] = ["asset"]

/** the nodes of the ontology plus the Looks (themes and each motion category), and every part placed on one */
export function buildOnto(raw: OntologyRaw | undefined, items: Row[], groups: Record<string, Record<string, number>>, name: (c: string) => string): Onto {
  const nodes: ONode[] = []
  const add = (n: RawNode, scale: Scale, group?: string) => nodes.push({ ...n, scale, group, key: `${scale}/${n.id}` })
  if (raw) {
    for (const n of raw.atoms) add(n, "atom", "Atoms")
    for (const g of raw.components) for (const n of g.items) add(n, "component", g.group)
    for (const [side, l] of Object.entries(raw.sections)) for (const n of l) add(n, "section", SIDE[side] || side)
    for (const [side, l] of Object.entries(raw.pages)) for (const n of l) add(n, "page", SIDE[side] || side)
  }
  // Looks: the foundations (themes, styles) and the effects, one node a category, biggest first
  const looks = (g: string, head: string) =>
    Object.entries(groups[g] || {})
      .filter(([c]) => c !== "themes/shadcn")
      .sort((a, b) => b[1] - a[1])
      .forEach(([c]) => add({ id: c.split("/")[1], name: name(c), cats: [c] }, "look", head))
  looks("themes", "Foundations")
  looks("motion", "Effects")
  // Assets: one bank a kind (logos, sounds, OG images, avatars, art, fonts …); icons are the Icon atom
  Object.entries(groups.assets || {})
    .filter(([c]) => c !== "assets/icon")
    .sort((a, b) => b[1] - a[1])
    .forEach(([c]) => nodes.push({ id: c.split("/")[1], name: name(c), cats: [c], scale: "asset", group: "Banks", key: `asset/${c.split("/")[1]}` }))

  const byKey = new Map(nodes.map((n) => [n.key, n]))
  const cands = new Map<string, ONode[]>()
  for (const n of nodes)
    for (const c of n.cats || []) {
      const k = `${n.scale}|${c}`
      const l = cands.get(k)
      if (l) l.push(n)
      else cands.set(k, [n])
    }
  const rows = new Map<string, Row[]>()
  for (const r of items) {
    if (!r.c || r.lvl === "demo" || r.lvl === "logic") continue
    for (const sc of r.c.startsWith("assets/") && r.c !== "assets/icon" ? ASSET_ORDER : ORDER[r.lvl || ""] || ORDER[""]) {
      const l = cands.get(`${sc}|${r.c}`)
      if (!l) continue
      let n = l[0]
      if (l.length > 1) {
        const hay = `${r.pat || ""} ${r.t} ${(r.slots || []).join(" ")}`.toLowerCase()
        n = l.find((x) => x.match?.some((w) => hay.includes(w))) || l.find((x) => !x.match) || l[0]
      }
      r.scl = sc
      r.nd = n.key
      const out = rows.get(n.key)
      if (out) out.push(r)
      else rows.set(n.key, [r])
      break
    }
  }
  const scales = { atom: [], component: [], section: [], page: [], look: [], asset: [] } as Record<Scale, ONode[]>
  for (const n of nodes) scales[n.scale].push(n)
  return { nodes, byKey, rows, scales }
}

/** a node made of another: an atom, else a component, else a section */
export function nodeById(o: Onto, id: string): ONode | undefined {
  for (const s of ["atom", "component", "section"] as Scale[]) {
    const n = o.byKey.get(`${s}/${id}`)
    if (n) return n
  }
  return undefined
}

/** the parts a person browses on a node: originals, not exact copies */
export const nodeCount = (o: Onto, key: string) => (o.rows.get(key) || []).reduce((n, r) => n + (r.cp ? 0 : 1), 0)
