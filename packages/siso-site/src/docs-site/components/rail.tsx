// uihub: siso:site
'use client';

import { useEffect, useRef, useState } from 'react';

// The section partition from the landing footer (src/features/marketing/components/Footer/Lights.tsx `Rail`, siso-ecosystem
// f1f28e3): Agent Base's rail-edge hairline that burns brightest in the middle, stepped down into a chamfered notch, with a
// spark running along it while it is on screen. `label` + `href` turn the notch into a tab that holds a link. `size="sm"` is
// the sidebar's version (a shorter notch for a 240px column). Styles live in app/global.css under "Rail".
export function Rail({ label, href, size }: { label?: string; href?: string; size?: 'sm' }) {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, []);
  const cls = ['sd-rail', label ? 'is-tab' : '', size === 'sm' ? 'is-sm' : ''].filter(Boolean).join(' ');
  return (
    <div ref={ref} className={cls} data-live={live || undefined} aria-hidden={label ? undefined : true}>
      <i><span /></i>
      {label && href && (
        <a className="sd-rail-tab" href={href}>
          {label}
          <b aria-hidden="true">→</b>
        </a>
      )}
    </div>
  );
}
