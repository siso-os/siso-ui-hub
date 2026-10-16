// uihub: siso:family-band
// One family on a layer page (spec C6): a mono overline with how full it is in the kit, its job, then its kinds as tiles.
import type { ReactNode } from "react"

export function FamilyBand({ id, name, job, got, total, children }: { id: string; name: string; job?: string; got: number; total: number; children: ReactNode }) {
  return (
    <section className="space-y-3" id={`fam-${id}`} data-verify-family-band={id}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border/60 pt-4">
        <h2 className="text-lg font-medium tracking-[-0.02em]">{name}</h2>
        {job && <p className="text-sm text-muted-foreground">{job.charAt(0).toUpperCase() + job.slice(1)}</p>}
        <span className="ml-auto font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase tabular-nums">{got} of {total} in the kit</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">{children}</div>
    </section>
  )
}
