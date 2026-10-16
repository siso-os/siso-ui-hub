// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.glyphs.tsx)
'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// NavGlyph - the nav's own coded icons, in the family of the home cards' big icons (siso/ProductGlyph): a glass tile shaded
// from black into the item's colour, a white-rimmed glass object on it, a soft halo behind. Pointing at the row plays the
// object's gesture once (Shaan, 9 Oct: "it's worth getting an opus to redesign the icons"). These replace Foreplay's sprite
// sheets and its 24px resource icons. Products keep ProductGlyph and the living kit; this set covers everything else.
//   docs       the page lifts off its stack and its lines type in
//   changelog  a light runs down the timeline and each commit lights as it passes
//   industries the pin drops onto the map and a ring spreads from it
//   cafe       steam rises off the cup
//   contact    the letter slides up out of the envelope
//   merch      the hoodie swings on its hanger
//   claim      the site's badge pops and its tick draws itself
//   work       four ways in close on the middle, which lights
// ═══════════════════════════════════════════════════════════════════════════════

import { useId } from 'react';

export type NavGlyphName = 'docs' | 'changelog' | 'industries' | 'cafe' | 'contact' | 'merch' | 'claim' | 'work';

// One gesture, then rest: every animation runs once while data-on is true, and toggling it replays.
// Joins the bar's global styles (NavBar), so a glyph mounting in an opening panel adds no stylesheet of its own.
export const NAV_GLYPH_CSS = `
.ng{display:block;flex-shrink:0;overflow:visible}
.ng *{transform-box:fill-box;transform-origin:center}
.ng .ng-obj{transition:transform .5s cubic-bezier(.19,1,.22,1)}
.ng[data-on="true"] .ng-obj{transform:translateY(-3px) scale(1.04)}
.ng .ng-halo{opacity:.5;transition:opacity .5s ease}
.ng[data-on="true"] .ng-halo{opacity:1}
.ng[data-on="true"] .ng-back{animation:ng-fan .9s cubic-bezier(.19,1,.22,1) both}
@keyframes ng-fan{50%{transform:translate(8px,-6px) rotate(9deg)}}
.ng .ng-type{transform-origin:left center}
.ng[data-on="true"] .ng-type{animation:ng-type .8s steps(7) both}
.ng[data-on="true"] .ng-type.t2{animation-delay:.25s}
@keyframes ng-type{from{transform:scaleX(.15)}}
.ng[data-on="true"] .ng-code-l{animation:ng-code-l .7s cubic-bezier(.19,1,.22,1) both}
.ng[data-on="true"] .ng-code-r{animation:ng-code-r .7s cubic-bezier(.19,1,.22,1) both}
@keyframes ng-code-l{50%{transform:translateX(-4px)}}
@keyframes ng-code-r{50%{transform:translateX(4px)}}
.ng .ng-run{opacity:0}
.ng[data-on="true"] .ng-run{animation:ng-run 1.1s cubic-bezier(.45,0,.55,1) both}
@keyframes ng-run{0%{opacity:0;transform:translateY(0)}12%{opacity:1}88%{opacity:1}100%{opacity:0;transform:translateY(64px)}}
.ng[data-on="true"] .ng-node{animation:ng-node 1.1s ease both}
.ng[data-on="true"] .ng-node.n2{animation-delay:.32s}.ng[data-on="true"] .ng-node.n3{animation-delay:.64s}
@keyframes ng-node{0%,100%{fill:var(--ng-glass)}30%,70%{fill:#ffc24b;filter:drop-shadow(0 0 5px rgba(255,194,75,.9))}}
.ng[data-on="true"] .ng-pin{animation:ng-drop .8s cubic-bezier(.34,1.56,.64,1) both}
@keyframes ng-drop{0%{transform:translateY(-12px)}100%{transform:none}}
.ng .ng-ring{opacity:0}
.ng[data-on="true"] .ng-ring{animation:ng-ring 1s ease-out .3s both}
@keyframes ng-ring{0%{opacity:.9;transform:scale(.4)}100%{opacity:0;transform:scale(1.35)}}
.ng .ng-steam{opacity:.45}
.ng[data-on="true"] .ng-steam{animation:ng-steam 1.2s ease-out both}
.ng[data-on="true"] .ng-steam.s2{animation-delay:.18s}.ng[data-on="true"] .ng-steam.s3{animation-delay:.36s}
@keyframes ng-steam{0%{opacity:.45}40%{opacity:1;transform:translateY(-6px)}100%{opacity:.45;transform:none}}
.ng[data-on="true"] .ng-letter{animation:ng-letter 1s cubic-bezier(.19,1,.22,1) both}
@keyframes ng-letter{45%{transform:translateY(-16px)}}
.ng .ng-swing{transform-box:view-box;transform-origin:80px 34px}
.ng[data-on="true"] .ng-swing{animation:ng-swing 1.1s ease-in-out both}
@keyframes ng-swing{20%{transform:rotate(7deg)}50%{transform:rotate(-5deg)}75%{transform:rotate(2deg)}}
.ng[data-on="true"] .ng-badge{animation:ng-pop .6s cubic-bezier(.34,1.56,.64,1) both}
@keyframes ng-pop{0%{transform:scale(.7)}100%{transform:none}}
.ng .ng-tick{stroke-dasharray:1;stroke-dashoffset:0}
.ng[data-on="true"] .ng-tick{animation:ng-draw .5s ease-out .2s both}
@keyframes ng-draw{from{stroke-dashoffset:1}}
.ng[data-on="true"] .ng-in.a1{animation:ng-in-a1 .9s cubic-bezier(.19,1,.22,1) both}
.ng[data-on="true"] .ng-in.a2{animation:ng-in-a2 .9s cubic-bezier(.19,1,.22,1) .06s both}
.ng[data-on="true"] .ng-in.a3{animation:ng-in-a3 .9s cubic-bezier(.19,1,.22,1) .12s both}
.ng[data-on="true"] .ng-in.a4{animation:ng-in-a4 .9s cubic-bezier(.19,1,.22,1) .18s both}
@keyframes ng-in-a1{50%{transform:translateY(7px)}}
@keyframes ng-in-a2{50%{transform:translateX(-7px)}}
@keyframes ng-in-a3{50%{transform:translateY(-7px)}}
@keyframes ng-in-a4{50%{transform:translateX(7px)}}
.ng .ng-lit{transition:fill .45s ease .3s,filter .45s ease .3s}
.ng[data-on="true"] .ng-lit{fill:#ffc24b;filter:drop-shadow(0 0 6px rgba(255,194,75,.9))}
@media (prefers-reduced-motion:reduce){.ng *{transition:none!important;animation:none!important}}
`;

