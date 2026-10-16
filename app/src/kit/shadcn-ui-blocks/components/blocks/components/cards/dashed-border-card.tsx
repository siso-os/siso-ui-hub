import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

export default function DashedBorderCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <div className="p-[1px] rounded-lg relative">
        <div className="absolute inset-0 rounded-lg border-2 border-dashed border-primary/50"></div>
        <Card>
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
