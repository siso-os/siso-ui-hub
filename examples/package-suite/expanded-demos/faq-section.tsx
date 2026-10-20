// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { FaqSection } from "@siso/ui/blocks/source";

export function PricingFaq() {
  return (
    <FaqSection
      variant="search"
      title="Questions about billing"
      items={[
        { question: "Can I cancel anytime?", answer: "Yes. Your plan stays active until the end of the billing period." },
        { question: "Do you offer refunds?", answer: "We refund annual plans within 14 days of purchase." },
      ]}
      contact={{ label: "Talk to billing", href: "mailto:billing@example.com" }}
    />
  );
}
