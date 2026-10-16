// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/changelog-page/products.ts)
import type { Product } from '../ProductGlyph';

// The tags a changelog entry can carry (scripts/changelog-data.mjs reads them from the paths a commit changed). Colours are
// ProductGlyph's TILE colours (UI standard §3); `tint` is the readable shade of the same hue for text on black. Docs and
// Site are not products, so they take the warm palette (gold, ember) and the All glyph.
export type Tag = 'ui-hub' | 'library' | 'os' | 'research' | 'agency' | 'voice' | 'docs' | 'site';

export const TAGS: Record<Tag, { label: string; color: string; tint: string; glyph: Product; href: string }> = {
  'ui-hub': { label: 'UI Hub', color: '#1f69ff', tint: '#9cc0ff', glyph: 'ui-hub', href: '/ui-hub/' },
  library: { label: 'Great Library', color: '#7540b7', tint: '#d2b6ff', glyph: 'library', href: '/great-library/' },
  os: { label: 'Agent Base', color: '#ed615a', tint: '#ffc0b8', glyph: 'os', href: '/agent-base/' },
  research: { label: 'Research', color: '#41567a', tint: '#bfe6ff', glyph: 'research', href: '/research/' },
  agency: { label: 'Agency', color: '#00a879', tint: '#9ff0cf', glyph: 'agency', href: '/industries/' },
  voice: { label: 'Voice', color: '#e0336a', tint: '#ffb3cb', glyph: 'voice', href: '/voice/' },
  docs: { label: 'Docs', color: '#FFC24B', tint: '#ffe2a3', glyph: 'all', href: 'https://docs.sisolabs.space' },
  site: { label: 'Site', color: '#ff6a1a', tint: '#ffd59a', glyph: 'all', href: '/' },
};

export const TAG_ORDER: Tag[] = ['ui-hub', 'library', 'os', 'research', 'agency', 'voice', 'docs', 'site'];
