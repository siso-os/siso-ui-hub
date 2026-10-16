// uihub: siso:page-kit-map
// The SISO kit map (Shaan, 14 Oct: "from first principles ... figure out all the different types we need, then curate").
// Every part we own filed once: by the frame it lives in (flow, page, shell, section, part, set), then family, then kind.
// One screen, no scrolling down (Shaan, 15 Oct: "not a wall of text ... a one page navigation ... maybe you can scroll
// horizontal"): the "which level is it" ladder is the way in, the frame's families are columns, and the kind under the
// pointer is read out along the foot. Built by bin/kit-map from the code reads.
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import map from "../../../catalogue/kit-map.slim.json"
import shells from "../../../catalogue/kit-shells.json"
import kitV1 from "../../../catalogue/kit-v1.json"
import { useFit } from "@/lib/fit"
import { cn } from "@/lib/utils"

type K = { kind: string; job: string; parts: number; libs: [string, number][]; arc: string[]; made_of?: string[] }
type Frame = { show: string; why: string; families: Record<string, K[]> }
const M = map as unknown as { levels: [string, string, string][]; total: number; filed: number; unfiled: number; tree: Record<string, Frame> }
const ORDER = M.levels.map(([f]) => f).filter((f) => M.tree[f])
const TITLE: Record<string, string> = { flow: "Flows", part: "Parts", shell: "Shells", section: "Sections", page: "Pages", set: "Sets" }
const SHOW: Record<string, string> = { storyboard: "a strip of screens", card: "a card at its own size", device: "a device frame", wide: "full width", screen: "full screen", grid: "a grid" }
const SHELLS = new Set(Object.keys(shells as Record<string, unknown>))
const ATOMS = new Set((kitV1 as unknown as { atoms: { kind: string }[]; assets?: { kind: string }[] }).atoms.map((a) => a.kind))
const words = (s: string) => s.replace(/-/g, " ")
const linkOf = (fid: string, k: K) =>
  fid === "shell" && (k.kind === "sidebar" || k.kind === "app-shell") ? "/kit/app-frame" : SHELLS.has(k.kind) ? `/kit/shells/${k.kind}` : ATOMS.has(k.kind) ? `/kit/atoms/${k.kind}` : `/kit?q=${encodeURIComponent(words(k.kind))}`
const kindsOf = (f: Frame) => Object.values(f.families).flat()
const ALL = Object.values(M.tree).flatMap(kindsOf)

