import { Button } from "../../../ui/button";
import { ArrowRight } from "lucide-react";

export default function WithAction() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex items-center justify-between gap-x-6 p-4">
          <div className="flex flex-wrap justify-between w-full items-center gap-x-4 gap-y-2">
            <p className="text-sm leading-6">
              <strong className="font-semibold">GeneriCon 2024</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              Join us in Denver from June 7 - 9 to see what&apos;s coming next.
            </p>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-x-1"
            >
              Register now <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
