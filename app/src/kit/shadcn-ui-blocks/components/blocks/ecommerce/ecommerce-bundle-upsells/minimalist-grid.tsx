import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Card, CardFooter, CardHeader } from '../../../ui/card';
import { Check, Star } from 'lucide-react';

export default function UpsellBundleMinimalistGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8 text-center md:mb-12">
        <h2 className="mb-3 text-2xl font-bold md:text-3xl">
          Complete Your Design Toolkit
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
          Get everything you need to create stunning designs. Save 40% when you
          bundle these essential resources together.
        </p>
      </div>

      {/* Main Product */}
      <div className="mb-8 md:mb-12">
        <Card className="border-primary/20 from-background to-muted/20 relative overflow-hidden border-2 bg-gradient-to-br">
          <div className="absolute top-4 left-4 z-10">
            <Badge
              variant="default"
              className="bg-primary text-primary-foreground"
            >
              <Star className="mr-1 h-3 w-3" />
              Main Product
            </Badge>
          </div>
          <div className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
            <div className="bg-muted relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Complete UI Design System"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div>
                <h3 className="mb-2 text-xl font-bold md:text-2xl">
                  Complete UI Design System
                </h3>
                <p className="text-muted-foreground mb-4 text-sm md:text-base">
                  A comprehensive design system with 200+ components, design
                  tokens, and documentation. Perfect for modern web and mobile
                  applications.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    200+ UI Components
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Figma & Sketch Files
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    React Code Components
                  </li>
                </ul>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold md:text-3xl">$89</span>
                <span className="text-muted-foreground line-through">$149</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add-on Products Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:mb-12 md:grid-cols-3 md:gap-6">
        {/* Add-on 1 */}
        <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
          <div className="absolute top-3 right-3 z-10">
            <Badge
              variant="secondary"
              className="border-orange-200 bg-orange-100 text-orange-800"
            >
              Best Value
            </Badge>
          </div>
          <CardHeader className="p-4">
            <div className="bg-muted relative mb-3 aspect-[4/3] overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Premium Icon Pack"
                className="object-cover"
              />
            </div>
            <h4 className="text-base font-semibold md:text-lg">
              Premium Icon Pack
            </h4>
            <p className="text-muted-foreground text-sm">
              1,000+ vector icons in multiple formats
            </p>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg font-bold">$29</span>
                <span className="text-muted-foreground text-sm line-through">
                  $49
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Add-on 2 */}
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
          <CardHeader className="p-4">
            <div className="bg-muted relative mb-3 aspect-[4/3] overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Landing Page Templates"
                className="object-cover"
              />
            </div>
            <h4 className="text-base font-semibold md:text-lg">
              Landing Page Templates
            </h4>
            <p className="text-muted-foreground text-sm">
              12 conversion-optimized templates
            </p>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg font-bold">$39</span>
                <span className="text-muted-foreground text-sm line-through">
                  $69
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Add-on 3 */}
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
          <CardHeader className="p-4">
            <div className="bg-muted relative mb-3 aspect-[4/3] overflow-hidden rounded-md">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Design Guide eBook"
                className="object-cover"
              />
            </div>
            <h4 className="text-base font-semibold md:text-lg">
              Design Guide eBook
            </h4>
            <p className="text-muted-foreground text-sm">
              Complete guide to modern UI design
            </p>
          </CardHeader>
          <CardFooter className="p-4 pt-0">
            <div className="w-full">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-lg font-bold">$19</span>
                <span className="text-muted-foreground text-sm line-through">
                  $29
                </span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Bundle CTA */}
      <div className="from-primary/5 to-primary/10 border-primary/20 rounded-xl border bg-gradient-to-r p-6 text-center md:p-8">
        <div className="mx-auto max-w-2xl">
          <h3 className="mb-3 text-xl font-bold md:text-2xl">
            Get the Complete Bundle
          </h3>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Save 40% when you purchase all items together. Everything you need
            to create professional designs.
          </p>

          <div className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">
                Individual Price:
              </span>
              <span className="text-muted-foreground text-lg line-through">
                $296
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Bundle Price:</span>
              <span className="text-primary text-2xl font-bold md:text-3xl">
                $177
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-auto px-8 py-3 text-base whitespace-break-spaces"
            >
              Get Complete Bundle - Save $119
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-auto px-8 py-3 text-base"
            >
              View Individual Items
            </Button>
          </div>

          <p className="text-muted-foreground mt-4 text-xs">
            30-day money-back guarantee • Instant download • Commercial license
            included
          </p>
        </div>
      </div>
    </section>
  );
}
