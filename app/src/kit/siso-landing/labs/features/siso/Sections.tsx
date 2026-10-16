// uihub: siso:landing (copied from the SISO landing, labs/features/siso/Sections.tsx)
// SISO home sections. Server-rendered HTML so every word reads without JS; motion is added by SisoMotion.
import { PART_ICONS } from './icons';
import { PARTS, LIBRARY_NUMBERS, LINKS, FACTS, asset, href } from './data';
import PartCard from './PartCard';

const fmt = (n: number) => n.toLocaleString('en-GB');
const Icon = ({ k }: { k: string }) => <span className="ic" dangerouslySetInnerHTML={{ __html: PART_ICONS[k] }} />;
const partHref = (slug: string) => href(`/${slug}/`);

// Runs before paint: marks JS / reduced motion on <html> so the no-JS and reduced fallbacks are pure CSS.
export const BOOT_SCRIPT = `(function(h){var r=matchMedia('(prefers-reduced-motion: reduce)').matches;h.classList.add(r?'siso-reduced':'siso-js');if(!r){h.classList.add('siso-booting');setTimeout(function(){h.classList.remove('siso-booting')},5000)}})(document.documentElement)`;

export function SisoNav() {
  return (
    <header className="siso-nav">
      <a className="logo" href={href('/')} aria-label="SISO home">SISO<i>.</i></a>
      <nav aria-label="Products">
        {PARTS.map(p => (
          <a key={p.slug} href={partHref(p.slug)}><Icon k={p.slug} />{p.name}</a>
        ))}
      </nav>
      <a className="btn ghost gh" href={LINKS.github}>GitHub</a>
      <a className="btn" href={LINKS.mail}>Talk to us</a>
    </header>
  );
}

export function Hero() {
  return (
    <div className="s-hero-wrap">
    <section className="s-hero" aria-label="Every local business on Earth gets great software">
      <div id="siso-loader" aria-hidden="true"><div className="count"><b id="siso-ct">0</b>PLACES ON THE MAP · ĐÀ NẴNG</div></div>
      <canvas id="siso-map" aria-hidden="true" />
      <div className="mono coords">16.05°N 108.20°E · Đà Nẵng</div>
      <div className="mono coords r">Source · Overture Maps · 23.09.2026</div>
      <div className="mono cap" id="siso-cap">The plan · one site per dark dot</div>
      <div className="copy wrap">
        <div className="mono">Super Intelligence Systems Operator</div>
        <h1>Every local business on Earth gets great <em>software.</em></h1>
        <p className="sub">Built first. Free. By a network of AI agents that gets better with every site it ships.</p>
        <p className="proof">We started where we live. In Đà Nẵng, <b>{fmt(FACTS.noWebsite)}</b> of <b>{fmt(FACTS.places)}</b> places on the map have no website. We&rsquo;re building them one.</p>
        <div className="row">
          <a className="btn g" href="#sites">See a site we built</a>
          <a className="btn ghost" href="#parts">What&rsquo;s open</a>
        </div>
      </div>
      <div className="legend mono">
        <span>Has a website <i style={{ background: '#cfcac0' }} /></span>
        <span>No website <i style={{ border: '1px solid #6a665e' }} /></span>
        <span className="gold">Lit by SISO <i style={{ background: 'var(--gold)', boxShadow: '0 0 10px var(--gold)' }} /></span>
      </div>
    </section>
    </div>
  );
}

export function BuiltFirst() {
  return (
    <section className="s-first" aria-label="Built first, free">
      <div className="wrap">
        <div className="sec-h">
          <span className="eyebrow mono"><i />Built first, free</span>
          <h2>We don&rsquo;t pitch. We build it first.</h2>
          <p>Before an owner ever hears from us, their site exists: their name, their menu, their street, in their language. They claim it free.</p>
        </div>
        <div className="ba">
          <div className="pane before">
            <span className="mono">Before · what the map knows</span>
            <div className="mapbit" aria-hidden="true"><b /></div>
            <div className="pin">
              <span className="mono">Overture Maps listing</span>
              <h3>Cà Phê 89</h3>
              <p className="mono" style={{ letterSpacing: '.08em' }}>257 Tô Hiệu · Đà Nẵng</p>
              <div className="row"><span>Name</span><span>Address</span><span>Phone</span><span>Facebook page</span><span className="x">Website</span><span className="x">Menu</span></div>
            </div>
          </div>
          <div className="pane after">
            <span className="mono gold">After · built by SISO, claimed free</span>
            <div className="phones">
              <div className="phone"><img src={asset('shots/c89-cosy-m.webp')} alt="Corner Café site on a phone, cosy look" loading="lazy" width={390} height={844} /></div>
              <div className="phone b"><img src={asset('shots/c89-premium-dark-m.webp')} alt="Corner Café site on a phone, premium dark look" loading="lazy" width={390} height={844} /></div>
            </div>
            <a className="mono" href={LINKS.cornerCafe} style={{ textAlign: 'center' }}>Live · corner-cafe-six.siso-sites.pages.dev ↗</a>
          </div>
        </div>
        <div className="facts">
          <div className="fact"><div className="n" data-n={FACTS.looks}>{FACTS.looks}</div><p><b>Corner Café</b> is live in {FACTS.looks} looks from one design system, in Vietnamese, English and Korean.</p></div>
          <div className="fact"><div className="n" data-n={FACTS.games}>{FACTS.games}</div><p>playable games a café can run tonight: 20 mechanics in 6 styles, plus 4 seasonal packs, all drawn from its real menu.</p></div>
          <div className="fact"><div className="n" data-n={FACTS.cafesNoSite}>{fmt(FACTS.cafesNoSite)}</div><p>of Đà Nẵng&rsquo;s {fmt(FACTS.cafes)} cafés and juice bars have no working website. That&rsquo;s the first street we&rsquo;re lighting up.</p></div>
        </div>
      </div>
    </section>
  );
}

