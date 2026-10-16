// uihub: siso:slot-strip
// A kind's slots in the SISO kit (spec C4, .agents/plan/2026-10-15-sitemap-and-specs.md): its base, then each variation
// SISO needs, filled or a gap. The slot you select is where Add to kit writes, and the parts below narrow to it. Drawn
// in the sisolabs landing's tab rail: a dot then the name, the selected one lifted, a mono line under it.
import { KitDot } from "@/components/KitDot"
import { cn } from "@/lib/utils"

export type Slot = { id?: string; name: string; count: number; picked: boolean; why?: string }

export function SlotStrip({ slots, selected, onSelect, picks = true }: { slots: Slot[]; selected?: string; onSelect: (id?: string) => void; picks?: boolean }) {
  const filled = slots.filter((s) => s.picked).length
  return (
    <div className="space-y-2" data-verify-slot-strip={slots.length}>
      <div className="flex items-baseline gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        <span>{picks ? "Slots" : "Variations"}</span>
        {picks && <span className="tabular-nums" title="The base and each variation SISO needs, each with one pick">{filled} of {slots.length} filled</span>}
      </div>
      <div className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Slots">
        {slots.map((s) => {
          const sel = s.id === selected
          return (
            <button
              key={s.id ?? "base"}
              role="tab"
              aria-selected={sel}
              onClick={() => onSelect(s.id)}
              title={s.why || undefined}
              className={cn(
                "flex shrink-0 flex-col items-start gap-0.5 rounded-[10px] px-3 py-2 text-left transition-[background-color,color] duration-[400ms] ease-[cubic-bezier(.19,1,.22,1)]",
                sel ? "bg-foreground/[0.07] text-foreground" : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground",
              )}
              data-verify-slot={s.id ?? "base"}
            >
              <span className="flex items-center gap-2 text-sm whitespace-nowrap">
                {picks ? <KitDot state={s.picked ? "full" : "gap"} /> : <span aria-hidden className={cn("size-1.5 rounded-full", sel ? "bg-neon" : "bg-foreground/20")} />}
                {s.name}
              </span>
              <span className="pl-[17px] font-mono text-[10.5px] tracking-[0.08em] text-muted-foreground uppercase tabular-nums">
                {picks && s.picked ? "in the kit" : s.count ? `${s.count.toLocaleString("en-GB")} parts` : "a gap"}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
