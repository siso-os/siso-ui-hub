import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Badge } from "../../../ui/badge";

export default function StatusCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Current deployment status</CardDescription>
          </div>
          <Badge variant="default" className="ml-2">
            Active
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Uptime</span>
              <span className="text-sm text-muted-foreground">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Last Deployed</span>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Environment</span>
              <span className="text-sm text-muted-foreground">Production</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">View Logs</Button>
          <Button>Manage</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