export function DotToSite() {
  return (
    <div className="s-d2s-wrap" id="sites">
    <section className="s-d2s" aria-label="From a dot to a site">
      <div className="head wrap">
        <div className="mono">One dot · Cà Phê 89 · Đà Nẵng</div>
        <h2>From a dot on the map to a site the owner can claim.</h2>
      </div>
      <div className="seed" id="siso-seed" aria-hidden="true" />
      <div className="card" id="siso-card">
        <div className="bar"><i /><i /><i /><span className="mono">corner-cafe-six.siso-sites.pages.dev</span></div>
        <div className="layer atoms" id="l-atoms" aria-hidden="true">
          {['#2b1d14', '#6b4630', '#c89b6d', '#efe2cf', '#1f3a2e', '#ffc24b'].map(c => <div key={c} className="sw" style={{ background: c }} />)}
          <div className="ty">Aa<small className="mono">Display · tight</small></div>
          <div className="ty" style={{ font: '400 22px/1.3 Georgia,serif' }}>Cà phê sữa đá<small className="mono">Body · warm</small></div>
        </div>
        <div className="layer genome" id="l-genome" aria-hidden="true">
          <div className="h mono">Hero · photo + name + hours</div><div className="mono">Menu · module</div><div className="mono">Map · directions</div><div className="mono">Reviews</div><div className="mono">Claim this site</div>
        </div>
        <div className="layer looks" id="l-looks">
          <img src={asset('img/premium-dark.webp')} alt="Corner Café, premium dark look" loading="lazy" width={860} height={538} />
          <img src={asset('img/cosy.webp')} alt="Corner Café, cosy look" loading="lazy" />
          <img src={asset('img/street.webp')} alt="Corner Café, street look" loading="lazy" />
          <img src={asset('img/playful.webp')} alt="Corner Café, playful look" loading="lazy" />
        </div>
      </div>
      <div className="steps mono" aria-hidden="true"><span id="s1">01 Atoms</span><span id="s2">02 Genome</span><span id="s3">03 Recipe</span><span id="s4">04 Looks</span></div>
      <div className="foot mono">One design system · atoms → genomes → recipes · <a href={LINKS.cornerCafe}>open the live site ↗</a></div>
    </section>
    </div>
  );
}

