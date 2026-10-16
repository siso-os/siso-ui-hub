// uihub: siso:crumbs
import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"
import { catLabel, catLink, catName, groupLabel, useIndex, useMeta, type Index, type Meta } from "@/lib/data"
import { KITS, coreById, useProjects, type Project } from "@/lib/factory"
import { familyById, homeOf, stubOf } from "@/lib/families"
import { TAB_OF_SCALE, TOP_TABS, tabOf, tabOfGroup } from "@/lib/tab"

type Crumb = { label: string; to?: string }

const PAGES: Record<string, string> = {
  bookmarks: "Bookmarks", industries: "Industries", shells: "Shells", tools: "Tools", discover: "Discover",
  authors: "Authors", libraries: "Libraries", agents: "For agents", papers: "White papers", ours: "From our apps", map: "The map", vs: "Head to head", templates: "Templates", themes: "Themes", packages: "Packages", projects: "Projects",
}

function crumbsFor(path: string, search: string, idx: Index | null, meta: Meta | null, projects: Project[] | null): Crumb[] {
  const p = path.split("/").map((x) => decodeURIComponent(x))
  const comps: Crumb = { label: "Components", to: "/browse" }
  // a group's first crumb is the top tab it sits under: Sites / Heroes, Apps / Dashboards, Looks / Backgrounds
  const tabCrumb = (g?: string): Crumb => {
    const t = TOP_TABS.find((x) => x.id === (g ? tabOfGroup(g) : "components"))!
    return { label: t.label, to: t.to }
  }
  if (path === "/" || path === "/arc") return [{ label: "Start here: Arc" }]
  if (path === "/home") return [{ label: "Home" }]
  // the kit is SISO's: its crumbs start at "SISO kit" (below, beside the library's "Library"); its asset kinds sit under Assets
  if (path === "/kit/icons") return [{ label: "SISO kit", to: "/kit/map" }, { label: "Assets" }, { label: "Every animated icon" }]
  if (path.startsWith("/kit/atoms/") && tabOf(path, "") === "assets") return [{ label: "SISO kit", to: "/kit/map" }, { label: "Assets" }, { label: path.slice(11).replace(/-/g, " ") }]
  if (path.startsWith("/kit/shells/")) return [{ label: "SISO kit", to: "/kit/map" }, { label: "Sections" }, { label: "App frame", to: "/kit/app-frame" }, { label: "All we hold" }]
  if (path.startsWith("/kit/pages/")) return [{ label: "SISO kit", to: "/kit/map" }, { label: "Pages" }, { label: "Page types", to: "/kit/pages" }, { label: path.slice(11) }]
  if (path === "/factory") return [{ label: "App Factory" }]
  // a kit lives inside UI; every other core sits in the App Factory
  if (p[1] === "cores") return KITS.some((k) => k.id === p[2]) ? [{ label: "UI", to: "/" }, { label: coreById(p[2])!.name }] : [{ label: "App Factory", to: "/factory" }, { label: coreById(p[2])?.name || p[2] }]
  if (p[1] === "projects" && p[2]) return [{ label: "Projects", to: "/projects" }, { label: projects?.find((x) => x.id === p[2])?.name || p[2] }]
  if (p[1] === "browse") {
    if (p[2] === "s" && p[3]) {
      const it = idx?.navBySlug.get(p[3])
      return [tabCrumb(it?.categories[0]?.split("/")[0]), { label: it?.label || p[3] }]
    }
    if (p[2] && p[3]) {
      const c = p[3].includes("/") ? p[3] : `${p[2]}/${p[3]}`
      return [tabCrumb(p[2]), { label: idx ? catName(idx, c) : catLabel(c) }]
    }
    if (p[2]) return [tabCrumb(p[2]), { label: groupLabel(p[2]) }]
    const sp = new URLSearchParams(search)
    if (sp.get("status") === "curated") return [comps, { label: "Featured" }]
    if (sp.get("kind") && idx) return [comps, { label: idx.kind_labels[sp.get("kind")!] || sp.get("kind")! }]
    return [{ label: "Components" }]
  }
  if (p[1] === "c" && idx) {
    const r = idx.byId.get(p.slice(2).join("/"))
    if (!r) return [comps]
    return r.c ? [tabCrumb(r.g), { label: catName(idx, r.c), to: catLink(idx, r.c) }, { label: r.t }] : [tabCrumb(r.g), { label: r.t }]
  }
  // the crumb says which side you are on (Shaan, 15 Oct: the flow is library -> SISO kit): "SISO kit > ..." on the kit's
  // own pages, "Library > ..." on everything we found
  if (p[1] === "x" && p[2]) {
    // taxonomy v2: SISO kit > Layer > Family > Kind (a kind's family can sit in another layer: section/sidebar is Shells > App frame)
    const key = `${p[2]}/${p[3]}`
    const home = homeOf(key)
    const t = TOP_TABS.find((x) => x.id === (home?.tab ?? TAB_OF_SCALE[p[2]]))
    const n = idx?.onto.byKey.get(key) ?? stubOf(key)
    const fam = home ? familyById(idx?.onto, home.tab, home.fam)?.name : n?.group
    return [{ label: "SISO kit", to: "/kit" }, { label: t?.label || p[2], to: t?.to }, ...(fam && fam !== t?.label ? [{ label: fam }] : []), { label: n?.name || p[3] || "" }]
  }
  const kitHome = { label: "SISO kit", to: "/kit/map" }
  const KIT: Record<string, [string, string]> = { v1: ["Atoms", "All atoms"], dashboard: ["Components", "Dashboard parts"], charts: ["Components", "Charts"], "app-frame": ["Sections", "App frame"], pages: ["Pages", "Page types"], icons: ["Assets", "Animated icons"], map: ["", "Kit map"] }
  if (p[1] === "kit") {
    if (p[2] === "l" && p[3]) return [kitHome, { label: TOP_TABS.find((x) => x.id === p[3])?.label || p[3] }]
    if (!p[2]) return [kitHome, { label: "Everything we own" }]
    if (p[2] === "atoms" && p[3]) return [kitHome, { label: "Atoms", to: "/kit/v1" }, { label: p[3].replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase()) }]
    const k = KIT[p[2]]
    if (k) return k[0] ? [kitHome, { label: k[0] }, { label: k[1] }] : [kitHome, { label: k[1] }]
  }
  if (p[1] === "siso") {
    const sc = new URLSearchParams(search).get("scale")
    const t = sc ? TOP_TABS.find((x) => x.id === TAB_OF_SCALE[sc]) : undefined
    return t ? [kitHome, { label: t.label }, { label: `Pick ${t.label.toLowerCase()}` }] : [kitHome, { label: "The SISO set" }]
  }
  if (p[1] === "authors" && p[2]) return [{ label: "Authors", to: "/authors" }, { label: p[2] }]
  if (p[1] === "libraries" && p[2]) return [{ label: "Libraries", to: "/libraries" }, { label: p[2] }]
  if (p[1] === "industries" && p[2]) return [{ label: "Industries", to: "/industries" }, { label: meta?.industries?.find((x) => x.id === p[2])?.name || p[2] }]
  return [{ label: PAGES[p[1]] || p[1] }]
}

export function Crumbs() {
  const idx = useIndex()
  const meta = useMeta()
  const loc = useLocation()
  const projects = useProjects()
  const crumbs = crumbsFor(loc.pathname, loc.search, idx, meta, projects)
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center justify-center gap-1.5 text-sm" data-verify-crumbs>
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1
        return (
          <Fragment key={i}>
            {i > 0 && <span className="text-muted-foreground/60 max-sm:hidden">/</span>}
            {c.to && !last ? (
              <Link to={c.to} className="shrink-0 truncate text-muted-foreground hover:text-foreground max-sm:hidden">
                {c.label}
              </Link>
            ) : (
              <span className={"truncate " + (last ? "font-medium text-foreground" : "text-muted-foreground max-sm:hidden")}>{c.label}</span>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
