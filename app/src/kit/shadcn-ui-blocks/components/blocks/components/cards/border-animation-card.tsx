import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

// Add this to the global CSS file
{
  /*
    @keyframes border-flow {
        0%,
        100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-border-flow {
    background: linear-gradient(
      90deg,
      hsl(var(--primary) / 0.7) 0%,
      hsl(var(--primary) / 0.3) 25%,
      hsl(var(--primary) / 0.7) 50%,
      hsl(var(--primary) / 0.3) 75%,
      hsl(var(--primary) / 0.7) 100%
    );
    background-size: 200% 100%;
    animation: border-flow 3s linear infinite;
  }
*/
}

export default function BorderAnimationCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <div className="relative p-[1px] rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <div className="w-full h-full animate-border-flow" />
        </div>
        <Card className="relative rounded-[calc(theme(borderRadius.lg)-1px)]">
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
