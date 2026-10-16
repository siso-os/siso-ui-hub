// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/page-kit/kit.tsx)
'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';

// The shared frame for the pages-polish lane (/research/, /pricing/, /book-demo/, /industries/): the Agent Base page's bands,
// with its light bands as rounded panels, the footer's neon rim and rail partition (UI standard §2) under our own prefix, and
// one product hue per page (UI standard §3: a product's colour only on that product's own things). No Foreplay classes or
// assets: everything here is our CSS and coded SVG.

export type Hue = { hue: string; tint: string; deep: string };
export const HUES = {
  research: { hue: '#41567a', tint: '#bfe6ff', deep: '#2c4466' },
  agency: { hue: '#00a879', tint: '#9ff0cf', deep: '#007a58' },
  all: { hue: '#ff6a1a', tint: '#ffd59a', deep: '#c2410c' },
} satisfies Record<string, Hue>;

/** True while the element is on screen, the tab is visible and the visitor allows motion. */
export function useLive(ref: RefObject<Element | null>, amount = 0.2) {
  const [inView, setInView] = useState(false);
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: amount });
    io.observe(el);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setOk(!media.matches && !document.hidden);
    sync();
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => { io.disconnect(); media.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [ref, amount]);
  return { inView, live: inView && ok };
}

