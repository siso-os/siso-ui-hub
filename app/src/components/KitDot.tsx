// uihub: siso:kit-dot
// How full a kind is in the SISO kit, one mark everywhere (spec C2, .agents/plan/2026-10-15-sitemap-and-specs.md):
// ● its base and every variation are picked, ◐ the base is picked but not every variation, ○ a gap.
import { cn } from "@/lib/utils"

export type KitState = "full" | "base" | "gap"
const SAY: Record<KitState, string> = { full: "in the SISO kit, every variation", base: "in the SISO kit, variations to pick", gap: "a gap in the SISO kit" }

export function KitDot({ state, className }: { state: KitState; className?: string }) {
  return (
    <span
      role="img"
      aria-label={SAY[state]}
      title={SAY[state]}
      data-verify-kit-dot={state}
      className={cn(
        "relative inline-block size-[9px] shrink-0 overflow-hidden rounded-full border",
        state === "gap" ? "border-muted-foreground/45" : "border-neon",
        state === "full" && "bg-neon",
        className,
      )}
    >
      {state === "base" && <span className="absolute inset-y-0 left-0 w-1/2 bg-neon" />}
    </span>
  )
}
