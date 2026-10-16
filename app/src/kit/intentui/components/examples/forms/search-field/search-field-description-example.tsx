"use client"

import { Description } from "../../../ui/field"
import { SearchField, SearchInput } from "../../../ui/search-field"

export default function SearchFieldDescriptionDemo() {
  return (
    <SearchField aria-label="Search" name="search">
      <SearchInput placeholder="Search" />
      <Description>Search for a product</Description>
    </SearchField>
  )
}
