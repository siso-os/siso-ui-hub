// uihub: siso:page-kit-shell
// A shell kind (sidebar, top bar, dock, app shell): every one we own at the same desktop size, with its mobile view
// beside it, in one row you swipe sideways. Each frame is the real part in an iframe, so you can click and use it
// (Shaan, 14 Oct: "a page just showing the side navs ... the same ratio ... slides horizontally ... click it to interact").
import { useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { useInView } from "@/components/bits"
import shells from "../../../catalogue/kit-shells.json"

type Part = { id: string; title: string; file: string; about: string }
const S = shells as Record<string, { job: string; parts: Part[] }>
const KINDS = Object.keys(S).filter((k) => S[k].parts.length)
export const DESKTOP = { w: 1280, h: 800 }, MOBILE = { w: 390, h: 844 }
const SCALE = 0.5

export function Device({ id, w, h, label, src, scale = SCALE }: { id: string; w: number; h: number; label: string; src?: string; scale?: number }) {
  const [ref, seen] = useInView<HTMLDivElement>("600px")
  return (
    <figure className="shrink-0">
      <div ref={ref} className="relative overflow-hidden rounded-lg border border-border/70 bg-muted/20" style={{ width: w * scale, height: h * scale }}>
        {seen && <iframe src={src ?? `/frame?id=${encodeURIComponent(id)}`} title={`${id} ${label}`} loading="lazy" className="absolute left-0 top-0 origin-top-left border-0" style={{ width: w, height: h, transform: `scale(${scale})` }} />}
      </div>
      <figcaption className="mt-1 font-mono text-[10px] text-muted-foreground">{label} · {w}×{h}</figcaption>
    </figure>
  )
}

export default function KitShell() {
  const { kind = "sidebar" } = useParams()
  const k = S[kind]
  const row = useRef<HTMLDivElement>(null)
  const slide = (d: number) => row.current?.scrollBy({ left: d * (DESKTOP.w + MOBILE.w) * SCALE, behavior: "smooth" })
  if (!k) return <p className="p-6 text-sm text-muted-foreground">No shell kind called {kind}.</p>
  return (
    <div className="w-full px-6 pb-24 pt-6">
      <header className="mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">SISO kit · shells</p>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-3">
          <h1 className="text-3xl font-semibold capitalize tracking-tight">{kind.replace(/-/g, " ")}</h1>
          <span className="text-sm text-muted-foreground">{k.job} · {k.parts.length} we hold</span>
        </div>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">Every one at the same desktop size with its phone view beside it, at half size. Swipe sideways or use the arrows; click inside a frame to use it.</p>
        <nav className="mt-3 flex flex-wrap gap-1.5">
          {KINDS.map((n) => (
            <Link key={n} to={`/kit/shells/${n}`} className={`rounded-full border px-3 py-1 text-xs capitalize ${n === kind ? "border-primary/60 bg-primary/10 text-foreground" : "border-border/60 text-muted-foreground hover:bg-muted"}`}>{n.replace(/-/g, " ")} <span className="font-mono">{S[n].parts.length}</span></Link>
          ))}
          <Link to="/kit/map" className="ml-auto rounded-full px-3 py-1 text-xs text-muted-foreground hover:bg-muted">The map</Link>
        </nav>
      </header>
      <div className="mb-2 flex gap-1.5">
        <button onClick={() => slide(-1)} className="rounded-md border border-border/60 p-1.5 hover:bg-muted" aria-label="Previous"><ChevronLeft className="size-4" /></button>
        <button onClick={() => slide(1)} className="rounded-md border border-border/60 p-1.5 hover:bg-muted" aria-label="Next"><ChevronRight className="size-4" /></button>
      </div>
      <div ref={row} className="flex snap-x snap-mandatory gap-10 overflow-x-auto pb-4">
        {k.parts.map((p, i) => (
          <section key={p.id} className="shrink-0 snap-start">
            <div className="mb-2 flex items-baseline gap-2 text-sm">
              <span className="font-mono text-[11px] text-muted-foreground">{i + 1}/{k.parts.length}</span>
              <span className="font-medium">{p.title}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{p.id.split("/")[0]}</span>
              <a href={`/frame?id=${encodeURIComponent(p.id)}`} target="_blank" rel="noreferrer" className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">full size <ExternalLink className="size-3" /></a>
            </div>
            <div className="flex items-start gap-4">
              <Device id={p.id} {...DESKTOP} label="desktop" />
              <Device id={p.id} {...MOBILE} label="mobile" />
            </div>
            <p className="mt-1 max-w-[820px] text-xs text-muted-foreground">{p.about}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
