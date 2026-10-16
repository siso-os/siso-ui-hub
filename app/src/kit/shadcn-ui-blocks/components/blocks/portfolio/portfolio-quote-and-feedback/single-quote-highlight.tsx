import { Badge } from '../../../ui/badge';

export default function SingleQuoteHighlight() {
  return (
    <section className="bg-muted/40 w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge variant="secondary">Featured Testimonial</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Client <span className="text-primary">Spotlight</span>
            </h2>
            <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed">
              Hear what our clients have to say about working with us
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-3xl">
            <blockquote className="relative">
              <div className="relative z-10">
                <p className="text-2xl leading-relaxed font-medium md:text-3xl md:leading-relaxed">
                  &ldquo;Their creativity and attention to detail transformed
                  our vision into a reality that exceeded our expectations. The
                  result wasn&apos;t just visually stunning, but strategically
                  crafted to achieve our business goals.&rdquo;
                </p>
                <span className="text-primary absolute right-0 bottom-0 translate-x-6 translate-y-8 text-8xl leading-none opacity-20"></span>
                <div className="mt-8 flex items-center justify-center gap-4 sm:justify-start">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop"
                      alt="Alexandra Chen"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Alexandra Chen</p>
                    <p className="text-muted-foreground">
                      Marketing Director, Innovate Inc.
                    </p>
                  </div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
