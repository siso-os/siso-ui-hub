"use client"

import { Description, Label } from "../../../ui/field"
import { Meter, MeterHeader, MeterTrack, MeterValue } from "../../../ui/meter"

export default function MeterCurrencyFormatDemo() {
  return (
    <Meter formatOptions={{ style: "currency", currency: "USD" }} value={15}>
      <MeterHeader>
        <Label>Revenue</Label>
        <MeterValue />
      </MeterHeader>
      <MeterTrack />
      <Description>Current revenue</Description>
    </Meter>
  )
}
