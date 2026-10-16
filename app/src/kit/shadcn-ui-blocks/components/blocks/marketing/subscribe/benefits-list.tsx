import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Check } from 'lucide-react';

export default function BenefitsListCenter() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter">
            Stay Ahead with Our Newsletter
          </h2>
          <p className="text-foreground mt-4 max-w-4xl text-base text-balance sm:text-lg">
            Subscribe to receive:
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center">
              <Check className="text-primary mr-2 h-5 w-5" />
              <span>Exclusive industry insights</span>
            </li>
            <li className="flex items-center">
              <Check className="text-primary mr-2 h-5 w-5" />
              <span>Latest product updates</span>
            </li>
            <li className="flex items-center">
              <Check className="text-primary mr-2 h-5 w-5" />
              <span>Special offers and discounts</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          <form>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <Label htmlFor="subscribe-input" className="sr-only">
                  Email address
                </Label>
                <Input
                  type="email"
                  id="subscribe-input"
                  name="subscribe-input"
                  className=""
                  placeholder="Enter your email"
                />
              </div>
              <Button className="w-full sm:w-auto">Subscribe</Button>
            </div>
            <p className="text-muted-foreground mt-3 text-sm">
              Your privacy is important to us.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
