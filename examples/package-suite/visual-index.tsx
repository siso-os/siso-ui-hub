// uihub: siso:package-workbench
const previews = [
  {id:"shells",name:"App frames and side navigation",detail:"The actual Hub source · all existing frame choices"},
  {id:"charts",name:"The selected chart collection",detail:"Original selected charts · motion and interactions intact"},
  {id:"atoms",name:"The original atoms",detail:"35 complete source families · every family has a live demo"},
  {id:"tokens",name:"Themes and product palettes",detail:"Three source layers · eight schemes · seven product identities"},
  {id:"site",name:"Landing, blog, docs and assets",detail:"Full footer · article parts · docs skin · living product glyphs"},
  {id:"widgets",name:"The dashboard system",detail:"Fitting, placement, sizes, states and saved layouts"},
  {id:"blocks",name:"Tables, dialogs and interactions",detail:"15 controlled interaction blocks"},
  {id:"navigation",name:"Navigation variants",detail:"Sidebar, rail, tool switches, menus and view selection"},
]
export default function VisualIndex() {
 return <section className="visual-index" aria-label="Visual package index"><div className="section-head"><h2>See what is actually in the kit</h2><span className="quiet">Every preview opens the running component</span></div><div className="visual-index-grid">{previews.map(p=><a key={p.id} href={`#${p.id}`}><div className="visual-index-image"><img loading="lazy" src={`/previews/${p.id}.png`} alt={`Rendered source preview: ${p.name}`}/><span>Open live ↗</span></div><strong>{p.name}</strong><small>{p.detail}</small></a>)}</div></section>
}
