// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { ContactSection } from "@siso/ui/blocks/source";

export function Contact() {
  return (
    <ContactSection
      title="Talk to us"
      topics={["Sales", "Support"]}
      onSubmit={async message => {
        const response = await fetch("/api/contact", { method: "POST", body: JSON.stringify(message) });
        if (!response.ok) throw new Error("Could not send");
      }}
    />
  );
}
