import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import { cn } from '@/arc-shims/kit-utils';

// Sample project data with tech-related projects
const projects = [
  {
    id: 1,
    title: 'Advanced E-Commerce Platform',
    category: 'Full Stack Development',
    description:
      'A comprehensive e-commerce solution with real-time inventory management, advanced search functionality, and seamless payment processing. Built with performance and scalability in mind to handle high-traffic periods.',
    image:
      'https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'TailwindCSS'],
    link: '#',
  },
  {
    id: 2,
    title: 'Enterprise Dashboard System',
    category: 'Data Visualization',
    description:
      'Interactive analytics dashboard for enterprise clients that processes and visualizes complex datasets with customizable views, real-time updates, and automated reporting features.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React', 'D3.js', 'GraphQL', 'Node.js', 'AWS'],
    link: '#',
  },
  {
    id: 3,
    title: 'Multi-platform Mobile Application',
    category: 'Mobile Development',
    description:
      'Cross-platform mobile application for productivity enhancement, featuring offline capabilities, push notifications, and seamless cloud synchronization across devices.',
    image:
      'https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React Native', 'Firebase', 'Redux', 'Jest', 'TypeScript'],
    link: '#',
  },
  {
    id: 4,
    title: 'AI-Driven Content Management System',
    category: 'AI/ML Integration',
    description:
      'Content management platform powered by machine learning algorithms that automatically categorizes, tags, and optimizes content while providing smart recommendations based on user behavior.',
    image:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Python', 'TensorFlow', 'Django', 'PostgreSQL', 'Docker'],
    link: '#',
  },
  {
    id: 5,
    title: 'DevOps Workflow Automation',
    category: 'DevOps Engineering',
    description:
      'End-to-end CI/CD pipeline automation solution for cloud-native applications, featuring infrastructure as code, automated testing, and observability tooling integration.',
    image:
      'https://images.unsplash.com/photo-1607968565043-36af90dde238?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: [
      'Kubernetes',
      'Terraform',
      'GitHub Actions',
      'Prometheus',
      'Go',
    ],
    link: '#',
  },
];

export default function PortfolioZigzagLayout() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-16 text-center md:mb-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            A showcase of my technical projects highlighting various skills
            across full-stack development, mobile applications, and enterprise
            solutions.
          </p>
        </div>

        {/* Zigzag project layout */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                'group relative',
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
                'flex flex-col gap-8 lg:items-center lg:gap-12'
              )}
            >
              {/* Project image */}
              <div className="relative w-full overflow-hidden rounded-lg lg:w-1/2">
                <div className="border-muted/30 relative aspect-video overflow-hidden rounded-lg border">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="bg-black/60 text-white backdrop-blur-sm"
                  >
                    {project.category}
                  </Badge>
                </div>
              </div>

              {/* Project content */}
              <Card className="w-full border-none shadow-none lg:w-1/2">
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mt-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="space-y-3">
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-md"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="mt-2 gap-2" asChild>
                    <a href={project.link}>
                      View Project Details
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
