// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/voice-page/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

// The SISO Voice page's shared frame, after agent-base-page/base.tsx: dark and light bands like the home page, big type and
// generous space (BridgeMind's feel on Foreplay's layout), the footer's neon rim and rail partition under our own prefix, and
// one hook that tells a section whether it may animate (in view, tab visible, motion allowed). Voice pink: #e0336a.

export const PINK = '#e0336a';
export const TINT = '#ffb3cb';

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
    <header className={center ? 'vp-head is-center' : 'vp-head'}>
      <span className="vp-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="vp-rail" aria-hidden="true"><i><span /></i></div>;
}

/** A true number with its source on hover and focus. */
export function Num({ children, source, className }: { children: ReactNode; source: string; className?: string }) {
  return <span className={className ? `vp-num ${className}` : 'vp-num'} tabIndex={0} aria-description={`Source: ${source}`}>
    {children}<span className="vp-tip" role="tooltip">{source}</span>
  </span>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
html[data-glow="voice"] .nav-container{--nav-ember:#e0336a;--nav-gold:#ffb3cb;--nav-rose:#ff5d8f}
.vp{--vp-bg:#00030a;--vp-raised:#0a0b0f;--vp-paper:#eeebe4;--vp-ink:#0b0b0e;
  background:var(--vp-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.vp *,.vp *::before,.vp *::after{box-sizing:border-box}
.vp a{text-decoration:none;color:inherit}
.vp button{font:inherit;color:inherit}
.vp a:focus-visible,.vp button:focus-visible,.vp [tabindex]:focus-visible{outline:2px solid #ffb3cb;outline-offset:3px}
.vp-band{position:relative;padding:150px 0}
.vp-band.is-light{background:var(--vp-paper);color:var(--vp-ink);margin:0 16px;border-radius:40px;
  box-shadow:inset 0 1px 0 #fff,0 0 0 1px #ffffff14,0 40px 120px -60px #e0336a55}
.vp-band.is-light::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;
  background:radial-gradient(60% 40% at 50% 0,#e0336a0f,transparent 70%),radial-gradient(1px 1px at 1px 1px,#0b0b0e14 1px,transparent 0) 0 0/22px 22px;
  -webkit-mask:linear-gradient(#000,transparent 60%);mask:linear-gradient(#000,transparent 60%)}
.vp-band.is-light+.vp-band.is-light{margin-top:16px}
.vp-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.vp-head{display:flex;flex-direction:column;gap:18px;max-width:760px;margin-bottom:72px}
.vp-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.vp-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffb3cb}
.is-light .vp-over{color:#b81f52}
.vp-head h2{margin:0;font:600 clamp(38px,5.2vw,68px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .vp-head h2{color:var(--vp-ink)}
.vp-head p{margin:0;max-width:600px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .vp-head p{color:rgba(11,11,14,.62)}
.vp-src{margin:28px 0 0;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.is-light .vp-src{color:rgba(11,11,14,.45)}
.vp-src a{text-decoration:underline;text-underline-offset:3px}
/* a sourced number: dotted underline, the source on hover or focus */
.vp-num{position:relative;display:inline-block;cursor:help;border-bottom:1px dotted currentColor;border-bottom-color:color-mix(in srgb,currentColor 35%,transparent)}
.vp-tip{position:absolute;left:50%;bottom:calc(100% + 10px);z-index:20;width:max-content;max-width:280px;padding:9px 11px;border-radius:10px;background:#16161b;color:#eeebe4;
  box-shadow:0 0 0 1px #ffffff1f,0 14px 30px -12px #000;font:500 11px/1.5 Inter,sans-serif;letter-spacing:0;text-transform:none;text-align:left;white-space:normal;
  opacity:0;visibility:hidden;transform:translate(-50%,4px);pointer-events:none;transition:opacity .25s,transform .25s cubic-bezier(.19,1,.22,1),visibility 0s linear .25s}
.vp-tip::before{content:'Source: '}
.vp-num:hover .vp-tip,.vp-num:focus-visible .vp-tip{opacity:1;visibility:visible;transform:translate(-50%,0);transition:opacity .25s,transform .25s cubic-bezier(.19,1,.22,1),visibility 0s linear 0s}
/* the footer's neon rim (Footer/index.tsx .sf-neon), in Voice pink */
@property --vp-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes vp-ang{to{--vp-ang:360deg}}
.vp-neon{position:relative;transition:box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.vp-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--vp-ang),#e0336a,#ffb3cb,#fff0f5 18%,#b45cff 30%,#e0336a 46%,#e0336a 56%,#ff5d8f 72%,#e0336a);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:vp-ang 5s linear infinite;animation-play-state:paused}
.vp-neon:hover,.vp-neon:focus-visible,.vp-neon:focus-within{box-shadow:0 0 30px -10px #e0336a99;transform:translateY(-3px)}
.vp-neon:hover::before,.vp-neon:focus-visible::before,.vp-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail), in Voice pink */
.vp-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.vp-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #e0336a99)}
.vp-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#e0336a1c,#b45cff0a 55%,transparent 80%)}
.vp-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff0f5,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#e0336a40 16%,#ff8fb199 38%,#fff0f5 50%,#b45cff99 62%,#e0336a40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:vp-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes vp-spark{to{background-position:130% 0,0 0}}
.vp-band:not([data-live]) .vp-rail>i>span{animation-play-state:paused}
/* scenes loop in CSS and only while their band is live */
.vp-band:not([data-live]) .vp-loop,.vp-band:not([data-live]) .vp-loop *{animation-play-state:paused!important}
@media (max-width:767px){.vp-band{padding:96px 0}.vp-band.is-light{margin:0 8px;border-radius:28px}.vp-wrap{padding:0 16px}.vp-head{margin-bottom:44px;gap:14px}.vp-head p{font-size:15.5px}.vp-rail{left:16px;right:16px}
  .vp-tip{left:0;transform:translate(0,4px);max-width:240px}.vp-num:hover .vp-tip,.vp-num:focus-visible .vp-tip{transform:none}}
@media (prefers-reduced-motion:reduce){.vp-neon::before,.vp-rail>i>span{animation:none}.vp *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
