// uihub: siso:page-kit-atom
// One atom kind on its own page (Shaan, 14 Oct: "each of the Atom categories ... its own page with its own comps in there,
// variations rated ... when to use them ... other related comps and then the SISO related comps ... ARK has a bunch of
// different variations we should include all of their variations"). Order: the SISO pick and its variations, every Arc part
// for the job with each of its variant values live, when to use it, Arc's related parts, then the rest we hold, ranked.
import { Children, cloneElement, isValidElement, lazy, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import arcPages from "../../../catalogue/kit-v1-atoms-arc.json"
import kitJson from "../../../catalogue/kit-v1.json"
import { Contenders, KINDS, LAYER, Live, SAMPLE, SIGNALS, Stage, arcDemos, arcFiles, markBad, useBad, useMarks, type Kind, type Show } from "@/kitv1/live"

const ASSETS = ((kitJson as unknown as { assets?: Kind[] }).assets ?? [])

type ArcPart = {
  name: string; title: string; about?: string; demo?: string; install?: string; file?: string; export?: string
  use: string[]; avoid: string[]; keyboard: string[]; a11y: string[]
  variants: { prop: string; values: string[]; default: string; desc: string }[]
  booleans: string[]
  siblings: { name: string; title: string; about: string; demo?: string }[]
}
const ARC = arcPages as unknown as Record<string, ArcPart[]>
// boolean props worth seeing as a state of their own
const STATES = ["loading", "disabled", "invalid", "indeterminate", "checked", "defaultChecked", "readOnly", "required"]

function Tile({ label, sub, arc, children, h = 150 }: { label: string; sub?: string; arc?: boolean; children: React.ReactNode; h?: number }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-border/60">
      <div className={`flex items-center justify-center overflow-auto bg-background p-4 ${arc ? "arc-scope" : ""}`} data-theme={arc ? "dark" : undefined} data-accent={arc ? "orange" : undefined} style={{ minHeight: h, maxHeight: 420, transform: "translateZ(0)" }}>
        <div className="w-full"><div className="flex justify-center">{children}</div></div>
      </div>
      <div className="border-t border-border/60 px-3 py-1.5 text-[11px]">
        <span className="font-mono text-foreground/90">{label}</span>
        {sub && <p className="mt-0.5 line-clamp-2 text-muted-foreground">{sub}</p>}
      </div>
    </div>
  )
}


// Arc's variants on real data (Shaan, 14 Oct: "the Arc variants are quite important"): run Arc's own demo and switch the
// one prop on every copy of the component inside it; a demo that hides the component deeper falls back to the bare part
function inject(node: ReactNode, Target: unknown, over: Record<string, unknown>, hit: { n: number }): ReactNode {
  if (Array.isArray(node)) return node.map((x) => inject(x, Target, over, hit))
  if (!isValidElement(node)) return node
  const el = node as React.ReactElement<{ children?: ReactNode }>
  const kids = el.props.children
  const mine = el.type === Target ? (hit.n++, over) : {}
  return kids === undefined ? cloneElement(el, mine) : cloneElement(el, mine, ...Children.toArray(inject(kids, Target, over, hit) as ReactNode))
}
const withCache = new Map<string, ComponentType<{ over: Record<string, unknown>; sample?: string }>>()
function arcWith(p: ArcPart) {
  const key = `${p.demo}:${p.file}:${p.export}`
  let C = withCache.get(key)
  if (!C) {
    C = lazy(async () => {
      const [dm, cm] = await Promise.all([p.demo ? arcDemos[`../arc/${p.demo}`]?.() : undefined, arcFiles[`../arc/${p.file}`]?.()])
      const Demo = dm?.default as ((props: object) => ReactNode) | undefined
      const Found = cm?.[p.export ?? ""] as ComponentType<Record<string, unknown>> | undefined
      if (!Found) throw new Error("its component is not in the hub")
      const Target: ComponentType<Record<string, unknown>> = Found
      function Variant({ over, sample }: { over: Record<string, unknown>; sample?: string }) {
        const hit = { n: 0 }
        const tree = Demo ? inject(Demo({}), Target, over, hit) : null
        return hit.n ? <>{tree}</> : <Target {...over}>{sample}</Target>
      }
      return { default: Variant }
    })
    withCache.set(key, C)
  }
  return C
}

/** the Arc component itself with one prop set; a value it cannot draw on its own hides, and its parent lists it instead */
function ArcVariant({ C, props, sample, onBad }: { C: ComponentType<{ over: Record<string, unknown>; sample?: string }>; props: Record<string, unknown>; sample?: string; onBad: () => void }) {
  return (
    <Stage onBad={onBad}>
      <C over={props} sample={sample} />
    </Stage>
  )
}

