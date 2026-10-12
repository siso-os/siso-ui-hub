// uihub: siso:page-ours
// From our apps (Shaan, 12 Oct: "pull out comps that I like from certain apps and go through and then like organize them"):
// every part of our own apps that bin/ours-capture pictured from a real screen, by app, then by the slot it sits on. Flip
// through an app to take its parts as SISO bases; the same parts show first in each slot's deck beside the libraries'.
import { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import { useSearchParams } from "react-router-dom"
import { Layers3 } from "lucide-react"
import { useIndex, type Row } from "@/lib/data"
import { useBookmarks } from "@/lib/bookmarks"
import { PageHeader } from "@/components/bits"
import { ItemCard } from "@/components/ItemCard"
import { PickDeck, type Slot } from "@/components/PickDeck"

export default function Ours() {
  const idx = useIndex()!
  const { items: marks } = useBookmarks()
  const [sp, setSp] = useSearchParams()
  const [deck, setDeck] = useState<number | null>(null)
  const ours = useMemo(() => idx.items.filter((r) => r.id.startsWith("ours:")), [idx])
  const apps = useMemo(() => [...new Set(ours.map((r) => r.s))].sort(), [ours])
  const app = sp.get("app") && apps.includes(sp.get("app")!) ? sp.get("app")! : apps[0]
  const mine = ours.filter((r) => r.s === app)
  // by the slot each part sits on (the ontology's node), biggest first; the ones on no node yet last
  const groups = useMemo(() => {
    const m = new Map<string, Row[]>()
    for (const r of mine) m.set(r.nd || "", [...(m.get(r.nd || "") || []), r])
    return [...m.entries()].sort((a, b) => (a[0] ? 0 : 1) - (b[0] ? 0 : 1) || b[1].length - a[1].length)
  }, [mine])
  const name = (nd: string) => idx.onto.byKey.get(nd)?.name || "Not sorted yet"
  const slots: Slot[] = groups.filter(([nd]) => nd).map(([nd, rows]) => ({ key: `siso/base/${nd}`, title: name(nd), sub: app, rows, why: `${rows.length} from ${app}; taking one makes it the SISO base for ${name(nd)}` }))
  const taken = slots.filter((s) => marks[s.key] && !marks[s.key].off && s.rows.some((r) => r.id === marks[s.key].note)).length

  if (!apps.length)
    return (
      <div className="space-y-4">
        <PageHeader title="From our apps" sub="Our apps' parts are being pictured from their real screens on the Mac mini. They show here when that run lands." />
      </div>
    )
  return (
    <div className="space-y-6" data-verify-ours={ours.length}>
      <PageHeader
        title="From our apps"
        count={ours.length}
        sub="Parts of our own apps, pictured from their real screens. Flip through an app to take its parts as SISO bases; the same parts show first in each slot's deck, beside the libraries'."
      />
      <div className="flex flex-wrap items-center gap-1.5">
        {apps.map((a) => (
          <button key={a} onClick={() => setSp({ app: a }, { replace: true })} className="siso-chip inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px]" data-on={a === app || undefined}>
            {a}
            <span className="font-mono text-[10.5px] text-muted-foreground">{ours.filter((r) => r.s === a).length}</span>
          </button>
        ))}
        {slots.length > 0 && (
          <button onClick={() => setDeck(0)} className="siso-press ml-2 inline-flex h-8 items-center gap-1.5 rounded-full bg-neon/15 px-3.5 text-[13px] font-medium text-neon-ink" data-verify-ours-deck>
            <Layers3 className="size-3.5" /> Flip through {app}
          </button>
        )}
        <span className="ml-auto text-[12.5px] text-muted-foreground">
          {taken} of {slots.length} of its slots taken from it
        </span>
      </div>
      {groups.map(([nd, rows]) => (
        <section key={nd || "none"}>
          <h2 className="mb-2 flex items-baseline gap-2 text-[15px] font-semibold">
            {name(nd)}
            <span className="font-mono text-[11px] font-normal text-muted-foreground">{rows.length}</span>
            {nd && (
              <button onClick={() => setDeck(slots.findIndex((s) => s.key === `siso/base/${nd}`))} className="text-[12px] font-normal text-muted-foreground hover:text-foreground">
                flip through
              </button>
            )}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
            {rows.map((r) => (
              <ItemCard key={r.id} row={r} />
            ))}
          </div>
        </section>
      ))}
      {deck !== null && createPortal(<PickDeck slots={slots} start={Math.max(0, deck)} onClose={() => setDeck(null)} />, document.body)}
    </div>
  )
}
