import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight } from 'lucide-react';

export default function StackedHighlightCards() {
  const projects = [
    {
      title: 'Brand Identity for Tech Startup',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Created a complete brand identity system for an AI-driven tech startup, including logo design, color palette, typography, and usage guidelines.',
      client: 'Nexus AI',
      role: 'Brand Designer',
      technologies: [
        'Adobe Illustrator',
        'Photoshop',
        'Figma',
        'Brand Strategy',
      ],
      year: '2023',
      link: '#',
    },
    {
      title: 'E-Learning Platform Redesign',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Completely redesigned the user experience for an online learning platform, focusing on improving navigation, content organization, and student engagement metrics.',
      client: 'EduConnect',
      role: 'UX Designer & Researcher',
      technologies: ['Figma', 'Maze', 'Miro', 'User Research', 'HTML/CSS'],
      year: '2022',
      link: '#',
    },
    {
      title: 'Mobile Banking Application',
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description:
        'Designed and developed a secure and intuitive mobile banking application that allows users to manage accounts, make payments, and track spending with advanced security features.',
      client: 'SecureBank Ltd.',
      role: 'Product Designer & Frontend Developer',
      technologies: [
        'React Native',
        'Redux',
        'Sketch',
        'UserTesting',
        'Biometric Auth',
      ],
      year: '2022',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            A selection of my most impactful work, demonstrating range and depth
            across industries.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-md"
            >
              <div className="grid md:grid-cols-3">
                {/* Project Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover"
                  />
                </div>

                {/* Project Details */}
                <div className="p-6 md:col-span-2 md:p-8">
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    {project.title}
                  </h3>

                  <div className="text-muted-foreground mb-4 flex flex-col flex-wrap gap-x-4 text-sm md:flex-row">
                    <span>{project.client}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{project.role}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{project.year}</span>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>

                  <Button asChild variant="outline" size="sm">
                    <a href={project.link}>
                      View Project <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
