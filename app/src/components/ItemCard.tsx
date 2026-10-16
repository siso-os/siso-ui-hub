// uihub: siso:item-card
// 21st's card: a rounded, bordered preview; under it the title and "by author", a muted uses count at the right.
// His picks get a neon dot and the signal word; the bookmark toggle shows on hover. Source and status live on the item page.
import { alikeKey } from "@/lib/alike"
import { memo, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { Check, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { setBookmark } from "@/lib/bookmarks"
import { useKitSlot, type KitSlot } from "@/lib/kitSlot"
import { fmtNum, itemHref, usePublic, type Row } from "@/lib/data"
import { BookmarkToggle, KindIcon } from "./bits"
import { SoundTile } from "./Sound"

/** OG-image previews (templates, themes, shaders, gradients, ASCII art) are ~1200x630: a wide card. */
const WIDE_CATS = new Set(["motion/shader", "motion/gradient", "motion/ascii"])
export const isWide = (r: Pick<Row, "k" | "c">) => r.k === "page" || r.k === "theme" || WIDE_CATS.has(r.c || "")

/** a picture drawn from the part's own SVG (bin/icons): shown whole, not cropped like a page photo */
export const isDrawn = (r: Pick<Row, "p">) => !!r.p && r.p.endsWith(".svg")
/** a glass part was drawn on plain black, where glass can't be seen: its card puts colour behind the picture (12 Oct) */
export const glassy = (r: Pick<Row, "p" | "looks">) => !!r.p && !!r.looks?.includes("glass")
export const ICON_CATS = new Set(["assets/icon", "assets/logo", "assets/flag", "media/icon"])

/** a reader's 1-5 rating (the bank's types/), as five small marks; the lit ones glow */
export function Stars({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-px", className)} title={`Rated ${n} of 5`} aria-label={`Rated ${n} of 5`} data-verify-rating={n}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("size-1.5 rounded-full", i <= n ? (n >= 4 ? "bg-neon shadow-[0_0_6px_var(--neon)]" : "bg-foreground/60") : "bg-foreground/15")} />
      ))}
    </span>
  )
}

/** "Add to kit" on a card under a node page: makes this part the pick for the slot the page is filling; the picked one
 *  keeps its badge in view, the rest show the button on hover */
