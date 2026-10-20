// uihub: siso:pill-switch
// The pill switch, a SISO shell piece (Shaan's picture, 10 Oct): icons in a pill, and the chosen one opens to show its
// name. The UI Hub's top tabs wear it; give an option a `to` and it navigates.
import { Fragment } from "react"
import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { NavGlyph } from "@/components/NavGlyph"

// gap: a thin divider before it (the UI Hub: the scales, then his own places)
export type PillOption<T extends string> = { id: T; label: string; icon: LucideIcon; to?: string; gap?: boolean }

export function PillSwitch<T extends string>({ options, value, onChange, label, className }: { options: PillOption<T>[]; value: T; onChange?: (id: T) => void; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={cn("siso-well flex items-center gap-0.5 p-[3px]", className)} data-verify-pill={label}>
      {options.map(({ id, label: name, icon: I, to, gap }) => {
        const on = id === value
        const cls = cn(
          "siso-top-tab flex h-7 shrink-0 items-center rounded-[7px] px-2 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          on ? "siso-neon text-white" : "text-muted-foreground hover:text-foreground",
        )
        const body = (
          <>
            <NavGlyph icon={I} active={on} />
            <span className="siso-pill-label" data-on={on || undefined}>
              {name}
            </span>
          </>
        )
        const item = to ? (
          <Link key={id} to={to} onClick={() => onChange?.(id)} aria-current={on ? "page" : undefined} title={on ? undefined : name} className={cls}>
            {body}
          </Link>
        ) : (
          <button key={id} type="button" onClick={() => onChange?.(id)} aria-pressed={on} title={on ? undefined : name} className={cls}>
            {body}
          </button>
        )
        return gap ? (
          <Fragment key={id}>
            <span className="mx-1 h-4 w-px shrink-0 bg-border" aria-hidden data-verify-pill-gap />
            {item}
          </Fragment>
        ) : (
          item
        )
      })}
    </nav>
  )
}
