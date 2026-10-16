// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/Numbers.tsx)
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import STATS from '../../data/siso-stats.json';

// Our numbers, centred between the link columns (Shaan, 9 Oct: "a small bar and then it has like four bars inside of it ...
// you hover over it and it will change from repos index to token spend to ... sites made ... industries analysed ... and
// that's centred, and then you could have text either side"; "when you hover over the scale ... it'd be nice if the lines
// moved"). Four little bars pick the number, sized by order of magnitude, so the biggest number has the tallest bar. The thin
// marks under the number re-form for each one and swell where the pointer is. They are a texture, not a data series. Values
// come from data/siso-stats.json; it cycles on its own until you point at it. Order and tokens per Shaan (9 Oct): "tokens spent
// first, then repos indexed, then industries ranked, then sites built"; tokens "slowly creep up over time ... we're burning
// about a billion tokens a day", so tokens count live from his stated total (siso-stats.json tokensLive). The others roll up
// to their full figure.
const KEYS = ['tokens', 'repos', 'industries', 'sites'];
const SHOWN = KEYS.map(k => STATS.stats.find(s => s.key === k)!);
const MARKS = 32;
const LIVE = STATS.tokensLive;
const liveTokens = (now: number) => LIVE.base + ((now - Date.parse(LIVE.from)) * LIVE.perDay) / 86_400_000;
const full = (v: number) => Math.floor(v).toLocaleString('en-US');

function magnitude(n: string) {
  const m = n.replace(/[,+]/g, '').match(/^([\d.]+)([KMB])?/);
  if (!m) return 1;
  return parseFloat(m[1]) * ({ K: 1e3, M: 1e6, B: 1e9 }[m[2] as 'K' | 'M' | 'B'] ?? 1);
}
const LOGS = SHOWN.map(s => Math.log10(magnitude(s.n)));
const LO = Math.min(...LOGS), HI = Math.max(...LOGS);
const PICK_H = LOGS.map(l => 0.4 + 0.6 * ((l - LO) / (HI - LO || 1)));

function series(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return Array.from({ length: MARKS }, (_, i) => {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const r = ((h >>> 0) % 1000) / 1000;
    return i === MARKS - 1 ? 0.92 : 0.22 + 0.6 * r * (0.5 + 0.5 * (i / MARKS));
  });
}

const CSS = `
.sf-num{display:flex;flex-direction:column;align-items:center;gap:10px;width:400px;max-width:100%;text-align:center}
.sf-num-label{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.55);animation:sf-num-in .45s cubic-bezier(.19,1,.22,1)}
.sf-num-n.is-long{font-size:36px}
.sf-num-n{font:600 44px/1 'Inter Display',Inter,sans-serif;white-space:nowrap;letter-spacing:-.03em;color:#fff;font-variant-numeric:tabular-nums;animation:sf-num-in .55s cubic-bezier(.19,1,.22,1)}
@keyframes sf-num-in{from{opacity:0;transform:translateY(10px);filter:blur(6px)}}
.sf-num-marks{display:flex;align-items:flex-end;justify-content:space-between;width:100%;height:46px;margin-top:4px;cursor:crosshair}
.sf-num-marks i{width:2px;height:100%;border-radius:2px;background:rgba(255,255,255,.28);transform-origin:bottom;
  transition:transform .6s cubic-bezier(.19,1,.22,1),background .3s}
.sf-num-marks i:last-child{background:#FF6A1A;box-shadow:0 0 8px #FF6A1A;animation:sf-num-tick 1.8s ease-in-out infinite}
.sf-num:not([data-on]) .sf-num-marks i:last-child{animation-play-state:paused}
.sf-num-marks:hover i:not(:last-child){background:rgba(255,255,255,.42)}
@keyframes sf-num-tick{50%{opacity:.45}}
.sf-num-pick{display:inline-flex;align-items:flex-end;gap:4px;height:38px;padding:7px 9px;border-radius:12px;background:#ffffff06;box-shadow:inset 0 0 0 1px #ffffff14}
.sf-num-pick button{display:flex;align-items:flex-end;justify-content:center;width:20px;height:100%;padding:0;border:0;background:none;cursor:pointer}
.sf-num-pick button i{width:5px;border-radius:3px;background:rgba(255,255,255,.3);transition:background .25s,box-shadow .25s,transform .35s cubic-bezier(.19,1,.22,1);transform-origin:bottom}
.sf-num-pick button:hover i{background:rgba(255,255,255,.75);transform:scaleY(1.08)}
.sf-num-pick button[aria-selected=true] i{background:linear-gradient(#FFC24B,#FF6A1A);box-shadow:0 0 10px #FF6A1A}
.sf-num-foot{font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.32)}
@media (prefers-reduced-motion:reduce){.sf-num-label,.sf-num-n,.sf-num-marks i:last-child{animation:none}.sf-num-marks i{transition:none}}
`;

