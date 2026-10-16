// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/skills-page/Hero.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import HUB from '../../../data/skills-hub.json';
import LaserBeam from '../ui/LaserBeam';
import { GitHubMark } from '../ui/GitHubButton';
import SkillsHubDemo, { SH_DUR, SH_TABS } from '../home-products/skills-hub/SkillsHubDemo';
import { SkillsHubMark } from '../home-products/skills-hub/SkillsHubIcon';
import HeroField from './HeroField';
import { Num, REGISTRY_SRC, REPO, SKILLS_N, SKILLS_SRC, useLive } from './base';

// The hero and the big demo (spec: docs/specs/product-pages.md, "every page has" 1). Agent Base's hero (agent-base-page/Hero)
// in amber: BridgeMind's beam falls from the top of the page and lands on the demo's frame, in normal flow (UI standard trap 1),
// stopping off screen. The demo is the home card's SkillsHubDemo at full size, its four clickables in a row above the window.
// Stars: the repo is public but its star count has not been read into the data yet, so the button says "★ Star", the home
// card's rule for a repo under 10 stars, instead of a number.
const CATS = Object.keys(HUB.categories).length;

const TAB_ICONS = [
  <><rect x="2.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="2.5" y="11.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="11.5" width="6" height="6" rx="1.5" /></>,
  <><rect x="2.5" y="4" width="15" height="12" rx="2.5" /><path d="m6 8 2.5 2L6 12M10.5 12H14" /></>,
  <><path d="M10 2.5 4 5v5c0 3.6 2.6 6.6 6 7.5 3.4-.9 6-3.9 6-7.5V5z" /><path d="m7.5 10 2 2 3.5-4" /></>,
  <><path d="m10 2.5 7.5 4-7.5 4-7.5-4z" /><path d="m2.5 10 7.5 4 7.5-4M2.5 13.5l7.5 4 7.5-4" /></>,
];

