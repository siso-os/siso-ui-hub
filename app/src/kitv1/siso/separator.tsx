// uihub: siso:separator
// A line between groups. Five looks: hairline, fade (ends melt into the background), dashed, dotted, and labelled (text
// or an icon sits in the gap). Horizontal or vertical. Decorative by default; pass decorative={false} for a real separator.
import type { ReactNode } from "react"
import { cn } from "@/arc-shims/kit-utils"

type Look = "hairline" | "fade" | "dashed" | "dotted"
const LINE: Record<Look, string> = {
  hairline: "bg-border",
  fade: "bg-gradient-to-r from-transparent via-border to-transparent",
  dashed: "border-t border-dashed border-border bg-transparent",
  dotted: "border-t-2 border-dotted border-border bg-transparent",
}
const LINE_V: Record<Look, string> = {
  hairline: "bg-border",
  fade: "bg-gradient-to-b from-transparent via-border to-transparent",
  dashed: "border-l border-dashed border-border bg-transparent",
  dotted: "border-l-2 border-dotted border-border bg-transparent",
}

export function Separator({ look = "hairline", orientation = "horizontal", label, decorative = true, className }: { look?: Look; orientation?: "horizontal" | "vertical"; label?: ReactNode; decorative?: boolean; className?: string }) {
  const a11y = decorative ? { "aria-hidden": true } : { role: "separator", "aria-orientation": orientation }
  if (orientation === "vertical") return <span {...a11y} className={cn("inline-block w-px self-stretch", LINE_V[look], className)} />
  const line = <span className={cn("block flex-1", look === "dashed" || look === "dotted" ? "h-0" : "h-px", LINE[look])} />
  if (!label) return <div {...a11y} className={cn("flex w-full items-center", className)}>{line}</div>
  return (
    <div {...a11y} className={cn("flex w-full items-center gap-3 text-xs text-muted-foreground", className)}>
      {line}<span className="shrink-0">{label}</span>{line}
    </div>
  )
}
