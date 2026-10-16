import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  BarChart2,
  Clock,
  Calendar,
  Quote,
  Building,
  Award,
  Share2,
  ArrowRight,
  Download,
} from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../../../ui/hover-card';

// Types for our case study data
interface Metric {
  label: string;
  value: string;
  previous?: string;
  percentageChange?: number;
  isPositive?: boolean;
}

interface CaseStudyContent {
  challenge: string[];
  solution: string[];
  results: string[];
}

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  avatarUrl?: string;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: {
    name: string;
    industry: string;
    size: string;
    logoUrl: string;
  };
  publishDate: string;
  duration: string;
  coverImageUrl: string;
  projectType: string[];
  metrics: Metric[];
  content: CaseStudyContent;
  testimonial?: Testimonial;
  relatedCaseStudies?: { id: string; title: string }[];
  downloadUrl?: string;
}

// Sample data for a case study
const caseStudyData: CaseStudy = {
  id: 'ecommerce-platform-optimization',
  title: 'Boosting E-Commerce Conversion with Data-Driven UX Redesign',
  subtitle:
    'How OptimizeNow helped Retail Giant increase mobile conversions by 37%',
  client: {
    name: 'FashionHub',
    industry: 'Retail / Fashion',
    size: 'Mid Enterprise (500-1000 employees)',
    logoUrl:
      'https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=100&h=100&auto=format&fit=crop',
  },
  publishDate: 'March 14, 2023',
  duration: '3 months',
  coverImageUrl:
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2069&auto=format&fit=crop',
  projectType: ['UX Optimization', 'Mobile Conversion', 'A/B Testing'],
  metrics: [
    {
      label: 'Mobile Conversion Rate',
      value: '3.8%',
      previous: '2.3%',
      percentageChange: 37,
      isPositive: true,
    },
    {
      label: 'Cart Abandonment',
      value: '58%',
      previous: '72%',
      percentageChange: 19,
      isPositive: true,
    },
    {
      label: 'Average Order Value',
      value: '$78.50',
      previous: '$67.25',
      percentageChange: 16,
      isPositive: true,
    },
    {
      label: 'Page Load Speed',
      value: '1.2s',
      previous: '3.5s',
      percentageChange: 65,
      isPositive: true,
    },
  ],
  content: {
    challenge: [
      "FashionHub's mobile conversion rates were significantly lower than desktop, despite 68% of traffic coming from mobile devices.",
      'The checkout process had a 72% abandonment rate, much higher than industry average.',
      'Customer feedback indicated friction points in the product selection and payment processes.',
      'The site suffered from slow load times on mobile, especially on 3G connections in key markets.',
    ],
    solution: [
      'Conducted comprehensive user testing with 50 customers to identify specific pain points in the mobile journey.',
      'Implemented a streamlined checkout process, reducing steps from 5 to 3 without sacrificing data collection.',
      'Redesigned the product page layout with a focus on mobile-first interaction patterns.',
      'Optimized image loading and implemented progressive web app features to improve performance.',
      'Developed a robust A/B testing framework to validate all changes before full deployment.',
    ],
    results: [
      'Increased mobile conversion rate by 37%, exceeding the initial goal of 25%.',
      'Reduced cart abandonment rate from 72% to 58%, recovering an estimated $1.2M in monthly revenue.',
      'Improved average order value by 16% through strategic cross-sell implementation.',
      "Decreased page load time by 65%, bringing the site well within Google's recommended performance metrics.",
      'Achieved a 98% customer satisfaction score for the new mobile checkout experience.',
    ],
  },
  testimonial: {
    quote:
      'The OptimizeNow team went beyond simple UI tweaks to deliver a fundamental rethinking of our mobile experience. Their data-driven approach gave us confidence at every step, and the results speak for themselves.',
    author: 'Sarah Chen',
    position: 'Chief Digital Officer',
    company: 'FashionHub',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
  },
  relatedCaseStudies: [
    {
      id: 'omnichannel-retail-strategy',
      title: 'Omnichannel Retail Strategy for BoutiqueBrands',
    },
    {
      id: 'personalization-engine',
      title: 'AI-Powered Personalization Engine Implementation',
    },
  ],
  downloadUrl: '#',
};

