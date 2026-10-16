// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/live-page/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

// The live page's shared frame (spec docs/specs/flex-pages.md, lane live-page). Same build as the Agent Base page's base.tsx:
// dark bands, light bands as rounded panels, the footer's neon rim and rail partition under our own prefix (UI standard §2),
// one hook that says whether a section may animate, and the Live / Illustrative tags every section wears.

/** True while the element is on screen, the tab is visible and the visitor allows motion. */
export function useLive(ref: RefObject<Element | null>, amount = 0.15) {
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

/** What a reader is looking at: real data (with its source on hover) or an illustration. */
export function Tag({ kind, src }: { kind: 'live' | 'data' | 'illustrative'; src?: string }) {
  const text = kind === 'live' ? 'Live' : kind === 'data' ? 'Real data' : 'Illustrative';
  return <span className={`lvp-tag is-${kind}`} tabIndex={src ? 0 : undefined} data-src={src}><i aria-hidden="true" />{text}</span>;
}

export function Head({ over, title, line, tag, center = true, id }: { over: string; title: ReactNode; line?: ReactNode; tag?: ReactNode; center?: boolean; id?: string }) {
  return (
    <header className={center ? 'lvp-head is-center' : 'lvp-head'}>
      <span className="lvp-over">{over}{tag}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="lvp-rail" aria-hidden="true"><i><span /></i></div>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
.lvp{--lvp-bg:#00030a;--lvp-raised:#0a0b0f;--lvp-line:#ffffff14;--lvp-line2:#ffffff1f;--lvp-paper:#eeebe4;--lvp-ink:#0b0b0e;--lvp-ease:cubic-bezier(.19,1,.22,1);
  background:var(--lvp-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.lvp *,.lvp *::before,.lvp *::after{box-sizing:border-box}
.lvp a{text-decoration:none;color:inherit}
.lvp a:focus-visible,.lvp button:focus-visible,.lvp [tabindex]:focus-visible{outline:2px solid #FFC24B;outline-offset:3px}
.lvp button{font:inherit;color:inherit;border:0;background:none;padding:0;cursor:pointer;text-align:inherit}
.lvp-band{position:relative;padding:140px 0}
/* light bands are rounded panels set into the dark page */
.lvp-panel{position:relative;margin:0 16px;border-radius:36px;background:var(--lvp-paper);color:var(--lvp-ink);padding:120px 0;overflow:hidden;isolation:isolate}
.lvp-panel::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;box-shadow:inset 0 0 0 1px #ffffff,0 0 0 1px #ffffff14}
.lvp-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.lvp-head{display:flex;flex-direction:column;gap:18px;max-width:780px;margin-bottom:64px}
.lvp-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.lvp-over{display:flex;align-items:center;flex-wrap:wrap;gap:12px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#FFC24B}
.lvp-head.is-center .lvp-over{justify-content:center}
.lvp-panel .lvp-over{color:#c2541a}
.lvp-head h2{margin:0;font:600 clamp(38px,5.2vw,68px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.lvp-panel .lvp-head h2{color:var(--lvp-ink)}
.lvp-head p{margin:0;max-width:620px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.lvp-panel .lvp-head p{color:rgba(11,11,14,.62)}
.lvp-src{margin:28px 0 0;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.lvp-panel .lvp-src{color:rgba(11,11,14,.45)}
.lvp-label{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5)}
/* Live / Real data / Illustrative */
.lvp-tag{position:relative;display:inline-flex;align-items:center;gap:7px;height:24px;padding:0 10px;border-radius:99px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;
  text-transform:uppercase;color:#fff;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff1f;transition:transform .35s var(--lvp-ease),box-shadow .35s}
.lvp-tag[tabindex]{cursor:help}
.lvp-tag:hover{transform:translateY(-2px);box-shadow:inset 0 0 0 1px #FFC24B88}
.lvp-tag i{width:6px;height:6px;border-radius:50%;background:currentColor}
.lvp-tag.is-live{color:#7ee2a0}.lvp-tag.is-live i{box-shadow:0 0 10px #6fdc95;animation:lvp-blink 2s ease-in-out infinite}
.lvp-tag.is-data{color:#FFC24B}
.lvp-tag.is-illustrative{color:rgba(255,255,255,.62)}.lvp-tag.is-illustrative i{background:none;box-shadow:inset 0 0 0 1.5px currentColor}
.lvp-panel .lvp-tag{background:#0b0b0e08;box-shadow:inset 0 0 0 1px #0b0b0e1f}
.lvp-panel .lvp-tag.is-data{color:#b4580f}.lvp-panel .lvp-tag.is-live{color:#14864a}.lvp-panel .lvp-tag.is-illustrative{color:#0b0b0e99}
@keyframes lvp-blink{50%{opacity:.3}}
/* source tooltips: data-src + ::after, as Footer/AskAI.tsx */
.lvp [data-src]{position:relative}
.lvp [data-src]::after{content:attr(data-src);position:absolute;z-index:40;left:50%;top:calc(100% + 10px);width:max-content;max-width:min(320px,calc(100vw - 48px));padding:8px 11px;border-radius:10px;
  background:#0a0b0f;border:1px solid #ffffff1f;box-shadow:0 12px 30px #000c;color:rgba(255,255,255,.75);font:400 12px/1.45 Inter,sans-serif;letter-spacing:0;text-transform:none;text-align:left;
  white-space:normal;opacity:0;pointer-events:none;translate:-50% 0;transform:translateY(-4px);transition:opacity .25s,transform .25s var(--lvp-ease)}
.lvp [data-src]:hover::after,.lvp [data-src]:focus-visible::after{opacity:1;transform:none}
.lvp [data-src].is-left::after{left:0;translate:none}
.lvp [data-src].is-right::after{left:auto;right:0;translate:none}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix */
@property --lvp-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes lvp-ang{to{--lvp-ang:360deg}}
.lvp-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s var(--lvp-ease)}
.lvp-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--lvp-ang),var(--rim1,#FF6A1A),var(--rim2,#FFC24B),#fff3d6 18%,var(--rim3,#FF2D55) 30%,var(--rim1,#FF6A1A) 46%,var(--rim1,#FF6A1A) 56%,var(--rim3,#FF2D55) 72%,var(--rim1,#FF6A1A));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:lvp-ang 5s linear infinite;animation-play-state:paused}
.lvp-neon:hover,.lvp-neon:focus-visible,.lvp-neon[aria-pressed=true]{box-shadow:0 0 30px -10px var(--rim1,#FF6A1A);transform:translateY(-3px)}
.lvp-neon:hover::before,.lvp-neon:focus-visible::before,.lvp-neon[aria-pressed=true]::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.lvp-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.lvp-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.lvp-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.lvp-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:lvp-spark 7s cubic-bezier(.45,0,.55,1) infinite;animation-play-state:paused}
@keyframes lvp-spark{to{background-position:130% 0,0 0}}
.lvp-band[data-live] .lvp-rail>i>span{animation-play-state:running}
@media (max-width:767px){
  .lvp-band{padding:88px 0}.lvp-panel{margin:0 8px;border-radius:26px;padding:80px 0}
  .lvp-wrap{padding:0 16px}.lvp-head{margin-bottom:40px;gap:14px}.lvp-head p{font-size:15.5px}.lvp-rail{left:16px;right:16px}
}
@media (prefers-reduced-motion:reduce){.lvp-neon::before,.lvp-rail>i>span,.lvp-tag i{animation:none!important}.lvp *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