/** a tile that removes itself when what it shows fails or draws nothing */
function AutoTile({ id, label, sub, arc, h, s, sample }: { id: string; label: string; sub?: string; arc?: boolean; h?: number; s: Show; sample?: string }) {
  const isBad = useBad()
  if (isBad(id)) return null
  return <Tile label={label} sub={sub} arc={arc} h={h}><Live s={s} sample={sample} onBad={(why) => markBad(id, why)} /></Tile>
}

/** the default or backup: never hidden; if it cannot draw alone it says so plainly */
function PickTile({ label, s, sample }: { label: string; s: Show; sample?: string }) {
  const [bad, setBad] = useState(false)
  return (
    <Tile label={label} arc={!!s?.arc} h={200}>
      {bad ? <span className="text-xs text-muted-foreground">Needs a SISO demo to show here (it takes data it was not given)</span> : <Live s={s} sample={sample} onBad={() => setBad(true)} />}
    </Tile>
  )
}

function StateTile({ b, C, sample }: { b: string; C: ComponentType<{ over: Record<string, unknown>; sample?: string }>; sample?: string }) {
  const [gone, setGone] = useState(false)
  if (gone) return null
  return <Tile label={b} arc h={110}><ArcVariant C={C} props={{ [b]: true }} sample={sample} onBad={() => setGone(true)} /></Tile>
}

function VariantRow({ C, v, sample }: { C: ComponentType<{ over: Record<string, unknown>; sample?: string }>; v: ArcPart["variants"][number]; sample?: string }) {
  const [gone, setGone] = useState<Set<string>>(new Set())
  const left = v.values.filter((x) => !gone.has(x))
  return (
    <div className="mb-3">
      <p className="mb-1.5 text-xs text-muted-foreground">
        <span className="font-mono text-foreground/90">{v.prop}</span> · {v.desc}
        {left.length < v.values.length && <span> · values: {v.values.map((x) => `"${x}"`).join(", ")} (some could not draw)</span>}
      </p>
      {left.length > 0 && (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {left.map((val) => (
            <Tile key={val} label={`${v.prop}="${val}"${val === v.default ? " · default" : ""}`} arc h={160}>
              <ArcVariant C={C} props={{ [v.prop]: val }} sample={sample} onBad={() => setGone((g) => new Set(g).add(val))} />
            </Tile>
          ))}
        </div>
      )}
    </div>
  )
}