/** A section that knows when it is seen (numbers rise once) and live (loops run only then). */
export function Band({ children, light, rail, id, label, className = '' }: { children: ReactNode; light?: boolean; rail?: boolean; id?: string; label?: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { inView, live } = useLive(ref, 0.12);
  const [seen, setSeen] = useState(false);
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  return (
    <section ref={ref} id={id} aria-labelledby={label} className={`spk-band${light ? ' is-light' : ''} ${className}`} data-live={live || undefined} data-seen={seen || undefined}>
      {rail && <Rail />}
      <div className="spk-wrap">{children}</div>
    </section>
  );
}

export function Head({ over, title, line, center = true, id, h1 }: { over: string; title: ReactNode; line?: ReactNode; center?: boolean; id?: string; h1?: boolean }) {
  const H = h1 ? 'h1' : 'h2';
  return (
    <header className={`spk-head${center ? ' is-center' : ''}${h1 ? ' is-hero' : ''}`}>
      <span className="spk-over">{over}</span>
      <H id={id}>{title}</H>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="spk-rail" aria-hidden="true"><i><span /></i></div>;
}

export function Arrow() {
  return <svg className="spk-arrow" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M4 10 10 4M5 4h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Btn({ href, children, primary, external }: { href: string; children: ReactNode; primary?: boolean; external?: boolean }) {
  return (
    <a className={`spk-btn spk-neon${primary ? ' is-primary' : ''}`} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span>{children}</span><Arrow />{external && <span className="spk-sr"> (opens in a new tab)</span>}
    </a>
  );
}

/** Big tabular numbers with a mono label and a source line; they enter with blur and rise. */
export function Numbers({ items }: { items: { n: string; label: string; sub?: string }[] }) {
  return (
    <div className="spk-nums" style={{ '--cols': items.length } as CSSProperties}>
      {items.map((item, i) => (
        <div className="spk-num" key={item.label} style={{ '--i': i } as CSSProperties}>
          <small>{item.label}</small>
          <strong>{item.n}</strong>
          {item.sub && <p>{item.sub}</p>}
          <span className="spk-marks" aria-hidden="true">{Array.from({ length: 14 }, (_, k) => <i key={k} style={{ height: `${30 + ((k * 47 + i * 29) % 60)}%` }} />)}</span>
        </div>
      ))}
    </div>
  );
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
.spk{--bg:#00030a;--raised:#0a0b0f;--line:#ffffff14;--line2:#ffffff1f;--paper:#eeebe4;--ink:#0b0b0e;
  background:var(--bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.spk *,.spk *::before,.spk *::after{box-sizing:border-box}
.spk :where(a){text-decoration:none;color:inherit}
.spk :where(h1,h2,h3,p){margin:0}
.spk :where(button,input,textarea){font:inherit}
.spk :is(a,button,input,textarea,[tabindex]):focus-visible{outline:2px solid var(--tint);outline-offset:3px}
.spk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.spk-band{position:relative;padding:140px 0}
.spk-band.is-light{background:var(--paper);color:var(--ink);margin:0 16px;border-radius:36px;padding:120px 0;box-shadow:0 0 0 1px #ffffff10,0 60px 120px -60px color-mix(in srgb,var(--hue) 55%,transparent)}
.spk-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.spk-head{display:flex;flex-direction:column;gap:18px;max-width:780px;margin-bottom:64px}
.spk-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.spk-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--tint)}
.is-light .spk-over{color:var(--deep)}
.spk-head h2{font:600 clamp(36px,5vw,64px)/1.03 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.spk-head.is-hero h1{font:600 clamp(46px,7vw,96px)/.98 'Inter Display',Inter,sans-serif;letter-spacing:-.05em;color:#fff;text-wrap:balance}
.is-light .spk-head h2{color:var(--ink)}
.spk-head p{max-width:620px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .spk-head p{color:rgba(11,11,14,.62)}
.spk-src{margin-top:28px;font:500 10.5px/1.7 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.42)}
.is-light .spk-src{color:rgba(11,11,14,.48)}
.spk-row{display:flex;flex-wrap:wrap;gap:12px}
.is-center .spk-row,.spk-row.is-center{justify-content:center}
/* hero: an ambient glow in the page's hue, blurred and behind the content */
.spk-hero{position:relative;isolation:isolate;padding:150px 0 110px}
.spk-hero::before{content:"";position:absolute;z-index:-1;left:50%;top:-10%;width:min(1100px,120%);height:80%;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(45% 50% at 50% 40%,color-mix(in srgb,var(--hue) 55%,transparent),transparent 70%),radial-gradient(30% 35% at 70% 60%,#FF6A1A22,transparent 70%);filter:blur(40px);opacity:.8}
.spk-hero .spk-head{margin-bottom:40px}
/* buttons */
.spk-btn{display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 18px;border-radius:12px;font:600 15px/1 Inter,sans-serif;color:#fff;background:#ffffff0f;box-shadow:inset 0 0 0 1px #ffffff1f}
.spk-btn.is-primary{background:#fff;color:#090a0e;box-shadow:0 1px 0 #ffffff40 inset,0 10px 30px -12px var(--hue)}
.is-light .spk-btn:not(.is-primary){color:var(--ink);background:#0b0b0e0a;box-shadow:inset 0 0 0 1px #0b0b0e1f}
.is-light .spk-btn.is-primary{background:var(--ink);color:#fff}
.spk-arrow{transition:transform .4s cubic-bezier(.19,1,.22,1)}
.spk-btn:hover .spk-arrow,a:hover>.spk-arrow,a:focus-visible .spk-arrow{transform:translate(2px,-2px)}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix */
@property --spk-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes spk-ang{to{--spk-ang:360deg}}
.spk-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.spk-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--spk-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#FF2D55 30%,#FF6A1A 46%,var(--hue) 56%,#FF2D55 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:spk-ang 5s linear infinite;animation-play-state:paused}
.spk-neon:hover,.spk-neon:focus-visible,.spk-neon:focus-within{box-shadow:0 0 30px -10px #FF6A1A99;transform:translateY(-3px)}
.spk-neon:hover::before,.spk-neon:focus-visible::before,.spk-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.spk-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.spk-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.spk-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.spk-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:spk-spark 7s cubic-bezier(.45,0,.55,1) infinite;animation-play-state:paused}
@keyframes spk-spark{to{background-position:130% 0,0 0}}
.spk-band[data-live] .spk-rail>i>span{animation-play-state:running}
/* numbers (Footer/Numbers.tsx, Agent Base research): mono label, big tabular number, thin marks with the last one lit */
.spk-nums{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.is-light .spk-nums{border-color:#0b0b0e1a}
.spk-num{position:relative;display:flex;flex-direction:column;gap:12px;padding:32px 26px 28px;transition:background .4s}
.spk-num+.spk-num{border-left:1px solid var(--line)}
.is-light .spk-num+.spk-num{border-color:#0b0b0e1a}
.spk-num:hover{background:radial-gradient(80% 90% at 50% 100%,color-mix(in srgb,var(--hue) 22%,transparent),transparent 70%)}
.spk-num small{font:500 10.5px/1.3 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.is-light .spk-num small{color:rgba(11,11,14,.5)}
.spk-num strong{font:600 clamp(30px,3.6vw,52px)/1 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;font-variant-numeric:tabular-nums;
  opacity:0;filter:blur(10px);transform:translateY(14px);transition:opacity .9s cubic-bezier(.19,1,.22,1),filter .9s,transform .9s cubic-bezier(.19,1,.22,1),text-shadow .4s;transition-delay:calc(var(--i) * 80ms)}
.is-light .spk-num strong{color:var(--ink)}
.spk-num:hover strong{text-shadow:0 0 30px color-mix(in srgb,var(--hue) 70%,transparent)}
.spk-num p{font:400 13.5px/1.5 Inter,sans-serif;color:rgba(255,255,255,.55)}
.is-light .spk-num p{color:rgba(11,11,14,.58)}
.spk-marks{display:flex;align-items:flex-end;gap:3px;height:20px;margin-top:auto}
.spk-marks i{width:2px;border-radius:2px;background:rgba(255,255,255,.22);transition:transform .5s cubic-bezier(.19,1,.22,1);transform-origin:bottom}
.is-light .spk-marks i{background:#0b0b0e2e}
.spk-marks i:last-child{background:var(--tint);box-shadow:0 0 6px var(--tint)}
.is-light .spk-marks i:last-child{background:var(--deep);box-shadow:none}
.spk-num:hover .spk-marks i{transform:scaleY(1.15)}
[data-seen] .spk-num strong{opacity:1;filter:none;transform:none}
/* cards */
.spk-card{position:relative;border-radius:22px;background:var(--raised);box-shadow:inset 0 0 0 1px var(--line2)}
.is-light .spk-card{background:#fff;box-shadow:inset 0 0 0 1px #0b0b0e14,0 20px 40px -30px #0b0b0e55}
.spk-tag{display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 10px;border-radius:999px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--tint);background:color-mix(in srgb,var(--hue) 16%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--tint) 30%,transparent)}
.spk-tag::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
.is-light .spk-tag{color:var(--deep);background:color-mix(in srgb,var(--hue) 12%,transparent)}
@media (max-width:991px){.spk-nums{grid-template-columns:repeat(2,minmax(0,1fr))}.spk-num:nth-child(odd){border-left:0!important}.spk-num:nth-child(n+3){border-top:1px solid var(--line)}.is-light .spk-num:nth-child(n+3){border-top-color:#0b0b0e1a}}
@media (max-width:767px){.spk-band{padding:96px 0}.spk-band.is-light{margin:0 8px;border-radius:26px;padding:80px 0}.spk-wrap{padding:0 16px}.spk-head{margin-bottom:40px;gap:14px}.spk-head p{font-size:15.5px}
  .spk-rail{left:16px;right:16px}.spk-hero{padding:110px 0 72px}.spk-num{padding:24px 14px 20px}.spk-num p{font-size:12.5px}}
@media (prefers-reduced-motion:reduce){.spk-neon::before,.spk-rail>i>span{animation:none}.spk *{transition-duration:0s!important;animation-duration:0s!important}.spk-num strong{opacity:1;filter:none;transform:none}}
`;

/** The page root: the kit's CSS and the page's product hue. */
export function Page({ hue, children, className = '' }: { hue: Hue; children: ReactNode; className?: string }) {
  return (
    <div className={`spk ${className}`} style={{ '--hue': hue.hue, '--tint': hue.tint, '--deep': hue.deep } as CSSProperties}>
      <style>{CSS}</style>
      {children}
    </div>
  );
}
