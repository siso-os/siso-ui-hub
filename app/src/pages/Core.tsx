// uihub: siso:page-core
// A core of the App Factory: what it holds, what there is today, its parts, where it stands and how it plugs in.
import { Link, Navigate, useParams } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { coreById, useProjects } from "@/lib/factory"
import { fmtInt } from "@/lib/data"

export default function CorePage() {
  const { id } = useParams()
  const c = coreById(id)
  const projects = useProjects()
  if (id === "ui") return <Navigate to="/" replace />
  if (!c)
    return (
      <div>
        <h1 className="text-[26px] leading-[1.1] font-semibold">There's no core called {id}</h1>
        <Link to="/factory" className="mt-3 inline-block text-sm text-neon-ink hover:underline">
          Every core →
        </Link>
      </div>
    )
  const I = c.icon
  const facts: [string, string][] = [
    ["Today", c.today],
    ["Stage", c.stage],
    ["Owner", c.owner ?? "Not set yet"],
    ["Sources", c.sources],
  ]
  return (
    <div data-verify-core-page={c.id}>
      <div className="mb-6 flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-[12px]" style={{ background: `color-mix(in srgb, ${c.color} 14%, transparent)`, color: c.color }}>
          <I className="size-5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">{c.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{c.holds}</p>
        </div>
      </div>
      <dl className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k} className="rounded-[14px] border bg-card p-4">
            <dt className="siso-kicker">{k}</dt>
            <dd className="mt-1.5 text-[13px] leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
      {c.id === "projects" ? (
        <section className="mb-10">
          <h2 className="siso-kicker mb-3">Your projects · {projects?.length ?? "…"}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {(projects || []).map((p) => (
              <div key={p.id} id={p.id} className="scroll-mt-24 rounded-[14px] border bg-card p-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{p.name}</span>
                  {p.namesOnly && <span className="siso-chip rounded-full px-2 py-px text-[11px]">names only</span>}
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">{p.about}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                  {(
                    [
                      ["Components", p.components],
                      ["Pages", p.pages],
                      ["Picked", p.picked],
                      ["Need a pick", p.needsPick],
                      ["Ours", p.ours],
                      ["Dead", p.dead],
                    ] as [string, number][]
                  ).map(([k, v]) => (
                    <div key={k}>
                      <div className="text-muted-foreground">{k}</div>
                      <div className="font-semibold tabular-nums">{fmtInt(v)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {projects && !projects.length && <p className="text-sm text-muted-foreground">His projects come from data/factory/projects.json, which only his build exports.</p>}
          </div>
        </section>
      ) : (
        <section className="mb-10">
          <h2 className="siso-kicker mb-3">Its parts · {c.parts.length}</h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {c.parts.map((p) => {
              const P = p.icon ?? I
              const body = (
                <>
                  <div className="flex items-center gap-2">
                    <P className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                    <span className="min-w-0 flex-1 truncate font-medium">{p.name}</span>
                    {p.n && <span className="font-mono text-xs text-muted-foreground tabular-nums">{p.n}</span>}
                  </div>
                  {p.hint && <p className="mt-1 text-[13px] text-muted-foreground">{p.hint}</p>}
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    {p.to ? (
                      <>
                        <span className="text-neon-ink">Open</span>
                        <ArrowRight className="size-3 text-neon-ink" />
                      </>
                    ) : (
                      "Not built yet"
                    )}
                  </div>
                </>
              )
              return p.to ? (
                <Link key={p.id} id={p.id} to={p.to} className="siso-glow-card scroll-mt-24 p-4">
                  {body}
                </Link>
              ) : (
                <div key={p.id} id={p.id} className="scroll-mt-24 rounded-[14px] border bg-card p-4">
                  {body}
                </div>
              )
            })}
          </div>
        </section>
      )}
      <section className="rounded-[14px] border border-dashed p-4 text-[13px] leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">How it plugs in. </span>
        {c.live
          ? "Its data is already in: the projects come from the UI Hub's nightly census, built by factory/bin/build-data."
          : `When ${c.owner ?? "its owner"} exports its data the way the UI Hub does (data/index.json), these parts become pages here: list and search, the record page, compare and curate.`}
      </section>
    </div>
  )
}
