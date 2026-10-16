import { ArrowRight, ArrowDown, ChevronRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';

// Sample case study data
const caseStudy = {
  title: 'E-Commerce Platform Redesign',
  client: 'RetailTech Inc.',
  summary:
    'A complete overhaul of an outdated e-commerce platform, focusing on improving user experience and increasing conversion rates.',
  heroImage:
    'https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=2070&auto=format&fit=crop',
  timeline: [
    {
      id: 1,
      date: 'January 2023',
      title: 'Research & Discovery',
      description:
        'Conducted extensive user research, including interviews, surveys, and usability testing to identify pain points in the existing platform.',
      achievements: [
        'Interviewed 12 users from different demographics',
        'Analyzed competitor platforms for best practices',
        'Created detailed user personas and journey maps',
      ],
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 2,
      date: 'February 2023',
      title: 'Strategy & Information Architecture',
      description:
        'Developed a comprehensive UX strategy and information architecture to address the identified pain points and business objectives.',
      achievements: [
        'Created site map and user flows',
        'Established content hierarchy',
        'Defined key performance indicators',
      ],
      image:
        'https://images.unsplash.com/photo-1518349619113-03114f06ac3a?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 3,
      date: 'March 2023',
      title: 'Wireframing',
      description:
        'Created low-fidelity wireframes for key pages and user flows, focusing on information hierarchy and functionality before aesthetics.',
      achievements: [
        'Developed wireframes for 15 unique page templates',
        'Conducted stakeholder reviews',
        'Refined navigation structure based on card sorting exercises',
      ],
      image:
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 4,
      date: 'April 2023',
      title: 'UI Design & Prototyping',
      description:
        'Transformed wireframes into high-fidelity designs with a modern visual language, and created interactive prototypes for testing.',
      achievements: [
        'Established a comprehensive design system',
        'Created responsive designs for mobile, tablet, and desktop',
        'Built interactive prototypes for key user flows',
      ],
      image:
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 5,
      date: 'May 2023',
      title: 'User Testing & Iteration',
      description:
        'Conducted usability testing with target users to validate the design solutions and identify areas for improvement.',
      achievements: [
        'Conducted 3 rounds of usability testing',
        'Identified and resolved 24 usability issues',
        'Implemented A/B testing for critical conversion elements',
      ],
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 6,
      date: 'June 2023',
      title: 'Development Handoff & Support',
      description:
        'Prepared design specs and assets for development team, and provided ongoing support during implementation.',
      achievements: [
        'Created detailed documentation for developers',
        'Generated production-ready assets',
        'Conducted regular design reviews during development',
      ],
      image:
        'https://images.unsplash.com/photo-1581472723648-909f4851d4ae?q=80&w=2070&auto=format&fit=crop',
    },
    {
      id: 7,
      date: 'July 2023',
      title: 'Launch & Results',
      description:
        'Successfully launched the redesigned platform and measured performance against key metrics to validate the design approach.',
      achievements: [
        '43% increase in conversion rate',
        '27% reduction in cart abandonment',
        '58% increase in mobile sales',
      ],
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    },
  ],
  tags: ['UX/UI Design', 'E-commerce', 'Mobile Responsive'],
  testimonial: {
    quote:
      'The redesigned platform has transformed our business. Not only have we seen dramatic improvements in conversion rates and sales, but our team finds the new admin interface much easier to use.',
    author: 'Sarah Johnson',
    role: 'E-Commerce Director, RetailTech Inc.',
  },
  link: '#',
};

export default function TimelineStyleCaseStudy() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Case Study Header */}
        <Card className="overflow-hidden border-none bg-transparent shadow-none">
          <div className="relative mb-12">
            {/* Hero image with text overlay */}
            <div className="relative h-[500px] w-full overflow-hidden rounded-xl sm:h-[450px] md:h-[500px] lg:h-[550px]">
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                className="object-cover"
              />
              <div className="from-background/95 via-background/80 to-background/60 absolute inset-0 bg-gradient-to-tr" />
            </div>

            {/* Header content overlaid on image */}
            <div className="absolute inset-0 flex flex-col justify-center overflow-y-auto p-6 md:p-12 lg:p-16">
              <div className="mb-3 flex flex-wrap gap-2 md:mb-4">
                {caseStudy.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-3 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl md:mb-4 md:text-4xl lg:text-5xl">
                {caseStudy.title}
              </h1>
              <p className="text-muted-foreground mb-4 max-w-2xl text-base sm:text-lg md:mb-6 md:text-xl">
                {caseStudy.summary}
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    CLIENT
                  </span>
                  <p className="text-sm font-medium sm:text-base">
                    {caseStudy.client}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs sm:text-sm">
                    TIMELINE
                  </span>
                  <p className="text-sm font-medium sm:text-base">
                    {caseStudy.timeline[0]!.date} —{' '}
                    {caseStudy.timeline[caseStudy.timeline.length - 1]!.date}
                  </p>
                </div>
                <Button size="sm" className="mt-1">
                  <a href="#timeline" className="flex items-center gap-2">
                    <span>View Timeline</span>
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Timeline */}
        <div className="mt-12 flex flex-col space-y-16 md:space-y-24">
          {caseStudy.timeline.map((phase, index) => (
            <div
              id={`phase-${phase.id}`}
              key={phase.id}
              className="group scroll-mt-24"
            >
              {/* Phase Number and Date */}
              <div className="mb-6 flex items-center">
                <div className="bg-primary text-primary-foreground flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all md:h-12 md:w-12 md:text-base">
                  {phase.id}
                </div>
                <div className="ml-4">
                  <span className="text-muted-foreground text-sm font-medium md:text-base">
                    {phase.date}
                  </span>
                  <h2 className="text-xl font-bold md:text-2xl">
                    {phase.title}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
                {/* Content Section */}
                <div className="lg:col-span-3">
                  <div className="bg-card rounded-lg border p-6 shadow-sm transition-all md:p-8">
                    <div className="mb-6">
                      <p className="text-base leading-relaxed md:text-lg">
                        {phase.description}
                      </p>
                    </div>

                    <h3 className="mb-4 text-base font-semibold md:text-lg">
                      Key Achievements:
                    </h3>
                    <ul className="space-y-3">
                      {phase.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                            <ChevronRight className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-sm md:text-base">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Next Phase Link */}
                    {index < caseStudy.timeline.length - 1 && (
                      <div className="mt-6 flex justify-end">
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={`#phase-${caseStudy.timeline[index + 1]!.id}`}
                            className="flex items-center gap-1 text-xs md:text-sm"
                          >
                            <span>
                              Next: {caseStudy.timeline[index + 1]!.title}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Section */}
                <div className="lg:col-span-2">
                  <div className="h-full overflow-hidden rounded-lg shadow-md transition-all">
                    <div className="relative aspect-[4/3] h-full w-full">
                      <img
                        src={phase.image}
                        alt={phase.title}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="bg-muted/50 relative rounded-lg p-6 shadow-sm md:p-8">
            <div className="text-primary mb-4 text-4xl">&quot;</div>
            <blockquote className="mb-6 text-lg italic">
              {caseStudy.testimonial.quote}
            </blockquote>
            <div>
              <div className="font-semibold">
                {caseStudy.testimonial.author}
              </div>
              <div className="text-muted-foreground text-sm">
                {caseStudy.testimonial.role}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" asChild>
            <a href={caseStudy.link} className="flex items-center gap-2">
              <span>View Complete Case Study</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