export default function BlogSectionCaseStudyShowcase() {
  const {
    title,
    subtitle,
    client,
    publishDate,
    duration,
    coverImageUrl,
    projectType,
    metrics,
    content,
    testimonial,
    relatedCaseStudies,
    downloadUrl,
  } = caseStudyData;

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header and Cover */}
        <div className="mb-12">
          <div className="mb-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8 overflow-hidden rounded">
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="object-cover"
                  />
                </div>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      className="text-muted-foreground hover:text-foreground h-auto p-0"
                    >
                      {client.name}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{client.name}</h4>
                        <div className="text-muted-foreground flex items-center gap-2 text-xs">
                          <Building className="h-3.5 w-3.5" />
                          <span>{client.industry}</span>
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Company Size: {client.size}
                        </div>
                      </div>
                      <div className="relative h-16 w-16 overflow-hidden rounded">
                        <img
                          src={client.logoUrl}
                          alt={client.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
              <p className="text-muted-foreground text-xl">{subtitle}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <div className="text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{publishDate}</span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {downloadUrl && (
                <Button variant="outline" size="sm" className="gap-2" asChild>
                  <a href={downloadUrl}>
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share Case Study
              </Button>
            </div>
          </div>

          {/* Project Type Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {projectType.map((type, index) => (
              <Badge key={index} variant="secondary">
                {type}
              </Badge>
            ))}
          </div>

          {/* Cover Image */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-lg">
            <img
              src={coverImageUrl}
              alt={title}
              className="object-cover"
            />
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mb-16">
          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
            <BarChart2 className="text-primary h-5 w-5" />
            Key Results
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-background border">
                <CardHeader className="pb-2">
                  <h3 className="text-muted-foreground text-sm font-medium">
                    {metric.label}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{metric.value}</div>
                  {metric.previous && metric.percentageChange && (
                    <div
                      className={`mt-1 flex items-center text-sm ${
                        metric.isPositive ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      <span>
                        {metric.isPositive ? '+' : ''}
                        {metric.percentageChange}%
                      </span>
                      <span className="text-muted-foreground ml-2">
                        from {metric.previous}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Case Study Tabs */}
        <div className="mb-16">
          <Tabs defaultValue="challenge">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="challenge">Challenge</TabsTrigger>
              <TabsTrigger value="solution">Solution</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="challenge" className="mt-6 space-y-4">
              {content.challenge.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </TabsContent>

            <TabsContent value="solution" className="mt-6 space-y-4">
              {content.solution.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </TabsContent>

            <TabsContent value="results" className="mt-6 space-y-4">
              {content.results.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground">
                  {paragraph}
                </p>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Testimonial */}
        {testimonial && (
          <div className="mb-16">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-start gap-6 md:flex-row">
                  {testimonial.avatarUrl && (
                    <div className="border-background relative h-16 w-16 overflow-hidden rounded-full border-4">
                      <img
                        src={testimonial.avatarUrl}
                        alt={testimonial.author}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="relative">
                      <Quote className="text-primary/20 absolute -top-4 -left-2 h-8 w-8" />
                      <p className="relative z-10 pl-7 text-lg italic">
                        &quot;{testimonial.quote}&quot;
                      </p>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-muted-foreground text-sm">
                        {testimonial.position}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Case Studies */}
        {relatedCaseStudies && relatedCaseStudies.length > 0 && (
          <div>
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <Award className="text-primary h-5 w-5" />
              Related Case Studies
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedCaseStudies.map((study, index) => (
                <Card
                  key={index}
                  className="group gap-3 transition-all hover:shadow-md"
                >
                  <CardContent className="">
                    <h3 className="group-hover:text-primary mb-2 text-xl font-medium transition-colors">
                      {study.title}
                    </h3>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      className="group-hover:text-primary gap-1 p-0"
                      asChild
                    >
                      <a href={`/case-studies/${study.id}`}>
                        View Case Study
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
