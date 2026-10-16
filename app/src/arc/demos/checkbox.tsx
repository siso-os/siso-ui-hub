// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { Checkbox } from "../checkbox/checkbox";

export function TermsCheckbox() {
  const [accepted, setAccepted] = useState(false);
  return (
    <Checkbox
      label="I agree to the terms"
      description="You can export your data at any time."
      checked={accepted}
      onCheckedChange={(next) => setAccepted(next === true)}
    />
  );
}
