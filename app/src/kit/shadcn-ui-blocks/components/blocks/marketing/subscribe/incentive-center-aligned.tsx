import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

export default function IncentiveCenterAligned() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-5">
          <h2 className="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter">
            Join Our Community
          </h2>
          <p className="text-foreground mt-4 max-w-4xl text-base text-balance sm:text-lg">
            Get exclusive access to our latest updates, tips, and offers
            directly in your inbox.
          </p>
        </div>

        <form>
          <div className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 lg:mt-8">
            <div className="w-full">
              <Label htmlFor="subscribe-input" className="sr-only">
                Email address
              </Label>
              <Input
                type="email"
                id="subscribe-input"
                name="subscribe-input"
                className=""
                placeholder="Your email address"
              />
            </div>
            <Button className="w-full sm:w-auto">Subscribe Now</Button>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">
            We care about your data in our privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
}
