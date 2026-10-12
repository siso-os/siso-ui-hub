// uihub: siso:page-component
import { useMemo, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { AudioWaveform, Check, ChevronDown, ClipboardCopy, Code2, ExternalLink, Eye, FileCode2, Image as ImageIcon, Maximize2, Monitor, Play, Plug, RotateCw, Smartphone, Tablet, Terminal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { authorHref, catLink, catName, fmtNum, sortRows, usePublic, useIndex, useItem, type FullRow, type Row } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { BookmarkToggle, CodeLine, CopyButton, KindIcon, SignalBadge, SourceBadge, StatusDot } from "@/components/bits"
import { ItemCard, glassy } from "@/components/ItemCard"
import { SideCard } from "@/components/SideCard"
import { SoundTile } from "@/components/Sound"

type Mode = "sound" | "preview" | "image" | "video"
const WIDTHS = { desktop: "100%", tablet: "768px", phone: "390px" } as const

function PreviewPanel({ row, full }: { row: Row; full: FullRow | null | undefined }) {
  const live = full?.live || undefined
  const image = full?.preview || row.p
  const video = full?.video || undefined
  const modes: Mode[] = [row.au && "sound", live && "preview", image && "image", video && "video"].filter(Boolean) as Mode[]
  const [mode, setMode] = useState<Mode | null>(null)
  const m: Mode | undefined = mode && modes.includes(mode) ? mode : modes[0]
  const [width, setWidth] = useState<keyof typeof WIDTHS>("desktop")
  const [nonce, setNonce] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  // no live view and no video: the preview image is the view, shown at its own size
  const still = full !== undefined && !live && !video && !!image
  const openUrl = (m === "sound" ? row.au : m === "preview" ? live : m === "video" ? video : image) as string | undefined
  const tb = "grid size-7 place-items-center rounded-[7px] text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground data-[on=true]:bg-foreground/10 data-[on=true]:text-neon-ink"

  return (
    <div ref={box} className={cn("siso-rim overflow-hidden rounded-[18px] p-1.5", m === "preview" && live ? "is-working" : "is-idle")} data-verify-preview>
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-0.5 rounded-[10px] border bg-background/75 p-0.5 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.6)] backdrop-blur-md" role="toolbar" aria-label="Preview tools">
        <button className={tb} onClick={() => (document.fullscreenElement ? document.exitFullscreen() : box.current?.requestFullscreen())} aria-label="Fullscreen" title="Fullscreen">
          <Maximize2 className="size-3.5" />
        </button>
        {m === "preview" && (
          <>
            <button className={tb} onClick={() => setNonce((n) => n + 1)} aria-label="Reload preview" title="Reload">
              <RotateCw className="size-3.5" />
            </button>
            <span className="mx-0.5 h-4 w-px bg-border" />
            {(["desktop", "tablet", "phone"] as const).map((w) => {
              const I = w === "desktop" ? Monitor : w === "tablet" ? Tablet : Smartphone
              return (
                <button key={w} className={tb} data-on={width === w} onClick={() => setWidth(w)} aria-label={w} title={w}>
                  <I className="size-3.5" />
                </button>
              )
            })}
          </>
        )}
        {modes.length > 1 && <span className="mx-0.5 h-4 w-px bg-border" />}
        {modes.length > 1 &&
          modes.map((x) => {
            const I = x === "sound" ? AudioWaveform : x === "preview" ? Eye : x === "image" ? ImageIcon : Play
            return (
              <button key={x} className={tb} data-on={m === x} onClick={() => setMode(x)} aria-label={x} title={x[0].toUpperCase() + x.slice(1)}>
                <I className="size-3.5" />
              </button>
            )
          })}
        {openUrl && (
          <a className={tb} href={openUrl} target="_blank" rel="noreferrer" aria-label="Open in new tab" title="Open in new tab">
            <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>
      <div className={cn("flex justify-center overflow-auto rounded-[13px] bg-background", !still && (m === "sound" ? "h-[340px]" : "h-[min(72vh,640px)] min-h-[340px]"))}>
        {full === undefined && !image ? (
          <Skeleton className="m-6 h-auto flex-1" />
        ) : m === "sound" && row.au ? (
          <div className="flex w-full flex-col">
            <SoundTile row={row} big className="w-full flex-1" />
            {full?.audio_licence && (
              <p className="pb-5 text-center text-xs text-muted-foreground" data-verify-sound-credit>
                {full.audio_licence}
                {full.audio_author ? ` · by ${full.audio_author}` : ""}
              </p>
            )}
          </div>
        ) : m === "preview" && live ? (
          <iframe
            key={nonce}
            src={live}
            title={`${row.t} live preview`}
            data-verify-iframe
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
            className={cn("h-full max-w-full bg-background transition-[width]", width !== "desktop" && "border-x")}
            style={{ width: WIDTHS[width] }}
          />
        ) : m === "video" && video ? (
          <video src={video} controls autoPlay muted loop playsInline className="max-h-full max-w-full self-center" />
        ) : image && still ? (
          <img src={image} alt={row.t} className="h-auto w-full rounded-lg" data-verify-still-image />
        ) : image ? (
          <span className={cn("flex max-h-full max-w-full self-center", glassy(row) && "siso-glass-stage rounded-lg")}>
            <img src={image} alt={row.t} className="max-h-full max-w-full object-contain" />
          </span>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
            <KindIcon kind={row.k} className="size-8" strokeWidth={1.25} />
            {full?.preview_link || row.pl ? (
              <a href={full?.preview_link || row.pl} target="_blank" rel="noreferrer" className="rounded-md border px-4 py-2 text-neon-ink hover:bg-accent" data-verify-preview-link>
                Open preview by {full?.preview_credit || row.pc || row.a || row.s} ↗
              </a>
            ) : "No preview held for this item."}
            {(full?.preview_link || row.pl) && <p className="max-w-sm px-4 text-center text-xs">View the original preview and its usage terms at the source.</p>}
          </div>
        )}
      </div>
    </div>
  )
}

function buildPrompt(row: Row, full: FullRow | null | undefined, pub: boolean): string {
  const note = pub ? undefined : full?.curated?.note || row.nt
  return [
    `Add "${row.t}" from SISO UI Hub (${row.id}) to this project.`,
    full?.install && `Install: ${full.install}.`,
    full?.licence && `Licence: ${full.licence}.`,
    `Mark the component file with: // uihub: ${row.id}.`,
    note && `Shaan's note: "${note}".`,
    "Rebuild against this project's tokens; never paste 21st.dev code into a product.",
  ]
    .filter(Boolean)
    .join(" ")
}

function useCopy() {
  const [done, setDone] = useState<string | null>(null)
  return [
    done,
    (key: string, text: string) => {
      navigator.clipboard?.writeText(text).catch(() => {})
      setDone(key)
      setTimeout(() => setDone(null), 1300)
    },
  ] as const
}

/** For items we hold only as a picture (templates, themes, shaders…): open it where it lives. */
function ViewOnlyActions({ row, full }: { row: Row; full: FullRow }) {
  const [done, copy] = useCopy()
  const pub = usePublic()
  const on21 = !!full.url && /(^|\.)21st\.dev\//.test(full.url.replace(/^https?:\/\//, ""))
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2" data-verify-actions>
        {full.url && (
          <a href={full.url} target="_blank" rel="noreferrer" className="neon-glow inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90" data-verify-open-origin>
            <ExternalLink className="size-3.5" />
            {on21 ? "Open on 21st" : "Open origin"}
          </a>
        )}
        <BookmarkToggle row={row} withLabel />
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground" onClick={() => copy("prompt", buildPrompt(row, full, !!pub))}>
          {done === "prompt" ? <Check className="size-3.5" /> : <ClipboardCopy className="size-3.5" />}
          {done === "prompt" ? "Copied" : "Copy prompt"}
        </Button>
      </div>
      {full.licence && (
        <p className="text-xs text-muted-foreground" data-verify-licence>
          Licence: {full.licence}
        </p>
      )}
    </div>
  )
}

function Actions({ row, full }: { row: Row; full: FullRow | null | undefined }) {
  const [done, copy] = useCopy()
  const pub = usePublic()
  const install = full?.install
  if (full && !full.live && !full.files?.length && !install) return <ViewOnlyActions row={row} full={full} />
  return (
    <div className="flex flex-wrap items-center gap-2" data-verify-actions>
      <div className="neon-glow flex h-8 overflow-hidden rounded-md bg-primary text-primary-foreground">
        <button className="flex items-center gap-1.5 px-3 text-sm font-medium hover:bg-primary/90" onClick={() => copy("prompt", buildPrompt(row, full, !!pub))} data-verify-copy-prompt>
          {done === "prompt" ? <Check className="size-3.5" /> : <ClipboardCopy className="size-3.5" />}
          {done === "prompt" ? "Copied" : "Copy prompt"}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="border-l border-primary-foreground/20 px-2 hover:bg-primary/90" aria-label="More copy options">
              <ChevronDown className="size-3.5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuItem disabled={!install} onSelect={() => install && copy("install", install)}>
              <Terminal className="size-3.5" /> Copy install line
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => copy("mcp", `take_item {"id":"${row.id}"}`)}>
              <Plug className="size-3.5" /> Copy MCP call
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => copy("cli", `uihub show ${row.id}`)}>
              <Code2 className="size-3.5" /> Copy uihub show
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <BookmarkToggle row={row} withLabel />
      <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground" disabled={!install} onClick={() => install && copy("install", install)}>
        {done === "install" ? <Check className="size-3.5" /> : <Terminal className="size-3.5" />}
        {done === "install" ? "Copied" : "CLI"}
      </Button>
      {full?.url && (
        <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-muted-foreground" asChild>
          <a href={full.url} target="_blank" rel="noreferrer">
            <ExternalLink className="size-3.5" /> Origin
          </a>
        </Button>
      )}
      {done && done !== "prompt" && done !== "install" && <span className="text-xs text-muted-foreground">Copied</span>}
    </div>
  )
}

