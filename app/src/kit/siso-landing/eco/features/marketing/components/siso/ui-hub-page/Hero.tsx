// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/ui-hub-page/Hero.tsx)
'use client';

import { useEffect, useRef, useState } from 'react';
import STATS from '../../../data/siso-stats.json';
import LaserBeam from '../ui/LaserBeam';
import { GitHubMark, SISO_GITHUB } from '../ui/GitHubButton';
import { ProductGlyph } from '../ProductGlyph';
import { UI_HUB } from '../home-products/productData';
import UiHubDemo, { UH_DUR, UH_TABS } from '../home-products/ui-hub/UiHubDemo';
import BlackHole, { type HoleTone } from '../library-page/BlackHole';
import { SourceMark } from '../ui/SourceMark';
import { fmt, useLive } from './base';

// The hero and the big demo (spec: docs/specs/product-pages.md, lane ui-hub-page). BridgeMind's beam (siso/ui/LaserBeam, as on
// the Agent Base page) falls from the top and lands on the demo's frame. The demo is the home card's UiHubDemo at full size, with
// the card's four clickables beside it, each with its line and a progress bar. Every number is UI_HUB in productData.ts.
const REPO = STATS.repos.uiHub;
// The beam falls through the hub the way the Great Library's falls through its black hole (Shaan, 9 Oct: "Like that light in
// the background, it'd be nice if the UI hub had something like that"): the same disk in UI Hub's blue, with the first ten
// of its real sources (UI_HUB.sources) drawn in.
const BLUE: HoleTone = { a: '#5b95ff', b: '#9cc0ff', c: '#1f69ff', deep: '#050a14', chip: '#0e1420' };
const SOURCES = UI_HUB.sources.slice(0, 10).map(s => s.name);
const HREF = REPO.public ? `${SISO_GITHUB}/${REPO.repo}` : SISO_GITHUB;

// The card's icons: catalogue grid, globe of sources, a skill file, a browser window.
const TAB_ICONS = [
  <><rect x="3" y="3" width="6" height="6" rx="1.6" /><rect x="11" y="3" width="6" height="6" rx="1.6" /><rect x="3" y="11" width="6" height="6" rx="1.6" /><rect x="11" y="11" width="6" height="6" rx="1.6" /></>,
  <><circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3a11 11 0 0 1 0 14M10 3a11 11 0 0 0 0 14" /></>,
  <><path d="M6 2.5h6l3.5 3.5v11a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5z" /><path d="M12 2.5V6h3.5M8 10h5M8 13h3" /></>,
  <><rect x="2.5" y="4" width="15" height="12" rx="2.5" /><path d="M2.5 7.5h15M5 5.8h.01M7 5.8h.01" /></>,
];

const PROOF = [
  { n: fmt(UI_HUB.indexed), label: 'open UI resources indexed', src: 'UI index ledger.jsonl, 53,843 rows, re-checked 8 Oct 2026' },
  { n: fmt(UI_HUB.bank.components), label: 'components in the bank', src: 'siso-component-bank index.jsonl, 8,538 components from 853 authors' },
  { n: UI_HUB.coverage, label: 'of GitHub UI repos over 100 stars', src: 'UI index SUMMARY.md: 36,602 of an estimated 48,859 (capture-recapture), 8 Oct' },
];

