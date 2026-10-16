import { ArrowRight } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Button } from '../../../ui/button';

// Sample case study data
const caseStudies = [
  {
    id: 1,
    title: 'E-Commerce Platform Redesign',
    client: 'RetailTech Inc.',
    category: 'UX/UI Design',
    description:
      'A complete overhaul of an outdated e-commerce platform, focusing on improving user experience and increasing conversion rates.',
    image:
      'https://images.unsplash.com/photo-1661956602153-23384936a1d3?q=80&w=2070&auto=format&fit=crop',
    tags: ['UX Research', 'UI Design', 'Conversion Optimization'],
    results: [
      '43% increase in conversion rate',
      '27% reduction in cart abandonment',
    ],
    link: '#',
  },
  {
    id: 2,
    title: 'Mobile Banking App Development',
    client: 'FinanceFirst Bank',
    category: 'Mobile Development',
    description:
      'Design and development of a secure, user-friendly mobile banking application with advanced features and biometric authentication.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    tags: ['Mobile Design', 'Security', 'Fintech'],
    results: [
      '92% user satisfaction rating',
      '35% increase in mobile transactions',
    ],
    link: '#',
  },
  {
    id: 3,
    title: 'Content Management System',
    client: 'Media Publishing Group',
    category: 'Web Development',
    description:
      'Built a custom content management system that streamlined the publishing workflow and improved content organization.',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop',
    tags: ['CMS Development', 'Workflow Optimization', 'Content Strategy'],
    results: [
      '50% reduction in publishing time',
      'Improved SEO metrics across 200+ articles',
    ],
    link: '#',
  },
  {
    id: 4,
    title: 'SaaS Dashboard Redesign',
    client: 'CloudMetrics',
    category: 'UI/UX Design',
    description:
      'Reimagined a complex analytics dashboard to improve data visualization and user workflow for a SaaS platform.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    tags: ['Dashboard Design', 'Data Visualization', 'User Testing'],
    results: [
      '38% improvement in task completion time',
      '87% positive user feedback',
    ],
    link: '#',
  },
  {
    id: 5,
    title: 'Healthcare Patient Portal',
    client: 'MediCare Solutions',
    category: 'Healthcare Software',
    description:
      'Created an accessible patient portal allowing secure access to medical records, appointment scheduling, and provider communication.',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    tags: ['Healthcare UX', 'Accessibility', 'HIPAA Compliance'],
    results: [
      '97% patient satisfaction',
      'Reduced administrative tasks by 35%',
    ],
    link: '#',
  },
  {
    id: 6,
    title: 'AI-Powered Recommendation Engine',
    client: 'StreamFlix Media',
    category: 'Machine Learning',
    description:
      'Developed and implemented an AI recommendation system that significantly improved content discovery and user engagement.',
    image:
      'https://images.unsplash.com/photo-1633613286991-611fe299c4be?q=80&w=2070&auto=format&fit=crop',
    tags: ['Machine Learning', 'Recommendation Systems', 'A/B Testing'],
    results: [
      '28% increase in content engagement',
      '17% reduction in churn rate',
    ],
    link: '#',
  },
];

export default function GridCaseStudyPreviews() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Case Studies
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Detailed explorations of selected projects, highlighting challenges,
            processes, and measurable outcomes.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <Card
              key={study.id}
              className="group hover:border-primary/30 overflow-hidden pt-0 transition-all duration-300 hover:shadow-md"
            >
              {/* Case Study Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Category badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-xs">
                    {study.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{study.title}</CardTitle>
                <CardDescription>
                  <span className="font-medium">{study.client}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="grow">
                <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                  {study.description}
                </p>

                {/* Key Results */}
                <div className="mb-4">
                  <h4 className="mb-2 text-sm font-medium">Key Results:</h4>
                  <ul className="space-y-1">
                    {study.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span className="text-primary text-lg">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" asChild className="group w-full">
                  <a
                    href={study.link}
                    className="flex items-center justify-center"
                  >
                    <span className="mr-2">View Case Study</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
