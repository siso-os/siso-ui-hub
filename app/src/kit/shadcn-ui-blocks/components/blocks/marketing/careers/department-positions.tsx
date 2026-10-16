import * as React from 'react';

import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import {
  BriefcaseIcon,
  MapPinIcon,
  UsersIcon,
  ArrowRightIcon,
  ChevronRightIcon,
  BuildingIcon,
} from 'lucide-react';

type JobPositionId = string;

interface JobPosition {
  id: JobPositionId;
  title: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  description: string;
  featured: boolean;
}

interface Department {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  teamSize: number;
  positions: JobPosition[];
}

export default function DepartmentPositions() {
  const departments: Department[] = [
    {
      id: 'engineering',
      name: 'Engineering',
      description:
        'Build innovative solutions that scale to millions of users worldwide.',
      icon: <BuildingIcon className="h-6 w-6" />,
      teamSize: 48,
      positions: [
        {
          id: 'senior-frontend-engineer',
          title: 'Senior Frontend Engineer',
          location: 'San Francisco, CA',
          locationType: 'hybrid',
          employmentType: 'full-time',
          salary: '$130,000 - $160,000',
          description:
            "We're looking for a Senior Frontend Engineer to join our team and help build the next generation of our web applications. You'll work with React, TypeScript, and GraphQL to create fast, responsive, and user-friendly interfaces.",
          featured: true,
        },
        {
          id: 'backend-engineer',
          title: 'Backend Engineer',
          location: 'Remote',
          locationType: 'remote',
          employmentType: 'full-time',
          salary: '$120,000 - $150,000',
          description:
            "Join our backend team to design and implement scalable APIs and services. You'll work with Node.js, Express, and PostgreSQL to build the foundation of our products.",
          featured: false,
        },
        {
          id: 'devops-engineer',
          title: 'DevOps Engineer',
          location: 'Seattle, WA',
          locationType: 'hybrid',
          employmentType: 'full-time',
          salary: '$125,000 - $155,000',
          description:
            "Help us build and maintain our cloud infrastructure, CI/CD pipelines, and developer tools. You'll work with Kubernetes, AWS, and Terraform to ensure our systems are reliable and efficient.",
          featured: false,
        },
        {
          id: 'data-engineer',
          title: 'Data Engineer',
          location: 'Remote',
          locationType: 'remote',
          employmentType: 'full-time',
          salary: '$120,000 - $150,000',
          description:
            "Join our data team to build data pipelines and infrastructure. You'll work with BigQuery, Airflow, and Python to ensure data is available, reliable, and actionable.",
          featured: false,
        },
      ],
    },
    {
      id: 'product',
      name: 'Product',
      description:
        'Define the product roadmap and bring innovative ideas to life.',
      icon: <BriefcaseIcon className="h-6 w-6" />,
      teamSize: 15,
      positions: [
        {
          id: 'product-manager',
          title: 'Product Manager',
          location: 'New York, NY',
          locationType: 'hybrid',
          employmentType: 'full-time',
          salary: '$120,000 - $150,000',
          description:
            "We're looking for a Product Manager to help define our product roadmap and work with engineering and design to bring new features to market. You'll be responsible for understanding user needs, defining requirements, and measuring success.",
          featured: true,
        },
        {
          id: 'product-designer',
          title: 'Product Designer',
          location: 'San Francisco, CA',
          locationType: 'onsite',
          employmentType: 'full-time',
          salary: '$110,000 - $140,000',
          description:
            "Join our design team to create beautiful, intuitive interfaces for our products. You'll work closely with product and engineering to ensure our products are easy to use and visually appealing.",
          featured: false,
        },
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description:
        'Share our story with the world and drive customer acquisition.',
      icon: <UsersIcon className="h-6 w-6" />,
      teamSize: 12,
      positions: [
        {
          id: 'growth-marketing-manager',
          title: 'Growth Marketing Manager',
          location: 'Boston, MA',
          locationType: 'hybrid',
          employmentType: 'full-time',
          salary: '$95,000 - $120,000',
          description:
            "We're looking for a Growth Marketing Manager to drive customer acquisition and retention. You'll be responsible for designing and executing marketing campaigns across various channels, including paid advertising, email, and social media.",
          featured: false,
        },
        {
          id: 'content-marketing-specialist',
          title: 'Content Marketing Specialist',
          location: 'Remote',
          locationType: 'remote',
          employmentType: 'full-time',
          salary: '$80,000 - $100,000',
          description:
            "Join our marketing team to create compelling content that educates and inspires our audience. You'll be responsible for blog posts, case studies, whitepapers, and other content that drives engagement and conversions.",
          featured: false,
        },
      ],
    },
    {
      id: 'sales',
      name: 'Sales',
      description:
        'Connect with customers and help them succeed with our products.',
      icon: <MapPinIcon className="h-6 w-6" />,
      teamSize: 20,
      positions: [
        {
          id: 'account-executive',
          title: 'Account Executive',
          location: 'Chicago, IL',
          locationType: 'hybrid',
          employmentType: 'full-time',
          salary: '$80,000 - $100,000 + Commission',
          description:
            "We're looking for an Account Executive to join our sales team and help drive revenue growth. You'll be responsible for prospecting, qualifying, and closing deals with new customers.",
          featured: true,
        },
        {
          id: 'sales-development-representative',
          title: 'Sales Development Representative',
          location: 'New York, NY',
          locationType: 'onsite',
          employmentType: 'full-time',
          salary: '$60,000 - $75,000 + Commission',
          description:
            "Join our sales team to identify and qualify new sales opportunities. You'll be the first point of contact for potential customers and will work closely with Account Executives to move deals forward.",
          featured: false,
        },
        {
          id: 'customer-success-manager',
          title: 'Customer Success Manager',
          location: 'Remote',
          locationType: 'remote',
          employmentType: 'full-time',
          salary: '$85,000 - $110,000',
          description:
            "Help our customers get the most value from our products. You'll be responsible for onboarding, training, and ongoing support to ensure customer satisfaction and retention.",
          featured: false,
        },
      ],
    },
    {
      id: 'hr',
      name: 'Human Resources',
      description: 'Build and nurture our company culture and talent.',
      icon: <UsersIcon className="h-6 w-6" />,
      teamSize: 8,
      positions: [
        {
          id: 'talent-acquisition-specialist',
          title: 'Talent Acquisition Specialist',
          location: 'San Francisco, CA',
          locationType: 'hybrid',
          employmentType: 'full-time',
          salary: '$85,000 - $105,000',
          description:
            "We're looking for a Talent Acquisition Specialist to help us find and hire the best talent. You'll be responsible for sourcing, screening, and interviewing candidates for roles across the company.",
          featured: false,
        },
        {
          id: 'people-operations-coordinator',
          title: 'People Operations Coordinator',
          location: 'Remote',
          locationType: 'remote',
          employmentType: 'part-time',
          salary: '$50,000 - $65,000',
          description:
            'Support our HR team with day-to-day operations, including onboarding, benefits administration, and employee engagement initiatives.',
          featured: false,
        },
      ],
    },
  ];

  const totalOpenPositions = departments.reduce(
    (sum, dept) => sum + dept.positions.length,
    0
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight">
          Join Our Team
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We&apos;re on a mission to build products that make a difference.
          Explore our open positions and find your next opportunity.
        </p>
        <div className="mt-6">
          <Badge className="bg-primary px-3 py-1.5 text-sm text-white">
            {totalOpenPositions} Open Positions
          </Badge>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-6">
        {departments.map((department) => (
          <AccordionItem
            key={department.id}
            value={department.id}
            className="border-muted overflow-hidden rounded-lg border"
          >
            <AccordionTrigger className="data-[state=open]:bg-muted/30 px-6 py-4 hover:no-underline">
              <div className="flex w-full items-center gap-4 text-left">
                <div className="bg-primary/10 text-primary flex-shrink-0 rounded-lg p-2">
                  {department.icon}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold">{department.name}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {department.description}
                  </p>
                </div>
                <div className="hidden flex-shrink-0 items-center gap-3 md:flex">
                  <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                    <UsersIcon className="h-4 w-4" />
                    <span>{department.teamSize} Team Members</span>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {department.positions.length}{' '}
                    {department.positions.length === 1
                      ? 'Position'
                      : 'Positions'}
                  </Badge>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-0">
              <div className="grid gap-4 p-6 pt-2">
                {department.positions.map((position) => (
                  <Card
                    key={position.id}
                    className={
                      position.featured ? 'border-primary/50 bg-primary/5' : ''
                    }
                  >
                    <CardContent className="p-5">
                      <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <div className="mb-1.5 flex items-center gap-2">
                            <h3 className="text-lg font-semibold">
                              {position.title}
                            </h3>
                            {position.featured && (
                              <Badge className="bg-primary text-white">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm">
                            <div className="flex items-center gap-1">
                              <MapPinIcon className="h-4 w-4" />
                              <span>{position.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="bg-muted">
                                {position.locationType === 'remote'
                                  ? 'Remote'
                                  : position.locationType === 'hybrid'
                                    ? 'Hybrid'
                                    : 'On-site'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              <Badge variant="outline" className="bg-muted">
                                {position.employmentType === 'full-time'
                                  ? 'Full-time'
                                  : position.employmentType === 'part-time'
                                    ? 'Part-time'
                                    : position.employmentType === 'contract'
                                      ? 'Contract'
                                      : 'Internship'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className="whitespace-nowrap"
                          >
                            {position.salary}
                          </Badge>
                          <Button size="sm" className="whitespace-nowrap">
                            Apply <ChevronRightIcon className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground">
                        {position.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="bg-muted/30 flex items-center justify-between p-4">
                <p className="text-muted-foreground text-sm">
                  Interested in {department.name.toLowerCase()} but don&apos;t
                  see the right role?
                </p>
                <a
                  href={`/careers/${department.id}`}
                  className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  View Department
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="bg-muted/30 mt-16 rounded-lg p-8 text-center">
        <h3 className="mb-3 text-xl font-semibold">
          Don&apos;t see the perfect role?
        </h3>
        <p className="text-muted-foreground mx-auto mb-6 max-w-xl">
          We&apos;re always looking for talented individuals who are passionate
          about our mission. Send us your resume and we&apos;ll keep you in mind
          for future opportunities.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button variant="outline">Join Our Talent Community</Button>
          <Button>
            Send Your Resume
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
