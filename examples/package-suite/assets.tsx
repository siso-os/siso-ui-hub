// uihub: siso:package-workbench
import { useState } from 'react';
import { ProductGlyph, LionTile, type Product } from '@siso/ui/site';
import manifest from '@siso/ui/site/assets.json';
const products:Product[]=['ui-hub','library','os','research','agency','voice','all'];
const group=(url:string)=>url.startsWith('/brand/')?'Brand':url.startsWith('/sprites/')?'Animated sprites':url.startsWith('/og/')?'Social cards':url.includes('/blog-bg/')?'Blog backgrounds':url.startsWith('/siso-img/')?'Generated artwork':url.startsWith('/art/')?'Product artwork':'Fonts';
const preview=(file:{url:string;sha256:string})=>file.url.endsWith('.svg')?file.url:`/asset-previews/${file.sha256.slice(0,16)}.webp`;
export default function AssetLibrary(){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('All');
 const files=manifest.files.filter(f=>(category==='All'||group(f.url)===category)&&f.url.toLowerCase().includes(query.toLowerCase()));
 const images=files.filter(f=>/\.(webp|png|jpe?g|svg)$/i.test(f.url));
 return <section className="asset-library"><div className="library-toolbar"><div><strong>{manifest.files.length} verified files</strong><span>Original paths, full size images and source hashes</span></div><label className="library-search">Find an asset<input type="search" placeholder="Search filenames or products…" value={query} onChange={e=>setQuery(e.target.value)}/></label></div><div className="library-categories" role="group" aria-label="Asset categories">{['All',...new Set(manifest.files.map(f=>group(f.url)))].map(c=><button key={c} aria-pressed={c===category} onClick={()=>setCategory(c)}>{c} <small>{c==='All'?manifest.files.length:manifest.files.filter(f=>group(f.url)===c).length}</small></button>)}</div>
 {(category==='All'||category==='Product artwork')&&<section className="asset-glyphs"><h2>Living product glyphs</h2><div>{products.map(product=><figure key={product}><ProductGlyph product={product} size={88} label={product}/><figcaption>{product}</figcaption></figure>)}<figure><LionTile size={88} live/><figcaption>Docs lion</figcaption></figure></div></section>}
 <p className="quiet">{images.length} matching images. The grid uses small previews; open or save a file for its original bytes.</p><div className="asset-grid">{images.map(file=><article key={file.url}><a href={file.url} target="_blank" rel="noreferrer"><img src={preview(file)} style={{background:file.url.includes("-ink")?"#efeee9":undefined}} alt={file.url.split('/').pop()?.replace(/[-_]/g,' ')} loading="lazy"/><strong>{file.url.split('/').pop()}</strong></a><small>{group(file.url)}</small><code>{file.url}</code><a href={file.url} download>Save original ↓</a></article>)}</div>
 {files.filter(f=>!images.includes(f)).map(file=><p key={file.url}><a href={file.url} download>{file.url}</a></p>)}
 </section>;
}