const CSS = `
.uhp-hero{position:relative;isolation:isolate;padding:150px 0 120px;background:#000}
.uhp-beam{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none}
.uhp-beam canvas{width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.uhp-hero-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:26px;max-width:700px}
.uhp-hero-mark{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#9cc0ff}
.uhp-hero h1{margin:0;font:600 clamp(48px,7.4vw,104px)/.96 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #1f69ff33}
.uhp-hero h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#9cc0ff 55%,#1f69ff 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
.uhp-hero-line{margin:0;max-width:560px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.uhp-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.uhp-go,.uhp-gh{display:inline-flex;align-items:center;height:48px;border-radius:13px;font:600 15px/1 Inter,sans-serif;transition:transform .35s cubic-bezier(.19,1,.22,1)}
.uhp-go{gap:8px;padding:0 16px 0 20px;background:#fff;color:#090a0e!important;box-shadow:0 12px 30px -14px #1f69ffcc}
.uhp-go:hover,.uhp-go:focus-visible{transform:translateY(-2px)}
.uhp-go svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.uhp-go:hover svg{transform:translateY(3px)}
.uhp-gh{color:#fff;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff24}
.uhp-gh>span{display:inline-flex;align-items:center;gap:9px;height:100%;padding:0 14px}
.uhp-gh>span+span{border-left:1px solid #ffffff1f;font:500 12.5px/1 'Geist Mono',ui-monospace,monospace;color:#9cc0ff;padding:0 14px 0 13px}
.uhp-gh svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.uhp-gh:hover,.uhp-gh:focus-visible{transform:translateY(-2px)}
.uhp-gh:hover svg{transform:scale(1.1) rotate(-8deg)}
.uhp-proof{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.uhp-proof li{position:relative;display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;cursor:help;outline:none;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:transform .35s cubic-bezier(.19,1,.22,1)}
.uhp-proof li:hover,.uhp-proof li:focus-visible{transform:translateY(-2px);color:#fff}
.uhp-proof b{color:#fff;font-weight:500}
.uhp-proof small{position:absolute;left:0;top:calc(100% + 8px);z-index:20;width:max-content;max-width:300px;padding:8px 10px;border-radius:9px;background:#10131c;box-shadow:0 0 0 1px #1f69ff59,0 14px 30px -12px #000;
  font:400 11.5px/1.5 Inter,sans-serif;letter-spacing:0;color:#e8eefc;pointer-events:none;opacity:0;visibility:hidden;transform:translateY(-4px);transition:opacity .25s,transform .35s cubic-bezier(.19,1,.22,1),visibility 0s linear .25s}
.uhp-proof li:hover small,.uhp-proof li:focus-visible small{opacity:1;visibility:visible;transform:none;transition:opacity .25s,transform .35s cubic-bezier(.19,1,.22,1),visibility 0s linear 0s}
/* the demo frame: the composer halo in UI Hub blue */
@property --uhp-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes uhp-halo{to{--uhp-halo:360deg}}
.uhp-frame{position:relative;z-index:2;margin-top:clamp(90px,11vw,170px);display:grid;grid-template-columns:300px minmax(0,1fr);gap:10px;border-radius:28px;border:1.5px solid transparent;padding:10px;
  background:linear-gradient(#0a0b0f,#0a0b0f) padding-box,conic-gradient(from var(--uhp-halo),#1f69ff,#9cc0ff,#1f69ff33,#5b95ff,#1f69ff) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -30px #5b95ff,0 40px 120px -40px #1f69ff8c;animation:uhp-halo 9s linear infinite}
.uhp-hero:not([data-live]) .uhp-frame{animation-play-state:paused}
.uhp-side{display:flex;flex-direction:column;gap:6px;min-width:0;padding:8px 4px 8px 6px}
.uhp-side-head{display:flex;align-items:center;gap:10px;padding:6px 8px 14px;font:600 15px/1.2 Inter,sans-serif;color:#fff}
.uhp-side-head small{display:block;margin-top:4px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#9cc0ff}
.uhp-tabs{display:flex;flex-direction:column;gap:4px}
.uhp-tab{position:relative;display:flex;align-items:flex-start;gap:12px;width:100%;padding:12px 12px 15px;border:0;border-radius:15px;background:none;text-align:left;cursor:pointer;color:#eeebe4b8;overflow:hidden;font:inherit;
  transition:transform .35s cubic-bezier(.19,1,.22,1)}
.uhp-tab::before{content:"";position:absolute;inset:0;border-radius:inherit;background:#1f69ff14;box-shadow:inset 0 0 0 1px #1f69ff40;opacity:0;transition:opacity .4s}
.uhp-tab:hover{color:#fff;transform:translateX(2px)}
.uhp-tab[aria-selected=true]{color:#fff}
.uhp-tab[aria-selected=true]::before{opacity:1}
.uhp-ico{position:relative;flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14}
.uhp-ico svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.uhp-tab:hover .uhp-ico svg{transform:scale(1.1) rotate(-6deg)}
.uhp-tab[aria-selected=true] .uhp-ico{color:#cfe0ff;background:#1f69ff2e;box-shadow:inset 0 0 0 1px #1f69ff80,0 0 18px -4px #1f69ff}
.uhp-txt{position:relative;display:flex;flex-direction:column;gap:5px;min-width:0}
.uhp-txt b{font:500 15px/1.25 Inter,sans-serif;letter-spacing:-.01em}
.uhp-txt small{font:400 12.5px/1.5 Inter,sans-serif;color:#eeebe48c}
.uhp-prog{position:absolute;left:14px;right:14px;bottom:0;height:1.5px;background:#ffffff0f;opacity:0;transition:opacity .4s}
.uhp-prog i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#1f69ff,#5b95ff,#9cc0ff);box-shadow:0 0 8px #1f69ff;transition:transform .1s linear}
.uhp-tab[aria-selected=true] .uhp-prog{opacity:1}
.uhp-ways{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;padding:14px 8px 4px;border-top:1px solid #ffffff0f}
.uhp-way{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 10px 0 6px;border-radius:9px;font:500 12px/1 Inter,sans-serif;color:#e8eefc;
  background:#1f69ff14;box-shadow:inset 0 0 0 1px #1f69ff4d;transition:transform .35s cubic-bezier(.19,1,.22,1)}
.uhp-way i{width:15px;height:15px;border-radius:50%;display:grid;place-items:center;background:#1f69ff;color:#fff;font:700 9px/1 Inter,sans-serif;font-style:normal}
a.uhp-way:hover,a.uhp-way:focus-visible{transform:translateY(-2px)}
.uhp-way.is-soon{color:#e8eefc80;background:#ffffff06;box-shadow:inset 0 0 0 1px #ffffff1a}.uhp-way.is-soon i{background:#ffffff1a;color:#e8eefc99}
.uhp-fig{position:relative;height:clamp(560px,50vw,720px);border-radius:20px;overflow:hidden;background:#06123a}
.uhp-fig-foot{grid-column:1/-1;display:flex;justify-content:space-between;gap:12px;padding:4px 8px 2px;font:500 10.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.42)}
.uhp-fig-foot b{color:#9cc0ff;font-weight:500}
@media (max-width:991px){
  .uhp-frame{grid-template-columns:minmax(0,1fr)}
  .uhp-side{padding:4px}
  .uhp-side-head,.uhp-ways{display:none}
  .uhp-tabs{flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:4px}
  .uhp-tabs::-webkit-scrollbar{display:none}
  .uhp-tab{flex:0 0 auto;width:auto;scroll-snap-align:start;align-items:center;padding:9px 12px 11px}
  .uhp-tab:hover{transform:none}
  .uhp-txt small{display:none}
  .uhp-fig{height:auto}
}
@media (max-width:767px){
  .uhp-hero{padding:120px 0 80px}
  .uhp-hero-copy{gap:20px}
  .uhp-hero-line{font-size:16px}
  .uhp-frame{border-radius:20px;padding:6px}
  .uhp-fig{border-radius:15px}
  .uhp-fig-foot{flex-direction:column;gap:4px}
}
@media (prefers-reduced-motion:reduce){.uhp-frame{animation:none}}
`;

