// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/AgencyDropdown.tsx)
'use client';

// ═══════════════════════════════════════════════════════════════════════════════
// AgencyDropdown - the Agency menu (Shaan, 9 Oct: "the agency drop down ... I did want it to show the industries ... with 3000
// with the really nice UI that you can click search").
// Left: the agency in one line, Corner Café (the real live site) as the proof, and the three ways in with their glass icons.
// Right: every one of the 3,665 ranked industries (data/agency-industry-items.json, loaded when the menu opens), grouped by
// family in the Agency card's colours (data/agency-industries.json). The family chips filter; typing searches all of them at
// once and the hits come back grouped by family, best rank first. Arrow keys walk the hits; Enter or a click opens the
// industry's page (its /industries/<group>/ page where one exists, else the index searched for it). The footer's notched
// rail closes it with a link to the whole index. The panel's rim is Agency green while it is open.
// ═══════════════════════════════════════════════════════════════════════════════

import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import FAMILIES from '../../../data/agency-industries.json';
import { INDUSTRY_GROUP_OF } from '../../siso/industries/industries.nav';
import { WorkspaceMark } from '../../siso/living/living-assets';
import { DropdownContainer, DropdownToggle, useMenuOpen } from './DropdownContainer';
import { NavRail } from './NavRail';
import { AGENCY } from './nav.data';
import { NAV_INDUSTRY_TOP } from './nav.industries';
import { navGlow } from './nav.glow';
import { NavGlyph, type NavGlyphName } from './nav.glyphs';
import { ArrowIcon, FAMILY_ICON, LineIcon } from './nav.icons';

type Item = { name: string; rank: number; m: number; low: string };
type Fam = (typeof FAMILIES.modules)[number];

const fmt = (n: number) => n.toLocaleString('en-GB');
const hrefFor = (name: string) => {
  const slug = INDUSTRY_GROUP_OF[name];
  return slug ? `/industries/${slug}/` : `/industries/?q=${encodeURIComponent(name)}`;
};
const MODS = FAMILIES.modules;
// Shaan, 9 Oct: the family cards (booking, catalogue, classes ...) "take too much space ... make them a search with a nice
// animation". Until you type or pick a family, the search types real examples itself and each one's real ranked hits slide
// in, grouped by the site they need; the chips above still open every family. Words chosen so the hits span several families.
const EXAMPLES = ['spa', 'wedding', 'photo', 'dental', 'yoga', 'tattoo'];
const MAX = Math.max(...MODS.map(f => f.count));
const ROOM = 24; // hits that fill the panel while searching every family, shared out between the families that match
const PER_FAMILY = 4; // the least any matching family shows; its chip (or "+N more") shows the rest
const PAGE = 160; // rows rendered at a time in a long list; more render as it scrolls
const LINK_GLYPH: Record<string, NavGlyphName> = { Industries: 'industries', 'Claim your site': 'claim', 'Work with us': 'work' };

