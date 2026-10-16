// uihub: siso:page-kit-app-frame
// The app frame page: the dashboard shell (landing pages get their own site frame). Rounds 1-5 put the choices in a
// panel and drew shrunken copies of the app to compare; Shaan, 15 Oct: "all of the options are retarded ... maybe it's
// not a selector ... the little inputs are showing ... just inputted boxes on the main shell ... be more creative".
// From first principles: agents build every SISO dashboard from this one frame and Shaan decides it once by looking,
// so the page is the frame itself, real size, and every choice is a small box pinned to the part of the shell it
// changes, with a line to it. Hover a box and that part lights up while the rest blurs; hover an option and the shell
// becomes it in place; click to keep it. Nothing to compare side by side: the difference happens where you look.
// Style (scheme, matte or glass, font, radius) and where to start sit in one bar above; agents get the decision as a
// variation id and one line of code (For agents). The 72 named variations are in catalogue/app-frame.json.
import { Suspense, lazy, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, Check, ChevronDown, Code2, Copy } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/kit/shadcn/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/kit/shadcn/ui/popover"
import spec from "../../../catalogue/app-frame.json"
import shells from "../../../catalogue/kit-shells.json"
import { SISO_FRAME, applies, fit, normalise, type FrameCfg } from "@/kitv1/siso/app-frame"
import { FONTS, SCHEMES, SISO_TOKENS, tokenVars, type Tokens } from "@/kitv1/siso/frame-tokens"
const AppFrame = lazy(() => import("@/kitv1/siso/app-frame"))

type Opt = { value: string | number | boolean; label: string; short: string; count: number | null; does: string }
type Option = { key: keyof FrameCfg; title: string; opts: Opt[] }
type Ours = { app: string; cfg: Partial<FrameCfg>; regions: string; sizes: string }
const S = spec as unknown as { total: number; options: Option[]; variations: { id: string; name: string; cfg: Partial<FrameCfg> }[]; ours: Ours[]; always: string[] }
const SH = shells as Record<string, { parts: unknown[] }>
const OPT = Object.fromEntries(S.options.map((o) => [o.key, o])) as Record<keyof FrameCfg, Option>
const RADII: [string, string][] = [["0", "Sharp"], ["0.375", "Soft"], ["0.625", "Mid"], ["1", "Round"]]
const PHONE = { w: 390, h: 800 }
type Theme = "dark" | "light"

// where each box pins: the part it changes (first match wins) and where on that part its line lands. The boxes stand in
// one column left of the shell and their lines end on the shell's edge, so nothing covers the app.
// mark: the part index.css lights while you hover the box.
type Pin = { key: keyof FrameCfg; at: string[]; y: "mid" | number; mark?: string }
const PINS: Pin[] = [
  { key: "topbar", at: ['[data-mark="topbar"]'], y: "mid", mark: "topbar" },
  { key: "header", at: ['[data-slot="sidebar-header"]'], y: 0.3, mark: "header" },
  { key: "collapse", at: ['[data-slot="sidebar-header"]'], y: 0.75, mark: "header" },
  { key: "tools", at: ['[data-mark="tools"]'], y: "mid", mark: "tools" },
  { key: "nav", at: ['[data-mark="nav"]'], y: 0.35, mark: "nav" },
  { key: "look", at: ['[data-slot="sidebar-container"]'], y: 0.62 },
  { key: "layout", at: ['[data-mark="rail"]', '[data-slot="sidebar-container"]'], y: 0.72 },
  { key: "footer", at: ['[data-slot="sidebar-footer"]'], y: "mid", mark: "footer" },
]
const BOX_H = 32
const BOX_GAP = 8
const COL = 224 // the boxes' right edge
const SHELL_X = 264 // where the shell starts

