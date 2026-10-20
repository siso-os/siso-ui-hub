'use client';
// uihub: siso:site
import type { ReactNode, HTMLAttributes } from 'react';
import Footer from './eco/features/marketing/components/Footer';
import { SiteProvider, type SiteConfig } from './config';
import { blogStyles } from './eco/features/marketing/components/siso/blog/styles';
export interface SisoLandingFooterProps { config?: SiteConfig }
/** Accepted SISO landing composition, retaining all eight original footer parts. */
export function SisoLandingFooter({ config = {} }: SisoLandingFooterProps) { return <SiteProvider config={config}><Footer /></SiteProvider>; }
export function SisoBlogSkin({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) { return <div {...props} className={`siso-blog ${className}`}><style>{blogStyles}</style>{children}</div>; }
/** Content slots with the source docs' page/prose classes; import @siso/site/docs.css. */
export function SisoDocsArticle({ children, className = '', ...props }: HTMLAttributes<HTMLElement>) { return <article {...props} className={`sd-prose ${className}`}>{children}</article>; }
/** Preserves the source MDX provenance-note markup. */
export function SisoDocsSource({ children }: { children: ReactNode }) { return <p className="sd-source"><span>SOURCE</span><span className="sd-source-body">{children}</span></p>; }
/** Plain code, no synthetic syntax-highlighting claim. Uses the docs' Shiki frame skin. */
export function SisoDocsCode({ code, title, language = 'text' }: { code: string; title?: string; language?: string }) { return <figure className="shiki">{title && <div>{title}</div>}<pre tabIndex={0}><code className={`language-${language}`}>{code}</code></pre></figure>; }
