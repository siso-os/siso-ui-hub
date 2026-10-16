"use client"

import { useState } from "react"

import { Description } from "../../../ui/field"
import { Switch, SwitchField } from "../../../ui/switch"

export default function SwitchControlledDemo() {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <SwitchField isSelected={darkMode} onChange={setDarkMode} value="dark_mode" name="dark">
      <Switch>Dark mode</Switch>
      <Description>Dark mode is {darkMode ? "enabled" : "disabled"}.</Description>
    </SwitchField>
  )
}
