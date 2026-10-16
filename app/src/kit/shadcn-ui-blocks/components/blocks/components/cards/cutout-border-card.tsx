import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

export default function CutoutBorderCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <div className="relative p-2 rounded-lg bg-gradient-to-r from-primary/20 to-primary/30">
        <div className="absolute inset-0 rounded-lg bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,hsl(var(--primary)/0.1)_10px,hsl(var(--primary)/0.1)_20px)]"></div>
        <div className="absolute inset-[3px] bg-background rounded-md"></div>
        <Card className="relative bg-transparent border-none shadow-none">
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