// The tile runs from near-black at the top into the item's colour at the bottom, like ProductGlyph's TILE.
function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v * k));
  return `#${c.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}
function tint(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (255 - v) * 0.62));
  return `#${c.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

type Part = { g: string; t: string; id: string };
const rim = { stroke: 'rgba(255,255,255,.9)', strokeWidth: 1.6, strokeLinejoin: 'round' as const };

function Docs({ g, t }: Part) {
  return <>
    <rect className="ng-back" x="52" y="34" width="64" height="84" rx="9" fill={g} {...rim} opacity=".55" transform="rotate(6 84 76)" />
    <rect x="42" y="42" width="66" height="84" rx="10" fill={g} {...rim} />
    <path className="ng-code-l" d="M64 70 l-9 9 9 9" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path className="ng-code-r" d="M86 70 l9 9 -9 9" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M79 66 L71 92" stroke={t} strokeWidth="3" strokeLinecap="round" />
    <rect className="ng-type" x="54" y="104" width="42" height="4" rx="2" fill="#fff" opacity=".8" />
    <rect className="ng-type t2" x="54" y="113" width="28" height="4" rx="2" fill={t} opacity=".85" />
  </>;
}

function Changelog({ g, t }: Part) {
  return <>
    <path d="M58 38 V122" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeLinecap="round" />
    {[[50, ''], [80, 'n2'], [110, 'n3']].map(([y, c]) => (
      <circle key={y} className={`ng-node ${c}`} cx="58" cy={y as number} r="7" fill={g} {...rim} />
    ))}
    <rect x="74" y="44" width="48" height="12" rx="6" fill={g} {...rim} />
    <rect x="74" y="74" width="36" height="12" rx="6" fill={g} {...rim} />
    <rect x="74" y="104" width="42" height="12" rx="6" fill={g} {...rim} />
    <rect x="80" y="48.5" width="22" height="3" rx="1.5" fill={t} />
    <circle className="ng-run" cx="58" cy="46" r="4" fill="#fff" />
  </>;
}

