// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/voice-page/Hero.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import USAGE from '../../../data/voice-usage.json';
import LaserBeam from '../ui/LaserBeam';
import { GitHubMark, SISO_GITHUB } from '../ui/GitHubButton';
import { LivingIcon } from '../living/living-assets';
import VoiceDemo, { VD_DUR, VD_TABS, useMic } from './VoiceDemo';
import { Num, useLive } from './base';

// The hero and the big demo (spec product-pages.md: "the hero shows the real product working, big and clickable"). BridgeMind's
// beam (siso/ui/LaserBeam, as on /agent-base/) falls in Voice pink and lands on the demo's frame. The four clickables sit above the
// window, as on /agent-base/; each plays its story and waits while the pointer or focus is on the demo. "Try it live" is the real
// mic (functions/api/transcribe.js, Groq). The GitHub half opens siso-os/siso-voice (public since 10 Oct).
const H = USAGE.history, R = USAGE.repo;
const HREF = R.public ? `${SISO_GITHUB}/${R.name}` : SISO_GITHUB;

const TAB_ICONS = [
  <><rect x="2.5" y="5" width="15" height="10" rx="2.5" /><path d="M6 12.5h8M5.5 8.5h1M9.5 8.5h1M13.5 8.5h1" /></>,
  <><rect x="3" y="11" width="14" height="5" rx="2.5" /><path d="M6.5 13.5h.01M9 12.5v2M11 12v3M13 12.8v1.4M7 5h6M8 8h4" /></>,
  <><rect x="2.5" y="3" width="9" height="7" rx="1.5" /><rect x="8.5" y="10" width="9" height="7" rx="1.5" /><path d="M5 6h4M11 13.5h4" /></>,
  <><rect x="2.5" y="4" width="15" height="12" rx="2.5" /><path d="m6 8 2.5 2L6 12M10.5 12H14" /></>,
];

