// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { HeroSection } from "@siso/ui/blocks/source";

export function Hero() {
  return (
    <HeroSection
      variant="centered"
      primaryAction={{ label: "Start free trial", href: "/sign-up" }}
      secondaryAction={{ label: "Book a demo", href: "/demo" }}
    />
  );
}