const CSS = `
.na{display:grid;grid-template-columns:316px minmax(0,1fr);font-family:Inter,sans-serif}
.na-side{display:flex;flex-direction:column;gap:14px;padding:22px 22px 20px;border-right:1px solid #ffffff0f;
  background:radial-gradient(90% 55% at 10% 110%,#00a87926,transparent 70%)}
.na-brand{display:flex;align-items:center;gap:12px}
.na-brand>span:last-child{display:flex;flex-direction:column;gap:6px}
.na-over{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;text-transform:uppercase;color:#9ff0cf;text-shadow:0 0 18px #00a87999}
.na-title{font:600 19px/1.2 'Inter Display',Inter,sans-serif;letter-spacing:-.025em;color:#fff;text-wrap:balance}
.na-proof{position:relative;display:block;border-radius:14px;overflow:hidden;aspect-ratio:2/1;text-decoration:none;background:#0a0b0f;
  box-shadow:0 0 0 1px #ffffff14;transition:transform .5s cubic-bezier(.19,1,.22,1),box-shadow .5s}
.na-proof img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;transition:transform 1.2s cubic-bezier(.19,1,.22,1)}
.na-proof::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 35%,#000000d9)}
.na-proof>span{position:absolute;left:12px;right:12px;bottom:10px;z-index:1;display:flex;align-items:center;gap:8px;color:#fff;font:500 14px/1.2 Inter,sans-serif}
.na-proof>span small{margin-left:auto;font:500 10px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#9ff0cf;display:flex;align-items:center;gap:6px}
.na-proof>span small i{width:6px;height:6px;border-radius:50%;background:#00d69a;box-shadow:0 0 0 0 #00d69a;animation:na-live 2.4s ease-out infinite}
@keyframes na-live{0%{box-shadow:0 0 0 0 #00d69a99}70%,100%{box-shadow:0 0 0 7px #00d69a00}}
.na-proof:hover,.na-proof:focus-visible{transform:translateY(-2px);box-shadow:0 0 0 1px #00a879aa,0 18px 40px -18px #00a879}
.na-proof:hover img{transform:scale(1.04)}
.na-note{margin:-4px 0 0;font:400 13px/1.5 Inter,sans-serif;color:#ffffff99}
.na-note b{font-weight:600;color:#fff;font-variant-numeric:tabular-nums}
.na-links{display:flex;flex-direction:column;gap:2px;margin:0;padding:0;list-style:none}
.na-link{display:flex;align-items:center;justify-content:flex-start;gap:12px;padding:6px 10px 6px 6px;border-radius:12px;text-decoration:none;color:#fff;font:500 14px/1.2 Inter,sans-serif;
  transition:background .3s,box-shadow .3s}
.na-link>span{display:flex;flex-direction:column;gap:3px}
.na-link small{color:#ffffff80;font:400 12.5px/1.2 Inter,sans-serif}
.na-link .ng{transition:transform .5s cubic-bezier(.19,1,.22,1)}
.na-link>svg:last-child{margin-left:auto;color:#9ff0cf;opacity:0;transform:translateX(-6px);transition:opacity .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.na-link:hover,.na-link:focus-visible{background:#00a87914;box-shadow:inset 0 0 0 1px #00a87940}
.na-link:hover .ng,.na-link:focus-visible .ng{transform:scale(1.1) rotate(-6deg)}
.na-link:hover>svg:last-child,.na-link:focus-visible>svg:last-child{opacity:1;transform:none}
.na-main{display:flex;flex-direction:column;gap:12px;min-width:0;padding:20px 22px 0}
.na-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px}
.na-count{display:flex;flex-direction:column;gap:6px}
.na-count .na-over{color:#ffffff8c;text-shadow:none}
.na-big{display:flex;align-items:baseline;gap:10px}
.na-big b{font:600 44px/1 'Inter Display',Inter,sans-serif;letter-spacing:-.04em;font-variant-numeric:tabular-nums;
  background:linear-gradient(100deg,#fff 10%,#9ff0cf 60%,#00a879 95%);-webkit-background-clip:text;background-clip:text;color:transparent}
.na-big span{color:#ffffffb3;font-size:14px}
.na-search{position:relative;flex:0 1 400px}
.na-search input{width:100%;height:44px;border-radius:12px;border:1px solid #ffffff1f;background:#ffffff08;color:#fff;padding:0 64px 0 40px;font:400 14px Inter,sans-serif;outline:none;
  transition:border-color .25s,box-shadow .25s,background .25s}
.na-search input::placeholder{color:#ffffff66}
.na-search input::-webkit-search-cancel-button{display:none}
.na-search input:hover{border-color:#ffffff33}
.na-search input:focus{border-color:#00a879aa;background:#00a8790a;box-shadow:0 0 0 3px #00a87922,0 8px 28px -12px #00a879}
.na-search>svg{position:absolute;left:13px;top:13px;color:#ffffff70;pointer-events:none}
.na-search kbd{position:absolute;right:10px;top:11px;padding:4px 7px;border-radius:6px;border:1px solid #ffffff1f;color:#ffffff80;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.06em}
.na-chips{display:flex;gap:5px;flex-wrap:wrap;margin:0;padding:0;list-style:none}
.na-chip{--c:#9ff0cf;display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 10px 0 8px;border-radius:999px;border:0;cursor:pointer;
  background:transparent;color:#ffffffb8;font:500 12.5px/1 Inter,sans-serif;box-shadow:inset 0 0 0 1px #ffffff17;
  transition:color .3s,background .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.na-chip .nvi{color:var(--c)}
.na-chip small{font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;color:#ffffff66;font-variant-numeric:tabular-nums;transition:color .3s}
.na-chip:hover,.na-chip:focus-visible{color:#fff;transform:translateY(-2px);background:color-mix(in srgb,var(--c) 10%,transparent);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 45%,transparent)}
.na-chip[aria-pressed=true]{color:#fff;background:color-mix(in srgb,var(--c) 16%,#0a0b0f);box-shadow:inset 0 0 0 1px var(--c),0 0 18px -6px var(--c)}
.na-chip[aria-pressed=true] small{color:color-mix(in srgb,var(--c) 70%,white)}
.na-chip:focus-visible{outline:2px solid #ffffffad;outline-offset:2px}
.na-body{position:relative;height:300px}
.na-search input[data-ghost]::placeholder{color:transparent}
.na-ghost{position:absolute;left:41px;top:0;height:44px;display:flex;align-items:center;pointer-events:none;font:400 14px/1 Inter,sans-serif;color:#ffffffd9;white-space:pre}
.na-ghost i{display:inline-block;width:1.5px;height:18px;margin-left:1px;background:#00a879;animation:na-caret 1s steps(1) infinite}
@keyframes na-caret{50%{opacity:0}}
.na-group{animation-delay:calc(var(--gi,0)*70ms)!important;animation-fill-mode:both!important}
.na-hits>li{animation:na-in .4s cubic-bezier(.19,1,.22,1) both;animation-delay:calc(var(--gi,0)*70ms + var(--ri,0)*28ms)}
.na-fams{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none;animation:na-in .35s cubic-bezier(.19,1,.22,1)}
.na-fam{--c:#9ff0cf;position:relative;display:flex;flex-direction:column;gap:8px;min-width:0;padding:11px 12px 9px;border-radius:14px;background:#ffffff04;box-shadow:inset 0 0 0 1px #ffffff0d;
  transition:background .4s,box-shadow .4s,transform .4s cubic-bezier(.19,1,.22,1)}
.na-fam:hover,.na-fam:focus-within{transform:translateY(-2px);background:color-mix(in srgb,var(--c) 6%,#0a0b0f);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 35%,transparent),0 14px 34px -20px var(--c)}
.na-fam-head{display:flex;align-items:center;gap:8px;width:100%;padding:0;border:0;background:none;cursor:pointer;color:#fff;font:500 14px/1 Inter,sans-serif;text-align:left}
.na-fam-head>span:first-child{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;color:var(--c);
  background:color-mix(in srgb,var(--c) 14%,#0a0b0f);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 40%,transparent);transition:transform .45s cubic-bezier(.19,1,.22,1),box-shadow .45s}
.na-fam:hover .na-fam-head>span:first-child{transform:scale(1.1) rotate(-6deg);box-shadow:inset 0 0 0 1px var(--c),0 0 14px -3px var(--c)}
.na-fam-head small{margin-left:auto;display:flex;align-items:center;gap:4px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;color:color-mix(in srgb,var(--c) 60%,white);font-variant-numeric:tabular-nums}
.na-fam-head small svg{opacity:0;transform:translateX(-4px);transition:opacity .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.na-fam-head:hover small svg,.na-fam-head:focus-visible small svg{opacity:1;transform:none}
.na-fam-head:focus-visible{outline:2px solid #ffffffad;outline-offset:3px;border-radius:6px}
.na-bar{height:3px;border-radius:2px;background:#ffffff0d;overflow:hidden}
.na-bar i{display:block;height:100%;border-radius:inherit;background:var(--c);box-shadow:0 0 8px var(--c);transform-origin:0 50%;animation:na-grow .9s cubic-bezier(.19,1,.22,1) both}
@keyframes na-grow{from{transform:scaleX(0)}}
.na-fam ul{display:flex;flex-direction:column;gap:1px;margin:0;padding:0;list-style:none}
.na-ind{display:flex;align-items:baseline;justify-content:flex-start;gap:8px;padding:3px 6px;margin:0 -6px;border-radius:7px;text-decoration:none;color:#ffffffb8;font:400 13px/1.35 Inter,sans-serif;
  white-space:nowrap;overflow:hidden;transition:background .25s,color .25s}
.na-ind span{overflow:hidden;text-overflow:ellipsis}
.na-ind em{flex:none;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;font-style:normal;color:#ffffff59;min-width:30px}
.na-ind:hover,.na-ind:focus-visible{color:#fff;background:color-mix(in srgb,var(--c) 14%,transparent)}
.na-ind:hover em{color:var(--c)}
.na-scroll{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;padding-right:6px;
  scrollbar-width:thin;scrollbar-color:#00a87999 transparent}
.na-scroll::-webkit-scrollbar{width:6px}
.na-scroll::-webkit-scrollbar-thumb{border-radius:6px;background:#00a87999}
.na-wrap::after{content:"";position:absolute;left:0;right:12px;bottom:0;height:44px;pointer-events:none;background:linear-gradient(transparent,#05060a);transition:opacity .3s}
.na-wrap[data-end]::after{opacity:0}
.na-group{--c:#9ff0cf;margin:0 0 6px;padding:0;list-style:none;animation:na-in .3s cubic-bezier(.19,1,.22,1)}
.na-ghead{position:sticky;top:0;z-index:1;display:flex;align-items:center;gap:8px;padding:8px 10px 6px;background:#05060ae6;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);
  font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:color-mix(in srgb,var(--c) 75%,white)}
.na-ghead .nvi{color:var(--c)}
.na-ghead i{flex:1;height:1px;background:linear-gradient(90deg,color-mix(in srgb,var(--c) 40%,transparent),transparent)}
.na-ghead small{font:inherit;color:#ffffff66;letter-spacing:.06em}
.na-ghead button{border:0;background:none;padding:2px 4px;border-radius:6px;cursor:pointer;font:inherit;letter-spacing:.06em;color:var(--c);transition:color .25s,background .25s}
.na-ghead button:hover,.na-ghead button:focus-visible{color:#fff;background:color-mix(in srgb,var(--c) 18%,transparent)}
.na-hits{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2px 10px;margin:0;padding:0;list-style:none}
.na-hit{display:grid;grid-template-columns:52px minmax(0,1fr) 16px;align-items:center;gap:10px;padding:7px 10px;border-radius:10px;text-decoration:none;color:#ffffffd0;
  font:400 13.5px/1.3 Inter,sans-serif;transition:background .2s,box-shadow .2s,color .2s}
.na-hit em{font:500 11px/1 'Geist Mono',ui-monospace,monospace;font-style:normal;color:#ffffff66;font-variant-numeric:tabular-nums}
.na-hit>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.na-hit mark{background:none;color:#fff;font-weight:600;box-shadow:inset 0 -2px 0 color-mix(in srgb,var(--c) 70%,transparent)}
.na-hit svg{color:var(--c);opacity:0;transform:translateX(-4px);transition:opacity .2s,transform .3s cubic-bezier(.19,1,.22,1)}
.na-hit[data-active=true],.na-hit:hover,.na-hit:focus-visible{color:#fff;background:color-mix(in srgb,var(--c) 9%,#0a0b0f);box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--c) 45%,transparent)}
.na-hit[data-active=true] em,.na-hit:hover em{color:var(--c)}
.na-hit[data-active=true] svg,.na-hit:hover svg,.na-hit:focus-visible svg{opacity:1;transform:none}
.na-empty{padding:16px 10px;color:#ffffff99;font:400 14px/1.5 Inter,sans-serif}
.na-empty a{color:#9ff0cf;text-decoration:none}.na-empty a:hover{color:#fff}
.na-more{height:1px}
.na .nv-rail{margin:2px -22px 0}
.na a:focus-visible{outline:2px solid #ffffffad;outline-offset:2px}
@keyframes na-in{from{opacity:0;transform:translateY(4px)}}
@media (max-width:1240px){.na{grid-template-columns:280px minmax(0,1fr)}.na-fams{grid-template-columns:repeat(2,minmax(0,1fr))}.na-body{height:340px;overflow-y:auto}
  .na-hits{grid-template-columns:minmax(0,1fr)}.na-head{flex-direction:column;align-items:stretch;gap:14px}.na-search{flex:none}}
@media (max-width:991px){
  .mobile-menu .siso-nav-dropdown-inner .na{display:flex!important;flex-direction:column!important}
  .mobile-menu .siso-nav-dropdown-inner .na-side{padding:22px 0 16px!important;border:0!important;background:none!important;order:2}
  .mobile-menu .siso-nav-dropdown-inner .na-main{padding:8px 0 4px!important;order:1}
  .mobile-menu .siso-nav-dropdown-inner .na-fams{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
  .mobile-menu .na-fam{padding:10px!important}
  .mobile-menu .na-ind em{min-width:24px}
  .mobile-menu .siso-nav-dropdown-inner .na-chips{display:flex!important;flex-direction:row!important;flex-wrap:nowrap;overflow-x:auto;gap:6px!important;margin:0 -2px;padding:2px;scrollbar-width:none}
  .mobile-menu .siso-nav-dropdown-inner .na-chips>li{width:auto!important;flex:none}
  .mobile-menu .siso-nav-dropdown-inner .na-fam ul,.mobile-menu .siso-nav-dropdown-inner .na-links,.mobile-menu .siso-nav-dropdown-inner .na-hits{display:flex!important;flex-direction:column!important;gap:1px!important}
  .mobile-menu .siso-nav-dropdown-inner .na-group{display:block!important}
  .mobile-menu .na-body{height:auto;overflow:visible}
  .mobile-menu .na-wrap{position:relative!important}
  .mobile-menu .na-scroll{position:relative;max-height:min(420px,60dvh)}
  .mobile-menu .na-big b{font-size:36px}
  .mobile-menu .na .nv-rail{margin:6px 0 0}
  .mobile-menu .na a{border-bottom:0!important}
  .mobile-menu a.na-ind{padding:3px 6px!important;font-size:13px!important}
  .mobile-menu a.na-link{padding:6px 10px 6px 6px!important;font-size:14px!important}
  .mobile-menu a.na-hit{padding:8px 10px!important;font-size:14px!important;grid-template-columns:48px minmax(0,1fr)!important}
  .mobile-menu a.na-hit svg{display:none}
  .mobile-menu a.na-proof{padding:0!important}
  .mobile-menu a.nv-rail-tab{padding:0 10px!important;font-size:11px!important}
}
@media (prefers-reduced-motion:reduce){.na *{transition:none!important;animation:none!important}}
`;