function Industries({ g, t }: Part) {
  return <>
    <ellipse cx="80" cy="116" rx="40" ry="10" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="1.4" />
    {[[48, 114], [62, 122], [100, 122], [113, 113], [70, 108], [95, 108]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill={t} opacity=".85" />)}
    <ellipse className="ng-ring" cx="80" cy="116" rx="22" ry="6" fill="none" stroke="#fff" strokeWidth="2" />
    <g className="ng-pin">
      <path d="M80 34 c-16 0 -27 12 -27 26 c0 19 27 46 27 46 s27 -27 27 -46 c0 -14 -11 -26 -27 -26 z" fill={g} {...rim} />
      <circle cx="80" cy="60" r="9" fill="#fff" opacity=".92" />
    </g>
  </>;
}

function Cafe({ g, t }: Part) {
  return <>
    {[[64, ''], [80, 's2'], [96, 's3']].map(([x, c]) => (
      <path key={x} className={`ng-steam ${c}`} d={`M${x} 64 q-6 -7 0 -14 q6 -7 0 -14`} fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
    ))}
    <path d="M44 72 H108 V94 a24 24 0 0 1 -24 24 H68 a24 24 0 0 1 -24 -24 Z" fill={g} {...rim} />
    <path d="M108 78 h5 a11 11 0 0 1 0 22 h-8" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="3" strokeLinecap="round" />
    <path d="M52 80 H100" stroke={t} strokeWidth="3" strokeLinecap="round" opacity=".9" />
    <path d="M38 126 H114" stroke="#fff" strokeOpacity=".85" strokeWidth="3" strokeLinecap="round" />
  </>;
}

function Contact({ g, t }: Part) {
  return <>
    <rect x="34" y="60" width="92" height="62" rx="9" fill={g} {...rim} opacity=".7" />
    <g className="ng-letter">
      <rect x="46" y="48" width="68" height="56" rx="5" fill="#fff" opacity=".9" />
      <rect x="54" y="58" width="34" height="4" rx="2" fill={t} />
      <rect x="54" y="67" width="48" height="3" rx="1.5" fill="#000" opacity=".25" />
      <rect x="54" y="74" width="40" height="3" rx="1.5" fill="#000" opacity=".25" />
    </g>
    <path d="M34 72 L80 100 L126 72 V113 a9 9 0 0 1 -9 9 H43 a9 9 0 0 1 -9 -9 Z" fill={g} {...rim} />
    <path d="M38 118 L68 94 M122 118 L92 94" stroke="#fff" strokeOpacity=".45" strokeWidth="1.4" strokeLinecap="round" />
  </>;
}

function Merch({ g, t }: Part) {
  return <>
    <path d="M80 26 a6 6 0 1 1 6 6 q-6 1 -6 6" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2.4" strokeLinecap="round" />
    <g className="ng-swing">
      <path d="M62 42 q18 -6 36 0 l26 14 -10 24 -12 -6 V128 H58 V74 l-12 6 -10 -24 Z" fill={g} {...rim} />
      <path d="M64 44 q16 22 32 0" fill="none" stroke="#fff" strokeOpacity=".85" strokeWidth="2" />
      <path d="M76 54 v12 M84 54 v12" stroke={t} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M66 100 H94 V112 a4 4 0 0 1 -4 4 H70 a4 4 0 0 1 -4 -4 Z" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.6" />
    </g>
  </>;
}

