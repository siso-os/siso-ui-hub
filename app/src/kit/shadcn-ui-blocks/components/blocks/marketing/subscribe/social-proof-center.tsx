import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';

export default function SocialProofCenter() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-xl text-center">
        <div className="mb-8">
          <h2 className="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter">
            Join Thousands of Satisfied Subscribers
          </h2>
          <p className="text-foreground mt-4 max-w-4xl text-base text-balance sm:text-lg">
            See what our community is saying
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <div className="flex flex-col items-center">
            <Quote className="text-primary mb-2 h-8 w-8" />
            <p className="text-muted-foreground italic">
              "This newsletter has transformed how I stay updated!"
            </p>
            <div className="mt-4 flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3 text-left">
                <p className="font-semibold">Jane Doe</p>
                <p className="text-muted-foreground text-sm">
                  Marketing Expert
                </p>
              </div>
            </div>
          </div>
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
                placeholder="Enter your email"
              />
            </div>
            <Button className="w-full sm:w-auto">Subscribe</Button>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">
            Join 5,000+ subscribers. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
}
