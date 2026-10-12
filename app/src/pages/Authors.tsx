// uihub: siso:page-authors
import { useMemo, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { authorHref, useIndex, useMeta } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { BrowseView } from "@/components/BrowseView"
import { PageHeader } from "@/components/bits"

const STEP = 120

export function Authors() {
  const meta = useMeta()
  const idx = useIndex()!
  const [q, setQ] = useState("")
  const [n, setN] = useState(STEP)
  const libNames = useMemo(() => new Set((meta?.libraries || []).map((l) => l.name)), [meta])
  const sourceOf = useMemo(() => {
    const m = new Map<string, string>()
    for (const r of idx.items) if (r.a && !m.has(r.a)) m.set(r.a, r.s)
    return m
  }, [idx])
  const list = useMemo(() => {
    const all = meta?.authors || []
    const w = q.toLowerCase().trim()
    return w ? all.filter((a) => a.name.toLowerCase().includes(w)) : all
  }, [meta, q])
  const libs = list.filter((a) => libNames.has(a.name))
  const people = list.filter((a) => !libNames.has(a.name))

  const Row = ({ name, items }: { name: string; items: number }) => (
    <Link to={authorHref(name)} className="siso-glow-card flex items-center gap-3 px-3 py-2.5" data-verify-author={name}>
      <span className="grid size-8 shrink-0 place-items-center rounded-full border bg-muted text-[11px] font-medium uppercase">{name.slice(0, 2)}</span>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{name}</div>
        <div className="truncate font-mono text-[11px] text-muted-foreground">{sourceOf.get(name) || ""}</div>
      </div>
      <span className="text-xs text-muted-foreground tabular-nums">{items}</span>
    </Link>
  )

  return (
    <div className="space-y-8">
      <PageHeader title="Authors" count={meta?.authors.length} sub="The 21st.dev authors and our libraries, by number of items held.">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find an author…" className="h-8 w-56 text-sm" aria-label="Find an author" />
      </PageHeader>
      {libs.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Libraries</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {libs.map((a) => (
              <Row key={a.name} {...a} />
            ))}
          </div>
        </section>
      )}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">People</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {people.slice(0, n).map((a) => (
            <Row key={a.name} {...a} />
          ))}
        </div>
        {n < people.length && (
          <button onClick={() => setN(n + STEP * 3)} className="h-8 rounded-md border px-3 text-sm text-muted-foreground hover:text-foreground">
            Show more ({people.length - n} left)
          </button>
        )}
      </section>
    </div>
  )
}

export function AuthorPage() {
  const idx = useIndex()!
  const name = decodeURIComponent(useParams().name || "")
  const base = useMemo(() => idx.items.filter((r) => r.a === name), [idx, name])
  return (
    <BrowseView
      key={name}
      title={name}
      base={base}
      sub={
        <Link to="/authors" className="hover:text-foreground">
          All authors
        </Link>
      }
    />
  )
}
