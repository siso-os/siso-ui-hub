"use client"

import { Checkbox, CheckboxField } from "../../../ui/checkbox"

export default function CheckboxDisabledDemo() {
  return (
    <CheckboxField name="n" isDisabled>
      <Checkbox>Enable notifications</Checkbox>
    </CheckboxField>
  )
}
