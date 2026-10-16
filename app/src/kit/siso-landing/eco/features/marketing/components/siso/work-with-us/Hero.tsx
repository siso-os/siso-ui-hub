// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/work-with-us/Hero.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import LaserBeam from '../ui/LaserBeam';
import { WorkspaceMark } from '../living/living-assets';
import { useLive, Arrow } from './base';
import { PATHS, SITES, INDUSTRY_STAT, PUBLIC_REPOS } from './pathData';

// The hero (docs/specs/work-with-us.md §1): who we work with, then the chooser of five paths. The beam (siso/ui/LaserBeam,
// as the Agent Base hero uses it) falls beside the headline and lands on the chooser's top edge; it sits in normal flow
// (UI standard trap 1) and stops drawing off screen. Each chooser tile carries its path's colour and scrolls to that panel —
// it is a link, not a tab, so the page still works with JavaScript off and every path keeps its own URL.
const ICONS: Record<string, React.ReactNode> = {
  builders: <><path d="M7.5 13.5 4 10l3.5-3.5M12.5 6.5 16 10l-3.5 3.5" /><path d="M11 4.5 9 15.5" /></>,
  partners: <><circle cx="7" cy="6.5" r="2.5" /><circle cx="14" cy="13.5" r="2.5" /><path d="M9.2 8.2A6 6 0 0 0 7 13M11.8 11.8A6 6 0 0 1 14 7" /></>,
  owners: <><path d="M3 17V8.5L10 3l7 5.5V17" /><path d="M8 17v-5h4v5" /></>,
  enterprise: <><rect x="2.5" y="3" width="15" height="4.5" rx="1.5" /><rect x="2.5" y="12.5" width="15" height="4.5" rx="1.5" /><path d="M10 7.5v5" /></>,
  claim: <><rect x="2.5" y="4" width="15" height="12" rx="2" /><path d="M2.5 8h15" /><path d="m8 12.5 1.8 1.8L13 11" /></>,
};

const CSS = `
.wwh{position:relative;isolation:isolate;padding:148px 0 110px;background:#00030a}
.wwh-beam{position:absolute;left:0;right:0;top:0;z-index:0;pointer-events:none}
.wwh-beam canvas{width:100%;height:100%;display:block;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.wwh-copy{position:relative;z-index:2;display:flex;flex-direction:column;align-items:flex-start;gap:24px;max-width:720px}
.wwh-mark{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#FFC24B}
.wwh h1{margin:0;font:600 clamp(42px,6.2vw,88px)/.98 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-shadow:0 0 60px #FF6A1A2e;text-wrap:nowrap}
.wwh h1 span{display:block;background:linear-gradient(100deg,#fff 10%,#FFC24B 55%,#FF6A1A 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
@media (max-width:560px){.wwh h1{text-wrap:balance}}
.wwh-line{margin:0;max-width:580px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66)}
.wwh-proof{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.wwh-proof li{display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.wwh-proof li:hover{color:#fff;box-shadow:inset 0 0 0 1px #FF6A1A80;transform:translateY(-2px)}
.wwh-proof b{color:#fff;font-weight:500}
/* the chooser: the composer halo (Footer/Signature .sf-tile) around five tiles */
@property --wwh-halo{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes wwh-halo{to{--wwh-halo:360deg}}
.wwh-chooser{position:relative;z-index:2;margin-top:clamp(70px,9vw,120px);border-radius:26px;border:1.5px solid transparent;padding:10px;
  background:linear-gradient(#0a0b0f,#0a0b0f) padding-box,conic-gradient(from var(--wwh-halo),#FF6A1A,#FFC24B,#fff3d633,#FF2D55,#FF6A1A) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -34px #FFB547,0 40px 120px -44px #FF6A1A99;animation:wwh-halo 9s linear infinite}
.wwh:not([data-live]) .wwh-chooser{animation-play-state:paused}
.wwh-chooser-head{display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:12px 14px 14px}
.wwh-chooser-head span{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffffff73}
.wwh-chooser-head b{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#FFC24B}
.wwh-tiles{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
/* align-items is set explicitly: a global align-items:center otherwise centres these columns (UI standard trap 4) */
.wwh-tile{--c:#FF6A1A;position:relative;display:flex;flex-direction:column;align-items:flex-start;gap:12px;min-width:0;padding:16px 15px 15px;border-radius:17px;overflow:hidden;
  background:#ffffff05;box-shadow:inset 0 0 0 1px #ffffff12;color:#fff;text-align:left;
  transition:background .4s cubic-bezier(.19,1,.22,1),box-shadow .4s,transform .4s cubic-bezier(.19,1,.22,1)}
.wwh-tile:hover,.wwh-tile:focus-visible{transform:translateY(-3px);background:color-mix(in srgb,var(--c) 9%,#0a0b0f);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 58%,transparent),0 18px 40px -22px var(--c)}
.wwh-tile-i{display:grid;place-items:center;flex:none;width:36px;height:36px;border-radius:11px;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff14;
  transition:background .4s,box-shadow .4s,color .4s}
.wwh-tile-i svg{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.wwh-tile:hover .wwh-tile-i{color:color-mix(in srgb,var(--c) 70%,white);background:color-mix(in srgb,var(--c) 20%,transparent);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 60%,transparent),0 0 18px -5px var(--c)}
.wwh-tile:hover .wwh-tile-i svg{transform:scale(1.1) rotate(-7deg)}
.wwh-tile-t{display:flex;flex-direction:column;gap:6px;min-width:0}
.wwh-tile-t b{font:500 14.5px/1.2 Inter,sans-serif;letter-spacing:-.01em}
.wwh-tile-t small{font:400 12.5px/1.45 Inter,sans-serif;color:#ffffff8c;text-wrap:pretty}
.wwh-tile-go{display:flex;align-items:center;gap:6px;margin-top:auto;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;
  color:#ffffff5c;transition:color .3s}
.wwh-tile-go svg{transform:rotate(90deg);transition:transform .35s cubic-bezier(.19,1,.22,1)}
.wwh-tile:hover .wwh-tile-go{color:color-mix(in srgb,var(--c) 70%,white)}
.wwh-tile:hover .wwh-tile-go svg{transform:rotate(90deg) translateX(3px)}
@media (max-width:1100px){.wwh-tiles{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:767px){
  .wwh{padding:112px 0 72px}
  .wwh-copy{gap:18px}
  .wwh-line{font-size:16px}
  .wwh-chooser{border-radius:20px;padding:6px}
  .wwh-tiles{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}
  .wwh-tile{padding:13px 12px 12px;gap:10px}
  .wwh-tile-t small{font-size:12px}
  .wwh-chooser-head{padding:10px 10px 12px;flex-direction:column;gap:6px;align-items:flex-start}
}
/* at the narrowest widths the fifth tile sits on its own row rather than squeezing five into one column */
@media (max-width:359px){.wwh-tiles{grid-template-columns:1fr}}
@media (prefers-reduced-motion:reduce){.wwh-chooser{animation:none}}
`;

