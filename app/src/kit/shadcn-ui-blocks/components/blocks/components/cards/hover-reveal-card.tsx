import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

export default function HoverRevealCard() {
  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <Card className="group relative overflow-hidden">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Your new project will be created with the latest version of our
            framework, complete with authentication, database, and API routes.
          </p>
        </CardContent>

        {/* Overlay that slides in on hover */}
        <div className="bg-card absolute inset-0 flex translate-y-full flex-col p-6 transition-transform duration-300 group-hover:translate-y-0">
          <CardTitle className="mb-2">Ready to deploy?</CardTitle>
          <p className="text-muted-foreground mb-6 text-sm">
            Your project will be deployed to our secure cloud infrastructure
            with automatic scaling and backups.
          </p>
          <div className="mt-auto flex justify-center">
            <Button className="w-full">Deploy Now</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
