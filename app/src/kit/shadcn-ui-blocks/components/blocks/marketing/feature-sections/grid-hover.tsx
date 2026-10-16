import { Card, CardContent } from '../../../ui/card';
import { cn } from '@/arc-shims/kit-utils';
import {
  Boxes,
  CircuitBoard,
  Cpu,
  FileCode2,
  FlaskConical,
  GitBranch,
  Globe2,
  Layers,
  LayoutGrid,
  Lightbulb,
  Network,
  Puzzle,
} from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered',
    description:
      'Advanced machine learning algorithms to automate and optimize your workflows.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: Globe2,
    title: 'Global CDN',
    description:
      'Lightning-fast content delivery across multiple geographic locations.',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: CircuitBoard,
    title: 'Edge Computing',
    description: 'Process data closer to the source for improved performance.',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: Network,
    title: 'Microservices',
    description:
      'Build scalable applications with independent service architecture.',
    color: 'bg-orange-500/10 text-orange-500',
  },
  {
    icon: FileCode2,
    title: 'API Gateway',
    description:
      'Centralized API management with built-in security and monitoring.',
    color: 'bg-pink-500/10 text-pink-500',
  },
  {
    icon: Layers,
    title: 'Data Storage',
    description: 'Flexible storage solutions for all your application needs.',
    color: 'bg-yellow-500/10 text-yellow-500',
  },
  {
    icon: GitBranch,
    title: 'Version Control',
    description: 'Built-in version control system for code and assets.',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
  {
    icon: FlaskConical,
    title: 'Testing Tools',
    description: 'Comprehensive testing suite for quality assurance.',
    color: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    icon: Puzzle,
    title: 'Extensible',
    description:
      'Easily extend functionality with custom plugins and integrations.',
    color: 'bg-rose-500/10 text-rose-500',
  },
  {
    icon: Lightbulb,
    title: 'Smart Insights',
    description: 'Intelligent analytics and recommendations for optimization.',
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    icon: LayoutGrid,
    title: 'Customizable UI',
    description: 'Flexible interface components that adapt to your needs.',
    color: 'bg-violet-500/10 text-violet-500',
  },
  {
    icon: Boxes,
    title: 'Resource Management',
    description: 'Efficient allocation and monitoring of system resources.',
    color: 'bg-amber-500/10 text-amber-500',
  },
];

export default function FeatureSectionGridHover() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Powerful features for powerful applications
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Everything you need to build modern applications at scale. Built for
          developers, designed for growth.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent className="space-y-4 p-6">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-lg',
                  feature.color
                )}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="group-hover:text-primary font-bold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
