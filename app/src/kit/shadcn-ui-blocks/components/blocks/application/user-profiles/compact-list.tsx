import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { Badge } from "../../../ui/badge";
import { MoreVertical, Mail, Shield, UserX, Edit } from "lucide-react";

const users = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Admin",
    status: "Active",
    avatar: "https://github.com/shadcn.png",
    lastActive: "2 hours ago",
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Editor",
    status: "Away",
    avatar: "https://github.com/shadcn.png",
    lastActive: "5 hours ago",
  },
  {
    name: "Carol Williams",
    email: "carol@example.com",
    role: "Viewer",
    status: "Offline",
    avatar: "https://github.com/shadcn.png",
    lastActive: "2 days ago",
  },
];

export default function CompactUserList() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 2xl:max-w-[1400px]">
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row">
        <h1 className="text-2xl font-semibold">Team Members</h1>
        <Button>Add Member</Button>
      </div>

      <Card className="p-0">
        <CardContent className="p-0">
          <div className="divide-y">
            {users.map((user, i) => (
              <div
                key={i}
                className="hover:bg-muted/50 flex flex-col items-start justify-between gap-4 p-4 sm:flex-row"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">{user.name}</h3>
                    <p className="text-muted-foreground truncate text-sm">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="ml-12 flex flex-wrap items-center gap-2 sm:ml-0 sm:gap-4">
                  <Badge
                    variant={
                      user.status === "Active"
                        ? "default"
                        : user.status === "Away"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {user.status}
                  </Badge>
                  <span className="text-muted-foreground hidden text-sm sm:inline">
                    {user.lastActive}
                  </span>
                  <Badge variant="outline">{user.role}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <MoreVertical className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Mail className="mr-2 size-4" /> Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 size-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 size-4" /> Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <UserX className="mr-2 size-4" /> Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
