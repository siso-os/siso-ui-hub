import { ArrowRightIcon } from 'lucide-react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';

const processCards = [
  {
    id: 1,
    title: 'Discovery',
    icon: '🔍',
    description: 'Understanding your needs and project requirements',
    details: [
      'Comprehensive client interviews',
      'Market and competitor research',
      'User persona development',
      'Project scope definition',
    ],
    color: 'bg-blue-500/10 border-blue-500',
    iconBg: 'bg-blue-500/20',
  },
  {
    id: 2,
    title: 'Strategy',
    icon: '🧠',
    description: 'Developing a plan and approach tailored to your goals',
    details: [
      'Content strategy creation',
      'Information architecture',
      'Technology stack selection',
      'Project timeline development',
    ],
    color: 'bg-purple-500/10 border-purple-500',
    iconBg: 'bg-purple-500/20',
  },
  {
    id: 3,
    title: 'Design',
    icon: '🎨',
    description: 'Creating beautiful and functional visual solutions',
    details: [
      'Wireframing and prototyping',
      'Visual design exploration',
      'UI/UX development',
      'Design system implementation',
    ],
    color: 'bg-amber-500/10 border-amber-500',
    iconBg: 'bg-amber-500/20',
  },
  {
    id: 4,
    title: 'Development',
    icon: '👨‍💻',
    description: 'Building robust and scalable technical solutions',
    details: [
      'Frontend development',
      'Backend integration',
      'Responsive implementation',
      'Performance optimization',
    ],
    color: 'bg-green-500/10 border-green-500',
    iconBg: 'bg-green-500/20',
  },
  {
    id: 5,
    title: 'Deployment',
    icon: '🚀',
    description: 'Launching your project and ensuring everything runs smoothly',
    details: [
      'Quality assurance testing',
      'Server deployment',
      'SEO implementation',
      'Analytics setup',
    ],
    color: 'bg-rose-500/10 border-rose-500',
    iconBg: 'bg-rose-500/20',
  },
  {
    id: 6,
    title: 'Maintenance',
    icon: '🔧',
    description: 'Providing ongoing support and improvements after launch',
    details: [
      'Regular performance monitoring',
      'Security updates',
      'Feature enhancements',
      'Content updates and optimization',
    ],
    color: 'bg-cyan-500/10 border-cyan-500',
    iconBg: 'bg-cyan-500/20',
  },
];

export default function StackedCards() {
  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="px-3 py-1" variant="outline">
              My Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How I Work
            </h2>
            <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A detailed breakdown of my comprehensive approach to ensure your
              project&apos;s success
            </p>
          </div>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {processCards.map((card) => (
            <div key={card.id} className="group relative">
              <Card className={`${card.color} h-full border-2`}>
                <CardHeader>
                  <div
                    className={`h-12 w-12 rounded-full ${card.iconBg} mb-4 flex items-center justify-center text-2xl`}
                  >
                    {card.icon}
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="grow">
                  <ul className="space-y-2">
                    {card.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="text-primary mr-2 h-5 w-5 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <a
                    href="#"
                    className="text-primary flex items-center text-sm font-medium hover:underline"
                  >
                    Learn more
                    <ArrowRightIcon className="ml-1 h-3 w-3" />
                  </a>
                </CardFooter>
              </Card>

              {/* Layered shadow cards */}
              <div
                className={`absolute inset-0 -z-10 ${card.color} translate-x-1 translate-y-1 rounded-lg border-2 opacity-70`}
              ></div>
              <div
                className={`absolute inset-0 -z-20 ${card.color} translate-x-2 translate-y-2 rounded-lg border-2 opacity-50`}
              ></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button asChild>
              <a href="#">Start Your Project</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#">
                View Case Studies
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
