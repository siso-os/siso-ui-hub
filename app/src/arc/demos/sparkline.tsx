// From Arc's docs page (Usage), imports pointed at the copied source
import { Sparkline } from "../sparkline/sparkline";

export function Signups() {
  return (
    <Sparkline
      label="Signups"
      data={[12, 18, 15, 22, 30, 27, 34]}
      labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
      value="34"
      change="+26%"
      tone="success"
    />
  );
}
