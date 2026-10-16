"use client"

import { Checkbox, CheckboxField, CheckboxGroup } from "../../../ui/checkbox"
import { Label } from "../../../ui/field"

export default function CheckboxGroupUncontrolledExample() {
  return (
    <CheckboxGroup defaultValue={["sound", "wifi"]} name="options">
      <Label>Options</Label>
      <CheckboxField value="sound">
        <Checkbox>Sound</Checkbox>
      </CheckboxField>
      <CheckboxField value="wifi">
        <Checkbox>Wi-Fi</Checkbox>
      </CheckboxField>
      <CheckboxField value="sync">
        <Checkbox>Sync</Checkbox>
      </CheckboxField>
    </CheckboxGroup>
  )
}
