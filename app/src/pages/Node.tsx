// uihub: siso:page-node
// One node of the ontology (/x/<scale>/<node>, catalogue/schema/ontology.json): its job, what it is made of, and its
// parts (BrowseView). The parts come first (Shaan, 15 Oct: "fix the bare pills at the tops of pages"): the header is the
// job and one line of what it is made of (a page: its sections in order), the variations are tabs over the parts, and
// what good looks like, the rules and where it is used sit behind About.
import { stubOf } from "@/lib/families"
import { Fragment, useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { BookOpen, ChevronDown, Layers3 } from "lucide-react"
import { matchRows, useKnowledge, useRules, type Rule } from "@/lib/knowledge"
import { setBookmark, useBookmarks } from "@/lib/bookmarks"
import { KitSlotContext, type KitSlot } from "@/lib/kitSlot"
import sisoMark from "@/assets/siso-mark.png"
import { PickDeck } from "@/components/PickDeck"
import { nodeSlots } from "./Siso"
import { itemHref, sortRows, useIndex, useItem, type Row } from "@/lib/data"
import { Stage } from "@/components/Stage"
import { PartCode } from "@/components/PartCode"
import { alikeKey } from "@/lib/alike"
import { SlotStrip, type Slot } from "@/components/SlotStrip"
import { cn } from "@/lib/utils"
import { nodeById, nodeCount, type ONode } from "@/lib/ontology"
import { BrowseView } from "@/components/BrowseView"
import NotFound from "./NotFound"

const host = (u: string) => {
  try {
    return new URL(u).hostname.replace(/^www\./, "")
  } catch {
    return u
  }
}

function Rules({ list }: { list: Rule[] }) {
  const [all, setAll] = useState(false)
  const [open, setOpen] = useState<string | null>(null)
  if (!list.length) return null
  const shown = all ? list : list.slice(0, 5)
  // one line a rule (hover shows the rule, click opens it with its sources), so the parts stay on the first screen
  return (
    <div className="max-w-3xl" data-verify-node-rules={list.length}>
      <div className="mb-1 text-xs text-muted-foreground">Rules for this ({list.length})</div>
      <ul className="space-y-px">
        {shown.map((r) => (
          <li key={r.id}>
            <button onClick={() => setOpen(open === r.id ? null : r.id)} aria-expanded={open === r.id} title={r.rule} className="flex w-full items-baseline gap-2 rounded-md px-1.5 py-0.5 text-left hover:bg-foreground/[0.04]">
              <span className={cn("w-10 shrink-0 text-[10.5px]", r.id.startsWith("hub-") ? "font-medium text-neon-ink" : r.strength === "must" ? "font-medium text-foreground" : "text-muted-foreground")}>
                {r.id.startsWith("hub-") ? "house" : r.strength || "rule"}
              </span>
              <span className="truncate text-[12.5px] text-foreground/90">{r.title}</span>
              <span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted-foreground">{r.id}</span>
            </button>
            {open === r.id && (
              <div className="mb-1 ml-[52px] text-[12.5px] leading-relaxed text-muted-foreground">
                <p>{r.rule}</p>
                {r.check && <p className="mt-0.5 text-[11.5px]">Check: {r.check}</p>}
                <div className="mt-0.5 flex flex-wrap gap-x-3 text-[11px]">
                  {r.src.map(([says, url]) => (
                    <a key={url} href={url} target="_blank" rel="noreferrer" title={says} className="hover:text-foreground hover:underline">
                      {host(url)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {list.length > 5 && (
        <button onClick={() => setAll(!all)} className="ml-1.5 text-xs text-muted-foreground hover:text-foreground">
          {all ? "fewer" : `${list.length - 5} more`}
        </button>
      )}
    </div>
  )
}

const ABOUT = "uihub.nodeAbout"

const chip = (n: ONode, count: number, i?: number) => (
  <Link key={n.key} to={`/x/${n.key}`} className="siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs" data-verify-node-chip={n.key}>
    {i !== undefined && <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{i + 1}</span>}
    {n.name}
    <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{count.toLocaleString("en-GB")}</span>
  </Link>
)

// house rules first, then must, then should
const rank = (r: Rule) => (r.id.startsWith("hub-") ? 0 : r.strength === "must" ? 1 : 2)

// look-alikes (the same type from several libraries, lib/alike.ts) fold under their best one, which shows "+N look-alikes"
function fold(rows: Row[]): Row[] {
  const g = new Map<string, Row[]>()
  const out: Row[] = []
  for (const r of rows) {
    if (r.cp) { out.push(r); continue }
    const k = alikeKey(r)
    const l = g.get(k)
    if (l) l.push(r)
    else g.set(k, [r])
  }
  for (const l of g.values()) out.push(l.length === 1 ? l[0] : { ...sortRows(l, "best")[0], _al: l.length - 1 })
  return out
}

// the Stage at the top of a kind: what the kit holds for this slot, or the best part for it while it is a gap
function PickStage({ rows, slot, picked }: { rows: Row[]; slot: KitSlot | null; picked: boolean }) {
  // a part flagged live may hold no live view in this build (the public one opens some at their source): step on to
  // the next candidate until one has something to show
  const [i, setI] = useState(0)
  const row = rows[Math.min(i, rows.length - 1)]
  const full = useItem(row.id)
  const blank = full !== undefined && !(full?.live || full?.preview || full?.video || row.p || row.au)
  useEffect(() => {
    if (blank && i < rows.length - 1) setI(i + 1)
  }, [blank, i, rows.length])
  return (
    <section className="space-y-3" data-verify-node-stage={picked ? "pick" : "top"}>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {picked && <img src={sisoMark} alt="" width={12} height={12} className="size-3" />}
            {picked ? `The SISO pick · ${slot?.label}` : slot ? `${slot.label} is a gap in the kit · the best part for it` : "The best part here"}
          </div>
          <h2 className="mt-1 truncate text-[22px] leading-tight font-medium tracking-[-0.03em]">
            <Link to={itemHref(row.id)} className="hover:underline">{row.t}</Link>
            {row.a && <span className="text-muted-foreground"> by {row.a}</span>}
          </h2>
        </div>
        {slot && (
          <div className="ml-auto flex shrink-0 gap-2">
            {picked ? (
              <button onClick={() => setBookmark(slot.key, false)} className="siso-chip inline-flex h-8 items-center rounded-lg px-3 text-xs" data-verify-stage-take-out>Take out</button>
            ) : (
              <button onClick={() => setBookmark(slot.key, true, { note: row.id })} className="siso-press inline-flex h-8 items-center rounded-lg bg-neon/15 px-3 text-xs font-medium text-neon-ink" data-verify-stage-add>Add to kit</button>
            )}
          </div>
        )}
      </div>
      {blank && i >= rows.length - 1 ? (
        <p className="text-sm text-muted-foreground" data-verify-node-stage-none>Nothing here plays live or has a picture in this build; the parts below open at their source.</p>
      ) : (
        <>
          <Stage key={row.id} row={row} full={full} />
          <PartCode row={row} full={full} />
        </>
      )}
    </section>
  )
}

export default function NodePage() {
  const { scale = "", node = "" } = useParams()
  const idx = useIndex()
  const rulesAll = useRules()
  const know = useKnowledge()
  const { items: marks } = useBookmarks()
  const [sp, setSp] = useSearchParams()
  const [deck, setDeck] = useState(false)
  const o = idx?.onto
  // a kind the kit has but the library has no category for yet (catalogue/schema/families.json) opens empty, ready to fill
  const n = useMemo(() => o?.byKey.get(`${scale}/${node}`) ?? (o ? stubOf(`${scale}/${node}`) : undefined), [o, scale, node])
  // a part skipped for this kind (Skip on its card) leaves the kind for good
  const all = useMemo(() => (o && n ? (o.rows.get(n.key) || []).filter((r) => !(marks[`siso/skip/${n.key}/${r.id}`] && !marks[`siso/skip/${n.key}/${r.id}`].off)) : []), [o, n, marks])
  const vars = n ? know?.variations?.[n.key]?.variations || [] : []
  const vid = sp.get("v")
  const v = vars.find((x) => x.id === vid)
  const vRows = useMemo(() => (v ? matchRows(all, v) : all), [all, v])
  const vCounts = useMemo(() => vars.map((x) => matchRows(all, x).length), [all, vars])
  const folded = useMemo(() => fold(v && vRows.length ? vRows : all), [v, vRows, all])
  const [about, setAbout] = useState(() => localStorage.getItem(ABOUT) === "1")
  if (!idx || !o || !n) return <NotFound />
  // the kit's slots for this part: its base, then each variation SISO needs (one part, its edge cases folded under it);
  // an older pick by category still counts for the base
  const live = (k: string) => (marks[k] && !marks[k].off ? marks[k].note : undefined)
  const baseKey = `siso/base/${n.key}`
  const pickFor = (vId?: string) => (vId ? live(`${baseKey}/${vId}`) : (live(baseKey) ?? (n.cats || []).map((c) => live(`siso/base/${c}`)).find(Boolean)))
  const slot: KitSlot | null = idx.public ? null : { key: v ? `${baseKey}/${v.id}` : baseKey, label: v ? `${n.name} · ${v.name}` : n.name, picked: pickFor(v?.id), others: [{ key: baseKey, label: n.name }, ...vars.map((x) => ({ key: `${baseKey}/${x.id}`, label: `${n.name} · ${x.name}` }))].filter((s) => s.key !== (v ? `${baseKey}/${v.id}` : baseKey)), skip: `siso/skip/${n.key}` }
  const note = know?.notes?.[n.key]
  const taste = know?.taste?.nodes[n.key]
  const setV = (id?: string) => {
    const q = new URLSearchParams(sp)
    if (id) q.set("v", id)
    else q.delete("v")
    setSp(q, { replace: true })
  }
  const toggleAbout = () => {
    localStorage.setItem(ABOUT, about ? "0" : "1")
    setAbout(!about)
  }
  const made = (n.made_of || []).map((id) => nodeById(o, id)).filter((x): x is ONode => !!x)
  // the sections and components that are made of this one
  const used = n.scale === "atom" || n.scale === "component" ? o.nodes.filter((x) => x.made_of?.includes(n.id) && x.key !== n.key) : []
  const secs = (n.sections || []).map((id) => o.byKey.get(`section/${id}`)).filter((x): x is ONode => !!x)
  const rules = (rulesAll || []).filter((r) => r.nodes.includes(n.key) || r.scales.includes(n.scale)).sort((a, b) => rank(a) - rank(b))
  // one quiet line of links, not a row of pills: a page's sections read as a flow, a part's pieces as a list
  const line = (label: string, list: ONode[], ordered = false) =>
    list.length > 0 && (
      <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5" data-verify-node-line={label}>
        <span className="mr-1.5 text-xs text-muted-foreground">{label}</span>
        {list.map((x, i) => (
          <Fragment key={x.key}>
            {i > 0 && <span aria-hidden className="text-muted-foreground/50">{ordered ? "→" : "·"}</span>}
            <Link to={`/x/${x.key}`} title={`${nodeCount(o, x.key).toLocaleString("en-GB")} parts`} className="rounded px-1 text-[13px] text-foreground/85 transition-colors hover:bg-foreground/[0.06] hover:text-foreground" data-verify-node-chip={x.key}>
              {x.name}
            </Link>
          </Fragment>
        ))}
      </div>
    )
  const hasAbout = !!(note || taste || rules.length || used.length)
  const sub = (
    <div className="space-y-1.5">
      {n.job && <p className="text-sm text-muted-foreground">{n.job.charAt(0).toUpperCase() + n.job.slice(1)}</p>}
      {line("Sections", secs, true)}
      {line("Made of", made)}
    </div>
  )
  const actions = (hasAbout || (vars.length > 0 && !idx.public)) && (
    <div className="flex shrink-0 items-center gap-2">
      {hasAbout && (
        <button onClick={toggleAbout} aria-expanded={about} className="siso-chip inline-flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs" data-on={about || undefined} data-verify-node-about-toggle>
          <BookOpen className="size-3.5" /> About
          <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{[rules.length && `${rules.length} rules`, used.length && `used in ${used.length}`].filter(Boolean).join(" · ")}</span>
          <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-150", about && "rotate-180")} />
        </button>
      )}
      {vars.length > 0 && !idx.public && (
        <button onClick={() => setDeck(true)} className="siso-press inline-flex h-8 items-center gap-1.5 rounded-lg bg-neon/15 px-3 text-xs font-medium text-neon-ink" data-verify-node-deck>
          <Layers3 className="size-3.5" /> Flip through and pick
        </button>
      )}
    </div>
  )
  const extra = about && hasAbout && (
    <section className="siso-rise -mt-3 mb-5 grid gap-x-8 gap-y-4 rounded-xl border border-border/60 bg-card/40 p-4 lg:grid-cols-2" data-verify-node-about>
      <div className="space-y-4">
        {(note || taste) && (
          <div className="space-y-1 text-[12.5px]" data-verify-node-notes>
            <div className="text-xs text-muted-foreground">What good looks like</div>
            {note?.good.map((g, i) => (
              <p key={i} className="text-foreground/85">
                {g.line} <span className="font-mono text-[10.5px] text-muted-foreground">{g.refs.join(" ")}</span>
              </p>
            ))}
            {note?.avoid && <p className="text-muted-foreground">Avoid: {note.avoid}</p>}
            {taste && taste.looks.length > 0 && (
              <p className="text-muted-foreground" title={know?.taste?.about}>
                Rates best here: {taste.looks.slice(0, 3).map((l) => `${l.style} ${l.mean.toFixed(1)}`).join(", ")} (average {taste.mean.toFixed(1)} of 5 over {taste.n.toLocaleString("en-GB")} parts)
              </p>
            )}
          </div>
        )}
        {used.length > 0 && (
          <div>
            <div className="mb-1.5 text-xs text-muted-foreground">Used in ({used.length})</div>
            <div className="flex flex-wrap gap-1.5">{used.map((x) => chip(x, nodeCount(o, x.key)))}</div>
          </div>
        )}
      </div>
      <Rules list={rules} />
    </section>
  )
  // the top of a kind (spec T3): the kit's pick for the slot you are on, live at real size on the Stage (or, while the slot
  // is a gap, the best part the library holds for it, one press from the kit); then the slots, base and each variation
  // SISO needs (catalogue/schema/variations.json), which narrow the parts below to the ones carrying its words
  const pickedRow = slot?.picked ? idx.byId.get(slot.picked) : undefined
  // while the slot is a gap, the Stage shows the best part that has something to show: one that plays live, else one
  // with a picture, never an empty box
  const pool = sortRows(v && vRows.length ? vRows : all, "best")
  // a pictured part always shows (live when this build holds its live view, else its picture); live-only ones after
  const stageRows = pickedRow ? [pickedRow] : [...pool.filter((r) => r.p), ...pool.filter((r) => !r.p && r.lv)].slice(0, 12)
  if (!stageRows.length && pool[0]) stageRows.push(pool[0])
  const slots: Slot[] = [
    { id: undefined, name: "Base", count: all.length, picked: !!pickFor(), why: `The ${n.name.toLowerCase()} every project starts from` },
    ...vars.map((x, i) => ({ id: x.id, name: x.name, count: vCounts[i], picked: !!pickFor(x.id), why: x.why || "" })),
  ]
  const tabs = (
    <div className="mb-4 space-y-4">
      {stageRows.length > 0 && <PickStage key={stageRows[0].id} rows={stageRows} slot={slot} picked={!!pickedRow} />}
      {(vars.length > 0 || !idx.public) && <SlotStrip slots={slots} selected={v?.id} onSelect={setV} picks={!idx.public} />}
      {v && <p className="text-[12.5px] text-muted-foreground">{v.why}{vCounts[vars.indexOf(v)] ? "" : " · nothing in the library is typed this way yet, so every part shows"}</p>}
    </div>
  )
  return (
    <KitSlotContext.Provider value={slot}>
      <BrowseView key={n.key} title={n.name} sub={sub} actions={actions} extra={extra} tabs={tabs} base={folded} hideKinds />
      {deck && createPortal(<PickDeck slots={nodeSlots(n, all, marks, know?.variations)} start={Math.max(0, vars.findIndex((x) => x.id === vid) + 1)} onClose={() => setDeck(false)} />, document.body)}
    </KitSlotContext.Provider>
  )
}
