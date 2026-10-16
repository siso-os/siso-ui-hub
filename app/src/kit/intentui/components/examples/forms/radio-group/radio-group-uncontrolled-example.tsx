"use client"

import { Label } from "../../../ui/field"
import { Radio, RadioField, RadioGroup } from "../../../ui/radio"

export default function RadioGroupUncontrolledDemo() {
  return (
    <RadioGroup name="feat" defaultValue="theme">
      <Label>Features</Label>
      <RadioField value="language">
        <Radio>Language</Radio>
      </RadioField>
      <RadioField value="timezone">
        <Radio>Timezone</Radio>
      </RadioField>
      <RadioField value="notifications">
        <Radio>Notifications</Radio>
      </RadioField>
      <RadioField value="privacy">
        <Radio>Privacy</Radio>
      </RadioField>
    </RadioGroup>
  )
}
