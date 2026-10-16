import { useState } from 'react';
import { cn } from '@/arc-shims/kit-utils';
import {
  ChevronDown,
  Heart,
  Shield,
  Zap,
  Users,
  Brain,
  Globe,
} from 'lucide-react';
import { Button } from '../../../ui/button';

const values = [
  {
    id: 'integrity',
    icon: Shield,
    title: 'Integrity',
    shortDescription: "Doing what's right, even when no one is watching.",
    longDescription:
      "We believe that honesty and strong moral principles are the foundation of any successful business. We are transparent in our practices, accountable for our actions, and committed to doing what's right in all situations.",
    examples: [
      'Transparent pricing with no hidden fees',
      'Honest communication with clients, even when delivering difficult news',
      'Ethical sourcing and business practices',
    ],
  },
  {
    id: 'innovation',
    icon: Zap,
    title: 'Innovation',
    shortDescription:
      'Constantly exploring new ideas to create better solutions.',
    longDescription:
      'We embrace change and continuously seek new ways to solve problems. We encourage creative thinking, experimentation, and calculated risk-taking to drive our industry forward and deliver exceptional value to our clients.',
    examples: [
      'Dedicated time for all team members to explore new ideas',
      'Regular hackathons and innovation challenges',
      'Investment in research and emerging technologies',
    ],
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Collaboration',
    shortDescription: 'Achieving more by working together effectively.',
    longDescription:
      'We believe the best results come from diverse teams working together toward common goals. We foster an inclusive environment where all voices are heard, different perspectives are valued, and collective success is celebrated.',
    examples: [
      'Cross-functional teams with diverse backgrounds and expertise',
      'Open workspaces and collaboration tools',
      'Recognition programs that celebrate team achievements',
    ],
  },
  {
    id: 'empathy',
    icon: Heart,
    title: 'Empathy',
    shortDescription: 'Understanding and sharing the feelings of others.',
    longDescription:
      "We prioritize understanding our customers' and colleagues' perspectives and experiences. By putting ourselves in others' shoes, we build stronger relationships, create better products, and foster a supportive work environment.",
    examples: [
      'User research and feedback sessions that inform our decisions',
      'Comprehensive support for employees during difficult times',
      'Products designed with accessibility and inclusion in mind',
    ],
  },
  {
    id: 'excellence',
    icon: Brain,
    title: 'Excellence',
    shortDescription: 'Striving for the highest quality in everything we do.',
    longDescription:
      'We are committed to delivering exceptional quality and exceeding expectations. We continuously raise our standards, refine our processes, and develop our skills to achieve outstanding results in all areas of our business.',
    examples: [
      'Rigorous quality assurance processes',
      'Continuous professional development opportunities',
      'Recognition and celebration of exceptional work',
    ],
  },
  {
    id: 'sustainability',
    icon: Globe,
    title: 'Sustainability',
    shortDescription:
      'Creating long-term value while minimizing environmental impact.',
    longDescription:
      'We recognize our responsibility to future generations and the planet. We make business decisions that balance economic growth with environmental protection and social well-being, aiming to create positive impact beyond profitability.',
    examples: [
      'Carbon neutrality commitment and tracking',
      'Eco-friendly office practices and remote work options',
      'Community involvement and social responsibility initiatives',
    ],
  },
];

export default function AboutSectionBrandValues() {
  const [expandedValue, setExpandedValue] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedValue(expandedValue === id ? null : id);
  };

  return (
    <section className="container mx-auto space-y-12 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
          Our Core Values
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          The Principles That Guide Us
        </h2>
        <p className="text-muted-foreground">
          Our values define who we are, how we work together, and what we strive
          for. They are the foundation of our culture and drive every decision
          we make.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.id}
            className={cn(
              'group bg-card text-card-foreground overflow-hidden rounded-xl border transition-all duration-300',
              expandedValue === value.id
                ? 'col-span-1 shadow-lg md:col-span-2 lg:col-span-3'
                : ''
            )}
          >
            <button
              onClick={() => toggleExpand(value.id)}
              className="flex w-full items-start justify-between p-6 text-left"
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 flex-shrink-0 rounded-md p-3">
                  <value.icon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {value.shortDescription}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  'text-muted-foreground mt-1 h-5 w-5 flex-shrink-0 transition-transform duration-300',
                  expandedValue === value.id ? 'rotate-180' : ''
                )}
              />
            </button>

            {expandedValue === value.id && (
              <div className="animate-in slide-in-from-top-2 space-y-6 px-6 pb-6 duration-150">
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-muted-foreground">
                    {value.longDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-muted-foreground mb-2 text-sm font-semibold">
                    How we put this into practice:
                  </h4>
                  <ul className="space-y-2">
                    {value.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="bg-primary/10 mt-0.5 flex-shrink-0 rounded-full p-1">
                          <value.icon className="text-primary h-3 w-3" />
                        </div>
                        <span className="text-sm">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-accent/50 relative mt-8 rounded-lg p-8">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <h3 className="text-2xl font-bold">Living Our Values Every Day</h3>
          <p className="text-muted-foreground">
            These aren&apos;t just words on our website—our values are
            integrated into our hiring processes, performance reviews,
            decision-making frameworks, and daily interactions. They&apos;re how
            we show up for our team, our customers, and our community.
          </p>
          <Button asChild>
            <a href="#">Learn about our culture</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
