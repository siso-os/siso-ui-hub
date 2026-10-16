import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../ui/carousel';

// Sample project data
const projects = [
  {
    id: 1,
    title: 'E-commerce Website Redesign',
    description:
      'Transformed an outdated online store into a modern, user-friendly shopping experience with improved navigation and mobile responsiveness.',
    before: {
      image:
        'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?q=80&w=2080&auto=format&fit=crop',
      caption: 'Cluttered layout with poor mobile experience',
    },
    after: {
      image:
        'https://images.unsplash.com/photo-1621768216002-5ac171876625?q=80&w=2069&auto=format&fit=crop',
      caption: 'Clean, responsive design with intuitive navigation',
    },
    impact:
      'Conversion rate increased by 45% and mobile bounce rate decreased by 30%',
  },
  {
    id: 2,
    title: 'Brand Identity Refresh',
    description:
      'Revitalized a dated brand identity with modern typography, color palette, and visual elements while maintaining brand recognition.',
    before: {
      image:
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
      caption: 'Dated brand identity lacking consistency',
    },
    after: {
      image:
        'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070&auto=format&fit=crop',
      caption: 'Cohesive, modern identity system with consistent elements',
    },
    impact: 'Brand recognition improved by 60% in customer surveys',
  },
  {
    id: 3,
    title: 'App User Experience Optimization',
    description:
      'Redesigned a complex workflow to reduce friction and improve task completion rates for a mobile application.',
    before: {
      image:
        'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?q=80&w=2076&auto=format&fit=crop',
      caption: 'Complex workflow requiring numerous steps',
    },
    after: {
      image:
        'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=2070&auto=format&fit=crop',
      caption: 'Streamlined interface with intuitive interactions',
    },
    impact:
      'Task completion time reduced by 40% and user satisfaction increased by 65%',
  },
];

export default function BeforeAfterComparison() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Transformations
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            The Impact of My Work
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            See the difference my expertise can make through these before and
            after project showcases
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Before/After Carousel */}
          <Carousel
            className="w-full"
            opts={{
              loop: true,
            }}
            setApi={(api) => {
              api?.on('select', () => {
                setActiveProject(api.selectedScrollSnap());
              });
            }}
          >
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id}>
                  <div className="p-1">
                    <div className="bg-card overflow-hidden rounded-xl border">
                      <div className="flex flex-col md:flex-row">
                        {/* Before */}
                        <div className="relative md:w-1/2">
                          <div className="absolute top-2 left-2 z-10">
                            <Badge variant="secondary">Before</Badge>
                          </div>
                          <div className="relative aspect-video">
                            <img
                              src={project.before.image}
                              alt={`${project.title} before`}
                              className="object-cover"
                            />
                          </div>
                          <div className="border-primary/10 bg-muted/50 p-2 text-center text-xs">
                            {project.before.caption}
                          </div>
                        </div>

                        {/* After */}
                        <div className="relative md:w-1/2">
                          <div className="absolute top-2 left-2 z-10">
                            <Badge>After</Badge>
                          </div>
                          <div className="relative aspect-video">
                            <img
                              src={project.after.image}
                              alt={`${project.title} after`}
                              className="object-cover"
                            />
                          </div>
                          <div className="border-primary/10 bg-muted/50 p-2 text-center text-xs">
                            {project.after.caption}
                          </div>
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="p-6">
                        <h3 className="mb-2 text-2xl font-semibold">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          {project.description}
                        </p>
                        <div className="bg-primary/10 mb-4 rounded-lg p-3">
                          <h4 className="mb-1 font-medium">
                            Measurable Impact:
                          </h4>
                          <p className="text-sm">{project.impact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-2">
              <CarouselPrevious className="relative inset-0 translate-y-0" />
              {projects.map((_, i) => (
                <Button
                  key={i}
                  variant={activeProject === i ? 'default' : 'outline'}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setActiveProject(i)}
                >
                  {i + 1}
                </Button>
              ))}
              <CarouselNext className="relative inset-0 translate-y-0" />
            </div>
          </Carousel>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>View all projects</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
