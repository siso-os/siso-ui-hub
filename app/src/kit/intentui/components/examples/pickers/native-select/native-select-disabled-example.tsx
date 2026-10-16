"use client"

import { Label } from "../../../ui/field"
import { NativeSelect, NativeSelectContent } from "../../../ui/native-select"

export default function NativeSelectDescriptionDemo() {
  return (
    <NativeSelect>
      <Label>Role</Label>
      <NativeSelectContent disabled name="role">
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
        <option value="viewer">Viewer</option>
      </NativeSelectContent>
    </NativeSelect>
  )
}
