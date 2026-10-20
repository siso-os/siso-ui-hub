// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Accordion } from "@siso/ui/blocks/source";

export function Faq() {
  return (
    <Accordion
      size="lg"
      items={[
        { title: "Can I cancel anytime?", content: "Yes. Your plan stays active until the period ends." },
        { title: "Do you offer refunds?", content: "Within 14 days of purchase, no questions asked." },
      ]}
    />
  );
}
