// uihub: siso:page-libraries
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { useMeta } from "@/lib/data"
import { useLibs } from "@/lib/codebank"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/bits"

// Parent owns lib/data.ts. These optional fields keep the page compatible with
// existing exports until hubindex exports page_inventory() as library_inventory.
interface InventoryLibrary {
  id: string
  name: string
  homepage?: string | null
  site: string
  author?: string | null
  licence: string
  licence_status: "permissive-recorded" | "terms-review"
  role: string
  status: string
  why: string
  verdict: string
  origins: string[]
  counts: { catalogued: number; reported: number | null; metadata: number | null; local_files: number | null; bank_attributed?: number }
  browse_source?: string | null
  provenance: { source: string; record: string }[]
}
interface LibraryInventory {
  libraries: InventoryLibrary[]
  summary: { libraries: number; by_origin: Record<string, number>; by_status: Record<string, number>; permissive_recorded: number; terms_review: number }
  sources: { id: string; status: string; records: number | null; invalid_lines: number; why: string }[]
  author_count: number
  author_directory_count?: number | null
  bank?: { status: string; rows: number | null; missing_library: number | null; resolved_missing_library: number | null; unresolved_missing_library: number | null }
}
const originLabels: Record<string, string> = {
  reviewed: "Reviewed libraries", "21st-collections": "21st collections", "shadcn-registries": "shadcn registries",
  "foundry-ui": "UI research", "siso-shell": "SISO Shell", "siso-owned": "SISO components",
  "shadcn-reference": "shadcn reference snapshot", "component-bank": "Component bank",
}
const statusLabels: Record<string, string> = { catalogued: "Catalogued", "metadata-only": "Metadata only", "not-ingested": "Not ingested" }
const number = (value: number | null | undefined) => value == null ? "Unknown" : value.toLocaleString("en-GB")
// Never turn absent inventory counts into zero or the upstream reported count.

