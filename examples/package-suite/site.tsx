// uihub: siso:package-workbench
import { useState } from 'react';
import FooterBeam from './site-effects/Beam';
import {
  SisoLandingFooter, FooterProducts, FooterLinks, FooterNumbers, FooterAskAI, FooterSocial, FooterSignature, FooterLights, SisoBlogSkin, BlogCard, BlogHeader, ArticleRail, CopyPage, TopicPill,
  ProductGlyph, topics, selectBackground, DocsFooter, DocsRail, DocsProductHero, DocsPageKicker,
  SisoDocsArticle, SisoDocsCode, SisoDocsSource, LionTile, SiteProvider,
  type Product, type SisoBlogPost, type DocsProductInfo,
} from '@siso/ui/site';
import '@siso/ui/site/styles.css';
import '@siso/ui/site/docs.css';
import assetManifest from '@siso/ui/site/assets.json';

const products: Product[] = ['ui-hub', 'library', 'os', 'research', 'agency', 'voice', 'all'];
const post: SisoBlogPost = {
  slug: 'reusable-source-components', title: 'Bring the source with you',
  description: 'The actual header, card, article tools and animated product glyphs, rendered with neutral example content.',
  category: 'UI Hub', topic: 'ui-hub', author: 'SISO Labs', date: '2026-10-16',
  cover: '', coverAlt: '', sections: [
    { id: 'source', title: 'Keep the source', paragraphs: ['This example uses the original SISO blog components. The surrounding copy is a package example, not a production post.'] },
    { id: 'compose', title: 'Compose the page', paragraphs: ['Supply article content as data. The header chooses its source background and line layers by slug, while product glyphs animate on hover.'] },
    { id: 'own-data', title: 'Own the data', paragraphs: ['The consumer supplies posts, links, counts and source notes. The package does not fetch private statistics or infer product usage.'] },
  ], sources: ['@siso/ui/site/source-manifest.json: original file hashes and extraction notes.'],
};
const demoStats = {
  updated: 'package example',
  stats: [
    { key: 'glyphs', n: String(products.length), label: 'Product glyph variants', href: '#glyphs', source: 'Product union and rendered variants below.' },
    { key: 'sections', n: String(post.sections.length), label: 'Example article sections', href: '#source', source: 'This example post.sections array.' },
    { key: 'footer', n: '1', label: 'Accepted landing footer', href: '#site-footer', source: 'The original Footer/index.tsx composition.' },
  ], social: { counts: {}, read: '' },
};
const docProduct: DocsProductInfo = {
  slug: 'package-example', name: 'UI package', glyph: 'ui-hub', color: '#1f69ff', category: 'PACKAGE EXAMPLE', status: 'overview',
  description: 'A neutral example using the source docs product hero.', banner: selectBackground(post.slug, topics[0]).file,
};
export function SiteExamples() {
  const [view, setView] = useState<'footer' | 'blog' | 'docs' | 'assets'>('footer');
  const [dark, setDark] = useState(true);
  return <div data-site-example="true" style={{ background: '#00030a', color: '#fff', minHeight: '100vh' }}>
    <header style={{ maxWidth: 1216, margin: '0 auto', padding: '24px 20px' }}>
      <h1 style={{ margin: '0 0 8px' }}>SISO site source</h1>
      <p style={{ color: '#c3c5cb' }}>The accepted footer, real blog parts, docs skin and living product glyphs.</p>
      <label>Show <select aria-label="Site component family" value={view} onChange={e => setView(e.target.value as typeof view)} style={{ margin: 8, padding: 8, background: '#141821', color: '#fff' }}>
        <option value="footer">Full landing footer</option><option value="blog">Blog and article tools</option><option value="docs">Docs skin and footer</option><option value="assets">Product glyphs and marks</option>
      </select></label>
    </header>
    {view === 'footer' && <section style={{ maxWidth: 1216, margin: '0 auto', padding: '0 20px 36px', color: '#c3c5cb' }}><p>The entire accepted footer follows. Hover its product tiles, metric picker, social profiles and AI icons; scroll to the signature for the beam and gradient reveal.</p><p>The metric picker uses only counts computed from this example. No production totals or follower counts are loaded.</p></section>}
    {view === 'blog' && <SisoBlogSkin><div className="sb-shell" style={{ paddingBlock: 32 }}>
      <BlogCard post={post} featured href="#example-article" />
      <div className="sb-grid"><BlogCard post={post} href="#example-article" /><BlogCard post={{ ...post, slug: 'source-variation', title: 'The same component, another header' }} href="#example-article" /></div>
      <section id="example-article" style={{ marginTop: 72 }}><div className="sb-article-hero"><BlogHeader {...post} topic={topics[0]} variant="hero" eager /></div>
        <div className="sb-article-layout"><ArticleRail post={post} relatedPosts={[post]} /><article id="article-body" className="sb-prose">
          <TopicPill post={post} />{post.sections.map(section => <section key={section.id}><h2 id={section.id}>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <section className="sb-sources"><h2 id="sources">Sources and scope</h2><ul>{post.sources.map(source => <li key={source}>{source}</li>)}</ul><CopyPage post={post} /></section>
        </article></div></section>
    </div></SisoBlogSkin>}
    {view === 'docs' && <div className={`siso-docs-skin${dark ? ' dark' : ''}`} style={{ padding: '24px 20px' }}>
      <button type="button" className="sd-chip sd-neon" onClick={() => setDark(value => !value)}>{dark ? 'Light docs skin' : 'Dark docs skin'}</button>
      <main id="nd-page" className="sd-page" style={{ maxWidth: 1100, margin: '0 auto' }}><DocsPageKicker product={docProduct} page="Source example" />
        <DocsProductHero product={docProduct} title="A source skin for your docs" description={docProduct.description} status="Package example" />
        <SisoDocsArticle><h2 id="docs-content">Article typography and code</h2><p>The docs' original warm light/dark skin styles this article, inline <code>tokens</code>, links and code frame.</p>
          <SisoDocsCode title="Import the components" language="tsx" code={'import { DocsFooter, SisoDocsArticle } from "@siso/ui/site";'} />
          <SisoDocsSource>Source docs-site/app/global.css, docs-site/components/footer.tsx and the MDX source-note markup.</SisoDocsSource>
          <DocsRail label="Article example" href="#docs-content" />
        </SisoDocsArticle><SiteProvider config={{ stats: demoStats }}><DocsFooter /></SiteProvider>
      </main>
    </div>}
    {view === 'assets' && <section id="glyphs" style={{ maxWidth: 1216, margin: '0 auto', padding: '24px 20px 80px' }}><h2>Original SVG product glyphs</h2><div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>{products.map(product => <figure key={product} style={{ textAlign: 'center', margin: 0 }}><ProductGlyph product={product} size={120} label={product} /><figcaption>{product}</figcaption></figure>)}</div><h2>Docs lion tile</h2><LionTile size={104} live />
      <h2 style={{marginTop:48}}>The source asset library</h2><p>{assetManifest.files.length} verified assets, including the original fonts. Open an image to inspect its full size.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:16,marginTop:24}}>{assetManifest.files.filter(asset=>/\.(webp|png|jpe?g|svg)$/i.test(asset.url)).map(asset=><a key={asset.url} href={asset.url} target="_blank" rel="noreferrer" style={{minWidth:0,border:'1px solid #ffffff22',borderRadius:12,overflow:'hidden',color:'#c3c5cb',textDecoration:'none'}}><img src={asset.url} alt={asset.url.split('/').pop()?.replace(/[-_]/g,' ')} loading="lazy" style={{display:'block',width:'100%',height:112,objectFit:'contain',background:'#080d19'}}/><code style={{display:'block',padding:12,fontSize:10,overflowWrap:'anywhere'}}>{asset.url}</code></a>)}</div>
    </section>}
    <div id="site-footer"><SisoLandingFooter config={{ stats: demoStats, beam: <FooterBeam/> }} /></div>
  </div>;
}
export const SiteShowcase = SiteExamples;
export default SiteExamples;

