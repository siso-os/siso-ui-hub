import { useState } from 'react';

import {
  ArrowRightIcon,
  CheckIcon,
  Clock3Icon,
  ArrowUpRightIcon,
  ArrowLeftIcon,
} from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '../../../ui/carousel';

const steps = [
  {
    id: 1,
    name: 'Discovery',
    description: 'Exploring your vision and objectives',
    detail:
      'I dive deep into understanding your goals, target audience, and project requirements.',
    icon: '🔎',
    status: 'complete',
    image:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    benefits: [
      'Clear project scope',
      'Aligned expectations',
      'Strategic foundation',
    ],
  },
  {
    id: 2,
    name: 'Strategy',
    description: 'Mapping the path to success',
    detail:
      'Creating a comprehensive plan with timelines, deliverables, and technical approach.',
    icon: '📝',
    status: 'complete',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    benefits: ['Detailed roadmap', 'Risk mitigation', 'Resource optimization'],
  },
  {
    id: 3,
    name: 'Design',
    description: 'Bringing ideas to visual life',
    detail:
      'Crafting intuitive interfaces and engaging experiences that delight users.',
    icon: '🎨',
    status: 'current',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    benefits: [
      'User-centered approach',
      'Brand consistency',
      'Iterative refinement',
    ],
  },
  {
    id: 4,
    name: 'Development',
    description: 'Building with precision and quality',
    detail:
      'Transforming designs into functional solutions with clean, maintainable code.',
    icon: '💻',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    benefits: [
      'Modern technologies',
      'Performance optimization',
      'Quality assurance',
    ],
  },
  {
    id: 5,
    name: 'Launch',
    description: 'Delivering excellence to the world',
    detail:
      'Deploying your project and ensuring a smooth transition to production.',
    icon: '🚀',
    status: 'upcoming',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    benefits: ['Smooth deployment', 'Post-launch support', 'Analytics setup'],
  },
];

export default function HorizontalStepper() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Handle carousel API
  const onApiChange = (newApi: CarouselApi) => {
    setApi(newApi);

    if (newApi) {
      // Update scroll button states
      const handleSelect = () => {
        setCanScrollPrev(newApi.canScrollPrev());
        setCanScrollNext(newApi.canScrollNext());
      };

      newApi.on('select', handleSelect);
      // Initialize states
      handleSelect();
    }
  };

  return (
    <section className="from-background via-background/90 to-background w-full bg-gradient-to-b py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="bg-primary/10 text-primary mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-primary relative inline-flex h-2 w-2 rounded-full"></span>
            </span>
            My Process
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            The Journey to <span className="text-primary">Excellence</span>
          </h2>

          <p className="text-muted-foreground max-w-[800px] text-lg">
            Every successful project follows a proven path from concept to
            completion.
          </p>
        </div>

        <div className="relative">
          <Carousel className="w-full lg:px-10" setApi={onApiChange}>
            <CarouselContent>
              {steps.map((step) => (
                <CarouselItem
                  key={step.id}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative flex h-full flex-col">
                    {/* Step Number and Status */}
                    <div className="relative z-10 mb-6 flex justify-center">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full ${
                          step.status === 'complete'
                            ? 'bg-primary text-primary-foreground'
                            : step.status === 'current'
                              ? 'bg-primary/20 border-primary text-primary border-2'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {step.status === 'complete' ? (
                          <CheckIcon className="h-6 w-6" />
                        ) : step.status === 'current' ? (
                          <Clock3Icon className="h-6 w-6" />
                        ) : (
                          <span className="text-lg font-semibold">
                            {step.id}
                          </span>
                        )}
                      </div>
                    </div>

                    <div
                      className={`relative flex-1 overflow-hidden rounded-xl border p-6 transition-all duration-200 ${
                        step.status === 'current'
                          ? 'border-primary shadow-lg'
                          : ''
                      }`}
                    >
                      {/* Background gradient overlay */}
                      <div className="from-background/80 to-background absolute inset-0 z-0 bg-gradient-to-b"></div>

                      {/* Background image */}
                      <div className="absolute inset-0 -z-10 opacity-60 dark:opacity-30">
                        <img
                          src={step.image}
                          alt={step.name}
                          className="object-cover"
                        />
                      </div>

                      <div className="relative z-10">
                        <div className="mb-3 flex items-center gap-3">
                          <span className="text-xl">{step.icon}</span>
                          <h3 className="text-xl font-semibold">{step.name}</h3>
                        </div>

                        <p className="mb-4 text-lg">{step.description}</p>
                        <p className="text-muted-foreground mb-6">
                          {step.detail}
                        </p>

                        <div className="">
                          <h4 className="mb-3 font-medium">Key Benefits</h4>
                          <ul className="space-y-2">
                            {step.benefits.map((benefit, index) => (
                              <li
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <ArrowRightIcon className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Hide default positioned nav buttons on small screens, show on medium+ */}
            <CarouselPrevious className="mt-10 ml-10 hidden lg:flex" />
            <CarouselNext className="mt-10 mr-10 hidden lg:flex" />
          </Carousel>

          {/* Mobile nav buttons - shown below carousel on small screens, hidden on medium+ */}
          <div className="mt-6 flex justify-center gap-4 lg:hidden">
            <Button
              variant="outline"
              size="icon"
              className="border-primary/30 hover:bg-primary/5 hover:border-primary h-10 w-10 rounded-full"
              disabled={!canScrollPrev}
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only">Previous slide</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-primary/30 hover:bg-primary/5 hover:border-primary h-10 w-10 rounded-full"
              disabled={!canScrollNext}
              onClick={() => api?.scrollNext()}
            >
              <ArrowRightIcon className="h-4 w-4" />
              <span className="sr-only">Next slide</span>
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="bg-muted/50 max-w-3xl rounded-lg p-6">
            <h3 className="mb-3 text-xl font-semibold">
              Ready to start your journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let&apos;s discuss how my process can be tailored to your unique
              project needs and goals.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className="gap-2" asChild>
                <a href="#">
                  Start a Project
                  <ArrowUpRightIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View Case Studies</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
