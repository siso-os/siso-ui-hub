// uihub: siso:type-city
// The 3D top band on Home (Shaan, 11 Oct: "the top set doesn't kind of have like a 3d like look on our landing page ...
// some sort of animation ... which shows all the categories and stuff ... and it contains that whole box and allows us to
// search through"). Every type the libraries share, as a city on one glass slab:
// - the slab is the SISO landing page's UiHubIcon (an isometric glass slab, rotateX(56deg) rotateZ(-45deg), no perspective,
//   its thickness drawn with stacked shadows, a turning rim and a sweep of light), scaled up and in the hub's indigo;
// - one tower per type, grouped in districts by what the type does; a tower's height is how many parts exist, its colour
//   is SISO's status (green: a SISO base is chosen; amber: candidates rated 4+ wait to be decided; red: nothing good yet);
// - the search sits in the band: as you type, the towers that match rise and glow and the rest go dark; idle, a seeker
//   walks the tallest towers and pins each one, so the box is visibly searching through itself.
// The towers are one flat SVG on the slab's face, extruded by hand (top moved back-and-up, two side faces) and drawn back to
// front, so nothing depends on the browser sorting 3D planes. The pins are plain HTML over it, placed by the same projection.
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Link, useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { catLink, fmtInt, groupLabel, useIndex, type Index, type Row } from "@/lib/data"
import { SearchDeck } from "./SearchDeck"
import { PickDeck, typeSlot } from "./PickDeck"
import { useBookmarks } from "@/lib/bookmarks"

type Status = "base" | "cand" | "miss"
interface Tower {
  pat: string
  n: number
  libs: number
  g: string
  c: string
  st: Status
  rows: Row[]
  // placed on the slab (plane px): x, y, size, lift
  x: number
  y: number
  s: number
  d: number
}
type Scope = "core" | "common"
const SCOPES: Record<Scope, { min: number; label: string; maxD: number }> = {
  core: { min: 25, label: "core, made by 25+ libraries", maxD: 34 },
  common: { min: 5, label: "made by 5+ libraries", maxD: 22 },
}

// the slab, in plane px, and the canvas it is drawn in (screen px at scale 1)
const P = 500
const CW = 780
const CH = 548
const SX = CW / 2
const SY = 322
const C45 = Math.SQRT1_2
const TILT = Math.cos((56 * Math.PI) / 180)
/** a point on the slab (plane px) to the canvas: rotateZ(-45deg), then rotateX(56deg) flattens y */
const project = (px: number, py: number) => {
  const u = px - P / 2
  const v = py - P / 2
  return { x: SX + C45 * (u + v), y: SY + TILT * C45 * (v - u) }
}

const SHADES: Record<Status, { top: string; left: string; right: string; glow: string }> = {
  base: { top: "#6ee7b7", left: "#10b981", right: "#047857", glow: "#34d399" },
  cand: { top: "#fcd34d", left: "#f59e0b", right: "#b45309", glow: "#fbbf24" },
  miss: { top: "#fca5a5", left: "#ef4444", right: "#991b1b", glow: "#f87171" },
}
const DIM = { top: "#2a2f52", left: "#1c2040", right: "#12152c" }
const best = (a: Row, b: Row) => Number(!!b.p) - Number(!!a.p) || (b.rt || 0) - (a.rt || 0) || b._r - a._r

