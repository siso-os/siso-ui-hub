import { Badge } from '../../../ui/badge';

export default function LogoFirstCardLayout() {
  const workExperiences = [
    {
      company: 'Designcraft Studios',
      logo: 'https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'Senior UX Designer',
      duration: '2021 - Present',
      description:
        'Lead the design of digital products for enterprise clients, mentoring junior designers and implementing design systems.',
      skills: ['UI/UX Design', 'User Research', 'Design Systems'],
      link: '#',
    },
    {
      company: 'TechInnovate',
      logo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'Product Designer',
      duration: '2018 - 2021',
      description:
        'Created wireframes, prototypes, and final designs for mobile and web applications focusing on fintech solutions.',
      skills: ['Wireframing', 'Prototyping', 'Mobile Design'],
      link: '#',
    },
    {
      company: 'CreativeWorks Agency',
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'UI Designer',
      duration: '2016 - 2018',
      description:
        'Designed interfaces for various client websites and applications, collaborating with development teams to ensure quality implementation.',
      skills: ['Web Design', 'Visual Design', 'Brand Guidelines'],
      link: '#',
    },
    {
      company: 'Digital Solutions Inc.',
      logo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'Junior Designer',
      duration: '2014 - 2016',
      description:
        'Assisted senior designers with research, interface design, and creating visual assets for client projects.',
      skills: ['Graphic Design', 'Research', 'Collaboration'],
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Work Experience
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            A chronological overview of my professional journey, highlighting
            key roles and responsibilities.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workExperiences.map((experience, index) => (
            <a
              href={experience.link}
              key={index}
              className="bg-card group hover:border-primary flex h-full flex-col overflow-hidden rounded-xl border transition-all hover:shadow-md"
            >
              {/* Company Logo */}
              <div className="bg-muted/25 relative h-44 w-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-background relative h-20 w-20 overflow-hidden rounded-full p-1 shadow-sm">
                    <img
                      src={experience.logo}
                      alt={experience.company}
                      className="object-cover p-1"
                    />
                  </div>
                </div>
              </div>

              {/* Experience Details */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-1 text-xl font-bold">{experience.role}</h3>
                <p className="text-muted-foreground text-sm">
                  {experience.company}
                </p>
                <p className="text-muted-foreground mb-4 text-sm">
                  {experience.duration}
                </p>

                <p className="text-muted-foreground mb-4 flex-1 text-sm">
                  {experience.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2">
                  {experience.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
