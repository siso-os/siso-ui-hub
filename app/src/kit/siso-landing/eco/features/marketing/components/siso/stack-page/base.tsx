// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/stack-page/base.tsx)
'use client';

import { createContext, useContext, useEffect, useState, type ReactNode, type RefObject } from 'react';
import DATA from './stack.json';

// The stack page's shared frame (spec: docs/specs/flex-pages.md, lane stack-page), built from the Agent Base page's
// (agent-base-page/base.tsx): dark bands and light bands as rounded panels, the footer's neon rim and rail partition copied
// under our own prefix (UI standard §2), and one hook that tells a section whether it may animate. Everything shown is read
// from stack.json, where each item keeps its `source`.

export type ProductKey = keyof typeof DATA.products;
export type StackItem = {
  name: string; repo: string; url: string; took: string; used: ProductKey[]; source: string;
  logo?: string; licence?: string; feature?: boolean; n?: number; unit?: string;
};
export type StackGroup = { key: string; label: string; title: string; line: string; hue: string; tint: string; items: StackItem[] };

export const PRODUCTS = DATA.products as Record<ProductKey, { name: string; color: string; pale: string; href: string }>;
export const PRODUCT_KEYS = Object.keys(PRODUCTS) as ProductKey[];
export const GROUPS = DATA.groups as StackGroup[];
export const ITEMS = GROUPS.flatMap(g => g.items);
export const UPDATED = DATA.updated;
export const SRC = 'siso/stack-page/stack.json: each item names where it is written down in this repo';

/** Counted from stack.json itself, so they can't drift from what the page shows. */
export const COUNTS = {
  items: ITEMS.length,
  groups: GROUPS.length,
  licensed: ITEMS.filter(i => i.licence).length,
  products: PRODUCT_KEYS.filter(k => k !== 'site').length,
};
export const usesOf = (p: ProductKey) => ITEMS.filter(i => i.used.includes(p));

/** The product picked in the hero (or in "who uses what"): cards that don't use it step back. */
export const PickCtx = createContext<{ pick: ProductKey | null; setPick: (p: ProductKey | null) => void }>({ pick: null, setPick: () => {} });
export const usePick = () => useContext(PickCtx);
/** Props for anything that should step back when a product it doesn't use is picked. */
export const hitProps = (used: ProductKey[], pick: ProductKey | null) => ({ 'data-uses': '', 'data-hit': !pick || used.includes(pick) ? '' : undefined });

/** `live` while the element is on screen, the tab is visible and the visitor allows motion. */
export function useLive(ref: RefObject<Element | null>, amount = 0.2) {
  const [inView, setInView] = useState(false);
  const [ok, setOk] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { setInView(e.isIntersecting); if (e.isIntersecting) setSeen(true); }, { threshold: amount });
    io.observe(el);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setOk(!media.matches && !document.hidden);
    sync();
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => { io.disconnect(); media.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync); };
  }, [ref, amount]);
  // `seen` latches: numbers that rose in stay in after you scroll past.
  return { inView: seen, live: inView && ok };
}

/** Overline, big headline and a short line: Foreplay's section head. */
export function Head({ over, title, line, id, center = false }: { over: ReactNode; title: ReactNode; line?: ReactNode; id?: string; center?: boolean }) {
  return (
    <header className={center ? 'stk-head is-center' : 'stk-head'}>
      <span className="stk-over">{over}</span>
      <h2 id={id}>{title}</h2>
      {line && <p>{line}</p>}
    </header>
  );
}

export function Rail() {
  return <div className="stk-rail" aria-hidden="true"><i><span /></i></div>;
}

const NOTCH = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='12'%3E%3Cpath d='M0 .5H40l10 10h160l10-10h40' fill='none' stroke='%23000'/%3E%3C/svg%3E")`;

