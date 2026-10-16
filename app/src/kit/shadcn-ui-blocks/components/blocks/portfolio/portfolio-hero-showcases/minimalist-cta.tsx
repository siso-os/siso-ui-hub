import { Button } from "../../../ui/button";
import { ArrowRight } from "lucide-react";

export default function PortfolioHeroMinimalistCta() {
  return (
    <div className="bg-background">
      <div className="container mx-auto grid min-h-[75vh] place-items-center px-4 py-16 sm:py-24 md:px-6 2xl:max-w-[1400px]">
        <div className="grid gap-8 text-center md:max-w-3xl">
          <div className="space-y-4">
            <div className="bg-primary mx-auto h-0.5 w-12" />

            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block">Design is thinking</span>
              <span className="mt-1 block">
                made <span className="text-primary">visual</span>
              </span>
            </h1>
          </div>

          <p className="text-muted-foreground mx-auto max-w-xl text-lg">
            Freelance designer creating minimal, purposeful experiences for
            digital products that connect brands with their audience.
          </p>

          <div className="mx-auto">
            <Button size="lg" className="group gap-2 px-8 text-base">
              View Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="mt-16 grid gap-8 border-t pt-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-muted-foreground text-sm font-medium">
                EXPERTISE
              </p>
              <p className="mt-1 font-medium">UI/UX Design</p>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-sm font-medium">
                PROJECTS
              </p>
              <p className="mt-1 font-medium">100+ Completed</p>
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-sm font-medium">
                EXPERIENCE
              </p>
              <p className="mt-1 font-medium">8+ Years</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
