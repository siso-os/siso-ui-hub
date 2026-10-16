"use client"

import { Checkbox, CheckboxField } from "../../../ui/checkbox"
import { Description } from "../../../ui/field"
import { Form } from "react-aria-components/Form"

export default function CheckboxDescriptionExample() {
  return (
    <Form>
      <CheckboxField name="notification">
        <Checkbox>Enable notifications</Checkbox>
        <Description>Get account updates and feature announcements.</Description>
      </CheckboxField>
    </Form>
  )
}
