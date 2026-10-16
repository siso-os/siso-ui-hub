"use client"

import { useState } from "react"
import { addDays, subDays } from "date-fns"

import { Calendar } from "../../shadcn/ui/calendar"
import { Card, CardContent } from "../../shadcn/ui/card"

export function Pattern() {
  const today = new Date()
  const [date, setDate] = useState<Date[] | undefined>([
    subDays(today, 17),
    addDays(today, 2),
    addDays(today, 6),
    addDays(today, 8),
  ])

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar mode="multiple" onSelect={setDate} selected={date} />
      </CardContent>
    </Card>
  )
}