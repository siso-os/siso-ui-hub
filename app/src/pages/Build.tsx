// uihub: siso:build
// Build: the hub from first principles (Shaan, 11 Oct: "reorganize it from first principles, how it can actually be
// useful"). Choose what you are making (a landing site, a dashboard, a mobile app, an AI app, a shop, docs, a portfolio);
// its page map runs down the left, slot by slot in the order a person meets them, and each slot shows the best-rated parts
// that fill it (the bank's types/: a reader says which slots each part fills and rates it 1 to 5). A slot opens as a
// browse of every part for it, with the same type chips, sort and filters as a category.
import { useMemo } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { fmtInt, useIndex, type Row } from "@/lib/data"
import { SURFACES, surfaceOf } from "@/lib/surfaces"
import { BrowseView } from "@/components/BrowseView"
import { ItemCard } from "@/components/ItemCard"
import { PageHeader } from "@/components/bits"

// a slot's best first: parts with a picture, then parts of the slot's own kind (its commonest level: the hero slot's
// sections before the typewriter effects and loaders a reader also placed there; the background slot's effects), then
// the reader's rating, then the hub's own rank
const bestFor = (l: Row[]) => {
  const n = new Map<string, number>()
  for (const r of l) if (r.lvl) n.set(r.lvl, (n.get(r.lvl) || 0) + 1)
  const main = [...n.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
  return (a: Row, b: Row) =>
    Number(!!b.p) - Number(!!a.p) || Number(b.lvl === main) - Number(a.lvl === main) || (b.rt || 0) - (a.rt || 0) || b._r - a._r
}

export default function Build() {
  const { surface, slot } = useParams()
  const idx = useIndex()!
  const sf = surfaceOf(surface) || SURFACES[0]
  const bySlot = useMemo(() => {
    const m = new Map<string, Row[]>()
    const pre = sf.id + ":"
    for (const r of idx.items) {
      if (!r.slots || r.cp || r.lvl === "demo") continue
      for (const x of r.slots) {
        if (!x.startsWith(pre)) continue
        const k = x.slice(pre.length)
        const l = m.get(k)
        if (l) l.push(r)
        else m.set(k, [r])
      }
    }
    for (const l of m.values()) l.sort(bestFor(l))
    return m
  }, [idx, sf.id])
  const typed = idx.stats.typed || 0

  const sl = slot ? sf.slots.find((x) => x.id === slot) : undefined
  if (slot)
    return (
      <BrowseView
        title={`${sf.label}: ${sl?.label || slot}`}
        sub={
          <>
            {sl?.does}. Every part a reader placed here, the best rated first.{" "}
            <Link to={`/build/${sf.id}`} className="text-foreground hover:underline">
              Back to the {sf.label.toLowerCase()} map
            </Link>
          </>
        }
        base={bySlot.get(slot) || []}
        ordered
        hideKinds
      />
    )

  return (
    <div data-verify-build={sf.id}>
      <PageHeader
        title="Build"
        sub={
          <>
            Choose what you are making. Its page map runs down the left; each slot shows the best-rated parts that fill it.
            {typed ? ` ${fmtInt(typed)} parts read and rated so far; the rest are being read.` : " The parts are being read and rated."}
          </>
        }
      />
      <nav aria-label="What you are making" className="mb-6 flex flex-wrap gap-1.5" data-verify-surfaces>
        {SURFACES.map((x) => (
          <Link key={x.id} to={`/build/${x.id}`} aria-current={x.id === sf.id ? "page" : undefined} className="siso-chip inline-flex h-8 items-center rounded-full px-3.5 text-[13px]" data-on={x.id === sf.id || undefined}>
            {x.label}
          </Link>
        ))}
      </nav>
      <p className="mb-6 max-w-3xl text-sm text-muted-foreground">{sf.about}</p>

      <div className="grid gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        {/* the page map: the surface as a wireframe, a block per slot, sized like the real thing; empty slots are dashed */}
        <aside className="hidden h-fit lg:sticky lg:top-20 lg:block" aria-label="Page map" data-verify-page-map>
          <div className="siso-rim is-idle rounded-[16px] p-1">
            <div className="space-y-1 rounded-[12px] bg-card p-2">
              <div className="mb-1.5 flex gap-1 px-1 pt-0.5" aria-hidden>
                <span className="size-1.5 rounded-full bg-foreground/20" />
                <span className="size-1.5 rounded-full bg-foreground/20" />
                <span className="size-1.5 rounded-full bg-foreground/20" />
              </div>
              {sf.slots.map((x) => {
                const n = bySlot.get(x.id)?.length || 0
                return (
                  <a
                    key={x.id}
                    href={`#slot-${x.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(`slot-${x.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-md px-2 text-[11.5px] transition-colors hover:bg-neon/10 hover:text-foreground",
                      x.tall ? "h-10" : "h-6",
                      n ? "bg-foreground/[0.05] text-foreground/80" : "border border-dashed text-muted-foreground/60",
                    )}
                  >
                    <span className="truncate">{x.label}</span>
                    <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{n ? fmtInt(n) : "–"}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          {sf.slots.map((x) => {
            const rows = bySlot.get(x.id) || []
            return (
              <section key={x.id} id={`slot-${x.id}`} className="scroll-mt-24" data-verify-slot={x.id} data-n={rows.length}>
                <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold tracking-tight">{x.label}</h2>
                    <p className="text-[13px] text-muted-foreground">{x.does}</p>
                  </div>
                  {rows.length > 0 && (
                    <Link to={`/build/${sf.id}/${x.id}`} className="inline-flex items-center gap-1 text-[13px] text-muted-foreground hover:text-foreground">
                      All {fmtInt(rows.length)} <ArrowRight className="size-3.5" />
                    </Link>
                  )}
                </div>
                {rows.length ? (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-3 2xl:grid-cols-6">
                    {rows.slice(0, 6).map((r) => (
                      <ItemCard key={r.id} row={r} />
                    ))}
                  </div>
                ) : (
                  <p className="rounded-xl border border-dashed px-4 py-6 text-center text-[13px] text-muted-foreground">No part read for this slot yet.</p>
                )}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
