import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { ArrowRight, Mail } from "lucide-react";

export default function SubscribeInputStyle() {
  return (
    <form className="py-24 lg:py-32 container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
      <div className="p-1.5 flex flex-col sm:flex-row items-center gap-2 rounded-lg">
        <div className="relative w-full">
          <Label htmlFor="subscribe-input" className="sr-only">
            Subscribe
          </Label>
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3">
            <Mail className="size-4 mt-0.5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            id="subscribe-input"
            name="subscribe-input"
            className="ps-9 "
            placeholder="Enter your email"
          />
        </div>
        <Button className="w-full sm:w-auto ">
          Join
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
      <p className="ps-1.5 mt-2 text-xs text-muted-foreground">
        No spam, unsubscribe at any time.
      </p>
    </form>
  );
}