function Pick<T extends string>({ label, value, opts, set }: { label: string; value: T; opts: [T, string][]; set: (v: T) => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-border/60 px-2 py-1 text-xs hover:bg-muted">
        <span className="text-muted-foreground">{label}</span>{opts.find(([v]) => v === value)?.[1]}<ChevronDown className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-32">
        {opts.map(([v, t]) => <DropdownMenuItem key={v} onSelect={() => set(v)} className="text-xs">{t}{v === value && <Check className="ml-auto size-3.5" />}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
const seg = (on: boolean) => `whitespace-nowrap rounded px-2 py-0.5 text-[11px] transition-colors ${on ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`

// what agents read: the decision as the variation id (when it is one of the 72) and the line to build it
function ForAgents({ cfg, tokens }: { cfg: FrameCfg; tokens: Tokens }) {
  const [copied, setCopied] = useState(false)
  const diff = Object.fromEntries(Object.entries(cfg).filter(([k, v]) => SISO_FRAME[k as keyof FrameCfg] !== v))
  const tdiff = Object.fromEntries(Object.entries(tokens).filter(([k, v]) => v !== undefined && SISO_TOKENS[k as keyof Tokens] !== v))
  const keys = Object.keys(SISO_FRAME) as (keyof FrameCfg)[]
  const hit = S.variations.find((v) => { const c = normalise(v.cfg); return keys.every((k) => c[k] === cfg[k]) })
  const code = [
    `// uihub: siso:app-frame${hit ? `  (${hit.id})` : ""}`,
    `import AppFrame from "@/kitv1/siso/app-frame"`,
    ...(Object.keys(tdiff).length ? [`import { tokenVars } from "@/kitv1/siso/frame-tokens"`, `<div style={tokenVars(${JSON.stringify({ ...SISO_TOKENS, ...tdiff })}, "dark")}>`] : []),
    `<AppFrame${Object.keys(diff).length ? ` cfg={${JSON.stringify(diff)}}` : ""} />`,
    ...(Object.keys(tdiff).length ? ["</div>"] : []),
  ].join("\n")
  return (
    <div className="text-xs">
      <div className="flex items-center gap-2"><p className="font-medium">For agents</p>
        <button onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500) }} className="ml-auto flex items-center gap-1 rounded-md border border-border/60 px-2 py-0.5 hover:bg-muted">{copied ? <Check className="size-3" /> : <Copy className="size-3" />}{copied ? "Copied" : "Copy"}</button>
      </div>
      <p className="mt-1 text-muted-foreground">{hit ? <>This is <span className="font-mono text-foreground">{hit.id}</span>: {hit.name}.</> : Object.keys(diff).length ? "A custom frame: not one of the 72 named variations." : "The SISO default."}</p>
      <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-all rounded-md bg-muted/60 p-2 font-mono text-[10.5px] leading-snug">{code}</pre>
      <p className="mt-2 text-muted-foreground">Agents: <span className="font-mono text-foreground">uihub show siso:app-frame</span>; every choice and variation is in catalogue/app-frame.json.</p>
      <p className="mt-2 text-muted-foreground">Always there: {S.always.join(" · ").toLowerCase()}.</p>
      <p className="mt-2 text-muted-foreground">Built from the {S.total} sidebars and app shells we hold: {Object.entries(SH).filter(([, v]) => v.parts.length).map(([k, v], i) => <span key={k}>{i > 0 && ", "}<Link to={`/kit/shells/${k}`} className="underline hover:text-foreground">{k.replace(/-/g, " ")} {v.parts.length}</Link></span>)}.</p>
    </div>
  )
}

type Placed = { key: keyof FrameCfg; ay: number; y: number }
const CUSTOM = "siso-app-frame-custom"

export default function KitAppFrame() {
  const [q, setQ] = useSearchParams()
  const go = useNavigate()
  const raw: FrameCfg = useMemo(() => { try { return normalise(JSON.parse(q.get("cfg") || "{}")) } catch { return SISO_FRAME } }, [q])
  const cfg = fit(raw)
  const tokens: Tokens = { scheme: q.get("s") || SISO_TOKENS.scheme, primary: q.get("p") || q.get("a") || undefined, surface: q.get("f") || SISO_TOKENS.surface, font: q.get("font") || SISO_TOKENS.font, radius: q.get("r") || SISO_TOKENS.radius }
  const theme = (q.get("t") === "light" ? "light" : "dark") as Theme
  const phone = q.get("d") === "phone"
  const [steps, setSteps] = useState(0)
  // a change you make is a step you can go back from
  const put = (kv: Record<string, string | null>, step = false) => {
    const n = new URLSearchParams(q)
    for (const [k, v] of Object.entries(kv)) { if (v) n.set(k, v); else n.delete(k) }
    setQ(n, { replace: !step })
    if (step) setSteps((s) => s + 1)
  }
  const cfgParam = (next: FrameCfg) => {
    const diff = Object.fromEntries(Object.entries(next).filter(([k, val]) => SISO_FRAME[k as keyof FrameCfg] !== val))
    return Object.keys(diff).length ? JSON.stringify(diff) : null
  }
  const setOpt = (key: keyof FrameCfg, value: Opt["value"]) => { setTry(null); put({ cfg: cfgParam({ ...raw, [key]: value } as FrameCfg) }, true) }

  // where to start: SISO, our three apps, or Custom (the last frame you made yourself, kept in this browser)
  const keys = Object.keys(SISO_FRAME) as (keyof FrameCfg)[]
  const starts = [{ app: "SISO", cfg: {} as Partial<FrameCfg>, regions: "The SISO default", sizes: "" }, ...S.ours]
  const same = (a: FrameCfg, b: FrameCfg) => keys.every((k) => a[k] === b[k])
  const at = starts.find((o) => same(fit(normalise(o.cfg)), cfg))
  const [custom, setCustom] = useState<FrameCfg | null>(() => { try { return JSON.parse(localStorage.getItem(CUSTOM) || "null") } catch { return null } })
  useEffect(() => { if (!at) { localStorage.setItem(CUSTOM, JSON.stringify(raw)); setCustom(raw) } }, [q]) // eslint-disable-line react-hooks/exhaustive-deps
  const short = (app: string) => app.replace(/ \(.*\)/, "").replace(/ CRM$/, "")

  // hovering a box lights its part; hovering an option shows the shell with it, in place, until you leave or click
  const [over, setOver] = useState<keyof FrameCfg | null>(null)
  const [tryOpt, setTry] = useState<{ key: keyof FrameCfg; value: Opt["value"] } | null>(null)
  const shown = tryOpt ? fit({ ...raw, [tryOpt.key]: tryOpt.value } as FrameCfg) : cfg
  const state = tryOpt?.key === "collapse" && tryOpt.value === "icon" ? "collapsed" : undefined
  const live = applies(cfg)

  // the whole page fits the window: the stage takes what the bars above and below leave, never more
  const wrap = useRef<HTMLDivElement>(null)
  const foot = useRef<HTMLDivElement>(null)
  const extra = useRef(0)
  const [h, setH] = useState(640)
  useLayoutEffect(() => {
    const read = () => {
      const el = wrap.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setH(Math.max(460, Math.floor(window.innerHeight - top - (foot.current?.offsetHeight ?? 32) - 20 - extra.current)))
    }
    read()
    window.addEventListener("resize", read)
    return () => window.removeEventListener("resize", read)
  }, [])
  useEffect(() => {
    const t = setTimeout(() => {
      const spill = (document.scrollingElement?.scrollHeight ?? 0) - window.innerHeight
      if (spill > 0 && spill < 240) { extra.current += spill; setH((x) => x - spill) }
    }, 120)
    return () => clearTimeout(t)
  }, [h])

  // pin each box beside its part: measured from the shell, stacked so no two overlap, frozen while you hover
  const stage = useRef<HTMLDivElement>(null)
  const [placed, setPlaced] = useState<Placed[]>([])
  const [barY, setBar] = useState<number | null>(null)
  const measure = useCallback(() => {
    const el = stage.current
    if (!el) return
    const base = el.getBoundingClientRect()
    // the top bar's box sits on the bar itself; the rest stand in the column
    const bar = el.querySelector('[data-mark="topbar"]')?.getBoundingClientRect()
    setBar(bar ? bar.top - base.top + bar.height / 2 - BOX_H / 2 : 6)
    const want = PINS.filter((p) => p.key !== "topbar" && live.includes(p.key)).map((p) => {
      const t = p.at.map((s) => el.querySelector(s)).find(Boolean)?.getBoundingClientRect()
      if (!t) return null
      const ay = (p.y === "mid" ? t.top + t.height / 2 : t.top + t.height * p.y) - base.top
      return { key: p.key, ay, y: ay - BOX_H / 2 }
    }).filter(Boolean) as Placed[]
    want.sort((a, b) => a.ay - b.ay)
    for (let i = 0; i < want.length; i++) want[i].y = Math.max(want[i].y, i ? want[i - 1].y + BOX_H + BOX_GAP : 8)
    const spill = want.length ? want[want.length - 1].y + BOX_H - (base.height - 8) : 0
    if (spill > 0) for (let i = want.length - 1; i >= 0; i--) { want[i].y -= spill; if (i && want[i - 1].y + BOX_H + BOX_GAP <= want[i].y) break }
    setPlaced(want)
  }, [live.join()]) // eslint-disable-line react-hooks/exhaustive-deps
  const frozen = !!over || !!tryOpt
  useLayoutEffect(() => {
    if (frozen || phone) return
    const ts = [60, 350, 800].map((d) => setTimeout(measure, d))
    return () => ts.forEach(clearTimeout)
  }, [measure, frozen, phone, q, h])

  const pin = PINS.find((p) => p.key === over)
  const chip = (on: boolean) => `rounded-full border px-2.5 py-0.5 text-xs transition-colors ${on ? "border-primary/60 bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"}`
  const triedLabel = tryOpt && OPT[tryOpt.key].opts.find((x) => x.value === tryOpt.value)?.label
  // called as a function, not a component, so a hover's re-render keeps the same box under the mouse
  const box = (k: keyof FrameCfg, style: React.CSSProperties, col?: boolean) => {
    const o = OPT[k]
    const hot = over === k
    return (
      <div key={k} onMouseEnter={() => setOver(k)} onMouseLeave={() => { setOver(null); setTry(null) }} style={style}
        className={`absolute z-20 flex items-center gap-1.5 rounded-lg border bg-card py-1 pl-2.5 pr-1 shadow-sm transition-[opacity,box-shadow] ${col ? "-translate-x-full" : ""} ${hot ? "border-primary/70 ring-2 ring-primary/30" : over ? "border-border/60 opacity-40" : "border-border/60"}`}>
        <span className="text-[11px] font-medium text-foreground">{o.title}</span>
        <div className="flex gap-0.5">
          {o.opts.map((op) => {
            const on = (tryOpt?.key === k ? tryOpt.value : cfg[k]) === op.value
            return (
              <button key={String(op.value)} title={[op.does, op.count != null ? `${op.count} of ${S.total} do this` : ""].filter(Boolean).join(" · ")}
                onMouseEnter={() => setTry({ key: k, value: op.value })} onClick={() => setOpt(k, op.value)} className={seg(on)}>{op.short}</button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-5 pb-3 pt-3">
      {/* top: where to start, and the line for agents */}
      <div className="mb-3 flex items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">App frame</h1>
        <div className="flex items-center gap-1">
          {starts.map((o) => <button key={o.app} title={[o.regions, o.sizes].filter(Boolean).join("\n")} onClick={() => put({ cfg: cfgParam(fit(normalise(o.cfg))) }, true)} className={chip(at?.app === o.app)}>{short(o.app)}</button>)}
          <button disabled={!custom} title={custom ? "The last frame you made yourself" : "Change anything and it is kept here"} onClick={() => custom && put({ cfg: cfgParam(custom) }, true)} className={`${chip(!at)} disabled:opacity-40`}>Custom</button>
          {steps > 0 && <button onClick={() => { setSteps((s) => s - 1); go(-1) }} className="ml-1 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted"><ArrowLeft className="size-3" />Back</button>}
        </div>
        <Popover>
          <PopoverTrigger className="ml-auto flex items-center gap-1.5 rounded-md border border-border/60 px-2 py-1 text-xs hover:bg-muted"><Code2 className="size-3.5" />For agents</PopoverTrigger>
          <PopoverContent align="end" className="w-96 p-3"><ForAgents cfg={cfg} tokens={tokens} /></PopoverContent>
        </Popover>
      </div>

      <div ref={wrap} className="relative" style={{ height: h }}>
        {phone ? (
          <div className="flex h-full justify-center">
            <div className="relative overflow-hidden rounded-[26px] border-4 border-border/80" style={{ width: PHONE.w * Math.min(1, h / PHONE.h), height: PHONE.h * Math.min(1, h / PHONE.h) }}>
              <div className={`${theme} absolute left-0 top-0 origin-top-left bg-background text-foreground [&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-wrapper]]:!min-h-full [&_.h-svh]:!h-full [&_.min-h-svh]:!min-h-full`}
                data-surface={tokens.surface} style={{ width: PHONE.w, height: PHONE.h, transform: `scale(${Math.min(1, h / PHONE.h)})`, ...tokenVars(tokens, theme) }}>
                <Suspense fallback={null}><AppFrame cfg={cfg} still state="phone" /></Suspense>
              </div>
            </div>
          </div>
        ) : (
          <div ref={stage} className="absolute inset-0">
            {/* the shell at real size; the transform keeps its fixed sidebar inside this box */}
            <div className="absolute inset-y-0 right-0 overflow-hidden rounded-xl border border-border/70" style={{ left: SHELL_X }}>
              <div className={`${theme} absolute inset-0 bg-background text-foreground [&_[data-slot=sidebar-container]]:!h-full [&_[data-slot=sidebar-wrapper]]:!h-full [&_[data-slot=sidebar-wrapper]]:!min-h-full [&_.h-svh]:!h-full [&_.min-h-svh]:!min-h-full`}
                data-mark-on={over ? pin?.mark : undefined} data-surface={tokens.surface} style={{ transform: "translateZ(0)", ...tokenVars(tokens, theme) }}
                onClick={() => setTimeout(measure, 380)}>
                <Suspense fallback={null}><AppFrame cfg={shown} state={state} /></Suspense>
              </div>
            </div>
            {/* the lines: from each box to the shell's edge, level with its part */}
            <svg className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible">
              {placed.map((p) => {
                const hot = over === p.key
                const ey = p.y + BOX_H / 2
                const d = `M ${COL} ${ey} C ${COL + 24} ${ey}, ${SHELL_X - 24} ${p.ay}, ${SHELL_X} ${p.ay}`
                return (
                  <g key={p.key} style={{ color: "var(--primary)" }} className={`transition-opacity ${over && !hot ? "opacity-15" : hot ? "opacity-100" : "opacity-50"}`}>
                    <path d={d} fill="none" stroke="currentColor" strokeWidth={hot ? 2 : 1.25} />
                    <circle cx={SHELL_X} cy={p.ay} r={hot ? 4 : 3} fill="currentColor" />
                  </g>
                )
              })}
            </svg>
            {/* the boxes: one column, each level with the part it changes; the top bar's on the bar */}
            {placed.map((p) => box(p.key, { left: COL, top: p.y, height: BOX_H }, true))}
            {barY !== null && box("topbar", { right: 104, top: barY, height: BOX_H })}
          </div>
        )}
      </div>

      {/* bottom: the style, the view, and what you are trying */}
      <div ref={foot} className="mt-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          {SCHEMES.map((s) => (
            <button key={s.id} title={s.name} onClick={() => put({ s: s.id === "siso" ? null : s.id, p: null, a: null }, true)}
              className={`size-4 rounded-full ${tokens.scheme === s.id && !tokens.primary ? "ring-2 ring-foreground/70 ring-offset-2 ring-offset-background" : ""}`} style={{ background: `linear-gradient(135deg, ${s.primary} 50%, ${s.second} 50%)` }} />
          ))}
          <label title="Any colour" className={`relative size-4 cursor-pointer overflow-hidden rounded-full ${tokens.primary ? "ring-2 ring-foreground/70 ring-offset-2 ring-offset-background" : ""}`} style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}>
            <input type="color" value={tokens.primary ? `#${tokens.primary}` : "#f97316"} onChange={(e) => put({ p: e.target.value.slice(1), a: null })} className="absolute inset-0 cursor-pointer opacity-0" />
          </label>
        </div>
        <Pick label="Surface" value={tokens.surface} opts={[["matte", "Matte"], ["glass", "Glass"]]} set={(v) => put({ f: v === "matte" ? null : v }, true)} />
        <Pick label="Font" value={tokens.font} opts={FONTS.map(([id, name]) => [id, name] as [string, string])} set={(v) => put({ font: v === "geist" ? null : v }, true)} />
        <Pick label="Radius" value={tokens.radius} opts={RADII} set={(v) => put({ r: v === "0.625" ? null : v }, true)} />
        <Pick label="Theme" value={theme} opts={[["dark", "Dark"], ["light", "Light"]]} set={(v) => put({ t: v === "dark" ? null : v })} />
        <Pick label="View" value={phone ? "phone" : "desktop"} opts={[["desktop", "Desktop"], ["phone", "Phone"]]} set={(v) => put({ d: v === "desktop" ? null : v })} />
        <p className={`ml-auto truncate text-[11px] ${tryOpt ? "text-primary" : "text-muted-foreground"}`}>
          {tryOpt ? `Trying ${OPT[tryOpt.key].title.toLowerCase()}: ${triedLabel}. Click to keep.` : "Hover a box to see its part, hover an option to try it, click to keep."}
        </p>
      </div>
    </div>
  )
}
