// From Arc's docs page (Usage), imports pointed at the copied source
import { HeroSection } from "../blocks/hero-section/hero-section";

export function Hero() {
  return (
    <HeroSection
      variant="centered"
      primaryAction={{ label: "Start free trial", href: "/sign-up" }}
      secondaryAction={{ label: "Book a demo", href: "/demo" }}
    />
  );
}
