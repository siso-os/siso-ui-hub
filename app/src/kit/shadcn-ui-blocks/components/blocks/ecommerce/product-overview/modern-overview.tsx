import { Button } from "../../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { Heart, Share2, Star } from "lucide-react";

export default function ModernOverview() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="Modern watch with leather strap - Main view"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                  alt={`Product view ${i}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-medium text-primary">
                Luxury Collection
              </span>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">Classic Leather Watch</h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-medium">4.9</span>
              <span className="text-sm text-muted-foreground">(128)</span>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-bold mb-2">$299.00</div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground line-through">
                  $399.00
                </span>
                <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-sm font-medium px-2 py-0.5 rounded">
                  25% Off
                </span>
              </div>
            </div>

            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="text-muted-foreground">
                  Elevate your style with our Classic Leather Watch. Featuring
                  premium materials, precise movement, and timeless design that
                  complements any outfit.
                </p>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="text-muted-foreground space-y-2">
                  <li>• Swiss-made movement</li>
                  <li>• Genuine leather strap</li>
                  <li>• Sapphire crystal glass</li>
                  <li>• Water-resistant up to 30m</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping" className="mt-4">
                <p className="text-muted-foreground">
                  Free standard shipping on all orders. Express delivery
                  available. 30-day return policy with money-back guarantee.
                </p>
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <span className="font-medium">Color</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                  <button className="w-8 h-8 rounded-full bg-brown-500"></button>
                  <button className="w-8 h-8 rounded-full bg-slate-200"></button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-medium">Size</span>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline">38mm</Button>
                  <Button variant="outline">42mm</Button>
                  <Button variant="outline">44mm</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
