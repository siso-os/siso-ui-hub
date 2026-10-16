"use client"

import { Description } from "../../../ui/field"
import { Switch, SwitchField } from "../../../ui/switch"

export default function SwitchUncontrolledDemo() {
  return (
    <SwitchField defaultSelected name="d">
      <Switch>Dark mode</Switch>
      <Description>Toggle dark mode for this site.</Description>
    </SwitchField>
  )
}
