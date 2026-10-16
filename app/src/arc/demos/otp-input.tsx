// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { OtpInput } from "../otp-input/otp-input";

export function VerifyCode() {
  const [code, setCode] = useState("");
  return (
    <OtpInput
      label="Verification code"
      description="We sent a 6-digit code to your email."
      value={code}
      onChange={next => { setCode(next); if (next.length === 6) verify(next); }}
      autoFocus
    />
  );
}
