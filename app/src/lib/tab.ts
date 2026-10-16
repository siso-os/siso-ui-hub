// uihub: siso:top-tab
// The top tabs (Shaan, 10 Oct: "up top … components templates whatever … and it could change the side nav"): one store
// the top bar's pill switch writes and the side nav reads, so the tab decides which list the side nav shows.
// The tabs split UI by what you are making (Shaan, 10 Oct: "from first principles … use case wise"): a piece
// (Components), a site (Sites), an app (Apps), how it looks and moves (Looks), and what each of his projects is built
// from (Projects: "Project should be there"). Every group in the index lands in exactly one tab.
import { useSyncExternalStore } from "react"
import { Atom, FolderKanban, Gem, LayoutGrid, LayoutTemplate, Palette, PanelsTopLeft, Rows3, type LucideIcon } from "lucide-react"
import type { Index } from "@/lib/data"
import kitV1 from "../../../catalogue/kit-v1.json"
import { homeOf } from "@/lib/families"

// the kit's asset kinds open under Assets; the rest of the kit is SISO's (Shaan, 15 Oct)
const KIT_ASSETS = new Set(((kitV1 as unknown as { assets?: { kind: string }[] }).assets ?? []).map((k) => k.kind))

// The pill picks a SCALE (Shaan, 11 Oct: "that horizontal switcher could switch to that ... use first principles"):
// catalogue/schema/ontology.json's atoms, components, sections and pages, then how it looks and what it uses; after a
// thin divider, his own places: SISO (the curated set) and Projects. Sites and Apps became Sections and Pages, each
// split into Site and App in the side nav.
// Taxonomy v2 (15 Oct): Atoms, Components, Sections, Pages, Shells | Style, Assets; a kind's pill is the layer its family
// sits in (lib/families.ts), so the app frame's parts open under Shells. "looks" keeps its id and reads Style.
export type TopTab = "atoms" | "components" | "sections" | "pages" | "shells" | "looks" | "assets" | "projects"
export const TOP_TABS: { id: TopTab; label: string; to: string; icon: LucideIcon; gap?: boolean }[] = [
  { id: "atoms", label: "Atoms", to: "/kit/l/atoms", icon: Atom },
  { id: "components", label: "Components", to: "/kit/l/components", icon: LayoutGrid },
  { id: "sections", label: "Sections", to: "/kit/l/sections", icon: Rows3 },
  { id: "pages", label: "Pages", to: "/kit/l/pages", icon: LayoutTemplate },
  { id: "shells", label: "Shells", to: "/kit/app-frame", icon: PanelsTopLeft },
  { id: "looks", label: "Style", to: "/themes", icon: Palette, gap: true },
  // icons, logos, sounds, fonts and social images: what a design uses rather than what it is made of (10 Oct)
  { id: "assets", label: "Assets", to: "/browse/assets", icon: Gem },
  { id: "projects", label: "Projects", to: "/projects", icon: FolderKanban, gap: true },
]
// SISO is not a tab any more (Shaan, 15 Oct: "maybe SISO shouldn't be a tab up top because everything's all part of the
// SISO kit"): the pill picks a scale, and each scale's side nav opens with what the SISO kit holds at that scale, then the
// library to bring parts in from. The whole-kit pages (/siso, /kit, /kit/map, /ours, Saved) sit in the home list.
/** the public build has no Projects: project and client names never reach it */
export const topTabs = (pub: boolean | undefined) => (pub ? TOP_TABS.filter((t) => t.id !== "projects") : TOP_TABS)
/** a node's scale (lib/ontology.ts) -> its tab */
export const TAB_OF_SCALE: Record<string, TopTab> = { atom: "atoms", component: "components", section: "sections", page: "pages", look: "looks", asset: "assets" }

const subs = new Set<() => void>()
export function setTopTab(t: TopTab) {
  if (t === cur) return
  cur = t
  sessionStorage.setItem("uihub.tab", t)
  subs.forEach((f) => f())
}
export const useTopTab = () =>
  useSyncExternalStore(
    (f) => {
      subs.add(f)
      return () => subs.delete(f)
    },
    () => cur,
  )

