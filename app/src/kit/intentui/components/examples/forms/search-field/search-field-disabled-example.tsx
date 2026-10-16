"use client"

import { SearchField, SearchInput } from "../../../ui/search-field"

export default function SearchFieldDisabledDemo() {
  return (
    <SearchField isDisabled name="search">
      <SearchInput />
    </SearchField>
  )
}
