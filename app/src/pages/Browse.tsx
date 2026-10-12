// uihub: siso:page-browse
import { useMemo } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { BrowseView } from "@/components/BrowseView"
import { catName, groupLabel, navRows, useIndex, type Row } from "@/lib/data"

const NON_LIBRARY_SOURCES = new Set(["21st", "siso", "siso-shell", "research"])

/** "From 21st.dev, the 11 libraries and ours; his picks first" built from what the rows really hold. */
export function fromLine(rows: Row[]): string {
  const src = new Set(rows.map((r) => r.s))
  const parts: string[] = []
  if (src.has("21st")) parts.push("21st.dev")
  const libs = [...src].filter((s) => !NON_LIBRARY_SOURCES.has(s)).length
  if (libs) parts.push(libs === 1 ? "1 library" : `${libs} libraries`)
  if (src.has("siso") || src.has("siso-shell")) parts.push("ours")
  if (src.has("research")) parts.push("RESEARCH")
  const list = parts.length > 1 ? parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1] : parts[0] || "the hub"
  const his = rows.some((r) => r.st === "curated")
  return `From ${list}; ${his ? "his picks first" : "available previews first"}`
}

// "Card components", but "Icons", "Charts", "Flows": a plural or an asset is already its own name
const withComponents = (label: string, group?: string) => (/components$/i.test(label) || /s$/.test(label) || group === "assets" ? label : `${label} components`)

export default function Browse() {
  const idx = useIndex()!
  const { group, category, slug } = useParams()
  const [sp] = useSearchParams()
  const cat = category ? (category.includes("/") ? category : `${group}/${category}`) : undefined
  const navItem = slug ? idx.navBySlug.get(slug) : undefined
  const kind = sp.get("kind")
  const status = sp.get("status")

  const base = useMemo(() => {
    if (slug) return navItem ? navRows(idx, navItem) : []
    if (cat) return idx.byCategory.get(cat) || []
    if (group) return idx.items.filter((r) => r.g === group)
    return idx.items.filter((r) => r.k !== "resource" && r.k !== "asset")  // Everything: UI; assets have their own tab
  }, [idx, group, cat, slug, navItem])

  const label = navItem
    ? navItem.label
    : slug
      ? slug
      : cat
        ? catName(idx, cat)
        : group
          ? groupLabel(group)
          : status === "curated"
            ? "Featured"
            : kind
              ? idx.kind_labels[kind] || kind
              : "All"
  const title = status === "curated" && !cat && !group && !slug ? "Featured: his picks" : withComponents(label, group)

  return <BrowseView key={slug || cat || group || "all"} title={title} sub={fromLine(base)} base={base} />
}
