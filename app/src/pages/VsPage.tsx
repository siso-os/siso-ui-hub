// uihub: siso:page-vs
// Head to head (Shaan, 12 Oct: "it's like apples to pears ... a lot of these you shouldn't even ask me ... three of them are
// just the same comps"): libraries of one kind, like for like. Each part of each was read for the job it does and placed on
// SISO's skeleton (catalogue/schema/lib-map/<lib>.jsonl), so a row is one job with every library's versions side by side. Only
// the jobs two or more do are questions; the rest is listed as covered by one. A part's demo states (same_as in the map) and
// versions that share a picture fold into one card. Clicking a card previews it here, never leaving the page.
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { useSearchParams } from "react-router-dom"
import { Check, ExternalLink, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { itemHref, useIndex, type Row } from "@/lib/data"
import { useKnowledge } from "@/lib/knowledge"
import { setBookmark, useBookmarks, type Mark } from "@/lib/bookmarks"
import { glassy } from "@/components/ItemCard"
import { PageHeader } from "@/components/bits"
import { SCALES } from "@/lib/ontology"

// the kits worth deciding between, by kind (12 Oct: "libraries are better for different scenarios")
const KITS = [
  { id: "base", name: "Base parts", libs: ["arc", "shadcn-ui"] },
  { id: "agent", name: "Agent UI", libs: ["ai-elements", "assistant-ui", "prompt-kit"] },
]
const on = (m?: Mark) => !!m && !m.off
type Job = { key: string; node: string; variation?: string; title: string; job?: string; by: Record<string, Row[][]> }
// a version is one part with its demo states: the part (root) first, pictured rows before unpictured
type Libmap = Record<string, [string | null, string | null, string, string | null]>
const fold = (rows: Row[], map: Libmap) => {
  const root = (r: Row) => map[r.id]?.[3] || r.id
  const byRoot = new Map<string, Row[]>()
  for (const r of rows) byRoot.set(root(r), [...(byRoot.get(root(r)) || []), r])
  // a library's page photo shows several of its parts at once: those are one version too
  const byPic = new Map<string, Row[]>()
  for (const g of byRoot.values()) {
    const k = g.find((r) => r.p)?.p || root(g[0])
    byPic.set(k, [...(byPic.get(k) || []), ...g])
  }
  return [...byPic.values()].map((g) => [...g].sort((x, y) => (x.p ? 0 : 1) - (y.p ? 0 : 1) || (map[x.id]?.[3] ? 1 : 0) - (map[y.id]?.[3] ? 1 : 0)))
}
const label = (g: Row[], map: Libmap) => {
  const roots = g.filter((r) => !map[r.id]?.[3])
  const names = (roots.length ? roots : g.slice(0, 1)).map((r) => r.t)
  const extra = g.length - names.length
  return `${names.join(" · ")}${extra ? ` +${extra} state${extra > 1 ? "s" : ""}` : ""}`
}

function Version({ group, name, taken, narrow, onOpen }: { group: Row[]; name: string; taken: boolean; narrow: boolean; onOpen: () => void }) {
  const r = group[0]
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn("group shrink-0 overflow-hidden rounded-lg border text-left hover:border-foreground/30", narrow ? "w-[176px]" : "w-[220px]", taken && "border-emerald-500/80 ring-2 ring-emerald-500/30")}
      data-verify-vs-version={r.id}
    >
      <span className={cn("block aspect-[4/3] bg-muted/30", glassy(r) && "siso-glass-stage")}>
        {r.p ? <img src={r.p} alt="" loading="lazy" decoding="async" className="size-full object-contain" /> : <span className="grid size-full place-items-center px-3 text-center text-[11px] text-muted-foreground">{r.d || "no picture"}</span>}
      </span>
      <span className="flex items-center gap-1.5 border-t px-2.5 py-1.5" title={name}>
        <span className="min-w-0 flex-1 truncate text-[12.5px]">{name}</span>
        {taken && <Check className="size-3.5 shrink-0 text-emerald-500" />}
      </span>
    </button>
  )
}

