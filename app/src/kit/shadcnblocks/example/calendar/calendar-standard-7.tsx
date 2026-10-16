"use client";

import { useState } from "react";

import { Calendar } from "../../../shadcn/ui/calendar";

export const title = "Calendar with Multiple Day Selection";

const now = new Date();

const selectedDates = [
  new Date(now.getFullYear(), now.getMonth(), 5),
  new Date(now.getFullYear(), now.getMonth(), 15),
  new Date(now.getFullYear(), now.getMonth(), 25),
];

const Example = () => {
  const [dates, setDates] = useState<Date[] | undefined>(selectedDates);

  return (
    <Calendar
      className="rounded-md border"
      mode="multiple"
      onSelect={setDates}
      selected={dates}
    />
  );
};

export default Example;
