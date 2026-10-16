// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/_anim/useHeroParallax.ts)
'use client';

// Foreplay's "Product / Hero Parallax" and "Home / Hero Parallax" (Webflow IX2 a-71 / a-72).
// A 100vh trigger (.product-hero-animation-trigger / .home-hero-animation-trigger, absolute, top -72px)
// drives the sticky hero over the first screen of scroll: scale 1 → 0.75, y 0 → -33% (inOutCubic), opacity 1 → 0.
// Webflow runs it at ≥768px only; below that the hero stays still.
//
//   const { triggerRef, style } = useHeroParallax();
//   <div className="product-hero">
//     <div ref={triggerRef} className="product-hero-animation-trigger" />
//     <motion.div className="product-hero-sticky" style={style}>…</motion.div>
//   </div>

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, type MotionStyle } from 'framer-motion';

const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function useHeroParallax<T extends HTMLElement = HTMLDivElement>() {
  const triggerRef = useRef<T>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(mq.matches && !reduce.matches);
    update();
    mq.addEventListener('change', update);
    reduce.addEventListener('change', update);
    return () => { mq.removeEventListener('change', update); reduce.removeEventListener('change', update); };
  }, []);

  const { scrollYProgress } = useScroll({ target: triggerRef, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
  const y = useTransform(scrollYProgress, p => `${-33 * inOutCubic(Math.min(1, Math.max(0, p)))}%`);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const style: MotionStyle = enabled ? { scale, y, opacity, willChange: 'transform, opacity' } : {};
  return { triggerRef, style };
}
