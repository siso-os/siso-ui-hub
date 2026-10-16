// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/HomePage/LazySection.tsx)
'use client';

import { createContext, startTransition, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

// Below-the-fold sections are heavy: each ships its own demo, canvas or animation loop, and mounting all of them at
// once is most of the page's JS and its load-time long tasks. This mounts a section only when it comes near the
// viewport, and keeps it mounted after that (remounting a demo restarts its story, and every section already pauses
// its own motion off screen, so there is nothing to gain by unmounting).
//
// Reserving the right height is the hard part: these sections are 1,000-3,500 px tall and their height depends on the
// viewport, so one fixed placeholder would shift the page when the real section replaced it. The placeholder is
// therefore given a measured height per breakpoint (taken from the built page at 1440 and at 390), and the observer
// gets 600 px of margin so the swap lands well before the section is on screen. Any residual error is corrected off
// screen, where it cannot count as layout shift.
// A section that comes near while the visitor flies past it waits until the scroll slows: mounting each demo it passed
// cost a 100-300 ms block per section at 12x CPU, ~1 s of commits over one flick down the home page (10 Oct, t-0585).
// Flying is measured per frame, not per millisecond, so a slow phone (long frames, big jumps) cannot read as slow: more
// than FLY px a frame is 2,400 px/s at 60 fps, a hard fling; reading is 2-8 px a frame. Two slow frames in a row and it mounts.
const FLY = 40;
function whenSlow(cb: () => void) {
  let y = window.scrollY, slow = 0;
  let raf = requestAnimationFrame(function tick() {
    const ny = window.scrollY;
    slow = Math.abs(ny - y) < FLY ? slow + 1 : 0;
    y = ny;
    if (slow >= 2) cb(); else raf = requestAnimationFrame(tick);
  });
  return () => cancelAnimationFrame(raf);
}

// The placeholder outlives the mount: a section's chunk is still downloading when LazySection shows it, and if the
// dynamic() import rendered nothing meanwhile, the page lost that section's height, the next placeholder slid into the
// observer's margin and mounted too, and so on: on a phone all seven home sections mounted while the hero loaded (10 Oct).
// Each dynamic() passes `loading: LazyHold`, which keeps the same box until the code is in.
const HoldStyle = createContext<CSSProperties | undefined>(undefined);
export function LazyHold() {
  return <div className="lz-hold" style={useContext(HoldStyle)} aria-busy="true" />;
}

export default function LazySection({ wide, narrow, children }: { wide: number; narrow: number; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (or a crawler): show everything rather than hide the page's content.
    if (typeof IntersectionObserver !== 'function') { setShown(true); return; }
    // Far enough ahead that a section is always mounted before it is scrolled to, near enough that landing on the
    // page does not pull the next two sections' chunks down with the hero. On a phone, where the sections stack and
    // the viewport is short, a 600 px margin reached into three of them at once.
    //
    // The mount itself is a transition, so React can break a section's first render across frames instead of doing
    // it in one block. Mounting a whole demo synchronously mid-scroll was showing up as a ~100 ms long task.
    //
    // It also waits for an idle slot first. Without that, the section just under the fold mounts in the same breath
    // as the hero's own first paint and the two compete; requestIdleCallback lets the hero finish, then fills the
    // gap. The 600 ms timeout is the backstop for a main thread that never goes idle.
    // Only while it is still near: a section flown past (now above, or far below) waits for the next time it comes near,
    // so stopping at the bottom does not mount every section skipped on the way down.
    let idle = 0, near = false, stop = () => {};
    const go = () => startTransition(() => setShown(true));
    const io = new IntersectionObserver(entries => {
      near = entries[entries.length - 1].isIntersecting;
      stop();
      if (near) stop = whenSlow(() => {
        if (!near) return;
        io.disconnect();
        if (typeof requestIdleCallback === 'function') idle = requestIdleCallback(go, { timeout: 600 });
        else idle = window.setTimeout(go, 1);
      });
    }, { rootMargin: '300px 0px' });
    io.observe(el);
    return () => {
      io.disconnect(); stop();
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idle); else clearTimeout(idle);
    };
  }, [shown]);

  // `contain` keeps the empty placeholder out of the rest of the page's layout and paint work.
  const style = { '--lz-w': `${wide}px`, '--lz-n': `${narrow}px`, contain: 'layout style paint' } as CSSProperties;
  if (shown) return <HoldStyle.Provider value={style}>{children}</HoldStyle.Provider>;
  return <div ref={ref} className="lz-hold" style={style} aria-busy="true" />;
}

// 991px is the same breakpoint the sections themselves switch layout on.
export const lazySectionStyles = `
.lz-hold{height:var(--lz-w)}
@media (max-width:991px){.lz-hold{height:var(--lz-n)}}
`;
