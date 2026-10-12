// uihub: siso:page-siso-set
// The SISO side of the hub (Shaan, 11 Oct: "making a UI schema of ... my own SISO curated UI things ... do all the atomic
// stuff for the shells, side map and then we can go through all of our sites and see what we like ... start filling out the
// map of stuff we already have ... and also supplemental data from the hundred thousand comps"). Two parts:
// - Shells, atomic: the side nav broken into swappable parts (catalogue/schema/side-nav-parts.json), each with the way every
//   one of our apps does it; Take one per part.
// - The map: every category by what you are making (Core, Site, App, Mobile, AI, Looks), what our apps already use there
//   (inventory/), the core types inside, and the best candidates from the 104k; Take one as the SISO base, Skip the rest.
// - The skeleton (12 Oct, replacing the map): every node of the ontology (atoms, components, sections, pages, looks), each
//   split into its clean types; a slot is a node or one of its types, and he takes one base per slot in the pick deck
//   (components/PickDeck.tsx): siso/base/<scale>/<node>[/<type>]. An older siso/base/<category> pick still counts as its node's.
// Decisions are bookmarks (siso/base/<category>, siso/take/side-nav/<part>, siso/skip/<part id>), so they reach
// catalogue/bookmarks.json and every agent the way his other bookmarks do. Private build only.
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Check, Layers, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { catLink, catName, dataUrl, fmtInt, groupLabel, itemHref, useIndex, type Index, type Row } from "@/lib/data"
import { setBookmark, useBookmarks, type Mark } from "@/lib/bookmarks"
import { Stars } from "@/components/ItemCard"
import { PickDeck, deckRows, typeId, type Slot } from "@/components/PickDeck"
import { SCALES, type ONode, type Scale } from "@/lib/ontology"
import { matchRows, useKnowledge, type Variation } from "@/lib/knowledge"

interface Ours {
  p: string
  n: string
  g?: string
  u: number
  to?: string | null
}
interface Variant {
  id: string
  app: string
  what: string
  file?: string
  symbol?: string
  has: boolean
}
interface Part {
  id: string
  name: string
  what: string
  variants: Variant[]
}
interface Shell {
  id: string
  name: string
  what: string
  apps: string[]
}
interface Schema {
  shells: Shell[]
  parts: Part[]
  source?: string
}

// what you are making; every group lands in one (Shaan's side nav tree: Core / Site / App / Mobile / AI, then Looks)
const SECTIONS: { id: string; label: string; about: string; groups: string[] }[] = [
  { id: "core", label: "Core", about: "The parts every product is made of.", groups: ["actions", "inputs", "navigation", "overlays", "data-display", "status", "media", "lib"] },
  { id: "site", label: "Site", about: "Sections and pages of a landing site.", groups: ["marketing", "pages"] },
  { id: "app", label: "App", about: "Shells, screens, flows and charts of an app.", groups: ["layout", "flows", "data-viz"] },
  { id: "mobile", label: "Mobile", about: "Native app parts. Nothing in the 104k is typed mobile-first yet: this is a gap to fill.", groups: [] },
  { id: "ai", label: "AI", about: "Chat, agents and assistants.", groups: ["ai-agent"] },
  { id: "looks", label: "Looks", about: "Motion and themes.", groups: ["motion", "themes"] },
]

// SISO's own apps before HALO CRM (Cam's, names only)
const ownFirst = (l: Ours[]) => [...l].sort((a, b) => Number(a.p === "halo-crm") - Number(b.p === "halo-crm") || b.u - a.u)

function useJson<T>(path: string): T | null | undefined {
  const [v, setV] = useState<T | null | undefined>(undefined)
  useEffect(() => {
    let live = true
    dataUrl(path)
      .then((u) => fetch(u))
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((x) => live && setV(x))
    return () => {
      live = false
    }
  }, [path])
  return v
}

const on = (m?: Mark) => !!m && !m.off
// the hub's own rank: reviewed and picked first, then the reader's rating, then a picture drawn from the part itself
const best = (a: Row, b: Row) => b._r - a._r

