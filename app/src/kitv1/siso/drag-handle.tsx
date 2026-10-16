// uihub: siso:drag-handle
// The grip you grab to reorder a row or move a card. Dots or lines, vertical or horizontal; a button so it can take focus
// and keyboard moves (the list does the moving; this is the affordance).
import { cn } from "@/arc-shims/kit-utils"

export function DragHandle({ look = "dots", orientation = "vertical", label = "Drag to reorder", className, ...props }: { look?: "dots" | "lines"; orientation?: "vertical" | "horizontal"; label?: string; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = orientation === "vertical"
  return (
    <button type="button" aria-label={label} className={cn("inline-flex cursor-grab touch-none items-center justify-center rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring active:cursor-grabbing", className)} {...props}>
      {look === "dots" ? (
        <span className={cn("grid gap-[3px]", v ? "grid-cols-2" : "grid-cols-3")}>
          {Array.from({ length: 6 }, (_, i) => <span key={i} className="size-[3px] rounded-full bg-current" />)}
        </span>
      ) : (
        <span className={cn("flex gap-[3px]", v ? "flex-col" : "flex-row")}>
          {[0, 1, 2].map((i) => <span key={i} className={cn("rounded-full bg-current", v ? "h-[2px] w-3.5" : "h-3.5 w-[2px]")} />)}
        </span>
      )}
    </button>
  )
}
