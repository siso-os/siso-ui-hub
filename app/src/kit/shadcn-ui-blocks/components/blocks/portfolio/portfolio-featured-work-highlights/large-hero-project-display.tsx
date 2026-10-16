import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight } from 'lucide-react';

export default function LargeHeroProjectDisplay() {
  // Featured project data
  const featuredProject = {
    title: 'Eco-Friendly E-commerce Platform',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'A comprehensive redesign and development of an e-commerce platform focused on sustainable products. The project aimed to create an intuitive shopping experience while highlighting the environmental impact of each product.',
    summary:
      'Increased conversion rates by 32% and reduced cart abandonment by implementing a streamlined checkout process and improved product filtering. The new design system enhanced brand consistency across all touchpoints.',
    client: 'GreenLife Organics',
    role: 'Lead Designer & Frontend Developer',
    technologies: ['React', 'NextJS', 'TailwindCSS', 'Stripe', 'Sanity CMS'],
    year: '2023',
    link: '#',
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Project
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Highlighting my best work that demonstrates my skills, approach, and
            the results I deliver.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80 md:h-[500px]">
          <img
            src={featuredProject.image}
            alt={featuredProject.title}
            className="object-cover"
          />
          <div className="via-from-black/75 absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:max-w-[60%]">
            <p className="mb-2 text-sm font-medium text-white/80">
              Featured Work
            </p>
            <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              {featuredProject.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {featuredProject.technologies.slice(0, 3).map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  {tech}
                </Badge>
              ))}
              {featuredProject.technologies.length > 3 && (
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white hover:bg-white/30"
                >
                  +{featuredProject.technologies.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Left Column - Project Info */}
          <div className="space-y-6 md:col-span-1">
            <div>
              <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Client
              </h4>
              <p className="mt-1 text-lg font-medium">
                {featuredProject.client}
              </p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                My Role
              </h4>
              <p className="mt-1 text-lg font-medium">{featuredProject.role}</p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Year
              </h4>
              <p className="mt-1 text-lg font-medium">{featuredProject.year}</p>
            </div>

            <div>
              <h4 className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
                Technologies
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {featuredProject.technologies.map((tech, index) => (
                  <Badge key={index} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <Button asChild className="mt-4 w-full">
              <a href={featuredProject.link}>
                View Full Case Study <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Right Column - Case Study */}
          <div className="md:col-span-2">
            <h4 className="mb-6 text-xl font-semibold md:text-2xl">
              Project Overview
            </h4>
            <p className="text-muted-foreground mb-8 text-lg">
              {featuredProject.description}
            </p>

            <h4 className="mb-6 text-xl font-semibold md:text-2xl">
              Results & Impact
            </h4>
            <p className="text-muted-foreground text-lg">
              {featuredProject.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
