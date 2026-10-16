// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/ProductDropdown.tsx)
'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// ProductDropdown - the Ecosystem menu, in SISO's own parts (Shaan, 9 Oct: "maybe the icons are shit ... it just doesn't
// feel very SISO-y"). Left: the six products as tiles, each with its living icon (WorkspaceMark, LivingIcon, ProductGlyph),
// its colour and one true line; the icon plays on hover and the panel's rim takes the product's colour (html[data-glow]).
// Under them, Agent Base's real modules as a compact icon row, then the footer's notched rail with "All projects" in its tab.
// Right: the "What is SISO?" video slot he likes (Foreplay's reel until ours exists).
//
// Default since 9 Oct is the CLASSIC layout (Shaan: "how it was before was originally better ... the icons are better"):
// Foreplay's shape from eb4fae7 (Open source | More columns, centred names with the big icon peeking up from the bottom
// edge, an "Inside Agent Base" row, the video on the right), drawn with the new product icons. ?nav=v2 shows the tiles.
// ═══════════════════════════════════════════════════════════════════════════════

import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'framer-motion';
import { LivingIcon, WorkspaceMark } from '../../siso/living/living-assets';
import { ProductGlyph } from '../../siso/ProductGlyph';
import { DropdownContainer, DropdownToggle, useMenuOpen } from './DropdownContainer';
import { NavRail } from './NavRail';
import { ECOSYSTEM, AGENT_BASE_MODULES, ALL_PROJECTS, PRODUCT_BANNER, type EcoIcon } from './nav.data';
import { PlayIcon } from './nav.icons';
import { navGlow } from './nav.glow';

interface DropdownProps {
  open: boolean;
  onToggle: () => void;
}

const CSS = `
@property --ne-ang{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes ne-ang{to{--ne-ang:360deg}}
.ne{display:grid;grid-template-columns:minmax(0,1fr) 336px;font-family:Inter,sans-serif}
.ne-main{display:flex;flex-direction:column;gap:12px;min-width:0;padding:20px 22px 0}
.ne-over{display:flex;align-items:center;justify-content:space-between;padding:0 4px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffffff8c}
.ne-over b{font-weight:500;color:color-mix(in srgb,var(--nav-gold) 80%,white);transition:color .6s}
.ne-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none}
.ne-grid>li{display:flex;min-width:0}
.ne-tile{--c:#ff6a1a;position:relative;isolation:isolate;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-start;gap:12px;width:100%;min-width:0;padding:16px 14px 14px;border-radius:16px;
  text-decoration:none;overflow:hidden;background:#ffffff04;box-shadow:inset 0 0 0 1px #ffffff0e;
  transition:transform .45s cubic-bezier(.19,1,.22,1),background .45s,box-shadow .45s}
.ne-tile::before{content:"";position:absolute;z-index:-1;left:-30%;right:-30%;bottom:-70%;height:110%;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,var(--c),transparent);filter:blur(20px);opacity:.14;transform:translateY(24px);
  transition:opacity .7s cubic-bezier(.19,1,.22,1),transform .7s cubic-bezier(.19,1,.22,1)}
.ne-tile::after{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;
  background:conic-gradient(from var(--ne-ang),transparent 0deg,var(--c) 55deg,#fff3d6 85deg,transparent 140deg,transparent 200deg,var(--c) 250deg,transparent 320deg);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:ne-ang 4s linear infinite;animation-play-state:paused;transition:opacity .35s}
.ne-tile:hover,.ne-tile:focus-visible{transform:translateY(-3px);background:color-mix(in srgb,var(--c) 8%,#0a0b0f);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 30%,transparent),0 18px 40px -22px var(--c)}
.ne-tile:hover::before,.ne-tile:focus-visible::before{opacity:.5;transform:none}
.ne-tile:hover::after,.ne-tile:focus-visible::after{opacity:1;animation-play-state:running}
.ne-tile:focus-visible{outline:2px solid #ffffffad;outline-offset:3px}
.ne-ico{position:relative;display:grid;place-items:center;width:48px;height:48px;transition:transform .5s cubic-bezier(.19,1,.22,1)}
.ne-ico::after{content:"";position:absolute;left:8%;right:8%;bottom:-7px;height:10px;border-radius:50%;background:var(--c);filter:blur(8px);opacity:.45;z-index:-1;transition:opacity .5s}
.ne-tile:hover .ne-ico,.ne-tile:focus-visible .ne-ico{transform:scale(1.1) rotate(-6deg)}
.ne-tile:hover .ne-ico::after{opacity:.85}
.ne-go{position:absolute;top:14px;right:14px;color:color-mix(in srgb,var(--c) 55%,white);opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.ne-tile:hover .ne-go,.ne-tile:focus-visible .ne-go{opacity:1;transform:none}
.ne-txt{display:flex;flex-direction:column;gap:3px;min-width:0}
.ne-name{font:500 15px/1.25 Inter,sans-serif;letter-spacing:-.01em;color:#fff}
.ne-desc{font:400 13px/1.4 Inter,sans-serif;color:#ffffff99}
.ne-proof{margin-top:auto;font:500 10px/1.3 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;color:color-mix(in srgb,var(--c) 55%,white)}
.ne-mods{display:flex;align-items:center;gap:4px 6px;flex-wrap:wrap;margin:0;padding:8px 10px;border-radius:14px;list-style:none;
  background:radial-gradient(60% 140% at 0 50%,#ed615a14,transparent 70%),#ffffff03;box-shadow:inset 0 0 0 1px #ffffff0c}
.ne-mods-label{display:flex;align-items:center;gap:8px;margin-right:8px;font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffc0b8;white-space:nowrap}
.ne-mods-label i{width:6px;height:6px;border-radius:50%;background:#ed615a;box-shadow:0 0 8px #ed615a}
.ne-mod{display:flex;align-items:center;justify-content:flex-start;gap:8px;padding:4px 10px 4px 4px;border-radius:10px;text-decoration:none;color:#ffffffb8;font:500 13px/1 Inter,sans-serif;white-space:nowrap;
  transition:transform .35s cubic-bezier(.19,1,.22,1),background .35s,color .35s,box-shadow .35s}
.ne-mod>span{display:grid;place-items:center;width:28px;height:28px;border-radius:9px;background:#111116;box-shadow:inset 0 0 0 1px #ffffff1a;transition:box-shadow .35s}
.ne-mod:hover,.ne-mod:focus-visible{color:#fff;background:#ed615a14;box-shadow:inset 0 0 0 1px #ed615a40;transform:translateY(-2px)}
.ne-mod:hover>span,.ne-mod:focus-visible>span{box-shadow:inset 0 0 0 1px #ed615a80,0 0 16px -4px #ed615a}
.ne-mod:focus-visible{outline:2px solid #ffffffad;outline-offset:2px}
.ne .nv-rail{margin:6px -22px 0}
/* Agent Base and its modules light each other: point at one and the other answers in coral. */
.ne-main:has(.ne-tile[data-key=os]:hover) .ne-mods,.ne-main:has(.ne-tile[data-key=os]:focus-visible) .ne-mods{box-shadow:inset 0 0 0 1px #ed615a59,0 0 30px -14px #ed615a}
.ne-main:has(.ne-mods:hover) .ne-tile[data-key=os]{background:color-mix(in srgb,#ed615a 6%,#0a0b0f);box-shadow:inset 0 0 0 1px #ed615a4d}
.ne-mods{transition:box-shadow .45s}
.ne-side{display:flex;flex-direction:column;justify-content:center;gap:14px;padding:22px 24px;border-left:1px solid #ffffff0f;
  background:radial-gradient(80% 60% at 50% 100%,color-mix(in srgb,var(--nav-ember) 10%,transparent),transparent 70%)}
.ne-side-over{display:flex;align-items:center;gap:8px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffffffb3}
.ne-side-over i{width:6px;height:6px;border-radius:50%;background:var(--nav-ember);box-shadow:0 0 8px var(--nav-ember)}
.ne-video{position:relative;display:block;width:100%;aspect-ratio:16/10;border-radius:14px;overflow:hidden;padding:0;border:0;cursor:pointer;background:#0a0b0f;
  box-shadow:0 0 0 1px #ffffff14,0 20px 50px -24px #000;transition:transform .5s cubic-bezier(.19,1,.22,1),box-shadow .5s}
.ne-video video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .6s,transform 1.2s cubic-bezier(.19,1,.22,1)}
/* The reel is Foreplay's (white frames); tint it into our dark ember look until our own video exists (Shaan, 9 Oct). */
.ne-video video{filter:grayscale(1) brightness(.62) contrast(1.15)}
.ne-video::after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(80% 70% at 50% 40%,color-mix(in srgb,var(--nav-ember) 30%,transparent),transparent 70%),linear-gradient(180deg,transparent 45%,#05060ae6);mix-blend-mode:normal}
.ne-video[data-playing] video{opacity:1}
/* Our own poster under the reel: the SISO mark with the six products in orbit, each in its colour. The reel fades in over it
   once it plays, so the slot is never an empty box. */
.ne-poster{position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;transition:opacity .6s;
  background:radial-gradient(60% 70% at 50% 45%,color-mix(in srgb,var(--nav-ember) 16%,transparent),transparent 70%),
    repeating-linear-gradient(90deg,#ffffff06 0 1px,transparent 1px 24px),repeating-linear-gradient(0deg,#ffffff06 0 1px,transparent 1px 24px),#07080c}
.ne-orbit{position:absolute;width:128px;height:128px;border-radius:50%;box-shadow:inset 0 0 0 1px #ffffff14;animation:ne-spin 24s linear infinite}
.ne-orbit::before{content:"";position:absolute;inset:-26px;border-radius:50%;box-shadow:inset 0 0 0 1px #ffffff0a}
.ne-orbit i{position:absolute;top:50%;left:50%;width:9px;height:9px;margin:-4.5px;border-radius:50%;background:var(--c);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--c) 22%,transparent),0 0 14px var(--c);transform:rotate(var(--a)) translateY(-64px)}
.ne-core{position:relative;width:64px;height:64px;border-radius:50%;
  background:conic-gradient(from 0deg,#ed615a,#1f69ff,#7540b7,#f5a524,#00a879,#e0336a,#ed615a);box-shadow:0 0 36px -6px var(--nav-ember);
  -webkit-mask:radial-gradient(circle,transparent 27px,#000 28px);mask:radial-gradient(circle,transparent 27px,#000 28px)}
.ne-video[data-playing] .ne-poster{opacity:0}
.ne-poster small{position:absolute;left:10px;bottom:9px;display:flex;align-items:center;gap:7px;font:500 9.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#ffffff73}
@keyframes ne-spin{to{transform:rotate(360deg)}}
.ne-video:hover,.ne-video:focus-visible{transform:translateY(-2px);box-shadow:0 0 0 1px color-mix(in srgb,var(--nav-ember) 55%,transparent),0 20px 50px -20px var(--nav-ember)}
.ne-video:hover video{transform:scale(1.04)}
.ne-video:focus-visible{outline:2px solid #ffffffad;outline-offset:3px}
.ne-play{position:absolute;top:50%;left:50%;width:50px;height:50px;margin:-25px 0 0 -25px;border-radius:50%;display:grid;place-items:center;
  background:#ffffff80;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);transition:transform .4s cubic-bezier(.19,1,.22,1),background .4s}
.ne-video:hover .ne-play{transform:scale(1.1);background:color-mix(in srgb,var(--nav-ember) 70%,transparent)}
@media (max-width:1240px){.ne{grid-template-columns:minmax(0,1fr) 260px}.ne-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media (max-width:991px){
  .mobile-menu .siso-nav-dropdown-inner .ne{display:block!important}
  .mobile-menu .siso-nav-dropdown-inner .ne-main{padding:8px 0 4px!important}
  .mobile-menu .siso-nav-dropdown-inner .ne-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
  .mobile-menu .siso-nav-dropdown-inner .ne-tile{padding:12px!important;gap:10px}
  .mobile-menu .siso-nav-dropdown-inner .ne-mods{display:flex!important;flex-direction:row!important;flex-wrap:wrap}
  .mobile-menu .siso-nav-dropdown-inner .ne-mods>li:not(.ne-mods-label){width:auto!important}
  .mobile-menu .siso-nav-dropdown-inner .ne-mods-label{width:100%;margin:4px 0 6px}
  .mobile-menu .ne .nv-rail{margin:8px 0 0}
  .mobile-menu .ne-side{display:none!important}
  .mobile-menu a.ne-tile,.mobile-menu a.ne-mod,.mobile-menu a.nv-rail-tab{border-bottom:0!important}
  .mobile-menu a.ne-tile{padding:12px!important}
  .mobile-menu a.ne-mod{padding:4px 10px 4px 4px!important;font-size:13px!important}
  .mobile-menu a.nv-rail-tab{padding:0 10px!important;font-size:11px!important}
}
@media (prefers-reduced-motion:reduce){.ne *,.ne *::before,.ne *::after{transition:none!important}.ne-tile::after,.ne-orbit{animation:none}}
`;

// The product's own icon, quiet until its tile is pointed at, then it plays once.
function EcoGlyph({ icon, on, size = 48 }: { icon: EcoIcon; on: boolean; size?: number }) {
  const [replay, setReplay] = useState(0);
  useEffect(() => { if (on) setReplay(n => n + 1); }, [on]);
  if (icon.kind === 'mark') return <WorkspaceMark brand={icon.brand} size={size} replay={replay} />;
  if (icon.kind === 'living') return <LivingIcon name={icon.name} size={size} active={on} />;
  return <ProductGlyph product={icon.product} size={size} playing={on} />;
}

function EcoTile({ p, onNavigate }: { p: (typeof ECOSYSTEM)[number]; onNavigate?: () => void }) {
  const [on, setOn] = useState(false);
  const enter = () => { setOn(true); navGlow(p.glow); };
  return (
    <li>
      <a href={p.href} className="ne-tile" data-key={p.glow} style={{ '--c': p.color } as React.CSSProperties} onClick={onNavigate}
        onPointerEnter={enter} onPointerLeave={() => setOn(false)} onFocus={enter} onBlur={() => setOn(false)}>
        <span className="ne-ico"><EcoGlyph icon={p.icon} on={on} /></span>
        <span className="ne-txt"><span className="ne-name">{p.label}</span><span className="ne-desc">{p.desc}</span></span>
        <span className="ne-proof">{p.proof}</span>
        <svg className="ne-go" width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M10.5 4.5 15 9l-4.5 4.5M14.25 9H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </li>
  );
}

function ModuleChip({ m }: { m: (typeof AGENT_BASE_MODULES)[number] }) {
  const [on, setOn] = useState(false);
  const enter = () => { setOn(true); navGlow('os'); };
  return (
    <li>
      <a href={m.href} className="ne-mod" onPointerEnter={enter} onPointerLeave={() => setOn(false)} onFocus={enter} onBlur={() => setOn(false)}>
        <span><LivingIcon name={m.icon} size={24} variant="glyph" active={on} /></span>{m.label}
      </a>
    </li>
  );
}


// ─── Classic layout (default) ────────────────────────────────────────────────
const CLASSIC_CSS = `
/* Text one step down and wrapped evenly (Shaan, 9 Oct: "the text ... doesn't fit as well as it could ... seems a bit big"). */
.nc{display:grid;grid-template-columns:minmax(0,1fr) 340px;font-family:Inter,sans-serif}
.nc-main{display:grid;grid-template-columns:repeat(10,minmax(0,1fr));min-width:0}
.nc-sec{display:flex;flex-direction:column;align-items:flex-start;min-width:0;padding:16px 16px 0;overflow:hidden}
.nc-sec+.nc-sec{border-left:1px solid #2a2b30}
.nc-over{width:100%;padding:8px;margin-bottom:6px;font-size:11px;font-weight:550;line-height:16px;letter-spacing:.166667em;text-transform:uppercase;color:#ffffffd6}
.nc-badges{display:flex;align-items:stretch;gap:12px;width:100%;margin:0;padding:0;list-style:none}
.nc-badges>li{flex:1;min-width:0;display:flex}
.nc-badge{--c:#ff6a1a;position:relative;display:flex;flex-direction:column;align-items:center;flex:1;min-width:0;padding:8px 4px 0;text-align:center;text-decoration:none}
.nc-txt{display:flex;flex-direction:column;align-items:center;gap:2px;flex:1;min-height:52px}
.nc-name{font-size:13.5px;font-weight:500;line-height:18px;letter-spacing:-.01em;color:#fff;white-space:nowrap}
.nc-desc{max-width:150px;font-size:12px;line-height:16px;letter-spacing:0;color:#ffffff8f;text-wrap:balance}
.nc-ico{position:relative;z-index:2;display:grid;place-items:center;width:88px;height:88px;margin:16px 0 -20px;transition:transform .6s cubic-bezier(.19,1,.22,1)}
.nc-glow{position:absolute;bottom:-40%;width:116px;height:116px;border-radius:16%;background:var(--c);filter:blur(28px);opacity:0;pointer-events:none;
  transition:opacity .8s cubic-bezier(.19,1,.22,1),bottom .8s cubic-bezier(.19,1,.22,1)}
.nc-badge:hover .nc-ico,.nc-badge:focus-visible .nc-ico{transform:translateY(-8px)}
.nc-badge:hover .nc-glow,.nc-badge:focus-visible .nc-glow{opacity:.5;bottom:-22%}
.nc-badge:focus-visible{outline:2px solid #ffffffad;outline-offset:2px;border-radius:12px}
.nc-mods{grid-column:1/-1;display:flex;flex-direction:column;align-items:flex-start;padding:16px;border-top:1px solid #2a2b30}
.nc-mods ul{display:flex;gap:12px;width:100%;margin:0;padding:0;list-style:none}
.nc-mods li{flex:1 1 0;min-width:0}
.nc-mod{display:flex;align-items:center;gap:12px;padding:8px;border-radius:12px;text-decoration:none;color:#fff;font-size:13.5px;font-weight:500;line-height:18px;transition:background .3s}
.nc-mod>span{display:grid;place-items:center;flex:none;width:44px;height:44px;border-radius:12px;background:#ffffff1a;transition:box-shadow .3s}
.nc-mod svg.nc-arrow{margin-left:auto;opacity:0;transform:translateX(-4px);transition:opacity .3s,transform .3s;color:#ffffffad}
.nc-mod:hover,.nc-mod:focus-visible{background:#ffffff0d}
.nc-mod:hover>span{box-shadow:inset 0 0 0 1px #ed615a80,0 0 16px -4px #ed615a}
.nc-mod:hover svg.nc-arrow{opacity:1;transform:none}
.nc .ne-side{justify-content:flex-start;padding:56px 24px 24px;border-left:1px solid #2a2b30}
@media (max-width:1240px){.nc{grid-template-columns:minmax(0,1fr) 260px}.nc-ico{width:64px;height:64px}}
@media (max-width:991px){
  .mobile-menu .siso-nav-dropdown-inner .nc{display:block!important}
  .mobile-menu .siso-nav-dropdown-inner .nc-main{display:block!important}
  .mobile-menu .siso-nav-dropdown-inner .nc-sec{padding:8px 0!important;border-left:0!important;overflow:visible}
  /* Phones (t-0582): a list of rows, a 40 px icon then the name and one line, not tiles. */
  .mobile-menu .siso-nav-dropdown-inner .nc-badges{display:flex!important;flex-direction:column!important;gap:2px!important}
  .mobile-menu .nc-badge{flex-direction:row-reverse;justify-content:flex-end;align-items:center;gap:14px;padding:8px 4px;text-align:left;border-radius:12px}
  .mobile-menu .nc-badge:active{background:#ffffff0d}
  .mobile-menu .nc-txt{align-items:flex-start;min-height:0;gap:1px}
  .mobile-menu .nc-desc{max-width:none}
  .mobile-menu .siso-nav-dropdown-inner .nc-ico{width:40px;height:40px;margin:0;flex:none}
  .mobile-menu .nc-ico>*{width:40px!important;height:40px!important}.mobile-menu .nc-ico svg{width:100%;height:100%}
  .mobile-menu .nc-glow{display:none}
  .mobile-menu .nc-badge:hover .nc-ico{transform:none}
  .mobile-menu .nc-more .nc-over{display:none}
  .mobile-menu .siso-nav-dropdown-inner .nc-mods ul{flex-wrap:wrap}
  .mobile-menu .siso-nav-dropdown-inner .nc-mods li{flex:1 1 45%}
  .mobile-menu .nc .ne-side{display:none!important}
  .mobile-menu a.nc-badge,.mobile-menu a.nc-mod{border-bottom:0!important}
}
@media (prefers-reduced-motion:reduce){.nc *{transition:none!important}}
`;

const pick = (label: string) => ECOSYSTEM.find(p => p.label === label)!;
// Shaan, 9 Oct ~23:00: Agent Base, Voice, UI Hub, Jev, Skills Hub, then All projects ("it's got its own ting"). The
// "Inside Agent Base" row is gone from the menu ("I don't think that should be showing"); the modules stay on /agent-base/.
const PRODUCTS = ['Agent Base', 'Voice', 'UI Hub', 'Jev', 'Skills Hub'].map(pick);
const MORE = [{ label: ALL_PROJECTS.label, href: ALL_PROJECTS.href, desc: 'Everything we open', color: '#00a879', glow: 'agency' as const, icon: { kind: 'living', name: 'estate' } as EcoIcon }];

type BadgeItem = { label: string; href: string; desc: string; color: string; glow: (typeof ECOSYSTEM)[number]['glow']; icon: EcoIcon };

function ClassicBadge({ p, onNavigate }: { p: BadgeItem; onNavigate?: () => void }) {
  const [on, setOn] = useState(false);
  const enter = () => { setOn(true); navGlow(p.glow); };
  return (
    <li>
      <a href={p.href} className="nc-badge" style={{ '--c': p.color } as React.CSSProperties} onClick={onNavigate}
        onPointerEnter={enter} onPointerLeave={() => setOn(false)} onFocus={enter} onBlur={() => setOn(false)}>
        <span className="nc-txt"><span className="nc-name">{p.label}</span><span className="nc-desc">{p.desc}</span></span>
        <span className="nc-ico"><EcoGlyph icon={p.icon} on={on} size={88} /></span>
        <span className="nc-glow" aria-hidden="true" />
      </a>
    </li>
  );
}

export function ClassicModule({ m }: { m: (typeof AGENT_BASE_MODULES)[number] }) {
  const [on, setOn] = useState(false);
  const enter = () => { setOn(true); navGlow('os'); };
  return (
    <li>
      <a href={m.href} className="nc-mod" onPointerEnter={enter} onPointerLeave={() => setOn(false)} onFocus={enter} onBlur={() => setOn(false)}>
        <span><LivingIcon name={m.icon} size={26} variant="glyph" active={on} /></span>
        {m.label}
        <svg className="nc-arrow" width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M10.5 4.5 15 9l-4.5 4.5M14.25 9H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </a>
    </li>
  );
}

function EcoClassic({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="nc">
      <div className="nc-main" onPointerLeave={() => navGlow(null)}>
        <div className="nc-sec" style={{ gridColumn: 'span 8' }}>
          <div className="nc-over">Products</div>
          <ul className="nc-badges">{PRODUCTS.map(p => <ClassicBadge key={p.label} p={p} onNavigate={onNavigate} />)}</ul>
        </div>
        <div className="nc-sec nc-more" style={{ gridColumn: 'span 2' }}>
          <div className="nc-over">More</div>
          <ul className="nc-badges">{MORE.map(p => <ClassicBadge key={p.label} p={p} onNavigate={onNavigate} />)}</ul>
        </div>
      </div>
      <ProductBanner />
    </div>
  );
}

function VideoLightbox({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const reducedMotion = useReducedMotion();
  const close = useCallback(() => {
    if (closing) return;
    setClosing(true);
    if (reducedMotion) onClose();
    else timer.current = setTimeout(onClose, 260);
  }, [closing, reducedMotion, onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const background = Array.from(document.body.children).filter((el): el is HTMLElement => el instanceof HTMLElement && !el.contains(dialog));
    const oldInert = background.map(el => el.inert);
    background.forEach(el => { el.inert = true; });
    document.body.style.overflow = 'hidden';
    dialog.querySelector<HTMLButtonElement>('button')?.focus();
    const onFocus = (e: FocusEvent) => {
      if (!dialog.contains(e.target as Node)) dialog.querySelector<HTMLButtonElement>('button')?.focus();
    };
    document.addEventListener('focusin', onFocus);
    return () => {
      clearTimeout(timer.current);
      document.removeEventListener('focusin', onFocus);
      background.forEach((el, i) => { el.inert = oldInert[i]; });
      document.body.style.overflow = overflow;
      if (previous?.isConnected) previous.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(); }
      if (e.key !== 'Tab') return;
      const items = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button,iframe,a[href],[tabindex]:not([tabindex="-1"]):not([data-focus-guard])') ?? []);
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  return createPortal(
    <div
      ref={dialogRef}
      data-nav-lightbox
      role="dialog"
      aria-modal="true"
      aria-label={PRODUCT_BANNER.title}
      className={closing ? 'nav-modal-out' : 'nav-modal-in'}
      onClick={e => { if (e.target === e.currentTarget) close(); }}
      onAnimationEnd={e => { if (closing && e.target === e.currentTarget) { clearTimeout(timer.current); onClose(); } }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <style>{`
        @keyframes modalIn { from { opacity: 0; transform: translateY(10px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes modalOut { from { opacity: 1; transform: translateY(0) scale(1); } to { opacity: 0; transform: translateY(6px) scale(.97); } }
        .nav-modal-in { animation: modalIn 380ms cubic-bezier(.16,1,.3,1) both; }
        .nav-modal-out { animation: modalOut 260ms cubic-bezier(.16,1,.3,1) both; }
        .nav-modal-focus-guard { position: absolute; width: 1px; height: 1px; overflow: hidden; opacity: 0; }
        @media (prefers-reduced-motion: reduce) { .nav-modal-in, .nav-modal-out { animation: none; } }
      `}</style>
      <span data-focus-guard tabIndex={0} className="nav-modal-focus-guard"
        onFocus={() => dialogRef.current?.querySelector<HTMLIFrameElement>('iframe')?.focus()} />
      <button type="button" onClick={close} aria-label="Close video" style={{ position: 'absolute', top: 20, right: 20, border: 0, background: 'transparent', color: 'white', fontSize: 32, cursor: 'pointer' }}>×</button>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${PRODUCT_BANNER.youtubeId}?autoplay=1`}
        title={PRODUCT_BANNER.title}
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        style={{ width: 'min(940px, 90vw)', aspectRatio: '940 / 528', border: 0 }}
      />
      {/* Tab events inside the cross-origin player do not reach this document. */}
      <span data-focus-guard tabIndex={0} className="nav-modal-focus-guard"
        onFocus={() => dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus()} />
    </div>,
    document.body,
  );
}

function ProductBanner() {
  const [lightbox, setLightbox] = useState(false);
  const closeLightbox = useCallback(() => setLightbox(false), []);
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  // It plays only while its menu is open; the panel stays mounted between opens.
  const open = useMenuOpen();
  useEffect(() => {
    if (reducedMotion !== false || !open) videoRef.current?.pause();
    else videoRef.current?.play().catch(() => {});
  }, [reducedMotion, open]);

  return (
    <div className="nav-product-banner ne-side">
      <div className="ne-side-over"><i aria-hidden="true" />{PRODUCT_BANNER.title}</div>
      <button type="button" className="ne-video" aria-label={`Play: ${PRODUCT_BANNER.title}`} aria-haspopup="dialog" onClick={() => setLightbox(true)}>
        <span className="ne-poster" aria-hidden="true">
          <span className="ne-orbit">{ECOSYSTEM.map((p, i) => <i key={p.label} style={{ '--c': p.color, '--a': `${i * 60}deg` } as React.CSSProperties} />)}</span>
          <span className="ne-core" />
          <small><img src="/brand/siso-mark.png" alt="" width={16} height={16} style={{ borderRadius: '50%' }} />{ECOSYSTEM.length} products · one OS</small>
        </span>
        <video ref={videoRef} autoPlay={open && reducedMotion === false} loop muted playsInline
          onPlaying={e => e.currentTarget.parentElement?.setAttribute('data-playing', '')}>
          <source src={PRODUCT_BANNER.videoMp4} type="video/mp4" />
          <source src={PRODUCT_BANNER.videoWebm} type="video/webm" />
        </video>
        <span className="ne-play"><PlayIcon /></span>
      </button>
      {lightbox && <VideoLightbox onClose={closeLightbox} />}
    </div>
  );
}

export function ProductDropdown({ open, onToggle, onNavigate }: DropdownProps & { onNavigate?: () => void }) {
  const id = useId();
  // Leaving the products hands the glow back; so does closing the menu with a product still under the pointer.
  useEffect(() => { if (!open) navGlow(null); }, [open]);
  // ?nav=v2 keeps the tile layout reachable beside the classic one; read after mount so the static HTML matches.
  const [v2, setV2] = useState(false);
  useEffect(() => { setV2(new URLSearchParams(window.location.search).get('nav') === 'v2'); }, []);
  return (
    <div>
      {/* Parsed once with the bar, not on every open: a stylesheet mounting with the panel restyles the whole page. */}
      <style>{CSS}</style>
      <style>{CLASSIC_CSS}</style>
      <DropdownToggle id={`${id}-toggle`} listId={`${id}-list`} label="Ecosystem" open={open} onToggle={onToggle} />

      <DropdownContainer id={`${id}-list`} labelledBy={`${id}-toggle`} open={open}>
        {!v2 ? <EcoClassic onNavigate={onNavigate} /> : (
        <div className="ne">
          <div className="ne-main" onPointerLeave={() => navGlow(null)}>
            <div className="ne-over"><span>The SISO Labs ecosystem</span><b>{ECOSYSTEM.length} products</b></div>
            <ul className="ne-grid">{ECOSYSTEM.map(p => <EcoTile key={p.label} p={p} onNavigate={onNavigate} />)}</ul>
            <ul className="ne-mods" aria-label="Inside Agent Base">
              <li className="ne-mods-label" aria-hidden="true"><i />Inside Agent Base</li>
              {AGENT_BASE_MODULES.map(m => <ModuleChip key={m.label} m={m} />)}
            </ul>
            <NavRail label={ALL_PROJECTS.label} href={ALL_PROJECTS.href} onNavigate={onNavigate} />
          </div>
          <ProductBanner />
        </div>
        )}
      </DropdownContainer>
    </div>
  );
}