/** a category's candidates: rated 4+, with a picture, no exact copies, one per library, best first */
function candidates(rows: Row[], marks: Record<string, Mark>, n = 6): Row[] {
  const seen = new Set<string>()
  const out: Row[] = []
  for (const r of rows.filter((r) => r.p && !r.ph && !r.cp && ((r.rt || 0) >= 4 || ["rated", "picked", "curated"].includes(r.st)) && !on(marks[`siso/skip/${r.id}`])).sort(best)) {
    if (seen.has(r.s)) continue
    seen.add(r.s)
    out.push(r)
    if (out.length === n) break
  }
  return out
}

export default function Siso() {
  const idx = useIndex()!
  const { items: marks } = useBookmarks()
  const ours = useJson<{ by_category: Record<string, Ours[]> }>("/data/siso/ours.json")
  const schema = useJson<Schema>("/data/siso/side-nav-parts.json")
  const [sec, setSec] = useState("core")

  // categories per section, biggest first, with the core types (made by 25+ libraries) whose parts are mostly in them
  const cats = useMemo(() => {
    const libs = new Map<string, Set<string>>()
    const home = new Map<string, Map<string, number>>()
    for (const r of idx.items) {
      if (!r.pat || r.cp || !r.c) continue
      if (!libs.has(r.pat)) libs.set(r.pat, new Set())
      libs.get(r.pat)!.add(r.s)
      const h = home.get(r.pat) || new Map<string, number>()
      h.set(r.c, (h.get(r.c) || 0) + 1)
      home.set(r.pat, h)
    }
    const coreIn = new Map<string, string[]>()
    for (const [pat, s] of libs) {
      if (s.size < 25) continue
      const c = [...home.get(pat)!.entries()].sort((a, b) => b[1] - a[1])[0][0]
      coreIn.set(c, [...(coreIn.get(c) || []), pat])
    }
    const out: Record<string, { c: string; rows: Row[]; core: string[] }[]> = {}
    for (const s of SECTIONS)
      out[s.id] = [...idx.byCategory.entries()]
        .filter(([c, rows]) => s.groups.includes(c.split("/")[0]) && rows.length >= 30)
        .map(([c, rows]) => ({ c, rows, core: coreIn.get(c) || [] }))
        .sort((a, b) => b.core.length - a.core.length || b.rows.length - a.rows.length)
    return out
  }, [idx])

  const all = Object.values(cats).flat()
  const parts = schema?.parts || []
  const partsTaken = parts.filter((p) => on(marks[`siso/take/side-nav/${p.id}`])).length

  if (idx.public) return <p className="text-sm text-muted-foreground">The SISO set lives in the signed-in build.</p>

  return (
    <div className="space-y-10" data-verify-siso={all.length}>
      <header>
        <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">The SISO set</p>
        <h1 className="mt-1 text-[28px] leading-[1.1] font-semibold tracking-[-0.03em] lg:text-[32px]">One base for each part, chosen by you</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Agents build from what you take here. The skeleton is every part at every scale, with the variations and edge cases SISO needs; pick a use case to see just
          what one product needs, set a default library to fill the rest, and flip through each slot in the deck. Shells, part by part, are below.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[12.5px]">
          <span className="siso-chip rounded-md px-2.5 py-1">
            Shell parts taken <b className="font-mono tabular-nums">{partsTaken}</b> of {parts.length || "…"}
          </span>
        </div>
      </header>

      <Skeleton />

      <Shells schema={schema} marks={marks} />


      {/* the older map, by category, with what our apps already use in each: kept for the "our apps use" view */}
      <details className="group">
        <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">By category, with what our apps already use</summary>
        <section className="mt-4">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-[20px] font-semibold">The map</h2>
              <p className="text-sm text-muted-foreground">{SECTIONS.find((s) => s.id === sec)?.about}</p>
            </div>
            <div className="siso-well flex gap-px p-[3px]" role="tablist">
              {SECTIONS.map((s) => {
                const n = cats[s.id].length
                const d = cats[s.id].filter((x) => on(marks[`siso/base/${x.c}`])).length
                return (
                  <button
                    key={s.id}
                    role="tab"
                    aria-selected={sec === s.id}
                    onClick={() => setSec(s.id)}
                    className={cn("siso-press rounded-[7px] px-3 py-1 text-[13px]", sec === s.id ? "siso-raised" : "text-muted-foreground hover:text-foreground")}
                  >
                    {s.label} <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{n ? `${d}/${n}` : "gap"}</span>
                  </button>
                )
              })}
            </div>
          </div>
          {cats[sec].length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-sm text-muted-foreground">Nothing here yet. Mobile settings, comments, blog cards and changelogs are the known gaps.</div>
          ) : (
            <div className="space-y-3">
              {cats[sec].map((x) => (
                <MapRow key={x.c} idx={idx} c={x.c} rows={x.rows} core={x.core} ours={ownFirst(ours?.by_category[x.c] || [])} marks={marks} />
              ))}
            </div>
          )}
        </section>
      </details>
    </div>
  )
}

