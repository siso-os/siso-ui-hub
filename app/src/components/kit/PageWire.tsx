// uihub: siso:page-wire
// A page type drawn from its recipe (catalogue/page-types.json): every slot a block in the place it sits, so a page
// type is a picture you click, not a list of words (Shaan, 15 Oct: "you should be able to see the page or cards where
// you can click on them"). Drawn at 320 by 240 and scaled to fit; a slot can be lit (hot) and reports the pointer.
import { cn } from "@/lib/utils"

export type PageType = { type: string; group: string; recipe: string[] }
const W = 320
const H = 240
const OVER = new Set(["sheet", "dialog", "popover", "command-palette"])
const FIXED: Record<string, number> = { "site-header": 14, "top-bar": 14, footer: 26, "stats-band": 24, button: 14, stepper: 14, "page-header": 16, tabs: 11, toolbar: 13, stat: 24, pagination: 9, breadcrumb: 7, chips: 10, segmented: 12, search: 18, switch: 12, newsletter: 22, composer: 14 }
const GROW: Record<string, number> = { hero: 3, features: 1.5, card: 1.7, cta: 1, testimonials: 1.2, code: 1.4, diagram: 1.4, faq: 1.4, "blog-grid": 2.6, pricing: 2.3, comparison: 1.6, timeline: 1.6, "empty-state": 2, "auth-card": 1, form: 1.5, "choice-card": 1.2, "widget-board": 3, table: 3, list: 2, chat: 3, kanban: 3, calendar: 3, "settings-row": 2.6 }

const bar = "block rounded-full bg-foreground/20"
const box = "rounded-[3px] bg-foreground/[0.07]"
const line = (w: string, h = 3, x = "") => <i className={cn(bar, x)} style={{ width: w, height: h }} />
const pill = (w: number, x = "bg-foreground/25") => <i className={cn("block shrink-0 rounded-full", x)} style={{ width: w, height: 7 }} />

