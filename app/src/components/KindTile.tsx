// uihub: siso:kind-tile
// One kind on a layer page or the kit home (spec C7): a real screen of what the kit holds for it (its pick, or while it
// is a gap a strong library part, which Shuffle changes), the kit dot, its name and how many parts the library has.
// Drawn in the sisolabs landing's card language: a soft panel, mono line, one expo-out lift on hover.
import { Link } from "react-router-dom"
import { KitDot, type KitState } from "@/components/KitDot"
import { pic, type Row } from "@/lib/data"
import type { ONode } from "@/lib/ontology"
import { cn } from "@/lib/utils"

export function KindTile({ n, state, row, names, count, picked }: { n: ONode; state: KitState; row?: Row; names: string[]; count: number; picked: boolean }) {
  return (
    <Link
      to={`/x/${n.key}`}
      className="group flex flex-col overflow-hidden rounded-[16px] border border-border/60 bg-card/60 transition-[transform,box-shadow,border-color] duration-[400ms] ease-[cubic-bezier(.19,1,.22,1)] hover:-translate-y-0.5 hover:border-border hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.45)]"
      data-verify-kind-tile={n.key}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-foreground/[0.04]">
        {row?.p ? (
          <img src={pic(row.p)} alt="" loading="lazy" className="size-full object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(.19,1,.22,1)] group-hover:scale-[1.03]" />
        ) : (
          <ul className="flex size-full flex-col justify-center gap-1.5 px-4 text-[13px] text-foreground/70">
            {names.length ? names.map((t, i) => <li key={i} className="truncate">{t}</li>) : <li className="line-clamp-3">Ours to build: {n.job || n.name}</li>}
          </ul>
        )}
        {picked && (
          <span className="absolute top-2 left-2 rounded-full border border-neon/50 bg-background/80 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-neon-ink uppercase backdrop-blur-md">in the kit</span>
        )}
      </div>
      <div className="flex items-center gap-2 px-3 py-2.5">
        <KitDot state={state} />
        <span className="min-w-0 truncate text-sm font-medium">{n.name}</span>
        <span className={cn("ml-auto shrink-0 font-mono text-[10.5px] text-muted-foreground tabular-nums")}>{count ? count.toLocaleString("en-GB") : "gap"}</span>
      </div>
    </Link>
  )
}
