// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/industry-page/Totem.tsx)
'use client';

import { type CSSProperties } from 'react';

// The coded hero object for an industry family (spec §1: "a 3D-feeling coded hero object for that family"). One SVG engine,
// six faces, driven by a `family` attribute — the living-asset method: layered flat shapes read as solid because of stacked
// shadow, a lit top edge and one specular sweep, not because of a 3D library. No stock images and no phone mock-ups.
//
// It floats and the specular band sweeps across it; both animate transform/opacity only, and both stop when the hero is off
// screen (`paused`), so the page does not lag.

export type Family = 'cafes' | 'restaurants' | 'beauty-salons' | 'barbers-nails' | 'spas-clinics' | 'yoga-fitness';

const CSS = `
.ip-totem{position:relative;width:100%;max-width:420px;aspect-ratio:1;display:block;overflow:visible}
.ip-totem svg{width:100%;height:100%;display:block;overflow:visible}
@keyframes ip-float{50%{transform:translateY(-10px)}}
@keyframes ip-sweep{0%{transform:translateX(-130%)}100%{transform:translateX(130%)}}
@keyframes ip-steam{0%{opacity:0;transform:translateY(0) scaleX(1)}30%{opacity:.5}100%{opacity:0;transform:translateY(-26px) scaleX(1.5)}}
@keyframes ip-pulse{50%{opacity:.95;transform:scale(1.06)}}
.ip-totem-float{animation:ip-float 7s ease-in-out infinite;transform-origin:50% 50%}
.ip-totem-spec{animation:ip-sweep 5.5s cubic-bezier(.45,0,.55,1) infinite}
.ip-totem-steam>*{animation:ip-steam 3.6s ease-out infinite}
.ip-totem-steam>*:nth-child(2){animation-delay:1.2s}.ip-totem-steam>*:nth-child(3){animation-delay:2.4s}
.ip-totem-pulse{animation:ip-pulse 3.4s ease-in-out infinite;transform-origin:50% 50%}
.ip-totem[data-paused] .ip-totem-float,.ip-totem[data-paused] .ip-totem-spec,
.ip-totem[data-paused] .ip-totem-steam>*,.ip-totem[data-paused] .ip-totem-pulse{animation-play-state:paused}
/* the object reacts to the pointer like everything else on the page */
.ip-totem-body{transition:transform .6s cubic-bezier(.19,1,.22,1)}
.ip-totem:hover .ip-totem-body{transform:translateY(-6px) scale(1.02)}
@media (prefers-reduced-motion:reduce){
  .ip-totem-float,.ip-totem-spec,.ip-totem-steam>*,.ip-totem-pulse{animation:none}
  .ip-totem-steam>*{opacity:.3}
  .ip-totem:hover .ip-totem-body{transform:none}
}
`;

/** Stacked plates give the object its thickness: each is the same shape, offset down and darkened. */
function Slab({ d, fill, depth = 7, shade = '#120a06' }: { d: string; fill: string; depth?: number; shade?: string }) {
  return (
    <>
      {Array.from({ length: depth }, (_, i) => (
        <path key={i} d={d} fill={shade} opacity={0.5 - i * 0.03} transform={`translate(0 ${depth - i})`} />
      ))}
      <path d={d} fill={fill} />
    </>
  );
}

