import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

export default function CornerRibbonCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card className="relative overflow-hidden">
        {/* Corner ribbon */}
        <div className="absolute top-0 right-0 z-10 overflow-hidden w-24 h-24 -mt-3 -mr-3">
          <div className="absolute top-0 right-0 w-32 transform rotate-45 translate-y-8 bg-primary text-primary-foreground font-medium py-1 text-center text-xs">
            New Feature
          </div>
        </div>

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
  );
}
