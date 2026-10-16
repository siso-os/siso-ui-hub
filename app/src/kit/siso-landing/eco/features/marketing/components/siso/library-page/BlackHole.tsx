// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/library-page/BlackHole.tsx)
'use client';

import type { CSSProperties, ReactNode } from 'react';
import { SEARCHES } from '../home-products/library/libraryData';
import { LivingIcon } from '../living/living-assets';

// The hero's signature effect (Shaan, 9 Oct: the heroes need "cool black holes or something interesting"). The field falls into
// the library: a tilted accretion disk of points and real repo names from the rated bank (libraryData.ts SEARCHES) spiral in,
// shrink and fade into the library's living icon at the centre, behind a lensing ring. Transform and opacity only; every loop is
// CSS and pauses while the hero is off screen (`live`); reduced motion shows a still disk.
const H = (i: number, k: number) => (Math.imul(i + k, 2654435761) >>> 0) / 4294967296;
const DOTS = Array.from({ length: 64 }, (_, i) => ({
  a: Math.round(H(i, 3) * 360), r: Math.round(150 + H(i, 7) * 110), s: (0.6 + H(i, 11) * 1.6).toFixed(2),
  d: (5 + H(i, 13) * 5).toFixed(2), delay: (-H(i, 17) * 10).toFixed(2), hot: H(i, 19) > 0.8,
}));
const NAMES = SEARCHES.flatMap(s => s.rows.slice(0, 3).map(r => r.n.split('/')[1])).slice(0, 10);

// One palette per product. Library is the original purple: its CSS comes out exactly as it was written. Other heroes pass
// their own colours, labels and icon, under their own class prefix (UI Hub: Shaan, 9 Oct, "look at the hero, you've got
// something going through ... it'd be nice if the UI hub had something like that").
export type HoleTone = { a: string; b: string; c: string; deep: string; chip: string };
export const PURPLE: HoleTone = { a: '#a46bff', b: '#d2b6ff', c: '#7540b7', deep: '#0a0512', chip: '#14101c' };
const css = (k: string, t: HoleTone) => `
.${k}{position:absolute;z-index:1;top:96px;right:max(0px,calc(50% - 640px));width:560px;height:560px;pointer-events:none}
.${k}>*{position:absolute;left:50%;top:50%}
.${k}-glow{width:520px;height:520px;margin:-260px 0 0 -260px;border-radius:50%;background:radial-gradient(closest-side,${t.a}40,${t.c}1f 45%,transparent 72%);
  animation:${k}-breathe 6s ease-in-out infinite}
.${k}-disk{width:0;height:0;transform:rotate(-14deg) scaleY(.36)}
.${k}-disk>i{position:absolute;left:0;top:0;width:calc(var(--s)*1px + 2px);height:calc(var(--s)*1px + 2px);margin:-2px 0 0 -2px;border-radius:50%;background:${t.b};
  box-shadow:0 0 6px ${t.a};opacity:0;animation:${k}-fall calc(var(--d)*1s) cubic-bezier(.55,0,.75,.6) infinite;animation-delay:calc(var(--delay)*1s)}
.${k}-disk>i.hot{background:#fff3d6;box-shadow:0 0 10px ${t.b}}
@keyframes ${k}-fall{
  0%{opacity:0;transform:rotate(var(--a)) translateX(var(--r)) scale(1)}
  12%{opacity:.95}
  85%{opacity:.8}
  100%{opacity:0;transform:rotate(calc(var(--a) + 420deg)) translateX(18px) scale(.2)}}
.${k}-ring{width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;transform:rotate(-14deg) scaleY(.36)}
.${k}-ring::before{content:'';position:absolute;inset:0;border-radius:50%;
  background:conic-gradient(from 0deg,transparent,${t.a}cc 18%,#fff3d6 26%,${t.a}99 34%,transparent 50%,${t.c}99 70%,${t.b} 82%,transparent);
  -webkit-mask:radial-gradient(closest-side,transparent 86%,#000 88%,#000 96%,transparent 98%);mask:radial-gradient(closest-side,transparent 86%,#000 88%,#000 96%,transparent 98%);
  animation:${k}-spin 7s linear infinite}
.${k}-ring.r2{width:420px;height:420px;margin:-210px 0 0 -210px;opacity:.45}
.${k}-ring.r2::before{animation-duration:13s;animation-direction:reverse}
@keyframes ${k}-spin{to{transform:rotate(360deg)}}
.${k}-lens{width:200px;height:200px;margin:-100px 0 0 -100px;border-radius:50%;
  background:conic-gradient(from 90deg,${t.a}00,${t.b},${t.a}00 30%,${t.c}aa 55%,${t.a}00 70%,#fff3d6aa 88%,${t.a}00);
  -webkit-mask:radial-gradient(closest-side,transparent 80%,#000 84%,transparent 100%);mask:radial-gradient(closest-side,transparent 80%,#000 84%,transparent 100%);
  filter:blur(2px);animation:${k}-spin 5s linear infinite}
.${k}-core{width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;background:radial-gradient(closest-side,#000 70%,${t.deep} 88%,transparent);
  box-shadow:0 0 60px 6px ${t.c}99,inset 0 0 30px ${t.a}55;animation:${k}-pulse 4s ease-in-out infinite}
@keyframes ${k}-pulse{50%{transform:scale(1.05)}}
@keyframes ${k}-breathe{50%{transform:scale(1.08);opacity:.75}}
.${k}-icon{width:96px;height:96px;margin:-48px 0 0 -48px;display:grid;place-items:center;filter:drop-shadow(0 0 24px ${t.a})}
.${k}-labels>span{position:absolute;left:0;top:0;white-space:nowrap;padding:4px 8px;border-radius:7px;background:${t.chip}d9;box-shadow:inset 0 0 0 1px ${t.a}59;
  font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:${t.b};opacity:0;
  animation:${k}-pull calc(var(--d)*1s) cubic-bezier(.55,0,.75,.6) infinite;animation-delay:calc(var(--delay)*1s)}
@keyframes ${k}-pull{
  0%{opacity:0;transform:rotate(var(--a)) translateX(var(--r)) rotate(calc(var(--a)*-1)) translate(-50%,-50%) scale(1)}
  15%{opacity:1}
  70%{opacity:.85}
  100%{opacity:0;transform:rotate(calc(var(--a) + 240deg)) translateX(30px) rotate(calc((var(--a) + 240deg)*-1)) translate(-50%,-50%) scale(.3)}}
.${k}:not([data-live]) *,.${k}:not([data-live]) *::before{animation-play-state:paused!important}
@media (max-width:1180px){.${k}{right:-80px;opacity:.75}}
@media (max-width:991px){.${k}{top:40px;right:-170px;transform:scale(.7);transform-origin:100% 0;opacity:.55}.${k}-labels{display:none}}
@media (max-width:620px){.${k}{right:-190px;top:20px;transform:scale(.55);opacity:.45}}
@media (prefers-reduced-motion:reduce){
  .${k} *,.${k} *::before{animation:none!important}
  .${k}-disk>i{opacity:.7;transform:rotate(var(--a)) translateX(calc(var(--r)*.8))}
  .${k}-labels>span{opacity:.8;transform:rotate(var(--a)) translateX(var(--r)) rotate(calc(var(--a)*-1)) translate(-50%,-50%)}}
`;