const CSS = `
.stk{--stk-bg:#00030a;--stk-raised:#0a0b0f;--stk-line:#ffffff14;--stk-line2:#ffffff1f;--stk-paper:#eeebe4;--stk-ink:#0b0b0e;
  background:var(--stk-bg);color:#fff;font-family:Inter,sans-serif;overflow-x:clip}
.stk *,.stk *::before,.stk *::after{box-sizing:border-box}
.stk a{text-decoration:none;color:inherit}
.stk a:focus-visible,.stk button:focus-visible{outline:2px solid #ffd59a;outline-offset:3px}
.stk-hero button,.stk-band button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
.stk-band{position:relative;padding:140px 0}
.stk-band.is-light{margin:0 16px;border-radius:40px;background:var(--stk-paper);color:var(--stk-ink);box-shadow:0 0 0 1px #ffffff1f,0 40px 120px -60px #ff6a1a66}
.stk-wrap{position:relative;max-width:1216px;margin:0 auto;padding:0 40px}
.stk-head{display:flex;flex-direction:column;gap:18px;max-width:760px}
.stk-head.is-center{align-items:center;text-align:center;margin-left:auto;margin-right:auto}
.stk-over{display:inline-flex;align-items:center;gap:10px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffd59a}
.is-light .stk-over{color:#c2541a}
.stk-head h2{margin:0;font:600 clamp(36px,5vw,64px)/1.02 'Inter Display',Inter,sans-serif;letter-spacing:-.045em;color:#fff;text-wrap:balance}
.is-light .stk-head h2{color:var(--stk-ink)}
.stk-head p{margin:0;max-width:600px;font:400 17px/1.65 Inter,sans-serif;color:rgba(255,255,255,.6);text-wrap:pretty}
.is-light .stk-head p{color:rgba(11,11,14,.62)}
.stk-src{margin:32px 0 0;font:500 10.5px/1.6 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em;color:rgba(255,255,255,.4)}
.is-light .stk-src{color:rgba(11,11,14,.45)}
/* the footer's neon rim (Footer/index.tsx .sf-neon), copied under our prefix; --c tints it to the item's product */
@property --stk-ang{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes stk-ang{to{--stk-ang:360deg}}
.stk-neon{position:relative;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1),opacity .4s}
.stk-neon::before{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;z-index:3;
  background:conic-gradient(from var(--stk-ang),var(--c,#FF6A1A),#FFC24B,#fff3d6 18%,var(--c,#FF2D55) 30%,#FF6A1A 46%,var(--c,#FF6A1A) 56%,#FF2D55 72%,var(--c,#FF6A1A));
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:stk-ang 5s linear infinite;animation-play-state:paused}
.stk-neon:hover,.stk-neon:focus-within{box-shadow:0 0 34px -10px var(--c,#FF6A1A);transform:translateY(-3px)}
.stk-neon:hover::before,.stk-neon:focus-within::before{opacity:1;animation-play-state:running}
/* the footer's rail partition (Footer/Lights.tsx Rail) */
.stk-rail{position:absolute;left:40px;right:40px;top:0;height:12px;max-width:1136px;margin:0 auto}
.stk-rail>i{position:absolute;inset:0;filter:drop-shadow(0 0 5px #FF6A1A99)}
.stk-rail::after{content:"";position:absolute;left:50%;top:0;width:min(640px,90%);height:110px;transform:translateX(-50%);pointer-events:none;
  background:radial-gradient(50% 55% at 50% 0,#FF6A1A1c,#FF2D550a 55%,transparent 80%)}
.stk-rail>i>span{position:absolute;inset:0;
  background:linear-gradient(90deg,transparent,#fff7e8,transparent) -30% 0/16% 100% no-repeat,
    linear-gradient(90deg,transparent,#FF6A1A40 16%,#FFC24B99 38%,#fff3d6 50%,#FF2D5599 62%,#FF6A1A40 84%,transparent);
  -webkit-mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  mask:linear-gradient(#000 0 0) left top/calc(50% - 130px) 1px no-repeat,linear-gradient(#000 0 0) right top/calc(50% - 130px) 1px no-repeat,${NOTCH} center top/260px 12px no-repeat;
  animation:stk-spark 7s cubic-bezier(.45,0,.55,1) infinite}
@keyframes stk-spark{to{background-position:130% 0,0 0}}
.stk-band:not([data-live]) .stk-rail>i>span{animation-play-state:paused}
/* product picker: everything that doesn't use the picked product steps back (opacity only, so nothing moves) */
.stk[data-pick] [data-uses]:not([data-hit]){opacity:.22;filter:saturate(.3)}
.stk-chip{display:inline-flex;align-items:center;gap:7px;height:26px;padding:0 10px 0 8px;border-radius:8px;background:#ffffff0a;box-shadow:inset 0 0 0 1px #ffffff17;
  font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.04em;color:rgba(255,255,255,.75);white-space:nowrap;
  transition:box-shadow .3s,background .3s,color .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.stk-chip i{width:7px;height:7px;border-radius:50%;background:var(--pc);box-shadow:0 0 8px var(--pc)}
.stk-chip:hover,.stk-chip:focus-visible{color:#fff;background:color-mix(in srgb,var(--pc) 18%,transparent);box-shadow:inset 0 0 0 1px var(--pc);transform:translateY(-2px)}
@media (max-width:767px){.stk-band{padding:88px 0}.stk-band.is-light{margin:0 8px;border-radius:28px}.stk-wrap{padding:0 16px}.stk-head{gap:14px}.stk-head p{font-size:15.5px}.stk-rail{left:16px;right:16px}}
@media (prefers-reduced-motion:reduce){.stk-neon::before,.stk-rail>i>span{animation:none}.stk *{transition-duration:0s!important}}
`;

export function PageCss() {
  return <style>{CSS}</style>;
}
