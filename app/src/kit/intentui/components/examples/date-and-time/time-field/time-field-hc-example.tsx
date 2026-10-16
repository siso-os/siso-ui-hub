"use client"

import { Time } from "@internationalized/date"
import { useState } from "react"
import { DateInput } from "../../../ui/date-field"
import { Label } from "../../../ui/field"
import { Switch, SwitchField } from "../../../ui/switch"
import { TimeField } from "../../../ui/time-field"

export default function TimeFieldHcDemo() {
  const [hc, setHc] = useState<12 | 24>(24)
  const [value, setValue] = useState(new Time(13, 45))
  return (
    <div className="flex flex-col gap-y-6">
      <SwitchField
        isSelected={hc === 24}
        onChange={() => setHc((prevHc) => (prevHc === 24 ? 12 : 24))}
      >
        <Switch>{hc} hour</Switch>
      </SwitchField>
      <TimeField value={value} onChange={(newValue) => setValue(newValue!)} hourCycle={hc}>
        <Label>Event time</Label>
        <DateInput />
      </TimeField>
    </div>
  )
}
