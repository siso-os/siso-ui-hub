"use client"

import { Label } from "../../../ui/field"
import { Input } from "../../../ui/input"
import { TagField } from "../../../ui/tag-field"

export default function TagFieldDisabledDemo() {
  return (
    <TagField>
      <Label>Coupon codes</Label>
      <Input disabled placeholder="Add codes, press Enter" />
    </TagField>
  )
}