export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const { inView, live } = useLive(hero, 0.05);
  const reduce = !live && inView;
  const [beam, setBeam] = useState({ h: 900, land: 0.8, x: 0.2 });
  const [k, setK] = useState(0);
  const [tab, setTab] = useState(0);
  const [t, setT] = useState(0);
  const [held, setHeld] = useState(false);

  // The nav takes UI Hub's blue glow for the whole page (not just the hero, or it flips back to the default coral on scroll).
  useEffect(() => {
    document.documentElement.dataset.glow = 'ui-hub';
    return () => { if (document.documentElement.dataset.glow === 'ui-hub') delete document.documentElement.dataset.glow; };
  }, []);

  // Size the beam so it lands on the frame's top edge: its box runs from the top of the hero to a little past the frame.
  useEffect(() => {
    const h = hero.current, f = frame.current;
    if (!h || !f) return;
    const measure = () => {
      const top = f.getBoundingClientRect().top - h.getBoundingClientRect().top;
      const height = Math.round(top + 220);
      // 0.24 from the centre, as on every product hero; 0.62 put the beam past the right edge of the screen.
      const x = h.getBoundingClientRect().width < 768 ? 0.3 : 0.24;
      setBeam(b => (Math.abs(b.h - height) < 2 && b.x === x ? b : { h: height, land: top / height, x }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);

  // The beam fades in each time the hero comes into view.
  useEffect(() => {
    if (!inView) { setK(0); return; }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setK(1); return; }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400);
      setK(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  // Each clickable plays its story; while the pointer or focus is on the demo it waits at the end instead of moving on.
  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setT(v => v + 100), 100);
    return () => window.clearInterval(id);
  }, [live]);
  useEffect(() => {
    if (t >= UH_DUR + 600 && !held) { setTab(v => (v + 1) % UH_TABS.length); setT(0); }
  }, [t, held]);
  const pick = (i: number) => { setTab(i); setT(0); };
  const time = reduce ? UH_DUR : t;

  return (
    <section ref={hero} className="uhp-hero" data-live={live || undefined} data-shot="hero" aria-labelledby="uhp-title">
      <style>{CSS}</style>
      <div className="uhp-beam" style={{ height: beam.h }} aria-hidden="true">
        <LaserBeam active={inView} intensity={k} color="#5b95ff" maxDpr={1}
          horizontalBeamOffset={beam.x} verticalBeamOffset={0.5 - beam.land} horizontalSizing={0.62} verticalSizing={2.4}
          falloffStart={1.3} fogIntensity={0.42} wispIntensity={5} flowSpeed={0.3} />
      </div>
      <BlackHole live={live} k="uhbh" tone={BLUE} labels={SOURCES} icon={<ProductGlyph product="ui-hub" size={96} playing={live} />} />
      <div className="uhp-wrap">
        <div className="uhp-hero-copy">
          <span className="uhp-hero-mark"><ProductGlyph product="ui-hub" size={30} playing={live} />SISO UI Hub · the swipe file</span>
          <h1 id="uhp-title">UI Hub.<span>Every UI worth reusing.</span></h1>
          <p className="uhp-hero-line">Indexed so your agents search and install.</p>
          <div className="uhp-ctas">
            {/* The live hub, not the window below (t-0585: "UI Hub's Try the demo goes to https://hub.sisolabs.space"). */}
            <a href="https://hub.sisolabs.space" target="_blank" rel="noopener noreferrer" className="uhp-go">Try the demo
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 14 14 6M7.5 6H14v6.5" /></svg>
            </a>
            <a href={HREF} target="_blank" rel="noopener noreferrer" className="uhp-gh" aria-label={`UI Hub on GitHub: ${REPO.public ? `${REPO.stars} stars` : 'opening soon'}`}>
              <span><GitHubMark size={18} />GitHub</span>
              <span>{REPO.public && REPO.stars != null ? <>★ {Number(REPO.stars).toLocaleString('en-US')}</> : '★ Soon'}</span>
            </a>
          </div>
          <ul className="uhp-proof" aria-label="Receipts">
            <li className="hero-os"><a href={HREF} target="_blank" rel="noopener noreferrer"><GitHubMark size={13} />{REPO.public ? 'Open source' : 'Opening soon'}<span aria-hidden="true">↗</span></a></li>
            {PROOF.map(p => <li key={p.label} tabIndex={0}><b>{p.n}</b> {p.label}<SourceMark>{p.src}</SourceMark></li>)}
          </ul>
        </div>

        <div ref={frame} id="demo" className="uhp-frame"
          onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}>
          <div className="uhp-side">
            <div className="uhp-side-head"><ProductGlyph product="ui-hub" size={40} playing={held} /><div>UI Hub<small>Click around it</small></div></div>
            <div className="uhp-tabs" role="tablist" aria-label="UI Hub features" aria-orientation="vertical">
              {UH_TABS.map((item, i) => <button key={item.key} type="button" role="tab" className="uhp-tab" aria-selected={tab === i} aria-controls="uhp-demo"
                onClick={() => pick(i)}
                onKeyDown={e => {
                  const fwd = e.key === 'ArrowDown' || e.key === 'ArrowRight', back = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
                  if (fwd || back) {
                    e.preventDefault(); const n = (i + (fwd ? 1 : UH_TABS.length - 1)) % UH_TABS.length;
                    pick(n); (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                  }
                }}>
                <span className="uhp-ico"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{TAB_ICONS[i]}</svg></span>
                <span className="uhp-txt"><b>{item.label}</b><small>{item.desc}</small></span>
                <span className="uhp-prog" aria-hidden="true"><i style={{ transform: `scaleX(${tab === i ? Math.min(1, time / UH_DUR) : 0})` }} /></span>
              </button>)}
            </div>
            {/* The ways in that exist today; MCP isn't built, so it says so (productData.ts UI_HUB). */}
            <div className="uhp-ways">
              <a className="uhp-way" href={UI_HUB.repoUrl} target="_blank" rel="noopener noreferrer"><i>✓</i>Open source</a>
              <a className="uhp-way" href={UI_HUB.cliUrl} target="_blank" rel="noopener noreferrer"><i>✓</i>CLI</a>
              <a className="uhp-way" href="#skills"><i>✓</i>Skills</a>
              <span className="uhp-way is-soon"><i>…</i>MCP soon</span>
            </div>
          </div>
          <div className="uhp-fig" id="uhp-demo" role="tabpanel" aria-label={UH_TABS[tab].label}>
            <UiHubDemo tab={tab} t={time} running={live} onTab={i => { if (i !== tab) pick(i); }} />
          </div>
          <div className="uhp-fig-foot"><span>Not a screenshot: the window is live. <b>Click a category, a card, a skill.</b></span><span>Real previews, real names, a real ui-pick run (9 Oct)</span></div>
        </div>
      </div>
    </section>
  );
}
