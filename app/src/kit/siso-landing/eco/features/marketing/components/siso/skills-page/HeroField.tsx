// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/skills-page/HeroField.tsx)
'use client';

import { memo } from 'react';
import HUB from '../../../data/skills-hub.json';
import { SkillsHubMark } from '../home-products/skills-hub/SkillsHubIcon';

// The hero's signature (Shaan, 8 Oct: "the heroes ... don't have cool black holes or something interesting on it"): the
// Skills Hub as an amber black hole on the beam's own column, so the beam falls through it onto the demo. A tilted accretion
// disk turns, three orbits carry one mote per skill (52, from skills-hub.json, split by shelf), and motes spiral into the
// hub's mark and vanish. Everything is CSS transform and opacity, paused while the hero is off screen or the tab is hidden
// ([data-live] on .skp-hero), and still under reduced motion. Memoised: the hero re-renders as the demo plays; this never does.
const CATS = (Object.entries(HUB.categories) as [string, number][]).sort((a, b) => b[1] - a[1]);
const SHADE = ['#f5a524', '#ffc24b', '#e0921a', '#ffe0a3', '#c27a0c', '#FF6A1A', '#fff3d6', '#9c5f08'];
// Each mote is a skill: its shelf picks its orbit (big shelves outside) and its colour; its place on the shelf spaces it out.
const ORBITS = [0, 1, 2].map(o => CATS.filter((_, i) => i % 3 === o).flatMap(([c, n]) => Array.from({ length: n }, () => SHADE[CATS.findIndex(x => x[0] === c)])));
const FALL = Array.from({ length: 9 }, (_, i) => ({ a: (i * 137.5) % 360, d: i * 0.71 }));

const CSS = `
.skf{position:absolute;z-index:1;top:var(--fy,430px);left:var(--fx,74%);width:var(--fs,560px);aspect-ratio:1;transform:translate(-50%,-50%);pointer-events:none}
.skf span,.skf i,.skf b,.skf div{position:absolute;box-sizing:border-box}.skf-mark svg{display:block}
.skf-glow{inset:-20%;border-radius:50%;background:radial-gradient(closest-side,#f5a52440,#FF6A1A14 45%,transparent 72%);animation:skf-breathe 6s ease-in-out infinite}
@keyframes skf-breathe{50%{opacity:.6;transform:scale(1.06)}}
.skf-tilt{inset:0;transform:rotate(-16deg) scaleY(.36)}
.skf-disk{inset:10%;border-radius:50%;animation:skf-spin 14s linear infinite;
  background:conic-gradient(from 0deg,transparent,#FF6A1A66 8%,#ffe0a3 16%,#f5a524aa 24%,transparent 38%,transparent 50%,#FF6A1A55 60%,#fff3d6cc 68%,#f5a52488 76%,transparent 90%);
  -webkit-mask:radial-gradient(closest-side,transparent 52%,#000 58%,#000 82%,transparent 100%);mask:radial-gradient(closest-side,transparent 52%,#000 58%,#000 82%,transparent 100%);filter:blur(1.5px)}
.skf-orbit{border-radius:50%;box-shadow:inset 0 0 0 1px #f5a5241f}
.skf-orbit>i{inset:0;animation:skf-spin var(--t) linear infinite}
.skf-orbit b{left:50%;top:50%;width:5px;height:5px;margin:-2.5px;border-radius:50%;background:var(--c);box-shadow:0 0 8px var(--c);transform:rotate(var(--a)) translateX(var(--r))}
@keyframes skf-spin{to{transform:rotate(360deg)}}
.skf-fall{left:50%;top:50%;width:0;height:0;transform:rotate(var(--a))}
.skf-fall i{left:-3px;top:-3px;width:6px;height:6px;border-radius:50%;background:#fff3d6;box-shadow:0 0 10px #f5a524,0 0 3px #fff;
  animation:skf-in 6.4s cubic-bezier(.55,0,.9,.6) infinite;animation-delay:var(--d)}
@keyframes skf-in{0%{opacity:0;transform:rotate(0) translateX(calc(var(--fs,560px) * .5)) scale(1)}15%{opacity:1}
  85%{opacity:1}100%{opacity:0;transform:rotate(300deg) translateX(0) scale(.15)}}
.skf-hole{left:50%;top:50%;width:26%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(closest-side,#000 62%,#0a0602 78%,transparent);
  box-shadow:0 0 0 1.5px #ffe0a3cc,0 0 26px 4px #f5a524aa,0 0 90px 16px #FF6A1A44}
.skf-ring{left:50%;top:50%;width:26%;aspect-ratio:1;margin:-13%;border-radius:50%;box-shadow:0 0 0 1px #ffe0a3;opacity:0;animation:skf-ring 4.2s cubic-bezier(.19,1,.22,1) infinite}
.skf-ring.r2{animation-delay:2.1s}
@keyframes skf-ring{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(2.6)}}
.skf-mark{left:50%;top:50%;transform:translate(-50%,-50%);filter:drop-shadow(0 0 22px #f5a524cc);animation:skf-float 5s ease-in-out infinite}
@keyframes skf-float{50%{transform:translate(-50%,-56%)}}
.skp-hero:not([data-live]) .skf *{animation-play-state:paused!important}
@media (max-width:991px){.skf{--fs:420px;--fy:300px;opacity:.75}}
@media (max-width:767px){.skf{--fs:280px;--fy:96px;--fx:94%;opacity:.6}.skf-mark svg{width:44px;height:44px}}
@media (prefers-reduced-motion:reduce){.skf *{animation:none!important}}
`;

function HeroField({ x }: { x: number }) {
  return (
    <div className="skf" style={{ ['--fx' as string]: `${(0.5 + x) * 100}%` }} aria-hidden="true">
      <style>{CSS}</style>
      <span className="skf-glow" />
      <div className="skf-tilt">
        <span className="skf-disk" />
        {ORBITS.map((motes, o) => {
          const inset = 4 + o * 12;
          return <span key={o} className="skf-orbit" style={{ inset: `${inset}%` }}>
            <i style={{ ['--t' as string]: `${26 + o * 9}s`, animationDirection: o === 1 ? 'reverse' : undefined }}>
              {motes.map((c, i) => <b key={i} style={{ ['--c' as string]: c, ['--a' as string]: `${(i / motes.length) * 360}deg`, ['--r' as string]: `calc(var(--fs,560px) * ${(50 - inset) / 100})` }} />)}
            </i>
          </span>;
        })}
      </div>
      {FALL.map(f => <span key={f.a} className="skf-fall" style={{ ['--a' as string]: `${f.a}deg` }}><i style={{ ['--d' as string]: `${-f.d}s` }} /></span>)}
      <span className="skf-hole" />
      <span className="skf-ring" /><span className="skf-ring r2" />
      <span className="skf-mark"><SkillsHubMark size={64} /></span>
    </div>
  );
}

export default memo(HeroField);
