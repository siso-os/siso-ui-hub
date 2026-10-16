"use client"

import { androidBrands } from "./tag-group-example"
import { Label } from "../../../ui/field"
import { Tag, TagGroup, TagList } from "../../../ui/tag-group"

export default function TagGroupDisabledDemo() {
  return (
    <div className="space-y-6">
      <TagGroup
        disabledKeys={androidBrands.filter((brand) => !brand.available).map((brand) => brand.id)}
        selectionMode="multiple"
      >
        <Label>Disabled key</Label>
        <TagList items={androidBrands}>{(item) => <Tag>{item.name}</Tag>}</TagList>
      </TagGroup>

      <TagGroup selectionMode="multiple">
        <Label>Disabled by Tag</Label>
        <TagList items={androidBrands}>
          {(item) => <Tag isDisabled={item.available}>{item.name}</Tag>}
        </TagList>
      </TagGroup>
    </div>
  )
}
