export default function GridOfQuotes() {
  const testimonials = [
    {
      quote:
        "The team delivered an exceptional design that perfectly aligned with our brand values. Couldn't be happier with the results.",
      name: 'Michael Torres',
      title: 'Founder, Elevation Studios',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        'Working with this studio completely transformed our online presence. Our conversion rates have increased by 40% since launch.',
      name: 'Priya Sharma',
      title: 'CMO, TechVision',
      image:
        'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        'Incredibly responsive and professional. They took the time to understand our goals and delivered beyond expectations.',
      name: 'David Kim',
      title: 'Project Manager, Blueprint',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop',
    },
    {
      quote:
        "Their attention to detail and creative problem-solving made all the difference in our project's success.",
      name: 'Emma Wilson',
      title: 'Creative Director, Stellar',
      image:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our <span className="text-primary">Clients</span> Say
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
              Testimonials from clients we&apos;ve had the pleasure of working
              with
            </p>
          </div>

          <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-muted/40 border-border/40 hover:border-primary/20 hover:bg-muted/60 flex h-full flex-col rounded-xl border p-6 transition-all"
              >
                <div className="flex-1">
                  <blockquote className="relative z-10 mb-4">
                    <p className="text-lg leading-relaxed">
                      {testimonial.quote}
                    </p>
                  </blockquote>
                </div>
                <div className="border-border/30 flex items-center gap-4 border-t pt-4 text-start">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
