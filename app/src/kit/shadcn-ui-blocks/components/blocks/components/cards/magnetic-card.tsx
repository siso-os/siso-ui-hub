import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { useState, useRef } from 'react';

export default function MagneticCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Limit the movement range
    const maxMove = 15;
    const limitedX = Math.max(Math.min(x, maxMove), -maxMove);
    const limitedY = Math.max(Math.min(y, maxMove), -maxMove);

    setPosition({ x: limitedX, y: limitedY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-6">
      <div
        ref={cardRef}
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${position.x * 0.1}px, ${position.y * 0.1}px)`,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Card>
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
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              style={{
                transform: isHovered
                  ? `translate(${position.x * 0.2}px, ${position.y * 0.2}px)`
                  : 'none',
                transition: 'transform 0.2s ease-out',
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                transform: isHovered
                  ? `translate(${position.x * 0.2}px, ${position.y * 0.2}px)`
                  : 'none',
                transition: 'transform 0.2s ease-out',
              }}
            >
              Deploy
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
