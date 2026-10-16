import { ArrowRightIcon } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

const cycleSteps = [
  {
    id: 1,
    name: 'Discover',
    description: 'Understanding the problem and gathering requirements',
    icon: '🔍',
    color: 'bg-blue-500/10 border-blue-500 text-blue-500',
  },
  {
    id: 2,
    name: 'Define',
    description: 'Clarifying goals and setting project parameters',
    icon: '📋',
    color: 'bg-purple-500/10 border-purple-500 text-purple-500',
  },
  {
    id: 3,
    name: 'Design',
    description: 'Creating solutions and planning implementation',
    icon: '🎨',
    color: 'bg-amber-500/10 border-amber-500 text-amber-500',
  },
  {
    id: 4,
    name: 'Develop',
    description: 'Building and implementing the solution',
    icon: '💻',
    color: 'bg-green-500/10 border-green-500 text-green-500',
  },
  {
    id: 5,
    name: 'Test',
    description: 'Validating functionality and fixing issues',
    icon: '🧪',
    color: 'bg-red-500/10 border-red-500 text-red-500',
  },
  {
    id: 6,
    name: 'Deploy',
    description: 'Launching and integrating the solution',
    icon: '🚀',
    color: 'bg-indigo-500/10 border-indigo-500 text-indigo-500',
  },
];

export default function CycleDiagram() {
  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="px-3 py-1" variant="outline">
              My Approach
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Iterative Process
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              I follow an agile, cyclical approach that allows for continuous
              improvement and adaptation throughout your project.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Mobile view - vertical cards */}
          <div className="space-y-4 md:hidden">
            {cycleSteps.map((step) => (
              <Card key={step.id} className={`border-2 ${step.color}`}>
                <CardContent className="flex items-center p-4">
                  <div className="mr-4 text-2xl">{step.icon}</div>
                  <div>
                    <h3 className="font-bold">{step.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop view - circular diagram */}
          <div className="hidden md:block">
            {/* Large circle in the center */}
            <div className="border-muted-foreground/20 relative mx-auto flex h-[500px] w-[500px] items-center justify-center rounded-full border-4 border-dashed">
              <div className="bg-primary/10 border-primary flex h-32 w-32 items-center justify-center rounded-full border-2">
                <div className="text-center">
                  <div className="mb-1 text-3xl">🔄</div>
                  <div className="text-sm font-bold">
                    Continuous
                    <br />
                    Improvement
                  </div>
                </div>
              </div>

              {/* Circular positioned nodes */}
              {cycleSteps.map((step, index) => {
                // Calculate position on the circle
                const angle =
                  (index * (360 / cycleSteps.length) * Math.PI) / 180;
                const radius = 237.5; // Distance from center
                const left = Math.cos(angle) * radius + 250 - 60; // 250 is half of container, 60 is half of node width
                const top = Math.sin(angle) * radius + 250 - 60;

                return (
                  <div
                    key={step.id}
                    className={`absolute z-10 flex h-32 w-32 items-center justify-center rounded-full border-2`}
                    style={{ left: `${left}px`, top: `${top}px` }}
                  >
                    {/* Solid background circle to mask the dashed border */}
                    <div className="bg-background absolute inset-0 rounded-full"></div>
                    {/* Colored background with proper z-index */}
                    <div
                      className={`absolute inset-0 ${step.color} z-[1] rounded-full`}
                    ></div>
                    <div className="relative z-[2] p-2 text-center">
                      <div className="mb-1 text-2xl">{step.icon}</div>
                      <div className="text-sm font-bold">{step.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild>
              <a href="#">Start a Project</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#">
                Learn More
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
