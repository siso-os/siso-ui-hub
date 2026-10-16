// uihub: siso:page-kit-icons
// The SISO kit's animated icons, live from their own source (app/src/kit/<lib>/icons, written by bin/kit-build). Hover an
// icon to play it, or play a whole row; click to copy its install line. Libraries side by side, MIT only.
import { Suspense, createRef, lazy, useMemo, useState, type ComponentType, type RefObject } from "react"
import { Play, Search } from "lucide-react"
import lucide from "@/kit/lucide-animated/manifest.json"
import animateicons from "@/kit/animateicons/manifest.json"
import { Boundary, WhenNear, pickExport } from "@/components/kit/live"

type Icon = { name: string; file: string }
type Handle = { startAnimation?: () => void }
const LIBS = [
  { id: "lucide-animated", name: "lucide-animated", note: "Lucide icons with motion, by pqoqubbw · MIT", icons: lucide as Icon[], install: (n: string) => `npx shadcn@latest add "https://lucide-animated.com/r/${n}.json"` },
  { id: "animateicons", name: "AnimateIcons", note: "animateicons.in · MIT", icons: animateicons as Icon[], install: (n: string) => `npx shadcn@latest add "https://animateicons.in/r/${n}.json"` },
]
const mods = import.meta.glob("../kit/*/icons/*.tsx") as Record<string, () => Promise<Record<string, unknown>>>

const cache = new Map<string, ComponentType<{ size?: number; ref?: RefObject<Handle | null> }>>()
function live(lib: string, i: Icon) {
  const k = `${lib}/${i.name}`
  let C = cache.get(k)
  if (!C) {
    const load = mods[`../kit/${lib}/${i.file}`]
    C = lazy(async () => {
      if (!load) throw new Error("missing")
      const E = pickExport(await load())
      if (!E) throw new Error("no export")
      return { default: E as ComponentType<{ size?: number }> }
    })
    cache.set(k, C)
  }
  return C
}

const ROW = 60

export default function KitIcons() {
  const [lib, setLib] = useState(LIBS[0].id)
  const [q, setQ] = useState("")
  const [copied, setCopied] = useState("")
  const L = LIBS.find((l) => l.id === lib)!
  const icons = useMemo(() => L.icons.filter((i) => i.name.includes(q.trim().toLowerCase())), [L, q])
  const refs = useMemo(() => new Map(icons.map((i) => [i.name, createRef<Handle>()])), [icons])
  const chunks = useMemo(() => Array.from({ length: Math.ceil(icons.length / ROW) }, (_, n) => icons.slice(n * ROW, n * ROW + ROW)), [icons])
  const playChunk = (c: Icon[]) => c.forEach((i, n) => setTimeout(() => refs.get(i.name)?.current?.startAnimation?.(), n * 25))
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-6">
      <header className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">SISO kit</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Animated icons</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">Every icon runs from its own source. Hover one to see it move, play a block of them at once, click to copy its install line.</p>
      </header>
      <div className="sticky top-0 z-20 -mx-6 mb-6 flex flex-wrap items-center gap-3 border-b border-border/60 bg-background/90 px-6 py-2.5 backdrop-blur">
        <div className="flex gap-1 text-xs">
          {LIBS.map((l) => (
            <button key={l.id} onClick={() => setLib(l.id)} className={`rounded-full border px-2.5 py-1 ${lib === l.id ? "border-white/40 text-foreground" : "border-border text-muted-foreground"}`}>
              {l.name} <span className="opacity-60">{l.icons.length}</span>
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs">
          <Search className="size-3.5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find an icon" className="w-40 bg-transparent outline-none" />
        </label>
        <span className="font-mono text-[11px] text-muted-foreground">{icons.length} shown · {L.note}</span>
        {copied && <span className="ml-auto font-mono text-[11px] text-emerald-400">copied {copied}</span>}
      </div>
      {chunks.map((c, n) => (
        <section key={`${lib}-${q}-${n}`} className="group/row relative mb-3">
          <button onClick={() => playChunk(c)} className="absolute -left-5 top-2 hidden text-muted-foreground hover:text-foreground group-hover/row:block" title="Play this block">
            <Play className="size-3.5" />
          </button>
          <WhenNear minH={Math.ceil(c.length / 12) * 96} className="grid w-full grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-12">
            {c.map((i) => {
              const C = live(lib, i)
              return (
                <button
                  key={i.name}
                  id={i.name}
                  onClick={() => navigator.clipboard.writeText(L.install(i.name)).then(() => setCopied(i.name))}
                  className="flex h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-border/60 bg-card/40 text-foreground hover:border-white/30"
                  title={i.name}
                >
                  <Boundary onError={() => {}}>
                    <Suspense fallback={<span className="size-6" />}>
                      <C size={26} ref={refs.get(i.name)} />
                    </Suspense>
                  </Boundary>
                  <span className="w-full truncate px-1 text-center font-mono text-[10px] text-muted-foreground">{i.name}</span>
                </button>
              )
            })}
          </WhenNear>
        </section>
      ))}
    </div>
  )
}
