import { Button } from "../../../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { Heart, Share2, Star, Play, ChevronRight } from "lucide-react";

export default function ImmersiveOverview() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[30vh] md:h-[50vh] lg:h-[70vh] bg-muted">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
          alt="Modern watch with leather strap - Hero"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>

        {/* Quick Actions */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>

        {/* Video Preview */}
        <Button
          size="icon"
          variant="outline"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <Play className="h-8 w-8" />
        </Button>
      </div>

      {/* Product Info */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-background border rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Limited Edition
                </span>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-sm text-muted-foreground">(128)</span>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4">Classic Leather Watch</h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold">$299.00</span>
                <span className="text-lg text-muted-foreground line-through">
                  $399.00
                </span>
                <span className="text-sm font-medium text-green-600">
                  Save 25%
                </span>
              </div>

              <Tabs defaultValue="overview" className="mb-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="care">Care</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="prose dark:prose-invert">
                    <p>
                      Elevate your style with our Classic Leather Watch.
                      Featuring premium materials, precise movement, and
                      timeless design that complements any outfit.
                    </p>
                    <ul>
                      <li>Swiss-made movement for precise timekeeping</li>
                      <li>Genuine leather strap with classic buckle</li>
                      <li>Sapphire crystal glass for durability</li>
                      <li>Water-resistant up to 30 meters</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="details" className="mt-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Case Material</span>
                      <p className="text-muted-foreground">
                        316L Stainless Steel
                      </p>
                    </div>
                    <div>
                      <span className="font-medium">Movement</span>
                      <p className="text-muted-foreground">Swiss Automatic</p>
                    </div>
                    <div>
                      <span className="font-medium">Crystal</span>
                      <p className="text-muted-foreground">Sapphire</p>
                    </div>
                    <div>
                      <span className="font-medium">Water Resistance</span>
                      <p className="text-muted-foreground">30 Meters</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="care" className="mt-4">
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      To ensure the longevity of your watch, follow these care
                      instructions:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Clean regularly with a soft, dry cloth</li>
                      <li>Avoid exposure to extreme temperatures</li>
                      <li>Service every 3-5 years by a certified watchmaker</li>
                      <li>Store in a watch box when not in use</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Purchase Options */}
            <div>
              <div className="bg-muted p-6 rounded-xl mb-6">
                <h3 className="font-medium mb-4">Select Options</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">Color</span>
                    <div className="flex gap-2 mt-2">
                      <button className="w-8 h-8 rounded-full bg-black ring-2 ring-offset-2 ring-black"></button>
                      <button className="w-8 h-8 rounded-full bg-brown-500"></button>
                      <button className="w-8 h-8 rounded-full bg-slate-200"></button>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Size</span>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        38mm
                      </Button>
                      <Button variant="outline" size="sm">
                        42mm
                      </Button>
                      <Button variant="outline" size="sm">
                        44mm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-3" size="lg">
                Add to Cart
              </Button>
              <Button variant="outline" className="w-full" size="lg">
                Buy Now
              </Button>

              <div className="mt-6 space-y-3">
                <Button variant="ghost" className="w-full justify-between">
                  Shipping Information
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  Return Policy
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-between">
                  Size Guide
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Images */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
    </div>
  );
}
