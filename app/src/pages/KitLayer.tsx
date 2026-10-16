// uihub: siso:page-kit-layer
// A layer of the SISO kit (spec T2, .agents/plan/2026-10-15-sitemap-and-specs.md): every family of the layer as a band,
// every kind as a tile with a real screen of what the kit holds, how full each is, and Shuffle to see other strong
// library parts in the gaps. The header is the sisolabs landing's: mono overline, a big tight heading, one line.
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Shuffle } from "lucide-react"
import { useIndex } from "@/lib/data"
import { useBookmarks } from "@/lib/bookmarks"
import { useKnowledge } from "@/lib/knowledge"
import { layerView } from "@/lib/families"
import { TOP_TABS, type TopTab } from "@/lib/tab"
import { FamilyBand } from "@/components/FamilyBand"
import { KindTile } from "@/components/KindTile"
import { KitDot } from "@/components/KitDot"
import NotFound from "./NotFound"

export default function KitLayer() {
  const { tab = "" } = useParams()
  const idx = useIndex()
  const know = useKnowledge()
  const { items: marks } = useBookmarks()
  const [seed, setSeed] = useState(0)
  const t = TOP_TABS.find((x) => x.id === tab && x.id !== "projects")
  const fams = useMemo(
    () => (idx && t ? layerView(idx, t.id as TopTab, marks, (k) => know?.variations?.[k]?.variations || [], seed) : []),
    [idx, t, marks, know, seed],
  )
  if (!idx) return null
  if (!t || !fams.length) return <NotFound />
  const kinds = fams.reduce((n, f) => n + f.tiles.length, 0)
  const got = fams.reduce((n, f) => n + f.got, 0)
  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-8 px-6 pt-6 pb-24" data-verify-kit-layer={tab}>
      <header className="flex flex-wrap items-end gap-x-6 gap-y-4">
        <div className="min-w-0 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-foreground/[0.03] px-3 py-1 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            <span className="size-1.5 rounded-full bg-neon shadow-[0_0_6px_var(--neon)]" />
            The SISO kit · layer
          </div>
          <h1 className="text-[clamp(34px,4.4vw,56px)] leading-none font-medium tracking-[-0.04em]">{t.label}</h1>
          <p className="max-w-[60ch] text-muted-foreground">
            {got} of {kinds} kinds in the kit, in {fams.length} families. Each tile is a real screen: the kit's pick, or while it is a gap a strong part from the library.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-3 font-mono text-[10.5px] tracking-[0.1em] text-muted-foreground uppercase sm:flex">
            <span className="flex items-center gap-1.5"><KitDot state="full" /> every slot</span>
            <span className="flex items-center gap-1.5"><KitDot state="base" /> base</span>
            <span className="flex items-center gap-1.5"><KitDot state="gap" /> gap</span>
          </span>
          <button onClick={() => setSeed((s) => s + 1 + Math.floor(Math.random() * 97))} className="siso-press inline-flex h-9 items-center gap-2 rounded-[9px] bg-foreground px-3.5 font-mono text-[11px] font-medium tracking-[0.14em] text-background uppercase" data-verify-shuffle>
            <Shuffle className="size-3.5" /> Shuffle
          </button>
        </div>
      </header>
      <nav className="-mx-1 flex gap-1 overflow-x-auto px-1" aria-label="Families">
        {fams.map((f) => (
          <a key={f.id} href={`#fam-${f.id}`} className="shrink-0 rounded-lg px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground">
            {f.name} <span className="font-mono text-[10.5px] tabular-nums">{f.got}/{f.tiles.length}</span>
          </a>
        ))}
      </nav>
      {fams.map((f) => (
        <FamilyBand key={f.id} id={f.id} name={f.name} job={f.job} got={f.got} total={f.tiles.length}>
          {f.tiles.map((x) => <KindTile key={x.n.key} {...x} />)}
        </FamilyBand>
      ))}
      <p className="text-sm text-muted-foreground">
        <Link to="/kit" className="underline underline-offset-4 hover:text-foreground">Every layer of the kit</Link>
      </p>
    </div>
  )
}
