import * as React from 'react';

import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../ui/carousel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  BookOpenIcon,
  BrainCircuitIcon,
  BriefcaseIcon,
  CodeIcon,
  HeartHandshakeIcon,
  LineChartIcon,
  PaletteIcon,
  ShoppingCartIcon,
} from 'lucide-react';

interface Department {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  teamSize: string;
  location: string;
  manager: string;
  keyRoles: string[];
  currentOpenings: number;
  photoGallery: string[];
}

export default function DepartmentShowcase() {
  const departments: Department[] = [
    {
      id: 'engineering',
      name: 'Engineering',
      icon: <CodeIcon className="h-5 w-5" />,
      description:
        "Our engineering team builds and maintains the technology that powers our products. From frontend to backend, infrastructure to data engineering, we're solving complex problems at scale.",
      teamSize: '45+',
      location: 'San Francisco, Remote',
      manager: 'David Chen, CTO',
      keyRoles: [
        'Frontend Engineers',
        'Backend Engineers',
        'DevOps Engineers',
        'QA Engineers',
        'Data Engineers',
      ],
      currentOpenings: 6,
      photoGallery: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 'product',
      name: 'Product',
      icon: <BrainCircuitIcon className="h-5 w-5" />,
      description:
        'Our product team defines and shapes our roadmap, working at the intersection of business strategy, customer needs, and technology capabilities to deliver solutions that delight our users.',
      teamSize: '18',
      location: 'New York, Remote',
      manager: 'Lisa Wong, VP of Product',
      keyRoles: [
        'Product Managers',
        'Product Analysts',
        'User Researchers',
        'Technical Product Managers',
      ],
      currentOpenings: 3,
      photoGallery: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 'design',
      name: 'Design',
      icon: <PaletteIcon className="h-5 w-5" />,
      description:
        'Our design team crafts beautiful, intuitive experiences that bring our products to life. From research to visual design, we ensure every interaction delights our users.',
      teamSize: '12',
      location: 'San Francisco, Remote',
      manager: 'Maya Rodriguez, Design Director',
      keyRoles: [
        'Product Designers',
        'UX Designers',
        'Visual Designers',
        'UI Engineers',
        'Design Systems Specialists',
      ],
      currentOpenings: 2,
      photoGallery: [
        'https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1565022536102-f7645c84354a?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: <LineChartIcon className="h-5 w-5" />,
      description:
        'Our marketing team builds our brand, engages our audience, and drives growth. From content creation to demand generation, we connect our products with the people who need them most.',
      teamSize: '15',
      location: 'New York, Remote',
      manager: 'Emma Lewis, CMO',
      keyRoles: [
        'Content Marketers',
        'Growth Marketers',
        'Brand Designers',
        'Social Media Specialists',
        'SEO Specialists',
      ],
      currentOpenings: 4,
      photoGallery: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 'sales',
      name: 'Sales',
      icon: <ShoppingCartIcon className="h-5 w-5" />,
      description:
        "Our sales team builds relationships with customers and helps them discover how our products can solve their challenges. We're consultative partners focused on delivering value.",
      teamSize: '20',
      location: 'San Francisco, New York, Chicago, Remote',
      manager: 'Michael Stevens, VP of Sales',
      keyRoles: [
        'Account Executives',
        'Sales Development Representatives',
        'Solutions Consultants',
        'Sales Operations',
      ],
      currentOpenings: 5,
      photoGallery: [
        'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2149&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 'customer-success',
      name: 'Customer Success',
      icon: <HeartHandshakeIcon className="h-5 w-5" />,
      description:
        "Our customer success team ensures our customers achieve their goals using our products. We're trusted advisors who help customers get maximum value from their investment.",
      teamSize: '16',
      location: 'Austin, Remote',
      manager: 'Daniel Jackson, Head of Customer Success',
      keyRoles: [
        'Customer Success Managers',
        'Implementation Specialists',
        'Customer Support Engineers',
        'Technical Account Managers',
      ],
      currentOpenings: 3,
      photoGallery: [
        'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
    {
      id: 'people',
      name: 'People',
      icon: <BookOpenIcon className="h-5 w-5" />,
      description:
        'Our people team builds our culture and supports our employees through their journey with us. From recruiting to professional development, we ensure our team members thrive.',
      teamSize: '10',
      location: 'San Francisco, Remote',
      manager: 'Sarah Lee, Head of People',
      keyRoles: [
        'Recruiters',
        'HR Business Partners',
        'Learning & Development Specialists',
        'People Operations',
      ],
      currentOpenings: 2,
      photoGallery: [
        'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">
          Our Departments
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Learn about the teams that make up our company and find the perfect
          fit for your skills and interests.
        </p>
      </div>

      <Tabs defaultValue={departments[0]!.id} className="w-full">
        <div className="mb-8 overflow-x-auto">
          <TabsList className="inline-flex h-10 w-auto">
            {departments.map((dept) => (
              <TabsTrigger
                key={dept.id}
                value={dept.id}
                className="flex items-center gap-2 px-4"
              >
                <span className="hidden sm:inline">{dept.icon}</span>
                <span>{dept.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {departments.map((dept) => (
          <TabsContent
            key={dept.id}
            value={dept.id}
            className="animate-in fade-in-50 duration-300"
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-6 flex items-center">
                  <div className="bg-primary/10 text-primary mr-3 flex h-10 w-10 items-center justify-center rounded-full">
                    {dept.icon}
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {dept.name}
                  </h3>
                </div>

                <p className="mb-6 text-lg">{dept.description}</p>

                <div className="mb-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <div className="text-muted-foreground mb-2 text-sm font-medium">
                      Team Size
                    </div>
                    <div className="text-lg font-medium">{dept.teamSize}</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-muted-foreground mb-2 text-sm font-medium">
                      Locations
                    </div>
                    <div className="text-lg font-medium">{dept.location}</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-muted-foreground mb-2 text-sm font-medium">
                      Lead By
                    </div>
                    <div className="text-lg font-medium">{dept.manager}</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-muted-foreground mb-2 text-sm font-medium">
                      Open Positions
                    </div>
                    <div className="text-lg font-medium">
                      {dept.currentOpenings}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-medium">Key Roles</h4>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {dept.keyRoles.map((role, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <BriefcaseIcon className="h-4 w-4" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="rounded-full" asChild>
                  <a href="#">View Open Positions in {dept.name}</a>
                </Button>
              </div>

              <div>
                <div className="mb-4 overflow-hidden rounded-xl border shadow-sm">
                  <img
                    src={dept.photoGallery[0]}
                    alt={`${dept.name} Team`}
                    width={800}
                    height={500}
                    className="h-60 w-full object-cover md:h-80"
                  />
                </div>

                <Carousel className="w-full">
                  <CarouselContent>
                    {dept.photoGallery.map((photo, index) => (
                      <CarouselItem key={index} className="basis-1/3">
                        <Card className="border-0 p-0 shadow-none">
                          <CardContent className="flex aspect-square items-center justify-center p-1">
                            <img
                              src={photo}
                              alt={`${dept.name} Team ${index + 1}`}
                              width={300}
                              height={300}
                              className="h-full w-full rounded-md object-cover"
                            />
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex justify-end gap-2">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="bg-muted/50 mt-16 rounded-xl p-8 text-center">
        <h3 className="text-primary mb-2 text-xl font-semibold">
          Join Our Growing Team
        </h3>
        <p className="text-muted-foreground mx-auto mb-6 max-w-2xl">
          We&apos;re always looking for talented individuals across all our
          departments. Check out our current openings and find your place with
          us.
        </p>
        <Button size="lg" asChild>
          <a href="#">View All Open Positions</a>
        </Button>
      </div>
    </div>
  );
}
