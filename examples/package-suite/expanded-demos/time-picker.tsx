// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { TimePicker } from "@siso/ui/blocks/source";

export function MeetingTime() {
  const [time, setTime] = useState("14:30");
  return <TimePicker label="Start time" value={time} onChange={setTime} minuteStep={30} />;
}
