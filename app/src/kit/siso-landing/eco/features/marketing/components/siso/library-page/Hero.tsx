// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/library-page/Hero.tsx)
'use client';

import { useEffect, useRef, useState } from 'react';
import STATS from '../../../data/siso-stats.json';
import LaserBeam from '../ui/LaserBeam';
import { GitHubMark, SISO_GITHUB } from '../ui/GitHubButton';
import { LivingIcon } from '../living/living-assets';
import LibraryDemo, { LIB_DUR, LIB_TABS, LIB_TAB_ICONS } from '../home-products/library/LibraryDemo';
import { RATED } from '../home-products/library/libraryData';
import { useLive } from '../agent-base-page/base';
import { Num, fmt } from './kit';
import BlackHole from './BlackHole';

// The hero and the big demo (spec: product-pages.md, "Every page has" 1). The Agent Base hero's pattern (agent-base-page/Hero.tsx)
// in the library's purple: BridgeMind's beam falls from the top and lands on the demo's frame; the demo is the home card's
// LibraryDemo at full size with its four clickables beside it, as on the card. Each clickable plays its story and moves on; while
// the pointer or focus is on the demo it waits at the end.
const REPO = STATS.repos.greatLibrary;
const HREF = `${SISO_GITHUB}/${REPO.repo}`;
const STARS = REPO.public && typeof REPO.stars === 'number' && REPO.stars > 0 ? REPO.stars : 0;
const INDEXED = STATS.stats.find(s => s.key === 'repos')!;

