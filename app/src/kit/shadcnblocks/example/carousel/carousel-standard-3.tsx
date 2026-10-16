import { Star } from "lucide-react";

import { Badge } from "../../../shadcn/ui/badge";
import { Button } from "../../../shadcn/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../shadcn/ui/carousel";

export const title = "Product Showcase Carousel";

const products = [
  {
    id: "item-1",
    name: "Leather Weekender Bag",
    price: "189",
    rating: 4.8,
    reviews: 214,
    badge: "New",
  },
  {
    id: "item-2",
    name: "Ceramic Pour-Over Set",
    price: "64",
    rating: 4.5,
    reviews: 98,
    badge: "Popular",
  },
  {
    id: "item-3",
    name: "Walnut Desk Lamp",
    price: "128",
    rating: 4.6,
    reviews: 156,
    badge: "Sale",
  },
  {
    id: "item-4",
    name: "Merino Throw Blanket",
    price: "92",
    rating: 4.9,
    reviews: 73,
    badge: null,
  },
  {
    id: "item-5",
    name: "Brass Analog Clock",
    price: "54",
    rating: 4.2,
    reviews: 41,
    badge: "New",
  },
];

const Example = () => (
  <div className="mx-auto w-full max-w-sm">
    <Carousel>
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id}>
            <div className="overflow-hidden rounded-md border bg-background">
              <div className="relative aspect-[3/2] bg-black">
                {/** biome-ignore lint/performance/noImgElement: "Kibo UI is framework agnostic" */}
                <img
                  alt={product.name}
                  className="absolute inset-0"
                  height={600}
                  src="https://placehold.co/600x400"
                  width={400}
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="space-y-4 p-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                          key={i}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <p className="text-2xl font-bold">${product.price}</p>
                </div>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export default Example;
