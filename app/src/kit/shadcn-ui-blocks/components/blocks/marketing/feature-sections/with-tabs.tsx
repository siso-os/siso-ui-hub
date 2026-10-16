import { useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Button } from '../../../ui/button';
import { Code2, Database, LineChart, Shield } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

const features = [
  {
    title: 'Development',
    icon: Code2,
    description: 'Build with modern tools and frameworks',
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'TypeScript & React Support',
      'Component Library',
      'API Integration',
      'Developer Tools',
    ],
  },
  {
    title: 'Analytics',
    icon: LineChart,
    description: 'Track and analyze your application metrics',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'Real-time Monitoring',
      'Custom Dashboards',
      'Performance Metrics',
      'User Insights',
    ],
  },
  {
    title: 'Security',
    icon: Shield,
    description: 'Enterprise-grade security features',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'End-to-end Encryption',
      'Role-based Access',
      'Audit Logs',
      'Compliance Tools',
    ],
  },
  {
    title: 'Infrastructure',
    icon: Database,
    description: 'Scalable and reliable infrastructure',
    image:
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    benefits: [
      'Auto-scaling',
      'Global CDN',
      'High Availability',
      'Disaster Recovery',
    ],
  },
];

export default function FeatureSectionWithTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Everything you need to build modern apps
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Powerful features to help you build faster and scale better
        </p>
      </div>

      {/* Dropdown for mobile screens */}
      <div className="mb-4 flex w-full justify-center md:hidden">
        <Select
          value={activeTab.toString()}
          onValueChange={(value) => setActiveTab(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a feature" />
          </SelectTrigger>
          <SelectContent>
            {features.map((feature, index) => (
              <SelectItem key={feature.title} value={index.toString()}>
                <div className="flex items-center gap-2">
                  <feature.icon className="size-4" />
                  {feature.title}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs for desktop screens */}
      <div className="hidden justify-center gap-4 overflow-x-auto py-2 md:flex">
        {features.map((feature, index) => (
          <Button
            key={feature.title}
            variant={activeTab === index ? 'default' : 'ghost'}
            className="gap-2"
            onClick={() => setActiveTab(index)}
          >
            <feature.icon className="size-4" />
            {feature.title}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden p-0">
        <div className="grid gap-0 lg:grid-cols-2">
          <CardContent className="flex flex-col justify-center space-y-6 p-6 lg:p-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">
                {features[activeTab]!.title}
              </h3>
              <p className="text-muted-foreground">
                {features[activeTab]!.description}
              </p>
            </div>

            <ul className="grid gap-3">
              {features[activeTab]!.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="bg-primary size-2 rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </CardContent>

          <div className="relative aspect-video lg:aspect-auto">
            <img
              src={features[activeTab]!.image}
              alt={features[activeTab]!.title}
              className="object-cover"
            />
          </div>
        </div>
      </Card>
    </section>
  );
}
