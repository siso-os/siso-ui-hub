// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/_public/layout.ts)
/**
 * Public surface — marketing/layout
 *
 * Shared layout primitives: navigation bar and footer.
 * Import from here; never deep-import into marketing/components/layout/.
 */

export { NavBar, MarketingNavBar } from '../components/layout/navbar/NavBar';
// Lazy: mounts near the screen, no server HTML (components/Footer/LazyFooter.tsx).
export { default as Footer } from '../components/Footer/LazyFooter';
