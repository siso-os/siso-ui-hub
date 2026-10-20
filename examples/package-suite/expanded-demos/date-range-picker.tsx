// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { DateRangePicker } from "@siso/ui/blocks/source";
import type { DateRange } from "@siso/ui/blocks/source";

export function ReportRange() {
  const [range, setRange] = useState<DateRange | null>(null);
  return (
    <DateRangePicker
      label="Report period"
      value={range}
      onChange={setRange}
      weekStartsOn={1}
      maxDate={new Date()}
    />
  );
}
