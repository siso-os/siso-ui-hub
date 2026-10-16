// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { MorphSelect } from "../morph-select/morph-select";

export function TimezoneField() {
  const [zone, setZone] = useState<string | null>("europe/zurich");
  return (
    <MorphSelect
      label="Time zone"
      name="timezone"
      value={zone}
      onValueChange={setZone}
      items={[
        { label: "Europe", options: [
          { value: "europe/london", label: "London", meta: "UTC+0" },
          { value: "europe/zurich", label: "Zurich", meta: "UTC+1", keywords: "switzerland" },
        ] },
        { label: "Americas", options: [
          { value: "america/new_york", label: "New York", meta: "UTC−5" },
          { value: "america/los_angeles", label: "Los Angeles", meta: "UTC−8" },
        ] },
      ]}
    />
  );
}