export default function KitMap() {
  const [q, setQ] = useSearchParams()
  const fid = M.tree[q.get("f") ?? ""] ? q.get("f")! : "part"
  const frame = M.tree[fid]
  const [hot, setHot] = useState<K | null>(null)
  const [ref, h] = useFit<HTMLDivElement>()
  const max = Math.max(1, ...kindsOf(frame).map((k) => k.parts))
  // rows a family column holds before it wraps into a second column: what the board's height allows
  const rows = Math.max(5, Math.floor((h - 250) / 40))
  return (
    <div ref={ref} style={{ height: h }} className="flex min-h-0 flex-col" data-verify-kit-map>
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Kit map</h1>
        <span className="text-sm text-muted-foreground">
          {ALL.length} kinds · {M.filed.toLocaleString("en-GB")} of {M.total.toLocaleString("en-GB")} parts filed · {M.unfiled} not filed yet
        </span>
      </header>

      {/* the ladder: ask in order, the first yes is the frame */}
      <ol className="mt-4 grid shrink-0 grid-cols-6 gap-2" aria-label="Which level is it? Ask in this order; the first yes wins">
        {ORDER.map((f, i) => {
          const [, ask] = M.levels.find(([x]) => x === f)!
          const on = f === fid
          const n = kindsOf(M.tree[f]).length
          return (
            <li key={f} className="relative">
              <button
                onClick={() => setQ(f === "part" ? {} : { f }, { replace: true })}
                aria-pressed={on}
                className={cn("siso-press flex h-full w-full flex-col rounded-xl border px-3 py-2.5 text-left transition-colors duration-150", on ? "border-primary/60 bg-primary/10" : "border-border/60 bg-card/40 hover:border-foreground/25 hover:bg-card")}
              >
                <span className="flex items-baseline gap-1.5">
                  <span className="font-mono text-[11px] text-muted-foreground">{i + 1}</span>
                  <span className="font-medium">{TITLE[f]}</span>
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground tabular-nums">{n}</span>
                </span>
                <span className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">{ask}</span>
              </button>
              {i < ORDER.length - 1 && <span aria-hidden className="absolute top-1/2 -right-[7px] z-10 -translate-y-1/2 text-[10px] text-muted-foreground/70">›</span>}
            </li>
          )
        })}
      </ol>

      <p className="mt-3 shrink-0 text-xs text-muted-foreground">
        <span className="text-foreground/80">{TITLE[fid]}</span>: {frame.why}; each is looked at as {SHOW[frame.show] ?? frame.show}.
      </p>

      {/* the board: one column per family; a long family wraps into a second column */}
      <div className="mt-2 flex min-h-0 flex-1 gap-3 overflow-x-auto overflow-y-hidden pb-2" data-verify-board>
        {Object.entries(frame.families).map(([fam, ks]) => {
          const cols = Math.ceil(ks.length / rows)
          return (
            <section key={fam} className="flex shrink-0 flex-col rounded-xl border border-border/60 bg-card/40" style={{ width: cols * 216 }}>
              <h2 className="flex items-baseline gap-2 px-3 pt-2.5 pb-1.5 text-sm font-medium first-letter:uppercase">
                {words(fam)}
                <span className="ml-auto font-mono text-[11px] font-normal text-muted-foreground tabular-nums">
                  {ks.length} · {ks.reduce((s, k) => s + k.parts, 0).toLocaleString("en-GB")}
                </span>
              </h2>
              <ul className="grid gap-x-1 px-1.5 pb-2" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${Math.min(rows, ks.length)}, auto)`, gridAutoFlow: "column" }}>
                {ks.map((k) => (
                  <li key={k.kind}>
                    <Link
                      to={linkOf(fid, k)}
                      onMouseEnter={() => setHot(k)}
                      onFocus={() => setHot(k)}
                      className={cn("block rounded-lg px-2 py-1.5 transition-colors duration-100 hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06] focus-visible:outline-none", hot === k && "bg-foreground/[0.06]")}
                    >
                      <span className="flex items-baseline gap-1.5">
                        <span className="truncate text-[13px] first-letter:uppercase">{words(k.kind)}</span>
                        {k.arc.length > 0 && <span className="shrink-0 rounded bg-primary/10 px-1 font-mono text-[10px] text-primary/90">arc {k.arc.length}</span>}
                        <span className={cn("ml-auto shrink-0 font-mono text-[11px] tabular-nums", k.parts ? "text-muted-foreground" : "text-amber-400")}>{k.parts || "none"}</span>
                      </span>
                      <span className="mt-1 block h-[2px] rounded-full bg-border/70">
                        <span className="block h-full rounded-full bg-foreground/35" style={{ width: `${Math.max(k.parts ? 3 : 0, (k.parts / max) * 100)}%` }} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>

      {/* the foot reads out the kind under the pointer */}
      <footer className="flex h-11 shrink-0 items-center gap-3 overflow-hidden border-t border-border/60 pt-2 text-sm" aria-live="polite" data-verify-inspector>
        {hot ? (
          <>
            <span className="shrink-0 font-medium first-letter:uppercase">{words(hot.kind)}</span>
            <span className="shrink-0 text-muted-foreground">{hot.job}</span>
            {hot.made_of && hot.made_of.length > 0 && <span className="truncate text-xs text-muted-foreground">made of {hot.made_of.map(words).join(" · ")}</span>}
            {hot.arc.length > 0 && <span className="truncate font-mono text-[11px] text-primary/90">arc: {hot.arc.join(" · ")}</span>}
            <span className="ml-auto shrink-0 truncate font-mono text-[11px] text-muted-foreground">{hot.libs.slice(0, 4).map(([l, n]) => `${l} ${n}`).join(" · ") || "no parts yet"}</span>
          </>
        ) : (
          <span className="truncate text-xs text-muted-foreground">
            Point at a kind for its job, what it is made of and where its parts come from. One word can sit at three levels: "sign in" is a part (auth card), a page (auth page) and a flow (sign in → 2FA → forgot password).
          </span>
        )}
      </footer>
    </div>
  )
}
