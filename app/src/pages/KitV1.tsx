// uihub: siso:page-kit-v1
// The SISO kit v1 deck (Shaan, 14 Oct: "one default and one backup per kind ... Arc is the best components for pretty much all of these").
// One layer at a time: every kind shows its default and its backup live, and he marks it Keep, Swap (use the backup or another) or Drop.
// Marks go to the bookmarks store as kit-v1/<layer>/<kind>, so `uihub sync` and every agent read them; picks live in catalogue/kit-v1.json.
// The board comes first (Shaan, 15 Oct: "the all atoms card is shit ... let me just see all of the atoms"): one column
// per group, every atom live at its own size, a card opens the atom; the deck of rows to mark stays one click away.
import { useEffect, useMemo, useRef, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Contenders, KINDS, LAYER, Live, SAMPLE, SIGNALS, Side, useMarks, type Kind, type Mark } from "@/kitv1/live"
import { useFit } from "@/lib/fit"
import { cn } from "@/lib/utils"

const DOT: Record<string, string> = { keep: "bg-emerald-400", swap: "bg-amber-400", drop: "bg-rose-400" }
const words = (s: string) => s.replace(/^\w+\//, "").replace(/-/g, " ")

/** a part at its own size, or smaller only when it would not fit its card: nothing is cut off */
function Fit({ h, children }: { h: number; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [k, setK] = useState(1)
  useEffect(() => {
    const el = inner.current
    const b = box.current
    if (!el || !b) return
    // the part itself: the stage's box (it keeps a tall minimum while it waits) holds the drawn part as its child
    const f = () => {
      const c = el.firstElementChild?.firstElementChild as HTMLElement | null | undefined
      if (!c) return setK(1)
      const w = c.scrollWidth
      const hh = c.scrollHeight
      if (w && hh) setK(Math.max(0.45, Math.min(1, (b.clientWidth - 16) / w, (b.clientHeight - 12) / hh)))
      ro.observe(c)
    }
    const ro = new ResizeObserver(f)
    const mo = new MutationObserver(f)
    ro.observe(el)
    mo.observe(el, { childList: true, subtree: true })
    f()
    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [h])
  return (
    <div ref={box} style={{ height: h }} className="relative flex items-center justify-center overflow-hidden">
      <div ref={inner} className="w-[228px] shrink-0 origin-center" style={{ transform: k < 1 ? `scale(${k})` : undefined }}>
        {children}
      </div>
    </div>
  )
}

/** one atom, live; the card opens it (the part inside does not take clicks here) */
function AtomCard({ k, mark, h }: { k: Kind; mark?: Mark; h: number }) {
  const s = k.show.default
  const arc = !!s?.arc
  const signal = mark?.off ? undefined : mark?.signal
  return (
    <Link to={`/kit/atoms/${k.kind}`} className="group block shrink-0 overflow-hidden rounded-xl border border-border/60 bg-card/40 transition-colors duration-150 hover:border-foreground/30 focus-visible:border-primary focus-visible:outline-none" data-verify-atom-card={k.kind}>
      <div className={cn("pointer-events-none bg-background", arc && "arc-scope")} data-theme={arc ? "dark" : undefined} data-accent={arc ? "orange" : undefined} style={{ transform: "translateZ(0)" }} inert>
        <Fit h={h}><Live s={s} sample={SAMPLE[k.kind]} /></Fit>
      </div>
      <div className="flex items-center gap-1.5 border-t border-border/60 px-2.5 py-1.5">
        <span className="truncate text-[13px] first-letter:uppercase group-hover:text-foreground">{words(k.kind)}</span>
        {k.variations?.length ? <span className="font-mono text-[10px] text-muted-foreground">+{k.variations.length}</span> : null}
        <span className="ml-auto truncate font-mono text-[10px] text-muted-foreground/80">{k.default.split(":")[0]}</span>
        <span className={cn("size-1.5 shrink-0 rounded-full", signal ? DOT[signal] : "bg-border")} title={signal ? `marked ${signal}` : "not marked yet"} />
      </div>
    </Link>
  )
}

function Board({ groups, marks, id }: { groups: [string, Kind[]][]; marks: Record<string, Mark>; id: (k: Kind) => string }) {
  const [ref, h] = useFit<HTMLDivElement>(40, 420)
  // each group fills the window: a card's stage is its share of the column, less its name; short groups get roomy cards
  const stage = (n: number) => Math.max(56, Math.min(170, Math.floor((h - 36) / n) - 44))
  return (
    <div ref={ref} style={{ height: h }} className="flex min-h-0 gap-3 overflow-x-auto overflow-y-hidden pb-2" data-verify-atom-board>
      {groups.map(([n, ks]) => (
        <section key={n} id={n} className="flex w-[244px] shrink-0 flex-col gap-2">
          <h2 className="flex items-baseline gap-2 px-1 text-sm font-medium first-letter:uppercase">
            {words(n)}
            <span className="ml-auto font-mono text-[11px] font-normal text-muted-foreground">{ks.length}</span>
          </h2>
          {ks.map((k) => <AtomCard key={k.kind} k={k} mark={marks[id(k)]} h={stage(ks.length)} />)}
        </section>
      ))}
    </div>
  )
}


function KindRow({ k, mark, onMark }: { k: Kind; mark?: Mark; onMark: (signal: string, note?: string) => void }) {
  const [note, setNote] = useState(mark?.note ?? "")
  const signal = mark?.off ? undefined : mark?.signal
  return (
    <article className="rounded-2xl border border-border/70 bg-card/40 p-4" id={k.kind}>
      <header className="mb-3 flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium"><Link to={`/kit/atoms/${k.kind}`} className="hover:underline">{k.kind.replace(/-/g, " ")}</Link>{k.variations?.length ? <span className="ml-2 text-xs font-normal text-muted-foreground">+{k.variations.length} variations</span> : null}</h3>
          <p className="text-xs text-muted-foreground">{k.why}{k.note ? ` · ${k.note}` : ""}</p>
        </div>
        <div className="flex items-center gap-1.5">
          {SIGNALS.map(([s, label, on]) => (
            <button key={s} onClick={() => onMark(s)} className={`rounded-full border px-3 py-1 text-xs ${signal === s ? on : "border-border text-muted-foreground hover:text-foreground"}`}>{label}</button>
          ))}
          <Link to={`/kit?q=${encodeURIComponent(k.kind.replace(/-/g, " "))}`} className="ml-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">alternatives</Link>
        </div>
      </header>
      <div className="flex flex-col gap-3 lg:flex-row">
        <Side label="Default" ref_={k.default} s={k.show.default} sample={SAMPLE[k.kind]} />
        <Side label="Backup" ref_={k.backup} s={k.show.backup} sample={SAMPLE[k.kind]} />
      </div>
      <Contenders k={k} onPick={(id) => onMark("swap", `make default: ${id}`)} />
      {signal && signal !== "keep" && (
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onBlur={() => note !== (mark?.note ?? "") && onMark(signal, note)}
          placeholder={signal === "swap" ? "Swap to what? (the backup, or a name from alternatives)" : "Why drop it? (optional)"}
          className="mt-3 w-full rounded-lg border border-border bg-background px-3 py-1.5 text-xs"
        />
      )}
    </article>
  )
}

export default function KitV1() {
  const { marks, set, store } = useMarks()
  const [q, setQ] = useSearchParams()
  const deck = q.get("view") === "deck"
  const groups = useMemo(() => {
    const g = new Map<string, Kind[]>()
    for (const k of KINDS) g.set(k.node, [...(g.get(k.node) ?? []), k])
    return [...g]
  }, [])
  const id = (k: Kind) => `kit-v1/${LAYER}/${k.kind}`
  const marked = KINDS.filter((k) => marks[id(k)]?.signal && !marks[id(k)]?.off).length
  const arc = KINDS.filter((k) => k.default.startsWith("arc:")).length
  return (
    <div className={deck ? "pb-24" : ""}>
      <header className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Atoms</h1>
        <span className="text-sm text-muted-foreground">
          {KINDS.length} kinds in {groups.length} groups · Arc is the default for {arc} · {marked} of {KINDS.length} marked
        </span>
        <span className="ml-auto flex rounded-full border border-border/60 p-0.5 text-xs" role="group" aria-label="View">
          {[["board", "All, live"], ["deck", "Mark one by one"]].map(([v, label]) => (
            <button key={v} onClick={() => setQ(v === "board" ? {} : { view: v }, { replace: true })} aria-pressed={deck === (v === "deck")} className={cn("siso-press rounded-full px-3 py-1", deck === (v === "deck") ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground")}>
              {label}
            </button>
          ))}
        </span>
      </header>
      {!deck ? (
        <Board groups={groups} marks={marks} id={id} />
      ) : (
        <>
          <div className="sticky top-0 z-20 -mx-6 mb-6 flex flex-wrap items-center gap-2 border-b border-border/60 bg-background/90 px-6 py-2.5 backdrop-blur">
            <nav className="flex flex-wrap gap-1 text-xs">
              {groups.map(([n, ks]) => (
                <a key={n} href={`#${n}`} className="rounded-full border border-border px-2.5 py-1 text-muted-foreground hover:text-foreground">{n.split("/")[1]} <span className="opacity-60">{ks.length}</span></a>
              ))}
            </nav>
            <span className="ml-auto font-mono text-[11px] text-muted-foreground" data-kitv1-counts>{marked} of {KINDS.length} marked · saved to {store}</span>
          </div>
          {groups.map(([n, ks]) => (
            <section key={n} id={n} className="mb-10 scroll-mt-28">
              <h2 className="mb-3 text-lg font-medium">{n.split("/")[1].replace(/-/g, " ")}</h2>
              <div className="space-y-4">
                {ks.map((k) => <KindRow key={k.kind} k={k} mark={marks[id(k)]} onMark={(s, note) => set(id(k), s, note)} />)}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  )
}
