// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/brand-page/brand.ts)
import STATS from '../../../data/siso-stats.json';
import OPEN from '../../../data/siso-open-source.json';
import SKILLS from '../../../data/skills-hub.json';
import KIT from './kit-files.json';

// The /brand/ page's facts, each with where it was read. Colours are the product colours in docs/specs/flex-pages.md and
// SISO-UI-STANDARD.md §3 (ProductGlyph TILE); tints are the ones the product pages already use (ui-hub-page/Links.tsx,
// ProductGlyph). Files are built by build/build-assets.mjs into public/brand/kit/.

export const KIT_DIR = '/brand/kit/';
export const CONTACT = 'hello@sisolabs.space';

export type ProductKey = 'agent-base' | 'ui-hub' | 'great-library' | 'skills-hub' | 'siso-agency' | 'voice';
export const PRODUCTS: { key: ProductKey; name: string; colour: string; tint: string; deep: string; line: string; href: string }[] = [
  { key: 'agent-base', name: 'Agent Base', colour: '#ed615a', tint: '#ffc0b8', deep: '#b33f39', line: 'Run every agent in one window', href: '/agent-base/' },
  { key: 'ui-hub', name: 'UI Hub', colour: '#1f69ff', tint: '#9cc0ff', deep: '#1650c4', line: 'Reuse the best UI', href: '/ui-hub/' },
  { key: 'great-library', name: 'Great Library', colour: '#7540b7', tint: '#d2b6ff', deep: '#5a2f8f', line: 'Browse 1.3M+ indexed repos', href: '/great-library/' },
  { key: 'skills-hub', name: 'Skills Hub', colour: '#f5a524', tint: '#ffd98a', deep: '#a86b0a', line: `${SKILLS.total_in_registry} skills any agent can use`, href: '/skills/' },
  { key: 'siso-agency', name: 'SISO Agency', colour: '#00a879', tint: '#9ff0cf', deep: '#007a58', line: 'Sites for local businesses', href: '/agency/' },
  { key: 'voice', name: 'SISO Voice', colour: '#e0336a', tint: '#ffb3cb', deep: '#b81f52', line: 'Talk to your agents', href: '/voice/' },
];

// The house palette (SISO-UI-STANDARD.md §3 tokens).
export const PALETTE: { name: string; hex: string; use: string; ink?: boolean }[] = [
  { name: 'Ember', hex: '#FF6A1A', use: 'The brand accent' },
  { name: 'Gold', hex: '#FFC24B', use: 'Highlights, the lit mark', ink: true },
  { name: 'Rose', hex: '#FF2D55', use: 'The rim’s hot end' },
  { name: 'Hot', hex: '#FFF3D6', use: 'The brightest light', ink: true },
  { name: 'Black', hex: '#00030A', use: 'The page' },
  { name: 'Surface', hex: '#0A0B0F', use: 'Raised cards' },
  { name: 'Paper', hex: '#EEEBE4', use: 'Light bands', ink: true },
  { name: 'Ink', hex: '#0B0B0E', use: 'Text on paper' },
];

export type KitFile = (typeof KIT.files)[number];
const byName = Object.fromEntries(KIT.files.map(f => [f.svg.replace(/\.svg$/, ''), f])) as Record<string, KitFile>;
export const kit = (name: string) => byName[name];
export const KIT_FILES = KIT.files;

export const stat = (key: string) => STATS.stats.find(s => s.key === key)!;

// Boilerplate: every claim is a number or line already on the site, with its source in SOURCES below.
const repos = stat('repos'), github = stat('github'), skills = stat('skills'), sites = stat('sites');
export const BOILERPLATE = {
  short: 'SISO Labs builds open-source tools for working with AI agents: Agent Base, UI Hub, the Great Library, Skills Hub and SISO Voice. Its agency, SISO Agency, builds sites for local businesses.',
  long: `SISO Labs studies the open-source field, builds on the best of it, runs its own work on what it makes, and opens that work on GitHub. `
    + `Agent Base runs every coding agent in one window. UI Hub reuses the best open-source UI. The Great Library draws on an index of ${repos.n} public GitHub repos over 10 stars. `
    + `Skills Hub holds ${skills.n} skills any agent can use, and SISO Voice lets you talk to your agents. `
    + `Alongside the products, SISO Agency builds sites for local businesses, ${sites.n} sites and previews so far. `
    + `SISO Labs keeps ${github.n} repos on GitHub, ${OPEN.publicRepos} of them public, mostly under MIT. Press and partners: ${CONTACT}.`,
};

export const FACTS = [
  { n: repos.n, label: repos.label, source: repos.source },
  { n: github.n, label: github.label, source: github.source },
  { n: skills.n, label: skills.label, source: skills.source },
  { n: sites.n, label: sites.label, source: sites.source },
];

export const SOURCES = [
  `Numbers: src/features/marketing/data/siso-stats.json (updated ${STATS.updated}): ${FACTS.map(f => `${f.label}, ${f.source}`).join('; ')}.`,
  `Public repos: ${OPEN.source} (${OPEN.read}).`,
  `Skills Hub: ${SKILLS._source}.`,
  'Method line: /about/. Product lines: the footer marquee and each product page.',
];
