import { Check, Star } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent, CardHeader } from '../../../ui/card';
import { Badge } from '../../../ui/badge';

export default function UpsellBundleComparison() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold lg:text-3xl">
          Choose Your Perfect Option
        </h2>
        <p className="text-muted-foreground">
          Compare our single product with our money-saving bundle
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {/* Single Product */}
        <Card className="relative">
          <CardHeader className="pb-4 text-center">
            <h3 className="text-xl font-semibold">Single Product</h3>
            <p className="text-muted-foreground text-sm">
              Perfect for trying out
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Product Image */}
            <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Premium Wireless Headphones"
                className="object-cover"
              />
            </div>

            {/* Product Title */}
            <div>
              <h4 className="text-lg font-semibold">
                Premium Wireless Headphones
              </h4>
              <div className="mt-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-primary text-primary h-4 w-4" />
                ))}
                <span className="text-muted-foreground ml-1 text-sm">
                  (127 reviews)
                </span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h5 className="font-medium">Key Features:</h5>
              <ul className="space-y-2">
                {[
                  'Active Noise Cancellation',
                  '30-hour battery life',
                  'Premium leather comfort',
                  'Hi-Res audio certified',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">$299</div>
                <div className="text-muted-foreground text-sm">
                  Free shipping included
                </div>
              </div>

              <Button className="w-full" size="lg">
                Buy Single Product
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bundle Option */}
        <Card className="border-primary relative shadow-lg">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
            <Badge className="bg-primary text-primary-foreground px-4 py-1">
              BEST VALUE
            </Badge>
          </div>

          <CardHeader className="pt-6 pb-4 text-center">
            <h3 className="text-xl font-semibold">Complete Bundle</h3>
            <p className="text-muted-foreground text-sm">
              Everything you need + extras
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Bundle Images */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Premium Wireless Headphones"
                  className="object-cover"
                />
              </div>
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Premium Carrying Case"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bundle Title */}
            <div>
              <h4 className="text-lg font-semibold">
                Headphones + Premium Accessories
              </h4>
              <div className="mt-1 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-primary text-primary h-4 w-4" />
                ))}
                <span className="text-muted-foreground ml-1 text-sm">
                  (89 reviews)
                </span>
              </div>
            </div>

            {/* Bundle Features */}
            <div className="space-y-3">
              <h5 className="font-medium">
                Everything in Single Product, plus:
              </h5>
              <ul className="space-y-2">
                {[
                  'Premium leather carrying case',
                  'Extra charging cable (USB-C)',
                  'Audio adapter (3.5mm)',
                  'Cleaning kit & microfiber cloth',
                  '2-year extended warranty',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="text-primary h-4 w-4 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bundle Pricing */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="mb-1 flex items-center justify-center gap-2">
                  <span className="text-muted-foreground text-lg line-through">
                    $399
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    Save $50
                  </Badge>
                </div>
                <div className="text-primary text-3xl font-bold">$349</div>
                <div className="text-muted-foreground text-sm">
                  Free shipping + extended warranty
                </div>
              </div>

              <Button
                className="bg-primary hover:bg-primary/90 w-full"
                size="lg"
              >
                Buy Complete Bundle
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground text-xs">
                  🔥 <strong>Limited time:</strong> Bundle saves you $50 vs
                  buying separately
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Indicators */}
      <div className="mt-8 border-t pt-6">
        <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            <span>Free shipping worldwide</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="text-primary h-4 w-4" />
            <span>24/7 customer support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
