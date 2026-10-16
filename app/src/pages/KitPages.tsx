// uihub: siso:page-kit-pages
// Page types, worked backwards from the 93 pages we already run (Shaan, 14 Oct: "work from pages and go backwards ...
// note down what shell was used, what comps were used, so agents can redesign this style ... meet in the middle").
// One screen of cards, each the type drawn from its recipe (Shaan, 15 Oct: "you should be able to see the page or cards
// where you can click on them"); a card opens the type: its picture at size with every slot lit as you point, the
// recipe, how sub-pages switch, its states, what we lack and our real pages. Data: catalogue/page-types.json and
// catalogue/page-anatomy/*.jsonl.
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import types from "../../../catalogue/page-types.json"
import sites from "../../../catalogue/page-anatomy/sites.jsonl?raw"
import apps from "../../../catalogue/page-anatomy/apps.jsonl?raw"
import halo from "../../../catalogue/page-anatomy/halo.jsonl?raw"
import shells from "../../../catalogue/kit-shells.json"
import kitV1 from "../../../catalogue/kit-v1.json"
import { PageWire } from "@/components/kit/PageWire"
import { useFit } from "@/lib/fit"
import { cn } from "@/lib/utils"

type Slot = { order: number; slot: string; component?: string; kind?: string; notes?: string }
type Page = { source: string; file: string; page_type?: string; shell?: unknown; subpages?: string; variants?: string; slots?: Slot[]; states?: string; notes?: string }
type T = { type: string; group: string; match: string; recipe: string[]; switch: string; states: string; gaps: string[] }
const P = types as unknown as { why: string; types: T[]; every_app: string[]; widget_system: Record<string, string | string[]> }
const ROWS: Page[] = [sites, apps, halo].flatMap((t) => t.split("\n").filter(Boolean).map((l) => JSON.parse(l) as Page)).filter((r) => r.page_type)
const ATOM_KINDS = new Set((kitV1 as unknown as { atoms: { kind: string }[] }).atoms.map((a) => a.kind))
const SHELLS = new Set(Object.keys(shells as Record<string, unknown>))
const kindLink = (k: string) => (SHELLS.has(k) ? `/kit/shells/${k}` : ATOM_KINDS.has(k) ? `/kit/atoms/${k}` : `/kit?q=${encodeURIComponent(k.replace(/-/g, " "))}`)
const kindWhere = (k: string) => (SHELLS.has(k) ? "shell" : ATOM_KINDS.has(k) ? "atom" : "part")
const words = (s: string) => s.replace(/-/g, " ")
const shellText = (s: unknown) => (typeof s === "string" ? s : s && typeof s === "object" ? Object.values(s as Record<string, unknown>).filter((v) => typeof v === "string").join(" · ") : "")

// each type's real pages, each page counted once (the first type whose pattern matches it)
const used = new Set<Page>()
const BY = P.types.map((t) => {
  const rx = new RegExp(t.match, "i")
  const rows = ROWS.filter((r) => !used.has(r) && rx.test(r.page_type!))
  rows.forEach((r) => used.add(r))
  return { t, rows }
})
// site pages first, then app pages (the one type both use goes last among the apps)
const ORDER = [...BY.filter(({ t }) => t.group === "site"), ...BY.filter(({ t }) => t.group === "app"), ...BY.filter(({ t }) => t.group === "both")]

function Card({ t, n, width }: { t: T; n: number; width: number }) {
  return (
    <Link to={`/kit/pages/${t.type}`} className="group block rounded-xl border border-border/60 bg-card/40 p-2 transition-colors duration-150 hover:border-foreground/30 hover:bg-card focus-visible:border-primary focus-visible:outline-none" data-verify-page-card={t.type}>
      <PageWire t={t} width={width} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
      <span className="mt-2 flex items-baseline gap-2 px-0.5">
        <span className="truncate text-sm font-medium first-letter:uppercase">{t.type}</span>
        {t.gaps.length > 0 && <span className="size-1.5 shrink-0 self-center rounded-full bg-amber-400" title={`we lack: ${t.gaps.join(" · ")}`} />}
        <span className={cn("ml-auto shrink-0 font-mono text-[11px] whitespace-nowrap tabular-nums", n ? "text-muted-foreground" : "text-amber-400")}>{n ? `${n} of ours` : "none of ours"}</span>
      </span>
    </Link>
  )
}

