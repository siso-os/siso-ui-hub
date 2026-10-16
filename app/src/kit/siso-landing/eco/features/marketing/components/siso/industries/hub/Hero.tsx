// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/industries/hub/Hero.tsx)
'use client';

import { useRef } from 'react';
import DATA from '../../../../data/industries-hub.json';
import { SourceMark } from '../../ui/SourceMark';
import SitesGlobe, { SITE_COUNT, SITE_FUNNEL } from './SitesGlobe';
import { useLive } from './base';

// The hub's hero: what this page is, the globe of the sites our agents actually built (spec §3) beside it, and the
// numbers up top — every one read from a data file with a `source`.
//
// The globe sits in normal flow inside the hero, never pinned to the screen (UI standard trap 1), and pauses the moment
// it leaves the viewport.

const n = (v: number) => v.toLocaleString('en-US');
const noSiteAll = (DATA.cities as { noSite: number }[]).reduce((t, c) => t + c.noSite, 0);

const NUMS: [string, string, string][] = [
  [n(DATA.industries), 'industries', 'ranked-all.csv'],
  [n(noSiteAll), 'no sites', 'measured'],
  [n(SITE_COUNT), 'sites live', 'siso-sites registry'],
  [String(DATA.cities.length), 'cities', 'measured'],
];

const CSS = `
.ih-hero{position:relative;isolation:isolate;padding:132px 0 96px;background:
  radial-gradient(70% 90% at 78% 26%,#07291d 0,#031510 44%,#00030a 76%),#00030a}
.ih-hero::after{content:'';position:absolute;inset:0;z-index:-1;pointer-events:none;
  background:radial-gradient(42% 50% at 80% 30%,#00a8791f,transparent 72%)}
.ih-hero-grid{display:grid;grid-template-columns:1.08fr .92fr;gap:56px;align-items:center}
.ih-hero-copy{display:flex;flex-direction:column;align-items:flex-start;gap:24px;max-width:600px}
.ih-mark{display:inline-flex;align-items:center;gap:11px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;
  letter-spacing:.16em;text-transform:uppercase;color:var(--ih-mint)}
.ih-mark i{width:8px;height:8px;border-radius:50%;background:var(--ih-green);box-shadow:0 0 10px -1px var(--ih-green);
  animation:ih-pulse 4s ease-in-out infinite}
@keyframes ih-pulse{0%,100%{opacity:.55}50%{opacity:1}}
.ih-hero:not([data-live]) .ih-mark i{animation-play-state:paused}
.ih-hero h1{margin:0;font:600 clamp(42px,6.4vw,86px)/.98 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-wrap:balance}
.ih-hero h1 span{display:block;background:linear-gradient(100deg,#fff 12%,#9ff0cf 58%,#00a879 96%);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.ih-hero-line{margin:0;max-width:520px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.66);text-wrap:pretty}
.ih-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:11px}
.ih-go{display:inline-flex;align-items:center;gap:11px;height:48px;padding:0 22px;border-radius:13px;
  background:linear-gradient(135deg,#00c48d,#00895f);color:#00120c;font:600 15px/1 Inter,sans-serif;
  box-shadow:0 10px 30px -14px #00a879;transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s}
.ih-go:hover{transform:translateY(-3px);box-shadow:0 16px 38px -14px #00a879}
.ih-ghost{display:inline-flex;align-items:center;gap:10px;height:48px;padding:0 20px;border-radius:13px;
  border:1px solid var(--ih-line2);color:#fff;font:500 14.5px/1 Inter,sans-serif;background:#ffffff05;
  transition:border-color .3s,background .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.ih-ghost:hover{border-color:#9ff0cf5c;background:#ffffff0d;transform:translateY(-3px)}
.ih-kbd{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:#ffffff73;
  border:1px solid var(--ih-line2);border-radius:5px;padding:4px 6px}
.ih-globe-side{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px}
.ih-globe-cap{margin:0;max-width:34ch;text-align:center;text-wrap:balance;
  font:500 10.5px/1.7 'Geist Mono',ui-monospace,monospace;letter-spacing:.09em;text-transform:uppercase;color:#ffffff4d}
.ih-nums{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:72px;padding-top:28px;border-top:1px solid var(--ih-line)}
.ih-num b{display:block;font:600 clamp(26px,3vw,40px)/1 'Inter Display',Inter,sans-serif;letter-spacing:-.04em;
  color:#fff;font-variant-numeric:tabular-nums}
.ih-num span{display:block;margin-top:9px;font:400 13px/1.45 Inter,sans-serif;color:rgba(255,255,255,.6)}
.ih-num u{display:block;margin-top:7px;font:500 9.5px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;
  color:#ffffff38;text-decoration:none}
@media (max-width:980px){.ih-hero-grid{grid-template-columns:1fr;gap:44px}.ih-globe-side{max-width:420px;margin:0 auto;width:100%}
  .ih-nums{grid-template-columns:repeat(2,1fr);gap:26px;margin-top:52px}}
@media (max-width:767px){.ih-hero{padding:96px 0 72px}.ih-hero-line{font-size:16px}}
@media (prefers-reduced-motion:reduce){.ih-go:hover,.ih-ghost:hover{transform:none}.ih-mark i{animation:none}}
`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { live, reduce } = useLive(ref, 0.05);
  return (
    <section ref={ref} className="ih-hero" data-live={live || undefined} aria-labelledby="ih-hero-title">
      <style>{CSS}</style>
      <div className="ih-wrap">
        <div className="ih-hero-grid">
          <div className="ih-hero-copy">
            <span className="ih-mark"><i />Industries · the whole map</span>
            <h1 id="ih-hero-title">Search every industry.<span>Find the ones with no website.</span></h1>
            <p className="ih-hero-line">
              Ranked by site value. Search. Filter. Explore.
            </p>
            <div className="ih-ctas">
              <a className="ih-go" href="#search">Search the index<span aria-hidden="true">↓</span></a>
              <a className="ih-ghost" href="#graphs">See the graphs <span className="ih-kbd">/</span></a>
            </div>
          </div>
          <div className="ih-globe-side">
            <SitesGlobe live={live} reduce={reduce} />
            <p className="ih-globe-cap">
              {n(SITE_COUNT)} sites our agents built · drag to turn · click a light to open it
            </p>
          </div>
        </div>
        <div className="ih-nums">
          {NUMS.map(([v, label, src]) => (
            <div className="ih-num" key={label}><b>{v}</b><span>{label}</span><u>{src}</u></div>
          ))}
        </div>
        <p className="ih-src">
          <SourceMark>{DATA.source}. Sites: {n(SITE_FUNNEL.places)} places, {n(SITE_FUNNEL.noSite)} no site, {n(SITE_FUNNEL.live)} live.</SourceMark>
        </p>
      </div>
    </section>
  );
}
