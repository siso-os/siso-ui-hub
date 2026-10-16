import { Card, CardContent } from '../../../ui/card';
import { Progress } from '../../../ui/progress';
import { Button } from '../../../ui/button';
import { ArrowRight, BarChart2, Users, Zap } from 'lucide-react';

const stats = [
  {
    name: 'Active Users',
    value: '50K+',
    progress: 84,
    icon: Users,
  },
  {
    name: 'Performance',
    value: '2.5x',
    progress: 92,
    icon: Zap,
  },
  {
    name: 'Conversion Rate',
    value: '28.5%',
    progress: 75,
    icon: BarChart2,
  },
];

export default function FeatureSectionWithStats() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Powerful analytics to scale your business
            </h2>
            <p className="text-muted-foreground text-lg">
              Get actionable insights and make data-driven decisions with our
              comprehensive analytics platform.
            </p>
            <Button size="lg" className="gap-2">
              Get Started <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="grid gap-4">
            {stats.map((stat) => (
              <Card key={stat.name} className="p-0">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-muted-foreground text-sm">
                        {stat.name}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-3">
                      <stat.icon className="text-primary size-5" />
                    </div>
                  </div>
                  <Progress value={stat.progress} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative aspect-square">
          <img
            src="https://placehold.co/1024x1024/jpeg"
            alt="Analytics Dashboard"
            className="rounded-2xl object-cover"
          />
          <div className="from-background/80 via-background/20 to-background/0 absolute inset-0 rounded-2xl bg-gradient-to-t" />
        </div>
      </div>
    </section>
  );
}
