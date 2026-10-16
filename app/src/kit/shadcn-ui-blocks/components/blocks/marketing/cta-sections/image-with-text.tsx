import { Button } from '../../../ui/button';

export default function ImageWithTextCTA() {
  return (
    <>
      {/* CTA with Image Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Build better products faster
                </h2>
                <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform gives you everything you need to create stunning
                  websites and applications with ease.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button variant="default" size="lg" asChild>
                  <a href="#">Get Started</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">Learn More</a>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-xl md:h-[400px] lg:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Team collaborating on digital product development"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* End CTA with Image Section */}
    </>
  );
}
