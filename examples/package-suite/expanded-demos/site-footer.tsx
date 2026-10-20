import { subscribe } from "./preview-host";
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { SiteFooter } from "@siso/ui/blocks/source";

export function Footer() {
  return (
    <SiteFooter
      brand={{ name: "Acme", href: "/" }}
      tagline="Scheduling for small clinics."
      columns={[
        { title: "Product", links: [{ label: "Pricing", href: "/pricing" }, { label: "Changelog", href: "/changelog" }] },
        { title: "Company", links: [{ label: "About", href: "/about" }, { label: "Careers", href: "/careers" }] },
      ]}
      legal={[{ label: "Privacy", href: "/privacy" }, { label: "Terms", href: "/terms" }]}
      newsletter={{ onSubscribe: email => subscribe(email) }}
      status={{ label: "All systems normal", tone: "success", href: "https://status.example.com" }}
    />
  );
}
