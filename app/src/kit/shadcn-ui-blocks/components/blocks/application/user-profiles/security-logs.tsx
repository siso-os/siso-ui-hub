import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  AlertTriangle,
  Download,
  Filter,
  Key,
  LogIn,
  Settings,
  Shield,
  Smartphone,
} from "lucide-react";

const activityLogs = [
  {
    type: "login",
    event: "Successful login",
    details: "via iPhone 12 - San Francisco, CA",
    timestamp: "2 minutes ago",
    ip: "192.168.1.1",
    icon: LogIn,
    severity: "info",
  },
  {
    type: "security",
    event: "Two-factor authentication enabled",
    details: "SMS verification added",
    timestamp: "1 hour ago",
    ip: "192.168.1.1",
    icon: Shield,
    severity: "success",
  },
  {
    type: "access",
    event: "API key generated",
    details: "Production API key created",
    timestamp: "3 hours ago",
    ip: "192.168.1.1",
    icon: Key,
    severity: "warning",
  },
  {
    type: "security",
    event: "Failed login attempt",
    details: "3 attempts from unknown device",
    timestamp: "1 day ago",
    ip: "192.168.1.2",
    icon: AlertTriangle,
    severity: "destructive",
  },
];

export default function SecurityLogs() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-2xl font-semibold">Security & Audit Logs</h1>
            <p className="text-muted-foreground text-sm">
              Review your account activity and security events
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Filter className="mr-2 size-4" />
              Filter Logs
            </Button>
            <Button variant="outline">
              <Download className="mr-2 size-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Active Sessions */}
        <Card className="mb-8 p-0">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <h2 className="text-lg font-semibold">Active Sessions</h2>
                <p className="text-muted-foreground text-sm">
                  Devices currently signed in to your account
                </p>
              </div>
              <Button variant="outline">
                <Shield className="mr-2 size-4" />
                Manage Devices
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  device: "MacBook Pro - Chrome",
                  location: "San Francisco, CA",
                  lastActive: "Active now",
                  isCurrent: true,
                },
                {
                  device: "iPhone 12 - Mobile App",
                  location: "San Francisco, CA",
                  lastActive: "5 minutes ago",
                  isCurrent: false,
                },
              ].map((session) => (
                <div
                  key={session.device}
                  className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-md p-2">
                      <Smartphone className="text-muted-foreground size-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{session.device}</p>
                        {session.isCurrent && (
                          <Badge variant="secondary">Current Device</Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                  </div>
                  {!session.isCurrent && (
                    <Button variant="destructive" size="sm">
                      Sign Out
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="p-0">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
              <h2 className="text-lg font-semibold">Activity Log</h2>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Activities</SelectItem>
                  <SelectItem value="login">Login Activity</SelectItem>
                  <SelectItem value="security">Security Events</SelectItem>
                  <SelectItem value="access">Access Changes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {activityLogs.map((log, i) => {
                const Icon = log.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-md p-2 ${
                          log.severity === "destructive"
                            ? "bg-destructive/10 text-destructive"
                            : log.severity === "warning"
                              ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400"
                              : log.severity === "success"
                                ? "bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div>
                        <p className="font-medium">{log.event}</p>
                        <p className="text-muted-foreground text-sm">
                          {log.details}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-muted-foreground text-xs">
                            {log.timestamp}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            IP: {log.ip}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="size-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
