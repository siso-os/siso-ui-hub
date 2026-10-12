// uihub: siso:hub-bits
import { useEffect, useRef, useState, type ComponentType } from "react"
import {
  Blocks,
  Bookmark,
  BookOpen,
  Check,
  Compass,
  Copy,
  Hand,
  LayoutDashboard,
  LayoutTemplate,
  Library,
  PanelsTopLeft,
  Puzzle,
  Shapes,
  Sparkles,
  Box,
  SwatchBook,
  Wrench,
  Gamepad2,
  Gem,
  type LucideProps,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { isMarked, setBookmark, useBookmarks } from "@/lib/bookmarks"
import { usePublic, type Row, type Signal } from "@/lib/data"

export const KIND_ICON: Record<string, ComponentType<LucideProps>> = {
  component: Box,
  section: PanelsTopLeft,
  page: LayoutTemplate,
  shell: LayoutDashboard,
  layout: Blocks,
  motion: Sparkles,
  interaction: Hand,
  primitive: Shapes,
  toy: Gamepad2,
  lib: BookOpen,
  tool: Wrench,
  asset: Gem,
  resource: Compass,
  theme: SwatchBook,
}
export const KindIcon = ({ kind, ...p }: { kind: string } & LucideProps) => {
  const I = KIND_ICON[kind] || Puzzle
  return <I {...p} />
}
export { Library as LibraryIcon }

export function SourceBadge({ source, className }: { source: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn("h-5 rounded-md px-1.5 font-mono text-[10px] font-normal text-muted-foreground", className)}>
      {source}
    </Badge>
  )
}

export function SignalBadge({ signal, className }: { signal: Signal; className?: string }) {
  const love = signal === "love"
  return (
    <Badge
      variant="outline"
      data-signal={signal}
      className={cn(
        "h-5 rounded-md px-1.5 text-[10px] font-medium capitalize",
        love ? "border-neon/60 text-neon-ink" : signal === "star" ? "text-foreground" : "text-muted-foreground",
        className,
      )}
    >
      {signal}
    </Badge>
  )
}

const STATUS_DOT: Record<string, string> = {
  curated: "bg-foreground",
  picked: "bg-foreground/70",
  ours: "bg-foreground/50",
  rated: "bg-muted-foreground/70",
  reviewed: "bg-muted-foreground/40",
  indexed: "bg-muted-foreground/20",
}
export function StatusDot({ status, withLabel }: { status: string; withLabel?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground" title={status}>
      <span className={cn("size-1.5 rounded-full", STATUS_DOT[status] || "bg-muted-foreground/30")} />
      {withLabel && status}
    </span>
  )
}

export function CopyButton({ text, label, className }: { text: string; label?: string; className?: string }) {
  const [done, setDone] = useState(false)
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn("h-7 gap-1.5 px-2 text-xs", className)}
      onClick={() => {
        navigator.clipboard?.writeText(text).catch(() => {})
        setDone(true)
        setTimeout(() => setDone(false), 1200)
      }}
    >
      {done ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      {label ?? (done ? "Copied" : "Copy")}
    </Button>
  )
}

export function CodeLine({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2 rounded-lg border bg-[var(--siso-rim-fill)] py-1.5 pr-1.5 pl-3 shadow-[inset_0_1px_2px_rgb(0_0_0/0.3)]", className)}>
      <code className="min-w-0 flex-1 truncate font-mono text-xs">{text}</code>
      <CopyButton text={text} />
    </div>
  )
}

export function BookmarkToggle({ row, className, withLabel }: { row: Pick<Row, "id" | "b">; className?: string; withLabel?: boolean }) {
  const { items } = useBookmarks()
  const pub = usePublic()
  const on = isMarked(row, items)
  if (pub) return null
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={withLabel ? "outline" : "ghost"}
          size={withLabel ? "sm" : "icon"}
          aria-pressed={on}
          aria-label={on ? "Remove bookmark" : "Bookmark"}
          data-verify-bookmark={on ? "on" : "off"}
          className={cn(withLabel ? "h-8 gap-1.5" : "size-7", className)}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setBookmark(row.id, !on)
          }}
        >
          <Bookmark className={cn("size-3.5", on && "fill-current text-foreground")} />
          {withLabel && (on ? "Saved" : "Save")}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{on ? "Remove bookmark" : "Bookmark"}</TooltipContent>
    </Tooltip>
  )
}

/** true once the element has come near the viewport (and stays true). */
export function useInView<T extends Element>(margin = "300px") {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setSeen(true), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [seen, margin])
  return [ref, seen] as const
}

export function PageHeader({ title, count, children, sub }: { title: string; count?: number; sub?: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="siso-rise mb-7 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-[26px] leading-[1.1] font-semibold first-letter:uppercase lg:text-[30px]" data-verify-title>
          {title}
          {count !== undefined && <span className="ml-3 inline-block -translate-y-1 rounded-full border bg-foreground/[0.04] px-2 py-0.5 align-middle font-mono text-[11px] font-normal tracking-normal text-muted-foreground tabular-nums" data-verify-count={count}>{count.toLocaleString("en-GB")}</span>}
        </h1>
        {sub && <div className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">{sub}</div>}
      </div>
      {children}
    </div>
  )
}
