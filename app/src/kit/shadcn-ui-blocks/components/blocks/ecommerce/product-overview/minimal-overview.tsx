import { Button } from '../../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

export default function MinimalOverview() {
  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-8">
          <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Modern watch with leather strap"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <button className="bg-muted ring-primary relative aspect-square overflow-hidden rounded-md ring-2">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product view 1"
                className="object-cover"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 11vw"
              />
            </button>
            <button className="bg-muted hover:ring-primary/50 relative aspect-square overflow-hidden rounded-md hover:ring-2">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product view 2"
                className="object-cover"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 11vw"
              />
            </button>
            <button className="bg-muted hover:ring-primary/50 relative aspect-square overflow-hidden rounded-md hover:ring-2">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                alt="Product view 3"
                className="object-cover"
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 11vw"
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="mb-4 text-3xl font-medium tracking-tight">
              Classic Leather Watch
            </h1>
            <div className="flex items-baseline gap-4">
              <span className="text-2xl">$299.00</span>
              <span className="text-muted-foreground text-sm line-through">
                $399.00
              </span>
            </div>
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="h-12 w-full justify-start space-x-8 bg-transparent p-0">
              <TabsTrigger
                value="details"
                className="data-[state=active]:border-primary h-full rounded-none border-b-2 border-transparent bg-transparent"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="sizing"
                className="data-[state=active]:border-primary h-full rounded-none border-b-2 border-transparent bg-transparent"
              >
                Sizing
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="data-[state=active]:border-primary h-full rounded-none border-b-2 border-transparent bg-transparent"
              >
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-8">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Elevate your style with our Classic Leather Watch. Featuring
                  premium materials, precise movement, and timeless design that
                  complements any outfit.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1 w-1 rounded-full"></span>
                    Swiss-made movement for precise timekeeping
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1 w-1 rounded-full"></span>
                    Genuine leather strap with classic buckle
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1 w-1 rounded-full"></span>
                    Sapphire crystal glass for durability
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-primary h-1 w-1 rounded-full"></span>
                    Water-resistant up to 30 meters
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="sizing" className="mt-8">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Our watches come in three sizes to suit different preferences
                  and wrist sizes.
                </p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="rounded-lg border p-4">
                    <div className="mb-1 font-medium">38mm</div>
                    <p className="text-muted-foreground">
                      Recommended for small wrists
                    </p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-1 font-medium">42mm</div>
                    <p className="text-muted-foreground">Most popular size</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="mb-1 font-medium">44mm</div>
                    <p className="text-muted-foreground">
                      Ideal for larger wrists
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="mt-8">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We offer free standard shipping on all orders. Express
                  delivery options are available at checkout.
                </p>
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between rounded-lg border p-4">
                    <span>Standard Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between rounded-lg border p-4">
                    <span>Express Shipping</span>
                    <span className="font-medium">$15.00</span>
                  </div>
                  <div className="flex justify-between rounded-lg border p-4">
                    <span>Next Day Delivery</span>
                    <span className="font-medium">$25.00</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="mb-2 text-sm font-medium">Size</label>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-12">
                  38mm
                </Button>
                <Button variant="outline" className="h-12">
                  42mm
                </Button>
                <Button variant="outline" className="h-12">
                  44mm
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="mb-2 text-sm font-medium">Color</label>
              <div className="flex gap-3">
                <button className="h-12 w-12 rounded-lg bg-black ring-2 ring-black ring-offset-2"></button>
                <button className="bg-brown-500 h-12 w-12 rounded-lg"></button>
                <button className="h-12 w-12 rounded-lg bg-slate-200"></button>
              </div>
            </div>
          </div>

          <Button size="lg" className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
