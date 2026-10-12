// uihub: siso:page-node
// One node of the ontology (/x/<scale>/<node>, catalogue/schema/ontology.json): its job, what it is made of, where it is
// used, and its parts with the clean types, looks and fits as chips (BrowseView). A page lists its sections in order.
import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useParams, useSearchParams } from "react-router-dom"
import { Layers3 } from "lucide-react"
import { matchRows, useKnowledge, useRules, type Rule } from "@/lib/knowledge"
import { useBookmarks } from "@/lib/bookmarks"
import { PickDeck } from "@/components/PickDeck"
import { nodeSlots } from "./Siso"
import { useIndex } from "@/lib/data"
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

const chip = (n: ONode, count: number, i?: number) => (
  <Link key={n.key} to={`/x/${n.key}`} className="siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs" data-verify-node-chip={n.key}>
    {i !== undefined && <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{i + 1}</span>}
    {n.name}
    <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{count.toLocaleString("en-GB")}</span>
  </Link>
)

// house rules first, then must, then should
const rank = (r: Rule) => (r.id.startsWith("hub-") ? 0 : r.strength === "must" ? 1 : 2)

export default function NodePage() {
  const { scale = "", node = "" } = useParams()
  const idx = useIndex()
  const rules = useRules()
  const know = useKnowledge()
  const { items: marks } = useBookmarks()
  const [sp, setSp] = useSearchParams()
  const [deck, setDeck] = useState(false)
  const o = idx?.onto
  const n = o?.byKey.get(`${scale}/${node}`)
  const all = useMemo(() => (o && n ? o.rows.get(n.key) || [] : []), [o, n])
  const vars = n ? know?.variations?.[n.key]?.variations || [] : []
  const vid = sp.get("v")
  const v = vars.find((x) => x.id === vid)
  const vRows = useMemo(() => (v ? matchRows(all, v) : all), [all, v])
  if (!idx || !o || !n) return <NotFound />
  const note = know?.notes?.[n.key]
  const taste = know?.taste?.nodes[n.key]
  const setV = (id?: string) => {
    const q = new URLSearchParams(sp)
    if (id) q.set("v", id)
    else q.delete("v")
    setSp(q, { replace: true })
  }
  const made = (n.made_of || []).map((id) => nodeById(o, id)).filter((x): x is ONode => !!x)
  // the sections and components that are made of this one
  const used = n.scale === "atom" || n.scale === "component" ? o.nodes.filter((x) => x.made_of?.includes(n.id) && x.key !== n.key) : []
  const secs = (n.sections || []).map((id) => o.byKey.get(`section/${id}`)).filter((x): x is ONode => !!x)
  const line = (label: string, list: ONode[], ordered = false) =>
    list.length > 0 && (
      <div className="flex flex-wrap items-center gap-1.5" data-verify-node-line={label}>
        <span className="mr-1 text-xs text-muted-foreground">{label}</span>
        {list.map((x, i) => chip(x, nodeCount(o, x.key), ordered ? i : undefined))}
      </div>
    )
  const sub = (
    <div className="mt-1 space-y-2.5">
      {n.job && <p className="text-sm text-muted-foreground">{n.job.charAt(0).toUpperCase() + n.job.slice(1)}</p>}
      {line("Sections, top to bottom", secs, true)}
      {line("Made of", made)}
      {line("Used in", used)}
      {vars.length > 0 && (
        // the variations SISO needs here (catalogue/schema/variations.json): each filters the parts to the ones carrying its words
        <div className="flex flex-wrap items-center gap-1.5" data-verify-node-variations={vars.length}>
          <span className="mr-1 text-xs text-muted-foreground">Variations</span>
          <button onClick={() => setV()} className="siso-chip inline-flex h-7 items-center rounded-full px-3 text-xs" data-on={!v || undefined}>
            All
          </button>
          {vars.map((x) => {
            const c = matchRows(all, x).length
            return (
              <button key={x.id} onClick={() => setV(x.id)} title={`${x.why || ""}${c ? "" : " (a gap: nothing typed this way yet)"}`} className={cn("siso-chip inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-xs", !c && "border-dashed opacity-70")} data-on={v?.id === x.id || undefined}>
                {x.name}
                <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{c ? c.toLocaleString("en-GB") : "gap"}</span>
              </button>
            )
          })}
          {!idx.public && (
            <button onClick={() => setDeck(true)} className="siso-press ml-1 inline-flex h-7 items-center gap-1.5 rounded-full bg-neon/15 px-3 text-xs font-medium text-neon-ink" data-verify-node-deck>
              <Layers3 className="size-3.5" /> Flip through and pick
            </button>
          )}
        </div>
      )}
      {v && <p className="text-[12.5px] text-muted-foreground">{v.why}{matchRows(all, v).length ? "" : " · nothing in the library is typed this way yet, so every part shows"}</p>}
      {(note || taste) && (
        <div className="max-w-3xl space-y-1 text-[12.5px]" data-verify-node-notes>
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
      <Rules list={(rules || []).filter((r) => r.nodes.includes(n.key) || r.scales.includes(n.scale)).sort((a, b) => rank(a) - rank(b))} />
    </div>
  )
  return (
    <>
      <BrowseView key={n.key} title={n.name} sub={sub} base={v && vRows.length ? vRows : all} hideKinds />
      {deck && createPortal(<PickDeck slots={nodeSlots(n, all, marks, know?.variations)} start={Math.max(0, vars.findIndex((x) => x.id === vid) + 1)} onClose={() => setDeck(false)} />, document.body)}
    </>
  )
}
