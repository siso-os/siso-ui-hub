import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

export default function SplitWithImageCTA() {
  return (
    <>
      {/* Split CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid items-center gap-6 rounded-lg border p-6 md:grid-cols-2 md:gap-12 md:p-10">
            <div className="flex flex-col justify-center space-y-4">
              <Badge className="w-fit" variant={'outline'}>
                New Features
              </Badge>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Transform your workflow
                </h2>
                <p className="text-muted-foreground max-w-[600px] md:text-xl/relaxed">
                  Our latest features help you streamline your development
                  process and boost productivity.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <a href="#">Explore Features</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#">Watch Demo</a>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-lg md:order-last">
              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Productivity dashboard and analytics"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      {/* End Split CTA Section */}
    </>
  );
}
