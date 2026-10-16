// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.variants.ts)
// ═══════════════════════════════════════════════════════════════════════════════
// nav.variants — which version of the bar is on screen.
// Shaan, 9 Oct: "maybe it could have some variations to make it cleaner, not sure what". Three cleaner framings of the same
// nav, switchable live with ?nav=1, ?nav=2 and ?nav=3; no query string keeps the current bar (variant 0, the default).
//
// Nothing here changes the menus' contents — only the bar's density, the glow's strength, how the panel attaches and how
// wide it is. All of it lands as CSS under .nav-container[data-nav="N"] (nav.variants.css.ts), so the lane redesigning the
// dropdowns' insides never collides with this.
// ═══════════════════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';

export type NavVariant = 0 | 1 | 2 | 3;

export const NAV_VARIANTS: { id: NavVariant; name: string; summary: string }[] = [
  { id: 0, name: 'Current', summary: 'The bar as it stands: 64px capsule, ring always turning, panel 16px below.' },
  { id: 1, name: 'Tight', summary: 'Denser bar, quieter idle ring, panel docked to the bar so they read as one piece.' },
  { id: 2, name: 'Hairline', summary: 'Idle is a hairline; the neon only arrives on hover or open. Wider, airier panel.' },
  { id: 3, name: 'Sheet', summary: 'Full-width bar, no capsule; the panel hangs from it as one edge-to-edge sheet.' },
];

/** The top of the open panel, in px from the top of the viewport, for each variant. */
export const VARIANT_PANEL_TOP: Record<NavVariant, number> = { 0: 80, 1: 62, 2: 84, 3: 56 };

/**
 * The panel's max width for each variant (0 = the shared DROPDOWN.maxWidth).
 * Variant 1 docks, so its panel must be exactly as wide as its bar or the two edges will not line up.
 */
export const VARIANT_PANEL_MAX_WIDTH: Record<NavVariant, number> = { 0: 1360, 1: 1360, 2: 1440, 3: 0 };

function read(search: string): NavVariant {
  const raw = new URLSearchParams(search).get('nav');
  const n = Number(raw);
  return raw !== null && (n === 1 || n === 2 || n === 3) ? n : 0;
}

/**
 * The variant in `?nav=`. Starts at 0 so the server and the first client render agree (the query string is not available
 * during a static export), then settles on the real one after mount; it also follows back/forward navigation.
 */
export function useNavVariant(): NavVariant {
  const [variant, setVariant] = useState<NavVariant>(0);
  useEffect(() => {
    const sync = () => setVariant(read(window.location.search));
    sync();
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  return variant;
}
