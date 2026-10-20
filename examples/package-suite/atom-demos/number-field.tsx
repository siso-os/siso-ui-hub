// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { NumberField } from "@siso/atoms/source";

export function SeatsField() {
  const [seats, setSeats] = useState(5);
  return (
    <NumberField
      label="Seats"
      value={seats}
      onValueChange={setSeats}
      min={1}
      max={500}
      suffix={(n) => (n === 1 ? " seat" : " seats")}
      scrub
    />
  );
}

// uihub: siso:package-workbench
