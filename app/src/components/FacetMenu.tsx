// uihub: siso:facet-menu
// One filter as one button (Shaan, 15 Oct: "fix the bare pills at the tops of pages"): the button says what the filter
// is and what it is set to; open, the choices with their counts, biggest first, found by typing. Arc's popover holds
// the hub's command list, so arrow keys and Enter work.
import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/arc/popover/popover"
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"

// the panel is portalled outside any arc-scope, so Arc's token names are pointed at the hub's own
const HUB = {
  "--surface-raised": "var(--popover)",
  "--radius-panel": "14px",
  "--shadow-floating": "0 18px 48px -12px rgb(0 0 0 / .6)",
  "--duration-fast": "130ms",
  "--duration-spring": "220ms",
  "--duration-instant": "0ms",
  "--ease-enter": "cubic-bezier(.2,.8,.2,1)",
  "--ease-spring": "cubic-bezier(.2,.9,.25,1.05)",
  "--ease-standard": "ease",
  "--popover-x": "0px",
  "--popover-y": "-4px",
} as React.CSSProperties

const n = (x: number) => x.toLocaleString("en-GB")

/** items: [id, count, label?], biggest first; "all" is the unset value */
export function FacetMenu({ label, all, items, value, onChange, total }: { label: string; all: string; items: [string, number, string?][]; value: string; onChange: (v: string) => void; total?: number }) {
  const [open, setOpen] = useState(false)
  const on = value !== "all"
  const name = on ? (items.find(([id]) => id === value)?.[2] ?? value) : all
  const pick = (v: string) => {
    onChange(v)
    setOpen(false)
  }
  const max = Math.max(1, ...items.map(([, c]) => c))
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <span className="siso-chip inline-flex h-8 items-center rounded-lg" data-on={on || undefined} data-verify-facet={label}>
        <PopoverTrigger className="inline-flex h-full items-center gap-1.5 rounded-lg pr-2 pl-2.5 text-xs focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none">
          {on ? (
            <>
              <span className="opacity-70">{label}</span>
              <span className="max-w-44 truncate font-medium first-letter:uppercase">{name}</span>
            </>
          ) : (
            <>
              <span className="text-foreground/85">{label}</span>
              <span className="font-mono text-[10.5px] text-muted-foreground tabular-nums">{n(items.length)}</span>
            </>
          )}
          <ChevronDown className={cn("size-3.5 opacity-60 transition-transform duration-150", open && "rotate-180")} />
        </PopoverTrigger>
        {on && (
          <button onClick={() => onChange("all")} aria-label={`Clear ${label.toLowerCase()}`} className="-ml-1 mr-1 grid size-5 place-items-center rounded-md opacity-70 hover:bg-foreground/10 hover:opacity-100">
            <X className="size-3" />
          </button>
        )}
      </span>
      <PopoverContent style={HUB} className="w-72 overflow-hidden p-0 text-popover-foreground backdrop-blur-xl">
        <Command className="bg-transparent">
          {items.length > 8 && <CommandInput placeholder={`Find a ${label.toLowerCase()}…`} className="h-9 text-xs" />}
          <CommandList className="max-h-80 p-1">
            <CommandEmpty className="py-4 text-center text-xs text-muted-foreground">Nothing matches</CommandEmpty>
            {[["all", total ?? 0, all] as [string, number, string?], ...items].map(([id, c, text]) => (
              <CommandItem key={id} value={text ?? id} onSelect={() => pick(id)} className="relative gap-2 rounded-md px-2 py-1.5 text-xs">
                <Check className={cn("size-3.5 shrink-0", value === id ? "opacity-100" : "opacity-0")} />
                <span className="truncate first-letter:uppercase">{text ?? id}</span>
                {c > 0 && <span className="ml-auto shrink-0 font-mono text-[10.5px] text-muted-foreground tabular-nums">{n(c)}</span>}
                {id !== "all" && <span aria-hidden className="absolute inset-x-2 bottom-0.5 h-px rounded-full bg-foreground/15" style={{ width: `calc(${Math.max(2, (c / max) * 100)}% - 16px)` }} />}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
