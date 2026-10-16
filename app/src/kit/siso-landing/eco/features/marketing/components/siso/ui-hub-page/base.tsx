// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/ui-hub-page/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

// The UI Hub page's shared frame, copied from agent-base-page/base.tsx under our own prefix and recoloured in UI Hub blue
// (#1f69ff, tint #9cc0ff): dark and light bands like the home page, Foreplay's section head, the footer's neon rim and rail
// partition, a hook that tells a section whether it may animate, and a number that names its source on hover.

export const BLUE = '#1f69ff';
export const TINT = '#9cc0ff';
export const fmt = (n: number) => n.toLocaleString('en-US');

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
    <header className={center ? 'uhp-head is-center' : 'uhp-head'}>
      <span className="uhp-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

/** A true number with where it was read; pointing at it (or focusing it) shows the source. */
export function Num({ n, label, src, about }: { n: ReactNode; label: ReactNode; src: string; about?: boolean }) {
  return (
    <div className="uhp-num" tabIndex={0}>
      <strong>{about && <em>about</em>}{n}</strong>
      <span>{label}</span>
      <small role="tooltip">{src}</small>
    </div>
  );
}

export function Rail() {
  return <div className="uhp-rail" aria-hidden="true"><i><span /></i></div>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
html[data-glow="ui-hub"] .nav-container{--nav-ember:#1f69ff;--nav-gold:#9cc0ff;--nav-rose:#4f8dff}
.uhp{--uhp-bg:#00030a;--uhp-paper:#eeebe4;--uhp-ink:#0b0b0e;background:var(--uhp-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.uhp *,.uhp *::before,.uhp *::after{box-sizing:border-box}
.uhp a{text-decoration:none;color:inherit}
.uhp a:focus-visible,.uhp button:focus-visible,.uhp [tabindex]:focus-visible{outline:2px solid #9cc0ff;outline-offset:3px}
.uhp-band{position:relative;padding:150px 0}
/* A band off screen is skipped: no style, layout or paint until it nears the viewport (t-0585, 10 Oct: at 12x CPU a phone
   spent ~1.5 s re-layering the whole page's paint while scrolling /ui-hub/). No band paints outside its box (measured at 390
   and 1440), so the containment clips nothing; "auto" keeps each band's real height once it has been drawn. */
.uhp-band{content-visibility:auto;contain-intrinsic-size:auto 1400px}
.uhp-band.is-light{margin:0 clamp(8px,1.4vw,20px);border-radius:clamp(26px,3vw,44px);background:var(--uhp-paper);color:var(--uhp-ink);
  box-shadow:inset 0 1px 0 #fff,0 0 0 1px #ffffff0f,0 40px 120px -60px #1f69ff59}
.uhp-band.is-light+.uhp-band.is-light{margin-top:clamp(8px,1.4vw,20px)}
.uhp-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.uhp-head{display:flex;flex-direction:column;gap:18px;max-width:760px;margin-bottom:72px}
.uhp-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.uhp-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#9cc0ff}
.is-light .uhp-over{color:#1550d6}
.uhp-head h2{margin:0;font:600 clamp(38px,5.2vw,68px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .uhp-head h2{color:var(--uhp-ink)}
.uhp-head p{margin:0;max-width:600px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .uhp-head p{color:rgba(11,11,14,.62)}
.uhp-src{margin:28px 0 0;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.is-light .uhp-src{color:rgba(11,11,14,.45)}
/* a sourced number: the source rises on hover or focus */
.uhp-num{position:relative;display:flex;flex-direction:column;gap:8px;cursor:help;outline:none}
.uhp-num strong{display:flex;align-items:baseline;gap:7px;font:600 clamp(34px,3.6vw,52px)/1 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;font-variant-numeric:tabular-nums}
.uhp-num strong em{font:500 14px/1 Inter,sans-serif;font-style:normal;letter-spacing:0;opacity:.55}
.uhp-num>span{font:400 14px/1.45 Inter,sans-serif;opacity:.62}
.uhp-num small{position:absolute;left:0;bottom:calc(100% + 10px);z-index:20;width:max-content;max-width:300px;padding:9px 11px;border-radius:10px;background:#10131c;color:#e8eefc;
  box-shadow:0 0 0 1px #1f69ff59,0 14px 30px -12px #000;font:400 11.5px/1.5 Inter,sans-serif;pointer-events:none;opacity:0;visibility:hidden;transform:translateY(6px);transition:opacity .25s,transform .35s cubic-bezier(.19,1,.22,1),visibility 0s linear .25s}
.uhp-num small::before{content:'Source: '}
.uhp-num:hover small,.uhp-num:focus-visible small{opacity:1;visibility:visible;transform:none;transition:opacity .25s,transform .35s cubic-bezier(.19,1,.22,1),visibility 0s linear 0s}
/* the footer's neon rim (Footer/index.tsx .sf-neon), in UI Hub blue */
@property --uhp-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes uhp-ang{to{--uhp-ang:360deg}}
.uhp-neon{position:relative;transition:transform .4s cubic-bezier(.19,1,.22,1)}
.uhp-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--uhp-ang),#1f69ff,#9cc0ff,#e6efff 18%,#5b95ff 30%,#1f69ff 46%,#1f69ff 56%,#5b95ff 72%,#1f69ff);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:uhp-ang 5s linear infinite;animation-play-state:paused}
.uhp-neon:hover,.uhp-neon:focus-visible,.uhp-neon:focus-within{transform:translateY(-3px)}
.uhp-neon:hover::before,.uhp-neon:focus-visible::before,.uhp-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail), in blue */
.uhp-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.uhp-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #1f69ff99)}
.uhp-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#1f69ff1f,#5b95ff0a 55%,transparent 80%)}
.uhp-rail>i>span{position:absolute;inset:0;overflow:hidden;
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  background:linear-gradient(90deg,transparent,#1f69ff40 16%,#9cc0ff99 38%,#e6efff 50%,#5b95ff99 62%,#1f69ff40 84%,transparent)}
.uhp-rail>i>span::after{content:"";position:absolute;top:0;bottom:0;left:0;width:16%;background:linear-gradient(90deg,transparent,#f2f7ff,transparent);
  transform:translateX(-120%);animation:uhp-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes uhp-spark{to{transform:translateX(720%)}}
.uhp-band:not([data-live]) .uhp-rail>i>span::after{animation-play-state:paused}
@media (max-width:767px){.uhp-band{padding:96px 0}.uhp-band.is-light{margin:0 6px;border-radius:26px}.uhp-band.is-light .uhp-wrap{padding:0 12px}.uhp-wrap{padding:0 16px}.uhp-head{margin-bottom:44px;gap:14px}.uhp-head p{font-size:15.5px}.uhp-rail{left:16px;right:16px}
  .uhp-num small{max-width:240px}}
@media (prefers-reduced-motion:reduce){.uhp-neon::before,.uhp-rail>i>span::after{animation:none}.uhp *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
