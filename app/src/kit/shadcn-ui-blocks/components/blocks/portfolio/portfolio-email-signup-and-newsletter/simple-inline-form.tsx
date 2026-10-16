import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { ArrowRight } from "lucide-react";

export default function PortfolioSimpleInlineForm() {
  return (
    <div className="w-full py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-6 md:gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold md:text-2xl">
                Get updates straight to your inbox
              </h3>
              <p className="text-muted-foreground mx-auto mt-2 max-w-lg">
                Subscribe to receive design tips, project insights, and
                exclusive resources.
              </p>
            </div>

            <form className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Your name"
                  aria-label="Your name"
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Your email"
                  aria-label="Your email"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="group whitespace-nowrap">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>

            <p className="text-muted-foreground text-center text-xs">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