export default function Hero() {
  const hero = useRef<HTMLElement>(null);
  const chooser = useRef<HTMLDivElement>(null);
  const { inView, live } = useLive(hero, 0.05);
  const [beam, setBeam] = useState({ h: 820, land: 0.8, x: 0.24 });
  const [k, setK] = useState(0);

  // No data-glow here on purpose: the nav's own rim is already the whole-of-SISO ember and gold (NAV_GLOW_CSS in
  // siso/home-products/homeProductStyles.ts only defines the six product keys), and this page is about all five ways in
  // rather than one product.

  // Size the beam so it lands on the chooser's top edge.
  useEffect(() => {
    const h = hero.current, c = chooser.current;
    if (!h || !c) return;
    const measure = () => {
      const top = c.getBoundingClientRect().top - h.getBoundingClientRect().top;
      const height = Math.round(top + 200);
      const w = h.getBoundingClientRect().width;
      const x = w < 768 ? 0.3 : 0.26;
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

  return (
    <section ref={hero} className="wwh" data-live={live || undefined} data-shot="hero" aria-labelledby="wwh-title">
      <style>{CSS}</style>
      <div className="wwh-beam" style={{ height: beam.h }} aria-hidden="true">
        <LaserBeam active={inView} intensity={k} color="#FFA14B" maxDpr={1}
          horizontalBeamOffset={beam.x} verticalBeamOffset={0.5 - beam.land} horizontalSizing={0.62} verticalSizing={2.4}
          falloffStart={1.3} fogIntensity={0.42} wispIntensity={5} flowSpeed={0.3} />
      </div>
      <div className="ww-wrap">
        <div className="wwh-copy">
          <span className="wwh-mark"><WorkspaceMark brand="siso-agency" size={30} paused={!live} />Work with us</span>
          <h1 id="wwh-title">Five ways in.<span>Pick the one you are.</span></h1>
          <p className="wwh-line">
            We work with open-source builders, affiliates and partners, business owners who want software that fits their
            industry, enterprise teams with a stack of their own, and businesses who find we have already built them a site.
          </p>
          <ul className="wwh-proof" aria-label="Receipts">
            <li><b>{SITES.n}</b> sites built</li>
            <li><b>{INDUSTRY_STAT.n}</b> industries ranked</li>
            <li><b>{PUBLIC_REPOS}</b> public repos</li>
          </ul>
        </div>

        <div ref={chooser} className="wwh-chooser" id="ways">
          <div className="wwh-chooser-head">
            <span>Who are you?</span>
            <b>Five paths · pick one</b>
          </div>
          <div className="wwh-tiles">
            {PATHS.map(p => (
              <a key={p.key} className="wwh-tile" href={`#ww-${p.key}`} style={{ '--c': p.color } as CSSProperties}>
                <span className="wwh-tile-i">
                  <svg width="19" height="19" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[p.key]}</svg>
                </span>
                <span className="wwh-tile-t"><b>{p.tab}</b><small>{p.who}</small></span>
                <span className="wwh-tile-go">Read it<Arrow size={13} /></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
