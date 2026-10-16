import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

// Sample case study data
const caseStudy = {
  title: 'E-Commerce Platform Redesign',
  client: 'RetailTech Inc.',
  category: 'UX/UI Design',
  year: '2023',
  duration: '12 weeks',
  summary:
    'A complete overhaul of an outdated e-commerce platform, focusing on improving user experience and increasing conversion rates through user-centered design principles.',
  mainImage:
    'https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=2070&auto=format&fit=crop',
  sections: [
    {
      id: 'challenge',
      title: 'The Challenge',
      content:
        'RetailTech Inc. approached me to redesign their outdated e-commerce platform which was suffering from poor conversion rates, high cart abandonment, and frustrated users. The existing platform was built over 5 years ago and had become difficult to navigate with an outdated interface. Key issues included a complicated checkout process, poor mobile experience, and lack of personalization features.',
      image:
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop',
      bullets: [
        'Cart abandonment rate of over 75%',
        'Mobile conversion rate 65% lower than desktop',
        'Customer satisfaction score of only 3.2/10',
        'Outdated visual design creating trust issues',
      ],
    },
    {
      id: 'discovery',
      title: 'Discovery & Research',
      content:
        'I began with extensive user research to understand pain points and expectations. This included user interviews, usability testing of the existing platform, competitive analysis, and a comprehensive review of analytics data. The research phase revealed critical insights into user behavior, preferences, and frustrations with the current platform.',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
      bullets: [
        'Conducted 12 user interviews with diverse customer segments',
        'Analyzed heatmaps and user recordings from over 2,000 sessions',
        'Performed competitive analysis of 5 leading e-commerce platforms',
        'Created detailed user personas and journey maps',
      ],
    },
    {
      id: 'strategy',
      title: 'Strategy & Planning',
      content:
        'Based on research findings, I developed a comprehensive UX strategy to address key pain points and business objectives. The strategy focused on simplifying the shopping journey, enhancing product discovery, streamlining checkout, and implementing a mobile-first approach to ensure a seamless experience across all devices.',
      image:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
      bullets: [
        'Developed a comprehensive information architecture',
        'Created user flows focusing on critical conversion paths',
        'Established UX principles and design patterns',
        'Identified key performance metrics for measuring success',
      ],
    },
    {
      id: 'design',
      title: 'Design & Prototyping',
      content:
        'The design phase involved creating wireframes, high-fidelity mockups, and interactive prototypes. I implemented a clean, modern aesthetic with a focus on usability, accessibility, and conversion optimization. Key features included a streamlined checkout process, enhanced product filtering, and personalized recommendations.',
      image:
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop',
      bullets: [
        'Created wireframes for key user flows',
        'Developed a comprehensive design system for consistency',
        'Built interactive prototypes for usability testing',
        'Implemented accessibility standards throughout the design',
      ],
    },
    {
      id: 'testing',
      title: 'Testing & Iteration',
      content:
        'Rigorous testing was conducted throughout the design process to validate assumptions and refine the user experience. This included moderated usability testing, A/B testing of key elements, and gathering feedback from stakeholders. Each round of testing informed iterations and refinements to the design.',
      image:
        'https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=2069&auto=format&fit=crop',
      bullets: [
        'Conducted 3 rounds of usability testing with 8 participants per round',
        'Performed A/B testing on critical conversion elements',
        'Gathered feedback from key stakeholders and internal teams',
        'Made data-driven refinements based on testing insights',
      ],
    },
    {
      id: 'results',
      title: 'Results & Impact',
      content:
        'The redesigned platform launched successfully and delivered significant improvements across all key metrics. The new design not only improved the user experience but also drove substantial business outcomes, demonstrating the value of a user-centered design approach.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      bullets: [
        '43% increase in conversion rate',
        '27% reduction in cart abandonment',
        '58% increase in mobile sales',
        'Customer satisfaction score improved from 3.2/10 to 8.7/10',
      ],
    },
  ],
  testimonial: {
    quote:
      'The redesigned platform has transformed our business. Not only have we seen dramatic improvements in conversion rates and sales, but our team finds the new admin interface much easier to use. This project has delivered ROI beyond our expectations.',
    author: 'Sarah Johnson',
    role: 'E-Commerce Director, RetailTech Inc.',
  },
  tools: ['Figma', 'Adobe XD', 'InVision', 'UserTesting'],
  tags: ['UX Research', 'UI Design', 'E-commerce', 'Conversion Optimization'],
  link: '#',
};

export default function SideBySideImageStory() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Case Study Header */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                {caseStudy.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {caseStudy.title}
              </h1>
              <div className="mb-4 flex flex-wrap gap-6 text-sm">
                <div>
                  <p className="text-muted-foreground font-medium">Client</p>
                  <p>{caseStudy.client}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Timeline</p>
                  <p>{caseStudy.duration}</p>
                </div>
                <div>
                  <p className="text-muted-foreground font-medium">Year</p>
                  <p>{caseStudy.year}</p>
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                {caseStudy.summary}
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src={caseStudy.mainImage}
                alt={caseStudy.title}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Case Study Navigation */}
        <div className="mb-12">
          <Tabs defaultValue="challenge" className="w-full">
            <div className="mb-6 overflow-auto">
              <TabsList className="inline-flex h-10 w-auto">
                {caseStudy.sections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="px-4 whitespace-nowrap"
                  >
                    {section.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Tab Content */}
            {caseStudy.sections.map((section, index) => (
              <TabsContent key={section.id} value={section.id} className="m-0">
                <div
                  className={`grid grid-cols-1 gap-8 md:grid-cols-2 ${
                    index % 2 !== 0 ? 'md:grid-flow-col-reverse' : ''
                  }`}
                >
                  {/* Image Column (switches sides every other section) */}
                  <div
                    className={`${
                      index % 2 !== 0 ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                      <img
                        src={section.image}
                        alt={section.title}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`${
                      index % 2 !== 0 ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                      {section.title}
                    </h2>
                    <p className="mb-6 text-base leading-relaxed sm:text-lg">
                      {section.content}
                    </p>

                    {section.bullets && (
                      <div className="mt-6">
                        <h3 className="mb-3 text-lg font-semibold">
                          Key Points:
                        </h3>
                        <ul className="space-y-2">
                          {section.bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="bg-primary/10 text-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                                {idx + 1}
                              </span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Testimonial */}
        <div className="mx-auto mb-12 max-w-3xl">
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

        {/* Tools & CTA */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold">
              Tools & Technologies Used
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {caseStudy.tools.map((tool) => (
                <Badge key={tool} variant="outline">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          <Button asChild size="lg">
            <a href={caseStudy.link} className="flex items-center gap-2">
              <span>View Full Case Study</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
