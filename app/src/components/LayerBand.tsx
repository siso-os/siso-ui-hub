// uihub: siso:layer-band
// The kit home's first row (spec T1): every layer of the SISO kit as a card with four real screens of what it holds,
// how many of its kinds are in the kit, and a way into the layer page.
import { useMemo } from "react"
import { Link } from "react-router-dom"
import { pic, useIndex } from "@/lib/data"
import { useBookmarks } from "@/lib/bookmarks"
import { useKnowledge } from "@/lib/knowledge"
import { layerView } from "@/lib/families"
import { TOP_TABS, type TopTab } from "@/lib/tab"

export function LayerBand() {
  const idx = useIndex()
  const know = useKnowledge()
  const { items: marks } = useBookmarks()
  const layers = useMemo(() => {
    if (!idx) return []
    return TOP_TABS.filter((t) => t.id !== "projects").map((t) => {
      const fams = layerView(idx, t.id as TopTab, marks, (k) => know?.variations?.[k]?.variations || [], 0, true)
      const tiles = fams.flatMap((f) => f.tiles)
      const shots = [...tiles.filter((x) => x.picked && x.row?.p), ...tiles.filter((x) => !x.picked && x.row?.p)].slice(0, 4)
      return { t, kinds: tiles.length, got: tiles.filter((x) => x.state !== "gap").length, shots }
    }).filter((l) => l.kinds)
  }, [idx, marks, know])
  if (!layers.length) return null
  return (
    <section className="mb-8 space-y-3" data-verify-layer-band={layers.length}>
      <div className="flex items-baseline gap-3">
        <h2 className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">The SISO kit, by layer</h2>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{layers.reduce((n, l) => n + l.got, 0)} of {layers.reduce((n, l) => n + l.kinds, 0)} kinds</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {layers.map(({ t, kinds, got, shots }) => (
          <Link key={t.id} to={`/kit/l/${t.id}`} className="group overflow-hidden rounded-[16px] border border-border/60 bg-card/60 transition-[transform,border-color] duration-[400ms] ease-[cubic-bezier(.19,1,.22,1)] hover:-translate-y-0.5 hover:border-border" data-verify-layer-card={t.id}>
            <div className="grid aspect-[16/10] grid-cols-2 grid-rows-2 gap-px bg-border/40">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="overflow-hidden bg-foreground/[0.04]">
                  {shots[i]?.row?.p && <img src={pic(shots[i].row!.p!)} alt="" loading="lazy" className="size-full object-cover object-top" />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 px-3 py-2.5">
              <t.icon className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">{t.label}</span>
              <span className="ml-auto font-mono text-[10.5px] text-muted-foreground tabular-nums">{got}/{kinds}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
