import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { useState } from 'react';

export default function PerspectiveHoverCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div
        className="transition-all duration-300 ease-out"
        style={{
          transform: isHovered
            ? 'perspective(1000px) rotateX(10deg)'
            : 'perspective(1000px) rotateX(0deg)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="relative overflow-hidden">
          {/* Shadow effect */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              boxShadow: 'inset 0 20px 20px -20px rgba(0, 0, 0, 0.3)',
              opacity: isHovered ? 1 : 0,
            }}
          />

          <CardHeader>
            <CardTitle
              className="transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
              }}
            >
              Create project
            </CardTitle>
            <CardDescription
              className="transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p
              className="text-muted-foreground text-sm transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              Your new project will be created with the latest version of our
              framework, complete with authentication, database, and API routes.
            </p>
          </CardContent>
          <CardFooter
            className="flex justify-between transition-transform duration-300"
            style={{
              transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
            }}
          >
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