const CSS = `
.vp-hero{position:relative;isolation:isolate;padding:150px 0 120px;background:#000}
.vp-beam{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none}
.vp-beam canvas{width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.vp-hero-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:26px;max-width:680px}
.vp-hero-mark{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffb3cb}
.vp-hero h1{margin:0;font:600 clamp(48px,7.4vw,104px)/.96 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #e0336a33}
.vp-hero h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#ffb3cb 50%,#e0336a 92%);-webkit-background-clip:text;background-clip:text;color:transparent}
.vp-hero-line{margin:0;max-width:560px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.vp-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.vp-go,.vp-gh{display:inline-flex;align-items:center;height:48px;border-radius:13px;font:600 15px/1 Inter,sans-serif;
  transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s}
.vp-go{gap:8px;padding:0 16px 0 20px;background:#fff;color:#090a0e!important}
.vp-go:hover,.vp-go:focus-visible{transform:translateY(-2px);box-shadow:0 12px 30px -10px #e0336acc}
.vp-go svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.vp-go:hover svg{transform:translateY(3px)}
.vp-gh{color:#fff;background:#ffffff0d;box-shadow:inset 0 0 0 1px #ffffff24}
.vp-gh>span{display:inline-flex;align-items:center;gap:9px;height:100%;padding:0 14px}
.vp-gh>span+span{border-left:1px solid #ffffff1f;font:500 12.5px/1 'Geist Mono',ui-monospace,monospace;color:#ffb3cb;padding:0 14px 0 13px}
.vp-gh svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.vp-gh:hover,.vp-gh:focus-visible{transform:translateY(-2px);background:#ffffff14;box-shadow:inset 0 0 0 1px #e0336a8c,0 10px 28px -12px #e0336a}
.vp-gh:hover svg{transform:scale(1.1) rotate(-8deg)}
.vp-proof{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.vp-proof li{display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s}
.vp-proof li:hover{color:#fff;box-shadow:inset 0 0 0 1px #e0336a80}
.vp-proof b{color:#fff;font-weight:500}
.vp-proof .vp-num{border-bottom:0}
/* the demo frame: the composer halo in Voice pink */
@property --vp-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes vp-halo{to{--vp-halo:360deg}}
.vp-frame{position:relative;z-index:2;margin-top:var(--vp-gap,150px);border-radius:28px;border:1.5px solid transparent;padding:10px;
  background:linear-gradient(#0a0b0f,#0a0b0f) padding-box,conic-gradient(from var(--vp-halo),#e0336a,#ffb3cb,#e0336a33,#b45cff,#e0336a) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -30px #ff8fb1,0 40px 120px -40px #e0336a8c;animation:vp-halo 9s linear infinite}
.vp-hero:not([data-live]) .vp-frame{animation-play-state:paused}
.vp-tabs{display:grid;grid-template-columns:repeat(4,minmax(0,1fr)) auto;gap:6px;padding:4px 4px 12px}
.vp-tab{position:relative;display:flex;align-items:flex-start;gap:11px;padding:11px 12px 14px;border:0;border-radius:15px;background:none;text-align:left;cursor:pointer;color:#eeebe4b8;overflow:hidden;
  transition:background .4s cubic-bezier(.19,1,.22,1),color .4s,transform .35s cubic-bezier(.19,1,.22,1)}
.vp-tab:hover{color:#fff;background:#ffffff08;transform:translateY(-2px)}
.vp-tab[aria-selected=true]{color:#fff;background:#e0336a14;box-shadow:inset 0 0 0 1px #e0336a40}
.vp-ico{flex:none;width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;transition:all .4s cubic-bezier(.19,1,.22,1)}
.vp-ico svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.vp-tab:hover .vp-ico svg{transform:scale(1.1) rotate(-6deg)}
.vp-tab[aria-selected=true] .vp-ico{color:#ffb3cb;background:#e0336a24;box-shadow:inset 0 0 0 1px #e0336a80,0 0 18px -4px #e0336a}
.vp-txt{display:flex;flex-direction:column;gap:5px;min-width:0}
.vp-txt b{font:500 14.5px/1.25 Inter,sans-serif;letter-spacing:-.01em}
.vp-txt small{font:400 12.5px/1.45 Inter,sans-serif;color:#eeebe48c}
.vp-prog{position:absolute;left:14px;right:14px;bottom:0;height:1.5px;background:#ffffff0f;opacity:0;transition:opacity .4s}
.vp-prog i{position:absolute;inset:0;transform-origin:0 50%;background:linear-gradient(90deg,#e0336a,#ff8fb1,#b45cff);box-shadow:0 0 8px #e0336a;transition:transform .1s linear}
.vp-tab[aria-selected=true] .vp-prog{opacity:1}
.vp-try{align-self:center;display:inline-flex;align-items:center;gap:9px;height:48px;margin-left:6px;padding:0 18px 0 8px;border:0;border-radius:99px;cursor:pointer;
  background:#e0336a;color:#fff;font:600 14px/1 Inter,sans-serif;box-shadow:0 0 0 1px #ff8fb1,0 10px 30px -10px #e0336a;transition:transform .35s cubic-bezier(.19,1,.22,1),background .3s}
.vp-try:hover{transform:translateY(-2px)}
.vp-try .dot{display:grid;place-items:center;width:32px;height:32px;border-radius:50%;background:#ffffff26}
.vp-try[data-state=rec]{background:#fff;color:#b81f52}.vp-try[data-state=rec] .dot{background:#e0336a;color:#fff;animation:vp-recpulse 1.2s ease-in-out infinite}
@keyframes vp-recpulse{50%{transform:scale(.86)}}
.vp-try[data-state=sending]{opacity:.7;cursor:progress}
.vp-fig{position:relative;height:clamp(540px,46vw,640px);border-radius:20px;overflow:hidden;background:#12060b}
.vp-fig-foot{display:flex;justify-content:space-between;gap:12px;padding:12px 8px 2px;font:500 10.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.42)}
.vp-fig-foot b{color:#ffb3cb;font-weight:500}
@media (max-width:1100px){.vp-tabs{grid-template-columns:repeat(4,minmax(0,1fr))}.vp-try{grid-column:1/-1;justify-self:center;margin:6px 0 0}}
@media (max-width:991px){
  .vp-tabs{display:flex;flex-wrap:wrap;padding-bottom:10px}
  .vp-tab{flex:1 1 calc(50% - 6px);align-items:center;padding:9px 12px 11px}
  .vp-txt small{display:none}
  .vp-try{flex:1 1 100%;justify-content:center}
  .vp-fig{height:560px}
}
@media (max-width:767px){
  .vp-hero{padding:120px 0 80px}
  .vp-hero-copy{gap:20px}
  .vp-hero-line{font-size:16px}
  .vp-frame{border-radius:20px;padding:6px}
  .vp-tab{gap:8px;padding:8px}.vp-ico{width:28px;height:28px}.vp-txt b{font-size:13px}
  .vp-fig{border-radius:15px;height:520px}
  .vp-fig-foot{flex-direction:column;gap:4px}
}
@media (prefers-reduced-motion:reduce){.vp-frame{animation:none}}
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
  const mic = useMic();
  const micBusy = mic.state !== 'idle' || mic.heard !== null;

  // The nav takes Voice pink while the hero is on screen.
  useEffect(() => {
    if (inView) document.documentElement.dataset.glow = 'voice';
    else if (document.documentElement.dataset.glow === 'voice') delete document.documentElement.dataset.glow;
  }, [inView]);
  useEffect(() => () => { if (document.documentElement.dataset.glow === 'voice') delete document.documentElement.dataset.glow; }, []);

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

  // Each clickable plays its story; it waits at the end while the pointer, focus or the real mic is on the demo.
  useEffect(() => {
    if (!live || micBusy) return;
    let last = performance.now();
    const id = window.setInterval(() => { const now = performance.now(); setT(v => v + Math.min(400, now - last)); last = now; }, 100);
    return () => window.clearInterval(id);
  }, [live, micBusy]);
  useEffect(() => {
    if (t >= VD_DUR + 900 && !held && !micBusy) { setTab(v => (v + 1) % VD_TABS.length); setT(0); }
  }, [t, held, micBusy]);
  const pick = (i: number) => { setTab(i); setT(0); mic.cancel(); mic.clear(); };
  const time = reduce ? VD_DUR : t;
  const tryLabel = mic.state === 'rec' ? `Stop · 0:${String(mic.secs).padStart(2, '0')}` : mic.state === 'sending' ? 'Transcribing…' : mic.heard ? 'Try again' : 'Try it live';

  return (
    <section ref={hero} className="vp-hero" data-live={live || undefined} data-shot="hero" aria-labelledby="vp-title">
      <style>{CSS}</style>
      <div className="vp-beam" style={{ height: beam.h }} aria-hidden="true">
        <LaserBeam active={inView} intensity={k} color="#FF5D8F" maxDpr={1}
          horizontalBeamOffset={beam.x} verticalBeamOffset={0.5 - beam.land} horizontalSizing={0.62} verticalSizing={2.4}
          falloffStart={1.3} fogIntensity={0.42} wispIntensity={5} flowSpeed={0.3} />
      </div>
      <div className="vp-wrap">
        <div className="vp-hero-copy">
          <span className="vp-hero-mark"><LivingIcon name="siso-voice" size={30} paused={!live} />SISO Voice</span>
          <h1 id="vp-title">SISO Voice.<span>Talk to your agents.</span></h1>
          <p className="vp-hero-line">Hold fn and talk. Words type into your app.</p>
          <div className="vp-ctas">
            <a href="#demo" className="vp-go">Try the demo
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
            </a>
            <a href={HREF} target="_blank" rel="noopener noreferrer" className="vp-gh" aria-label={`SISO Voice on GitHub: ${R.public ? `${R.stars} stars` : 'opening soon'}`}>
              <span><GitHubMark size={18} />GitHub</span>
              <span>{R.public && R.stars != null ? <>★ {Number(R.stars).toLocaleString('en-US')}</> : '★ Soon'}</span>
            </a>
          </div>
          <ul className="vp-proof" aria-label="Receipts">
            <li className="hero-os"><a href={HREF} target="_blank" rel="noopener noreferrer"><GitHubMark size={13} />{R.public ? 'Open source' : 'Opening soon'}<span aria-hidden="true">↗</span></a></li>
            <li><Num source={H.source}><b>{H.dictations.toLocaleString('en-US')}</b> dictations</Num></li>
            <li><Num source={H.source}><b>{H.into_agents_pct}%</b> to agents</Num></li>
          </ul>
        </div>

        <div ref={frame} id="demo" className="vp-frame" style={{ '--vp-gap': 'clamp(90px,11vw,170px)' } as CSSProperties}
          onPointerEnter={() => setHeld(true)} onPointerLeave={() => setHeld(false)}
          onFocusCapture={() => setHeld(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); }}>
          <div className="vp-tabs" role="tablist" aria-label="SISO Voice features">
            {VD_TABS.map((item, i) => <button key={item.key} type="button" role="tab" className="vp-tab" aria-selected={tab === i} aria-controls="vp-demo"
              onClick={() => pick(i)}
              onKeyDown={e => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault(); const n = (i + (e.key === 'ArrowRight' ? 1 : VD_TABS.length - 1)) % VD_TABS.length;
                  pick(n); (e.currentTarget.parentElement?.children[n] as HTMLElement | undefined)?.focus();
                }
              }}>
              <span className="vp-ico"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{TAB_ICONS[i]}</svg></span>
              <span className="vp-txt"><b>{item.label}</b><small>{item.desc}</small></span>
              <span className="vp-prog" aria-hidden="true"><i style={{ transform: `scaleX(${tab === i && !micBusy ? Math.min(1, time / VD_DUR) : 0})` }} /></span>
            </button>)}
            <button type="button" className="vp-try" data-state={mic.state} onClick={() => mic.toggle()} aria-label={mic.state === 'rec' ? 'Stop recording and transcribe' : 'Try SISO Voice live with your microphone'}>
              <span className="dot"><svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7.5" y="2.5" width="5" height="9" rx="2.5" /><path d="M4.5 9.5a5.5 5.5 0 0 0 11 0M10 15v2.5" /></svg></span>
              {tryLabel}
            </button>
          </div>
          <div className="vp-fig" id="vp-demo" role="tabpanel" aria-label={VD_TABS[tab].label}>
            <VoiceDemo tab={tab} t={time} mic={mic} />
          </div>
          <div className="vp-fig-foot"><span><b>Press Try it live</b> and talk.</span><span>Stories are illustrative · the mic is real, up to 15 s</span></div>
        </div>
      </div>
    </section>
  );
}
