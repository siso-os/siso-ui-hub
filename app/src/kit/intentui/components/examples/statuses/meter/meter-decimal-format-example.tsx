"use client"

import { Label } from "../../../ui/field"
import { Meter, MeterHeader, MeterTrack, MeterValue } from "../../../ui/meter"

export default function MeterDecimalFormatDemo() {
  return (
    <Meter
      formatOptions={{
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
      value={75.25}
    >
      <MeterHeader>
        <Label>Progress</Label>
        <MeterValue />
      </MeterHeader>
      <MeterTrack />
    </Meter>
  )
}
