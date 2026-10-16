// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/agent-base-page/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

// The Agent Base page's shared frame: dark and light bands like the home page, big type and generous space (BridgeMind's feel
// on Foreplay's layout), the footer's neon rim and rail partition copied under our own prefix (UI standard §2), and one hook
// that tells a section whether it may animate (in view, tab visible, motion allowed).

export const CORAL = '#ed615a';
export const TINT = '#ffc0b8';

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
  return { inView, live: inView && ok, reduce: !ok && inView };
}

/** Overline, big headline and a short line: Foreplay's section head. */
export function Head({ over, title, line, center = true, id }: { over: string; title: ReactNode; line?: ReactNode; center?: boolean; id?: string }) {
  return (
    <header className={center ? 'abp-head is-center' : 'abp-head'}>
      <span className="abp-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="abp-rail" aria-hidden="true"><i><span /></i></div>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
html[data-glow="os"] .nav-container{--nav-ember:#ed615a;--nav-gold:#ffc0b8;--nav-rose:#FF2D55}
.abp{--abp-bg:#00030a;--abp-raised:#0a0b0f;--abp-line:#ffffff14;--abp-line2:#ffffff1f;--abp-paper:#eeebe4;--abp-ink:#0b0b0e;
  background:var(--abp-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.abp *,.abp *::before,.abp *::after{box-sizing:border-box}
.abp a{text-decoration:none;color:inherit}
.abp a:focus-visible,.abp button:focus-visible{outline:2px solid #ffc0b8;outline-offset:3px}
.abp-band{position:relative;padding:150px 0}
/* A band off screen is skipped: no style, layout or paint until it nears the viewport (t-0585, 10 Oct: at 12x CPU a phone
   spent ~1.5 s re-layering the whole page's paint while scrolling /agent-base/). No band paints outside its box (measured at 390
   and 1440), so the containment clips nothing; "auto" keeps each band's real height once it has been drawn. */
.abp-band{content-visibility:auto;contain-intrinsic-size:auto 1400px}
.abp-band.is-light{background:var(--abp-paper);color:var(--abp-ink)}
.abp-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.abp-head{display:flex;flex-direction:column;gap:18px;max-width:760px;margin-bottom:72px}
.abp-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.abp-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffc0b8}
.is-light .abp-over{color:#c2453e}
.abp-head h2{margin:0;font:600 clamp(38px,5.2vw,68px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .abp-head h2{color:var(--abp-ink)}
.abp-head p{margin:0;max-width:600px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .abp-head p{color:rgba(11,11,14,.62)}
.abp-src{margin:28px 0 0;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.is-light .abp-src{color:rgba(11,11,14,.45)}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix */
@property --abp-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes abp-ang{to{--abp-ang:360deg}}
.abp-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.abp-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--abp-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#FF2D55 30%,#FF6A1A 46%,#FF6A1A 56%,#FF2D55 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:abp-ang 5s linear infinite;animation-play-state:paused}
.abp-neon:hover,.abp-neon:focus-visible,.abp-neon:focus-within{box-shadow:0 0 30px -10px #FF6A1A99;transform:translateY(-3px)}
.abp-neon:hover::before,.abp-neon:focus-visible::before,.abp-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.abp-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.abp-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.abp-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.abp-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:abp-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes abp-spark{to{background-position:130% 0,0 0}}
.abp-band:not([data-live]) .abp-rail>i>span{animation-play-state:paused}
@media (max-width:767px){.abp-band{padding:96px 0}.abp-wrap{padding:0 16px}.abp-head{margin-bottom:44px;gap:14px}.abp-head p{font-size:15.5px}.abp-rail{left:16px;right:16px}}
@media (prefers-reduced-motion:reduce){.abp-neon::before,.abp-rail>i>span{animation:none}.abp *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
