// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/industry-page/Hero.tsx)
'use client';

import { useRef } from 'react';
import DATA from '../../../data/industry-pages.json';
import Totem, { type Family } from './Totem';
import { fmt, useLive, type Group } from './base';

// The hero (spec §1): the industry, its rank out of the 3,665 ranked, the real counts from the research, and the coded hero
// object for the family beside it. The photograph made for this industry sits behind, blurred and low contrast, with the
// content on top (UI standard: ambient layers sit back). Numbers are read from industry-pages.json, which is generated from
// the ranked file — none is written here.

const CSS = `
.ip-hero{position:relative;isolation:isolate;overflow:hidden;padding:150px 0 110px;background:#00030a}
.ip-hero-art{position:absolute;inset:0;z-index:-2}
.ip-hero-art img{width:100%;height:100%;object-fit:cover;object-position:72% center;filter:blur(2px) saturate(.9)}
.ip-hero-art::after{content:"";position:absolute;inset:0;
  background:linear-gradient(90deg,#00030a 2%,rgba(0,3,10,.95) 34%,rgba(0,3,10,.55) 68%,rgba(0,3,10,.3)),
    linear-gradient(0deg,#00030a,rgba(0,3,10,.2) 48%,transparent)}
.ip-hero-grid{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.78fr);gap:48px;align-items:center}
.ip-hero-copy{display:flex;flex-direction:column;align-items:flex-start;gap:24px;max-width:640px}
.ip-back{display:inline-flex;align-items:center;gap:8px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(255,255,255,.5);transition:color .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.ip-back:hover{color:var(--ip-gold);transform:translateX(-3px)}
.ip-rank{display:flex;align-items:center;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--ip-gold)}
.ip-rank b{display:inline-flex;align-items:center;height:26px;padding:0 10px;border-radius:7px;font-weight:600;color:#1a0b02;
  background:linear-gradient(135deg,var(--ip-gold),var(--ip-ember));box-shadow:0 6px 18px -8px var(--ip-ember)}
.ip-hero h1{margin:0;font:600 clamp(42px,6.4vw,86px)/.98 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-wrap:balance;
  text-shadow:0 0 70px #FF6A1A2e}
.ip-hero h1 span{display:block;background:linear-gradient(100deg,#fff 12%,#FFC24B 58%,#FF6A1A 96%);-webkit-background-clip:text;background-clip:text;color:transparent}
.ip-hero-line{margin:0;max-width:560px;font:400 18px/1.65 Inter,sans-serif;color:rgba(255,255,255,.68)}
.ip-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:12px}
.ip-go,.ip-alt{display:inline-flex;align-items:center;gap:9px;height:48px;padding:0 20px;border-radius:13px;font:600 15px/1 Inter,sans-serif;
  transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s}
.ip-go{background:linear-gradient(135deg,#fff,#ffeccf);color:#0b0603!important}
.ip-go:hover,.ip-go:focus-visible{transform:translateY(-2px);box-shadow:0 14px 32px -12px var(--ip-ember)}
.ip-go svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.ip-go:hover svg{transform:translateY(3px)}
.ip-alt{color:#fff;background:#ffffff0d;box-shadow:inset 0 0 0 1px var(--ip-line2)}
.ip-alt:hover,.ip-alt:focus-visible{transform:translateY(-2px);background:#ffffff14;box-shadow:inset 0 0 0 1px #FF6A1A8c,0 12px 30px -14px var(--ip-ember)}
.ip-alt svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}.ip-alt:hover svg{transform:translateX(3px)}
/* the numbers: mono label, big tabular figure, thin marks with the last one lit (UI standard §2) */
.ip-figs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;width:100%;margin-top:8px;
  border-top:1px solid var(--ip-line);border-bottom:1px solid var(--ip-line)}
.ip-fig{position:relative;display:flex;flex-direction:column;gap:9px;padding:26px 22px 24px;transition:background .4s}
.ip-fig+.ip-fig{border-left:1px solid var(--ip-line)}
.ip-fig:hover{background:radial-gradient(80% 90% at 50% 100%,#FF6A1A1f,transparent 70%)}
.ip-fig small{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.ip-fig strong{font:600 clamp(30px,3.4vw,46px)/1 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;font-variant-numeric:tabular-nums;
  opacity:0;filter:blur(10px);transform:translateY(14px);
  transition:opacity .9s cubic-bezier(.19,1,.22,1),filter .9s,transform .9s cubic-bezier(.19,1,.22,1),text-shadow .4s}
.ip-fig:hover strong{text-shadow:0 0 30px #FF6A1A99}
.ip-fig p{margin:0;font:400 13px/1.5 Inter,sans-serif;color:rgba(255,255,255,.55)}
[data-seen] .ip-fig strong{opacity:1;filter:none;transform:none}
[data-seen] .ip-fig:nth-child(2) strong{transition-delay:.09s}[data-seen] .ip-fig:nth-child(3) strong{transition-delay:.18s}
.ip-marks{display:flex;align-items:flex-end;gap:3px;height:20px}
.ip-marks i{width:2px;border-radius:2px;background:rgba(255,255,255,.2)}
.ip-marks i:last-child{background:var(--ip-ember);box-shadow:0 0 6px var(--ip-ember)}
.ip-hero-totem{display:flex;justify-content:center;align-items:center}
.ip-hero .ip-src{margin-top:4px}
@media (max-width:991px){
  .ip-hero-grid{grid-template-columns:1fr;gap:36px}
  .ip-hero-totem{order:-1;justify-content:flex-start}
  .ip-totem{max-width:280px}
}
@media (max-width:767px){
  .ip-hero{padding:116px 0 74px}
  .ip-hero-line{font-size:16px}
  .ip-figs{grid-template-columns:1fr}
  .ip-fig+.ip-fig{border-left:0;border-top:1px solid var(--ip-line)}
  .ip-fig{padding:20px 0}
  .ip-hero-art img{object-position:66% center}
}
@media (prefers-reduced-motion:reduce){.ip-fig strong{opacity:1;filter:none;transform:none;transition:none}}
`;

