import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../shadcn/ui/card";

import { Badge } from "../../../../../shadcn/ui/badge";

const events = [
  {
    id: "1",
    title: "Mid-term Examinations",
    date: "Jun 20, 2026",
    time: "9:00 AM",
    type: "Exam",
    typeClass: "bg-destructive/10! text-destructive!",
  },
  {
    id: "2",
    title: "Science Fair",
    date: "Jun 25, 2026",
    time: "10:00 AM",
    type: "Event",
    typeClass: "bg-chart-2/10! text-chart-2!",
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    date: "Jun 28, 2026",
    time: "2:00 PM",
    type: "Meeting",
    typeClass: "bg-orange-600/10! text-orange-600!",
  },
  {
    id: "4",
    title: "Annual Sports Day",
    date: "Jul 5, 2026",
    time: "8:00 AM",
    type: "Event",
    typeClass: "bg-chart-2/10! text-chart-2!",
  },
  {
    id: "5",
    title: "Final Examinations",
    date: "Jul 15, 2026",
    time: "9:00 AM",
    type: "Exam",
    typeClass: "bg-destructive/10! text-destructive!",
  },
];

export default function UpcomingEvents() {
  return (
     <div className="w-full max-w-sm">
     <Card className="gap-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Calendar size={16} className="text-muted-foreground" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0!">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`flex items-start justify-between gap-3 px-5 py-4 ${
              index < events.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className="flex flex-col gap-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar size={11} />
                  {event.date}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock size={11} />
                  {event.time}
                </div>
              </div>
            </div>
            <Badge className={event.typeClass}>{event.type}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
    </div>
  );
}
