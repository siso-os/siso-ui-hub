import { Button } from '../../../ui/button';

export default function SimpleCenteredCTA() {
  return (
    <>
      {/* CTA Section */}
      <div className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                Join thousands of users who&apos;ve already made the switch.
              </p>
            </div>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <a href="#">Get Started</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#">Learn More</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* End CTA Section */}
    </>
  );
}
