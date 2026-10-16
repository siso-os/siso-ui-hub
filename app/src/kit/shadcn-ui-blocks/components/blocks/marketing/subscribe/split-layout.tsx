import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

export default function EbookIncentive() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
        <img
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
          alt="Free Ebook Cover"
          className="h-auto w-full rounded-lg object-cover shadow-lg"
          width={640}
          height={360}
        />
        <div>
          <h2 className="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter">
            Get Our Free Ebook
          </h2>
          <p className="text-foreground mt-4 max-w-4xl text-base text-balance sm:text-lg">
            Subscribe to our newsletter and receive our exclusive ebook packed
            with industry insights and tips.
          </p>
          <form className="mt-6">
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
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