function CountUp({ to }: { to: number }) {
  const reduced = useReducedMotion();
  const open = useMenuOpen();
  const [n, setN] = useState(reduced ? to : 0);
  // It counts up on every open; the panel stays mounted between opens (DropdownContainer).
  useEffect(() => {
    if (reduced) { setN(to); return; }
    if (!open) { setN(0); return; }
    const c = animate(0, to, { duration: 1.1, ease: [0.19, 1, 0.22, 1], onUpdate: v => setN(Math.round(v)) });
    return () => c.stop();
  }, [to, reduced, open]);
  return <>{fmt(n)}</>;
}

// The part of the name that matched, underlined in the family's colour.
function Name({ name, term }: { name: string; term: string }) {
  const at = term ? name.toLowerCase().indexOf(term) : -1;
  if (at < 0) return <>{name}</>;
  return <>{name.slice(0, at)}<mark>{name.slice(at, at + term.length)}</mark>{name.slice(at + term.length)}</>;
}

function SideLink({ l, onNavigate }: { l: (typeof AGENCY.links)[number]; onNavigate?: () => void }) {
  const [on, setOn] = useState(false);
  return (
    <li>
      <a className="na-link" href={l.href} onClick={onNavigate}
        onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
        <NavGlyph name={LINK_GLYPH[l.label] ?? 'industries'} color="#00a879" size={36} on={on} />
        <span>{l.label}<small>{l.desc}</small></span>
        <ArrowIcon />
      </a>
    </li>
  );
}

