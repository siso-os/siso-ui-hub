// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
import { useState } from "react";
import { Stepper } from "@siso/ui/atoms/source";

const steps = [
  { id: "cart", label: "Cart" },
  { id: "shipping", label: "Shipping", description: "Address and delivery" },
  { id: "payment", label: "Payment" },
];

/**
 * `current` must stay a finite integer. The Stepper remembers where progress came from with a render-phase state update
 * guarded by `travel.to !== active`, which never settles on NaN — so a missing or non-numeric `current` re-renders
 * forever ("Too many re-renders"). Every write below stays inside 0…steps.length.
 */
export default function StepperDemo() {
  const [step, setStep] = useState(0);
  const goTo = (index: number) => {
    console.info("Step selected", index);
    setStep(Math.min(Math.max(Math.round(index), 0), steps.length));
  };
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Stepper current={step} onStepSelect={goTo} steps={steps} />
      <div style={{ display: "flex", gap: 8 }}>
        <button type="button" onClick={() => goTo(step - 1)} disabled={step === 0} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid color-mix(in srgb, currentColor 20%, transparent)", background: "transparent", color: "inherit", cursor: step === 0 ? "not-allowed" : "pointer" }}>
          Back
        </button>
        <button type="button" onClick={() => goTo(step + 1)} disabled={step === steps.length} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid color-mix(in srgb, currentColor 20%, transparent)", background: "transparent", color: "inherit", cursor: step === steps.length ? "not-allowed" : "pointer" }}>
          Next
        </button>
      </div>
    </div>
  );
}
