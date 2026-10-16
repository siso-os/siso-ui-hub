import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Badge } from '../../../ui/badge';
import {
  UsersIcon,
  GlobeIcon,
  HeartHandshakeIcon,
  MedalIcon,
  UserPlusIcon,
  BarChartIcon,
} from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

// Define types for DEI initiatives
type Initiative = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  metrics?: {
    value: string;
    label: string;
  }[];
  image?: string;
};

// Define categories
type Category = {
  id: string;
  title: string;
  description: string;
  initiatives: Initiative[];
};

const categories: Category[] = [
  {
    id: 'workplace',
    title: 'Inclusive Workplace',
    description:
      'Creating an environment where everyone feels welcome, respected, and able to contribute their best work.',
    initiatives: [
      {
        id: 'hiring',
        title: 'Inclusive Hiring',
        description:
          'We&apos;ve implemented structured interviewing and blind resume reviews to minimize bias in our hiring process. Our job descriptions are crafted to be inclusive, and we partner with organizations focused on underrepresented groups in tech.',
        icon: UserPlusIcon,
        metrics: [
          { value: '45%', label: 'Women in leadership' },
          { value: '38%', label: 'Employees from underrepresented groups' },
          { value: '30+', label: 'Countries represented' },
        ],
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200',
      },
      {
        id: 'education',
        title: 'Ongoing Education',
        description:
          'Regular workshops, training sessions, and open discussions that help our team understand the importance of diversity and how to be more inclusive in their daily interactions.',
        icon: GlobeIcon,
        metrics: [
          { value: '100%', label: 'Employees trained in DEI' },
          { value: '12', label: 'DEI workshops per year' },
          { value: '4.8/5', label: 'Average workshop rating' },
        ],
      },
      {
        id: 'ergs',
        title: 'Employee Resource Groups',
        description:
          'We support and fund employee-led groups that foster a diverse, inclusive workplace aligned with our organizational values. These groups serve as resources for employees and the company.',
        icon: UsersIcon,
        metrics: [
          { value: '9', label: 'Active ERGs' },
          { value: '68%', label: 'Employee participation' },
          { value: '$150K', label: 'Annual ERG funding' },
        ],
        image:
          'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1200',
      },
    ],
  },
  {
    id: 'product',
    title: 'Inclusive Products',
    description:
      'Designing products and services that work for everyone, regardless of background or ability.',
    initiatives: [
      {
        id: 'accessibility',
        title: 'Accessibility Standards',
        description:
          'Our product teams adhere to WCAG 2.1 AA standards at minimum. We regularly conduct accessibility audits and include people with disabilities in our user testing to ensure our products work for everyone.',
        icon: HeartHandshakeIcon,
        metrics: [
          { value: '100%', label: 'WCAG 2.1 AA compliance' },
          { value: 'Quarterly', label: 'Accessibility audits' },
          { value: '15+', label: 'Inclusive design patterns' },
        ],
        image:
          'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200',
      },
      {
        id: 'localization',
        title: 'Global Localization',
        description:
          'We design our products with global audiences in mind, accounting for cultural differences, language nuances, and regional preferences to create truly inclusive experiences.',
        icon: GlobeIcon,
        metrics: [
          { value: '24', label: 'Supported languages' },
          { value: '95%', label: 'Translation coverage' },
          { value: '12', label: 'Localization specialists' },
        ],
      },
      {
        id: 'diverse-testing',
        title: 'Diverse User Testing',
        description:
          'We ensure our user research and testing includes diverse participants across demographics, abilities, and backgrounds to capture a wide range of perspectives and needs.',
        icon: UsersIcon,
        metrics: [
          { value: '500+', label: 'Diverse testers' },
          { value: '40+', label: 'Countries represented' },
          { value: '20%', label: 'Testers with disabilities' },
        ],
        image:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200',
      },
    ],
  },
  {
    id: 'community',
    title: 'Community Impact',
    description:
      'Extending our commitment beyond our company to create positive change in the broader community.',
    initiatives: [
      {
        id: 'partnerships',
        title: 'Strategic Partnerships',
        description:
          'We collaborate with organizations that promote diversity in tech and education, providing funding, volunteer hours, and expertise to support their important work.',
        icon: HeartHandshakeIcon,
        metrics: [
          { value: '15+', label: 'Partner organizations' },
          { value: '$2M', label: 'Annual contributions' },
          { value: '5,000+', label: 'Volunteer hours' },
        ],
        image:
          'https://images.unsplash.com/photo-1556484687-30636164638b?q=80&w=1200',
      },
      {
        id: 'education',
        title: 'Education Initiatives',
        description:
          'We run programs that introduce technology careers to underrepresented groups, including coding camps, mentorship programs, and scholarships for promising students.',
        icon: UsersIcon,
        metrics: [
          { value: '250', label: 'Annual scholarships' },
          { value: '1,200+', label: 'Students mentored' },
          { value: '85%', label: 'Program graduation rate' },
        ],
      },
      {
        id: 'supplier-diversity',
        title: 'Supplier Diversity',
        description:
          'We actively seek to work with diverse suppliers and vendors, ensuring our procurement practices reflect our commitment to economic inclusion.',
        icon: BarChartIcon,
        metrics: [
          { value: '32%', label: 'Diverse suppliers' },
          { value: '$12M+', label: 'Annual diverse spend' },
          { value: '4×', label: 'Growth in 3 years' },
        ],
        image:
          'https://images.unsplash.com/photo-1566669437687-7040a6926753?q=80&w=1200',
      },
    ],
  },
  {
    id: 'transparency',
    title: 'Transparency & Progress',
    description:
      'Measuring our progress, holding ourselves accountable, and sharing our journey openly.',
    initiatives: [
      {
        id: 'reporting',
        title: 'Public Reporting',
        description:
          'We publish annual diversity reports that share our demographics, goals, successes, and areas for improvement. We believe transparency drives accountability and progress.',
        icon: BarChartIcon,
        metrics: [
          { value: '5', label: 'Years of public reporting' },
          { value: '12', label: 'Tracked metrics' },
          { value: 'Quarterly', label: 'Internal updates' },
        ],
        image:
          'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1200',
      },
      {
        id: 'goals',
        title: 'Measurable Goals',
        description:
          'We set specific, measurable goals for diversity, equity, and inclusion across all aspects of our business, with executive accountability for progress.',
        icon: MedalIcon,
        metrics: [
          { value: '15%', label: 'YoY diversity growth' },
          { value: '100%', label: 'Pay equity achieved' },
          { value: '90%', label: 'Belonging index score' },
        ],
      },
      {
        id: 'recognition',
        title: 'External Recognition',
        description:
          "While we don't pursue DEI work for awards, we're proud to be recognized for our efforts by independent organizations that evaluate workplace equality.",
        icon: MedalIcon,
        metrics: [
          { value: 'Top 10', label: 'Most inclusive employers' },
          { value: '100%', label: 'HRC equality index' },
          { value: '5 Stars', label: 'Disability equality index' },
        ],
        image:
          'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?q=80&w=1200',
      },
    ],
  },
];

