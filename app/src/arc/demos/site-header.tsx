// Hand-wired: Arc's docs example plus the state and sample data it references
import { SiteHeader } from "../blocks/site-header/site-header";

/** The `Logo` the docs example references but never defines. */
function Logo() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 26 16 6l10 20" />
      <path d="M11 19h10" />
    </svg>
  );
}

export default function SiteHeaderDemo() {
  return (
    <SiteHeader
      variant="simple"
      brand={{ name: "Acme", href: "/", mark: <Logo /> }}
      items={[
        { value: "product", label: "Product", href: "/product" },
        { value: "pricing", label: "Pricing", href: "/pricing" },
        { value: "docs", label: "Docs", href: "/docs" },
      ]}
      current="pricing"
      secondaryAction={{ label: "Sign in", href: "/sign-in" }}
      primaryAction={{ label: "Start free", href: "/sign-up" }}
    />
  );
}
