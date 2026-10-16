// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/skills-page/base.tsx)
'use client';

import { useEffect, useState, type ReactNode, type RefObject } from 'react';
import STATS from '../../../data/siso-stats.json';
import HUB from '../../../data/skills-hub.json';

// The Skills Hub page's shared frame, copied from agent-base-page/base.tsx under our own prefix and recoloured in amber:
// dark and light bands like the home page, big type and generous space (BridgeMind's feel on Foreplay's layout), the footer's
// neon rim and rail partition, and one hook that tells a section whether it may animate (in view, tab visible, motion allowed).

export const AMBER = '#f5a524';
export const TINT = '#ffe0a3';

// The skills count is siso-stats.json's (spec: docs/specs/product-pages.md); skills-hub.json is the registry it counts.
const STAT = STATS.stats.find(s => s.key === 'skills')!;
export const SKILLS_N = STAT.n;
export const SKILLS_SRC = STAT.source;
export const REGISTRY_SRC = HUB._source;
export const REPO = HUB.repo;
export const REPO_PATH = HUB.repo.replace('https://github.com/', '');
export const CAT_NAME: Record<string, string> = {
  global: 'Global', code: 'Code', devops: 'DevOps', system: 'System', pipeline: 'Pipeline', communication: 'Comms', data: 'Data', testing: 'Testing',
};

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
    <header className={center ? 'skp-head is-center' : 'skp-head'}>
      <span className="skp-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

/** A number with its source on hover (and on focus, for keyboards). */
export function Num({ n, src, children }: { n: ReactNode; src: string; children?: ReactNode }) {
  return <span className="skp-num" tabIndex={0} data-src={`Source: ${src}`}><b>{n}</b>{children}</span>;
}

export function Rail() {
  return <div className="skp-rail" aria-hidden="true"><i><span /></i></div>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
html[data-glow="skills"] .nav-container{--nav-ember:#f5a524;--nav-gold:#ffe0a3;--nav-rose:#FF6A1A}
.skp{--skp-bg:#00030a;--skp-raised:#0a0b0f;--skp-paper:#eeebe4;--skp-ink:#0b0b0e;
  background:var(--skp-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.skp *,.skp *::before,.skp *::after{box-sizing:border-box}
.skp a{text-decoration:none;color:inherit}
.skp a:focus-visible,.skp button:focus-visible,.skp [tabindex]:focus-visible{outline:2px solid #ffe0a3;outline-offset:3px}
.skp-band{position:relative;padding:150px 0}
.skp-band.is-light{background:var(--skp-paper);color:var(--skp-ink);margin:0 20px;border-radius:40px;padding:130px 0;isolation:isolate;overflow:clip;
  box-shadow:0 0 0 1px #ffffff14,0 -30px 80px -50px #f5a52466,0 30px 80px -50px #f5a52466}
.skp-band.is-light::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;border-radius:inherit;
  background:radial-gradient(60% 50% at 50% 0,#f5a5241a,transparent 70%),radial-gradient(#0b0b0e12 1px,transparent 1.2px) 0 0/22px 22px;
  -webkit-mask:linear-gradient(#000,transparent 55%);mask:linear-gradient(#000,transparent 55%)}
.skp-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.skp-head{display:flex;flex-direction:column;gap:18px;max-width:760px;margin-bottom:72px}
.skp-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.skp-over{font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffe0a3}
.is-light .skp-over{color:#a8670a}
.skp-head h2{margin:0;font:600 clamp(38px,5.2vw,68px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .skp-head h2{color:var(--skp-ink)}
.skp-head p{margin:0;max-width:600px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .skp-head p{color:rgba(11,11,14,.62)}
.skp-src{margin:28px 0 0;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.is-light .skp-src{color:rgba(11,11,14,.45)}
/* a number with its source on hover */
.skp-num{position:relative;display:inline-flex;align-items:baseline;gap:8px;cursor:help;border-radius:6px}
.skp-num::after{content:attr(data-src);position:absolute;left:0;bottom:calc(100% + 10px);z-index:20;width:max-content;max-width:300px;padding:9px 11px;border-radius:10px;
  background:#0a0b0f;color:#eeebe4;box-shadow:0 0 0 1px #f5a52459,0 14px 30px -12px #000;font:500 10.5px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:.02em;text-transform:none;white-space:normal;text-align:left;
  opacity:0;transform:translateY(4px);pointer-events:none;transition:opacity .25s,transform .35s cubic-bezier(.19,1,.22,1)}
.skp-num:hover::after,.skp-num:focus-visible::after{opacity:1;transform:none}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix */
@property --skp-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes skp-ang{to{--skp-ang:360deg}}
.skp-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.skp-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:2;
  background:conic-gradient(from var(--skp-ang),#FF6A1A,#FFC24B,#fff3d6 18%,#f5a524 30%,#FF6A1A 46%,#FF6A1A 56%,#f5a524 72%,#FF6A1A);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:skp-ang 5s linear infinite;animation-play-state:paused}
.skp-neon:hover,.skp-neon:focus-visible,.skp-neon:focus-within{box-shadow:0 0 30px -10px #f5a52499;transform:translateY(-3px)}
.skp-neon:hover::before,.skp-neon:focus-visible::before,.skp-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.skp-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.skp-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #f5a52499)}
.skp-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#f5a5241c,#FF6A1A0a 55%,transparent 80%)}
.skp-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#f5a52599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:skp-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes skp-spark{to{background-position:130% 0,0 0}}
.skp-band:not([data-live]) .skp-rail>i>span{animation-play-state:paused}
@media (max-width:767px){.skp-band{padding:96px 0}.skp-band.is-light{margin:0 8px;border-radius:28px;padding:84px 0}.skp-band.is-light .skp-wrap{padding:0 14px}.skp-wrap{padding:0 16px}.skp-head{margin-bottom:44px;gap:14px}.skp-head p{font-size:15.5px}.skp-rail{left:16px;right:16px}
  .skp-num::after{max-width:240px}}
@media (prefers-reduced-motion:reduce){.skp-neon::before,.skp-rail>i>span{animation:none}.skp *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
