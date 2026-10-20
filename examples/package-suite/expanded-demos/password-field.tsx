// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { PasswordField } from "@siso/atoms/source";

export function SignInPassword() {
  return (
    <PasswordField
      label="Password"
      name="password"
      autoComplete="current-password"
      required
    />
  );
}

// uihub: siso:package-workbench
