import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function PortfolioCTAInlineBanner() {
  return (
    <div className="border-border bg-muted/30 w-full border-y py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h3 className="text-lg font-medium md:text-xl">
              Interested in working together?
            </h3>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              I&apos;m currently taking on select freelance opportunities.
            </p>
          </div>

          <Button asChild className="group">
            <a href="#">
              Let&apos;s Talk
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
