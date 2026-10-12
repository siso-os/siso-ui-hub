// uihub: siso:page-library
// One library's own page (Shaan, 10 Oct: "the libraries would want their own pages"): every part it lists, played on its
// library's own site ("leverage these guys for the preview urls"), with the line that installs it and whether the code
// bank holds its code. A part opens beside the list, live in a frame where the site allows one.
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Check, Copy, ExternalLink, Search } from "lucide-react"
import { fmtInt, itemHref, useIndex } from "@/lib/data"
import { cn } from "@/lib/utils"
import { hostOf, kindLabel, useLib, useLibs, type LibPart } from "@/lib/codebank"
import { PageHeader } from "@/components/bits"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const STEP = 120

function CopyLine({ text }: { text: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text)
        setDone(true)
        setTimeout(() => setDone(false), 1400)
      }}
      className="siso-chip siso-press flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left font-mono text-[11px]"
      title="Copy"
    >
      <span className="min-w-0 flex-1 truncate">{text}</span>
      {done ? <Check className="size-3.5 shrink-0" /> : <Copy className="size-3.5 shrink-0 opacity-60" />}
    </button>
  )
}

/** a part of a library with no registry is its page (siso-ui-code bin/sites): there is no code to hold */
const viewOnly = (x: LibPart) => !!x.s?.startsWith("view only")

/** what we hold of a part: its code, or why not */
const held = (x: LibPart) =>
  x.h ? "Code held" : viewOnly(x) ? "View only (no registry)" : x.s === "gated" ? "Paid or behind a login" : x.s === "missing" ? "Gone from the registry" : "Code not pulled yet"

