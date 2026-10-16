// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/DropdownContainer.tsx)
'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// DropdownContainer - shared outer wrapper for ALL dropdowns
// foreplay's .nav-dropdown-menu + .nav-dropdown-menu-inner: full container width, 28px radius,
// IX2 Navbar / Open and Close: 20px, opacity, 350ms ease.
// The open panel wears the neon (Shaan, 9 Oct: "when you click drop-down the top hero stops highlighting the border and then
// this one highlights the border"): the Agent Base card's rim (two comets on a registered angle, .abc --abc-ang) plus a
// blurred copy outside the panel as its bloom, both drawn in the nav's glow colours. NavBar.tsx holds their CSS and dims the
// bar's own ring while a panel is open.
// Built once, then kept (Shaan, 9 Oct: "a split second of lag"): the click was ~5 ms of script, the rest was the browser
// building and painting the whole panel on every open. Each panel now mounts while the page is idle (or the moment the
// pointer reaches the bar), stays mounted, and opening is only the fade. A closed panel is see-through, inert and has
// every animation in it paused (NavBar.tsx), so its rim never turns unseen; MenuOpenContext tells parts that replay per
// open (count-ups, videos, the industries search) when it opens and closes. The fade and rise are CSS transitions on
// data-open (NavBar.tsx), so the compositor runs them even while the page's own animations keep the main thread busy.
// `width` makes a narrower panel that sits under its toggle (the Blog menu) instead of spanning the bar.
// ═══════════════════════════════════════════════════════════════════════════════

import { DROPDOWN } from './nav.constants';
import { useNavVariant, VARIANT_PANEL_TOP, VARIANT_PANEL_MAX_WIDTH } from './nav.variants';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface DropdownContainerProps {
  children: React.ReactNode;
  open: boolean;
  id?: string;
  labelledBy?: string;
  width?: number;
}

export const MenuOpenContext = createContext(true);
export const useMenuOpen = () => useContext(MenuOpenContext);

let warmed = false;
const warmers = new Set<() => void>();
// The pointer reaching the bar builds every panel at once; NavBar calls this.
export function warmMenus() {
  if (warmed) return;
  warmed = true;
  warmers.forEach(build => build());
}

type IdleWindow = Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (h: number) => void };

export function DropdownContainer({ children, open, id, labelledBy, width }: DropdownContainerProps) {
  const [built, setBuilt] = useState(false);
  useEffect(() => {
    if (open || warmed) { setBuilt(true); return; }
    const build = () => setBuilt(true);
    warmers.add(build);
    // Under 992px the bar's links are hidden (the drawer has its own), so nothing is built ahead: on /agent-base/ at 390
    // the three idle-built panels were 1,220 hidden elements, a fifth of the page (10 Oct). Opening one still builds it.
    if (!window.matchMedia('(min-width: 992px)').matches) return () => { warmers.delete(build); };
    const w = window as IdleWindow;
    const idle = w.requestIdleCallback ? w.requestIdleCallback(build, { timeout: 4000 }) : null;
    const timer = idle === null ? window.setTimeout(build, 2500) : undefined;
    return () => { warmers.delete(build); if (idle !== null) w.cancelIdleCallback?.(idle); clearTimeout(timer); };
  }, [open]);
  if (!built && !open) return null;
  return <DropdownPanel open={open} id={id} labelledBy={labelledBy} width={width}>{children}</DropdownPanel>;
}

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

