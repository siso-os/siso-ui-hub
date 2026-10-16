import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import { ExternalLink } from 'lucide-react';

export default function CardWithProjectShowcase() {
  const workExperiences = [
    {
      role: 'Lead Frontend Developer',
      company: 'Webflow Solutions',
      duration: '2021 - Present',
      description:
        'Managed a team of developers building responsive and accessible web applications for enterprise clients.',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      projects: [
        {
          title: 'Healthcare Portal Redesign',
          image:
            'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
          description:
            'Led the complete overhaul of a healthcare provider&apos;s patient portal, improving accessibility and mobile experience.',
          link: '#',
        },
        {
          title: 'E-commerce Platform',
          image:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3',
          description:
            'Built a custom shopping experience with personalized recommendations and seamless checkout flow.',
          link: '#',
        },
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Craftsmen',
      duration: '2018 - 2021',
      description:
        'Developed user interfaces for web applications with a focus on performance and responsive design.',
      technologies: ['JavaScript', 'Vue.js', 'SCSS', 'Webpack'],
      projects: [
        {
          title: 'Banking Dashboard',
          image:
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
          description:
            'Created an intuitive dashboard for tracking personal finances and investment portfolios.',
          link: '#',
        },
        {
          title: 'Real Estate Listings',
          image:
            'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3',
          description:
            'Built a property search platform with advanced filtering and interactive map features.',
          link: '#',
        },
      ],
    },
    {
      role: 'Web Developer',
      company: 'Creative Tech Labs',
      duration: '2016 - 2018',
      description:
        'Worked on building responsive websites and interactive features for marketing campaigns.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP'],
      projects: [
        {
          title: 'Corporate Website Redesign',
          image:
            'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
          description:
            'Redesigned and implemented a modern website for a financial services company.',
          link: '#',
        },
        {
          title: 'Interactive Product Showcase',
          image:
            'https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3',
          description:
            'Created an interactive 3D product visualization tool for a hardware manufacturer.',
          link: '#',
        },
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Work Experience & Projects
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Explore my professional experience and key projects I&apos;ve
            contributed to in each role.
          </p>
        </div>

        <div className="space-y-10">
          {workExperiences.map((experience, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="bg-muted/50 p-6 md:p-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-2xl font-bold">{experience.role}</h3>
                      <div className="text-muted-foreground my-1 flex items-center gap-2">
                        <span className="font-medium">
                          {experience.company}
                        </span>
                        <span>•</span>
                        <span>{experience.duration}</span>
                      </div>
                      <p className="text-muted-foreground mt-2 max-w-3xl">
                        {experience.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="mb-4 font-semibold">Key Projects</h4>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {experience.projects.map((project, projectIndex) => (
                      <div
                        key={projectIndex}
                        className="group overflow-hidden rounded-lg border"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4">
                          <h5 className="font-bold">{project.title}</h5>
                          <p className="text-muted-foreground mt-1 text-sm">
                            {project.description}
                          </p>
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="mt-2 px-0"
                          >
                            <a
                              href={project.link}
                              className="flex items-center"
                            >
                              View Project
                              <ExternalLink className="ml-1 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
