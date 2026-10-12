// uihub: siso:page-map
// The lay of the land (Shaan, 12 Oct: "first I gotta understand the blocks and the atoms and how it all fits together ...
// what stuff does ARC cover?"): every part SISO needs, by scale and group, as one screen of tiles. Pick a library and its
// tiles show its best version and how many it has; pick a second to compare. A gap is dashed. Clicking a tile opens both
// libraries' versions of that part right there (12 Oct: "clicking layout just shows me everything"), to take one as the base.
import { Fragment, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { ArrowRight, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { fmtInt, useIndex, type Row } from "@/lib/data"
import { type ONode, type Scale } from "@/lib/ontology"
import { PageHeader } from "@/components/bits"
import { ItemCard, glassy } from "@/components/ItemCard"
import { deckRows } from "@/components/PickDeck"
import { setBookmark, useBookmarks, type Mark } from "@/lib/bookmarks"

// the libraries worth comparing first: the two he trusts, the agent kits, the blocks libraries
const QUICK = ["arc", "shadcn-ui", "ai-elements", "assistant-ui", "prompt-kit", "shadcnblocks", "shadcn-ui-blocks", "beste-ui", "reui", "glint-ui"]
const SCALE_ROWS: { s: Scale; name: string; about: string }[] = [
  { s: "atom", name: "Atoms", about: "the smallest pieces: a button, an input, a badge" },
  { s: "component", name: "Components", about: "atoms put together to do one job: a form field, a menu, a dialog" },
  { s: "section", name: "Sections", about: "a band of a page made of components: a hero, a side nav, a pricing table" },
  { s: "page", name: "Pages", about: "sections in order: a home page, a dashboard, a sign-in screen" },
]

function Tile({ n, a, b, la, lb, best, open, onOpen }: { n: ONode; a: number; b?: number; la: string; lb?: string; best?: Row; open: boolean; onOpen: () => void }) {
  const none = !a && !b
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={open}
      title={`${n.job || n.name}${n.made_of?.length ? ` · made of ${n.made_of.join(", ")}` : ""}`}
      className={cn(
        "group flex min-w-0 flex-col overflow-hidden rounded-lg border text-left hover:border-foreground/30",
        none ? "border-dashed opacity-60" : "bg-card/60",
        open && "border-neon/70 ring-2 ring-neon/30",
      )}
      data-verify-map-tile={n.key}
    >
      <span className={cn("block aspect-[4/3] w-full bg-muted/30", best && glassy(best) && "siso-glass-stage")}>
        {best?.p ? (
          <img src={best.p} alt="" loading="lazy" decoding="async" className="size-full object-contain" />
        ) : (
          <span className="grid size-full place-items-center px-2 text-center text-[11px] text-muted-foreground">{a ? "no picture" : `not in ${la}`}</span>
        )}
      </span>
      <span className="flex items-center gap-2 border-t px-2.5 py-1.5">
        <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{n.name}</span>
        <span className={cn("font-mono text-[10.5px] tabular-nums", a ? "text-emerald-500" : "text-muted-foreground/60")} title={la}>
          {a ? fmtInt(a) : "–"}
        </span>
        {lb !== undefined && (
          <span className={cn("font-mono text-[10.5px] tabular-nums", b ? "text-sky-500" : "text-muted-foreground/60")} title={lb}>
            {b ? fmtInt(b) : "–"}
          </span>
        )}
      </span>
    </button>
  )
}

const on = (m?: Mark) => !!m && !m.off
/** a part opened on the map: each library's versions side by side, each one takeable as the SISO base for the part */
function Open({ n, libs, rows, total, onClose }: { n: ONode; libs: string[]; rows: Record<string, Row[]>; total: number; onClose: () => void }) {
  const { items: marks } = useBookmarks()
  const key = `siso/base/${n.key}`
  const pick = on(marks[key]) ? marks[key].note : undefined
  return (
    <div className="col-span-full rounded-xl border border-neon/40 bg-card/40 p-3" data-verify-map-open={n.key}>
      <div className="mb-2 flex items-baseline gap-2">
        <p className="text-[14px] font-semibold">{n.name}</p>
        {n.job && <p className="truncate text-[12.5px] text-muted-foreground">{n.job}</p>}
        <Link to={`/x/${n.key}`} className="ml-auto shrink-0 text-[12px] text-muted-foreground hover:text-foreground">
          all {fmtInt(total)} from every library →
        </Link>
        <button onClick={onClose} aria-label="Close" className="grid size-7 shrink-0 place-items-center rounded-md hover:bg-foreground/[0.06]">
          <X className="size-4" />
        </button>
      </div>
      <div className={cn("grid gap-4", libs.length > 1 && "lg:grid-cols-2")}>
        {libs.map((l, i) => (
          <div key={l} className="min-w-0">
            <p className={cn("mb-1.5 text-[12px] font-medium", i ? "text-sky-500" : "text-emerald-500")}>
              {l} · {rows[l].length ? `${rows[l].length} version${rows[l].length > 1 ? "s" : ""}` : "doesn't have one"}
            </p>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
              {rows[l].slice(0, 12).map((r) => (
                <ItemCard
                  key={r.id}
                  row={r}
                  tile
                  extra={
                    <button
                      onClick={() => setBookmark(key, pick !== r.id, pick === r.id ? {} : { note: r.id })}
                      className={cn("mt-1 inline-flex h-7 items-center gap-1 rounded-md px-2 text-[12px] font-medium", pick === r.id ? "bg-emerald-500/15 text-emerald-500" : "border hover:bg-foreground/[0.05]")}
                      data-verify-map-take={r.id}
                    >
                      {pick === r.id ? (
                        <>
                          <Check className="size-3.5" /> SISO base
                        </>
                      ) : (
                        "Take as SISO base"
                      )}
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function MapPage() {
  const idx = useIndex()!
  const [sp, setSp] = useSearchParams()
  const la = sp.get("lib") || "arc"
  const lb = sp.get("vs") || undefined
  const openKey = sp.get("open")
  const { items: marks } = useBookmarks()
  const o = idx.onto
  // a library's versions of a part, the ones you can see first (as the deck orders them)
  const versions = (key: string, lib?: string) => (lib ? deckRows((o.rows.get(key) || []).filter((r) => r.s === lib), marks) : [])
  const libs = useMemo(() => {
    const m = new Map<string, number>()
    for (const r of idx.items) if (!r.cp) m.set(r.s, (m.get(r.s) || 0) + 1)
    return [...m.entries()].sort((x, y) => y[1] - x[1]).map(([s]) => s)
  }, [idx])
  const count = (key: string, lib?: string) => (lib ? (o.rows.get(key) || []).reduce((n: number, r: Row) => n + (r.s === lib && !r.cp ? 1 : 0), 0) : 0)
  const set = (k: string, v?: string) => {
    const q = new URLSearchParams(sp)
    if (v) q.set(k, v)
    else q.delete(k)
    setSp(q, { replace: true })
  }
  const groupsOf = (s: Scale) => {
    const g = new Map<string, ONode[]>()
    for (const n of o.scales[s]) g.set(n.group || "", [...(g.get(n.group || "") || []), n])
    return [...g.entries()]
  }
  const all = SCALE_ROWS.flatMap((x) => o.scales[x.s])
  const cov = (lib?: string) => all.filter((n) => count(n.key, lib) > 0).length
  const pick = (k: "lib" | "vs", v: string) => (
    <button key={v} onClick={() => set(k, k === "vs" && v === lb ? undefined : v)} className="siso-chip inline-flex h-7 items-center rounded-full px-3 text-xs" data-on={(k === "lib" ? la : lb) === v || undefined}>
      {v}
    </button>
  )

  return (
    <div className="space-y-6" data-verify-map={all.length}>
      <PageHeader
        title="The map"
        sub="Every part SISO needs, from the smallest to whole pages. Pick a library to see what it covers: the green number is how many versions it has of that part, a dashed tile is a part it doesn't have. Add a second library to compare."
      />
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-20 text-xs text-emerald-500">Library</span>
          {QUICK.map((v) => pick("lib", v))}
          <select value={libs.includes(la) ? la : ""} onChange={(e) => set("lib", e.target.value)} className="h-7 rounded-full border bg-transparent px-2 text-xs">
            <option value="">more…</option>
            {libs.slice(0, 300).map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 w-20 text-xs text-sky-500">Compare with</span>
          {QUICK.filter((v) => v !== la).map((v) => pick("vs", v))}
        </div>
        <p className="text-[13px]">
          <span className="font-medium text-emerald-500">{la}</span> covers <b>{cov(la)}</b> of {all.length} parts
          {lb && (
            <>
              {" · "}
              <span className="font-medium text-sky-500">{lb}</span> covers <b>{cov(lb)}</b>
              {" · "}together <b>{all.filter((n) => count(n.key, la) + count(n.key, lb) > 0).length}</b>
            </>
          )}
        </p>
      </div>

      {SCALE_ROWS.map((x, i) => (
        <section key={x.s} data-verify-map-scale={x.s}>
          <div className="mb-2 flex items-baseline gap-2">
            {i > 0 && <ArrowRight className="size-3.5 -rotate-90 self-center text-muted-foreground" />}
            <h2 className="text-[16px] font-semibold">{x.name}</h2>
            <span className="text-[12.5px] text-muted-foreground">{x.about}</span>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground tabular-nums">
              <span className="text-emerald-500">{o.scales[x.s].filter((n) => count(n.key, la)).length}</span>
              {lb && (
                <>
                  {" / "}
                  <span className="text-sky-500">{o.scales[x.s].filter((n) => count(n.key, lb)).length}</span>
                </>
              )}{" "}
              of {o.scales[x.s].length}
            </span>
          </div>
          <div className="space-y-2">
            {groupsOf(x.s).map(([g, nodes]) => (
              <div key={g} className="grid gap-2 md:grid-cols-[110px_minmax(0,1fr)]">
                <span className="pt-2 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">{g}</span>
                <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))" }}>
                  {nodes.map((n) => {
                    const va = versions(n.key, la)
                    return (
                      <Fragment key={n.key}>
                        <Tile n={n} a={count(n.key, la)} b={lb ? count(n.key, lb) : undefined} la={la} lb={lb} best={va[0]} open={openKey === n.key} onOpen={() => set("open", openKey === n.key ? undefined : n.key)} />
                      </Fragment>
                    )
                  })}
                  {nodes.some((n) => n.key === openKey) && (
                    <Open
                      n={nodes.find((n) => n.key === openKey)!}
                      libs={[la, ...(lb ? [lb] : [])]}
                      rows={Object.fromEntries([la, ...(lb ? [lb] : [])].map((l) => [l, versions(openKey!, l)]))}
                      total={(o.rows.get(openKey!) || []).filter((r) => !r.cp).length}
                      onClose={() => set("open")}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
