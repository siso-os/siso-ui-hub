import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { ArrowRight } from 'lucide-react';

export default function TimelineFeatureShowcase() {
  const timelineSteps = [
    {
      title: 'Sustainable Harvesting',
      description:
        'Premium woods harvested from FSC-certified forests with sustainable practices.',
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop',
      alt: 'Sustainable forest harvesting process',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M7 22a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5 .71 0 1.39.15 2 .42V6a4 4 0 0 1 4-4c2.21 0 4 1.79 4 4v2h2a3 3 0 0 1 3 3c0 1.66-1.34 3-3 3h-3" />
          <path d="M5 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M15 13v9" />
        </svg>
      ),
    },
    {
      title: 'Master Craftsmanship',
      description:
        'Each piece handcrafted by our team of artisans with decades of experience.',
      image:
        'https://images.unsplash.com/photo-1605117882932-f9e32b03fea9?q=80&w=2070&auto=format&fit=crop',
      alt: 'Master craftsman working on wooden furniture',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M13 22H5a2 2 0 0 1-2-2V9.5a2.5 2.5 0 0 1 5 0V14a2 2 0 0 0 4 0v-2.5a2.5 2.5 0 0 1 5 0V22h-4" />
          <path d="M9 15v7" />
          <path d="M17 15v7" />
          <path d="M10.5 6a2.5 2.5 0 1 1 5 0 2.5 2.5 0 1 1-5 0z" />
        </svg>
      ),
    },
    {
      title: 'Natural Finishes',
      description:
        'Non-toxic, low-VOC finishes that enhance the beauty of the wood while protecting the environment.',
      image:
        'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
      alt: 'Natural wood finishing process',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M4 9h16" />
          <path d="M4 15h16" />
          <path d="M8 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M8 8v8" />
          <path d="M16 8v8" />
          <path d="M12 4v16" />
        </svg>
      ),
    },
    {
      title: 'Precision Joinery',
      description:
        'Traditional joinery techniques that ensure durability and longevity for generations.',
      image:
        'https://images.unsplash.com/photo-1652272161010-4d3b3aeb15ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Precision joinery techniques in woodworking',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9" />
          <path d="M18 9V5a2 2 0 0 0-2-2h-5.5L9 7h9a2 2 0 0 1 0 4" />
        </svg>
      ),
    },
    {
      title: 'Quality Assurance',
      description:
        'Rigorous testing and inspection to ensure every piece meets our exacting standards.',
      image:
        'https://images.unsplash.com/photo-1697124510366-f6142924ddaa?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Quality inspection of finished furniture',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          <path d="M12 9a4.5 4.5 0 0 0 4.5 4.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-background w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="mx-auto flex max-w-3xl flex-col items-center space-y-4 text-center">
          <Badge className="px-3.5 py-1.5">Heritage Craftsmanship</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            From forest to home: our meticulous process
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            Each piece of furniture is created with intention and care,
            following a time-honored process that ensures quality and
            sustainability.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Timeline connector */}
          <div className="bg-border absolute top-0 bottom-0 left-1/2 hidden w-0.5 md:block" />

          {/* Timeline steps */}
          <div className="relative space-y-12 md:space-y-24">
            {timelineSteps.map((step, index) => (
              <div
                key={index}
                className={`items-center md:grid md:grid-cols-2 md:gap-8`}
              >
                <div
                  className={`md:order-${index % 2 === 0 ? 1 : 2} mb-8 md:mb-0`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl border">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>

                <div className={`md:order-${index % 2 === 0 ? 2 : 1} relative`}>
                  {/* Timeline node */}
                  <div className="md:border-background md:bg-primary/10 absolute top-0 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:flex md:h-12 md:w-12 md:items-center md:justify-center md:rounded-full md:border-4">
                    <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                      {step.icon}
                    </div>
                  </div>

                  <div className="bg-card text-card-foreground rounded-xl border p-6">
                    <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full md:hidden">
                      <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground mt-2">
                      {step.description}
                    </p>

                    <div
                      className={`mt-4 flex justify-${
                        index % 2 === 0 ? 'start' : 'end'
                      } md:justify-start`}
                    >
                      <Badge variant="outline" className="text-xs">
                        Step {index + 1}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center">
          <div className="bg-card text-card-foreground mx-auto max-w-2xl rounded-xl border p-8 text-center shadow-sm">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary h-6 w-6"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold">Each piece tells a story</h3>
            <p className="text-muted-foreground mt-2">
              Our furniture carries the signature of the craftsman who made it,
              and comes with documentation of its journey from sustainably
              harvested timber to finished piece.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild>
                <a href="#">
                  Browse Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#">Our Sustainability Pledge</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
