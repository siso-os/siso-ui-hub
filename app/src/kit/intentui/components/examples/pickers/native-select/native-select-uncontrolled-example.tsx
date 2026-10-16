import { Label } from "../../../ui/field"
import { NativeSelect, NativeSelectContent } from "../../../ui/native-select"

export default function NativeSelectUncontrolledDemo() {
  return (
    <NativeSelect>
      <Label>Role</Label>
      <NativeSelectContent defaultValue="member" name="role">
        <option value="owner">Owner</option>
        <option value="admin">Admin</option>
        <option value="member">Member</option>
        <option value="viewer">Viewer</option>
      </NativeSelectContent>
    </NativeSelect>
  )
}
