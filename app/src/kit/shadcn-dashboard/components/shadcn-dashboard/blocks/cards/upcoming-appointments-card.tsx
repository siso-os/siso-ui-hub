
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../shadcn/ui/card";
import { Badge } from "../../../../../shadcn/ui/badge";

const appointments = [
  { patient: "Marcus Lee",    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-1.webp", doctor: "Dr. Sarah Mitchell", time: "09:00 AM", type: "Consultation", linecolor: "bg-primary",    color: "bg-primary/10! text-primary!"         },
  { patient: "Nina Patel",    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp", doctor: "Dr. James Carter",   time: "10:30 AM", type: "Follow-up",    linecolor: "bg-chart-2",    color: "bg-chart-2/10! text-chart-2!"         },
  { patient: "Oscar Davis",   avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-3.webp", doctor: "Dr. Priya Sharma",   time: "11:15 AM", type: "Check-up",     linecolor: "bg-primary",    color: "bg-primary/10! text-primary!"         },
  { patient: "Laura Hughes",  avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-4.webp", doctor: "Dr. Emily Walsh",    time: "01:00 PM", type: "Consultation", linecolor: "bg-orange-500", color: "bg-orange-500/10! text-orange-500!"   },
  { patient: "Chris Evans",   avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-5.webp", doctor: "Dr. Robert Chen",    time: "02:30 PM", type: "Surgery Prep", linecolor: "bg-chart-2",    color: "bg-chart-2/10! text-chart-2!"         },
  { patient: "Amy Turner",    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-6.webp", doctor: "Dr. Sarah Mitchell", time: "04:00 PM", type: "Follow-up",    linecolor: "bg-primary",    color: "bg-primary/10! text-primary!"         },
  { patient: "Mark Deshmukh", avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-7.webp", doctor: "Dr. Sarah Mitchell", time: "04:00 PM", type: "Follow-up",    linecolor: "bg-primary",    color: "bg-primary/10! text-primary!"         },
];

export default function UpcomingAppointments() {
  return (
    <div className="w-full max-w-sm" >
    <Card className="gap-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <CalendarDays size={16} className="text-muted-foreground" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0!">
        <div className="flex flex-col">
          {appointments.map((appt, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b border-border last:border-b-0">
              <div className={`w-1 h-10 rounded-full shrink-0 ${appt.linecolor}`} />
              <img
                src={appt.avatar}
                alt={appt.patient}
                width={32}
                height={32}
                className="rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{appt.patient}</p>
                <p className="text-xs text-muted-foreground truncate">{appt.doctor}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-medium text-foreground">{appt.time}</span>
                <Badge className={`${appt.color} text-xs px-1.5 py-0`}>{appt.type}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