export default function BlackHole({ live, k = 'glbh', tone = PURPLE, labels = NAMES, icon }:
  { live: boolean; k?: string; tone?: HoleTone; labels?: string[]; icon?: ReactNode }) {
  const LABELS = labels.map((n, i) => ({ n, a: Math.round((i * 360) / labels.length + H(i, 23) * 20), r: Math.round(210 + H(i, 29) * 40),
    d: (9 + H(i, 31) * 4).toFixed(2), delay: (-(i * 1.3)).toFixed(2) }));
  return (
    <div className={k} data-live={live || undefined} aria-hidden="true">
      <style>{css(k, tone)}</style>
      <span className={`${k}-glow`} />
      <span className={`${k}-ring r2`} />
      <span className={`${k}-disk`}>{DOTS.map((d, i) => <i key={i} className={d.hot ? 'hot' : undefined}
        style={{ '--a': `${d.a}deg`, '--r': `${d.r}px`, '--s': d.s, '--d': d.d, '--delay': d.delay } as CSSProperties} />)}</span>
      <span className={`${k}-core`} />
      <span className={`${k}-lens`} />
      <span className={`${k}-ring`} />
      <span className={`${k}-icon`}>{icon ?? <LivingIcon name="library" size={96} paused={!live} />}</span>
      <span className={`${k}-labels`}>{LABELS.map(l => <span key={l.n}
        style={{ '--a': `${l.a}deg`, '--r': `${l.r}px`, '--d': l.d, '--delay': l.delay } as CSSProperties}>{l.n}</span>)}</span>
    </div>
  );
}
