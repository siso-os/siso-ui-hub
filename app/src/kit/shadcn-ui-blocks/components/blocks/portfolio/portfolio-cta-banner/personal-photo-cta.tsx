import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function PortfolioCTAPersonalPhoto() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="border-border bg-muted/5 overflow-hidden rounded-xl border shadow-sm">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-0">
          {/* Photo column - 5 cols on desktop */}
          <div className="relative order-2 aspect-square w-full md:order-1 md:col-span-5 md:h-full">
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Professional portrait"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />

              {/* Subtle overlay gradient for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r"></div>
            </div>
          </div>

          {/* Content column - 7 cols on desktop */}
          <div className="order-1 p-6 md:order-2 md:col-span-7 md:p-10 lg:p-12">
            <div className="max-w-lg">
              <h2 className="text-xl font-bold tracking-tight md:text-2xl lg:text-3xl">
                Hi, I&apos;m Jason Anderson 👋
              </h2>

              <p className="text-primary mt-2 text-lg font-medium">
                Creative Director & UI/UX Designer
              </p>

              <p className="text-muted-foreground mt-4">
                Looking for a designer who understands both aesthetics and
                functionality? I specialize in creating beautiful, user-centric
                digital experiences that help businesses connect with their
                audience.
              </p>

              <div className="mt-6">
                <p className="font-medium">
                  Let&apos;s chat about your project needs:
                </p>
                <ul className="text-muted-foreground mt-2 space-y-1">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> Brand identity
                    & visual design
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> Website design
                    & development
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span> User experience
                    optimization
                  </li>
                </ul>
              </div>

              <Button asChild size="lg" className="group mt-6">
                <a href="#">
                  Schedule a Personal Consultation
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
