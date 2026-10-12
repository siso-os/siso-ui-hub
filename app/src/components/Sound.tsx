// A sound part's preview is hearing it: its waveform and a play button, on its card and on its page. soundcn and
// elements keep each recording in the part's code; the build writes it to /a/s/ with its length and a 40-bar waveform
// (bin/hubindex.py sound_file). One sound plays at a time across the hub.
import { useEffect, useState, useSyncExternalStore } from "react"
import { Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Row } from "@/lib/data"

let audio: HTMLAudioElement | null = null
let current: string | null = null
const subs = new Set<() => void>()
const emit = () => subs.forEach((f) => f())
const subscribe = (f: () => void) => {
  subs.add(f)
  return () => {
    subs.delete(f)
  }
}

function toggle(src: string) {
  if (!audio) {
    audio = new Audio()
    audio.addEventListener("ended", () => {
      current = null
      emit()
    })
    audio.addEventListener("pause", emit)
    audio.addEventListener("play", emit)
  }
  if (current === src && !audio.paused) {
    audio.pause()
    current = null
    emit()
    return
  }
  current = src
  audio.src = src
  audio.play().catch(() => {
    current = null
    emit()
  })
  emit()
}

const usePlaying = (src: string | undefined) => useSyncExternalStore(subscribe, () => !!src && current === src && !!audio && !audio.paused)

/** how far through the playing sound is, 0 to 1, each frame while it plays */
function useProgress(on: boolean) {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (!on) {
      setP(0)
      return
    }
    let raf = 0
    const tick = () => {
      if (audio && audio.duration) setP(audio.currentTime / audio.duration)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [on])
  return p
}

/** 0.4 s, 4.0 s, 0:32, 2:05 */
export const fmtLen = (s?: number | null) =>
  s == null ? "" : s < 10 ? `${s.toFixed(1)} s` : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`

export function SoundTile({ row, big = false, className }: { row: Pick<Row, "t" | "au" | "du" | "w">; big?: boolean; className?: string }) {
  const on = usePlaying(row.au)
  const p = useProgress(on)
  const bars = (row.w || "2".repeat(40)).split("")
  const Icon = on ? Pause : Play
  return (
    <button
      type="button"
      onClick={() => row.au && toggle(row.au)}
      aria-label={on ? `Stop ${row.t}` : `Play ${row.t}`}
      aria-pressed={on}
      className={cn("group/sound flex flex-col justify-center text-left outline-none focus-visible:ring-2 focus-visible:ring-ring", big ? "gap-6 px-[8%]" : "gap-3 px-[9%]", className)}
      data-verify-sound={row.au}
    >
      <span className={cn("flex items-center gap-[2px]", big ? "h-40" : "h-[42%]")} aria-hidden>
        {bars.map((d, k) => (
          <span
            key={k}
            className={cn("flex-1 rounded-full transition-colors duration-150", k / bars.length < p ? "bg-neon" : on ? "bg-foreground/35" : "bg-foreground/20 group-hover/sound:bg-foreground/30")}
            style={{ height: `${8 + (Number(d) / 9) * 92}%` }}
          />
        ))}
      </span>
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-[transform,box-shadow] duration-200 group-hover/sound:scale-105",
            big ? "size-14" : "size-9",
            on ? "bg-neon text-black shadow-[0_0_28px_-4px_var(--neon)]" : "bg-foreground/90 text-background",
          )}
        >
          <Icon className={big ? "size-6" : "size-4"} fill="currentColor" strokeWidth={0} />
        </span>
        <span className={cn("tabular-nums text-muted-foreground", big ? "text-sm" : "text-xs")}>{fmtLen(row.du)}</span>
      </span>
    </button>
  )
}
