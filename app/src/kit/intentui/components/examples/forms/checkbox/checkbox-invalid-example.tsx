"use client"

import { Checkbox, CheckboxField } from "../../../ui/checkbox"
import { FieldError } from "../../../ui/field"
import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"

export default function CheckboxInvalidDemo() {
  return (
    <Form>
      <CheckboxField isRequired name="notification">
        <Checkbox>Enable notifications</Checkbox>
        <FieldError />
      </CheckboxField>
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </Form>
  )
}
