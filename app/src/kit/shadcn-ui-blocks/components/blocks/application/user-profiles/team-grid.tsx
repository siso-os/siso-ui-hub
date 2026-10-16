import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Mail, MoreVertical, Shield } from "lucide-react";

const team = [
  {
    name: "Alex Thompson",
    role: "Engineering Lead",
    department: "Engineering",
    avatar: "https://github.com/shadcn.png",
    status: "Active",
  },
  {
    name: "Sarah Chen",
    role: "Product Manager",
    department: "Product",
    avatar: "https://github.com/shadcn.png",
    status: "In a meeting",
  },
  {
    name: "Michael Park",
    role: "UI Designer",
    department: "Design",
    avatar: "https://github.com/shadcn.png",
    status: "Away",
  },
  {
    name: "Lisa Brown",
    role: "Backend Developer",
    department: "Engineering",
    avatar: "https://github.com/shadcn.png",
    status: "Active",
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    department: "Analytics",
    avatar: "https://github.com/shadcn.png",
    status: "Do not disturb",
  },
  {
    name: "Emma Wilson",
    role: "Content Strategist",
    department: "Marketing",
    avatar: "https://github.com/shadcn.png",
    status: "Active",
  },
];

export default function TeamGrid() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 2xl:max-w-[1400px]">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row">
        <div>
          <h1 className="text-2xl font-semibold">Team</h1>
          <p className="text-muted-foreground text-sm">
            Manage your team members and their roles
          </p>
        </div>
        <Button>Add Member</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <Card key={member.name} className="p-0">
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {member.department}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Mail className="mr-2 size-4" />
                      Message
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Shield className="mr-2 size-4" />
                      Permissions
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div
                  className={`size-2 rounded-full ${
                    member.status === "Active"
                      ? "bg-green-500"
                      : member.status === "Away"
                        ? "bg-yellow-500"
                        : "bg-gray-500"
                  }`}
                />
                <span className="text-muted-foreground text-sm">
                  {member.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
