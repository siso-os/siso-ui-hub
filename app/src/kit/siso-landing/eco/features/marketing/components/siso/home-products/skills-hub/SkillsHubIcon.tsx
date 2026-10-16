// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-products/skills-hub/SkillsHubIcon.tsx)
'use client';

import { useId } from 'react';

// The Skills Hub's own icon, in amber. Pure CSS 3D, no video, built the way AgentBaseIcon is:
// - an isometric glass core (orthographic: rotateX + rotateZ, no perspective), its thickness drawn with stacked shadows and a
//   conic halo running round its edge;
// - four skill cartridges stacked above it on translateZ, each a thin amber card with its own edge;
// - the top cartridge lifts out and slots back into the core on a loop, and the core flashes as it lands;
// - `hot` (pointer on the card) fans the stack open and speeds the halo. `live` pauses everything off screen.
// Depth comes from translateZ only, never opacity: opacity below 1 flattens a preserve-3d subtree.
const CSS = `
@property --shi-ang{syntax:'<angle>';inherits:false;initial-value:0deg}
.shi{position:absolute;right:-92px;bottom:-178px;width:320px;height:232px;pointer-events:none;z-index:1;transform:scale(1.3);transform-origin:100% 100%}
.shi-floor{position:absolute;left:50%;bottom:14px;width:300px;height:70px;margin-left:-150px;border-radius:50%;
  background:radial-gradient(closest-side,#f5a524 0%,#f5a52466 45%,transparent 100%);filter:blur(16px);opacity:.55;
  animation:shi-breathe 6s ease-in-out infinite;transition:opacity .6s}
.shi-float{position:absolute;left:50%;top:40px;width:160px;height:160px;margin-left:-80px;animation:shi-float 6s ease-in-out infinite}
.shi-lift{position:absolute;inset:0;transition:transform .8s cubic-bezier(.19,1,.22,1)}
.shi-iso{position:absolute;inset:0;transform:rotateX(56deg) rotateZ(-45deg);transform-style:preserve-3d}
.shi-core{position:absolute;inset:0;border-radius:38px;background:#1c1102;
  box-shadow:-1px 1px 0 #ffd27a,-2px 2px 0 #d98e14,-3px 3px 0 #b97a10,-4px 4px 0 #9c670d,-5px 5px 0 #84570b,-6px 6px 0 #714a09,
    -7px 7px 0 #603f08,-8px 8px 0 #523607,-9px 9px 0 #462e06,-10px 10px 0 #3b2705,-11px 11px 0 #322104,-12px 12px 0 #2a1c03,
    -20px 20px 40px #000,-32px 32px 70px #f5a52440}
.shi-face{position:absolute;inset:0;border-radius:38px;overflow:hidden;
  background:radial-gradient(48% 48% at 50% 50%,#f5a52480,transparent 72%),linear-gradient(135deg,#4a2e0600 0%,#4a2e06 22%,#1f1302 60%,#0d0801 100%);
  box-shadow:inset 0 0 0 1px #ffe0a340,inset 10px -10px 28px #ffffff0f,inset -10px 10px 30px #00000080}
/* The flash scales and brightens through opacity over a fixed blur, so it runs on the compositor: animating the filter itself
   re-rastered the glow every frame (measured 9 Oct). The gradient is a touch hotter so full opacity reads as the old brightness(1.6). */
.shi-face::before{content:'';position:absolute;inset:26%;border-radius:22%;background:radial-gradient(closest-side,#fff0c8,#ffc24bcc 45%,transparent);filter:blur(5px);
  opacity:.55;transform:scale(.85);animation:shi-flash 4.8s cubic-bezier(.19,1,.22,1) infinite}
.shi-face::after{content:'';position:absolute;inset:-60%;background:linear-gradient(115deg,transparent 42%,#ffffff12 48%,#ffffff2e 50%,transparent 56%);
  animation:shi-sweep 7s cubic-bezier(.45,0,.2,1) infinite}
.shi-rim{position:absolute;inset:-2px;border-radius:40px;padding:2px;
  background:conic-gradient(from var(--shi-ang),#f5a524,#ffe0a3 12%,#FF6A1A 24%,#f5a52400 40%,#f5a52400 58%,#f5a524 78%,#fff3d6 88%,#f5a524);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;
  animation:shi-ang 6s linear infinite}
.shi-cards{position:absolute;inset:24%;transform-style:preserve-3d}
.shi-card{position:absolute;inset:0;transform-style:preserve-3d;
  transform:translateZ(calc(var(--i) * 8px + 12px)) rotateZ(0deg);transition:transform .8s cubic-bezier(.19,1,.22,1)}
.shi-slot{position:absolute;inset:0;border-radius:14px;
  background:linear-gradient(135deg,#ffe0a3 0%,#f5a524 38%,#c27a0c 100%);
  box-shadow:-1px 1px 0 #a8670a,-2px 2px 0 #7d4c06,-3px 3px 0 #5a3704,0 0 0 1px #fff3d680,-10px 10px 22px #0008}
.shi-card:nth-child(2) .shi-slot{background:linear-gradient(135deg,#ffd27a 0%,#e0921a 45%,#9c5f08 100%)}
.shi-card:nth-child(3) .shi-slot{background:linear-gradient(135deg,#f5b84a 0%,#c27a0c 50%,#7d4c06 100%)}
.shi-card:nth-child(4) .shi-slot{background:linear-gradient(135deg,#fff3d6 0%,#ffc24b 35%,#f5a524 70%,#c27a0c 100%);animation:shi-slot 4.8s cubic-bezier(.65,0,.35,1) infinite}
.shi-slot i{position:absolute;left:18%;height:5px;border-radius:3px;background:#2a1a02;opacity:.55}
.shi-slot i:nth-child(1){top:22%;width:40%;opacity:.8}.shi-slot i:nth-child(2){top:44%;width:62%}.shi-slot i:nth-child(3){top:62%;width:48%}
.shi-slot b{position:absolute;right:14%;bottom:14%;width:16px;height:16px;border-radius:50%;background:#2a1a02;box-shadow:inset 0 0 0 3px #ffe0a3}
.shi[data-live] .shi-cards{animation:shi-rise 1.4s cubic-bezier(.19,1,.22,1) both}
.shi[data-hot] .shi-lift{transform:translateY(-8px)}
.shi[data-hot] .shi-rim{animation-duration:2.4s}
.shi[data-hot] .shi-floor{opacity:.9}
.shi[data-hot] .shi-card{transform:translateZ(calc(var(--i) * 15px + 14px)) rotateZ(calc(var(--i) * -10deg))}
.shi:not([data-live]) *,.shi:not([data-live]) *::before,.shi:not([data-live]) *::after{animation-play-state:paused!important}
@keyframes shi-ang{to{--shi-ang:360deg}}
@keyframes shi-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes shi-breathe{0%,100%{opacity:.5}50%{opacity:.72}}
@keyframes shi-sweep{0%,30%{transform:translateX(-40%)}70%,100%{transform:translateX(40%)}}
@keyframes shi-rise{from{transform:translateZ(-80px)}to{transform:none}}
@keyframes shi-slot{0%,20%{transform:none}45%,55%{transform:translateZ(28px)}80%,100%{transform:none}}
@keyframes shi-flash{0%,78%{transform:scale(.85);opacity:.55}84%{transform:scale(1.12);opacity:1}100%{transform:scale(.85);opacity:.55}}
@media (max-width:991px){.shi{left:auto;right:-70px;top:-18px;bottom:auto;margin:0;transform:scale(.62);transform-origin:100% 0}}
@media (prefers-reduced-motion:reduce){.shi *,.shi *::before,.shi *::after{animation:none!important;transition:none!important}}
`;

