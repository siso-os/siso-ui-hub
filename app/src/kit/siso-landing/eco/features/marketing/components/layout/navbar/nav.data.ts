// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.data.ts)
// ═══════════════════════════════════════════════════════════════════════════════
// Navigation Data - all items, labels, hrefs, icons in one place
// Mirrors foreplay.co's nav item for item (saved HTML: siso-vps /opt/siso-landing/img/eco/fp/home.html).
// Copy is theirs until the copy pass; the brand word is SISO and claims we can't back (100M ads, $10k/mo) are cut.
// ═══════════════════════════════════════════════════════════════════════════════

import STATS from '../../../data/siso-stats.json';
import type { LivingIconName } from '../../siso/living/living-assets';
import type { Product } from '../../siso/ProductGlyph';
import type { GlowKey } from './nav.glow';
import type { NavGlyphName } from './nav.glyphs';

export const BRAND = 'SISO';

// ─── Product data ─────────────────────────────────────────────────────────────


// Numbers come from siso-stats.json (each with its source there), so the nav and the footer always say the same thing.
const stat = (key: string) => STATS.stats.find(s => s.key === key)?.n ?? '';

export type EcoIcon =
  | { kind: 'mark'; brand: 'agent-base' | 'siso-agency' }
  | { kind: 'living'; name: LivingIconName }
  | { kind: 'glyph'; product: Product };

// Ecosystem menu (Shaan, 8-9 Oct): what SISO Labs makes, each in its own colour and its own icon (the living set from
// siso/living, ProductGlyph for UI Hub). `glow` is the html[data-glow] key the rim takes on hover; `proof` is one true line
// under each (a sourced number where we have one). Jev has no page of its own; it opens its section on /skills/.
export const ECOSYSTEM: {
  label: string; href: string; desc: string; proof: string; color: string; glow: GlowKey; icon: EcoIcon;
}[] = [
  // Shaan, 9 Oct ~23:00: "maybe we have agent base, voice, UI hub, [Jev], skills hub and then all projects". Great Library
  // moved to Resources, SISO Agency has its own menu. Every icon is from the living set (siso/living/navigation-glyphs.tsx).
  { label: 'Agent Base', href: '/agent-base/', desc: 'The OS our agents run on', proof: `${stat('tokens')} tokens`, color: '#ed615a', glow: 'os', icon: { kind: 'living', name: 'agent-base' } },
  { label: 'Voice', href: '/voice/', desc: 'Talk to your agents', proof: 'In Agent Base', color: '#e0336a', glow: 'voice', icon: { kind: 'living', name: 'siso-voice' } },
  { label: 'UI Hub', href: '/ui-hub/', desc: 'Every UI worth reusing', proof: 'Open source', color: '#1f69ff', glow: 'ui-hub', icon: { kind: 'glyph', product: 'ui-hub' } },
  { label: 'Jev', href: '/skills/#jev', desc: 'A second opinion for your agent', proof: 'Open source', color: '#e8b04a', glow: 'skills', icon: { kind: 'living', name: 'jev' } },
  { label: 'Skills Hub', href: '/skills/', desc: 'Our skills, in one hub', proof: `${stat('skills')} skills made`, color: '#f5a524', glow: 'skills', icon: { kind: 'living', name: 'skills-hub' } },
];

// Inside Agent Base: its real modules, with the app's own living icons (Shaan, 9 Oct: "I don't like the stuff that it says
// inside the agent base"). He may change these; edit the list.
export const AGENT_BASE_MODULES: { label: string; href: string; icon: LivingIconName }[] = [
  { label: 'Voice', href: '/voice/', icon: 'siso-voice' },
  { label: 'Browser', href: '/agent-base/#modules', icon: 'web' },
  { label: 'Rolodex', href: '/agent-base/#modules', icon: 'rolodex' },
  { label: 'Estate', href: '/agent-base/#modules', icon: 'estate' },
  { label: 'Great Library', href: '/great-library/', icon: 'library' },
  { label: 'WhatsApp', href: '/agent-base/#modules', icon: 'whatsapp' },
  { label: 'LifeLog', href: '/agent-base/#modules', icon: 'lifelog' },
];

export const ALL_PROJECTS = { label: 'All projects', href: '/ecosystem/' } as const;

