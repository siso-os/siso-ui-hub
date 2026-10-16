"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "../../../../shadcn/ui/button";
import { Calendar } from "../../../../shadcn/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../shadcn/ui/dialog";

const now = new Date();

const CalendarDialog = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(now.getFullYear(), now.getMonth(), 5),
    to: new Date(now.getFullYear(), now.getMonth(), 20),
  });

  return (
    <div className="flex items-center justify-center px-4">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Select Date Range</Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit!">
          <DialogHeader>
            <DialogTitle>Select Date Range</DialogTitle>
          </DialogHeader>
          <Calendar
            className="rounded-md border"
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
            selected={date}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarDialog;
