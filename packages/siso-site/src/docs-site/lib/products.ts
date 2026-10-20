// uihub: siso:site
import type { Product as Glyph } from '../components/ProductGlyph';
import { SITE } from './site';

// One row per product section. Colours are ProductGlyph's TILE colours (SISO UI standard, section 3); a product's colour is
// used only on that product's own things. `status` is what the docs actually hold today, shown on cards and the sidebar.
// `repo` is set only where the GitHub repository is public (checked with `gh repo view`, 9 Oct 2026).
export type DocStatus = 'guides' | 'quickstart' | 'overview';

export type ProductInfo = {
  slug: string;
  name: string;
  glyph: Glyph;
  color: string;
  category: string;
  description: string;
  status: DocStatus;
  /** Square glass artwork (public/art), when one exists for this product. */
  art?: string;
  /** Wide banner background (public/art/bg). */
  banner: string;
  repo?: string;
  site?: string;
};

export const products: ProductInfo[] = [
  {
    slug: 'agent-base', name: 'Agent Base', glyph: 'os', color: '#ed615a', category: 'ORCHESTRATE', status: 'guides',
    description: 'One desktop window for your agents: Agent Zero on top, a terminal and a page for each agent.',
    art: '/art/agent-base.webp', banner: '/art/bg/agent-base.webp',
  },
  {
    // No artwork of its own yet (IMAGE-REQUESTS.md); it borrows Agent Base's banner, the nearest product in the same domain.
    slug: 'agent-stack', name: 'Agent Stack', glyph: 'os', color: '#ff8a3d', category: 'ORCHESTRATE', status: 'guides',
    description: 'One version-pinned distribution of SISO’s agent setup: skills, hooks, agent roles, shared state and a runtime.',
    banner: '/art/bg/agent-base.webp', repo: 'https://github.com/sisodias/siso-agent-stack',
  },
  {
    slug: 'voice', name: 'Voice', glyph: 'voice', color: '#e0336a', category: 'CAPTURE', status: 'guides',
    description: 'Mac dictation: hold a key, speak, and the cleaned-up text lands in the field you are typing in.',
    art: '/art/voice.webp', banner: '/art/bg/voice.webp',
  },
  {
    slug: 'ui-hub', name: 'UI Hub', glyph: 'ui-hub', color: '#1f69ff', category: 'DESIGN', status: 'overview',
    description: 'SISO’s rules, catalogue and component inventory for every interface we build.',
    art: '/art/ui-hub.webp', banner: '/art/bg/ui-hub.webp',
  },
  {
    slug: 'great-library', name: 'Great Library', glyph: 'library', color: '#7540b7', category: 'DISCOVER', status: 'quickstart',
    description: 'A public, human- and agent-readable registry of SISO’s work, with stable identities.',
    art: '/art/great-library.webp', banner: '/art/bg/great-library.webp',
    repo: 'https://github.com/sisodias/great-library-of-siso', site: 'https://great-library-of-siso.pages.dev/',
  },
  {
    slug: 'research', name: 'Research', glyph: 'research', color: '#41567a', category: 'UNDERSTAND', status: 'overview',
    description: 'Foundry turns large source corpora into traceable, ranked, reusable research knowledge.',
    banner: '/art/bg/research.webp', repo: 'https://github.com/sisodias/siso-foundry',
  },
  {
    slug: 'agency', name: 'Agency', glyph: 'agency', color: '#00a879', category: 'BUILD', status: 'guides',
    description: 'Websites for businesses: several looks, and previews you click through before launch.',
    art: '/art/agency.webp', banner: '/art/bg/agency.webp', site: SITE,
  },
  {
    slug: 'skills', name: 'Skills', glyph: 'all', color: '#ff6a1a', category: 'EXTEND', status: 'guides',
    description: 'The Skills Hub: a registry and CLI for atomic, repeatable agent capabilities.',
    art: '/art/skills.webp', banner: '/art/bg/skills.webp', repo: 'https://github.com/sisodias/siso-skills-hub',
  },
];

export const STATUS_LABEL: Record<DocStatus, string> = {
  guides: 'Full guides',
  quickstart: 'Quickstart',
  overview: 'Overview',
};

export function productOf(slug?: string) {
  return products.find(p => p.slug === slug);
}
