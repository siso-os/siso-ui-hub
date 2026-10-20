// uihub: siso:package-workbench
'use client';

import { useEffect, useRef, useState } from 'react';
import LaserBeam from './LaserBeam';

// BridgeMind's beam for the bottom of the footer (Shaan, 9 Oct: "bridge mind's one's so much cooler"). It falls from the notch
// of the last divider onto the lion, which stands on the horizon line, and its flare spreads along that line (Signature.tsx).
// It lives inside the footer, not pinned to the screen: the pinned version slid over the socials while you scrolled ("there's
// like a transparent bar we cross over and it covers the social icons"). It fades in each time the footer's end comes into
// view, and draws nothing while off screen.
const CSS = `
.sf-beam{position:absolute;inset:0;pointer-events:none}
.sf-beam canvas{-webkit-mask-image:linear-gradient(#000 82%,transparent);mask-image:linear-gradient(#000 82%,transparent)}
`;

export const HORIZON = 0.8; // the horizon, as a fraction of the signature's height from the top

export default function FooterBeam() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [k, setK] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!seen) { setK(0); return; }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setK(1); return; }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 1400);
      setK(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [seen]);
  // The horizon line beside the beam opens out as it lands.
  useEffect(() => { ref.current?.parentElement?.style.setProperty('--k', k.toFixed(3)); }, [k]);
  return (
    <div ref={ref} className="sf-beam" aria-hidden="true">
      <style>{CSS}</style>
      <LaserBeam active={seen} intensity={k} color="#FFA05C" maxDpr={1}
        horizontalBeamOffset={0} verticalBeamOffset={0.5 - HORIZON} horizontalSizing={0.6} verticalSizing={2.2}
        falloffStart={1.35} fogIntensity={0.5} wispIntensity={5} flowSpeed={0.3} />
    </div>
  );
}