const footerParts={Products:FooterProducts,Links:FooterLinks,Numbers:FooterNumbers,"Ask AI":FooterAskAI,Social:FooterSocial,Signature:FooterSignature,Lights:FooterLights};
export function FooterExample(){
 const [part,setPart]=useState<keyof typeof footerParts | "Whole footer">("Whole footer");
 const Part=part==="Whole footer"?null:footerParts[part];
 const exported=part==="Ask AI"?"FooterAskAI":`Footer${part}`;
 return <div className="site-source-page"><div className="footer-parts"><h2>The accepted footer, taken whole</h2><p>Inspect the full composition or any of its actual reusable parts.</p><div className="library-categories" role="group" aria-label="Footer parts">{["Whole footer",...Object.keys(footerParts)].map(label=><button key={label} aria-pressed={part===label} onClick={()=>setPart(label as typeof part)}>{label}</button>)}</div><pre>{part==="Whole footer"?'import { SisoLandingFooter } from "@siso/ui/site"\n<SisoLandingFooter config={{ stats: yourStats, beam: yourEffect }} />':`import { ${exported}, SiteProvider } from "@siso/ui/site"\n<SiteProvider config={yourConfig}><${exported}/></SiteProvider>`}</pre></div>{Part&&<section aria-label={`${part} footer part`}><h3 style={{padding:'0 24px'}}>{part}</h3><SiteProvider config={{stats:demoStats}}><div className="sf" style={{position:'relative',padding:32,minHeight:220,color:'#dfe3ea',overflow:'hidden'}}><Part/></div></SiteProvider><h3 style={{padding:'20px 24px'}}>The full composition</h3></section>}<SisoLandingFooter config={{stats:demoStats,beam:<FooterBeam/>}}/></div>;
}
