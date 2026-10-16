// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/home-hero/SisoHomeHeroClassic.tsx)
'use client';

// The hero before v2 (OS demo under the headline), kept whole. v2 is SisoHomeHero.tsx.

import { MotionConfig, motion } from 'framer-motion';
import { useHeroParallax } from '../../_anim/useHeroParallax';
import SisoOsDemo from './SisoOsDemo';
import { homeHeroStyles } from './styles';

// Each rendered logo is its organisation's GitHub avatar, visually checked.
// SST's avatar was a generic identicon: use Lucide, already in our stack, instead.
const SOURCES = [
  ['anthropics', 'Anthropic'], ['openai', 'OpenAI'], ['pingdotgg', 'T3 Code'],
  ['manaflow-ai', 'cmux'], ['tauri-apps', 'Tauri'], ['groq', 'Groq'],
  ['vercel', 'Vercel'], ['cloudflare', 'Cloudflare'], ['microsoft', 'Playwright'],
  ['radix-ui', 'Radix UI'], ['motiondivision', 'Motion'], ['lucide-icons', 'Lucide'],
] as const;

const PROOF = [
  ['1,356,183', 'repos indexed'], ['25', 'agent apps studied'], ['25', 'voice repos checked'], ['1,630', 'commits in 7 days'],
] as const;

export default function SisoHomeHero() {
  const { triggerRef, style } = useHeroParallax();
  return (
    <MotionConfig reducedMotion="user">
      <style>{homeHeroStyles}</style>
      <section id="product-hero-section" className="section relative hh-hero">
        <div className="dot-bg" />
        <div className="container section-container">
          <div className="home-hero">
            <div ref={triggerRef} className="home-hero-animation-trigger" />
            <motion.div className="home-hero-sticky" style={style}>
              <div className="home-hero-top">
                <div className="home-hero-content">
                  <div className="text-white">
                    <h1 className="text-display-h1 hero-title">Best in the world, or we don’t build it.</h1>
                  </div>
                  <div className="text-alpha-50">
                    <div className="text-body-l">We study what already exists, compare the field, and build on the best of it. Our agency uses the tools we build. Opening on GitHub.</div>
                  </div>
                  {/* Proof strip (copy/01-home.md §1): each number is counted; sources in research/showcase/plan.py claims. */}
                  <ul className="hh-proof" aria-label="What we have counted">
                    {PROOF.map(([n, l]) => <li key={l}><b>{n}</b> {l}</li>)}
                  </ul>
                </div>
                <div className="home-hero-cta">
                  <a href="/agent-base/" className="button-dark button-primary w-inline-block">
                    <div className="button-text-block"><div className="text-heading-m">Explore SISO OS</div></div>
                    <div className="button-icon-block icon-right opacity-100"><div className="icon-medium"><div className="svg w-embed">
                      <svg viewBox="0 0 20 20" width="100%" height="100%" aria-hidden="true"><path d="M4 10h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div></div></div>
                  </a>
                  <a href="/book-demo/" className="button-dark button-ghost w-inline-block">
                    <div className="button-text-block"><div className="text-heading-m">Work with us</div></div>
                  </a>
                </div>
              </div>
              <div className="home-hero-bottom">
                <div className="text-alpha-100"><div className="text-overline">Built by reading the best open source, and crediting it</div></div>
                <div className="home-hero-logo-grid">
                  {SOURCES.map(([org, name]) => (
                    <a key={org} href={`https://github.com/${org}`} className="home-hero-logo-wrapper hh-source" aria-label={`${name} on GitHub`}>
                      <div className="home-hero-logo-image w-embed hh-source-content">
                        <img src={`/logos/home-hero/${org}.png`} alt="" width={26} height={26} />
                        <span className="text-alpha-50 text-body-s">{name}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
            <div className="home-hero-overlay" />
            <div className="home-hero-middle">
              <div className="home-hero-mockup">
                {/* Explicit hero-only interactive replacement; original HomeHero stays intact. */}
                <SisoOsDemo />
                <div className="home-video-overlay hh-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
