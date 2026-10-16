// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/blog/Figures.tsx)
'use client';
import { useEffect, useRef, useState } from 'react';
import StatCounter from '../ui/StatCounter';

// Numbers that roll up to their value the first time they come into view (the footer's "numbers enter with blur and rise").
// The value always comes from data: post counts are computed, article figures are copied verbatim from the post text.
function parse(n: string) {
  const clean = n.replace(/,/g, '');
  const decimals = clean.includes('.') ? clean.split('.')[1].length : 0;
  return { value: Number(clean), decimals, commas: n.includes(',') };
}
function format(v: number, decimals: number, commas: boolean, pad: number) {
  const fixed = v.toFixed(decimals);
  const [int, frac] = fixed.split('.');
  const body = commas ? Number(int).toLocaleString('en-US') : int.padStart(pad, '0');
  return frac ? `${body}.${frac}` : body;
}
export function useRoll<T extends HTMLElement = HTMLDivElement>(n: string, pad = 0) {
  const ref = useRef<T>(null);
  const { value, decimals, commas } = parse(n);
  const [shown, setShown] = useState(n);
  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(value) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    setShown(format(0, decimals, commas, pad));
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / 1100);
        const eased = 1 - Math.pow(1 - t, 4);
        setShown(format(t === 1 ? value : value * eased, decimals, commas, pad));
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, decimals, commas, pad]);
  return { ref, shown };
}

export function RollingStat({ label, n, pad = 2, hue }: { label: string; n: string; pad?: number; hue?: string }) {
  const { ref, shown } = useRoll(n, pad);
  return <div ref={ref} className="sb-roll"><span className="sb-sr-only">{label}: {n}</span><div aria-hidden="true"><StatCounter label={label} n={shown} hue={hue} /></div></div>;
}

// The article's "by the numbers" band: four figures from the post, each a link to the paragraph that states it.
function Figure({ n, label, at, i }: { n: string; label: string; at: string; i: number }) {
  const { ref, shown } = useRoll<HTMLAnchorElement>(n);
  return <a ref={ref} className="sb-figure" href={`#${at}`} style={{ animationDelay: `${i * 90}ms` }}>
    <span className="sb-figure-n" aria-hidden="true">{shown}</span><span className="sb-sr-only">{n}</span>
    <span className="sb-figure-label">{label}</span>
    <span className="sb-figure-marks" aria-hidden="true">{Array.from({ length: 26 }, (_, k) => <i key={k} style={{ height: `${28 + ((k * 37 + i * 11) % 60)}%`, transitionDelay: `${k * 14}ms` }} />)}</span>
    <span className="sb-figure-go" aria-hidden="true">↓</span>
  </a>;
}
export function FigureBand({ figures }: { figures: { n: string; label: string; at: string }[] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => ref.current?.toggleAttribute('data-live', e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <section ref={ref} className="sb-figures" aria-label="The post in numbers">
    <span className="sb-eyebrow sb-orange">In numbers</span>
    <div className="sb-figures-row">{figures.map((f, i) => <Figure key={f.label} {...f} i={i} />)}</div>
  </section>;
}
