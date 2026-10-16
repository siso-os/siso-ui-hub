import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  BriefcaseIcon,
  Database,
  Globe,
  LineChart,
  Paintbrush,
  Server,
  Users,
} from 'lucide-react';

interface CareerStep {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  requirements: string[];
}

interface CareerPath {
  id: string;
  department: string;
  icon: React.ReactNode;
  description: string;
  steps: CareerStep[];
}

export default function CareerPath() {
  const careerPaths: CareerPath[] = [
    {
      id: 'engineering',
      department: 'Engineering',
      icon: <Server className="h-6 w-6" />,
      description:
        "Build, scale, and maintain our technology infrastructure and applications, pushing the boundaries of what's possible.",
      steps: [
        {
          id: 'eng-1',
          title: 'Junior Developer',
          description:
            'Start your journey by contributing to features and fixing bugs under the guidance of senior team members.',
          timeframe: '0-2 years',
          requirements: [
            'CS degree or equivalent experience',
            'Knowledge of at least one programming language',
            'Understanding of basic data structures and algorithms',
            'Eagerness to learn and grow',
          ],
        },
        {
          id: 'eng-2',
          title: 'Mid-Level Developer',
          description:
            'Take ownership of features and collaborate on architectural decisions for product components.',
          timeframe: '2-4 years',
          requirements: [
            'Strong programming skills in multiple languages',
            'Experience building production-ready features',
            'Understanding of testing and deployment',
            'Ability to mentor junior developers',
          ],
        },
        {
          id: 'eng-3',
          title: 'Senior Developer',
          description:
            'Lead technical implementation across projects and mentor other team members while solving complex problems.',
          timeframe: '4-6 years',
          requirements: [
            'Deep expertise in core technologies',
            'System design and architecture experience',
            'Performance optimization skills',
            'Excellent communication and leadership',
          ],
        },
        {
          id: 'eng-4',
          title: 'Principal Engineer',
          description:
            'Shape technical strategy, establish best practices, and lead critical initiatives across engineering.',
          timeframe: '6+ years',
          requirements: [
            'Record of leading complex technical projects',
            'Cross-team collaboration experience',
            'Technical vision and roadmap planning',
            'Influence across the organization',
          ],
        },
      ],
    },
    {
      id: 'design',
      department: 'Design',
      icon: <Paintbrush className="h-6 w-6" />,
      description:
        'Create intuitive, beautiful, and accessible user experiences that delight our customers and solve their problems.',
      steps: [
        {
          id: 'design-1',
          title: 'Junior Designer',
          description:
            'Support design projects by creating assets, conducting research, and learning our design system.',
          timeframe: '0-2 years',
          requirements: [
            'Design degree or equivalent experience',
            'Proficiency in design tools like Figma',
            'Basic understanding of UX principles',
            'Solid visual design fundamentals',
          ],
        },
        {
          id: 'design-2',
          title: 'Product Designer',
          description:
            'Take ownership of design projects, from research through implementation, working closely with product teams.',
          timeframe: '2-4 years',
          requirements: [
            'Strong UX research and design skills',
            'Ability to translate user needs into design solutions',
            'Collaboration with developers on implementation',
            'Experience with design systems',
          ],
        },
        {
          id: 'design-3',
          title: 'Senior Designer',
          description:
            'Lead design strategy for product areas, mentor junior designers, and improve our design processes.',
          timeframe: '4-6 years',
          requirements: [
            'Deep expertise in product and interaction design',
            'Experience leading design projects',
            'Strong facilitation and communication skills',
            'Strategic thinking and problem-solving',
          ],
        },
        {
          id: 'design-4',
          title: 'Design Director',
          description:
            'Shape our design vision, build and lead teams, and ensure design quality across all products.',
          timeframe: '6+ years',
          requirements: [
            'Leadership experience in design',
            'Strategic vision for product design',
            'Cross-functional collaboration at executive level',
            'Team building and mentorship',
          ],
        },
      ],
    },
    {
      id: 'product',
      department: 'Product',
      icon: <Globe className="h-6 w-6" />,
      description:
        'Define product vision, gather customer insights, and coordinate development to deliver solutions that users love.',
      steps: [
        {
          id: 'product-1',
          title: 'Associate Product Manager',
          description:
            'Learn product development by supporting features, conducting research, and working with cross-functional teams.',
          timeframe: '0-2 years',
          requirements: [
            'Understanding of product development',
            'Analytical and problem-solving skills',
            'Strong communication abilities',
            'Customer-focused mindset',
          ],
        },
        {
          id: 'product-2',
          title: 'Product Manager',
          description:
            'Own product features end-to-end, from ideation to launch, collaborating closely with design and engineering.',
          timeframe: '2-4 years',
          requirements: [
            'Experience shipping successful products/features',
            'Data analysis and experimentation skills',
            'User research and requirements gathering',
            'Cross-functional collaboration',
          ],
        },
        {
          id: 'product-3',
          title: 'Senior Product Manager',
          description:
            'Lead product strategy for major areas, drive business outcomes, and mentor other product managers.',
          timeframe: '4-6 years',
          requirements: [
            'Strategic product planning experience',
            'Strong business acumen and market awareness',
            'Experience leading product teams',
            'Stakeholder management skills',
          ],
        },
        {
          id: 'product-4',
          title: 'Director of Product',
          description:
            'Define product vision, build and lead product teams, and align product strategy with company goals.',
          timeframe: '6+ years',
          requirements: [
            'Proven track record of product leadership',
            'Experience building and growing product teams',
            'Strategic thinking and roadmap planning',
            'Executive-level communication skills',
          ],
        },
      ],
    },
    {
      id: 'data',
      department: 'Data',
      icon: <Database className="h-6 w-6" />,
      description:
        'Transform raw data into actionable insights that drive business decisions and improve our products.',
      steps: [
        {
          id: 'data-1',
          title: 'Data Analyst',
          description:
            'Analyze data to answer business questions, create dashboards, and support decision-making.',
          timeframe: '0-2 years',
          requirements: [
            'SQL and data analysis skills',
            'Experience with visualization tools',
            'Understanding of statistics',
            'Strong problem-solving ability',
          ],
        },
        {
          id: 'data-2',
          title: 'Data Scientist',
          description:
            'Apply advanced analytics, statistical modeling, and machine learning to extract insights from data.',
          timeframe: '2-4 years',
          requirements: [
            'Statistics and machine learning knowledge',
            'Programming in Python or R',
            'Data wrangling and preparation skills',
            'Experience with real-world data problems',
          ],
        },
        {
          id: 'data-3',
          title: 'Senior Data Scientist',
          description:
            'Lead complex data initiatives, develop advanced models, and mentor data team members.',
          timeframe: '4-6 years',
          requirements: [
            'Deep expertise in machine learning and statistics',
            'Experience deploying models to production',
            'Cross-functional project leadership',
            'Business strategy and impact focus',
          ],
        },
        {
          id: 'data-4',
          title: 'Data Science Director',
          description:
            'Shape data strategy, build and lead teams, and define how data drives product and business decisions.',
          timeframe: '6+ years',
          requirements: [
            'Leadership experience in data functions',
            'Strategic thinking and organizational impact',
            'Team building and development',
            'Executive communication skills',
          ],
        },
      ],
    },
    {
      id: 'marketing',
      department: 'Marketing',
      icon: <LineChart className="h-6 w-6" />,
      description:
        'Build brand awareness, generate demand, and craft compelling stories that connect with our target audience.',
      steps: [
        {
          id: 'marketing-1',
          title: 'Marketing Associate',
          description:
            'Support marketing campaigns, create content, and learn about our market, customers, and products.',
          timeframe: '0-2 years',
          requirements: [
            'Marketing fundamentals knowledge',
            'Strong written and verbal communication',
            'Basic content creation skills',
            'Analytical mindset',
          ],
        },
        {
          id: 'marketing-2',
          title: 'Marketing Manager',
          description:
            'Develop and execute marketing strategies for specific channels or product areas.',
          timeframe: '2-4 years',
          requirements: [
            'Experience running successful marketing campaigns',
            'Channel expertise (content, digital, events, etc.)',
            'Project management abilities',
            'Results measurement and optimization',
          ],
        },
        {
          id: 'marketing-3',
          title: 'Senior Marketing Manager',
          description:
            'Lead cross-channel marketing strategies, manage campaigns end-to-end, and mentor team members.',
          timeframe: '4-6 years',
          requirements: [
            'Strategic marketing planning experience',
            'Budget management',
            'Team leadership skills',
            'Cross-functional collaboration',
          ],
        },
        {
          id: 'marketing-4',
          title: 'Marketing Director',
          description:
            'Define marketing vision, build high-performing teams, and align marketing with company objectives.',
          timeframe: '6+ years',
          requirements: [
            'Proven marketing leadership experience',
            'Strategic thinking and brand development',
            'Team building and mentorship',
            'Budget planning and resource allocation',
          ],
        },
      ],
    },
    {
      id: 'customer-success',
      department: 'Customer Success',
      icon: <Users className="h-6 w-6" />,
      description:
        'Ensure customers achieve their goals using our products through education, support, and relationship building.',
      steps: [
        {
          id: 'cs-1',
          title: 'Customer Support Specialist',
          description:
            'Provide frontline support to customers, solve problems, and ensure a positive experience.',
          timeframe: '0-2 years',
          requirements: [
            'Strong communication skills',
            'Problem-solving ability',
            'Empathy and customer focus',
            'Technical aptitude',
          ],
        },
        {
          id: 'cs-2',
          title: 'Customer Success Manager',
          description:
            'Own customer relationships, drive product adoption, and ensure customer satisfaction and retention.',
          timeframe: '2-4 years',
          requirements: [
            'Relationship management experience',
            'Deep product knowledge',
            'Ability to understand customer goals',
            'Proactive problem resolution',
          ],
        },
        {
          id: 'cs-3',
          title: 'Senior Customer Success Manager',
          description:
            'Manage strategic customer relationships, develop customer success playbooks, and mentor team members.',
          timeframe: '4-6 years',
          requirements: [
            'Track record of customer retention and growth',
            'Strategic thinking and planning',
            'Experience with complex customer situations',
            'Leadership and mentoring skills',
          ],
        },
        {
          id: 'cs-4',
          title: 'Customer Success Director',
          description:
            'Build customer success strategy, lead teams, and ensure customer success contributes to business growth.',
          timeframe: '6+ years',
          requirements: [
            'Leadership experience in customer-facing roles',
            'Strategic planning and execution',
            'Team building and development',
            'Cross-departmental collaboration',
          ],
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          Growth Opportunities
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We believe in providing clear career paths for all employees. Explore
          the growth opportunities available in different departments.
        </p>
      </div>

      <Tabs defaultValue={careerPaths[0]!.id} className="w-full">
        <div className="mb-8 overflow-x-auto">
          <TabsList className="inline-flex w-auto">
            {careerPaths.map((path) => (
              <TabsTrigger
                key={path.id}
                value={path.id}
                className="flex items-center gap-2"
              >
                {path.icon}
                <span className="hidden sm:inline">{path.department}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {careerPaths.map((path) => (
          <TabsContent key={path.id} value={path.id} className="space-y-8">
            <div className="flex flex-col">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12">
                  {path.icon}
                </div>
                <div>
                  <h3 className="mt-2 text-xl font-semibold sm:mt-0">
                    {path.department} Career Path
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {path.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-8 md:grid-cols-2 lg:grid-cols-4">
                {path.steps.map((step) => (
                  <Card key={step.id} className="relative">
                    <CardHeader>
                      <div className="bg-primary/10 text-primary mb-2 flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10">
                        <BriefcaseIcon className="h-5 w-5" />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription className="text-primary font-medium">
                        {step.timeframe}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-sm">
                        {step.description}
                      </p>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Key Requirements:
                        </h4>
                        <ul className="text-muted-foreground text-sm">
                          {step.requirements.map((req, i) => (
                            <li key={i} className="mb-1 flex items-start">
                              <span className="bg-primary/70 mt-1 mr-2 block h-1.5 w-1.5 rounded-full"></span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
