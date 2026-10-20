'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ISSO_NAV_CONFIG, PERSISTENT_NAV, PLATFORMS_NAV } from './sidebar-config';
import type { SectionConfig, NavItem, PlatformItem } from './sidebar-config';
import { cn } from '@/lib/utils';
import { SidebarProfileCard } from '@/components/ui/sidebar-profile-card';
import { SidebarContextCard } from '@/components/dashboard/SidebarContextCard';
import { getActiveSidebarSection, resolveSettingsHref } from './routing';
import { beginDashboardRouteTransition } from '@/shared/perf/dashboard-route-transition';

export interface ChangelogEntry {
  date: string;
  tag: 'new' | 'update' | 'fix';
  title: string;
}

export interface RoleSwitcherConfig {
  current: string;
  options: { label: string; href: string; icon?: string }[];
}

export interface SidebarConfig {
  navConfig?: SectionConfig[];
  persistentNav?: NavItem[];
  platformsNav?: PlatformItem[];
  appName?: string;
  changelog?: ChangelogEntry[];
  planLabel?: string;
  roleSwitcher?: RoleSwitcherConfig;
  contextCard?: React.ReactNode;
}
import {
  PanelLeftClose, PanelLeftOpen,
  ChevronDown, BookOpen,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// ── Product icon sprites (static 36px PNGs, ~3KB each) ──────────────────────
const PRODUCT_SPRITES: Record<string, string> = {
  hub:               '/sprites-icons/library-36.png',
  intelligence:      '/sprites-icons/discovery-36.png',
  recon:             '/sprites-icons/spyder-36.png',
  agents:            '/sprites-icons/lens-36.png',
  'content-gen':     '/sprites-icons/briefs-36.png',
  // Agency dashboard sprites
  'agency-overview': '/sprites-icons/agency-overview-36.png',
  'agency-content':  '/sprites-icons/agency-content-36.png',
  'agency-team':     '/sprites-icons/agency-team-36.png',
  'agency-webcam':   '/sprites-icons/agency-webcam-36.png',
  'agency-tools':    '/sprites-icons/agency-tools-36.png',
  // Public gallery lane sprites
  'gallery-hub':       '/sprites-icons/library-36.png',
  'gallery-videos':    '/sprites-icons/briefs-36.png',
  'gallery-stories':   '/sprites-icons/discovery-36.png',
  'gallery-carousels': '/sprites-icons/lens-36.png',
};

function resolveSpritePath(sprite?: string, fallbackId?: string) {
  if (sprite?.startsWith('/')) return sprite;
  return PRODUCT_SPRITES[sprite ?? fallbackId ?? ''];
}

// ── Changelog entries ─────────────────────────────────────────────────────────
const DEFAULT_CHANGELOG: ChangelogEntry[] = [
  { date: 'Apr 2026', tag: 'new',     title: 'Intelligence v2 - Trend radar launched' },
  { date: 'Mar 2026', tag: 'update',  title: 'Schedule - bulk upload & CSV export' },
  { date: 'Mar 2026', tag: 'new',     title: 'Recon agent - competitor scraping live' },
  { date: 'Feb 2026', tag: 'fix',     title: 'Approvals - mobile review fixed' },
  { date: 'Feb 2026', tag: 'new',     title: 'Briefs AI - auto-generate from trends' },
  { date: 'Jan 2026', tag: 'update',  title: 'Dashboard - new analytics cards' },
];

const TAG_STYLE: Record<string, string> = {
  new:    'bg-emerald-500/15 text-emerald-400',
  update: 'bg-blue-500/15 text-blue-400',
  fix:    'bg-amber-500/15 text-amber-400',
};

// ── Foreplay-style logo icon (28×28 SVG, white on dark) ───────────────────────
function ForeplayLogoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.875 4.375H9.625V9.625H4.375V7.875C4.375 5.94125 5.94125 4.375 7.875 4.375Z" fill="white"/>
      <path d="M18.375 4.375H11.375V9.625H18.375V4.375Z" fill="white" fillOpacity="0.85"/>
      <path d="M20.125 4.375C22.0588 4.375 23.625 5.94125 23.625 7.875V9.625H20.125V4.375Z" fill="white" fillOpacity="0.6"/>
      <path d="M9.625 11.375H4.375V16.625H9.625V11.375Z" fill="white" fillOpacity="0.85"/>
      <path d="M17.5 11.375H11.375V16.625H15.5C16.6046 16.625 17.5 15.7296 17.5 14.625V11.375Z" fill="white" fillOpacity="0.7"/>
      <path d="M23.625 11.375H19.25V14.625C19.25 15.7296 20.1454 16.625 21.25 16.625H23.625V11.375Z" fill="white" fillOpacity="0.2"/>
      <path d="M4.375 18.375H9.625V23.625H7.875C5.94125 23.625 4.375 22.0588 4.375 20.125V18.375Z" fill="white" fillOpacity="0.6"/>
      <path d="M14.625 18.375H11.375V23.625H16.625V20.375C16.625 19.2704 15.7296 18.375 14.625 18.375Z" fill="white" fillOpacity="0.2"/>
      <path d="M18.375 18.375H23.625V20.125C23.625 22.0588 22.0588 23.625 20.125 23.625H18.375V18.375Z" fill="white" fillOpacity="0.1"/>
    </svg>
  );
}

