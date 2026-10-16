// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/Footer/Products.tsx)
'use client';

import { useState } from 'react';
import { ProductGlyph, type Product } from '../siso/ProductGlyph';

// Foreplay's product badges: a short line above the name, the animated icon beside it. Ours are the ecosystem, on a slow
// loop because the list will grow (Shaan, 9 Oct: "maybe the five icons can scroll because we're probably going to have more
// things as time goes on"). It stops while you point at it. "1.3M+" rounds down plan.py C['million'] (1,356,183, OBS).
const PRODUCTS: { label: string; desc: string; href: string; product: Product }[] = [
  { label: 'UI Hub', desc: 'Reuse the best UI', href: '/ui-hub/', product: 'ui-hub' },
  { label: 'Agent Base', desc: 'Run every agent', href: '/agent-base/', product: 'os' },
  { label: 'Great Library', desc: 'Browse 1.3M+ repos', href: '/great-library/', product: 'library' },
  { label: 'Voice', desc: 'Talk to your agents', href: '/voice/', product: 'voice' },
  { label: 'Agency', desc: 'Build local sites', href: '/agency/', product: 'agency' },
  { label: 'Research', desc: 'Claims with receipts', href: '/research/', product: 'research' },
  { label: 'All projects', desc: 'Everything we open', href: '/ecosystem/', product: 'all' },
];

const CSS = `
.sf-products{position:relative;overflow:hidden;margin:-14px -40px;padding:14px 0;
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent);mask-image:linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)}
.sf-track{display:flex;width:max-content;animation:sf-marq 48s linear infinite}
.sf-products:hover .sf-track,.sf-products:focus-within .sf-track,.sf:not([data-live]) .sf-track{animation-play-state:paused}
@keyframes sf-marq{to{transform:translateX(-50%)}}
.sf-product{flex:0 0 228px;margin-right:12px;display:flex;align-items:center;gap:12px;padding:8px 10px;min-width:0;transition:background .3s,box-shadow .3s,transform .4s cubic-bezier(.19,1,.22,1)}
.sf-product:hover{transform:translateY(-2px)}
.sf-product span{display:block;min-width:0}
.sf-product small{display:block;color:rgba(255,255,255,.6);font:400 14px/1.25 Inter,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sf-product b{display:block;color:#fff;font:500 16px/1.35 Inter,sans-serif;letter-spacing:-.01125em;white-space:nowrap}
@media (max-width:767px){.sf-products{margin:-14px -20px}.sf-product{flex-basis:200px}}
@media (prefers-reduced-motion:reduce){.sf-track{animation:none}.sf-products{overflow-x:auto}.sf-product[aria-hidden]{display:none}}
`;

export default function FooterProducts() {
  const [hovered, setHovered] = useState<string | null>(null);
  // Two copies side by side; the track slides one copy's width and repeats, so the loop has no seam.
  const loop = [...PRODUCTS.map(p => ({ ...p, copy: false })), ...PRODUCTS.map(p => ({ ...p, copy: true }))];
  return (
    <nav className="sf-products" aria-label="SISO ecosystem">
      <style>{CSS}</style>
      <div className="sf-track">
        {loop.map(p => {
          const id = `${p.label}${p.copy ? '-2' : ''}`;
          return (
            <a key={id} href={p.href} className="sf-product sf-neon" aria-hidden={p.copy || undefined} tabIndex={p.copy ? -1 : undefined}
              onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(id)} onBlur={() => setHovered(null)}>
              <ProductGlyph product={p.product} size={44} playing={hovered === id} />
              <span><small>{p.desc}</small><b>{p.label}</b></span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