// the index's groups, by tab: marketing sections and layouts are Sections; whole pages and flows are Pages; themes and
// motion are Looks; every other group is a component, by the job it does
const SECTIONS = new Set(["marketing", "layout"])
const PAGES = new Set(["pages", "flows"])
const LOOKS = new Set(["themes", "motion"])
export const tabOfGroup = (g: string): TopTab => (g === "assets" ? "assets" : SECTIONS.has(g) ? "sections" : PAGES.has(g) ? "pages" : LOOKS.has(g) ? "looks" : "components")

/** the group a page is about: /browse/<group>/…, a nav row's slug, or an item's own group (needs the index) */
export function groupOf(idx: Index | null, path: string): string | undefined {
  const p = path.split("/")
  if (p[1] === "browse" && p[2] && p[2] !== "s") return p[2]
  if (!idx) return undefined
  if (p[1] === "browse" && p[2] === "s" && p[3]) return idx.navBySlug.get(decodeURIComponent(p[3]))?.categories[0]?.split("/")[0]
  if (p[1] === "c") return idx.byId.get(decodeURIComponent(p.slice(2).join("/")))?.g
  return undefined
}

/** the tab a page belongs to; null for pages every tab shares (Home), which keep the tab you came from */
export function tabOf(path: string, search: string, idx: Index | null = null): TopTab | null {
  const kind = new URLSearchParams(search).get("kind")
  if (path.startsWith("/projects")) return "projects"
  // a layer page of the kit (/kit/l/<pill>) sits under its own pill
  if (path.startsWith("/kit/l/")) return (path.split("/")[3] as TopTab) || null
  if (path === "/kit/icons" || (path.startsWith("/kit/atoms/") && KIT_ASSETS.has(path.slice(11)))) return "assets"
  // the kit's own pages open on their scale
  if (path === "/kit/v1" || path.startsWith("/kit/atoms/")) return "atoms"
  if (path === "/kit/dashboard" || path === "/kit/charts") return "components"
  if (path === "/kit/app-frame" || path.startsWith("/kit/shells") || path === "/kit/site-frame") return "shells"
  if (path === "/kit/pages" || path.startsWith("/kit/pages/")) return "pages"
  if (path === "/siso") {
    const sc = new URLSearchParams(search).get("scale")
    return sc ? (TAB_OF_SCALE[sc] ?? null) : null
  }
  if (path.startsWith("/x/")) return homeOf(path.split("/").slice(2, 4).join("/"))?.tab ?? TAB_OF_SCALE[path.split("/")[2]] ?? null
  if (path.startsWith("/build/")) {
    const sf = path.split("/")[2]
    return ["landing", "portfolio", "store", "content", "dashboard", "mobile", "ai"].includes(sf) ? "pages" : "components"
  }
  if (path.startsWith("/templates") || path === "/cores/site-kit") return "pages"
  if (path.startsWith("/shells") || path.startsWith("/packages") || path === "/cores/hub-kit" || kind === "shell") return "shells"
  if (kind === "section" || kind === "layout") return "sections"
  if (path.startsWith("/themes") || kind === "motion" || kind === "theme" || kind === "interaction" || kind === "toy") return "looks"
  // an item's page keeps the tab you came from (Shaan, 10 Oct: clicking a card "flicks me through the other pages")
  if (path.startsWith("/c/")) return null
  const g = groupOf(idx, path)
  if (g) return tabOfGroup(g)
  if (path === "/browse" || ["/authors", "/libraries", "/coverage", "/discover", "/tools", "/agents"].some((x) => path === x || path.startsWith(x + "/"))) return "components"
  return null
}

// the first render starts on the page's own tab, so the side nav doesn't slide on load
const saved = sessionStorage.getItem("uihub.tab") as TopTab | null
let cur: TopTab = tabOf(location.pathname, location.search) || (saved && TOP_TABS.some((t) => t.id === saved) ? saved : "components")