export default function Hero({ slug, group }: { slug: string; group: Group }) {
  const ref = useRef<HTMLElement>(null);
  const { inView, live } = useLive(ref, 0.05);

  // Every figure comes from the generated file; nothing is computed for effect.
  const cities = group.cities.length;
  const figures = [
    { n: fmt(group.noSite), label: 'with no website', sub: `across ${cities} cities, of ${fmt(group.all)} found` },
    { n: `#${group.bestRank}`, label: 'best rank here', sub: `of ${fmt(DATA.totalIndustries)} industries ranked` },
    { n: fmt(group.researched), label: 'researched in depth', sub: 'schema, offers, proof and refused claims' },
  ];
  const lead = group.members[0];
  const demo = `/book-demo/?industry=${encodeURIComponent(group.label)}`;

  return (
    <section ref={ref} className="ip-hero" data-live={live || undefined} data-seen={inView || undefined} data-shot="hero" aria-labelledby="ip-title">
      <style>{CSS}</style>
      <div className="ip-hero-art" aria-hidden="true">
        <img src={`/siso-img/industries/web/${group.art}.webp`} alt="" loading="eager" decoding="async"
          onError={e => { e.currentTarget.style.display = 'none'; }} />
      </div>
      <div className="ip-wrap">
        <div className="ip-hero-grid">
          <div className="ip-hero-copy">
            <a className="ip-back" href="/industries/">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 5l-5 5 5 5" /></svg>
              All {fmt(DATA.totalIndustries)} industries
            </a>
            <span className="ip-rank"><b>#{group.bestRank}</b>{lead.module}</span>
            <h1 id="ip-title">{group.label}.<span>The software we build them.</span></h1>
            <p className="ip-hero-line">
              We counted {fmt(group.all)} of them across {group.cities.slice(0, -1).join(', ')} and {group.cities.at(-1)}, and{' '}
              {fmt(group.noSite)} had no website. Then we took{' '}
              {group.researched === 1 ? 'the trade' : `each of the ${group.researched} trades`} apart: what they sell, what a site
              has to prove, and the claims we refuse to make for them.
            </p>
            <div className="ip-ctas">
              <a href="#research" className="ip-go">See the research
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
              </a>
              <a href={demo} className="ip-alt">Claim your site
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h11M11 6l4 4-4 4" /></svg>
              </a>
            </div>
            <div className="ip-figs">
              {figures.map((f, i) => (
                <div key={f.label} className="ip-fig">
                  <small>{f.label}</small>
                  <strong>{f.n}</strong>
                  <p>{f.sub}</p>
                  <span className="ip-marks" aria-hidden="true">
                    {Array.from({ length: 13 }, (_, k) => <i key={k} style={{ height: `${32 + ((k * 43 + i * 17) % 58)}%` }} />)}
                  </span>
                </div>
              ))}
            </div>
            <p className="ip-src">Counts: {DATA.sources.ranking}. Image: made for this page, prompt and inspection note in public/siso-img/industries/manifest.json.</p>
          </div>
          <div className="ip-hero-totem">
            <Totem family={slug as Family} paused={!live} />
          </div>
        </div>
      </div>
    </section>
  );
}
