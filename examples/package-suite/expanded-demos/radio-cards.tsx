// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { RadioCards } from "@siso/atoms/source";

export function ShippingSpeed() {
  return (
    <RadioCards
      aria-label="Shipping speed"
      name="shipping"
      layout="list"
      defaultValue="standard"
      options={[
        { value: "standard", label: "Standard", description: "4 to 6 business days", meta: "Free" },
        { value: "express", label: "Express", description: "2 business days", meta: "$12" },
        { value: "overnight", label: "Overnight", meta: "$29", disabled: true, disabledReason: "Not available for this address" },
      ]}
    />
  );
}

// uihub: siso:package-workbench