function PartCard({ x, reg, onOpen }: { x: LibPart; reg: string; onOpen: () => void }) {
  const idx = useIndex()
  const id = `${reg}:${x.n}`
  const row = idx?.byId.get(id)
  const p = row?.p
  return (
    <button onClick={onOpen} className="siso-glow-card flex flex-col gap-1.5 overflow-hidden text-left" data-verify-lib-part={x.n}>
      {p && (
        <div className="aspect-[4/3] w-full border-b bg-foreground/[0.02]">
          <img src={p} alt="" loading="lazy" decoding="async" className={cn("size-full", p.endsWith(".svg") ? "object-contain p-[22%]" : "object-cover object-top")} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 p-4 pt-3">
      <div className="flex items-baseline gap-2">
        <span className="min-w-0 flex-1 truncate font-semibold">{x.t || x.n}</span>
        <span className="siso-chip shrink-0 rounded-full px-2 py-px text-[11px]">{kindLabel(x.k)}</span>
      </div>
      {x.t && x.t !== x.n && <span className="truncate font-mono text-[11px] text-muted-foreground">{x.n}</span>}
      {x.d && <p className="line-clamp-2 text-xs text-muted-foreground">{x.d}</p>}
      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-muted-foreground">
        <span className={x.h ? "text-foreground" : undefined}>{held(x)}</span>
        {x.p && <span>Live on their site</span>}
        {x.dp?.length ? <span className="min-w-0 truncate">{x.dp.slice(0, 3).join(" · ")}</span> : null}
        {row && (
          <Link to={itemHref(id)} onClick={(e) => e.stopPropagation()} className="ml-auto text-foreground/80 hover:text-foreground hover:underline">
            Details
          </Link>
        )}
      </div>
      </div>
    </button>
  )
}

function Preview({ x, frame, home, onClose }: { x: LibPart | null; frame?: boolean | null; home?: string; onClose: () => void }) {
  const page = x?.p
  return (
    <Sheet open={!!x} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-[min(1100px,92vw)]" data-verify-lib-preview>
        {x && (
          <>
            <SheetHeader className="border-b p-4 pr-12">
              <SheetTitle>{x.t || x.n}</SheetTitle>
              <SheetDescription className="line-clamp-2">
                {kindLabel(x.k)}
                {x.d && ` · ${x.d}`}
              </SheetDescription>
            </SheetHeader>
            <div className="min-h-0 flex-1 bg-background">
              {page && frame !== false ? (
                <iframe src={page} title={`${x.t || x.n} on its own site`} className="size-full" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" data-verify-lib-iframe />
              ) : (
                <div className="grid h-full place-items-center p-8 text-center text-sm text-muted-foreground">
                  <div className="space-y-3">
                    <p>{page ? "Their site won't show inside another page." : "Their site has no page of its own for this part."}</p>
                    <a href={page || home} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-medium text-foreground hover:underline">
                      Open {page ? "it" : hostOf(home)} on their site <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-2 border-t p-4">
              {x.i && <CopyLine text={`npx shadcn@latest add ${x.i}`} />}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className={x.h ? "text-foreground" : undefined}>{x.h ? "Its code is in the code bank (sisodias/siso-ui-code)" : held(x)}</span>
                {x.dp?.length ? <span>Needs {x.dp.join(", ")}</span> : null}
                {x.u ? <span>Builds on {x.u} other parts</span> : null}
                {page && (
                  <a href={page} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 hover:text-foreground">
                    Open on their site <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default function Library() {
  const { id } = useParams()
  const libs = useLibs()
  const d = useLib(id)
  const lib = libs?.libraries.find((l) => l.id === id)
  const [q, setQ] = useState("")
  const [kind, setKind] = useState<string | null>(null)
  const [n, setN] = useState(STEP)
  const [open, setOpen] = useState<LibPart | null>(null)
  const parts = useMemo(() => {
    const w = q.toLowerCase().trim()
    return (d?.parts || []).filter((x) => (!kind || x.k === kind) && (!w || `${x.n} ${x.t || ""} ${x.d || ""}`.toLowerCase().includes(w)))
  }, [d, q, kind])
  if (d === undefined) return <div className="h-40 animate-pulse rounded-lg bg-muted" aria-label="Loading the library" />
  if (d === null) return <p className="text-sm text-muted-foreground">No library “{id}” in the code bank yet.</p>
  const kinds = Object.entries(lib?.kinds || {})
  return (
    <div data-verify-library-page={id}>
      <PageHeader
        // a registry found on GitHub (the bank's bin/pull-github) is named by its repository
        title={id!.startsWith("gh-") && d.home?.includes("github.com/") ? d.home.split("github.com/")[1].replace(/\/$/, "") : id!}
        count={d.parts.length}
        sub={
          <>
            {lib?.d && <span className="block">{lib.d}</span>}
            <span className="mt-1 block">
              {d.parts.length > 0 && d.parts.every(viewOnly) ? "A site with no registry: its parts are its pages, photographed here" : `${fmtInt(lib?.held ?? 0)} with their code held`} · {fmtInt(lib?.pages ?? 0)} live on{" "}
              {d.home ? (
                <a href={d.home} target="_blank" rel="noreferrer" className="text-foreground hover:underline">
                  {hostOf(d.home)}
                </a>
              ) : (
                "their site"
              )}
              {d.frame === false && ", opened by link: the site won't show inside another page"}
            </span>
          </>
        }
      />
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <label className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setN(STEP)
            }}
            placeholder={`Search ${fmtInt(d.parts.length)} parts`}
            className="h-9 pl-8 text-sm"
          />
        </label>
        {kinds.length > 1 &&
          [["", d.parts.length] as [string, number], ...kinds].map(([k, c]) => (
            <button
              key={k || "all"}
              onClick={() => {
                setKind(k ? (kind === k ? null : k) : null)
                setN(STEP)
              }}
              className="siso-chip siso-press inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px]"
              data-on={(k ? kind === k : !kind) || undefined}
            >
              {k ? kindLabel(k) : "All"} <b className="font-semibold tabular-nums">{fmtInt(c)}</b>
            </button>
          ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {parts.slice(0, n).map((x) => (
          <PartCard key={x.n} x={x} reg={id!} onOpen={() => setOpen(x)} />
        ))}
      </div>
      {parts.length === 0 && <p className="py-6 text-sm text-muted-foreground">No parts match.</p>}
      {n < parts.length && (
        <button onClick={() => setN(n + STEP)} className="mt-6 h-9 rounded-md border px-3 text-sm hover:bg-muted">
          Show {fmtInt(Math.min(STEP, parts.length - n))} more ({fmtInt(parts.length - n)} left)
        </button>
      )}
      <Preview x={open} frame={d.frame} home={d.home} onClose={() => setOpen(null)} />
    </div>
  )
}
