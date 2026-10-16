// From Arc's docs page (Usage), imports pointed at the copied source
import { LogoMarquee } from "../blocks/logo-marquee/logo-marquee";

export function Customers() {
  return (
    <LogoMarquee
      title="Trusted by product teams"
      description="Teams of every size ship with us."
      brands={[{ name: "Acme", icon: "/logos/acme.svg" }, { name: "Globex", icon: "/logos/globex.svg" }]}
    />
  );
}
