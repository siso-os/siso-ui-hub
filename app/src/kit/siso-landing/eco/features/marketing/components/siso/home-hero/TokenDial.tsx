// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/TokenDial.tsx)
'use client';

import { useEffect, useRef, useState } from 'react';
import STATS from '../../../data/siso-stats.json';
import LionGlyph from '../ui/LionGlyph';

// Hero v2 centrepiece (docs/specs/hero-v2.md): the live token count on a drum odometer, inside a slowly turning tilted dial,
// with a quiet pull of embers into the lion behind it. Only transform and opacity move. The ring and the embers are CSS
// animations (compositor only); the count steps every TICK ms and each drum rolls forward to its next digit. All of it
// pauses off screen, and with reduced motion it draws the live count once and stands still.

const LIVE = STATS.tokensLive;
const tokensAt = (t: number) => Math.floor(LIVE.base + ((t - Date.parse(LIVE.from)) * LIVE.perDay) / 86_400_000);
const fmt = (n: number) => n.toLocaleString('en-US');
const fromLabel = new Date(LIVE.from).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
export const TOKENS_SOURCE = `${STATS.stats.find(s => s.key === 'tokens')!.source}: ${LIVE.base / 1e9}B at ${fromLabel} UTC, plus about ${LIVE.perDay / 1e9}B a day, measured 8 Oct from the Claude logs on our two Macs (ccusage). siso-stats.json tokensLive.`;

const TICK = 2000;
// Printed under the count, so the source is on screen, not only on hover.
const CREDIT = `${LIVE.base / 1e9}B+ per Shaan's bios, plus ${LIVE.perDay / 1e9}B a day, measured`;
const RING_TEXT = `TOKENS SPENT · LIVE FROM ${LIVE.base / 1e9}B ON ${fromLabel.toUpperCase()} UTC · ABOUT ${LIVE.perDay / 1e9}B A DAY · `;
const TICKS = Array.from({ length: 120 }, (_, i) => i);
const EMBERS = Array.from({ length: 14 }, (_, i) => i);

// One digit: a ten-sided drum. It only ever rolls forward, so 9 → 0 turns one step, not nine back.
function Drum({ digit, index, dim }: { digit: number; index: number; dim: boolean }) {
  const el = useRef<HTMLSpanElement>(null);
  const state = useRef({ digit, steps: digit });
  // React sets this once; after that only the effect moves the drum, so a re-render never snaps it back.
  const [start] = useState(() => ({ transform: `translateZ(calc(var(--r) * -1)) rotateX(${digit * 36}deg)` }));
  useEffect(() => {
    const s = state.current;
    if (digit === s.digit) return;
    s.steps += (digit - s.digit + 10) % 10;
    s.digit = digit;
    if (el.current) el.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(${s.steps * 36}deg)`;
  }, [digit]);
  return (
    <span className="v2-drum" data-dim={dim || undefined} style={{ ['--i' as string]: index }}>
      <span ref={el} className="v2-drum-roll" style={start}>
        {TICKS.slice(0, 10).map(d => <span key={d} className="v2-face" style={{ ['--f' as string]: d }}>{d}</span>)}
      </span>
    </span>
  );
}

function Ring({ id, text = true }: { id: string; text?: boolean }) {
  return (
    <svg viewBox="0 0 1000 1000" className="v2-ring-svg" aria-hidden="true">
      <defs>
        <path id={`v2-ring-path-${id}`} d="M500 70a430 430 0 1 1 0 860a430 430 0 1 1 0-860" />
        <linearGradient id={`v2-ring-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFC24B" /><stop offset=".5" stopColor="#FF6A1A" /><stop offset="1" stopColor="#FF2D55" />
        </linearGradient>
      </defs>
      <circle cx="500" cy="500" r="490" fill="none" stroke={`url(#v2-ring-grad-${id})`} strokeWidth="2" opacity=".75" />
      <circle cx="500" cy="500" r="470" fill="none" stroke="#ffffff1f" strokeWidth="1" />
      {TICKS.map(i => (
        <line key={i} x1="500" y1={i % 10 === 0 ? 10 : 18} x2="500" y2="30" stroke={i % 10 === 0 ? '#fff3d6' : '#ffffff40'}
          strokeWidth={i % 10 === 0 ? 3 : 1.5} transform={`rotate(${i * 3} 500 500)`} />
      ))}
      {/* Only the far half carries text: on the near half it would read upside down. */}
      {text && <text className="v2-ring-text"><textPath href={`#v2-ring-path-${id}`}>{RING_TEXT.repeat(2)}</textPath></text>}
      <circle cx="500" cy="500" r="380" fill="none" stroke="#ffffff14" strokeWidth="1" strokeDasharray="2 10" />
    </svg>
  );
}

export default function TokenDial() {
  const root = useRef<HTMLDivElement>(null);
  const since = useRef<HTMLSpanElement>(null);
  // The server and first client render show the base (true: 522B+); the live count rolls in after mount.
  const [value, setValue] = useState(LIVE.base);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const arrived = Date.now();
    const step = () => {
      const now = Date.now();
      setValue(tokensAt(now));
      if (since.current) since.current.textContent = `+${fmt(tokensAt(now) - tokensAt(arrived))}`;
    };
    step();
    if (reduce) return;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      setRun(e.isIntersecting);
      window.clearInterval(timer);
      if (e.isIntersecting) { step(); timer = window.setInterval(step, TICK); }
    });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, []);

  const text = fmt(value);
  const digits = text.replace(/\D/g, '').length;
  let d = 0;
  return (
    <div ref={root} className="v2-dial" data-run={run || undefined}>
      <div className="v2-glow" aria-hidden="true" />
      <div className="v2-half v2-back" aria-hidden="true"><div className="v2-ring"><div className="v2-spin"><Ring id="back" /></div></div></div>
      <div className="v2-pull" aria-hidden="true">
        {EMBERS.map(i => <span key={i} className="v2-orbit" style={{ ['--e' as string]: i }}><i /></span>)}
      </div>
      <LionGlyph className="v2-lion" size={180} fill="url(#v2-lion-grad)" />
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs><linearGradient id="v2-lion-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff3d6" /><stop offset="1" stopColor="#FF6A1A" /></linearGradient></defs>
      </svg>

      <div className="v2-count" tabIndex={0} data-src={`Source: ${TOKENS_SOURCE}`}>
        <span className="v2-label"><i />Tokens spent, live</span>
        <span className="v2-odo" aria-hidden="true">
          {[...text].map((c, i) => {
            if (!/\d/.test(c)) return <span key={`s${text.length - i}`} className="v2-sep">{c}</span>;
            const index = d++;
            return <Drum key={`d${digits - index}`} digit={Number(c)} index={index} dim={digits - index <= 3} />;
          })}
        </span>
        <span className="v2-sr">{text} tokens spent</span>
        <span className="v2-rate">{CREDIT}<span className="v2-since"> · <span ref={since}>+0</span> since you got here</span></span>
      </div>

      <div className="v2-half v2-front" aria-hidden="true"><div className="v2-ring"><div className="v2-spin"><Ring id="front" text={false} /></div></div></div>
    </div>
  );
}
