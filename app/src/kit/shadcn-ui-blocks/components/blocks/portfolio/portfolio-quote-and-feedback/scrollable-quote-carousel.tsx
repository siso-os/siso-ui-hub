import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../../ui/carousel';

export default function ScrollableQuoteCarousel() {
  const testimonials = [
    {
      quote:
        'Their collaborative approach and deep understanding of our industry resulted in a design that not only looks exceptional but performs brilliantly.',
      name: 'Daniel Ramirez',
      title: 'Product Director, NexGen',
      image:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        "The team's ability to translate complex requirements into clean, intuitive interfaces is remarkable. They're truly masters of their craft.",
      name: 'Sophia Chen',
      title: 'UX Director, Innovate AI',
      image:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        "Working with them was effortless. They brought fresh perspectives to challenges we'd been struggling with for months.",
      name: 'Marcus Johnson',
      title: 'CEO, Horizon Media',
      image:
        'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        "They didn't just meet our expectations - they redefined what we thought was possible. I cannot recommend them highly enough.",
      name: 'Olivia Thompson',
      title: 'Brand Manager, Elevate',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        'The strategic thinking behind their design decisions transformed our product. We saw immediate improvements in user engagement.',
      name: 'James Wilson',
      title: 'CTO, TechSphere',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  return (
    <section className="bg-muted/30 w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="max-w-[700px] space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Client <span className="text-primary">Testimonials</span>
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Swipe through what our clients have to say about working with us
            </p>
          </div>

          <div className="mt-12 w-full max-w-5xl">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="bg-background flex h-full flex-col rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
                      <div className="text-primary mb-4 font-serif text-4xl">
                        &ldquo;
                      </div>
                      <blockquote className="mb-6 flex-1">
                        <p className="text-base">{testimonial.quote}</p>
                      </blockquote>
                      <div className="mt-auto flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover"
                          />
                        </div>
                        <div className="text-start">
                          <p className="text-sm font-medium">
                            {testimonial.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {testimonial.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex justify-center gap-2">
                <CarouselPrevious className="static transform-none" />
                <CarouselNext className="static transform-none" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
