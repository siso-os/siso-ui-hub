import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

export default function StackedCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <div className="relative">
        {/* Background cards for stacked effect */}
        <div className="absolute -bottom-2 -right-2 w-full h-full  rounded-lg border"></div>
        <div className="absolute -bottom-1 -right-1 w-full h-full  rounded-lg border"></div>

        {/* Main card */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your new project will be created with the latest version of our
              framework, complete with authentication, database, and API routes.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
