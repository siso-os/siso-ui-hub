// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/ui/StatCounter.tsx)
'use client';

import { useMemo, useState } from 'react';

// One way to show a number across the site (Shaan, 9 Oct: "the tokens spent and sites built ... like the repos indexed, it's
// got a graph ... standardized UI stuff that we know to be good ... from the agent base"). Agent Base's chart rules
// (packages/siso-voice/src/charts.tsx): a mono uppercase label, a big tabular number, thin marks with rounded ends in one hue
// on a quiet baseline, no legend. The marks are an ambient texture, not a data series; the latest mark is lit.

function bars(seed: string, n: number) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const r = ((h >>> 0) % 1000) / 1000;
    out.push(0.3 + 0.55 * r * (0.55 + 0.45 * (i / n)));
  }
  out[n - 1] = 0.9;
  return out;
}

const CSS = `
.stc{--stc-hue:#FF6A1A;display:flex;flex-direction:column;gap:6px;min-width:0}
.stc-label{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.55)}
.stc-n{font:600 26px/1.1 'Inter Display',Inter,sans-serif;letter-spacing:-.02em;color:#fff;font-variant-numeric:tabular-nums}
.stc svg{display:block;overflow:visible}
.stc-bar{stroke:rgba(255,255,255,.3);stroke-width:2;stroke-linecap:round;transform-box:fill-box;transform-origin:bottom;transition:transform .5s cubic-bezier(.19,1,.22,1),stroke .3s}
.stc-bar.is-last{stroke:var(--stc-hue);filter:drop-shadow(0 0 4px var(--stc-hue));animation:stc-tick 1.8s ease-in-out infinite}
.stc:hover .stc-bar:not(.is-last),.stc.is-hot .stc-bar:not(.is-last){stroke:rgba(255,255,255,.5)}
@keyframes stc-tick{50%{opacity:.4}}
.stc.is-sm{display:grid;grid-template-columns:auto auto;grid-template-rows:auto auto;column-gap:14px;row-gap:4px;align-items:end}
.stc.is-sm .stc-n{font-size:20px;grid-column:1;grid-row:1}
.stc.is-sm .stc-label{grid-column:1;grid-row:2;font-size:9.5px}
.stc.is-sm svg{grid-column:2;grid-row:1 / span 2;align-self:center}
@media (prefers-reduced-motion:reduce){.stc-bar{transition:none}.stc-bar.is-last{animation:none}}
`;

export default function StatCounter({ label, n, size = 'lg', hue, hot }: { label: string; n: string; size?: 'sm' | 'lg'; hue?: string; hot?: boolean }) {
  const count = size === 'sm' ? 14 : 30;
  const W = size === 'sm' ? 84 : 212;
  const H = size === 'sm' ? 30 : 40;
  const series = useMemo(() => bars(label, count), [label, count]);
  const [hover, setHover] = useState(false);
  const step = W / count;
  return (
    <div className={`stc is-${size}${hot || hover ? ' is-hot' : ''}`} style={hue ? { ['--stc-hue' as string]: hue } : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <style>{CSS}</style>
      <div className="stc-label">{label}</div>
      <div className="stc-n">{n}</div>
      <svg width={size === 'sm' ? W : '100%'} height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true">
        {series.map((v, i) => (
          <line key={i} className={`stc-bar${i === count - 1 ? ' is-last' : ''}`} x1={i * step + step / 2} x2={i * step + step / 2} y1={H - 1} y2={H - 1 - v * (H - 2)}
            style={{ transform: hot || hover ? `scaleY(${Math.min(1.12, 0.92 + v * 0.3).toFixed(2)})` : undefined, transitionDelay: `${i * 12}ms` }} />
        ))}
      </svg>
    </div>
  );
}
