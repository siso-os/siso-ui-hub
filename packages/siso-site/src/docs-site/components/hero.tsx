// uihub: siso:site
'use client';

import Link from '../../NativeLink';
import { useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductGlyph } from './ProductGlyph';
import { GitHubMark, LionTile } from './icons';
import type { ProductInfo } from '../lib/products';

// A product's overview opens on a wide art banner, after OpenAI's docs (spec: "images and text"): the generated SISO
// background for that product, its glass artwork where one exists, a glow in the product's colour and its glyph tile.
// Art comes from _data/siso-landing/images/gen-20261009 (see SOURCES.md); missing art is listed in IMAGE-REQUESTS.md.
export function ProductHero({ product, title, description, status }: { product: ProductInfo; title: string; description: string; status: string }) {
  const [hover, setHover] = useState(false);
  const style = { ['--pc' as string]: product.color } as CSSProperties;
  return (
    <section className="sd-hero" style={style}>
      <div className="sd-hero-art" onPointerEnter={() => setHover(true)} onPointerLeave={() => setHover(false)}>
        <img className="sd-hero-bg" src={product.banner} alt="" />
        <span className="sd-hero-glow" aria-hidden="true" />
        {product.art && <img className="sd-hero-glass" src={product.art} alt="" />}
        <span className="sd-hero-tile">
          <ProductGlyph product={product.glyph} size={64} playing={hover} label={`${product.name} icon`} />
        </span>
        <span className="sd-hero-cap">{product.name.toUpperCase()} · {product.category}</span>
      </div>
      <div className="sd-hero-copy">
        <span className="sd-label">SISO DOCS / {product.name.toUpperCase()}</span>
        <h1 className="sd-title">{title}</h1>
        <p className="sd-desc">{description}</p>
        <div className="sd-hero-meta">
          <span className="sd-chip is-status"><i aria-hidden="true" />{status}</span>
          {product.repo && (
            <a className="sd-chip sd-neon" href={product.repo}>
              <GitHubMark size={14} /> View on GitHub
            </a>
          )}
          {product.site && (
            <a className="sd-chip sd-neon" href={product.site}>
              Visit the site <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

/** The mono line over a page title: the product's glyph, its name (a link to its overview) and the page. */
export function PageKicker({ product, section, page }: { product?: ProductInfo; section?: string; page: string }) {
  const style = product ? ({ ['--pc' as string]: product.color } as CSSProperties) : undefined;
  return (
    <div className="sd-kicker" style={style}>
      {product ? (
        <Link href={`/${product.slug}/`} className="sd-kicker-product">
          <ProductGlyph product={product.glyph} size={22} />
          <span>{product.name}</span>
        </Link>
      ) : (
        <Link href="/" className="sd-kicker-product">
          <LionTile size={22} />
          <span>{section ?? 'SISO Docs'}</span>
        </Link>
      )}
      <span className="sd-kicker-sep" aria-hidden="true">/</span>
      <span className="sd-kicker-page">{page}</span>
    </div>
  );
}
