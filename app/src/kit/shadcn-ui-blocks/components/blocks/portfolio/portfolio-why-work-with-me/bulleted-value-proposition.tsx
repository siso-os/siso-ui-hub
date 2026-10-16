import {
  ArrowRight,
  Clock,
  Award,
  Zap,
  HeartHandshake,
  Medal,
  Globe,
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

// Sample values data
const values = [
  {
    id: 1,
    title: 'Fast Turnaround',
    description:
      'I deliver projects on time, every time. Your deadlines are my top priority.',
    icon: <Clock className="text-primary h-6 w-6" />,
  },
  {
    id: 2,
    title: 'Quality Craftsmanship',
    description:
      'Every pixel and line of code is crafted with care. I don&apos;t believe in cutting corners.',
    icon: <Award className="text-primary h-6 w-6" />,
  },
  {
    id: 3,
    title: 'Creative Solutions',
    description:
      'I approach every challenge with fresh eyes and innovative thinking to solve your unique problems.',
    icon: <Zap className="text-primary h-6 w-6" />,
  },
  {
    id: 4,
    title: 'Clear Communication',
    description:
      'No surprises or confusion. I keep you informed every step of the way with clear, jargon-free updates.',
    icon: <HeartHandshake className="text-primary h-6 w-6" />,
  },
  {
    id: 5,
    title: 'Proven Results',
    description:
      'My work consistently delivers measurable outcomes for clients across various industries.',
    icon: <Medal className="text-primary h-6 w-6" />,
  },
  {
    id: 6,
    title: 'Client-Focused Approach',
    description:
      'Your success is my success. I prioritize understanding your business goals to deliver solutions that truly matter.',
    icon: <Globe className="text-primary h-6 w-6" />,
  },
];

export default function BulletedValueProposition() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Why Choose Me
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Why Work With Me?
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Here&apos;s what sets me apart and makes me the right partner for
            your next project
          </p>
        </div>

        {/* Values List */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-10">
            {values.map((value) => (
              <Card
                key={value.id}
                className="border-primary/10 overflow-hidden"
              >
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 flex-shrink-0 rounded-full p-3">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-medium">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Let&apos;s work together</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
