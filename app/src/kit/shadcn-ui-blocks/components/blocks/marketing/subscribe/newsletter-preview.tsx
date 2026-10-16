import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Card, CardContent, CardHeader } from '../../../ui/card';
import { Calendar, Clock, ArrowRight, NewspaperIcon } from 'lucide-react';

export default function NewsletterPreview() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-4xl xl:tracking-tighter">
            Get Weekly Insights Delivered
          </h2>
          <p className="text-foreground mt-4 max-w-4xl text-base text-balance sm:text-lg">
            Join thousands of professionals who rely on our newsletter for the
            latest trends, tips, and industry news.
          </p>

          <form className="mt-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <Label htmlFor="subscribe-input" className="sr-only">
                  Email address
                </Label>
                <Input
                  type="email"
                  id="subscribe-input"
                  name="subscribe-input"
                  placeholder="Enter your email address"
                />
              </div>
              <Button className="w-full sm:w-auto">
                Subscribe Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-3 text-sm">
              No spam. Unsubscribe anytime. 12,000+ readers trust us.
            </p>
          </form>
        </div>

        <div className="order-first lg:order-last">
          <Card className="border-border border shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Weekly Digest</h3>
                <div className="text-muted-foreground flex items-center text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  Issue #47
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-border border-b pb-4">
                <h4 className="text-primary mb-2 font-semibold">
                  Featured Article: The Future of Web Development
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Discover the latest trends shaping modern web development,
                  from AI integration to performance optimization...
                </p>
                <div className="text-muted-foreground mt-2 flex items-center text-xs">
                  <Clock className="mr-1 h-3 w-3" />5 min read
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium">Industry News</h5>
                    <p className="text-muted-foreground text-xs">
                      Latest updates from tech leaders
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium">Tools & Resources</h5>
                    <p className="text-muted-foreground text-xs">
                      Handpicked developer tools
                    </p>
                  </div>
                </div>

                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="text-sm font-medium">Community Spotlight</h5>
                    <p className="text-muted-foreground text-xs">
                      Featured community projects
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-border border-t pt-4">
                <p className="text-muted-foreground text-xs">
                  Thanks for reading! Share this with your colleagues.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