const CSS = `
.skp-hero{position:relative;isolation:isolate;padding:150px 0 120px;background:#000}
.skp-beam{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none}
.skp-beam canvas{width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.skp-hero-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:26px;max-width:680px}
.skp-hero-mark{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffe0a3}
.skp-hero-mark svg{transition:transform .5s cubic-bezier(.19,1,.22,1)}.skp-hero-mark:hover svg{transform:scale(1.1) rotate(-8deg)}
.skp-hero h1{margin:0;font:600 clamp(48px,7.4vw,104px)/.96 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #f5a52433}
.skp-hero h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#ffe0a3 55%,#f5a524 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
.skp-hero-line{margin:0;max-width:560px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.skp-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.skp-go,.skp-gh{display:inline-flex;align-items:center;height:48px;border-radius:13px;font:600 15px/1 Inter,sans-serif;
  transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s}
.skp-go{gap:8px;padding:0 16px 0 20px;background:#fff;color:#090a0e!important}
.skp-go:hover,.skp-go:focus-visible{transform:translateY(-2px);box-shadow:0 12px 30px -10px #f5a524cc}
.skp-go svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.skp-go:hover svg{transform:translateY(3px)}
.skp-gh{color:#fff;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff24}
.skp-gh>span{display:inline-flex;align-items:center;gap:9px;height:100%;padding:0 14px}
.skp-gh>span+span{border-left:1px solid #ffffff1f;font:500 12.5px/1 'Geist Mono',ui-monospace,monospace;color:#ffe0a3;padding:0 14px 0 13px}
.skp-gh svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.skp-gh:hover,.skp-gh:focus-visible{transform:translateY(-2px);background:#ffffff14;box-shadow:inset 0 0 0 1px #f5a5248c,0 10px 28px -12px #f5a524}
.skp-gh:hover svg{transform:scale(1.1) rotate(-8deg)}
.skp-proof{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.skp-proof li{display:flex;align-items:center;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.skp-proof li:hover{color:#fff;box-shadow:inset 0 0 0 1px #f5a52480;transform:translateY(-2px)}
.skp-proof b{color:#fff;font-weight:500}
.skp-proof .skp-num{gap:6px}
.skp-proof .idx{gap:7px;color:#ffe0a3}
.skp-proof .idx i{width:6px;height:6px;border-radius:50%;background:#f5a524;box-shadow:0 0 8px #f5a524;animation:skp-pulse 1.6s ease-in-out infinite}
.skp-hero:not([data-live]) .skp-proof .idx i{animation-play-state:paused}
@keyframes skp-pulse{50%{opacity:.35}}
/* the demo frame: the composer halo (Footer/Signature .sf-tile) in amber, always alive */
@property --skp-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes skp-halo{to{--skp-halo:360deg}}
.skp-frame{position:relative;z-index:2;margin-top:var(--skp-gap,150px);border-radius:28px;border:1.5px solid transparent;padding:10px;
  background:linear-gradient(#0a0b0f,#0a0b0f) padding-box,conic-gradient(from var(--skp-halo),#f5a524,#ffe0a3,#f5a52433,#FF6A1A,#f5a524) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -30px #ffc25c,0 40px 120px -40px #f5a5248c;animation:skp-halo 9s linear infinite}
.skp-hero:not([data-live]) .skp-frame{animation-play-state:paused}
.skp-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;padding:4px 4px 12px}
.skp-tab{position:relative;display:flex;align-items:flex-start;gap:11px;padding:11px 12px 14px;border:0;border-radius:15px;background:none;text-align:left;cursor:pointer;color:#eeebe4b8;overflow:hidden;
  font:inherit;transition:background .4s cubic-bezier(.19,1,.22,1),color .4s,transform .35s cubic-bezier(.19,1,.22,1)}
.skp-tab:hover{color:#fff;background:#ffffff08;transform:translateY(-2px)}
.skp-tab[aria-selected=true]{color:#fff;background:#f5a52414;box-shadow:inset 0 0 0 1px #f5a52440}
.skp-ico{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .4s cubic-bezier(.19,1,.22,1)}
.skp-ico svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.skp-tab:hover .skp-ico svg{transform:scale(1.1) rotate(-6deg)}
.skp-tab[aria-selected=true] .skp-ico{color:#ffe0a3;background:#f5a52424;box-shadow:inset 0 0 0 1px #f5a52480,0 0 18px -4px #f5a524}
.skp-txt{display:flex;flex-direction:column;gap:5px;min-width:0}
.skp-txt b{font:500 14.5px/1.25 Inter,sans-serif;letter-spacing:-.01em}
.skp-txt small{font:400 12.5px/1.45 Inter,sans-serif;color:#eeebe48c}
.skp-prog{position:absolute;left:14px;right:14px;bottom:0;height:1.5px;background:#ffffff0f;opacity:0;transition:opacity .4s}
.skp-prog i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#f5a524,#FF6A1A,#FFC24B);box-shadow:0 0 8px #f5a524;transition:transform .1s linear}
.skp-tab[aria-selected=true] .skp-prog{opacity:1}
.skp-fig{position:relative;height:clamp(560px,56vw,800px);border-radius:20px;overflow:hidden;background:#2a1a02}
.skp-fig-foot{display:flex;justify-content:space-between;gap:12px;padding:12px 8px 2px;font:500 10.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.42)}
.skp-fig-foot b{color:#ffe0a3;font-weight:500}
@media (max-width:991px){
  .skp-tabs{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:10px}
  .skp-tabs::-webkit-scrollbar{display:none}
  .skp-tab{flex:0 0 auto;scroll-snap-align:start;align-items:center;padding:9px 12px 11px}
  .skp-txt small{display:none}
  .skp-fig{height:auto}
}
@media (max-width:767px){
  .skp-hero{padding:120px 0 80px}
  .skp-hero-copy{gap:20px}
  .skp-hero-line{font-size:16px}
  .skp-frame{border-radius:20px;padding:6px}
  .skp-fig{border-radius:15px}
  .skp-fig-foot{flex-direction:column;gap:4px}
  .skp-proof{flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin:0 -16px;padding:2px 16px;width:calc(100% + 32px)}
  .skp-proof::-webkit-scrollbar{display:none}
  .skp-proof li{flex:none;background:#0a0b0fe6}
  .skp-gh{background:#0a0b0fe6}
  /* the demo keeps a readable size on a phone: it is drawn at 600px wide and swipes sideways inside the frame */
  .skp-fig{overflow-x:auto;overscroll-behavior-x:contain;scrollbar-width:none;-webkit-overflow-scrolling:touch}
  .skp-fig::-webkit-scrollbar{display:none}
  .skp-fig>*{min-width:600px}
  .skp-swipe{display:inline-flex!important}
}
.skp-swipe{display:none;align-items:center;gap:6px;color:#ffe0a3}
@media (prefers-reduced-motion:reduce){.skp-frame,.skp-proof .idx i{animation:none}}
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

  // The nav takes the Skills Hub's amber glow while the hero is on screen.
  useEffect(() => {
    if (inView) document.documentElement.dataset.glow = 'skills';
    else if (document.documentElement.dataset.glow === 'skills') delete document.documentElement.dataset.glow;
  }, [inView]);
  useEffect(() => () => { if (document.documentElement.dataset.glow === 'skills') delete document.documentElement.dataset.glow; }, []);

  // Size the beam so it lands on the frame's top edge: its box runs from the top of the hero to a little past the frame.
  useEffect(() => {
    const h = hero.current, f = frame.current;
    if (!h || !f) return;
    const measure = () => {
      const top = f.getBoundingClientRect().top - h.getBoundingClientRect().top;
      const height = Math.round(top + 220);
      const w = h.getBoundingClientRect().width;
      setBeam(b => (Math.abs(b.h - height) < 2 && b.x === (w < 768 ? 0.3 : 0.24) ? b : { h: height, land: top / height, x: w < 768 ? 0.3 : 0.24 }));
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
    if (t >= SH_DUR + 600 && !held) { setTab(v => (v + 1) % SH_TABS.length); setT(0); }
  }, [t, held]);
  const pick = (i: number) => { setTab(i); setT(0); };
  const time = reduce ? SH_DUR : t;

  return (
    <section ref={hero} className="skp-hero" data-live={live || undefined} data-shot="hero" aria-labelledby="skp-title">
      <style>{CSS}</style>
      <div className="skp-beam" style={{ height: beam.h }} aria-hidden="true">
        <LaserBeam active={inView} intensity={k} color="#FFB547" maxDpr={1}
          horizontalBeamOffset={beam.x} verticalBeamOffset={0.5 - beam.land} horizontalSizing={0.62} verticalSizing={2.4}
          falloffStart={1.3} fogIntensity={0.42} wispIntensity={5} flowSpeed={0.3} />
      </div>
      <HeroField x={beam.x} />
      <div className="skp-wrap">
        <div className="skp-hero-copy">
          <span className="skp-hero-mark"><SkillsHubMark size={30} />Skills Hub · Open source</span>
          <h1 id="skp-title">Skills Hub.<span>The skills our agents run on.</span></h1>
          <div className="skp-ctas">
            <a href="#demo" className="skp-go">Try the demo
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
            </a>
            <a href={REPO} target="_blank" rel="noopener noreferrer" className="skp-gh" aria-label="Star Skills Hub on GitHub">
              <span><GitHubMark size={18} />GitHub</span>
              <span>★ Star</span>
            </a>
          </div>
        </div>

        <div ref={frame} id="demo" className="skp-frame" style={{ '--skp-gap': 'clamp(90px,11vw,170px)' } as CSSProperties}
          onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}>
          <div className="skp-tabs" role="tablist" aria-label="Skills Hub features">
            {SH_TABS.map((item, i) => <button key={item.key} type="button" role="tab" className="skp-tab" aria-selected={tab === i} aria-controls="skp-demo"
              onClick={() => pick(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : SH_TABS.length - 1)) % SH_TABS.length;
                  pick(n); (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                }
              }}>
              <span className="skp-ico"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{TAB_ICONS[i]}</svg></span>
              <span className="skp-txt"><b>{item.label}</b><small>{item.desc}</small></span>
              <span className="skp-prog" aria-hidden="true"><i style={{ transform: `scaleX(${tab === i ? Math.min(1, time / SH_DUR) : 0})` }} /></span>
            </button>)}
          </div>
          <div className="skp-fig" id="skp-demo" role="tabpanel" aria-label={SH_TABS[tab].label}>
            <SkillsHubDemo tab={tab} t={time} running={live} />
          </div>
          <div className="skp-fig-foot"><span className="skp-swipe">Swipe the hub sideways →</span><span>Live demo. <b>Click around.</b></span></div>
        </div>
      </div>
    </section>
  );
}
