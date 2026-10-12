// uihub: siso:crumbs
import { Fragment } from "react"
import { Link, useLocation } from "react-router-dom"
import { catLabel, catLink, catName, groupLabel, useIndex, useMeta, type Index, type Meta } from "@/lib/data"
import { KITS, coreById, useProjects, type Project } from "@/lib/factory"
import { TAB_OF_SCALE, TOP_TABS, tabOfGroup } from "@/lib/tab"

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
  if (path === "/") return [{ label: "Home" }]
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
  if (p[1] === "x" && p[2]) {
    const t = TOP_TABS.find((x) => x.id === TAB_OF_SCALE[p[2]])
    const n = idx?.onto.byKey.get(`${p[2]}/${p[3]}`)
    return [{ label: t?.label || p[2], to: t?.to }, ...(n?.group && n.group !== t?.label ? [{ label: n.group }] : []), { label: n?.name || p[3] || "" }]
  }
  if (p[1] === "siso") return [{ label: "SISO" }, { label: "The SISO set" }]
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
