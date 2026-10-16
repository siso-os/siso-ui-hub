import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

export default function SimpleCenterAligned() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      <div className="max-w-xl text-center mx-auto">
        <div className="mb-5">
          <h2 className="text-2xl font-bold md:text-3xl md:leading-tight">
            Sign up to our newsletter
          </h2>
        </div>

        <form>
          <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <div className="w-full">
              <Label htmlFor="subscribe-input" className="sr-only">
                Search
              </Label>
              <Input
                type="text"
                id="subscribe-input"
                name="subscribe-input"
                className=""
                placeholder="Enter your email"
              />
            </div>
            <Button className="w-full sm:w-auto">Subscribe</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
