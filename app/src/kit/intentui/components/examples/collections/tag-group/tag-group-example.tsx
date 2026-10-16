"use client"

import { Label } from "../../../ui/field"
import { Tag, TagGroup, TagList } from "../../../ui/tag-group"

export const androidBrands = [
  { id: "1", name: "Samsung", available: false },
  { id: "2", name: "OnePlus", available: true },
  { id: "3", name: "Google", available: true },
  { id: "4", name: "Xiaomi", available: false },
]

export default function TagGroupDemo() {
  return (
    <TagGroup selectionMode="multiple">
      <Label>Android Brands</Label>
      <TagList items={androidBrands}>{(item) => <Tag>{item.name}</Tag>}</TagList>
    </TagGroup>
  )
}
