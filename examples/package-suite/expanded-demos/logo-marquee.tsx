// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { LogoMarquee } from "@siso/ui/blocks/source";

export function Customers() {
  return (
    <LogoMarquee
      title="Trusted by product teams"
      description="Teams of every size ship with us."
      brands={[{ name: "Acme", icon: "/logos/acme.svg" }, { name: "Globex", icon: "/logos/globex.svg" }]}
    />
  );
}
