import { Badge } from '../../../ui/badge';
import { cn } from '@/arc-shims/kit-utils';
import {
  Activity,
  ArrowRight,
  Award,
  BarChart,
  CalendarDays,
  Users,
} from 'lucide-react';

type Milestone = {
  id: string;
  year: string;
  title: string;
  description: string;
  metric: {
    value: string;
    label: string;
  };
  icon: React.ReactNode;
};

const milestones: Milestone[] = [
  {
    id: 'launch',
    year: '2018',
    title: 'Company Founded',
    description: 'Started with a small team of 5 passionate individuals',
    metric: {
      value: '5',
      label: 'Team Members',
    },
    icon: <CalendarDays className="h-8 w-8" />,
  },
  {
    id: 'first-customers',
    year: '2019',
    title: 'First 100 Customers',
    description: 'Achieved product-market fit and began scaling operations',
    metric: {
      value: '100+',
      label: 'Early Adopters',
    },
    icon: <Users className="h-8 w-8" />,
  },
  {
    id: 'series-a',
    year: '2020',
    title: 'Series A Funding',
    description: 'Secured $8M in funding to accelerate growth and development',
    metric: {
      value: '$8M',
      label: 'Raised',
    },
    icon: <BarChart className="h-8 w-8" />,
  },
  {
    id: 'expansion',
    year: '2021',
    title: 'International Expansion',
    description: 'Expanded to 12 countries across Europe, Asia, and Australia',
    metric: {
      value: '12',
      label: 'Countries',
    },
    icon: <Activity className="h-8 w-8" />,
  },
  {
    id: 'acquisition',
    year: '2022',
    title: 'Strategic Acquisition',
    description: 'Acquired leading analytics provider to enhance our platform',
    metric: {
      value: '2x',
      label: 'Product Growth',
    },
    icon: <Award className="h-8 w-8" />,
  },
  {
    id: 'unicorn',
    year: '2023',
    title: 'Unicorn Status',
    description:
      'Reached $1B valuation with 10,000+ enterprise customers worldwide',
    metric: {
      value: '10K+',
      label: 'Enterprise Clients',
    },
    icon: <Award className="h-8 w-8" />,
  },
];

export default function GrowthTimeline() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Badge className="mb-4">Our Journey</Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Growing From Startup to Industry Leader
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Track our exponential growth journey from a small startup to
            becoming the market leader.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-24">
          {/* Timeline line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 w-px transform md:left-1/2 md:-translate-x-1/2" />

          {/* Timeline items */}
          <div className="relative space-y-12 md:space-y-24">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={cn(
                  'flex flex-col gap-8 md:flex-row md:gap-0',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
              >
                {/* Content */}
                <div className="ml-6 flex flex-col items-start md:ml-0 md:w-1/2 md:px-8">
                  <div className="bg-muted mb-4 inline-flex h-9 w-20 items-center justify-center rounded-full text-sm font-semibold">
                    {milestone.year}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{milestone.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {milestone.description}
                  </p>

                  <div className="bg-background flex items-center gap-4 rounded-lg border p-4 shadow-sm">
                    <div className="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                      {milestone.icon}
                    </div>
                    <div>
                      <div className="text-primary text-3xl font-bold">
                        {milestone.metric.value}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {milestone.metric.label}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline point */}
                <div className="absolute left-0 flex -translate-x-1/2 transform items-center justify-center md:left-1/2">
                  <div className="border-background bg-primary h-5 w-5 rounded-full border-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current stats */}
        <div className="bg-muted mt-24 rounded-lg p-8">
          <h3 className="mb-6 text-center text-2xl font-bold">
            Where We Are Today
          </h3>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                $1B+
              </div>
              <p className="text-muted-foreground font-medium">
                Company Valuation
              </p>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                180+
              </div>
              <p className="text-muted-foreground font-medium">Team Members</p>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                24
              </div>
              <p className="text-muted-foreground font-medium">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                12K+
              </div>
              <p className="text-muted-foreground font-medium">
                Global Customers
              </p>
            </div>
          </div>
        </div>

        {/* Future */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold">
            The Future Is Even Brighter
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            We&apos;re just getting started. Our roadmap includes expansion to
            new markets, enhanced product offerings, and continued innovation to
            serve our growing customer base.
          </p>
          <a
            href="#"
            className="text-primary inline-flex items-center font-medium hover:underline"
          >
            View our roadmap
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
