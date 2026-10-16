// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { PasswordStrength } from "../password-strength/password-strength";

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
