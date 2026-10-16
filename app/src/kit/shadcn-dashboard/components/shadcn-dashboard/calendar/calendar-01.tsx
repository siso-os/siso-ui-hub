"use client";

import { useState } from "react";
import { Calendar } from "../../../../shadcn/ui/calendar";

const now = new Date();

const selectedDates = [
  new Date(now.getFullYear(), now.getMonth(), 5),
  new Date(now.getFullYear(), now.getMonth(), 14),
  new Date(now.getFullYear(), now.getMonth(), 22),
];

const CalendarOne = () => {
  const [dates, setDates] = useState<Date[] | undefined>(selectedDates);

  return (
    <div className="flex items-center justify-center px-4">
      <Calendar
        className="rounded-md border"
        mode="multiple"
        onSelect={setDates}
        selected={dates}
      />
    </div>
  );
};

export default CalendarOne;
