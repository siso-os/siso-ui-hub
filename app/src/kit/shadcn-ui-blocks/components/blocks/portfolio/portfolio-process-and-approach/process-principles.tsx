import { ArrowRightIcon, CheckIcon, ExternalLinkIcon } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { cn } from '@/arc-shims/kit-utils';
import { useState } from 'react';

const principles = [
  {
    id: 1,
    title: 'User-Centered',
    icon: '👥',
    description:
      'Every decision is made with the end user in mind, ensuring intuitive and accessible experiences.',
    benefits: [
      'User research informs design decisions',
      'Focus on usability and accessibility',
      'Continuous user testing and feedback',
    ],
    image:
      'https://images.unsplash.com/photo-1525130413817-d45c1d127c42?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: 'Collaborative',
    icon: '🤝',
    description:
      'I work closely with clients, involving them at every stage to ensure the solution meets their needs.',
    benefits: [
      'Regular client check-ins and updates',
      'Transparent communication',
      'Shared decision-making process',
    ],
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: 'Innovative',
    icon: '💡',
    description:
      'I embrace new technologies and approaches, pushing boundaries to create cutting-edge solutions.',
    benefits: [
      'Exploration of emerging technologies',
      'Creative problem-solving',
      'Forward-thinking implementation',
    ],
    image:
      'https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: 'Adaptable',
    icon: '🔄',
    description:
      'Flexibility is key to my process, allowing for course corrections and improvements along the way.',
    benefits: [
      'Agile workflow and methodology',
      'Responsive to changing requirements',
      'Iterative development approach',
    ],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Data-Driven',
    icon: '📊',
    description:
      'I make decisions based on research, analytics, and testing, not just assumptions or trends.',
    benefits: [
      'Analytics-informed strategy',
      'A/B testing for optimization',
      'Research-backed choices',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    title: 'Detail-Oriented',
    icon: '🔍',
    description:
      'I pay careful attention to every aspect of a project, ensuring nothing falls through the cracks.',
    benefits: [
      'Comprehensive quality assurance',
      'Meticulous code and design review',
      'Fine-tuning of all elements',
    ],
    image:
      'https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function ProcessPrinciples() {
  const [activePrinciple, setActivePrinciple] = useState(principles[0]!.id);

  return (
    <section className="from-background via-background/95 to-background/90 w-full bg-gradient-to-b py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <Badge className="bg-primary/10 hover:bg-primary/20 text-primary px-4 py-1.5 text-sm font-medium">
            My Approach
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Guiding <span className="text-primary">Principles</span>
          </h2>
          <p className="text-muted-foreground max-w-[800px] text-base md:text-lg">
            These fundamental values form the foundation of my work process,
            ensuring exceptional results for every project.
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Left side: Principles navigation */}
          <div className="order-2 flex flex-col space-y-2 lg:order-1 lg:col-span-4">
            {principles.map((principle) => (
              <div
                key={principle.id}
                className={cn(
                  'relative flex cursor-pointer items-center gap-3 rounded-lg p-4 transition-all duration-200',
                  activePrinciple === principle.id
                    ? 'bg-primary/10 text-primary border-primary/20 border shadow-sm'
                    : 'hover:bg-muted'
                )}
                onClick={() => setActivePrinciple(principle.id)}
              >
                <div
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg',
                    activePrinciple === principle.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted-foreground/10 text-foreground'
                  )}
                >
                  {principle.icon}
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-base font-medium">{principle.title}</h3>
                  <p className="text-muted-foreground line-clamp-1 text-sm">
                    {principle.description}
                  </p>
                </div>
                {activePrinciple === principle.id && (
                  <div className="bg-primary absolute top-1/2 -right-1 h-2 w-2 -translate-y-1/2 transform rounded-full lg:hidden"></div>
                )}
                {activePrinciple === principle.id && (
                  <div className="bg-primary absolute top-1/2 -right-4 hidden h-4 w-4 -translate-y-1/2 rotate-45 transform lg:block"></div>
                )}
              </div>
            ))}
          </div>

          {/* Right side: active principle details */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            {principles.map(
              (principle) =>
                principle.id === activePrinciple && (
                  <div
                    key={principle.id}
                    className="bg-card overflow-hidden rounded-xl border shadow-lg"
                  >
                    <div className="relative h-64 md:h-80">
                      <img
                        src={principle.image}
                        alt={principle.title}
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 w-full p-6">
                        <div className="mb-2 flex items-center gap-3">
                          <div className="bg-primary/90 text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full text-xl">
                            {principle.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white">
                            {principle.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="mb-4 grid w-full grid-cols-2">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="benefits">Benefits</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                          <p className="text-base">{principle.description}</p>
                          <div className="pt-2">
                            <Button
                              variant="outline"
                              className="group gap-2"
                              asChild
                            >
                              <a href="#">
                                Learn more about my approach
                                <ExternalLinkIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </a>
                            </Button>
                          </div>
                        </TabsContent>
                        <TabsContent value="benefits" className="space-y-2">
                          <ul className="space-y-2">
                            {principle.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckIcon className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>

        <div className="bg-muted/50 relative mt-16 overflow-hidden rounded-xl border p-8">
          <div className="absolute inset-0 -z-10 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Workspace"
              className="object-cover object-center"
            />
          </div>

          <div className="grid items-center gap-6 md:grid-cols-5">
            <div className="z-10 md:col-span-3">
              <Badge variant="secondary" className="mb-2">
                Ready to start?
              </Badge>
              <h3 className="mb-3 text-2xl font-bold">
                Experience these principles in action
              </h3>
              <p className="text-muted-foreground mb-6">
                Let&apos;s collaborate to bring your vision to life with these
                core values guiding every step of the process.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <a href="#">
                    Start a Project
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <a href="#">View Case Studies</a>
                </Button>
              </div>
            </div>
            <div className="hidden overflow-hidden rounded-lg md:col-span-2 md:block">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Workspace"
                width={500}
                height={300}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
