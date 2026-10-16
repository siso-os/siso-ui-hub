// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/agent-base-page/Hero.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import STATS from '../../../data/siso-stats.json';
import ACTIVITY from '../../../data/agent-base-activity.json';
import RESEARCH from '../../../data/agent-base-research.json';
import LaserBeam from '../ui/LaserBeam';
import { GitHubMark, SISO_GITHUB } from '../ui/GitHubButton';
import { WorkspaceMark } from '../living/living-assets';
import AgentBaseDemo, { AB_DUR, AB_PAGE_TABS } from '../home-products/agent-base/AgentBaseDemo';
import { useLive } from './base';

// The hero and the big demo (spec §1-2). BridgeMind's beam (siso/ui/LaserBeam, as Footer/Beam.tsx uses it) falls from the top
// of the page, beside the headline, and lands on the demo's frame: its flare spreads along the frame's top edge. It sits in
// normal flow inside the hero (UI standard trap 1) and stops drawing off screen. The demo is the home card's AgentBaseDemo
// (the one Shaan likes), larger, with its clickables in a row above the window and a fifth one for the old demo's modules.
const REPO = STATS.repos.agentBase;
const HREF = REPO.public ? `${SISO_GITHUB}/${REPO.repo}` : SISO_GITHUB;

const TAB_ICONS = [
  <><circle cx="6" cy="5" r="2" /><path d="M6 7v9a2 2 0 0 0 2 2h3M6 11h5" /><circle cx="14" cy="11" r="2" /><circle cx="14" cy="18" r="2" /></>,
  <><rect x="2.5" y="4" width="15" height="12" rx="2.5" /><path d="m6 8 2.5 2L6 12M10.5 12H14" /></>,
  <><circle cx="10" cy="10" r="7" /><path d="M3 10h14M10 3a11 11 0 0 1 0 14M10 3a11 11 0 0 0 0 14" /></>,
  <><rect x="7.5" y="2.5" width="5" height="9" rx="2.5" /><path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" /></>,
  <><rect x="2.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="2.5" y="11.5" width="6" height="6" rx="1.5" /><path d="M14.5 11.5v6M11.5 14.5h6" /></>,
];

