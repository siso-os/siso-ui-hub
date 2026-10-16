// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/NavBar.tsx)
'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// NavBar - main navigation component
// Imports and composes: ProductDropdown (Ecosystem), AgencyDropdown, ResourcesDropdown, BlogDropdown.
// The glow hands off (Shaan, 9 Oct): while a menu is open the bar's neon dims to a quiet line and the open panel wears it
// (DropdownContainer's rim); close it and the neon comes back to the bar.
// Bar metrics are foreplay.co's (.navbar-container 1340, .nav-stack 72px, .nav-dropdown-toggle);
// dropdowns open on click, one at a time, and close on outside click, Escape or navigation.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from '../../../../../../shims/next-link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { usePathname } from '../../../../../../shims/next-navigation';
import { ProductDropdown } from './ProductDropdown';
import { ResourcesDropdown } from './ResourcesDropdown';
import { AgencyDropdown } from './AgencyDropdown';
import { warmMenus } from './DropdownContainer';
import { NAV_RAIL_CSS } from './NavRail';
import { NAV_ICON_CSS } from './nav.icons';
import { NAV_GLYPH_CSS } from './nav.glyphs';
import { NAV_GLOW_CSS } from '../../siso/home-products/homeProductStyles';
import { NAV_VARIANTS_CSS } from './nav.variants.css';
import { useNavVariant } from './nav.variants';
import dynamic from '../../../../../../shims/next-dynamic';
import { BRAND } from './nav.data';
import { SisoLogo } from '../../siso/SisoLogo';

const NavAccount = dynamic(() => import('./NavAccount'), { ssr: false });
// A Clerk session leaves one of these cookies; without one the visitor is signed out and Clerk never loads (NavAccount.tsx).
const SESSION_COOKIE = /(?:^|;\s*)(?:__client_uat(?:_[\w-]+)?=[1-9]|__session=)/;

type Menu = 'product' | 'agency' | 'resources' | 'blog' | null;

