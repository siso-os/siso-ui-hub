// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/SisoHomeHero.tsx)
'use client';

import { useEffect, useState } from 'react';
import HeroCards from './HeroCards';
import TokenDial from './TokenDial';
import HERO from './hero-v2.json';
import { heroV2Styles } from './heroV2Styles';

// Hero v2 (docs/specs/hero-v2.md): plain copy, the live token count turning on a dial, and the stat cards (the pills Shaan liked)
// along the bottom, each credited. ?h=1 to ?h=5 picks the headline (5, half a trillion tokens with the open-source line, is the default). The previous hero is
// SisoHomeHeroClassic.tsx.

const Arrow = () => (
  <svg viewBox="0 0 20 20" width="100%" height="100%" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export default function SisoHomeHero() {
  const [pick, setPick] = useState(HERO.default);
  // Read after mount so the static HTML (the default) and the first client render match.
  useEffect(() => {
    const h = Number(new URLSearchParams(window.location.search).get('h'));
    if (h >= 1 && h <= HERO.copy.length) setPick(h);
  }, []);
  const copy = HERO.copy[pick - 1];

  return (
    <section id="product-hero-section" className="v2" aria-label="SISO Labs">
      <style>{heroV2Styles}</style>
      <div className="v2-copy">
        <h1 key={`h${pick}`}>{copy.h}</h1>
        <p key={`s${pick}`} className="v2-sub">{copy.sub}</p>
        <div className="v2-cta">
          <a href="/agent-base/" className="button-dark button-primary w-inline-block">
            <div className="button-text-block"><div className="text-heading-m">Explore SISO OS</div></div>
            <div className="button-icon-block icon-right opacity-100"><div className="icon-medium"><div className="svg w-embed"><Arrow /></div></div></div>
          </a>
          <a href="/book-demo/" className="button-dark button-ghost w-inline-block">
            <div className="button-text-block"><div className="text-heading-m">Work with us</div></div>
          </a>
        </div>
      </div>

      <TokenDial />

      <HeroCards />
    </section>
  );
}
