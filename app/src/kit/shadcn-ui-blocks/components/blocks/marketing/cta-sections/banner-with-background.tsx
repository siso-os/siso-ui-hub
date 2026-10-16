import { Button } from '../../../ui/button';

export default function BannerWithBackgroundCTA() {
  return (
    <>
      {/* Banner CTA Section */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden py-16 md:py-24">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Abstract digital technology background"
            className="object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-2xl space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to transform your business?
              </h2>
              <p className="text-primary-foreground/80 mx-auto max-w-[600px] md:text-xl">
                Join our platform today and see immediate results.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" variant="secondary" asChild>
                <a href="#">Get Started</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground hover:bg-primary-foreground/10 text-primary-foreground hover:text-primary-foreground bg-transparent"
                asChild
              >
                <a href="#">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* End Banner CTA Section */}
    </>
  );
}
