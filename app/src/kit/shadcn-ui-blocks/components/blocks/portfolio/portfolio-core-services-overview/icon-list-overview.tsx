import {
  ArrowRight,
  Code,
  Palette,
  LineChart,
  Globe,
  MessageSquare,
  Zap,
} from 'lucide-react';
import { Button } from '../../../ui/button';

// Sample services data
const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications',
    icon: <Code className="h-5 w-5" />,
    link: '#',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description: 'User-centered design that delights and converts',
    icon: <Palette className="h-5 w-5" />,
    link: '#',
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description: 'Data-driven strategies that drive growth',
    icon: <LineChart className="h-5 w-5" />,
    link: '#',
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description: 'Improve rankings and organic visibility',
    icon: <Globe className="h-5 w-5" />,
    link: '#',
  },
  {
    id: 5,
    title: 'Content Creation',
    description: 'Engaging content that resonates with your audience',
    icon: <MessageSquare className="h-5 w-5" />,
    link: '#',
  },
  {
    id: 6,
    title: 'Performance Optimization',
    description: 'Speed up your digital products for better results',
    icon: <Zap className="h-5 w-5" />,
    link: '#',
  },
];

export default function IconListOverview() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Services
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Specialized expertise to help your business succeed in the digital
            landscape
          </p>
        </div>

        {/* Services List - Horizontal layout for larger screens, vertical for mobile */}
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
            {services.map((service) => (
              <a
                key={service.id}
                href={service.link}
                className="group hover:border-primary/20 hover:bg-muted/50 flex items-center gap-4 rounded-lg border border-transparent p-3 transition-all duration-300"
              >
                <div className="bg-primary/10 rounded-full p-3">
                  <div className="text-primary">{service.icon}</div>
                </div>
                <div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" />
                    <span className="sr-only">
                      Learn more about {service.title}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size={'lg'}>
              <a href="#" className="inline-flex items-center gap-2">
                <span>View all services</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