// Agency menu (Shaan, 9 Oct: "the agency one can be a drop down and have that nice card with all of the industries").
export const AGENCY = {
  title: 'Agents build sites for every industry',
  sites: stat('sites'),
  industries: stat('industries'),
  proof: { label: 'Corner Café', href: 'https://sisolabs.space/', shot: '/agency/corner-cafe-page.webp' },
  links: [
    { label: 'Industries', href: '/industries/', desc: `All ${stat('industries')}, ranked` },
    { label: 'Claim your site', href: '/book-demo/', desc: 'Built before you ask' },
    { label: 'Work with us', href: '/pricing/', desc: 'Four ways in' },
  ],
} as const;

// Product banner: "What is SISO?" video card. Foreplay's own reel and lightbox video until ours exists.
export const PRODUCT_BANNER = {
  title: `What is ${BRAND}?`,
  videoMp4: 'https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4%2F69612b690e2aeb02841afc4f_FOREPLAY_V6_mp4.mp4',
  videoWebm: 'https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4%2F69612b690e2aeb02841afc4f_FOREPLAY_V6_webm.webm',
  poster: 'https://cdn.prod.website-files.com/62a4ed18ddad95dde8b8bfa4%2F69612b690e2aeb02841afc4f_FOREPLAY_V6_poster.0000000.jpg',
  youtubeId: 'k40dfSJUfhE',
} as const;

// ─── Solutions data ────────────────────────────────────────────────────────────

export const SOLUTIONS_LABEL = 'Industries we build for';

// Top of the 3,665 industries we ranked (_data/siso-agency/industries/ranked-all.csv), grouped by the module they need.
export const SOLUTIONS = [
  { label: 'Cafés & Coffee', href: '/industries/cafes/' },
  { label: 'Restaurants', href: '/industries/restaurants/' },
  { label: 'Beauty & Hair Salons', href: '/industries/beauty-salons/' },
  { label: 'Barbers & Nail Salons', href: '/industries/barbers-nails/' },
  { label: 'Spas & Clinics', href: '/industries/spas-clinics/' },
  { label: 'Yoga & Fitness', href: '/industries/yoga-fitness/' },
] as const;

// ─── Resources data ───────────────────────────────────────────────────────────

export type ResourceIcon =
  | { kind: 'glyph'; name: NavGlyphName }
  | { kind: 'living'; name: LivingIconName }
  | { kind: 'product'; product: Product };

// Resources menu (Shaan, 9 Oct: "resources I don't know we've got to redesign that"). Docs first, then the rest in his order.
// `color` is the product's own colour where the item is a product's, else a warm one; `glow` is the rim's colour on hover.
export const RESOURCES: {
  label: string; href: string; desc: string; color: string; icon: ResourceIcon; glow?: GlowKey;
}[] = [
  { label: 'Docs', href: 'https://docs.sisolabs.space', desc: 'How each tool works, step by step', color: '#FF6A1A', icon: { kind: 'glyph', name: 'docs' } },
  { label: 'Changelog', href: '/changelog/', desc: 'What we shipped, newest first', color: '#FFB547', icon: { kind: 'living', name: 'changelog' } },
  { label: 'Research', href: '/research/', desc: 'How we check sources before we build', color: '#41567a', icon: { kind: 'living', name: 'research' }, glow: 'research' },
  { label: 'Great Library', href: '/great-library/', desc: `${stat('repos')} repos indexed`, color: '#7540b7', icon: { kind: 'living', name: 'library' }, glow: 'library' },
  { label: 'The lab, live', href: '/live/', desc: 'Our agents at work, right now', color: '#ed615a', icon: { kind: 'living', name: 'beacon' }, glow: 'os' },
  { label: 'The stack', href: '/stack/', desc: 'Everything we build on, credited', color: '#f5a524', icon: { kind: 'living', name: 'estate' }, glow: 'skills' },
  { label: 'Contact', href: '/contact/', desc: 'hello@sisolabs.space', color: '#FF2D55', icon: { kind: 'glyph', name: 'contact' } },
];

export const RESOURCES_RAIL = { label: 'Work with us', href: '/pricing/' } as const;

// Shaan likes the merch video, so it stays (Foreplay's loop until our own is shot).
export const RESOURCES_MERCH = {
  label: 'Merch',
  desc: 'Our line is coming',
  href: '/merch/',
  image: '/siso-img/merch/range-mono-hero.webp',
  video: 'https://publicassets.foreplay.co/Website-Loop.webm',
} as const;