const CSS = `
.abp-hero{position:relative;isolation:isolate;padding:150px 0 120px;background:#000}
.abp-beam{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none}
.abp-beam canvas{width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.abp-hero-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:26px;max-width:660px}
.abp-hero-mark{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffc0b8}
.abp-hero h1{margin:0;font:600 clamp(48px,7.4vw,104px)/.96 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #ed615a33}
.abp-hero h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#ffc0b8 55%,#ed615a 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
.abp-hero-line{margin:0;max-width:540px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.abp-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.abp-go,.abp-gh{display:inline-flex;align-items:center;height:48px;border-radius:13px;font:600 15px/1 Inter,sans-serif;
  transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s}
.abp-go{gap:8px;padding:0 16px 0 20px;background:#fff;color:#090a0e!important}
.abp-go:hover,.abp-go:focus-visible{transform:translateY(-2px);box-shadow:0 12px 30px -10px #ed615acc}
.abp-go svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.abp-go:hover svg{transform:translateY(3px)}
.abp-gh{color:#fff;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff24}
.abp-gh>span{display:inline-flex;align-items:center;gap:9px;height:100%;padding:0 14px}
.abp-gh>span+span{border-left:1px solid #ffffff1f;font:500 12.5px/1 'Geist Mono',ui-monospace,monospace;color:#ffc0b8;padding:0 14px 0 13px}
.abp-gh svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.abp-gh:hover,.abp-gh:focus-visible{transform:translateY(-2px);background:#ffffff14;box-shadow:inset 0 0 0 1px #ed615a8c,0 10px 28px -12px #ed615a}
.abp-gh:hover svg{transform:scale(1.1) rotate(-8deg)}
.abp-proof{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.abp-proof li{display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.abp-proof li:hover{color:#fff;box-shadow:inset 0 0 0 1px #ed615a80;transform:translateY(-2px)}
.abp-proof b{color:#fff;font-weight:500}
/* the demo frame: the composer halo (Footer/Signature .sf-tile) in Agent Base coral, always alive */
@property --abp-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes abp-halo{to{--abp-halo:360deg}}
.abp-frame{position:relative;z-index:2;margin-top:var(--abp-gap,150px);border-radius:28px;border:1.5px solid transparent;padding:10px;
  background:linear-gradient(#0a0b0f,#0a0b0f) padding-box,conic-gradient(from var(--abp-halo),#ed615a,#ffc0b8,#ed615a33,#FF6A1A,#ed615a) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -30px #ffa05c,0 40px 120px -40px #ed615a8c;animation:abp-halo 9s linear infinite}
.abp-hero:not([data-live]) .abp-frame{animation-play-state:paused}
.abp-tabs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;padding:4px 4px 12px}
.abp-tab{position:relative;display:flex;align-items:flex-start;gap:11px;padding:11px 12px 14px;border:0;border-radius:15px;background:none;text-align:left;cursor:pointer;color:#eeebe4b8;overflow:hidden;
  font:inherit;transition:background .4s cubic-bezier(.19,1,.22,1),color .4s,transform .35s cubic-bezier(.19,1,.22,1)}
.abp-tab:hover{color:#fff;background:#ffffff08;transform:translateY(-2px)}
.abp-tab[aria-selected=true]{color:#fff;background:#ed615a14;box-shadow:inset 0 0 0 1px #ed615a40}
.abp-ico{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .4s cubic-bezier(.19,1,.22,1)}
.abp-ico svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.abp-tab:hover .abp-ico svg{transform:scale(1.1) rotate(-6deg)}
.abp-tab[aria-selected=true] .abp-ico{color:#ffc0b8;background:#ed615a24;box-shadow:inset 0 0 0 1px #ed615a80,0 0 18px -4px #ed615a}
.abp-txt{display:flex;flex-direction:column;gap:5px;min-width:0}
.abp-txt b{font:500 14.5px/1.25 Inter,sans-serif;letter-spacing:-.01em}
.abp-txt small{font:400 12.5px/1.45 Inter,sans-serif;color:#eeebe48c}
.abp-prog{position:absolute;left:14px;right:14px;bottom:0;height:1.5px;background:#ffffff0f;opacity:0;transition:opacity .4s}
.abp-prog i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#ed615a,#FF6A1A,#FFC24B);box-shadow:0 0 8px #ed615a;transition:transform .1s linear}
.abp-tab[aria-selected=true] .abp-prog{opacity:1}
.abp-fig{position:relative;height:clamp(560px,52vw,760px);border-radius:20px;overflow:hidden;background:#2a0907}
.abp-fig-foot{display:flex;justify-content:space-between;gap:12px;padding:12px 8px 2px;font:500 10.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.42)}
.abp-fig-foot b{color:#ffc0b8;font-weight:500}
@media (max-width:991px){
  .abp-tabs{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding-bottom:10px}
  .abp-tabs::-webkit-scrollbar{display:none}
  .abp-tab{flex:0 0 auto;scroll-snap-align:start;align-items:center;padding:9px 12px 11px}
  .abp-txt small{display:none}
  .abp-fig{height:auto}
}
@media (max-width:767px){
  .abp-hero{padding:120px 0 80px}
  .abp-hero-copy{gap:20px}
  .abp-hero-line{font-size:16px}
  .abp-frame{border-radius:20px;padding:6px}
  .abp-fig{border-radius:15px}
  .abp-fig-foot{flex-direction:column;gap:4px}
}
@media (prefers-reduced-motion:reduce){.abp-frame{animation:none}}
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

  // The nav takes Agent Base's coral glow while the hero is on screen.
  useEffect(() => {
    if (inView) document.documentElement.dataset.glow = 'os';
    else if (document.documentElement.dataset.glow === 'os') delete document.documentElement.dataset.glow;
  }, [inView]);
  useEffect(() => () => { if (document.documentElement.dataset.glow === 'os') delete document.documentElement.dataset.glow; }, []);

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
    if (t >= AB_DUR + 600 && !held) { setTab(v => (v + 1) % AB_PAGE_TABS.length); setT(0); }
  }, [t, held]);
  const pick = (i: number) => { setTab(i); setT(0); };
  const time = reduce ? AB_DUR : t;
  const voiceTab = AB_PAGE_TABS.findIndex(x => x.key === 'voice');
  const firstDay = ACTIVITY.days[0].date.slice(8).replace(/^0/, '');
  const lastDay = ACTIVITY.days.at(-1)!.date.slice(8).replace(/^0/, '');

  return (
    <section ref={hero} className="abp-hero" data-live={live || undefined} data-shot="hero" aria-labelledby="abp-title">
      <style>{CSS}</style>
      <div className="abp-beam" style={{ height: beam.h }} aria-hidden="true">
        <LaserBeam active={inView} intensity={k} color="#FF8A6A" maxDpr={1}
          horizontalBeamOffset={beam.x} verticalBeamOffset={0.5 - beam.land} horizontalSizing={0.62} verticalSizing={2.4}
          falloffStart={1.3} fogIntensity={0.42} wispIntensity={5} flowSpeed={0.3} />
      </div>
      <div className="abp-wrap">
        <div className="abp-hero-copy">
          <span className="abp-hero-mark"><WorkspaceMark brand="agent-base" size={30} paused={!live} />Agent Base · SISO OS</span>
          <h1 id="abp-title">Agent Base.<span>The OS our agents run on.</span></h1>
          <p className="abp-hero-line">Any terminal agent. Browser and voice. Built from open source.</p>
          <div className="abp-ctas">
            <a href="#demo" className="abp-go">Explore the demo
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
            </a>
            <a href={HREF} target="_blank" rel="noopener noreferrer" className="abp-gh" aria-label={`Agent Base on GitHub: ${REPO.public ? `${REPO.stars} stars` : 'opening soon'}`}>
              <span><GitHubMark size={18} />GitHub</span>
              <span>{REPO.public && REPO.stars != null ? <>★ {Number(REPO.stars).toLocaleString('en-US')}</> : '★ Soon'}</span>
            </a>
          </div>
          <ul className="abp-proof" aria-label="Receipts">
            <li className="hero-os"><a href={HREF} target="_blank" rel="noopener noreferrer"><GitHubMark size={13} />{REPO.public ? 'Open source' : 'Opening soon'}<span aria-hidden="true">↗</span></a></li>
            <li><b>{ACTIVITY.total.toLocaleString('en-US')}</b> commits</li>
            <li><b>{RESEARCH.counts.repos_checked}</b> repos</li>
            <li>{REPO.stack}</li>
          </ul>
        </div>

        <div ref={frame} id="demo" className="abp-frame" style={{ '--abp-gap': 'clamp(90px,11vw,170px)' } as CSSProperties}
          onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}>
          <div className="abp-tabs" role="tablist" aria-label="Agent Base features">
            {AB_PAGE_TABS.map((item, i) => <button key={item.key} type="button" role="tab" className="abp-tab" aria-selected={tab === i} aria-controls="abp-demo"
              onClick={() => pick(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : AB_PAGE_TABS.length - 1)) % AB_PAGE_TABS.length;
                  pick(n); (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                }
              }}>
              <span className="abp-ico"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{TAB_ICONS[i]}</svg></span>
              <span className="abp-txt"><b>{item.label}</b><small>{item.desc}</small></span>
              <span className="abp-prog" aria-hidden="true"><i style={{ transform: `scaleX(${tab === i ? Math.min(1, time / AB_DUR) : 0})` }} /></span>
            </button>)}
          </div>
          <div className="abp-fig" id="abp-demo" role="tabpanel" aria-label={AB_PAGE_TABS[tab].label}>
            <AgentBaseDemo tabs={AB_PAGE_TABS} tab={tab} t={time} running={live} onVoice={() => { if (tab !== voiceTab) pick(voiceTab); }} />
          </div>
          <div className="abp-fig-foot"><span><b>Live window.</b> Click around it.</span><span>Agents and chats are illustrative · the mic is real</span></div>
        </div>
      </div>
    </section>
  );
}