function Preview({ group, base, slot, onClose }: { group: Row[]; base: string; slot: string; onClose: () => void }) {
  const { items: marks } = useBookmarks()
  const [i, setI] = useState(0)
  const row = group[i]
  const taken = on(marks[slot]) && group.some((r) => r.id === marks[slot].note)
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setI((x) => Math.min(group.length - 1, x + 1))
      if (e.key === "ArrowLeft") setI((x) => Math.max(0, x - 1))
    }
    window.addEventListener("keydown", k)
    return () => window.removeEventListener("keydown", k)
  }, [onClose, group.length])
  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/85 p-6 backdrop-blur-sm" onClick={onClose} role="dialog" aria-label={row.t} data-verify-vs-preview={row.id}>
      <div className="w-[min(980px,94vw)] overflow-hidden rounded-2xl border bg-card shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className={cn("aspect-[16/10] bg-muted/30", glassy(row) && "siso-glass-stage")}>
          {row.p ? <img src={row.p} alt="" className="size-full object-contain" /> : <div className="grid size-full place-items-center p-8 text-center text-sm text-muted-foreground">{row.d || "No picture yet"}</div>}
        </div>
        {group.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto border-t px-4 py-2">
            {group.map((r, j) => (
              <button key={r.id} onClick={() => setI(j)} className="siso-chip inline-flex h-7 shrink-0 items-center rounded-full px-3 text-[12px]" data-on={i === j || undefined}>
                {r.t}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 border-t px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium">{row.t}</p>
            <p className="truncate text-[12.5px] text-muted-foreground">
              {row.s}
              {row.d ? ` · ${row.d}` : ""}
            </p>
          </div>
          <a href={itemHref(row.id)} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border px-3 text-[13px] text-muted-foreground hover:text-foreground">
            Open its page <ExternalLink className="size-3.5" />
          </a>
          <button onClick={() => setBookmark(slot, !taken, taken ? {} : { note: base })} className={cn("h-9 rounded-lg px-4 text-[13px] font-medium", taken ? "bg-emerald-500/15 text-emerald-500" : "siso-neon text-white")} data-verify-vs-take>
            {taken ? "SISO base ✓" : "Take as SISO base"}
          </button>
          <button onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-lg hover:bg-foreground/[0.06]">
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default function VsPage() {
  const idx = useIndex()!
  const know = useKnowledge()
  const { items: marks } = useBookmarks()
  const [sp, setSp] = useSearchParams()
  const kit = KITS.find((k) => k.id === sp.get("kit"))
  // ?libs=a,b,c, or the older ?a=&b=, or a kit
  const libs = sp.get("libs")?.split(",").filter(Boolean) || (sp.get("a") ? [sp.get("a")!, sp.get("b") || "shadcn-ui"] : (kit || KITS[0]).libs)
  const show = sp.get("show") || "both"
  const [open, setOpen] = useState<{ group: Row[]; slot: string } | null>(null)
  const map = know?.libmap
  const vars = know?.variations
  const key = libs.join(",")

  const jobs = useMemo(() => {
    if (!map) return [] as Job[]
    const ls = key.split(",")
    const m = new Map<string, Job & { rows: Record<string, Row[]> }>()
    for (const [id, [node, variation, job]] of Object.entries(map)) {
      const r = idx.byId.get(id)
      if (!r || !node || !ls.includes(r.s)) continue
      const k = `${node}${variation ? `/${variation}` : ""}`
      let j = m.get(k)
      if (!j) {
        const n = idx.onto.byKey.get(node)
        const v = variation ? vars?.[node]?.variations.find((x) => x.id === variation) : undefined
        j = { key: k, node, variation: variation || undefined, title: `${n?.name || node}${v ? ` · ${v.name}` : ""}`, job: v?.why || n?.job || job, by: {}, rows: {} }
        m.set(k, j)
      }
      j.rows[r.s] = [...(j.rows[r.s] || []), r]
    }
    const order = new Map(idx.onto.nodes.map((n, i) => [n.key, i]))
    const vOrder = (j: Job) => (j.variation ? (vars?.[j.node]?.variations.findIndex((x) => x.id === j.variation) ?? 98) + 1 : 0)
    return [...m.values()]
      .map(({ rows, ...j }) => ({ ...j, by: Object.fromEntries(ls.map((l) => [l, fold(rows[l] || [], map)])) }))
      .sort((x, y) => (order.get(x.node) ?? 999) - (order.get(y.node) ?? 999) || vOrder(x) - vOrder(y))
  }, [map, idx, key, vars])
  const has = (j: Job) => libs.filter((l) => j.by[l]?.length)
  const shared = jobs.filter((j) => has(j).length > 1)
  const only = (l: string) => jobs.filter((j) => { const h = has(j); return h.length === 1 && h[0] === l })
  const list = show === "both" ? shared : only(show)
  const cols = show === "both" ? libs : [show]
  const slot = (j: Job) => `siso/base/${j.key}`
  const decided = shared.filter((j) => on(marks[slot(j)])).length
  const set = (q: Record<string, string | undefined>) => {
    const n = new URLSearchParams(sp)
    for (const [k, v] of Object.entries(q)) v ? n.set(k, v) : n.delete(k)
    setSp(n)
  }
  const tab = (id: string, text: string, n: number) => (
    <button key={id} onClick={() => set({ show: id === "both" ? undefined : id })} className="siso-chip inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px]" data-on={show === id || undefined}>
      {text} <span className="font-mono text-[11px] text-muted-foreground">{n}</span>
    </button>
  )

  if (!map) return <PageHeader title="Head to head" sub="Reading the libraries for the job each part does; this fills in when that's done." />
  const scaleOf = (node: string) => SCALES.find((s) => s.id === node.split("/")[0])?.label
  const many = libs.length > 2
  let lastScale = ""
  return (
    <div className="space-y-5" data-verify-vs={shared.length}>
      <div className="flex flex-wrap gap-1.5">
        {KITS.map((k) => (
          <button key={k.id} onClick={() => set({ kit: k.id, libs: undefined, a: undefined, b: undefined, show: undefined })} className="siso-chip inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px]" data-on={k.libs.join(",") === key || undefined} data-verify-vs-kit={k.id}>
            {k.name} <span className="text-[11.5px] text-muted-foreground">{k.libs.join(" · ")}</span>
          </button>
        ))}
      </div>
      <PageHeader
        title={libs.join(" vs ")}
        sub={`Like for like: every part was read for the job it does. The ${shared.length} jobs two or more of them do are the only questions; the jobs only one does are covered either way. A part's demo states are one card. Click a card to see it big and take it.`}
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {tab("both", many ? "Two or more do it: your call" : "Both do it: your call", shared.length)}
        {libs.map((l) => tab(l, `Only ${l}`, only(l).length))}
        <span className="ml-auto text-[12.5px] text-muted-foreground">
          {decided} of {shared.length} decided
        </span>
      </div>
      <div className="space-y-3">
        {list.map((j) => {
          const sc = scaleOf(j.node) || ""
          const head = sc !== lastScale ? sc : ""
          lastScale = sc
          const pick = on(marks[slot(j)]) ? marks[slot(j)].note : undefined
          return (
            <div key={j.key}>
              {head && <h2 className="mt-4 mb-2 text-[16px] font-semibold">{head}</h2>}
              <div className={cn("rounded-xl border p-3", pick && "border-emerald-500/40")} data-verify-vs-job={j.key}>
                <div className="mb-2 flex items-baseline gap-2">
                  <p className="shrink-0 text-[14px] font-medium">{j.title}</p>
                  {j.job && <p className="truncate text-[12.5px] text-muted-foreground">{j.job}</p>}
                  {pick && <span className="ml-auto shrink-0 text-[12px] font-medium text-emerald-500">decided</span>}
                </div>
                <div className={cn("grid gap-4", cols.length === 2 && "lg:grid-cols-2", cols.length === 3 && "lg:grid-cols-3", cols.length > 3 && "lg:grid-cols-4")}>
                  {cols.map((l) => (
                    <div key={l} className="min-w-0">
                      <p className="mb-1 text-[11.5px] font-medium text-muted-foreground">{l}</p>
                      {j.by[l]?.length ? (
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {j.by[l].map((g) => (
                            <Version key={g[0].id} group={g} name={label(g, map)} narrow={cols.length > 2} taken={!!pick && g.some((r) => r.id === pick)} onOpen={() => setOpen({ group: g, slot: slot(j) })} />
                          ))}
                        </div>
                      ) : (
                        <p className="text-[12.5px] text-muted-foreground">doesn't have one</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {open && <Preview group={open.group} base={(open.group.find((r) => !map[r.id]?.[3]) || open.group[0]).id} slot={open.slot} onClose={() => setOpen(null)} />}
    </div>
  )
}