function Index() {
  const [ref, h] = useFit<HTMLDivElement>()
  const [w, setW] = useState(0)
  // six cards a row; the card's picture is as wide as the row allows and as tall as three rows allow
  const cardW = Math.floor(Math.min((w - 5 * 12) / 6 - 16, ((h - 150) / 3 - 52) * (320 / 240)))
  const site = ORDER.filter(({ t }) => t.group === "site")
  const app = ORDER.filter(({ t }) => t.group !== "site")
  return (
    <div ref={ref} style={{ height: h }} className="flex min-h-0 flex-col" data-verify-kit-pages>
      <header className="flex flex-wrap items-baseline gap-x-3">
        <h1 className="text-2xl font-semibold tracking-tight">Page types</h1>
        <span className="text-sm text-muted-foreground">
          {P.types.length} types, from {ROWS.length} pages we run · {P.types.filter((t) => t.gaps.length).length} with gaps
        </span>
      </header>
      <div ref={(el) => { if (el && el.clientWidth !== w) setW(el.clientWidth) }} className="mt-4 min-h-0 flex-1">
        {w > 0 &&
          [["Site pages", site], ["App pages", app]].map(([label, list]) => (
            <section key={label as string} className="mb-3">
              <h2 className="mb-1.5 text-xs font-medium text-muted-foreground">{label as string}</h2>
              <div className="grid grid-cols-6 gap-3">
                {(list as typeof ORDER).map(({ t, rows }) => <Card key={t.type} t={t} n={rows.length} width={Math.max(120, cardW)} />)}
              </div>
            </section>
          ))}
      </div>
      <footer className="flex shrink-0 flex-wrap items-center gap-1.5 border-t border-border/60 pt-2.5 text-xs">
        <span className="mr-1 text-muted-foreground">Every app has</span>
        {P.every_app.map((k) => (
          <Link key={k} to={kindLink(k)} className="rounded-full border border-border/60 px-2 py-0.5 hover:bg-muted">{words(k)}</Link>
        ))}
      </footer>
    </div>
  )
}

