// uihub: siso:swatch
// One colour shown as a chip: round or square, with its name and value, copy on click. A row of them is a palette.
import { useState } from "react"
import { cn } from "@/arc-shims/kit-utils"

export function Swatch({ color, name, shape = "square", size = 40, showValue = false, className }: { color: string; name?: string; shape?: "square" | "round"; size?: number; showValue?: boolean; className?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => navigator.clipboard?.writeText(color).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1200) })
  return (
    <button type="button" onClick={copy} className={cn("group inline-flex flex-col items-center gap-1.5 text-[11px]", className)} aria-label={`${name ?? color}, copy ${color}`}>
      <span className={cn("block ring-1 ring-inset ring-black/10 transition-transform group-hover:scale-105 group-active:scale-95 dark:ring-white/15", shape === "round" ? "rounded-full" : "rounded-lg")} style={{ background: color, width: size, height: size }} />
      {name && <span className="text-foreground">{name}</span>}
      {(showValue || copied) && <span className="font-mono text-muted-foreground">{copied ? "copied" : color}</span>}
    </button>
  )
}
