// uihub: siso:page-factory
// The App Factory's home (spec app-factory §1: "his projects are on the home screen"): his projects, then every core in
// his groups, then how a core plugs in.
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { GROUPS, useProjects, type Core } from "@/lib/factory"
import { fmtInt, useIndex } from "@/lib/data"

const STEPS: [string, string][] = [
  ["One shell", "This app. The name at the top of the side nav switches cores; the top bar, ⌘K and the look are shared."],
  ["A core is a side nav", "Its parts are the rows, and its pages sit in the box."],
  ["Its data comes in by export", "The UI Hub's data/index.json is the pattern. Each core's owner ships theirs the same way."],
  ["The same screens everywhere", "Every core gets list and search, the record page, compare and curate (spec §4)."],
]

function CoreCard({ c, today }: { c: Core; today?: string }) {
  const I = c.icon
  return (
    <Link to={c.to} className="siso-glow-card group flex flex-col gap-2 p-4" data-verify-core={c.id}>
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-[10px]" style={{ background: `color-mix(in srgb, ${c.color} 14%, transparent)`, color: c.color }}>
          <I className="size-[18px]" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">{c.name}</div>
          <div className="siso-kicker !text-[10px]">{c.verb}</div>
        </div>
        <span className="siso-chip shrink-0 rounded-full px-2 py-px text-[11px]" data-on={c.live || undefined}>
          {c.live ? "Live" : c.stage.split(/[;(]/)[0].trim()}
        </span>
      </div>
      <p className="line-clamp-2 text-[13px] text-muted-foreground">{c.holds}</p>
      <div className="mt-auto flex items-center gap-2 pt-1 text-xs">
        <span className="font-medium text-foreground">{today ?? c.today}</span>
        <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  )
}

export default function Factory() {
  const idx = useIndex()
  const projects = useProjects()
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">App Factory</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">Make anything, from the parts up. Every hub is a core: open one here, or from the name at the top of the side nav.</p>
      </div>
      {!!projects?.length && (
        <section className="mb-10" data-verify-projects>
          <h2 className="siso-kicker mb-3">Your projects · {projects.length}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
            {projects.map((p) => (
              <Link key={p.id} to={`/cores/projects#${p.id}`} className="siso-glow-card flex flex-col gap-1 p-4">
                <div className="truncate font-semibold">{p.name}</div>
                <div className="line-clamp-2 text-xs text-muted-foreground">{p.about}</div>
                <div className="mt-auto flex gap-3 pt-2 text-xs text-muted-foreground">
                  <span>
                    <b className="font-semibold text-foreground tabular-nums">{fmtInt(p.components)}</b> components
                  </span>
                  <span>
                    <b className="font-semibold text-foreground tabular-nums">{p.pages}</b> pages
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      {GROUPS.map((g) => (
        <section key={g.label} className="mb-10" data-verify-group={g.label}>
          <h2 className="siso-kicker mb-3">{g.label}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {g.cores.map((c) => (
              <CoreCard key={c.id} c={c} today={c.id === "ui" && idx ? `${fmtInt(idx.stats.total)} parts` : c.id === "projects" && projects ? `${projects.length} projects, ${fmtInt(projects.reduce((n, p) => n + p.components, 0))} components` : undefined} />
            ))}
          </div>
        </section>
      ))}
      <section className="mb-4">
        <h2 className="siso-kicker mb-3">How a core plugs in</h2>
        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <li key={t} className="rounded-[14px] border bg-card p-4">
              <div className="font-mono text-xs text-muted-foreground">{i + 1}</div>
              <div className="mt-1 font-medium">{t}</div>
              <p className="mt-1 text-[13px] text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
