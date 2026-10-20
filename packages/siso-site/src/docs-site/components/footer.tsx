// uihub: siso:site
import Link from '../../NativeLink';
import { Rail } from './rail';
import { LionTile } from './icons';
import { Socials } from './social';
import { Live } from './live';
import { products } from '../lib/products';
import { LINKS_OUT } from '../lib/site';

// The docs' footer, after the landing footer's signature (Footer/Signature.tsx): the lion in its composer-halo tile standing
// on Agent Base's glowing horizon line, over faint contour rings, with the products and the links out above it.
function ring(k: number) {
  const pts: string[] = [];
  for (let i = 0; i < 96; i++) {
    const t = (i / 96) * Math.PI * 2;
    const wob = 1 + 0.07 * Math.sin(3 * t + k * 0.22) + 0.045 * Math.sin(5 * t - k * 0.17 + 1.3);
    const r = (26 + k * 20 + k * k * 0.5) * wob;
    pts.push(`${(600 + r * 2.1 * Math.cos(t)).toFixed(1)} ${(200 + r * 0.92 * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join('L')}Z`;
}
const RINGS = Array.from({ length: 14 }, (_, k) => ring(k + 1));

export function DocsFooter({ productLinks = products, links = LINKS_OUT, startLinks = [
  { href: '/getting-started/', label: 'Welcome' },
  { href: '/getting-started/ecosystem/', label: 'The ecosystem map' },
  { href: '/agent-base/quickstart/', label: 'Agent Base quickstart' },
  { href: '/agent-base/reference/', label: 'Agent Base API' },
], copyright = '© 2026 SISO Labs. All rights reserved.' }: {
  productLinks?: readonly { slug: string; name: string; color: string }[];
  links?: readonly { label: string; href: string }[];
  startLinks?: readonly { label: string; href: string }[];
  copyright?: import('react').ReactNode;
} = {}) {
  return (
    <footer className="sd-footer">
      <Rail />
      <div className="sd-footer-cols">
        <nav aria-label="Products">
          <span className="sd-label">PRODUCTS</span>
          {productLinks.map(p => (
            <Link key={p.slug} href={`/${p.slug}/`} style={{ ['--pc' as string]: p.color }}>
              <i aria-hidden="true" />{p.name}
            </Link>
          ))}
        </nav>
        <nav aria-label="Start here">
          <span className="sd-label">START HERE</span>
          {startLinks.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
        <nav aria-label="SISO">
          <span className="sd-label">SISO</span>
          {links.map(l => <a key={l.label} href={l.href}>{l.label} ↗</a>)}
        </nav>
      </div>
      <Live className="sd-footer-sig" aria-hidden="true">
        <svg className="sd-contours" viewBox="0 0 1200 260" preserveAspectRatio="xMidYMid slice">
          <g>{RINGS.map(d => <path key={d} d={d} vectorEffect="non-scaling-stroke" />)}</g>
        </svg>
        <span className="sd-horizon" />
        <span className="sd-footer-lion"><LionTile size={84} live /></span>
      </Live>
      <div className="sd-footer-bottom">
        <span>{copyright}</span>
        <Socials />
      </div>
    </footer>
  );
}
