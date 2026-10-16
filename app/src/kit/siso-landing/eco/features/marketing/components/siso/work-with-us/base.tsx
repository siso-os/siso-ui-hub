// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/work-with-us/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

// The Work with us page's shared frame (docs/specs/work-with-us.md). Same bones as the Agent Base page (siso/agent-base-page/
// base.tsx): dark and light bands, big type, the footer's neon rim and notched rail copied under our own prefix (UI standard
// §2), and one hook that says whether a section may animate. The accent here is the whole-of-SISO ember/gold rather than one
// product colour, because the page is about all five ways in; each path still carries its own colour (PATHS in paths.ts).

export const EMBER = '#FF6A1A';
export const GOLD = '#FFC24B';

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

/** Overline, big headline and a short line. */
export function Head({ over, title, line, center = true, id }: { over: string; title: ReactNode; line?: ReactNode; center?: boolean; id?: string }) {
  return (
    <header className={center ? 'ww-head is-center' : 'ww-head'}>
      <span className="ww-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Arrow({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M10.5 4.5 15 9l-4.5 4.5M14.25 9H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
.ww{--ww-bg:#00030a;--ww-raised:#0a0b0f;--ww-line:#ffffff14;--ww-line2:#ffffff1f;--ww-paper:#eeebe4;--ww-ink:#0b0b0e;
  background:var(--ww-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.ww *,.ww *::before,.ww *::after{box-sizing:border-box}
.ww a{text-decoration:none;color:inherit}
.ww a:focus-visible,.ww button:focus-visible,.ww input:focus-visible,.ww summary:focus-visible{outline:2px solid ${GOLD};outline-offset:3px}
.ww-band{position:relative;padding:140px 0}
.ww-band.is-light{background:var(--ww-paper);color:var(--ww-ink)}
/* light bands read as rounded panels (Shaan's bar: the home product cards) */
.ww-band.is-light{border-radius:40px;margin:0 16px}
.ww-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.ww-head{display:flex;flex-direction:column;gap:18px;max-width:760px;margin-bottom:64px}
.ww-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.ww-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:${GOLD}}
.is-light .ww-over{color:#b2560d}
.ww-head h2{margin:0;font:600 clamp(38px,5.2vw,68px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .ww-head h2{color:var(--ww-ink)}
.ww-head p{margin:0;max-width:620px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .ww-head p{color:rgba(11,11,14,.62)}
.ww-src{margin:28px 0 0;font:500 10.5px/1.7 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.is-light .ww-src{color:rgba(11,11,14,.45)}
/* the footer's neon rim (Footer/index.tsx .sf-neon), under our prefix */
@property --ww-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes ww-ang{to{--ww-ang:360deg}}
.ww-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.ww-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--ww-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#FF2D55 30%,#FF6A1A 46%,#FF6A1A 56%,#FF2D55 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:ww-ang 5s linear infinite;animation-play-state:paused}
.ww-neon:hover,.ww-neon:focus-visible,.ww-neon:focus-within{box-shadow:0 0 30px -10px #FF6A1A99;transform:translateY(-3px)}
.ww-neon:hover::before,.ww-neon:focus-visible::before,.ww-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.ww-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.ww-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.ww-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.ww-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:ww-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes ww-spark{to{background-position:130% 0,0 0}}
.ww-band:not([data-live]) .ww-rail>i>span{animation-play-state:paused}
/* the one call to action shape, used by every path and the contact block */
.ww-go,.ww-ghost{display:inline-flex;align-items:center;gap:8px;height:46px;padding:0 18px;border-radius:12px;
  font:600 15px/1 Inter,sans-serif;transition:transform .35s cubic-bezier(.19,1,.22,1),box-shadow .35s,background .35s,color .35s}
.ww-go{background:#fff;color:#090a0e!important}
.ww-go:hover,.ww-go:focus-visible{transform:translateY(-2px);box-shadow:0 12px 30px -10px var(--ww-c,${EMBER})}
.ww-ghost{color:#fff;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff24}
.ww-ghost:hover,.ww-ghost:focus-visible{transform:translateY(-2px);background:#ffffff14;box-shadow:inset 0 0 0 1px var(--ww-c,${EMBER}),0 10px 28px -12px var(--ww-c,${EMBER})}
.is-light .ww-ghost{color:var(--ww-ink);background:#0b0b0e08;box-shadow:inset 0 0 0 1px #0b0b0e26}
.is-light .ww-ghost:hover,.is-light .ww-ghost:focus-visible{background:#0b0b0e0f;box-shadow:inset 0 0 0 1px var(--ww-c,${EMBER}),0 10px 28px -14px var(--ww-c,${EMBER})}
.ww-go svg,.ww-ghost svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.ww-go:hover svg,.ww-ghost:hover svg{transform:translateX(3px)}
@media (max-width:767px){
  .ww-band{padding:92px 0}
  .ww-band.is-light{border-radius:26px;margin:0 8px}
  .ww-wrap{padding:0 16px}
  .ww-head{margin-bottom:40px;gap:14px}
  .ww-head p{font-size:15.5px}
  .ww-rail{left:16px;right:16px}
}
@media (prefers-reduced-motion:reduce){.ww-neon::before,.ww-rail>i>span{animation:none}.ww *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}

export function Rail() {
  return <div className="ww-rail" aria-hidden="true"><i><span /></i></div>;
}
