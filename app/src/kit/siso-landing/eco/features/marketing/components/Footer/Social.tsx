// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/Social.tsx)
'use client';

import { useEffect, useRef, useState } from 'react';
import { GitHubMark } from '../siso/ui/GitHubButton';
import STATS from '../../data/siso-stats.json';

// Foreplay's socials row, with SISO's real accounts (Shaan, 9 Oct; profiles checked live the same day). Every icon opens a
// profile card on hover: the account's real picture, its handle and its follower count (Shaan: "how many followers on
// Instagram ... LinkedIn ... Twitter when you hover over it with a profile icon. And same for GitHub, how many repos").
// Counts live in data/siso-stats.json under "social"; pictures are the profiles' own, saved in public/brand/social/.
// LinkedIn hides the company page's followers behind a login; its count comes from the page's search snippet.
type Account = { key: string; name: string; handle: string; href: string; ava: string };
type Social = { label: string; brand: string; glyph: React.ReactNode; accounts: Account[] };

const COUNTS: Record<string, string> = STATS.social.counts;
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
    { key: 'gh', name: 'SISO Labs', handle: 'github.com/siso-os', href: 'https://github.com/siso-os', ava: '/brand/social/gh-siso-os.png' },
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
.sf-socials{list-style:none;margin:0;padding:0;display:flex;gap:4px;align-items:center}
.sf-soc{position:relative}
.sf-soc>a,.sf-soc>button{display:grid;place-items:center;width:40px;height:40px;border-radius:12px;color:rgba(255,255,255,.6);background:none;border:0;padding:0;cursor:pointer;
  transition:color .2s,background .3s,box-shadow .3s,transform .35s cubic-bezier(.19,1,.22,1)}
.sf-soc>a svg,.sf-soc>button svg{transition:transform .35s cubic-bezier(.19,1,.22,1)}
.sf-soc>a:hover,.sf-soc>button:hover,.sf-soc.is-open>button,.sf-soc>a:focus-visible,.sf-soc>button:focus-visible{color:#fff;transform:translateY(-3px)}
.sf-soc>a:hover svg,.sf-soc>button:hover svg,.sf-soc.is-open>button svg{transform:scale(1.12)}
.sf-pop{position:absolute;right:-4px;bottom:calc(100% + 10px);z-index:6;width:292px;padding:6px;border-radius:18px;background:#0a0b0f;
  box-shadow:inset 0 0 0 1px #ffffff14,0 30px 60px -16px #000,0 0 40px -18px #FF6A1A80;opacity:0;transform:translateY(6px) scale(.98);transform-origin:90% 100%;pointer-events:none;
  transition:opacity .2s,transform .3s cubic-bezier(.19,1,.22,1)}
.sf-pop header{display:flex;align-items:center;gap:10px;padding:8px 10px;font:500 11px/1 'Geist Mono',ui-monospace,monospace;letter-spacing:.16em;color:rgba(255,255,255,.5)}
.sf-pop header i{display:grid;place-items:center;width:26px;height:26px;border-radius:8px;color:#fff}
.sf-pop header i svg{width:15px;height:15px}
.sf-pop header time{margin-left:auto;letter-spacing:.08em;color:rgba(255,255,255,.35)}
.sf-soc.is-open .sf-pop{opacity:1;transform:none;pointer-events:auto}
@media (hover:hover){.sf-soc:hover .sf-pop{opacity:1;transform:none;pointer-events:auto}.sf-pop::after{content:"";position:absolute;left:0;right:0;top:100%;height:14px}}
.sf-pop a{display:flex;align-items:center;justify-content:flex-start;text-align:left;gap:12px;padding:8px 10px;border-radius:12px;color:#fff;font:500 14px/18px Inter,sans-serif;transition:background .2s}
.sf-pop a:hover{background:#ffffff0a}
.sf-ava{width:40px;height:40px;flex-shrink:0;border-radius:50%;display:block;box-shadow:0 0 0 1px #ffffff1f;transition:box-shadow .3s}
.sf-pop a:hover .sf-ava{box-shadow:0 0 0 1.5px #FF6A1A,0 0 16px -2px #FF6A1A99}
.sf-pop a>span{flex:1;min-width:0}
.sf-pop small{display:block;color:rgba(255,255,255,.55);font-weight:400;font-size:12px}
.sf-pop b{text-align:right;font:600 15px/1.1 'Inter Display',Inter,sans-serif;font-variant-numeric:tabular-nums;white-space:nowrap}
.sf-pop b em{display:block;font:500 9.5px/1.4 'Geist Mono',ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase;font-style:normal;color:rgba(255,255,255,.45)}
.sf-pop a>i{font-style:normal;color:rgba(255,255,255,.35);transition:transform .25s,color .2s}
.sf-pop a:hover>i{color:#FFB547;transform:translate(2px,-2px)}
`;

function Count({ k }: { k: string }) {
  const c = COUNTS[k];
  if (!c) return null;
  const [n, ...rest] = c.split(' ');
  return <b>{n}<em>{rest.join(' ')}</em></b>;
}

export default function FooterSocial() {
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
    <ul ref={ref} role="list" className="sf-socials">
      <style>{CSS}</style>
      {SOCIALS.map(s => {
        const single = s.accounts.length === 1;
        const isOpen = open === s.label;
        return (
          <li key={s.label} className={`sf-soc${isOpen ? ' is-open' : ''}`}>
            {single ? (
              <a className="sf-neon" href={s.accounts[0].href} target="_blank" rel="noopener noreferrer" aria-label={`SISO on ${s.label}`}>{s.glyph}</a>
            ) : (
              <button type="button" className={`sf-neon${isOpen ? ' is-open' : ''}`} aria-label={`SISO on ${s.label}`} aria-haspopup="true" aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.label)}>{s.glyph}</button>
            )}
            <div className="sf-pop" role="menu" aria-label={`${s.label} accounts`}>
              <header><i style={{ background: s.brand }}>{s.glyph}</i><span>{s.label.toUpperCase()}</span><time>{STATS.social.read}</time></header>
              {s.accounts.map(a => (
                <a key={a.href} role="menuitem" href={a.href} target="_blank" rel="noopener noreferrer" tabIndex={single ? -1 : undefined}>
                  <img className="sf-ava" loading="lazy" decoding="async" src={a.ava} alt="" width={40} height={40} />
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
