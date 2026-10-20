import { save } from "./preview-host";
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { BillingPrice, BillingToggle } from "@siso/ui/atoms/source";

export function ProPrice() {
  const [period, setPeriod] = useState("monthly");
  const yearly = period === "yearly";
  return (
    <div>
      <BillingToggle
        value={period}
        onValueChange={setPeriod}
        options={[
          { value: "monthly", label: "Monthly" },
          { value: "yearly", label: "Yearly", badge: "Save 20%", activeBadge: "You save $48" },
        ]}
      />
      <BillingPrice amount={yearly ? 16 : 20} was={yearly ? 20 : undefined} period={yearly ? "per month, billed yearly" : "per month"} />
    </div>
  );
}
