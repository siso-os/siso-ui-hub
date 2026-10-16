// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/industry-page/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';
import DATA from '../../../data/industry-pages.json';

// The industry page's shared frame (spec: docs/specs/industry-pages.md). Same build as the Agent Base page: dark and light
// bands, big type, the footer's neon rim and rail partition under our own prefix (UI standard §2), and one hook that tells a
// section whether it may animate. Every /industries/<slug>/ page is this frame filled from industry-pages.json, so all six
// get the same level.

export type Group = (typeof DATA.groups)[keyof typeof DATA.groups];
export type Member = Group['members'][number];
/** A member that has a research config behind it. 14 of 14 do today; the type keeps the page honest if one ever doesn't. */
export type Researched = Member & { research: NonNullable<Member['research']> };

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
  return { inView, live: inView && ok };
}

/** Overline, big headline and a short line. */
export function Head({ over, title, line, center = false, id }: { over: string; title: ReactNode; line?: ReactNode; center?: boolean; id?: string }) {
  return (
    <header className={center ? 'ip-head is-center' : 'ip-head'}>
      <span className="ip-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="ip-rail" aria-hidden="true"><i><span /></i></div>;
}

/** The line under a section that says which file on disk it came from. */
export function Src({ children }: { children: ReactNode }) {
  return <p className="ip-src">{children}</p>;
}

export const fmt = (n: number) => n.toLocaleString('en-US');

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
html[data-glow="agency"] .nav-container{--nav-ember:#FF6A1A;--nav-gold:#FFC24B;--nav-rose:#FF2D55}
.ip{--ip-bg:#00030a;--ip-raised:#0a0b0f;--ip-line:#ffffff14;--ip-line2:#ffffff1f;--ip-paper:#eeebe4;--ip-ink:#0b0b0e;
  --ip-ember:#FF6A1A;--ip-gold:#FFC24B;--ip-hot:#fff3d6;
  background:var(--ip-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.ip *,.ip *::before,.ip *::after{box-sizing:border-box}
.ip a{text-decoration:none;color:inherit}
.ip a:focus-visible,.ip button:focus-visible{outline:2px solid var(--ip-gold);outline-offset:3px}
.ip-band{position:relative;padding:140px 0}
.ip-band.is-light{background:var(--ip-paper);color:var(--ip-ink)}
/* light bands are rounded panels (UI standard: "light bands as rounded panels") */
.ip-band.is-light{border-radius:40px;margin:0 20px;padding:120px 0}
.ip-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.ip-head{display:flex;flex-direction:column;gap:18px;max-width:780px;margin-bottom:64px}
.ip-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.ip-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:var(--ip-gold)}
.is-light .ip-over{color:#b4540f}
.ip-head h2{margin:0;font:600 clamp(34px,4.6vw,60px)/1.03 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .ip-head h2{color:var(--ip-ink)}
.ip-head p{margin:0;max-width:620px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .ip-head p{color:rgba(11,11,14,.62)}
.ip-src{margin:30px 0 0;font:500 10.5px/1.7 'Geist Mono',ui-monospace,monospace;letter-spacing:.05em;color:rgba(255,255,255,.4)}
.is-light .ip-src{color:rgba(11,11,14,.45)}
.ip-src a{color:inherit;text-decoration:underline;text-decoration-color:#ffffff33;text-underline-offset:3px}
.ip-src a:hover{color:var(--ip-gold)}
.is-light .ip-src a:hover{color:#b4540f}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix */
@property --ip-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes ip-ang{to{--ip-ang:360deg}}
.ip-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.ip-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--ip-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#FF2D55 30%,#FF6A1A 46%,#FF6A1A 56%,#FF2D55 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:ip-ang 5s linear infinite;animation-play-state:paused}
.ip-neon:hover,.ip-neon:focus-visible,.ip-neon:focus-within{box-shadow:0 0 30px -10px #FF6A1A99;transform:translateY(-3px)}
.ip-neon:hover::before,.ip-neon:focus-visible::before,.ip-neon:focus-within::before{opacity:1;animation-play-state:running}
.is-light .ip-neon:hover,.is-light .ip-neon:focus-within{box-shadow:0 14px 34px -16px #b4540f66}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.ip-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.ip-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.ip-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.ip-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:ip-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes ip-spark{to{background-position:130% 0,0 0}}
.ip-band:not([data-live]) .ip-rail>i>span{animation-play-state:paused}
/* a pill, used for needs, offers and tags everywhere on the page */
.ip-pill{display:inline-flex;align-items:center;gap:7px;height:28px;padding:0 11px;border-radius:99px;background:#ffffff08;box-shadow:inset 0 0 0 1px var(--ip-line);
  font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.62);transition:color .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.ip-pill:hover{color:#fff;box-shadow:inset 0 0 0 1px #FF6A1A80;transform:translateY(-2px)}
.is-light .ip-pill{background:#0b0b0e08;box-shadow:inset 0 0 0 1px #0b0b0e1f;color:rgba(11,11,14,.66)}
.is-light .ip-pill:hover{color:var(--ip-ink);box-shadow:inset 0 0 0 1px #b4540f80}
@media (max-width:767px){
  .ip-band{padding:92px 0}.ip-band.is-light{padding:80px 0;border-radius:28px;margin:0 10px}
  .ip-wrap{padding:0 18px}.ip-head{margin-bottom:40px;gap:14px}.ip-head p{font-size:15.5px}
  .ip-rail{left:18px;right:18px}
}
@media (prefers-reduced-motion:reduce){.ip-neon::before,.ip-rail>i>span{animation:none}.ip *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
