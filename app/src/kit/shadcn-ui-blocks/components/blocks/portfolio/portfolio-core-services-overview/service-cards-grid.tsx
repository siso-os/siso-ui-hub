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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';

// Sample services data
const services = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Custom websites and web applications built with modern technologies focused on performance and usability.',
    icon: <Code className="text-primary h-10 w-10" />,
    link: '#',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description:
      'User-centered design solutions that create intuitive, engaging experiences that delight your users.',
    icon: <Palette className="text-primary h-10 w-10" />,
    link: '#',
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description:
      'Data-driven marketing strategies to increase your online visibility and drive qualified traffic.',
    icon: <LineChart className="text-primary h-10 w-10" />,
    link: '#',
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description:
      'Technical and content optimization to improve your search engine rankings and organic traffic.',
    icon: <Globe className="text-primary h-10 w-10" />,
    link: '#',
  },
  {
    id: 5,
    title: 'Content Creation',
    description:
      'Engaging, SEO-friendly content that resonates with your audience and drives conversions.',
    icon: <MessageSquare className="text-primary h-10 w-10" />,
    link: '#',
  },
  {
    id: 6,
    title: 'Performance Optimization',
    description:
      'Speed up your digital products for better user experience and improved conversion rates.',
    icon: <Zap className="text-primary h-10 w-10" />,
    link: '#',
  },
];

export default function ServiceCardsGrid() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Core Services
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Specialized solutions tailored to help your business thrive in the
            digital landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="hover:border-primary/30 transition-all duration-300 hover:shadow-md"
            >
              <CardHeader>
                <div className="mb-3">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" asChild className="group">
                  <a
                    href={service.link}
                    className="text-primary flex items-center"
                  >
                    <span className="mr-2">Learn more</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
