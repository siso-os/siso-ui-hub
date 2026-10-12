// uihub: siso:command-search
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { catLabel, itemHref, useIndex, fmtNum } from "@/lib/data"
import { KindIcon } from "./bits"

/** ⌘K: all items by title, category, author and tags, best first, top 30. Our own ranking, so cmdk's filter is off. */
export function CommandSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const idx = useIndex()
  const nav = useNavigate()
  const [q, setQ] = useState("")

  const hits = useMemo(() => {
    if (!idx) return []
    const words = q.toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return idx.items.filter((r) => (idx.public ? r.st === "picked" : r.sig === "love")).slice(0, 30)
    const out: { r: (typeof idx.items)[number]; s: number }[] = []
    for (const r of idx.items) {
      if (!words.every((w) => r._q.includes(w))) continue
      const t = r.t.toLowerCase()
      const s = r._r + (t.startsWith(words[0]) ? 4e8 : 0) + (words.every((w) => t.includes(w)) ? 2e8 : 0)
      out.push({ r, s })
    }
    out.sort((a, b) => b.s - a.s)
    return out.slice(0, 30).map((x) => x.r)
  }, [idx, q])

  const go = (to: string) => {
    onOpenChange(false)
    setQ("")
    nav(to)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false} title="Search the hub" description="Search all items by title, category, author and tags">
      <CommandInput value={q} onValueChange={setQ} placeholder={`Search ${idx ? fmtNum(idx.items.length) : ""} parts: components, sections, shells, tools…`} />
      <CommandList className="max-h-[60vh]">
        <CommandEmpty>No items match.</CommandEmpty>
        <CommandGroup heading={q ? "Items" : idx?.public ? "Picks" : "His loves"}>
          {hits.map((r) => (
            <CommandItem key={r.id} value={r.id} onSelect={() => go(itemHref(r.id))} className="gap-3">
              <KindIcon kind={r.k} className="size-4 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <div className="truncate">{r.t}</div>
                <div className="truncate text-xs text-muted-foreground">
                  {catLabel(r.c)} · {r.a || r.s}
                </div>
              </div>
              {r.sig === "love" && <span className="size-1.5 rounded-full bg-neon" aria-label="love" />}
            </CommandItem>
          ))}
        </CommandGroup>
        {q && (
          <CommandGroup heading="Browse">
            <CommandItem value="__browse" onSelect={() => go(`/browse?q=${encodeURIComponent(q)}`)}>
              <ArrowRight className="size-4" />
              All results for “{q}”
            </CommandItem>
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  )
}
