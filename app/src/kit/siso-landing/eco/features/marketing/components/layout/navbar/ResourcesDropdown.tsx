// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/ResourcesDropdown.tsx)
'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// ResourcesDropdown - redesigned in SISO's parts (Shaan, 9 Oct: "resources I don't know we've got to redesign that").
// Left: Docs first as the tall card (he asked for Docs in Resources), then Changelog, Research, Great Library, Industries,
// Corner Café and Contact as tiles in the Ecosystem menu's family: each with its own coded icon (NavGlyph, or the product's own
// ProductGlyph / living icon), its colour and one line; the icon plays once on hover and the rim takes the product's colour
// where the item is a product's. The footer's notched rail closes it with "Work with us".
// Right: the Merch card over its looping video (Shaan likes it). Links to other sites open in a new tab and say so with ↗.
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LivingIcon } from '../../siso/living/living-assets';
import { ProductGlyph } from '../../siso/ProductGlyph';
import { DropdownContainer, DropdownToggle, useMenuOpen } from './DropdownContainer';
import { NavRail } from './NavRail';
import { RESOURCES, RESOURCES_MERCH, RESOURCES_RAIL, type ResourceIcon } from './nav.data';
import { NavGlyph } from './nav.glyphs';
import { ArrowIcon } from './nav.icons';
import { navGlow } from './nav.glow';

