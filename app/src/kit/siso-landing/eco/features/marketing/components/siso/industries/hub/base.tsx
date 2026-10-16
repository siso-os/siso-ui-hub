// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/industries/hub/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';

// The /industries/ hub's shared frame. Same construction as the Agent Base page's base.tsx (UI standard §2): dark and
// light bands like the home page, the footer's neon rim and rail partition copied under our own prefix, and one hook
// that tells a section whether it may animate. The accent is Agency green, because the industries and the sites on the
// globe are the Agency's own work (ProductGlyph TILE: Agency #00a879).

export const GREEN = '#00a879';
export const MINT = '#9ff0cf';

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
  return { inView, live: inView && ok, reduce: !ok && inView };
}

/** Overline, big headline and a short line. */
export function Head({ over, title, line, center = false, id }: { over: string; title: ReactNode; line?: ReactNode; center?: boolean; id?: string }) {
  return (
    <header className={center ? 'ih-head is-center' : 'ih-head'}>
      <span className="ih-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="ih-rail" aria-hidden="true"><i><span /></i></div>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

/**
 * Hold the nav's rim on the Agency green for as long as this page is mounted, so the nav agrees with the page under it.
 * `agency` is the key homeProductStyles.ts already defines (#00a879 / #9ff0cf) — this page is the Agency's own index, so
 * it takes the same colour rather than inventing a tenth one. A hover on a nav menu still wins while it is open; we only
 * restore what was there when we leave.
 */
export function useNavGlow(key = 'agency') {
  useEffect(() => {
    const el = document.documentElement;
    const had = el.getAttribute('data-glow');
    el.setAttribute('data-glow', key);
    return () => { if (had === null) el.removeAttribute('data-glow'); else el.setAttribute('data-glow', had); };
  }, [key]);
}

const CSS = `
.ih{--ih-bg:#00030a;--ih-raised:#0a0b0f;--ih-line:#ffffff14;--ih-line2:#ffffff1f;--ih-paper:#eeebe4;--ih-ink:#0b0b0e;
  --ih-green:#00a879;--ih-mint:#9ff0cf;--ih-gold:#FFC24B;--ih-ember:#FF6A1A;
  background:var(--ih-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.ih *,.ih *::before,.ih *::after{box-sizing:border-box}
.ih a{text-decoration:none;color:inherit}
.ih a:focus-visible,.ih button:focus-visible,.ih input:focus-visible{outline:2px solid var(--ih-mint);outline-offset:3px}
.ih-band{position:relative;padding:132px 0}
.ih-band.is-light{background:var(--ih-paper);color:var(--ih-ink)}
.ih-band.is-tight{padding:96px 0}
.ih-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.ih-head{display:flex;flex-direction:column;gap:18px;max-width:780px;margin-bottom:56px}
.ih-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.ih-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--ih-mint)}
.is-light .ih-over{color:#0b6e51}
.ih-head h2{margin:0;font:600 clamp(34px,4.6vw,60px)/1.03 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .ih-head h2{color:var(--ih-ink)}
.ih-head p{margin:0;max-width:640px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .ih-head p{color:rgba(11,11,14,.62)}
.ih-src{margin:26px 0 0;font:500 10.5px/1.7 'Geist Mono',ui-monospace,monospace;letter-spacing:.05em;color:rgba(255,255,255,.4)}
.is-light .ih-src{color:rgba(11,11,14,.45)}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix, warmed to Agency green */
@property --ih-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes ih-ang{to{--ih-ang:360deg}}
.ih-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.ih-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--ih-ang),#00a879,#9ff0cf,#fff3d6 18%,#FFC24B 30%,#00a879 46%,#00a879 56%,#FFC24B 72%,#00a879);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:ih-ang 5s linear infinite;animation-play-state:paused}
.ih-neon:hover,.ih-neon:focus-visible,.ih-neon:focus-within{box-shadow:0 0 30px -10px #00a87999;transform:translateY(-3px)}
.ih-neon:hover::before,.ih-neon:focus-visible::before,.ih-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.ih-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.ih-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #00a87999)}
.ih-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#00a8791c,#FFC24B0a 55%,transparent 80%)}
.ih-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#eafff6,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#00a87940 16%,#9ff0cf99 38%,#fff3d6 50%,#FFC24B99 62%,#00a87940 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:ih-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes ih-spark{to{background-position:130% 0,0 0}}
.ih-band:not([data-live]) .ih-rail>i>span{animation-play-state:paused}
@media (max-width:767px){.ih-band{padding:84px 0}.ih-band.is-tight{padding:64px 0}.ih-wrap{padding:0 16px}
  .ih-head{margin-bottom:36px;gap:14px}.ih-head p{font-size:15.5px}.ih-rail{left:16px;right:16px}}
@media (prefers-reduced-motion:reduce){.ih-neon::before,.ih-rail>i>span{animation:none}.ih *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
