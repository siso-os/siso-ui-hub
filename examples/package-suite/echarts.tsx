// uihub: siso:package-workbench
import { Component, lazy, Suspense, useEffect, useState, type ComponentType, type LazyExoticComponent, type ReactNode } from "react"
import entries from "./echarts-presets.json"

type EChartsPreset = (typeof entries)[number]
const presetFromUrl = () => new URLSearchParams(location.search).get("epreset")
const loadPresetModule = () => import("@siso/ui/charts/echarts")
const demos = Object.fromEntries(entries.map(entry => [entry.id, lazy(async () => {
  const module = await loadPresetModule() as unknown as Record<string, ComponentType>
  const Demo = module[entry.export]
  if (!Demo) throw new Error(`The ECharts package does not export ${entry.export}`)
  return { default: Demo }
})])) as Record<string, LazyExoticComponent<ComponentType>>

class PresetErrorBoundary extends Component<{children: ReactNode}, {error: Error | null}> {
  state = { error: null as Error | null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) return <div className="library-detail" role="alert"><h3>Could not render this ECharts preset</h3><p>The selected source threw while rendering. Keep this example visible to the package owner for repair.</p><pre>{this.state.error.message}</pre></div>
    return this.props.children
  }
}

export default function EChartsPresets() {
  const [query, setQuery] = useState("")
  const [family, setFamily] = useState("all")
  const [selected, setSelected] = useState(() => presetFromUrl() ?? entries[0]?.id ?? "")

  useEffect(() => {
    const sync = () => {
      const id = presetFromUrl()
      if (!id) return
      if (entries.some(entry => entry.id === id)) {
        setSelected(id)
        setQuery("")
        setFamily("all")
      }
    }
    window.addEventListener("popstate", sync)
    window.addEventListener("suite-route-change", sync)
    return () => {
      window.removeEventListener("popstate", sync)
      window.removeEventListener("suite-route-change", sync)
    }
  }, [])

  const rows = entries.filter(entry => (family === "all" || entry.family === family)
    && [entry.title, entry.id, entry.family, entry.export, entry.source].join(" ").toLowerCase().includes(query.toLowerCase()))
  const entry = rows.find(row => row.id === selected) ?? rows[0]
  const Demo = entry ? demos[entry.id] : undefined
  const isSankey = entry?.family === "Sankey"
  const families = ["all", ...Array.from(new Set(entries.map(item => item.family))).sort()]

  const select = (id: string) => {
    setSelected(id)
    const url = new URL(location.href)
    url.searchParams.set("epreset", id)
    url.searchParams.delete("preset")
    url.searchParams.delete("part")
    url.hash = "charts"
    history.replaceState(null, "", url)
  }

  return <section className="source-gallery">
    <div className="library-toolbar">
      <div><strong>{entries.length} original ECharts presets</strong><span>Actual source components from the ECharts leaf, mounted one at a time.</span></div>
      <label className="library-search">Find an ECharts preset<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search title, chart family or source…" /></label>
    </div>
    <div className="library-categories" role="group" aria-label="ECharts preset families">
      {families.map(value => <button key={value} type="button" aria-pressed={family === value} onClick={() => setFamily(value)}>{value === "all" ? "All families" : `${value} charts`} <small>{value === "all" ? entries.length : entries.filter(entry => entry.family === value).length}</small></button>)}
    </div>
    <div className="library-layout">
      <nav className="library-families" aria-label="ECharts presets">
        {rows.map(row => <button key={row.id} type="button" aria-current={row.id === entry?.id ? "true" : undefined} onClick={() => select(row.id)}><strong>{row.title}</strong><small>{row.family} · ECharts</small></button>)}
        {!rows.length && <p className="quiet">No ECharts presets match this search.</p>}
      </nav>
      {entry && Demo ? <div className="library-detail">
        <h3>{entry.title}</h3>
        {isSankey && <p className="quiet">Scroll inside this chart preview to inspect the full Sankey labels.</p>}
        <div className="chart-preview source-chart" style={{ height: isSankey ? 472 : 420, width: "100%", flexShrink: 0 }}>
          {isSankey ? <div style={{ height: "100%", width: "100%", minWidth: 580, maxWidth: "none", flex: "0 0 100%" }}><PresetErrorBoundary key={entry.id}><Suspense fallback={<p role="status">Loading ECharts source…</p>}><Demo /></Suspense></PresetErrorBoundary></div> : <PresetErrorBoundary key={entry.id}><Suspense fallback={<p role="status">Loading ECharts source…</p>}><Demo /></Suspense></PresetErrorBoundary>}
        </div>
        <p className="source-path"><code>{entry.source}</code><span>ECharts source preset</span></p>
        <pre>{`import { ${entry.export} } from "@siso/ui/charts/echarts"\nimport "@siso/ui/charts/styles.css"`}</pre>
        <p className="quiet">This is the original example with its illustrative data. Use the chart family with your product's own records and labels.</p>
      </div> : <div className="library-detail"><p className="quiet">No ECharts presets match this search.</p></div>}
    </div>
  </section>
}
