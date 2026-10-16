// From Arc's docs page (Usage), imports pointed at the copied source
import { PasswordField } from "../password-field/password-field";

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
