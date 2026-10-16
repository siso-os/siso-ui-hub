// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/brand-page/Hero.tsx)
'use client';

import { useRef, type CSSProperties } from 'react';
import { WorkspaceMark } from '../living/living-assets';
import { ProductGlyph, type Product } from '../ProductGlyph';
import { SkillsHubMark } from '../home-products/skills-hub/SkillsHubIcon';
import { Arrow, useLive } from '../page-kit/kit';
import { CONTACT, KIT_FILES, PRODUCTS } from './brand';

// The hero: the SISO lion (WorkspaceMark, the Prism look from Agent Base) inside Agent Base's composer halo, with the six
// product icons on one slow orbit round it: the brand and its ecosystem in one picture. The orbit is a single transformed
// layer (each icon counter-turns to stay upright) and stops off screen. Tap the lion to replay its light.
const GLYPH: Record<string, Product | 'skills'> = { 'agent-base': 'os', 'ui-hub': 'ui-hub', 'great-library': 'library', 'skills-hub': 'skills', 'siso-agency': 'agency', voice: 'voice' };

const CSS = `
.bk-hero{padding:150px 0 120px}
.bk-hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);align-items:center;gap:56px}
.bk-hero .spk-head{margin-bottom:28px}
.bk-hero h1 em{font-style:normal;background:linear-gradient(95deg,#fff3d6,#ffc24b 40%,#ff6a1a 75%,#ff2d55);-webkit-background-clip:text;background-clip:text;color:transparent}
.bk-pills{display:flex;flex-wrap:wrap;gap:8px;margin:28px 0 0;padding:0;list-style:none}
.bk-pills li{display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px #ffffff14;
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s}
.bk-pills li:hover{color:#fff;box-shadow:inset 0 0 0 1px #ff6a1a80}
.bk-pills b{color:#fff;font-weight:500}
/* the orbit */
.bk-sky{position:relative;justify-self:center;width:min(520px,100%);aspect-ratio:1}
.bk-ring{position:absolute;inset:6%;border-radius:50%;box-shadow:inset 0 0 0 1px #ffffff12}
.bk-ring.is-in{inset:22%;box-shadow:inset 0 0 0 1px #ffffff0c}
.bk-ring::after{content:"";position:absolute;inset:-1px;border-radius:50%;padding:1px;
  background:conic-gradient(from 0deg,transparent 0 70%,#ff6a1a 86%,#fff3d6 90%,transparent 92%);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:bk-spin 9s linear infinite}
.bk-ring.is-in::after{animation-duration:14s;animation-direction:reverse;opacity:.6}
.bk-orbit{position:absolute;inset:6%;will-change:transform;animation:bk-spin 64s linear infinite}
.bk-sat{position:absolute;width:0;height:0}
.bk-sat>a{position:absolute;left:-30px;top:-30px;display:block;width:60px;height:60px;border-radius:17px}
.bk-sat>a>span{display:block;width:100%;height:100%;border-radius:inherit;will-change:transform;animation:bk-spin 64s linear infinite reverse;
  box-shadow:0 14px 34px -14px var(--c);transition:box-shadow .4s}
.bk-sat>a:hover>span,.bk-sat>a:focus-visible>span{box-shadow:0 0 0 1.5px var(--t),0 18px 40px -10px var(--c)}
.bk-sat>a svg{transition:transform .5s cubic-bezier(.19,1,.22,1)}
.bk-sat>a:hover svg,.bk-sat>a:focus-visible svg{transform:scale(1.1) rotate(-6deg)}
.bk-sat small{position:absolute;left:50%;top:calc(100% + 8px);transform:translate(-50%,-3px);white-space:nowrap;opacity:0;transition:opacity .3s,transform .4s cubic-bezier(.19,1,.22,1);
  font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:var(--t)}
.bk-sat>a:hover small,.bk-sat>a:focus-visible small{opacity:1;transform:translate(-50%,0)}
.bk-sky:hover .bk-orbit,.bk-sky:hover .bk-sat>a>span,.bk-sky:focus-within .bk-orbit,.bk-sky:focus-within .bk-sat>a>span{animation-play-state:paused}
/* the composer halo (Agent Base hub.css .cp), round the lion */
.bk-core{position:absolute;left:50%;top:50%;width:46%;aspect-ratio:1;transform:translate(-50%,-50%);display:grid;place-items:center;border-radius:30%;border:1.5px solid transparent;
  background:linear-gradient(#0a0b0f,#0a0b0f) padding-box,conic-gradient(from var(--bk-halo),#ff6a1a,#ffc24b,#ff6a1a33,#ff2d55,#ff6a1a) border-box;
  box-shadow:0 0 0 1px #ffffff08,0 -20px 80px -30px #ffc24b,0 40px 120px -40px #ff6a1a8c;animation:bk-halo 9s linear infinite}
.bk-core::before{content:"";position:absolute;inset:-30%;z-index:-1;border-radius:50%;background:radial-gradient(closest-side,#ff6a1a33,transparent);filter:blur(20px)}
.bk-hero:not([data-live]) :is(.bk-orbit,.bk-sat>a>span,.bk-ring::after,.bk-core){animation-play-state:paused}
@media (max-width:991px){.bk-hero-grid{grid-template-columns:1fr;gap:40px}.bk-sky{width:min(440px,100%)}}
@media (max-width:767px){.bk-hero{padding:110px 0 64px}.bk-sky{width:calc(100% - 40px)}.bk-sat>a{left:-23px;top:-23px;width:46px;height:46px;border-radius:13px}.bk-sat>a svg{width:100%;height:100%}}
@media (prefers-reduced-motion:reduce){.bk-orbit,.bk-sat>a>span,.bk-ring::after,.bk-core{animation:none}}
`;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { live } = useLive(ref, 0.05);
  const n = KIT_FILES.length;
  return (
    <section ref={ref} className="spk-hero bk-hero" data-live={live || undefined} data-shot="hero" aria-labelledby="bk-title">
      <style>{CSS}</style>
      <div className="spk-wrap bk-hero-grid">
        <div>
          <header className="spk-head is-hero">
            <span className="spk-over">Brand and press kit</span>
            <h1 id="bk-title">The SISO brand, <em>ready to use.</em></h1>
            <p>The lion, the wordmark, six product colours and the type, as SVG and PNG. Every file is drawn by the same code that draws this site, so what you download is what you see.</p>
          </header>
          <div className="spk-row">
            <a className="spk-btn spk-neon is-primary" href="#files"><span>Get the files</span><Arrow /></a>
            <a className="spk-btn spk-neon" href={`mailto:${CONTACT}?subject=Press%20%2F%20partners`}><span>{CONTACT}</span><Arrow /></a>
          </div>
          <ul className="bk-pills" aria-label="What is in the kit">
            <li><b>{n * 2}</b> files · {n} SVG + {n} PNG</li>
            <li>Transparent backgrounds</li>
            <li><b>6</b> product colours</li>
          </ul>
        </div>
        <div className="bk-sky">
          <span className="bk-ring" aria-hidden="true" />
          <span className="bk-ring is-in" aria-hidden="true" />
          <div className="bk-orbit">
            {PRODUCTS.map((p, i) => {
              const g = GLYPH[p.key];
              return (
                <div key={p.key} className="bk-sat" style={{ left: `${(50 + 50 * Math.sin(i * Math.PI / 3)).toFixed(2)}%`, top: `${(50 - 50 * Math.cos(i * Math.PI / 3)).toFixed(2)}%`, '--c': p.colour, '--t': p.tint } as CSSProperties}>
                  <a href={p.href} aria-label={`${p.name}: ${p.line}`}>
                    <span>{g === 'skills' ? <SkillsHubMark size={60} /> : <ProductGlyph product={g} size={60} />}</span>
                    <small>{p.name}</small>
                  </a>
                </div>
              );
            })}
          </div>
          <div className="bk-core">
            <WorkspaceMark brand="siso-agency" size={190} interactive paused={!live} />
          </div>
        </div>
      </div>
    </section>
  );
}
