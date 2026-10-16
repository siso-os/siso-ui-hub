// uihub: siso:stage
// The Stage (spec C3, .agents/plan/2026-10-15-sitemap-and-specs.md): one part live at real size, never a screenshot when
// a live view is held; width (desktop, tablet, phone), reload, fullscreen, and sound/image/video when that is what it is.
// The component page and the kind page (the kit's pick for a slot) both show parts on it.
import { useRef, useState } from "react"
import { AudioWaveform, ExternalLink, Eye, Image as ImageIcon, Maximize2, Monitor, Play, RotateCw, Smartphone, Tablet } from "lucide-react"
import { cn } from "@/lib/utils"
import type { FullRow, Row } from "@/lib/data"
import { Skeleton } from "@/components/ui/skeleton"
import { KindIcon } from "@/components/bits"
import { glassy } from "@/components/ItemCard"
import { SoundTile } from "@/components/Sound"

type Mode = "sound" | "preview" | "image" | "video"
const WIDTHS = { desktop: "100%", tablet: "768px", phone: "390px" } as const

export function Stage({ row, full, className }: { row: Row; full: FullRow | null | undefined; className?: string }) {
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
    <div ref={box} className={cn("siso-rim overflow-hidden rounded-[18px] p-1.5", m === "preview" && live ? "is-working" : "is-idle", className)} data-verify-preview>
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
