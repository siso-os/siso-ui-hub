import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Trophy, Users, FolderOpen, Calendar } from 'lucide-react';

const stats = [
  {
    icon: Calendar,
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    description: 'Over a decade of industry leadership.',
  },
  {
    icon: FolderOpen,
    value: 2500,
    suffix: '+',
    label: 'Projects Completed',
    description: 'Successfully delivered worldwide.',
  },
  {
    icon: Users,
    value: 10000,
    suffix: '+',
    label: 'Happy Clients',
    description: 'From startups to Fortune 500 companies.',
  },
  {
    icon: Trophy,
    value: 150,
    suffix: '+',
    label: 'Industry Awards',
    description: 'Recognized for design and innovation excellence.',
  },
];

export default function AboutSectionAnimatedStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry!.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      className="container mx-auto px-4 py-24 md:px-6 2xl:max-w-[1400px]"
      ref={sectionRef}
    >
      <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
        <div className="bg-primary/10 text-primary inline-block rounded-lg px-3 py-1 text-sm">
          Our Achievements
        </div>
        <h2 className="text-3xl font-bold tracking-tight">
          Milestones That Define Our Journey
        </h2>
        <p className="text-muted-foreground">
          Over the years, we&apos;ve achieved remarkable success by focusing on
          delivering exceptional value to our clients and building lasting
          relationships.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="overflow-hidden border-none p-0 shadow-md"
          >
            <CardContent className="space-y-4 p-8 text-center">
              <div className="bg-primary/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <stat.icon className="text-primary h-8 w-8" />
              </div>
              <h3 className="flex items-center justify-center">
                <AnimatedCounter
                  value={stat.value}
                  isVisible={isVisible}
                  duration={2000}
                />
                <span className="text-4xl font-bold">{stat.suffix}</span>
              </h3>
              <div>
                <p className="text-lg font-semibold">{stat.label}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-accent/50 mt-20 rounded-lg p-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Our Story Continues</h3>
            <p className="text-muted-foreground">
              While we take pride in these achievements, our journey is ongoing.
              We remain dedicated to innovation, quality, and creating
              meaningful impact for our clients and communities worldwide.
            </p>
            <p className="text-muted-foreground mt-4">
              Every day, we strive to exceed expectations and set new standards
              of excellence in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="from-primary/20 to-primary/5 rounded-lg bg-gradient-to-br p-6 text-center">
              <p className="text-primary text-lg font-medium">Growing Team</p>
              <p className="text-4xl font-bold">250+</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Talented professionals across the globe
              </p>
            </div>
            <div className="from-primary/20 to-primary/5 rounded-lg bg-gradient-to-br p-6 text-center">
              <p className="text-primary text-lg font-medium">Global Reach</p>
              <p className="text-4xl font-bold">30+</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Countries with active client projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated counter component
interface AnimatedCounterProps {
  value: number;
  isVisible: boolean;
  duration: number;
}

function AnimatedCounter({ value, isVisible, duration }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const stepRef = useRef(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!isVisible) return;

    const steps = 60;
    const increment = value / steps;
    const intervalTime = duration / steps;

    stepRef.current = 0;
    countRef.current = 0;

    const interval = setInterval(() => {
      stepRef.current += 1;
      const newCount = Math.min(Math.round(stepRef.current * increment), value);

      if (countRef.current !== newCount) {
        countRef.current = newCount;
        setCount(newCount);
      }

      if (stepRef.current >= steps || newCount >= value) {
        clearInterval(interval);
        setCount(value);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isVisible, value, duration]);

  return <span className="text-4xl font-bold">{count}</span>;
}
