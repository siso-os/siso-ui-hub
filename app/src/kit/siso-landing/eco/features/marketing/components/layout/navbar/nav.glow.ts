// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.glow.ts)
// The nav's share of html[data-glow] (see NAV_GLOW_CSS in siso/home-products/homeProductStyles.ts). A menu sets the key of
// the product under the pointer, so the open panel's rim and the bar take that product's colour; clearing only removes a key
// the nav itself set, so a home card still holding the glow keeps it.
export type GlowKey = 'os' | 'ui-hub' | 'library' | 'skills' | 'agency' | 'voice' | 'research';

let owned: string | null = null;

export function navGlow(key: GlowKey | null) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (key) {
    root.dataset.glow = key;
    owned = key;
  } else if (owned) {
    if (root.dataset.glow === owned) delete root.dataset.glow;
    owned = null;
  }
}
