"use client"

import { Checkbox, CheckboxField } from "../../../ui/checkbox"

export default function CheckboxIndeterminateDemo() {
  return (
    <CheckboxField value="read" isIndeterminate name="read">
      <Checkbox>Read</Checkbox>
    </CheckboxField>
  )
}
