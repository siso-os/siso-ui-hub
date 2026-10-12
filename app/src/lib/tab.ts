// uihub: siso:top-tab
// The top tabs (Shaan, 10 Oct: "up top … components templates whatever … and it could change the side nav"): one store
// the top bar's pill switch writes and the side nav reads, so the tab decides which list the side nav shows.
// The tabs split UI by what you are making (Shaan, 10 Oct: "from first principles … use case wise"): a piece
// (Components), a site (Sites), an app (Apps), how it looks and moves (Looks), and what each of his projects is built
// from (Projects: "Project should be there"). Every group in the index lands in exactly one tab.
import { useSyncExternalStore } from "react"
import { Atom, Crown, FolderKanban, Gem, LayoutGrid, LayoutTemplate, Palette, Rows3, type LucideIcon } from "lucide-react"
import type { Index } from "@/lib/data"

// The pill picks a SCALE (Shaan, 11 Oct: "that horizontal switcher could switch to that ... use first principles"):
// catalogue/schema/ontology.json's atoms, components, sections and pages, then how it looks and what it uses; after a
// thin divider, his own places: SISO (the curated set) and Projects. Sites and Apps became Sections and Pages, each
// split into Site and App in the side nav.
export type TopTab = "atoms" | "components" | "sections" | "pages" | "looks" | "assets" | "siso" | "projects"
export const TOP_TABS: { id: TopTab; label: string; to: string; icon: LucideIcon; gap?: boolean }[] = [
  { id: "atoms", label: "Atoms", to: "/x/atom/button", icon: Atom },
  { id: "components", label: "Components", to: "/browse", icon: LayoutGrid },
  { id: "sections", label: "Sections", to: "/x/section/hero", icon: Rows3 },
  { id: "pages", label: "Pages", to: "/x/page/home", icon: LayoutTemplate },
  { id: "looks", label: "Looks", to: "/themes", icon: Palette },
  // icons, logos, sounds, fonts and social images: what a design uses rather than what it is made of (10 Oct)
  { id: "assets", label: "Assets", to: "/browse/assets", icon: Gem },
  { id: "siso", label: "SISO", to: "/siso", icon: Crown, gap: true },
  { id: "projects", label: "Projects", to: "/projects", icon: FolderKanban },
]
/** the public build has no SISO set or Projects: his decisions and project and client names never reach it */
export const topTabs = (pub: boolean | undefined) => (pub ? TOP_TABS.filter((t) => t.id !== "projects" && t.id !== "siso") : TOP_TABS)
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
  if (path === "/siso" || path === "/bookmarks" || path === "/ours") return "siso"
  if (path.startsWith("/x/")) return TAB_OF_SCALE[path.split("/")[2]] ?? null
  if (path.startsWith("/build/")) {
    const sf = path.split("/")[2]
    return ["landing", "portfolio", "store", "content", "dashboard", "mobile", "ai"].includes(sf) ? "pages" : "components"
  }
  if (path.startsWith("/templates") || path === "/cores/site-kit") return "pages"
  if (path.startsWith("/shells") || path.startsWith("/packages") || path === "/cores/hub-kit" || kind === "section" || kind === "layout" || kind === "shell") return "sections"
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
