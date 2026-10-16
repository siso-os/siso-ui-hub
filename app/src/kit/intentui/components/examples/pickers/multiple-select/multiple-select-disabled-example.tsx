"use client"

import { FieldError, Label } from "../../../ui/field"
import {
  MultipleSelect,
  MultipleSelectContent,
  MultipleSelectItem,
} from "../../../ui/multiple-select"

export default function MultipleSelectDisabledDemo() {
  return (
    <MultipleSelect isDisabled className="mx-auto max-w-2xs">
      <Label>Select fruits</Label>
      <MultipleSelectContent items={fruits}>
        {(item) => {
          return (
            <MultipleSelectItem id={item.id} textValue={item.name}>
              {item.name}
            </MultipleSelectItem>
          )
        }}
      </MultipleSelectContent>
      <FieldError />
    </MultipleSelect>
  )
}

const fruits = [{ id: 1, name: "Apple" }]
