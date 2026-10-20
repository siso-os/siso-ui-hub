// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Calendar } from "@siso/ui/blocks/source";

export function DeliveryDate() {
  const [date, setDate] = useState<Date>();
  return (
    <Calendar
      value={date}
      onChange={setDate}
      minDate={new Date()}
      disabledDates={(day) => day.getDay() === 0}
      showToday
    />
  );
}
