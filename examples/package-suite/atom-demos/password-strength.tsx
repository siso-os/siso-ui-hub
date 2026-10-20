// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { PasswordStrength } from "@siso/atoms/source";

export function NewPasswordField() {
  const [strong, setStrong] = useState(false);
  return (
    <PasswordStrength
      label="New password"
      name="password"
      autoComplete="new-password"
      onValueChange={(_, strength) => setStrong(strength.level >= 3)}
    />
  );
}

// uihub: siso:package-workbench