// ── Outside-click hook ────────────────────────────────────────────────────────
function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}


// ── Main sidebar ──────────────────────────────────────────────────────────────
export function IssoSidebarShell({ config }: { config?: SidebarConfig }) {
  const pathname = usePathname() ?? '';
  const [collapsed, setCollapsed] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const sidebarRef = useRef<HTMLElement>(null);
  const changelogRef = useRef<HTMLDivElement>(null);
  const roleSwitcherRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();

  useOnClickOutside(changelogRef, () => setShowChangelog(false));
  useOnClickOutside(roleSwitcherRef, () => setShowRoleSwitcher(false));

  const navConfig = config?.navConfig ?? ISSO_NAV_CONFIG;
  const persistentNav = config?.persistentNav ?? PERSISTENT_NAV;
  const platformsNav = config?.platformsNav ?? PLATFORMS_NAV;
  const appName = config?.appName ?? 'oracle';
  const changelog = config?.changelog ?? DEFAULT_CHANGELOG;
  const roleSwitcher = config?.roleSwitcher;
  const contextCard = config?.contextCard;

  // Derive active section from nav items
  const activeSection = getActiveSidebarSection(navConfig, pathname) ?? (navConfig[0]?.id ?? 'hub');

  const activeConfig = navConfig.find(s => s.id === activeSection);
  const displaySectionId = hoveredSection ?? activeSection;
  const displayConfig = navConfig.find(s => s.id === displaySectionId) ?? activeConfig;

  useEffect(() => {
    setHoveredSection(null);
  }, [activeSection, pathname, collapsed]);

  return (
    <>
    <nav
      data-testid="isso-mobile-nav"
      className="flex min-h-0 flex-shrink-0 items-center gap-2 overflow-hidden rounded-xl border border-white/[0.08] bg-[#08090b] px-2 py-2 lg:hidden"
      aria-label="Product navigation"
      onMouseLeave={() => setHoveredSection(null)}
    >
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
        <ForeplayLogoIcon size={26} />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto pb-0.5">
        {navConfig.map((section) => {
          const href = section.sections[0]?.items[0]?.href ?? '/content-gen';
          const isActive = activeSection === section.id;
          const sprite = resolveSpritePath(section.sprite, section.id);
          return (
            <a
              key={section.id}
              href={href}
              aria-label={section.label}
              aria-current={isActive ? 'page' : undefined}
              data-perf-route={href}
              onMouseEnter={() => setHoveredSection(section.id)}
              onFocus={() => setHoveredSection(section.id)}
              onBlur={() => setHoveredSection(null)}
              onClick={() => {
                if (typeof beginDashboardRouteTransition === 'function') {
                  beginDashboardRouteTransition({ href, source: 'sidebar' });
                }
              }}
              className={cn(
                'relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-[10px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                isActive ? 'opacity-100' : 'opacity-45 hover:opacity-100',
              )}
              style={isActive ? { backgroundColor: 'rgba(255,255,255,0.12)' } : undefined}
            >
              {sprite ? (
                <div
                  className="h-9 w-9 flex-shrink-0 bg-left bg-no-repeat"
                  style={{ backgroundImage: `url('${sprite}')`, backgroundSize: 'auto 100%' }}
                />
              ) : (
                <span className="text-white/60">{section.icon}</span>
              )}
            </a>
          );
        })}
      </div>
      <Link
        href={resolveSettingsHref(pathname)}
        aria-label="Settings"
        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] text-neutral-500 transition-colors hover:bg-white/5 hover:text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      >
        <PanelLeftOpen size={17} />
      </Link>
    </nav>

    <aside
      ref={sidebarRef}
      data-testid="isso-desktop-sidebar"
      className="hidden min-h-0 flex-shrink-0 flex-col overflow-y-auto overflow-x-hidden lg:flex"
      style={{ width: collapsed ? '76px' : '288px', transition: 'width 200ms ease' }}
    >

      {/* ── Logo + collapse button ── */}
      <div className={cn('flex flex-shrink-0 pt-4 pb-3', collapsed ? 'flex-col items-center gap-2 px-2' : 'flex-row items-center justify-between px-3')}>
        {!collapsed ? (
          <>
            <div className="flex items-center gap-2.5 px-1">
              <ForeplayLogoIcon size={28} />
              {roleSwitcher ? (
                <div ref={roleSwitcherRef} className="relative">
                  <button
                    onClick={() => setShowRoleSwitcher(v => !v)}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-white text-sm font-medium transition-all hover:bg-white/[0.12]"
                    style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                  >
                    {roleSwitcher.current}
                    <ChevronDown size={14} className="text-neutral-400" />
                  </button>
                  {showRoleSwitcher && (
                    <div
                      className="absolute top-[calc(100%+6px)] left-0 z-50 w-44 rounded-xl overflow-hidden"
                      style={{ backgroundColor: '#161616', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 16px 40px rgba(0,0,0,0.5)', willChange: 'transform' }}
                    >
                      <div className="py-1 px-1">
                        {roleSwitcher.options.map((opt) => (
                          <Link
                            key={opt.href}
                            href={opt.href}
                            prefetch={true}
                            onClick={() => setShowRoleSwitcher(false)}
                            className={cn(
                              'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left',
                              opt.label === roleSwitcher.current
                                ? 'text-white bg-white/[0.08]'
                                : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            )}
                          >
                            {opt.icon && (
                              <div
                                className="w-5 h-5 rounded-md overflow-hidden flex-shrink-0"
                                style={{ backgroundImage: `url(${opt.icon})`, backgroundSize: 'cover' }}
                              />
                            )}
                            {opt.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-white font-semibold text-sm tracking-tight select-none">{appName}</span>
              )}
            </div>
            <button
              onClick={() => setCollapsed(true)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-all flex-shrink-0"
              title="Collapse sidebar"
            >
              <PanelLeftClose size={20} />
            </button>
          </>
        ) : (
          <>
            <ForeplayLogoIcon size={28} />
            <button
              onClick={() => setCollapsed(false)}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-neutral-600 hover:text-neutral-300 hover:bg-white/5 transition-all"
              title="Expand sidebar"
            >
              <PanelLeftOpen size={20} />
            </button>
          </>
        )}
      </div>

      {/* ── Product icon row ── */}
      <div onMouseLeave={() => setHoveredSection(null)}>
        <div className={cn('flex flex-shrink-0', collapsed ? 'flex-col items-center gap-1 px-2' : 'flex-row items-center justify-between px-3 mb-1')}>
          {navConfig.map((section) => {
            const isActive = activeSection === section.id;
            const sprite = resolveSpritePath(section.sprite, section.id);
            const accentColor = section.color ?? '#8b5cf6';
            return (
              <div key={section.id} className="relative">
                {/* Win 2: pulsing ring on active section icon */}
                {isActive && (
                  <motion.span
                    animate={{
                      scale: prefersReducedMotion ? 1 : [1, 1.28, 1],
                      opacity: prefersReducedMotion ? 1 : [0.55, 0, 0.55],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-[10px]"
                    style={{ boxShadow: `0 0 0 2px ${accentColor}80` }}
                    aria-hidden="true"
                  />
                )}
                <a
                  href={section.sections[0]?.items[0]?.href ?? '/content-gen'}
                  data-perf-route={section.sections[0]?.items[0]?.href ?? '/content-gen'}
                  className={cn(
                    'relative flex items-center justify-center rounded-[10px] transition-all duration-150 flex-shrink-0 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                    'w-12 h-12',
                    isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'
                  )}
                  aria-label={section.label}
                  aria-current={isActive ? 'page' : undefined}
                  style={isActive ? { backgroundColor: 'rgba(255,255,255,0.12)' } : undefined}
                  onClick={() => {
                    if (typeof beginDashboardRouteTransition === 'function') {
                      beginDashboardRouteTransition({
                        href: section.sections[0]?.items[0]?.href ?? '/content-gen',
                        source: 'sidebar',
                      });
                    }
                  }}
                  onMouseEnter={e => {
                    setHoveredSection(section.id);
                    if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.12)';
                  }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  {/* Win 1: spring scale 1.0 -> 1.08 on hover */}
                  <motion.div
                    animate={{ scale: hoveredSection === section.id && !isActive ? (prefersReducedMotion ? 1 : 1.08) : 1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    className="flex items-center justify-center w-12 h-12"
                  >
                    {sprite ? (
                      <div
                        className="w-10 h-10 bg-no-repeat bg-left flex-shrink-0"
                        style={{ backgroundImage: `url('${sprite}')`, backgroundSize: 'auto 100%' }}
                      />
                    ) : (
                      <span className="text-white/60">{section.icon}</span>
                    )}
                  </motion.div>
                </a>
              </div>
            );
          })}
        </div>

      {/* ── Section panel (below icons) ── */}
      {!collapsed && displayConfig && !pathname.endsWith('/settings') && !pathname.includes('/settings/') && (() => {
        const pages = displayConfig.summaryItems ?? displayConfig.sections[0]?.items ?? [];
        const sprite = resolveSpritePath(displayConfig.sprite, displayConfig.id);
        const accentColor = displayConfig.color ?? 'var(--accent-primary)';

        return (
          <div className="px-3 pt-2 pb-1 flex-shrink-0">
                <SidebarContextCard
                  title={displayConfig.label}
                  description={displayConfig.description}
                  accentColor={accentColor}
                  icon={displayConfig.icon}
                  visual={
                    sprite ? (
                      <div
                        className="h-9 w-9 rounded-[14px] bg-no-repeat bg-left"
                        style={{ backgroundImage: `url('${sprite}')`, backgroundSize: 'auto 100%' }}
                      />
                    ) : undefined
                  }
                  pages={pages.map((page) => ({
                    label: page.label,
                    icon: page.icon,
                    description: page.description,
                    stat: typeof page.badge === 'number' ? String(page.badge) : page.stat,
                    href: page.href,
                  }))}
                />
          </div>
        );
      })()}
      </div>{/* end icon+panel hover zone */}

      {/* ── Detail panel (hidden when collapsed) ── */}
      {!collapsed && (
        <>
          {/* Context card slot / spacer */}
          <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 flex flex-col justify-end gap-2">
            {contextCard}
            <Link
              href="/knowledge"
              prefetch={false}
              className="block rounded-[16px] border border-white/[0.08] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-[10px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} className="text-white/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-semibold text-white/90">Knowledge</span>
                    <span className="text-[10px] font-semibold text-lime-400 bg-lime-400/10 rounded-[5px] px-1.5 py-px tracking-wide">NEW</span>
                  </div>
                  <span className="text-[11px] text-white/35 leading-relaxed">Creator playbook · 789 pages</span>
                </div>
              </div>
            </Link>
            <SidebarProfileCard
              sectionLabel={activeConfig?.label}
              accentColor={activeConfig?.color}
              settingsHref={resolveSettingsHref(pathname)}
            />
          </div>

        </>
      )}

      {/* Changelog modal */}
      <div ref={changelogRef} className="relative">
          {/* "What's new" button hidden 2026-04-27. Modal kept below in case it's brought back. */}

          {showChangelog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={() => setShowChangelog(false)}>
              <div
                className="max-h-[calc(100dvh-2rem)] w-[min(480px,calc(100vw-2rem))] rounded-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}
                style={{ backgroundColor: '#161616', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 32px 64px rgba(0,0,0,0.6)' }}
              >
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-5 border-b border-white/[0.06]">
                  <div>
                    <p className="text-base font-semibold text-white">What's new</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Feature releases & updates</p>
                  </div>
                  <button
                    onClick={() => setShowChangelog(false)}
                    className="text-neutral-600 hover:text-neutral-300 transition-colors mt-0.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
                {/* Entries */}
                <div className="py-2 max-h-[calc(100dvh-11rem)] overflow-y-auto">
                  {changelog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-4 px-6 py-3.5 hover:bg-white/[0.03] transition-colors">
                      <span className="text-[11px] text-neutral-600 mt-0.5 w-16 flex-shrink-0">{entry.date}</span>
                      <div className="flex-1 min-w-0 flex items-start gap-3">
                        <span className={cn('text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded mt-0.5 flex-shrink-0', TAG_STYLE[entry.tag])}>
                          {entry.tag}
                        </span>
                        <p className="text-sm text-neutral-300 leading-snug">{entry.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

    </aside>
    </>
  );
}
