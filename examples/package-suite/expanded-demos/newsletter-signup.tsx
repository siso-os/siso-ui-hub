// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { NewsletterSignup } from "@siso/ui/blocks/source";

export function Newsletter() {
  return (
    <NewsletterSignup
      variant="card"
      onSubscribe={async email => {
        const response = await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
        if (!response.ok) throw new Error("Subscribe failed");
      }}
    />
  );
}
