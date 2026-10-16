// uihub: siso:set-phone
// The phone the SISO set's native-app screens are shown in: 390 wide, the status bar, the home bar. Not a part on its own.
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="flex justify-center py-6">
      <div className="relative h-[780px] w-[360px] overflow-hidden rounded-[44px] border border-border bg-background shadow-2xl ring-8 ring-foreground/[0.06]">
        <div className="flex h-11 items-center justify-between px-7 pt-1 font-mono text-[12px] text-foreground tabular-nums">
          <span>9:41</span>
          <span aria-hidden className="h-6 w-24 rounded-full bg-foreground/[0.08]" />
          <span aria-hidden className="flex items-center gap-1">
            <span className="h-2.5 w-4 rounded-[3px] border border-foreground/60" />
          </span>
        </div>
        <div className={cn("absolute inset-x-0 top-11 bottom-6 overflow-y-auto", className)}>{children}</div>
        <span aria-hidden className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-foreground/40" />
      </div>
    </div>
  )
}