function Notes({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null
  return (
    <div>
      <h4 className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{title}</h4>
      <ul className="space-y-1 text-[13px] leading-snug text-foreground/85">{items.map((x, i) => <li key={i}>· {x.replace(/^\|\s*|\s*\|$/g, "").replace(/\s*\|\s*/g, " — ").replace(/`/g, "")}</li>)}</ul>
    </div>
  )
}

function ArcSection({ p, sample, shown }: { p: ArcPart; sample?: string; shown: boolean }) {
  const [sibs, setSibs] = useState(false)
  const C = p.file && p.export ? arcWith(p) : null
  const states = p.booleans.filter((b) => STATES.includes(b))
  const n = p.variants.reduce((s, v) => s + v.values.length, 0) + states.length
  return (
    <article className="rounded-2xl border border-border/70 bg-card/40 p-4" id={`arc-${p.name}`}>
      <header className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-base font-medium">Arc · {p.title}</h3>
        <span className="text-xs text-muted-foreground">{p.about}</span>
        {p.install && <code className="ml-auto truncate rounded bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{p.install}</code>}
      </header>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        {shown ? <p className="self-center text-xs text-muted-foreground">Its demo is the SISO pick above.</p> : <Tile label="Arc's own demo" arc h={200}>{p.demo ? <Live s={{ arc: p.demo }} sample={sample} /> : <span className="text-xs text-muted-foreground">no demo</span>}</Tile>}
        <div className="space-y-3">
          <Notes title="Use it for" items={p.use} />
          <Notes title="Not for" items={p.avoid} />
        </div>
      </div>
      {C && n > 0 && (
        <div className="mt-4">
          <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Every variation ({n})</h4>
          {p.variants.map((v) => <VariantRow key={v.prop} C={C} v={v} sample={sample} />)}
          {states.length > 0 && (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
              {states.map((b) => <StateTile key={b} b={b} C={C} sample={sample} />)}
            </div>
          )}
        </div>
      )}
      {(p.keyboard.length > 0 || p.a11y.length > 0) && (
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">Keyboard and accessibility</summary>
          <div className="mt-2 grid gap-3 md:grid-cols-2"><Notes title="Keyboard" items={p.keyboard} /><Notes title="Accessibility" items={p.a11y} /></div>
        </details>
      )}
      {p.siblings.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center gap-3">
            <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Related in Arc ({p.siblings.length})</h4>
            <button onClick={() => setSibs(!sibs)} className="text-xs text-muted-foreground hover:text-foreground">{sibs ? "hide live" : "show them live"}</button>
          </div>
          {sibs ? (
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
              {p.siblings.map((s) => <Tile key={s.name} label={s.title} sub={s.about} arc h={160}>{s.demo ? <Live s={{ arc: s.demo }} /> : <span className="text-xs text-muted-foreground">no demo</span>}</Tile>)}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">{p.siblings.map((s) => <span key={s.name} title={s.about} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">{s.title}</span>)}</div>
          )}
        </div>
      )}
    </article>
  )
}

export default function KitAtom() {
  const { kind = "" } = useParams()
  const { marks, set } = useMarks()
  const top = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // the shell scrolls its main box, not the window: bring the new kind's top into view
    top.current?.scrollIntoView({ block: "start" })
  }, [kind])
  const LIST = KINDS.some((k) => k.kind === kind) ? KINDS : ASSETS
  const i = LIST.findIndex((k) => k.kind === kind)
  const k = LIST[i]
  if (!k) return <div className="p-10 text-sm text-muted-foreground">No atom kind "{kind}". <Link to="/kit/v1" className="underline">All atoms</Link></div>
  const sample = SAMPLE[k.kind]
  const prev = LIST[i - 1], next = LIST[i + 1]
  const id = `kit-v1/${LAYER}/${k.kind}`
  const signal = marks[id]?.off ? undefined : marks[id]?.signal
  const arc = ARC[k.kind] ?? []
  const isArc = (s: Show) => !!s?.arc
  return (
    <div key={kind} ref={top} className="mx-auto w-full max-w-[1300px] scroll-mt-20 px-6 pb-24 pt-6">
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          <Link to="/kit/v1" className="hover:text-foreground">{LIST === KINDS ? "Atoms" : "Assets"}</Link> · {k.node.split("/")[1]} · {i + 1} of {LIST.length}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{k.kind.replace(/-/g, " ")}</h1>
          <div className="flex items-center gap-1.5">
            {SIGNALS.map(([s, label, on]) => (
              <button key={s} onClick={() => set(id, s)} className={`rounded-full border px-3 py-1 text-xs ${signal === s ? on : "border-border text-muted-foreground hover:text-foreground"}`}>{label}</button>
            ))}
          </div>
          <div className="ml-auto flex gap-2 text-xs">
            {prev && <Link to={`/kit/atoms/${prev.kind}`} className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground"><ArrowLeft className="size-3" />{prev.kind}</Link>}
            {next && <Link to={`/kit/atoms/${next.kind}`} className="flex items-center gap-1 rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground">{next.kind}<ArrowRight className="size-3" /></Link>}
          </div>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{k.why}{k.note ? ` · ${k.note}` : ""}</p>
      </header>

      <section className="mb-10">
        <h2 className="mb-3 text-lg font-medium">The SISO pick</h2>
        <div className="grid gap-3 lg:grid-cols-2">
          <PickTile label={`Default · ${k.default}`} s={k.show.default} sample={sample} />
          {k.backup && <PickTile label={`Backup · ${k.backup}`} s={k.show.backup} sample={sample} />}
        </div>
        {k.variations?.length ? (
          <>
            <h3 className="mb-2 mt-5 text-sm font-medium">Variations we keep ({k.variations.length})</h3>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {k.variations.map((v) => <AutoTile key={v.ref} id={v.ref.replace(":", "/").split("#")[0]} label={v.ref} sub={v.why} arc={isArc(v.show)} h={170} s={v.show} sample={sample} />)}
            </div>
          </>
        ) : null}
      </section>

      {arc.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-1 text-lg font-medium">Arc: every part for this job, every variation</h2>
          <p className="mb-3 text-sm text-muted-foreground">Each variant value from Arc's API, rendered from its code, with Arc's own advice on when to use it.</p>
          <div className="space-y-4">{arc.map((p) => <ArcSection key={p.name} p={p} sample={sample} shown={[k.show.default, k.show.backup, ...(k.variations ?? []).map((v) => v.show)].some((x) => x?.arc && x.arc === p.demo)} />)}</div>
        </section>
      )}

      <section>
        <h2 className="mb-1 text-lg font-medium">Everything else we hold</h2>
        <Contenders k={k} initial={6} onPick={(x) => set(id, "swap", `make default: ${x}`)} />
      </section>
    </div>
  )
}