const FACES: Record<Family, { art: JSX.Element; label: string }> = {
  // A cup on a saucer with steam: the thing a café sells, seen three-quarter on.
  cafes: {
    label: 'A coffee cup on its saucer, with steam rising',
    art: (
      <g>
        <ellipse cx="110" cy="176" rx="68" ry="13" fill="#FF6A1A" opacity=".16" />
        <g className="ip-totem-steam" opacity=".9">
          <path d="M96 78c-7-9 3-15-2-24" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".5" />
          <path d="M112 74c-8-10 4-17-2-26" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".5" />
          <path d="M128 78c-7-9 3-15-2-24" stroke="#fff3d6" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".5" />
        </g>
        <Slab d="M44 166h132a10 10 0 0 1-10 10H54a10 10 0 0 1-10-10Z" fill="#2a1a12" depth={4} />
        <path d="M38 160h144a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6Z" fill="#3d2517" />
        <path d="M150 104c22 0 30 10 30 20s-10 20-30 20" stroke="#c9682c" strokeWidth="9" fill="none" strokeLinecap="round" />
        <Slab d="M58 96h94l-9 54a16 16 0 0 1-16 14H83a16 16 0 0 1-16-14Z" fill="#f3ece1" depth={8} shade="#3a2415" />
        <ellipse cx="105" cy="98" rx="47" ry="9" fill="#2a1207" />
        <ellipse cx="105" cy="97" rx="42" ry="7" fill="#7b3a14" />
        <ellipse cx="99" cy="95" rx="20" ry="3.4" fill="#FFB547" opacity=".5" />
        <path d="M60 104h90l-1.6 10H61.6Z" fill="#fff" opacity=".5" />
      </g>
    ),
  },
  // A wok over flame on a burner: the open kitchen in the restaurants image.
  restaurants: {
    label: 'A wok over a burner flame',
    art: (
      <g>
        <ellipse cx="110" cy="178" rx="72" ry="13" fill="#FF6A1A" opacity=".2" />
        <Slab d="M62 168h96a8 8 0 0 1-8 8H70a8 8 0 0 1-8-8Z" fill="#241a16" depth={4} />
        <path d="M70 162h80v6H70z" fill="#3a2a22" />
        <g className="ip-totem-pulse">
          <path d="M110 150c-16-8-22-24-14-38 2 10 8 14 8 14-4-18 6-30 20-38-6 16 2 22 8 32 4-8 2-16 2-16 14 14 14 36-4 46-6 4-14 4-20 0Z" fill="#FF6A1A" opacity=".85" />
          <path d="M110 146c-9-5-12-15-8-23 1 6 5 9 5 9-2-11 4-18 12-23-3 10 1 13 5 19 2-5 1-10 1-10 8 9 8 22-3 28-4 3-8 3-12 0Z" fill="#FFC24B" />
          <path d="M110 140c-5-3-6-9-4-13 1 4 3 5 3 5-1-6 2-10 7-13-2 6 0 8 3 11 1-3 0-6 0-6 5 5 5 13-2 16-2 2-5 2-7 0Z" fill="#fff3d6" opacity=".9" />
        </g>
        <Slab d="M34 92h152c0 34-34 56-76 56S34 126 34 92Z" fill="#2e3138" depth={9} shade="#0d0a08" />
        <ellipse cx="110" cy="92" rx="76" ry="14" fill="#15171c" />
        <ellipse cx="110" cy="91" rx="68" ry="11" fill="#43474f" />
        <ellipse cx="96" cy="88" rx="28" ry="5" fill="#FFB547" opacity=".35" />
        <path d="M186 92c14-2 22 2 22 8" stroke="#43474f" strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  // A salon mirror with real bulbs around it, a bottle and a brush on the counter.
  'beauty-salons': {
    label: 'A salon mirror lit by bulbs, with a bottle and brush on the counter',
    art: (
      <g>
        <ellipse cx="110" cy="182" rx="76" ry="12" fill="#FF6A1A" opacity=".16" />
        {/* the mirror: a rounded frame with the glass catching the room */}
        <Slab d="M56 26h98a16 16 0 0 1 16 16v96H40V42a16 16 0 0 1 16-16Z" fill="#241b22" depth={8} shade="#0b0906" />
        <path d="M56 36h98a8 8 0 0 1 8 8v86H48V44a8 8 0 0 1 8-8Z" fill="#171b24" />
        <path d="M56 36h98a8 8 0 0 1 8 8v86H48V44a8 8 0 0 1 8-8Z" fill="url(#ip-glass)" />
        {/* what the glass reflects: a warm wash and one soft highlight, so it reads as glass not a hole */}
        <path d="M56 36h44l-30 94H48V44a8 8 0 0 1 8-8Z" fill="#fff" opacity=".07" />
        <ellipse cx="128" cy="66" rx="22" ry="26" fill="#FFB547" opacity=".12" />
        {/* the bulbs around the frame */}
        <g className="ip-totem-pulse">
          {[[56, 22], [84, 20], [112, 20], [140, 22], [166, 44], [166, 76], [166, 108], [44, 44], [44, 76], [44, 108]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="9" fill="#FFB547" opacity=".22" />
              <circle cx={x} cy={y} r="5" fill="#fff3d6" />
            </g>
          ))}
        </g>
        {/* counter */}
        <Slab d="M26 146h168a10 10 0 0 1-10 10H36a10 10 0 0 1-10-10Z" fill="#2a1a12" depth={5} />
        <path d="M20 140h180a6 6 0 0 1-6 6H26a6 6 0 0 1-6-6Z" fill="#3d2517" />
        {/* a bottle and a brush standing on it */}
        <Slab d="M176 106h20v34h-20z" fill="#d9b48a" depth={4} shade="#2a1a0c" />
        <path d="M182 96h8v10h-8z" fill="#8c6a48" />
        <path d="M178 110h5v26h-5z" fill="#fff" opacity=".4" />
        <path d="M30 128h7v12h-7z" fill="#43474f" />
        <path d="M28 108h11v22a5 5 0 0 1-11 0Z" fill="#8c3a2c" />
        <path d="M28 108h4v24h-4z" fill="#fff" opacity=".22" />
      </g>
    ),
  },
  // A barber chair seen three-quarter on — seat, backrest, arm and a chromed footrest on a pedestal — with the striped pole
  // mounted on a plate behind it.
  'barbers-nails': {
    label: 'A barber chair with a striped pole behind it',
    art: (
      <g>
        <ellipse cx="100" cy="182" rx="78" ry="12" fill="#FF6A1A" opacity=".18" />
        {/* the pole, on its wall plate, standing behind the chair */}
        <rect x="156" y="26" width="30" height="8" rx="3" fill="#2b2f36" />
        <rect x="156" y="122" width="30" height="8" rx="3" fill="#2b2f36" />
        <rect x="162" y="34" width="18" height="88" fill="#f3ece1" />
        <path d="M162 40h18v9h-18zM162 58h18v9h-18zM162 76h18v9h-18zM162 94h18v9h-18z" fill="#FF2D55" opacity=".9" />
        <path d="M162 49h18v9h-18zM162 67h18v9h-18zM162 85h18v9h-18zM162 103h18v9h-18z" fill="#3a6fd8" opacity=".55" />
        <rect x="162" y="34" width="6" height="88" fill="#fff" opacity=".3" />
        <rect x="174" y="34" width="6" height="88" fill="#0b0906" opacity=".22" />
        {/* pedestal and base */}
        <Slab d="M62 160h76a9 9 0 0 1-9 9H71a9 9 0 0 1-9-9Z" fill="#23262c" depth={5} shade="#0a0806" />
        <path d="M86 126h28v34H86z" fill="#2b2f36" />
        <path d="M86 126h9v34h-9z" fill="#fff" opacity=".14" />
        {/* footrest */}
        <path d="M44 140h34v7H44z" fill="#43474f" />
        <path d="M44 140h34v3h-34z" fill="#fff" opacity=".26" />
        <path d="M74 134h8v12h-8z" fill="#2b2f36" />
        {/* seat */}
        <Slab d="M46 104h108a10 10 0 0 1-10 10H56a10 10 0 0 1-10-10Z" fill="#7a2f24" depth={10} shade="#190604" />
        <path d="M46 104h108v-9a11 11 0 0 0-11-11H57a11 11 0 0 0-11 11Z" fill="#9c4132" />
        <path d="M54 90h92v5H54z" fill="#fff" opacity=".24" />
        {/* backrest, leaning back a little */}
        <Slab d="M118 30h34v58h-34z" fill="#9c4132" depth={8} shade="#190604" />
        <path d="M118 30h11v58h-11z" fill="#fff" opacity=".2" />
        <path d="M122 44h26v3h-26zM122 58h26v3h-26zM122 72h26v3h-26z" fill="#190604" opacity=".3" />
        {/* arm rest */}
        <path d="M52 86h58v9a5 5 0 0 1-5 5H57a5 5 0 0 1-5-5Z" fill="#43474f" />
        <path d="M52 86h58v4H52z" fill="#fff" opacity=".2" />
      </g>
    ),
  },
  // Stacked hot stones, a folded towel and a candle: the spa image.
  'spas-clinics': {
    label: 'Stacked spa stones with a candle',
    art: (
      <g>
        <ellipse cx="110" cy="178" rx="74" ry="13" fill="#FF6A1A" opacity=".16" />
        <Slab d="M30 158h160a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10Z" fill="#2a1a12" depth={5} />
        <path d="M24 152h172a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6Z" fill="#3d2517" />
        {/* the candle: body first, then the wick, then the flame sitting on it */}
        <Slab d="M148 108h40v44h-40z" fill="#e8ddc9" depth={5} shade="#2a1f12" />
        <path d="M150 110h8v40h-8z" fill="#fff" opacity=".45" />
        <ellipse cx="168" cy="108" rx="20" ry="5" fill="#cdbfa5" />
        <ellipse cx="168" cy="108" rx="9" ry="2.6" fill="#6b5a40" />
        <path d="M167 100h2.4v8H167z" fill="#4a3c28" />
        <g className="ip-totem-pulse" style={{ transformOrigin: '168px 96px' }}>
          <path d="M168 100c-7-4-9-12-5-19 1 5 4 8 4 8-2-10 3-16 11-21-3 9 1 12 4 16 2-4 1-8 1-8 7 8 7 20-3 24-4 2-9 2-12 0Z" fill="#FF6A1A" opacity=".9" />
          <path d="M168 97c-3-2-4-7-2-10 0 3 2 4 2 4-1-5 2-9 6-11-2 5 0 7 2 9 1-2 0-4 0-4 4 4 4 10-2 12-2 1-4 1-6 0Z" fill="#fff3d6" />
        </g>
        <Slab d="M44 132c0-9 18-15 40-15s40 6 40 15-18 15-40 15-40-6-40-15Z" fill="#43474f" depth={7} shade="#0d0a08" />
        <Slab d="M52 112c0-8 14-13 32-13s32 5 32 13-14 13-32 13-32-5-32-13Z" fill="#53585f" depth={6} shade="#0d0a08" />
        <Slab d="M60 94c0-7 11-11 24-11s24 4 24 11-11 11-24 11-24-4-24-11Z" fill="#63686f" depth={5} shade="#0d0a08" />
        <ellipse cx="74" cy="90" rx="13" ry="3.6" fill="#FFB547" opacity=".4" />
        <ellipse cx="72" cy="109" rx="14" ry="3.6" fill="#FFB547" opacity=".26" />
      </g>
    ),
  },
  // A rolled mat standing beside a kettlebell: the yoga image.
  'yoga-fitness': {
    label: 'A rolled yoga mat standing beside a kettlebell',
    art: (
      <g>
        <ellipse cx="110" cy="178" rx="74" ry="13" fill="#FF6A1A" opacity=".18" />
        <Slab d="M34 160h152a10 10 0 0 1-10 10H44a10 10 0 0 1-10-10Z" fill="#2a1a12" depth={5} />
        <path d="M28 154h164a6 6 0 0 1-6 6H34a6 6 0 0 1-6-6Z" fill="#3d2517" />
        <Slab d="M52 44h46v110H52z" fill="#c9682c" depth={8} shade="#1a0b05" />
        <ellipse cx="75" cy="44" rx="23" ry="10" fill="#8c4a1e" />
        <ellipse cx="75" cy="44" rx="14" ry="6" fill="#5e2f12" />
        <ellipse cx="75" cy="44" rx="6" ry="2.6" fill="#2a1207" />
        <path d="M54 48h8v104h-8z" fill="#fff" opacity=".2" />
        <path d="M126 86c0-12 10-22 22-22s22 10 22 22" fill="none" stroke="#43474f" strokeWidth="12" strokeLinecap="round" />
        <Slab d="M112 96c0-6 5-10 11-10h50c6 0 11 4 11 10v18c0 22-16 40-36 40s-36-18-36-40Z" fill="#2e3138" depth={8} shade="#0d0a08" />
        <ellipse cx="148" cy="98" rx="34" ry="8" fill="#43474f" />
        <ellipse cx="136" cy="96" rx="13" ry="3.4" fill="#FFB547" opacity=".35" />
        <path d="M118 104c-2 24 8 42 24 46" stroke="#fff" strokeWidth="4" opacity=".14" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
};

export default function Totem({ family, paused, className }: { family: Family; paused?: boolean; className?: string }) {
  const face = FACES[family];
  return (
    <div className={className ? `ip-totem ${className}` : 'ip-totem'} data-paused={paused || undefined} role="img" aria-label={face.label}>
      <style>{CSS}</style>
      <svg viewBox="0 0 220 200" aria-hidden="true">
        <defs>
          <linearGradient id="ip-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5a4a3a" stopOpacity=".9" />
            <stop offset=".5" stopColor="#2a2420" stopOpacity=".95" />
            <stop offset="1" stopColor="#4a3a2a" stopOpacity=".9" />
          </linearGradient>
          <radialGradient id="ip-totem-glow" cx=".5" cy=".42" r=".6">
            <stop offset="0" stopColor="#FF6A1A" stopOpacity=".42" />
            <stop offset="1" stopColor="#FF6A1A" stopOpacity="0" />
          </radialGradient>
          {/* the specular band that sweeps across the object */}
          <linearGradient id="ip-totem-spec" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".16" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="ip-totem-clip"><rect x="0" y="0" width="220" height="200" /></clipPath>
        </defs>
        <ellipse cx="110" cy="92" rx="104" ry="92" fill="url(#ip-totem-glow)" />
        <g className="ip-totem-float">
          <g className="ip-totem-body">{face.art}</g>
        </g>
        <g clipPath="url(#ip-totem-clip)" style={{ mixBlendMode: 'screen' } as CSSProperties}>
          <rect className="ip-totem-spec" x="-60" y="0" width="60" height="200" fill="url(#ip-totem-spec)" transform="skewX(-14)" />
        </g>
      </svg>
    </div>
  );
}
