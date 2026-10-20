// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Combobox } from "@siso/ui/blocks/source";

const timezones = [
  { value: "utc", label: "UTC" },
  { value: "cet", label: "Central European", keywords: ["zurich", "berlin"] },
  { value: "pst", label: "Pacific", keywords: ["san francisco"] },
];

export function TimezoneField() {
  const [zone, setZone] = useState("");
  return <Combobox label="Time zone" options={timezones} value={zone} onValueChange={setZone} />;
}