export default function SkillsHubIcon({ live, hot }: { live: boolean; hot: boolean }) {
  return (
    <div className="shi" data-live={live || undefined} data-hot={hot || undefined} aria-hidden="true">
      <style>{CSS}</style>
      <div className="shi-floor" />
      <div className="shi-float"><div className="shi-lift"><div className="shi-iso">
        <div className="shi-core" />
        <div className="shi-face" />
        <div className="shi-rim" />
        <div className="shi-cards">
          {[0, 1, 2, 3].map(i => <div key={i} className="shi-card" style={{ ['--i' as string]: i }}>
            <div className="shi-slot"><i /><i /><i /><b /></div>
          </div>)}
        </div>
      </div></div></div>
    </div>
  );
}

/** The flat mark: an amber glass tile with three skill cards fanned on it. For crumbs and the stack diagram. */
export function SkillsHubMark({ size = 20 }: { size?: number }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" style={{ display: 'block', flex: 'none' }}>
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a1a02" /><stop offset=".7" stopColor="#f5a524" /><stop offset="1" stopColor="#2a1a02" /></linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff3d6" /><stop offset="1" stopColor="#ffc24b" /></linearGradient>
      </defs>
      <rect x="1" y="1" width="38" height="38" rx="10" fill={`url(#${id}t)`} />
      <rect x="1.5" y="1.5" width="37" height="37" rx="9.5" fill="none" stroke="#ffe0a3" strokeOpacity=".45" />
      <rect x="10" y="12" width="15" height="19" rx="3" fill="#2a1a02" fillOpacity=".55" transform="rotate(-14 17 22)" />
      <rect x="13" y="10" width="15" height="19" rx="3" fill="#ffe0a3" fillOpacity=".7" transform="rotate(-4 20 20)" />
      <rect x="16" y="9" width="15" height="19" rx="3" fill={`url(#${id}c)`} transform="rotate(8 23 18)" />
      <path d="M20 14.5h7M20 18h5" stroke="#2a1a02" strokeWidth="1.6" strokeLinecap="round" transform="rotate(8 23 18)" />
    </svg>
  );
}