function DocList({ v }: { v: string[] | string }) {
  if (typeof v === "string") return <p className="text-sm text-muted-foreground">{v}</p>
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/50">
      {v.map((x, i) => (
        <li key={i}>{x}</li>
      ))}
    </ul>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b py-3 last:border-b-0 sm:grid-cols-[160px_1fr] sm:gap-4">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <div className="min-w-0 text-sm">{children}</div>
    </div>
  )
}

const LIB_SOURCES = new Set(["arc", "opensourceui", "spaceui", "kinetics", "easyui", "kobra", "uselayouts", "bencho", "toolcraft", "feralui", "devigner"])

export default function ComponentPage() {
  const idx = useIndex()!
  const id = decodeURIComponent(useParams().id || "")
  const row = idx.byId.get(id)
  const full = useItem(row ? id : undefined)

  const related = useMemo(() => {
    if (!row?.c) return []
    return sortRows((idx.byCategory.get(row.c) || []).filter((r) => r.id !== row.id), "best").slice(0, 9)
  }, [idx, row])

  // picture-only items: up to 12 from the same category, the same author's first, originals before remixes
  const moreLike = useMemo(() => {
    if (!row?.c) return []
    const remix = (r: Row) => (/remix/i.test(r.t) ? 1 : 0)
    return (idx.byCategory.get(row.c) || [])
      .filter((r) => r.id !== row.id)
      .sort((a, b) => Number(b.a === row.a) - Number(a.a === row.a) || remix(a) - remix(b) || b._r - a._r || a.t.localeCompare(b.t))
      .slice(0, 12)
  }, [idx, row])

  if (!row)
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">Not in the hub</h1>
        <p className="mt-2 text-sm text-muted-foreground">No item with the id “{id}”.</p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/browse">Browse all</Link>
        </Button>
      </div>
    )

  const note = idx.public ? undefined : full?.curated?.note || row.nt
  const signal = full?.curated?.signal || row.sig
  const files = full?.files || []
  const isLib = LIB_SOURCES.has(row.s)
  // held only as a picture: no live view, no code, no install line (templates, themes, shaders, gradients, ASCII art)
  const viewOnly = !!full && !full.live && !files.length && !full.install
  const docs = full?.docs ? Object.entries(full.docs).filter(([, v]) => (Array.isArray(v) ? v.length : v)) : []

  const detailsBody = (
      <div className="rounded-lg border px-4">
        {(full?.desc || row.d) && <Field label="Description">{full?.desc || row.d}</Field>}
        {docs.map(([k, v]) => (
          <Field key={k} label={k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}>
            <DocList v={v} />
          </Field>
        ))}
        {full?.sections?.length ? <Field label="Sections"><DocList v={full.sections} /></Field> : null}
        {full?.deps?.length ? (
          <Field label="Dependencies">
            <div className="flex flex-wrap gap-1.5">
              {full.deps.map((d) => (
                <Badge key={d} variant="outline" className="font-mono text-[11px] font-normal">{d}</Badge>
              ))}
            </div>
          </Field>
        ) : null}
        {(full?.tags || row.tg)?.length ? (
          <Field label="Tags">
            <div className="flex flex-wrap gap-1.5">
              {(full?.tags || row.tg || []).map((t) => (
                <Link key={t} to={`/browse?q=${encodeURIComponent(t)}`}>
                  <Badge variant="secondary" className="font-normal">{t}</Badge>
                </Link>
              ))}
            </div>
          </Field>
        ) : null}
        {full?.score && (
          <Field label="Score">
            {full.score.bank !== undefined && <span className="tabular-nums">{full.score.bank}</span>} {full.score.lane && <span className="text-muted-foreground">· {full.score.lane}</span>}
            {full.score.why && <p className="mt-1 text-muted-foreground">{full.score.why}</p>}
          </Field>
        )}
        {full?.reason && <Field label="Why we built it">{full.reason}</Field>}
        {full?.from && <Field label="From">{full.from}</Field>}
        {full?.where && <Field label="Where">{full.where}</Field>}
        {full?.res_kind && <Field label="Resource kind">{full.res_kind}</Field>}
        {full?.tier && <Field label="Tier">{full.tier}</Field>}
        {full?.licence && <Field label="Licence">{full.licence}</Field>}
        {full?.url && (
          <Field label="Origin">
            <a href={full.url} target="_blank" rel="noreferrer" className="break-all underline-offset-4 hover:underline">
              {full.url}
            </a>
          </Field>
        )}
        <Field label="Id">
          <code className="font-mono text-xs">{row.id}</code>
        </Field>
      </div>
  )

  return (
    <div className="mx-auto max-w-[1320px] space-y-10" data-verify-item={row.id}>
      {/* the part on the left, the right-hand box beside it (10 Oct: "design it for the right hand side card") */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
      <div className="min-w-0 space-y-6">
      <header className="space-y-3">
        <h1 className="text-[26px] leading-[1.1] font-semibold lg:text-[30px]">{row.t}</h1>
        {(full?.desc || row.d) && <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{full?.desc || row.d}</p>}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
          {row.a && (
            <Link to={authorHref(row.a)} className="flex items-center gap-2 hover:underline">
              <span className="grid size-6 place-items-center rounded-full bg-secondary text-[9px] font-medium uppercase shadow-[0_0_0_1.5px_color-mix(in_srgb,var(--siso-orange)_45%,transparent)]">{row.a.slice(0, 2)}</span>
              by {row.a}
            </Link>
          )}
          <span className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            <SourceBadge source={row.s} />
            <span>{idx.kind_labels[row.k] || row.k}</span>
            <span>·</span>
            <StatusDot status={row.st} withLabel />
            {signal && <SignalBadge signal={signal} />}
            {row.u ? <span className="tabular-nums">· {fmtNum(row.u)} installs</span> : null}
          </span>
        </div>
      </header>

      {(note || full?.pick?.why) && (
        <div className="space-y-3">
          {note && (
            <blockquote className="relative overflow-hidden rounded-[14px] border bg-card py-3.5 pr-4 pl-5 shadow-lift before:absolute before:inset-y-3 before:left-0 before:w-[3px] before:rounded-r-full before:bg-[image:var(--siso-gradient-brand)] before:shadow-[0_0_14px_rgb(255_120_30/0.7)]">
              <p className="text-[15px] leading-relaxed">“{note}”</p>
              <footer className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                Shaan{full?.curated?.session ? `, ${full.curated.session}` : ""}
                {full?.curated?.targets?.length ? <span>· for {full.curated.targets.join(", ")}</span> : null}
              </footer>
            </blockquote>
          )}
          {full?.pick?.why && (
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Why it is picked: </span>
              {full.pick.why}
            </p>
          )}
        </div>
      )}

      <PreviewPanel key={row.id} row={row} full={full} />

      {viewOnly ? (
        <section className="max-w-4xl space-y-3" data-verify-details-inline>
          <h2 className="text-lg font-semibold tracking-tight">Details</h2>
          {detailsBody}
        </section>
      ) : (
      <Tabs defaultValue={files.length ? "code" : "install"} key={row.id + (full ? "1" : "0")}>
        <TabsList>
          {!viewOnly && <TabsTrigger value="code">Code</TabsTrigger>}
          {!viewOnly && <TabsTrigger value="install">Install</TabsTrigger>}
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        {!viewOnly && <TabsContent value="code" className="mt-4 space-y-4">
          {full === undefined && <Skeleton className="h-40" />}
          {full && !files.length && (
            <div className="rounded-[14px] border border-dashed p-6 text-sm text-muted-foreground">
              {idx.public && row.s === "21st"
                ? "This component's code stays with its author: install it with the line on the Install tab."
                : isLib
                  ? "Library items are installed with their line (see Install), not copied here."
                  : "No code is held for this item."}
            </div>
          )}
          {files.map((f) => (
            <div key={f.file} className="overflow-hidden rounded-[14px] border bg-card shadow-lift">
              <div className="flex items-center gap-2 border-b bg-foreground/[0.03] px-3 py-2">
                <FileCode2 className="size-3.5 text-muted-foreground" />
                <span className="font-mono text-xs">{f.file}</span>
                {f.code && <span className="text-[11px] text-muted-foreground">{f.code.split("\n").length} lines</span>}
                {f.code && <CopyButton text={f.code} className="ml-auto" />}
              </div>
              {f.code ? (
                <pre className="max-h-[480px] overflow-auto p-4 font-mono text-xs leading-relaxed">
                  <code>{f.code}</code>
                </pre>
              ) : (
                <p className="p-4 text-sm text-muted-foreground">Installed with its line, not copied here.</p>
              )}
            </div>
          ))}
        </TabsContent>}

        {!viewOnly && <TabsContent value="install" className="mt-4 max-w-3xl space-y-5">
          {full?.install ? (
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-muted-foreground">Install</div>
              <CodeLine text={full.install} />
            </div>
          ) : (
            full && <p className="text-sm text-muted-foreground">No install line held. Use it through the hub:</p>
          )}
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-muted-foreground">From a shell (agents)</div>
            <CodeLine text={`bin/uihub show ${row.id}`} />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-muted-foreground">From the MCP</div>
            <CodeLine text={`take_item({"id": "${row.id}"})`} />
          </div>
          <div className="space-y-1.5">
            <div className="text-xs font-medium text-muted-foreground">Mark the file that uses it</div>
            <CodeLine text={`// uihub: ${row.id}`} />
          </div>
        </TabsContent>}

        <TabsContent value="details" className="mt-4 max-w-4xl">
          {detailsBody}
        </TabsContent>
      </Tabs>
      )}
      </div>
      <SideCard row={row} full={full} actions={<Actions row={row} full={full} />} />
      </div>

      {viewOnly && moreLike.length > 0 && (
        <section className="space-y-4 pt-4" data-verify-more-like>
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">More like this</h2>
            {row.c && (
              <Link to={catLink(idx, row.c)} className="text-sm text-muted-foreground hover:text-foreground">
                All {catName(idx, row.c)}
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
            {moreLike.map((r) => (
              <ItemCard key={r.id} row={r} />
            ))}
          </div>
        </section>
      )}

      {!viewOnly && related.length > 0 && (
        <section className="space-y-4 pt-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold tracking-tight">Related</h2>
            {row.c && (
              <Link to={catLink(idx, row.c)} className="text-sm text-muted-foreground hover:text-foreground">
                All in {catName(idx, row.c)}
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-7 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ItemCard key={r.id} row={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
