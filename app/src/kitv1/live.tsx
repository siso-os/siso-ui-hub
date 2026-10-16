// uihub: siso:kit-v1-live
// What the kit v1 deck and the atom pages share: rendering a pick live (Arc demo, kit file, icon set or local demo), the
// contenders list, and his marks (bookmarks store as kit-v1/<layer>/<kind>).
import "@/arc/foundation.scoped.css"
import { Suspense, lazy, useEffect, useRef, useState, type ComponentType } from "react"
import { Boundary, Rendered, WhenNear, pickExport } from "@/components/kit/live"
import { DEMOS } from "@/kitv1/demos"
import kit from "../../../catalogue/kit-v1.json"
import contenders from "../../../catalogue/kit-v1-contenders.json"

export type Show = { local?: string; arc?: string; kit?: string; file?: string; set?: [string, string][]; title?: string; missing?: string } | null
export type Variation = { ref: string; why: string; show: Show }
export type Kind = { node: string; kind: string; why: string; default: string; backup: string | null; note?: string; show: { default: Show; backup: Show }; variations?: Variation[] }
export type Mark = { signal?: string; note?: string; off?: boolean }

export const arcDemos = import.meta.glob("../arc/demos/*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
export const arcFiles = import.meta.glob("../arc/*/*.tsx") as Record<string, () => Promise<Record<string, unknown>>>
export const kitFiles = import.meta.glob(["../kit/**/*.tsx", "../kit/**/*.jsx"]) as Record<string, () => Promise<Record<string, unknown>>>
export const KINDS = (kit as unknown as { atoms: Kind[] }).atoms
export const LAYER = "atom"
export type Contender = { id: string; title: string; rating: number | null; score: number; pattern: string | null; why: string | null; look: string | null; states: string[] | null; file?: string; arc?: string; web: boolean }
export const CONTENDERS = contenders as unknown as Record<string, { parts: number; distinct: number; top: Contender[] }>
// parts the headless check found blank or broken on their own (bin/kit-v1-rendercheck writes it)
export const BAD = new Set(Object.values(import.meta.glob("../../../catalogue/kit-v1-render.json", { eager: true, import: "bad" }))[0] as string[] | undefined ?? [])
export const refId = (r: string | null) => (r ? r.replace(":", "/").split("#")[0] : "")

const cache = new Map<string, ComponentType<{ children?: React.ReactNode }>>()
export function lazyFrom(key: string, load: (() => Promise<Record<string, unknown>>) | undefined): ComponentType<{ children?: React.ReactNode }> {
  let C = cache.get(key)
  if (!C) {
    C = lazy(async () => {
      if (!load) throw new Error("its file is not in the hub")
      const E = pickExport(await load())
      if (!E) throw new Error("its file exports no component")
      return { default: E }
    })
    cache.set(key, C)
  }
  return C
}

// a bare component (no demo of its own) renders nothing without content: give it a line of sample text
export const SAMPLE: Record<string, string> = { button: "Save changes", badge: "New", chip: "Design", kbd: "⌘K", text: "Email address", link: "Read the docs", "link-preview": "Hover this link", tooltip: "Hover me", "inline-code": "npm install", "copy-button": "npm i siso", "hold-to-confirm": "Hold to delete", "button-group": "Action", toggle: "Bold", segmented: "Week", avatar: "AL", "status-dot": "Online" }

export function Live({ s, sample, onBad }: { s: Show; sample?: string; onBad?: (why: string) => void }) {
  if (!s) return <p className="text-xs text-muted-foreground">none yet</p>
  if (s.missing) return <p className="text-xs text-muted-foreground">{s.missing}</p>
  if (s.set)
    return (
      <div className="grid grid-cols-6 gap-3">
        {s.set.map(([id, file]) => {
          const C = lazyFrom(id, kitFiles[`../kit/${id.split("/")[0]}/${file}`])
          return <Stage key={id} onBad={onBad}><C>{sample}</C></Stage>
        })}
      </div>
    )
  const C = s.local ? DEMOS[s.local] : s.arc ? lazyFrom("arc:" + s.arc, arcDemos[`../arc/${s.arc}`]) : lazyFrom(s.kit!, kitFiles[`../kit/${s.kit!.split("/")[0]}/${s.file}`])
  if (!C) return <p className="text-xs text-muted-foreground">no demo</p>
  return <Stage onBad={onBad}>{s.local ? <C /> : <C>{sample}</C>}</Stage>
}

// parts that failed or drew nothing on their own, remembered in this browser so they stay out of the lists next time
const BAD_KEY = "kit-v1:bad"
const badStore: Record<string, string> = (() => { try { return JSON.parse(localStorage.getItem(BAD_KEY) || "{}") } catch { return {} } })()
const badSubs = new Set<() => void>()
export function markBad(id: string, why: string) {
  if (!id || badStore[id]) return
  badStore[id] = why
  localStorage.setItem(BAD_KEY, JSON.stringify(badStore))
  badSubs.forEach((f) => f())
}
export function useBad() {
  const [, tick] = useState(0)
  useEffect(() => {
    const f = () => tick((n) => n + 1)
    badSubs.add(f)
    return () => void badSubs.delete(f)
  }, [])
  return (id: string) => !!badStore[id] || BAD.has(id)
}

// true when a box drew nothing a person would see: no text, no picture or control, no painted block
function drewNothing(el: HTMLElement) {
  const r = el.getBoundingClientRect()
  if (r.height < 6 || r.width < 6) return true
  if (el.innerText.trim()) return false
  if (el.querySelector("svg,img,canvas,video,input,textarea,button,select,[role=slider],[role=progressbar],[role=switch]")) return false
  for (const c of Array.from(el.querySelectorAll<HTMLElement>("*")).slice(0, 300)) {
    const b = c.getBoundingClientRect()
    if (b.width < 4 || b.height < 4) continue
    const cs = getComputedStyle(c)
    if ((cs.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) || cs.backgroundImage !== "none" || parseFloat(cs.borderTopWidth) > 0 || cs.boxShadow !== "none") return false
  }
  return true
}

export function Stage({ children, onBad }: { children: React.ReactNode; onBad?: (why: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const shown = () => {
    if (!onBad) return
    setTimeout(() => ref.current && drewNothing(ref.current) && onBad("drew nothing"), 1800)
  }
  return (
    <WhenNear minH={140}>
      <Boundary onError={(e) => onBad?.(String(e?.message || e).slice(0, 120))}>
        <Suspense fallback={<span className="text-xs text-muted-foreground">loading…</span>}>
          <Rendered onShown={shown}><div ref={ref}>{children}</div></Rendered>
        </Suspense>
      </Boundary>
    </WhenNear>
  )
}

export function Side({ label, ref_, s, sample }: { label: string; ref_: string | null; s: Show; sample?: string }) {
  const arc = !!s?.arc
  return (
    <div className="min-w-0 flex-1 overflow-hidden rounded-xl border border-border/60">
      <div className={`relative flex min-h-[180px] items-center justify-center overflow-auto bg-background p-6 ${arc ? "arc-scope" : ""}`} data-theme={arc ? "dark" : undefined} data-accent={arc ? "orange" : undefined} style={{ transform: "translateZ(0)", maxHeight: 420 }}>
        <div className="w-full"><div className="flex justify-center"><Live s={s} sample={sample} /></div></div>
      </div>
      <div className="flex items-center gap-2 border-t border-border/60 px-3 py-2 font-mono text-[11px] text-muted-foreground">
        <span className={label === "Default" ? "text-foreground" : ""}>{label}</span>
        <span className="truncate">{ref_ ?? "none"}</span>
      </div>
    </div>
  )
}

export const SIGNALS = [
  ["keep", "Keep", "border-emerald-400/60 bg-emerald-400/15 text-emerald-300"],
  ["swap", "Swap", "border-amber-400/60 bg-amber-400/15 text-amber-300"],
  ["drop", "Drop", "border-rose-400/60 bg-rose-400/15 text-rose-300"],
] as const

export function useMarks() {
  const [marks, setMarks] = useState<Record<string, Mark>>(() => JSON.parse(localStorage.getItem("kit-v1:marks") || "{}"))
  const [store, setStore] = useState<"kv" | "this browser">("this browser")
  useEffect(() => {
    fetch("/api/bookmarks", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.items) return
        setStore("kv")
        const mine = Object.fromEntries(Object.entries(d.items as Record<string, Mark>).filter(([k, v]) => k.startsWith("kit-v1/") && !v.off))
        setMarks((m) => ({ ...m, ...mine }))
      })
      .catch(() => {})
  }, [])
  useEffect(() => localStorage.setItem("kit-v1:marks", JSON.stringify(marks)), [marks])
  const set = (id: string, signal: string, note?: string) => {
    const off = marks[id]?.signal === signal && note === undefined
    setMarks((m) => ({ ...m, [id]: off ? { off: true } : { signal, note: note ?? m[id]?.note } }))
    fetch("/api/bookmarks", { method: "POST", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify(off ? { id, on: false } : { id, signal, note: note ?? marks[id]?.note }) }).catch(() => {})
  }
  return { marks, set, store }
}

export function Contenders({ k, onPick, initial = 0 }: { k: Kind; onPick: (id: string) => void; initial?: number }) {
  const c = CONTENDERS[k.kind]
  const [open, setOpen] = useState(initial)
  const isBad = useBad()
  if (!c) return null
  const taken = new Set([refId(k.default), refId(k.backup), ...(k.variations ?? []).map((v) => refId(v.ref))])
  const all = c.top.filter((x) => !taken.has(x.id) && !isBad(x.id) && x.web !== false)
  const top = all.slice(0, open)
  if (!open)
    return (
      <button onClick={() => setOpen(6)} className="mt-3 text-xs text-muted-foreground hover:text-foreground">
        Show the best {Math.min(6, all.length)} of the other {c.distinct} parts for this kind →
      </button>
    )
  return (
    <div className="mt-3">
      <p className="mb-2 text-xs text-muted-foreground">
        Best of the other {c.distinct} distinct parts we hold for this kind ({c.parts} with copies), ranked from a read of their code
      </p>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {top.map((x) => {
          const s: Show = x.arc ? { arc: x.arc } : { kit: x.id, file: x.file }
          return (
            <div key={x.id} className="overflow-hidden rounded-lg border border-border/50">
              <div className={`flex min-h-[120px] items-center justify-center overflow-auto bg-background p-3 ${x.arc ? "arc-scope" : ""}`} data-theme={x.arc ? "dark" : undefined} data-accent={x.arc ? "orange" : undefined} style={{ transform: "translateZ(0)", maxHeight: 260 }}>
                <div className="w-full"><div className="flex justify-center"><Live s={s} sample={SAMPLE[k.kind]} onBad={(why) => markBad(x.id, why)} /></div></div>
              </div>
              <div className="border-t border-border/50 px-2.5 py-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="truncate font-mono text-muted-foreground">{x.id}</span>
                  <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">{x.rating ?? "?"}/5</span>
                  <button onClick={() => onPick(x.id)} className="shrink-0 rounded-full border border-border px-2 py-0.5 text-muted-foreground hover:text-foreground">make default</button>
                </div>
                {x.pattern && <p className="mt-0.5 line-clamp-2 text-muted-foreground">{x.pattern}{x.why ? ` · ${x.why}` : ""}</p>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex gap-3 text-xs text-muted-foreground">{all.length > open && <button onClick={() => setOpen(open + 6)} className="hover:text-foreground">show 6 more</button>}<button onClick={() => setOpen(0)} className="hover:text-foreground">close</button></div>
    </div>
  )
}
