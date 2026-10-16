import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight, Calendar, Users, Globe } from 'lucide-react';

export default function SplitImageAndDetailsLayout() {
  // Featured project data
  const featuredProject = {
    title: 'Financial Dashboard App',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Designed and developed a comprehensive financial dashboard application that helps users track investments, analyze spending patterns, and set financial goals. The project focused on data visualization and intuitive UX to make complex financial data accessible.',
    client: 'InvestTrack Inc.',
    role: 'UX/UI Designer & Frontend Developer',
    technologies: [
      'React',
      'D3.js',
      'TypeScript',
      'Styled Components',
      'Firebase',
    ],
    timeline: '4 months',
    year: '2023',
    link: '#',
  };

  // Second featured project (for demonstration)
  const secondProject = {
    title: 'Healthcare Patient Portal',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Created a patient-centered healthcare portal that simplifies appointment scheduling, medical record access, and communication with healthcare providers. The design prioritizes accessibility and ease of use for users of all ages and abilities.',
    client: 'MediCare Health Network',
    role: 'Lead Designer',
    technologies: ['Figma', 'Vue.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    timeline: '6 months',
    year: '2022',
    link: '#',
  };

  const projects = [featuredProject, secondProject];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Featured Work
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Highlighting selected projects that showcase my expertise and
            creative problem-solving approach.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`grid gap-8 lg:grid-cols-2 lg:gap-12 ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="flex flex-col justify-center">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-6">
                  {project.description}
                </p>

                {/* Project Metadata */}
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="flex items-center gap-2">
                    <Globe className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">
                      <span className="text-muted-foreground">Client: </span>
                      <span className="font-medium">{project.client}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">
                      <span className="text-muted-foreground">Role: </span>
                      <span className="font-medium">{project.role}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm">
                      <span className="text-muted-foreground">Year: </span>
                      <span className="font-medium">{project.year}</span>
                    </span>
                  </div>
                </div>

                <Button asChild className="mt-2 w-fit">
                  <a href={project.link}>
                    View Project <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
