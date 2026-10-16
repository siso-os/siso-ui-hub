"use client"

import { Label } from "../../../ui/field"
import { SearchField, SearchInput } from "../../../ui/search-field"

export default function SearchFieldWithLabelDemo() {
  return (
    <SearchField name="search">
      <Label>Search</Label>
      <SearchInput />
    </SearchField>
  )
}
