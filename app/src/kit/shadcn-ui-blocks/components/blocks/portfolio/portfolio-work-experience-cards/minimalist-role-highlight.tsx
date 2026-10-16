import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { ArrowRight } from 'lucide-react';

export default function MinimalistRoleHighlight() {
  const workExperiences = [
    {
      role: 'Product Design Lead',
      company: 'Horizon Technologies',
      location: 'San Francisco, CA',
      duration: 'Jan 2022 - Present',
      link: '#',
    },
    {
      role: 'Senior UX Designer',
      company: 'Elevate Digital',
      location: 'Remote',
      duration: 'Mar 2019 - Dec 2021',
      link: '#',
    },
    {
      role: 'UI/UX Designer',
      company: 'Innovative Solutions',
      location: 'New York, NY',
      duration: 'Jun 2017 - Feb 2019',
      link: '#',
    },
    {
      role: 'Web Designer',
      company: 'Creative Agency Co.',
      location: 'Boston, MA',
      duration: 'Sep 2015 - May 2017',
      link: '#',
    },
    {
      role: 'Graphic Design Intern',
      company: 'Studio Designs',
      location: 'Chicago, IL',
      duration: 'Jan 2015 - Aug 2015',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 md:mb-16">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Work Experience
            </h2>
            <p className="text-muted-foreground text-lg">
              A chronological overview of my professional roles and career
              progression.
            </p>
          </div>

          <div className="space-y-4">
            {workExperiences.map((experience, index) => (
              <Card
                key={index}
                className="group hover:border-primary hover:bg-muted/50 overflow-hidden border p-0 transition-all"
              >
                <CardContent className="p-0">
                  <a href={experience.link} className="block p-6">
                    <div className="flex flex-col justify-between gap-y-2 sm:flex-row sm:items-center">
                      <div>
                        <h3 className="text-xl font-bold">{experience.role}</h3>
                        <div className="text-muted-foreground mt-1 flex flex-col sm:flex-row sm:items-center">
                          <span>{experience.company}</span>
                          <span className="hidden sm:mx-2 sm:inline">•</span>
                          <span>{experience.location}</span>
                        </div>
                      </div>

                      <div className="text-muted-foreground font-mono text-sm">
                        {experience.duration}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <span className="text-primary text-sm font-medium group-hover:underline">
                        View details
                      </span>
                      <ArrowRight className="text-primary ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline">
              <a href="#">
                Download Full Resume <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
