"use client"

import { Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TagField } from "../../../ui/tag-field"

export default function TagFieldDemo() {
  return (
    <TagField>
      <Label>Coupon codes</Label>
      <Input placeholder="Add codes, press Enter" />
    </TagField>
  )
}