/** the inside of one block, by its kind */
function Inner({ kind }: { kind: string }) {
  switch (kind) {
    case "site-header":
      return <div className="flex h-full items-center gap-2 px-2"><i className="size-2 rounded-full bg-foreground/40" />{line("10%")}<span className="ml-auto flex gap-1.5">{line("18px")}{line("18px")}{line("18px")}</span>{pill(20, "bg-primary/60")}</div>
    case "top-bar":
      return <div className="flex h-full items-center gap-2 px-2"><i className="h-[7px] w-1/3 rounded-full bg-foreground/10" /><span className="ml-auto flex gap-1.5"><i className="size-2 rounded-full bg-foreground/25" /><i className="size-2 rounded-full bg-foreground/40" /></span></div>
    case "hero":
      return <div className="flex h-full flex-col items-center justify-center gap-1.5">{line("55%", 6, "bg-foreground/45")}{line("40%", 6, "bg-foreground/45")}{line("48%")}<span className="mt-1 flex gap-1.5">{pill(26, "bg-primary/60")}{pill(26)}</span></div>
    case "features":
    case "choice-card":
      return <div className="grid h-full grid-cols-3 gap-1.5 p-1.5">{[0, 1, 2].map((i) => <div key={i} className={cn(box, "flex flex-col gap-1 p-1.5", kind === "choice-card" && i === 1 && "ring-1 ring-primary/60")}><i className="size-2 rounded-[2px] bg-primary/50" />{line("80%")}{line("60%", 2)}</div>)}</div>
    case "card":
    case "blog-grid": {
      const n = kind === "blog-grid" ? 6 : 3
      return <div className="grid h-full grid-cols-3 gap-1.5 p-1.5">{Array.from({ length: n }, (_, i) => <div key={i} className={cn(box, "flex flex-col overflow-hidden")}><div className="min-h-0 flex-1 bg-foreground/[0.09]" /><div className="space-y-1 p-1">{line("70%")}{line("45%", 2)}</div></div>)}</div>
    }
    case "cta":
      return <div className="flex h-full flex-col items-center justify-center gap-1.5 rounded-[3px] bg-primary/10">{line("40%", 5, "bg-foreground/40")}{pill(28, "bg-primary/60")}</div>
    case "testimonials":
      return <div className="grid h-full grid-cols-2 gap-1.5 p-1.5">{[0, 1].map((i) => <div key={i} className={cn(box, "flex flex-col justify-between p-1.5")}><span className="space-y-1">{line("90%", 2)}{line("70%", 2)}</span><span className="flex items-center gap-1"><i className="size-2.5 rounded-full bg-foreground/30" />{line("30%", 2)}</span></div>)}</div>
    case "footer":
      return <div className="grid h-full grid-cols-4 gap-2 rounded-[3px] bg-foreground/[0.1] p-1.5">{[0, 1, 2, 3].map((i) => <span key={i} className="space-y-1">{line("60%", 2, "bg-foreground/35")}{line("80%", 2)}{line("50%", 2)}</span>)}</div>
    case "code":
      return <div className="h-full space-y-1 rounded-[3px] bg-foreground/[0.14] p-2">{["40%", "65%", "55%", "30%", "50%"].map((w, i) => <span key={i} className="block">{line(w, 2.5, i % 2 ? "bg-primary/45" : "bg-foreground/30")}</span>)}</div>
    case "diagram":
      return <div className="flex h-full items-center justify-center gap-2">{[0, 1, 2].map((i) => <span key={i} className="flex items-center gap-2"><i className="h-5 w-8 rounded-[3px] border border-foreground/30" />{i < 2 && <i className="h-px w-3 bg-foreground/30" />}</span>)}</div>
    case "faq":
    case "settings-row":
      return <div className="flex h-full flex-col justify-around px-1.5">{[0, 1, 2, 3].map((i) => <span key={i} className="flex items-center gap-2 border-b border-foreground/10 pb-1">{line("40%")}{kind === "faq" ? <i className="ml-auto text-[7px] leading-none text-foreground/40">+</i> : <i className={cn("ml-auto h-[7px] w-3 rounded-full", i % 2 ? "bg-foreground/20" : "bg-primary/60")} />}</span>)}</div>
    case "newsletter":
      return <div className="flex h-full items-center justify-center gap-1.5"><i className="h-[9px] w-1/3 rounded-[3px] border border-foreground/25" />{pill(24, "bg-primary/60")}</div>
    case "pricing":
      return <div className="grid h-full grid-cols-3 gap-1.5 p-1.5">{[0, 1, 2].map((i) => <div key={i} className={cn(box, "flex flex-col items-center gap-1 p-1.5", i === 1 && "bg-primary/10 ring-1 ring-primary/50")}>{line("40%", 2)}{line("50%", 6, "bg-foreground/40")}<span className="w-full flex-1 space-y-1 pt-1">{line("80%", 2)}{line("70%", 2)}{line("75%", 2)}</span>{pill(24, i === 1 ? "bg-primary/60" : "bg-foreground/25")}</div>)}</div>
    case "comparison":
    case "table":
      return <div className="flex h-full flex-col overflow-hidden rounded-[3px] border border-foreground/10">{Array.from({ length: kind === "table" ? 7 : 4 }, (_, i) => <span key={i} className={cn("flex flex-1 items-center gap-2 border-b border-foreground/10 px-1.5", i === 0 && "bg-foreground/[0.06]")}>{line("22%", 2, i === 0 ? "bg-foreground/35" : "")}{line("15%", 2)}{line("18%", 2)}<i className={cn("ml-auto size-1.5 rounded-full", i === 0 ? "bg-transparent" : "bg-primary/50")} /></span>)}</div>
    case "stats-band":
    case "stat":
      return <div className="grid h-full grid-cols-4 gap-1.5">{[0, 1, 2, 3].map((i) => <div key={i} className={cn(box, "flex flex-col justify-center gap-1 px-1.5")}>{line("40%", 2)}{line("55%", 5, "bg-foreground/40")}</div>)}</div>
    case "timeline":
      return <div className="relative flex h-full flex-col justify-around pl-4"><i className="absolute top-1 bottom-1 left-[6px] w-px bg-foreground/20" />{[0, 1, 2, 3].map((i) => <span key={i} className="relative flex items-center gap-1.5"><i className="absolute -left-[12px] size-1.5 rounded-full bg-primary/60" />{line("35%")}{line("20%", 2)}</span>)}</div>
    case "empty-state":
      return <div className="flex h-full flex-col items-center justify-center gap-1.5"><i className="size-6 rounded-full border border-dashed border-foreground/30" />{line("30%", 4, "bg-foreground/35")}{line("40%", 2)}{pill(26, "bg-primary/60")}</div>
    case "button":
      return <div className="flex h-full items-center justify-center">{pill(34, "bg-primary/60")}</div>
    case "auth-card":
      return <div className="flex h-full items-center justify-center"><div className={cn(box, "flex w-1/2 flex-col gap-1.5 p-2.5")}>{line("50%", 5, "bg-foreground/40")}<i className="h-[9px] rounded-[3px] border border-foreground/20" /><i className="h-[9px] rounded-[3px] border border-foreground/20" /><i className="h-[9px] rounded-[3px] bg-primary/60" /></div></div>
    case "stepper":
      return <div className="flex h-full items-center justify-center gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className="flex items-center gap-1"><i className={cn("size-2 rounded-full", i < 2 ? "bg-primary/60" : "bg-foreground/20")} />{i < 3 && <i className="h-px w-6 bg-foreground/20" />}</span>)}</div>
    case "form":
      return <div className="flex h-full flex-col justify-center gap-1.5 px-[18%]">{[0, 1, 2].map((i) => <span key={i} className="space-y-0.5">{line("25%", 2)}<i className="block h-[9px] rounded-[3px] border border-foreground/20" /></span>)}</div>
    case "page-header":
      return <div className="flex h-full items-center gap-2">{line("28%", 6, "bg-foreground/45")}<span className="ml-auto flex gap-1.5">{pill(20)}{pill(22, "bg-primary/60")}</span></div>
    case "tabs":
    case "segmented":
      return <div className={cn("flex h-full items-end gap-2", kind === "segmented" ? "items-center" : "border-b border-foreground/15")}>{[0, 1, 2, 3].map((i) => <i key={i} className={cn("block h-[6px] w-7 rounded-full", i === 0 ? "bg-foreground/45" : "bg-foreground/15", kind === "tabs" && i === 0 && "mb-[-1px] rounded-none border-b border-primary")} />)}</div>
    case "toolbar":
      return <div className="flex h-full items-center gap-1.5"><i className="h-[9px] w-1/4 rounded-[3px] border border-foreground/20" />{pill(16)}{pill(16)}<span className="ml-auto">{pill(18)}</span></div>
    case "widget-board":
      return <div className="grid h-full grid-cols-3 grid-rows-2 gap-1.5">{["col-span-2", "", "", "col-span-2", ""].slice(0, 4).map((c, i) => <div key={i} className={cn(box, c, "flex items-end gap-0.5 p-1.5")}>{i === 0 ? [40, 65, 50, 80, 60, 90, 70].map((v, j) => <i key={j} className="flex-1 rounded-[1px] bg-primary/40" style={{ height: `${v}%` }} />) : line("50%", 2)}</div>)}</div>
    case "pagination":
      return <div className="flex h-full items-center justify-end gap-1">{[0, 1, 2, 3].map((i) => <i key={i} className={cn("size-[7px] rounded-[2px]", i === 1 ? "bg-primary/60" : "bg-foreground/20")} />)}</div>
    case "breadcrumb":
      return <div className="flex h-full items-center gap-1">{line("10%", 2)}<i className="text-[6px] leading-none text-foreground/30">/</i>{line("12%", 2)}<i className="text-[6px] leading-none text-foreground/30">/</i>{line("14%", 2, "bg-foreground/40")}</div>
    case "chips":
      return <div className="flex h-full items-center gap-1">{[18, 22, 16, 20].map((w, i) => <span key={i}>{pill(w, i === 0 ? "bg-primary/50" : "bg-foreground/15")}</span>)}</div>
    case "list":
      return <div className="flex h-full flex-col justify-around">{[0, 1, 2, 3, 4, 5].map((i) => <span key={i} className={cn("flex items-center gap-1.5 rounded-[3px] px-1 py-0.5", i === 1 && "bg-primary/10")}><i className="size-2.5 shrink-0 rounded-full bg-foreground/25" /><span className="flex-1 space-y-0.5">{line("60%", 2, "bg-foreground/30")}{line("80%", 2)}</span></span>)}</div>
    case "chat":
      return <div className="flex h-full flex-col justify-end gap-1.5 p-1.5">{[["55%", ""], ["40%", "self-end bg-primary/30"], ["60%", ""], ["35%", "self-end bg-primary/30"]].map(([w, c], i) => <i key={i} className={cn("block h-3 rounded-md bg-foreground/[0.12]", c)} style={{ width: w }} />)}</div>
    case "composer":
      return <div className="flex h-full items-center gap-1.5 rounded-[4px] border border-foreground/20 px-1.5">{line("35%", 2)}<span className="ml-auto">{pill(14, "bg-primary/60")}</span></div>
    case "kanban":
      return <div className="grid h-full grid-cols-4 gap-1.5">{[3, 2, 4, 1].map((n, i) => <div key={i} className="flex flex-col gap-1 rounded-[3px] bg-foreground/[0.05] p-1">{line("50%", 2, "bg-foreground/35")}{Array.from({ length: n }, (_, j) => <i key={j} className="block h-4 rounded-[2px] bg-foreground/[0.1]" />)}</div>)}</div>
    case "calendar":
      return <div className="grid h-full grid-cols-7 grid-rows-5 gap-px overflow-hidden rounded-[3px] bg-foreground/10">{Array.from({ length: 35 }, (_, i) => <i key={i} className="block bg-background p-0.5">{[3, 9, 17, 24].includes(i) && <i className="block h-1 rounded-full bg-primary/50" />}</i>)}</div>
    case "switch":
      return <div className="flex h-full items-center gap-2">{line("25%")}<i className="ml-auto h-[7px] w-3 rounded-full bg-primary/60" /></div>
    case "search":
      return <div className="flex h-full items-center justify-center"><i className="h-[12px] w-2/3 rounded-full border border-foreground/25 bg-foreground/[0.04]" /></div>
    case "sidebar":
      return <div className="flex h-full flex-col gap-1.5 p-1.5"><i className="mb-1 size-2.5 rounded-[3px] bg-foreground/40" />{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} className={cn("block h-[6px] rounded-full", i === 0 ? "bg-primary/50" : "bg-foreground/15")} style={{ width: `${[80, 65, 75, 55, 70, 60][i]}%` }} />)}</div>
    case "sheet":
      return <div className="flex h-full flex-col gap-1.5 p-2">{line("50%", 5, "bg-foreground/40")}{line("80%", 2)}{line("70%", 2)}<i className="mt-auto block h-[9px] rounded-[3px] bg-primary/60" /></div>
    case "dialog":
    case "popover":
      return <div className="flex h-full flex-col gap-1.5 p-2">{line("50%", 4, "bg-foreground/40")}{line("85%", 2)}<span className="mt-auto flex justify-end gap-1">{pill(16)}{pill(18, "bg-primary/60")}</span></div>
    case "command-palette":
      return <div className="flex h-full flex-col gap-1 p-1.5"><i className="mb-0.5 block h-[9px] rounded-[3px] border border-foreground/20" />{[0, 1, 2, 3].map((i) => <span key={i} className={cn("flex items-center gap-1 rounded-[2px] px-1 py-0.5", i === 0 && "bg-primary/15")}><i className="size-1.5 rounded-[1px] bg-foreground/30" />{line("50%", 2)}</span>)}</div>
    default:
      return <div className="flex h-full items-center justify-center font-mono text-[7px] text-foreground/40">{kind}</div>
  }
}

