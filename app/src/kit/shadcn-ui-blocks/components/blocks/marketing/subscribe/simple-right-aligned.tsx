import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function SimpleRightAligned() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold md:text-3xl md:leading-tight">
            Subscribe
          </h2>
          <p className="mt-3 text-muted-foreground">
            Subscribe and start making the most of every engagement.
          </p>
        </div>

        <form>
          <div className="w-full sm:max-w-lg md:ms-auto">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <Label htmlFor="subscribe-input" className="sr-only">
                  Search
                </Label>
                <Input
                  type="text"
                  id="subscribe-input"
                  name="subscribe-input"
                  className="py-3 px-4 block w-full"
                  placeholder="Enter your email"
                />
              </div>
              <Button className="w-full sm:w-auto">Subscribe</Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              No spam, unsubscribe at any time
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
