// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { RadioGroup } from "../radio-group/radio-group";

export function PlanPicker() {
  const [plan, setPlan] = useState("team");
  return (
    <RadioGroup
      label="Plan"
      name="plan"
      value={plan}
      onValueChange={setPlan}
      options={[
        { value: "solo", label: "Solo", description: "One seat" },
        { value: "team", label: "Team", description: "Up to 20 seats" },
      ]}
    />
  );
}
