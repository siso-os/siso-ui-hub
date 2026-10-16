
import { Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../shadcn/ui/card";
import { Badge } from "../../../../../shadcn/ui/badge";

const doctors = [
  { name: "Dr. Sarah Mitchell", avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-1.webp", specialty: "Cardiology",  patients: 148, rating: 4.9, status: "Available" },
  { name: "Dr. James Carter",   avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-2.webp", specialty: "Neurology",   patients: 132, rating: 4.8, status: "On Duty"   },
  { name: "Dr. Priya Sharma",   avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-3.webp", specialty: "Pediatrics",  patients: 121, rating: 4.9, status: "Available" },
  { name: "Dr. Robert Chen",    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-4.webp", specialty: "Orthopedics", patients: 115, rating: 4.7, status: "On Leave"  },
  { name: "Dr. Emily Walsh",    avatar: "https://images.shadcnspace.com/assets/shadcn-dashboard/profile/user-5.webp", specialty: "Oncology",    patients: 98,  rating: 4.8, status: "On Duty"   },
];

const statusClass: Record<string, string> = {
  Available: "bg-chart-2/10! text-chart-2!",
  "On Duty":  "bg-primary/10! text-primary!",
  "On Leave": "bg-orange-600/10! text-orange-600!",
};

export default function DoctorPerformance() {
  return (
    <div className="w-full max-w-md">
    <Card className="gap-0!">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Stethoscope size={16} className="text-muted-foreground" />
          Doctor Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0! pb-0!">
        <div className="flex flex-col">
          {doctors.map((doc) => (
            <div key={doc.name} className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-b-0">
              <img
                src={doc.avatar}
                alt={doc.name}
                width={32}
                height={32}
                className="rounded-full shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.specialty} · {doc.patients} patients</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge className={statusClass[doc.status]}>{doc.status}</Badge>
                <span className="text-xs text-muted-foreground">★ {doc.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
