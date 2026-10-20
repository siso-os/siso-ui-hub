// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { DatePicker } from "@siso/ui/blocks/source";

export function StartDateField() {
  const [start, setStart] = useState<Date>();
  return (
    <DatePicker
      label="Start date"
      value={start}
      onChange={setStart}
      minDate={new Date()}
      showToday
    />
  );
}
