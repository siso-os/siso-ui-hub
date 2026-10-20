// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Select } from "@siso/atoms/source";

export function RegionSelect() {
  const [region, setRegion] = useState("eu");
  return (
    <Select
      label="Region"
      value={region}
      onValueChange={setRegion}
      options={[
        { value: "us", label: "United States" },
        { value: "eu", label: "Europe" },
        { value: "ap", label: "Asia Pacific", disabled: true },
      ]}
    />
  );
}

// uihub: siso:package-workbench
