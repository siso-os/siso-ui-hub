import { Button } from '../../../ui/button';
import { Download, FileText } from 'lucide-react';

export default function PortfolioInlineResourceCallout() {
  return (
    <div className="container mx-auto w-full px-4 py-10 sm:px-6">
      <div className="bg-muted/30 border-border relative my-4 overflow-hidden rounded-lg border p-1">
        <div className="bg-primary/10 absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"></div>
        <div className="bg-primary/10 absolute -bottom-12 -left-12 h-40 w-40 rounded-full blur-3xl"></div>

        <div className="bg-background/80 relative rounded-md p-5 backdrop-blur-sm md:p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            {/* Resource image/icon */}
            <div className="md:w-1/4">
              <div className="bg-background relative mx-auto flex aspect-square max-w-[140px] items-center justify-center overflow-hidden rounded-lg border md:w-full">
                <div className="absolute inset-0 opacity-10">
                  <img
                    src="https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Background pattern"
                    className="object-cover"
                  />
                </div>
                <FileText className="text-primary relative h-12 w-12" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-primary text-xs font-medium tracking-wider uppercase">
                Free Resource
              </div>
              <h3 className="mt-1 text-xl font-bold md:text-2xl">
                Developer&apos;s Guide to Clean Code
              </h3>
              <p className="text-muted-foreground mt-2 text-sm md:max-w-md">
                Learn how to write maintainable, scalable code with this
                practical guide to clean coding principles and practices.
              </p>
            </div>

            {/* CTA Button */}
            <div className="md:w-1/5">
              <Button asChild className="w-full md:w-auto" size="lg">
                <a href="#">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
