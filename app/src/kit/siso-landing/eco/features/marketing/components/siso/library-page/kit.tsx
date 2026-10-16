// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/library-page/kit.tsx)
'use client';

import type { ReactNode } from 'react';

// The Great Library page's own bits on top of the Agent Base frame (agent-base-page/base.tsx: bands, Head, Rail, useLive, the
// neon rim). This adds the library's purple, the nav glow rule (the home page keeps its own copy in homeProductStyles) and Num:
// a number that shows where it came from when you point at it or tab to it.

export const PURPLE = '#7540b7';
export const VIOLET = '#a46bff';
export const LILAC = '#d2b6ff';
export const fmt = (n: number) => n.toLocaleString('en-US');

/** A number with its source on hover and focus. */
export function Num({ children, src, className }: { children: ReactNode; src: string; className?: string }) {
  return <span className={className ? `glp-num ${className}` : 'glp-num'} tabIndex={0}>
    {children}<span className="glp-num-tip" role="tooltip">{src}</span>
  </span>;
}

const CSS = `
html[data-glow="library"] .nav-container{--nav-ember:#7540b7;--nav-gold:#d2b6ff;--nav-rose:#a46bff}
.glp .abp-over{color:#d2b6ff}
.glp .is-light .abp-over{color:#6a35ab}
.glp .abp-head h2 em{font-style:normal;background:linear-gradient(100deg,#d2b6ff,#a46bff 60%,#7540b7);-webkit-background-clip:text;background-clip:text;color:transparent}
.glp .is-light .abp-head h2 em{background:linear-gradient(100deg,#7540b7,#a46bff);-webkit-background-clip:text;background-clip:text}
.glp-num{position:relative;display:inline;cursor:help;outline:none;text-decoration:underline dotted;text-decoration-thickness:1px;text-underline-offset:.18em;text-decoration-color:#a46bff80}
.glp-num-tip{position:absolute;left:50%;bottom:calc(100% + 10px);z-index:30;width:max-content;max-width:280px;padding:10px 12px;border-radius:12px;
  background:#16121ff7;box-shadow:0 0 0 1px #a46bff66,0 18px 40px -14px #000;text-align:left;white-space:normal;
  font:500 11px/1.5 'Geist Mono',ui-monospace,monospace;letter-spacing:0;color:#eeebe4cc;text-shadow:none;-webkit-text-fill-color:#eeebe4cc;
  opacity:0;transform:translate(-50%,6px);pointer-events:none;transition:opacity .3s cubic-bezier(.19,1,.22,1),transform .3s cubic-bezier(.19,1,.22,1)}
.glp-num:hover .glp-num-tip,.glp-num:focus-visible .glp-num-tip{opacity:1;transform:translate(-50%,0)}
.glp-num:focus-visible{outline:2px solid #d2b6ff;outline-offset:3px;border-radius:4px}
.glp .abp-band.is-light{margin:0 clamp(8px,1.6vw,24px);border-radius:clamp(28px,3.4vw,48px)}
.glp .abp-band.is-light+.abp-band.is-light{margin-top:clamp(8px,1.6vw,24px)}
.glp-src-link{color:inherit;text-decoration:underline!important;text-underline-offset:.2em}
@media (max-width:620px){.glp-num-tip{max-width:220px}}
`;

export function LibraryCss() {
  return <style>{CSS}</style>;
}
