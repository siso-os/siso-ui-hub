import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

// Sample services data
const services = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Custom websites and web applications with clean code and intuitive interfaces that engage your visitors.',
  },
  {
    id: 2,
    title: 'UI/UX Design',
    description:
      'User-centered design solutions that enhance usability and create enjoyable digital experiences.',
  },
  {
    id: 3,
    title: 'Digital Marketing',
    description:
      'Strategic campaigns that boost your online presence and connect you with your target audience.',
  },
  {
    id: 4,
    title: 'SEO Optimization',
    description:
      'Technical and content optimization to improve visibility and drive organic traffic to your website.',
  },
  {
    id: 5,
    title: 'Content Strategy',
    description:
      'Engaging, relevant content that resonates with your audience and supports your business goals.',
  },
];

export default function SplitLayoutFeature() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column with intro text and CTA */}
          <div className="flex flex-col justify-center">
            <Badge className="mb-6 w-fit" variant="outline">
              Services
            </Badge>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How I Can Help You
            </h2>

            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              I offer specialized services designed to help you establish a
              strong online presence and achieve your business goals. Each
              service can be tailored to your specific needs or combined into a
              comprehensive solution.
            </p>

            <div className="mt-2 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild>
                <a href="#" className="flex items-center gap-2">
                  <span>Get in touch</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">View portfolio</a>
              </Button>
            </div>

            <div className="relative mt-12 hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Professional collaboration"
                width={500}
                height={300}
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Right column with services list */}
          <div className="bg-card flex flex-col justify-center rounded-xl border p-8 shadow-sm">
            <h3 className="text-muted-foreground mb-8 text-lg font-medium">
              Specialized services to help your business grow
            </h3>

            <div className="space-y-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="border-border border-b pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full p-1">
                      <Check className="text-primary h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{service.title}</h4>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" asChild className="w-full">
                <a href="#" className="flex items-center justify-center gap-2">
                  <span>Request custom service</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
