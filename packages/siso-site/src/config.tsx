'use client';
// uihub: siso:site
import { createContext, useContext, type ReactNode } from 'react';
import type { Product } from './eco/features/marketing/components/siso/ProductGlyph';
export interface FooterStatistic { key: string; n: string; label: string; href: string; source?: string }
export interface SiteStats {
  stats: FooterStatistic[];
  updated: string;
  /** Explicit caller-provided rate model; absent by default. No API or usage data is fetched. */
  tokensLive?: { base: number; from: string; perDay: number; _readme: string };
  social: { counts: Record<string, string>; read: string };
}
export interface FooterProduct { label: string; desc: string; href: string; product: Product }
export interface FooterLinkItem { href: string; children: string; external?: boolean }
export interface SiteConfig {
  /** Host-owned effect slot. The original restricted shader is an application dependency, not redistributed in this package. */
  beam?: ReactNode;
  copyright?: ReactNode;
  homeHref?: string;
  markSrc?: string;
  allProjectsHref?: string;
  products?: FooterProduct[];
  companyLinks?: FooterLinkItem[];
  agencyLinks?: FooterLinkItem[];
  resourceLinks?: FooterLinkItem[];
  socialHrefOverrides?: Record<string, string>;
  socialAvatarOverrides?: Record<string, string>;
  aiPrompt?: string;
  aiLabel?: string;
  stats?: SiteStats;
}
export const EMPTY_SITE_STATS: SiteStats = { stats: [], updated: '', social: { counts: {}, read: '' } };
const Context = createContext<SiteConfig>({});
export function SiteProvider({ config, children }: { config: SiteConfig; children: ReactNode }) { return <Context.Provider value={config}>{children}</Context.Provider>; }
export function useSiteConfig() { return useContext(Context); }