export default function AboutSectionDiversityInclusion() {
  const [activeCategory, setActiveCategory] = useState(categories[0]!.id);

  const currentCategory =
    categories.find((category) => category.id === activeCategory) ||
    categories[0]!;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
          <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
            Diversity & Inclusion
          </div>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Building a More Equitable Future Together
          </h2>
          <p className="text-muted-foreground">
            Our commitment to diversity, equity, and inclusion runs deep in
            everything we do—from how we build our teams to how we build our
            products.
          </p>
        </div>

        <Tabs
          defaultValue={categories[0]!.id}
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="space-y-8"
        >
          {/* Category selection - Tabs for md+ screens, Dropdown for smaller screens */}
          <div className="flex justify-center">
            {/* Dropdown for small screens */}
            <div className="mb-6 w-full md:hidden">
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs for medium screens and above */}
            <TabsList className="hidden h-auto grid-cols-4 p-1 md:grid">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2.5"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Category description */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground">
              {currentCategory.description}
            </p>
          </div>

          {/* Initiatives */}
          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-12"
            >
              {category.initiatives.map((initiative, index) => {
                const Icon = initiative.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={initiative.id}
                    className="grid items-center gap-8 md:grid-cols-12"
                  >
                    {/* Initiative details */}
                    <div
                      className={cn(
                        'space-y-6 md:col-span-7',
                        isEven ? 'md:order-1' : 'md:order-2'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-md p-2">
                          <Icon className="text-primary h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold">
                          {initiative.title}
                        </h3>
                      </div>

                      <p className="text-muted-foreground">
                        {initiative.description}
                      </p>

                      {initiative.metrics && (
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          {initiative.metrics.map((metric, i) => (
                            <div key={i} className="text-center">
                              <div className="text-primary text-2xl font-bold">
                                {metric.value}
                              </div>
                              <div className="text-muted-foreground mt-1 text-xs">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Initiative image (if available) */}
                    {initiative.image ? (
                      <div
                        className={cn(
                          'md:col-span-5',
                          isEven ? 'md:order-2' : 'md:order-1'
                        )}
                      >
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                          <img
                            src={initiative.image}
                            alt={initiative.title}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'flex h-full items-center justify-center md:col-span-5',
                          isEven ? 'md:order-2' : 'md:order-1'
                        )}
                      >
                        <Card className="bg-muted/30 flex h-full min-h-[280px] w-full items-center justify-center">
                          <CardContent className="p-6 text-center">
                            <Icon className="text-muted-foreground/50 mx-auto mb-4 h-16 w-16" />
                            <Badge variant="secondary" className="mx-auto">
                              Learn more about our{' '}
                              {initiative.title.toLowerCase()} initiative
                            </Badge>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                );
              })}
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA section */}
        <div className="mt-20 text-center">
          <div className="bg-muted mb-8 inline-flex items-center justify-center rounded-full p-1">
            <Badge className="bg-primary text-primary-foreground rounded-full px-4 py-1">
              Join us in making a difference
            </Badge>
          </div>

          <h3 className="mb-4 text-2xl font-bold">
            Become Part of Our Inclusive Community
          </h3>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl">
            We&apos;re always looking for passionate individuals who share our
            commitment to diversity, equity, and inclusion to join our team.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <a href="#">Join Our Team</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#">Read Our Annual Report</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
