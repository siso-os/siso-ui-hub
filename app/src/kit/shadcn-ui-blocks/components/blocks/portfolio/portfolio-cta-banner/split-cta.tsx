import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function PortfolioCTASplitLayout() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="bg-muted/30 overflow-hidden rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image column */}
          <div className="relative h-64 md:h-auto">
            <img
              src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Creative workspace with laptop and design tools"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
          </div>

          {/* Text column */}
          <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
              Have a project in mind? Let&apos;s bring it to life together.
            </h2>

            <p className="text-muted-foreground mt-3 max-w-md">
              I&apos;m currently available for new projects, collaborations, and
              consulting opportunities.
            </p>

            <Button asChild size="lg" className="group mt-8 self-start">
              <a href="#">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
