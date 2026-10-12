// uihub: siso:start-here
// Home's "start here" (Shaan, 12 Oct: "you haven't explained to me how it works, how it fits together, where my SISO stuff
// goes ... white papers should be somewhere else other than just the library ... what did we learn"): how the scales fit
// together, where his takes, skips and saves land, what the research taught us, and the use cases to start picking from.
import { Link } from "react-router-dom"
import { ArrowRight, Bookmark, Crown, Layers3, ScrollText, X } from "lucide-react"
import { fmtInt, useIndex } from "@/lib/data"
import { useBookmarks, type Mark } from "@/lib/bookmarks"
import { useKnowledge, useRules } from "@/lib/knowledge"
import { nodeCount, type Scale } from "@/lib/ontology"
import { TAB_OF_SCALE, TOP_TABS } from "@/lib/tab"

const on = (m?: Mark) => !!m && !m.off
// the four that stack, then the two that dress any of them
const STACK: { s: Scale; name: string; eg: string }[] = [
  { s: "atom", name: "Atoms", eg: "button, input, badge, icon" },
  { s: "component", name: "Components", eg: "form field, menu, table, dialog" },
  { s: "section", name: "Sections", eg: "hero, pricing, side nav, footer" },
  { s: "page", name: "Pages", eg: "home, dashboard, sign-in, settings" },
]
const DRESS: { s: Scale; name: string; eg: string }[] = [
  { s: "look", name: "Looks", eg: "themes, glass, motion: dress any scale" },
  { s: "asset", name: "Assets", eg: "icons, logos, sounds, OG images, avatars" },
]
// the house rules worth knowing first (principles/, hub-0001..0015) and the measured findings with the biggest numbers
const RULES = ["hub-0011", "hub-0003", "hub-0009", "hub-0012", "hub-0013", "hub-0014"]
const FINDINGS = ["Skeleton screens cut bounce rates", "Specific error messages lift form completion", "Fewer choices, faster decisions", "Aesthetics shape first impressions"]

