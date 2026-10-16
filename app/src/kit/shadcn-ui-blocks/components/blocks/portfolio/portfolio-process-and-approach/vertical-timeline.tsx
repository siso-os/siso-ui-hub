import { ArrowRightIcon } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

const timelineSteps = [
  {
    id: 1,
    name: 'Research',
    description:
      'I begin by deeply understanding your goals, target audience, and competition to establish a solid foundation.',
    icon: '🔍',
    date: 'Week 1-2',
  },
  {
    id: 2,
    name: 'Ideation',
    description:
      'With research insights in hand, I develop concepts and strategies that align with your objectives.',
    icon: '💡',
    date: 'Week 3',
  },
  {
    id: 3,
    name: 'Design',
    description:
      'I create wireframes and visual mockups, iterating based on your feedback until we achieve the perfect design.',
    icon: '🎨',
    date: 'Week 4-5',
  },
  {
    id: 4,
    name: 'Development',
    description:
      'I bring the designs to life using modern, efficient code and best development practices.',
    icon: '👨‍💻',
    date: 'Week 6-8',
  },
  {
    id: 5,
    name: 'Launch',
    description:
      'After thorough testing and refinement, we deploy your project and ensure everything runs smoothly.',
    icon: '🚀',
    date: 'Week 9',
  },
];

export default function VerticalTimeline() {
  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="px-3 py-1" variant="outline">
              My Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              My Project Timeline
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A structured approach that ensures your project moves from concept
              to completion smoothly and efficiently.
            </p>
          </div>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical line */}
          <div className="bg-border absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform" />

          <div className="space-y-12">
            {timelineSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Timeline node */}
                <div className="bg-primary text-primary-foreground absolute left-1/2 z-10 -mt-3 flex h-10 w-10 -translate-x-1/2 transform items-center justify-center rounded-full">
                  <span>{step.icon}</span>
                </div>

                {/* Content card - alternating left/right */}
                <div
                  className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'} md:w-1/2 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}
                >
                  <Card
                    className={`w-full max-w-md ${index % 2 === 0 ? 'mr-6' : 'ml-6'} md:mr-0`}
                  >
                    <CardContent className="p-6">
                      <div className="text-muted-foreground mb-2 text-sm font-medium">
                        {step.date}
                      </div>
                      <h3 className="mb-2 text-xl font-bold">{step.name}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild>
              <a href="#">Start Your Project</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#">
                View My Work
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