function Shells({ schema, marks }: { schema: Schema | null | undefined; marks: Record<string, Mark> }) {
  if (schema === undefined) return <p className="text-sm text-muted-foreground">Loading the shell schema…</p>
  if (!schema) return <p className="text-sm text-muted-foreground">No shell schema in this build yet (catalogue/schema/side-nav-parts.json).</p>
  return (
    <section data-verify-shells={schema.parts.length}>
      <h2 className="text-[20px] font-semibold">Shells, part by part</h2>
      <p className="mb-4 max-w-2xl text-sm text-muted-foreground">Every side nav we have, taken apart. Take the way you want each part done; a shell is then any mix of them.</p>
      <div className="mb-5 grid gap-3 md:grid-cols-3">
        {schema.shells.map((s) => (
          <div key={s.id} className="bg-card rounded-xl border p-4">
            <p className="text-[15px] font-medium">{s.name}</p>
            <p className="mt-1 text-[13px] text-muted-foreground">{s.what}</p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">{s.apps.join(" · ")}</p>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border">
        {schema.parts.map((p) => {
          const key = `siso/take/side-nav/${p.id}`
          const taken = on(marks[key]) ? marks[key].note : undefined
          return (
            <div key={p.id} className="grid gap-3 border-t p-3 first:border-t-0 md:grid-cols-[180px_minmax(0,1fr)]" data-verify-part={p.id}>
              <div>
                <p className="flex items-center gap-1.5 text-[14px] font-medium">
                  {taken && <Check className="size-3.5 text-emerald-500" />}
                  {p.name}
                </p>
                <p className="text-[12px] text-muted-foreground">{p.what}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {p.variants
                  .filter((v) => v.has)
                  .map((v) => {
                    const mine = taken === v.id
                    return (
                      <div key={v.id} className={cn("flex flex-col gap-1.5 rounded-lg border p-2.5", mine && "border-emerald-500/60 bg-emerald-500/[0.06]")}>
                        <p className="font-mono text-[11px] text-muted-foreground">{v.app}</p>
                        <p className="text-[12.5px] leading-snug">{v.what}</p>
                        {v.file && (
                          <p className="truncate font-mono text-[10.5px] text-muted-foreground" title={v.file}>
                            {v.file}
                            {v.symbol ? ` · ${v.symbol}` : ""}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() => setBookmark(key, !mine, mine ? {} : { note: v.id })}
                          className={cn("siso-press mt-auto self-start rounded-md px-2 py-0.5 text-[12px]", mine ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" : "siso-chip")}
                          data-verify-take={v.id}
                        >
                          {mine ? "Taken" : "Take"}
                        </button>
                      </div>
                    )
                  })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function MapRow({ idx, c, rows, core, ours, marks }: { idx: Index; c: string; rows: Row[]; core: string[]; ours: Ours[]; marks: Record<string, Mark> }) {
  const key = `siso/base/${c}`
  const base = on(marks[key]) ? idx.byId.get(marks[key].note || "") : undefined
  const cands = useMemo(() => candidates(rows, marks).filter((r) => r.id !== base?.id), [rows, marks, base])
  const status = base ? "base" : cands.length ? "cand" : "miss"
  const dot = { base: "bg-emerald-500", cand: "bg-amber-400", miss: "bg-red-400" }[status]
  return (
    <div className="bg-card grid gap-3 rounded-xl border p-3 lg:grid-cols-[240px_minmax(0,1fr)]" data-verify-row={c}>
      <div className="min-w-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 shrink-0 rounded-full", dot)} />
          <Link to={catLink(idx, c)} className="truncate text-[14px] font-medium hover:underline">
            {catName(idx, c)}
          </Link>
          <span className="ml-auto font-mono text-[11px] text-muted-foreground tabular-nums">{fmtInt(rows.length)}</span>
        </div>
        <p className="text-[11px] text-muted-foreground">{groupLabel(c.split("/")[0])}</p>
        {core.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {core.slice(0, 6).map((t) => (
              <Link key={t} to={`${catLink(idx, c)}?type=${encodeURIComponent(t)}`} className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-[10.5px] text-muted-foreground hover:text-foreground">
                {t}
              </Link>
            ))}
            {core.length > 6 && <span className="text-[10.5px] text-muted-foreground">+{core.length - 6}</span>}
          </div>
        )}
        <div className="space-y-0.5">
          <p className="text-[10.5px] font-medium tracking-wide text-muted-foreground uppercase">Our apps use {ours.length ? fmtInt(ours.length) : "none"}</p>
          {ours.slice(0, 4).map((o, i) => (
            <p key={i} className="truncate text-[11.5px]" title={`${o.p}: ${o.n}${o.g ? ` (${o.g})` : ""}${o.to ? `, swap to ${o.to}` : ""}`}>
              <span className="text-muted-foreground">{o.p}</span> · {o.n}
              {o.g === "good" && <span className="ml-1 text-emerald-500">good</span>}
              {o.g === "weak" && <span className="ml-1 text-amber-500">weak</span>}
            </p>
          ))}
          {ours.length > 4 && <p className="text-[11px] text-muted-foreground">and {ours.length - 4} more</p>}
        </div>
      </div>
      <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
        {base && <Cand r={base} taken onTake={() => setBookmark(key, false)} />}
        {cands.map((r) => (
          <Cand key={r.id} r={r} onTake={() => setBookmark(key, true, { note: r.id })} onSkip={() => setBookmark(`siso/skip/${r.id}`, true)} />
        ))}
        {!base && !cands.length && <p className="self-center text-[12.5px] text-muted-foreground">No part here is rated 4 or more with a picture yet.</p>}
      </div>
    </div>
  )
}

function Cand({ r, taken, onTake, onSkip }: { r: Row; taken?: boolean; onTake: () => void; onSkip?: () => void }) {
  return (
    <div className={cn("group flex w-[188px] shrink-0 flex-col gap-1.5 rounded-lg border p-1.5", taken && "border-emerald-500/70 bg-emerald-500/[0.06]")} data-verify-cand={r.id}>
      <Link to={itemHref(r.id)} className="block aspect-[4/3] overflow-hidden rounded-md border bg-muted/40" title={r.t}>
        <img src={r.p} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top" />
      </Link>
      <div className="min-w-0 px-0.5">
        <p className="truncate text-[12px] font-medium">{r.t}</p>
        <p className="flex items-center gap-1 truncate text-[10.5px] text-muted-foreground">
          {r.rt ? <Stars n={r.rt} /> : null} {r.s}
        </p>
      </div>
      <div className="mt-auto flex gap-1 px-0.5">
        <button type="button" onClick={onTake} className={cn("siso-press flex-1 rounded-md py-0.5 text-[12px]", taken ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300" : "siso-chip")}>
          {taken ? (
            <span className="inline-flex items-center gap-1">
              <Check className="size-3" /> SISO base
            </span>
          ) : (
            "Take"
          )}
        </button>
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            aria-label={`Skip ${r.t}`}
            title="Skip: never show it here again"
            className="siso-press grid size-6 place-items-center rounded-md text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}


type Variations = Record<string, { variations: Variation[] }>

/** a node's slots: the node itself (any part of it), then the variations SISO needs (catalogue/schema/variations.json: what
 *  to have, drafted from the library's evidence), each with the parts whose type or name carries its words; a variation
 *  nothing matches is a gap showing the whole node. A node with no variations yet falls back to its commonest clean types */
export function nodeSlots(n: ONode, rows: Row[], marks: Record<string, Mark>, vars?: Variations): Slot[] {
  const base = `siso/base/${n.key}`
  const head: Slot = { key: base, title: n.name, sub: "the base", rows }
  const vs = vars?.[n.key]?.variations
  if (vs?.length)
    return [
      head,
      ...vs.map((v) => {
        const hit = matchRows(rows, v)
        const gap = deckRows(hit, marks).length === 0
        return { key: `${base}/${v.id}`, title: `${n.name} · ${v.name}`, sub: v.name, rows: gap ? rows : hit, gap, kind: v.kind, why: v.why }
      }),
    ]
  const by = new Map<string, Row[]>()
  for (const r of rows) if (r.pat && !r.cp && r.lvl !== "demo" && r.pat !== "demo") by.set(r.pat, [...(by.get(r.pat) || []), r])
  const types = [...by.entries()]
    .filter(([, l]) => deckRows(l, marks).length >= 3)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 8)
  return [head, ...types.map(([t, l]) => ({ key: `${base}/${typeId(t)}`, title: `${n.name} · ${t}`, sub: t, rows: l }))]
}

/** his pick for a slot; a node's older category pick (siso/base/<category>) counts for its base */
function pickOf(idx: Index, marks: Record<string, Mark>, s: Slot, n?: ONode): Row | undefined {
  if (on(marks[s.key])) return idx.byId.get(marks[s.key].note || "")
  if (n && s.sub === "the base") for (const c of n.cats || []) if (on(marks[`siso/base/${c}`])) return idx.byId.get(marks[`siso/base/${c}`].note || "")
  return undefined
}

const LIB_KEY = "siso/library"
const KIND_MARK: Record<string, string> = { state: "state", platform: "mobile/desktop", edge: "edge case" }

export function Skeleton() {
  const idx = useIndex()!
  const { items: marks } = useBookmarks()
  const know = useKnowledge()
  const vars = know?.variations
  const ucs = know?.use_cases?.use_cases || []
  // ?uc=<use case> and ?scale=<scale> open the skeleton there (Home's strip links in)
  const [uc, setUc] = useState<string>(() => new URLSearchParams(location.search).get("uc") || "")
  const [scale, setScale] = useState<Scale>(() => (new URLSearchParams(location.search).get("scale") as Scale) || "component")
  const [deck, setDeck] = useState<{ slots: Slot[]; start: number } | null>(null)
  const o = idx.onto
  // the Assets banks: icons are the Icon atom, the rest one bank a kind
  const nodesOf = (sc: Scale) => (sc === "asset" ? [o.byKey.get("atom/icon")!, ...o.scales.asset].filter(Boolean) : o.scales[sc])
  const nodes = nodesOf(scale)
  const rowsOf = (n: ONode) => o.rows.get(n.key) || []
  // a use case (catalogue/schema/use-cases.json) shows only what that product needs, across every scale, must-haves first
  const useCase = ucs.find((u) => u.id === uc)
  const all = useMemo(() => {
    if (!useCase) return nodes.map((n) => ({ n, slots: nodeSlots(n, rowsOf(n), marks, vars || undefined), must: undefined as boolean | undefined }))
    return useCase.needs
      .map((need) => {
        const n = o.byKey.get(need.slot)
        if (!n) return null
        const sl = nodeSlots(n, rowsOf(n), marks, vars || undefined)
        const want = new Set(need.variations.map((v) => `siso/base/${n.key}/${v}`))
        return { n, slots: sl.filter((s, k) => k === 0 || want.has(s.key)), must: !!need.must }
      })
      .filter((x): x is NonNullable<typeof x> => !!x)
  }, [nodes, marks, vars, useCase]) // eslint-disable-line react-hooks/exhaustive-deps
  const flat = all.flatMap((x) => x.slots)
  // a whole library as the default (Shaan, 12 Oct: "Arc UI ... pretty much everything from that as a base set was really
  // good"): its best part fills every slot he hasn't picked; his own pick always wins
  const lib = on(marks[LIB_KEY]) ? marks[LIB_KEY].note : undefined
  const libs = useMemo(() => {
    const m = new Map<string, number>()
    for (const s of flat) for (const src of new Set(s.rows.filter((r) => r.p && !r.cp).map((r) => r.s))) m.set(src, (m.get(src) || 0) + 1)
    return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40)
  }, [flat])
  const fromLib = (s: Slot) => (lib ? deckRows(s.rows, marks).find((r) => r.s === lib && r.p) : undefined)
  const done = (sc: Scale) => nodesOf(sc).filter((n) => pickOf(idx, marks, { key: `siso/base/${n.key}`, title: "", sub: "the base", rows: [] }, n)).length
  const picked = flat.filter((s) => pickOf(idx, marks, s)).length
  const filled = lib ? flat.filter((s) => !pickOf(idx, marks, s) && fromLib(s)).length : 0
  const gaps = flat.filter((s) => s.gap).length
  const groupOf = (x: { n: ONode; must?: boolean }) => (useCase ? (x.must ? "Must have" : "Should have") : x.n.group || "")
  const groups: string[] = []
  for (const x of all) if (!groups.includes(groupOf(x))) groups.push(groupOf(x))
  return (
    <section data-verify-skeleton={flat.length}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-semibold">The skeleton</h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Every part SISO builds with, at every scale, with the variations and edge cases it needs. Take one base per slot: click a slot to flip through its candidates in the deck.
          </p>
          <p className="mt-1 text-[12.5px] text-muted-foreground" data-verify-skeleton-counts>
            {fmtInt(picked)} picked · {lib ? `${fmtInt(filled)} filled by ${lib} · ` : ""}
            {fmtInt(flat.length - picked - filled)} to go · {fmtInt(gaps)} gaps in the library
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
            Default library
            <select
              value={lib || ""}
              onChange={(e) => setBookmark(LIB_KEY, !!e.target.value, e.target.value ? { note: e.target.value } : {})}
              className="siso-chip h-8 rounded-lg px-2 text-[12.5px] text-foreground"
              data-verify-default-lib
            >
              <option value="">none</option>
              {libs.map(([s, n]) => (
                <option key={s} value={s}>
                  {s} ({n} of {flat.length})
                </option>
              ))}
            </select>
          </label>
          <div className="siso-well flex gap-px p-[3px]" role="tablist">
            {SCALES.map((s) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={scale === s.id}
                onClick={() => setScale(s.id)}
                className={cn("siso-press rounded-[7px] px-3 py-1 text-[13px]", scale === s.id ? "siso-raised" : "text-muted-foreground hover:text-foreground")}
              >
                {s.label}{" "}
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                  {done(s.id)}/{nodesOf(s.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {ucs.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-1.5" data-verify-use-cases={ucs.length}>
          <span className="mr-1 text-xs text-muted-foreground">Use case</span>
          <button onClick={() => setUc("")} className="siso-chip inline-flex h-7 items-center rounded-full px-3 text-xs" data-on={!uc || undefined}>
            Every part, by scale
          </button>
          {ucs.map((u) => (
            <button key={u.id} onClick={() => setUc(u.id)} title={u.about} className="siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs" data-on={uc === u.id || undefined}>
              {u.name}
              <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{u.needs.length}</span>
            </button>
          ))}
          {useCase?.about && <p className="w-full text-[12.5px] text-muted-foreground">{useCase.about}</p>}
        </div>
      )}
      {groups.map((g) => (
        <div key={g} className="mb-6">
          {groups.length > 1 && <p className="siso-nav-label mb-2 text-muted-foreground">{g}</p>}
          <div className="grid gap-2 xl:grid-cols-2">
            {all
              .filter((x) => groupOf(x) === g)
              .map(({ n, slots }) => {
                const picks = slots.map((s) => pickOf(idx, marks, s, n))
                const taken = picks.filter(Boolean).length
                return (
                  <div key={n.key} className="bg-card rounded-xl border p-3" data-verify-node={n.key}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={cn("size-2 shrink-0 rounded-full", picks[0] ? "bg-emerald-500" : slots[0].rows.length ? "bg-amber-400" : "bg-red-400")} />
                      <Link to={`/x/${n.key}`} className="truncate text-[14px] font-medium hover:underline">
                        {n.name}
                      </Link>
                      <span className="ml-auto font-mono text-[11px] text-muted-foreground tabular-nums">
                        {taken}/{slots.length} · {fmtInt(rowsOf(n).length)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {slots.map((s, k) => {
                        const p = picks[k]
                        const d = p ? undefined : fromLib(s)
                        const shown = p || d
                        return (
                          <button
                            key={s.key}
                            type="button"
                            disabled={!s.rows.length}
                            onClick={() => setDeck({ slots: flat, start: flat.indexOf(s) })}
                            className={cn(
                              "siso-chip inline-flex h-8 items-center gap-1.5 rounded-lg pr-2.5 text-[12px] disabled:opacity-40",
                              shown ? "pl-1" : "pl-2.5",
                              p && "border-emerald-500/60",
                              d && "border-sky-500/40",
                              s.gap && !shown && "border-dashed",
                            )}
                            data-verify-slot={s.key}
                            title={p ? `SISO base: ${p.t} (${p.s})` : d ? `From ${lib}: ${d.t}. Click to pick your own` : `${s.why || `Pick a base for ${s.title}`}${s.gap ? " (a gap: nothing typed this way yet)" : ""}`}
                          >
                            {shown?.p && <img src={shown.p} alt="" className={cn("size-6 rounded object-cover", d && "opacity-70")} />}
                            {p && !p.p && <Check className="size-3.5 text-emerald-500" />}
                            {k === 0 ? <Layers className="size-3.5 text-muted-foreground" /> : null}
                            <span>{k === 0 ? "Base" : s.sub}</span>
                            {s.kind && KIND_MARK[s.kind] && <span className="text-[10px] text-muted-foreground">{KIND_MARK[s.kind]}</span>}
                            <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{s.gap ? "gap" : fmtInt(s.rows.length)}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      ))}
      {deck && <PickDeck slots={deck.slots} start={deck.start} onClose={() => setDeck(null)} />}
    </section>
  )
}

/** Home's strip (his build): how far the SISO set has come, and a way into each use case and scale */
export function SisoStrip() {
  const idx = useIndex()!
  const { items: marks } = useBookmarks()
  const know = useKnowledge()
  if (idx.public || !know?.variations) return null
  const vars = know.variations
  const total = Object.values(vars).reduce((n, v) => n + 1 + v.variations.length, 0)
  const picked = Object.entries(marks).filter(([k, m]) => k.startsWith("siso/base/") && k.split("/").length >= 4 && on(m)).length
  const lib = on(marks[LIB_KEY]) ? marks[LIB_KEY].note : undefined
  return (
    <section className="mb-8 rounded-2xl border p-4" data-verify-siso-strip>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Link to="/siso" className="text-[15px] font-semibold hover:underline">
          Your SISO set
        </Link>
        <span className="text-[13px] text-muted-foreground">
          {fmtInt(picked)} of {fmtInt(total)} slots picked{lib ? ` · ${lib} fills the rest` : ""} · {Object.keys(vars).length} parts, each with the variations and edge cases it needs
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs text-muted-foreground">Start with</span>
        {(know.use_cases?.use_cases || []).map((u) => (
          <Link key={u.id} to={`/siso?uc=${u.id}`} title={u.about} className="siso-chip inline-flex h-7 items-center rounded-full px-3 text-xs">
            {u.name}
          </Link>
        ))}
        <span className="mx-1 h-4 w-px bg-border" />
        {SCALES.map((s) => (
          <Link key={s.id} to={`/siso?scale=${s.id}`} className="siso-chip inline-flex h-7 items-center rounded-full px-3 text-xs">
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
