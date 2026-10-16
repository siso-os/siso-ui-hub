import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Zap, Clock, ShieldCheck } from 'lucide-react';

export default function CenteredIconPromo() {
  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <Badge variant="default" className="mb-4">
            Why Choose Us?
          </Badge>
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Experience the Difference
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            We provide lightning-fast service, 24/7 support, and top-tier
            security for all your needs. See how we stand out from the
            competition.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-3">
          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardHeader className="flex items-center justify-center">
              <div className="bg-primary/10 rounded-md p-3">
                <Zap className="text-primary h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-lg font-semibold">
                Lightning Speed
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Our infrastructure is optimized for performance, ensuring rapid
                load times.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardHeader className="flex items-center justify-center">
              <div className="bg-primary/10 rounded-md p-3">
                <Clock className="text-primary h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-lg font-semibold">
                24/7 Support
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Get help anytime with our dedicated support team, available
                around the clock.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-shadow hover:shadow-lg">
            <CardHeader className="flex items-center justify-center">
              <div className="bg-primary/10 rounded-md p-3">
                <ShieldCheck className="text-primary h-6 w-6" />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2 text-lg font-semibold">
                Advanced Security
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                Your data is protected with industry-leading security measures.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <a href="#">Get Started Today</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