function Examples({ rows }: { rows: Page[] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!rows.length) return <p className="text-xs text-amber-400">None of our pages is this type yet.</p>
  return (
    <ul className="space-y-0.5">
      {rows.map((r, i) => (
        <li key={r.source + r.file} className="text-xs">
          <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex w-full items-baseline gap-2 rounded-md px-1.5 py-1 text-left hover:bg-muted">
            <span className="font-mono text-[10px] text-muted-foreground">{r.source.split("@")[0]}</span>
            <span className="truncate">{r.file.split("/").slice(-2).join("/")}</span>
            <span className="ml-auto shrink-0 text-muted-foreground">{r.slots?.length ?? 0} slots</span>
          </button>
          {open === i && (
            <div className="mt-1 mb-2 ml-1.5 space-y-1 border-l border-border/60 pl-3 text-muted-foreground">
              {r.notes && <p className="text-foreground/80">{r.notes}</p>}
              {shellText(r.shell) && <p>Shell: {shellText(r.shell)}</p>}
              {(r.subpages || r.variants) && <p>Switching: {r.subpages || r.variants}</p>}
              {r.states && <p>States: {r.states}</p>}
              <ol className="flex flex-wrap gap-1 pt-0.5">
                {(r.slots ?? []).map((s) => (
                  <li key={s.order} title={[s.component, s.notes].filter(Boolean).join(" · ")} className="rounded border border-border/60 px-1.5 py-px font-mono text-[10px]">{s.order}. {s.kind || s.slot}</li>
                ))}
              </ol>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

function Detail({ at }: { at: number }) {
  const { t, rows } = ORDER[at]
  const prev = ORDER[(at - 1 + ORDER.length) % ORDER.length].t
  const next = ORDER[(at + 1) % ORDER.length].t
  const [hot, setHot] = useState<number | null>(null)
  const [ref, h] = useFit<HTMLDivElement>()
  const [w, setW] = useState(0)
  const wireW = Math.floor(Math.min(w, (h - 70) * (320 / 240)))
  const W = P.widget_system
  return (
    <div ref={ref} style={{ height: h }} className="flex min-h-0 flex-col" data-verify-kit-page-type={t.type}>
      <header className="flex items-center gap-3">
        <Link to="/kit/pages" className="text-sm text-muted-foreground hover:text-foreground">Page types</Link>
        <span className="text-muted-foreground/60">/</span>
        <h1 className="text-2xl font-semibold tracking-tight first-letter:uppercase">{t.type}</h1>
        <span className="rounded-full border border-border/60 px-2 py-0.5 text-xs text-muted-foreground">{t.group === "both" ? "site and app" : `${t.group} page`}</span>
        <span className="ml-auto flex items-center gap-1">
          <Link to={`/kit/pages/${prev.type}`} className="siso-press flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground" title="Previous type">
            <ArrowLeft className="size-3.5" />
            <span className="first-letter:uppercase">{prev.type}</span>
          </Link>
          <Link to={`/kit/pages/${next.type}`} className="siso-press flex items-center gap-1 rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground" title="Next type">
            <span className="first-letter:uppercase">{next.type}</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </span>
      </header>
      <div className="mt-4 flex min-h-0 flex-1 gap-5">
        <div ref={(el) => { if (el && el.clientWidth !== w) setW(el.clientWidth) }} className="flex min-w-0 flex-1 items-center justify-center">
          {w > 0 && <PageWire t={t} width={wireW} hot={hot} onHot={setHot} />}
        </div>
        <aside className="flex w-[360px] shrink-0 flex-col gap-4 overflow-y-auto pr-1 text-sm">
          <section>
            <h2 className="mb-1.5 text-xs font-medium text-muted-foreground">Recipe, top to bottom</h2>
            <ol onMouseLeave={() => setHot(null)}>
              {t.recipe.map((k, i) => (
                <li key={k + i}>
                  <Link to={kindLink(k)} onMouseEnter={() => setHot(i)} onFocus={() => setHot(i)} className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-100 hover:bg-foreground/[0.06]", hot === i && "bg-primary/10 text-foreground")}>
                    <span className="w-4 font-mono text-[11px] text-muted-foreground tabular-nums">{i + 1}</span>
                    <span className="first-letter:uppercase">{words(k)}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">{kindWhere(k)} →</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
            <dt className="text-muted-foreground">Switching</dt>
            <dd>{t.switch}</dd>
            <dt className="text-muted-foreground">States</dt>
            <dd>{t.states}</dd>
            {t.gaps.length > 0 && (
              <>
                <dt className="text-amber-400">We lack</dt>
                <dd className="text-amber-400">{t.gaps.join(" · ")}</dd>
              </>
            )}
          </dl>
          <section>
            <h2 className="mb-1 text-xs font-medium text-muted-foreground">Our pages of this type ({rows.length})</h2>
            <Examples rows={rows} />
          </section>
          {t.type === "dashboard" && (
            <section>
              <h2 className="text-xs font-medium text-muted-foreground">The widget system</h2>
              <p className="mb-1.5 text-[11px] text-muted-foreground">{String(W.source)}</p>
              <dl className="space-y-1 text-xs">
                {Object.entries(W)
                  .filter(([k]) => k !== "source")
                  .map(([k, v]) => (
                    <div key={k}>
                      <dt className="inline text-muted-foreground first-letter:uppercase">{k}: </dt>
                      <dd className="inline">{Array.isArray(v) ? v.join(" · ") : v}</dd>
                    </div>
                  ))}
              </dl>
            </section>
          )}
        </aside>
      </div>
    </div>
  )
}

export default function KitPages() {
  const { type } = useParams()
  const at = type ? ORDER.findIndex(({ t }) => t.type === type) : -1
  return at >= 0 ? <Detail key={type} at={at} /> : <Index />
}
