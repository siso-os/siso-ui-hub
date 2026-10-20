// uihub: siso:site
'use client';
import { useSiteConfig, EMPTY_SITE_STATS } from '../../config';

import { useEffect, useRef, useState } from 'react';


// Ported from the landing footer (src/features/marketing/components/Footer/Social.tsx, siso-ecosystem f1f28e3) with its
// accounts, pictures and counts unchanged. Changes for the docs sidebar: class prefix sd-, the card opens upward from the
// left edge (the sidebar is narrow), and colours read the docs theme variables so light mode works.
function GitHubMark({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}


// Foreplay's socials row, with SISO's real accounts (Shaan, 9 Oct; profiles checked live the same day). Every icon opens a
// profile card on hover: the account's real picture, its handle and its follower count (Shaan: "how many followers on
// Instagram ... LinkedIn ... Twitter when you hover over it with a profile icon. And same for GitHub, how many repos").
// Counts live in data/siso-stats.json under "social"; pictures are the profiles' own, saved in public/brand/social/.
// LinkedIn hides the company page's followers behind a login; its count comes from the page's search snippet.
type Account = { key: string; name: string; handle: string; href: string; ava: string };
type Social = { label: string; brand: string; glyph: React.ReactNode; accounts: Account[] };


const MARK = '/brand/siso-mark.png';

const G = {
  gh: <GitHubMark size={18} />,
  x: <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>,
  li: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  ig: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.4" /><circle cx="17.6" cy="6.4" r="1.25" fill="currentColor" stroke="none" /></svg>,
  yt: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>,
};

const SOCIALS: Social[] = [
  { label: 'GitHub', brand: 'linear-gradient(135deg,#2b3137,#0d1117)', glyph: G.gh, accounts: [
    { key: 'gh', name: 'sisodias', handle: 'github.com/sisodias', href: 'https://github.com/sisodias', ava: '/brand/social/gh.jpg' },
  ] },
  { label: 'X', brand: 'linear-gradient(135deg,#1a1a1a,#000)', glyph: G.x, accounts: [
    { key: 'x', name: 'SISO', handle: '@SisoOfficial', href: 'https://x.com/SisoOfficial', ava: '/brand/social/x.jpg' },
  ] },
  { label: 'LinkedIn', brand: 'linear-gradient(135deg,#0a66c2,#004182)', glyph: G.li, accounts: [
    { key: 'li-co', name: 'SISO Agency', handle: 'Company page', href: 'https://www.linkedin.com/company/siso-agency', ava: MARK },
    { key: 'li-me', name: 'Shaan Sisodia', handle: 'Founder', href: 'https://uk.linkedin.com/in/shaan-sisodia-a10ba0194', ava: '/brand/social/li-me.jpg' },
  ] },
  { label: 'Instagram', brand: 'radial-gradient(circle at 30% 107%,#fdf497 0,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285aeb 90%)', glyph: G.ig, accounts: [
    { key: 'ig-agency', name: 'SISO Agency', handle: '@siso.agency', href: 'https://www.instagram.com/siso.agency/', ava: '/brand/social/ig-agency.jpg' },
    { key: 'ig-siso', name: 'Shaan Siso', handle: '@siso', href: 'https://www.instagram.com/siso/', ava: '/brand/social/ig-siso.jpg' },
  ] },
  { label: 'YouTube', brand: 'linear-gradient(135deg,#ff2a2a,#c4000f)', glyph: G.yt, accounts: [
    { key: 'yt', name: 'SISO Agency', handle: '@SISOAGENCY', href: 'https://www.youtube.com/@SISOAGENCY', ava: '/brand/social/yt.jpg' },
  ] },
];

const CSS = `
.sd-socials{list-style:none;margin:0;padding:0;display:flex;gap:2px;align-items:center}
.sd-soc{position:relative}
.sd-soc>a,.sd-soc>button{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;color:var(--sd-muted);background:none;border:0;padding:0;cursor:pointer;
  transition:color .2s,background .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.sd-soc>a svg,.sd-soc>button svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.sd-soc>a:hover,.sd-soc>button:hover,.sd-soc.is-open>button,.sd-soc>a:focus-visible,.sd-soc>button:focus-visible{color:var(--sd-ink);transform:translateY(-3px)}
.sd-soc>a:hover svg,.sd-soc>button:hover svg,.sd-soc.is-open>button svg{transform:scale(1.12)}
.sd-pop{position:absolute;left:-6px;bottom:calc(100% + 10px);z-index:60;width:262px;padding:6px;border-radius:18px;background:var(--sd-raised);
  box-shadow:inset 0 0 0 1px var(--sd-line-2),0 30px 60px -16px #000a,0 0 40px -18px #FF6A1A80;opacity:0;transform:translateY(6px) scale(.98);transform-origin:10% 100%;pointer-events:none;
  transition:opacity .2s,transform .3s cubic-bezier(.19,1,.22,1)}
.sd-soc:nth-child(n+4) .sd-pop{left:auto;right:-6px;transform-origin:90% 100%}
.sd-pop header{display:flex;align-items:center;gap:10px;padding:8px 10px;font:500 10.5px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;color:var(--sd-label)}
.sd-pop header i{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;color:#fff}
.sd-pop header i svg{width:15px;height:15px}
.sd-pop header time{margin-left:auto;letter-spacing:.08em;opacity:.75}
.sd-soc.is-open .sd-pop{opacity:1;transform:none;pointer-events:auto}
@media (hover:hover){.sd-soc:hover .sd-pop{opacity:1;transform:none;pointer-events:auto}.sd-pop::after{content:"";position:absolute;left:0;right:0;top:100%;height:14px}}
.sd-pop a{display:flex;align-items:center;justify-content:flex-start;text-align:left;gap:12px;padding:8px 10px;border-radius:12px;color:var(--sd-ink);font:500 14px/18px Inter,sans-serif;transition:background .2s}
.sd-pop a:hover{background:var(--sd-hover)}
.sd-ava{width:36px;height:36px;flex-shrink:0;border-radius:50%;display:block;box-shadow:0 0 0 1px var(--sd-line-2);transition:box-shadow .3s}
.sd-pop a:hover .sd-ava{box-shadow:0 0 0 1.5px #FF6A1A,0 0 16px -2px #FF6A1A99}
.sd-pop a>span{flex:1;min-width:0}
.sd-pop small{display:block;color:var(--sd-body);font-weight:400;font-size:12px}
.sd-pop b{text-align:right;font:600 14px/1.1 'Inter Display',Inter,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap}
.sd-pop b em{display:block;font:500 9.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;font-style:normal;color:var(--sd-label)}
.sd-pop a>i{font-style:normal;color:var(--sd-label);transition:transform .25s,color .2s}
.sd-pop a:hover>i{color:var(--sd-gold);transform:translate(2px,-2px)}
@media (prefers-reduced-motion:reduce){.sd-pop,.sd-soc>a,.sd-soc>button{transition:none}}
`;

function Count({ k }: { k: string }) {
  const c = useSiteConfig().stats?.social.counts[k];
  if (!c) return null;
  const [n, ...rest] = c.split(' ');
  return <b>{n}<em>{rest.join(' ')}</em></b>;
}

export function Socials() {
  const config = useSiteConfig();
  const STATS = config.stats ?? EMPTY_SITE_STATS;
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!open) return;
    const away = (e: Event) => { if (!ref.current?.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);
  return (
    <ul ref={ref} role="list" className="sd-socials">
      <style>{CSS}</style>
      {SOCIALS.map(original => {
        const s = { ...original, accounts: original.accounts.map(account => ({...account, href: config.socialHrefOverrides?.[account.key] ?? account.href, ava: config.socialAvatarOverrides?.[account.key] ?? account.ava })) };
        const single = s.accounts.length === 1;
        const isOpen = open === s.label;
        return (
          <li key={s.label} className={`sd-soc${isOpen ? ' is-open' : ''}`}>
            {single ? (
              <a className="sd-neon" href={s.accounts[0].href} target="_blank" rel="noopener noreferrer" aria-label={`SISO on ${s.label}`}>{s.glyph}</a>
            ) : (
              <button type="button" className={`sd-neon${isOpen ? ' is-open' : ''}`} aria-label={`SISO on ${s.label}`} aria-haspopup="true" aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.label)}>{s.glyph}</button>
            )}
            <div className="sd-pop" role="menu" aria-label={`${s.label} accounts`}>
              <header><i style={{ background: s.brand }}>{s.glyph}</i><span>{s.label.toUpperCase()}</span><time>{STATS.social.read}</time></header>
              {s.accounts.map(a => (
                <a key={a.href} role="menuitem" href={a.href} target="_blank" rel="noopener noreferrer" tabIndex={single ? -1 : undefined}>
                  <img className="sd-ava" src={a.ava} alt="" width={40} height={40} />
                  <span>{a.name}<small>{a.handle}</small></span>
                  <Count k={a.key} />
                  <i aria-hidden="true">↗</i>
                </a>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
