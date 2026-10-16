import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';

// Sample case studies data
const caseStudies = [
  {
    id: 'case-1',
    title: 'E-Commerce Platform Redesign',
    client: 'RetailTech Inc.',
    category: 'UX/UI Design',
    summary:
      'A comprehensive redesign of an outdated e-commerce platform to improve user experience, increase conversions, and modernize the brand.',
    coverImage:
      'https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=2070&auto=format&fit=crop',
    duration: '12 weeks',
    year: '2023',
    challenge:
      'The existing platform suffered from a confusing navigation structure, complicated checkout process, poor mobile experience, and outdated visual design, resulting in high cart abandonment and low conversion rates.',
    process:
      'I followed a user-centered design process that involved extensive user research, competitive analysis, wireframing, prototyping, and multiple rounds of usability testing to create a solution that addressed all key pain points.',
    solution:
      'The redesigned platform featured a clean, modern interface with intuitive navigation, streamlined checkout process, improved product discovery, and a responsive design that worked seamlessly across all devices.',
    results: [
      '43% increase in conversion rate',
      '27% reduction in cart abandonment',
      '58% increase in mobile sales',
      'Customer satisfaction score improved from 3.2/10 to 8.7/10',
    ],
    testimonial: {
      quote:
        'The redesigned platform has transformed our business. Not only have we seen dramatic improvements in conversion rates and sales, but our team finds the new admin interface much easier to use.',
      author: 'Sarah Johnson',
      role: 'E-Commerce Director',
    },
    tools: ['Figma', 'Adobe XD', 'InVision', 'UserTesting'],
    link: '#',
  },
  {
    id: 'case-2',
    title: 'Mobile Banking Application',
    client: 'FinanceFirst Bank',
    category: 'Mobile Development',
    summary:
      'Design and development of a secure, user-friendly mobile banking application with advanced features and biometric authentication.',
    coverImage:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    duration: '16 weeks',
    year: '2022',
    challenge:
      'FinanceFirst needed a mobile banking solution that would provide customers with a secure, convenient way to manage their finances on the go while addressing concerns about security, ease of use, and feature parity with the web platform.',
    process:
      'The project began with security research and competitive analysis, followed by user interviews to understand customer needs. I created a comprehensive information architecture, wireframes, and interactive prototypes that underwent rigorous security and usability testing.',
    solution:
      'A feature-rich mobile banking application with biometric authentication, real-time transaction alerts, mobile check deposit, bill pay, and account management features in an intuitive, accessible interface.',
    results: [
      '92% user satisfaction rating',
      '35% increase in mobile transactions',
      '28% reduction in call center volume',
      '4.8/5 average app store rating',
    ],
    testimonial: {
      quote:
        'This mobile app has exceeded our expectations in every way. The intuitive design and robust security features have given our customers confidence in managing their finances on the go.',
      author: 'Michael Chen',
      role: 'Digital Banking Director',
    },
    tools: ['React Native', 'Figma', 'Firebase', 'Jest'],
    link: '#',
  },
  {
    id: 'case-3',
    title: 'Healthcare Patient Portal',
    client: 'MediCare Solutions',
    category: 'Healthcare Software',
    summary:
      'Created an accessible patient portal allowing secure access to medical records, appointment scheduling, and provider communication.',
    coverImage:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    duration: '20 weeks',
    year: '2022',
    challenge:
      'MediCare Solutions needed a HIPAA-compliant patient portal that would make healthcare more accessible while maintaining strict security and privacy standards. The system needed to integrate with existing EHR systems and be usable by patients of all ages and abilities.',
    process:
      'I conducted extensive research including interviews with patients, healthcare providers, and administrators. I created a secure architecture plan, developed accessible wireframes, and conducted usability testing with diverse user groups including elderly patients and those with disabilities.',
    solution:
      'A comprehensive, accessible patient portal that allows secure access to medical records, appointment scheduling, prescription refills, provider messaging, and telemedicine integration, all with strict adherence to HIPAA compliance.',
    results: [
      '97% patient satisfaction',
      'Reduced administrative tasks by 35%',
      '42% increase in patient portal adoption',
      '31% reduction in missed appointments',
    ],
    testimonial: {
      quote:
        'This patient portal has transformed how we deliver care. Patients love the convenience, and our staff has seen a significant reduction in administrative burden.',
      author: 'Dr. Eleanor Patel',
      role: 'Chief Medical Officer',
    },
    tools: ['React', 'Node.js', 'MongoDB', 'WCAG Guidelines'],
    link: '#',
  },
  {
    id: 'case-4',
    title: 'AI-Powered Content Recommendation Engine',
    client: 'StreamFlix Media',
    category: 'Machine Learning',
    summary:
      'Developed and implemented an AI recommendation system that significantly improved content discovery and user engagement.',
    coverImage:
      'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop',
    duration: '14 weeks',
    year: '2023',
    challenge:
      'StreamFlix had a growing content library but users were struggling to discover relevant content beyond the most popular titles. They needed a sophisticated recommendation system that would increase engagement, viewing time, and retention.',
    process:
      'I analyzed existing user data, researched recommendation algorithms, and designed a hybrid approach combining collaborative filtering and content-based recommendations. I implemented A/B testing frameworks to continuously evaluate and refine the system.',
    solution:
      'A personalized recommendation engine using machine learning to analyze viewing history, preferences, and similar user behaviors to suggest relevant content, with a user interface that elegantly presents recommendations with context.',
    results: [
      '28% increase in content engagement',
      '17% reduction in churn rate',
      '22% increase in average viewing time',
      'Expanded content discovery beyond top 10% of library',
    ],
    testimonial: {
      quote:
        "The new recommendation engine has significantly improved how users discover content on our platform. We're seeing engagement with a much broader range of our library, and users are spending more time on the service.",
      author: 'James Rodriguez',
      role: 'Product Director',
    },
    tools: ['Python', 'TensorFlow', 'AWS', 'React'],
    link: '#',
  },
];

