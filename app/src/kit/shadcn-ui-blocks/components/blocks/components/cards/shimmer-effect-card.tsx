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
    @keyframes shimmer {
        0%,
        100% {
            transform: translateX(-100%);
        }
        50% {
            transform: translateX(100%);
        }
    }

    .animate-shimmer {
        animation: shimmer 2.5s infinite;
    }
*/
}

export default function ShimmerEffectCard() {
  return (
    <div className="max-w-md mx-auto py-6 px-4">
      <Card className="relative overflow-hidden">
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[100%] z-5 animate-shimmer bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
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
