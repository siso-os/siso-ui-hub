// uihub: siso:status-dot
// Online, away, busy or offline, with an optional ping for live things. Reads as text to screen readers.
import { cn } from "@/arc-shims/kit-utils"

const COLOR = { online: "bg-emerald-500", away: "bg-amber-400", busy: "bg-rose-500", offline: "bg-zinc-400" } as const
type Status = keyof typeof COLOR

export function StatusDot({ status = "online", ping = false, size = 8, label, className }: { status?: Status; ping?: boolean; size?: number; label?: string; className?: string }) {
  return (
    <span className={cn("relative inline-flex shrink-0", className)} style={{ width: size, height: size }} role="status" aria-label={label ?? status}>
      {ping && <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:hidden", COLOR[status])} />}
      <span className={cn("relative inline-flex size-full rounded-full ring-2 ring-background", COLOR[status])} />
    </span>
  )
}