export function Parts() {
  return (
    <section className="s-parts" id="parts" aria-label="Five parts">
      <div className="wrap">
        <div className="sec-h">
          <span className="eyebrow mono"><i />SISO in five parts</span>
          <h2>Five parts. One operating system.</h2>
          <p>We build for businesses and invent products. Behind both: the knowledge, the agents and the intelligence. All of it is open except Agent Base, which is opening soon.</p>
        </div>
        <div className="list">
          {PARTS.map(p => (
            <PartCard key={p.slug} part={p} icon={PART_ICONS[p.slug]} href={partHref(p.slug)} base={asset('')} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Library() {
  const [people, works, repos, comps, inds, packs] = LIBRARY_NUMBERS;
  return (
    <section className="s-lib" aria-label="The library in numbers">
      <div className="wrap">
        <div className="sec-h">
          <span className="mono">The library, in numbers · open on github.com/sisodias</span>
          <h2>We built the library before we built the sites.</h2>
          <p>Every site comes from one shared design system, informed by research our agents keep current.</p>
        </div>
        <div className="grid">
          <a className="blk wide dark" href={LINKS.github}><div className="top mono"><span>01 · Industries</span><span>↗</span></div><div><div className="n" data-n={inds.n}>{fmt(inds.n)}</div><p>industries ranked and mapped into 8 business modules: menu, booking, catalogue, classes, quote, rentals, rooms, consult.</p></div></a>
          <a className="blk" href="https://github.com/sisodias/siso-people-graph"><div className="top mono"><span>02 · People Graph</span><span>↗</span></div><div><div className="n" data-n={people.n}>{fmt(people.n)}</div><p>people, {fmt(works.n)} works, 2.05M edges.</p></div></a>
          <a className="blk" href="https://github.com/sisodias/siso-repo-bank"><div className="top mono"><span>03 · Repo Bank</span><span>↗</span></div><div><div className="n" data-n={repos.n}>{fmt(repos.n)}</div><p>GitHub repos, rated.</p></div></a>
          <a className="blk" href="https://github.com/sisodias/siso-component-bank"><div className="top mono"><span>04 · Component Bank</span><span>↗</span></div><div><div className="n" data-n={comps.n}>{fmt(comps.n)}</div><p>UI components.</p></div></a>
          <a className="blk" href="https://github.com/sisodias/siso-industry-packs"><div className="top mono"><span>05 · Industry packs</span><span>↗</span></div><div><div className="n" data-n={packs.n}>{packs.n}</div><p>industry research packs.</p></div></a>
          <a className="blk wide" href={LINKS.github}><div className="top mono"><span>06 · The rest of the library</span><span>↗</span></div><div><p style={{ fontSize: 'clamp(20px,2vw,28px)', color: '#121110', letterSpacing: '-.02em', lineHeight: 1.2, margin: 0 }}>The Great Library of SISO, Foundry, Skills Hub and Project OS.</p></div></a>
          <div className="blk dark"><div className="top mono"><span>07 · Agent Base</span><span className="gold">Soon</span></div><div><p style={{ fontSize: 20, color: 'var(--ink)', lineHeight: 1.25, margin: 0 }}>Our host on the Claude Agent SDK. Opening up soon.</p></div></div>
        </div>
      </div>
    </section>
  );
}

export function Network() {
  return (
    <section className="s-net" aria-label="A network that improves itself">
      <div className="wrap">
        <div className="mono">A network that improves itself</div>
        <p className="big" id="siso-mani">Every site teaches the next one. When a pattern wins on one street, it becomes an atom in the library, and every future site gets it.</p>
        <div className="how">
          <div><span className="mono">01</span><h3>Opus heads each domain</h3><p>Claude Opus reasons over the design system and sets the bar.</p></div>
          <div><span className="mono">02</span><h3>Claude Code builds</h3><p>Agents build and maintain the system and every client site.</p></div>
          <div><span className="mono">03</span><h3>Claude judges</h3><p>Every look and every section is checked against written quality laws before it ships.</p></div>
          <div><span className="mono">04</span><h3>Claude onboards</h3><p>A multilingual assistant walks owners through in Vietnamese, English and Korean.</p></div>
        </div>
      </div>
    </section>
  );
}

export function Vision() {
  return (
    <section className="s-vision" aria-label="The vision">
      <div className="wrap">
        <div className="box">
          <div className="txt">
            <span className="mono gold">The vision</span>
            <h2>From one street in Đà Nẵng to every map on Earth.</h2>
            <p>{fmt(FACTS.industries)} industries. Every city on the open map. Each business gets great software built first and free, and grows into the operating system that runs it.</p>
            <p>Small businesses are about 90% of the world&rsquo;s businesses and more than half its jobs (<a href={LINKS.worldBank}>World Bank</a>), and most still run on paper, chat apps and luck. We think agents can change that, and we&rsquo;re building it in the open.</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a className="btn g" href={LINKS.mail}>Talk to us</a>
              <a className="btn ghost" href={LINKS.github}>github.com/sisodias</a>
            </div>
          </div>
          <div className="pic"><img src={asset('vis/03-website-city-wide.webp')} alt="" loading="lazy" width={1200} height={675} /></div>
        </div>
      </div>
    </section>
  );
}

export function SisoFooter() {
  return (
    <footer className="s-foot">
      <div className="wrap">
        <div className="cols">
          <div>
            <div className="logo">SISO<i>.</i></div>
            <p style={{ color: 'var(--dim)', marginTop: 14, maxWidth: '36ch', fontSize: 15 }}>Super Intelligence Systems Operator. Great software for every local business on Earth, built first and free.</p>
          </div>
          <div>
            <span className="mono">Products</span>
            <ul>{PARTS.map(p => <li key={p.slug}><a href={partHref(p.slug)}><Icon k={p.slug} />{p.name}</a></li>)}</ul>
          </div>
          <div>
            <span className="mono">Open</span>
            <ul>
              <li><a href={LINKS.github}>GitHub</a></li>
              <li><a href={LINKS.cornerCafe}>Corner Café</a></li>
              <li><a href={LINKS.games}>The games layer</a></li>
              <li><a href="/llms.txt">llms.txt</a></li>
              <li><a href={LINKS.mail}>hello@sisolabs.space</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <p>SISO Labs is a trading name of SISO Solutions Limited (company no. 06674625), registered in England and Wales. Building in Đà Nẵng.</p>
          <p className="mono">© 2026 SISO Labs</p>
        </div>
      </div>
    </footer>
  );
}
