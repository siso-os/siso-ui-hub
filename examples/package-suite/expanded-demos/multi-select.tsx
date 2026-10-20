// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { MultiSelect } from "@siso/atoms/source";

export function LabelPicker() {
  const [labels, setLabels] = useState<string[]>(["bug"]);
  return (
    <MultiSelect
      label="Labels"
      value={labels}
      onValueChange={setLabels}
      options={[
        { value: "bug", label: "Bug" },
        { value: "feature", label: "Feature" },
        { value: "docs", label: "Docs" },
      ]}
    />
  );
}

// uihub: siso:package-workbench
