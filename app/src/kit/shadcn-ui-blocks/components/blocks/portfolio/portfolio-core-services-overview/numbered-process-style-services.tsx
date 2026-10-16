import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';

// Sample services data
const services = [
  {
    id: 1,
    number: '01',
    title: 'Discovery & Strategy',
    description:
      "Every successful project begins with understanding your goals, audience, and current challenges. I'll work with you to develop a clear strategy that aligns with your business objectives.",
    capabilities: [
      'Stakeholder interviews',
      'Competitive analysis',
      'User research',
      'Project roadmapping',
    ],
    link: '#',
  },
  {
    id: 2,
    number: '02',
    title: 'Design & Prototyping',
    description:
      "With a solid strategy in place, I'll create intuitive, user-friendly designs that reflect your brand and meet your users' needs. All designs are tested for usability before development begins.",
    capabilities: [
      'UI/UX design',
      'Wireframing',
      'Interactive prototyping',
      'Design systems',
    ],
    link: '#',
  },
  {
    id: 3,
    number: '03',
    title: 'Development & Testing',
    description:
      "Using modern frameworks and clean code practices, I'll build your digital product with performance, accessibility, and scalability in mind. Thorough testing ensures everything works flawlessly.",
    capabilities: [
      'Front-end development',
      'Back-end development',
      'Performance optimization',
      'Cross-browser testing',
    ],
    link: '#',
  },
  {
    id: 4,
    number: '04',
    title: 'Launch & Optimization',
    description:
      "After launching your product, I'll monitor its performance and gather user feedback to identify opportunities for improvement. Ongoing optimization ensures your product continues to deliver results.",
    capabilities: [
      'Analytics setup',
      'User feedback collection',
      'Performance monitoring',
      'Iterative improvements',
    ],
    link: '#',
  },
];

export default function NumberedProcessStyleServices() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Process & Services
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            A structured approach to delivering exceptional results for your
            digital needs
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="grid gap-16">
            {services.map((service) => (
              <div
                key={service.id}
                className="relative grid grid-cols-1 gap-6 md:grid-cols-7"
              >
                {/* Number and connecting line */}
                <div className="flex items-start justify-center md:col-span-1">
                  <div className="relative">
                    <div className="bg-primary text-primary-foreground flex h-14 w-14 items-center justify-center rounded-full text-2xl font-bold">
                      {service.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 md:col-span-6">
                  <h3 className="text-2xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>

                  {/* Capabilities */}
                  <div className="mt-4">
                    <h4 className="text-muted-foreground mb-3 text-sm font-medium">
                      Capabilities:
                    </h4>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {service.capabilities.map((capability, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="text-primary text-lg">•</span>
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="ghost" asChild className="group" size="sm">
                    <a
                      href={service.link}
                      className="text-primary flex items-center"
                    >
                      <span className="mr-2">Learn more</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Start your project</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