interface DropdownProps {
  open: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

const CSS = `
@property --nr-ang{syntax:'<angle>';inherits:false;initial-value:0deg}
@keyframes nr-ang{to{--nr-ang:360deg}}
.nr{display:grid;grid-template-columns:minmax(0,1fr) 300px;font-family:Inter,sans-serif}
.nr-main{display:flex;flex-direction:column;gap:12px;min-width:0;padding:20px 22px 0}
.nr-over{display:flex;align-items:center;justify-content:space-between;padding:0 4px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#ffffff8c}
.nr-over b{font-weight:500;color:color-mix(in srgb,var(--nav-gold) 80%,white);transition:color .6s}
.nr-grid{display:grid;grid-template-columns:minmax(0,1.3fr) repeat(3,minmax(0,1fr));grid-auto-rows:minmax(0,1fr);gap:10px;margin:0;padding:0;list-style:none}
.nr-grid>li{display:flex;min-width:0}
.nr-grid>li:first-child{grid-row:span 2}
.nr-tile{--c:#ff6a1a;position:relative;isolation:isolate;display:flex;align-items:center;justify-content:flex-start;gap:14px;width:100%;min-width:0;padding:14px;border-radius:16px;
  text-decoration:none;overflow:hidden;background:#ffffff04;box-shadow:inset 0 0 0 1px #ffffff0e;
  transition:transform .45s cubic-bezier(.19,1,.22,1),background .45s,box-shadow .45s}
.nr-tile::before{content:"";position:absolute;z-index:-1;left:-30%;right:-30%;bottom:-80%;height:120%;border-radius:50%;pointer-events:none;
  background:radial-gradient(closest-side,var(--c),transparent);filter:blur(22px);opacity:.12;transform:translateY(24px);
  transition:opacity .7s cubic-bezier(.19,1,.22,1),transform .7s cubic-bezier(.19,1,.22,1)}
.nr-tile::after{content:"";position:absolute;inset:0;padding:1.5px;border-radius:inherit;pointer-events:none;opacity:0;
  background:conic-gradient(from var(--nr-ang),transparent 0deg,var(--c) 55deg,#fff3d6 85deg,transparent 140deg,transparent 200deg,var(--c) 250deg,transparent 320deg);
  -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0);
  animation:nr-ang 4s linear infinite;animation-play-state:paused;transition:opacity .35s}
.nr-tile:hover,.nr-tile:focus-visible{transform:translateY(-3px);background:color-mix(in srgb,var(--c) 8%,#0a0b0f);
  box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 30%,transparent),0 18px 40px -22px var(--c)}
.nr-tile:hover::before,.nr-tile:focus-visible::before{opacity:.5;transform:none}
.nr-tile:hover::after,.nr-tile:focus-visible::after{opacity:1;animation-play-state:running}
.nr-tile:focus-visible{outline:2px solid #ffffffad;outline-offset:3px}
.nr-ico{position:relative;display:grid;place-items:center;flex:none;transition:transform .5s cubic-bezier(.19,1,.22,1)}
.nr-ico::after{content:"";position:absolute;left:8%;right:8%;bottom:-7px;height:10px;border-radius:50%;background:var(--c);filter:blur(8px);opacity:.4;z-index:-1;transition:opacity .5s}
.nr-tile:hover .nr-ico,.nr-tile:focus-visible .nr-ico{transform:scale(1.1) rotate(-6deg)}
.nr-tile:hover .nr-ico::after{opacity:.85}
.nr-txt{display:flex;flex-direction:column;gap:3px;min-width:0}
.nr-name{display:flex;align-items:center;gap:6px;font:500 15px/1.25 Inter,sans-serif;letter-spacing:-.01em;color:#fff}
.nr-name small{font:400 12px/1 Inter,sans-serif;color:#ffffff73}
.nr-desc{font:400 13px/1.4 Inter,sans-serif;color:#ffffff99;overflow:hidden;text-overflow:ellipsis}
.nr-go{position:absolute;top:12px;right:12px;color:color-mix(in srgb,var(--c) 55%,white);opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.nr-tile:hover .nr-go,.nr-tile:focus-visible .nr-go{opacity:1;transform:none}
/* Docs: the tall card. Its icon sits big over a page of faint lines that write themselves in when it is pointed at. */
.nr-feat{flex-direction:column;align-items:flex-start;justify-content:flex-end;gap:12px;padding:18px;
  background:radial-gradient(90% 70% at 20% 0,color-mix(in srgb,var(--c) 16%,transparent),transparent 70%),#ffffff05}
.nr-feat .nr-name{font:600 22px/1.15 'Inter Display',Inter,sans-serif;letter-spacing:-.03em}
.nr-feat .nr-desc{white-space:normal}
.nr-page{position:absolute;top:16px;right:16px;width:52%;aspect-ratio:4/3;display:grid;grid-template-columns:28% 1fr;grid-template-rows:12px 1fr;border-radius:9px;overflow:hidden;
  background:#0b0c11;box-shadow:inset 0 0 0 1px #ffffff14,0 14px 30px -18px var(--c);opacity:.7;transform:perspective(600px) rotateY(-10deg) rotateX(4deg);transform-origin:100% 0;
  transition:opacity .5s,transform .7s cubic-bezier(.19,1,.22,1)}
.nr-page>b{grid-column:1/-1;display:flex;align-items:center;gap:3px;padding:0 6px;background:#ffffff08;box-shadow:inset 0 -1px 0 #ffffff0d}
.nr-page>b i{width:4px;height:4px;border-radius:50%;background:#ffffff2e}
.nr-page>span{display:flex;flex-direction:column;gap:5px;padding:7px 6px;box-shadow:inset -1px 0 0 #ffffff0d}
.nr-page>div{display:flex;flex-direction:column;gap:5px;padding:7px 8px;min-width:0}
.nr-page i{display:block;height:3px;border-radius:2px;background:#ffffff1f;transform-origin:0 50%}
.nr-page>span i:nth-child(2){background:var(--c);box-shadow:0 0 6px var(--c)}
.nr-page>span i:nth-child(odd){width:80%}.nr-page>span i:nth-child(4){width:60%}
.nr-page>div>i:first-child{height:5px;width:65%;background:linear-gradient(90deg,color-mix(in srgb,var(--c) 75%,white),transparent)}
.nr-page>div>i:nth-child(2){width:95%}.nr-page>div>i:nth-child(3){width:80%}
.nr-page code{display:flex;flex-direction:column;gap:4px;margin-top:2px;padding:6px;border-radius:5px;background:#000;box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 30%,transparent)}
.nr-page code i:nth-child(1){width:45%;background:color-mix(in srgb,var(--c) 80%,white)}
.nr-page code i:nth-child(2){width:75%;background:#9ff0cf99}.nr-page code i:nth-child(3){width:55%;background:#ffffff33}
.nr-feat:hover .nr-page,.nr-feat:focus-visible .nr-page{opacity:1;transform:none}
.nr-feat:hover .nr-page div i,.nr-feat:focus-visible .nr-page div i{animation:nr-write .8s cubic-bezier(.19,1,.22,1) both}
.nr-feat:hover .nr-page div>i:nth-child(2){animation-delay:.08s}.nr-feat:hover .nr-page div>i:nth-child(3){animation-delay:.16s}
.nr-feat:hover .nr-page code i{animation-delay:.28s}.nr-feat:hover .nr-page code i:nth-child(2){animation-delay:.36s}.nr-feat:hover .nr-page code i:nth-child(3){animation-delay:.44s}
@keyframes nr-write{from{transform:scaleX(0)}}
.nr-url{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.08em;color:color-mix(in srgb,var(--c) 55%,white)}
.nr .nv-rail{margin:6px -22px 0}
.nr-side{display:flex;padding:43px 22px 52px 0}
.nr-merch{position:relative;isolation:isolate;display:flex;flex-direction:column;justify-content:flex-end;flex:1;min-height:0;border-radius:18px;overflow:hidden;text-decoration:none;
  background:radial-gradient(70% 60% at 50% 38%,#ff6a1a40,transparent 70%),radial-gradient(60% 50% at 80% 100%,#ff2d5526,transparent 70%),#0a0b0f;
  box-shadow:0 0 0 1px #ffffff14;transition:transform .5s cubic-bezier(.19,1,.22,1),box-shadow .5s}
.nr-merch video{position:absolute;inset:0;z-index:-2;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .6s,transform 1.2s cubic-bezier(.19,1,.22,1)}
.nr-merch[data-playing] video{opacity:1}
/* Our own tee under the loop: the SISO mark on a dark shirt, lit in ember, so the card reads before the video plays. */
.nr-tee{position:absolute;z-index:-3;left:50%;top:44%;width:62%;max-width:180px;transform:translate(-50%,-50%);filter:drop-shadow(0 18px 30px #ff6a1a55);
  transition:transform .8s cubic-bezier(.19,1,.22,1)}
.nr-tee img{position:absolute;left:50%;top:36%;width:24%;transform:translateX(-50%);border-radius:50%;box-shadow:0 0 18px #ff6a1a88}
.nr-merch:hover .nr-tee{transform:translate(-50%,-53%) rotate(-3deg)}
.nr-merch::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 45%,#000000d9)}
.nr-merch:hover,.nr-merch:focus-visible{transform:translateY(-2px);box-shadow:0 0 0 1px color-mix(in srgb,var(--nav-ember) 60%,transparent),0 22px 50px -22px var(--nav-ember)}
.nr-merch:hover video{transform:scale(1.04)}
.nr-merch:focus-visible{outline:2px solid #ffffffad;outline-offset:3px}
.nr-merch>span{display:flex;align-items:center;gap:12px;padding:14px}
.nr-merch .ng{transition:transform .5s cubic-bezier(.19,1,.22,1)}
.nr-merch:hover .ng{transform:scale(1.1) rotate(-6deg)}
.nr-merch b{display:block;font:500 15px/1.2 Inter,sans-serif;color:#fff}
.nr-merch small{display:block;margin-top:3px;font:400 12.5px/1.2 Inter,sans-serif;color:#ffffffb3}
.nr-merch>span>svg:last-child{margin-left:auto;color:#fff;opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.nr-merch:hover>span>svg:last-child{opacity:1;transform:none}
/* Narrower windows keep the same two rows: the merch card steps out (the footer still links Merch) and the tiles tighten.
   The old fallback stacked two columns, stretched every row to the Docs card's height and ran the merch card off screen. */
@media (max-width:1240px){.nr{grid-template-columns:minmax(0,1fr)}.nr-side{display:none}.nr-grid{grid-template-columns:minmax(0,1.15fr) repeat(3,minmax(0,1fr))}.nr-tile{gap:10px;padding:12px}.nr-feat{padding:16px}.nr-desc{font-size:12px}.nr-page{display:none}}
@media (max-width:991px){
  .mobile-menu .siso-nav-dropdown-inner .nr{display:block!important}
  .mobile-menu .siso-nav-dropdown-inner .nr-main{padding:8px 0 4px!important}
  /* Phones (t-0582): the same rows as Ecosystem, a 40 px icon then the name and one line. */
  .mobile-menu .siso-nav-dropdown-inner .nr-grid{display:flex!important;flex-direction:column!important;gap:2px!important}
  .mobile-menu .siso-nav-dropdown-inner .nr-tile{flex-direction:row;align-items:center;justify-content:flex-start;gap:14px;padding:8px 4px!important;
    background:none!important;box-shadow:none!important;min-height:0!important;border-radius:12px}
  .mobile-menu .nr-tile:active{background:#ffffff0d!important}
  .mobile-menu .siso-nav-dropdown-inner .nr-ico{width:40px!important;height:40px!important;flex:none}
  .mobile-menu .nr-ico>*{width:40px!important;height:40px!important}.mobile-menu .nr-ico svg{width:100%;height:100%}
  .mobile-menu .siso-nav-dropdown-inner .nr-feat .nr-name{font:500 15px/1.25 Inter,sans-serif;letter-spacing:-.01em}
  .mobile-menu .nr-url,.mobile-menu .nr-go{display:none!important}
  .mobile-menu .nr-page,.mobile-menu .nr-side{display:none!important}
  .mobile-menu .nr .nv-rail{margin:8px 0 0}
  .mobile-menu a.nr-tile,.mobile-menu a.nv-rail-tab{border-bottom:0!important}
  .mobile-menu a.nv-rail-tab{padding:0 10px!important;font-size:11px!important}
}
@media (prefers-reduced-motion:reduce){.nr *,.nr *::before,.nr *::after{transition:none!important;animation:none!important}}
`;

function ResIcon({ icon, color, size, on }: { icon: ResourceIcon; color: string; size: number; on: boolean }) {
  if (icon.kind === 'glyph') return <NavGlyph name={icon.name} color={color} size={size} on={on} />;
  if (icon.kind === 'living') return <LivingIcon name={icon.name} size={size + 4} active={on} />;
  return <ProductGlyph product={icon.product} size={size} playing={on} />;
}

function Tile({ r, feature, onNavigate }: { r: (typeof RESOURCES)[number]; feature?: boolean; onNavigate?: () => void }) {
  const [on, setOn] = useState(false);
  const external = r.href.startsWith('http');
  const enter = () => { setOn(true); navGlow(r.glow ?? null); };
  return (
    <li>
      <a href={r.href} className={`nr-tile${feature ? ' nr-feat' : ''}`} style={{ '--c': r.color } as React.CSSProperties} onClick={onNavigate}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onPointerEnter={enter} onPointerLeave={() => setOn(false)} onFocus={enter} onBlur={() => setOn(false)}>
        {feature && (
          <span className="nr-page" aria-hidden="true">
            <b><i /><i /><i /></b>
            <span><i /><i /><i /><i /><i /></span>
            <div><i /><i /><i /><code><i /><i /><i /></code></div>
          </span>
        )}
        <span className="nr-ico"><ResIcon icon={r.icon} color={r.color} size={feature ? 64 : 44} on={on} /></span>
        <span className="nr-txt">
          <span className="nr-name">{r.label}{external && <small aria-label="(opens in a new tab)">↗</small>}</span>
          <span className="nr-desc">{r.desc}</span>
          {feature && <span className="nr-url">{r.href.replace(/^https?:\/\//, '')}</span>}
        </span>
        {!feature && <span className="nr-go"><ArrowIcon /></span>}
      </a>
    </li>
  );
}

function MerchCard() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  // It plays only while its menu is open; the panel stays mounted between opens.
  const open = useMenuOpen();
  useEffect(() => {
    if (reducedMotion !== false || !open) videoRef.current?.pause();
    else videoRef.current?.play().catch(() => {});
  }, [reducedMotion, open]);
  return (
    <div className="nr-side nav-merch-card">
      <a href={RESOURCES_MERCH.href} className="nr-merch" target="_blank" rel="noopener noreferrer"
        onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
        <span className="nr-tee" aria-hidden="true">
          <svg viewBox="0 0 200 190" width="100%" fill="none">
            <defs>
              <linearGradient id="nr-tee-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#24252c" /><stop offset="1" stopColor="#0d0e12" /></linearGradient>
              <linearGradient id="nr-tee-r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffb547" /><stop offset=".5" stopColor="#ff6a1a" /><stop offset="1" stopColor="#ff2d55" /></linearGradient>
            </defs>
            <path d="M70 8c6 12 18 18 30 18s24-6 30-18l44 18 22 44-30 14-10-16v114H44V68L34 84 4 70l22-44z" fill="url(#nr-tee-g)" stroke="url(#nr-tee-r)" strokeWidth="2" strokeLinejoin="round" />
            <path d="M70 8c6 12 18 18 30 18s24-6 30-18" stroke="#ffffff30" strokeWidth="2" />
          </svg>
          <img src="/brand/siso-mark.png" alt="" width={40} height={40} />
        </span>
        <video ref={videoRef} autoPlay={open && reducedMotion === false} loop muted playsInline src={RESOURCES_MERCH.video} aria-hidden="true"
          onPlaying={e => e.currentTarget.parentElement?.setAttribute('data-playing', '')} />
        <span>
          <NavGlyph name="merch" color="#FF6A1A" size={40} on={on} />
          <span><b>{RESOURCES_MERCH.label}</b><small>{RESOURCES_MERCH.desc}</small></span>
          <ArrowIcon />
        </span>
      </a>
    </div>
  );
}

export function ResourcesDropdown({ open, onToggle, onNavigate }: DropdownProps) {
  const id = useId();
  useEffect(() => { if (!open) navGlow(null); }, [open]);
  const [docs, ...rest] = RESOURCES;
  return (
    <div>
      {/* Parsed once with the bar, not on every open: a stylesheet mounting with the panel restyles the whole page. */}
      <style>{CSS}</style>
      <DropdownToggle id={`${id}-toggle`} listId={`${id}-list`} label="Resources" open={open} onToggle={onToggle} />

      <DropdownContainer id={`${id}-list`} labelledBy={`${id}-toggle`} open={open}>
        <div className="nr">
          <div className="nr-main" onPointerLeave={() => navGlow(null)}>
            <div className="nr-over"><span>Resources</span><b>Read, follow, ask</b></div>
            <ul className="nr-grid">
              <Tile r={docs} feature onNavigate={onNavigate} />
              {rest.map(r => <Tile key={r.label} r={r} onNavigate={onNavigate} />)}
            </ul>
            <NavRail label={RESOURCES_RAIL.label} href={RESOURCES_RAIL.href} onNavigate={onNavigate} />
          </div>
          <MerchCard />
        </div>
      </DropdownContainer>
    </div>
  );
}