function DropdownPanel({ children, open, id, labelledBy, width }: { children: React.ReactNode; open: boolean; id?: string; labelledBy?: string; width?: number }) {
  // How far the panel sits from the top, and how wide it spans, are the two pieces of the framing that are not CSS.
  // Variant 3's sheet is edge to edge, so it has no max width (nav.variants.css pins its left and right to 0).
  const variant = useNavVariant();
  const top = VARIANT_PANEL_TOP[variant];
  const maxWidth = VARIANT_PANEL_MAX_WIDTH[variant] || DROPDOWN.maxWidth;
  const side = `max(${DROPDOWN.sidePadding}px, calc((100vw - ${maxWidth}px) / 2))`;
  const [left, setLeft] = useState<number | null>(null);
  // A narrow panel centres under its toggle, kept inside the bar's edges.
  useIsoLayoutEffect(() => {
    if (!width) return;
    const place = () => {
      const toggle = labelledBy ? document.getElementById(labelledBy) : null;
      if (!toggle) return;
      const r = toggle.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const edge = Math.max(DROPDOWN.sidePadding, (vw - maxWidth) / 2);
      setLeft(Math.round(Math.min(Math.max(r.left + r.width / 2 - width / 2, edge), vw - edge - width)));
    };
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [width, labelledBy, maxWidth, open]);
  const box: React.CSSProperties = width
    ? { left: left ?? side, width, right: 'auto' }
    : { left: side, right: side };
  return (
    <>
    <div id={id} aria-labelledby={labelledBy} inert={!open} aria-hidden={!open || undefined} data-open={open || undefined}
      className={`siso-nav-dropdown${width ? ' is-narrow' : ''}`}
      onKeyDown={e => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
        const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href],button:not([disabled])'));
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (index < 0) return;
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1
          : e.key === 'ArrowDown' ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);
        items[next]?.focus();
      }}
      style={{
        position: 'fixed',
        top,
        ...box,
        zIndex: 200,
        transformOrigin: 'top center',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <span className="nav-panel-bloom" aria-hidden="true"><i /></span>
      <div
        className="siso-nav-dropdown-inner"
        style={{
          borderRadius: DROPDOWN.borderRadius,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <MenuOpenContext.Provider value={open}>{children}</MenuOpenContext.Provider>
      </div>
    </div>
    {/* The page under an open menu dims and softens (Shaan, 9 Oct: the hero's buttons peeked out under the panel). */}
    <div aria-hidden="true" className="siso-nav-backdrop" data-open={open || undefined}
      style={{ position: 'fixed', top, left: 0, right: 0, bottom: 0, zIndex: 150, pointerEvents: 'none',
        background: '#05060ab8', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />
    </>
  );
}

// foreplay's .nav-dropdown-toggle: 15px link, 20px chevron, white while open
export function DropdownToggle({ label, open, onToggle, id, listId }: { label: string; open: boolean; onToggle: () => void; id?: string; listId?: string }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const keyboardFocus = useRef<'first' | 'last' | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (!open || !keyboardFocus.current) return;
    const items = buttonRef.current?.nextElementSibling?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
    if (items?.length) items[keyboardFocus.current === 'first' ? 0 : items.length - 1].focus();
    keyboardFocus.current = null;
  }, [open]);
  return (
    <button
      ref={buttonRef}
      id={id}
      type="button"
      className={`nav-link-btn${open ? ' is-open' : ''}`}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={listId}
      onClick={onToggle}
      onKeyDown={e => {
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        e.preventDefault();
        if (!open) {
          keyboardFocus.current = e.key === 'ArrowDown' ? 'first' : 'last';
          onToggle();
        } else {
          const items = e.currentTarget.nextElementSibling?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])');
          if (items?.length) items[e.key === 'ArrowDown' ? 0 : items.length - 1].focus();
        }
      }}
    >
      {label}
      <motion.svg className="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"
        initial={false} animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: (t: number) => {
          // Webflow IX2's inOutBack easing (Penner's overshoot * 1.525).
          const c = 1.70158 * 1.525;
          return t < 0.5 ? ((2 * t) ** 2 * ((c + 1) * 2 * t - c)) / 2
            : ((2 * t - 2) ** 2 * ((c + 1) * (2 * t - 2) + c) + 2) / 2;
        } }}>
        <path d="M13 8.5L10.53 10.97C10.24 11.26 9.76 11.26 9.47 10.97L7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </button>
  );
}

// IX2 NavLink / On and Out. Keep the original class contract for CSS hovers.
export function DropdownArrow() {
  return <svg className="arrow" aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M10.5 4.5 15 9l-4.5 4.5M14.25 9H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