const CSS = `
.glh{position:relative;isolation:isolate;padding:150px 0 120px;background:#000}
.glh-beam{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none}
.glh-beam canvas{width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.glh-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:26px;max-width:700px}
.glh-mark{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#d2b6ff}
.glh h1{margin:0;font:600 clamp(48px,7.4vw,104px)/.96 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #a46bff33}
.glh h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#d2b6ff 55%,#a46bff 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
.glh-line{margin:0;max-width:560px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.glh-line .glp-num{color:#fff}
.glh-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.glh-go,.glh-gh{display:inline-flex;align-items:center;height:48px;border-radius:13px;font:600 15px/1 Inter,sans-serif;
  transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s}
.glh-go{gap:8px;padding:0 16px 0 20px;background:#fff;color:#090a0e!important}
.glh-go:hover,.glh-go:focus-visible{transform:translateY(-2px);box-shadow:0 12px 30px -10px #a46bffcc}
.glh-go svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.glh-go:hover svg{transform:translateY(3px)}
.glh-gh{color:#fff;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff24}
.glh-gh>span{display:inline-flex;align-items:center;gap:9px;height:100%;padding:0 14px}
.glh-gh>span+span{border-left:1px solid #ffffff1f;font:500 12.5px/1 'Geist Mono',ui-monospace,monospace;color:#d2b6ff;padding:0 14px 0 13px}
.glh-gh svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.glh-gh:hover,.glh-gh:focus-visible{transform:translateY(-2px);background:#ffffff14;box-shadow:inset 0 0 0 1px #a46bff8c,0 10px 28px -12px #a46bff}
.glh-gh:hover svg{transform:scale(1.1) rotate(-8deg)}
.glh-proof{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.glh-proof li{display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.glh-proof li:hover{color:#fff;box-shadow:inset 0 0 0 1px #a46bff80;transform:translateY(-2px)}
.glh-proof b{color:#fff;font-weight:500}
@property --glh-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes glh-halo{to{--glh-halo:360deg}}
.glh-frame{position:relative;z-index:2;margin-top:clamp(90px,11vw,170px);border-radius:28px;border:1.5px solid transparent;padding:10px;
  display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:10px;
  background:linear-gradient(#0a0910,#0a0910) padding-box,conic-gradient(from var(--glh-halo),#7540b7,#d2b6ff,#7540b733,#a46bff,#7540b7) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -30px #c9a4ff,0 40px 120px -40px #7540b78c;animation:glh-halo 9s linear infinite}
.glh:not([data-live]) .glh-frame{animation-play-state:paused}
.glh-side{display:flex;flex-direction:column;gap:4px;padding:6px 2px 6px 4px}
.glh-side-h{display:flex;align-items:center;gap:10px;padding:8px 10px 14px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#eeebe480}
.glh-tab{position:relative;display:flex;align-items:flex-start;gap:12px;width:100%;padding:12px 12px 15px;border:0;border-radius:15px;background:none;text-align:left;cursor:pointer;color:#eeebe4b8;overflow:hidden;
  font:inherit;transition:background .4s cubic-bezier(.19,1,.22,1),color .4s,transform .35s cubic-bezier(.19,1,.22,1)}
.glh-tab:hover{color:#fff;background:#ffffff08;transform:translateX(2px)}
.glh-tab[aria-selected=true]{color:#fff;background:#7540b71f;box-shadow:inset 0 0 0 1px #a46bff4d}
.glh-ico{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .4s cubic-bezier(.19,1,.22,1)}
.glh-ico svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.glh-tab:hover .glh-ico svg{transform:scale(1.1) rotate(-6deg)}
.glh-tab[aria-selected=true] .glh-ico{color:#d2b6ff;background:#7540b733;box-shadow:inset 0 0 0 1px #a46bff99,0 0 18px -4px #a46bff}
.glh-txt{display:flex;flex-direction:column;gap:6px;min-width:0}
.glh-txt b{font:500 15px/1.25 Inter,sans-serif;letter-spacing:-.01em}
.glh-txt small{font:400 13px/1.5 Inter,sans-serif;color:#eeebe48c}
.glh-tab[aria-selected=true] .glh-txt small{color:#eeebe4bf}
.glh-prog{position:absolute;left:14px;right:14px;bottom:0;height:1.5px;background:#ffffff0f;opacity:0;transition:opacity .4s}
.glh-prog i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#7540b7,#a46bff,#d2b6ff);box-shadow:0 0 8px #a46bff;transition:transform .1s linear}
.glh-tab[aria-selected=true] .glh-prog{opacity:1}
.glh-note{margin-top:auto;padding:16px 12px 8px;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;text-transform:uppercase;color:rgba(255,255,255,.42)}
.glh-note b{color:#d2b6ff;font-weight:500}
.glh-fig{position:relative;aspect-ratio:752/640;border-radius:20px;overflow:hidden;background:#170a2e}
@media (max-width:991px){
  .glh-frame{grid-template-columns:minmax(0,1fr)}
  .glh-side{flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 4px 6px}
  .glh-side::-webkit-scrollbar{display:none}
  .glh-side-h{display:none}
  .glh-tab{flex:0 0 auto;width:auto;scroll-snap-align:start;align-items:center;padding:9px 12px 11px}
  .glh-txt small{display:none}
  .glh-note{display:none}
}
@media (max-width:767px){
  .glh{padding:120px 0 80px}
  .glh-copy{gap:20px}
  .glh-line{font-size:16px}
  .glh-frame{border-radius:20px;padding:6px}
  .glh-fig{border-radius:15px}
}
@media (prefers-reduced-motion:reduce){.glh-frame{animation:none}}
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

  // The nav takes the library's purple glow while the hero is on screen.
  useEffect(() => {
    if (inView) document.documentElement.dataset.glow = 'library';
    else if (document.documentElement.dataset.glow === 'library') delete document.documentElement.dataset.glow;
  }, [inView]);
  useEffect(() => () => { if (document.documentElement.dataset.glow === 'library') delete document.documentElement.dataset.glow; }, []);

  // Size the beam so it lands on the frame's top edge.
  useEffect(() => {
    const h = hero.current, f = frame.current;
    if (!h || !f) return;
    const measure = () => {
      const top = f.getBoundingClientRect().top - h.getBoundingClientRect().top;
      const height = Math.round(top + 220);
      const w = h.getBoundingClientRect().width;
      const x = w < 768 ? 0.3 : 0.24;
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

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setT(v => v + 100), 100);
    return () => window.clearInterval(id);
  }, [live]);
  useEffect(() => {
    if (t >= LIB_DUR + 600 && !held) { setTab(v => (v + 1) % LIB_TABS.length); setT(0); }
  }, [t, held]);
  const pick = (i: number) => { setTab(i); setT(0); };
  const time = reduce ? LIB_DUR : t;

  return (
    <section ref={hero} className="glh" data-live={live || undefined} data-shot="hero" aria-labelledby="glh-title">
      <style>{CSS}</style>
      <div className="glh-beam" style={{ height: beam.h }} aria-hidden="true">
        <LaserBeam active={inView} intensity={k} color="#B98CFF" maxDpr={1}
          horizontalBeamOffset={beam.x} verticalBeamOffset={0.5 - beam.land} horizontalSizing={0.62} verticalSizing={2.4}
          falloffStart={1.3} fogIntensity={0.42} wispIntensity={5} flowSpeed={0.3} />
      </div>
      <BlackHole live={live} />
      <div className="abp-wrap">
        <div className="glh-copy">
          <span className="glh-mark"><LivingIcon name="library" size={30} variant="glyph" paused={!live} />Great Library of SISO · Research</span>
          <h1 id="glh-title">Great Library.<span>Everything our agents know.</span></h1>
          <p className="glh-line">
            <Num src={INDEXED.source}>{INDEXED.n}</Num> repos indexed. <Num src="libraryData.ts RATED: bank_best.jsonl, 23,778 rows">{fmt(RATED)}</Num> rated for reuse.
          </p>
          <div className="glh-ctas">
            <a href="#demo" className="glh-go">Try the demo
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
            </a>
            <a href={REPO.public ? HREF : SISO_GITHUB} target="_blank" rel="noopener noreferrer" className="glh-gh"
              aria-label={`Great Library of SISO on GitHub${!REPO.public ? ': opening soon' : STARS ? `: ${STARS} stars` : ', open source'}`}>
              <span><GitHubMark size={18} />GitHub</span>
              <span>{!REPO.public ? '★ Soon' : STARS ? <>★ {fmt(STARS)}</> : '★ Star'}</span>
            </a>
          </div>
          <ul className="glh-proof" aria-label="Receipts">
            <li className="hero-os"><a href={HREF} target="_blank" rel="noopener noreferrer"><GitHubMark size={13} />Open source<span aria-hidden="true">↗</span></a></li>
            <li title={REPO.source}>Public · <b>MIT</b></li>
            <li title="Great_Library_of_SISO/registry/works/frontier-question-gq-*.json">god questions on <b>GitHub</b></li>
            <li title="libraryData.ts: Claude and Codex agents split each question">Claude · Codex</li>
          </ul>
        </div>

        <div ref={frame} id="demo" className="glh-frame"
          onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}>
          <div className="glh-side" role="tablist" aria-label="Great Library features" aria-orientation="vertical">
            <div className="glh-side-h"><LivingIcon name="library" size={18} variant="glyph" paused />Four shelves</div>
            {LIB_TABS.map((item, i) => <button key={item.key} type="button" role="tab" className="glh-tab" aria-selected={tab === i} aria-controls="glh-demo"
              tabIndex={tab === i ? 0 : -1} onClick={() => pick(i)}
              onKeyDown={e => {
                const next = e.key === 'ArrowDown' || e.key === 'ArrowRight', prev = e.key === 'ArrowUp' || e.key === 'ArrowLeft';
                if (next || prev) {
                  e.preventDefault(); const n = (i + (next ? 1 : LIB_TABS.length - 1)) % LIB_TABS.length;
                  pick(n); (e.currentTarget.parentElement?.querySelectorAll('[role=tab]')[n] as HTMLElement | undefined)?.focus();
                }
              }}>
              <span className="glh-ico"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{LIB_TAB_ICONS[i]}</svg></span>
              <span className="glh-txt"><b>{item.label}</b><small>{item.desc}</small></span>
              <span className="glh-prog" aria-hidden="true"><i style={{ transform: `scaleX(${tab === i ? Math.min(1, time / LIB_DUR) : 0})` }} /></span>
            </button>)}
            <p className="glh-note">Live, not a screenshot. <b>Real records.</b></p>
          </div>
          <div className="glh-fig" id="glh-demo" role="tabpanel" aria-label={LIB_TABS[tab].label}>
            <LibraryDemo tab={tab} t={time} running={live} onPick={pick} />
          </div>
        </div>
      </div>
    </section>
  );
}