/** every type with its parts, libraries, main group and category, and SISO's status for it */
/** bases: the parts taken as a SISO base on /siso (bookmarks siso/base/<category>) */
function typesOf(idx: Index, bases: Set<string>) {
  const m = new Map<
    string,
    {
      rows: Row[]
      libs: Set<string>
      g: Map<string, number>
      c: Map<string, number>
    }
  >()
  for (const r of idx.items) {
    if (!r.pat || r.cp) continue
    let e = m.get(r.pat)
    if (!e) m.set(r.pat, (e = { rows: [], libs: new Set(), g: new Map(), c: new Map() }))
    e.rows.push(r)
    e.libs.add(r.s)
    e.g.set(r.g || "other", (e.g.get(r.g || "other") || 0) + 1)
    if (r.c) e.c.set(r.c, (e.c.get(r.c) || 0) + 1)
  }
  const top = (mm: Map<string, number>) => [...mm.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || ""
  return [...m.entries()].map(([pat, e]) => {
    const st: Status = e.rows.some((r) => bases.has(r.id) || r.st === "picked" || r.st === "curated") ? "base" : e.rows.some((r) => (r.rt || 0) >= 4) ? "cand" : "miss"
    return {
      pat,
      n: e.rows.length,
      libs: e.libs.size,
      g: top(e.g),
      c: top(e.c),
      st,
      rows: e.rows,
    }
  })
}

/** districts by group, biggest first, packed in shelves from the back corner (top right of the plane) */
function layout(
  types: Omit<Tower, "x" | "y" | "s" | "d">[],
  maxD: number,
): {
  towers: Tower[]
  districts: { g: string; x: number; y: number; w: number; h: number }[]
} {
  const groups = new Map<string, typeof types>()
  for (const t of types) groups.set(t.g, [...(groups.get(t.g) || []), t])
  const ds = [...groups.entries()].map(([g, l]) => ({ g, l: l.sort((a, b) => b.n - a.n) })).sort((a, b) => b.l.length - a.l.length)
  const pad = 30
  const room = P - pad * 2
  // the largest pitch at which every district fits
  for (let pitch = 30; pitch > 6; pitch -= 0.5) {
    const cols = Math.floor(room / pitch)
    const placed: {
      g: string
      l: typeof types
      cx: number
      cy: number
      bw: number
      bh: number
    }[] = []
    let shelfY = 0
    let shelfH = 0
    let used = 0
    let ok = true
    for (const d of ds) {
      const bw = Math.min(cols, Math.ceil(Math.sqrt(d.l.length * 1.2)))
      const bh = Math.ceil(d.l.length / bw)
      if (used + bw > cols) {
        shelfY += shelfH + 1
        shelfH = 0
        used = 0
      }
      placed.push({ g: d.g, l: d.l, cx: cols - used - bw, cy: shelfY, bw, bh })
      used += bw + 1
      shelfH = Math.max(shelfH, bh)
      if (shelfY + bh > cols) ok = false
    }
    if (!ok) continue
    const rows = shelfY + shelfH
    const off = (room - rows * pitch) / 2
    const s = pitch * 0.74
    const nMin = Math.min(...types.map((t) => t.n))
    const nMax = Math.max(...types.map((t) => t.n))
    const lift = (n: number) => 3 + (maxD - 3) * (Math.log(n / nMin) / Math.log(Math.max(nMax / nMin, 1.0001)))
    const towers: Tower[] = []
    const districts = []
    for (const b of placed) {
      // the tallest towers at the back of their district: rows from the back, columns from the right
      b.l.forEach((t, i) => {
        const col = b.bw - 1 - (i % b.bw)
        const row = Math.floor(i / b.bw)
        towers.push({
          ...t,
          x: pad + (b.cx + col) * pitch,
          y: pad + off + (b.cy + row) * pitch,
          s,
          d: lift(t.n) * (pitch / 22) ** 0.5,
        })
      })
      districts.push({
        g: b.g,
        x: pad + b.cx * pitch,
        y: pad + off + b.cy * pitch,
        w: b.bw * pitch - (pitch - s),
        h: b.bh * pitch - (pitch - s),
      })
    }
    // painter's order: the back corner first
    towers.sort((a, b) => a.y - a.x - (b.y - b.x))
    return { towers, districts }
  }
  return { towers: [], districts: [] }
}

const CSS = `
@property --tc-ang{syntax:'<angle>';inherits:false;initial-value:0deg}
.tc-floor{position:absolute;left:50%;top:${SY + 40}px;width:${P * 1.5}px;height:${P * 0.5}px;margin:-${P * 0.25}px 0 0 -${P * 0.75}px;border-radius:50%;
  background:radial-gradient(closest-side,rgb(var(--app-rgb)) 0%,rgb(var(--app-rgb) / .4) 45%,transparent 100%);filter:blur(30px);opacity:.42;animation:tc-breathe 6s ease-in-out infinite}
.tc-iso{position:absolute;left:${SX - P / 2}px;top:${SY - P / 2}px;width:${P}px;height:${P}px;transform:rotateX(56deg) rotateZ(-45deg);transform-style:preserve-3d}
.tc-slab{position:absolute;inset:0;border-radius:44px;background:#0a0d29;
  box-shadow:-1px 1px 0 #a5b4ff,-2px 2px 0 #7f8cff,-3px 3px 0 #6d7cff,-4px 4px 0 #5f6de6,-5px 5px 0 #5160cc,-6px 6px 0 #4553b3,-7px 7px 0 #3b479b,
    -8px 8px 0 #333e87,-9px 9px 0 #2c3575,-10px 10px 0 #262e66,-11px 11px 0 #212859,-12px 12px 0 #1d234d,-13px 13px 0 #191f43,-14px 14px 0 #161b3a,
    -15px 15px 0 #131732,-16px 16px 0 #10142b,-17px 17px 0 #0e1125,-18px 18px 0 #0c0f20,-30px 30px 60px #000,-50px 50px 110px rgb(var(--app-rgb) / .3)}
.tc-face{position:absolute;inset:0;border-radius:44px;overflow:hidden;
  background:radial-gradient(55% 55% at 55% 45%,rgb(var(--app-rgb) / .32),transparent 72%),linear-gradient(135deg,#171c55 0%,#10143f 30%,#0a0d2b 64%,#05061a 100%);
  box-shadow:inset 0 0 0 1px rgb(165 180 255 / .28),inset 16px -16px 40px #ffffff0d,inset -16px 16px 44px #00000099}
.tc-face::before{content:'';position:absolute;inset:16px;border-radius:32px;
  background:linear-gradient(rgb(165 180 255 / .07) 1px,transparent 1px) 0 0/20px 20px,linear-gradient(90deg,rgb(165 180 255 / .07) 1px,transparent 1px) 0 0/20px 20px;
  -webkit-mask:radial-gradient(closest-side,#000 55%,transparent);mask:radial-gradient(closest-side,#000 55%,transparent)}
.tc-sweep{position:absolute;inset:-60%;pointer-events:none;background:linear-gradient(115deg,transparent 44%,#ffffff0d 48%,#ffffff24 50%,transparent 56%);animation:tc-sweep 8s cubic-bezier(.45,0,.2,1) infinite}
.tc-rim{position:absolute;inset:-2px;border-radius:46px;padding:2px;pointer-events:none;
  background:conic-gradient(from var(--tc-ang),rgb(var(--app-rgb)),#c7d0ff 12%,var(--app-second) 24%,transparent 40%,transparent 58%,rgb(var(--app-rgb)) 78%,#eef1ff 88%,rgb(var(--app-rgb)));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:tc-ang 7s linear infinite}
.tc-band[data-q] .tc-rim{animation-duration:2.2s}
.tc-city{position:absolute;inset:0;overflow:visible}
.tc-t{transition:transform .55s cubic-bezier(.19,1,.22,1);cursor:pointer}
.tc-t polygon,.tc-t rect{transition:fill .45s ease}
.tc-t.is-up{transform:translate(var(--up),calc(var(--up) * -1))}
.tc-t.is-hot .tc-top{filter:drop-shadow(0 0 5px var(--glow))}
.tc-ring{position:absolute;left:50%;top:50%;width:60px;height:60px;margin:-30px;border-radius:50%;box-shadow:0 0 0 2px rgb(var(--app-rgb) / .9);opacity:0;animation:tc-ring 1.1s ease-out}
.tc-pin{position:absolute;transform:translate(-50%,-100%);pointer-events:none;animation:tc-pin .45s cubic-bezier(.19,1,.22,1) both}
.tc-pin i{display:block;width:1px;height:34px;margin:0 auto;background:linear-gradient(#fff,transparent)}
.tc-band:not([data-live]) *{animation-play-state:paused!important}
@keyframes tc-ang{to{--tc-ang:360deg}}
@keyframes tc-breathe{0%,100%{opacity:.36}50%{opacity:.52}}
@keyframes tc-sweep{0%,30%{transform:translateX(-40%)}70%,100%{transform:translateX(40%)}}
@keyframes tc-ring{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(7)}}
@keyframes tc-pin{from{opacity:0;transform:translate(-50%,-80%)}to{opacity:1;transform:translate(-50%,-100%)}}
@media (prefers-reduced-motion:reduce){.tc-band *{animation:none!important;transition:none!important}}
`

function Pin({ t, strong }: { t: Tower; strong?: boolean }) {
  const p = project(t.x + t.s / 2 + t.d + 7, t.y + t.s / 2 - t.d - 7)
  return (
    <div className="tc-pin" style={{ left: p.x, top: p.y }}>
      <div
        className={cn(
          "rounded-full border px-2.5 py-1 text-[11.5px] whitespace-nowrap backdrop-blur-md",
          strong ? "border-white/30 bg-black/70 text-white" : "border-white/15 bg-black/55 text-white/85",
        )}
      >
        <span className="inline-block font-medium first-letter:uppercase">{t.pat}</span>
        <span className="ml-1.5 font-mono text-[10.5px] text-white/60 tabular-nums">{fmtInt(t.n)}</span>
      </div>
      <i />
    </div>
  )
}

/** a line up from the focused tower's top, ending in a dot the card hangs from */
function FocusStem({ t }: { t: Tower }) {
  const p = project(t.x + t.s / 2 + t.d + 9, t.y + t.s / 2 - t.d - 9)
  return (
    <div className="tc-pin" style={{ left: p.x, top: p.y }} key={t.pat}>
      <span className="mx-auto block size-2 rounded-full bg-white shadow-[0_0_10px_2px_rgb(var(--app-rgb))]" />
      <i />
    </div>
  )
}

/** the focused tower's card, beside its pin on the canvas (wide screens); flips left near the right edge */
// the card sits in the empty top corner on the tower's side of the slab, joined to the tower's dot by a hairline
const CARD_W = 300
function Beside({ t, children, onEnter, onLeave }: { t: Tower; children: React.ReactNode; onEnter: () => void; onLeave: () => void }) {
  const p = project(t.x + t.s / 2 + t.d + 9, t.y + t.s / 2 - t.d - 9)
  const right = p.x > SX
  const left = right ? CW - CARD_W - 8 : 8
  const top = 8
  // the dot is 34px above the tower top (the stem); the line runs from it to the card's nearer bottom corner
  const dot = { x: p.x, y: p.y - 38 }
  const corner = { x: right ? left + 24 : left + CARD_W - 24, y: top + 150 }
  return (
    <>
      <svg className="pointer-events-none absolute inset-0 z-[9] overflow-visible" width={CW} height={CH} aria-hidden>
        <line x1={dot.x} y1={dot.y} x2={corner.x} y2={corner.y} stroke="rgb(199 208 255 / .45)" strokeWidth={1} strokeDasharray="3 4" />
      </svg>
      <div className="absolute z-10 transition-[left] duration-500 ease-out" style={{ left, top, width: CARD_W }} onPointerEnter={onEnter} onPointerLeave={onLeave}>
        {children}
      </div>
    </>
  )
}

export function TypeCity() {
  const idx = useIndex()!
  const go = useNavigate()
  const [scope, setScope] = useState<Scope>("core")
  const [q, setQ] = useState("")
  const [hover, setHover] = useState<string | null>(null)
  const [seek, setSeek] = useState(0)
  const [live, setLive] = useState(true)
  const [scale, setScale] = useState(1)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  // leaving a tower clears it a beat later, so the pointer can cross to its card
  const away = useRef<ReturnType<typeof setTimeout>>(undefined)
  const enter = (pat: string) => {
    clearTimeout(away.current)
    setHover(pat)
  }
  const leave = () => {
    clearTimeout(away.current)
    away.current = setTimeout(() => setHover(null), 260)
  }
  const band = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  const { items: marks } = useBookmarks()
  const bases = useMemo(() => new Set(Object.entries(marks).filter(([k, m]) => k.startsWith("siso/base/") && !m.off && m.note).map(([, m]) => m.note!)), [marks])
  const all = useMemo(() => typesOf(idx, bases), [idx, bases])
  const funnel = useMemo(() => {
    const libs = new Set(idx.items.map((r) => r.s)).size
    const typed = idx.items.filter((r) => r.pat && !r.cp).length
    return {
      parts: idx.items.length,
      libs,
      typed,
      types: all.length,
      common: all.filter((t) => t.libs >= 5).length,
      core: all.filter((t) => t.libs >= 25).length,
    }
  }, [idx, all])
  const { towers, districts } = useMemo(
    () =>
      layout(
        all.filter((t) => t.libs >= SCOPES[scope].min),
        SCOPES[scope].maxD,
      ),
    [all, scope],
  )
  const byPat = useMemo(() => new Map(towers.map((t) => [t.pat, t])), [towers])
  const counts = useMemo(
    () => ({
      base: towers.filter((t) => t.st === "base").length,
      cand: towers.filter((t) => t.st === "cand").length,
      miss: towers.filter((t) => t.st === "miss").length,
    }),
    [towers],
  )

  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  const matched = useMemo(() => {
    if (!words.length) return null
    return new Set(towers.filter((t) => words.every((w) => `${t.pat} ${groupLabel(t.g)} ${t.g}`.toLowerCase().includes(w))).map((t) => t.pat))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [towers, q])
  const ranked = useMemo(() => (matched ? towers.filter((t) => matched.has(t.pat)).sort((a, b) => b.n - a.n) : []), [towers, matched])
  // the seeker walks the tallest towers, in an order that jumps across the slab
  const walk = useMemo(() => {
    const top = towers
      .slice()
      .sort((a, b) => b.n - a.n)
      .slice(0, 48)
    return top.map((_, i) => top[(i * 17) % top.length])
  }, [towers])

  useEffect(() => {
    const el = band.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting && document.visibilityState === "visible"))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!live || hover || matched || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const t = setInterval(() => setSeek((n) => n + 1), 2400)
    return () => clearInterval(t)
  }, [live, hover, matched])
  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1.08, e.contentRect.width / CW)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const seeking = !hover && !matched && walk.length ? walk[seek % walk.length] : null
  const focus = (hover && byPat.get(hover)) || (matched ? ranked[0] : seeking) || null
  // the focused tower carries the card; on a search the next three tallest matches get a pin
  const pins = useMemo(() => {
    const out: Tower[] = []
    const at = (t: Tower) => project(t.x + t.d, t.y - t.d)
    for (const t of ranked.slice(1)) {
      const a = at(t)
      if ([ranked[0], ...out].every((o) => Math.abs(at(o).x - a.x) > 150 || Math.abs(at(o).y - a.y) > 36)) out.push(t)
      if (out.length === 3) break
    }
    return out
  }, [ranked])
  const open = (t: Tower) => go(`${catLink(idx, t.c)}?type=${encodeURIComponent(t.pat)}`)
  // a tower opens the pick deck on its type (Shaan, 12 Oct: "how do we do that 3D top thing to help like go through it
  // easier"); ↑ ↓ in the deck walks the towers, tallest first (the matches when searching). His build only: picks are his
  const [deck, setDeck] = useState<number | null>(null)
  const deckTowers = matched ? ranked : walk
  const slots = useMemo(() => (deck === null ? [] : deckTowers.map((t) => typeSlot(t.pat, t.rows, (k) => idx.onto.byKey.get(k)?.name))), [deck, deckTowers, idx])
  const pick = (t: Tower) => {
    const i = deckTowers.indexOf(t)
    if (idx.public || i < 0) return open(t)
    setDeck(i)
  }

  const steps: { n: number; label: string; scope?: Scope }[] = [
    { n: funnel.parts, label: `parts from ${fmtInt(funnel.libs)} libraries` },
    { n: funnel.typed, label: "read and typed so far" },
    { n: funnel.types, label: "types of part" },
    { n: funnel.common, label: "made by 5+ libraries", scope: "common" },
    { n: funnel.core, label: "core, made by 25+", scope: "core" },
    { n: counts.base, label: "with a SISO base chosen" },
  ]
  const maxLog = Math.log10(funnel.parts)

  return (
    <section ref={band} className="tc-band dark relative mb-8 rounded-[26px] text-white" data-live={live || undefined} data-q={matched ? "" : undefined} data-verify-type-city={towers.length}>
      <style>{CSS}</style>
      {deck !== null && createPortal(<PickDeck slots={slots} start={deck} onClose={() => setDeck(null)} />, document.body)}
      {/* the stage: night, a wash of the hub's colour, a faint floor grid */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[26px] bg-[#05060f] ring-1 ring-white/10" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_72%_62%,rgb(var(--app-rgb)/0.28),transparent_70%),radial-gradient(600px_300px_at_10%_0%,rgb(56_189_248/0.10),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.35] [background:linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px)_0_0/32px_32px,linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)_0_0/32px_32px] [mask:radial-gradient(70%_80%_at_70%_60%,#000,transparent)]" />
      </div>

      <div className="relative grid gap-5 p-5 lg:grid-cols-[minmax(300px,400px)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:p-8">
        <div className="relative z-20 flex min-w-0 flex-col gap-5 max-lg:order-1 lg:col-start-1 lg:row-start-1">
          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-white/55 uppercase">SISO UI Hub</p>
            <h1 className="mt-2 text-[28px] leading-[1.08] font-semibold tracking-[-0.03em] lg:text-[34px]">
              Every UI part out there, <span className="bg-gradient-to-r from-[#c7d0ff] to-[#38bdf8] bg-clip-text text-transparent">in one box.</span>
            </h1>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/60">
              Each tower is a type of part every serious library makes. Its height is how many exist; its colour is where SISO stands on it.
            </p>
          </div>
          <SearchDeck narrow onQuery={setQ} />
        </div>
        <ol className="relative z-10 space-y-1 max-lg:order-3 lg:col-start-1 lg:row-start-2" aria-label="The funnel">
          {steps.map((s, i) => {
            const on = s.scope === scope
            const w = `${Math.max(6, (Math.log10(Math.max(s.n, 1)) / maxLog) * 100)}%`
            const body = (
              <>
                <span
                  className={cn("absolute inset-y-0 left-0 rounded-[8px]", on ? "bg-[rgb(var(--app-rgb)/0.35)]" : i === steps.length - 1 ? "bg-emerald-400/15" : "bg-white/[0.06]")}
                  style={{ width: w }}
                />
                <span className={cn("relative w-[74px] shrink-0 text-right font-mono text-[15px] font-semibold tabular-nums", i === steps.length - 1 && "text-emerald-300")}>{fmtInt(s.n)}</span>
                <span className="relative min-w-0 flex-1 truncate text-[12.5px] text-white/70">{s.label}</span>
                {s.scope && <span className={cn("relative text-[10.5px]", on ? "text-white" : "text-white/40")}>{on ? "shown" : "show"}</span>}
              </>
            )
            const cls = "relative flex h-8 w-full items-center gap-3 overflow-hidden rounded-[8px] px-2 text-left"
            return (
              <li key={s.label}>
                {s.scope ? (
                  <button type="button" onClick={() => setScope(s.scope!)} aria-pressed={on} className={cn(cls, "transition-colors hover:bg-white/[0.05]")} data-verify-scope={s.scope}>
                    {body}
                  </button>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            )
          })}
        </ol>

        <div className="relative min-w-0 max-lg:order-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div ref={stage} className="relative w-full" style={{ height: CH * scale }}>
            <div
              className="absolute top-0 left-1/2 transition-transform duration-700 ease-out motion-reduce:transition-none"
              style={{
                width: CW,
                height: CH,
                marginLeft: -CW / 2,
                transform: `scale(${scale}) perspective(1600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transformOrigin: "50% 0",
              }}
              onPointerMove={(e) => {
                if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
                const r = e.currentTarget.getBoundingClientRect()
                setTilt({
                  x: ((e.clientX - r.left) / r.width - 0.5) * 5,
                  y: -((e.clientY - r.top) / r.height - 0.5) * 4,
                })
              }}
              onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div className="tc-floor" />
              <div className="tc-iso">
                <div className="tc-slab" />
                <div className="tc-face">
                  <div className="tc-sweep" />
                  {matched && <span key={q} className="tc-ring" />}
                </div>
                <svg className="tc-city" viewBox={`0 0 ${P} ${P}`} width={P} height={P} onPointerLeave={leave} role="img" aria-label={`${towers.length} types as towers`}>
                  {districts.map((d) => (
                    <text
                      key={d.g}
                      x={d.x}
                      y={d.y + d.h + 11}
                      fontSize={8.5}
                      fill="rgb(199 208 255 / .55)"
                      style={{
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {groupLabel(d.g)}
                    </text>
                  ))}
                  {towers.map((t) => {
                    const dim = matched && !matched.has(t.pat)
                    const up = (matched && !dim) || t === focus
                    const c = dim ? DIM : SHADES[t.st]
                    const { x, y, s, d } = t
                    return (
                      <g
                        key={t.pat}
                        className={cn("tc-t", up && "is-up", (t === focus || (matched && !dim)) && "is-hot")}
                        style={{
                          ["--up" as string]: `${t === focus ? 9 : 5}px`,
                          ["--glow" as string]: SHADES[t.st].glow,
                        }}
                        onPointerEnter={() => enter(t.pat)}
                        onClick={() => pick(t)}
                      >
                        <title>{`${t.pat}: ${t.n} parts from ${t.libs} libraries`}</title>
                        <rect x={x - 3} y={y + 3} width={s} height={s} rx={2} fill="#000" opacity={0.35} />
                        <polygon points={`${x},${y} ${x},${y + s} ${x + d},${y + s - d} ${x + d},${y - d}`} fill={c.left} />
                        <polygon points={`${x},${y + s} ${x + s},${y + s} ${x + s + d},${y + s - d} ${x + d},${y + s - d}`} fill={c.right} />
                        <rect className="tc-top" x={x + d} y={y - d} width={s} height={s} rx={1.5} fill={c.top} />
                      </g>
                    )
                  })}
                </svg>
                <div className="tc-rim" />
              </div>
              {pins.map((t) => (
                <Pin key={`${t.pat}-q`} t={t} />
              ))}
              {focus && (
                <>
                  <FocusStem t={focus} />
                  <div className="hidden lg:block">
                    <Beside t={focus} onEnter={() => clearTimeout(away.current)} onLeave={leave}>
                      <Readout idx={idx} t={focus} q={matched ? q : ""} hits={ranked.length} onOpen={open} onPick={idx.public ? undefined : pick} />
                    </Beside>
                  </div>
                </>
              )}
              {matched && !focus && (
                <div className="absolute top-4 right-4 hidden w-[268px] lg:block">
                  <Readout idx={idx} t={null} q={q} hits={0} onOpen={open} onPick={idx.public ? undefined : pick} />
                </div>
              )}
            </div>
          </div>

          {/* what the pointer, the seeker or the search is on */}
          {/* phones and tablets: the card sits under the city */}
          <div className="relative z-10 mt-1 lg:hidden">
            <Readout idx={idx} t={focus} q={matched ? q : ""} hits={ranked.length} onOpen={open} onPick={idx.public ? undefined : pick} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-white/60 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0">
            {(
              [
                ["base", "SISO base chosen", counts.base],
                ["cand", "candidates to decide", counts.cand],
                ["miss", "nothing good yet", counts.miss],
              ] as const
            ).map(([k, l, n]) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-[3px]" style={{ background: SHADES[k].top }} />
                {l} <span className="font-mono tabular-nums text-white/85">{fmtInt(n)}</span>
              </span>
            ))}
            <span className="text-white/40">height: how many exist</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Readout({ idx, t, q, hits, onOpen, onPick }: { idx: Index; t: Tower | null; q: string; hits: number; onOpen: (t: Tower) => void; onPick?: (t: Tower) => void }) {
  const pics = useMemo(
    () =>
      t
        ? t.rows
            .filter((r) => r.p)
            .sort(best)
            .slice(0, 3)
        : [],
    [t],
  )
  if (!t)
    return q ? (
      <div className="rounded-2xl border border-white/10 bg-black/50 p-3 text-[12.5px] text-white/70 backdrop-blur-md">
        No tower has every one of those words. The search on the left still looks through all {fmtInt(idx.items.length)} parts.
      </div>
    ) : null
  const st = {
    base: "SISO base chosen",
    cand: "Candidates to decide",
    miss: "Nothing good yet",
  }[t.st]
  return (
    <div className="rounded-2xl border border-white/10 bg-black/55 p-3 backdrop-blur-md" data-verify-readout={t.pat}>
      {q && (
        <p className="mb-2 text-[11px] text-white/55">
          <span className="font-mono text-white tabular-nums">{hits}</span> {hits === 1 ? "type matches" : "types match"} “{q.trim()}”
        </p>
      )}
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-medium first-letter:uppercase">{t.pat}</p>
          <p className="text-[12px] leading-snug text-white/55">
            {groupLabel(t.g)} · {fmtInt(t.n)} parts · {t.libs} libraries
          </p>
        </div>
        <span
          className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px]"
          style={{
            background: `${SHADES[t.st].glow}22`,
            color: SHADES[t.st].top,
          }}
        >
          {st}
        </span>
      </div>
      {pics.length > 0 && (
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {pics.map((r) => (
            <Link key={r.id} to={`/c/${encodeURIComponent(r.id)}`} className="aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-white/5" title={r.t}>
              <img src={r.p} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top" />
            </Link>
          ))}
        </div>
      )}
      <div className="mt-2.5 flex items-center gap-3">
        {onPick && (
          <button type="button" onClick={() => onPick(t)} className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-[12px] text-white hover:bg-white/15" data-verify-city-pick>
            Pick a SISO base
          </button>
        )}
        <button type="button" onClick={() => onOpen(t)} className="inline-flex items-center gap-1 text-[12px] text-[#c7d0ff] hover:text-white">
          Open the type <ArrowRight className="size-3.5" />
        </button>
      </div>
    </div>
  )
}
