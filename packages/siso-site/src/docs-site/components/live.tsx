// uihub: siso:site
'use client';

import { useEffect, useRef, useState, type ComponentProps } from 'react';

/** A div that sets data-live while it is on screen, so the loops inside it run only then (SISO UI standard, motion). */
export function Live(props: ComponentProps<'div'>) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} data-live={live || undefined} {...props} />;
}