function IndustriesCard({ onNavigate }: { onNavigate?: () => void }) {
  const [q, setQ] = useState('');
  const [fam, setFam] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [limit, setLimit] = useState(PAGE);
  const [end, setEnd] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [ghost, setGhost] = useState(EXAMPLES[0]);
  const [done, setDone] = useState(EXAMPLES[0]);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  // Each open starts a fresh search, as it did when the panel unmounted on close.
  const open = useMenuOpen();
  useEffect(() => {
    if (open) return;
    setQ(''); setFam(null); setActive(0); setLimit(PAGE); setEnd(false); setGhost(EXAMPLES[0]); setDone(EXAMPLES[0]);
    scrollRef.current?.scrollTo(0, 0);
  }, [open]);

  // The self-typing search: holds a word, deletes it, types the next. The hits follow each word once it is fully typed,
  // so they swap whole instead of flickering letter by letter. Stops the moment you focus the field or pick a family.
  const idle = open && !q && fam === null && !focused;
  useEffect(() => {
    if (!idle || reduced) return;
    let w = EXAMPLES.indexOf(done), n = EXAMPLES[w].length, dir = -1, t = 0;
    setGhost(EXAMPLES[w]);
    const step = () => {
      const word = EXAMPLES[w];
      n += dir;
      setGhost(word.slice(0, n));
      let wait = dir > 0 ? 95 : 45;
      if (dir > 0 && n >= word.length) { setDone(word); dir = -1; wait = 2600; }
      else if (dir < 0 && n <= 0) { dir = 1; w = (w + 1) % EXAMPLES.length; wait = 380; }
      t = window.setTimeout(step, wait);
    };
    t = window.setTimeout(step, 2600);
    return () => clearTimeout(t);
    // `done` is read once per start; the loop carries its own place from there.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idle, reduced]);

  // The whole ranked list (items[i] is rank i+1) loads as the menu opens, in its own chunk.
  useEffect(() => {
    let live = true;
    import('../../../data/agency-industry-items.json').then(m => {
      const d = (m.default ?? m) as unknown as { items: [string, number][] };
      if (live) setItems(d.items.map(([name, mod], i) => ({ name, rank: i + 1, m: mod, low: name.toLowerCase() })));
    });
    return () => { live = false; };
  }, []);

  // The input answers every key at once; the 3,665-row filter follows a frame behind so typing never waits on it.
  const typed = useDeferredValue(q).trim().toLowerCase();
  const term = typed || (fam === null ? done : '');
  const listing = !!term || fam !== null;

  // Hits grouped by family. Searching every family shows each one's best few, the family with the best-ranked hit first;
  // a chosen family shows all of its own.
  const groups = useMemo(() => {
    if (!listing || !items) return [];
    const pool = items.filter(r => (fam === null || r.m === fam) && (!term || r.low.includes(term)));
    const byFam = new Map<number, Item[]>();
    for (const r of pool) {
      const list = byFam.get(r.m);
      if (list) list.push(r); else byFam.set(r.m, [r]);
    }
    return [...byFam.entries()]
      .map(([m, rows]) => ({ m, rows: term ? [...rows].sort((a, b) => Number(!a.low.startsWith(term)) - Number(!b.low.startsWith(term)) || a.rank - b.rank) : rows }))
      .sort((a, b) => a.rows[0].rank - b.rows[0].rank);
  }, [listing, items, fam, term]);

  // What is on screen, in order, so the arrow keys walk exactly what you see.
  const shown = useMemo(() => {
    let budget = limit;
    // One family matching gets the whole panel; several share it, each keeping at least PER_FAMILY.
    const each = Math.max(PER_FAMILY, Math.floor(ROOM / Math.max(1, groups.length)) & ~1);
    return groups.map(g => {
      const cap = fam === null ? each : budget;
      const rows = g.rows.slice(0, Math.max(0, Math.min(cap, budget)));
      budget -= rows.length;
      return { ...g, visible: rows };
    }).filter(g => g.visible.length);
  }, [groups, fam, limit]);
  const flat = useMemo(() => shown.flatMap(g => g.visible), [shown]);
  const total = groups.reduce((n, g) => n + g.rows.length, 0);

  useEffect(() => { setActive(0); setLimit(PAGE); setEnd(false); scrollRef.current?.scrollTo({ top: 0 }); }, [term, fam]);
  useEffect(() => {
    scrollRef.current?.querySelector(`#${CSS_ID(listId)}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [active, listId]);
  // A long family renders a page at a time; the next page comes in as you near the bottom.
  useEffect(() => {
    const el = moreRef.current, root = scrollRef.current;
    if (!el || !root || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(e => { if (e[0]?.isIntersecting) setLimit(n => n + PAGE); }, { root, rootMargin: '200px' });
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const go = (href: string) => { onNavigate?.(); window.location.href = href; };
  const pick = (i: number | null) => { setFam(cur => (cur === i ? null : i)); inputRef.current?.focus({ preventScroll: true }); };
  const famStyle = (f: Fam) => ({ '--c': f.color }) as React.CSSProperties;
  let index = -1;

  return (
    <div className="na-main">
      <div className="na-head">
        <div className="na-count">
          <span className="na-over">Industries · ranked by who has no website</span>
          <span className="na-big"><b><CountUp to={FAMILIES.industries} /></b><span>industries ranked</span></span>
        </div>
        <div className="na-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" strokeLinecap="round" /></svg>
          <input ref={inputRef} type="search" value={q} placeholder={`Search all ${fmt(FAMILIES.industries)}: try "tattoo"`} aria-label={`Search ${fmt(FAMILIES.industries)} industries`}
            role="combobox" aria-expanded={listing} aria-controls={listId} aria-autocomplete="list"
            aria-activedescendant={listing && flat[active] ? `${CSS_ID(listId)}-${active}` : undefined}
            data-ghost={idle || undefined} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                if (!listing || !flat.length) return;
                e.preventDefault(); e.stopPropagation();
                setActive(a => (a + (e.key === 'ArrowDown' ? 1 : flat.length - 1)) % flat.length);
              } else if (e.key === 'Enter' && (typed || fam !== null)) {
                e.preventDefault();
                const hit = flat[active];
                go(hit ? hrefFor(hit.name) : `/industries/?q=${encodeURIComponent(q.trim())}`);
              } else if (e.key === 'Escape' && (q || fam !== null)) {
                e.stopPropagation(); e.nativeEvent.stopImmediatePropagation();
                setQ(''); setFam(null);
              }
            }} />
          {idle && <span className="na-ghost" aria-hidden="true">{ghost}<i /></span>}
          <kbd aria-hidden="true">↵</kbd>
        </div>
      </div>

      <ul className="na-chips" aria-label="Families">
        <li><button type="button" className="na-chip" aria-pressed={fam === null} onClick={() => pick(null)}>All<small>{fmt(FAMILIES.industries)}</small></button></li>
        {MODS.map((f, i) => NAV_INDUSTRY_TOP[f.name] && (
          <li key={f.name}>
            <button type="button" className="na-chip nvi-host" style={famStyle(f)} aria-pressed={fam === i} title={f.name} onClick={() => pick(i)}>
              <LineIcon name={FAMILY_ICON[f.name] ?? 'spark'} size={15} />{f.short}<small>{fmt(f.count)}</small>
            </button>
          </li>
        ))}
      </ul>

      <div className="na-body">
        {listing ? (
          <div className="na-wrap" data-end={end || undefined} style={{ position: 'absolute', inset: 0 }}>
            <div className="na-scroll" ref={scrollRef} id={listId} role="listbox" aria-label="Industries"
              onScroll={e => { const el = e.currentTarget; setEnd(el.scrollTop + el.clientHeight >= el.scrollHeight - 4); }}>
              {!items && <p className="na-empty">Loading all {fmt(FAMILIES.industries)}…</p>}
              {items && total === 0 && (
                <p className="na-empty">Not in the {fmt(FAMILIES.industries)} yet. <a href={`/book-demo/?industry=${encodeURIComponent(q.trim())}`} onClick={onNavigate}>Ask us to research it →</a></p>
              )}
              {shown.map((g, gi) => {
                const f = MODS[g.m];
                return (
                  <ul key={`${term}:${g.m}`} className="na-group nvi-host" style={{ ...famStyle(f), '--gi': gi } as React.CSSProperties} role="group" aria-label={f.short}>
                    <li className="na-ghead" role="presentation">
                      <LineIcon name={FAMILY_ICON[f.name] ?? 'spark'} size={14} />{f.short}
                      <small>{term ? `${fmt(g.rows.length)} of ${fmt(f.count)}` : fmt(f.count)}</small><i />
                      {fam === null && g.rows.length > g.visible.length && (
                        <button type="button" onClick={() => pick(g.m)}>+{fmt(g.rows.length - g.visible.length)} more</button>
                      )}
                    </li>
                    <li role="presentation">
                      <ul className="na-hits" role="presentation">
                        {g.visible.map((r, ri) => {
                          const i = ++index;
                          return (
                            <li key={r.rank} role="option" aria-selected={i === active} id={`${CSS_ID(listId)}-${i}`} style={{ '--ri': ri } as React.CSSProperties}>
                              <a className="na-hit" href={hrefFor(r.name)} data-active={i === active} tabIndex={-1}
                                onPointerEnter={() => setActive(i)} onClick={onNavigate}>
                                <em>#{fmt(r.rank)}</em><span><Name name={r.name} term={term} /></span><ArrowIcon size={14} />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                );
              })}
              {flat.length < total && fam !== null && <div className="na-more" ref={moreRef} aria-hidden="true" />}
            </div>
          </div>
        ) : null}
      </div>

      <NavRail label={`All ${fmt(FAMILIES.industries)} industries`} href="/industries/" onNavigate={onNavigate} />
    </div>
  );
}

// useId gives ":r1:"-style ids; colons are fine in id attributes but not in a CSS selector.
function CSS_ID(id: string) { return id.replace(/[^a-zA-Z0-9_-]/g, ''); }

export function AgencyDropdown({ open, onToggle, onNavigate }: { open: boolean; onToggle: () => void; onNavigate?: () => void }) {
  const id = useId();
  const [replay, setReplay] = useState(0);
  // The agency's own colour on the rim while its menu is open.
  useEffect(() => { navGlow(open ? 'agency' : null); }, [open]);
  return (
    <div>
      {/* Parsed once with the bar, not on every open: a stylesheet mounting with the panel restyles the whole page. */}
      <style>{CSS}</style>
      <DropdownToggle id={`${id}-toggle`} listId={`${id}-list`} label="Agency" open={open} onToggle={onToggle} />
      <DropdownContainer id={`${id}-list`} labelledBy={`${id}-toggle`} open={open}>
        <div className="na">
          <div className="na-side">
            <div className="na-brand" onPointerEnter={() => setReplay(n => n + 1)}>
              <WorkspaceMark brand="siso-agency" size={48} replay={replay} />
              <span><span className="na-over">SISO Agency</span><span className="na-title">{AGENCY.title}</span></span>
            </div>
            <a className="na-proof" href={AGENCY.proof.href} target="_blank" rel="noopener noreferrer" onPointerEnter={() => setReplay(n => n + 1)}>
              <img src={AGENCY.proof.shot} alt={`${AGENCY.proof.label}, a café site we built`} loading="lazy" />
              <span>{AGENCY.proof.label}<small><i aria-hidden="true" />Live ↗</small></span>
            </a>
            <p className="na-note"><b>{AGENCY.proof.label}</b> is live, one of <b>{AGENCY.sites}</b> sites we have built.</p>
            <ul className="na-links">
              {AGENCY.links.map(l => <SideLink key={l.label} l={l} onNavigate={onNavigate} />)}
            </ul>
          </div>
          <IndustriesCard onNavigate={onNavigate} />
        </div>
      </DropdownContainer>
    </div>
  );
}
