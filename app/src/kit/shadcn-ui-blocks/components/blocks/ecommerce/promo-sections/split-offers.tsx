import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { CheckCircle } from 'lucide-react';

export default function SplitOffersPromo() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Offer Content */}
        <div className="px-4 py-12 sm:px-6 lg:col-span-7 lg:px-8 lg:py-24 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              Unlock Exclusive Travel Deals
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Join our loyalty program today and gain access to members-only
              discounts, early booking options, and personalized travel
              packages.
            </p>

            <div className="mt-8 space-y-6">
              <Card className="bg-card/80 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Silver Tier
                  </CardTitle>
                  <span className="text-muted-foreground text-xs">
                    Most Popular
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">10% Off All Bookings</div>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary h-4 w-4" />
                      <span>Priority customer support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary h-4 w-4" />
                      <span>Exclusive seasonal offers</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gold Tier Upgrade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-semibold">
                    Upgrade for $99/year
                  </div>
                  <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary h-4 w-4" />
                      <span>15% off bookings + Free room upgrades</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="text-primary h-4 w-4" />
                      <span>Access to airport lounges</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-10 flex items-center gap-x-6">
              <Button size="lg" asChild>
                <a href="#">Join Now</a>
              </Button>
              <Button variant="ghost" asChild>
                <a
                  href="#"
                  className="text-foreground text-sm leading-6 font-semibold"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury hotel resort pool area"
            className="bg-muted aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            width={900}
            height={600}
          />
          <div
            className="via-background/40 to-background absolute inset-0 bg-gradient-to-l from-transparent lg:hidden"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