export function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<Menu>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  // The bar's border fades in over the first 5% of the page's scroll, as useScroll + useTransform drew it, but the page
  // height is read only when it changes (ResizeObserver). useScroll read scrollHeight on every scrolling frame, which forced
  // a style pass over the whole page each frame on every page: ~38 ms a frame with the CPU slowed 4x on /great-library/ (9 Oct).
  const borderColor = useMotionValue('rgba(122,123,127,0)');
  useEffect(() => {
    const doc = document.documentElement;
    let end = 1;
    const apply = () => borderColor.set(`rgba(122,123,127,${(0.25 * Math.min(1, Math.max(0, window.scrollY / (0.05 * end)))).toFixed(3)})`);
    const sizes = () => { end = Math.max(1, doc.scrollHeight - window.innerHeight); apply(); };
    const ro = new ResizeObserver(sizes);
    ro.observe(doc);
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', sizes, { passive: true });
    sizes();
    return () => { ro.disconnect(); window.removeEventListener('scroll', apply); window.removeEventListener('resize', sizes); };
  }, [borderColor]);
  const pathname = usePathname();
  const [hasSession, setHasSession] = useState(false);
  const [isSignedIn, setSignedIn] = useState(false);
  const [deskSlot, setDeskSlot] = useState<HTMLElement | null>(null);
  const [mobSlot, setMobSlot] = useState<HTMLElement | null>(null);
  useEffect(() => { setHasSession(SESSION_COOKIE.test(document.cookie)); }, []);
  // Which variation of the bar is on screen (?nav=1|2|3; no query string keeps the current one). The open panel is
  // position:fixed and so is not a descendant of the bar — it reads the variant off <html> instead.
  const variant = useNavVariant();
  useEffect(() => {
    const root = document.documentElement;
    if (variant) root.dataset.nav = String(variant); else delete root.dataset.nav;
  }, [variant]);

  const toggle = useCallback((m: Exclude<Menu, null>) => setMenu(cur => (cur === m ? null : m)), []);
  const navigate = useCallback(() => { setMenu(null); setMobileOpen(false); }, []);
  // The phone drawer (t-0582): the page behind it does not scroll, and the section just opened scrolls to the top of the
  // drawer so its header and first rows are in view (one section is open at a time: `menu` holds one key).
  useEffect(() => {
    if (!mobileOpen) return;
    const html = document.documentElement, prev = html.style.overflow;
    html.style.overflow = 'hidden';
    return () => { html.style.overflow = prev; };
  }, [mobileOpen]);
  useEffect(() => {
    if (!mobileOpen || !menu) return;
    const drawer = document.getElementById('siso-mobile-nav');
    const id = requestAnimationFrame(() => {
      const btn = drawer?.querySelector<HTMLElement>('.nav-link-btn[aria-expanded="true"]');
      if (drawer && btn) drawer.scrollTo({ top: btn.offsetTop - 8, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(id);
  }, [mobileOpen, menu]);
  // The pointer's light (Shaan, 9 Oct: "make this top nav nicer ... the last thing that would really make this shit pop"):
  // one pill glides to whichever link is under the pointer and stays on an open menu's toggle (CSS: .nav-pill). Its first
  // appearance lands in place instead of sliding in from the left edge.
  const pillTo = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const links = e.currentTarget;
    const link = (e.target as HTMLElement).closest<HTMLElement>('.nav-link-btn, .nav-simple-link');
    const pill = links.querySelector<HTMLElement>(':scope > .nav-pill');
    if (!link || !pill || link.closest('.siso-nav-dropdown')) return;
    const a = link.getBoundingClientRect(), b = links.getBoundingClientRect();
    const first = getComputedStyle(pill).opacity === '0';
    if (first) pill.style.transition = 'opacity .35s';
    links.style.setProperty('--pill-x', `${Math.round(a.left - b.left)}px`);
    links.style.setProperty('--pill-w', `${Math.round(a.width)}px`);
    links.setAttribute('data-pill', '');
    if (first) { void pill.offsetWidth; pill.style.transition = ''; }
  }, []);

  useEffect(() => { setMenu(null); setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 992px)');
    const onChange = () => { setMobileOpen(false); setMenu(null); };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!menu && !mobileOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (navRef.current?.contains(t)) return;
      if (t instanceof Element && t.closest('[data-nav-lightbox]')) return;
      setMenu(null);
      setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector('[data-nav-lightbox]')) return;
      if (menu) {
        Array.from(navRef.current?.querySelectorAll<HTMLButtonElement>('.nav-link-btn.is-open') ?? [])
          .find(button => button.offsetParent !== null)?.focus();
        setMenu(null);
      } else {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); window.removeEventListener('keydown', onKey); };
  }, [menu, mobileOpen]);

  return (
    <>
      <style>{`
        /* The bar is a floating capsule wrapped in Agent Base's rim (siso-agent-base ui-hub .siso-rim: a conic ring
           masked to 1.5px, turning on a registered angle), recoloured from the composer's pink-cyan to SISO's ember
           and amber (Shaan, 8 Oct: "the orb thing around our input ... with the SISO agency colors ... around the top nav"). */
        @property --siso-nav-ang { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        .nav-container {
          position: sticky; top: 0; z-index: 100;
          border-bottom: 0;
          padding: 10px 40px;
          background: linear-gradient(rgba(2,3,8,0.92) 55%, rgba(2,3,8,0));
          font-family: Inter, sans-serif;
          --nav-ember: #FF6A1A; --nav-amber: #FFB547; --nav-gold: #FFC24B; --nav-rose: #FF2D55;
        }
        .nav-inner {
          max-width: 1360px; margin: 0 auto; padding: 0 12px 0 16px;
          height: 64px; display: flex; align-items: center; gap: 36px;
          position: relative; border-radius: 20px;
          --nav-ring: conic-gradient(from var(--siso-nav-ang), var(--nav-ember), var(--nav-gold), #fff3d6 18%, var(--nav-rose) 30%,
            color-mix(in srgb, var(--nav-ember) 18%, transparent) 46%, color-mix(in srgb, var(--nav-ember) 18%, transparent) 56%,
            var(--nav-rose) 72%, var(--nav-ember));
          box-shadow: 0 0 0 1px #ffffff08, 0 16px 48px -16px color-mix(in srgb, var(--nav-ember) 60%, transparent),
            0 0 40px -12px color-mix(in srgb, var(--nav-rose) 45%, transparent);
        }
        /* The neon: a 2px ring above the glass (z 2; it only covers the border), masked so the glass never shows the gradient
           through its middle ... */
        .nav-inner::before {
          content: ""; position: absolute; inset: 0; z-index: 2; padding: 2px; border-radius: inherit; pointer-events: none;
          background: var(--nav-ring);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          animation: siso-nav-spin 6s linear infinite;
        }
        /* ... and its bloom: the same ring blurred on a parent, so the blur is not clipped by the ring's mask. */
        .nav-inner > .nav-neon { position: absolute; inset: -3px; z-index: -1; pointer-events: none; filter: blur(9px); opacity: 0.9; }
        .nav-inner > .nav-neon > i {
          position: absolute; inset: 0; padding: 5px; border-radius: 23px; background: var(--nav-ring);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          animation: siso-nav-spin 6s linear infinite;
        }
        .nav-inner > * { position: relative; z-index: 1; }
        /* The glass is its own layer: backdrop-filter on .nav-inner would make it the containing block of the fixed dropdowns. */
        .nav-inner > .nav-glass {
          position: absolute; inset: 0; z-index: 0; border-radius: inherit; pointer-events: none;
          background: rgba(17,14,12,0.80);
          -webkit-backdrop-filter: blur(18px) saturate(140%); backdrop-filter: blur(18px) saturate(140%);
        }
        @keyframes siso-nav-spin { to { --siso-nav-ang: 360deg; } }
        /* The hand-off. While a menu is open the ring and its bloom fade out (and stop turning) and a quiet hairline holds the
           bar's edge; the open panel takes the neon. Both ways ease over half a second, so nothing flashes. */
        .nav-inner { transition: box-shadow .6s cubic-bezier(.19,1,.22,1); }
        .nav-inner::before, .nav-inner > .nav-neon { transition: opacity .5s cubic-bezier(.19,1,.22,1); }
        .nav-inner > .nav-quiet { position: absolute; inset: 0; z-index: 2; border-radius: inherit; pointer-events: none;
          box-shadow: inset 0 0 0 1px #ffffff1f; opacity: 0; transition: opacity .5s cubic-bezier(.19,1,.22,1); }
        .nav-container[data-menu] .nav-inner { box-shadow: 0 0 0 1px #ffffff08, 0 16px 48px -20px #000c; }
        .nav-container[data-menu] .nav-inner::before, .nav-container[data-menu] .nav-inner > .nav-neon { opacity: 0; }
        .nav-container[data-menu] .nav-inner::before, .nav-container[data-menu] .nav-inner > .nav-neon > i { animation-play-state: paused; }
        .nav-container[data-menu] .nav-inner > .nav-quiet { opacity: 1; }
        /* The open panel's neon: the Agent Base card's rim (two comets on a registered angle) over a faint full ring, a blurred
           copy outside the panel as its bloom, and a low glow rising from the panel's floor; all in the nav's glow colours, so
           pointing at a product turns them that product's colour. */
        @property --siso-panel-ang { syntax: "<angle>"; initial-value: 0deg; inherits: false; }
        @keyframes siso-panel-spin { to { --siso-panel-ang: 360deg; } }
        .siso-nav-dropdown {
          --panel-ring: conic-gradient(from var(--siso-panel-ang), transparent 0deg, var(--nav-ember) 50deg, var(--nav-gold) 80deg, #fff3d6 95deg,
            var(--nav-rose) 112deg, transparent 165deg, transparent 195deg, var(--nav-ember) 245deg, #fff3d6 272deg, var(--nav-rose) 292deg, transparent 340deg);
        }
        .siso-nav-dropdown-inner { position: relative; isolation: isolate;
          background: radial-gradient(60% 55% at 50% 118%, color-mix(in srgb, var(--nav-ember) 13%, transparent), transparent 70%), #05060a;
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--nav-ember) 24%, #ffffff0a), 0 30px 80px -30px #000, 0 0 70px -30px var(--nav-ember); }
        .siso-nav-dropdown-inner::after { content: ""; position: absolute; inset: 0; z-index: 5; padding: 1.5px; border-radius: inherit; pointer-events: none;
          background: var(--panel-ring);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          animation: siso-panel-spin 7s linear infinite; }
        .siso-nav-dropdown > .nav-panel-bloom { position: absolute; inset: -4px; z-index: -1; pointer-events: none; filter: blur(12px); opacity: .7; }
        .siso-nav-dropdown > .nav-panel-bloom > i { position: absolute; inset: 0; padding: 5px; border-radius: 32px; background: var(--panel-ring);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
          animation: siso-panel-spin 7s linear infinite; }
        /* The rim capsule is 84px tall (Foreplay's bar was 67): give page heroes the difference so their tops clear it. */
        @media (min-width: 992px) { .product-hero { padding-top: 34px; } }
        .nav-logo { display: flex; align-items: center; padding: 4px; border-radius: 10px; text-decoration: none; }
        .nav-links { display: flex; align-items: center; gap: 12px; flex: 1; }
        .nav-link-btn, .nav-simple-link, .nav-signin {
          font-size: 15px; line-height: 20px; font-weight: 400;
          color: #ffffff85; background: transparent; border: none; text-decoration: none;
          cursor: pointer; border-radius: 10px; white-space: nowrap;
          display: flex; align-items: center; gap: 4px;
          transition: all .5s cubic-bezier(.19,1,.22,1);
        }
        .nav-link-btn { padding: 6px 6px 6px 10px; }
        .nav-simple-link, .nav-signin { padding: 6px 10px; }
        .nav-link-btn:hover, .nav-link-btn.is-open, .nav-simple-link:hover, .nav-signin:hover { color: #fff; }
        .nav-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }
        .nav-trial-btn {
          font-size: 15px; line-height: 20px; font-weight: 600; color: #090a0e;
          text-decoration: none; padding: 8px; border: none; border-radius: 10px; cursor: pointer;
          background: #fff; transition: all .6s cubic-bezier(.19,1,.22,1); white-space: nowrap;
          display: inline-flex; align-items: center;
        }
        .nav-trial-btn > span { padding: 0 6px; }
        .nav-trial-btn:hover { background: #dddee5; }
        /* An ember sheen crosses the button on hover. */
        .nav-trial-btn { position: relative; overflow: hidden; isolation: isolate; }
        .nav-trial-btn::after { content: ""; position: absolute; inset: 0; z-index: -1; pointer-events: none;
          background: linear-gradient(105deg, transparent 30%, #ff6a1a38 48%, #ffc24b40 52%, transparent 70%);
          transform: translateX(-110%); transition: transform .9s cubic-bezier(.19,1,.22,1); }
        .nav-trial-btn:hover::after, .nav-trial-btn:focus-visible::after { transform: translateX(110%); }
        /* The pointer's light: a soft glass pill under the hovered link, an ember hairline under it, in the nav's glow colours. */
        .nav-links { position: relative; }
        .nav-links > div > .nav-link-btn, .nav-links > .nav-simple-link { position: relative; z-index: 1; }
        .nav-pill { position: absolute; z-index: 0; left: 0; top: 50%; height: 34px; margin-top: -17px; width: var(--pill-w, 0px);
          transform: translateX(var(--pill-x, 0px)); border-radius: 11px; pointer-events: none; opacity: 0;
          background: linear-gradient(180deg, #ffffff14, #ffffff05); box-shadow: inset 0 0 0 1px #ffffff17, inset 0 1px 0 #ffffff1f;
          transition: transform .5s cubic-bezier(.19,1,.22,1), width .5s cubic-bezier(.19,1,.22,1), opacity .35s; }
        .nav-pill::after { content: ""; position: absolute; left: 16%; right: 16%; bottom: -1px; height: 1px; border-radius: 1px;
          background: linear-gradient(90deg, transparent, var(--nav-ember, #ff6a1a), var(--nav-gold, #ffc24b), var(--nav-ember, #ff6a1a), transparent);
          box-shadow: 0 0 10px var(--nav-ember, #ff6a1a); transition: background .6s; }
        .nav-links[data-pill] > .nav-pill, .nav-container[data-menu] .nav-links > .nav-pill { opacity: 1; }
        /* Open and close (IX2 Navbar: 20px rise, opacity, 350ms; ours 14px): CSS transitions on data-open, so they run on the
           compositor. Closed, the dim behind goes invisible once its fade ends. */
        .siso-nav-dropdown { opacity: 0; transform: translateY(14px);
          transition: opacity .35s cubic-bezier(.19,1,.22,1), transform .35s cubic-bezier(.19,1,.22,1), content-visibility .35s allow-discrete; }
        .siso-nav-dropdown[data-open] { opacity: 1; transform: none; }
        .siso-nav-backdrop { opacity: 0; visibility: hidden; transition: opacity .3s cubic-bezier(.19,1,.22,1), visibility 0s linear .3s; }
        .siso-nav-backdrop[data-open] { opacity: 1; visibility: visible; transition: opacity .3s cubic-bezier(.19,1,.22,1); }
        /* A closed panel stays mounted (DropdownContainer): nothing in it moves until it opens. */
        .siso-nav-dropdown:not([data-open]), .siso-nav-dropdown:not([data-open]) *,
        .siso-nav-dropdown:not([data-open]) *::before, .siso-nav-dropdown:not([data-open]) *::after { animation-play-state: paused !important; }
        /* ...and the browser skips its ~1,600 elements' style and layout (content-visibility), once its fade-out has ended. The bar
           fades its glow colours (registered, inherited --nav-ember/gold/rose) over .7s whenever data-glow changes: hovering a
           product card on home, the Great Library hero leaving the screen. Every frame of that fade restyled every element in all
           three mounted panels: 14 frames over 20 ms crossing /great-library/'s hero with the CPU slowed 4x, 1 with this (9 Oct). */
        .siso-nav-dropdown:not([data-open]) { content-visibility: hidden; }
        .nav-sub-link { transition: opacity .2s; }
        .nav-sub-link:hover { opacity: .8; }
        .nav-sub-link.dropdown-link { color: #ffffffad; transition: opacity .2s; }
        .nav-sub-link.dropdown-link:hover { background: transparent; color: #fff; }
        .nav-sub-link .arrow { flex-shrink: 0; opacity: 0; transform: translateX(-20px); transition: transform 300ms ease, opacity 300ms ease; }
        .nav-sub-link:hover .arrow, .nav-sub-link:focus-visible .arrow { opacity: 1; transform: translateX(0); }
        .nav-sub-link:focus-visible { outline: 3px solid #ffffffad; outline-offset: 2px; }
        .nav-link-btn:focus-visible, .nav-simple-link:focus-visible, .nav-signin:focus-visible,
        .mobile-menu-btn:focus-visible, .nav-badge-link:focus-visible { outline: 3px solid #2a2b30; outline-offset: 2px; }
        @media (min-width: 992px) {
          .nav-badge-link:hover .nav-badge-gradient { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-btn {
          display: none; background: transparent; border: none;
          cursor: pointer; color: white; padding: 8px; margin-left: auto;
        }
        @media (max-width: 991px) {
          .nav-links, .nav-right { display: none; }
          .mobile-menu-btn { display: flex; }
          .nav-container { backdrop-filter: none; background: #020308; padding: 8px 12px; }
          .nav-inner { height: 56px; }
        }
        .mobile-menu { display: none; flex-direction: column; background: #020308; border-top: 1px solid rgba(255,255,255,0.08); padding: 16px 24px; gap: 4px; }
        .mobile-menu-overlay { position: absolute; top: 100%; left: 0; right: 0; overflow: hidden; }
        .mobile-menu { position: relative; height: calc(100dvh - 72px); overflow-y: auto; overscroll-behavior: contain; }
        /* The menu ends in the bar's one call to action, a white Sign in, with the address under it. */
        .mobile-cta { margin-top: auto; padding: 24px 0 calc(16px + env(safe-area-inset-bottom)); display: grid; grid-template-columns: 1fr; gap: 10px; }
        .mobile-cta > a { display: block; text-decoration: none; }
        .mobile-cta .m-talk, .mobile-cta .m-in { width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 48px; border-radius: 12px;
          font: 600 15px/1 Inter, sans-serif; text-decoration: none; cursor: pointer; border: 0; transition: background .3s, box-shadow .3s; }
        .mobile-cta .m-talk { background: #fff; color: #090a0e; }
        .mobile-cta .m-talk:active { background: #dddee5; }
        .mobile-cta .m-in { background: #ffffff0a; color: #fff; box-shadow: inset 0 0 0 1px #ffffff1f; }
        .mobile-cta > small { grid-column: 1 / -1; text-align: center; font: 500 11px/1 'Geist Mono', ui-monospace, monospace; letter-spacing: .12em; color: #ffffff66; }
        .mobile-cta > small a { color: inherit; text-decoration: none; }
        .mobile-menu-btn[aria-expanded="true"] { background: #2a2b30; border-radius: 8px; }
        @media (max-width: 991px) {
          .mobile-menu { display: flex; }
          .mobile-menu .nav-link-btn { width: 100%; justify-content: space-between; padding: 12px 0; }
          .mobile-menu > .nav-simple-link { display: block; width: 100%; padding: 12px 0; text-align: left; }
          /* The desktop backdrop dims the page under a panel; in the drawer it would dim the other rows and Sign in. */
          .mobile-menu .siso-nav-backdrop { display: none !important; }
          .mobile-menu .siso-nav-dropdown:not([data-open]) { display: none !important; }
          .mobile-menu .siso-nav-dropdown { position: relative !important; top: auto !important; left: auto !important; right: auto !important; width: auto !important; }
          .mobile-menu .nav-panel-bloom, .mobile-menu .siso-nav-dropdown-inner::after { display: none; }
          .mobile-menu .siso-nav-dropdown-inner { background: none !important; box-shadow: none !important; }
          .mobile-menu .siso-nav-dropdown-inner { border: none !important; border-radius: 0 !important; }
          .mobile-menu .siso-nav-dropdown-inner > div { display: flex !important; flex-direction: column; gap: 0 !important; }
          .mobile-menu .siso-nav-dropdown-inner > div > div { width: 100% !important; border: none !important; }
          .mobile-menu .siso-nav-dropdown-inner ul { display: flex !important; flex-direction: column; gap: 4px !important; }
          .mobile-menu .siso-nav-dropdown-inner li { width: 100%; }
          .mobile-menu .nav-badge-link { flex-direction: row !important; text-align: left !important; justify-content: space-between; }
          .mobile-menu .nav-badge-link > div { align-items: flex-start !important; }
          .mobile-menu .nav-badge-link > div:has(.sprite-image) { width: 44px !important; height: 44px !important; margin: 0 !important; }
          .mobile-menu .nav-badge-link .sprite-image { width: 44px !important; height: 44px !important; }
          .mobile-menu .nav-product-banner { display: none !important; }
          .mobile-menu .nav-merch-card { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-pill, .nav-trial-btn::after, .siso-nav-dropdown, .siso-nav-backdrop { transition: none !important; }
          .siso-nav-dropdown { transform: none; }
          .nav-inner::before, .nav-inner > .nav-neon > i, .siso-nav-dropdown-inner::after, .siso-nav-dropdown > .nav-panel-bloom > i { animation: none; }
          .nav-inner, .nav-inner::before, .nav-inner > .nav-neon, .nav-inner > .nav-quiet { transition: none; }
          .nav-container .nav-icon, .nav-container .arrow, .nav-container .nav-badge-gradient { transition: none !important; }
          .nav-container .nav-link-btn, .nav-container .nav-simple-link, .nav-container .nav-signin,
          .nav-container .nav-trial-btn, .nav-container .nav-sub-link { transition: none !important; }
        }
        .mobile-menu > a { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 16px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        ${NAV_RAIL_CSS}
        ${NAV_ICON_CSS}
        ${NAV_GLYPH_CSS}
        ${NAV_GLOW_CSS}
        ${NAV_VARIANTS_CSS}
      `}</style>

      <motion.div className="nav-container" ref={navRef} onPointerEnter={warmMenus} onFocusCapture={warmMenus} data-nav={variant || undefined} data-menu={!mobileOpen && menu ? menu : undefined} style={{ borderBottomColor: reducedMotion ? 'rgba(122,123,127,0.25)' : borderColor }}>
        <div className="nav-inner">
          <span className="nav-neon" aria-hidden="true"><i /></span>
          <span className="nav-glass" aria-hidden="true" />
          <span className="nav-quiet" aria-hidden="true" />
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <SisoLogo />
          </Link>

          {/* Desktop nav */}
          <div className="nav-links" onPointerOver={pillTo} onPointerLeave={e => e.currentTarget.removeAttribute('data-pill')}>
            <span className="nav-pill" aria-hidden="true" />
            <ProductDropdown open={!mobileOpen && menu === 'product'} onToggle={() => toggle('product')} onNavigate={navigate} />
            {/* Shaan, 8 Oct: "instead of industries ... it should be called agency"; 9 Oct: "the agency one can be a drop down". */}
            <AgencyDropdown open={!mobileOpen && menu === 'agency'} onToggle={() => toggle('agency')} onNavigate={navigate} />
            <ResourcesDropdown open={!mobileOpen && menu === 'resources'} onToggle={() => toggle('resources')} onNavigate={navigate} />
            {/* Shaan, 9 Oct: "blog should just be a blog button ... it makes it too many drop downs". BlogDropdown stays in the folder. */}
            <Link href="/blog/" className="nav-simple-link" onClick={() => navigate()}>Blog</Link>
          </div>

          {/* Right: auth */}
          <div className="nav-right">
            {hasSession && <NavAccount onSignedIn={setSignedIn} slots={[deskSlot, mobSlot]} />}
            {isSignedIn ? (
              <span ref={setDeskSlot} className="nav-acct" />
            ) : (
              <>
                {/* One call to action (Shaan, 9 Oct ~23:00): "sign in will be the call to action not talk to us"; "get agent base
                    shouldn't be there". Contact stays in Resources and the footer. Our own sign-in page, Clerk underneath. */}
                <Link href="/sign-in/" className="nav-trial-btn" style={{ textDecoration: 'none' }}>
                    <span>Sign in</span>
                    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" style={{ transform: 'rotate(-90deg)' }}>
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#090a0e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button type="button" ref={mobileButtonRef} className="mobile-menu-btn" onClick={() => { setMobileOpen(v => !v); setMenu(null); }} aria-label="Menu" aria-expanded={mobileOpen} aria-controls="siso-mobile-nav">
            <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
              <path d="M16.75 6.25H3.25M16.75 13.75H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        <div className="mobile-menu-overlay">
        <AnimatePresence>
        {mobileOpen && <motion.nav
          id="siso-mobile-nav"
          aria-label="Mobile navigation"
          className="mobile-menu"
          initial={{ y: reducedMotion ? 0 : 'calc(-100% - 72px)' }}
          animate={{ y: 0 }}
          exit={{ y: reducedMotion ? 0 : 'calc(-100% - 72px)' }}
          transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onAnimationStart={definition => {
            const panel = document.getElementById('siso-mobile-nav');
            if (panel && typeof definition === 'object' && 'y' in definition) panel.inert = definition.y !== 0;
          }}
        >
          <ProductDropdown open={menu === 'product'} onToggle={() => toggle('product')} onNavigate={navigate} />
          <AgencyDropdown open={menu === 'agency'} onToggle={() => toggle('agency')} onNavigate={navigate} />
          <ResourcesDropdown open={menu === 'resources'} onToggle={() => toggle('resources')} onNavigate={navigate} />
          <Link href="/blog/" className="nav-simple-link" onClick={() => navigate()}>Blog</Link>
          {isSignedIn ? (
            <span ref={setMobSlot} className="nav-acct" />
          ) : (
            <div className="mobile-cta">
              <Link href="/sign-in/" className="m-talk" onClick={() => setMobileOpen(false)}>Sign in
                <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true"><path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <small><a href="mailto:hello@sisolabs.space">hello@sisolabs.space</a></small>
            </div>
          )}
        </motion.nav>}
        </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

export { NavBar as MarketingNavBar };
export default NavBar;
