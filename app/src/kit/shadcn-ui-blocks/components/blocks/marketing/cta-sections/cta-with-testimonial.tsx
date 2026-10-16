import { Button } from '../../../ui/button';
import { QuoteIcon } from 'lucide-react';

export default function CTAWithTestimonial() {
  return (
    <>
      {/* CTA with Testimonial Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join thousands of satisfied customers
              </h2>
              <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed">
                Our platform has helped businesses of all sizes achieve their
                goals. Start your journey today and see the difference.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <a href="#">Start Free Trial</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#">View Case Studies</a>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-background relative rounded-xl border p-6 shadow-sm">
                <QuoteIcon className="text-primary/20 absolute top-4 left-4 h-10 w-10" />
                <blockquote className="space-y-2">
                  <p className="text-foreground pt-4 pl-6 text-lg leading-relaxed font-medium">
                    &ldquo;This platform has completely transformed how we
                    operate. We&apos;ve seen a 40% increase in productivity and
                    our customers love the results.&rdquo;
                  </p>
                  <footer className="flex items-center gap-4 border-t pt-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Sarah Johnson, CEO"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">
                        Sarah Johnson
                      </p>
                      <p className="text-muted-foreground text-sm">
                        CEO, TechInnovate
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End CTA with Testimonial Section */}
    </>
  );
}
