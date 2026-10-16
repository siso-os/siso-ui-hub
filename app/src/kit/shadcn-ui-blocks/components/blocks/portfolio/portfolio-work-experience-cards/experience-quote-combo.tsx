import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { CalendarDays, MapPin, Quote } from 'lucide-react';

export default function ExperienceQuoteCombo() {
  const workExperiences = [
    {
      role: 'Marketing Director',
      company: 'Global Brands Inc.',
      location: 'San Francisco, CA',
      duration: 'Feb 2020 - Present',
      description:
        'Oversee strategic marketing initiatives for enterprise clients across multiple industries, leading a team of 15 marketing specialists.',
      achievements: [
        'Increased client acquisition by 45% through targeted digital campaigns',
        'Launched 3 successful product lines with over $2M in first-year revenue',
        'Restructured marketing department for improved efficiency and innovation',
      ],
      quote: {
        text: 'Sarah transformed our marketing strategy completely. Her innovative approaches and deep understanding of our audience led to our most successful campaign in company history.',
        author: 'James Wilson',
        position: 'CEO, Global Brands Inc.',
      },
      link: '#',
    },
    {
      role: 'Senior Marketing Manager',
      company: 'Innovation Media',
      location: 'Seattle, WA',
      duration: 'Aug 2017 - Jan 2020',
      description:
        'Managed comprehensive marketing campaigns for technology clients with budgets ranging from $500K to $2M annually.',
      achievements: [
        'Directed award-winning rebrand for major software client',
        'Developed content strategy that increased engagement by 78%',
        'Built and trained high-performing marketing team of 8 specialists',
      ],
      quote: {
        text: 'Working with Sarah was transformative for our team. She brings both strategic vision and a remarkable attention to execution details that helped us exceed our marketing goals.',
        author: 'Lisa Chen',
        position: 'Marketing VP, Tech Solutions',
      },
      link: '#',
    },
    {
      role: 'Marketing Specialist',
      company: 'Creative Solutions',
      location: 'Portland, OR',
      duration: 'May 2015 - Jul 2017',
      description:
        'Executed marketing campaigns across digital and traditional channels for diverse client portfolio including startups and established brands.',
      achievements: [
        'Managed social media growth resulting in 250% audience increase',
        'Implemented new analytics tracking improving campaign ROI by 35%',
        'Collaborated with design team to refresh brand identity for 5 clients',
      ],
      quote: {
        text: 'Sarah has that rare combination of creativity and analytical thinking. She consistently delivered results that exceeded our expectations and always found innovative solutions to our marketing challenges.',
        author: 'Michael Rodriguez',
        position: 'Founder, Startup Success',
      },
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Professional Experience
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            My career journey and the impact I&apos;ve made along the way, as
            told through my work and the words of those I&apos;ve worked with.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {workExperiences.map((experience, index) => (
            <Card
              key={index}
              className="flex h-full flex-col overflow-hidden p-0 shadow-sm transition-all hover:shadow-md"
            >
              <CardContent className="flex h-full flex-col p-0">
                {/* Card Header */}
                <div className="bg-primary text-primary-foreground p-6">
                  <h3 className="mb-1 text-xl font-bold">{experience.role}</h3>
                  <p className="text-primary-foreground/90 font-medium">
                    {experience.company}
                  </p>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Details */}
                  <div className="mb-4 flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="text-muted-foreground/70 h-4 w-4" />
                      <span className="text-muted-foreground">
                        {experience.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-muted-foreground/70 h-4 w-4" />
                      <span className="text-muted-foreground">
                        {experience.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 text-sm">
                    {experience.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="mb-2 text-sm font-semibold">
                      Key Achievements
                    </h4>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      {experience.achievements.map(
                        (achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-start"
                          >
                            <span className="bg-primary/10 text-primary mr-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs">
                              •
                            </span>
                            <span>{achievement}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="bg-muted/50 mt-auto rounded-lg p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Quote className="text-primary h-4 w-4" />
                      <span className="text-sm font-medium">Testimonial</span>
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm italic">
                      &quot;{experience.quote.text}&quot;
                    </p>
                    <div className="text-sm">
                      <p className="font-medium">{experience.quote.author}</p>
                      <p className="text-muted-foreground text-xs">
                        {experience.quote.position}
                      </p>
                    </div>
                  </div>

                  <Button asChild className="mt-6 w-full">
                    <a href={experience.link}>View Full Details</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
