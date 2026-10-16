import { Button } from "../../../ui/button";
import { PlayCircle } from "lucide-react";

export default function Base() {
  return (
    <div>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        <blockquote className="max-w-4xl mx-auto">
          <p className="mb-6 md:text-lg">
            <span className="font-semibold">Philip,</span>{" "}
            <span className="text-muted-foreground">CEO at Day Spa</span>
          </p>

          <p className="text-xl sm:text-2xl md:text-3xl md:leading-normal">
            I&apos;m absolutely floored by the level of care and attention to
            detail the team at Acme have put into this project and for one can
            guarantee that we will be a return customer.
          </p>

          <footer className="mt-6 md:mt-10">
            <Button variant="secondary" className="h-fit">
              <PlayCircle className="!size-8" />
              Watch the Video
            </Button>
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