export default function AccordionExpandableCaseStudies() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Case Studies
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Explore detailed case studies of selected projects. Click on any
            study to see the full story behind the work.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Accordion type="single" collapsible className="w-full">
            {caseStudies.map((study) => (
              <AccordionItem
                key={study.id}
                value={study.id}
                className="border-primary/10 hover:border-primary/30 mb-6 overflow-hidden rounded-lg border hover:shadow-sm"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex flex-1 items-center gap-4">
                    <div className="relative hidden h-16 w-16 overflow-hidden rounded-md border sm:block">
                      <img
                        src={study.coverImage}
                        alt={study.title}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="mb-1 flex items-center gap-3">
                        <h3 className="text-xl font-semibold">{study.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {study.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
                        {study.summary}
                      </p>
                    </div>
                    <div className="hidden items-center gap-4 sm:flex">
                      <div className="text-right">
                        <div className="text-muted-foreground flex items-center justify-end text-sm">
                          <Clock className="mr-1.5 h-3.5 w-3.5" />
                          {study.duration}
                        </div>
                        <div className="text-muted-foreground text-sm">
                          {study.year}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="border-t px-0 pt-0 pb-0">
                  <div className="text-muted-foreground bg-muted/30 px-6 py-3 text-sm">
                    Client:{' '}
                    <span className="text-foreground font-medium">
                      {study.client}
                    </span>{' '}
                    • Duration:{' '}
                    <span className="text-foreground font-medium">
                      {study.duration}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-5">
                    {/* Main content */}
                    <div className="md:col-span-3">
                      <div className="mb-8">
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                          The Challenge
                        </h4>
                        <p className="text-sm">{study.challenge}</p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                          The Process
                        </h4>
                        <p className="text-sm">{study.process}</p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                          The Solution
                        </h4>
                        <p className="text-sm">{study.solution}</p>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                          Key Results
                        </h4>
                        <ul className="space-y-2">
                          {study.results.map((result, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="bg-primary/10 text-primary flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
                                {index + 1}
                              </span>
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-8">
                        <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                          Client Testimonial
                        </h4>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <blockquote className="mb-3 text-sm italic">
                            &quot;{study.testimonial.quote}&quot;
                          </blockquote>
                          <div className="text-sm font-medium">
                            {study.testimonial.author},{' '}
                            <span className="text-muted-foreground font-normal">
                              {study.testimonial.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="md:col-span-2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
                        <img
                          src={study.coverImage}
                          alt={study.title}
                          className="object-cover"
                        />
                      </div>

                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="text-muted-foreground mb-2 text-sm font-semibold tracking-wide uppercase">
                            Tools & Technologies
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {study.tools.map((tool) => (
                              <Badge
                                key={tool}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="pt-4">
                          <Button asChild className="group w-full">
                            <a
                              href={study.link}
                              className="flex items-center justify-center"
                            >
                              <span className="mr-2">View Full Case Study</span>
                              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