export function StartHere() {
  const idx = useIndex()!
  const know = useKnowledge()
  const rules = useRules()
  const { items: marks } = useBookmarks()
  const o = idx.onto
  const to = (s: Scale) => TOP_TABS.find((t) => t.id === TAB_OF_SCALE[s])?.to || "/browse"
  const stat = (s: Scale) => {
    const nodes = o.scales[s] || []
    return `${nodes.length} kinds · ${fmtInt(nodes.reduce((n, x) => n + nodeCount(o, x.key), 0))} parts`
  }
  const box = (x: { s: Scale; name: string; eg: string }) => (
    <Link key={x.s} to={to(x.s)} className="group block min-w-0 rounded-xl border bg-card/60 p-3 hover:border-foreground/25" data-verify-start-scale={x.s}>
      <p className="text-[14px] font-medium group-hover:underline">{x.name}</p>
      <p className="truncate text-[12px] text-muted-foreground">{x.eg}</p>
      <p className="mt-1 font-mono text-[10.5px] text-muted-foreground/80 tabular-nums">{stat(x.s)}</p>
    </Link>
  )
  const vars = know?.variations || {}
  const slots = Object.values(vars).reduce((n, v) => n + 1 + v.variations.length, 0)
  const entries = Object.entries(marks).filter(([, m]) => on(m))
  const picked = entries.filter(([k]) => k.startsWith("siso/base/") && k.split("/").length >= 4).length
  const skipped = entries.filter(([k]) => k.startsWith("siso/skip/")).length
  const saved = entries.filter(([k]) => !k.startsWith("siso/")).length
  const lib = on(marks["siso/library"]) ? marks["siso/library"].note : undefined
  const house = RULES.map((id) => rules?.find((r) => r.id === id)).filter((r) => !!r)
  const found = FINDINGS.map((t) => know?.papers?.findings.find((f) => f.title === t)).filter((f) => !!f)

  return (
    <section className="mb-8 space-y-4" data-verify-start-here>
      <div className="rounded-2xl border p-4">
        <h2 className="text-[15px] font-semibold">How it fits together</h2>
        <p className="mb-3 text-[13px] text-muted-foreground">
          Pages are made of sections, sections of components, components of atoms. Pick one base at each and everything above it is built from it. Looks and assets dress any of them.
        </p>
        <div className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {STACK.map((x, i) => [i > 0 && <ArrowRight key={`a${i}`} className="hidden size-4 text-muted-foreground md:block" />, box(x)])}
        </div>
        <div className="mt-2 grid gap-2 md:grid-cols-2">{DRESS.map(box)}</div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {!idx.public && (
          <div className="rounded-2xl border p-4" data-verify-start-where>
            <h2 className="text-[15px] font-semibold">Where your SISO stuff goes</h2>
            <ul className="mt-2 space-y-2.5 text-[13px]">
              <li className="flex gap-2.5">
                <Crown className="mt-0.5 size-4 shrink-0 text-neon-ink" />
                <span>
                  <b className="font-medium">Take</b> (Enter in the deck) makes a part the SISO base for its slot. Every take is in{" "}
                  <Link to="/siso" className="underline underline-offset-2">The SISO set</Link>; agents build from it. <span className="text-muted-foreground">{fmtInt(picked)} of {fmtInt(slots)} slots taken.</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Layers3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  <b className="font-medium">Default library</b> fills every slot you haven't taken. <span className="text-muted-foreground">{lib ? `Now: ${lib}.` : "Not set yet: set it on The SISO set (arc or shadcn-ui)."}</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  <b className="font-medium">Skip</b> (X) hides a part from the deck for good. <span className="text-muted-foreground">{fmtInt(skipped)} skipped.</span>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Bookmark className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>
                  <b className="font-medium">Save</b> (the bookmark on any part) keeps it to come back to, in <Link to="/bookmarks" className="underline underline-offset-2">Saved</Link>. <span className="text-muted-foreground">{fmtInt(saved)} saved.</span>
                </span>
              </li>
            </ul>
          </div>
        )}

        <div className="rounded-2xl border p-4" data-verify-start-learned>
          <div className="flex items-baseline gap-2">
            <h2 className="text-[15px] font-semibold">What we learned</h2>
            <Link to="/papers" className="ml-auto inline-flex items-center gap-1 text-[12.5px] font-medium text-neon-ink hover:underline">
              <ScrollText className="size-3.5" /> All {know?.papers?.papers.length ?? 8} white papers
            </Link>
          </div>
          <p className="mb-2 text-[12.5px] text-muted-foreground">From 2,047 sources and the 15 house rules. Every part's page lists the rules for it.</p>
          <ul className="space-y-1 text-[13px]">
            {house.map((r) => (
              <li key={r.id} className="flex gap-2">
                <span className="w-16 shrink-0 font-mono text-[10.5px] leading-5 text-muted-foreground">{r.id}</span>
                {r.title}
              </li>
            ))}
          </ul>
          <ul className="mt-2.5 space-y-1 border-t pt-2.5 text-[12.5px] text-muted-foreground">
            {found.map((f) => (
              <li key={f.title}>
                <span className="font-medium text-foreground">{f.title}:</span> {f.finding}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {!idx.public && (
        <div className="rounded-2xl border p-4" data-verify-siso-strip>
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h2 className="text-[15px] font-semibold">Start picking</h2>
            <span className="text-[13px] text-muted-foreground">Pick what you're making: you see only the slots it needs, must-haves first. Click a slot to flip through its candidates.</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(know?.use_cases?.use_cases || []).map((u) => (
              <Link key={u.id} to={`/siso?uc=${u.id}`} title={u.about} className="siso-chip inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px]">
                {u.name}
                <span className="font-mono text-[10.5px] text-muted-foreground">{u.needs.length}</span>
              </Link>
            ))}
            <Link to="/siso" className="siso-press inline-flex h-8 items-center gap-1.5 rounded-full bg-neon/15 px-3.5 text-[13px] font-medium text-neon-ink">
              Every part <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