function KitButton({ row, kit }: { row: Row; kit: KitSlot }) {
  const mine = kit.picked === row.id
  const tool = "inline-flex h-7 items-center gap-1.5 rounded-lg border px-2 text-[11.5px] font-medium backdrop-blur-md"
  // Add to kit fills the slot you are on; Use as puts it in another of the kind's slots; Skip hides it from this kind
  return (
    <div className={cn("absolute top-2 left-2 z-[3] flex items-center gap-1 transition-[opacity,transform] duration-200", mine ? "opacity-100" : "opacity-0 group-hover:-translate-y-0.5 group-hover:opacity-100 focus-within:opacity-100")}>
      <button
        type="button"
        onClick={() => setBookmark(kit.key, !mine, mine ? {} : { note: row.id })}
        title={mine ? `In the SISO kit as ${kit.label}: click to take it out` : `Make this the SISO kit's ${kit.label}`}
        aria-pressed={mine}
        data-verify-kit-add={row.id}
        className={cn(tool, mine ? "border-neon/50 bg-neon/20 text-neon-ink" : "bg-background/80 text-foreground/85 hover:text-foreground")}
      >
        {mine ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}
        {mine ? "In the kit" : "Add to kit"}
      </button>
      {!mine && kit.others && kit.others.length > 0 && (
        <select aria-label="Use as another slot" value="" onChange={(e) => e.target.value && setBookmark(e.target.value, true, { note: row.id })} className={cn(tool, "max-w-[7.5rem] bg-background/80 text-foreground/85")} data-verify-kit-as={row.id}>
          <option value="">Use as…</option>
          {kit.others.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
        </select>
      )}
      {!mine && kit.skip && (
        <button type="button" onClick={() => setBookmark(`${kit.skip}/${row.id}`, true)} title="Skip: not for the kit, hide it from this kind" aria-label="Skip" className={cn(tool, "bg-background/80 text-muted-foreground hover:text-foreground")} data-verify-kit-skip={row.id}>
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}

export const ItemCard = memo(function ItemCard({ row, note, extra, priority = false, wide, tile }: { row: Row; note?: ReactNode; extra?: ReactNode; priority?: boolean; wide?: boolean; tile?: boolean }) {
  const [broken, setBroken] = useState(false)
  const pub = usePublic()
  const wideCard = !tile && (wide ?? isWide(row))
  const drawn = isDrawn(row)
  const sourcePreview = (!row.p || broken) && row.pl
  const kit = useKitSlot()
  return (
    <div className="group relative flex flex-col gap-2" data-verify-card={row.id}>
      {row.au ? (
        // a sound: the tile is its play button; the title below opens its page
        <SoundTile row={row} className={cn("siso-glow-card relative w-full overflow-hidden", tile ? "aspect-square" : "aspect-[4/3]")} />
      ) : (
      <Link
        to={sourcePreview || itemHref(row.id)}
        target={sourcePreview ? "_blank" : undefined}
        rel={sourcePreview ? "noreferrer" : undefined}
        data-verify-preview-link={sourcePreview || undefined}
        className={cn("siso-glow-card relative block overflow-hidden", tile ? "aspect-square" : wideCard ? "aspect-[1.9/1]" : "aspect-[4/3]", glassy(row) && "siso-glass-stage")}
        aria-label={row.t}
        data-wide={wideCard || undefined}
      >
        {row.p && !broken ? (
          <img src={row.p} alt="" loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" onError={() => setBroken(true)} className={drawn ? cn("size-full object-contain", tile ? "p-[26%]" : "p-[24%]") : "size-full object-cover object-top"} />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 p-4 text-center text-muted-foreground/60">
            <KindIcon kind={row.k} className="size-6" strokeWidth={1.5} />
            {sourcePreview && <span className="text-xs font-medium text-neon-ink">Preview at source ↗</span>}
            {sourcePreview && row.pc && <span className="text-[11px]">By {row.pc}</span>}
            {!sourcePreview && row.lv ? <span className="text-xs font-medium text-neon-ink">Plays live on its page</span> : null}
            {row.d && <p className="line-clamp-3 max-w-[90%] text-[11px] leading-relaxed text-muted-foreground">{row.d}</p>}
          </div>
        )}
      </Link>
      )}
      {kit && <KitButton row={row} kit={kit} />}
      {row._al ? (
        <Link to={`/compare/${row.c}?k=${encodeURIComponent(alikeKey(row))}`} title="Look-alikes from other libraries, folded under this one: compare them" className="absolute top-2 right-11 z-[3] rounded-lg border bg-background/80 px-2 py-1 font-mono text-[10.5px] text-muted-foreground backdrop-blur-md hover:text-foreground" data-verify-alikes-chip>
          +{row._al} look-alike{row._al > 1 ? "s" : ""}
        </Link>
      ) : null}
      <BookmarkToggle
        row={row}
        className="absolute top-2 right-2 z-[3] size-7 rounded-lg border bg-background/75 opacity-0 backdrop-blur-md transition-[opacity,transform] duration-200 group-hover:-translate-y-0.5 group-hover:opacity-100 focus-visible:opacity-100"
      />
      <div className="flex min-h-10 min-w-0 items-start gap-2 px-0.5">
        <div className="min-w-0 flex-1">
          <Link to={itemHref(row.id)} className="block truncate text-sm font-medium transition-colors group-hover:text-foreground" title={row.t}>
            {row.t}
          </Link>
          <div className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            {row.rt ? <Stars n={row.rt} /> : null}
            {row.a ? <span className="truncate">by {row.a}</span> : row.pat ? <span className="truncate" title={`Type: ${row.pat}`}>{row.pat}</span> : null}
            {row.sig && !pub && (
              <span className={cn("inline-flex shrink-0 items-center gap-1", row.sig === "love" ? "neon-text" : "text-foreground/80")} data-signal={row.sig}>
                <span className={cn("size-1.5 rounded-full", row.sig === "love" ? "bg-neon" : "bg-neon/70")} />
                {row.sig}
              </span>
            )}
          </div>
        </div>
        {row.u ? <span className="shrink-0 pt-0.5 text-xs text-muted-foreground tabular-nums">{fmtNum(row.u)}</span> : null}
        {extra}
      </div>
      {note}
    </div>
  )
})
