"use client"

import { Form } from "react-aria-components/Form"
import { Button } from "../../../ui/button"
import { FieldError, Label } from "../../../ui/field"
import { SearchField, SearchInput } from "../../../ui/search-field"

export default function SearchFieldValidationDemo() {
  return (
    <Form className="space-y-4">
      <SearchField isRequired name="search">
        <Label>Name</Label>
        <SearchInput />
        <FieldError />
      </SearchField>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
