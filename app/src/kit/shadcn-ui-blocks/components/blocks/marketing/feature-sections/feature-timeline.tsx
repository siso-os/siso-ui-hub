import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../ui/tabs';
import { Calendar, CalendarCheck, CalendarDays, Check, Clock, RotateCcw, Star, Sparkles, Lightbulb, Rocket, ArrowUpRight, Eye, CircleEllipsis } from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';

import type { ComponentType, SVGProps } from 'react';
import { SiGithub } from '@icons-pack/react-simple-icons';

type LucideIcon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
interface TimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  icon: LucideIcon;
  status: 'released' | 'in-progress' | 'planned';
  isHighlighted?: boolean;
  version?: string;
  link?: {
    text: string;
    url: string;
    icon: LucideIcon;
  };
  image?: string;
}

type TimelinePeriod = {
  id: string;
  label: string;
  items: TimelineItem[];
};

// Timeline periods
const timelinePeriods: TimelinePeriod[] = [
  {
    id: 'past',
    label: 'Released',
    items: [
      {
        id: 'item-1',
        title: 'Advanced Authentication',
        description:
          'Secure multi-factor authentication and SSO integration for enterprise users.',
        date: '2023-12-15',
        formattedDate: 'December 15, 2023',
        icon: Check,
        status: 'released',
        version: '2.4.0',
        link: {
          text: 'Read documentation',
          url: '#',
          icon: ArrowUpRight,
        },
        image:
          'https://images.unsplash.com/photo-1618044733300-9472054094ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        id: 'item-2',
        title: 'Data Visualization Suite',
        description:
          'Interactive charts, graphs, and customizable dashboards for data analysis.',
        date: '2023-10-20',
        formattedDate: 'October 20, 2023',
        icon: Check,
        status: 'released',
        version: '2.3.0',
        isHighlighted: true,
        link: {
          text: 'View on GitHub',
          url: '#',
          icon: SiGithub,
        },
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        id: 'item-3',
        title: 'Team Collaboration Tools',
        description:
          'Real-time editing, commenting, and notification systems for teams.',
        date: '2023-08-05',
        formattedDate: 'August 5, 2023',
        icon: Check,
        status: 'released',
        version: '2.2.0',
        link: {
          text: 'Read case study',
          url: '#',
          icon: Eye,
        },
        image:
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        id: 'item-4',
        title: 'API Integrations',
        description:
          'Connect with third-party services via our comprehensive API endpoints.',
        date: '2023-06-12',
        formattedDate: 'June 12, 2023',
        icon: Check,
        status: 'released',
        version: '2.1.0',
      },
      {
        id: 'item-5',
        title: 'Performance Optimization',
        description: 'Major speed improvements and resource optimization.',
        date: '2023-04-30',
        formattedDate: 'April 30, 2023',
        icon: Check,
        status: 'released',
        version: '2.0.0',
      },
    ],
  },
  {
    id: 'present',
    label: 'In Progress',
    items: [
      {
        id: 'item-6',
        title: 'AI-Powered Analytics',
        description:
          'Intelligent insights and predictions based on your data patterns.',
        date: '2024-02-15',
        formattedDate: 'February 15, 2024',
        icon: RotateCcw,
        status: 'in-progress',
        isHighlighted: true,
        link: {
          text: 'Join beta program',
          url: '#',
          icon: Rocket,
        },
        image:
          'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        id: 'item-7',
        title: 'Mobile Application',
        description: 'Native mobile experience for iOS and Android platforms.',
        date: '2024-03-10',
        formattedDate: 'March 10, 2024',
        icon: RotateCcw,
        status: 'in-progress',
      },
      {
        id: 'item-8',
        title: 'Enhanced Search Functionality',
        description:
          'Powerful search capabilities with filters and saved searches.',
        date: '2024-03-30',
        formattedDate: 'March 30, 2024',
        icon: RotateCcw,
        status: 'in-progress',
      },
    ],
  },
  {
    id: 'future',
    label: 'Planned',
    items: [
      {
        id: 'item-9',
        title: 'Offline Mode',
        description:
          'Work without internet connection with automatic sync when back online.',
        date: '2024-05-15',
        formattedDate: 'May 15, 2024',
        icon: Calendar,
        status: 'planned',
      },
      {
        id: 'item-10',
        title: 'Advanced Workflow Automation',
        description:
          'Create complex automation rules and triggers for your workflows.',
        date: '2024-06-20',
        formattedDate: 'June 20, 2024',
        icon: Calendar,
        status: 'planned',
        isHighlighted: true,
        link: {
          text: 'Submit feedback',
          url: '#',
          icon: Lightbulb,
        },
        image:
          'https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      },
      {
        id: 'item-11',
        title: 'Blockchain Integration',
        description:
          'Secure data verification and transactions using blockchain technology.',
        date: '2024-07-30',
        formattedDate: 'July 30, 2024',
        icon: Calendar,
        status: 'planned',
      },
      {
        id: 'item-12',
        title: 'Extended Language Support',
        description:
          'Adding support for 15 more languages including Arabic and Japanese.',
        date: '2024-08-25',
        formattedDate: 'August 25, 2024',
        icon: Calendar,
        status: 'planned',
      },
    ],
  },
];

// Status config for styling
const statusConfig = {
  released: {
    icon: Check,
    color: 'green',
    label: 'Released',
  },
  'in-progress': {
    icon: RotateCcw,
    color: 'amber',
    label: 'In Progress',
  },
  planned: {
    icon: Calendar,
    color: 'blue',
    label: 'Planned',
  },
};

export default function FeatureTimeline() {
  const [activeTab, setActiveTab] = useState<string>('past');

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Feature Roadmap
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Track our journey of continuous improvement and upcoming features
        </p>
      </div>

      <Tabs
        defaultValue={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            {timelinePeriods.map((period) => (
              <TabsTrigger
                key={period.id}
                value={period.id}
                className="flex items-center gap-2"
              >
                {period.id === 'past' && <Check className="h-4 w-4" />}
                {period.id === 'present' && <Clock className="h-4 w-4" />}
                {period.id === 'future' && <CalendarDays className="h-4 w-4" />}
                {period.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {timelinePeriods.map((period) => (
          <TabsContent key={period.id} value={period.id} className="mt-8">
            <div className="space-y-8">
              {/* Timeline header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {period.id === 'past' && (
                    <CalendarCheck className="h-5 w-5 text-green-500" />
                  )}
                  {period.id === 'present' && (
                    <CircleEllipsis className="h-5 w-5 animate-pulse text-amber-500" />
                  )}
                  {period.id === 'future' && (
                    <Rocket className="h-5 w-5 text-blue-500" />
                  )}
                  <h3 className="text-xl font-bold">
                    {period.id === 'past' && 'Released Features'}
                    {period.id === 'present' && 'Currently In Development'}
                    {period.id === 'future' && 'Upcoming on our Roadmap'}
                  </h3>
                </div>
                <Badge variant="outline" className="px-2 py-1">
                  {period.items.length} feature
                  {period.items.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {/* Timeline items */}
              <div className="border-muted relative ml-3 border-l-2 pl-6">
                {period.items.map((item) => {
                  const StatusIcon = statusConfig[item.status].icon;
                  const statusColor = statusConfig[item.status].color;

                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'relative mb-10 last:mb-0',
                        item.isHighlighted && 'relative'
                      )}
                    >
                      {/* Timeline node */}
                      <div
                        className={cn(
                          'ring-background absolute -left-8 flex h-5 w-5 items-center justify-center rounded-full ring-8',
                          `bg-${statusColor}-100 text-${statusColor}-600 dark:bg-${statusColor}-950 dark:text-${statusColor}-400`
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                      </div>

                      {/* Date badge */}
                      <div className="mb-1 flex items-center text-sm">
                        <time className="text-muted-foreground flex items-center">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          {item.formattedDate}
                        </time>
                        {item.version && (
                          <Badge className="ml-2" variant="outline">
                            v{item.version}
                          </Badge>
                        )}
                        {item.isHighlighted && (
                          <Badge className="ml-2 bg-amber-500 hover:bg-amber-600">
                            <Star className="mr-1 h-3 w-3" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* Main content */}
                      <Card
                        className={cn(
                          'overflow-hidden border p-0',
                          item.isHighlighted && 'border-primary/50 shadow-md'
                        )}
                      >
                        <CardContent className="p-0">
                          {item.image && (
                            <div className="relative h-48 w-full">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover"
                              />
                              <div className="from-background/90 absolute inset-0 bg-gradient-to-t to-transparent" />
                              <div className="absolute bottom-4 left-4">
                                <Badge
                                  className={`bg-${statusColor}-500 hover:bg-${statusColor}-600`}
                                >
                                  {statusConfig[item.status].label}
                                </Badge>
                              </div>
                            </div>
                          )}

                          <div className={cn('p-6', !item.image && 'pt-4')}>
                            {!item.image && (
                              <Badge
                                className={`mb-3 bg-${statusColor}-100 text-${statusColor}-600 hover:bg-${statusColor}-200 dark:bg-${statusColor}-950 dark:text-${statusColor}-400 dark:hover:bg-${statusColor}-900`}
                              >
                                {statusConfig[item.status].label}
                              </Badge>
                            )}

                            <h3 className="mb-2 text-lg font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-muted-foreground">
                              {item.description}
                            </p>

                            {item.link && (
                              <Button asChild variant="outline" size="sm">
                                <a
                                  href={item.link.url}
                                  className="mt-4 inline-flex items-center"
                                >
                                  {item.link.text}
                                  <item.link.icon className="ml-2 h-3.5 w-3.5" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex justify-center pt-8">
        <div className="bg-muted max-w-xl rounded-lg p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary/10 rounded-full p-3">
              <Sparkles className="text-primary h-6 w-6" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-bold">Have a feature request?</h3>
          <p className="text-muted-foreground mb-4">
            We love hearing from our users! Share your ideas for new features or
            improvements.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button variant="outline" asChild>
              <a href="#">
                <Eye className="mr-2 h-4 w-4" />
                View all features
              </a>
            </Button>
            <Button asChild>
              <a href="#">
                <Lightbulb className="mr-2 h-4 w-4" />
                Submit a request
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