export default function FooterNumbers() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);
  const [near, setNear] = useState<number | null>(null);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const marks = useMemo(() => series(SHOWN[active].key), [active]);

  // The footer sits under the whole page, so without this its clocks run for as long as the visitor is anywhere
  // above it. The live token count below re-rendered this block about seven times a second from the moment the page
  // loaded, off screen, all the way down.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver !== 'function') { setOnScreen(true); return; }
    const io = new IntersectionObserver(es => setOnScreen(es.some(e => e.isIntersecting)), { rootMargin: '120px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (held || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => {
      if (ref.current?.closest('.sf')?.hasAttribute('data-live')) setActive(a => (a + 1) % SHOWN.length);
    }, 3600);
    return () => clearInterval(id);
  }, [held]);

  const s = SHOWN[active];
  const live = s.key === 'tokens';
  const target = magnitude(s.n);
  const [value, setValue] = useState(target);
  useEffect(() => {
    let raf = 0, id = 0;
    if (live) {
      const tick = () => setValue(liveTokens(Date.now()));
      // Show the right number straight away, but only keep counting while the footer is actually on screen.
      tick();
      if (!onScreen) return;
      id = window.setInterval(tick, 150);
    } else {
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 800);
        setValue(target * (0.88 + 0.12 * (1 - Math.pow(1 - t, 3))));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    return () => { cancelAnimationFrame(raf); clearInterval(id); };
  }, [live, target, onScreen]);
  const shown = full(value) + (!live && s.n.endsWith('+') ? '+' : '');
  return (
    <div ref={ref} className="sf-num" data-on={onScreen || undefined} onMouseEnter={() => setHeld(true)} onMouseLeave={() => { setHeld(false); setNear(null); }}
      onFocus={() => setHeld(true)} onBlur={() => setHeld(false)}>
      <style>{CSS}</style>
      <span key={`l${active}`} className="sf-num-label">{s.label}</span>
      <a key={`n${active}`} href={s.href} className={`sf-num-n${shown.length > 11 ? ' is-long' : ''}`} title={live ? LIVE._readme : s.source}>{shown}</a>
      <div className="sf-num-marks" aria-hidden="true"
        onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); setNear(Math.round(((e.clientX - r.left) / r.width) * (MARKS - 1))); }}>
        {marks.map((v, i) => {
          const lift = near === null ? 0 : Math.max(0, 1 - Math.abs(i - near) / 4) * 0.35;
          return <i key={i} style={{ transform: `scaleY(${Math.min(1, v + lift).toFixed(3)})`, transitionDelay: near === null ? `${i * 14}ms` : '0ms' }} />;
        })}
      </div>
      <div className="sf-num-pick sf-neon" role="tablist" aria-label="SISO in numbers">
        {SHOWN.map((x, i) => (
          <button key={x.key} type="button" role="tab" aria-selected={i === active} aria-label={x.label}
            onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}>
            <i style={{ height: `${Math.round(PICK_H[i] * 100)}%` }} />
          </button>
        ))}
      </div>
      <span className="sf-num-foot">Updated {STATS.updated}</span>
    </div>
  );
}