function Claim({ g, t }: Part) {
  return <>
    <rect x="30" y="40" width="100" height="80" rx="11" fill={g} {...rim} />
    <path d="M30 58 H130" stroke="#fff" strokeOpacity=".45" strokeWidth="1.2" />
    {[41, 49, 57].map(x => <circle key={x} cx={x} cy="49" r="2.4" fill="#fff" opacity=".85" />)}
    <rect x="66" y="45.5" width="52" height="7" rx="3.5" fill="#fff" opacity=".25" />
    <rect x="42" y="72" width="30" height="5" rx="2.5" fill="#fff" opacity=".75" />
    <rect x="42" y="83" width="22" height="4" rx="2" fill="#fff" opacity=".4" />
    <rect x="42" y="100" width="26" height="9" rx="4.5" fill={t} opacity=".9" />
    <g className="ng-badge">
      <circle cx="102" cy="92" r="17" fill={t} stroke="#fff" strokeWidth="1.6" />
      <path className="ng-tick" pathLength="1" d="M94 92 l6 6 11 -12" fill="none" stroke="#0a0b0f" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </>;
}

function Work({ g, t }: Part) {
  const a = { fill: 'none', stroke: '#fff', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return <>
    <rect className="ng-lit" x="64" y="64" width="32" height="32" rx="8" fill={g} {...rim} />
    <circle cx="80" cy="80" r="4" fill={t} />
    <g className="ng-in a1"><path d="M80 30 V52" {...a} /><path d="M72 45 l8 8 8 -8" {...a} /></g>
    <g className="ng-in a2"><path d="M130 80 H108" {...a} /><path d="M115 72 l-8 8 8 8" {...a} /></g>
    <g className="ng-in a3"><path d="M80 130 V108" {...a} /><path d="M72 115 l8 -8 8 8" {...a} /></g>
    <g className="ng-in a4"><path d="M30 80 H52" {...a} /><path d="M45 72 l8 8 -8 8" {...a} /></g>
  </>;
}

const OBJECTS: Record<NavGlyphName, (p: Part) => React.ReactElement> = {
  docs: Docs, changelog: Changelog, industries: Industries, cafe: Cafe, contact: Contact, merch: Merch, claim: Claim, work: Work,
};

export function NavGlyph({ name, color, size = 44, on = false }: { name: NavGlyphName; color: string; size?: number; on?: boolean }) {
  const id = `ng${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const g = `url(#${id}-glass)`;
  const t = tint(color);
  const Obj = OBJECTS[name];
  return (
    <svg className="ng" data-on={on} width={size} height={size} viewBox="0 0 160 160" aria-hidden="true"
      style={{ '--ng-glass': g } as React.CSSProperties}>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".62" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".2" />
          <stop offset="1" stopColor="#fff" stopOpacity=".34" />
        </linearGradient>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={shade(color, 0.16)} />
          <stop offset="1" stopColor={color} />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor={t} stopOpacity=".55" />
          <stop offset="1" stopColor={t} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-glow`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id={`${id}-clip`}><rect width="160" height="160" rx="36" /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="160" height="160" fill={`url(#${id}-tile)`} />
        {[53, 107].map(x => <path key={x} d={`M${x} 92 V160`} stroke="#fff" strokeOpacity=".1" />)}
        {[112, 136].map(y => <path key={y} d={`M0 ${y} H160`} stroke="#fff" strokeOpacity=".1" />)}
        <circle className="ng-halo" cx="80" cy="80" r="58" fill={`url(#${id}-halo)`} />
      </g>
      <rect x=".75" y=".75" width="158.5" height="158.5" rx="35.5" fill="none" stroke="#fff" strokeOpacity=".16" strokeWidth="1.5" />
      <g className="ng-obj" filter={`url(#${id}-glow)`}>
        <Obj g={g} t={t} id={id} />
      </g>
    </svg>
  );
}
