import { ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';

// Sample services data
const services = [
  {
    id: 'service-1',
    title: 'Web Development',
    shortDescription: 'Custom websites and web applications',
    fullDescription:
      'I build high-performance websites and applications that look great and work flawlessly across all devices. Using modern technologies like React, Next.js, and Tailwind CSS, I create digital experiences that help your business grow.',
    benefits: [
      'Responsive design that works on all devices',
      'Fast loading speeds and optimized performance',
      'SEO-friendly code structure',
      'Custom features tailored to your business needs',
      'Ongoing maintenance and support available',
    ],
    link: '#',
  },
  {
    id: 'service-2',
    title: 'UI/UX Design',
    shortDescription: 'User-centered design solutions',
    fullDescription:
      "Good design is about more than just aesthetics—it's about creating intuitive, enjoyable experiences for your users. I combine visual design with usability principles to create interfaces that delight your users and achieve your business goals.",
    benefits: [
      'User research and persona development',
      'Wireframing and prototyping',
      'Visual design with attention to brand consistency',
      'Usability testing and iteration',
      'Design systems that scale with your business',
    ],
    link: '#',
  },
  {
    id: 'service-3',
    title: 'E-commerce Solutions',
    shortDescription: 'Online stores that drive sales',
    fullDescription:
      'Turn your products into profit with a custom e-commerce solution that makes selling online simple. I create online stores that are easy to manage, secure for your customers, and optimized for conversions.',
    benefits: [
      'Seamless checkout experiences',
      'Product catalog management',
      'Secure payment processing',
      'Inventory management integrations',
      'Mobile-optimized shopping experience',
    ],
    link: '#',
  },
  {
    id: 'service-4',
    title: 'Digital Marketing & SEO',
    shortDescription: 'Strategies to increase visibility',
    fullDescription:
      "The best website in the world won't help your business if no one can find it. I develop comprehensive digital marketing and SEO strategies that drive qualified traffic to your site and convert visitors into customers.",
    benefits: [
      'Technical SEO optimization',
      'Keyword research and content strategy',
      'Local SEO for brick-and-mortar businesses',
      'Analytics setup and performance tracking',
      'Conversion rate optimization',
    ],
    link: '#',
  },
  {
    id: 'service-5',
    title: 'Website Maintenance',
    shortDescription: 'Keeping your site secure and updated',
    fullDescription:
      "A website is never truly 'finished.' I offer ongoing maintenance services to ensure your site remains secure, up-to-date, and performing at its best. From security updates to content changes, I'll keep your digital presence running smoothly.",
    benefits: [
      'Regular security updates and monitoring',
      'Performance optimization',
      'Content updates and additions',
      'Backup and recovery solutions',
      '24/7 support for critical issues',
    ],
    link: '#',
  },
];

export default function AccordionServices() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Services
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Click on any service to learn more about how I can help your
            business succeed online
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {services.map((service) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="border-primary/10 border-b px-0"
              >
                <AccordionTrigger className="py-6 hover:no-underline">
                  <div className="flex flex-1 items-center text-left">
                    <div>
                      <h3 className="text-xl font-medium">{service.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p>{service.fullDescription}</p>
                    <div>
                      <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                        Key Benefits:
                      </h4>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {service.benefits.map((benefit, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm"
                          >
                            <span className="text-primary text-xl leading-tight">
                              •
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={service.link}
                          className="inline-flex items-center gap-2"
                        >
                          <span>Learn more</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-12 text-center">
            <Button asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Get a custom quote</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
