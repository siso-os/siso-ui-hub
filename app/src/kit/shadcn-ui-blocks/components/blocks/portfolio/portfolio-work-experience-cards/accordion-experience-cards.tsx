import { useState } from 'react';

import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import { Calendar, MapPin, ExternalLink, Briefcase } from 'lucide-react';

export default function AccordionExperienceCards() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleValueChange = (value: string[]) => {
    setOpenItems(value);
  };

  const workExperiences = [
    {
      company: 'Innovative Solutions Inc.',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'Senior Product Designer',
      location: 'San Francisco, CA',
      duration: '2021 - Present',
      description:
        'Leading the product design team in creating user-centered experiences for enterprise software applications. Collaborating with cross-functional teams to define product vision and roadmap.',
      achievements: [
        'Redesigned flagship product resulting in 40% increase in user engagement',
        'Established design system reducing development time by 30%',
        'Led research initiatives that shaped three major feature releases',
      ],
      skills: [
        'UX/UI Design',
        'Design Systems',
        'User Research',
        'Figma',
        'Prototyping',
      ],
      link: '#',
    },
    {
      company: 'Digital Creations Studio',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'UX Designer',
      location: 'Remote',
      duration: '2019 - 2021',
      description:
        'Designed digital experiences for clients in finance, healthcare, and e-commerce sectors. Conducted user research and testing to inform design decisions and iterate on solutions.',
      achievements: [
        'Created mobile app interface that increased conversion by 25%',
        'Developed user personas and journey maps for 5 major clients',
        'Optimized checkout flow reducing cart abandonment by 18%',
      ],
      skills: [
        'UX Design',
        'User Testing',
        'Wireframing',
        'Adobe XD',
        'Sketch',
      ],
      link: '#',
    },
    {
      company: 'CreativeTech Agency',
      logo: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'UI Designer',
      location: 'New York, NY',
      duration: '2017 - 2019',
      description:
        'Created visually compelling user interfaces for web and mobile applications. Collaborated with developers to ensure design integrity through implementation.',
      achievements: [
        'Designed UI for award-winning healthcare application',
        'Created visual identity for startup that secured $2M in funding',
        'Improved design handoff process reducing developer questions by 40%',
      ],
      skills: [
        'UI Design',
        'Visual Design',
        'Typography',
        'Illustrator',
        'Brand Guidelines',
      ],
      link: '#',
    },
    {
      company: 'TechStart Studios',
      logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
      role: 'Graphic Designer',
      location: 'Chicago, IL',
      duration: '2015 - 2017',
      description:
        'Designed marketing materials, website graphics, and brand assets for technology startups and small businesses. Ensured consistent brand identity across all touchpoints.',
      achievements: [
        'Created visual assets for 15+ product launches',
        'Redesigned company website increasing traffic by 30%',
        'Developed social media templates that improved engagement by 25%',
      ],
      skills: [
        'Graphic Design',
        'Branding',
        'Marketing Materials',
        'Photoshop',
        'InDesign',
      ],
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
            My career journey through key roles and companies. Click on each
            position to learn more about my responsibilities and achievements.
          </p>
        </div>

        <Accordion
          type="multiple"
          value={openItems}
          onValueChange={handleValueChange}
          className="bg-card mx-auto max-w-4xl rounded-lg border"
        >
          {workExperiences.map((experience, index) => {
            const itemId = `item-${index}`;
            return (
              <AccordionItem
                key={index}
                value={itemId}
                className={`border-b transition-all duration-200 last:border-b-0 ${
                  openItems.includes(itemId)
                    ? 'bg-muted/50'
                    : 'hover:bg-muted/30'
                }`}
              >
                <AccordionTrigger className="flex w-full px-6 py-6 text-left hover:no-underline">
                  <div className="flex w-full items-center gap-4">
                    <div className="bg-primary/10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full">
                      <Briefcase className="text-primary h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold">{experience.role}</h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="font-medium">
                          {experience.company}
                        </span>
                        <div className="text-muted-foreground hidden items-center gap-1 text-sm sm:flex">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{experience.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted-foreground mr-4 hidden flex-col items-end gap-1 text-sm md:flex">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="border-t px-6 py-5">
                  <div className="md:flex md:gap-8">
                    <div className="mb-6 md:mb-0 md:w-1/2">
                      {/* Company Logo & Description */}
                      <div className="mb-6 flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                          <img
                            src={experience.logo}
                            alt={experience.company}
                            className="object-cover"
                          />
                        </div>
                        <div className="text-muted-foreground flex flex-col gap-1 text-sm md:hidden">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{experience.location}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
                        Description
                      </h4>
                      <p className="mb-6 text-base">{experience.description}</p>

                      <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wider uppercase">
                        Skills & Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-1/2">
                      <h4 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wider uppercase">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {experience.achievements.map(
                          (achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="flex items-start gap-3"
                            >
                              <span className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                                {achievementIndex + 1}
                              </span>
                              <span>{achievement}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button asChild>
                      <a href={experience.link} className="flex items-center">
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
