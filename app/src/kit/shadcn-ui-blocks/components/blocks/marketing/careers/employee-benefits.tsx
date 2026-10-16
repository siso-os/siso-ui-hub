import * as React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import {
  CalendarIcon,
  CoinsIcon,
  GraduationCapIcon,
  HeartPulseIcon,
  HomeIcon,
  LaptopIcon,
  PalmtreeIcon,
  PlaneIcon,
  ShieldCheckIcon,
  UtensilsIcon,
} from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
}

interface BenefitCategory {
  id: string;
  name: string;
  description: string;
  benefits: Benefit[];
}

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  image: string;
  benefitHighlight: string;
}

export default function EmployeeBenefits() {
  const benefitCategories: BenefitCategory[] = [
    {
      id: 'health-wellness',
      name: 'Health & Wellness',
      description:
        'We prioritize your physical and mental wellbeing with comprehensive healthcare coverage and wellness programs.',
      benefits: [
        {
          id: 'medical',
          title: 'Medical Coverage',
          icon: <HeartPulseIcon className="h-6 w-6" />,
          description:
            'Comprehensive health insurance with coverage for you and your dependents.',
          highlights: [
            'Premium medical, dental, and vision plans',
            '100% employer-paid premiums for employees',
            '75% coverage for dependents',
            'Access to top healthcare networks nationwide',
          ],
        },
        {
          id: 'mental-health',
          title: 'Mental Health Support',
          icon: <ShieldCheckIcon className="h-6 w-6" />,
          description:
            'Resources and support for your mental and emotional wellbeing.',
          highlights: [
            'Free therapy sessions through our EAP',
            'Mental health days (separate from sick leave)',
            'Meditation and mindfulness app subscriptions',
            'Stress management workshops',
          ],
        },
        {
          id: 'wellness',
          title: 'Wellness Program',
          icon: <CoinsIcon className="h-6 w-6" />,
          description:
            'Resources and incentives to help you maintain a healthy lifestyle.',
          highlights: [
            '$100 monthly wellness stipend',
            'On-site fitness classes (where available)',
            'Fitness membership reimbursement',
            'Annual wellness challenges with prizes',
          ],
        },
      ],
    },
    {
      id: 'time-off',
      name: 'Time Off',
      description:
        'We believe in work-life balance and offer generous time away from work to rest and recharge.',
      benefits: [
        {
          id: 'pto',
          title: 'Paid Time Off',
          icon: <CalendarIcon className="h-6 w-6" />,
          description:
            'Flexible vacation policy that encourages taking time to recharge.',
          highlights: [
            'Unlimited PTO with 15-day minimum encouraged',
            'Company-wide minimum 2-week vacation encouraged annually',
            'Sabbatical program: 4 weeks paid after 4 years',
            'Company-wide shutdown periods during holidays',
          ],
        },
        {
          id: 'holidays',
          title: 'Holidays & Breaks',
          icon: <PalmtreeIcon className="h-6 w-6" />,
          description: 'Paid holidays and extended breaks throughout the year.',
          highlights: [
            '12 paid holidays per year',
            'Extended winter break (Dec 24-Jan 1)',
            'Summer Fridays (half-days) between Memorial and Labor Day',
            'Birthday day off',
          ],
        },
        {
          id: 'parental-leave',
          title: 'Parental Leave',
          icon: <HomeIcon className="h-6 w-6" />,
          description:
            'Generous parental leave to bond with your new family member.',
          highlights: [
            '16 weeks paid parental leave for all parents',
            'Additional 8 weeks for birth parents',
            'Flexible return-to-work programs',
            'Childcare stipend during transition back to work',
          ],
        },
      ],
    },
    {
      id: 'financial',
      name: 'Financial Benefits',
      description:
        'We offer competitive compensation and benefits to secure your financial future.',
      benefits: [
        {
          id: 'retirement',
          title: 'Retirement Plans',
          icon: <CoinsIcon className="h-6 w-6" />,
          description:
            'Help you save for the future with matching contributions.',
          highlights: [
            '401(k) with 4% company match',
            'Immediate vesting',
            'Financial planning resources',
            'Annual retirement planning workshops',
          ],
        },
        {
          id: 'equity',
          title: 'Equity Compensation',
          icon: <CoinsIcon className="h-6 w-6" />,
          description: "Share in the company's success with equity grants.",
          highlights: [
            'Stock options or RSUs for all full-time employees',
            'Annual equity refreshes based on performance',
            'Employee stock purchase program with discount',
            'Equity education sessions and resources',
          ],
        },
        {
          id: 'bonus',
          title: 'Bonuses & Recognition',
          icon: <CoinsIcon className="h-6 w-6" />,
          description:
            'Celebrate your contributions and achievements with additional compensation.',
          highlights: [
            'Annual performance bonuses',
            'Spot bonuses for exceptional work',
            'Peer recognition program with rewards',
            'Referral bonuses ($2,000 per successful hire)',
          ],
        },
      ],
    },
    {
      id: 'growth',
      name: 'Growth & Development',
      description:
        'We invest in your personal and professional growth with extensive learning opportunities.',
      benefits: [
        {
          id: 'learning',
          title: 'Learning Budget',
          icon: <GraduationCapIcon className="h-6 w-6" />,
          description:
            'Resources to help you grow your skills and advance your career.',
          highlights: [
            '$2,000 annual learning & development budget',
            'Access to online learning platforms',
            'Professional certification reimbursement',
            'Internal workshops and learning sessions',
          ],
        },
        {
          id: 'conferences',
          title: 'Conferences & Events',
          icon: <PlaneIcon className="h-6 w-6" />,
          description:
            'Opportunities to learn, network, and represent the company.',
          highlights: [
            'Conference attendance sponsorship',
            'Speaking opportunity support',
            'Industry event participation',
            'Travel and accommodation coverage',
          ],
        },
        {
          id: 'mentorship',
          title: 'Mentorship & Coaching',
          icon: <GraduationCapIcon className="h-6 w-6" />,
          description:
            'Programs to help you develop skills and advance your career.',
          highlights: [
            'Formal mentorship program',
            'Executive coaching for leadership roles',
            'Career development planning',
            'Regular 1:1s with managers focused on growth',
          ],
        },
      ],
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle & Perks',
      description:
        'We offer unique perks that enhance your daily life and make work more enjoyable.',
      benefits: [
        {
          id: 'remote',
          title: 'Remote Work',
          icon: <LaptopIcon className="h-6 w-6" />,
          description:
            "Flexibility to work where you're most productive and comfortable.",
          highlights: [
            'Flexible remote work policy',
            'Home office stipend ($500 initially, $200 annually)',
            'Co-working space allowance where available',
            'Ergonomic assessment and equipment',
          ],
        },
        {
          id: 'meals',
          title: 'Meals & Snacks',
          icon: <UtensilsIcon className="h-6 w-6" />,
          description:
            'Keep fueled and focused with complimentary food and beverages.',
          highlights: [
            'Catered team lunches twice weekly (in office)',
            'Fully stocked kitchen with snacks and beverages',
            'Monthly meal allowance for remote employees',
            'Special dietary accommodations',
          ],
        },
        {
          id: 'wellbeing',
          title: 'Wellbeing Initiatives',
          icon: <HeartPulseIcon className="h-6 w-6" />,
          description: 'Programs and perks to support your holistic wellbeing.',
          highlights: [
            'Quarterly wellness challenges',
            'Mental health days',
            'Volunteer time off (16 hours annually)',
            'Annual team retreats and social events',
          ],
        },
      ],
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote:
        'The parental leave policy gave me precious time with my newborn daughter. Having 16 weeks fully paid meant I could focus completely on my family during this important time.',
      name: 'David Chen',
      role: 'Senior Product Manager',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      benefitHighlight: 'Parental Leave',
    },
    {
      id: '2',
      quote:
        'The learning budget has been transformative for my career. I was able to get certified in UX research and attend a major design conference, which directly impacted my work and promotion.',
      name: 'Michelle Park',
      role: 'UX Designer',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      benefitHighlight: 'Learning Budget',
    },
    {
      id: '3',
      quote:
        'The unlimited PTO policy isn&apos;t just talk - my manager actively encourages taking time off. I took three weeks to travel to Europe and came back refreshed and more productive.',
      name: 'James Wilson',
      role: 'Software Engineer',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      benefitHighlight: 'Unlimited PTO',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight">
          Comprehensive Benefits & Perks
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          We believe in taking care of our team with benefits that matter. From
          health and wellness to professional development, we&apos;ve got you
          covered.
        </p>
      </div>

      <Tabs defaultValue={benefitCategories[0]!.id} className="w-full gap-0">
        <div className="mb-8 overflow-x-auto">
          <TabsList className="inline-flex h-12 w-auto">
            {benefitCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {benefitCategories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="animate-in fade-in-50 duration-300"
          >
            <div className="mb-8">
              <h3 className="mb-2 text-xl font-semibold">{category.name}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.benefits.map((benefit) => (
                <Card key={benefit.id} className="flex h-full flex-col">
                  <CardContent className="flex flex-col">
                    <div className="mb-4 flex items-center">
                      <div className="bg-primary/10 text-primary mr-3 flex h-12 w-12 items-center justify-center rounded-full">
                        {benefit.icon}
                      </div>
                      <h4 className="text-lg font-medium">{benefit.title}</h4>
                    </div>
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {benefit.description}
                    </p>
                    <ul className="space-y-2">
                      {benefit.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-sm"
                        >
                          <svg
                            className="text-primary mt-1 h-4 w-4 flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-16">
        <h3 className="mb-8 text-center text-2xl font-semibold">
          What Our Team Says
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="overflow-hidden">
              <CardContent className="">
                <div className="mb-4 flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="mb-3 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-4">
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                    {testimonial.benefitHighlight}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-muted/50 mt-16 flex flex-col items-center justify-center rounded-lg p-8 text-center">
        <h3 className="mb-4 text-xl font-semibold">
          Join Our Team & Enjoy These Benefits
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl">
          We&apos;re always looking for talented individuals to join our team.
          Check out our open positions and apply today.
        </p>
        <Button size="lg">View Open Positions</Button>
      </div>
    </div>
  );
}
