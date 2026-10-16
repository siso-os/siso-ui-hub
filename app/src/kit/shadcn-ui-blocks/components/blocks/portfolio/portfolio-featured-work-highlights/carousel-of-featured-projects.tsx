import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../ui/carousel';

export default function CarouselOfFeaturedProjects() {
  const projects = [
    {
      title: 'E-commerce Website Redesign',
      client: 'Fashion Boutique',
      year: '2023',
      category: 'Web Design',
      description:
        'Complete overhaul of an online fashion store, focusing on improved user experience, mobile responsiveness, and conversion optimization.',
      image:
        'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Mobile Banking App',
      client: 'Financial Services Inc.',
      year: '2022',
      category: 'App Development',
      description:
        'Streamlined banking application designed with security and ease of use at its core, featuring biometric authentication and personalized insights.',
      image:
        'https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Corporate Identity Refresh',
      client: 'Green Technologies',
      year: '2023',
      category: 'Branding',
      description:
        'Comprehensive brand refresh including logo redesign, typography system, color palette, and visual guidelines for a renewable energy company.',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Interactive Data Dashboard',
      client: 'Analytics Solutions',
      year: '2022',
      category: 'UI/UX Design',
      description:
        'Real-time analytics dashboard with customizable widgets, data visualization tools, and collaboration features for enterprise teams.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Educational Platform Redesign',
      client: 'Learning Hub',
      year: '2023',
      category: 'Web Application',
      description:
        'Learning management system with focus on accessibility, engagement, and personalized learning paths for students of all ages.',
      image:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
  ];

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Explore my most impactful work that demonstrates my skills,
            expertise, and creative approach.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Carousel
            opts={{
              loop: true,
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {projects.map((project, index) => (
                <CarouselItem key={index} className="md:basis-full">
                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Image */}
                    <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[400px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{project.category}</Badge>
                          <Badge variant="outline">{project.year}</Badge>
                        </div>

                        <h3 className="text-2xl font-bold md:text-3xl">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground text-sm font-medium">
                          Client: {project.client}
                        </p>

                        <p className="text-muted-foreground">
                          {project.description}
                        </p>

                        <div className="pt-4">
                          <Button asChild>
                            <a href={project.link}>View Case Study</a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-6 flex items-center justify-center gap-2">
              <CarouselPrevious className="static mr-2 translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