export default function Libraries() {
  const meta = useMeta()
  const bank = useLibs()
  const inBank = useMemo(() => new Set(bank?.libraries.map((l) => l.id) || []), [bank])
  const inventory = (meta as (typeof meta & { library_inventory?: LibraryInventory }))?.library_inventory
  const [q, setQ] = useState("")
  const [origin, setOrigin] = useState("all")
  const [status, setStatus] = useState("all")
  const [licence, setLicence] = useState("all")
  const [visible, setVisible] = useState(48)
  const [registryVisible, setRegistryVisible] = useState(50)

  const libraries = useMemo<InventoryLibrary[]>(() => inventory?.libraries ?? (meta?.libraries || []).map((l) => ({
    id: l.id, name: l.name, homepage: `https://${l.site}`, site: l.site, licence: l.licence,
    licence_status: "terms-review", role: l.role, status: "catalogued", why: "Reviewed library metadata is indexed.", verdict: l.verdict,
    origins: ["reviewed"], counts: { catalogued: l.items, reported: l.items, metadata: null, local_files: null },
    browse_source: l.id, provenance: [{ source: "sources/libraries.json", record: l.id }],
  })), [inventory, meta])
  const filtered = useMemo(() => {
    const words = q.toLowerCase().trim()
    return libraries.filter((l) => (origin === "all" || l.origins.includes(origin)) &&
      (status === "all" || status === l.status) && (licence === "all" || licence === l.licence_status) &&
      (!words || `${l.name} ${l.site} ${l.author || ""} ${l.licence} ${l.role} ${l.verdict} ${l.why}`.toLowerCase().includes(words)))
  }, [libraries, q, origin, status, licence])
  const registries = useMemo(() => {
    const words = q.toLowerCase().trim()
    return (meta?.registries || []).filter((r) => !words || `${r.name} ${r.description || ""} ${r.homepage || ""}`.toLowerCase().includes(words))
  }, [meta, q])
  const coverage = inventory?.sources.filter((s) => s.status !== "inspected") || []
  const reset = () => { setVisible(48); setRegistryVisible(50) }
  if (!meta) return <div className="h-40 animate-pulse rounded-lg bg-muted" aria-label="Loading libraries" />

  return (
    <div className="space-y-8">
      <PageHeader title="Libraries" count={libraries.length} sub="The libraries, registries and collections we hold, with their counts, rights and ingestion state." />
      {bank && (
        <p className="text-sm text-muted-foreground" data-verify-code-bank>
          The code bank: <b className="font-semibold text-foreground tabular-nums">{number(bank.parts)}</b> parts in {number(bank.libraries.length)} registries,{" "}
          {number(bank.held)} with their code held and {number(bank.pages)} live on their own sites. Open a registry below for its page.
        </p>
      )}
      {inventory ? (
        <div className="space-y-2 text-sm text-muted-foreground" data-verify-library-inventory>
          <p>{number(inventory.summary.by_origin["21st-collections"] || 0)} 21st collections · {number(inventory.summary.by_origin["shadcn-registries"] || 0)} shadcn registries · {number(inventory.summary.by_origin["foundry-ui"] || 0)} UI research entries.</p>
          <p>{number(inventory.author_count)} authors in the component corpus{inventory.author_directory_count != null && ` · ${number(inventory.author_directory_count)} in the separate author directory`}. Authors are credited separately from libraries. Entries shared between sources appear once; counts across libraries can overlap.</p>
          <p>{number(inventory.summary.permissive_recorded)} have a permissive licence recorded. Check each item and paid tier before copying code.</p>
        </div>
      ) : (
        <p className="rounded-lg border px-4 py-3 text-sm text-muted-foreground" role="status">
          The extended library inventory has not been exported yet. This view shows the reviewed libraries and registry directory below.
        </p>
      )}
      {coverage.length > 0 && (
        <details className="rounded-lg border px-4 py-3 text-sm" data-verify-library-coverage>
          <summary className="cursor-pointer font-medium">Inventory coverage: {coverage.length} sources need attention</summary>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            {coverage.map((s) => <li key={s.id}><span className="font-medium text-foreground">{s.id}: {s.status}.</span> {s.why} {s.invalid_lines > 0 && `${s.invalid_lines} malformed lines excluded.`}</li>)}
          </ul>
          {inventory?.bank && <p className="mt-3 text-muted-foreground">Component-bank attribution: {number(inventory.bank.resolved_missing_library)} resolved of {number(inventory.bank.missing_library)} missing libraries; {number(inventory.bank.unresolved_missing_library)} remain unresolved.</p>}
        </details>
      )}
      <section className="space-y-4" aria-label="Library inventory">
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-48 flex-1 space-y-1 text-xs text-muted-foreground">
            <span>Search libraries and authors</span>
            <Input value={q} onChange={(e) => { setQ(e.target.value); reset() }} placeholder="Name, author, licence…" className="h-9 text-sm" />
          </label>
          <label className="space-y-1 text-xs text-muted-foreground">
            <span className="block">Source</span>
            <select aria-label="Source" value={origin} onChange={(e) => { setOrigin(e.target.value); reset() }} className="h-9 max-w-52 rounded-lg border bg-foreground/[0.03] px-2 text-sm text-foreground transition-colors hover:border-foreground/20">
              <option value="all">All sources</option>
              {Object.entries(originLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label className="space-y-1 text-xs text-muted-foreground">
            <span className="block">State</span>
            <select aria-label="State" value={status} onChange={(e) => { setStatus(e.target.value); reset() }} className="h-9 rounded-lg border bg-foreground/[0.03] px-2 text-sm text-foreground transition-colors hover:border-foreground/20">
              <option value="all">All states</option>
              {Object.entries(statusLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}
            </select>
          </label>
          <label className="space-y-1 text-xs text-muted-foreground">
            <span className="block">Rights</span>
            <select aria-label="Rights" value={licence} onChange={(e) => { setLicence(e.target.value); reset() }} className="h-9 rounded-lg border bg-foreground/[0.03] px-2 text-sm text-foreground transition-colors hover:border-foreground/20">
              <option value="all">All licences</option>
              <option value="permissive-recorded">Permissive recorded</option>
              <option value="terms-review">Terms need review</option>
            </select>
          </label>
        </div>
        <p className="text-xs text-muted-foreground" aria-live="polite">{number(filtered.length)} matching entries · showing {number(Math.min(visible, filtered.length))}</p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, visible).map((l) => (
            <Card key={l.id} className="gap-3 shadow-none" data-verify-library={l.id}>
              <CardHeader>
                <CardTitle className="flex flex-wrap items-center gap-2 text-base">
                  <span className="min-w-0 break-words">{l.name}</span>
                  <Badge variant={l.role === "base" ? "default" : "secondary"} className="font-normal">{l.role}</Badge>
                </CardTitle>
                <CardDescription className="space-y-1 text-xs">
                  {l.homepage && <a href={l.homepage} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-center gap-1 break-all hover:text-foreground">{l.site} <ExternalLink className="size-3 shrink-0" /></a>}
                  {l.author && <p>By {l.author}</p>}
                  <p className="break-words">Licence: {l.licence}</p>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="font-normal">{statusLabels[l.status] || l.status}</Badge>
                <p className="text-sm text-muted-foreground">{l.verdict}</p>
                {l.why !== l.verdict && <p className="text-xs text-muted-foreground">{l.why}</p>}
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div><dt className="text-muted-foreground">Catalogued items</dt><dd className="font-medium tabular-nums">{number(l.counts.catalogued)}</dd></div>
                  <div><dt className="text-muted-foreground">Upstream reported</dt><dd className="font-medium tabular-nums">{number(l.counts.reported)}</dd></div>
                  {l.counts.local_files != null && <div><dt className="text-muted-foreground">Local JSX files</dt><dd className="font-medium tabular-nums">{number(l.counts.local_files)}</dd></div>}
                  {l.counts.bank_attributed != null && <div><dt className="text-muted-foreground">Bank attributed</dt><dd className="font-medium tabular-nums">{number(l.counts.bank_attributed)}</dd></div>}
                </dl>
                {l.browse_source && l.counts.catalogued > 0 && <Link to={`/browse?source=${encodeURIComponent(l.browse_source)}`} className="inline-block text-xs hover:underline">Browse catalogued items →</Link>}
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer">Provenance · {l.origins.map((o) => originLabels[o] || o).join(", ")}</summary>
                  <ul className="mt-2 space-y-1 break-words">{l.provenance.map((p, i) => <li key={`${p.source}:${p.record}:${i}`}>{p.source} · {p.record}</li>)}</ul>
                </details>
              </CardContent>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && <p className="py-6 text-sm text-muted-foreground">No libraries match these filters.</p>}
        {visible < filtered.length && <button onClick={() => setVisible((v) => v + 48)} className="h-9 rounded-md border px-3 text-sm hover:bg-muted">Show 48 more ({number(filtered.length - visible)} left)</button>}
      </section>
      <section className="space-y-4" aria-label="Registry install patterns">
        <h2 className="text-lg font-semibold tracking-tight">Registry install patterns <span className="ml-1 text-sm font-normal text-muted-foreground tabular-nums">{number(registries.length)}</span></h2>
        <p className="text-sm text-muted-foreground">Directory listings identify install endpoints. They do not mean the components or licences have been ingested.</p>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-sm">
            <caption className="sr-only">Registry names, descriptions and install URL patterns</caption>
            <thead className="bg-muted/30 text-left text-xs text-muted-foreground"><tr>
              <th scope="col" className="px-3 py-2 font-medium">Registry</th>
              <th scope="col" className="px-3 py-2 font-medium">Description</th>
              <th scope="col" className="px-3 py-2 font-medium">Install pattern</th>
            </tr></thead>
            <tbody>{registries.slice(0, registryVisible).map((r) => <tr key={r.name} className="border-t align-top">
              <td className="px-3 py-2 whitespace-nowrap">{inBank.has(r.name.replace(/^@/, "")) ? <Link to={`/libraries/${r.name.replace(/^@/, "")}`} className="font-mono text-xs font-medium text-foreground hover:underline" data-verify-registry-link>{r.name}</Link> : r.homepage ? <a href={r.homepage} target="_blank" rel="noreferrer" className="font-mono text-xs hover:underline">{r.name}</a> : <span className="font-mono text-xs">{r.name}</span>}</td>
              <td className="px-3 py-2 text-muted-foreground">{r.description}</td>
              <td className="max-w-[280px] truncate px-3 py-2 font-mono text-[11px] text-muted-foreground" title={r.url}>{r.url}</td>
            </tr>)}</tbody>
          </table>
        </div>
        {registryVisible < registries.length && <button onClick={() => setRegistryVisible((v) => v + 50)} className="h-9 rounded-md border px-3 text-sm hover:bg-muted">Show 50 more ({number(registries.length - registryVisible)} left)</button>}
      </section>
    </div>
  )
}
