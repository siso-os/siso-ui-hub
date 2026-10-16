import { Description, Label } from "../../../ui/field"
import { NativeSelect, NativeSelectContent } from "../../../ui/native-select"

export default function NativeSelectDescriptionDemo() {
  return (
    <NativeSelect>
      <Label>Role</Label>
      <NativeSelectContent>
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
        <option value="viewer">Viewer</option>
      </NativeSelectContent>
      <Description>Pick the default permission level for new teammates.</Description>
    </NativeSelect>
  )
}
