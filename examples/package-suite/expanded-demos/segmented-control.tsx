// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { SegmentedControl } from "@siso/atoms/source";

export function RangeToggle() {
  const [range, setRange] = useState("week");
  return (
    <SegmentedControl
      label="Range"
      value={range}
      onValueChange={setRange}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
}

// uihub: siso:package-workbench
