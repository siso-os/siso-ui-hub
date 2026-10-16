// uihub: siso:set-comments
// Comments, the SISO set's way (a gap ECOSYSTEM named on 15 Oct): a composer, then a thread one reply deep. Like and
// reply in place; the author's own replies carry a mark; newest or top first. Sample people and words only.
import { useState } from "react"
import { Heart, MessageCircle, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

type Note = { id: string; who: string; at: string; text: string; likes: number; mine?: boolean; author?: boolean; replies?: Note[] }

const SEED: Note[] = [
  { id: "a", who: "Maya Okafor", at: "2h", likes: 12, text: "The part about one source of truth for components saved us a week. Do you keep the registry in git too?",
    replies: [{ id: "a1", who: "SISO", at: "1h", likes: 4, author: true, text: "Yes: every part has a file and a reason, and the check fails on one that has neither." }] },
  { id: "b", who: "Tom Reyes", at: "5h", likes: 7, text: "Would love a follow-up on how you score look-alikes before folding them." },
  { id: "c", who: "Ana Lima", at: "1d", likes: 3, text: "Shared this with our design team. The slots idea maps well onto how we already pick." },
]

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("")

function Face({ who, author }: { who: string; author?: boolean }) {
  return (
    <span className={cn("grid size-8 shrink-0 place-items-center rounded-full font-mono text-[11px]", author ? "bg-neon text-neon-ink" : "bg-foreground/[0.08] text-foreground")}>
      {initials(who)}
    </span>
  )
}

function Composer({ onPost, placeholder, autoFocus }: { onPost: (t: string) => void; placeholder: string; autoFocus?: boolean }) {
  const [t, setT] = useState("")
  const post = () => { if (t.trim()) { onPost(t.trim()); setT("") } }
  return (
    <div className="flex items-end gap-2 rounded-[14px] border border-border bg-card p-2 focus-within:border-foreground/30">
      <textarea
        value={t}
        autoFocus={autoFocus}
        onChange={(e) => setT(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) post() }}
        rows={t.includes("\n") ? 3 : 1}
        placeholder={placeholder}
        className="min-h-9 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
      />
      <button onClick={post} disabled={!t.trim()} aria-label="Post" className="grid size-9 place-items-center rounded-[10px] bg-foreground text-background transition-opacity disabled:opacity-30">
        <ArrowUp className="size-4" />
      </button>
    </div>
  )
}

function Item({ n, onReply, depth = 0 }: { n: Note; onReply?: (id: string, t: string) => void; depth?: number }) {
  const [liked, setLiked] = useState(false)
  const [open, setOpen] = useState(false)
  return (
    <li className="flex gap-3">
      <Face who={n.who} author={n.author} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2 text-sm">
          <span className="font-medium text-foreground">{n.who}</span>
          {n.author && <span className="rounded-full bg-neon/15 px-1.5 font-mono text-[11px] tracking-[0.08em] text-neon uppercase">Author</span>}
          <span className="font-mono text-[11px] text-muted-foreground">{n.at}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-foreground/85">{n.text}</p>
        <div className="mt-1.5 flex items-center gap-1 text-muted-foreground">
          <button onClick={() => setLiked((v) => !v)} aria-pressed={liked} className={cn("flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[11px] tabular-nums hover:bg-foreground/[0.05]", liked && "text-neon")}>
            <Heart className={cn("size-3.5", liked && "fill-current")} /> {n.likes + (liked ? 1 : 0)}
          </button>
          {depth === 0 && onReply && (
            <button onClick={() => setOpen((v) => !v)} className="flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[11px] hover:bg-foreground/[0.05]">
              <MessageCircle className="size-3.5" /> Reply
            </button>
          )}
        </div>
        {open && onReply && (
          <div className="mt-2">
            <Composer autoFocus placeholder={`Reply to ${n.who.split(" ")[0]}`} onPost={(t) => { onReply(n.id, t); setOpen(false) }} />
          </div>
        )}
        {!!n.replies?.length && (
          <ul className="mt-4 space-y-4 border-l border-border pl-4">
            {n.replies.map((r) => <Item key={r.id} n={r} depth={1} />)}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function Comments() {
  const [notes, setNotes] = useState(SEED)
  const [order, setOrder] = useState<"top" | "new">("top")
  const count = notes.reduce((t, n) => t + 1 + (n.replies?.length ?? 0), 0)
  const shown = order === "top" ? [...notes].sort((a, b) => b.likes - a.likes) : notes
  const add = (text: string) => setNotes((ns) => [{ id: crypto.randomUUID(), who: "You", at: "now", likes: 0, mine: true, text }, ...ns])
  const reply = (id: string, text: string) =>
    setNotes((ns) => ns.map((n) => (n.id === id ? { ...n, replies: [...(n.replies ?? []), { id: crypto.randomUUID(), who: "You", at: "now", likes: 0, mine: true, text }] } : n)))
  return (
    <section className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <header className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium text-foreground">
          Comments <span className="font-mono text-sm text-muted-foreground tabular-nums">{count}</span>
        </h2>
        <div className="flex gap-1 rounded-[10px] bg-foreground/[0.04] p-0.5" role="tablist" aria-label="Order">
          {(["top", "new"] as const).map((o) => (
            <button key={o} role="tab" aria-selected={order === o} onClick={() => setOrder(o)} className={cn("rounded-[8px] px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] uppercase", order === o ? "bg-foreground/[0.08] text-foreground" : "text-muted-foreground")}>
              {o === "top" ? "Top" : "Newest"}
            </button>
          ))}
        </div>
      </header>
      <Composer placeholder="Add a comment" onPost={add} />
      <ul className="space-y-6">
        {shown.map((n) => <Item key={n.id} n={n} onReply={reply} />)}
      </ul>
    </section>
  )
}
