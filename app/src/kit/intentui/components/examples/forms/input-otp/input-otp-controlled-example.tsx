"use client"

import { useState } from "react"
import { Description } from "../../../ui/field"
import { InputOTP, InputOTPControl, InputOTPGroup, InputOTPSlot } from "../../../ui/input-otp"

export default function InputOtpControlledDemo() {
  const [value, setValue] = useState("")
  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPControl>
        <InputOTPGroup>
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTPControl>
      <Description>
        {value === "" ? "Enter your one-time password." : `Your one-time password is: ${value}`}
      </Description>
    </InputOTP>
  )
}
