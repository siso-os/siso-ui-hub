// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { DatePicker } from "../date-picker/date-picker";

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