type Slot = { kind: string; i: number }
function Block({ s, hot, onHot, className, style }: { s: Slot; hot?: number | null; onHot?: (i: number | null) => void; className?: string; style?: React.CSSProperties }) {
  const fixed = FIXED[s.kind]
  return (
    <div
      data-slot={s.i}
      onMouseEnter={onHot && (() => onHot(s.i))}
      className={cn("relative min-h-0 min-w-0 rounded-[4px] transition-[box-shadow,background-color] duration-150", hot === s.i && "bg-primary/[0.08] shadow-[0_0_0_1.5px_var(--primary)]", className)}
      style={{ ...(fixed ? { height: fixed, flex: "none" } : { flex: GROW[s.kind] ?? 1 }), ...style }}
    >
      <Inner kind={s.kind} />
    </div>
  )
}

/** the page type at its slots; size is the drawn width in px */
export function PageWire({ t, width, hot, onHot, className }: { t: PageType; width: number; hot?: number | null; onHot?: (i: number | null) => void; className?: string }) {
  const k = width / W
  const slots = t.recipe.map((kind, i) => ({ kind, i }))
  const over = slots.filter((s) => OVER.has(s.kind))
  const flow = slots.filter((s) => !OVER.has(s.kind))
  const side = flow.find((s) => s.kind === "sidebar")
  const head = flow.find((s) => s.kind === "site-header")
  const top = flow.find((s) => s.kind === "top-bar")
  const foot = flow.find((s) => s.kind === "footer")
  const main = flow.filter((s) => s !== side && s !== head && s !== top && s !== foot)
  const p = { hot, onHot }
  // an inbox reads as a list beside the open thread
  const li = main.findIndex((s) => s.kind === "list")
  const ci = main.findIndex((s) => s.kind === "chat")
  const stack = (ss: Slot[]) => {
    if (li >= 0 && ci >= 0) {
      const list = main[li]
      const right = ss.filter((s) => s !== list && s.kind !== "chips")
      const chips = ss.find((s) => s.kind === "chips")
      return (
        <div className="flex min-h-0 flex-1 gap-2">
          <div className="flex w-[38%] flex-col gap-1.5">{chips && <Block s={chips} {...p} />}<Block s={list} {...p} /></div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">{right.map((s) => <Block key={s.i} s={s} {...p} />)}</div>
        </div>
      )
    }
    const centred = !side && t.group !== "site"
    return <div className={cn("flex min-h-0 flex-1 flex-col gap-1.5", centred && "mx-auto w-[86%] justify-center")}>{ss.map((s) => <Block key={s.i} s={s} {...p} />)}</div>
  }
  return (
    <div className={cn("relative shrink-0 overflow-hidden rounded-lg border border-border/70 bg-background", className)} style={{ width, height: H * k }} onMouseLeave={onHot && (() => onHot(null))} data-verify-wire={t.type}>
      <div className="absolute top-0 left-0 flex flex-col gap-1.5 p-2" style={{ width: W, height: H, transform: `scale(${k})`, transformOrigin: "0 0" }}>
        {head && <Block s={head} {...p} />}
        {side && t.group === "app" ? (
          <div className="-m-2 flex min-h-0 flex-1">
            <Block s={side} {...p} className="w-[18%] rounded-none border-r border-foreground/10 bg-foreground/[0.04]" style={{ flex: "none" }} />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-2">
              {top && <Block s={top} {...p} />}
              {stack(main)}
            </div>
          </div>
        ) : side ? (
          <div className="flex min-h-0 flex-1 gap-2">
            <Block s={side} {...p} className="w-[20%] bg-foreground/[0.04]" style={{ flex: "none" }} />
            {stack(main)}
          </div>
        ) : (
          <>
            {top && <Block s={top} {...p} />}
            {stack(main)}
          </>
        )}
        {foot && <Block s={foot} {...p} />}
        {over.map((s) => (
          <Block
            key={s.i}
            s={s}
            {...p}
            className={cn(
              "absolute border border-foreground/20 bg-background shadow-lg",
              s.kind === "sheet" && "top-2 right-2 bottom-2 w-[30%]",
              s.kind === "dialog" && "top-1/2 left-1/2 h-[34%] w-[42%] -translate-x-1/2 -translate-y-1/2",
              s.kind === "popover" && "top-[38%] left-[48%] h-[22%] w-[26%]",
              s.kind === "command-palette" && "top-[18%] left-1/2 h-[44%] w-[50%] -translate-x-1/2",
            )}
            style={{ flex: "none" }}
          />
        ))}
      </div>
    </div>
  )
}
